// geo-engine/packages/engine/src/crs/__tests__/UTMCRS.test.ts
import { describe, it, expect } from "vitest";
import { UTMCRS } from "../UTMCRS";

describe("UTMCRS", () => {
  it("should create with correct name for northern hemisphere", () => {
    const utm = new UTMCRS(50);
    expect(utm.name).toBe("UTM_Zone_50N");
    expect(utm.units).toBe("meter");
  });

  it("should create with correct name for southern hemisphere", () => {
    const utm = new UTMCRS(19, false);
    expect(utm.name).toBe("UTM_Zone_19S");
  });

  it("should roundtrip for a known point in Zone 50N (Beijing)", () => {
    const utm = new UTMCRS(50);
    const projected = utm.project(116.3972, 39.9075);
    const unprojected = utm.unproject(projected.x, projected.y);
    expect(unprojected.lon).toBeCloseTo(116.3972, 4);
    expect(unprojected.lat).toBeCloseTo(39.9075, 4);
  });

  it("should roundtrip for Zone 19S (Lima, Peru)", () => {
    const utm = new UTMCRS(19, false);
    const projected = utm.project(-77.0428, -12.0464);
    const unprojected = utm.unproject(projected.x, projected.y);
    expect(unprojected.lon).toBeCloseTo(-77.0428, 4);
    expect(unprojected.lat).toBeCloseTo(-12.0464, 4);
  });

  it("should roundtrip for equator (Zone 30N)", () => {
    const utm = new UTMCRS(30);
    const projected = utm.project(0, 0);
    const unprojected = utm.unproject(projected.x, projected.y);
    expect(unprojected.lon).toBeCloseTo(0, 4);
    expect(unprojected.lat).toBeCloseTo(0, 4);
  });

  it("should roundtrip for a point in Zone 1N", () => {
    const utm = new UTMCRS(1);
    const projected = utm.project(-180, 45);
    const unprojected = utm.unproject(projected.x, projected.y);
    expect(unprojected.lon).toBeCloseTo(-180, 3);
    expect(unprojected.lat).toBeCloseTo(45, 4);
  });

  it("should roundtrip for a point in Zone 60N", () => {
    const utm = new UTMCRS(60);
    const projected = utm.project(180, 45);
    const unprojected = utm.unproject(projected.x, projected.y);
    expect(unprojected.lon).toBeCloseTo(180, 3);
    expect(unprojected.lat).toBeCloseTo(45, 4);
  });

  it("should produce positive easting near central meridian", () => {
    const utm = new UTMCRS(50);
    // Central meridian of zone 50 = 50*6 - 183 = 117°
    const projected = utm.project(117, 40);
    expect(projected.x).toBeCloseTo(500000, -1); // false easting
  });

  it("should produce different false northing for N vs S", () => {
    const utmN = new UTMCRS(50, true);
    const utmS = new UTMCRS(50, false);
    const eqN = utmN.project(117, 0); // equator, northern
    const eqS = utmS.project(117, 0); // equator, southern
    // At equator, y(N) ≈ 0, y(S) ≈ 10000000
    expect(eqN.y).toBeCloseTo(0, -2);
    expect(eqS.y).toBeCloseTo(10000000, -2);
  });

  it("should reject invalid zone numbers", () => {
    expect(() => new UTMCRS(0)).toThrow("invalid zone");
    expect(() => new UTMCRS(61)).toThrow("invalid zone");
    expect(() => new UTMCRS(-1)).toThrow("invalid zone");
    expect(() => new UTMCRS(1.5)).toThrow("invalid zone");
  });

  it("should roundtrip for multiple locations in Zone 50N", () => {
    const utm = new UTMCRS(50);
    const points = [
      [117, 40],    // near central meridian
      [114, 30],    // zone edge
      [120, 35],    // east of CM
      [116.39, 39.90], // Beijing
    ];
    for (const [lon, lat] of points) {
      const p = utm.project(lon, lat);
      const u = utm.unproject(p.x, p.y);
      expect(u.lon).toBeCloseTo(lon, 4);
      expect(u.lat).toBeCloseTo(lat, 4);
    }
  });

  it("should match Proj4CRS within tolerance for Zone 50N", async () => {
    const { Proj4CRS } = await import("../Proj4CRS");
    const utm = new UTMCRS(50);
    const proj4utm = Proj4CRS.fromEPSG("EPSG:32650");

    const projected = utm.project(117, 40);
    const p4projected = proj4utm.project(117, 40);

    // Should be within ~1 meter of proj4
    expect(projected.x).toBeCloseTo(p4projected.x, 0);
    expect(projected.y).toBeCloseTo(p4projected.y, 0);
  });
});
