// geo-engine/packages/engine/src/tile/Tile.ts

import { Disposable } from "../core/Disposable";
import type { CrsBounds, CrsCoord } from "../core/types";
import type { TileKey } from "./TileKey";
import type { ITileScheme } from "./ITileScheme";
import type { TileState } from "./TileState";
import type { TileContent } from "./TileContent";

/**
 * Tile — 一个空间分块的数据结构
 *
 * 不继承 Object3D。渲染时通过外部 Mesh 挂载到 Group 锚点。
 * 多个 Layer 拍到同一个 TileKey 时共享同一个 Tile 实例，
 * 各自追加 TileContent 到 contents[]。
 */
export class Tile extends Disposable {
  readonly id: string;
  readonly key: TileKey;
  readonly bounds: CrsBounds;
  /** Local Origin — 本 tile 内所有顶点的参考原点（CRS 坐标） */
  readonly origin: CrsCoord;
  /**
   * 重投影函数（可选）— 将归一化瓦片坐标 (u,v ∈ [0,1]) 映射到 CRS 平面坐标。
   *
   * 由 XYZTileScheme 提供（设计文档 §3.5）：XYZ 瓦片在 3857 下是正方形，
   * 投影到目标 CRS 后是弯曲四边形。渲染器用此函数逐顶点计算精确位置，
   * GPU 在顶点间插值纹理坐标，消除纹理扭曲。
   * ProjectTileScheme 的瓦片本身就是 CRS 矩形，不需要此函数。
   */
  reprojector?: (u: number, v: number) => { x: number; y: number };
  /**
   * 所属 TileScheme（可选）。
   * 由 TileManager 在创建 Tile 时写入，供 LOD 淘汰等操作
   * 调用 scheme.getParentKey / getChildKeys（XYZ 与 Project 统一语义）。
   */
  scheme?: ITileScheme;
  /** 当前生命周期状态 */
  state: TileState;
  /** 各 Layer 创建的内容列表 */
  readonly contents: TileContent[] = [];
  /** 加载失败次数（用于重试限制） */
  failCount = 0;
  /** 最近访问时间戳（LRU 用） */
  lastAccessTime = 0;
  /** 优先级（TileScheduler 用） */
  priority = 0;

  constructor(key: TileKey, bounds: CrsBounds, origin: CrsCoord) {
    super();
    this.id = `${key.schemeId}:${key.id}`;
    this.key = key;
    this.bounds = bounds;
    this.origin = origin;
    this.state = "unloaded" as TileState;
  }

  /** 重置为未加载状态（缓存淘汰时调用） */
  reset(): void {
    this.state = "unloaded" as TileState;
    this.contents.length = 0;
    this.failCount = 0;
    this.priority = 0;
  }

  dispose(): void {
    for (const content of this.contents) {
      if (!content.disposed) content.dispose();
    }
    this.contents.length = 0;
    this.markDisposed();
  }
}
