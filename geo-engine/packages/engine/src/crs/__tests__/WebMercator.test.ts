// geo-engine/packages/engine/src/crs/__tests__/WebMercator.test.ts
import { describe, it, expect } from "vitest";
import { WebMercatorCRS } from "../WebMercator";

describe("WebMercatorCRS", () => {
  const crs = new WebMercatorCRS();

  it("should have correct identity", () => {
    expect(crs.name).toBe("EPSG:3857");
    expect(crs.units).toBe("meter");
  });

  it("should project origin (0, 0) to (0, 0)", () => {
    const { x, y } = crs.project(0, 0);
    expect(x).toBeCloseTo(0, 6);
    expect(y).toBeCloseTo(0, 6);
  });

  it("should unproject (0, 0) to (0, 0)", () => {
    const { lon, lat } = crs.unproject(0, 0);
    expect(lon).toBeCloseTo(0, 6);
    expect(lat).toBeCloseTo(0, 6);
  });

  it("should round-trip for known point: London", () => {
    const lon = -0.1276;
    const lat = 51.5074;
    const projected = crs.project(lon, lat);
    const unprojected = crs.unproject(projected.x, projected.y);
    expect(unprojected.lon).toBeCloseTo(lon, 6);
    expect(unprojected.lat).toBeCloseTo(lat, 6);
  });

  it("should round-trip for known point: Tokyo", () => {
    const lon = 139.6917;
    const lat = 35.6895;
    const projected = crs.project(lon, lat);
    const unprojected = crs.unproject(projected.x, projected.y);
    expect(unprojected.lon).toBeCloseTo(lon, 6);
    expect(unprojected.lat).toBeCloseTo(lat, 6);
  });

  it("should round-trip for point in China (Beijing)", () => {
    const lon = 116.4074;
    const lat = 39.9042;
    const projected = crs.project(lon, lat);
    const unprojected = crs.unproject(projected.x, projected.y);
    expect(unprojected.lon).toBeCloseTo(lon, 6);
    expect(unprojected.lat).toBeCloseTo(lat, 6);
  });

  it("should project positive lon to positive x", () => {
    const { x } = crs.project(90, 0);
    expect(x).toBeGreaterThan(0);
  });

  it("should project negative lon to negative x", () => {
    const { x } = crs.project(-90, 0);
    expect(x).toBeLessThan(0);
  });

  it("should project positive lat to positive y", () => {
    const { y } = crs.project(0, 45);
    expect(y).toBeGreaterThan(0);
  });

  it("should handle edge: max latitude", () => {
    const { lon, lat } = crs.unproject(
      0,
      WebMercatorCRS["R"] * Math.log(Math.tan(Math.PI / 4 + (85.0511287798066 * Math.PI) / 360)),
    );
    expect(lat).toBeCloseTo(85.0511287798066, 4);
  });

  it("should clamp latitude", () => {
    expect(WebMercatorCRS.clampLat(90)).toBeLessThan(86);
    expect(WebMercatorCRS.clampLat(-90)).toBeGreaterThan(-86);
    expect(WebMercatorCRS.clampLat(45)).toBe(45);
  });
});
