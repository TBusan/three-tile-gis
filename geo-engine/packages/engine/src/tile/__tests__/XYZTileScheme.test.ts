// geo-engine/packages/engine/src/tile/__tests__/XYZTileScheme.test.ts
import { describe, it, expect } from "vitest";
import { XYZTileScheme } from "../XYZTileScheme";
import { WebMercatorCRS } from "../../crs/WebMercator";
import { CustomCRS } from "../../crs/CustomCRS";
import { makeTileKey } from "../TileKey";

/** EPSG:4326 经纬度 CRS：project/unproject 恒等，单位=度 */
function degreeCRS() {
  return new CustomCRS("EPSG:4326", "degree", {
    project: (lon, lat) => ({ x: lon, y: lat }),
    unproject: (x, y) => ({ lon: x, lat: y }),
  });
}

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

  it("zoom 稳定：相同分辨率下视野宽度不同（俯仰角变化）不跳级", () => {
    // 旧实现用视野包围盒宽度 viewWidth 选级：宽度随俯仰角扩展 → 纯倾斜也跳级
    //（请求瓦片时「等级错乱」）。新实现用分辨率（米/像素，俯仰无关）选级 →
    // 相同分辨率下即使包围盒宽度相差极大，选出的 zoom 也必须一致。
    const res = 76; // 米/像素（约 1600px 视口、6km 视高的典型值）
    const narrow = scheme.getTilesInView([-1000, -1000, 1000, 1000], wmCRS, res);
    const wide = scheme.getTilesInView(
      [-400000, -1000, 400000, 1000],
      wmCRS,
      res,
    );
    expect(narrow.length).toBeGreaterThan(0);
    expect(wide.length).toBeGreaterThan(0);
    // 两级选出的 zoom 必须相同（分辨率相同 → 目标瓦片尺寸相同）
    expect(wide[0].level).toBe(narrow[0].level);
    // 且必须落在 min/max 之间
    expect(narrow[0].level).toBeGreaterThanOrEqual(scheme.minZoom);
    expect(narrow[0].level).toBeLessThanOrEqual(scheme.maxZoom);
  });

  it("zoom 随分辨率单调变化：分辨率越细（米/像素越小）级别越高", () => {
    const coarse = scheme.getTilesInView([-1000, -1000, 1000, 1000], wmCRS, 400);
    const fine = scheme.getTilesInView([-1000, -1000, 1000, 1000], wmCRS, 50);
    // 相同视野、不同分辨率 → 分辨率越高（米/像素越小）zoom 越大
    expect(fine[0].level).toBeGreaterThanOrEqual(coarse[0].level);
  });

  it("degree CRS：分辨率(度/像素) 应换算为米/像素后选级，而不是永远顶到 maxZoom", () => {
    const geo = degreeCRS();
    const geoScheme = new XYZTileScheme(geo, 0, 18);
    // 北京附近 0.4° 视野（约 44km），分辨率 ≈ 0.00077 度/像素
    const extent: [number, number, number, number] = [116.2, 39.7, 116.6, 40.1];
    const tiles = geoScheme.getTilesInView(extent, geo, 0.00077);
    expect(tiles.length).toBeGreaterThan(0);
    // 关键：选出的 zoom 必须远小于 maxZoom。旧实现把 0.00077 度当米 →
    // targetZ = log2(4e7 / (0.00077×400)) ≈ 27 → 钳到 18（永远满级）。
    // 换算后 ≈ 85.7 米/像素 → targetZ ≈ 10。
    expect(tiles[0].level).toBeLessThan(15);
    expect(tiles[0].level).toBeGreaterThan(5);
    // 且应落在 min/max 之间
    expect(tiles[0].level).toBeGreaterThanOrEqual(geoScheme.minZoom);
    expect(tiles[0].level).toBeLessThanOrEqual(geoScheme.maxZoom);
  });

  it("degree CRS：getTileBounds 返回度单位的包围盒", () => {
    const geo = degreeCRS();
    const geoScheme = new XYZTileScheme(geo, 0, 18);
    // 3857 瓦片 2/1/0（东北象限顶层瓦片）
    const key = makeTileKey("xyz", "2/1/0", 2);
    const bounds = geoScheme.getTileBounds(key);
    // 度单位：经度 ∈ [-180,180]，纬度 ∈ [-90,90]
    expect(bounds[0]).toBeGreaterThanOrEqual(-180);
    expect(bounds[0]).toBeLessThan(180);
    expect(bounds[1]).toBeGreaterThanOrEqual(-90);
    expect(bounds[1]).toBeLessThan(90);
    expect(bounds[2]).toBeGreaterThan(bounds[0]);
    expect(bounds[3]).toBeGreaterThan(bounds[1]);
  });

  it("degree CRS：getReprojector 将瓦片归一化坐标映射为度单位平面坐标", () => {
    const geo = degreeCRS();
    const geoScheme = new XYZTileScheme(geo, 0, 18);
    // z=1 东北象限瓦片 1/1/0：3857 空间 x/y ∈ [0, WORLD_HALF]
    const key = makeTileKey("xyz", "1/1/0", 1);
    const reprojector = geoScheme.getReprojector(key)!;
    expect(reprojector).not.toBeNull();
    // 瓦片西南角 (u=0,v=0) 对应 3857 原点 → 经度 0°、纬度 0°
    const sw = reprojector(0, 0);
    expect(sw.x).toBeCloseTo(0, 3);
    expect(sw.y).toBeCloseTo(0, 3);
    // 瓦片东北角 (u=1,v=1) → 经度 180°、纬度 ≈85.05°（3857 上界）
    const ne = reprojector(1, 1);
    expect(ne.x).toBeCloseTo(180, 3);
    expect(ne.y).toBeGreaterThan(80);
    expect(ne.y).toBeLessThan(90);
  });
});
