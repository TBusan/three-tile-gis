// geo-engine/packages/engine/src/source/IDataSource.ts

import type { CrsBounds } from "../core/types";
import type { IProjectCRS } from "../crs/IProjectCRS";
import type { TileKey } from "../tile/TileKey";

/**
 * 数据源接口
 *
 * 从存储介质中按 Tile 粒度提取原始数据。
 * 输出坐标必须是 Engine CRS 坐标 — 如果数据自身的 CRS 与 Engine CRS
 * 不一致，转换是 DataSource 内部的事。
 */
export interface IDataSource<T = unknown> {
  /** 数据类型标识 */
  readonly dataType: string;
  /** 数据自身的 CRS（声明用途） */
  readonly crs: IProjectCRS;
  /** 数据在 Engine CRS 空间中的范围 */
  readonly bounds: CrsBounds;

  /**
   * 获取指定 Tile 的数据
   * @param key — Tile 标识
   * @param tileBounds — Tile 在 CRS 空间中的包围盒
   * @param signal — 取消信号（Tile 离开视野时 abort）
   */
  fetch(
    key: TileKey,
    tileBounds: CrsBounds,
    signal?: AbortSignal,
  ): Promise<T>;

  /** 释放已获取的数据 */
  dispose(data: T): void;
}
