/**
 * GeoEngine Phase 8 Demo — OSM Basemap + Checkerboard + Vector Overlay
 *
 * 验证：
 *   1. XYZ 瓦片加载（OSM 底图）通过 XYZTileScheme → XYZTileSource → RasterRenderer
 *   2. 多图层叠加（底图 + 棋盘格 overlay + GeoJSON 矢量覆盖层）
 *   3. Three.js WebGL 渲染管线
 *   4. CGCS2000 GK 38 带投影
 *   5. Multi-level LOD（缩放时 tile 级别自动切换）
 *   6. VectorRenderer 支持 Point / LineString / Polygon
 *   7. SubdividedPlane 细分网格提升 XYZ→GCJ38 重投影精度
 *   8. Proj4CRS / UTMCRS / CustomCRS 多 CRS 支持
 *   9. DEMSource + DemMesh + SkirtedMesh 地形就绪
 *  10. TileScheduler 4D 优先级 + 渐进式父 Tile 显示
 *  11. 瓦片共享（同 key 多层） + 离屏加载取消
 *  12. 300ms 淡入过渡动画
 *  13. WorkerPool 共享 Web Worker 池（GeoTIFF 解码卸载）
 *  14. DXFSource 入口预留（stub）
 */

import * as THREE from "three";
import {
  Engine,
  CGCS2000GKCRS,
  WebMercatorCRS,
  Proj4CRS,
  UTMCRS,
  CustomCRS,
  RasterLayer,
  VectorLayer,
  ProjectTileScheme,
  XYZTileScheme,
  XYZTileSource,
  GeoJSONSource,
  GeoTIFFSource,
  DEMSource,
  RasterRenderer,
  VectorRenderer,
  DefaultMaterialFactory,
  SubdividedPlane,
  DemMesh,
  SkirtedMesh,
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
  WorkerPool,
} from "@geo-engine/core";

// ═══════════════════════════════════════════════════════════════
// Data source: Checkerboard (same as Phase 1, but returns color only)
// ═══════════════════════════════════════════════════════════════

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
  ): Promise<CheckerTileData> {
    const [col, row] = key.id.split("-").map(Number);
    const isDark = (col + row) % 2 === 0;
    return { color: isDark ? "#2a3f5f" : "#3a5f7f", row, col };
  }

  dispose(): void {}
}

// ═══════════════════════════════════════════════════════════════
// Renderer: Checkerboard → THREE.Mesh with colored material
// ═══════════════════════════════════════════════════════════════

class CheckerboardRenderer implements ILayerRenderer<CheckerTileData> {
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

    const [xmin, ymin, xmax, ymax] = tile.bounds;
    const width = xmax - xmin;
    const height = ymax - ymin;

    const geometry = new THREE.PlaneGeometry(width, height);
    const cx = (xmin + xmax) / 2 - tile.origin.x;
    const cy = (ymin + ymax) / 2 - tile.origin.y;
    geometry.translate(cx, cy, 0);

    const material = new THREE.MeshBasicMaterial({
      color: new THREE.Color(data.color),
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.65,
    });

    const mesh = new THREE.Mesh(geometry, material);

    const ro = new RenderObject(mesh, (obj: unknown) => {
      const m = obj as THREE.Mesh;
      m.geometry.dispose();
      if (Array.isArray(m.material)) {
        for (const mat of m.material) mat.dispose();
      } else {
        m.material.dispose();
      }
    });

    content.renderObjects.push(ro);
    content.data = data;
    content.state = "ready";
    return content;
  }

  disposeContent(): void {}
}

// ═══════════════════════════════════════════════════════════════
// HUD
// ═══════════════════════════════════════════════════════════════

function updateHUD(
  crsName: string,
  x: number,
  y: number,
  zoom: number,
  tileCount: number,
  queueLen: number,
  loadingCount: number,
) {
  const el = (id: string) => document.getElementById(id)!;
  el("crs-name").textContent = crsName;
  el("crs-pos").textContent = `(${x.toFixed(0)}, ${y.toFixed(0)}) m`;
  el("crs-zoom").textContent = `${zoom.toFixed(1)} m/px`;
  el("tile-count").textContent = `${tileCount}`;
  el("scheduler-stats").textContent = `${queueLen} queued / ${loadingCount} loading`;
}

// ═══════════════════════════════════════════════════════════════
// Main
// ═══════════════════════════════════════════════════════════════

async function main() {
  const crs = new CGCS2000GKCRS(38);
  const app = document.getElementById("app")!;

  // ── Three.js setup ──────────────────────────────────────────
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x1a1a2e);
  app.appendChild(renderer.domElement);

  const scene = new THREE.Scene();

  // Orthographic camera: top-down 2D view
  const frustumSize = 2000; // default zoom in meters
  const camera = new THREE.OrthographicCamera();
  camera.position.z = 100;
  camera.lookAt(0, 0, 0);

  // Crosshair
  const crosshair = createCrosshair();
  scene.add(crosshair);

  // ── Sizing ─────────────────────────────────────────────────
  function size() {
    const cw = app.clientWidth;
    const ch = app.clientHeight;
    renderer.setSize(cw, ch, false);

    const aspect = cw / ch;
    camera.left = (-frustumSize * aspect) / 2;
    camera.right = (frustumSize * aspect) / 2;
    camera.top = frustumSize / 2;
    camera.bottom = -frustumSize / 2;
    camera.near = 0.1;
    camera.far = 1e6;
    camera.updateProjectionMatrix();
  }
  size();
  window.addEventListener("resize", size);

  // ── Layers ─────────────────────────────────────────────────
  // Layer 1: OSM basemap (XYZTileScheme)
  const osmScheme = new XYZTileScheme(crs, 0, 18);
  const osmSource = new XYZTileSource(
    "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    { minZoom: 0, maxZoom: 18 },
  );
  const osmRenderer = new RasterRenderer({
    name: "osm-renderer",
    quality: new SubdividedPlane(8), // 8×8 subdivision for accurate XYZ→GCJ38 reprojection
  });

  const osmLayer = new RasterLayer({
    name: "OSM Basemap",
    tileScheme: osmScheme,
    dataSource: osmSource,
    renderer: osmRenderer,
    zIndex: 0,
  });

  // Layer 2: Checkerboard overlay (ProjectTileScheme)
  const checkerScheme = new ProjectTileScheme(1000);
  const checkerSource = new CheckerboardSource(crs);
  const checkerRenderer = new CheckerboardRenderer();

  const checkerLayer = new RasterLayer({
    name: "Checkerboard",
    tileScheme: checkerScheme,
    dataSource: checkerSource,
    renderer: checkerRenderer,
    zIndex: 10,
  });

  // Layer 3: GeoJSON vector overlay (ProjectTileScheme)
  // Sample data in CGCS2000 GK38 coords around (500000, 3650000)
  const sampleGeoJSON = {
    type: "FeatureCollection",
    features: [
      // Roads (LineStrings)
      {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: [
            [499500, 3649500],
            [500500, 3649500],
            [500500, 3650500],
            [499500, 3650500],
            [499500, 3649500],
          ],
        },
        properties: { name: "Ring Road", highway: "primary" },
      },
      {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: [
            [500000, 3649000],
            [500000, 3651000],
          ],
        },
        properties: { name: "Main Street", highway: "secondary" },
      },
      {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: [
            [499000, 3650000],
            [501000, 3650000],
          ],
        },
        properties: { name: "East-West Ave", highway: "secondary" },
      },
      // Buildings (Polygons)
      {
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [499800, 3649800],
              [500000, 3649800],
              [500000, 3650000],
              [499800, 3650000],
              [499800, 3649800],
            ],
          ],
        },
        properties: { name: "Building A", floors: 3 },
      },
      {
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [500100, 3649700],
              [500300, 3649700],
              [500300, 3649900],
              [500100, 3649900],
              [500100, 3649700],
            ],
          ],
        },
        properties: { name: "Building B", floors: 5 },
      },
      {
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [499700, 3650100],
              [499900, 3650100],
              [499900, 3650300],
              [499700, 3650300],
              [499700, 3650100],
            ],
            // Hole (courtyard)
            [
              [499750, 3650150],
              [499850, 3650150],
              [499850, 3650250],
              [499750, 3650250],
              [499750, 3650150],
            ],
          ],
        },
        properties: { name: "Building C (with courtyard)", floors: 2 },
      },
      // Points of interest
      {
        type: "Feature",
        geometry: { type: "Point", coordinates: [500000, 3650000] },
        properties: { name: "City Center", type: "landmark" },
      },
      {
        type: "Feature",
        geometry: { type: "Point", coordinates: [500200, 3650200] },
        properties: { name: "Tower", type: "landmark" },
      },
      {
        type: "Feature",
        geometry: { type: "Point", coordinates: [499600, 3649600] },
        properties: { name: "Entrance", type: "gate" },
      },
    ],
  };

  const geoBlob = new Blob([JSON.stringify(sampleGeoJSON)], {
    type: "application/json",
  });
  const geoURL = URL.createObjectURL(geoBlob);

  const vectorSource = new GeoJSONSource(geoURL, crs);
  const vectorScheme = new ProjectTileScheme(500);
  const vectorMatFactory = new DefaultMaterialFactory({
    pointColor: 0xe74c3c, // red
    lineColor: 0xf39c12, // orange
    fillColor: 0x3498db, // blue
  });
  const vectorRenderer = new VectorRenderer(vectorMatFactory, "vector-renderer");

  const vectorLayer = new VectorLayer({
    name: "Sample Vectors",
    tileScheme: vectorScheme,
    dataSource: vectorSource,
    renderer: vectorRenderer,
    zIndex: 20,
  });

  // ── GeoTIFF Example (commented out — requires a .tif file) ─
  // const geoTiffSource = new GeoTIFFSource({
  //   url: "/data/ortho.tif",
  //   crs, // data CRS must match engine CRS (Phase 5 limitation)
  //   useWorker: true,  // Phase 8: offload decode to WorkerPool
  // });
  // // WorkerPool can also be used directly:
  // // const pool = new WorkerPool();
  // // const result = await pool.exec({ script: workerUrl, data: {...} });
  // const geoTiffScheme = new ProjectTileScheme(500);
  // const geoTiffRenderer = new RasterRenderer({
  //   name: "ortho-renderer",
  //   quality: new SubdividedPlane(4),
  // });
  // const geoTiffLayer = new RasterLayer({
  //   name: "Orthophoto",
  //   tileScheme: geoTiffScheme,
  //   dataSource: geoTiffSource,
  //   renderer: geoTiffRenderer,
  //   zIndex: 5,
  // });

  // ── DEM + Terrain Example (commented out — requires DEM .tif file) ─
  // const demSource = new DEMSource({ url: "/data/dem.tif", crs });
  // const demScheme = new ProjectTileScheme(500);
  //
  // // Build elevation sampler from DEM data:
  // //   const demData = await demSource.fetch(key, bounds);
  // //   const sampler = (x: number, y: number) => bilinearSample(demData, ...)
  //
  // // Flat terrain with DemMesh:
  // // const demRenderer = new RasterRenderer({
  // //   name: "dem-renderer",
  // //   quality: new DemMesh(sampler, 4),
  // // });
  //
  // // With LOD crack prevention (SkirtedMesh):
  // // const demRenderer = new RasterRenderer({
  // //   name: "dem-renderer",
  // //   quality: new SkirtedMesh(sampler, 4, 100),
  // // });

  // ── Tile load callback ─────────────────────────────────────
  const tileLoadFn: TileLoadCallback = async (tile, layer, signal) => {
    const source = layer.dataSource;
    const renderer = layer.renderer;
    const data = await source.fetch(tile.key, tile.bounds, signal);
    if (signal.aborted) return null;
    return renderer.createContent(data, tile);
  };

  // ── Engine ─────────────────────────────────────────────────
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
        layers: [osmLayer, checkerLayer, vectorLayer],
      },
    ],
    cameraController: new MapCameraController({
      x: 500000,
      y: 3650000,
      zoom: 10,
    }),
  });

  engine.start();

  // ── Scene sync ─────────────────────────────────────────────
  // 跟踪已添加到场景的 tile group
  const sceneTiles = new Map<string, THREE.Group>();

  function syncScene() {
    const loaded = engine.tileManager.loadedTiles;
    const origin = engine.floatingOrigin.current;

    // 添加新 tile
    for (const [key, tile] of loaded) {
      if (sceneTiles.has(key)) continue;
      if (tile.contents.length === 0) continue;

      const group = new THREE.Group();
      let hasObjects = false;

      for (const content of tile.contents) {
        for (const ro of content.renderObjects) {
          if (ro.object instanceof THREE.Object3D) {
            // Take ownership — move object from RenderObject to scene group
            group.add(ro.object);
            hasObjects = true;
          }
        }
      }

      if (!hasObjects) continue;

      // 定位 group 于 tile origin（局部坐标 = CRS - floating origin）
      group.position.set(
        tile.origin.x - origin.x,
        tile.origin.y - origin.y,
        0,
      );

      scene.add(group);
      sceneTiles.set(key, group);

      // 设置初始 opacity = 0（淡入动画起点）
      group.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          const mat = child.material as THREE.Material;
          if ("opacity" in mat && "transparent" in mat) {
            (mat as THREE.MeshBasicMaterial).opacity = 0;
            mat.transparent = true;
          }
        }
      });
      // 存储 content 引用用于淡入动画
      (group as any).__fadeContent = tile.contents[0];
    }

    // 移除淘汰的 tile（GPU 资源已由 Tile.dispose 释放，此处只从场景移除）
    for (const [key, group] of sceneTiles) {
      if (!loaded.has(key)) {
        scene.remove(group);
        sceneTiles.delete(key);
      }
    }
  }

  // ── Render loop ────────────────────────────────────────────
  function render() {
    const cam = engine.cameraController as MapCameraController;
    const origin = engine.floatingOrigin.current;

    // Update ortho camera frustum to match map zoom
    const cw = app.clientWidth;
    const ch = app.clientHeight;
    const aspect = cw / ch;
    const halfH = cam.zoom * ch / 2;
    const halfW = halfH * aspect;

    camera.left = -halfW;
    camera.right = halfW;
    camera.top = halfH;
    camera.bottom = -halfH;
    camera.updateProjectionMatrix();

    // Move camera to follow map position (in floating-origin space)
    camera.position.set(
      cam.cameraWorldPos.x - origin.x,
      cam.cameraWorldPos.y - origin.y,
      camera.position.z,
    );

    // Sync tile meshes
    syncScene();

    // Render
    renderer.render(scene, camera);

    // ── Fade-in animation (300ms) ─────────────────────────
    const FADE_DURATION = 300;
    const now = performance.now();
    for (const [, group] of sceneTiles) {
      const content = (group as any).__fadeContent;
      if (!content) continue;
      const elapsed = now - content.createdAt;
      if (elapsed >= FADE_DURATION) {
        // Fully visible — remove fade tracking
        delete (group as any).__fadeContent;
        group.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            const mat = child.material as THREE.MeshBasicMaterial;
            if ("opacity" in mat) mat.opacity = 1;
          }
        });
        continue;
      }
      const opacity = Math.min(1, elapsed / FADE_DURATION);
      group.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          const mat = child.material as THREE.MeshBasicMaterial;
          if ("opacity" in mat) mat.opacity = opacity;
        }
      });
    }

    // HUD
    updateHUD(
      crs.name,
      cam.cameraWorldPos.x,
      cam.cameraWorldPos.y,
      cam.zoom,
      engine.tileManager.loadedTiles.size,
      engine.tileManager.scheduler.queueLength,
      engine.tileManager.scheduler.loadingCount,
    );

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

// ═══════════════════════════════════════════════════════════════
// Helpers
// ═══════════════════════════════════════════════════════════════

function createCrosshair(): THREE.Line {
  const size = 16;
  const material = new THREE.LineBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.25,
  });

  const hPoints = [new THREE.Vector3(-size, 0, 0), new THREE.Vector3(size, 0, 0)];
  const vPoints = [new THREE.Vector3(0, -size, 0), new THREE.Vector3(0, size, 0)];

  const hGeo = new THREE.BufferGeometry().setFromPoints(hPoints);
  const vGeo = new THREE.BufferGeometry().setFromPoints(vPoints);

  const group = new THREE.Group();
  group.add(new THREE.Line(hGeo, material));
  group.add(new THREE.Line(vGeo, material));
  group.position.z = 90; // just below camera

  return group as unknown as THREE.Line; // Group extends Object3D, cast for return type
}

main();
