// geo-engine/packages/engine/src/tile/__tests__/LRUTileCache.test.ts
import { describe, it, expect } from "vitest";
import { LRUTileCache } from "../LRUTileCache";
import { TileContent } from "../TileContent";
import { makeTileKey } from "../TileKey";

describe("LRUTileCache", () => {
  it("should store and retrieve values", () => {
    const cache = new LRUTileCache<TileContent>();
    const key = makeTileKey("proj", "0-0", 0);
    const tc = new TileContent("c1", key, "L1");

    cache.set("proj:0-0", tc, 1024);
    expect(cache.get("proj:0-0")).toBe(tc);
    expect(cache.has("proj:0-0")).toBe(true);
    expect(cache.count).toBe(1);
    expect(cache.byteSize).toBe(1024);
  });

  it("should return null for missing key", () => {
    const cache = new LRUTileCache<TileContent>();
    expect(cache.get("nonexistent")).toBeNull();
    expect(cache.has("nonexistent")).toBe(false);
  });

  it("should delete entries", () => {
    const cache = new LRUTileCache<TileContent>();
    const key = makeTileKey("proj", "0-0", 0);
    const tc = new TileContent("c1", key, "L1");

    cache.set("proj:0-0", tc, 1024);
    cache.delete("proj:0-0");
    expect(cache.get("proj:0-0")).toBeNull();
    expect(cache.count).toBe(0);
    expect(cache.byteSize).toBe(0);
  });

  it("should trim and dispose evicted entries", () => {
    const cache = new LRUTileCache<TileContent>();
    const key = makeTileKey("proj", "0-0", 0);

    const tc1 = new TileContent("c1", key, "L1");
    const tc2 = new TileContent("c2", key, "L2");
    const tc3 = new TileContent("c3", key, "L3");

    cache.set("a", tc1, 100);
    cache.set("b", tc2, 100);
    cache.set("c", tc3, 100);

    // Access a then b → c is LRU (least recently used)
    cache.get("a");
    cache.get("b");

    // Trim to 200 bytes — should evict c (100) leaving a+b (200)
    cache.trim(200);

    expect(cache.has("c")).toBe(false);
    expect(cache.has("a")).toBe(true);
    expect(cache.has("b")).toBe(true);
    expect(tc3.disposed).toBe(true);
    expect(tc1.disposed).toBe(false);
    expect(tc2.disposed).toBe(false);
  });

  it("should dispose the old value when overwriting the same key", () => {
    const cache = new LRUTileCache<TileContent>();
    const key = makeTileKey("proj", "0-0", 0);
    const oldTc = new TileContent("c1", key, "L1");
    const newTc = new TileContent("c2", key, "L2");

    cache.set("proj:0-0", oldTc, 1024);
    cache.set("proj:0-0", newTc, 2048);

    expect(cache.get("proj:0-0")).toBe(newTc);
    expect(oldTc.disposed).toBe(true); // 覆盖时释放旧值
    expect(newTc.disposed).toBe(false);
    expect(cache.count).toBe(1);
    expect(cache.byteSize).toBe(2048);
  });

  it("should not dispose the value when re-setting the same object", () => {
    const cache = new LRUTileCache<TileContent>();
    const key = makeTileKey("proj", "0-0", 0);
    const tc = new TileContent("c1", key, "L1");

    cache.set("proj:0-0", tc, 1024);
    cache.set("proj:0-0", tc, 2048);

    // 同一对象重新 set：不能把自己 dispose 掉（否则留下 disposed 对象在缓存中）
    expect(cache.get("proj:0-0")).toBe(tc);
    expect(tc.disposed).toBe(false);
    expect(cache.count).toBe(1);
    expect(cache.byteSize).toBe(2048);
  });

  it("should clear all entries", () => {
    const cache = new LRUTileCache<TileContent>();
    const key = makeTileKey("proj", "0-0", 0);
    const tc1 = new TileContent("c1", key, "L1");
    const tc2 = new TileContent("c2", key, "L2");

    cache.set("a", tc1, 50);
    cache.set("b", tc2, 50);
    cache.clear();

    expect(cache.count).toBe(0);
    expect(cache.byteSize).toBe(0);
    expect(tc1.disposed).toBe(true);
    expect(tc2.disposed).toBe(true);
  });

  it("clearByPrefix：只清除匹配前缀的条目并释放", () => {
    const cache = new LRUTileCache<TileContent>();
    const key = makeTileKey("proj", "0-0", 0);
    const tc1 = new TileContent("c1", key, "L1");
    const tc2 = new TileContent("c2", key, "L2");
    const tc3 = new TileContent("c3", key, "L3");

    cache.set("xyz:0-0", tc1, 100);
    cache.set("proj:0-0", tc2, 100);
    cache.set("xyz:1-0", tc3, 100);

    cache.clearByPrefix("xyz:");

    expect(cache.has("xyz:0-0")).toBe(false);
    expect(cache.has("xyz:1-0")).toBe(false);
    expect(cache.has("proj:0-0")).toBe(true);
    expect(tc1.disposed).toBe(true);
    expect(tc3.disposed).toBe(true);
    expect(tc2.disposed).toBe(false);
    expect(cache.count).toBe(1);
    expect(cache.byteSize).toBe(100);
  });

  it("clearByPrefix：无匹配前缀时不变", () => {
    const cache = new LRUTileCache<TileContent>();
    const key = makeTileKey("proj", "0-0", 0);
    const tc1 = new TileContent("c1", key, "L1");

    cache.set("proj:0-0", tc1, 100);
    cache.clearByPrefix("xyz:");

    expect(cache.has("proj:0-0")).toBe(true);
    expect(cache.count).toBe(1);
    expect(tc1.disposed).toBe(false);
  });
});
