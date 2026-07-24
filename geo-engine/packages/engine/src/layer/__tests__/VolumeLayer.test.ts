// geo-engine/packages/engine/src/layer/__tests__/VolumeLayer.test.ts

import { describe, it, expect } from "vitest";
import { VolumeLayer } from "../VolumeLayer";
import type { CrsBounds } from "../../core/types";
import { ProjectTileScheme } from "../../tile/ProjectTileScheme";
import { CGCS2000GKCRS } from "../../crs/CGCS2000GK";

function mockDataSource() {
  return {
    dataType: "gpr",
    crs: new CGCS2000GKCRS(38),
    bounds: [0, 0, 1000, 1000] as CrsBounds,
    fetch: async () => ({
      data: new Float32Array(),
      dimensions: [10, 10, 10] as [number, number, number],
      bounds: [0, 0, 0, 100, 100, 100] as [
        number,
        number,
        number,
        number,
        number,
        number,
      ],
    }),
    dispose: () => {},
  };
}

function mockRenderer() {
  return {
    name: "test-renderer",
    createContent: async () => {
      throw new Error("not implemented");
    },
    disposeContent: () => {},
  };
}

describe("VolumeLayer", () => {
  const scheme = new ProjectTileScheme(500);
  const crs = new CGCS2000GKCRS(38);

  it("should create with default values", () => {
    const layer = new VolumeLayer({
      name: "Test Volume",
      tileScheme: scheme,
      dataSource: mockDataSource(),
      renderer: mockRenderer(),
    });

    expect(layer.type).toBe("volume");
    expect(layer.name).toBe("Test Volume");
    expect(layer.visible).toBe(true);
    expect(layer.opacity).toBe(1);
    expect(layer.zIndex).toBe(0);
  });

  it("should accept custom id with volume prefix", () => {
    const layer = new VolumeLayer({
      id: "my-vol",
      name: "Custom",
      tileScheme: scheme,
      dataSource: mockDataSource(),
      renderer: mockRenderer(),
    });

    expect(layer.id).toBe("my-vol");
  });

  it("should return visible tiles", () => {
    const layer = new VolumeLayer({
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
    const layer = new VolumeLayer({
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

  it("should have dependsOn", () => {
    const dep = new VolumeLayer({
      name: "Dependency",
      tileScheme: scheme,
      dataSource: mockDataSource(),
      renderer: mockRenderer(),
    });

    const layer = new VolumeLayer({
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
