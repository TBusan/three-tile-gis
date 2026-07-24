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
});
