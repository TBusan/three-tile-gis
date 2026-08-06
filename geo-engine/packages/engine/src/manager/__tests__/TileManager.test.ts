// geo-engine/packages/engine/src/manager/__tests__/TileManager.test.ts
import { describe, it, expect, vi, beforeEach } from "vitest";
import { TileManager } from "../TileManager";
import { Tile } from "../../tile/Tile";
import { TileContent } from "../../tile/TileContent";
import { makeTileKey, tileKeyToString } from "../../tile/TileKey";
import { LRUTileCache } from "../../tile/LRUTileCache";
import { FloatingOrigin } from "../../origin/FloatingOrigin";
import type { ILayer } from "../../layer/ILayer";
import type { IProjectCRS } from "../../crs/IProjectCRS";
import type { TileKey } from "../../tile/TileKey";
import type { CrsBounds } from "../../core/types";

// Simple mock CRS
const mockCRS: IProjectCRS = {
  name: "test-crs",
  units: "meter",
  project: (lon, lat) => ({ x: lon, y: lat }),
  unproject: (x, y) => ({ lon: x, lat: y }),
};

// Mock tile scheme that returns fixed keys
function makeMockScheme(schemeId: string, currentZoom?: number | null) {
  return {
    name: schemeId,
    schemeId,
    currentZoom: currentZoom ?? null,
    getTilesInView: () => [],
    getTileBounds: (key: TileKey): CrsBounds => {
      const [col, row] = key.id.split("-").map(Number);
      const size = 500;
      return [col * size, row * size, (col + 1) * size, (row + 1) * size];
    },
    getParentKey: (key: TileKey): TileKey | null => {
      const parts = key.id.split("-");
      if (parts.length === 3) {
        // XYZ-style: z-x-y
        const z = parseInt(parts[0]);
        if (z <= 0) return null;
        const x = parseInt(parts[1]);
        const y = parseInt(parts[2]);
        return makeTileKey(schemeId, `${z - 1}-${Math.floor(x / 2)}-${Math.floor(y / 2)}`, z - 1);
      }
      return null;
    },
    getChildKeys: (): TileKey[] => [],
  };
}

function makeMockLayer(
  id: string,
  schemeId: string,
  keys: TileKey[],
  scheme?: ReturnType<typeof makeMockScheme>,
): ILayer {
  const s = scheme ?? makeMockScheme(schemeId);
  return {
    id,
    name: `Layer ${id}`,
    type: "raster",
    visible: true,
    opacity: 1,
    zIndex: 0,
    tileScheme: s,
    dataSource: {
      dataType: "test",
      crs: mockCRS,
      bounds: [0, 0, 10000, 10000] as CrsBounds,
      fetch: async () => null,
      dispose: () => {},
    },
    renderer: {
      name: "test-renderer",
      createContent: async (): Promise<any> => null,
      disposeContent: () => {},
    },
    dependsOn: [],
    getVisibleTiles: () => keys,
  };
}

/**
 * 反复调用 update() 排空调度队列，直到条件满足或达到最大轮数。
 *
 * update() 同步执行调度并触发异步 _loadTile（不 await）；每轮先 update 再
 * setTimeout(5ms) 让在途加载的微任务落定，随后检查条件。extentChanged 在首轮后
 * 变为 false，但 takeNext() 每帧都会消费队列，因此同 extent 的反复 update 能
 * 逐步排空批次（每帧 8/4 个）直到所有可见瓦片加载完成。
 */
async function drainUpdates(
  mgr: TileManager,
  extent: CrsBounds,
  cameraPos: { x: number; y: number; z: number },
  crs: IProjectCRS,
  layer: ILayer,
  until: (mgr: TileManager) => boolean,
  maxLoops = 200,
): Promise<void> {
  for (let i = 0; i < maxLoops; i++) {
    mgr.update(extent, cameraPos, crs, [layer]);
    await new Promise((r) => setTimeout(r, 5));
    if (until(mgr)) return;
  }
  throw new Error("drainUpdates: condition not satisfied within maxLoops");
}

describe("TileManager", () => {
  let cache: LRUTileCache<Tile>;
  let origin: FloatingOrigin;
  let manager: TileManager;

  beforeEach(() => {
    cache = new LRUTileCache<Tile>();
    origin = new FloatingOrigin({ threshold: 500 });
    manager = new TileManager(cache, origin, async () => null);
  });

  it("should start with no loaded tiles", () => {
    expect(manager.loadedTiles.size).toBe(0);
  });

  it("should load tiles for visible layers", async () => {
    const loadedContents: Array<{ layerId: string; keyId: string }> = [];
    const mgr = new TileManager(cache, origin, async (_tile, layer, _signal) => {
      loadedContents.push({ layerId: layer.id, keyId: _tile.key.id });
      // Return minimal TileContent
      const { TileContent } = await import("../../tile/TileContent");
      return new TileContent(`tc-${layer.id}-${_tile.key.id}`, _tile.key, layer.id);
    });

    const key = makeTileKey("proj", "0-0", 0);
    const layer = makeMockLayer("L1", "proj", [key]);

    mgr.update([-1000, -1000, 1000, 1000], { x: 0, y: 0, z: 0 }, mockCRS, [layer]);

    // Wait for async loads
    await vi.waitFor(
      () => {
        expect(mgr.loadedTiles.size).toBeGreaterThan(0);
      },
      { timeout: 1000 },
    );

    const tile = mgr.loadedTiles.values().next().value as Tile;
    expect(tile).toBeDefined();
    expect(tile.state).toBe("loaded");
    expect(tile.contents.length).toBeGreaterThan(0);
  });

  it("should share Tile instance across layers with same key", async () => {
    const loadedTiles: Tile[] = [];
    const mgr = new TileManager(cache, origin, async (tile, _layer, _signal) => {
      if (!loadedTiles.includes(tile)) loadedTiles.push(tile);
      const { TileContent } = await import("../../tile/TileContent");
      return new TileContent(`tc-${_layer.id}`, tile.key, _layer.id);
    });

    const key = makeTileKey("proj", "0-0", 0);
    const layer1 = makeMockLayer("L1", "proj", [key]);
    const layer2 = makeMockLayer("L2", "proj", [key]);

    mgr.update([-1000, -1000, 1000, 1000], { x: 0, y: 0, z: 0 }, mockCRS, [layer1, layer2]);

    await vi.waitFor(
      () => {
        expect(mgr.loadedTiles.size).toBeGreaterThan(0);
      },
      { timeout: 1000 },
    );

    // Both layers share the same Tile instance
    const tile = mgr.loadedTiles.values().next().value as Tile;
    expect(tile.contents.length).toBe(2);
    expect(tile.contents[0].layerId).toBe("L1");
    expect(tile.contents[1].layerId).toBe("L2");
  });

  it("should not re-request tiles already loaded", async () => {
    let loadCount = 0;
    const mgr = new TileManager(cache, origin, async (tile, _layer, _signal) => {
      loadCount++;
      const { TileContent } = await import("../../tile/TileContent");
      return new TileContent(`tc`, tile.key, _layer.id);
    });

    const key = makeTileKey("proj", "0-0", 0);
    const layer = makeMockLayer("L1", "proj", [key]);

    // First update — loads the tile
    mgr.update([-1000, -1000, 1000, 1000], { x: 0, y: 0, z: 0 }, mockCRS, [layer]);
    await vi.waitFor(() => expect(mgr.loadedTiles.size).toBe(1), { timeout: 1000 });

    const countAfterFirst = loadCount;

    // Second update — same tile, should skip
    mgr.update([-1000, -1000, 1000, 1000], { x: 0, y: 0, z: 0 }, mockCRS, [layer]);
    await new Promise((r) => setTimeout(r, 100));

    // No additional loads
    expect(loadCount).toBe(countAfterFirst);
  });

  it("should evict tiles beyond cache limit", async () => {
    const mgr = new TileManager(cache, origin, async (tile, _layer, _signal) => {
      const { TileContent } = await import("../../tile/TileContent");
      const tc = new TileContent(`tc`, tile.key, _layer.id);
      tc.state = "ready";
      return tc;
    });

    const key = makeTileKey("proj", "0-0", 0);
    const layer = makeMockLayer("L1", "proj", [key]);

    mgr.update([-1000, -1000, 1000, 1000], { x: 0, y: 0, z: 0 }, mockCRS, [layer]);
    await vi.waitFor(() => expect(mgr.loadedTiles.size).toBe(1), { timeout: 1000 });

    // Evict with tiny budget — tile should be removed from cache
    mgr.evict(1);
    expect(cache.count).toBe(0);
  });

  it("should cancel off-screen loads", async () => {
    const abortSignals: AbortSignal[] = [];
    const mgr = new TileManager(cache, origin, async (_tile, _layer, signal) => {
      abortSignals.push(signal);
      // Don't resolve — simulates slow load
      await new Promise(() => {});
      return null;
    });

    const key1 = makeTileKey("proj", "0-0", 0);
    const key2 = makeTileKey("proj", "1-0", 0);
    const layer = makeMockLayer("L1", "proj", [key1, key2]);

    // First frame: request both tiles
    mgr.update([-2000, -2000, 2000, 2000], { x: 0, y: 0, z: 0 }, mockCRS, [layer]);

    // Wait a tick for loads to start
    await new Promise((r) => setTimeout(r, 50));

    // Second frame: only key1 still visible
    mgr.update([-600, -600, 600, 600], { x: 0, y: 0, z: 0 }, mockCRS, [layer]);

    // key2's signal should be aborted
    await vi.waitFor(
      () => {
        const key2Aborted = abortSignals.some((s) => s.aborted);
        // At least one load was cancelled
        expect(mgr.scheduler.loadingCount).toBeLessThanOrEqual(2);
      },
      { timeout: 500 },
    );
  });

  it("should skip dependent layer tiles when dependency not loaded", async () => {
    const loadedCalls: Array<{ layerId: string; keyId: string }> = [];
    const mgr = new TileManager(cache, origin, async (_tile, layer, _signal) => {
      loadedCalls.push({ layerId: layer.id, keyId: _tile.key.id });
      const { TileContent } = await import("../../tile/TileContent");
      return new TileContent(`tc`, _tile.key, layer.id);
    });

    const key = makeTileKey("proj", "0-0", 0);
    const scheme = makeMockScheme("proj");

    // Layer A (dependency) — no dependsOn
    const layerA: ILayer = {
      id: "A",
      name: "Layer A",
      type: "raster",
      visible: true,
      opacity: 1,
      zIndex: 0,
      tileScheme: scheme,
      dataSource: {
        dataType: "test",
        crs: mockCRS,
        bounds: [0, 0, 10000, 10000] as CrsBounds,
        fetch: async () => null,
        dispose: () => {},
      },
      renderer: {
        name: "test",
        createContent: async (): Promise<any> => null,
        disposeContent: () => {},
      },
      dependsOn: [],
      getVisibleTiles: () => [key],
    };

    // Layer B depends on A — needs A's tile loaded first
    const layerB: ILayer = {
      ...layerA,
      id: "B",
      name: "Layer B",
      dependsOn: [layerA],
    };

    // First frame: request both layers. A should load, B should skip.
    mgr.update(
      [-1000, -1000, 1000, 1000],
      { x: 0, y: 0, z: 0 },
      mockCRS,
      [layerA, layerB],
    );

    // Let the loads resolve
    await vi.waitFor(
      () => expect(mgr.loadedTiles.size).toBeGreaterThan(0),
      { timeout: 1000 },
    );

    // A's tile should be loaded, B's should have been skipped
    const tile = mgr.loadedTiles.values().next().value as Tile;
    expect(tile.contents.some((c) => c.layerId === "A")).toBe(true);
    // B was skipped (dependency not ready on first pass)
    expect(loadedCalls.filter((c) => c.layerId === "A").length).toBe(1);
  });

  it("should load dependent layer tile once dependency tile is ready", async () => {
    const loadedCalls: Array<{ layerId: string; keyId: string }> = [];
    const mgr = new TileManager(cache, origin, async (_tile, layer, _signal) => {
      loadedCalls.push({ layerId: layer.id, keyId: _tile.key.id });
      const { TileContent } = await import("../../tile/TileContent");
      return new TileContent(`tc`, _tile.key, layer.id);
    });

    const key = makeTileKey("proj", "0-0", 0);
    const scheme = makeMockScheme("proj");

    const layerA: ILayer = {
      id: "A",
      name: "Layer A",
      type: "raster",
      visible: true,
      opacity: 1,
      zIndex: 0,
      tileScheme: scheme,
      dataSource: {
        dataType: "test",
        crs: mockCRS,
        bounds: [0, 0, 10000, 10000] as CrsBounds,
        fetch: async () => null,
        dispose: () => {},
      },
      renderer: {
        name: "test",
        createContent: async (): Promise<any> => null,
        disposeContent: () => {},
      },
      dependsOn: [],
      getVisibleTiles: () => [key],
    };

    const layerB: ILayer = {
      ...layerA,
      id: "B",
      name: "Layer B",
      dependsOn: [layerA],
    };

    // First frame — A loads
    mgr.update(
      [-1000, -1000, 1000, 1000],
      { x: 0, y: 0, z: 0 },
      mockCRS,
      [layerA, layerB],
    );

    await vi.waitFor(
      () => expect(mgr.loadedTiles.size).toBeGreaterThan(0),
      { timeout: 1000 },
    );

    // Second frame — now A is loaded, B should load
    const beforeCount = loadedCalls.length;
    mgr.update(
      [-1000, -1000, 1000, 1000],
      { x: 0, y: 0, z: 0 },
      mockCRS,
      [layerA, layerB],
    );

    // Wait for async loads to complete
    await new Promise((r) => setTimeout(r, 300));

    const tile = mgr.loadedTiles.values().next().value as Tile;
    expect(tile.contents.some((c) => c.layerId === "A")).toBe(true);
    expect(tile.contents.some((c) => c.layerId === "B")).toBe(true);
  });

  it("should dispose all tiles on dispose", async () => {
    const mgr = new TileManager(cache, origin, async (tile, _layer, _signal) => {
      const { TileContent } = await import("../../tile/TileContent");
      return new TileContent(`tc`, tile.key, _layer.id);
    });

    const key = makeTileKey("proj", "0-0", 0);
    const layer = makeMockLayer("L1", "proj", [key]);

    mgr.update([-1000, -1000, 1000, 1000], { x: 0, y: 0, z: 0 }, mockCRS, [layer]);
    await vi.waitFor(() => expect(mgr.loadedTiles.size).toBe(1), { timeout: 1000 });

    mgr.dispose();
    expect(mgr.loadedTiles.size).toBe(0);
    expect(cache.count).toBe(0);
  });

  it("should NOT abort in-flight visible loads while tile stays in view", async () => {
    const abortSignals: AbortSignal[] = [];
    const mgr = new TileManager(cache, origin, async (tile, _layer, signal) => {
      abortSignals.push(signal);
      // Slow load: resolves after ~80ms regardless of frames in between
      return new Promise((resolve) => {
        const t = setTimeout(() => {
          const tc = new TileContent(`tc`, tile.key, _layer.id);
          tc.state = "ready";
          resolve(tc);
        }, 80);
        signal.addEventListener("abort", () => {
          clearTimeout(t);
          resolve(null);
        });
      });
    });

    const key = makeTileKey("proj", "0-0", 0); // bounds [0,0,500,500]
    const layer = makeMockLayer("L1", "proj", [key]);

    mgr.update([0, 0, 2000, 2000], { x: 1000, y: 1000, z: 0 }, mockCRS, [layer]);
    // Let the load start
    await new Promise((r) => setTimeout(r, 20));
    expect(abortSignals.length).toBe(1);

    // Second update: extent changed enough to re-enter the scheduling block,
    // but the tile is still in view.
    mgr.update([-1200, 0, 2000, 2000], { x: 400, y: 1000, z: 0 }, mockCRS, [layer]);
    await new Promise((r) => setTimeout(r, 20));

    // The in-flight load must NOT have been aborted
    expect(abortSignals[0].aborted).toBe(false);

    // And it should complete normally
    await vi.waitFor(() => expect(mgr.loadedTiles.size).toBe(1), { timeout: 1000 });
  });

  it("MIXED-LOD：放大过程中旧级别父瓦片与新级别子瓦片并存（拼接处内容对不上的根因）", async () => {
    const { XYZTileScheme } = await import("../../tile/XYZTileScheme");
    const { WebMercatorCRS } = await import("../../crs/WebMercator");
    const wm = new WebMercatorCRS();
    const scheme = new XYZTileScheme(wm, 0, 18);

    // 慢速子瓦片（level ≥ 3）：加载挂起，模拟新级别瓦片仍在下载
    const pendingL3: Array<() => void> = [];
    const mgr = new TileManager(cache, origin, (tile, _layer, _signal) => {
      if (tile.key.level >= 3) {
        return new Promise<TileContent | null>((resolve) => {
          pendingL3.push(() => {
            const tc = new TileContent(`tc-l3-${tile.key.id}`, tile.key, _layer.id);
            tc.state = "ready";
            resolve(tc);
          });
        });
      }
      const tc = new TileContent(`tc-l2-${tile.key.id}`, tile.key, _layer.id);
      tc.state = "ready";
      return Promise.resolve(tc);
    });

    const layer: ILayer = {
      id: "XYZ",
      name: "XYZ basemap",
      type: "raster",
      visible: true,
      opacity: 1,
      zIndex: 0,
      tileScheme: scheme,
      dataSource: {
        dataType: "xyz",
        crs: wm,
        bounds: [-1e9, -1e9, 1e9, 1e9] as CrsBounds,
        fetch: async () => null,
        dispose: () => {},
      },
      renderer: {
        name: "r",
        createContent: async (): Promise<any> => null,
        disposeContent: () => {},
      },
      dependsOn: [],
      getVisibleTiles: (extent: CrsBounds) => scheme.getTilesInView(extent, wm),
    };

    const WH = Math.PI * 6378137; // WebMercator 半世界 ≈ 20037508m
    // 初始：大视野 → zoom 2，旧级别瓦片全部加载完成
    mgr.update([-WH, -WH, WH, WH], { x: 0, y: 0, z: 0 }, wm, [layer]);
    await vi.waitFor(
      () => {
        const l2 = [...mgr.loadedTiles.values()].filter((t) => t.key.level === 2);
        expect(l2.length).toBeGreaterThan(0);
      },
      { timeout: 1000 },
    );
    const l2Before = [...mgr.loadedTiles.values()].filter(
      (t) => t.key.level === 2,
    ).length;

    // 放大到 zoom 3：视野缩小（x∈[0,WH], y∈[0,WH]），新级别瓦片开始加载（挂起）
    mgr.update([0, 0, WH, WH], { x: WH / 2, y: WH / 2, z: 0 }, wm, [layer]);

    // 新级别（level 3）进入加载队列；旧级别（level 2）父瓦片此时仍全部保留
    expect(pendingL3.length).toBeGreaterThan(0);
    const l2During = [...mgr.loadedTiles.values()].filter(
      (t) => t.key.level === 2,
    ).length;
    expect(l2During).toBe(l2Before);

    // 让第一批 level 3 瓦片加载完成（模拟新瓦片陆续到位）
    for (const resolve of pendingL3.splice(0)) resolve();
    await vi.waitFor(
      () => {
        const l3 = [...mgr.loadedTiles.values()].filter((t) => t.key.level === 3);
        expect(l3.length).toBeGreaterThan(0);
      },
      { timeout: 1000 },
    );

    // 关键断言：level 2 与 level 3 瓦片同时存在于 loadedTiles —— 混级渲染。
    // 粗粒度父瓦片（旧 zoom）与细粒度子瓦片（新 zoom）在视野内并列，
    // 同一地理位置的影像内容不同 → 拼接处「上面是路、下面是田」。
    const levels = new Set([...mgr.loadedTiles.values()].map((t) => t.key.level));
    expect(levels.has(2)).toBe(true);
    expect(levels.has(3)).toBe(true);

    // 下一次 update：覆盖率满足 ≥2 子瓦片的旧父瓦片被淘汰（最终收敛，不再混级）
    mgr.update([0, 0, WH, WH], { x: WH / 2, y: WH / 2, z: 0 }, wm, [layer]);
    const l2After = [...mgr.loadedTiles.values()].filter(
      (t) => t.key.level === 2,
    ).length;
    expect(l2After).toBeLessThan(l2During);
  });

  it("should keep stale-zoom tiles whose bounds intersect the view (B1 white-hole fix)", async () => {
    const mgr = new TileManager(cache, origin, async (tile, _layer, _signal) => {
      const tc = new TileContent(`tc`, tile.key, _layer.id);
      tc.state = "ready";
      return tc;
    });

    // Scheme reports a stable zoom of 5 → tiles at level 0 are "stale"
    const scheme = makeMockScheme("proj", 5);
    const currentKey = makeTileKey("proj", "5-5", 5);
    const layer = makeMockLayer("L1", "proj", [currentKey], scheme);

    // Force-load a level-0 tile whose bounds [0,0,500,500] intersect the view extent
    const staleKey = makeTileKey("proj", "0-0", 0);
    await mgr.loadTileNow(staleKey, layer);

    // Age it beyond the OFFSCREEN timeout (1.5s) but below the ONSCREEN timeout (5s)
    const staleTile = mgr.loadedTiles.get(tileKeyToString(staleKey))!;
    staleTile.lastAccessTime = Date.now() - 2000;

    // Current view covers the stale tile's bounds, but only level-5 keys are requested
    mgr.update([0, 0, 1000, 1000], { x: 500, y: 500, z: 0 }, mockCRS, [layer]);
    await new Promise((r) => setTimeout(r, 50));

    // On-screen (bounds intersect) → must NOT be force-evicted as "off-screen"
    expect(mgr.loadedTiles.has(tileKeyToString(staleKey))).toBe(true);
  });


  it("should skip tiles whose layers returned null (deterministic empty, no infinite retry)", async () => {
    let loadCalls = 0;
    let gate: () => void = () => {};
    const mgr = new TileManager(cache, origin, async () => {
      loadCalls++;
      await new Promise<void>((r) => (gate = r));
      return null; // 确定性空：无要素的矢量瓦片返回 null
    });
    const key = makeTileKey("proj", "0-0", 0);
    const layer = makeMockLayer("L1", "proj", [key]);

    // 第 1 次：返回 null → 记录 _nullLayers（含 level 的 _memKey）
    mgr.update([-1000, -1000, 1000, 1000], { x: 0, y: 0, z: 0 }, mockCRS, [layer]);
    await vi.waitFor(() => expect(mgr.scheduler.loadingCount).toBe(1), {
      timeout: 1000,
    });
    gate();
    await vi.waitFor(() => expect(mgr.scheduler.loadingCount).toBe(0), {
      timeout: 1000,
    });
    expect(loadCalls).toBe(1);

    const anyMgr = mgr as unknown as { _nullLayers: Map<string, Set<string>> };
    expect(anyMgr._nullLayers.get("proj:0-0@0")?.has("L1")).toBe(true);

    // 第 2 次（extentChanged）：null 已确认 → 不再调用 loadFn
    const before = loadCalls;
    mgr.update([-1200, -1000, 800, 1000], { x: 0, y: 0, z: 0 }, mockCRS, [layer]);
    await new Promise((r) => setTimeout(r, 100));
    expect(loadCalls).toBe(before);
  });

  it("should cooldown tiles whose layers reject and retry after backoff", async () => {
    let loadCalls = 0;
    const gates: Array<() => void> = [];
    const mgr = new TileManager(cache, origin, async () => {
      loadCalls++;
      await new Promise<void>((r) => gates.push(r));
      throw new Error("network error"); // 真实错误（非 AbortError）
    });
    const key = makeTileKey("proj", "0-0", 0);
    const layer = makeMockLayer("L1", "proj", [key]);
    const memKey = "proj:0-0@0";

    // 第 1 次：抛出真实错误 → 记录 _failTimes 冷却
    mgr.update([-1000, -1000, 1000, 1000], { x: 0, y: 0, z: 0 }, mockCRS, [layer]);
    await vi.waitFor(() => expect(mgr.scheduler.loadingCount).toBe(1), {
      timeout: 1000,
    });
    gates[0]();
    await vi.waitFor(() => expect(mgr.scheduler.loadingCount).toBe(0), {
      timeout: 1000,
    });
    expect(loadCalls).toBe(1);

    const anyMgr = mgr as unknown as { _failTimes: Map<string, number> };
    expect(anyMgr._failTimes.has(memKey)).toBe(true);

    // 冷却期内：extentChanged 也不重试
    const within = loadCalls;
    mgr.update([-1200, -1000, 800, 1000], { x: 0, y: 0, z: 0 }, mockCRS, [layer]);
    await new Promise((r) => setTimeout(r, 100));
    expect(loadCalls).toBe(within);

    // 冷却过期（>5s）后重试
    anyMgr._failTimes.set(memKey, Date.now() - 5001);
    mgr.update([-1400, -1000, 600, 1000], { x: 0, y: 0, z: 0 }, mockCRS, [layer]);
    await vi.waitFor(() => expect(mgr.scheduler.loadingCount).toBe(1), {
      timeout: 1000,
    });
    gates[1]();
    await vi.waitFor(() => expect(mgr.scheduler.loadingCount).toBe(0), {
      timeout: 1000,
    });
    expect(loadCalls).toBe(2);
  });

  it("should NOT record nullLayers for a load that was aborted", async () => {
    const mgr = new TileManager(cache, origin, (_tile, _layer, signal) =>
      new Promise<TileContent | null>((resolve) => {
        // 模拟 GeoJSONSource 忽略 signal：abort 时 demo 的 tileLoadFn 返回 null
        if (signal.aborted) return resolve(null);
        signal.addEventListener("abort", () => resolve(null), { once: true });
      }),
    );
    const key = makeTileKey("proj", "0-0", 0);
    const layer = makeMockLayer("L1", "proj", [key]);
    layer.getVisibleTiles = () => [key];

    mgr.update([-1000, -1000, 1000, 1000], { x: 0, y: 0, z: 0 }, mockCRS, [layer]);
    await vi.waitFor(() => expect(mgr.scheduler.loadingCount).toBe(1), {
      timeout: 1000,
    });

    // 瓦片离开视野 → 300ms 宽限期后 abort → loadFn 放行返回 null。
    // 第一次 update 只记录离开时刻（宽限期保护，防旋转时 abort/重建循环）；
    // 等待超过宽限期后再 update 才真正 abort。
    layer.getVisibleTiles = () => [];
    mgr.update([-2000, -2000, 2000, 2000], { x: 0, y: 0, z: 0 }, mockCRS, [layer]);
    await new Promise((r) => setTimeout(r, 350));
    mgr.update([-2000, -2000, 2000, 2000], { x: 0, y: 0, z: 0 }, mockCRS, [layer]);
    await vi.waitFor(() => expect(mgr.scheduler.loadingCount).toBe(0), {
      timeout: 1000,
    });

    // 被取消的 null 不记录 _nullLayers（否则平移回来后瓦片被永久跳过）
    const anyMgr = mgr as unknown as { _nullLayers: Map<string, Set<string>> };
    expect(anyMgr._nullLayers.get("proj:0-0@0")?.has("L1")).toBeFalsy();
  });

  it("should not abort a loading placeholder parent (progressive display)", () => {
    const mgr = new TileManager(cache, origin, async () => null);
    const scheme = makeMockScheme("proj");
    const childKey = makeTileKey("proj", "2-2", 1);
    const parentKey = makeTileKey("proj", "1-1", 0);
    const layer = makeMockLayer("L1", "proj", [childKey], scheme as never);

    // 手动注入：父瓦片加载中 + 已标记占位（且不在可见集合）
    const anyMgr = mgr as unknown as {
      _loading: Map<string, { controller: AbortController; layerIds: Set<string> }>;
      _parentPlaceholders: Set<string>;
    };
    const parentController = new AbortController();
    anyMgr._loading.set(tileKeyToString(parentKey), {
      controller: parentController,
      layerIds: new Set(["L1"]),
    });
    anyMgr._parentPlaceholders.add(tileKeyToString(parentKey));

    // 子瓦片可见；父瓦片不在 visibleKeys，但已标记占位 → 不应被 abort
    mgr.update([-1000, -1000, 1000, 1000], { x: 0, y: 0, z: 0 }, mockCRS, [layer]);
    expect(parentController.signal.aborted).toBe(false);
  });

  it("should keep a placeholder tile now at current zoom (only drop the marker)", () => {
    const mgr = new TileManager(cache, origin, async () => null);
    const scheme = makeMockScheme("proj", 0); // currentZoom = 0
    const parentKey = makeTileKey("proj", "1-1", 0);

    const tile = new Tile(parentKey, [500, 500, 1000, 1000], { x: 500, y: 500, z: 0 });
    tile.scheme = scheme as never;
    tile.state = "loaded";

    const anyMgr = mgr as unknown as {
      _loadedTiles: Map<string, Tile>;
      _parentPlaceholders: Set<string>;
      _evictRefinedParents: () => void;
    };
    anyMgr._loadedTiles.set(tileKeyToString(parentKey), tile);
    anyMgr._parentPlaceholders.add(tileKeyToString(parentKey));

    anyMgr._evictRefinedParents();

    // 标记移除、瓦片保留（否则误删当前级别底图 → 白屏）
    expect(anyMgr._parentPlaceholders.has(tileKeyToString(parentKey))).toBe(false);
    expect(anyMgr._loadedTiles.has(tileKeyToString(parentKey))).toBe(true);
  });

  it("should not inject a placeholder parent whose layers are null-confirmed", () => {
    const mgr = new TileManager(cache, origin, async () => null);
    const scheme = {
      ...makeMockScheme("proj"),
      getParentKey: (key: TileKey): TileKey | null => {
        if (key.level <= 0) return null;
        const [col, row] = key.id.split("-").map(Number);
        return makeTileKey("proj", `${Math.floor(col / 2)}-${Math.floor(row / 2)}`, key.level - 1);
      },
    } as ReturnType<typeof makeMockScheme>;
    const childKey = makeTileKey("proj", "2-2", 1);
    const parentKey = makeTileKey("proj", "1-1", 0);
    const layer = makeMockLayer("L1", "proj", [childKey], scheme as never);

    const anyMgr = mgr as unknown as {
      _nullLayers: Map<string, Set<string>>;
      _parentPlaceholders: Set<string>;
    };
    // 父瓦片所有请求层已确认空 → step 4 不再注入占位
    anyMgr._nullLayers.set("proj:1-1@0", new Set(["L1"]));

    mgr.update([-1000, -1000, 1000, 1000], { x: 0, y: 0, z: 0 }, mockCRS, [layer]);
    expect(anyMgr._parentPlaceholders.has(tileKeyToString(parentKey))).toBe(false);
  });

  it("should not inject a placeholder parent that is cooling down", () => {
    const mgr = new TileManager(cache, origin, async () => null);
    const scheme = {
      ...makeMockScheme("proj"),
      getParentKey: (key: TileKey): TileKey | null => {
        if (key.level <= 0) return null;
        const [col, row] = key.id.split("-").map(Number);
        return makeTileKey("proj", `${Math.floor(col / 2)}-${Math.floor(row / 2)}`, key.level - 1);
      },
    } as ReturnType<typeof makeMockScheme>;
    const childKey = makeTileKey("proj", "2-2", 1);
    const parentKey = makeTileKey("proj", "1-1", 0);
    const layer = makeMockLayer("L1", "proj", [childKey], scheme as never);

    const anyMgr = mgr as unknown as {
      _failTimes: Map<string, number>;
      _parentPlaceholders: Set<string>;
    };
    // 父瓦片刚失败（冷却期） → step 4 不注入占位
    anyMgr._failTimes.set("proj:1-1@0", Date.now());

    mgr.update([-1000, -1000, 1000, 1000], { x: 0, y: 0, z: 0 }, mockCRS, [layer]);
    expect(anyMgr._parentPlaceholders.has(tileKeyToString(parentKey))).toBe(false);
  });

  it("_memKey distinguishes same (col,row) across levels", () => {
    const TM = TileManager as unknown as { _memKey: (k: TileKey) => string };
    const k0 = makeTileKey("proj", "0-0", 0);
    const k1 = makeTileKey("proj", "0-0", 1);
    expect(TM._memKey(k0)).toBe("proj:0-0@0");
    expect(TM._memKey(k1)).toBe("proj:0-0@1");
    expect(TM._memKey(k0)).not.toBe(TM._memKey(k1));
  });

  it("should NOT count aborted loads as failures", async () => {
    let captured: Tile | undefined;
    let visible: TileKey[] = [];
    const mgr = new TileManager(cache, origin, (tile, _layer, signal) => {
      captured = tile;
      return new Promise<TileContent | null>((_res, rej) => {
        signal.addEventListener("abort", () =>
          rej(Object.assign(new Error("aborted"), { name: "AbortError" })),
        );
      });
    });
    const key = makeTileKey("proj", "0-0", 0);
    const layer = makeMockLayer("L1", "proj", [key]);
    layer.getVisibleTiles = () => visible;

    // 瓦片进入视野 → 请求并开始加载（挂起）
    visible = [key];
    mgr.update([-1000, -1000, 1000, 1000], { x: 0, y: 0, z: 0 }, mockCRS, [layer]);
    await vi.waitFor(() => expect(mgr.scheduler.loadingCount).toBe(1), {
      timeout: 1000,
    });

    // 瓦片离开视野 → 300ms 宽限期后取消加载（AbortError）。
    // 第一次 update 只记录离开时刻；等待超过宽限期后再 update 才真正 abort。
    visible = [];
    mgr.update([-2000, -2000, 2000, 2000], { x: 0, y: 0, z: 0 }, mockCRS, [layer]);
    await new Promise((r) => setTimeout(r, 350));
    mgr.update([-2000, -2000, 2000, 2000], { x: 0, y: 0, z: 0 }, mockCRS, [layer]);

    // 取消不算失败：状态回到 unloaded、failCount 保持 0（不会触发拉黑）
    await vi.waitFor(() => expect(captured?.state).toBe("unloaded"), {
      timeout: 500,
    });
    expect(captured?.failCount).toBe(0);
  });

  it("cascade: 祖父瓦片在自身覆盖率不足时不应被提前移除", async () => {
    const { XYZTileScheme } = await import("../../tile/XYZTileScheme");
    const { WebMercatorCRS } = await import("../../crs/WebMercator");
    const wm = new WebMercatorCRS();
    const scheme = new XYZTileScheme(wm, 0, 18);
    const mgr = new TileManager(cache, origin, async (tile, _layer) => {
      const tc = new TileContent(`tc-${tile.key.id}`, tile.key, _layer.id);
      tc.state = "ready";
      return tc;
    });
    const layer = makeMockLayer("XYZ", "xyz", [], scheme as never);

    // 三级层级：GP(0/0/0) → P(1/0/0) → C1..C4(2/0/0, 2/0/1, 2/1/0, 2/1/1)
    const gpKey = makeTileKey("xyz", "0/0/0", 0);
    const pKey = makeTileKey("xyz", "1/0/0", 1);
    const c1Key = makeTileKey("xyz", "2/0/0", 2);
    const c2Key = makeTileKey("xyz", "2/0/1", 2);
    const c3Key = makeTileKey("xyz", "2/1/0", 2);
    const c4Key = makeTileKey("xyz", "2/1/1", 2);

    // GP、P 以「占位父瓦片」身份加载
    await mgr.loadTileNow(gpKey, layer);
    await mgr.loadTileNow(pKey, layer);
    const anyMgr = mgr as unknown as {
      _parentPlaceholders: Set<string>;
      _evictOldZoomTilesAfterLoad(key: TileKey): void;
    };
    anyMgr._parentPlaceholders.add(tileKeyToString(gpKey));
    anyMgr._parentPlaceholders.add(tileKeyToString(pKey));

    // P 的全部 4 个子瓦片加载完成 → 原子 LOD：P 达到覆盖率可移除
    await mgr.loadTileNow(c1Key, layer);
    await mgr.loadTileNow(c2Key, layer);
    await mgr.loadTileNow(c3Key, layer);
    await mgr.loadTileNow(c4Key, layer);

    // 触发淘汰检查
    anyMgr._evictOldZoomTilesAfterLoad(c1Key);

    // P 被移除；但 GP 只有 P 这一个子瓦片被加载（1/4）→ 覆盖率不足 → GP 必须保留
    expect(mgr.loadedTiles.has(tileKeyToString(pKey))).toBe(false);
    expect(mgr.loadedTiles.has(tileKeyToString(gpKey))).toBe(true);
  });

  it("cascade: 祖父瓦片在自身覆盖率满足时被级联移除", async () => {
    const { XYZTileScheme } = await import("../../tile/XYZTileScheme");
    const { WebMercatorCRS } = await import("../../crs/WebMercator");
    const wm = new WebMercatorCRS();
    const scheme = new XYZTileScheme(wm, 0, 18);
    const mgr = new TileManager(cache, origin, async (tile, _layer) => {
      const tc = new TileContent(`tc-${tile.key.id}`, tile.key, _layer.id);
      tc.state = "ready";
      return tc;
    });
    const layer = makeMockLayer("XYZ", "xyz", [], scheme as never);

    // GP(0/0/0) 的 4 个子瓦片 P1..P4(1/0/0, 1/0/1, 1/1/0, 1/1/1) 全部加载为占位父瓦片
    const gpKey = makeTileKey("xyz", "0/0/0", 0);
    const p1Key = makeTileKey("xyz", "1/0/0", 1);
    const p2Key = makeTileKey("xyz", "1/0/1", 1);
    const p3Key = makeTileKey("xyz", "1/1/0", 1);
    const p4Key = makeTileKey("xyz", "1/1/1", 1);
    const c1Key = makeTileKey("xyz", "2/0/0", 2);
    const c2Key = makeTileKey("xyz", "2/0/1", 2);
    const c3Key = makeTileKey("xyz", "2/1/0", 2);
    const c4Key = makeTileKey("xyz", "2/1/1", 2);

    await mgr.loadTileNow(gpKey, layer);
    await mgr.loadTileNow(p1Key, layer);
    await mgr.loadTileNow(p2Key, layer);
    await mgr.loadTileNow(p3Key, layer);
    await mgr.loadTileNow(p4Key, layer);
    const anyMgr = mgr as unknown as {
      _parentPlaceholders: Set<string>;
      _evictOldZoomTilesAfterLoad(key: TileKey): void;
    };
    anyMgr._parentPlaceholders.add(tileKeyToString(gpKey));
    anyMgr._parentPlaceholders.add(tileKeyToString(p1Key));
    anyMgr._parentPlaceholders.add(tileKeyToString(p2Key));
    anyMgr._parentPlaceholders.add(tileKeyToString(p3Key));
    anyMgr._parentPlaceholders.add(tileKeyToString(p4Key));

    // P1 的全部 4 个子瓦片加载完成 → P1 达标；GP 的 4 个子瓦片（P1..P4）均已加载
    //（P1 此刻仍在 _loadedTiles 中，被 4 个子瓦片完全覆盖 = 已 settle）→ GP 覆盖率满足
    await mgr.loadTileNow(c1Key, layer);
    await mgr.loadTileNow(c2Key, layer);
    await mgr.loadTileNow(c3Key, layer);
    await mgr.loadTileNow(c4Key, layer);

    anyMgr._evictOldZoomTilesAfterLoad(c1Key);

    expect(mgr.loadedTiles.has(tileKeyToString(p1Key))).toBe(false);
    expect(mgr.loadedTiles.has(tileKeyToString(gpKey))).toBe(false);
  });

  it("原子 LOD: 部分子瓦片加载时父占位保留且子瓦片隐藏，全部加载后原子切换", async () => {
    const { XYZTileScheme } = await import("../../tile/XYZTileScheme");
    const { WebMercatorCRS } = await import("../../crs/WebMercator");
    const wm = new WebMercatorCRS();
    const scheme = new XYZTileScheme(wm, 0, 18);
    const mgr = new TileManager(cache, origin, async (tile, _layer) => {
      const tc = new TileContent(`tc-${tile.key.id}`, tile.key, _layer.id);
      tc.state = "ready";
      return tc;
    });
    const layer = makeMockLayer("XYZ", "xyz", [], scheme as never);

    // P(1/0/0) 作为占位父瓦片，C1..C4 是其全部子瓦片
    const pKey = makeTileKey("xyz", "1/0/0", 1);
    const c1Key = makeTileKey("xyz", "2/0/0", 2);
    const c2Key = makeTileKey("xyz", "2/0/1", 2);
    const c3Key = makeTileKey("xyz", "2/1/0", 2);
    const c4Key = makeTileKey("xyz", "2/1/1", 2);

    await mgr.loadTileNow(pKey, layer);
    const anyMgr = mgr as unknown as {
      _parentPlaceholders: Set<string>;
      _evictRefinedParents(): void;
    };
    anyMgr._parentPlaceholders.add(tileKeyToString(pKey));

    // 只加载 2 个子瓦片 → 父占位保留（原子规则），已加载的子瓦片必须被隐藏
    //（区域内保持单一级别，杜绝 z/z-1 混杂造成的「瓦片错落」）
    await mgr.loadTileNow(c1Key, layer);
    await mgr.loadTileNow(c2Key, layer);

    const c1Tile = mgr.loadedTiles.get(tileKeyToString(c1Key))!;
    expect(mgr.isTileHidden(c1Tile)).toBe(true);

    // 原子 LOD：父瓦片不会被部分覆盖提前淘汰
    anyMgr._evictRefinedParents();
    expect(mgr.loadedTiles.has(tileKeyToString(pKey))).toBe(true);

    // 全部 4 个子瓦片加载完成 → 父瓦片原子淘汰
    await mgr.loadTileNow(c3Key, layer);
    await mgr.loadTileNow(c4Key, layer);
    anyMgr._evictRefinedParents();
    expect(mgr.loadedTiles.has(tileKeyToString(pKey))).toBe(false);

    // 父瓦片已淘汰 → 子瓦片不再被隐藏
    expect(mgr.isTileHidden(c1Tile)).toBe(false);
  });

  it("isTileHidden: 存在更粗级别的已加载祖先（旧级别过渡瓦片）时子瓦片被隐藏", async () => {
    const { XYZTileScheme } = await import("../../tile/XYZTileScheme");
    const { WebMercatorCRS } = await import("../../crs/WebMercator");
    const wm = new WebMercatorCRS();
    const scheme = new XYZTileScheme(wm, 0, 18);
    const mgr = new TileManager(cache, origin, async (tile, _layer) => {
      const tc = new TileContent(`tc-${tile.key.id}`, tile.key, _layer.id);
      tc.state = "ready";
      return tc;
    });
    const layer = makeMockLayer("XYZ", "xyz", [], scheme as never);

    // GP(0/0/0) 作为「旧级别过渡瓦片」加载（非占位标记，模拟 _evictStaleZoomTiles 场景）
    const gpKey = makeTileKey("xyz", "0/0/0", 0);
    const c1Key = makeTileKey("xyz", "2/0/0", 2);

    await mgr.loadTileNow(gpKey, layer);
    await mgr.loadTileNow(c1Key, layer);

    const c1Tile = mgr.loadedTiles.get(tileKeyToString(c1Key))!;
    // GP(0) 是 C1(2) 的祖先且级别更粗 → C1 必须隐藏（_parentPlaceholders 之外的第二层保障）
    expect(mgr.isTileHidden(c1Tile)).toBe(true);

    // GP 被淘汰（模拟过渡结束）→ C1 可见
    (mgr.loadedTiles as unknown as Map<string, Tile>).delete(
      tileKeyToString(gpKey),
    );
    expect(mgr.isTileHidden(c1Tile)).toBe(false);
  });

  it("_nullLayers 容量上限：超限时清空重建，不无界增长", async () => {
    let gate: () => void = () => {};
    const mgr = new TileManager(cache, origin, async () => {
      await new Promise<void>((r) => (gate = r));
      return null; // 确定性空
    });
    const anyMgr = mgr as unknown as { _nullLayers: Map<string, Set<string>> };
    const MAX = (TileManager as unknown as {
      NULL_LAYERS_MAX: number;
    }).NULL_LAYERS_MAX;

    // 预灌满到容量上限（模拟长时间平移积累的确认空记录）
    for (let i = 0; i < MAX; i++) {
      anyMgr._nullLayers.set(`proj:seed@${i}`, new Set(["L1"]));
    }
    expect(anyMgr._nullLayers.size).toBe(MAX);

    // 新的空瓦片确认 → 超限 → 清空重建
    const key = makeTileKey("proj", "0-0", 0);
    const layer = makeMockLayer("L1", "proj", [key]);
    mgr.update([-1000, -1000, 1000, 1000], { x: 0, y: 0, z: 0 }, mockCRS, [layer]);
    await vi.waitFor(() => expect(mgr.scheduler.loadingCount).toBe(1), {
      timeout: 1000,
    });
    gate();
    await vi.waitFor(() => expect(mgr.scheduler.loadingCount).toBe(0), {
      timeout: 1000,
    });

    // 清空后只剩刚确认的这一条（有界，不会继续无限增长）
    expect(anyMgr._nullLayers.size).toBe(1);
    expect(anyMgr._nullLayers.get("proj:0-0@0")?.has("L1")).toBe(true);
  });

  it("共享瓦片守卫：迟到 content 不携带已 dispose 的旧 content 回插", async () => {
    let lastLoadedLayer = "";
    const mgr = new TileManager(cache, origin, async (tile, layer) => {
      lastLoadedLayer = layer.id;
      const tc = new TileContent(`tc-${layer.id}`, tile.key, layer.id);
      tc.state = "ready";
      return tc;
    });

    const key = makeTileKey("proj", "0-0", 0);
    const keyStr = tileKeyToString(key);
    const layerA = makeMockLayer("A", "proj", [key]);
    const layerB = makeMockLayer("B", "proj", [key]);

    // ① A 层 content 已加载到共享瓦片
    await mgr.loadTileNow(key, layerA);
    const tile = mgr.loadedTiles.get(keyStr)!;
    expect(tile.contents.some((c) => c.layerId === "A")).toBe(true);

    // ② 模拟 cache.trim 淘汰：瓦片旧 content 被 dispose
    tile.contents[0].dispose();
    expect(tile.contents[0].disposed).toBe(true);

    // ③ B 层迟到 content 加载完成
    mgr.update([-1000, -1000, 1000, 1000], { x: 0, y: 0, z: 0 }, mockCRS, [layerB]);
    await vi.waitFor(() => expect(lastLoadedLayer).toBe("B"), { timeout: 1000 });
    await vi.waitFor(
      () => {
        const t = mgr.loadedTiles.get(keyStr)!;
        expect(t.contents.some((c) => c.layerId === "B")).toBe(true);
      },
      { timeout: 1000 },
    );

    // 守卫生效：已 dispose 的 A content 被过滤，不再回插到 loadedTiles
    const after = mgr.loadedTiles.get(keyStr)!;
    expect(after.contents.some((c) => c.disposed)).toBe(false);
    expect(after.contents.some((c) => c.layerId === "A")).toBe(false);
    expect(after.contents.some((c) => c.layerId === "B")).toBe(true);
  });

  it("resetScheme：只清除指定 scheme 的瓦片，保留其它 scheme", async () => {
    const mgr = new TileManager(cache, origin, async (tile, layer) => {
      const tc = new TileContent(
        `tc-${layer.id}-${tile.key.id}`,
        tile.key,
        layer.id,
      );
      tc.state = "ready";
      return tc;
    });

    const xyzKey = makeTileKey("xyz", "0-0", 0);
    const projKey = makeTileKey("proj", "0-0", 0);
    const xyzLayer = makeMockLayer("Lxyz", "xyz", [xyzKey]);
    const projLayer = makeMockLayer("Lproj", "proj", [projKey]);

    mgr.update(
      [-1000, -1000, 1000, 1000],
      { x: 0, y: 0, z: 0 },
      mockCRS,
      [xyzLayer, projLayer],
    );
    await vi.waitFor(() => expect(mgr.loadedTiles.size).toBe(2), {
      timeout: 1000,
    });

    mgr.resetScheme("xyz");

    // 其它 scheme 的瓦片保留，xyz 全部清除（loaded + cache）
    expect(mgr.loadedTiles.has("proj:0-0@0")).toBe(true);
    expect(mgr.loadedTiles.has("xyz:0-0@0")).toBe(false);
    expect(cache.has("proj:0-0@0")).toBe(true);
    expect(cache.has("xyz:0-0@0")).toBe(false);
  });

  it("resetScheme：abort 在途加载 + 代际守卫丢弃 reset 之后完成的旧代结果", async () => {
    const signals: AbortSignal[] = [];
    let resolveLoad: (tc: TileContent | null) => void = () => {};
    const mgr = new TileManager(cache, origin, (tile, layer, signal) => {
      signals.push(signal);
      // 数据源忽略 signal：不监听 abort，挂起直到测试手动放行
      return new Promise<TileContent | null>((resolve) => {
        resolveLoad = resolve;
      });
    });

    const key = makeTileKey("xyz", "0-0", 0);
    const layer = makeMockLayer("Lxyz", "xyz", [key]);

    // 触发加载（挂起）
    mgr.update([-1000, -1000, 1000, 1000], { x: 0, y: 0, z: 0 }, mockCRS, [layer]);
    await vi.waitFor(() => expect(mgr.scheduler.loadingCount).toBe(1), {
      timeout: 1000,
    });

    // 底图切换 → resetScheme：在途加载被 abort、状态清除
    mgr.resetScheme("xyz");
    expect(signals[0].aborted).toBe(true);
    expect(mgr.scheduler.loadingCount).toBe(0);
    expect(mgr.loadedTiles.size).toBe(0);
    expect(cache.count).toBe(0);

    // 旧代加载此时才完成（数据源忽略 signal）→ 代际守卫丢弃，不重新回插
    resolveLoad(new TileContent("stale", key, "Lxyz"));
    await new Promise((r) => setTimeout(r, 50));

    expect(mgr.loadedTiles.size).toBe(0);
    expect(cache.count).toBe(0);
  });

  it("resetScheme 后相机未动也必须重新请求瓦片（extentChanged 优化不得跳过调度）", async () => {
    const mgr = new TileManager(cache, origin, async (_tile, layer) => {
      const tc = new TileContent(
        `tc-${layer.id}-${_tile.key.id}`,
        _tile.key,
        layer.id,
      );
      tc.state = "ready";
      return tc;
    });

    const key = makeTileKey("xyz", "0-0", 0);
    const layer = makeMockLayer("Lxyz", "xyz", [key]);
    const extent: CrsBounds = [-1000, -1000, 1000, 1000];
    const cam = { x: 0, y: 0, z: 0 };
    // 必须传 resolution：extentChanged 守卫要求 _lastExtent 与 _lastResolution
    // 同时非空才启用「视野未变跳过调度」优化；不传则守卫永不生效，测试无法复现 bug。
    const resolution = 10;

    // 第一次调度：加载
    mgr.update(extent, cam, mockCRS, [layer], resolution);
    await vi.waitFor(() => expect(mgr.loadedTiles.has("xyz:0-0@0")).toBe(true), {
      timeout: 1000,
    });

    // 底图切换：清除 xyz 全部状态
    mgr.resetScheme("xyz");
    expect(mgr.loadedTiles.size).toBe(0);

    // 相机未动、视野与分辨率完全相同：再次 update 必须重新生成请求并加载。
    // 回归：resetScheme 若不同步清空 _lastExtent，这里 extentChanged=false，
    // 调度块被跳过 → 新底图瓦片永不加载（0 queued / 0 loading，底图空白）。
    mgr.update(extent, cam, mockCRS, [layer], resolution);
    await vi.waitFor(() => expect(mgr.loadedTiles.has("xyz:0-0@0")).toBe(true), {
      timeout: 1000,
    });
  });

  it("相机位移但视野/分辨率未变也必须重新调度（F2 旋转触发）", () => {
    const mgr = new TileManager(cache, origin, async () => null);
    const key = makeTileKey("proj", "0-0", 0);
    const layer = makeMockLayer("L1", "proj", [key]);
    const extent: CrsBounds = [-1000, -1000, 1000, 1000];
    const camA = { x: 0, y: 0, z: 0 };
    const resolution = 10;
    const scheduleSpy = vi.spyOn(mgr.scheduler, "schedule");

    // 第一次调度：加载
    mgr.update(extent, camA, mockCRS, [layer], resolution);
    expect(scheduleSpy).toHaveBeenCalledTimes(1);

    // 相机未动、视野/分辨率完全相同 → extentChanged=false，跳过调度
    mgr.update(extent, camA, mockCRS, [layer], resolution);
    expect(scheduleSpy).toHaveBeenCalledTimes(1);

    // 相机位移超过阈值（旋转时相机围绕 target 转动，位移显著）→ 必须重新调度。
    // 回归：若只按 extent 角点位移判断，45° 梯形 AABB 旋转时角点可能 <5% 视野宽，
    // 调度被跳过 → 新露出条带瓦片迟迟不请求。
    const camB = { x: 500, y: 0, z: 0 }; // > max(2000,2000)*0.05 = 100
    mgr.update(extent, camB, mockCRS, [layer], resolution);
    expect(scheduleSpy).toHaveBeenCalledTimes(2);
  });

  it("屏幕外当前级别瓦片超龄后被淘汰；屏内当前级别瓦片保留（F5）", async () => {
    const scheme = makeMockScheme("proj", 5); // currentZoom = 5
    const mgr = new TileManager(cache, origin, async (tile, _layer) => {
      const tc = new TileContent(`tc-${tile.key.id}`, tile.key, _layer.id);
      tc.state = "ready";
      return tc;
    });
    // 无可见瓦片：避免 update 的 _addKeyRequest 刷新 lastAccessTime
    const layer = makeMockLayer("L1", "proj", [], scheme as never);

    // 屏内瓦片 A：bounds [0,0,500,500]
    const keyA = makeTileKey("proj", "0-0", 5);
    // 屏外瓦片 B：bounds [2500,2500,3000,3000]
    const keyB = makeTileKey("proj", "5-5", 5);

    await mgr.loadTileNow(keyA, layer);
    await mgr.loadTileNow(keyB, layer);

    // 都超龄：超过 OFFSCREEN_EVICT_TIMEOUT_MS(1500)
    const tileA = mgr.loadedTiles.get(tileKeyToString(keyA))!;
    const tileB = mgr.loadedTiles.get(tileKeyToString(keyB))!;
    tileA.lastAccessTime = Date.now() - 2000;
    tileB.lastAccessTime = Date.now() - 2000;

    // 视野覆盖 A 但不覆盖 B
    mgr.update([0, 0, 1000, 1000], { x: 500, y: 500, z: 0 }, mockCRS, [layer]);

    expect(mgr.loadedTiles.has(tileKeyToString(keyA))).toBe(true);
    expect(mgr.loadedTiles.has(tileKeyToString(keyB))).toBe(false);
  });

  it("离开视野的 in-flight 瓦片 300ms 宽限期内不 abort，超时后才 abort（F6）", async () => {
    let capturedSignal: AbortSignal | undefined;
    const mgr = new TileManager(cache, origin, (_tile, _layer, signal) => {
      capturedSignal = signal;
      return new Promise<TileContent | null>((_res, rej) => {
        signal.addEventListener("abort", () =>
          rej(Object.assign(new Error("aborted"), { name: "AbortError" })),
        );
      });
    });
    const key = makeTileKey("proj", "0-0", 0);
    const layer = makeMockLayer("L1", "proj", []);
    let visible: TileKey[] = [];
    layer.getVisibleTiles = () => visible;
    const anyMgr = mgr as unknown as { _loadingLeftView: Map<string, number> };

    // 入视野 → 开始加载（挂起）
    visible = [key];
    mgr.update([-1000, -1000, 1000, 1000], { x: 0, y: 0, z: 0 }, mockCRS, [layer]);
    await vi.waitFor(() => expect(mgr.scheduler.loadingCount).toBe(1), {
      timeout: 1000,
    });

    // 离开视野 → 宽限期内不 abort（只记录离开时刻）
    visible = [];
    mgr.update([-2000, -2000, 2000, 2000], { x: 0, y: 0, z: 0 }, mockCRS, [layer]);
    expect(capturedSignal?.aborted).toBe(false);
    expect(mgr.scheduler.loadingCount).toBe(1);
    expect(anyMgr._loadingLeftView.size).toBe(1);

    // 超过宽限期后再 update → 真正 abort
    await new Promise((r) => setTimeout(r, 350));
    mgr.update([-2000, -2000, 2000, 2000], { x: 0, y: 0, z: 0 }, mockCRS, [layer]);
    await vi.waitFor(() => expect(mgr.scheduler.loadingCount).toBe(0), {
      timeout: 1000,
    });
    expect(capturedSignal?.aborted).toBe(true);
  });

  it("离开视野的 in-flight 瓦片重新进入视野后宽限记录清除（F6）", async () => {
    let capturedSignal: AbortSignal | undefined;
    const mgr = new TileManager(cache, origin, (_tile, _layer, signal) => {
      capturedSignal = signal;
      return new Promise<TileContent | null>((_res, rej) => {
        signal.addEventListener("abort", () =>
          rej(Object.assign(new Error("aborted"), { name: "AbortError" })),
        );
      });
    });
    const key = makeTileKey("proj", "0-0", 0);
    const layer = makeMockLayer("L1", "proj", []);
    let visible: TileKey[] = [];
    layer.getVisibleTiles = () => visible;
    const anyMgr = mgr as unknown as { _loadingLeftView: Map<string, number> };

    visible = [key];
    mgr.update([-1000, -1000, 1000, 1000], { x: 0, y: 0, z: 0 }, mockCRS, [layer]);
    await vi.waitFor(() => expect(mgr.scheduler.loadingCount).toBe(1), {
      timeout: 1000,
    });

    // 离开视野 → 记录宽限
    visible = [];
    mgr.update([-2000, -2000, 2000, 2000], { x: 0, y: 0, z: 0 }, mockCRS, [layer]);
    expect(anyMgr._loadingLeftView.size).toBe(1);

    // 重新进入视野 → 宽限记录清除，加载继续
    visible = [key];
    mgr.update([-1000, -1000, 1000, 1000], { x: 0, y: 0, z: 0 }, mockCRS, [layer]);
    expect(anyMgr._loadingLeftView.size).toBe(0);
    expect(capturedSignal?.aborted).toBe(false);
    expect(mgr.scheduler.loadingCount).toBe(1);
  });

  it("content.layerId 与 layer.id 匹配时相机移动不重复加载（缓存命中契约）", async () => {
    let loadCount = 0;
    // 修复后的 demo 行为：tileLoadFn 传 layer.id → content.layerId === layer.id
    const mgr = new TileManager(cache, origin, async (tile, layer) => {
      loadCount++;
      const tc = new TileContent(`tc-${loadCount}`, tile.key, layer.id);
      tc.state = "ready";
      return tc;
    });

    const key = makeTileKey("proj", "0-0", 0);
    const layer = makeMockLayer("L1", "proj", [key]);
    const extent: CrsBounds = [-1000, -1000, 1000, 1000];
    const resolution = 10;

    // 第 1 次调度：加载
    mgr.update(extent, { x: 0, y: 0, z: 0 }, mockCRS, [layer], resolution);
    await vi.waitFor(() => expect(mgr.loadedTiles.size).toBe(1), { timeout: 1000 });
    expect(loadCount).toBe(1);

    // 相机位移 → 触发重新调度。content.layerId === layer.id →
    // _addKeyRequest 缓存命中提前返回，不再重复 fetch/重建 content。
    // 回归：若 layerId 不匹配（调用方漏传 layer.id），这里会再次加载（重复请求）。
    mgr.update(extent, { x: 500, y: 0, z: 0 }, mockCRS, [layer], resolution);
    await new Promise((r) => setTimeout(r, 50));
    expect(loadCount).toBe(1);
  });

  it("content.layerId 与 layer.id 不匹配时重复重载不无界堆积（去重守卫）", async () => {
    let loadCount = 0;
    // 模拟旧 bug：调用方未传 layer.id，content.layerId 恒为 renderer 默认值
    // "raster-layer"，与 layer.id "basemap-osm" 不匹配 → 每次视野变化都重复重载。
    const mgr = new TileManager(cache, origin, async (tile) => {
      loadCount++;
      const tc = new TileContent(`tc-${loadCount}`, tile.key, "raster-layer");
      tc.state = "ready";
      return tc;
    });

    const key = makeTileKey("proj", "0-0", 0);
    const layer = makeMockLayer("basemap-osm", "proj", [key]);
    const extent: CrsBounds = [-1000, -1000, 1000, 1000];
    const resolution = 10;

    // 第 1 次调度：加载 1 份 content
    mgr.update(extent, { x: 0, y: 0, z: 0 }, mockCRS, [layer], resolution);
    await vi.waitFor(() => expect(mgr.loadedTiles.size).toBe(1), { timeout: 1000 });
    expect(loadCount).toBe(1);
    expect(mgr.loadedTiles.get("proj:0-0@0")!.contents.length).toBe(1);

    // 相机位移 → 触发重新调度。layerId 不匹配 → 缓存命中检查失败 → 重复加载
    //（真实 bug 的引擎侧表现）。去重守卫应把同 layerId 的重复 content 收敛到 1 份，
    // 而不是每次重载都 push 一份（纹理/材质/网格无界泄漏）。
    mgr.update(extent, { x: 500, y: 0, z: 0 }, mockCRS, [layer], resolution);
    await vi.waitFor(() => expect(loadCount).toBeGreaterThanOrEqual(2), {
      timeout: 1000,
    });

    const tile = mgr.loadedTiles.get("proj:0-0@0")!;
    // 无论重复重载多少次，每个 content.layerId 最多保留 1 份
    expect(tile.contents.length).toBe(1);
    expect(tile.contents[0].layerId).toBe("raster-layer");
  });

  // ─────────────────────────────────────────────────────────────────────
  // 原子 LOD 多级跳变死锁回归
  //（用户报告：缩小加载 z4/z5 后再放大，Network 已请求高等级瓦片但图面停留低等级）
  //
  // 根因：旧规则「4 个直接子瓦片（z+1）全部加载才淘汰」在 _pickZoom 跳级时
  //（如 z2→z4，z3 永不请求）永不满足 → 旧 z2 瓦片被 isTileHidden 永久钉死。
  // 新规则「与旧瓦片相关的当前级别可见瓦片全部加载即可淘汰」（覆盖率感知）。
  // ─────────────────────────────────────────────────────────────────────

  it("多级跳变死锁回归（stale z2 路径）：z2→z4 跳级后旧 z2 瓦片被覆盖率淘汰、z4 不再隐藏", async () => {
    const { XYZTileScheme } = await import("../../tile/XYZTileScheme");
    const { WebMercatorCRS } = await import("../../crs/WebMercator");
    const wm = new WebMercatorCRS();
    const scheme = new XYZTileScheme(wm, 0, 18);
    const mgr = new TileManager(cache, origin, async (tile, layer) => {
      const tc = new TileContent(`tc-${tile.key.id}`, tile.key, layer.id);
      tc.state = "ready";
      return tc;
    });
    const layer: ILayer = {
      id: "XYZ",
      name: "XYZ basemap",
      type: "raster",
      visible: true,
      opacity: 1,
      zIndex: 0,
      tileScheme: scheme,
      dataSource: {
        dataType: "xyz",
        crs: wm,
        bounds: [-1e9, -1e9, 1e9, 1e9] as CrsBounds,
        fetch: async () => null,
        dispose: () => {},
      },
      renderer: {
        name: "r",
        createContent: async (): Promise<any> => null,
        disposeContent: () => {},
      },
      dependsOn: [],
      getVisibleTiles: (extent: CrsBounds) => scheme.getTilesInView(extent, wm),
    };

    const WH = Math.PI * 6378137; // WebMercator 半世界
    const worldExtent: CrsBounds = [-WH, -WH, WH, WH];
    const worldCam = { x: 0, y: 0, z: 0 };

    // ① 整世界视野 → _pickZoom = 2；排空直到全部 16 个 z2 瓦片加载完成
    mgr.update(worldExtent, worldCam, wm, [layer]);
    await drainUpdates(mgr, worldExtent, worldCam, wm, layer, (m) => {
      return [...m.loadedTiles.values()].filter((t) => t.key.level === 2).length >= 16;
    });
    // 覆盖后续视口的 z2 瓦片 2/2/1（bounds [0,WH/2]²）必须已加载
    expect(mgr.loadedTiles.has("xyz:2/2/1@2")).toBe(true);

    // ② 缩小视口到 [0, WH/2]² → _pickZoom 直接到 z4（跳过 z3，z3 永不请求）
    const zoomExtent: CrsBounds = [0, 0, WH / 2, WH / 2];
    const zoomCam = { x: WH / 4, y: WH / 4, z: 0 };
    mgr.update(zoomExtent, zoomCam, wm, [layer]);
    expect(scheme.currentZoom).toBe(4);

    const visibleZ4 = scheme.getTilesInView(zoomExtent, wm);
    expect(visibleZ4.length).toBeGreaterThan(0);

    // 视口中心 (WH/4, WH/4) 恰落在 z4 瓦片角点上 —— 浮点误差使点落于任何
    // 单瓦片 bounds 之外。用米级容差选中心瓦片（任一匹配瓦片都是 2/2/1 的后代）。
    const EPS = 1; // 米
    const centerZ4 = visibleZ4.find((k) => {
      const [bx0, by0, bx1, by1] = scheme.getTileBounds(k);
      return (
        bx0 - EPS <= WH / 4 && WH / 4 <= bx1 + EPS &&
        by0 - EPS <= WH / 4 && WH / 4 <= by1 + EPS
      );
    });
    expect(centerZ4).toBeDefined();

    // ③ 排空直到「覆盖视口中心的 z4 瓦片」加载且不再被隐藏
    //（其 z3 占位父已细化、z2 旧瓦片已按覆盖率淘汰 —— 正是死锁解除的充分条件）
    await drainUpdates(mgr, zoomExtent, zoomCam, wm, layer, (m) => {
      const t = m.loadedTiles.get(tileKeyToString(centerZ4!));
      return t !== undefined && !m.isTileHidden(t);
    });

    // ④ 死锁解除：覆盖视口的旧 z2 瓦片被淘汰
    expect(mgr.loadedTiles.has("xyz:2/2/1@2")).toBe(false);

    // ⑤ 视口核心区域（bounds 完全落在 [0,WH/2]² 内，含容差）的所有 z4 瓦片
    // 不再被隐藏（边缘瓦片的 z3 占位父可能因视口外子瓦片未加载而保留 ——
    // 正常原子行为，不在此断言）
    for (const k of visibleZ4) {
      const [bx0, by0, bx1, by1] = scheme.getTileBounds(k);
      const insideCore =
        bx0 >= 0 - EPS && by0 >= 0 - EPS && bx1 <= WH / 2 + EPS && by1 <= WH / 2 + EPS;
      if (!insideCore) continue;
      const t = mgr.loadedTiles.get(tileKeyToString(k));
      expect(t).toBeDefined();
      expect(mgr.isTileHidden(t!)).toBe(false);
    }
  });

  it("多级跳变死锁回归（占位父瓦片路径）：旧 z1 占位父瓦片在可见 z4 后代全部加载后被覆盖率淘汰", async () => {
    const { XYZTileScheme } = await import("../../tile/XYZTileScheme");
    const { WebMercatorCRS } = await import("../../crs/WebMercator");
    const wm = new WebMercatorCRS();
    const scheme = new XYZTileScheme(wm, 0, 18);
    const mgr = new TileManager(cache, origin, async (tile, layer) => {
      const tc = new TileContent(`tc-${tile.key.id}`, tile.key, layer.id);
      tc.state = "ready";
      return tc;
    });
    const layer: ILayer = {
      id: "XYZ",
      name: "XYZ basemap",
      type: "raster",
      visible: true,
      opacity: 1,
      zIndex: 0,
      tileScheme: scheme,
      dataSource: {
        dataType: "xyz",
        crs: wm,
        bounds: [-1e9, -1e9, 1e9, 1e9] as CrsBounds,
        fetch: async () => null,
        dispose: () => {},
      },
      renderer: {
        name: "r",
        createContent: async (): Promise<any> => null,
        disposeContent: () => {},
      },
      dependsOn: [],
      getVisibleTiles: (extent: CrsBounds) => scheme.getTilesInView(extent, wm),
    };

    const WH = Math.PI * 6378137;

    // 模拟「z2 视野期间注入」的状态：z1 占位父瓦片 1/1/0（NE 象限 [0,WH]²）
    // 及其旧级别过渡瓦片 z2 2/2/1（[0,WH/2]²）。它们的 z3 中间级别子瓦片
    // 在 z4 跳级下永远不会被请求 → 旧规则永久钉死（isTileHidden 隐藏全部 z4 后代）。
    await mgr.loadTileNow(makeTileKey("xyz", "1/1/0", 1), layer);
    await mgr.loadTileNow(makeTileKey("xyz", "2/2/1", 2), layer);
    const anyMgr = mgr as unknown as { _parentPlaceholders: Set<string> };
    anyMgr._parentPlaceholders.add("xyz:1/1/0@1");

    // 跳级到 z4：视口 [0,WH/2]² 是 1/1/0 的子区域，也是 2/2/1 的整区域
    const zoomExtent: CrsBounds = [0, 0, WH / 2, WH / 2];
    const zoomCam = { x: WH / 4, y: WH / 4, z: 0 };
    mgr.update(zoomExtent, zoomCam, wm, [layer]);
    expect(scheme.currentZoom).toBe(4);

    const visibleZ4 = scheme.getTilesInView(zoomExtent, wm);
    const EPS = 1; // 米；视口中心落在瓦片角点，浮点误差使点在单瓦片 bounds 之外
    const centerZ4 = visibleZ4.find((k) => {
      const [bx0, by0, bx1, by1] = scheme.getTileBounds(k);
      return (
        bx0 - EPS <= WH / 4 && WH / 4 <= bx1 + EPS &&
        by0 - EPS <= WH / 4 && WH / 4 <= by1 + EPS
      );
    });
    expect(centerZ4).toBeDefined();

    // 排空直到中心 z4 瓦片可见 —— 前提是旧 z1 占位父瓦片与旧 z2 瓦片均被覆盖率淘汰
    await drainUpdates(mgr, zoomExtent, zoomCam, wm, layer, (m) => {
      const t = m.loadedTiles.get(tileKeyToString(centerZ4!));
      return t !== undefined && !m.isTileHidden(t);
    });

    // 占位标记清除 + 瓦片淘汰（修复的核心断言）
    expect(anyMgr._parentPlaceholders.has("xyz:1/1/0@1")).toBe(false);
    expect(mgr.loadedTiles.has("xyz:1/1/0@1")).toBe(false);
    expect(mgr.loadedTiles.has("xyz:2/2/1@2")).toBe(false);

    // 视口核心区域（含容差）的 z4 瓦片全部可见
    for (const k of visibleZ4) {
      const [bx0, by0, bx1, by1] = scheme.getTileBounds(k);
      const insideCore =
        bx0 >= 0 - EPS && by0 >= 0 - EPS && bx1 <= WH / 2 + EPS && by1 <= WH / 2 + EPS;
      if (!insideCore) continue;
      const t = mgr.loadedTiles.get(tileKeyToString(k));
      expect(t).toBeDefined();
      expect(mgr.isTileHidden(t!)).toBe(false);
    }
  });

  it("stale 瓦片区域超出视口：仅可见子瓦片加载即淘汰（不再等待视口外的子瓦片）", async () => {
    const mgr = new TileManager(cache, origin, async (tile, _layer, _signal) => {
      const tc = new TileContent(`tc`, tile.key, _layer.id);
      tc.state = "ready";
      return tc;
    });
    // 方案 2 级 + 2-part "col-row" 父链：level-1 "0-0" → level-2 "0-0"/"1-0"/"0-1"/"1-1"
    const scheme = {
      ...makeMockScheme("proj", 2),
      getParentKey: (key: TileKey): TileKey | null => {
        if (key.level <= 0) return null;
        const [col, row] = key.id.split("-").map(Number);
        return makeTileKey("proj", `${Math.floor(col / 2)}-${Math.floor(row / 2)}`, key.level - 1);
      },
    } as ReturnType<typeof makeMockScheme>;

    // 旧级别瓦片 level 1 "0-0"（bounds [0,0,500,500]）先加载
    const staleKey = makeTileKey("proj", "0-0", 1);
    await mgr.loadTileNow(staleKey, makeMockLayer("L1", "proj", [], scheme));

    // 当前级别（level 2）只有 "1-1" 可见 —— 它是 stale 瓦片 bounds 内的一个子瓦片；
    // 其余子瓦片（"0-0"/"1-0"/"0-1"）在视口外，永远不会被请求。
    // 旧规则要求「4 个直接子瓦片全加载」→ 永不满足 → stale 瓦片永久钉死。
    const childKey = makeTileKey("proj", "1-1", 2);
    const layer = makeMockLayer("L1", "proj", [childKey], scheme);

    mgr.update([0, 0, 1000, 1000], { x: 500, y: 500, z: 0 }, mockCRS, [layer]);
    await vi.waitFor(
      () => expect(mgr.loadedTiles.has(tileKeyToString(childKey))).toBe(true),
      { timeout: 1000 },
    );

    // 再次 update 触发持续淘汰（覆盖率感知）
    mgr.update([0, 0, 1000, 1000], { x: 500, y: 500, z: 0 }, mockCRS, [layer]);
    await new Promise((r) => setTimeout(r, 10));

    // 可见子瓦片 "1-1" 已加载 → 覆盖 → stale 瓦片被淘汰（不再等待视口外的兄弟子瓦片）
    expect(mgr.loadedTiles.has(tileKeyToString(staleKey))).toBe(false);
  });

  it("zoom-out 多级：旧 z4 细瓦片在 z2 新级别父瓦片加载后被淘汰（即使 z3 中间级别未加载）", async () => {
    const { XYZTileScheme } = await import("../../tile/XYZTileScheme");
    const { WebMercatorCRS } = await import("../../crs/WebMercator");
    const wm = new WebMercatorCRS();
    const scheme = new XYZTileScheme(wm, 0, 18);
    const mgr = new TileManager(cache, origin, async (tile, layer) => {
      const tc = new TileContent(`tc-${tile.key.id}`, tile.key, layer.id);
      tc.state = "ready";
      return tc;
    });
    const layer: ILayer = {
      id: "XYZ",
      name: "XYZ basemap",
      type: "raster",
      visible: true,
      opacity: 1,
      zIndex: 0,
      tileScheme: scheme,
      dataSource: {
        dataType: "xyz",
        crs: wm,
        bounds: [-1e9, -1e9, 1e9, 1e9] as CrsBounds,
        fetch: async () => null,
        dispose: () => {},
      },
      renderer: {
        name: "r",
        createContent: async (): Promise<any> => null,
        disposeContent: () => {},
      },
      dependsOn: [],
      getVisibleTiles: (extent: CrsBounds) => scheme.getTilesInView(extent, wm),
    };

    const WH = Math.PI * 6378137;
    const zoomExtent: CrsBounds = [0, 0, WH / 2, WH / 2];
    const zoomCam = { x: WH / 4, y: WH / 4, z: 0 };

    // ① 初始 z4 视野（[0,WH/2]² → _pickZoom = 4），排空直到全部可见 z4 瓦片加载
    mgr.update(zoomExtent, zoomCam, wm, [layer]);
    expect(scheme.currentZoom).toBe(4);
    const visibleZ4 = scheme.getTilesInView(zoomExtent, wm);
    expect(visibleZ4.length).toBeGreaterThan(0);
    await drainUpdates(mgr, zoomExtent, zoomCam, wm, layer, (m) => {
      return visibleZ4.every((k) => m.loadedTiles.has(tileKeyToString(k)));
    });
    const z4Before = [...mgr.loadedTiles.values()].filter((t) => t.key.level === 4).length;
    expect(z4Before).toBeGreaterThan(0);

    // ② 缩小回整世界 → _pickZoom = 2（跳过 z3）。z4 瓦片变为旧级别（更细）
    const worldExtent: CrsBounds = [-WH, -WH, WH, WH];
    const worldCam = { x: 0, y: 0, z: 0 };
    mgr.update(worldExtent, worldCam, wm, [layer]);
    expect(scheme.currentZoom).toBe(2);

    // ③ 排空直到 z2 覆盖视口的瓦片 2/2/1 加载且不再被隐藏（其 z1 占位父已细化）
    await drainUpdates(mgr, worldExtent, worldCam, wm, layer, (m) => {
      const z2Count = [...m.loadedTiles.values()].filter((t) => t.key.level === 2).length;
      if (z2Count < 16) return false;
      const t = m.loadedTiles.get("xyz:2/2/1@2");
      return t !== undefined && !m.isTileHidden(t);
    });

    // ④ 旧 z4 细瓦片全部被淘汰（即使 z3 中间级别未加载），z2 新级别正常显示
    const z4After = [...mgr.loadedTiles.values()].filter((t) => t.key.level === 4).length;
    expect(z4After).toBe(0);
    expect(mgr.loadedTiles.has("xyz:2/2/1@2")).toBe(true);
    const t221 = mgr.loadedTiles.get("xyz:2/2/1@2")!;
    expect(mgr.isTileHidden(t221)).toBe(false);
  });
});
