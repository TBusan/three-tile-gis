// geo-engine/packages/engine/src/layer/ILayer.ts

import type { IProjectCRS } from "../crs/IProjectCRS";
import type { TileKey } from "../tile/TileKey";
import type { ITileScheme } from "../tile/ITileScheme";
import type { IDataSource } from "../source/IDataSource";
import type { ILayerRenderer } from "../renderer/ILayerRenderer";
import type { CrsBounds } from "../core/types";

/** 图层类型 */
export type LayerType = "raster" | "vector" | "volume" | "pointcloud" | "dem";

/**
 * 图层接口
 *
 * Layer 是胶水 — 组合 TileScheme、DataSource、Renderer 三个独立组件。
 * 每个 Layer 对应一种数据类型，共享同一个 TileScheme 的 Tile。
 */
export interface ILayer {
  readonly id: string;
  readonly name: string;
  readonly type: LayerType;
  visible: boolean;
  opacity: number;
  zIndex: number;

  readonly tileScheme: ITileScheme;
  readonly dataSource: IDataSource;
  readonly renderer: ILayerRenderer;

  /**
   * 本层依赖的其他 Layer
   * TileManager 保证依赖 Layer 的同 key Tile 先加载完成
   */
  readonly dependsOn: ILayer[];

  /**
   * 获取视锥范围内的可见 TileKey
   * @param extent — CRS 空间视野范围
   * @param crs — 当前工程坐标系
   * @param resolution — 可选，当前分辨率（米/像素），用于选择合适的 tile 级别
   */
  getVisibleTiles(
    extent: CrsBounds,
    crs: IProjectCRS,
    resolution?: number,
  ): TileKey[];
}
