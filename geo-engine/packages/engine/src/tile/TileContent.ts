// geo-engine/packages/engine/src/tile/TileContent.ts

import { Disposable } from "../core/Disposable";
import type { TileKey } from "./TileKey";
import type { ContentState } from "./TileState";
import type { ILayerRenderer } from "../renderer/ILayerRenderer";

/**
 * RenderObject — Three.js 对象包装
 *
 * 存储渲染对象及其 dispose 回调。顶点已是 tile.origin 的局部坐标。
 * Three.js 相关资源（geometry, material, texture）的释放由外部传入 disposeFn 处理。
 */
export class RenderObject extends Disposable {
  readonly object: unknown; // THREE.Object3D（避免硬依赖 Three.js 类型）
  private readonly _disposeFn: (obj: unknown) => void;

  constructor(object: unknown, disposeFn: (obj: unknown) => void) {
    super();
    this.object = object;
    this._disposeFn = disposeFn;
  }

  dispose(): void {
    this._disposeFn(this.object);
    this.markDisposed();
  }
}

/**
 * TileContent — 单个 Layer 在单个 Tile 上的内容
 *
 * 包含原始数据和渲染对象列表。
 * 注意：TileContent 不存自己的 origin，统一使用 tile.origin。
 */
export class TileContent extends Disposable {
  readonly id: string;
  readonly tileKey: TileKey;
  readonly layerId: string;
  /** 原始数据（ImageBitmap / Float32Array / Feature[] 等） */
  data: unknown;
  /** Three.js 渲染对象列表 */
  renderObjects: RenderObject[] = [];
  /** 内容状态 */
  state: ContentState;
  /** 创建时间戳（用于淡入动画，performance.now() 毫秒） */
  readonly createdAt: number;
  /** 创建该 content 的渲染器（可选）— dispose 时回调其释放专属 GPU 资源（如纹理） */
  renderer?: ILayerRenderer;

  constructor(id: string, tileKey: TileKey, layerId: string) {
    super();
    this.id = id;
    this.tileKey = tileKey;
    this.layerId = layerId;
    this.state = "pending" as ContentState;
    this.createdAt = performance.now();
  }

  dispose(): void {
    if (this.disposed) return;
    // 先让创建它的渲染器释放专属 GPU 资源（如 RasterRenderer 的纹理），
    // 再释放 RenderObject（geometry / material）
    this.renderer?.disposeContent(this);
    for (const ro of this.renderObjects) {
      if (!ro.disposed) ro.dispose();
    }
    this.renderObjects = [];
    this.markDisposed();
  }
}
