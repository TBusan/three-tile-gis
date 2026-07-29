// geo-engine/packages/engine/src/renderer/ILayerRenderer.ts

import type { Tile } from "../tile/Tile";
import type { TileContent } from "../tile/TileContent";

/**
 * 渲染器接口 — 将原始数据变成 Three.js 对象
 *
 * 每种渲染类型（raster/vector/volume/pointcloud）各自实现。
 * Renderer 不关心数据从哪来（DataSource 的事），
 * 只关心如何把数据变成可渲染的 TileContent。
 */
export interface ILayerRenderer<TData = unknown> {
  readonly name: string;

  /**
   * 从原始数据创建 TileContent（含 RenderObject[]）
   * @param data — DataSource.fetch() 返回的原始数据
   * @param tile — 目标 Tile（提供 bounds, origin 等信息）
   * @param layerId — 可选，关联的 Layer ID（用于 TileContent.layerId 精确匹配）
   */
  createContent(data: TData, tile: Tile, layerId?: string): Promise<TileContent>;

  /**
   * 更新已有 TileContent（数据刷新时使用）
   * 可选 — 不实现则删除旧 Content 再创建新的
   */
  updateContent?(
    content: TileContent,
    data: TData,
    tile: Tile,
  ): Promise<void>;

  /**
   * 释放 RenderObject 的 GPU 资源
   * 注意：不需要在此方法中从场景移除对象（由外部处理）
   */
  disposeContent(content: TileContent): void;
}
