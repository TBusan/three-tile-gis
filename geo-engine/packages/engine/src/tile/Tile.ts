// geo-engine/packages/engine/src/tile/Tile.ts

import type { CrsBounds, CrsCoord } from "../core/types";
import type { TileKey } from "./TileKey";
import type { TileState } from "./TileState";
import type { TileContent } from "./TileContent";

/**
 * Tile — 一个空间分块的数据结构
 *
 * 不继承 Object3D。渲染时通过外部 Mesh 挂载到 Group 锚点。
 * 多个 Layer 拍到同一个 TileKey 时共享同一个 Tile 实例，
 * 各自追加 TileContent 到 contents[]。
 */
export class Tile {
  readonly id: string;
  readonly key: TileKey;
  readonly bounds: CrsBounds;
  /** Local Origin — 本 tile 内所有顶点的参考原点（CRS 坐标） */
  readonly origin: CrsCoord;
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
}
