// geo-engine/packages/engine/src/tile/XYZTileScheme.ts

import type { CrsBounds } from "../core/types";
import type { IProjectCRS } from "../crs/IProjectCRS";
import { WebMercatorCRS } from "../crs/WebMercator";
import type { TileKey } from "./TileKey";
import { makeTileKey } from "./TileKey";
import type { ITileScheme } from "./ITileScheme";

/**
 * XYZ 分块方案 — Web Mercator 四叉树分块
 *
 * 将 EPSG:3857 空间的 XYZ 瓦片坐标映射到目标 CRS 空间。
 *
 * 使用标准 TMS 约定：
 *   - x: 0 → 2^z - 1（西 → 东）
 *   - y: 0 → 2^z - 1（北 → 南）
 *
 * 工作原理：
 *   1. getTilesInView: 目标 CRS 视野 → lon/lat → 3857m → 确定 zoom → 计算 x/y 范围
 *   2. getTileBounds: z/x/y → 3857m 瓦片范围 → 采样 → lon/lat → 目标 CRS 包围盒
 *
 * @param targetCrs — 目标（Engine）坐标系，用于坐标转换
 * @param minZoom — 最小 zoom 级别（默认 0）
 * @param maxZoom — 最大 zoom 级别（默认 18）
 */
export class XYZTileScheme implements ITileScheme {
  readonly name: string;
  private readonly schemeId = "xyz";
  private readonly targetCrs: IProjectCRS;
  readonly minZoom: number;
  readonly maxZoom: number;

  /** Web Mercator 世界范围常量 */
  private static readonly WORLD_HALF = Math.PI * WebMercatorCRS["R"]; // ≈ 20037508.34m
  private static readonly WORLD_SIZE = 2 * XYZTileScheme.WORLD_HALF; // ≈ 40075016.68m

  /** 包围盒采样分辨率 */
  private static readonly SAMPLE_GRID = 5;

  constructor(targetCrs: IProjectCRS, minZoom = 0, maxZoom = 18) {
    this.targetCrs = targetCrs;
    this.minZoom = minZoom;
    this.maxZoom = maxZoom;
    this.name = `XYZTileScheme(${targetCrs.name})`;
  }

  /** 指定 zoom 级别每个 tile 在 3857 空间中的边长（米） */
  tileSizeAtZoom(z: number): number {
    return XYZTileScheme.WORLD_SIZE / Math.pow(2, z);
  }

  // ---- ITileScheme ----

  getTilesInView(extent: CrsBounds, crs: IProjectCRS): TileKey[] {
    const targetCrs = crs;

    // 1. 采样 extent 角点和中点 → lon/lat
    const [x0, y0, x1, y1] = extent;
    const samplePts: Array<{ x: number; y: number }> = [
      { x: x0, y: y0 },
      { x: x1, y: y0 },
      { x: x0, y: y1 },
      { x: x1, y: y1 },
      { x: (x0 + x1) / 2, y: (y0 + y1) / 2 },
    ];

    // 2. lon/lat → 3857 米
    const wm = new WebMercatorCRS();
    const mercPoints: Array<{ x: number; y: number }> = [];
    for (const pt of samplePts) {
      const geo = targetCrs.unproject(pt.x, pt.y);
      const mp = wm.project(geo.lon, geo.lat);
      mercPoints.push(mp);
    }

    // 3. 计算 3857 包围盒
    let minX = Infinity,
      minY = Infinity,
      maxX = -Infinity,
      maxY = -Infinity;
    for (const mp of mercPoints) {
      if (mp.x < minX) minX = mp.x;
      if (mp.y < minY) minY = mp.y;
      if (mp.x > maxX) maxX = mp.x;
      if (mp.y > maxY) maxY = mp.y;
    }

    // 4. 确定 zoom 级别
    const viewWidth = maxX - minX;
    const z = this._pickZoom(viewWidth);

    // 5. 计算 x/y 范围
    const { WORLD_HALF, WORLD_SIZE } = XYZTileScheme;
    const tileSize = WORLD_SIZE / Math.pow(2, z);
    const nTiles = Math.pow(2, z);

    const xMin = Math.max(0, Math.floor((minX + WORLD_HALF) / tileSize));
    const xMax = Math.min(nTiles - 1, Math.floor((maxX + WORLD_HALF) / tileSize));
    // TMS: y=0 at top (north), y increases downward
    const yMin = Math.max(0, Math.floor((WORLD_HALF - maxY) / tileSize));
    const yMax = Math.min(nTiles - 1, Math.floor((WORLD_HALF - minY) / tileSize));

    const keys: TileKey[] = [];
    for (let y = yMin; y <= yMax; y++) {
      for (let x = xMin; x <= xMax; x++) {
        keys.push(makeTileKey(this.schemeId, `${z}/${x}/${y}`, z));
      }
    }
    return keys;
  }

  getTileBounds(key: TileKey): CrsBounds {
    if (key.schemeId !== this.schemeId) {
      throw new Error(
        `TileKey scheme mismatch: expected "${this.schemeId}", got "${key.schemeId}"`,
      );
    }

    const { z, x, y } = this._parseId(key.id);
    const { WORLD_HALF, WORLD_SIZE, SAMPLE_GRID } = XYZTileScheme;

    // EPSG:3857 tile 范围
    const tileSize = WORLD_SIZE / Math.pow(2, z);
    const wmXmin = -WORLD_HALF + x * tileSize;
    const wmXmax = wmXmin + tileSize;
    // TMS: y increases downward (north → south)
    const wmYmax = WORLD_HALF - y * tileSize; // 北边界
    const wmYmin = wmYmax - tileSize; // 南边界

    // 采样 N×N 网格 → lon/lat → 目标 CRS → 计算包围盒
    const wm = new WebMercatorCRS();
    let minX = Infinity,
      minY = Infinity,
      maxX = -Infinity,
      maxY = -Infinity;

    const dx = tileSize / (SAMPLE_GRID - 1);
    const dy = tileSize / (SAMPLE_GRID - 1);

    for (let i = 0; i < SAMPLE_GRID; i++) {
      for (let j = 0; j < SAMPLE_GRID; j++) {
        const sx = wmXmin + i * dx;
        const sy = wmYmin + j * dy;
        const geo = wm.unproject(sx, sy);
        const crsPt = this.targetCrs.project(geo.lon, geo.lat);
        if (crsPt.x < minX) minX = crsPt.x;
        if (crsPt.y < minY) minY = crsPt.y;
        if (crsPt.x > maxX) maxX = crsPt.x;
        if (crsPt.y > maxY) maxY = crsPt.y;
      }
    }

    return [minX, minY, maxX, maxY];
  }

  getParentKey(key: TileKey): TileKey | null {
    if (key.level <= this.minZoom) return null;
    const { z, x, y } = this._parseId(key.id);
    const pz = z - 1;
    return makeTileKey(
      this.schemeId,
      `${pz}/${Math.floor(x / 2)}/${Math.floor(y / 2)}`,
      pz,
    );
  }

  getChildKeys(key: TileKey): TileKey[] {
    const { z, x, y } = this._parseId(key.id);
    const cz = z + 1;
    const bx = x * 2;
    const by = y * 2;
    const children: TileKey[] = [];
    for (let dy = 0; dy < 2; dy++) {
      for (let dx = 0; dx < 2; dx++) {
        children.push(
          makeTileKey(this.schemeId, `${cz}/${bx + dx}/${by + dy}`, cz),
        );
      }
    }
    return children;
  }

  // ---- private ----

  /**
   * 根据视野宽度选择合适的 zoom 级别
   *
   * 目标：让视野横向约显示 4 个 tile
   */
  private _pickZoom(viewWidth: number): number {
    if (viewWidth <= 0) return this.maxZoom;

    const { WORLD_SIZE } = XYZTileScheme;
    // numTiles = viewWidth / (WORLD_SIZE / 2^z) = viewWidth * 2^z / WORLD_SIZE
    // 2^z = 4 * WORLD_SIZE / viewWidth
    const targetZ = Math.log2((4 * WORLD_SIZE) / viewWidth);
    return Math.max(this.minZoom, Math.min(this.maxZoom, Math.round(targetZ)));
  }

  private _parseId(id: string): { z: number; x: number; y: number } {
    const parts = id.split("/");
    if (parts.length !== 3) {
      throw new Error(`Invalid XYZ tile id: "${id}" (expected "z/x/y")`);
    }
    return {
      z: parseInt(parts[0], 10),
      x: parseInt(parts[1], 10),
      y: parseInt(parts[2], 10),
    };
  }
}
