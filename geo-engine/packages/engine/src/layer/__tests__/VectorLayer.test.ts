// geo-engine/packages/engine/src/layer/__tests__/VectorLayer.test.ts

import { describe, it, expect } from "vitest";
import { VectorLayer } from "../VectorLayer";
import { ProjectTileScheme } from "../../tile/ProjectTileScheme";
import { CGCS2000GKCRS } from "../../crs/CGCS2000GK";
import type { CrsBounds } from "../../core/types";
import { TileContent } from "../../tile/TileContent";
import { makeTileKey } from "../../tile/TileKey";

// Minimal mock data source implementing IDataSource
function mockDataSource() {
  return {
    dataType: "geojson",
    crs: new CGCS2000GKCRS(38),
    bounds: [0, 0, 1000, 1000] as CrsBounds,
    fetch: async () => [],
    dispose: () => {},
  };
}

function mockRenderer() {
  return {
    name: "test-renderer",
    createContent: async () => {
      const key = makeTileKey("test", "0-0", 0);
      return new TileContent("mock-content", key, "test-layer");
    },
    disposeContent: () => {},
  };
}

describe("VectorLayer", () => {
  const scheme = new ProjectTileScheme(500);
  const crs = new CGCS2000GKCRS(38);

  it("should create with default values", () => {
    const layer = new VectorLayer({
      name: "Test Vector",
      tileScheme: scheme,
      dataSource: mockDataSource(),
      renderer: mockRenderer(),
    });

    expect(layer.type).toBe("vector");
    expect(layer.name).toBe("Test Vector");
    expect(layer.visible).toBe(true);
    expect(layer.opacity).toBe(1);
    expect(layer.zIndex).toBe(0);
  });

  it("should accept custom id", () => {
    const layer = new VectorLayer({
      id: "my-layer",
      name: "Custom",
      tileScheme: scheme,
      dataSource: mockDataSource(),
      renderer: mockRenderer(),
    });

    expect(layer.id).toBe("my-layer");
  });

  it("should return visible tiles", () => {
    const layer = new VectorLayer({
      name: "Visible",
      tileScheme: scheme,
      dataSource: mockDataSource(),
      renderer: mockRenderer(),
    });

    const extent: CrsBounds = [0, 0, 1000, 1000];
    const keys = layer.getVisibleTiles(extent, crs);
    expect(keys.length).toBeGreaterThan(0);
  });

  it("should return empty when not visible", () => {
    const layer = new VectorLayer({
      name: "Hidden",
      tileScheme: scheme,
      dataSource: mockDataSource(),
      renderer: mockRenderer(),
      visible: false,
    });

    const extent: CrsBounds = [0, 0, 1000, 1000];
    const keys = layer.getVisibleTiles(extent, crs);
    expect(keys).toHaveLength(0);
  });

  it("should forward resolution to tile scheme", () => {
    const layer = new VectorLayer({
      name: "Res",
      tileScheme: scheme,
      dataSource: mockDataSource(),
      renderer: mockRenderer(),
    });

    const extent: CrsBounds = [0, 0, 1000, 1000];
    // resolution=1 should pick a different level than default (resolution=0 → level=0)
    const keysWithRes = layer.getVisibleTiles(extent, crs, 1);
    const keysNoRes = layer.getVisibleTiles(extent, crs);
    // At resolution=1, level 1: tileSize=1000m → 2×2=4 tiles
    // At resolution=0 (default), level 0: tileSize=500m → 4×4=16 tiles
    // They should differ
    expect(keysWithRes.length).not.toBe(keysNoRes.length);
    for (const k of keysWithRes) {
      expect(k.level).toBe(1);
    }
  });

  it("should accept custom type", () => {
    const layer = new VectorLayer({
      name: "DEM as Vector",
      type: "dem",
      tileScheme: scheme,
      dataSource: mockDataSource(),
      renderer: mockRenderer(),
    });

    expect(layer.type).toBe("dem");
  });

  it("should have dependsOn", () => {
    const dep = new VectorLayer({
      name: "Dependency",
      tileScheme: scheme,
      dataSource: mockDataSource(),
      renderer: mockRenderer(),
    });

    const layer = new VectorLayer({
      name: "Main",
      tileScheme: scheme,
      dataSource: mockDataSource(),
      renderer: mockRenderer(),
      dependsOn: [dep],
    });

    expect(layer.dependsOn).toHaveLength(1);
    expect(layer.dependsOn[0]).toBe(dep);
  });
});
