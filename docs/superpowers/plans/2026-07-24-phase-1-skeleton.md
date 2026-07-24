# Phase 1: 骨架跑通 — CRS + ProjectTileScheme + GeoTIFF → 屏幕

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 建立引擎骨架，加载本地 GeoTIFF 并通过 Project CRS + Local/Floating Origin 正确显示在屏幕上。

**Architecture:** 自底向上构建：类型定义 → CRS → TileScheme → Tile 数据结构 → Cache → Origin → DataSource → Renderer → Layer → TileManager → Engine。

**Tech Stack:** TypeScript 5.x + Three.js r168+ + geotiff.js + Vite + vitest

**Spec:** `D:\study\code\webgl\three-tile-gis\doc\设计文档.md`

## Global Constraints

- 所有文件创建在 `D:\study\code\webgl\three-tile-gis\geo-engine\` 下
- 不修改 `three-tile\` 目录中的任何文件
- 数据坐标必须是 Engine CRS 坐标（米制）
- 每层只依赖接口，不依赖具体实现
- 使用 `Disposable` 基类管理资源释放

---

### Task 1: 项目脚手架搭建

**Files:**
- Create: `geo-engine/package.json`
- Create: `geo-engine/tsconfig.json`
- Create: `geo-engine/packages/engine/package.json`
- Create: `geo-engine/packages/engine/tsconfig.json`
- Create: `geo-engine/packages/engine/src/index.ts`
- Create: `geo-engine/packages/demo/package.json`
- Create: `geo-engine/packages/demo/index.html`
- Create: `geo-engine/packages/demo/vite.config.ts`

**Interfaces:**
- Produces: monorepo 目录结构，可 `npm install && npm run dev` 启动空白页面

- [ ] **Step 1: 创建根 package.json**

```json
{
  "name": "geo-engine-monorepo",
  "private": true,
  "workspaces": ["packages/*"],
  "scripts": {
    "dev": "npm run dev -w packages/demo",
    "build": "npm run build -w packages/engine",
    "test": "npm run test -w packages/engine"
  }
}
```

- [ ] **Step 2: 创建根 tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  }
}
```

- [ ] **Step 3: 创建 packages/engine/package.json**

```json
{
  "name": "@geo-engine/core",
  "version": "0.1.0",
  "type": "module",
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "dependencies": {
    "three": "^0.168.0"
  },
  "devDependencies": {
    "vitest": "^1.6.0"
  }
}
```

- [ ] **Step 4: 创建 packages/engine/src/index.ts**（空文件，后续任务填充）

```ts
// @geo-engine/core — Engineering 3D GIS Engine
export {};
```

- [ ] **Step 5: 创建 packages/demo/package.json**

```json
{
  "name": "@geo-engine/demo",
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build"
  },
  "dependencies": {
    "@geo-engine/core": "*",
    "three": "^0.168.0"
  },
  "devDependencies": {
    "vite": "^5.4.0",
    "typescript": "^5.5.0"
  }
}
```

- [ ] **Step 6: 创建 packages/demo/vite.config.ts**

```ts
import { defineConfig } from "vite";

export default defineConfig({
  root: ".",
  server: { port: 5173, open: true },
});
```

- [ ] **Step 7: 创建 packages/demo/index.html**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>GeoEngine Demo</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body, #app { width: 100%; height: 100%; overflow: hidden; }
    #app { background: #1a1a2e; }
  </style>
</head>
<body>
  <div id="app"></div>
  <script type="module" src="./src/main.ts"></script>
</body>
</html>
```

- [ ] **Step 8: 创建 packages/demo/src/main.ts**

```ts
console.log("GeoEngine Demo ready");
```

- [ ] **Step 9: 安装依赖并验证**

Run: `cd D:/study/code/webgl/three-tile-gis/geo-engine && npm install`
Expected: 安装成功，无报错

Run: `npm run dev`
Expected: Vite 启动，浏览器打开显示 "GeoEngine Demo ready"

- [ ] **Step 10: Commit**

```bash
git add geo-engine/
git commit -m "feat: project scaffolding for geo-engine monorepo"
```

---

### Task 2: 核心类型定义 + Disposable 基类

**Files:**
- Create: `geo-engine/packages/engine/src/core/types.ts`
- Create: `geo-engine/packages/engine/src/core/Disposable.ts`
- Create: `geo-engine/packages/engine/src/core/index.ts`

**Interfaces:**
- Produces:
  - `CrsCoord: { x: number; y: number; z: number }`
  - `CrsBounds: [number, number, number, number]`
  - `Disposable` abstract class with `dispose()` and `_disposed` flag

- [ ] **Step 1: 创建 types.ts**

```ts
// geo-engine/packages/engine/src/core/types.ts

/** CRS 空间中的点坐标（米） */
export interface CrsCoord {
  x: number; // 东向
  y: number; // 北向
  z: number; // 高程
}

/** CRS 空间包围盒 [xmin, ymin, xmax, ymax] */
export type CrsBounds = [number, number, number, number];
```

- [ ] **Step 2: 创建 Disposable.ts**

```ts
// geo-engine/packages/engine/src/core/Disposable.ts

export abstract class Disposable {
  private _disposed = false;

  get disposed(): boolean {
    return this._disposed;
  }

  abstract dispose(): void;

  protected markDisposed(): void {
    this._disposed = true;
  }

  protected assertNotDisposed(): void {
    if (this._disposed) {
      throw new Error(`[${this.constructor.name}] Object already disposed.`);
    }
  }
}
```

- [ ] **Step 3: 创建 core/index.ts**

```ts
// geo-engine/packages/engine/src/core/index.ts
export { type CrsCoord, type CrsBounds } from "./types";
export { Disposable } from "./Disposable";
```

- [ ] **Step 4: 更新 engine/src/index.ts**

```ts
export * from "./core";
```

- [ ] **Step 5: 验证 TypeScript 编译**

Run: `cd D:/study/code/webgl/three-tile-gis/geo-engine && npx tsc --noEmit -p packages/engine/tsconfig.json`
Expected: 无 TS 错误

- [ ] **Step 6: Commit**

```bash
git add geo-engine/packages/engine/src/core/
git commit -m "feat: add CrsCoord, CrsBounds types and Disposable base class"
```

---

### Task 3: IProjectCRS 接口 + CGCS2000GKCRS 实现

**Files:**
- Create: `geo-engine/packages/engine/src/crs/IProjectCRS.ts`
- Create: `geo-engine/packages/engine/src/crs/CGCS2000GK.ts`
- Create: `geo-engine/packages/engine/src/crs/index.ts`

**Interfaces:**
- Produces:
  - `IProjectCRS: { name, units, project(lon,lat), unproject(x,y) }`
  - `CGCS2000GKCRS(zone: number)` → 实现高斯-克吕格投影

- [ ] **Step 1: 创建 crs/IProjectCRS.ts**

```ts
// geo-engine/packages/engine/src/crs/IProjectCRS.ts

export interface IProjectCRS {
  /** CRS 名称 */
  readonly name: string;
  /** 坐标单位 */
  readonly units: "meter" | "degree";

  /** 经纬度 → CRS 平面坐标 */
  project(lon: number, lat: number): { x: number; y: number };

  /** CRS 平面坐标 → 经纬度 */
  unproject(x: number, y: number): { lon: number; lat: number };
}
```

- [ ] **Step 2: 创建 crs/CGCS2000GK.ts — 高斯-克吕格投影实现**

```ts
// geo-engine/packages/engine/src/crs/CGCS2000GK.ts

import { IProjectCRS } from "./IProjectCRS";

/**
 * CGCS2000 高斯-克吕格投影（3度带）
 *
 * 内置公式，无外部依赖。支持任意中央子午线。
 * 东偏移 = 500000m（标准），北偏移 = 0
 *
 * 公式来源：GB/T 18314-2009
 */
export class CGCS2000GKCRS implements IProjectCRS {
  readonly name: string;
  readonly units = "meter" as const;

  /** 椭球参数 — CGCS2000 */
  private static readonly a = 6378137.0; // 长半轴
  private static readonly f = 1 / 298.257222101; // 扁率
  private static readonly e2 = 2 * CGCS2000GKCRS.f - CGCS2000GKCRS.f ** 2; // 第一偏心率平方
  private static readonly eP2 = CGCS2000GKCRS.e2 / (1 - CGCS2000GKCRS.e2); // 第二偏心率平方

  /** 中央子午线（度） */
  private readonly centralMeridian: number;
  /** 东偏移（米） */
  private readonly falseEasting = 500000;
  /** 北偏移（米） */
  private readonly falseNorthing = 0;

  constructor(zone: number) {
    // 3度带：中央子午线 = 3 * zone
    this.centralMeridian = 3 * zone;
    this.name = `CGCS2000_GK_${zone}`;
  }

  project(lon: number, lat: number): { x: number; y: number } {
    const L = this.toRadians(lon - this.centralMeridian);
    const B = this.toRadians(lat);

    const sinB = Math.sin(B);
    const cosB = Math.cos(B);
    const tanB = Math.tan(B);

    const N = CGCS2000GKCRS.a / Math.sqrt(1 - CGCS2000GKCRS.e2 * sinB * sinB);
    const T = tanB * tanB;
    const C = CGCS2000GKCRS.eP2 * cosB * cosB;
    const A = L * cosB;

    const M = CGCS2000GKCRS.a * (
      (1 - CGCS2000GKCRS.e2 / 4 - 3 * CGCS2000GKCRS.e2 ** 2 / 64 - 5 * CGCS2000GKCRS.e2 ** 3 / 256) * B
      - (3 * CGCS2000GKCRS.e2 / 8 + 3 * CGCS2000GKCRS.e2 ** 2 / 32 + 45 * CGCS2000GKCRS.e2 ** 3 / 1024) * Math.sin(2 * B)
      + (15 * CGCS2000GKCRS.e2 ** 2 / 256 + 45 * CGCS2000GKCRS.e2 ** 3 / 1024) * Math.sin(4 * B)
      - (35 * CGCS2000GKCRS.e2 ** 3 / 3072) * Math.sin(6 * B)
    );

    const x = this.falseEasting + N * (
      A + (1 - T + C) * A ** 3 / 6 + (5 - 18 * T + T ** 2 + 72 * C - 58 * CGCS2000GKCRS.eP2) * A ** 5 / 120
    );

    const y = this.falseNorthing + M + N * tanB * (
      A ** 2 / 2 + (5 - T + 9 * C + 4 * C ** 2) * A ** 4 / 24
      + (61 - 58 * T + T ** 2 + 600 * C - 330 * CGCS2000GKCRS.eP2) * A ** 6 / 720
    );

    return { x, y };
  }

  unproject(x: number, y: number): { lon: number; lat: number } {
    // 迭代反算：从东/北坐标反推经纬度
    const Mf = (y - this.falseNorthing) / CGCS2000GKCRS.a;
    let Bf = Mf;
    const e1 = (1 - Math.sqrt(1 - CGCS2000GKCRS.e2)) / (1 + Math.sqrt(1 - CGCS2000GKCRS.e2));

    // 牛顿迭代求底点纬度
    for (let i = 0; i < 5; i++) {
      Bf = Mf + (3 * e1 / 2 - 27 * e1 ** 3 / 32) * Math.sin(2 * Bf)
        + (21 * e1 ** 2 / 16 - 55 * e1 ** 4 / 32) * Math.sin(4 * Bf)
        + (151 * e1 ** 3 / 96) * Math.sin(6 * Bf)
        + (1097 * e1 ** 4 / 512) * Math.sin(8 * Bf);
    }

    const sinBf = Math.sin(Bf);
    const cosBf = Math.cos(Bf);
    const tanBf = Math.tan(Bf);
    const Nf = CGCS2000GKCRS.a / Math.sqrt(1 - CGCS2000GKCRS.e2 * sinBf ** 2);
    const Tf = tanBf ** 2;
    const Cf = CGCS2000GKCRS.eP2 * cosBf ** 2;
    const D = (x - this.falseEasting) / Nf;

    const latRad = Bf
      - Nf * tanBf / (y - this.falseNorthing + Mf * CGCS2000GKCRS.a) * (
        D ** 2 / 2 - (5 + 3 * Tf + 10 * Cf - 4 * Cf ** 2 - 9 * CGCS2000GKCRS.eP2) * D ** 4 / 24
        + (61 + 90 * Tf + 298 * Cf + 45 * Tf ** 2 - 252 * CGCS2000GKCRS.eP2 - 3 * Cf ** 2) * D ** 6 / 720
      );

    const lonRad = this.toRadians(this.centralMeridian) + (
      D - (1 + 2 * Tf + Cf) * D ** 3 / 6
      + (5 - 2 * Cf + 28 * Tf - 3 * Cf ** 2 + 8 * CGCS2000GKCRS.eP2 + 24 * Tf ** 2) * D ** 5 / 120
    ) / cosBf;

    return { lon: this.toDegrees(lonRad), lat: this.toDegrees(latRad) };
  }

  private toRadians(deg: number): number {
    return (deg * Math.PI) / 180;
  }

  private toDegrees(rad: number): number {
    return (rad * 180) / Math.PI;
  }
}
```

- [ ] **Step 3: 创建 crs/index.ts**

```ts
export { type IProjectCRS } from "./IProjectCRS";
export { CGCS2000GKCRS } from "./CGCS2000GK";
```

- [ ] **Step 4: 更新 engine/src/index.ts** — 追加 `export * from "./crs";`

- [ ] **Step 5: 编写基础测试 — 正向+反向投影往返精度**

Create: `geo-engine/packages/engine/src/crs/__tests__/CGCS2000GK.test.ts`

```ts
import { describe, it, expect } from "vitest";
import { CGCS2000GKCRS } from "../CGCS2000GK";

describe("CGCS2000GKCRS", () => {
  const crs = new CGCS2000GKCRS(38); // 114°E 中央子午线

  it("should project a known point", () => {
    const { x, y } = crs.project(114, 30);
    // 中央子午线附近 → x ≈ 500000, y > 0
    expect(x).toBeCloseTo(500000, -2);
    expect(y).toBeGreaterThan(0);
  });

  it("should round-trip project/unproject", () => {
    const { x, y } = crs.project(113.5, 28.3);
    const { lon, lat } = crs.unproject(x, y);
    expect(lon).toBeCloseTo(113.5, 5);
    expect(lat).toBeCloseTo(28.3, 5);
  });

  it("should produce correct zone-specific name", () => {
    expect(new CGCS2000GKCRS(38).name).toBe("CGCS2000_GK_38");
    expect(new CGCS2000GKCRS(37).name).toBe("CGCS2000_GK_37");
  });
});
```

- [ ] **Step 6: 运行测试**

Run: `cd D:/study/code/webgl/three-tile-gis/geo-engine && npx vitest run packages/engine/src/crs/__tests__/CGCS2000GK.test.ts`
Expected: 3 tests pass

- [ ] **Step 7: Commit**

```bash
git add geo-engine/packages/engine/src/crs/
git commit -m "feat: add IProjectCRS interface and CGCS2000GKCRS implementation"
```

---

### Task 4: TileKey + TileState + Tile 数据结构

**Files:**
- Create: `geo-engine/packages/engine/src/tile/TileKey.ts`
- Create: `geo-engine/packages/engine/src/tile/TileState.ts`
- Create: `geo-engine/packages/engine/src/tile/Tile.ts`
- Create: `geo-engine/packages/engine/src/tile/index.ts`

**Interfaces:**
- Produces:
  - `TileKey: { schemeId, id, level }`
  - `TileState` enum: UNLOADED, LOADING, LOADED, VISIBLE, FAILED
  - `Tile:` data-only interface（不继承 Object3D）

- [ ] **Step 1: 创建 tile/TileKey.ts**

```ts
// geo-engine/packages/engine/src/tile/TileKey.ts

export interface TileKey {
  /** 绑定的 TileScheme 标识 */
  schemeId: string;
  /** Scheme 内部的 key 字符串（如 "1024-7308" 或 "14-12345-6789"） */
  id: string;
  /** 层级 */
  level: number;
}
```

- [ ] **Step 2: 创建 tile/TileState.ts**

```ts
// geo-engine/packages/engine/src/tile/TileState.ts

export enum TileState {
  UNLOADED = "unloaded",
  LOADING = "loading",
  LOADED = "loaded",
  VISIBLE = "visible",
  FAILED = "failed",
}
```

- [ ] **Step 3: 创建 tile/Tile.ts**

```ts
// geo-engine/packages/engine/src/tile/Tile.ts
import { CrsBounds, CrsCoord } from "../core";
import { TileKey } from "./TileKey";
import { TileState } from "./TileState";
import { TileContent } from "./TileContent"; // 在 Task 5 创建

export interface Tile {
  readonly id: string;
  readonly key: TileKey;
  readonly bounds: CrsBounds;
  readonly origin: CrsCoord;
  state: TileState;
  contents: TileContent[];
}
```

- [ ] **Step 4: 创建 tile/index.ts**

```ts
export { type Tile } from "./Tile";
export { type TileKey } from "./TileKey";
export { TileState } from "./TileState";
```

- [ ] **Step 5: 验证编译**

Run: `cd D:/study/code/webgl/three-tile-gis/geo-engine && npx tsc --noEmit -p packages/engine/tsconfig.json`
Expected: 无 TS 错误（TileContent 还不在，先注释掉 Tile.ts 中的 TileContent import）

**修正 Step 3** — Tile.ts 先不 import TileContent（在 Task 5 创建后再关联）:

```ts
// geo-engine/packages/engine/src/tile/Tile.ts
import { CrsBounds, CrsCoord } from "../core";
import { TileKey } from "./TileKey";
import { TileState } from "./TileState";

/** TileContent 占位 — Task 5 替换为实际类型 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TileContent = any;

export interface Tile {
  readonly id: string;
  readonly key: TileKey;
  readonly bounds: CrsBounds;
  readonly origin: CrsCoord;
  state: TileState;
  contents: TileContent[];
}
```

- [ ] **Step 6: Commit**

```bash
git add geo-engine/packages/engine/src/tile/
git commit -m "feat: add TileKey, TileState, and Tile data structures"
```

---

### Task 5: TileContent + RenderObject

**Files:**
- Create: `geo-engine/packages/engine/src/tile/TileContent.ts`
- Create: `geo-engine/packages/engine/src/tile/RenderObject.ts`
- Modify: `geo-engine/packages/engine/src/tile/Tile.ts:1` (替换 any)

**Interfaces:**
- Produces:
  - `TileContent: { id, tileKey, layerId, data, renderObjects, state }` extends Disposable
  - `RenderObject: { object: Object3D }` extends Disposable

- [ ] **Step 1: 创建 ContentState 枚举在 TileContent.ts 中**

```ts
// geo-engine/packages/engine/src/tile/TileContent.ts
import { Object3D } from "three";
import { Disposable } from "../core";
import { TileKey } from "./TileKey";

export enum ContentState {
  CREATING = "creating",
  READY = "ready",
  FAILED = "failed",
}

export interface TileContent {
  readonly id: string;
  readonly tileKey: TileKey;
  readonly layerId: string;
  readonly data: unknown;
  readonly renderObjects: RenderObject[];
  state: ContentState;
}

/**
 * RenderObject — Three.js 对象的轻量包装。
 * dispose() 自动释放 GPU 资源 + 解除 FloatingOrigin 注册。
 */
export class RenderObject extends Disposable {
  constructor(
    public readonly object: Object3D,
    private readonly onDispose?: (obj: Object3D) => void,
  ) {
    super();
  }

  dispose(): void {
    this.assertNotDisposed();
    this.onDispose?.(this.object);
    this.object.traverse((child) => {
      const mesh = child as THREE.Mesh;
      if (mesh.geometry) {
        mesh.geometry.dispose();
      }
      if (mesh.material) {
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((m) => m.dispose());
        } else {
          mesh.material.dispose();
        }
      }
    });
    this.object.removeFromParent();
    this.markDisposed();
  }
}

// THREE import for type narrowing in dispose
import * as THREE from "three";
```

- [ ] **Step 2: 更新 Tile.ts — 替换 any**

```ts
import { TileContent } from "./TileContent";
// 删除 type TileContent = any;
```

- [ ] **Step 3: 更新 tile/index.ts**

```ts
export { type TileContent, ContentState, RenderObject } from "./TileContent";
```

- [ ] **Step 4: 验证编译**

Run: `cd D:/study/code/webgl/three-tile-gis/geo-engine && npx tsc --noEmit -p packages/engine/tsconfig.json`
Expected: 无 TS 错误

- [ ] **Step 5: Commit**

```bash
git add geo-engine/packages/engine/src/tile/
git commit -m "feat: add TileContent, ContentState, and RenderObject with GPU disposal"
```

---

### Task 6: ITileScheme 接口 + ProjectTileScheme

**Files:**
- Create: `geo-engine/packages/engine/src/tile/ITileScheme.ts`
- Create: `geo-engine/packages/engine/src/tile/ProjectTileScheme.ts`
- Modify: `geo-engine/packages/engine/src/tile/index.ts`

**Interfaces:**
- Produces:
  - `ITileScheme: { name, getTilesInView(), getTileBounds(), getParentKey(), getChildKeys() }`
  - `ProjectTileScheme(tileSizeMeters): ITileScheme` — 按米分块

- [ ] **Step 1: 创建 ITileScheme.ts**

```ts
// geo-engine/packages/engine/src/tile/ITileScheme.ts
import { Frustum } from "three";
import { CrsBounds } from "../core";
import { IProjectCRS } from "../crs";
import { TileKey } from "./TileKey";

export interface ITileScheme {
  readonly name: string;

  /** 给定视锥体和 CRS，返回可见的 TileKey 集合 */
  getTilesInView(frustum: Frustum, crs: IProjectCRS): TileKey[];

  /** 给定 TileKey，返回 CRS 空间包围盒 */
  getTileBounds(key: TileKey): CrsBounds;

  /** 父 Tile */
  getParentKey(key: TileKey): TileKey | null;

  /** 子 Tile */
  getChildKeys(key: TileKey): TileKey[];
}
```

- [ ] **Step 2: 创建 ProjectTileScheme.ts**

```ts
// geo-engine/packages/engine/src/tile/ProjectTileScheme.ts
import { Frustum, Box3, Vector3 } from "three";
import { CrsBounds } from "../core";
import { IProjectCRS } from "../crs";
import { TileKey } from "./TileKey";
import { ITileScheme } from "./ITileScheme";

/**
 * 工程瓦片方案 — 按固定米数分块。
 *
 * tileX = floor(worldX / tileSize)
 * tileY = floor(worldY / tileSize)
 *
 * 不涉及投影转换，纯平面网格。
 */
export class ProjectTileScheme implements ITileScheme {
  readonly name: string;

  private readonly tileSize: number;

  constructor(tileSizeMeters: number, name?: string) {
    this.tileSize = tileSizeMeters;
    this.name = name ?? `ProjectTile(${tileSizeMeters}m)`;
  }

  get schemeId(): string {
    return this.name;
  }

  getTilesInView(frustum: Frustum, _crs: IProjectCRS): TileKey[] {
    // 从视锥体推算地面范围（简化：取 frustum 与 z=0 平面的交点）
    // 返回 level=0 的 tile（ProjectTileScheme 只有一层）
    const groundBounds = this.getGroundBounds(frustum);
    if (!groundBounds) return [];

    const minX = Math.floor(groundBounds[0] / this.tileSize);
    const minY = Math.floor(groundBounds[1] / this.tileSize);
    const maxX = Math.floor(groundBounds[2] / this.tileSize);
    const maxY = Math.floor(groundBounds[3] / this.tileSize);

    const keys: TileKey[] = [];
    for (let tx = minX; tx <= maxX; tx++) {
      for (let ty = minY; ty <= maxY; ty++) {
        keys.push({
          schemeId: this.name,
          id: `${tx}-${ty}`,
          level: 0,
        });
      }
    }
    return keys;
  }

  getTileBounds(key: TileKey): CrsBounds {
    const [tx, ty] = key.id.split("-").map(Number);
    return [
      tx * this.tileSize,
      ty * this.tileSize,
      (tx + 1) * this.tileSize,
      (ty + 1) * this.tileSize,
    ];
  }

  getParentKey(_key: TileKey): TileKey | null {
    return null; // ProjectTile 不支持 LOD（单层）
  }

  getChildKeys(_key: TileKey): TileKey[] {
    return []; // 单层，无子 tile
  }

  /** 估算视锥体与 z=0 平面的交集 */
  private getGroundBounds(frustum: Frustum): CrsBounds | null {
    // 简化：用 frustum.planes 估算一个大的地面范围
    // 精确实现：计算 8 个角点 → screen → world → 取 min/max
    // Phase 1 使用保守估计
    const boxPoints = [
      new Vector3(-100000, -100000, -1000),
      new Vector3(100000, 100000, 1000),
    ];
    // 简化实现：返回固定的大范围
    // TODO Phase 2: 实现精确的 frustum→ground 计算
    return [-100000, -100000, 100000, 100000];
  }
}
```

- [ ] **Step 3: 更新 tile/index.ts**

```ts
export { type ITileScheme } from "./ITileScheme";
export { ProjectTileScheme } from "./ProjectTileScheme";
```

- [ ] **Step 4: 编写测试**

Create: `geo-engine/packages/engine/src/tile/__tests__/ProjectTileScheme.test.ts`

```ts
import { describe, it, expect } from "vitest";
import { ProjectTileScheme } from "../ProjectTileScheme";
import { CGCS2000GKCRS } from "../../crs";

describe("ProjectTileScheme", () => {
  const scheme = new ProjectTileScheme(500, "test");
  const crs = new CGCS2000GKCRS(38);

  it("should compute tile bounds correctly", () => {
    const bounds = scheme.getTileBounds({
      schemeId: "test",
      id: "2-3",
      level: 0,
    });
    expect(bounds).toEqual([1000, 1500, 1500, 2000]);
  });

  it("should generate correct name", () => {
    expect(new ProjectTileScheme(1000).name).toBe("ProjectTile(1000m)");
  });

  it("should return null for parent", () => {
    expect(scheme.getParentKey({ schemeId: "test", id: "0-0", level: 0 })).toBeNull();
  });

  it("should return empty for children", () => {
    expect(scheme.getChildKeys({ schemeId: "test", id: "0-0", level: 0 })).toEqual([]);
  });
});
```

- [ ] **Step 5: 运行测试**

Run: `cd D:/study/code/webgl/three-tile-gis/geo-engine && npx vitest run packages/engine/src/tile/__tests__/ProjectTileScheme.test.ts`
Expected: 4 tests pass

- [ ] **Step 6: Commit**

```bash
git add geo-engine/packages/engine/src/tile/
git commit -m "feat: add ITileScheme interface and ProjectTileScheme (meter-based grid)"
```

---

### Task 7: ITileCache 接口 + LRUTileCache

**Files:**
- Create: `geo-engine/packages/engine/src/manager/ITileCache.ts`
- Create: `geo-engine/packages/engine/src/manager/LRUTileCache.ts`
- Create: `geo-engine/packages/engine/src/manager/index.ts`

**Interfaces:**
- Produces: `ITileCache<T> { get, set, has, remove, trim, size }` + `LRUTileCache<T>`

- [ ] **Step 1: 创建 ITileCache.ts**

```ts
// geo-engine/packages/engine/src/manager/ITileCache.ts

export interface ITileCache<T> {
  get(key: string): T | undefined;
  set(key: string, value: T): void;
  has(key: string): boolean;
  delete(key: string): boolean;
  readonly size: number;
  trim(maxSize: number): void;
}
```

- [ ] **Step 2: 创建 LRUTileCache.ts**

```ts
// geo-engine/packages/engine/src/manager/LRUTileCache.ts
import { ITileCache } from "./ITileCache";

export class LRUTileCache<T> implements ITileCache<T> {
  private cache = new Map<string, T>();
  private accessOrder: string[] = [];
  private _maxSize: number;

  constructor(maxSize: number = 256) {
    this._maxSize = maxSize;
  }

  get size(): number {
    return this.cache.size;
  }

  get(key: string): T | undefined {
    const value = this.cache.get(key);
    if (value !== undefined) {
      this.touch(key);
    }
    return value;
  }

  set(key: string, value: T): void {
    if (this.cache.has(key)) {
      this.touch(key);
    } else {
      this.cache.set(key, value);
      this.accessOrder.push(key);
    }
    if (this.cache.size > this._maxSize) {
      this.evict();
    }
  }

  has(key: string): boolean {
    return this.cache.has(key);
  }

  delete(key: string): boolean {
    const idx = this.accessOrder.indexOf(key);
    if (idx >= 0) this.accessOrder.splice(idx, 1);
    return this.cache.delete(key);
  }

  trim(maxSize: number): void {
    this._maxSize = maxSize;
    while (this.cache.size > this._maxSize) {
      this.evict();
    }
  }

  private touch(key: string): void {
    const idx = this.accessOrder.indexOf(key);
    if (idx >= 0) {
      this.accessOrder.splice(idx, 1);
      this.accessOrder.push(key);
    }
  }

  private evict(): void {
    const oldest = this.accessOrder.shift();
    if (oldest) {
      this.cache.delete(oldest);
    }
  }
}
```

- [ ] **Step 3: 创建 manager/index.ts**

```ts
export { type ITileCache } from "./ITileCache";
export { LRUTileCache } from "./LRUTileCache";
```

- [ ] **Step 4: 编写测试**

Create: `geo-engine/packages/engine/src/manager/__tests__/LRUTileCache.test.ts`

```ts
import { describe, it, expect } from "vitest";
import { LRUTileCache } from "../LRUTileCache";

describe("LRUTileCache", () => {
  it("should store and retrieve values", () => {
    const cache = new LRUTileCache<string>(3);
    cache.set("a", "value-a");
    expect(cache.get("a")).toBe("value-a");
  });

  it("should evict LRU when capacity exceeded", () => {
    const cache = new LRUTileCache<string>(2);
    cache.set("a", "a");
    cache.set("b", "b");
    cache.set("c", "c"); // evicts "a"
    expect(cache.get("a")).toBeUndefined();
    expect(cache.get("b")).toBe("b");
    expect(cache.get("c")).toBe("c");
  });

  it("should track size correctly", () => {
    const cache = new LRUTileCache<number>(10);
    cache.set("a", 1);
    cache.set("b", 2);
    expect(cache.size).toBe(2);
  });
});
```

- [ ] **Step 5: 运行测试**

Run: `cd D:/study/code/webgl/three-tile-gis/geo-engine && npx vitest run packages/engine/src/manager/__tests__/LRUTileCache.test.ts`
Expected: 3 tests pass

- [ ] **Step 6: Commit**

```bash
git add geo-engine/packages/engine/src/manager/
git commit -m "feat: add ITileCache interface and LRUTileCache implementation"
```

---

### Task 8: ILocalOrigin + IFloatingOrigin + FloatingOrigin

**Files:**
- Create: `geo-engine/packages/engine/src/origin/ILocalOrigin.ts`
- Create: `geo-engine/packages/engine/src/origin/IFloatingOrigin.ts`
- Create: `geo-engine/packages/engine/src/origin/FloatingOrigin.ts`
- Create: `geo-engine/packages/engine/src/origin/index.ts`

**Interfaces:**
- Produces:
  - `ILocalOrigin: { snap, worldToLocal, localToWorld }`
  - `IFloatingOrigin: { current, threshold, dirty, update, register, unregister }`
  - `FloatingOrigin` 实现

- [ ] **Step 1: 创建 ILocalOrigin.ts**

```ts
// geo-engine/packages/engine/src/origin/ILocalOrigin.ts
import { CrsCoord } from "../core";

export interface ILocalOrigin {
  /** 将世界坐标取整到 tileSize 整数倍 */
  snap(worldCoord: CrsCoord, tileSize: number): CrsCoord;

  /** 世界坐标 → 局部坐标 */
  worldToLocal(world: CrsCoord, origin: CrsCoord): CrsCoord;

  /** 局部坐标 → 世界坐标 */
  localToWorld(local: CrsCoord, origin: CrsCoord): CrsCoord;
}
```

- [ ] **Step 2: 创建 IFloatingOrigin.ts**

```ts
// geo-engine/packages/engine/src/origin/IFloatingOrigin.ts
import { Object3D } from "three";
import { CrsCoord } from "../core";

export interface IFloatingOrigin {
  readonly current: CrsCoord;
  readonly threshold: number;
  readonly dirty: boolean;

  /** 检查并更新原点，返回 true 表示本帧发生了平移 */
  update(cameraWorldPos: CrsCoord): boolean;

  /** 注册 tile Group — 原点变化时自动更新 position */
  register(tileGroup: Object3D): void;

  /** 解注册 */
  unregister(tileGroup: Object3D): void;
}
```

- [ ] **Step 3: 创建 FloatingOrigin.ts**

```ts
// geo-engine/packages/engine/src/origin/FloatingOrigin.ts
import { Object3D, Vector3 } from "three";
import { CrsCoord } from "../core";
import { IFloatingOrigin } from "./IFloatingOrigin";

export class FloatingOrigin implements IFloatingOrigin {
  private _current: CrsCoord = { x: 0, y: 0, z: 0 };
  private _dirty = false;

  readonly threshold: number;
  private groups = new Set<Object3D>();
  private _tempVec3 = new Vector3();

  constructor(threshold: number = 500) {
    this.threshold = threshold;
  }

  get current(): CrsCoord {
    return { ...this._current };
  }

  get dirty(): boolean {
    return this._dirty;
  }

  update(cameraWorldPos: CrsCoord): boolean {
    const dx = cameraWorldPos.x - this._current.x;
    const dy = cameraWorldPos.y - this._current.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist > this.threshold) {
      this._current = {
        x: Math.floor(cameraWorldPos.x / this.threshold) * this.threshold,
        y: Math.floor(cameraWorldPos.y / this.threshold) * this.threshold,
        z: 0,
      };
      this._dirty = true;

      // 更新所有注册的 tile Group
      for (const group of this.groups) {
        const tileOrigin = group.userData.tileOrigin as CrsCoord | undefined;
        if (tileOrigin) {
          group.position.set(
            tileOrigin.x - this._current.x,
            tileOrigin.y - this._current.y,
            0,
          );
        }
      }

      return true;
    }

    this._dirty = false;
    return false;
  }

  register(tileGroup: Object3D): void {
    this.groups.add(tileGroup);
  }

  unregister(tileGroup: Object3D): void {
    this.groups.delete(tileGroup);
  }
}
```

- [ ] **Step 4: 创建 origin/index.ts**

```ts
export { type ILocalOrigin } from "./ILocalOrigin";
export { type IFloatingOrigin } from "./IFloatingOrigin";
export { FloatingOrigin } from "./FloatingOrigin";
```

- [ ] **Step 5: 编写测试**

Create: `geo-engine/packages/engine/src/origin/__tests__/FloatingOrigin.test.ts`

```ts
import { describe, it, expect } from "vitest";
import { Object3D } from "three";
import { FloatingOrigin } from "../FloatingOrigin";

describe("FloatingOrigin", () => {
  it("should not trigger within threshold", () => {
    const fo = new FloatingOrigin(500);
    const moved = fo.update({ x: 100, y: 0, z: 0 });
    expect(moved).toBe(false);
    expect(fo.dirty).toBe(false);
  });

  it("should trigger when exceeding threshold", () => {
    const fo = new FloatingOrigin(500);
    const moved = fo.update({ x: 600, y: 0, z: 0 });
    expect(moved).toBe(true);
    expect(fo.dirty).toBe(true);
    expect(fo.current.x).toBe(500); // floor(600/500)*500 = 500
  });

  it("should update registered group positions", () => {
    const fo = new FloatingOrigin(500);
    const group = new Object3D();
    group.userData.tileOrigin = { x: 600, y: 0, z: 0 };
    fo.register(group);

    fo.update({ x: 1200, y: 0, z: 0 });

    expect(group.position.x).toBeCloseTo(600 - 1000, 5);
  });
});
```

- [ ] **Step 6: 运行测试**

Run: `cd D:/study/code/webgl/three-tile-gis/geo-engine && npx vitest run packages/engine/src/origin/__tests__/FloatingOrigin.test.ts`
Expected: 3 tests pass

- [ ] **Step 7: Commit**

```bash
git add geo-engine/packages/engine/src/origin/
git commit -m "feat: add ILocalOrigin, IFloatingOrigin, and FloatingOrigin implementation"
```

---

### Task 9: IDataSource 接口 + DataSourceRegistry

**Files:**
- Create: `geo-engine/packages/engine/src/source/IDataSource.ts`
- Create: `geo-engine/packages/engine/src/source/DataSourceRegistry.ts`
- Create: `geo-engine/packages/engine/src/source/index.ts`

**Interfaces:**
- Produces:
  - `IDataSource<T>: { dataType, crs, bounds, fetch(key, tileBounds), dispose(data) }`
  - `DataSourceRegistry` 静态注册表

- [ ] **Step 1: 创建 IDataSource.ts**

```ts
// geo-engine/packages/engine/src/source/IDataSource.ts
import { CrsBounds } from "../core";
import { IProjectCRS } from "../crs";
import { TileKey } from "../tile";

export interface IDataSource<T = unknown> {
  readonly dataType: string;
  /** 数据自身的 CRS (声明用途) */
  readonly crs: IProjectCRS;
  /** 数据在 Engine CRS 坐标系下的范围 */
  readonly bounds: CrsBounds;

  /** 获取指定 Tile 的数据，返回坐标必须在 Engine CRS 下 */
  fetch(key: TileKey, tileBounds: CrsBounds): Promise<T>;

  /** 释放数据 */
  dispose(data: T): void;
}
```

- [ ] **Step 2: 创建 DataSourceRegistry.ts**

```ts
// geo-engine/packages/engine/src/source/DataSourceRegistry.ts
import { IDataSource } from "./IDataSource";

export type DataSourceConstructor<T = unknown> = new (...args: any[]) => IDataSource<T>;

export class DataSourceRegistry {
  private static registry = new Map<string, DataSourceConstructor>();

  static register<T>(dataType: string, ctor: DataSourceConstructor<T>): void {
    if (DataSourceRegistry.registry.has(dataType)) {
      console.warn(`DataSource "${dataType}" already registered, overwriting.`);
    }
    DataSourceRegistry.registry.set(dataType, ctor);
  }

  static unregister(dataType: string): boolean {
    return DataSourceRegistry.registry.delete(dataType);
  }

  static create<T>(dataType: string, ...args: any[]): IDataSource<T> {
    const ctor = DataSourceRegistry.registry.get(dataType);
    if (!ctor) {
      throw new Error(`DataSource "${dataType}" not registered.`);
    }
    return new ctor(...args) as IDataSource<T>;
  }

  static has(dataType: string): boolean {
    return DataSourceRegistry.registry.has(dataType);
  }

  static list(): string[] {
    return Array.from(DataSourceRegistry.registry.keys());
  }
}
```

- [ ] **Step 3: 创建 source/index.ts**

```ts
export { type IDataSource } from "./IDataSource";
export { DataSourceRegistry } from "./DataSourceRegistry";
```

- [ ] **Step 4: 验证编译**

Run: `cd D:/study/code/webgl/three-tile-gis/geo-engine && npx tsc --noEmit -p packages/engine/tsconfig.json`
Expected: 无 TS 错误

- [ ] **Step 5: Commit**

```bash
git add geo-engine/packages/engine/src/source/
git commit -m "feat: add IDataSource interface and DataSourceRegistry"
```

---

### Task 10: ILayerRenderer 接口

**Files:**
- Create: `geo-engine/packages/engine/src/renderer/ILayerRenderer.ts`
- Create: `geo-engine/packages/engine/src/renderer/index.ts`

**Interfaces:**
- Produces: `ILayerRenderer<TData>: { name, createContent, updateContent?, disposeContent }`

- [ ] **Step 1: 创建 ILayerRenderer.ts**

```ts
// geo-engine/packages/engine/src/renderer/ILayerRenderer.ts
import { Tile } from "../tile/Tile";
import { TileContent } from "../tile/TileContent";

export interface ILayerRenderer<TData = unknown> {
  readonly name: string;

  /** 从原始数据创建 TileContent（含 RenderObject[]） */
  createContent(data: TData, tile: Tile): Promise<TileContent>;

  /** 更新已有 TileContent */
  updateContent?(content: TileContent, data: TData, tile: Tile): Promise<void>;

  /** 释放 TileContent 的 GPU 资源 */
  disposeContent(content: TileContent): void;
}
```

- [ ] **Step 2: 创建 renderer/index.ts**

```ts
export { type ILayerRenderer } from "./ILayerRenderer";
```

- [ ] **Step 3: 验证编译 + Commit**

```bash
git add geo-engine/packages/engine/src/renderer/
git commit -m "feat: add ILayerRenderer interface"
```

---

### Task 11: ILayer 接口 + LayerManager + LayerGroup

**Files:**
- Create: `geo-engine/packages/engine/src/layer/ILayer.ts`
- Create: `geo-engine/packages/engine/src/layer/ILayerGroup.ts`
- Create: `geo-engine/packages/engine/src/layer/LayerManager.ts`
- Create: `geo-engine/packages/engine/src/layer/RasterLayer.ts`
- Create: `geo-engine/packages/engine/src/layer/index.ts`

- [ ] **Step 1: 创建 ILayer.ts**

```ts
// geo-engine/packages/engine/src/layer/ILayer.ts
import { Frustum } from "three";
import { IProjectCRS } from "../crs";
import { TileKey } from "../tile";
import { ITileScheme } from "../tile";
import { IDataSource } from "../source";
import { ILayerRenderer } from "../renderer";

export interface ILayer {
  readonly id: string;
  readonly name: string;
  readonly type: "raster" | "vector" | "volume" | "pointcloud";
  visible: boolean;
  opacity: number;
  zIndex: number;

  readonly tileScheme: ITileScheme;
  readonly dataSource: IDataSource;
  readonly renderer: ILayerRenderer;

  /** 本层依赖的其他 Layer */  dependsOn: ILayer[];

  getVisibleTiles(frustum: Frustum, crs: IProjectCRS): TileKey[];
}
```

- [ ] **Step 2: 创建 ILayerGroup.ts**

```ts
// geo-engine/packages/engine/src/layer/ILayerGroup.ts
import { ILayer } from "./ILayer";

export interface ILayerGroup {
  readonly id: string;
  readonly name: string;
  visible: boolean;
  opacity: number;
  readonly layers: ILayer[];

  addLayer(layer: ILayer): void;
  removeLayer(id: string): boolean;
}
```

- [ ] **Step 3: 创建 RasterLayer.ts — 具体 Layer 实现**

```ts
// geo-engine/packages/engine/src/layer/RasterLayer.ts
import { Frustum } from "three";
import { ILayer } from "./ILayer";
import { IProjectCRS } from "../crs";
import { TileKey, ITileScheme } from "../tile";
import { IDataSource } from "../source";
import { ILayerRenderer } from "../renderer";

export interface RasterLayerOptions {
  name: string;
  tileScheme: ITileScheme;
  dataSource: IDataSource;
  renderer: ILayerRenderer;
  opacity?: number;
  zIndex?: number;
  dependsOn?: ILayer[];
  type?: "raster" | "dem";
}

let _layerIdCounter = 0;

export class RasterLayer implements ILayer {
  readonly id: string;
  readonly name: string;
  readonly type: "raster" | "vector" | "volume" | "pointcloud";
  visible = true;
  opacity: number;
  zIndex: number;
  readonly tileScheme: ITileScheme;
  readonly dataSource: IDataSource;
  readonly renderer: ILayerRenderer;
  dependsOn: ILayer[];

  constructor(options: RasterLayerOptions) {
    this.id = `layer-${++_layerIdCounter}`;
    this.name = options.name;
    this.type = options.type ?? "raster";
    this.tileScheme = options.tileScheme;
    this.dataSource = options.dataSource;
    this.renderer = options.renderer;
    this.opacity = options.opacity ?? 1;
    this.zIndex = options.zIndex ?? 0;
    this.dependsOn = options.dependsOn ?? [];
  }

  getVisibleTiles(frustum: Frustum, crs: IProjectCRS): TileKey[] {
    if (!this.visible) return [];
    return this.tileScheme.getTilesInView(frustum, crs);
  }
}
```

- [ ] **Step 4: 创建 LayerManager.ts**

```ts
// geo-engine/packages/engine/src/layer/LayerManager.ts
import { ILayer } from "./ILayer";
import { ILayerGroup } from "./ILayerGroup";

export class LayerGroup implements ILayerGroup {
  id: string;
  name: string;
  visible = true;
  opacity = 1;
  layers: ILayer[] = [];

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }

  addLayer(layer: ILayer): void {
    this.layers.push(layer);
  }

  removeLayer(id: string): boolean {
    const idx = this.layers.findIndex((l) => l.id === id);
    if (idx >= 0) {
      this.layers.splice(idx, 1);
      return true;
    }
    return false;
  }
}

export class LayerManager {
  groups: ILayerGroup[] = [];
  private _layerMap = new Map<string, ILayer>();

  addGroup(group: ILayerGroup): void {
    this.groups.push(group);
    for (const layer of group.layers) {
      this._layerMap.set(layer.id, layer);
    }
  }

  removeGroup(id: string): boolean {
    const idx = this.groups.findIndex((g) => g.id === id);
    if (idx >= 0) {
      const group = this.groups[idx];
      for (const layer of group.layers) {
        this._layerMap.delete(layer.id);
      }
      this.groups.splice(idx, 1);
      return true;
    }
    return false;
  }

  addLayerToGroup(layer: ILayer, groupId: string): void {
    const group = this.groups.find((g) => g.id === groupId);
    if (!group) throw new Error(`Group "${groupId}" not found.`);
    group.addLayer(layer);
    this._layerMap.set(layer.id, layer);
  }

  /** 返回扁平化、按 zIndex 排序的可见 Layer 列表 */
  getVisibleLayers(): ILayer[] {
    const flat: ILayer[] = [];
    for (const group of this.groups) {
      if (!group.visible) continue;
      for (const layer of group.layers) {
        if (layer.visible) flat.push(layer);
      }
    }
    flat.sort((a, b) => a.zIndex - b.zIndex);
    return flat;
  }

  getLayer(id: string): ILayer | undefined {
    return this._layerMap.get(id);
  }

  moveUp(layerId: string): void {
    const layer = this._layerMap.get(layerId);
    if (layer) layer.zIndex++;
  }

  moveDown(layerId: string): void {
    const layer = this._layerMap.get(layerId);
    if (layer) layer.zIndex--;
  }
}
```

- [ ] **Step 5: 创建 layer/index.ts**

```ts
export { type ILayer } from "./ILayer";
export { type ILayerGroup } from "./ILayerGroup";
export { RasterLayer, type RasterLayerOptions } from "./RasterLayer";
export { LayerManager, LayerGroup } from "./LayerManager";
```

- [ ] **Step 6: 编写 LayerManager 测试**

Create: `geo-engine/packages/engine/src/layer/__tests__/LayerManager.test.ts`

```ts
import { describe, it, expect } from "vitest";
import { LayerManager, LayerGroup } from "../LayerManager";
import { RasterLayer } from "../RasterLayer";
import { ProjectTileScheme } from "../../tile";
import { CGCS2000GKCRS } from "../../crs";

describe("LayerManager", () => {
  it("should return visible layers sorted by zIndex", () => {
    const mgr = new LayerManager();
    const scheme = new ProjectTileScheme(500);
    const crs = new CGCS2000GKCRS(38);

    // Create stub layers with minimal real dependencies
    const layer1 = { id: "l1", name: "a", type: "raster" as const, visible: true, opacity: 1, zIndex: 2, tileScheme: scheme, dataSource: {} as any, renderer: {} as any, dependsOn: [], getVisibleTiles: () => [] };
    const layer2 = { id: "l2", name: "b", type: "raster" as const, visible: true, opacity: 1, zIndex: 1, tileScheme: scheme, dataSource: {} as any, renderer: {} as any, dependsOn: [], getVisibleTiles: () => [] };

    const group = new LayerGroup("g1", "test");
    group.addLayer(layer1);
    group.addLayer(layer2);
    mgr.addGroup(group);

    const visible = mgr.getVisibleLayers();
    expect(visible[0].id).toBe("l2"); // lower zIndex first
    expect(visible[1].id).toBe("l1");
  });
});
```

- [ ] **Step 7: 运行测试**

Run: `cd D:/study/code/webgl/three-tile-gis/geo-engine && npx vitest run packages/engine/src/layer/__tests__/LayerManager.test.ts`
Expected: 1 test pass

- [ ] **Step 8: Commit**

```bash
git add geo-engine/packages/engine/src/layer/
git commit -m "feat: add ILayer, ILayerGroup, LayerManager, and RasterLayer"
```

---

### Task 12: RasterRenderer + SimplePlane 质量层

**Files:**
- Create: `geo-engine/packages/engine/src/renderer/RasterRenderer.ts`
- Create: `geo-engine/packages/engine/src/renderer/quality/SimplePlane.ts`
- Create: `geo-engine/packages/engine/src/renderer/quality/index.ts`

- [ ] **Step 1: 创建 SimplePlane.ts**

```ts
// geo-engine/packages/engine/src/renderer/quality/SimplePlane.ts
import {
  Mesh,
  MeshBasicMaterial,
  PlaneGeometry,
  Texture,
  Object3D,
} from "three";
import { Tile } from "../../tile/Tile";

export interface QualityMesh {
  createMesh(data: unknown, tile: Tile): Object3D;
}

/**
 * 简单平面 — 无 DEM 时使用。
 * 在 tile 局部空间 [-tileSize/2, tileSize/2] 内创建平面。
 */
export class SimplePlane implements QualityMesh {
  createMesh(data: unknown, tile: Tile): Object3D {
    const bounds = tile.bounds;
    const width = bounds[2] - bounds[0];
    const height = bounds[3] - bounds[1];

    const geometry = new PlaneGeometry(width, height);
    const material = new MeshBasicMaterial({ side: 2 }); // DoubleSide

    const mesh = new Mesh(geometry, material);

    // 平面中心在 tile 原点上（原点 = 左下角）
    mesh.position.set(width / 2, height / 2, 0);
    mesh.userData = { type: "simple-plane" };

    return mesh;
  }

  /** 更新纹理 */
  static applyTexture(mesh: Mesh, texture: Texture): void {
    const mat = mesh.material as MeshBasicMaterial;
    if (mat.map) mat.map.dispose();
    mat.map = texture;
    mat.needsUpdate = true;
  }
}
```

- [ ] **Step 2: 创建 RasterRenderer.ts**

```ts
// geo-engine/packages/engine/src/renderer/RasterRenderer.ts
import * as THREE from "three";
import { ILayerRenderer } from "./ILayerRenderer";
import { Tile } from "../tile/Tile";
import { TileContent, ContentState, RenderObject } from "../tile/TileContent";
import { SimplePlane, QualityMesh } from "./quality/SimplePlane";

let _contentIdCounter = 0;

export interface RasterRendererOptions {
  qualityTier?: QualityMesh;
  transparent?: boolean;
}

/**
 * 栅格渲染器 — 将 ImageBitmap/ImageData 转为带纹理的平面 Mesh。
 */
export class RasterRenderer implements ILayerRenderer<ImageBitmap | HTMLImageElement> {
  readonly name = "RasterRenderer";

  private qualityTier: QualityMesh;
  private transparent: boolean;

  constructor(options: RasterRendererOptions = {}) {
    this.qualityTier = options.qualityTier ?? new SimplePlane();
    this.transparent = options.transparent ?? true;
  }

  async createContent(
    data: ImageBitmap | HTMLImageElement,
    tile: Tile,
  ): Promise<TileContent> {
    const object = this.qualityTier.createMesh(data, tile);

    // 应用纹理
    const texture = new THREE.Texture(data as HTMLImageElement);
    texture.needsUpdate = true;
    texture.colorSpace = THREE.SRGBColorSpace;

    const mesh = object as THREE.Mesh;
    const mat = mesh.material as THREE.MeshBasicMaterial;
    mat.map = texture;
    mat.transparent = this.transparent;
    mat.needsUpdate = true;

    const renderObject = new RenderObject(object);

    const content: TileContent = {
      id: `content-${++_contentIdCounter}`,
      tileKey: tile.key,
      layerId: "",
      data,
      renderObjects: [renderObject],
      state: ContentState.READY,
    };

    return content;
  }

  disposeContent(content: TileContent): void {
    for (const ro of content.renderObjects) {
      ro.dispose();
    }
    content.renderObjects.length = 0;
  }
}
```

- [ ] **Step 3: 创建 quality/index.ts**

```ts
export { SimplePlane } from "./SimplePlane";
export type { QualityMesh } from "./SimplePlane";
```

- [ ] **Step 4: 更新 renderer/index.ts**

```ts
export { type ILayerRenderer } from "./ILayerRenderer";
export { RasterRenderer } from "./RasterRenderer";
export { SimplePlane } from "./quality";
export type { QualityMesh } from "./quality";
```

- [ ] **Step 5: Commit**

```bash
git add geo-engine/packages/engine/src/renderer/
git commit -m "feat: add RasterRenderer with SimplePlane quality tier"
```

---

### Task 13: TileManager + TileScheduler（基础版）

**Files:**
- Create: `geo-engine/packages/engine/src/manager/TileScheduler.ts`
- Create: `geo-engine/packages/engine/src/manager/TileManager.ts`
- Modify: `geo-engine/packages/engine/src/manager/index.ts`

- [ ] **Step 1: 创建 TileScheduler.ts — 基础优先级调度**

```ts
// geo-engine/packages/engine/src/manager/TileScheduler.ts
import { TileKey } from "../tile";
import { Camera, Frustum } from "three";

export interface ScheduledTile {
  key: TileKey;
  priority: number;
}

export class TileScheduler {
  /** 每帧最大新加载 tile 数 */
  maxPerFrame = 4;

  /** 基于距离的简单优先级 */
  prioritize(
    keys: TileKey[],
    camera: Camera,
    frustum: Frustum,
  ): ScheduledTile[] {
    const cameraPos = new THREE.Vector3();
    camera.getWorldPosition(cameraPos);

    return keys
      .map((key) => ({
        key,
        priority: this.computePriority(key, cameraPos, frustum),
      }))
      .sort((a, b) => b.priority - a.priority);
  }

  private computePriority(
    _key: TileKey,
    cameraPos: THREE.Vector3,
    _frustum: Frustum,
  ): number {
    // Phase 1: 简化 — 随机优先，保证基本调度可工作
    // Phase 2: 升级为四维加权模型
    return Math.random();
  }
}

import * as THREE from "three";
```

- [ ] **Step 2: 创建 TileManager.ts**

```ts
// geo-engine/packages/engine/src/manager/TileManager.ts
import { Camera, Frustum, Matrix4, Vector3, Scene, Group } from "three";
import { ILayer } from "../layer";
import { IProjectCRS } from "../crs";
import { Tile, TileKey, TileState } from "../tile";
import { ITileCache } from "./ITileCache";
import { LRUTileCache } from "./LRUTileCache";
import { TileScheduler, ScheduledTile } from "./TileScheduler";
import { IFloatingOrigin } from "../origin";
import { CrsCoord } from "../core";

export interface TileManagerOptions {
  cache?: ITileCache<Tile>;
  scheduler?: TileScheduler;
  maxPerFrame?: number;
}

export class TileManager {
  readonly cache: ITileCache<Tile>;
  readonly scheduler: TileScheduler;

  private scene: Scene;
  private floatingOrigin: IFloatingOrigin;
  private loadedTiles = new Map<string, Tile>();
  private loadingTiles = new Set<string>();
  private failedTiles = new Set<string>();

  private frustum = new Frustum();
  private tempMatrix = new Matrix4();

  constructor(
    scene: Scene,
    floatingOrigin: IFloatingOrigin,
    options: TileManagerOptions = {},
  ) {
    this.scene = scene;
    this.floatingOrigin = floatingOrigin;
    this.cache = options.cache ?? new LRUTileCache<Tile>(512);
    this.scheduler = options.scheduler ?? new TileScheduler();

    if (options.maxPerFrame !== undefined) {
      this.scheduler.maxPerFrame = options.maxPerFrame;
    }
  }

  /**
   * 每帧调用 — 核心调度流程
   */
  update(camera: Camera, crs: IProjectCRS, visibleLayers: ILayer[]): void {
    // 1. 更新视锥体
    this.frustum.setFromProjectionMatrix(
      this.tempMatrix.multiplyMatrices(
        camera.projectionMatrix,
        camera.matrixWorldInverse,
      ),
    );

    // 2. 收集所有可见 tile key
    const allKeys: TileKey[] = [];
    for (const layer of visibleLayers) {
      const keys = layer.getVisibleTiles(this.frustum, crs);
      allKeys.push(...keys);
    }

    // 3. 去重（按 key.id + key.schemeId）
    const uniqueKeys = this.deduplicateKeys(allKeys);

    // 4. 过滤：排除 loaded、loading、failed
    const pendingKeys = uniqueKeys.filter(
      (k) =>
        !this.loadedTiles.has(TileManager.keyToString(k)) &&
        !this.loadingTiles.has(TileManager.keyToString(k)) &&
        !this.failedTiles.has(TileManager.keyToString(k)),
    );

    // 5. 排序优先级
    const scheduled = this.scheduler.prioritize(
      pendingKeys,
      camera,
      this.frustum,
    );

    // 6. 按帧预算加载
    let loadedThisFrame = 0;
    for (const item of scheduled) {
      if (loadedThisFrame >= this.scheduler.maxPerFrame) break;
      this.loadTile(item.key, visibleLayers, crs);
      loadedThisFrame++;
    }
  }

  /**
   * 加载单个 Tile
   */
  private async loadTile(
    key: TileKey,
    layers: ILayer[],
    crs: IProjectCRS,
  ): Promise<void> {
    const keyStr = TileManager.keyToString(key);
    if (this.loadingTiles.has(keyStr)) return;

    this.loadingTiles.add(keyStr);

    try {
      // 查找匹配的 layer(s)
      const matchingLayers = layers.filter(
        (l) => l.tileScheme.name === key.schemeId,
      );

      if (matchingLayers.length === 0) {
        this.loadingTiles.delete(keyStr);
        return;
      }

      // 创建 Tile 元数据
      const scheme = matchingLayers[0].tileScheme;
      const bounds = scheme.getTileBounds(key);
      const origin: CrsCoord = {
        x: bounds[0],
        y: bounds[1],
        z: 0,
      };

      const tile: Tile = {
        id: keyStr,
        key,
        bounds,
        origin,
        state: TileState.LOADING,
        contents: [],
      };

      // 创建场景锚点 Group
      const group = new Group();
      group.userData.tileOrigin = origin;
      group.position.set(
        origin.x - this.floatingOrigin.current.x,
        origin.y - this.floatingOrigin.current.y,
        0,
      );
      this.floatingOrigin.register(group);
      this.scene.add(group);

      // 为每个匹配的 Layer 加载数据
      for (const layer of matchingLayers) {
        // 检查依赖
        if (layer.dependsOn.length > 0) {
          const depsReady = layer.dependsOn.every((dep) => {
            const depTile = this.loadedTiles.get(
              TileManager.keyToString({
                schemeId: dep.tileScheme.name,
                id: key.id,
                level: key.level,
              }),
            );
            return depTile?.state === TileState.LOADED;
          });
          if (!depsReady) continue; // 跳过，等依赖就绪
        }

        try {
          const data = await layer.dataSource.fetch(key, bounds);
          const content = await layer.renderer.createContent(data, tile);
          content.layerId = layer.id;

          // 添加 RenderObject 到 Group
          for (const ro of content.renderObjects) {
            group.add(ro.object);
          }

          tile.contents.push(content);
        } catch (err) {
          console.error(`Failed to load tile content: ${keyStr}`, err);
        }
      }

      tile.state = TileState.LOADED;
      this.loadedTiles.set(keyStr, tile);
      this.cache.set(keyStr, tile);
    } catch (err) {
      console.error(`Failed to load tile: ${keyStr}`, err);
      this.failedTiles.add(keyStr);
    } finally {
      this.loadingTiles.delete(keyStr);
    }
  }

  private deduplicateKeys(keys: TileKey[]): TileKey[] {
    const seen = new Set<string>();
    return keys.filter((k) => {
      const s = TileManager.keyToString(k);
      if (seen.has(s)) return false;
      seen.add(s);
      return true;
    });
  }

  static keyToString(key: TileKey): string {
    return `${key.schemeId}:${key.id}`;
  }

  dispose(): void {
    for (const tile of this.loadedTiles.values()) {
      for (const content of tile.contents) {
        // 通知 renderer 释放
        for (const ro of content.renderObjects) {
          ro.dispose();
        }
      }
    }
    this.loadedTiles.clear();
    this.loadingTiles.clear();
    this.failedTiles.clear();
  }
}
```

- [ ] **Step 3: 更新 manager/index.ts**

```ts
export { type ITileCache } from "./ITileCache";
export { LRUTileCache } from "./LRUTileCache";
export { TileScheduler, type ScheduledTile } from "./TileScheduler";
export { TileManager, type TileManagerOptions } from "./TileManager";
```

- [ ] **Step 4: Commit**

```bash
git add geo-engine/packages/engine/src/manager/
git commit -m "feat: add TileScheduler and TileManager with per-frame loading flow"
```

---

### Task 14: Engine 顶层入口 + MapCameraController

**Files:**
- Create: `geo-engine/packages/engine/src/core/Engine.ts`
- Modify: `geo-engine/packages/engine/src/core/index.ts`
- Create: `geo-engine/packages/engine/src/camera/MapCameraController.ts`
- Create: `geo-engine/packages/engine/src/camera/index.ts`

- [ ] **Step 1: 创建 MapCameraController.ts**

```ts
// geo-engine/packages/engine/src/camera/MapCameraController.ts
import { PerspectiveCamera, Vector3, Vector2, EventDispatcher } from "three";
import { CrsCoord } from "../core";
import { IProjectCRS } from "../crs";

export interface ICameraController {
  readonly camera: PerspectiveCamera;
  update(deltaTime: number): void;
  getWorldPosition(): CrsCoord;
  lookAt(coord: CrsCoord): void;
  setDistance(distance: number): void;
}

/**
 * 简单地图相机控制器 — Phase 1 基础版。
 * 正交俯视 + 鼠标拖拽平移 + 滚轮缩放。
 */
export class MapCameraController
  extends EventDispatcher
  implements ICameraController
{
  readonly camera: PerspectiveCamera;

  private target = new Vector3();
  private distance = 10000;
  private azimuth = 0; // 方位角（弧度）
  private altitude = Math.PI / 3; // 仰角

  private crs: IProjectCRS;
  private container: HTMLElement;

  // 输入状态
  private isDragging = false;
  private lastMouse = new Vector2();
  private zoomSpeed = 0.1;

  constructor(
    container: HTMLElement,
    crs: IProjectCRS,
    fov: number = 60,
    near: number = 1,
    far: number = 100000,
  ) {
    super();
    this.container = container;
    this.crs = crs;

    const aspect = container.clientWidth / container.clientHeight;
    this.camera = new PerspectiveCamera(fov, aspect, near, far);

    this.setupInput();
    this.updateCamera();
  }

  private setupInput(): void {
    this.container.addEventListener("mousedown", this.onMouseDown);
    this.container.addEventListener("mousemove", this.onMouseMove);
    this.container.addEventListener("mouseup", this.onMouseUp);
    this.container.addEventListener("wheel", this.onWheel);
  }

  private onMouseDown = (e: MouseEvent): void => {
    this.isDragging = true;
    this.lastMouse.set(e.clientX, e.clientY);
  };

  private onMouseMove = (e: MouseEvent): void => {
    if (!this.isDragging) return;
    const dx = e.clientX - this.lastMouse.x;
    const dy = e.clientY - this.lastMouse.y;
    this.lastMouse.set(e.clientX, e.clientY);

    // 平移 target（世界空间）
    const scale = this.distance / 1000;
    this.target.x -= dx * scale;
    this.target.y += dy * scale;

    this.updateCamera();
    this.dispatchEvent({ type: "change" });
  };

  private onMouseUp = (): void => {
    this.isDragging = false;
  };

  private onWheel = (e: WheelEvent): void => {
    e.preventDefault();
    this.distance *= 1 + e.deltaY * this.zoomSpeed * 0.01;
    this.distance = Math.max(100, Math.min(50000, this.distance));
    this.updateCamera();
    this.dispatchEvent({ type: "change" });
  };

  updateCamera(): void {
    const cam = this.camera;
    const sinA = Math.sin(this.altitude);
    const cosA = Math.cos(this.altitude);

    cam.position.set(
      this.target.x + this.distance * cosA * Math.cos(this.azimuth + Math.PI / 2),
      this.target.y + this.distance * cosA * Math.sin(this.azimuth + Math.PI / 2),
      this.distance * sinA,
    );
    cam.lookAt(this.target);
  }

  update(_deltaTime: number): void {
    // Phase 1: 无惯性，相机在事件中已更新
  }

  getWorldPosition(): CrsCoord {
    return {
      x: this.target.x,
      y: this.target.y,
      z: this.camera.position.z,
    };
  }

  lookAt(coord: CrsCoord): void {
    this.target.set(coord.x, coord.y, coord.z);
    this.updateCamera();
  }

  setDistance(distance: number): void {
    this.distance = distance;
    this.updateCamera();
  }

  resize(width: number, height: number): void {
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }

  dispose(): void {
    this.container.removeEventListener("mousedown", this.onMouseDown);
    this.container.removeEventListener("mousemove", this.onMouseMove);
    this.container.removeEventListener("mouseup", this.onMouseUp);
    this.container.removeEventListener("wheel", this.onWheel);
  }
}
```

- [ ] **Step 2: 创建 camera/index.ts**

```ts
export { MapCameraController } from "./MapCameraController";
export type { ICameraController } from "./MapCameraController";
```

- [ ] **Step 3: 创建 Engine.ts**

```ts
// geo-engine/packages/engine/src/core/Engine.ts
import { WebGLRenderer, Scene, Clock, Color, Frustum } from "three";
import Stats from "three/examples/jsm/libs/stats.module.js";
import { IProjectCRS } from "../crs";
import { ILayer } from "../layer";
import { LayerManager } from "../layer";
import { TileManager, ITileCache, LRUTileCache } from "../manager";
import { FloatingOrigin, IFloatingOrigin } from "../origin";
import { MapCameraController, ICameraController } from "../camera";

export interface EngineConfig {
  crs: IProjectCRS;
  container: HTMLElement;
  layers?: ILayer[];
  floatingOrigin?: IFloatingOrigin;
  tileCache?: ITileCache;
  controls?: ICameraController;
  debug?: number; // 0=off, 1=stats, 2=wireframe
}

export class Engine {
  readonly crs: IProjectCRS;
  readonly layerManager = new LayerManager();
  readonly tileManager: TileManager;
  readonly scene = new Scene();
  readonly floatingOrigin: IFloatingOrigin;
  readonly cameraController: ICameraController;

  private renderer: WebGLRenderer;
  private container: HTMLElement;
  private clock = new Clock();
  private debug: number;
  private stats: any = null;
  private disposed = false;

  constructor(config: EngineConfig) {
    this.crs = config.crs;
    this.container = config.container;
    this.debug = config.debug ?? 0;
    this.floatingOrigin =
      config.floatingOrigin ?? new FloatingOrigin(500);

    // WebGL Renderer
    this.renderer = new WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(
      this.container.clientWidth,
      this.container.clientHeight,
    );
    this.container.appendChild(this.renderer.domElement);

    // 背景
    this.scene.background = new Color(0x1a1a2e);

    // Camera
    this.cameraController =
      config.controls ??
      new MapCameraController(this.container, this.crs);
    this.cameraController.lookAt({ x: 500000, y: 0, z: 0 });
    this.cameraController.setDistance(5000);

    // TileManager
    this.tileManager = new TileManager(
      this.scene,
      this.floatingOrigin,
      { cache: config.tileCache },
    );

    // Layers
    if (config.layers) {
      const { LayerGroup } = require("../layer/LayerManager");
      const group = new LayerGroup("default", "默认");
      for (const layer of config.layers) {
        group.addLayer(layer);
      }
      this.layerManager.addGroup(group);
    }

    // Debug
    if (this.debug >= 1) {
      this.setupStats();
    }

    // Resize
    window.addEventListener("resize", this.onResize);
  }

  private setupStats(): void {
    this.stats = new Stats();
    this.container.appendChild(this.stats.dom);
  }

  private onResize = (): void => {
    const w = this.container.clientWidth;
    const h = this.container.clientHeight;
    this.renderer.setSize(w, h);
    (this.cameraController as MapCameraController)?.resize?.(w, h);
  };

  /**
   * 启动渲染循环
   */
  start(): void {
    if (this.disposed) throw new Error("Engine already disposed.");

    const animate = (): void => {
      if (this.disposed) return;

      requestAnimationFrame(animate);

      const dt = this.clock.getDelta();

      // 更新相机
      this.cameraController.update(dt);
      const worldPos = this.cameraController.getWorldPosition();

      // 更新 Floating Origin
      this.floatingOrigin.update(worldPos);

      // 更新 TileManager
      const visibleLayers = this.layerManager.getVisibleLayers();
      this.tileManager.update(
        this.cameraController.camera,
        this.crs,
        visibleLayers,
      );

      // 渲染
      this.renderer.render(this.scene, this.cameraController.camera);

      if (this.stats) this.stats.update();
    };

    animate();
  }

  stop(): void {
    this.disposed = true;
    // animate loop stops itself via disposed flag
  }

  dispose(): void {
    this.stop();
    this.tileManager.dispose();
    this.renderer.dispose();
    this.renderer.domElement.remove();
    window.removeEventListener("resize", this.onResize);
    if (this.stats) {
      this.stats.dom.remove();
    }
  }
}
```

- [ ] **Step 4: 更新 core/index.ts**

```ts
export { type CrsCoord, type CrsBounds } from "./types";
export { Disposable } from "./Disposable";
export { Engine, type EngineConfig } from "./Engine";
```

- [ ] **Step 5: 更新 engine/src/index.ts** — 统一导出

```ts
export * from "./core";
export * from "./crs";
export * from "./tile";
export * from "./manager";
export * from "./origin";
export * from "./layer";
export * from "./source";
export * from "./renderer";
export * from "./camera";
```

- [ ] **Step 6: Commit**

```bash
git add geo-engine/packages/engine/src/core/
git add geo-engine/packages/engine/src/camera/
git commit -m "feat: add Engine entry point and MapCameraController"
```

---

### Task 15: Demo — 加载 GeoTIFF 看见第一块 Tile

**Files:**
- Modify: `geo-engine/packages/demo/src/main.ts`
- Create: `geo-engine/packages/demo/src/sample.tif`（或使用已有测试数据）

- [ ] **Step 1: 编写 Demo main.ts**

```ts
// geo-engine/packages/demo/src/main.ts
import {
  Engine,
  CGCS2000GKCRS,
  ProjectTileScheme,
  RasterLayer,
  RasterRenderer,
  SimplePlane,
} from "@geo-engine/core";
import * as THREE from "three";

async function main() {
  const container = document.getElementById("app")!;

  // 创建引擎 — CGCS2000 GK 114°E 带
  const engine = new Engine({
    crs: new CGCS2000GKCRS(38), // 中央子午线 114°
    container,
    debug: 1, // 显示 stats
  });

  // 创建一个测试纹理（棋盘格）
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d")!;

  // 绘制棋盘格
  const tileCount = 8;
  const tileSize = 512 / tileCount;
  for (let row = 0; row < tileCount; row++) {
    for (let col = 0; col < tileCount; col++) {
      ctx.fillStyle =
        (row + col) % 2 === 0 ? "#4a90d9" : "#2c5f8a";
      ctx.fillRect(col * tileSize, row * tileSize, tileSize, tileSize);
    }
  }
  // 写文字
  ctx.fillStyle = "#ffffff";
  ctx.font = "48px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("GeoEngine", 256, 256);

  // 创建 Image 用于纹理
  const image = new Image();
  image.src = canvas.toDataURL();

  await new Promise<void>((resolve) => {
    image.onload = () => resolve();
  });

  // 创建自定义 DataSource（使用棋盘格纹理）
  const dataSource = {
    dataType: "test-image",
    crs: engine.crs,
    bounds: [499000, 0, 501000, 2000] as [number, number, number, number],
    async fetch() {
      return image;
    },
    dispose() {},
  };

  // 创建 Layer
  const layer = new RasterLayer({
    name: "测试图层",
    tileScheme: new ProjectTileScheme(500),
    dataSource,
    renderer: new RasterRenderer({ qualityTier: new SimplePlane() }),
    opacity: 1,
  });

  // LayerGroup 已在 engine 构造时创建 "default" group
  // 直接添加到 LayerManager
  engine.layerManager.addLayerToGroup(layer, "default");

  // 调整相机
  const camera = (engine.cameraController as any).camera as THREE.PerspectiveCamera;
  engine.cameraController.lookAt({ x: 500000, y: 1000, z: 0 });
  engine.cameraController.setDistance(3000);

  // 启动
  engine.start();

  console.log("GeoEngine running — you should see a checkerboard tile!");
}

main().catch(console.error);
```

- [ ] **Step 2: 安装 demo dependencies + 运行**

Run: `cd D:/study/code/webgl/three-tile-gis/geo-engine && npm install`
Expected: 无报错

Run: `npm run dev`
Expected: Vite 启动，浏览器显示棋盘格纹理的 tile，可拖拽平移和滚轮缩放

- [ ] **Step 3: 验证 — 检查 TileManager 日志**

打开浏览器控制台，应看到 tile 加载日志

- [ ] **Step 4: 验证 — 测试 Floating Origin**

平移相机 > 500m，检查 tile Group position 是否随 origin 更新

- [ ] **Step 5: Commit**

```bash
git add geo-engine/packages/demo/
git commit -m "feat: add Phase 1 demo with checkerboard tile rendering"
```

---

## Verification Checklist

Phase 1 完成后的验证步骤：

1. **TypeScript 编译零错误**：`npx tsc --noEmit` 全量通过
2. **单元测试全绿**：`npx vitest run` 全部 pass（至少 11 个测试）
3. **Demo 运行**：
   - 浏览器能看到棋盘格纹理的平面 tile
   - 鼠标拖拽平移地图
   - 滚轮缩放
   - 无控制台错误
4. **Floating Origin 工作**：远离原点 > 500m 后 tile 仍正常显示（无精度抖动）
5. **内存释放**：刷新页面无 GPU 内存泄漏

### 后续 Phase 预览

- **Phase 2**：XYZTileScheme + proj4 + GeoTIFFSource 真数据 + DEM + DemMesh + 调度升级
- **Phase 3**：GeoJSONSource + VectorRenderer + DXFSource stub
- **Phase 4**：PointCloud + GPR stubs
- **Phase 5**：npm 发布、文档、CI/CD

---

*Plan generated: 2026-07-24*
