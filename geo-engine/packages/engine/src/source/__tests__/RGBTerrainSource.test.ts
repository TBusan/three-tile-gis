// geo-engine/packages/engine/src/source/__tests__/RGBTerrainSource.test.ts
import { describe, it, expect, vi, beforeEach } from "vitest";
import { RGBTerrainSource } from "../RGBTerrainSource";
import { makeTileKey } from "../../tile/TileKey";

/** 构造最小 ImageData 形状（仅 data 字段参与解码） */
const makeImageData = (rgba: number[]): ImageData =>
  ({ data: new Uint8ClampedArray(rgba) }) as unknown as ImageData;

describe("RGBTerrainSource", () => {
  const source = new RGBTerrainSource(
    "https://api.mapbox.com/v4/mapbox.terrain-rgb/{z}/{x}/{y}.pngraw?access_token=TOKEN",
  );

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("should have correct metadata", () => {
    expect(source.dataType).toBe("terrain-rgb");
    expect(source.crs.name).toBe("EPSG:3857");
    expect(source.minZoom).toBe(0);
    expect(source.maxZoom).toBe(14);
    expect(source.timeout).toBe(10000);
  });

  it("should have world bounds", () => {
    const [x0, y0, x1, y1] = source.bounds;
    expect(x0).toBeLessThan(-20000000);
    expect(x1).toBeGreaterThan(20000000);
    expect(y0).toBeLessThan(-20000000);
    expect(y1).toBeGreaterThan(20000000);
  });

  it("should build URL from tile key", () => {
    const key = makeTileKey("xyz", "12/3420/1672", 12);
    const url = source.buildUrl(key);
    expect(url).toBe(
      "https://api.mapbox.com/v4/mapbox.terrain-rgb/12/3420/1672.pngraw?access_token=TOKEN",
    );
  });

  it("should support {-y} inversion", () => {
    const invSource = new RGBTerrainSource(
      "https://example.com/{z}/{x}/{-y}.pngraw",
    );
    const key = makeTileKey("xyz", "2/1/0", 2);
    // At z=2: max y = 2^2 - 1 = 3, so -y = 3 - 0 = 3
    expect(invSource.buildUrl(key)).toBe(
      "https://example.com/2/1/3.pngraw",
    );
  });

  it("should reject invalid tile id format", () => {
    const key = makeTileKey("xyz", "not-valid", 0);
    expect(() => source.buildUrl(key)).toThrow("invalid tile id");
  });

  it("should accept custom options", () => {
    const s = new RGBTerrainSource("http://x.com/{z}/{x}/{y}.pngraw", {
      minZoom: 3,
      maxZoom: 10,
      timeout: 5000,
    });
    expect(s.minZoom).toBe(3);
    expect(s.maxZoom).toBe(10);
    expect(s.timeout).toBe(5000);
  });

  it("should decode terrain-rgb formula (three-tile parse.ts)", () => {
    // h = -10000 + ((r<<16 | g<<8 | b) * 0.1)，alpha === 0 → 0
    const dem = RGBTerrainSource.decodeTerrainRGB(
      makeImageData([
        // 2 pixels: r=1 (1<<16=65536) 与 g=1 (1<<8=256)
        1, 0, 0, 255,
        0, 1, 0, 255,
      ]),
    );
    expect(dem.length).toBe(2);
    // Float32Array 单精度：~1e-4 舍入误差，用 3 位精度比较
    expect(dem[0]).toBeCloseTo(-10000 + 65536 * 0.1, 3);
    expect(dem[1]).toBeCloseTo(-10000 + 256 * 0.1, 3);
  });

  it("should decode transparent pixel as height 0", () => {
    const dem = RGBTerrainSource.decodeTerrainRGB(
      makeImageData([255, 255, 255, 0]),
    );
    expect(dem[0]).toBe(0);
  });

  it("should decode multiple pixels in row order", () => {
    const rgba: number[] = [];
    const expectVals: number[] = [];
    for (let i = 0; i < 4; i++) {
      const r = i * 10;
      const g = 0;
      const b = 5;
      rgba.push(r, g, b, 255);
      expectVals.push(-10000 + ((r << 16) | (g << 8) | b) * 0.1);
    }
    const dem = RGBTerrainSource.decodeTerrainRGB(makeImageData(rgba));
    expect(dem.length).toBe(4);
    for (let i = 0; i < 4; i++) {
      expect(dem[i]).toBeCloseTo(expectVals[i], 3);
    }
  });

  it("dispose should be a no-op for TerrainRgbData", () => {
    source.dispose({
      width: 4,
      height: 4,
      elevations: new Float32Array(16),
    });
  });

  it("should fetch with imageOrientation flipY and decode to target size", async () => {
    const origFetch = globalThis.fetch;
    const origCIB = globalThis.createImageBitmap;
    const origCanvas = (globalThis as any).OffscreenCanvas;

    (globalThis as any).fetch = vi.fn(async () => ({
      ok: true,
      blob: async () => new Blob(["png"]),
    }));
    const cibSpy = vi.fn(async () => ({
      width: 256,
      height: 256,
      close: () => {},
    }));
    (globalThis as any).createImageBitmap = cibSpy;

    let canvasSize = 0;
    class MockCanvas {
      width: number;
      height: number;
      constructor(w: number, h: number) {
        this.width = w;
        this.height = h;
        canvasSize = w;
      }
      getContext() {
        return {
          imageSmoothingEnabled: true,
          drawImage: vi.fn(),
          getImageData: vi.fn(() => {
            const size = this.width * this.height;
            const data = new Uint8ClampedArray(size * 4);
            // 全部 alpha=255、RGB=0 → 高程 -10000
            for (let i = 0; i < size; i++) data[i * 4 + 3] = 255;
            return { data, width: this.width, height: this.height };
          }),
        };
      }
    }
    (globalThis as any).OffscreenCanvas = MockCanvas;

    try {
      const key = makeTileKey("xyz", "1/0/0", 1);
      // level 1 → 默认 targetSize = clamp((1+2)*3, 2, 64) = 9
      const data = await source.fetch(key, [0, 0, 1, 1]);
      expect(cibSpy).toHaveBeenCalledTimes(1);
      // 位图必须预翻转（第 0 行 = 南端），配合 TerrainRenderer flipY=false
      expect(cibSpy).toHaveBeenCalledWith(expect.anything(), {
        imageOrientation: "flipY",
      });
      expect(canvasSize).toBe(9);
      expect(data.width).toBe(9);
      expect(data.height).toBe(9);
      expect(data.elevations).toBeInstanceOf(Float32Array);
      expect(data.elevations.length).toBe(9 * 9);
      expect(data.elevations[0]).toBeCloseTo(-10000, 5);
    } finally {
      globalThis.fetch = origFetch;
      globalThis.createImageBitmap = origCIB;
      (globalThis as any).OffscreenCanvas = origCanvas;
    }
  });

  it("should honor custom targetSizeForLevel", async () => {
    const origFetch = globalThis.fetch;
    const origCIB = globalThis.createImageBitmap;
    const origCanvas = (globalThis as any).OffscreenCanvas;

    const s = new RGBTerrainSource("http://x.com/{z}/{x}/{y}.pngraw", {
      targetSizeForLevel: () => 16,
    });

    (globalThis as any).fetch = vi.fn(async () => ({
      ok: true,
      blob: async () => new Blob(["png"]),
    }));
    (globalThis as any).createImageBitmap = vi.fn(async () => ({
      width: 256,
      height: 256,
      close: () => {},
    }));

    let canvasSize = 0;
    class MockCanvas {
      width: number;
      height: number;
      constructor(w: number, h: number) {
        this.width = w;
        this.height = h;
        canvasSize = w;
      }
      getContext() {
        return {
          imageSmoothingEnabled: true,
          drawImage: vi.fn(),
          getImageData: vi.fn(() => ({
            data: new Uint8ClampedArray(this.width * this.height * 4),
            width: this.width,
            height: this.height,
          })),
        };
      }
    }
    (globalThis as any).OffscreenCanvas = MockCanvas;

    try {
      const key = makeTileKey("xyz", "1/0/0", 1);
      const data = await s.fetch(key, [0, 0, 1, 1]);
      expect(canvasSize).toBe(16);
      expect(data.width).toBe(16);
      expect(data.elevations.length).toBe(16 * 16);
    } finally {
      globalThis.fetch = origFetch;
      globalThis.createImageBitmap = origCIB;
      (globalThis as any).OffscreenCanvas = origCanvas;
    }
  });
});
