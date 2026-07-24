// geo-engine/packages/engine/src/layer/__tests__/RasterLayer.test.ts
import { describe, it, expect } from "vitest";
import { RasterLayer } from "../RasterLayer";
import { ProjectTileScheme } from "../../tile/ProjectTileScheme";
import { CGCS2000GKCRS } from "../../crs/CGCS2000GK";
import type { IDataSource } from "../../source/IDataSource";
import type { ILayerRenderer } from "../../renderer/ILayerRenderer";
import type { IProjectCRS } from "../../crs/IProjectCRS";
import type { CrsBounds } from "../../core/types";
import type { TileKey } from "../../tile/TileKey";
import type { Tile } from "../../tile/Tile";
import type { TileContent } from "../../tile/TileContent";

function makeFakeSource(): IDataSource {
  return {
    dataType: "fake",
    crs: { name: "fake", units: "meter" } as IProjectCRS,
    bounds: [0, 0, 1000, 1000] as CrsBounds,
    async fetch() { return null; },
    dispose() {},
  };
}

function makeFakeRenderer(): ILayerRenderer {
  return {
    name: "fake-renderer",
    async createContent(_data, _tile): Promise<TileContent> {
      throw new Error("not implemented");
    },
    disposeContent(_content) {},
  };
}

describe("RasterLayer", () => {
  const scheme = new ProjectTileScheme(500);
  const crs = new CGCS2000GKCRS(38);

  it("should create with default values", () => {
    const layer = new RasterLayer({
      name: "Test",
      tileScheme: scheme,
      dataSource: makeFakeSource(),
      renderer: makeFakeRenderer(),
    });

    expect(layer.name).toBe("Test");
    expect(layer.type).toBe("raster");
    expect(layer.visible).toBe(true);
    expect(layer.opacity).toBe(1);
    expect(layer.zIndex).toBe(0);
    expect(layer.dependsOn).toEqual([]);
  });

  it("should return visible tiles", () => {
    const layer = new RasterLayer({
      name: "Test",
      tileScheme: scheme,
      dataSource: makeFakeSource(),
      renderer: makeFakeRenderer(),
    });

    const extent: CrsBounds = [0, 0, 1000, 1000];
    const keys = layer.getVisibleTiles(extent, crs);
    expect(keys.length).toBeGreaterThan(0);
  });

  it("should return empty when not visible", () => {
    const layer = new RasterLayer({
      name: "Test",
      visible: false,
      tileScheme: scheme,
      dataSource: makeFakeSource(),
      renderer: makeFakeRenderer(),
    });

    const extent: CrsBounds = [0, 0, 1000, 1000];
    const keys = layer.getVisibleTiles(extent, crs);
    expect(keys).toEqual([]);
  });

  it("should accept DEM type", () => {
    const layer = new RasterLayer({
      name: "DEM",
      type: "dem",
      tileScheme: scheme,
      dataSource: makeFakeSource(),
      renderer: makeFakeRenderer(),
    });
    expect(layer.type).toBe("dem");
  });
});
