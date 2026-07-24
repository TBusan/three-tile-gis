// geo-engine/packages/engine/src/crs/__tests__/Proj4CRS.test.ts

import { describe, it, expect } from "vitest";
import { Proj4CRS } from "../Proj4CRS";

describe("Proj4CRS", () => {
  // ── Basic construction ──────────────────────────────────────

  it("should create with EPSG code", () => {
    const crs = Proj4CRS.fromEPSG("EPSG:3857");
    expect(crs.name).toBe("EPSG:3857");
    expect(crs.units).toBe("meter");
  });

  it("should create with two EPSG codes", () => {
    const crs = new Proj4CRS("EPSG:4326", "EPSG:3857");
    expect(crs.name).toBe("EPSG:3857");
    expect(crs.units).toBe("meter");
  });

  it("should detect degree units for EPSG:4326", () => {
    const crs = Proj4CRS.fromEPSG("EPSG:4326");
    expect(crs.units).toBe("degree");
  });

  it("should detect degree units for CGCS2000 geographic with definition", () => {
    const crs = Proj4CRS.fromEPSG(
      "EPSG:4490",
      "+proj=longlat +ellps=GRS80 +no_defs",
    );
    expect(crs.units).toBe("degree");
  });

  // ── Round-trip ──────────────────────────────────────────────

  it("should round-trip EPSG:3857", () => {
    const crs = Proj4CRS.fromEPSG("EPSG:3857");
    const result = crs.unproject(
      crs.project(120, 30).x,
      crs.project(120, 30).y,
    );
    expect(result.lon).toBeCloseTo(120, 6);
    expect(result.lat).toBeCloseTo(30, 6);
  });

  it("should round-trip UTM zone 50N (EPSG:32650)", () => {
    const crs = Proj4CRS.fromEPSG("EPSG:32650");
    const result = crs.unproject(
      crs.project(117, 32).x,
      crs.project(117, 32).y,
    );
    expect(result.lon).toBeCloseTo(117, 5);
    expect(result.lat).toBeCloseTo(32, 5);
  });

  it("should round-trip for multiple locations", () => {
    const crs = Proj4CRS.fromEPSG("EPSG:3857");
    const points = [
      [0, 0],
      [120, 30],
      [-75, 40],
      [150, -20],
    ];
    for (const [lon, lat] of points) {
      const { x, y } = crs.project(lon, lat);
      const back = crs.unproject(x, y);
      expect(back.lon).toBeCloseTo(lon, 6);
      expect(back.lat).toBeCloseTo(lat, 6);
    }
  });

  // ── Known reference values ─────────────────────────────────

  it("should project EPSG:3857 origin", () => {
    const crs = Proj4CRS.fromEPSG("EPSG:3857");
    const result = crs.project(0, 0);
    expect(result.x).toBeCloseTo(0, 1);
    expect(result.y).toBeCloseTo(0, 1);
  });

  it("should match WebMercatorCRS within tolerance", () => {
    // Compare Proj4CRS("EPSG:3857") with built-in WebMercator formula
    const crs = Proj4CRS.fromEPSG("EPSG:3857");
    const testPoints = [
      [120, 30],
      [-75, 40],
      [0, 0],
      [150, -20],
    ];
    for (const [lon, lat] of testPoints) {
      const { x, y } = crs.project(lon, lat);
      // Web Mercator: x = lon/180 * PI * R, y = R * ln(tan(pi/4 + lat/2))
      const R = 6378137.0;
      const lonRad = (lon * Math.PI) / 180;
      const latRad = (lat * Math.PI) / 180;
      const expectedX = lonRad * R;
      const expectedY = R * Math.log(Math.tan(Math.PI / 4 + latRad / 2));
      expect(x).toBeCloseTo(expectedX, 2);
      expect(y).toBeCloseTo(expectedY, 2);
    }
  });

  // ── Custom definition ──────────────────────────────────────

  it("should accept custom PROJ definition", () => {
    // CGCS2000 GK 114 (3-degree zone with CM 114E)
    const crs = Proj4CRS.fromEPSG(
      "EPSG:4547",
      "+proj=tmerc +lat_0=0 +lon_0=114 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs",
    );
    expect(crs.units).toBe("meter");

    // Project (114, 30) — should be near (500000, ~3319700)
    const { x, y } = crs.project(114, 30);
    expect(x).toBeCloseTo(500000, 2);
    expect(y).toBeGreaterThan(3_300_000);
  });

  it("should round-trip custom definition", () => {
    const crs = Proj4CRS.fromEPSG(
      "EPSG:4547",
      "+proj=tmerc +lat_0=0 +lon_0=114 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs",
    );
    const result = crs.unproject(
      crs.project(116, 28).x,
      crs.project(116, 28).y,
    );
    expect(result.lon).toBeCloseTo(116, 5);
    expect(result.lat).toBeCloseTo(28, 5);
  });

  // ── Constructor with direct defs ───────────────────────────

  it("should accept two custom PROJ strings", () => {
    const from = "+proj=longlat +datum=WGS84 +no_defs";
    const to = "+proj=merc +a=6378137 +b=6378137 +lat_ts=0 +lon_0=0 +x_0=0 +y_0=0 +units=m +no_defs";
    const crs = new Proj4CRS(from, to);
    expect(crs.units).toBe("meter");

    const { x, y } = crs.project(0, 0);
    expect(x).toBeCloseTo(0, 1);
    expect(y).toBeCloseTo(0, 1);
  });

  // ── geographic → geographic ────────────────────────────────

  it("should handle geographic-to-geographic transformation", () => {
    const crs = Proj4CRS.fromEPSG("EPSG:4269"); // NAD83 geographic
    expect(crs.units).toBe("degree");

    // WGS84 lat/lon → NAD83 lat/lon (close but not identical)
    const { x, y } = crs.project(120, 30);
    expect(x).toBeCloseTo(120, 4);
    expect(y).toBeCloseTo(30, 4);
  });
});
