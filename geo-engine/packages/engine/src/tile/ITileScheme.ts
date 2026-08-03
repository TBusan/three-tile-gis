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

  /** Scheme 唯一标识 — 用于 TileKey 命名空间（XYZ 为 "xyz"，Project 为 "project-<size>"） */
  readonly schemeId: string;

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

  /**
   * 可选：获取瓦片的重投影函数（设计文档 §3.5）
   *
   * 返回的函数将归一化瓦片坐标 (u,v ∈ [0,1]) 映射到 CRS 平面坐标：
   *   - u: 0 = 瓦片西边界，1 = 东边界
   *   - v: 0 = 瓦片南边界，1 = 北边界
   *
   * XYZTileScheme 实现此方法（3857 → 目标 CRS 逐顶点重投影），
   * ProjectTileScheme 不需要（瓦片本身就是 CRS 矩形）。
   *
   * @returns 重投影函数，或 null/undefined 表示不需要重投影
   */
  getReprojector?(
    key: TileKey,
  ): ((u: number, v: number) => { x: number; y: number }) | null;

  /**
   * 当前稳定的 tile 级别（可选）。
   *
   * XYZTileScheme 返回当前稳定 zoom；ProjectTileScheme 返回当前稳定 level。
   * TileManager 用它检测级别切换并触发 LOD 淘汰；
   * 未实现（或尚无稳定级别）时视为不支持级别切换。
   */
  readonly currentZoom?: number | null;
}
