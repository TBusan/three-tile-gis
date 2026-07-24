// geo-engine/packages/engine/src/tile/__tests__/ProjectTileScheme.test.ts
import { describe, it, expect } from "vitest";
import { ProjectTileScheme } from "../ProjectTileScheme";
import { makeTileKey } from "../TileKey";
import { CGCS2000GKCRS } from "../../crs/CGCS2000GK";
import type { CrsBounds } from "../../core/types";

describe("ProjectTileScheme", () => {
  const scheme = new ProjectTileScheme(500);
  const crs = new CGCS2000GKCRS(38);

  it("should compute tile size at level", () => {
    expect(scheme.tileSizeAtLevel(0)).toBe(500);
    expect(scheme.tileSizeAtLevel(1)).toBe(1000);
    expect(scheme.tileSizeAtLevel(2)).toBe(2000);
  });

  it("should return correct bounds for a tile", () => {
    const key = makeTileKey("project-500", "2-3", 0);
    const bounds = scheme.getTileBounds(key);
    // col=2, row=3, size=500
    // xmin = 2*500 = 1000, xmax = 3*500 = 1500
    // ymax = -3*500 = -1500, ymin = -4*500 = -2000
    expect(bounds).toEqual([1000, -2000, 1500, -1500]);
  });

  it("should return tiles in view", () => {
    // View covering 0-1000 in x, 0-1000 in y
    const extent: CrsBounds = [0, 0, 1000, 1000];
    const keys = scheme.getTilesInView(extent, crs);
    // cols: floor(0/500)=0 to floor(1000/500)=2
    // rows: floor(0/500)=0 to floor(1000/500)=2
    expect(keys.length).toBe(9); // 3x3 grid
    expect(keys[0].level).toBe(0);
    expect(keys[0].schemeId).toBe("project-500");
  });

  it("should return parent key", () => {
    const child = makeTileKey("project-500", "4-6", 1);
    const parent = scheme.getParentKey(child);
    expect(parent).not.toBeNull();
    expect(parent!.id).toBe("2-3"); // floor(4/2)=2, floor(6/2)=3
    expect(parent!.level).toBe(0);
  });

  it("should return null parent for level 0", () => {
    const key = makeTileKey("project-500", "0-0", 0);
    expect(scheme.getParentKey(key)).toBeNull();
  });

  it("should return 4 child keys", () => {
    const parent = makeTileKey("project-500", "1-1", 0);
    const children = scheme.getChildKeys(parent);
    expect(children.length).toBe(4);
    const ids = children.map((c) => c.id).sort();
    expect(ids).toEqual(["2-2", "2-3", "3-2", "3-3"]);
  });

  it("should snap origin to baseTileSize", () => {
    const world = { x: 512345.67, y: 3654987.89, z: 123.45 };
    const origin = scheme.snapOrigin(world);
    expect(origin.x).toBe(512000); // floor(512345.67 / 500) * 500
    expect(origin.y).toBe(3654500);
    expect(origin.z).toBe(0);
  });
});
