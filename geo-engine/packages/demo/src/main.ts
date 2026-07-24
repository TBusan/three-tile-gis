/**
 * GeoEngine Phase 1 Demo — Checkerboard Tile Verification
 *
 * 验证整个引擎骨架：
 *   CGCS2000GKCRS → ProjectTileScheme → RasterLayer
 *   → TileManager → TileScheduler → Engine → Camera
 *
 * 不使用 Three.js，直接用 Canvas 2D 绘制 tile 以证明管线跑通。
 */

import {
  Engine,
  CGCS2000GKCRS,
  RasterLayer,
  ProjectTileScheme,
  MapCameraController,
  type Tile,
  type IDataSource,
  type ILayerRenderer,
  type IProjectCRS,
  type CrsBounds,
  type TileKey,
  type CrsCoord,
  type TileLoadCallback,
  TileContent,
  RenderObject,
} from "@geo-engine/core";

// ── Checkerboard Data ─────────────────────────────────────────

interface CheckerTileData {
  color: string;
  row: number;
  col: number;
}

class CheckerboardSource implements IDataSource<CheckerTileData> {
  readonly dataType = "checkerboard";
  readonly crs: IProjectCRS;
  readonly bounds: CrsBounds = [-1e6, -1e6, 1e6, 1e6];

  constructor(crs: IProjectCRS) {
    this.crs = crs;
  }

  async fetch(
    key: TileKey,
    _tileBounds: CrsBounds,
    _signal?: AbortSignal,
  ): Promise<CheckerTileData> {
    const [col, row] = key.id.split("-").map(Number);
    const isDark = (col + row) % 2 === 0;
    return {
      color: isDark ? "#2a3f5f" : "#3a5f7f",
      row,
      col,
    };
  }

  dispose(_data: CheckerTileData): void {}
}

// ── Canvas Renderer ───────────────────────────────────────────

class CheckerboardRenderer
  implements ILayerRenderer<CheckerTileData>
{
  readonly name = "checkerboard-renderer";

  async createContent(
    data: CheckerTileData,
    tile: Tile,
  ): Promise<TileContent> {
    const content = new TileContent(
      `cb-${tile.key.id}`,
      tile.key,
      "cb-layer",
    );
    content.data = data;
    content.state = "ready";

    const ro = new RenderObject(
      {
        bounds: tile.bounds,
        color: data.color,
        row: data.row,
        col: data.col,
        origin: tile.origin,
      },
      () => {}, // no GPU disposal needed
    );
    content.renderObjects.push(ro);
    return content;
  }

  disposeContent(_content: TileContent): void {}
}

// ── Drawing ───────────────────────────────────────────────────

function drawTiles(
  ctx: CanvasRenderingContext2D,
  tiles: ReadonlyMap<string, Tile>,
  camera: CrsCoord,
  zoom: number,
  w: number,
  h: number,
) {
  ctx.fillStyle = "#1a1a2e";
  ctx.fillRect(0, 0, w, h);

  for (const tile of tiles.values()) {
    if (tile.state !== "loaded" && tile.state !== "visible") continue;
    if (tile.contents.length === 0) continue;
    const content = tile.contents[0];
    if (content.renderObjects.length === 0) continue;

    const roData = content.renderObjects[0].object as {
      bounds: CrsBounds;
      color: string;
      row: number;
      col: number;
    };
    const [xmin, ymin, xmax, ymax] = roData.bounds;

    // CRS → screen
    const sx0 = (xmin - camera.x) / zoom + w / 2;
    const sy0 = -(ymax - camera.y) / zoom + h / 2;
    const sx1 = (xmax - camera.x) / zoom + w / 2;
    const sy1 = -(ymin - camera.y) / zoom + h / 2;

    const tw = sx1 - sx0;
    const th = sy1 - sy0;

    // Cull offscreen
    if (sx1 < 0 || sx0 > w || sy1 < 0 || sy0 > h) continue;

    ctx.fillStyle = roData.color;
    ctx.fillRect(sx0, sy0, tw, th);
    ctx.strokeStyle = "rgba(255,255,255,0.12)";
    ctx.lineWidth = 1;
    ctx.strokeRect(sx0, sy0, tw, th);

    // Label
    if (tw > 40 && th > 20) {
      ctx.fillStyle = "rgba(255,255,255,0.5)";
      ctx.font = "11px monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(
        `${roData.col},${roData.row}`,
        sx0 + tw / 2,
        sy0 + th / 2,
      );
    }
  }

  // Crosshair
  drawCrosshair(ctx, w, h);
}

function drawCrosshair(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
) {
  ctx.strokeStyle = "rgba(255,255,255,0.25)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(w / 2 - 16, h / 2);
  ctx.lineTo(w / 2 + 16, h / 2);
  ctx.moveTo(w / 2, h / 2 - 16);
  ctx.lineTo(w / 2, h / 2 + 16);
  ctx.stroke();
}

// ── HUD ───────────────────────────────────────────────────────

function updateHUD(
  crsName: string,
  x: number,
  y: number,
  zoom: number,
  tileCount: number,
) {
  const el = (id: string) => document.getElementById(id)!;
  el("crs-name").textContent = crsName;
  el("crs-pos").textContent = `(${x.toFixed(0)}, ${y.toFixed(0)}) m`;
  el("crs-zoom").textContent = `${zoom.toFixed(1)} m/px`;
  el("tile-count").textContent = `${tileCount}`;
}

// ── Main ───────────────────────────────────────────────────────

async function main() {
  const crs = new CGCS2000GKCRS(38);
  const app = document.getElementById("app")!;
  const canvas = document.getElementById("map") as HTMLCanvasElement;

  // Sizing
  function size() {
    const dpr = window.devicePixelRatio;
    const cw = app.clientWidth;
    const ch = app.clientHeight;
    canvas.width = cw * dpr;
    canvas.height = ch * dpr;
    canvas.style.width = cw + "px";
    canvas.style.height = ch + "px";
  }
  size();
  window.addEventListener("resize", size);

  const ctx = canvas.getContext("2d")!;

  // Build components
  const scheme = new ProjectTileScheme(500);
  const source = new CheckerboardSource(crs);
  const renderer = new CheckerboardRenderer();

  const layer = new RasterLayer({
    name: "Checkerboard",
    tileScheme: scheme,
    dataSource: source,
    renderer,
    zIndex: 0,
  });

  // Tile load callback
  const tileLoadFn: TileLoadCallback = async (tile, _layer, signal) => {
    const data = await source.fetch(tile.key, tile.bounds, signal);
    if (signal.aborted) return null;
    return renderer.createContent(data, tile);
  };

  // Engine
  const engine = new Engine({
    crs,
    container: app,
    tileLoadFn,
    groups: [
      {
        id: "default",
        name: "Default",
        visible: true,
        opacity: 1,
        layers: [layer],
      },
    ],
    cameraController: new MapCameraController({
      x: 500000,
      y: 3650000,
      zoom: 10,
    }),
  });

  // Start engine (its own rAF manages tile loading)
  engine.start();

  // Separate rendering loop — reads Engine state, draws canvas
  function render() {
    const dpr = window.devicePixelRatio;
    const cw = app.clientWidth;
    const ch = app.clientHeight;

    const cam = engine.cameraController as MapCameraController;

    ctx.save();
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    drawTiles(
      ctx,
      engine.tileManager.loadedTiles,
      cam.cameraWorldPos,
      cam.zoom,
      cw,
      ch,
    );
    ctx.restore();

    updateHUD(
      crs.name,
      cam.cameraWorldPos.x,
      cam.cameraWorldPos.y,
      cam.zoom,
      engine.tileManager.loadedTiles.size,
    );

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

main();
