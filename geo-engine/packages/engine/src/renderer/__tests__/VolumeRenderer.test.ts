// geo-engine/packages/engine/src/renderer/__tests__/VolumeRenderer.test.ts

import { describe, it, expect } from "vitest";
import { VolumeRenderer } from "../VolumeRenderer";
import { Tile } from "../../tile/Tile";
import { TileContent } from "../../tile/TileContent";
import { makeTileKey } from "../../tile/TileKey";

describe("VolumeRenderer", () => {
  const renderer = new VolumeRenderer();
  const key = makeTileKey("test", "0-0", 0);

  it("should have a name", () => {
    expect(renderer.name).toBe("volume-renderer");
  });

  it("should accept custom name", () => {
    const r = new VolumeRenderer("custom");
    expect(r.name).toBe("custom");
  });

  it("createContent should throw not implemented", async () => {
    const tile = new Tile(key, [0, 0, 100, 100], { x: 0, y: 0, z: 0 });

    await expect(renderer.createContent(null, tile)).rejects.toThrow(
      "not implemented",
    );
  });

  it("disposeContent should be no-op", () => {
    const content = new TileContent("test", key, "test-layer");
    expect(() => renderer.disposeContent(content)).not.toThrow();
  });
});
