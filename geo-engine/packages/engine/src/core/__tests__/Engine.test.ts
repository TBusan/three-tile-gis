// geo-engine/packages/engine/src/core/__tests__/Engine.test.ts
import { describe, it, expect } from "vitest";
import { Engine } from "../Engine";
import { CGCS2000GKCRS } from "../../crs/CGCS2000GK";
import { RasterLayer } from "../../layer/RasterLayer";
import { ProjectTileScheme } from "../../tile/ProjectTileScheme";
import type { IDataSource } from "../../source/IDataSource";
import type { ILayerRenderer } from "../../renderer/ILayerRenderer";
import type { IProjectCRS } from "../../crs/IProjectCRS";
import type { CrsBounds } from "../types";
import type { TileContent } from "../../tile/TileContent";
import type { Tile } from "../../tile/Tile";

function makeFakeLayer(name: string, zIndex = 0): RasterLayer {
  const fakeSource: IDataSource = {
    dataType: "fake",
    crs: { name: "fk", units: "meter" } as IProjectCRS,
    bounds: [0, 0, 1000, 1000] as CrsBounds,
    async fetch() { return null; },
    dispose() {},
  };
  const fakeRenderer: ILayerRenderer = {
    name: "fk",
    async createContent(_data: unknown, _tile: Tile): Promise<TileContent> {
      throw new Error("not implemented");
    },
    disposeContent() {},
  };
  return new RasterLayer({
    name,
    zIndex,
    tileScheme: new ProjectTileScheme(500),
    dataSource: fakeSource,
    renderer: fakeRenderer,
  });
}

describe("Engine", () => {
  it("should construct with required config", () => {
    const container = { clientWidth: 800, clientHeight: 600 } as HTMLElement;
    const engine = new Engine({
      crs: new CGCS2000GKCRS(38),
      container,
      tileLoadFn: async () => null,
    });

    expect(engine.crs.name).toBe("CGCS2000_GK_38");
    expect(engine.layerManager).toBeDefined();
    expect(engine.tileManager).toBeDefined();
    expect(engine.floatingOrigin).toBeDefined();
    expect(engine.cameraController).toBeDefined();
  });

  it("should accept initial layer groups", () => {
    const container = { clientWidth: 800, clientHeight: 600 } as HTMLElement;
    const engine = new Engine({
      crs: new CGCS2000GKCRS(38),
      container,
      tileLoadFn: async () => null,
      groups: [
        {
          id: "base",
          name: "底图",
          visible: true,
          opacity: 1,
          layers: [makeFakeLayer("L1")],
        },
      ],
    });

    expect(engine.layerManager.groups).toHaveLength(1);
    const visible = engine.layerManager.getVisibleLayers();
    expect(visible).toHaveLength(1);
  });

  it("should start and stop without errors", () => {
    // Mock browser globals (vitest jsdom style)
    const origWindow = (globalThis as any).window;
    const origRAF = (globalThis as any).requestAnimationFrame;
    const origCAF = (globalThis as any).cancelAnimationFrame;

    (globalThis as any).window = {
      addEventListener: () => {},
      removeEventListener: () => {},
    };
    (globalThis as any).requestAnimationFrame = (cb: Function) =>
      setTimeout(cb, 16) as any;
    (globalThis as any).cancelAnimationFrame = (id: any) =>
      clearTimeout(id) as any;

    const container = {
      clientWidth: 800,
      clientHeight: 600,
      addEventListener: () => {},
      removeEventListener: () => {},
    } as unknown as HTMLElement;

    try {
      const engine = new Engine({
        crs: new CGCS2000GKCRS(38),
        container,
        tileLoadFn: async () => null,
      });

      engine.start();
      // Let one frame execute
      engine.stop();
      expect(true).toBe(true); // no crash
    } finally {
      (globalThis as any).window = origWindow;
      (globalThis as any).requestAnimationFrame = origRAF;
      (globalThis as any).cancelAnimationFrame = origCAF;
    }
  });
});
