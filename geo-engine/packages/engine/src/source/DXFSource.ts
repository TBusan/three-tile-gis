// geo-engine/packages/engine/src/source/DXFSource.ts

import type { CrsBounds } from "../core/types";
import type { IProjectCRS } from "../crs/IProjectCRS";
import type { TileKey } from "../tile/TileKey";
import type { IDataSource } from "./IDataSource";

/** DXF 实体占位类型 */
export interface DXFEntity {
  type: string;
  [key: string]: unknown;
}

/**
 * DXF 数据源（占位实现）
 *
 * DXF 解析较复杂，当前版本保留接口占位。
 * 后续实现将支持 LINE、POLYLINE、LWPOLYLINE、
 * CIRCLE、ARC、TEXT、MTEXT、INSERT 等实体类型。
 */
export class DXFSource implements IDataSource<DXFEntity[]> {
  readonly dataType = "dxf";
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
  ): Promise<DXFEntity[]> {
    throw new Error("DXFSource: not implemented — coming in a future release");
  }

  dispose(_data: DXFEntity[]): void {
    // no-op
  }
}
