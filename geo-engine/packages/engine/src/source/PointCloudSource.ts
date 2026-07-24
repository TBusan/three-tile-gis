// geo-engine/packages/engine/src/source/PointCloudSource.ts

import type { CrsBounds } from "../core/types";
import type { IProjectCRS } from "../crs/IProjectCRS";
import type { TileKey } from "../tile/TileKey";
import type { IDataSource } from "./IDataSource";

/** 点云实体占位类型 */
export interface PointCloudEntity {
  positions: Float32Array;
  colors?: Float32Array;
  intensities?: Float32Array;
}

/**
 * 点云数据源（占位实现）
 *
 * 支持 .las / .laz / .ply 等格式的流式读取与滤波。
 * 后续实现将支持八叉树 LOD（远处稀疏采样，近处原始密度）。
 */
export class PointCloudSource implements IDataSource<PointCloudEntity> {
  readonly dataType = "pointcloud";
  readonly crs: IProjectCRS;
  readonly bounds: CrsBounds;

  constructor(_url: string, crs: IProjectCRS) {
    this.crs = crs;
    this.bounds = [0, 0, 0, 0];
  }

  async fetch(
    _key: TileKey,
    _tileBounds: CrsBounds,
    _signal?: AbortSignal,
  ): Promise<PointCloudEntity> {
    throw new Error(
      "PointCloudSource: not implemented — coming in a future release",
    );
  }

  dispose(_data: PointCloudEntity): void {
    // no-op
  }
}
