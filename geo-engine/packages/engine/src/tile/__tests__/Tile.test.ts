// geo-engine/packages/engine/src/tile/__tests__/Tile.test.ts
import { describe, it, expect } from "vitest";
import { Tile } from "../Tile";
import { TileContent, RenderObject } from "../TileContent";
import { makeTileKey } from "../TileKey";
import type { CrsBounds, CrsCoord } from "../../core/types";

describe("Tile", () => {
  const bounds: CrsBounds = [450000, 3130000, 451000, 3131000];
  const origin: CrsCoord = { x: 450000, y: 3130000, z: 0 };

  it("should create with correct initial state", () => {
    const key = makeTileKey("proj-500", "450000-3130000", 2);
    const tile = new Tile(key, bounds, origin);
    expect(tile.state).toBe("unloaded");
    expect(tile.contents).toEqual([]);
    expect(tile.failCount).toBe(0);
    expect(tile.id).toBe("proj-500:450000-3130000");
  });

  it("should accept appended TileContent", () => {
    const key = makeTileKey("proj-500", "0-0", 0);
    const tile = new Tile(key, bounds, origin);
    const content = new TileContent("c1", key, "layer-a");
    content.state = "ready";
    tile.contents.push(content);

    expect(tile.contents.length).toBe(1);
    expect(tile.contents[0].layerId).toBe("layer-a");
  });

  it("should reset to unloaded state", () => {
    const key = makeTileKey("proj-500", "0-0", 0);
    const tile = new Tile(key, bounds, origin);
    tile.state = "loaded";
    tile.contents.push(
      new TileContent("c1", key, "layer-a"),
    );
    tile.failCount = 3;
    tile.priority = 10;

    tile.reset();
    expect(tile.state).toBe("unloaded");
    expect(tile.contents.length).toBe(0);
    expect(tile.failCount).toBe(0);
    expect(tile.priority).toBe(0);
  });
});

describe("TileContent", () => {
  const key = makeTileKey("proj-500", "0-0", 0);

  it("should create with default state pending", () => {
    const tc = new TileContent("c1", key, "layer-a");
    expect(tc.state).toBe("pending");
    expect(tc.renderObjects).toEqual([]);
    expect(tc.id).toBe("c1");
  });

  it("should dispose render objects", () => {
    const tc = new TileContent("c1", key, "layer-a");
    let disposed = false;
    const ro = new RenderObject({ fake: true }, () => {
      disposed = true;
    });
    tc.renderObjects.push(ro);
    tc.state = "ready";

    tc.dispose();
    expect(disposed).toBe(true);
    expect(tc.disposed).toBe(true);
    expect(tc.renderObjects.length).toBe(0);
  });
});

describe("RenderObject", () => {
  it("should call disposeFn on dispose", () => {
    let count = 0;
    const obj = { name: "mesh" };
    const ro = new RenderObject(obj, () => {
      count++;
    });

    expect(ro.disposed).toBe(false);
    ro.dispose();
    expect(count).toBe(1);
    expect(ro.disposed).toBe(true);
  });

  it("should store the object reference", () => {
    const obj = { name: "test" };
    const ro = new RenderObject(obj, () => {});
    expect(ro.object).toBe(obj);
  });
});
