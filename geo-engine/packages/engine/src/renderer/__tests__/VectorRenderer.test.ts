// geo-engine/packages/engine/src/renderer/__tests__/VectorRenderer.test.ts

import { describe, it, expect } from "vitest";
import * as THREE from "three";
import { VectorRenderer } from "../VectorRenderer";
import { DefaultMaterialFactory } from "../IMaterialFactory";
import type { GeoFeature } from "../../source/GeoJSONSource";
import { Tile } from "../../tile/Tile";
import { makeTileKey } from "../../tile/TileKey";

function makeTile(ox = 0, oy = 0): Tile {
  const key = makeTileKey("test", "0-0", 0);
  return new Tile(key, [0, 0, 1000, 1000], { x: ox, y: oy, z: 0 });
}

function pointFeature(x: number, y: number): GeoFeature {
  return {
    type: "Point",
    coordinates: [x, y],
    properties: {},
    bbox: [x, y, x, y],
  };
}

function lineFeature(coords: number[][]): GeoFeature {
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const [cx, cy] of coords) {
    if (cx < minX) minX = cx;
    if (cy < minY) minY = cy;
    if (cx > maxX) maxX = cx;
    if (cy > maxY) maxY = cy;
  }
  return {
    type: "LineString",
    coordinates: coords,
    properties: {},
    bbox: [minX, minY, maxX, maxY],
  };
}

function polygonFeature(rings: number[][][]): GeoFeature {
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const ring of rings) {
    for (const [cx, cy] of ring) {
      if (cx < minX) minX = cx;
      if (cy < minY) minY = cy;
      if (cx > maxX) maxX = cx;
      if (cy > maxY) maxY = cy;
    }
  }
  return {
    type: "Polygon",
    coordinates: rings,
    properties: {},
    bbox: [minX, minY, maxX, maxY],
  };
}

describe("VectorRenderer", () => {
  const factory = new DefaultMaterialFactory();
  const renderer = new VectorRenderer(factory);

  it("should have a name", () => {
    expect(renderer.name).toBe("vector-renderer");
  });

  it("should accept custom name", () => {
    const r = new VectorRenderer(factory, "custom");
    expect(r.name).toBe("custom");
  });

  it("should create Points for Point feature", async () => {
    const tile = makeTile(500000, 3650000);
    const feature = pointFeature(500100, 3650100);

    const content = await renderer.createContent([feature], tile);
    expect(content.state).toBe("ready");
    expect(content.renderObjects).toHaveLength(1);

    const obj = content.renderObjects[0].object;
    expect(obj).toBeInstanceOf(THREE.Points);

    // Verify local coordinates
    const pos = (obj as THREE.Points).geometry.getAttribute("position");
    expect(pos.getX(0)).toBeCloseTo(100); // 500100 - 500000
    expect(pos.getY(0)).toBeCloseTo(100); // 3650100 - 3650000
  });

  it("should create Line for LineString feature", async () => {
    const tile = makeTile(0, 0);
    const feature = lineFeature([
      [10, 20],
      [30, 40],
    ]);

    const content = await renderer.createContent([feature], tile);
    expect(content.renderObjects).toHaveLength(1);

    const obj = content.renderObjects[0].object;
    expect(obj).toBeInstanceOf(THREE.Line);

    const pos = (obj as THREE.Line).geometry.getAttribute("position");
    expect(pos.count).toBe(2);
    expect(pos.getX(0)).toBe(10);
    expect(pos.getX(1)).toBe(30);
  });

  it("should create Mesh for Polygon feature", async () => {
    const tile = makeTile(0, 0);
    const feature = polygonFeature([
      [
        [10, 10],
        [30, 10],
        [30, 30],
        [10, 30],
        [10, 10], // close
      ],
    ]);

    const content = await renderer.createContent([feature], tile);
    expect(content.renderObjects).toHaveLength(1);

    const obj = content.renderObjects[0].object;
    expect(obj).toBeInstanceOf(THREE.Mesh);
  });

  it("should create Points for MultiPoint", async () => {
    const tile = makeTile(0, 0);
    const feature: GeoFeature = {
      type: "MultiPoint",
      coordinates: [
        [10, 10],
        [20, 20],
      ],
      properties: {},
      bbox: [10, 10, 20, 20],
    };

    const content = await renderer.createContent([feature], tile);
    expect(content.renderObjects).toHaveLength(1);

    const obj = content.renderObjects[0].object;
    expect(obj).toBeInstanceOf(THREE.Points);
    const pos = (obj as THREE.Points).geometry.getAttribute("position");
    expect(pos.count).toBe(2);
  });

  it("should create Group for MultiLineString", async () => {
    const tile = makeTile(0, 0);
    const feature: GeoFeature = {
      type: "MultiLineString",
      coordinates: [
        [
          [10, 10],
          [20, 20],
        ],
        [
          [30, 30],
          [40, 40],
        ],
      ],
      properties: {},
      bbox: [10, 10, 40, 40],
    };

    const content = await renderer.createContent([feature], tile);
    expect(content.renderObjects).toHaveLength(1);

    const obj = content.renderObjects[0].object;
    expect(obj).toBeInstanceOf(THREE.Group);
    expect((obj as THREE.Group).children).toHaveLength(2);
  });

  it("should create Mesh with hole for Polygon", async () => {
    const tile = makeTile(0, 0);
    // Outer ring + one hole
    const feature: GeoFeature = {
      type: "Polygon",
      coordinates: [
        [
          [0, 0],
          [100, 0],
          [100, 100],
          [0, 100],
          [0, 0],
        ],
        [
          [25, 25],
          [75, 25],
          [75, 75],
          [25, 75],
          [25, 25],
        ],
      ],
      properties: {},
      bbox: [0, 0, 100, 100],
    };

    const content = await renderer.createContent([feature], tile);
    expect(content.renderObjects).toHaveLength(1);
    expect(content.renderObjects[0].object).toBeInstanceOf(THREE.Mesh);
  });

  it("should create Group for MultiPolygon", async () => {
    const tile = makeTile(0, 0);
    const feature: GeoFeature = {
      type: "MultiPolygon",
      coordinates: [
        [
          [
            [0, 0],
            [10, 0],
            [10, 10],
            [0, 10],
            [0, 0],
          ],
        ],
        [
          [
            [20, 20],
            [30, 20],
            [30, 30],
            [20, 30],
            [20, 20],
          ],
        ],
      ],
      properties: {},
      bbox: [0, 0, 30, 30],
    };

    const content = await renderer.createContent([feature], tile);
    expect(content.renderObjects).toHaveLength(1);

    const obj = content.renderObjects[0].object;
    expect(obj).toBeInstanceOf(THREE.Group);
    expect((obj as THREE.Group).children).toHaveLength(2);
  });

  it("should handle empty features array", async () => {
    const tile = makeTile();
    const content = await renderer.createContent([], tile);
    expect(content.state).toBe("ready");
    expect(content.renderObjects).toHaveLength(0);
  });

  it("should skip unknown geometry types", async () => {
    const tile = makeTile();
    const feature: any = {
      type: "GeometryCollection",
      coordinates: [],
      properties: {},
      bbox: [0, 0, 0, 0],
    };

    const content = await renderer.createContent([feature], tile);
    expect(content.renderObjects).toHaveLength(0);
  });

  it("should set position to local coordinates", async () => {
    const tile = makeTile(500000, 3650000);
    const feature = pointFeature(500050, 3650050);

    const content = await renderer.createContent([feature], tile);
    const pos = (
      content.renderObjects[0].object as THREE.Points
    ).geometry.getAttribute("position");

    expect(pos.getX(0)).toBeCloseTo(50);
    expect(pos.getY(0)).toBeCloseTo(50);
    expect(pos.getZ(0)).toBe(0);
  });

  it("disposeContent should dispose geometries", async () => {
    const tile = makeTile();
    const feature = pointFeature(10, 20);

    const content = await renderer.createContent([feature], tile);
    const obj = content.renderObjects[0].object as THREE.Points;
    expect(obj.geometry).toBeDefined();

    renderer.disposeContent(content);
    expect(content.renderObjects[0].disposed).toBe(true);
  });

  it("should set renderOrder 1000 on rendered objects by default", async () => {
    const tile = makeTile();
    const feature = pointFeature(10, 20);

    const content = await renderer.createContent([feature], tile);
    const obj = content.renderObjects[0].object as THREE.Points;
    expect(obj.renderOrder).toBe(1000);
  });

  it("should respect custom renderOrder option", async () => {
    const r = new VectorRenderer(factory, "custom-order", { renderOrder: 5 });
    const tile = makeTile();
    const feature = lineFeature([
      [10, 20],
      [30, 40],
    ]);

    const content = await r.createContent([feature], tile);
    const obj = content.renderObjects[0].object as THREE.Line;
    expect(obj.renderOrder).toBe(5);
  });

  it("should apply depth bias to rendered material (polygonOffset + injection)", async () => {
    const freshFactory = new DefaultMaterialFactory();
    const r = new VectorRenderer(freshFactory, "bias");
    const tile = makeTile();
    const feature = pointFeature(10, 20);

    const content = await r.createContent([feature], tile);
    const mat = (content.renderObjects[0].object as THREE.Points)
      .material as THREE.PointsMaterial;

    expect(mat.polygonOffset).toBe(true);
    expect(mat.polygonOffsetFactor).toBe(-1);
    expect(mat.polygonOffsetUnits).toBe(-1);
    expect(mat.userData.__depthBiasApplied).toBe(true);
    // 共享材质仍然标有 shared（供上层淡入淡出识别）
    expect(mat.userData.shared).toBe(true);
  });

  it("DefaultMaterialFactory materials should be marked shared", () => {
    const f = new DefaultMaterialFactory();
    expect(f.createPointMaterial(pointFeature(0, 0)).userData.shared).toBe(true);
    expect(
      f.createLineMaterial(lineFeature([[0, 0], [1, 1]])).userData.shared,
    ).toBe(true);
    expect(
      f.createFillMaterial(polygonFeature([[[0, 0], [1, 0], [1, 1], [0, 0]]]))
        .userData.shared,
    ).toBe(true);
  });
});
