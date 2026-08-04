// geo-engine/packages/engine/src/renderer/quality/__tests__/DemMesh.test.ts
import { describe, it, expect } from "vitest";
import { DemMesh } from "../DemMesh";
import type { CrsBounds, CrsCoord } from "../../../core/types";

describe("DemMesh", () => {
  const bounds: CrsBounds = [0, 0, 100, 100];
  const origin: CrsCoord = { x: 0, y: 0, z: 0 };

  it("should have type 'dem-mesh'", () => {
    const mesh = new DemMesh(() => 0);
    expect(mesh.type).toBe("dem-mesh");
  });

  it("should create flat geometry when elevation is zero", () => {
    const mesh = new DemMesh(() => 0, 4);
    const geo = mesh.createGeometry(bounds, origin);
    const pos = geo.getAttribute("position");

    // All Z values should be 0
    for (let i = 0; i < pos.count; i++) {
      expect(pos.getZ(i)).toBeCloseTo(0, 5);
    }
  });

  it("should set vertex Z from elevation callback", () => {
    // Constant elevation of 50m
    const mesh = new DemMesh(() => 50, 2);
    const geo = mesh.createGeometry(bounds, origin);
    const pos = geo.getAttribute("position");

    // All Z values should be 50
    for (let i = 0; i < pos.count; i++) {
      expect(pos.getZ(i)).toBeCloseTo(50, 5);
    }
  });

  it("should vary elevation with position", () => {
    // Linear ramp: z = x + y
    const mesh = new DemMesh((x, y) => x + y, 4);
    const geo = mesh.createGeometry(bounds, origin);
    const pos = geo.getAttribute("position");

    // Check corner vertices
    // (0, 0) → z = 0
    const idx00 = 0;
    expect(pos.getX(idx00)).toBeCloseTo(0, 5);
    expect(pos.getY(idx00)).toBeCloseTo(0, 5);
    expect(pos.getZ(idx00)).toBeCloseTo(0, 5);

    // (100, 100) → z = 200
    const lastIdx = (4 + 1) * (4 + 1) - 1;
    expect(pos.getX(lastIdx)).toBeCloseTo(100, 5);
    expect(pos.getY(lastIdx)).toBeCloseTo(100, 5);
    expect(pos.getZ(lastIdx)).toBeCloseTo(200, 5);
  });

  it("should respect origin offset for Z", () => {
    const originWithZ: CrsCoord = { x: 0, y: 0, z: 50 };
    const mesh = new DemMesh(() => 100, 2);
    const geo = mesh.createGeometry(bounds, originWithZ);

    const pos = geo.getAttribute("position");
    // CRS Z = 100, origin.z = 50 → local Z = 50
    expect(pos.getZ(0)).toBeCloseTo(50, 5);
  });

  it("should handle NaN elevation gracefully", () => {
    const mesh = new DemMesh((x, y) => (x > 50 ? NaN : 10), 4);
    const geo = mesh.createGeometry(bounds, origin);
    const pos = geo.getAttribute("position");

    // Vertex at (0,0) → elevation 10
    expect(pos.getZ(0)).toBeCloseTo(10, 5);

    // Find a vertex at x > 50 (col > N/2)
    const N = 4;
    const idx = 0 * (N + 1) + N; // row 0, col 4 → x = 100
    expect(pos.getZ(idx)).toBeCloseTo(0, 5); // NaN → 0
  });

  it("should create correct vertex count for gridSize=4", () => {
    const mesh = new DemMesh(() => 0, 4);
    const geo = mesh.createGeometry(bounds, origin);
    expect(geo.getAttribute("position").count).toBe(25);
  });

  it("should create indexed geometry", () => {
    const mesh = new DemMesh(() => 0, 4);
    const geo = mesh.createGeometry(bounds, origin);
    expect(geo.index).not.toBeNull();
    expect(geo.index!.count).toBe(96); // 4² × 2 × 3
  });

  it("should generate UVs", () => {
    const mesh = new DemMesh(() => 0, 4);
    const geo = mesh.createGeometry(bounds, origin);
    const uv = geo.getAttribute("uv");
    expect(uv.getX(0)).toBeCloseTo(0, 5);
    expect(uv.getY(0)).toBeCloseTo(0, 5);
  });

  it("should compute vertex normals", () => {
    const mesh = new DemMesh((x, y) => Math.sin(x / 10) * 20, 4);
    const geo = mesh.createGeometry(bounds, origin);
    const normal = geo.getAttribute("normal");
    expect(normal).not.toBeNull();
    // Normals should be unit vectors
    const nz = normal.getZ(6); // middle-ish vertex
    expect(Math.abs(nz)).toBeGreaterThan(0);
  });

  it("should clamp gridSize to [2, 64]", () => {
    expect(new DemMesh(() => 0, 1).gridSize).toBe(2);
    expect(new DemMesh(() => 0, 20).gridSize).toBe(20);
    expect(new DemMesh(() => 0, 65).gridSize).toBe(64);
  });
});
