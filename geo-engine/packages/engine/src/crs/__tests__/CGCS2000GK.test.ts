import { describe, it, expect } from "vitest";
import { CGCS2000GKCRS } from "../CGCS2000GK";

describe("CGCS2000GKCRS", () => {
  const crs = new CGCS2000GKCRS(38); // 114°E

  it("should project a known point near central meridian", () => {
    const { x, y } = crs.project(114, 30);
    // 中央子午线附近：x ≈ 500000, y > 0
    expect(x).toBeCloseTo(500000, -2);
    expect(y).toBeGreaterThan(0);
  });

  it("should round-trip project/unproject", () => {
    const { x, y } = crs.project(113.5, 28.3);
    const { lon, lat } = crs.unproject(x, y);
    expect(lon).toBeCloseTo(113.5, 5);
    expect(lat).toBeCloseTo(28.3, 5);
  });

  it("should round-trip at equator", () => {
    const { x, y } = crs.project(115, 0);
    const { lon, lat } = crs.unproject(x, y);
    expect(lon).toBeCloseTo(115, 5);
    expect(lat).toBeCloseTo(0, 5);
  });

  it("should produce correct zone name", () => {
    expect(new CGCS2000GKCRS(38).name).toBe("CGCS2000_GK_38");
    expect(new CGCS2000GKCRS(37).name).toBe("CGCS2000_GK_37");
  });
});
