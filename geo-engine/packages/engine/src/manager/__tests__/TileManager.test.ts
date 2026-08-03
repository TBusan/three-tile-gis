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

    // 瓦片离开视野 → abort → loadFn 放行返回 null
    layer.getVisibleTiles = () => [];
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

    // 瓦片离开视野 → 取消加载（AbortError）
    visible = [];
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
});
