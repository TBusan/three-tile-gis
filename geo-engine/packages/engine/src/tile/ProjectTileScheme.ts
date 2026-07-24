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
  private readonly schemeId: string;

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

  getTilesInView(extent: CrsBounds, crs: IProjectCRS): TileKey[] {
    // 暂用第 0 级（最细）；后续可扩展为多级自适应
    return this._getTilesAtLevel(extent, 0);
  }

  getTileBounds(key: TileKey): CrsBounds {
    if (key.schemeId !== this.schemeId) {
      throw new Error(
        `TileKey scheme mismatch: expected "${this.schemeId}", got "${key.schemeId}"`,
      );
    }

    const [col, row] = this._parseId(key.id);
    const size = this.tileSizeAtLevel(key.level);
    const xmin = col * size;
    const ymin = -(row + 1) * size;
    const xmax = (col + 1) * size;
    const ymax = -row * size;

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

    const keys: TileKey[] = [];
    for (let row = rowMin; row <= rowMax; row++) {
      for (let col = colMin; col <= colMax; col++) {
        keys.push(makeTileKey(this.schemeId, `${col}-${row}`, level));
      }
    }
    return keys;
  }

  private _parseId(id: string): [number, number] {
    const parts = id.split("-");
    if (parts.length !== 2) {
      throw new Error(`Invalid ProjectTileKey id: "${id}"`);
    }
    return [parseInt(parts[0], 10), parseInt(parts[1], 10)];
  }
}
