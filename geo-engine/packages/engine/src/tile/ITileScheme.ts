// geo-engine/packages/engine/src/tile/ITileScheme.ts

import type { CrsBounds } from "../core/types";
import type { IProjectCRS } from "../crs/IProjectCRS";
import type { TileKey } from "./TileKey";

/**
 * 分块方案接口
 *
 * 定义如何将连续的 CRS 空间划分成离散的 Tile。
 * 不同实现对应不同的分块策略（XYZ 四叉树、Project 固定米网格等）。
 */
export interface ITileScheme {
  readonly name: string;

  /**
   * 给定 CRS 视野范围，返回所有可见的 TileKey
   *
   * @param extent — CRS 空间中的视野范围 [xmin, ymin, xmax, ymax]
   * @param crs — 当前工程坐标系
   * @param resolution — 可选，当前分辨率（米/像素），用于选择合适的 tile 级别
   */
  getTilesInView(
    extent: CrsBounds,
    crs: IProjectCRS,
    resolution?: number,
  ): TileKey[];

  /**
   * 给定 TileKey，返回 CRS 空间包围盒
   */
  getTileBounds(key: TileKey): CrsBounds;

  /**
   * 获取父 TileKey（更粗一级），没有则返回 null
   */
  getParentKey(key: TileKey): TileKey | null;

  /**
   * 获取子 TileKey 列表（更细一级）
   */
  getChildKeys(key: TileKey): TileKey[];
}
