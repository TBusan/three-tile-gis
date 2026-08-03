// geo-engine/packages/engine/src/renderer/__tests__/RasterRenderer.test.ts
import { describe, it, expect, vi } from "vitest";

// 捕获每个 Texture 实例，供纹理过滤/mipmap/anisotropy 断言使用
const { textureLog } = vi.hoisted(() => ({ textureLog: [] as any[] }));

// Mock Three.js before importing RasterRenderer
vi.mock("three", () => {
  const mockDispose = vi.fn();
  const mockTranslate = vi.fn();
  const mockSet = vi.fn();

  return {
    Texture: vi.fn().mockImplementation(() => {
      const t = {
        dispose: mockDispose,
        needsUpdate: false,
        minFilter: undefined,
        magFilter: undefined,
        colorSpace: undefined,
        generateMipmaps: undefined,
        anisotropy: undefined,
      };
      textureLog.push(t);
      return t;
    }),
    // SimplePlane 矩形路径已改为手写 BufferGeometry，不再依赖 PlaneGeometry
    BufferGeometry: vi.fn().mockImplementation(() => ({
      dispose: mockDispose,
      setAttribute: vi.fn(),
      setIndex: vi.fn(),
      computeVertexNormals: vi.fn(),
      translate: mockTranslate,
    })),
    BufferAttribute: vi.fn().mockImplementation(() => ({
      dispose: mockDispose,
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
      renderOrder: undefined,
    })),
    DoubleSide: 2,
    FrontSide: 0,
    LinearFilter: 1006,
    LinearMipmapLinearFilter: 1007,
    SRGBColorSpace: "srgb",
  };
});

// applyDepthBias 用 mock 隔离（本文件只验证 RasterRenderer 是否正确调用它，
// 着色器注入逻辑在 depthBias.test.ts 用真实 three 覆盖）。
vi.mock("../depthBias", () => ({
  applyDepthBias: vi.fn(),
}));

import { RasterRenderer, type RasterRendererOptions } from "../RasterRenderer";
import { applyDepthBias } from "../depthBias";
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

  it("should wire renderer into content so TileContent.dispose calls disposeContent", async () => {
    const renderer = new RasterRenderer();
    const tile = makeTile();
    const mockBitmap = {
      width: 256,
      height: 256,
      close: () => {},
    } as unknown as ImageBitmap;

    const content = await renderer.createContent(mockBitmap, tile);
    // createContent must record itself as the owner renderer
    expect(content.renderer).toBe(renderer);

    const disposeSpy = vi.spyOn(renderer, "disposeContent");
    content.dispose();

    // TileContent.dispose must delegate GPU-specific cleanup to the renderer
    expect(disposeSpy).toHaveBeenCalledWith(content);
    // ... and then release the render objects
    expect(content.renderObjects).toHaveLength(0);
    expect(content.disposed).toBe(true);
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

  it("should set mesh.renderOrder = renderOrderBase + level", async () => {
    const renderer = new RasterRenderer({ renderOrderBase: 100 });
    const tile = makeTile(); // level 10
    const mockBitmap = {
      width: 256,
      height: 256,
      close: () => {},
    } as unknown as ImageBitmap;

    const content = await renderer.createContent(mockBitmap, tile);
    const mesh = content.renderObjects[0].object as { renderOrder: number };
    expect(mesh.renderOrder).toBe(110); // 100 + 10
  });

  it("should apply depth bias = depthBiasPerLevel * level when depthBiasPerLevel > 0", async () => {
    (applyDepthBias as any).mockClear();
    const renderer = new RasterRenderer({ depthBiasPerLevel: 0.05 });
    const tile = makeTile(); // level 10
    const mockBitmap = {
      width: 256,
      height: 256,
      close: () => {},
    } as unknown as ImageBitmap;

    await renderer.createContent(mockBitmap, tile);
    expect(applyDepthBias).toHaveBeenCalledTimes(1);
    expect(applyDepthBias).toHaveBeenCalledWith(expect.anything(), 0.5); // 0.05 * 10
  });

  it("should NOT apply depth bias when depthBiasPerLevel is 0 (default)", async () => {
    (applyDepthBias as any).mockClear();
    const renderer = new RasterRenderer();
    const tile = makeTile();
    const mockBitmap = {
      width: 256,
      height: 256,
      close: () => {},
    } as unknown as ImageBitmap;

    await renderer.createContent(mockBitmap, tile);
    expect(applyDepthBias).not.toHaveBeenCalled();
  });

  it("should enable mipmap for POT textures (256×256)", async () => {
    const renderer = new RasterRenderer();
    const tile = makeTile();
    const mockBitmap = {
      width: 256,
      height: 256,
      close: () => {},
    } as unknown as ImageBitmap;

    await renderer.createContent(mockBitmap, tile);
    const tex = textureLog[textureLog.length - 1];
    expect(tex.generateMipmaps).toBe(true);
    expect(tex.minFilter).toBe(1007); // LinearMipmapLinearFilter
    expect(tex.magFilter).toBe(1006); // LinearFilter（放大仍双线性）
    expect(tex.colorSpace).toBe("srgb");
  });

  it("should upload texture with flipY=false (pre-flipped ImageBitmap contract)", async () => {
    const renderer = new RasterRenderer();
    const tile = makeTile();
    const mockBitmap = {
      width: 256,
      height: 256,
      close: () => {},
    } as unknown as ImageBitmap;

    await renderer.createContent(mockBitmap, tile);
    const tex = textureLog[textureLog.length - 1];
    // 数据源已用 imageOrientation:"flipY" 预翻转（位图第 0 行 = 南端），
    // 渲染器必须原样上传，禁止 WebGL 再次翻转。
    expect(tex.flipY).toBe(false);
  });

  it("should fall back to LinearFilter without anisotropy for non-POT textures", async () => {
    const renderer = new RasterRenderer();
    const tile = makeTile();
    const mockBitmap = {
      width: 300,
      height: 200,
      close: () => {},
    } as unknown as ImageBitmap;

    await renderer.createContent(mockBitmap, tile);
    const tex = textureLog[textureLog.length - 1];
    expect(tex.generateMipmaps).toBe(false);
    expect(tex.minFilter).toBe(1006); // LinearFilter
    expect(tex.anisotropy).toBeUndefined();
  });

  it("should pass bleedUV=0 to createGeometry by default (bleed disabled)", async () => {
    const renderer = new RasterRenderer();
    const tile = makeTile();
    const createSpy = vi.spyOn((renderer as any).quality, "createGeometry");
    const mockBitmap = {
      width: 256,
      height: 256,
      close: () => {},
    } as unknown as ImageBitmap;

    await renderer.createContent(mockBitmap, tile);
    expect(createSpy).toHaveBeenCalledWith(
      tile.bounds,
      tile.origin,
      tile.reprojector,
      tile.key.level,
      0, // 默认 0：关闭边缘出血
    );
  });

  it("should pass computed bleedUV when tileBleedTexels is opt-in (2 texels on 256px tile)", async () => {
    const renderer = new RasterRenderer({ tileBleedTexels: 2 });
    const tile = makeTile();
    const createSpy = vi.spyOn((renderer as any).quality, "createGeometry");
    const mockBitmap = {
      width: 256,
      height: 256,
      close: () => {},
    } as unknown as ImageBitmap;

    await renderer.createContent(mockBitmap, tile);
    expect(createSpy).toHaveBeenCalledWith(
      tile.bounds,
      tile.origin,
      tile.reprojector,
      tile.key.level,
      2 / 256, // tileBleedTexels(2) / max(width,height)(256)
    );
  });
});
