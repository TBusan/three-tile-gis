// geo-engine/packages/engine/src/source/__tests__/DEMSource.test.ts
import { describe, it, expect, vi, beforeEach } from "vitest";
import { DEMSource } from "../DEMSource";
import { WebMercatorCRS } from "../../crs/WebMercator";
import { makeTileKey } from "../../tile/TileKey";
import type { CrsBounds } from "../../core/types";

// Mock geotiff module
vi.mock("geotiff", () => {
  const mockImage = {
    getWidth: () => 512,
    getHeight: () => 512,
    getBoundingBox: () => [0, 512, 512, 0] as [number, number, number, number],
    readRasters: vi.fn().mockResolvedValue([
      Float32Array.from({ length: 50 * 50 }, (_, i) => 100 + (i % 100)), // elevation data
    ]),
  };

  const mockTiff = {
    getImage: vi.fn().mockResolvedValue(mockImage),
  };

  return {
    fromUrl: vi.fn().mockResolvedValue(mockTiff),
  };
});

describe("DEMSource", () => {
  const crs = new WebMercatorCRS();
  const url = "/data/dem.tif";

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should have dataType 'dem'", () => {
    const source = new DEMSource({ url, crs });
    expect(source.dataType).toBe("dem");
  });

  it("should store crs from options", () => {
    const source = new DEMSource({ url, crs });
    expect(source.crs).toBe(crs);
  });

  it("should have zero bounds before first load", () => {
    const source = new DEMSource({ url, crs });
    expect(source.bounds).toEqual([0, 0, 0, 0]);
  });

  it("should fetch elevation data as Float32Array", async () => {
    const source = new DEMSource({ url, crs });
    const key = makeTileKey("custom", "0/0/0", 0);
    const tileBounds: CrsBounds = [0, 0, 100, 100];

    const data = await source.fetch(key, tileBounds);

    expect(data).toBeInstanceOf(Float32Array);
    expect(data.length).toBeGreaterThan(0);
  });

  it("should update bounds on first fetch", async () => {
    const source = new DEMSource({ url, crs });
    const key = makeTileKey("custom", "0/0/0", 0);
    const tileBounds: CrsBounds = [0, 0, 100, 100];

    await source.fetch(key, tileBounds);
    expect(source.bounds).toEqual([0, 0, 512, 512]);
  });

  it("should cache the GeoTIFF instance", async () => {
    const { fromUrl } = await import("geotiff");
    const source = new DEMSource({ url, crs });
    const key = makeTileKey("custom", "0/0/0", 0);
    const tileBounds: CrsBounds = [0, 0, 100, 100];

    await source.fetch(key, tileBounds);
    await source.fetch(key, tileBounds);

    expect(fromUrl).toHaveBeenCalledTimes(1);
  });

  it("should not bind per-tile signal to the shared metadata fetch", async () => {
    const { fromUrl } = await import("geotiff");
    const source = new DEMSource({ url, crs });
    const key = makeTileKey("custom", "0/0/0", 0);
    const controller = new AbortController();

    await source.fetch(key, [0, 0, 100, 100], controller.signal);

    // 共享 fetch 只应接收 url，不携带逐瓦片 signal
    expect(fromUrl).toHaveBeenCalledWith(url);
  });

  it("should throw AbortError when the tile signal is already aborted", async () => {
    const source = new DEMSource({ url, crs });
    const key = makeTileKey("custom", "0/0/0", 0);
    const controller = new AbortController();
    controller.abort();

    await expect(
      source.fetch(key, [0, 0, 100, 100], controller.signal),
    ).rejects.toMatchObject({ name: "AbortError" });
  });

  it("should return empty Float32Array for tile outside bounds", async () => {
    const source = new DEMSource({ url, crs });
    const key = makeTileKey("custom", "0/0/0", 0);
    // First load to populate bounds
    await source.fetch(key, [0, 0, 100, 100]);

    const data = await source.fetch(key, [2000, 2000, 2100, 2100]);
    expect(data).toBeInstanceOf(Float32Array);
    expect(data.length).toBe(0);
  });

  it("dispose should be a no-op for Float32Array", () => {
    const source = new DEMSource({ url, crs });
    // Should not throw
    source.dispose(new Float32Array(100));
  });

  it("should accept custom noDataValue", () => {
    const source = new DEMSource({ url, crs, noDataValue: -9999 });
    // noDataValue is private, just verify construction doesn't throw
    expect(source.dataType).toBe("dem");
  });
});
