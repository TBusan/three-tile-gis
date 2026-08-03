// geo-engine/packages/engine/src/layer/__tests__/LayerManager.test.ts
import { describe, it, expect, beforeEach } from "vitest";
import { LayerManager, type ILayerGroup } from "../LayerManager";
import { RasterLayer } from "../RasterLayer";
import { ProjectTileScheme } from "../../tile/ProjectTileScheme";
import type { IDataSource } from "../../source/IDataSource";
import type { ILayerRenderer } from "../../renderer/ILayerRenderer";
import type { IProjectCRS } from "../../crs/IProjectCRS";
import type { CrsBounds } from "../../core/types";
import type { TileContent } from "../../tile/TileContent";

function makeLayer(name: string, zIndex = 0): RasterLayer {
  const fakeSource: IDataSource = {
    dataType: "fake",
    crs: { name: "fk", units: "meter" } as IProjectCRS,
    bounds: [0, 0, 1000, 1000] as CrsBounds,
    async fetch() { return null; },
    dispose() {},
  };
  const fakeRenderer: ILayerRenderer = {
    name: "fk",
    async createContent() { throw new Error("no"); },
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

describe("LayerManager", () => {
  let mgr: LayerManager;

  beforeEach(() => {
    mgr = new LayerManager();
  });

  it("should add groups", () => {
    const group: ILayerGroup = {
      id: "base",
      name: "底图",
      visible: true,
      opacity: 1,
      layers: [],
    };
    mgr.addGroup(group);
    expect(mgr.groups).toHaveLength(1);
    expect(mgr.groups[0].id).toBe("base");
  });

  it("should throw on duplicate group", () => {
    mgr.addGroup({ id: "g1", name: "G1", visible: true, opacity: 1, layers: [] });
    expect(() =>
      mgr.addGroup({ id: "g1", name: "G1-dup", visible: true, opacity: 1, layers: [] }),
    ).toThrow("already exists");
  });

  it("should add layers to group", () => {
    mgr.addGroup({ id: "base", name: "底图", visible: true, opacity: 1, layers: [] });
    const layer = makeLayer("L1");
    mgr.addLayerToGroup(layer, "base");
    expect(mgr.groups[0].layers).toHaveLength(1);
    expect(mgr.getLayer(layer.id)).toBe(layer);
  });

  it("should throw on unknown group", () => {
    const layer = makeLayer("L1");
    expect(() => mgr.addLayerToGroup(layer, "nonexistent")).toThrow("not found");
  });

  it("should get visible layers sorted by zIndex", () => {
    mgr.addGroup({ id: "g1", name: "G1", visible: true, opacity: 1, layers: [] });
    const l1 = makeLayer("bottom", 0);
    const l2 = makeLayer("middle", 5);
    const l3 = makeLayer("top", 10);
    mgr.addLayerToGroup(l1, "g1");
    mgr.addLayerToGroup(l2, "g1");
    mgr.addLayerToGroup(l3, "g1");

    const visible = mgr.getVisibleLayers();
    expect(visible).toHaveLength(3);
    expect(visible[0].zIndex).toBeLessThanOrEqual(visible[1].zIndex);
    expect(visible[1].zIndex).toBeLessThanOrEqual(visible[2].zIndex);
  });

  it("should skip invisible groups and layers", () => {
    mgr.addGroup({ id: "g1", name: "visible", visible: true, opacity: 1, layers: [] });
    mgr.addGroup({ id: "g2", name: "hidden", visible: false, opacity: 1, layers: [] });

    const l1 = makeLayer("L1");
    const l2 = makeLayer("L2");
    const l3 = makeLayer("L3");
    l3.visible = false;

    mgr.addLayerToGroup(l1, "g1");
    mgr.addLayerToGroup(l2, "g2");
    mgr.addLayerToGroup(l3, "g1");

    const visible = mgr.getVisibleLayers();
    expect(visible).toHaveLength(1);
    expect(visible[0].id).toBe(l1.id);
  });

  it("should remove layers", () => {
    mgr.addGroup({ id: "g1", name: "G1", visible: true, opacity: 1, layers: [] });
    const layer = makeLayer("L1");
    mgr.addLayerToGroup(layer, "g1");
    mgr.removeLayer(layer.id);
    expect(mgr.groups[0].layers).toHaveLength(0);
    expect(mgr.getLayer(layer.id)).toBeUndefined();
  });

  it("should move layer between groups", () => {
    mgr.addGroup({ id: "g1", name: "G1", visible: true, opacity: 1, layers: [] });
    mgr.addGroup({ id: "g2", name: "G2", visible: true, opacity: 1, layers: [] });
    const layer = makeLayer("L1");
    mgr.addLayerToGroup(layer, "g1");

    mgr.moveToGroup(layer.id, "g2");
    expect(mgr.groups[0].layers).toHaveLength(0);
    expect(mgr.groups[1].layers).toHaveLength(1);
  });

  it("should clear all", () => {
    mgr.addGroup({ id: "g1", name: "G1", visible: true, opacity: 1, layers: [] });
    const layer = makeLayer("L1");
    mgr.addLayerToGroup(layer, "g1");
    mgr.clear();
    expect(mgr.groups).toHaveLength(0);
    expect(mgr.getLayer(layer.id)).toBeUndefined();
  });

  it("should moveUp exchange with the layer above", () => {
    mgr.addGroup({ id: "g1", name: "G1", visible: true, opacity: 1, layers: [] });
    const bottom = makeLayer("bottom", 0);
    const middle = makeLayer("middle", 5);
    const top = makeLayer("top", 10);
    mgr.addLayerToGroup(bottom, "g1");
    mgr.addLayerToGroup(middle, "g1");
    mgr.addLayerToGroup(top, "g1");

    mgr.moveUp(middle.id);

    // middle gains the higher zIndex (was 5, now 10); top drops to 5
    expect(middle.zIndex).toBe(10);
    expect(top.zIndex).toBe(5);
    const visible = mgr.getVisibleLayers();
    expect(visible[1].id).toBe(top.id);
    expect(visible[2].id).toBe(middle.id);
  });

  it("should moveDown exchange with the layer below", () => {
    mgr.addGroup({ id: "g1", name: "G1", visible: true, opacity: 1, layers: [] });
    const bottom = makeLayer("bottom", 0);
    const middle = makeLayer("middle", 5);
    const top = makeLayer("top", 10);
    mgr.addLayerToGroup(bottom, "g1");
    mgr.addLayerToGroup(middle, "g1");
    mgr.addLayerToGroup(top, "g1");

    mgr.moveDown(middle.id);

    // middle drops to the lower zIndex (was 5, now 0); bottom rises to 5
    expect(middle.zIndex).toBe(0);
    expect(bottom.zIndex).toBe(5);
    const visible = mgr.getVisibleLayers();
    expect(visible[0].id).toBe(middle.id);
    expect(visible[1].id).toBe(bottom.id);
  });

  it("should no-op moveUp at top and moveDown at bottom", () => {
    mgr.addGroup({ id: "g1", name: "G1", visible: true, opacity: 1, layers: [] });
    const a = makeLayer("A", 0);
    const b = makeLayer("B", 10);
    mgr.addLayerToGroup(a, "g1");
    mgr.addLayerToGroup(b, "g1");

    mgr.moveUp(b.id); // already top → no-op
    mgr.moveDown(a.id); // already bottom → no-op
    expect(a.zIndex).toBe(0);
    expect(b.zIndex).toBe(10);
  });
});
