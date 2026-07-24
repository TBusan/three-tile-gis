// geo-engine/packages/engine/src/crs/__tests__/CustomCRS.test.ts
import { describe, it, expect } from "vitest";
import { CustomCRS } from "../CustomCRS";

describe("CustomCRS", () => {
  const linearCRS = new CustomCRS("linear", "meter", {
    project: (lon, lat) => ({ x: lon * 1000, y: lat * 1000 }),
    unproject: (x, y) => ({ lon: x / 1000, lat: y / 1000 }),
  });

  it("should have correct name and units", () => {
    expect(linearCRS.name).toBe("linear");
    expect(linearCRS.units).toBe("meter");
  });

  it("should use user-provided project function", () => {
    const result = linearCRS.project(120, 40);
    expect(result.x).toBe(120000);
    expect(result.y).toBe(40000);
  });

  it("should use user-provided unproject function", () => {
    const result = linearCRS.unproject(120000, 40000);
    expect(result.lon).toBe(120);
    expect(result.lat).toBe(40);
  });

  it("should roundtrip correctly", () => {
    const projected = linearCRS.project(116.3972, 39.9075);
    const unprojected = linearCRS.unproject(projected.x, projected.y);
    expect(unprojected.lon).toBeCloseTo(116.3972, 10);
    expect(unprojected.lat).toBeCloseTo(39.9075, 10);
  });

  it("should support degree units", () => {
    const degCRS = new CustomCRS("identity", "degree", {
      project: (lon, lat) => ({ x: lon, y: lat }),
      unproject: (x, y) => ({ lon: x, lat: y }),
    });
    expect(degCRS.units).toBe("degree");
    const result = degCRS.project(10, 20);
    expect(result.x).toBe(10);
    expect(result.y).toBe(20);
  });

  it("should support offset transformations", () => {
    const offsetCRS = new CustomCRS("offset", "meter", {
      project: (lon, lat) => ({ x: lon + 100, y: lat + 200 }),
      unproject: (x, y) => ({ lon: x - 100, lat: y - 200 }),
    });
    const p = offsetCRS.project(50, 30);
    expect(p.x).toBe(150);
    expect(p.y).toBe(230);
    const u = offsetCRS.unproject(150, 230);
    expect(u.lon).toBe(50);
    expect(u.lat).toBe(30);
  });
});
