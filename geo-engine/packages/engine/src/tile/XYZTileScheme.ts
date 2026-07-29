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
  readonly schemeId = "xyz";
  private readonly targetCrs: IProjectCRS;
  readonly minZoom: number;
  readonly maxZoom: number;

  /** Web Mercator 世界范围常量 */
  private static readonly WORLD_HALF = Math.PI * WebMercatorCRS["R"]; // ≈ 20037508.34m
  private static readonly WORLD_SIZE = 2 * XYZTileScheme.WORLD_HALF; // ≈ 40075016.68m

  /** 包围盒采样分辨率 */
  private static readonly SAMPLE_GRID = 5;

  /** 单次 getTilesInView 返回的最大瓦片数 — 防止极端视野下生成过多瓦片导致卡顿 */
  private static readonly MAX_TILES_PER_VIEW = 512;

  /** 稳定的 zoom 级别（带迟滞，防止边界振荡） */
  private _stableZoom: number | null = null;

  /** 获取当前稳定的 zoom 级别（供 TileManager 做级别切换淘汰） */
  get currentZoom(): number | null {
    return this._stableZoom;
  }

  /** 缓存的 WebMercator 实例（避免每次调用重新分配） */
  private readonly _wm = new WebMercatorCRS();

  /** getTileBounds 结果缓存（同一 z/x/y 的包围盒是确定性的，无需重复计算） */
  private readonly _boundsCache = new Map<string, CrsBounds>();
  private static readonly BOUNDS_CACHE_MAX = 1024;

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

  getTilesInView(
    extent: CrsBounds,
    crs: IProjectCRS,
    _resolution?: number,
  ): TileKey[] {
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
    const wm = this._wm;
    const mercPoints: Array<{ x: number; y: number }> = [];
    for (const pt of samplePts) {
      const geo = targetCrs.unproject(pt.x, pt.y);
      // 钳位经/纬度到有效范围，过滤投影域外的无效坐标
      if (isNaN(geo.lon) || isNaN(geo.lat)) continue;
      const lon = Math.max(-180, Math.min(180, geo.lon));
      const lat = Math.max(-85.06, Math.min(85.06, geo.lat));
      const mp = wm.project(lon, lat);
      mercPoints.push(mp);
    }
    // 所有采样点都在投影域外 → 无可见 tile
    if (mercPoints.length === 0) return [];

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
        // 安全帽：超过上限时停止生成（防止极端视野下生成数千瓦片）
        if (keys.length >= XYZTileScheme.MAX_TILES_PER_VIEW) return keys;
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

    // 缓存命中 → 直接返回（同一 z/x/y 的包围盒是确定性的）
    const cached = this._boundsCache.get(key.id);
    if (cached) return cached;

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
    const wm = this._wm;
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

    const result: CrsBounds = [minX, minY, maxX, maxY];

    // 写入缓存（超过上限时清空重建，简单高效）
    if (this._boundsCache.size >= XYZTileScheme.BOUNDS_CACHE_MAX) {
      this._boundsCache.clear();
    }
    this._boundsCache.set(key.id, result);

    return result;
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

  /**
   * 重投影函数（设计文档 §3.5）
   *
   * 将归一化瓦片坐标 (u,v) 映射到目标 CRS 平面坐标：
   *   (u,v) → 3857 米坐标 → lon/lat → 目标 CRS
   *
   * u: 0 = 瓦片西边界，1 = 东边界
   * v: 0 = 瓦片南边界，1 = 北边界（与 Three.js UV 约定一致：纹理底部 = 南侧）
   */
  getReprojector(
    key: TileKey,
  ): ((u: number, v: number) => { x: number; y: number }) | null {
    const { z, x, y } = this._parseId(key.id);
    const { WORLD_HALF, WORLD_SIZE } = XYZTileScheme;

    // EPSG:3857 空间中瓦片的精确范围
    const tileSize = WORLD_SIZE / Math.pow(2, z);
    const wmXmin = -WORLD_HALF + x * tileSize;
    // y=0 在北端（Google/OSM 约定），南边界 = 北边界 - tileSize
    const wmYmax = WORLD_HALF - y * tileSize;
    const wmYmin = wmYmax - tileSize;

    const wm = this._wm;
    const crs = this.targetCrs;

    return (u: number, v: number) => {
      const mx = wmXmin + u * tileSize;
      const my = wmYmin + v * tileSize;
      const geo = wm.unproject(mx, my);
      return crs.project(geo.lon, geo.lat);
    };
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
    const targetZ = Math.log2((4 * WORLD_SIZE) / viewWidth);
    const idealZ = Math.round(targetZ);

    // 迟滞（hysteresis）：防止 zoom 在相邻级别间反复振荡
    // 当 targetZ 在两级 boundary ±0.3 内时，保持上一帧的 zoom 级别
    if (this._stableZoom !== null) {
      const diff = idealZ - this._stableZoom;
      if (Math.abs(diff) === 1) {
        const boundary = this._stableZoom + diff * 0.5;
        if (Math.abs(targetZ - boundary) < 0.3) {
          return this._stableZoom;
        }
      }
    }

    const z = Math.max(this.minZoom, Math.min(this.maxZoom, idealZ));
    this._stableZoom = z;
    return z;
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
