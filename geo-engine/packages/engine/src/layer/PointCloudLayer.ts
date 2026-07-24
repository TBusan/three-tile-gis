// geo-engine/packages/engine/src/layer/PointCloudLayer.ts

import type { IProjectCRS } from "../crs/IProjectCRS";
import type { CrsBounds } from "../core/types";
import type { TileKey } from "../tile/TileKey";
import type { ITileScheme } from "../tile/ITileScheme";
import type { IDataSource } from "../source/IDataSource";
import type { ILayerRenderer } from "../renderer/ILayerRenderer";
import type { ILayer, LayerType } from "./ILayer";

/** PointCloudLayer 构造选项 */
export interface PointCloudLayerOptions {
  id?: string;
  name: string;
  type?: LayerType;
  tileScheme: ITileScheme;
  dataSource: IDataSource;
  renderer: ILayerRenderer;
  visible?: boolean;
  opacity?: number;
  zIndex?: number;
  dependsOn?: ILayer[];
}

/**
 * 点云图层 — 组合 TileScheme + PointCloudSource + PointCloudRenderer
 *
 * 后续实现将支持：
 *   - LAS/LAZ 格式加载
 *   - 八叉树 LOD 调度
 *   - GPU 端实时渲染
 *
 * 用法：
 *   const layer = new PointCloudLayer({
 *     name: "点云",
 *     tileScheme: new ProjectTileScheme(500),
 *     dataSource: new PointCloudSource("./cloud.las", crs),
 *     renderer: new PointCloudRenderer(),
 *   });
 */
export class PointCloudLayer implements ILayer {
  readonly id: string;
  readonly name: string;
  readonly type: LayerType;
  visible: boolean;
  opacity: number;
  zIndex: number;
  readonly tileScheme: ITileScheme;
  readonly dataSource: IDataSource;
  readonly renderer: ILayerRenderer;
  readonly dependsOn: ILayer[];

  constructor(options: PointCloudLayerOptions) {
    this.id = options.id ?? `pointcloud-${++PointCloudLayer._nextId}`;
    this.name = options.name;
    this.type = options.type ?? "pointcloud";
    this.tileScheme = options.tileScheme;
    this.dataSource = options.dataSource;
    this.renderer = options.renderer;
    this.visible = options.visible ?? true;
    this.opacity = options.opacity ?? 1;
    this.zIndex = options.zIndex ?? 0;
    this.dependsOn = options.dependsOn ?? [];
  }

  getVisibleTiles(
    extent: CrsBounds,
    crs: IProjectCRS,
    resolution?: number,
  ): TileKey[] {
    if (!this.visible) return [];
    return this.tileScheme.getTilesInView(extent, crs, resolution);
  }

  private static _nextId = 0;
}
