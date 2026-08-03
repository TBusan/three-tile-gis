// geo-engine/packages/engine/src/tile/__tests__/ProjectTileScheme.test.ts
import { describe, it, expect } from "vitest";
import { ProjectTileScheme } from "../ProjectTileScheme";
import { makeTileKey } from "../TileKey";
import { CGCS2000GKCRS } from "../../crs/CGCS2000GK";
import type { CrsBounds } from "../../core/types";

describe("ProjectTileScheme", () => {
  const scheme = new ProjectTileScheme(500);
  const crs = new CGCS2000GKCRS(38);

  it("should compute tile size at level", () => {
    expect(scheme.tileSizeAtLevel(0)).toBe(500);
    expect(scheme.tileSizeAtLevel(1)).toBe(1000);
    expect(scheme.tileSizeAtLevel(2)).toBe(2000);
  });

  it("should return correct bounds for a tile", () => {
    const key = makeTileKey("project-500", "2-3", 0);
    const bounds = scheme.getTileBounds(key);
    // col=2, row=3, size=500
    // xmin = 2*500 = 1000, xmax = 3*500 = 1500
    // ymin = 3*500 = 1500, ymax = 4*500 = 2000
    // （与 _getTilesAtLevel 的 row=floor(yMin/size) 正值约定一致）
    expect(bounds).toEqual([1000, 1500, 1500, 2000]);
  });

  it("should return tiles in view", () => {
    // View covering 0-1000 in x, 0-1000 in y
    const extent: CrsBounds = [0, 0, 1000, 1000];
    const keys = scheme.getTilesInView(extent, crs);
    // cols: floor(0/500)=0 to floor(1000/500)=2
    // rows: floor(0/500)=0 to floor(1000/500)=2
    expect(keys.length).toBe(9); // 3x3 grid
    expect(keys[0].level).toBe(0);
    expect(keys[0].schemeId).toBe("project-500");
  });

  it("should return parent key", () => {
    const child = makeTileKey("project-500", "4-6", 1);
    const parent = scheme.getParentKey(child);
    expect(parent).not.toBeNull();
    expect(parent!.id).toBe("2-3"); // floor(4/2)=2, floor(6/2)=3
    expect(parent!.level).toBe(0);
  });

  it("should return null parent for level 0", () => {
    const key = makeTileKey("project-500", "0-0", 0);
    expect(scheme.getParentKey(key)).toBeNull();
  });

  it("should return 4 child keys", () => {
    const parent = makeTileKey("project-500", "1-1", 0);
    const children = scheme.getChildKeys(parent);
    expect(children.length).toBe(4);
    const ids = children.map((c) => c.id).sort();
    expect(ids).toEqual(["2-2", "2-3", "3-2", "3-3"]);
  });

  it("should snap origin to baseTileSize", () => {
    const world = { x: 512345.67, y: 3654987.89, z: 123.45 };
    const origin = scheme.snapOrigin(world);
    expect(origin.x).toBe(512000); // floor(512345.67 / 500) * 500
    expect(origin.y).toBe(3654500);
    expect(origin.z).toBe(0);
  });

  it("should pick level 0 when resolution is 0", () => {
    expect(scheme.pickLevel(0)).toBe(0);
  });

  it("should pick level 0 when resolution is negative", () => {
    expect(scheme.pickLevel(-1)).toBe(0);
  });

  it("should pick level 0 (finest) for small resolution (near camera)", () => {
    // 近相机：resolution 小 → idealTileSize < baseTileSize → level 0（最细瓦片）
    // resolution = 0.5 → ideal = 128m → log2(128/500) = -1.97 → max(0, -2) = 0
    expect(scheme.pickLevel(0.5)).toBe(0);
    // resolution = 1 → ideal = 256m → log2(256/500) = -0.97 → max(0, -1) = 0
    expect(scheme.pickLevel(1)).toBe(0);
  });

  it("should pick higher (coarser) level for large resolution (far camera)", () => {
    // 远相机：resolution 大 → idealTileSize 大 → level 高（粗瓦片、数量少）— 正确的 LOD 方向
    // resolution = 2 → ideal = 512m → log2(512/500) = 0.03 → 0（接近 baseTileSize 的边界）
    expect(scheme.pickLevel(2)).toBe(0);
    // resolution = 25 → ideal = 6400m → log2(6400/500) = 3.68 → 4（粗瓦片）
    expect(scheme.pickLevel(25)).toBe(4);
  });

  it("should return tiles at correct level with resolution", () => {
    const extent: CrsBounds = [0, 0, 1000, 1000];
    // resolution = 4 m/px → ideal = 1024m → pickLevel = round(log2(1024/500)) = 1
    const keys = scheme.getTilesInView(extent, crs, 4);
    // At level 1: tileSize = 1000m, 0-1000 spans cols 0-1, rows 0-1 → 2×2 = 4 tiles
    expect(keys.length).toBe(4);
    for (const k of keys) {
      expect(k.level).toBe(1);
    }
  });

  it("LOD 回归：相机越远（resolution 越大）瓦片数越少", () => {
    // 固定视野范围，随分辨率增大（相机拉远），pickLevel 升高 → 瓦片数应单调不增
    const extent: CrsBounds = [0, 0, 28000, 28000];
    const near = scheme.getTilesInView(extent, crs, 0.5).length; // 近：level 0，细瓦片
    const mid = scheme.getTilesInView(extent, crs, 4).length; // 中：level 1
    const far = scheme.getTilesInView(extent, crs, 25).length; // 远：level 4，粗瓦片
    expect(near).toBeGreaterThan(mid);
    expect(mid).toBeGreaterThan(far);
    // 远相机不应产生上千瓦片（旧 bug：远相机返回 level 0 导致 56×56=3136 个）
    expect(far).toBeLessThan(100);
  });

  it("should parse negative tile indices (CRS 负半轴瓦片)", () => {
    // 远相机视野可越过 x=0/y=0 进入负坐标区，瓦片索引可为负
    const key = makeTileKey("project-500", "-1-11", 0);
    // getTileBounds 应正确解析负 col
    const bounds = scheme.getTileBounds(key);
    // col=-1 → xmin=-500, xmax=0；row=11 → ymin=5500, ymax=6000
    expect(bounds).toEqual([-500, 5500, 0, 6000]);

    // 负索引瓦片的父瓦片与子瓦片也应正常（level 1 才有父瓦片）
    const keyL1 = makeTileKey("project-500", "-1-11", 1);
    const parent = scheme.getParentKey(keyL1);
    expect(parent).not.toBeNull();
    expect(parent!.id).toBe("-1-5"); // floor(-1/2)=-1, floor(11/2)=5
    expect(parent!.level).toBe(0);
    const children = scheme.getChildKeys(key);
    expect(children.length).toBe(4);
  });

  it("getTilesInView → getTileBounds 往返一致：bounds 并集覆盖视图范围", () => {
    // 回归测试：防止 getTileBounds 与 _getTilesAtLevel 的 y 约定不一致
    // （旧 bug：row 用正值计算，bounds 却返回负 y，导致瓦片镜像到负半轴）
    const extent: CrsBounds = [1234, 5678, 3456, 7890];
    const keys = scheme.getTilesInView(extent, crs);
    expect(keys.length).toBeGreaterThan(0);

    let xmin = Infinity;
    let ymin = Infinity;
    let xmax = -Infinity;
    let ymax = -Infinity;
    for (const key of keys) {
      const b = scheme.getTileBounds(key);
      xmin = Math.min(xmin, b[0]);
      ymin = Math.min(ymin, b[1]);
      xmax = Math.max(xmax, b[2]);
      ymax = Math.max(ymax, b[3]);
    }
    // 瓦片 bounds 的并集必须完整覆盖视图 extent
    expect(xmin).toBeLessThanOrEqual(extent[0]);
    expect(ymin).toBeLessThanOrEqual(extent[1]);
    expect(xmax).toBeGreaterThanOrEqual(extent[2]);
    expect(ymax).toBeGreaterThanOrEqual(extent[3]);
  });

  it("MAX_TILES_PER_LAYER 递归升 level 时 currentZoom 同步到实际渲染级别", () => {
    // 超大视野 + 未指定分辨率（level 0）：level 0 瓦片数 > 4096 → 递归升 level。
    // 回归测试：若 _stableLevel 不随递归更新，TileManager 会把实际渲染中的
    // level 1 瓦片误判为「旧级别」→ 5s 后强制淘汰且不重载 → 白屏。
    const bigExtent: CrsBounds = [0, 0, 33000, 33000];
    const keys = scheme.getTilesInView(bigExtent, crs, 0);
    // 实际渲染级别应为 level 1（瓦片 1000m，34×34=1156 个）
    expect(keys.length).toBeGreaterThan(0);
    for (const k of keys) {
      expect(k.level).toBe(1);
    }
    // currentZoom 必须反映实际渲染级别
    expect(scheme.currentZoom).toBe(1);
  });
});
