// geo-engine/packages/engine/src/tile/__tests__/TileKey.test.ts
import { describe, it, expect } from "vitest";
import { makeTileKey, tileKeyEquals, tileKeyToString } from "../TileKey";

describe("TileKey", () => {
  it("should create a TileKey via factory", () => {
    const key = makeTileKey("project-500", "1024-7308", 2);
    expect(key.schemeId).toBe("project-500");
    expect(key.id).toBe("1024-7308");
    expect(key.level).toBe(2);
  });

  it("should compare equal keys", () => {
    const a = makeTileKey("xyz", "14/12345/6789", 14);
    const b = makeTileKey("xyz", "14/12345/6789", 14);
    expect(tileKeyEquals(a, b)).toBe(true);
  });

  it("should reject different schemeId", () => {
    const a = makeTileKey("a", "x", 1);
    const b = makeTileKey("b", "x", 1);
    expect(tileKeyEquals(a, b)).toBe(false);
  });

  it("should stringify for Map key", () => {
    const key = makeTileKey("proj", "abc", 0);
    expect(tileKeyToString(key)).toBe("proj:abc@0");
  });

  it("should stringify with level to avoid cross-level collision", () => {
    const a = makeTileKey("proj", "3-5", 0);
    const b = makeTileKey("proj", "3-5", 1);
    expect(tileKeyToString(a)).not.toBe(tileKeyToString(b));
    expect(tileKeyEquals(a, b)).toBe(false);
  });
});
