// geo-engine/packages/engine/src/tile/ProjectTileScheme.ts

import type { CrsBounds, CrsCoord } from "../core/types";
import type { IProjectCRS } from "../crs/IProjectCRS";
import type { TileKey } from "./TileKey";
import { makeTileKey, tileKeyToString, tileKeyEquals } from "./TileKey";
import type { ITileScheme } from "./ITileScheme";

/**
 * 工程分块方案 — 按固定米数划分 CRS 平面空间
 *
 * 不涉及投影转换，直接在 CRS 平面坐标系下按 tileSize 米
 * 划分网格。每级 tileSize 加倍（四叉树方式）。
 *
 * 适用：GeoTIFF、DEM、DXF 等工程数据叠加层
 */
export class ProjectTileScheme implements ITileScheme {
  /** 第一级 tileSize（米），每级加倍 */
  readonly baseTileSize: number;
  readonly name: string;
  readonly schemeId: string;

  /** 上一次确认的稳定 level（带迟滞，供 TileManager 做级别切换淘汰） */
  private _stableLevel: number | null = null;

  /** 获取当前稳定的 level 级别 */
  get currentZoom(): number | null {
    return this._stableLevel;
  }

  /**
   * @param baseTileSize — 第 0 级的 tile 边长（米）
   */
  constructor(baseTileSize: number) {
    this.baseTileSize = baseTileSize;
    this.schemeId = `project-${baseTileSize}`;
    this.name = `ProjectTileScheme(${baseTileSize}m)`;
  }

  /** 获取指定 level 的 tile 边长 */
  tileSizeAtLevel(level: number): number {
    return this.baseTileSize * Math.pow(2, level);
  }

  getTilesInView(
    extent: CrsBounds,
    _crs: IProjectCRS,
    resolution?: number,
  ): TileKey[] {
    const level = this.pickLevel(resolution ?? 0);
    return this._getTilesAtLevel(extent, level);
  }

  /**
   * 根据分辨率选择合适的 tile 级别（LOD）
   *
   * 目标：让每个 tile 在屏幕上约占 TARGET_PIXELS 像素。
   * level 0 = baseTileSize 米/tile（最细），每增加 1 级 tile 大小加倍（越粗）。
   *
   * 推导：希望 tileSizeAtLevel(level) ≈ idealTileSize
   *   baseTileSize × 2^level ≈ resolution × TARGET_PIXELS
   *   => level ≈ log2(idealTileSize / baseTileSize)
   * 远相机 resolution 大 → idealTileSize 大 → level 高 → 粗瓦片 → 数量少（正确的 LOD 方向）。
   *
   * @param resolution — 当前分辨率（米/像素），0 表示未指定（返回第 0 级）
   */
  pickLevel(resolution: number): number {
    if (resolution <= 0) return 0;
    const TARGET_PIXELS = 256;
    const idealTileSize = resolution * TARGET_PIXELS;
    const ideal = Math.log2(idealTileSize / this.baseTileSize);
    const level = Math.round(ideal);

    // 迟滞（hysteresis）：与 XYZTileScheme 一致，防止级别在相邻档位间反复振荡
    if (this._stableLevel !== null) {
      const diff = level - this._stableLevel;
      if (Math.abs(diff) === 1) {
        const boundary = this._stableLevel + diff * 0.5;
        if (Math.abs(ideal - boundary) < 0.3) {
          return this._stableLevel;
        }
      }
    }

    // 上下限保护：最低 0，最高 20（防止极端分辨率下 tileSize 指数爆炸）
    const clamped = Math.max(0, Math.min(20, level));
    this._stableLevel = clamped;
    return clamped;
  }

  getTileBounds(key: TileKey): CrsBounds {
    if (key.schemeId !== this.schemeId) {
      throw new Error(
        `TileKey scheme mismatch: expected "${this.schemeId}", got "${key.schemeId}"`,
      );
    }

    const [col, row] = this._parseId(key.id);
    const size = this.tileSizeAtLevel(key.level);
    // 与 _getTilesAtLevel 中 row = floor(y / size) 保持一致：
    // row 直接对应 y 正向（北向），不取反
    const xmin = col * size;
    const ymin = row * size;
    const xmax = (col + 1) * size;
    const ymax = (row + 1) * size;

    return [xmin, ymin, xmax, ymax];
  }

  getParentKey(key: TileKey): TileKey | null {
    if (key.level <= 0) return null;
    const [col, row] = this._parseId(key.id);
    return makeTileKey(
      this.schemeId,
      `${Math.floor(col / 2)}-${Math.floor(row / 2)}`,
      key.level - 1,
    );
  }

  getChildKeys(key: TileKey): TileKey[] {
    const [col, row] = this._parseId(key.id);
    const baseCol = col * 2;
    const baseRow = row * 2;
    const children: TileKey[] = [];
    for (let dr = 0; dr < 2; dr++) {
      for (let dc = 0; dc < 2; dc++) {
        children.push(
          makeTileKey(
            this.schemeId,
            `${baseCol + dc}-${baseRow + dr}`,
            key.level + 1,
          ),
        );
      }
    }
    return children;
  }

  /**
   * 将 CRS 坐标点对齐到最近的 tile 原点（左下角，取整到 baseTileSize）
   */
  snapOrigin(world: CrsCoord): CrsCoord {
    const size = this.baseTileSize;
    return {
      x: Math.floor(world.x / size) * size,
      y: Math.floor(world.y / size) * size,
      z: 0,
    };
  }

  // ---- private ----

  /** 单层最大瓦片数 — 超限则递归升 level 使用更粗粒度 LOD */
  private static readonly MAX_TILES_PER_LAYER = 4096;

  private _getTilesAtLevel(extent: CrsBounds, level: number): TileKey[] {
    const size = this.tileSizeAtLevel(level);
    // 在 CRS 平面中，row 索引 y 向（北向）
    // col = floor(x / size), row = floor(y / size)
    const xMin = extent[0];
    const yMin = extent[1];
    const xMax = extent[2];
    const yMax = extent[3];

    const colMin = Math.floor(xMin / size);
    const colMax = Math.floor(xMax / size);
    const rowMin = Math.floor(yMin / size);
    const rowMax = Math.floor(yMax / size);

    const nCols = colMax - colMin + 1;
    const nRows = rowMax - rowMin + 1;

    // 超限 → 升一级 LOD（瓦片更大、数量更少），递归直到满足上限
    // 这比裁切 extent 更好：用户不会看到视野边缘的瓦片"消失"，
    // 只是远距离时使用更粗粒度的 LOD。
    if (nCols * nRows > ProjectTileScheme.MAX_TILES_PER_LAYER) {
      // 同步 _stableLevel：currentZoom 必须反映「实际渲染的级别」。
      // 否则 TileManager 的 LOD 淘汰会把这些渲染中的瓦片当成旧级别，
      // 5s 后强制删除且（视野未变化时）不重载 → 白屏。
      this._stableLevel = level + 1;
      return this._getTilesAtLevel(extent, level + 1);
    }

    const keys: TileKey[] = [];
    for (let row = rowMin; row <= rowMax; row++) {
      for (let col = colMin; col <= colMax; col++) {
        keys.push(makeTileKey(this.schemeId, `${col}-${row}`, level));
      }
    }
    return keys;
  }

  private _parseId(id: string): [number, number] {
    // 使用正则而非 split("-")：瓦片索引在 CRS 负半轴可为负数（如 "-1-11"），
    // split("-") 会把 "-1-11" 拆成 ["", "1", "11"] 导致误报。
    const m = /^(-?\d+)-(-?\d+)$/.exec(id);
    if (!m) {
      throw new Error(`Invalid ProjectTileKey id: "${id}"`);
    }
    return [parseInt(m[1], 10), parseInt(m[2], 10)];
  }
}
