// geo-engine/packages/engine/src/renderer/__tests__/TerrainRenderer.test.ts
import { describe, it, expect, vi } from "vitest";
import * as THREE from "three";
import { TerrainRenderer } from "../TerrainRenderer";
import type { TerrainOverlayData } from "../TerrainRenderer";
import type { Tile } from "../../tile/Tile";
import type { CrsBounds, CrsCoord } from "../../core/types";

/** 构造最小 Tile（createContent 只用 key/bounds/origin） */
const makeTile = (
  level: number,
  id: string,
  bounds: CrsBounds,
  origin: CrsCoord = { x: 0, y: 0, z: 0 },
): Tile =>
  ({
    key: { schemeId: "xyz", id, level },
    bounds,
    origin,
  }) as unknown as Tile;

/** 构造地形叠加数据：4×4 DEM，南 2 行 0、北 2 行 100（米） */
const makeData = (): TerrainOverlayData => ({
  width: 4,
  height: 4,
  elevations: Float32Array.from([
    0, 0, 0, 0, //
    0, 0, 0, 0, //
    100, 100, 100, 100,
    100, 100, 100, 100,
  ]),
  image: { width: 256, height: 256, close: () => {} } as unknown as ImageBitmap,
});

describe("TerrainRenderer", () => {
  it("should have type name default", () => {
    const renderer = new TerrainRenderer();
    expect(renderer.name).toBe("terrain-renderer");
  });

  it("should create ready content with layerId and renderer reference", async () => {
    const renderer = new TerrainRenderer({ gridSizeForLevel: () => 2 });
    const tile = makeTile(14, "14/1/1", [0, 0, 100, 100]);
    const content = await renderer.createContent(makeData(), tile, "L1");

    expect(content.state).toBe("ready");
    expect(content.layerId).toBe("L1");
    expect(content.renderer).toBe(renderer);
    expect(content.renderObjects.length).toBe(1);
    const mesh = content.renderObjects[0].object as THREE.Mesh;
    expect(mesh).toBeInstanceOf(THREE.Mesh);
  });

  it("should fallback layerId when not provided", async () => {
    const renderer = new TerrainRenderer({ gridSizeForLevel: () => 2 });
    const tile = makeTile(14, "14/1/1", [0, 0, 100, 100]);
    const content = await renderer.createContent(makeData(), tile);
    expect(content.layerId).toBe("terrain-layer");
  });

  it("should displace geometry Z from DEM (north high, south low)", async () => {
    const renderer = new TerrainRenderer({ gridSizeForLevel: () => 2 });
    const tile = makeTile(14, "14/1/1", [0, 0, 100, 100]);
    const content = await renderer.createContent(makeData(), tile);
    const mesh = content.renderObjects[0].object as THREE.Mesh;
    const pos = mesh.geometry.getAttribute("position");

    // gridSize=2 → N=2，gridVerts = (2+1)² = 9
    // idx 0 = row0 col0 = 南-西：crsY=0 → DEM row0 → 0
    expect(pos.getZ(0)).toBeCloseTo(0, 5);
    // idx 6 = row2 col0 = 北-西：crsY=100 → DEM row3 → 100
    expect(pos.getZ(6)).toBeCloseTo(100, 5);
  });

  it("should subtract origin.z from elevation", async () => {
    const renderer = new TerrainRenderer({ gridSizeForLevel: () => 2 });
    const tile = makeTile(
      14,
      "14/1/1",
      [0, 0, 100, 100],
      { x: 0, y: 0, z: 50 },
    );
    const content = await renderer.createContent(makeData(), tile);
    const mesh = content.renderObjects[0].object as THREE.Mesh;
    const pos = mesh.geometry.getAttribute("position");

    // 北-西：DEM 100 - origin.z 50 = 50
    expect(pos.getZ(6)).toBeCloseTo(50, 5);
  });

  it("should map UV v=0 to south edge (image drapes over DEM)", async () => {
    const renderer = new TerrainRenderer({ gridSizeForLevel: () => 2 });
    const tile = makeTile(14, "14/1/1", [0, 0, 100, 100]);
    const content = await renderer.createContent(makeData(), tile);
    const mesh = content.renderObjects[0].object as THREE.Mesh;
    const uv = mesh.geometry.getAttribute("uv");

    // 南-西顶点（idx 0，DEM row0 = 南端）→ v=0
    expect(uv.getY(0)).toBeCloseTo(0, 5);
    // 北-西顶点（idx 6，DEM row3 = 北端）→ v=1
    expect(uv.getY(6)).toBeCloseTo(1, 5);
  });

  it("should honor custom gridSizeForLevel (vertex count)", async () => {
    const r2 = new TerrainRenderer({ gridSizeForLevel: () => 2 });
    const r4 = new TerrainRenderer({ gridSizeForLevel: () => 4 });
    const tile = makeTile(14, "14/1/1", [0, 0, 100, 100]);

    const c2 = await r2.createContent(makeData(), tile);
    const c4 = await r4.createContent(makeData(), tile);
    const pos2 = (c2.renderObjects[0].object as THREE.Mesh).geometry.getAttribute(
      "position",
    );
    const pos4 = (c4.renderObjects[0].object as THREE.Mesh).geometry.getAttribute(
      "position",
    );

    // gridVerts + 4 边 × (N+1) 裙边底顶点
    expect(pos2.count).toBe((2 + 1) ** 2 + 4 * (2 + 1)); // 21
    expect(pos4.count).toBe((4 + 1) ** 2 + 4 * (4 + 1)); // 45
  });

  it("should default gridSizeForLevel to three-tile clamp((level+2)*3, 2, 64)", async () => {
    const renderer = new TerrainRenderer();
    // level 14 → clamp(16*3, 2, 64) = 48
    const tile = makeTile(14, "14/1/1", [0, 0, 100, 100]);
    const content = await renderer.createContent(makeData(), tile);
    const pos = (content.renderObjects[0].object as THREE.Mesh).geometry.getAttribute(
      "position",
    );
    expect(pos.count).toBe((48 + 1) ** 2 + 4 * (48 + 1)); // 2597
  });

  it("should set renderOrder to tile level", async () => {
    const renderer = new TerrainRenderer({ gridSizeForLevel: () => 2 });
    const tile = makeTile(7, "7/1/1", [0, 0, 100, 100]);
    const content = await renderer.createContent(makeData(), tile);
    const mesh = content.renderObjects[0].object as THREE.Mesh;
    expect(mesh.renderOrder).toBe(7);
  });

  it("should dispose map texture on disposeContent", async () => {
    const renderer = new TerrainRenderer({ gridSizeForLevel: () => 2 });
    const tile = makeTile(14, "14/1/1", [0, 0, 100, 100]);
    const content = await renderer.createContent(makeData(), tile);
    const mesh = content.renderObjects[0].object as THREE.Mesh;
    const texture = (mesh.material as THREE.MeshLambertMaterial).map!;
    const texSpy = vi.spyOn(texture, "dispose");

    renderer.disposeContent(content);
    expect(texSpy).toHaveBeenCalled();
  });

  it("should dispose geometry and material on content dispose", async () => {
    // 原型级 spy：避免 three r168 对实例方法 spyOn 的类型问题
    const geomProto = vi.spyOn(THREE.BufferGeometry.prototype, "dispose");
    const matProto = vi.spyOn(THREE.Material.prototype, "dispose");
    try {
      const renderer = new TerrainRenderer({ gridSizeForLevel: () => 2 });
      const tile = makeTile(14, "14/1/1", [0, 0, 100, 100]);
      const content = await renderer.createContent(makeData(), tile);

      content.dispose();
      expect(geomProto).toHaveBeenCalled();
      expect(matProto).toHaveBeenCalled();
    } finally {
      geomProto.mockRestore();
      matProto.mockRestore();
    }
  });
});
