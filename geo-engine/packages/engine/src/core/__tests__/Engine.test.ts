// geo-engine/packages/engine/src/core/__tests__/Engine.test.ts
import { describe, it, expect, vi } from "vitest";
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

function makeFakeLayer(name: string, zIndex = 0, id?: string): RasterLayer {
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
    id,
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

  // ── Coordinate conversion tests ────────────────────────────────

  it("crsToWorld should return coord minus floating origin", () => {
    const container = { clientWidth: 800, clientHeight: 600 } as HTMLElement;
    const engine = new Engine({
      crs: new CGCS2000GKCRS(38),
      container,
      tileLoadFn: async () => null,
    });

    // At start, floating origin is {0, 0, 0}
    const world = engine.crsToWorld({ x: 500000, y: 3650000, z: 100 });
    expect(world.x).toBe(500000);
    expect(world.y).toBe(3650000);
    expect(world.z).toBe(100);
  });

  it("worldToCrs should return coord plus floating origin", () => {
    const container = { clientWidth: 800, clientHeight: 600 } as HTMLElement;
    const engine = new Engine({
      crs: new CGCS2000GKCRS(38),
      container,
      tileLoadFn: async () => null,
    });

    const crs = engine.worldToCrs({ x: 100, y: 200, z: 10 });
    expect(crs.x).toBe(100);
    expect(crs.y).toBe(200);
    expect(crs.z).toBe(10);
  });

  it("screenToCrs center of screen → center of frustum", () => {
    const container = { clientWidth: 800, clientHeight: 600 } as HTMLElement;
    const engine = new Engine({
      crs: new CGCS2000GKCRS(38),
      container,
      tileLoadFn: async () => null,
    });

    const camera = { left: -400, right: 400, top: 300, bottom: -300 };
    const result = engine.screenToCrs(
      camera,
      { x: 400, y: 300 }, // center of 800×600
      800,
      600,
    );

    // Center of screen → center of frustum → (0, 0) in world
    // worldToCrs(0, 0, 0) with origin {0, 0, 0} → {0, 0, 0}
    expect(result.x).toBeCloseTo(0, 1);
    expect(result.y).toBeCloseTo(0, 1);
  });

  it("crsToWorld round-trip with worldToCrs", () => {
    const container = { clientWidth: 800, clientHeight: 600 } as HTMLElement;
    const engine = new Engine({
      crs: new CGCS2000GKCRS(38),
      container,
      tileLoadFn: async () => null,
    });

    const original: { x: number; y: number; z: number } = {
      x: 500000,
      y: 3650000,
      z: 123.45,
    };

    const world = engine.crsToWorld(original);
    const back = engine.worldToCrs(world);

    expect(back.x).toBe(original.x);
    expect(back.y).toBe(original.y);
    expect(back.z).toBe(original.z);
  });

  it("replaceLayer：移除旧层、加入新层并重置旧 scheme 的瓦片", () => {
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
          layers: [makeFakeLayer("L1", 0, "L1")],
        },
      ],
    });

    const oldLayer = engine.layerManager.getLayer("L1")!;
    const resetSpy = vi.spyOn(engine.tileManager, "resetScheme");
    const newLayer = makeFakeLayer("L2", 0, "L2");

    engine.replaceLayer("L1", newLayer);

    // 旧层从组与索引中移除，新层加入原组
    expect(engine.layerManager.getLayer("L1")).toBeUndefined();
    expect(engine.layerManager.getLayer("L2")).toBe(newLayer);
    expect(engine.layerManager.groups[0].layers).toContain(newLayer);
    expect(engine.layerManager.groups[0].layers).not.toContain(oldLayer);

    // 旧底图 scheme（project-500）的瓦片被整体重置
    expect(resetSpy).toHaveBeenCalledOnce();
    expect(resetSpy).toHaveBeenCalledWith("project-500");
  });

  it("replaceLayer：旧图层不存在时抛出", () => {
    const container = { clientWidth: 800, clientHeight: 600 } as HTMLElement;
    const engine = new Engine({
      crs: new CGCS2000GKCRS(38),
      container,
      tileLoadFn: async () => null,
    });

    expect(() => engine.replaceLayer("nope", makeFakeLayer("L2"))).toThrow(
      /not found/,
    );
  });
});
