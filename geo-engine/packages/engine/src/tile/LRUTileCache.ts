// geo-engine/packages/engine/src/tile/LRUTileCache.ts

import type { Disposable } from "../core/Disposable";
import type { ITileCache } from "./ITileCache";

/**
 * LRU 缓存实现
 *
 * 基于 Map（保持插入顺序）+ delete/re-set 实现 LRU 语义。
 * trim() 时从最久未访问的条目开始淘汰，并调用 dispose() 释放资源。
 */
export class LRUTileCache<T extends Disposable> implements ITileCache<T> {
  private readonly _map = new Map<string, { value: T; byteSize: number }>();
  private _totalBytes = 0;

  get count(): number {
    return this._map.size;
  }

  get byteSize(): number {
    return this._totalBytes;
  }

  get(key: string): T | null {
    const entry = this._map.get(key);
    if (!entry) return null;
    // 移到末尾（最近访问）
    this._map.delete(key);
    this._map.set(key, entry);
    return entry.value;
  }

  set(key: string, value: T, byteSize: number): void {
    // 删除已有条目
    if (this._map.has(key)) {
      const old = this._map.get(key)!;
      this._totalBytes -= old.byteSize;
      this._map.delete(key);
    }
    this._map.set(key, { value, byteSize });
    this._totalBytes += byteSize;
  }

  has(key: string): boolean {
    return this._map.has(key);
  }

  delete(key: string): void {
    const entry = this._map.get(key);
    if (entry) {
      this._totalBytes -= entry.byteSize;
      this._map.delete(key);
    }
  }

  trim(maxByteSize: number): void {
    // Map 迭代顺序 = 插入顺序 → 最前面的是最久未访问的
    while (this._totalBytes > maxByteSize && this._map.size > 0) {
      const [key, entry] = this._map.entries().next().value!;
      this._totalBytes -= entry.byteSize;
      this._map.delete(key);
      if (!entry.value.disposed) {
        entry.value.dispose();
      }
    }
  }

  clear(): void {
    for (const entry of this._map.values()) {
      if (!entry.value.disposed) {
        entry.value.dispose();
      }
    }
    this._map.clear();
    this._totalBytes = 0;
  }
}
