// geo-engine/packages/engine/src/source/GPRSource.ts

import type { CrsBounds } from "../core/types";
import type { IProjectCRS } from "../crs/IProjectCRS";
import type { TileKey } from "../tile/TileKey";
import type { IDataSource } from "./IDataSource";

/** 体素网格占位类型 */
export interface VoxelGrid {
  /** 3D 体素数据 (Float32Array 扁平化: z * (nx*ny) + y * nx + x) */
  data: Float32Array;
  /** 体素尺寸 (nx, ny, nz) */
  dimensions: [number, number, number];
  /** 空间包围盒 [minX, minY, minZ, maxX, maxY, maxZ] */
  bounds: [number, number, number, number, number, number];
}

/**
 * 探地雷达数据源（占位实现）
 *
 * GPR 数据为地下体积探测结果，后续实现将支持
 * 体素网格插值与 Ray Marching 渲染。
 */
export class GPRSource implements IDataSource<VoxelGrid> {
  readonly dataType = "gpr";
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
  ): Promise<VoxelGrid> {
    throw new Error(
      "GPRSource: not implemented — coming in a future release",
    );
  }

  dispose(_data: VoxelGrid): void {
    // no-op
  }
}
