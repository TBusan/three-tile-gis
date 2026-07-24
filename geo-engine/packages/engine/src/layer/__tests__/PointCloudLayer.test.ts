// geo-engine/packages/engine/src/layer/__tests__/PointCloudLayer.test.ts

import { describe, it, expect } from "vitest";
import { PointCloudLayer } from "../PointCloudLayer";
import type { CrsBounds } from "../../core/types";
import { ProjectTileScheme } from "../../tile/ProjectTileScheme";
import { CGCS2000GKCRS } from "../../crs/CGCS2000GK";

function mockDataSource() {
  return {
    dataType: "pointcloud",
    crs: new CGCS2000GKCRS(38),
    bounds: [0, 0, 1000, 1000] as CrsBounds,
    fetch: async () => ({ positions: new Float32Array() }),
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

describe("PointCloudLayer", () => {
  const scheme = new ProjectTileScheme(500);
  const crs = new CGCS2000GKCRS(38);

  it("should create with default values", () => {
    const layer = new PointCloudLayer({
      name: "Test PointCloud",
      tileScheme: scheme,
      dataSource: mockDataSource(),
      renderer: mockRenderer(),
    });

    expect(layer.type).toBe("pointcloud");
    expect(layer.name).toBe("Test PointCloud");
    expect(layer.visible).toBe(true);
    expect(layer.opacity).toBe(1);
    expect(layer.zIndex).toBe(0);
  });

  it("should accept custom id with pointcloud prefix", () => {
    const layer = new PointCloudLayer({
      id: "my-pc",
      name: "Custom",
      tileScheme: scheme,
      dataSource: mockDataSource(),
      renderer: mockRenderer(),
    });

    expect(layer.id).toBe("my-pc");
  });

  it("should return visible tiles", () => {
    const layer = new PointCloudLayer({
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
    const layer = new PointCloudLayer({
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
    const dep = new PointCloudLayer({
      name: "Dependency",
      tileScheme: scheme,
      dataSource: mockDataSource(),
      renderer: mockRenderer(),
    });

    const layer = new PointCloudLayer({
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
