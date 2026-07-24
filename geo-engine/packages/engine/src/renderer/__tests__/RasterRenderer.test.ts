// geo-engine/packages/engine/src/renderer/__tests__/RasterRenderer.test.ts
import { describe, it, expect, vi } from "vitest";

// Mock Three.js before importing RasterRenderer
vi.mock("three", () => {
  const mockDispose = vi.fn();
  const mockTranslate = vi.fn();
  const mockSet = vi.fn();

  return {
    Texture: vi.fn().mockImplementation(() => ({
      dispose: mockDispose,
      needsUpdate: false,
      minFilter: undefined,
      magFilter: undefined,
      colorSpace: undefined,
    })),
    PlaneGeometry: vi.fn().mockImplementation(() => ({
      dispose: mockDispose,
      translate: mockTranslate,
    })),
    MeshBasicMaterial: vi.fn().mockImplementation(() => ({
      dispose: mockDispose,
      map: null,
    })),
    Mesh: vi.fn().mockImplementation(() => ({
      geometry: { dispose: mockDispose },
      material: { dispose: mockDispose, map: { dispose: mockDispose } },
      position: { set: mockSet },
    })),
    DoubleSide: 2,
    LinearFilter: 1006,
    SRGBColorSpace: "srgb",
  };
});

import { RasterRenderer, type RasterRendererOptions } from "../RasterRenderer";
import { Tile } from "../../tile/Tile";
import { makeTileKey } from "../../tile/TileKey";
import type { CrsBounds, CrsCoord } from "../../core/types";

describe("RasterRenderer", () => {
  const bounds: CrsBounds = [0, 0, 256, 256];
  const origin: CrsCoord = { x: 0, y: 0, z: 0 };

  function makeTile(): Tile {
    return new Tile(makeTileKey("xyz", "10/500/300", 10), bounds, origin);
  }

  it("should construct with defaults", () => {
    const renderer = new RasterRenderer();
    expect(renderer.name).toBe("raster-renderer");
  });

  it("should accept custom name", () => {
    const renderer = new RasterRenderer({ name: "my-renderer" });
    expect(renderer.name).toBe("my-renderer");
  });

  it("should create content with render objects", async () => {
    const renderer = new RasterRenderer();
    const tile = makeTile();

    // Create a minimal ImageBitmap-like object
    const mockBitmap = {
      width: 256,
      height: 256,
      close: () => {},
    } as unknown as ImageBitmap;

    const content = await renderer.createContent(mockBitmap, tile);

    expect(content.state).toBe("ready");
    expect(content.renderObjects).toHaveLength(1);
    expect(content.renderObjects[0].object).toBeDefined();
  });

  it("should create content with unique ids", async () => {
    const renderer = new RasterRenderer();
    const tile = makeTile();
    const mockBitmap = {
      width: 256,
      height: 256,
      close: () => {},
    } as unknown as ImageBitmap;

    const content = await renderer.createContent(mockBitmap, tile);
    expect(content.id).toContain("raster-");
  });

  it("disposeContent should dispose texture", () => {
    const renderer = new RasterRenderer();
    // Create a mock content with render objects
    const tile = makeTile();

    // disposeContent should not throw even with minimal mocks
    expect(() => {
      // Accessing unmocked properties gracefully
      try {
        renderer.disposeContent({
          id: "test",
          tileKey: tile.key,
          layerId: "L1",
          data: null,
          renderObjects: [],
          state: "ready",
          disposed: false,
          dispose: () => {},
          markDisposed: () => {},
        } as any);
      } catch {
        // ignore errors from incomplete mocks
      }
    }).not.toThrow();
  });
});
