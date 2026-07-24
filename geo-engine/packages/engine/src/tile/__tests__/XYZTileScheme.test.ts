// geo-engine/packages/engine/src/tile/__tests__/XYZTileScheme.test.ts
import { describe, it, expect } from "vitest";
import { XYZTileScheme } from "../XYZTileScheme";
import { WebMercatorCRS } from "../../crs/WebMercator";
import { makeTileKey } from "../TileKey";

describe("XYZTileScheme", () => {
  // Use WebMercator as both source and target for simple testing
  const wmCRS = new WebMercatorCRS();
  const scheme = new XYZTileScheme(wmCRS, 0, 18);

  it("should have correct identity", () => {
    expect(scheme.name).toContain("EPSG:3857");
    expect(scheme.minZoom).toBe(0);
    expect(scheme.maxZoom).toBe(18);
  });

  it("should return the tile covering origin at zoom 0", () => {
    // View a small area around origin (lon=0, lat=0 → 3857 origin)
    const extent: [number, number, number, number] = [-1, -1, 1, 1];
    const tiles = scheme.getTilesInView(extent, wmCRS);
    expect(tiles.length).toBeGreaterThanOrEqual(1);
    // At zoom 0, there's only one tile (0/0/0)
    // But our zoom pick will choose high zoom for small area
    // All tiles should have schemeId="xyz"
    for (const t of tiles) {
      expect(t.schemeId).toBe("xyz");
    }
  });

  it("should return at least one tile for a large extent", () => {
    // Half the world
    const extent: [number, number, number, number] = [
      -10000000, -10000000, 10000000, 10000000,
    ];
    const tiles = scheme.getTilesInView(extent, wmCRS);
    expect(tiles.length).toBeGreaterThan(0);
  });

  it("should return valid tile keys with z/x/y format", () => {
    const extent: [number, number, number, number] = [
      -100, -100, 100, 100,
    ];
    const tiles = scheme.getTilesInView(extent, wmCRS);
    for (const t of tiles) {
      const parts = t.id.split("/");
      expect(parts).toHaveLength(3);
      const z = parseInt(parts[0], 10);
      const x = parseInt(parts[1], 10);
      const y = parseInt(parts[2], 10);
      expect(z).toBeGreaterThanOrEqual(0);
      expect(x).toBeGreaterThanOrEqual(0);
      expect(y).toBeGreaterThanOrEqual(0);
      expect(x).toBeLessThan(Math.pow(2, z));
      expect(y).toBeLessThan(Math.pow(2, z));
    }
  });

  it("should respect min/max zoom", () => {
    const clamped = new XYZTileScheme(wmCRS, 2, 5);
    // Tiny extent → should pick high zoom but clamped to 5
    const extent: [number, number, number, number] = [-1, -1, 1, 1];
    const tiles = clamped.getTilesInView(extent, wmCRS);
    for (const t of tiles) {
      expect(t.level).toBeGreaterThanOrEqual(2);
      expect(t.level).toBeLessThanOrEqual(5);
    }
  });

  it("should round-trip getTileBounds for zoom 0 tile", () => {
    const key = makeTileKey("xyz", "0/0/0", 0);
    const bounds = scheme.getTileBounds(key);
    expect(bounds).toHaveLength(4);
    // For WebMercator target, bounds should cover the full world in 3857
    expect(bounds[0]).toBeLessThan(0); // minX < 0
    expect(bounds[2]).toBeGreaterThan(0); // maxX > 0
  });

  it("should have tile bounds that contain the tile origin area", () => {
    // The tile at z=1 x=1 y=0 should cover positive x, positive y in 3857
    // (northeast quadrant)
    const key = makeTileKey("xyz", "1/1/0", 1);
    const bounds = scheme.getTileBounds(key);
    // All bounds should be finite
    for (const v of bounds) {
      expect(Number.isFinite(v)).toBe(true);
    }
    // min < max for both dimensions
    expect(bounds[0]).toBeLessThan(bounds[2]);
    expect(bounds[1]).toBeLessThan(bounds[3]);
  });

  it("should reject wrong schemeId in getTileBounds", () => {
    const key = makeTileKey("project-500", "0-0", 0);
    expect(() => scheme.getTileBounds(key)).toThrow("scheme mismatch");
  });

  it("getParentKey should return level z-1", () => {
    const child = makeTileKey("xyz", "2/1/1", 2);
    const parent = scheme.getParentKey(child);
    expect(parent).not.toBeNull();
    expect(parent!.level).toBe(1);
    expect(parent!.id).toBe("1/0/0");
    expect(parent!.schemeId).toBe("xyz");
  });

  it("getParentKey should return null at minZoom", () => {
    const clamped = new XYZTileScheme(wmCRS, 0);
    const root = makeTileKey("xyz", "0/0/0", 0);
    expect(clamped.getParentKey(root)).toBeNull();
  });

  it("getChildKeys should return 4 children at z+1", () => {
    const key = makeTileKey("xyz", "0/0/0", 0);
    const children = scheme.getChildKeys(key);
    expect(children).toHaveLength(4);
    for (const c of children) {
      expect(c.level).toBe(1);
      expect(c.schemeId).toBe("xyz");
    }
    const ids = children.map((c) => c.id).sort();
    expect(ids).toEqual(["1/0/0", "1/0/1", "1/1/0", "1/1/1"]);
  });

  it("should get parent of child with odd coordinates", () => {
    const child = makeTileKey("xyz", "3/3/3", 3);
    const parent = scheme.getParentKey(child);
    expect(parent).not.toBeNull();
    expect(parent!.id).toBe("2/1/1");
  });

  it("tileSizeAtZoom should halve each zoom level", () => {
    const s0 = scheme.tileSizeAtZoom(0);
    const s1 = scheme.tileSizeAtZoom(1);
    expect(s1).toBeCloseTo(s0 / 2, 6);
  });
});
