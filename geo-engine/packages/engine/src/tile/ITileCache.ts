// geo-engine/packages/engine/src/tile/ITileCache.ts

import type { Disposable } from "../core/Disposable";

/**
 * 缓存接口
 *
 * 存储已加载的 Tile/Content，淘汰时按 Disposable 链释放资源。
 * 默认实现：LRUTileCache
 */
export interface ITileCache<T extends Disposable> {
  get(key: string): T | null;
  set(key: string, value: T, byteSize: number): void;
  has(key: string): boolean;
  delete(key: string): void;

  /** 淘汰直到总字节数 ≤ maxByteSize */
  trim(maxByteSize: number): void;

  /** 当前缓存的条目数 */
  readonly count: number;
  /** 当前已使用的字节数 */
  readonly byteSize: number;
  /** 清空所有缓存 */
  clear(): void;
}
