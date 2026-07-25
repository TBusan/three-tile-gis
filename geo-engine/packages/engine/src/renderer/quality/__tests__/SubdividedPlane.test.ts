// geo-engine/packages/engine/src/renderer/quality/__tests__/SubdividedPlane.test.ts

import { describe, it, expect } from "vitest";
import * as THREE from "three";
import { SubdividedPlane } from "../SubdividedPlane";
import type { CrsBounds, CrsCoord } from "../../../core/types";

describe("SubdividedPlane", () => {
  const bounds: CrsBounds = [0, 0, 100, 100];
  const origin: CrsCoord = { x: 0, y: 0, z: 0 };

  it("should have type 'subdivided'", () => {
    const plane = new SubdividedPlane(4);
    expect(plane.type).toBe("subdivided");
  });

  it("should create correct vertex count for gridSize=2", () => {
    const plane = new SubdividedPlane(2);
    const geo = plane.createGeometry(bounds, origin);
    const positions = geo.getAttribute("position");
    expect(positions.count).toBe(9); // (2+1)×(2+1)
  });

  it("should create correct vertex count for gridSize=4", () => {
    const plane = new SubdividedPlane(4);
    const geo = plane.createGeometry(bounds, origin);
    const positions = geo.getAttribute("position");
    expect(positions.count).toBe(25); // (4+1)×(4+1)
  });

  it("should create correct vertex count for gridSize=8", () => {
    const plane = new SubdividedPlane(8);
    const geo = plane.createGeometry(bounds, origin);
    const positions = geo.getAttribute("position");
    expect(positions.count).toBe(81); // (8+1)×(8+1)
  });

  it("should create indexed geometry", () => {
    const plane = new SubdividedPlane(4);
    const geo = plane.createGeometry(bounds, origin);
    expect(geo.index).not.toBeNull();
  });

  it("should create correct triangle count for gridSize=4", () => {
    const plane = new SubdividedPlane(4);
    const geo = plane.createGeometry(bounds, origin);
    // 4×4 quads × 2 triangles = 32 triangles → 96 indices
    expect(geo.index!.count).toBe(96); // 4² × 2 × 3
  });

  it("should create correct triangle count for gridSize=2", () => {
    const plane = new SubdividedPlane(2);
    const geo = plane.createGeometry(bounds, origin);
    expect(geo.index!.count).toBe(24); // 2² × 2 × 3
  });

  it("should offset vertices by origin", () => {
    const shiftedOrigin: CrsCoord = { x: 50, y: 50, z: 0 };
    const plane = new SubdividedPlane(2);
    const geo = plane.createGeometry(bounds, shiftedOrigin);

    const pos = geo.getAttribute("position") as THREE.BufferAttribute;
    // Center vertex (gridSize=2, row=1, col=1) should be at (50-50, 50-50, 0) = (0, 0, 0)
    const centerIdx = 1 * 3 + 1; // row=1, col=1, 3-wide stride
    expect(pos.getX(centerIdx)).toBeCloseTo(0, 5);
    expect(pos.getY(centerIdx)).toBeCloseTo(0, 5);

    // Corner vertex (0,0)→(0-50, 0-50) = (-50, -50)
    expect(pos.getX(0)).toBeCloseTo(-50, 5);
    expect(pos.getY(0)).toBeCloseTo(-50, 5);
  });

  it("should generate UVs from (0,0) to (1,1)", () => {
    const plane = new SubdividedPlane(4);
    const geo = plane.createGeometry(bounds, origin);
    const uv = geo.getAttribute("uv");

    // First vertex (row=0, col=0) → UV = (0, 0)
    expect(uv.getX(0)).toBeCloseTo(0, 5);
    expect(uv.getY(0)).toBeCloseTo(0, 5);

    // Last vertex (row=4, col=4) → UV = (1, 1)
    const lastIdx = 5 * 5 - 1; // (4+1)×(4+1)-1 = 24
    expect(uv.getX(lastIdx)).toBeCloseTo(1, 5);
    expect(uv.getY(lastIdx)).toBeCloseTo(1, 5);
  });

  it("should clamp gridSize to [2, 64]", () => {
    expect(new SubdividedPlane(0).gridSize).toBe(2);
    expect(new SubdividedPlane(1).gridSize).toBe(2);
    expect(new SubdividedPlane(20).gridSize).toBe(20);
    expect(new SubdividedPlane(100).gridSize).toBe(64);
    expect(new SubdividedPlane(8).gridSize).toBe(8);
  });

  it("gridSizeForZoom should return finer grid for lower zoom", () => {
    // 低 zoom（全球视图）→ 更细网格；高 zoom → 更粗
    expect(SubdividedPlane.gridSizeForZoom(0)).toBe(48);
    expect(SubdividedPlane.gridSizeForZoom(1)).toBe(48);
    expect(SubdividedPlane.gridSizeForZoom(2)).toBe(32);
    expect(SubdividedPlane.gridSizeForZoom(3)).toBe(32);
    expect(SubdividedPlane.gridSizeForZoom(4)).toBe(16);
    expect(SubdividedPlane.gridSizeForZoom(5)).toBe(16);
    expect(SubdividedPlane.gridSizeForZoom(8)).toBe(8);
    expect(SubdividedPlane.gridSizeForZoom(9)).toBe(4);
    expect(SubdividedPlane.gridSizeForZoom(11)).toBe(4);
    expect(SubdividedPlane.gridSizeForZoom(12)).toBe(2);
    expect(SubdividedPlane.gridSizeForZoom(20)).toBe(2);
  });

  it("adaptive mode should pick grid density from level", () => {
    const adaptive = new SubdividedPlane(4, true);
    // level 0（全球）→ gridSizeForZoom(0)=48 → (48+1)²=2401 顶点
    const geoLow = adaptive.createGeometry(bounds, origin, undefined, 0);
    expect(geoLow.getAttribute("position").count).toBe(2401);
    // level 13（近距）→ gridSizeForZoom(13)=2 → 9 顶点
    const geoHigh = adaptive.createGeometry(bounds, origin, undefined, 13);
    expect(geoHigh.getAttribute("position").count).toBe(9);
  });

  it("non-adaptive mode should ignore level", () => {
    const fixed = new SubdividedPlane(4); // adaptive 默认 false
    // 即使传入 level 0，仍用固定 gridSize=4 → 25 顶点
    const geo = fixed.createGeometry(bounds, origin, undefined, 0);
    expect(geo.getAttribute("position").count).toBe(25);
  });

  it("should compute vertex normals", () => {
    const plane = new SubdividedPlane(4);
    const geo = plane.createGeometry(bounds, origin);
    const normal = geo.getAttribute("normal");
    expect(normal).not.toBeNull();
    // All normals should point up (0,0,1) for a flat plane
    expect(normal.getZ(0)).toBeCloseTo(1, 5);
  });
});
