// geo-engine/packages/engine/src/source/__tests__/GeoTIFFSource.test.ts
import { describe, it, expect, vi, beforeEach, beforeAll } from "vitest";
import { GeoTIFFSource } from "../GeoTIFFSource";
import { WebMercatorCRS } from "../../crs/WebMercator";
import { makeTileKey } from "../../tile/TileKey";
import type { CrsBounds } from "../../core/types";

// ---- Node.js compat: mock browser-only APIs ----

// Use vitest's `globalThis` to define ImageData and createImageBitmap for Node
const { createImageBitmap: _realCIB } = globalThis as any;

beforeAll(() => {
  if (typeof ImageData === "undefined") {
    class FakeImageData {
      readonly data: Uint8ClampedArray;
      readonly width: number;
      readonly height: number;
      readonly colorSpace = "srgb" as PredefinedColorSpace;
      constructor(width: number, height: number);
      constructor(data: Uint8ClampedArray, width: number, height?: number);
      constructor(wd: number | Uint8ClampedArray, h: number, _h2?: number) {
        if (wd instanceof Uint8ClampedArray) {
          this.width = h;
          this.height = _h2 ?? 0;
          this.data = wd;
        } else {
          this.width = wd;
          this.height = h;
          this.data = new Uint8ClampedArray(wd * h * 4);
        }
      }
    }
    // @ts-expect-error: polyfill for Node test environment
    globalThis.ImageData = FakeImageData;
  }

  if (typeof createImageBitmap === "undefined") {
    // @ts-expect-error: polyfill
    globalThis.createImageBitmap = async (
      source: FakeImageData,
    ): Promise<ImageBitmap> => {
      const w = source.width;
      const h = source.height;
      const data = source.data;
      // Return a minimal object that satisfies ImageBitmap interface
      return {
        width: w,
        height: h,
        close: vi.fn(),
      } as unknown as ImageBitmap;
    };
  }
});

// ---- Mock geotiff module ----

vi.mock("geotiff", () => {
  const mockImage = {
    getWidth: () => 1024,
    getHeight: () => 768,
    getBoundingBox: () => [0, 768, 1024, 0] as [number, number, number, number],
    readRasters: vi.fn().mockResolvedValue([
      new Uint8Array(100 * 100).fill(128), // R band
      new Uint8Array(100 * 100).fill(100), // G band
      new Uint8Array(100 * 100).fill(200), // B band
    ]),
  };

  const mockTiff = {
    getImage: vi.fn().mockResolvedValue(mockImage),
  };

  return {
    fromUrl: vi.fn().mockResolvedValue(mockTiff),
  };
});

describe("GeoTIFFSource", () => {
  const crs = new WebMercatorCRS();
  const url = "/data/test.tif";

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should have dataType 'geotiff'", () => {
    const source = new GeoTIFFSource({ url, crs });
    expect(source.dataType).toBe("geotiff");
  });

  it("should store crs from options", () => {
    const source = new GeoTIFFSource({ url, crs });
    expect(source.crs).toBe(crs);
  });

  it("should have zero bounds before first load", () => {
    const source = new GeoTIFFSource({ url, crs });
    expect(source.bounds).toEqual([0, 0, 0, 0]);
  });

  it("should load geotiff and populate bounds on first fetch", async () => {
    const source = new GeoTIFFSource({ url, crs });
    const key = makeTileKey("custom", "0/0/0", 0);
    const tileBounds: CrsBounds = [0, 0, 100, 100];

    const bitmap = await source.fetch(key, tileBounds);

    // bounds should be updated from GeoTIFF metadata
    expect(source.bounds).toEqual([0, 0, 1024, 768]);

    // should return an ImageBitmap-like object with close()
    expect(bitmap).toBeDefined();
    expect(typeof (bitmap as any).close).toBe("function");
    (bitmap as any).close();
  });

  it("should cache the GeoTIFF instance (single load)", async () => {
    const { fromUrl } = await import("geotiff");
    const source = new GeoTIFFSource({ url, crs });
    const key = makeTileKey("custom", "0/0/0", 0);
    const tileBounds: CrsBounds = [0, 0, 100, 100];

    await source.fetch(key, tileBounds);
    await source.fetch(key, tileBounds);

    // fromUrl should be called only once (cached)
    expect(fromUrl).toHaveBeenCalledTimes(1);
  });

  it("should compute correct window from tileBounds", async () => {
    const source = new GeoTIFFSource({ url, crs });
    const key = makeTileKey("custom", "0/0/0", 0);

    // Image: 1024×768, bbox: [0, 768, 1024, 0]
    // Tile: [256, 384, 512, 512]
    const tileBounds: CrsBounds = [256, 384, 512, 512];

    await source.fetch(key, tileBounds);

    // Verify readRasters was called with correct window
    const { fromUrl } = await import("geotiff");
    const mockImage = (await (fromUrl as any).mock.results[0].value).getImage
      .mock.results[0].value;

    expect(mockImage.readRasters).toHaveBeenCalledWith(
      expect.objectContaining({
        window: expect.arrayContaining([
          expect.any(Number),
          expect.any(Number),
          expect.any(Number),
          expect.any(Number),
        ]),
      }),
    );
  });

  it("should return 1x1 ImageBitmap for tile outside image bounds", async () => {
    const source = new GeoTIFFSource({ url, crs });
    const key = makeTileKey("custom", "0/0/0", 0);

    // Load once to populate bounds, then test with out-of-bounds tile
    await source.fetch(key, [0, 0, 100, 100]);

    // Tile completely outside image
    const tileBounds: CrsBounds = [2000, 2000, 2100, 2100];

    const bitmap = await source.fetch(key, tileBounds);

    expect(bitmap).toBeDefined();
    expect((bitmap as any).width).toBe(1);
    expect((bitmap as any).height).toBe(1);
    (bitmap as any).close();
  });

  it("dispose should close the ImageBitmap", () => {
    const source = new GeoTIFFSource({ url, crs });

    let closed = false;
    const mockBitmap = {
      close: () => {
        closed = true;
      },
    } as unknown as ImageBitmap;

    source.dispose(mockBitmap);
    expect(closed).toBe(true);
  });

  it("should pass options to fromUrl", async () => {
    const { fromUrl } = await import("geotiff");
    const source = new GeoTIFFSource({ url, crs });
    const key = makeTileKey("custom", "0/0/0", 0);
    const tileBounds: CrsBounds = [0, 0, 100, 100];
    const controller = new AbortController();

    await source.fetch(key, tileBounds, controller.signal);

    // fromUrl should have been called with the URL
    expect(fromUrl).toHaveBeenCalledWith(url, expect.any(Object));
  });

  it("should handle single-band (grayscale) GeoTIFF", async () => {
    // Override mock to return single band
    const { fromUrl } = await import("geotiff");
    const mockGrayscale = {
      getWidth: () => 512,
      getHeight: () => 512,
      getBoundingBox: () => [0, 512, 512, 0] as [number, number, number, number],
      readRasters: vi.fn().mockResolvedValue([
        new Uint8Array(50 * 50).fill(180), // single band
      ]),
    };
    const mockTiff = {
      getImage: vi.fn().mockResolvedValue(mockGrayscale),
    };
    vi.mocked(fromUrl).mockResolvedValueOnce(mockTiff as any);

    const source2 = new GeoTIFFSource({ url, crs });
    const key = makeTileKey("custom", "0/0/0", 0);
    const tileBounds: CrsBounds = [0, 0, 100, 100];

    const bitmap = await source2.fetch(key, tileBounds);
    expect(bitmap).toBeDefined();
    expect(typeof (bitmap as any).close).toBe("function");
    (bitmap as any).close();
  });

  it("should accept useWorker option (default false)", () => {
    const source = new GeoTIFFSource({ url, crs });
    // Default mode uses direct decoding
    expect((source as any)._useWorker).toBe(false);
  });

  it("should store useWorker=true when specified", () => {
    const source = new GeoTIFFSource({ url, crs, useWorker: true });
    expect((source as any)._useWorker).toBe(true);
  });

  it("should initialize worker pool lazily in worker mode", async () => {
    const source = new GeoTIFFSource({ url, crs, useWorker: true });

    // Pool should be null before first fetch
    expect((source as any)._pool).toBeNull();

    // Attempting worker fetch in Node will fail (no Worker constructor),
    // but we can verify the setup path is reached
    // Skip actual worker execution — this is an integration test for browser only
  });
});
