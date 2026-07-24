// geo-engine/packages/engine/src/source/__tests__/XYZTileSource.test.ts
import { describe, it, expect } from "vitest";
import { XYZTileSource } from "../XYZTileSource";
import { makeTileKey } from "../../tile/TileKey";

describe("XYZTileSource", () => {
  const source = new XYZTileSource(
    "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
  );

  it("should have correct metadata", () => {
    expect(source.dataType).toBe("image");
    expect(source.crs.name).toBe("EPSG:3857");
    expect(source.minZoom).toBe(0);
    expect(source.maxZoom).toBe(18);
    expect(source.timeout).toBe(15000);
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
    expect(url).toContain("12/3420/1672");
    expect(url).toBe(
      "https://tile.openstreetmap.org/12/3420/1672.png",
    );
  });

  it("should support {-y} inversion", () => {
    const invSource = new XYZTileSource(
      "https://example.com/{z}/{x}/{-y}.png",
    );
    const key = makeTileKey("xyz", "2/1/0", 2);
    const url = invSource.buildUrl(key);
    // At z=2: max y = 2^2 - 1 = 3, so -y = 3 - 0 = 3
    expect(url).toBe("https://example.com/2/1/3.png");
  });

  it("should replace {z} multiple times if present", () => {
    const source2 = new XYZTileSource(
      "https://s{z}.tile.example.com/{z}/{x}/{y}.png",
    );
    const key = makeTileKey("xyz", "5/10/20", 5);
    const url = source2.buildUrl(key);
    expect(url).toBe("https://s5.tile.example.com/5/10/20.png");
  });

  it("should reject invalid tile id format", () => {
    const key = makeTileKey("xyz", "not-valid", 0);
    expect(() => source.buildUrl(key)).toThrow("invalid tile id");
  });

  it("should accept custom options", () => {
    const s = new XYZTileSource("http://x.com/{z}/{x}/{y}.png", {
      minZoom: 3,
      maxZoom: 12,
      timeout: 5000,
    });
    expect(s.minZoom).toBe(3);
    expect(s.maxZoom).toBe(12);
    expect(s.timeout).toBe(5000);
  });

  it("should call close() on dispose", () => {
    // Create a minimal mock of ImageBitmap with close
    let closed = false;
    const mockBitmap = { close: () => { closed = true; } } as unknown as ImageBitmap;
    source.dispose(mockBitmap);
    expect(closed).toBe(true);
  });
});
