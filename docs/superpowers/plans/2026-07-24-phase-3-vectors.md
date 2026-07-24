# Phase 3: 矢量渲染 — GeoJSON + DXF 入口预留

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task.

**Goal:** GeoJSON 矢量叠加到底图，DXF 接口预留（只注册不实现）。

**Architecture:** GeoJSONSource 全量加载 + 空间裁剪，VectorRenderer 根据 geometry type 创建 Points/Lines/Mesh，IMaterialFactory 控制样式。

**Tech Stack:** TypeScript 5.x + Three.js r168+ + vitest

**Spec:** `D:\study\code\webgl\three-tile-gis\doc\设计文档.md` §8.2, §10.2

**Prerequisite:** Phase 2 完成

## Global Constraints

- DXFSource 只留接口 stub（throw "not implemented"）
- VectorRenderer 支持 Point/LineString/Polygon/Multi*
- IMaterialFactory 接口由用户注入

---

### Task 24: GeoJSONSource 实现

**Files:**
- Create: `geo-engine/packages/engine/src/source/GeoJSONSource.ts`
- Modify: `geo-engine/packages/engine/src/source/index.ts`

**Interfaces:**
- Consumes: `IDataSource<FeatureCollection>`, `TileKey`, `CrsBounds`
- Produces: `GeoJSONSource` — 全量加载 .geojson，按 tile 空间裁剪

```ts
// geo-engine/packages/engine/src/source/GeoJSONSource.ts
import { CrsBounds } from "../core";
import { IProjectCRS } from "../crs";
import { TileKey } from "../tile";
import { IDataSource } from "./IDataSource";

export interface GeoJSONFeature {
  type: "Feature";
  geometry: {
    type: string;
    coordinates: any[];
  };
  properties: Record<string, any>;
}

export interface FeatureCollection {
  type: "FeatureCollection";
  features: GeoJSONFeature[];
}

export class GeoJSONSource implements IDataSource<GeoJSONFeature[]> {
  readonly dataType = "geojson";
  readonly crs: IProjectCRS;
  readonly bounds: CrsBounds;

  private url: string;
  private fullData: FeatureCollection | null = null;

  constructor(url: string, bounds: CrsBounds, engineCRS: IProjectCRS) {
    this.url = url;
    this.bounds = bounds;
    this.crs = engineCRS;
  }

  private async loadFull(): Promise<FeatureCollection> {
    if (this.fullData) return this.fullData;
    const resp = await fetch(this.url);
    this.fullData = await resp.json();
    return this.fullData!;
  }

  async fetch(_key: TileKey, tileBounds: CrsBounds): Promise<GeoJSONFeature[]> {
    const data = await this.loadFull();
    return this.spatialFilter(data.features, tileBounds);
  }

  /**
   * 空间裁剪 — 检查 feature 是否与 tile 相交。
   * Phase 3: 基于中心点的简单裁剪
   */
  private spatialFilter(
    features: GeoJSONFeature[],
    tileBounds: CrsBounds,
  ): GeoJSONFeature[] {
    return features.filter((f) => {
      const center = this.featureCenter(f);
      if (!center) return false;
      return (
        center[0] >= tileBounds[0] &&
        center[0] <= tileBounds[2] &&
        center[1] >= tileBounds[1] &&
        center[1] <= tileBounds[3]
      );
    });
  }

  private featureCenter(f: GeoJSONFeature): [number, number] | null {
    const coords = f.geometry.coordinates;
    if (!coords || coords.length === 0) return null;

    try {
      switch (f.geometry.type) {
        case "Point": return [coords[0], coords[1]];
        case "MultiPoint": {
          const xs = coords.map((c: number[]) => c[0]);
          const ys = coords.map((c: number[]) => c[1]);
          return [avg(xs), avg(ys)];
        }
        case "LineString":
        case "MultiLineString":
        case "Polygon":
        case "MultiPolygon": {
          const flat = this.flatten(coords);
          const xs = flat.filter((_: any, i: number) => i % 2 === 0);
          const ys = flat.filter((_: any, i: number) => i % 2 === 1);
          return [avg(xs), avg(ys)];
        }
        default: return null;
      }
    } catch { return null; }
  }

  private flatten(arr: any[]): number[] {
    const result: number[] = [];
    arr.forEach((item) => {
      if (typeof item === "number") result.push(item);
      else if (Array.isArray(item) && item.length > 0) {
        if (typeof item[0] === "number") result.push(...item);
        else result.push(...this.flatten(item));
      }
    });
    return result;
  }

  dispose(_data: GeoJSONFeature[]): void {}
}

function avg(arr: number[]): number {
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}
```

- [ ] **Step 1: DataSourceRegistry.register("geojson", GeoJSONSource)**

- [ ] **Step 2: 编写测试 + Commit**

---

### Task 25: IMaterialFactory 接口

**Files:**
- Create: `geo-engine/packages/engine/src/renderer/IMaterialFactory.ts`

```ts
// geo-engine/packages/engine/src/renderer/IMaterialFactory.ts
import { Material } from "three";
import { GeoJSONFeature } from "../source/GeoJSONSource";

export interface IMaterialFactory {
  /** 线样式 */
  createLineMaterial(feature: GeoJSONFeature): Material;

  /** 面填充样式 */
  createFillMaterial(feature: GeoJSONFeature): Material;

  /** 点样式 */
  createPointMaterial(feature: GeoJSONFeature): Material;
}

/** 默认实现 — 简单配色 */
export class DefaultMaterialFactory implements IMaterialFactory {
  createLineMaterial(_f: GeoJSONFeature): Material {
    return new (await import("three")).LineBasicMaterial({ color: 0x3388ff });
  }

  createFillMaterial(_f: GeoJSONFeature): Material {
    return new (await import("three")).MeshBasicMaterial({
      color: 0x3388ff,
      transparent: true,
      opacity: 0.3,
    });
  }

  createPointMaterial(_f: GeoJSONFeature): Material {
    return new (await import("three")).PointsMaterial({
      color: 0xff3333,
      size: 5,
    });
  }
}
```

- [ ] **Commit**

---

### Task 26: VectorRenderer 实现

**Files:**
- Create: `geo-engine/packages/engine/src/renderer/VectorRenderer.ts`
- Modify: `geo-engine/packages/engine/src/renderer/index.ts`

```ts
// geo-engine/packages/engine/src/renderer/VectorRenderer.ts
import * as THREE from "three";
import { ILayerRenderer } from "./ILayerRenderer";
import { Tile } from "../tile/Tile";
import { TileContent, ContentState, RenderObject } from "../tile/TileContent";
import { GeoJSONFeature } from "../source/GeoJSONSource";
import { IMaterialFactory, DefaultMaterialFactory } from "./IMaterialFactory";

export interface VectorRendererOptions {
  materialFactory?: IMaterialFactory;
}

let _contentIdCounter = 0;

export class VectorRenderer implements ILayerRenderer<GeoJSONFeature[]> {
  readonly name = "VectorRenderer";

  private materialFactory: IMaterialFactory;

  constructor(options: VectorRendererOptions = {}) {
    this.materialFactory = options.materialFactory ?? new DefaultMaterialFactory();
  }

  async createContent(
    features: GeoJSONFeature[],
    tile: Tile,
  ): Promise<TileContent> {
    const group = new THREE.Group();

    for (const feature of features) {
      const obj = this.createFeatureObject(feature, tile);
      if (obj) group.add(obj);
    }

    const renderObject = new RenderObject(group);

    return {
      id: `content-${++_contentIdCounter}`,
      tileKey: tile.key,
      layerId: "",
      data: features,
      renderObjects: [renderObject],
      state: ContentState.READY,
    };
  }

  private createFeatureObject(
    feature: GeoJSONFeature,
    tile: Tile,
  ): THREE.Object3D | null {
    const coords = feature.geometry.coordinates;
    switch (feature.geometry.type) {
      case "Point":
        return this.createPoint(coords, feature, tile);
      case "MultiPoint":
        return this.createMultiPoint(coords, feature, tile);
      case "LineString":
        return this.createLine(coords, feature, tile);
      case "MultiLineString":
        return this.createMultiLine(coords, feature, tile);
      case "Polygon":
        return this.createPolygon(coords, feature, tile);
      case "MultiPolygon":
        return this.createMultiPolygon(coords, feature, tile);
      default:
        return null;
    }
  }

  private createPoint(
    coords: number[],
    feature: GeoJSONFeature,
    tile: Tile,
  ): THREE.Object3D {
    const material = this.materialFactory.createPointMaterial(feature);
    const geometry = new THREE.BufferGeometry();
    const [x, y] = coords;
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(
        [x - tile.origin.x, y - tile.origin.y, coords[2] ?? 0],
        3,
      ),
    );
    return new THREE.Points(geometry, material);
  }

  private createMultiPoint(
    coords: number[][],
    feature: GeoJSONFeature,
    tile: Tile,
  ): THREE.Object3D {
    const material = this.materialFactory.createPointMaterial(feature);
    const positions: number[] = [];
    for (const c of coords) {
      positions.push(c[0] - tile.origin.x, c[1] - tile.origin.y, c[2] ?? 0);
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3),
    );
    return new THREE.Points(geometry, material);
  }

  private createLine(
    coords: number[][],
    feature: GeoJSONFeature,
    tile: Tile,
  ): THREE.Object3D {
    const material = this.materialFactory.createLineMaterial(feature);
    const points: number[] = [];
    for (const c of coords) {
      points.push(c[0] - tile.origin.x, c[1] - tile.origin.y, c[2] ?? 0);
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(points, 3),
    );
    return new THREE.Line(geometry, material);
  }

  private createMultiLine(
    coords: number[][][],
    feature: GeoJSONFeature,
    tile: Tile,
  ): THREE.Group {
    const group = new THREE.Group();
    for (const line of coords) {
      const obj = this.createLine(line, feature, tile);
      if (obj) group.add(obj);
    }
    return group;
  }

  private createPolygon(
    coords: number[][][],
    feature: GeoJSONFeature,
    tile: Tile,
  ): THREE.Object3D | null {
    // 第一个 ring = 外环，后续 = 洞
    const outerRing = coords[0];
    if (!outerRing || outerRing.length < 3) return null;

    const material = this.materialFactory.createFillMaterial(feature);
    const shape = new THREE.Shape();

    // 移动到第一个点
    shape.moveTo(
      outerRing[0][0] - tile.origin.x,
      outerRing[0][1] - tile.origin.y,
    );

    for (let i = 1; i < outerRing.length; i++) {
      shape.lineTo(
        outerRing[i][0] - tile.origin.x,
        outerRing[i][1] - tile.origin.y,
      );
    }
    shape.closePath();

    // 洞
    for (let h = 1; h < coords.length; h++) {
      const hole = coords[h];
      const holePath = new THREE.Path();
      holePath.moveTo(hole[0][0] - tile.origin.x, hole[0][1] - tile.origin.y);
      for (let i = 1; i < hole.length; i++) {
        holePath.lineTo(
          hole[i][0] - tile.origin.x,
          hole[i][1] - tile.origin.y,
        );
      }
      shape.holes.push(holePath);
    }

    const geometry = new THREE.ShapeGeometry(shape);
    const mesh = new THREE.Mesh(geometry, material);

    // 添加边框
    const lineGeo = new THREE.EdgesGeometry(geometry);
    const lineMat = this.materialFactory.createLineMaterial(feature);
    mesh.add(new THREE.LineSegments(lineGeo, lineMat));

    return mesh;
  }

  private createMultiPolygon(
    coords: number[][][][],
    feature: GeoJSONFeature,
    tile: Tile,
  ): THREE.Group {
    const group = new THREE.Group();
    for (const polygon of coords) {
      const obj = this.createPolygon(polygon, feature, tile);
      if (obj) group.add(obj);
    }
    return group;
  }

  disposeContent(content: TileContent): void {
    for (const ro of content.renderObjects) {
      ro.dispose();
    }
  }
}
```

- [ ] **Commit**

---

### Task 27: DXFSource 接口 Stub

**Files:**
- Create: `geo-engine/packages/engine/src/source/DXFSource.ts`

```ts
// geo-engine/packages/engine/src/source/DXFSource.ts
// DXF 数据源 — 接口预留，待社区/后续实现

import { CrsBounds } from "../core";
import { IProjectCRS } from "../crs";
import { TileKey } from "../tile";
import { IDataSource } from "./IDataSource";

export interface DXFEntity {
  type: string;
  layer: string;
  coordinates: number[][];
  properties: Record<string, any>;
}

export class DXFSource implements IDataSource<DXFEntity[]> {
  readonly dataType = "dxf";
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

  async fetch(_key: TileKey, _tileBounds: CrsBounds): Promise<DXFEntity[]> {
    throw new Error(
      "DXFSource: DXF loading not yet implemented. " +
      "This is a stub for future development. " +
      "See CONTRIBUTING.md for how to implement a DXF loader."
    );
  }

  dispose(_data: DXFEntity[]): void {}
}

// 注册入口
// DataSourceRegistry.register("dxf", DXFSource);
```

- [ ] **Step 1: DataSourceRegistry.register("dxf", DXFSource) 在 index.ts 中注册**

- [ ] **Commit**

---

### Task 28: VectorLayer 创建

**Files:**
- Create: `geo-engine/packages/engine/src/layer/VectorLayer.ts`
- Modify: `geo-engine/packages/engine/src/layer/index.ts`

```ts
// geo-engine/packages/engine/src/layer/VectorLayer.ts
// 与 RasterLayer 结构相同，type: "vector"
// 复用 ILayer 接口
```

- [ ] **Commit**

---

### Task 29: Demo — GeoJSON 道路叠加底图

**Files:**
- Modify: `geo-engine/packages/demo/src/main.ts`
- Create: `geo-engine/packages/demo/public/data/sample.geojson`

- [ ] **Step 1: 准备 GeoJSON 测试数据**（几条路/建筑）

- [ ] **Step 2: 编写 Demo**

```ts
const geojsonLayer = new VectorLayer({
  name: "矢量道路",
  tileScheme: new ProjectTileScheme(2000),
  dataSource: new GeoJSONSource("/data/sample.geojson", [x1,y1,x2,y2], engine.crs),
  renderer: new VectorRenderer({ materialFactory: new DefaultMaterialFactory() }),
});
```

- [ ] **Step 3: 运行验证**

- [ ] **Step 4: Commit**

---

## Verification Checklist (Phase 3)

1. GeoJSON Point/Line/Polygon 正确渲染在底图上
2. 矢量符号化（颜色/线宽）通过 IMaterialFactory 可控
3. DXFSource 构造不报错，fetch() 正确抛出 "not implemented" 错误
4. 所有测试通过

*Plan generated: 2026-07-24*
