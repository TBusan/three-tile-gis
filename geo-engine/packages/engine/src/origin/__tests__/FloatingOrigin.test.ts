// geo-engine/packages/engine/src/origin/__tests__/FloatingOrigin.test.ts
import { describe, it, expect, beforeEach } from "vitest";
import { FloatingOrigin } from "../FloatingOrigin";
import { DefaultLocalOrigin } from "../ILocalOrigin";
import type { CrsCoord } from "../../core/types";

describe("DefaultLocalOrigin", () => {
  it("should snap to tileSize", () => {
    const origin = DefaultLocalOrigin.snap(
      { x: 512345, y: 3654987, z: 123 },
      500,
    );
    expect(origin).toEqual({ x: 512000, y: 3654500, z: 0 });
  });

  it("should convert world to local", () => {
    const local = DefaultLocalOrigin.worldToLocal(
      { x: 512345, y: 3654987, z: 123 },
      { x: 512000, y: 3654000, z: 0 },
    );
    expect(local).toEqual({ x: 345, y: 987, z: 123 });
  });

  it("should convert local to world", () => {
    const world = DefaultLocalOrigin.localToWorld(
      { x: 345, y: 987, z: 123 },
      { x: 512000, y: 3654000, z: 0 },
    );
    expect(world).toEqual({ x: 512345, y: 3654987, z: 123 });
  });
});

describe("FloatingOrigin", () => {
  let fo: FloatingOrigin;

  beforeEach(() => {
    fo = new FloatingOrigin({ threshold: 500 });
  });

  it("should start at (0,0,0)", () => {
    expect(fo.current).toEqual({ x: 0, y: 0, z: 0 });
    expect(fo.dirty).toBe(false);
  });

  it("should not shift within threshold", () => {
    const moved = fo.update({ x: 300, y: 0, z: 0 });
    expect(moved).toBe(false);
    expect(fo.dirty).toBe(false);
    expect(fo.current).toEqual({ x: 0, y: 0, z: 0 });
  });

  it("should shift when camera exceeds threshold", () => {
    const moved = fo.update({ x: 600, y: 0, z: 0 });
    expect(moved).toBe(true);
    expect(fo.dirty).toBe(true);
    expect(fo.current).toEqual({ x: 600, y: 0, z: 0 });
  });

  it("should not be dirty on next frame after no movement", () => {
    fo.update({ x: 0, y: 0, z: 0 }); // not moving, not dirty
    fo.update({ x: 0, y: 0, z: 0 }); // still not moving
    expect(fo.dirty).toBe(false);
  });

  it("should reset to origin", () => {
    fo.update({ x: 600, y: 0, z: 0 });
    expect(fo.current.x).toBe(600);

    fo.reset();
    expect(fo.current).toEqual({ x: 0, y: 0, z: 0 });
  });
});
