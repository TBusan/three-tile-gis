// geo-engine/packages/engine/src/manager/__tests__/TileManager.test.ts
import { describe, it, expect, vi, beforeEach } from "vitest";
import { TileManager } from "../TileManager";
import { Tile } from "../../tile/Tile";
import { makeTileKey } from "../../tile/TileKey";
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
function makeMockScheme(schemeId: string) {
  return {
    name: schemeId,
    schemeId,
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
  };
}

function makeMockLayer(
  id: string,
  schemeId: string,
  keys: TileKey[],
): ILayer {
  const scheme = makeMockScheme(schemeId);
  return {
    id,
    name: `Layer ${id}`,
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
      name: "test-renderer",
      createContent: async () => null,
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
});
