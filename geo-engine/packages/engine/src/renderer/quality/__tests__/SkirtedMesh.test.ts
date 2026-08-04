// geo-engine/packages/engine/src/renderer/quality/__tests__/SkirtedMesh.test.ts
import { describe, it, expect } from "vitest";
import { SkirtedMesh } from "../SkirtedMesh";
import type { CrsBounds, CrsCoord } from "../../../core/types";

describe("SkirtedMesh", () => {
  const bounds: CrsBounds = [0, 0, 100, 100];
  const origin: CrsCoord = { x: 0, y: 0, z: 0 };

  it("should have type 'skirted-mesh'", () => {
    const mesh = new SkirtedMesh(() => 0);
    expect(mesh.type).toBe("skirted-mesh");
  });

  it("should have more vertices than DemMesh due to skirts", () => {
    // DemMesh gridSize=4 → 25 vertices
    // SkirtedMesh adds 4*(4+1) = 20 skirt bottom vertices → 45 total
    const mesh = new SkirtedMesh(() => 0, 4);
    const geo = mesh.createGeometry(bounds, origin);
    expect(geo.getAttribute("position").count).toBe(45);
  });

  it("should have more triangles than DemMesh due to skirt quads", () => {
    // DemMesh: 4² × 2 = 32 terrain triangles → 96 indices
    // Skirt: 4 edges × 4 segments × 2 = 32 skirt triangles → 96 more indices
    // Total: 192 indices
    const mesh = new SkirtedMesh(() => 0, 4);
    const geo = mesh.createGeometry(bounds, origin);
    expect(geo.index!.count).toBe(192);
  });

  it("should set terrain vertices at correct elevation", () => {
    const mesh = new SkirtedMesh(() => 50, 2);
    const geo = mesh.createGeometry(bounds, origin);
    const pos = geo.getAttribute("position");

    // Terrain vertices (first 9) should have z=50
    for (let i = 0; i < 9; i++) {
      expect(pos.getZ(i)).toBeCloseTo(50, 5);
    }
  });

  it("should offset skirt bottom by skirtHeight", () => {
    const mesh = new SkirtedMesh(() => 30, 2, 10);
    const geo = mesh.createGeometry(bounds, origin);
    const pos = geo.getAttribute("position");

    // First terrain vertex z=30
    expect(pos.getZ(0)).toBeCloseTo(30, 5);

    // First skirt vertex (index 9) should have z = 30 - 10 = 20
    expect(pos.getZ(9)).toBeCloseTo(20, 5);
  });

  it("should clamp gridSize to [2, 64]", () => {
    expect(new SkirtedMesh(() => 0, 1).gridSize).toBe(2);
    expect(new SkirtedMesh(() => 0, 20).gridSize).toBe(20);
    expect(new SkirtedMesh(() => 0, 65).gridSize).toBe(64);
  });

  it("should compute vertex normals including skirts", () => {
    const mesh = new SkirtedMesh((x) => x * 0.1, 4, 50);
    const geo = mesh.createGeometry(bounds, origin);
    const normal = geo.getAttribute("normal");
    expect(normal).not.toBeNull();
    expect(normal.count).toBe(45);
  });

  it("should generate UVs for all vertices", () => {
    const mesh = new SkirtedMesh(() => 0, 4);
    const geo = mesh.createGeometry(bounds, origin);
    const uv = geo.getAttribute("uv");
    expect(uv.count).toBe(45);
  });
});
