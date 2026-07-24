# Phase 4: 点云 + 体渲染 — 接口全部预留

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task.

**Goal:** PointCloud、GPR 接口和注册入口全部就位，实现留空（throw "not implemented"）。

**Architecture:** 所有 stub 遵循统一模式：构造函数 → fetch() 抛 NotImplemented → 注册到 DataSourceRegistry。Renderer stub 同上。

**Tech Stack:** TypeScript 5.x + Three.js r168+

**Spec:** `D:\study\code\webgl\three-tile-gis\doc\设计文档.md` §8.2, §10.3, §10.4

**Prerequisite:** Phase 3 完成

## Global Constraints

- 所有 stub 抛出 `NotImplementedError`，附带实现指引注释
- 每个 stub 文件头部注明 "STUB — NOT IMPLEMENTED"
- DataSourceRegistry 和 RendererRegistry 正确注册

---

### Task 30: NotImplementedError 基础错误类

**Files:**
- Create: `geo-engine/packages/engine/src/core/NotImplementedError.ts`

```ts
// geo-engine/packages/engine/src/core/NotImplementedError.ts

/**
 * 未实现功能错误 — 所有 stub 统一抛出。
 */
export class NotImplementedError extends Error {
  constructor(feature: string) {
    super(
      `[Not Implemented] ${feature}. ` +
      `This is a stub for future development. ` +
      `See CONTRIBUTING.md for how to implement this feature.`
    );
    this.name = "NotImplementedError";
  }
}
```

- [ ] **Commit**

---

### Task 31: PointCloudSource Stub

**Files:**
- Create: `geo-engine/packages/engine/src/source/PointCloudSource.ts`

```ts
// geo-engine/packages/engine/src/source/PointCloudSource.ts
// STUB — NOT IMPLEMENTED
//
// PointCloud 数据源接口预留。
//
// 计划实现：
// - 支持格式：.las, .laz, .ply
// - 流式读取 + 按 tile 裁剪
// - 八叉树 LOD（远处稀疏采样）
// - 返回类型：{ positions: Float32Array, colors?: Uint8Array, intensities?: Float32Array }
//
// 参考库：
// - lasl.js / plasio.js (LAS/LAZ 解析)
// - three.js PLYLoader

import { CrsBounds } from "../core";
import { IProjectCRS } from "../crs";
import { TileKey } from "../tile";
import { IDataSource } from "./IDataSource";
import { NotImplementedError } from "../core/NotImplementedError";

export interface PointCloudData {
  positions: Float32Array;     // N×3，Engine CRS 坐标
  colors?: Uint8Array;         // N×3 (RGB)
  intensities?: Float32Array;  // N×1
  classifications?: Uint8Array; // N×1
}

export class PointCloudSource implements IDataSource<PointCloudData> {
  readonly dataType = "pointcloud";
  readonly crs: IProjectCRS;
  readonly bounds: CrsBounds;

  constructor(
    _url: string,
    _bounds: CrsBounds,
    engineCRS: IProjectCRS,
  ) {
    this.crs = engineCRS;
    this.bounds = _bounds;
  }

  async fetch(_key: TileKey, _tileBounds: CrsBounds): Promise<PointCloudData> {
    throw new NotImplementedError("PointCloudSource.fetch()");
  }

  dispose(_data: PointCloudData): void {
    throw new NotImplementedError("PointCloudSource.dispose()");
  }
}
```

- [ ] **Step 1: 在 source/index.ts 中注册**

```ts
DataSourceRegistry.register("pointcloud", PointCloudSource);
DataSourceRegistry.register("las", PointCloudSource);  // alias
DataSourceRegistry.register("laz", PointCloudSource);  // alias
```

- [ ] **Commit**

---

### Task 32: PointCloudRenderer Stub

**Files:**
- Create: `geo-engine/packages/engine/src/renderer/PointCloudRenderer.ts`

```ts
// geo-engine/packages/engine/src/renderer/PointCloudRenderer.ts
// STUB — NOT IMPLEMENTED
//
// 点云渲染器接口预留。
//
// 计划实现：
// - THREE.Points(BufferGeometry, PointsMaterial)
// - RTC 减原点（renderObject 内部处理）
// - 八叉树 LOD — 远处稀疏采样，近处原始密度
// - 按 classification 着色

import { ILayerRenderer } from "./ILayerRenderer";
import { Tile } from "../tile/Tile";
import { TileContent } from "../tile/TileContent";
import { NotImplementedError } from "../core/NotImplementedError";

export class PointCloudRenderer implements ILayerRenderer {
  readonly name = "PointCloudRenderer";

  async createContent(_data: unknown, _tile: Tile): Promise<TileContent> {
    throw new NotImplementedError("PointCloudRenderer.createContent()");
  }

  disposeContent(_content: TileContent): void {
    throw new NotImplementedError("PointCloudRenderer.disposeContent()");
  }
}
```

- [ ] **Commit**

---

### Task 33: GPRSource Stub

**Files:**
- Create: `geo-engine/packages/engine/src/source/GPRSource.ts`

```ts
// geo-engine/packages/engine/src/source/GPRSource.ts
// STUB — NOT IMPLEMENTED
//
// 探地雷达数据源接口预留。
//
// 计划实现：
// - 输入：探地雷达原始数据（B-scan 或 C-scan）
// - 输出：VoxelGrid — 3D 体素网格
// - 插值算法：最近邻 / IDW / Kriging

import { CrsBounds } from "../core";
import { IProjectCRS } from "../crs";
import { TileKey } from "../tile";
import { IDataSource } from "./IDataSource";
import { NotImplementedError } from "../core/NotImplementedError";

export interface VoxelGrid {
  data: Float32Array;   // NX×NY×NZ 体素值
  dims: [number, number, number]; // NX, NY, NZ
  spacing: [number, number, number]; // dx, dy, dz
  origin: [number, number, number]; // 左下角 Engine CRS 坐标
}

export class GPRSource implements IDataSource<VoxelGrid> {
  readonly dataType = "gpr";
  readonly crs: IProjectCRS;
  readonly bounds: CrsBounds;

  constructor(
    _url: string,
    _bounds: CrsBounds,
    engineCRS: IProjectCRS,
  ) {
    this.crs = engineCRS;
    this.bounds = _bounds;
  }

  async fetch(_key: TileKey, _tileBounds: CrsBounds): Promise<VoxelGrid> {
    throw new NotImplementedError("GPRSource.fetch()");
  }

  dispose(_data: VoxelGrid): void {
    throw new NotImplementedError("GPRSource.dispose()");
  }
}
```

- [ ] **Step 1: 注册**

```ts
DataSourceRegistry.register("gpr", GPRSource);
```

- [ ] **Commit**

---

### Task 34: VolumeRenderer Stub

**Files:**
- Create: `geo-engine/packages/engine/src/renderer/VolumeRenderer.ts`

```ts
// geo-engine/packages/engine/src/renderer/VolumeRenderer.ts
// STUB — NOT IMPLEMENTED
//
// 体渲染器接口预留。
//
// 计划实现：
// - VoxelGrid → Data3DTexture → BoxGeometry + ShaderMaterial
// - Fragment Shader 光线步进 (Ray Marching)
// - 支持等值面 (isosurface) 与 alpha 合成
// - 传递函数 (Transfer Function) 控制颜色映射

import { ILayerRenderer } from "./ILayerRenderer";
import { Tile } from "../tile/Tile";
import { TileContent } from "../tile/TileContent";
import { NotImplementedError } from "../core/NotImplementedError";

export class VolumeRenderer implements ILayerRenderer {
  readonly name = "VolumeRenderer";

  async createContent(_data: unknown, _tile: Tile): Promise<TileContent> {
    throw new NotImplementedError("VolumeRenderer.createContent()");
  }

  disposeContent(_content: TileContent): void {
    throw new NotImplementedError("VolumeRenderer.disposeContent()");
  }
}
```

- [ ] **Commit**

---

### Task 35: PointCloudLayer + VolumeLayer（Layer 层入口）

**Files:**
- Create: `geo-engine/packages/engine/src/layer/PointCloudLayer.ts`
- Create: `geo-engine/packages/engine/src/layer/VolumeLayer.ts`

```ts
// geo-engine/packages/engine/src/layer/PointCloudLayer.ts
// 与 RasterLayer 相同的胶水模式，type: "pointcloud"

export class PointCloudLayer implements ILayer {
  // 构造函数接受 { tileScheme, dataSource, renderer }
  // getVisibleTiles() 委托给 tileScheme
  // ...（与 RasterLayer 相同的胶水逻辑）
}
```

```ts
// geo-engine/packages/engine/src/layer/VolumeLayer.ts
// 与 RasterLayer 相同的胶水模式，type: "volume"

export class VolumeLayer implements ILayer {
  // 构造函数接受 { tileScheme, dataSource, renderer }
  // getVisibleTiles() 委托给 tileScheme
  // ...（与 RasterLayer 相同的胶水逻辑）
}
```

- [ ] **Commit**

---

### Task 36: 单元测试 — 验证所有 stub 正确抛出 NotImplementedError

**Files:**
- Create: `geo-engine/packages/engine/src/__tests__/stubs.test.ts`

```ts
import { describe, it, expect } from "vitest";
import { PointCloudSource } from "../source/PointCloudSource";
import { GPRSource } from "../source/GPRSource";
import { DXFSource } from "../source/DXFSource";
import { PointCloudRenderer } from "../renderer/PointCloudRenderer";
import { VolumeRenderer } from "../renderer/VolumeRenderer";
import { NotImplementedError } from "../core/NotImplementedError";
import { DataSourceRegistry } from "../source/DataSourceRegistry";

describe("Stubs", () => {
  const dummyCRS = { name: "test", units: "meter" as const,
    project: () => ({ x: 0, y: 0 }), unproject: () => ({ lon: 0, lat: 0 }) };
  const dummyBounds: [number, number, number, number] = [0, 0, 100, 100];

  it("PointCloudSource should throw NotImplementedError", async () => {
    const source = new PointCloudSource("test.las", dummyBounds, dummyCRS);
    await expect(source.fetch({} as any, dummyBounds)).rejects.toThrow(NotImplementedError);
  });

  it("GPRSource should throw NotImplementedError", async () => {
    const source = new GPRSource("test.gpr", dummyBounds, dummyCRS);
    await expect(source.fetch({} as any, dummyBounds)).rejects.toThrow(NotImplementedError);
  });

  it("DXFSource should throw NotImplementedError", async () => {
    const source = new DXFSource("test.dxf", dummyBounds, dummyCRS);
    await expect(source.fetch({} as any, dummyBounds)).rejects.toThrow(NotImplementedError);
  });

  it("PointCloudRenderer should throw NotImplementedError", async () => {
    const renderer = new PointCloudRenderer();
    await expect(renderer.createContent(null, {} as any)).rejects.toThrow(NotImplementedError);
  });

  it("VolumeRenderer should throw NotImplementedError", async () => {
    const renderer = new VolumeRenderer();
    await expect(renderer.createContent(null, {} as any)).rejects.toThrow(NotImplementedError);
  });

  it("All stubs should be registered in DataSourceRegistry", () => {
    expect(DataSourceRegistry.has("pointcloud")).toBe(true);
    expect(DataSourceRegistry.has("las")).toBe(true);
    expect(DataSourceRegistry.has("gpr")).toBe(true);
    expect(DataSourceRegistry.has("dxf")).toBe(true);
  });
});
```

- [ ] **运行测试 — 6 tests pass + Commit**

---

## Verification Checklist (Phase 4)

1. `DataSourceRegistry.list()` 包含 `["pointcloud", "las", "laz", "gpr", "dxf"]`
2. 所有 stub 构造不报错
3. 所有 stub 的 `fetch()` 抛出 `NotImplementedError`
4. `PointCloudLayer` / `VolumeLayer` 可正常添加到 `LayerManager`
5. 所有单元测试通过

*Plan generated: 2026-07-24*
