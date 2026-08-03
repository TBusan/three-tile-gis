// geo-engine/packages/engine/src/renderer/quality/__tests__/SimplePlane.test.ts

import { describe, it, expect } from "vitest";
import * as THREE from "three";
import { SimplePlane } from "../SimplePlane";
import { WebMercatorCRS } from "../../../crs/WebMercator";
import { CGCS2000GKCRS } from "../../../crs/CGCS2000GK";
import { XYZTileScheme } from "../../../tile/XYZTileScheme";
import { makeTileKey } from "../../../tile/TileKey";

describe("SimplePlane", () => {
  it("should create a centered rectangle when no reprojector", () => {
    const sp = new SimplePlane();
    const geo = sp.createGeometry([0, 0, 100, 200], { x: 0, y: 0, z: 0 });
    const pos = geo.getAttribute("position");
    expect(pos.count).toBe(4);
    // 中心在 (50, 100)
    const xs = Array.from(pos.array).filter((_, i) => i % 3 === 0);
    const ys = Array.from(pos.array).filter((_, i) => i % 3 === 1);
    expect(Math.min(...xs)).toBeCloseTo(0);
    expect(Math.max(...xs)).toBeCloseTo(100);
    expect(Math.min(...ys)).toBeCloseTo(0);
    expect(Math.max(...ys)).toBeCloseTo(200);
  });

  it("should use reprojected corners (not AABB) when a reprojector is provided", () => {
    const wm = new WebMercatorCRS();
    const scheme = new XYZTileScheme(wm as any, 0, 18);
    // 北京附近的 z=12 瓦片
    const key = makeTileKey("xyz", "12/356/170", 12);
    const r = scheme.getReprojector(key)!;
    const bounds = scheme.getTileBounds(key);
    // 贴近瓦片的局部原点（引擎 _snapOrigin 的实际做法），保证 float32 精度
    const origin = { x: bounds[0], y: bounds[1], z: 0 };

    const sp = new SimplePlane();
    const geo = sp.createGeometry(bounds, origin, r);
    const pos = geo.getAttribute("position");
    expect(pos.count).toBe(4);

    // 每个顶点都必须等于 reprojector 在对应角点的精确输出，
    // 而不是 AABB 角点（3857 下 AABB 与角点重合，误差为零）。
    const expected = [
      r(0, 0),
      r(1, 0),
      r(1, 1),
      r(0, 1),
    ];
    for (let i = 0; i < 4; i++) {
      expect(pos.getX(i)).toBeCloseTo(expected[i].x - origin.x, 3);
      expect(pos.getY(i)).toBeCloseTo(expected[i].y - origin.y, 3);
      expect(pos.getZ(i)).toBe(0);
    }

    // 4 个角点必须恰好覆盖瓦片足迹的凸包（z=12 的 3857 瓦片约 4.9km 见方）
    const xs = [pos.getX(0), pos.getX(1), pos.getX(2), pos.getX(3)];
    const ys = [pos.getY(0), pos.getY(1), pos.getY(2), pos.getY(3)];
    expect(Math.max(...xs) - Math.min(...xs)).toBeGreaterThan(4000);
    expect(Math.max(...ys) - Math.min(...ys)).toBeGreaterThan(4000);
  });

  it("adjacent tiles share identical edges (GK non-linear CRS)", () => {
    const gk = new CGCS2000GKCRS(38);
    const scheme = new XYZTileScheme(gk as any, 0, 18);
    const sp = new SimplePlane();

    const kA = makeTileKey("xyz", "12/356/170", 12);
    const kB = makeTileKey("xyz", "12/357/170", 12);
    const rA = scheme.getReprojector(kA)!;
    const rB = scheme.getReprojector(kB)!;
    const bA = scheme.getTileBounds(kA);
    const bB = scheme.getTileBounds(kB);
    const originA = { x: bA[0], y: bA[1], z: 0 };
    const originB = { x: bB[0], y: bB[1], z: 0 };

    const gA = sp.createGeometry(bA, originA, rA);
    const gB = sp.createGeometry(bB, originB, rB);
    const pA = gA.getAttribute("position");
    const pB = gB.getAttribute("position");

    // 找 A 的东边顶点（u=1）：v=0 和 v=1
    const aEast = [rA(1, 0), rA(1, 1)];
    // 找 B 的西边顶点（u=0）：v=0 和 v=1
    const bWest = [rB(0, 0), rB(0, 1)];

    for (let i = 0; i < 2; i++) {
      expect(aEast[i].x).toBeCloseTo(bWest[i].x, 3);
      expect(aEast[i].y).toBeCloseTo(bWest[i].y, 3);
    }

    // 世界坐标（局部坐标 + group 偏移 origin）在共享边必须重合
    expect(pA.getX(1) + originA.x).toBeCloseTo(pB.getX(0) + originB.x, 3);
    expect(pA.getY(1) + originA.y).toBeCloseTo(pB.getY(0) + originB.y, 3);
    expect(pA.getX(2) + originA.x).toBeCloseTo(pB.getX(3) + originB.x, 3);
    expect(pA.getY(2) + originA.y).toBeCloseTo(pB.getY(3) + originB.y, 3);
  });

  it("rectangular path with bleed should extend positions beyond bounds and UV outward", () => {
    const sp = new SimplePlane();
    const geo = sp.createGeometry([0, 0, 100, 200], { x: 0, y: 0, z: 0 }, undefined, undefined, 0.1);
    const pos = geo.getAttribute("position") as THREE.BufferAttribute;
    const uv = geo.getAttribute("uv") as THREE.BufferAttribute;

    // 位置扩展到出血边界：x ∈ [-10, 110], y ∈ [-20, 220]
    expect(pos.count).toBe(4);
    const xs = Array.from(pos.array).filter((_, i) => i % 3 === 0) as number[];
    const ys = Array.from(pos.array).filter((_, i) => i % 3 === 1) as number[];
    expect(Math.min(...xs)).toBeCloseTo(-10);
    expect(Math.max(...xs)).toBeCloseTo(110);
    expect(Math.min(...ys)).toBeCloseTo(-20);
    expect(Math.max(...ys)).toBeCloseTo(220);

    // UV 同步外延到 [-b, 1+b]（clampToEdge 把出血条带采样为边缘纹素）
    const uvs = Array.from(uv.array) as number[];
    expect(Math.min(...uvs)).toBeCloseTo(-0.1);
    expect(Math.max(...uvs)).toBeCloseTo(1.1);
  });

  it("rectangular bleed keeps true tile edge at UV 0/1 (no interior stretch)", () => {
    const sp = new SimplePlane();
    const b = 0.1;
    const geo = sp.createGeometry([0, 0, 100, 200], { x: 0, y: 0, z: 0 }, undefined, undefined, b);
    const pos = geo.getAttribute("position") as THREE.BufferAttribute;
    const uv = geo.getAttribute("uv") as THREE.BufferAttribute;

    // 世界 x=0（瓦片西边界）对应的 UV 应为 0：线性插值 (x_left_bleed → -b, x_right_bleed → 1+b)
    // x=0 处归一化位置 = (0 - (-10)) / 120 = 1/12，UV = -0.1 + (1/12) * 1.2 = 0
    const nLeft = -b * 100; // -10
    const nRight = 100 + b * 100; // 110
    const x0Uv = -b + ((0 - nLeft) / (nRight - nLeft)) * (1 + 2 * b);
    expect(x0Uv).toBeCloseTo(0, 5);

    // 世界 y=0（瓦片南边界）对应 UV 0；y=200 对应 UV 1
    const nBottom = -b * 200;
    const nTop = 200 + b * 200;
    const y0Uv = -b + ((0 - nBottom) / (nTop - nBottom)) * (1 + 2 * b);
    const y200Uv = -b + ((200 - nBottom) / (nTop - nBottom)) * (1 + 2 * b);
    expect(y0Uv).toBeCloseTo(0, 5);
    expect(y200Uv).toBeCloseTo(1, 5);
  });

  it("reprojector path should ignore bleed (still 4 vertices, UV in [0,1])", () => {
    const wm = new WebMercatorCRS();
    const scheme = new XYZTileScheme(wm as any, 0, 18);
    const key = makeTileKey("xyz", "12/356/170", 12);
    const r = scheme.getReprojector(key)!;
    const bounds = scheme.getTileBounds(key);
    const origin = { x: bounds[0], y: bounds[1], z: 0 };

    const sp = new SimplePlane();
    const geo = sp.createGeometry(bounds, origin, r, 12, 0.1);
    const pos = geo.getAttribute("position");
    const uv = geo.getAttribute("uv") as THREE.BufferAttribute;
    expect(pos.count).toBe(4);
    const uvs = Array.from(uv.array) as number[];
    expect(Math.min(...uvs)).toBe(0);
    expect(Math.max(...uvs)).toBe(1);
  });
});
