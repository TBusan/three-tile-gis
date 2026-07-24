# Phase 2: XYZ 底图 + 双 TileScheme 混合

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task.

**Goal:** XYZ 在线瓦片作为底图与 ProjectTile GeoTIFF 叠加层同屏显示。

**Architecture:** 新增 XYZTileScheme（封装 proj4 重投影），XYZTileSource（URL 模板加载），GPU 细分网格解决重投影纹理扭曲。

**Tech Stack:** TypeScript 5.x + Three.js r168+ + proj4 + geotiff.js + Vite + vitest

**Spec:** `D:\study\code\webgl\three-tile-gis\doc\设计文档.md` §3.5, §4.2, §8.2

**Prerequisite:** Phase 1 完成

## Global Constraints

- 不修改 Phase 1 的接口定义
- proj4 是 optionalDependency
- XYZ tile 加载后通过 proj4 将 3857 坐标转为 Engine CRS 坐标

---

### Task 16: 添加 proj4 依赖 + Proj4CRS 实现

**Files:**
- Modify: `geo-engine/packages/engine/package.json`
- Create: `geo-engine/packages/engine/src/crs/Proj4CRS.ts`
- Modify: `geo-engine/packages/engine/src/crs/index.ts`

- [ ] **Step 1: 添加 proj4 依赖**

Run: `cd D:/study/code/webgl/three-tile-gis/geo-engine && npm install proj4 -w packages/engine && npm install @types/proj4 -D -w packages/engine`

- [ ] **Step 2: 创建 Proj4CRS.ts**

```ts
// geo-engine/packages/engine/src/crs/Proj4CRS.ts
import proj4 from "proj4";
import { IProjectCRS } from "./IProjectCRS";

export class Proj4CRS implements IProjectCRS {
  readonly name: string;
  readonly units = "meter" as const;

  private projDef: string;

  constructor(epsgOrDef: string | number, name?: string) {
    const def = typeof epsgOrDef === "number"
      ? `EPSG:${epsgOrDef}`
      : epsgOrDef;
    this.projDef = def;
    this.name = name ?? `EPSG:${epsgOrDef}`;
  }

  project(lon: number, lat: number): { x: number; y: number } {
    const [x, y] = proj4("EPSG:4326", this.projDef, [lon, lat]);
    return { x, y };
  }

  unproject(x: number, y: number): { lon: number; lat: number } {
    const [lon, lat] = proj4(this.projDef, "EPSG:4326", [x, y]);
    return { lon, lat };
  }
}
```

- [ ] **Step 3: 更新 crs/index.ts** — 追加 `export { Proj4CRS } from "./Proj4CRS";`

- [ ] **Step 4: 测试**

```ts
import { describe, it, expect } from "vitest";
import { Proj4CRS } from "../Proj4CRS";

describe("Proj4CRS", () => {
  const epsg3857 = new Proj4CRS(3857);

  it("should project to Web Mercator", () => {
    const { x, y } = epsg3857.project(114, 30);
    expect(x).toBeGreaterThan(10000000);
    expect(x).toBeLessThan(13000000);
  });

  it("should round-trip correctly", () => {
    const { x, y } = epsg3857.project(113.5, 28.3);
    const { lon, lat } = epsg3857.unproject(x, y);
    expect(lon).toBeCloseTo(113.5, 5);
    expect(lat).toBeCloseTo(28.3, 5);
  });
});
```

- [ ] **Step 5: Commit**

```bash
git add geo-engine/packages/engine/package.json geo-engine/packages/engine/src/crs/
git commit -m "feat: add Proj4CRS with proj4 dependency"
```

---

### Task 17: XYZTileScheme 实现

**Files:**
- Create: `geo-engine/packages/engine/src/tile/XYZTileScheme.ts`
- Modify: `geo-engine/packages/engine/src/tile/index.ts`

- [ ] **Step 1: 创建 XYZTileScheme.ts**

```ts
// geo-engine/packages/engine/src/tile/XYZTileScheme.ts
import proj4 from "proj4";
import { Frustum, Box3, Vector3 } from "three";
import { CrsBounds } from "../core";
import { IProjectCRS } from "../crs";
import { TileKey } from "./TileKey";
import { ITileScheme } from "./ITileScheme";

/**
 * XYZ 四叉树瓦片方案。
 *
 * 底图使用 3857 经纬度 → proj4 重投影到 Engine CRS。
 * getTilesInView() 反算视锥范围 → 3857 → 计算 x/y/z。
 */
export class XYZTileScheme implements ITileScheme {
  readonly name: string;

  /** WGS84 → Target CRS 转换 */
  private wgs2crs: (lon: number, lat: number) => { x: number; y: number };

  /** Target CRS → WGS84 转换 */
  private crs2wgs: (x: number, y: number) => { lon: number; lat: number };

  /** 3857 → Target CRS */
  private merc2crs: (x: number, y: number) => { x: number; y: number };

  constructor(targetCRS: IProjectCRS, name?: string) {
    this.name = name ?? `XYZ-${targetCRS.name}`;

    this.wgs2crs = (lon, lat) => targetCRS.project(lon, lat);
    this.crs2wgs = (x, y) => targetCRS.unproject(x, y);

    // 3857 → WGS84 → Target CRS
    this.merc2crs = (x, y) => {
      const mercCRS = "EPSG:3857";
      const [lon, lat] = proj4(mercCRS, "EPSG:4326", [x, y]);
      return targetCRS.project(lon, lat);
    };
  }

  getTilesInView(frustum: Frustum, _crs: IProjectCRS): TileKey[] {
    // 简化：返回 level 10-16 的 tile
    // Phase 2 完整实现带 LOD 计算
    const result: TileKey[] = [];
    const groundBounds = this.estimateGroundBounds(frustum);

    if (!groundBounds) return result;

    // 遍历 level 10-15
    for (let level = 10; level <= 15; level++) {
      const tileCount = Math.pow(2, level);
      const worldSize = tileCount;

      // CRS 范围 → 近似 3857 tile 坐标
      const minCol = Math.floor((groundBounds[0] / 40075016.686 + 0.5) * worldSize);
      const maxCol = Math.ceil((groundBounds[2] / 40075016.686 + 0.5) * worldSize);
      const minRow = Math.floor((0.5 - groundBounds[3] / 40075016.686) * worldSize);
      const maxRow = Math.ceil((0.5 - groundBounds[1] / 40075016.686) * worldSize);

      for (let tx = Math.max(0, minCol); tx <= Math.min(worldSize - 1, maxCol); tx++) {
        for (let ty = Math.max(0, minRow); ty <= Math.min(worldSize - 1, maxRow); ty++) {
          result.push({
            schemeId: this.name,
            id: `${level}-${tx}-${ty}`,
            level,
          });
        }
      }
    }

    return result;
  }

  getTileBounds(key: TileKey): CrsBounds {
    const [level, tx, ty] = key.id.split("-").map(Number);
    const worldSize = Math.pow(2, level) * 256;
    const mercSize = 20037508.342789244 * 2;

    const leftMerc = -mercSize / 2 + (tx / Math.pow(2, level)) * mercSize;
    const topMerc = mercSize / 2 - (ty / Math.pow(2, level)) * mercSize;
    const rightMerc = leftMerc + mercSize / Math.pow(2, level);
    const bottomMerc = topMerc - mercSize / Math.pow(2, level);

    // 转换 4 角 + 中心到 Target CRS
    const corners = [
      this.merc2crs(leftMerc, topMerc),
      this.merc2crs(rightMerc, topMerc),
      this.merc2crs(rightMerc, bottomMerc),
      this.merc2crs(leftMerc, bottomMerc),
    ];

    const xs = corners.map((c) => c.x);
    const ys = corners.map((c) => c.y);

    return [
      Math.min(...xs),
      Math.min(...ys),
      Math.max(...xs),
      Math.max(...ys),
    ];
  }

  getParentKey(key: TileKey): TileKey | null {
    if (key.level <= 0) return null;
    const parts = key.id.split("-").map(Number);
    return {
      schemeId: this.name,
      id: `${parts[0] - 1}-${Math.floor(parts[1] / 2)}-${Math.floor(parts[2] / 2)}`,
      level: key.level - 1,
    };
  }

  getChildKeys(key: TileKey): TileKey[] {
    const parts = key.id.split("-").map(Number);
    const nextLevel = key.level + 1;
    const x = parts[1] * 2;
    const y = parts[2] * 2;
    return [
      { schemeId: this.name, id: `${nextLevel}-${x}-${y}`, level: nextLevel },
      { schemeId: this.name, id: `${nextLevel}-${x + 1}-${y}`, level: nextLevel },
      { schemeId: this.name, id: `${nextLevel}-${x}-${y + 1}`, level: nextLevel },
      { schemeId: this.name, id: `${nextLevel}-${x + 1}-${y + 1}`, level: nextLevel },
    ];
  }

  private estimateGroundBounds(frustum: Frustum): CrsBounds | null {
    // 保守估计 — Phase 2 简化
    return [-20037508, -20037508, 20037508, 20037508];
  }
}
```

- [ ] **Step 2: 编写测试** — `XYZTileScheme.test.ts`

```ts
import { describe, it, expect } from "vitest";
import { XYZTileScheme } from "../XYZTileScheme";
import { CGCS2000GKCRS } from "../../crs";

describe("XYZTileScheme", () => {
  const scheme = new XYZTileScheme(new CGCS2000GKCRS(38));

  it("should return null parent for level 0", () => {
    const parent = scheme.getParentKey({
      schemeId: scheme.name, id: "0-0-0", level: 0,
    });
    expect(parent).toBeNull();
  });

  it("should generate 4 children", () => {
    const children = scheme.getChildKeys({
      schemeId: scheme.name, id: "10-512-512", level: 10,
    });
    expect(children).toHaveLength(4);
    expect(children[0].id).toBe("11-1024-1024");
  });

  it("should compute parent correctly", () => {
    const parent = scheme.getParentKey({
      schemeId: scheme.name, id: "11-1024-1024", level: 11,
    });
    expect(parent?.id).toBe("10-512-512");
  });
});
```

- [ ] **Step 3: 更新 tile/index.ts** — 追加 export

- [ ] **Step 4: 运行测试 + Commit**

---

### Task 18: XYZTileSource（URL 模板加载 + 纹理创建）

**Files:**
- Create: `geo-engine/packages/engine/src/source/XYZTileSource.ts`
- Modify: `geo-engine/packages/engine/src/source/index.ts`

- [ ] **Step 1: 创建 XYZTileSource.ts**

```ts
// geo-engine/packages/engine/src/source/XYZTileSource.ts
import { CrsBounds } from "../core";
import { IProjectCRS } from "../crs";
import { TileKey } from "../tile";
import { IDataSource } from "./IDataSource";

export interface XYZTileSourceOptions {
  url: string;
  crs: IProjectCRS;
  /** 数据经纬度范围（WGS84） */
  bounds?: CrsBounds;
  minLevel?: number;
  maxLevel?: number;
  subdomains?: string[];
  attribution?: string;
}

export class XYZTileSource implements IDataSource<HTMLImageElement> {
  readonly dataType = "xyz-image";
  readonly crs: IProjectCRS;
  readonly bounds: CrsBounds;

  private url: string;
  minLevel: number;
  maxLevel: number;
  private subdomains: string[];
  attribution: string;

  constructor(options: XYZTileSourceOptions) {
    this.url = options.url;
    this.crs = options.crs;
    this.bounds = options.bounds ?? [-180, -85, 180, 85];
    this.minLevel = options.minLevel ?? 0;
    this.maxLevel = options.maxLevel ?? 18;
    this.subdomains = options.subdomains ?? [];
    this.attribution = options.attribution ?? "";
  }

  async fetch(key: TileKey, _tileBounds: CrsBounds): Promise<HTMLImageElement> {
    const parts = key.id.split("-");
    const [level, tx, ty] = parts.map(Number);

    // 构建 URL
    let url = this.url
      .replace("{z}", String(level))
      .replace("{x}", String(tx))
      .replace("{y}", String(ty));

    // 子域名
    if (this.subdomains.length > 0) {
      const s = this.subdomains[Math.floor(Math.random() * this.subdomains.length)];
      url = url.replace("{s}", s);
    }

    return this.loadImage(url);
  }

  private loadImage(url: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => resolve(img);
      img.onerror = (e) => reject(new Error(`Failed to load tile: ${url}`));
      img.src = url;
    });
  }

  dispose(_data: HTMLImageElement): void { /* browser GC handles this */ }
}
```

- [ ] **Step 2: DataSourceRegistry 注册**

```ts
DataSourceRegistry.register("xyz-image", XYZTileSource as any);
```

- [ ] **Step 3: 更新 source/index.ts + Commit**

---

### Task 19: GPU 细分网格 — 解决 XYZ 重投影纹理扭曲

**Files:**
- Create: `geo-engine/packages/engine/src/renderer/quality/ReprojectedMesh.ts`
- Modify: `geo-engine/packages/engine/src/renderer/quality/index.ts`
- Modify: `geo-engine/packages/engine/src/renderer/RasterRenderer.ts`

- [ ] **Step 1: 创建 ReprojectedMesh.ts — N×N 细分平面**

```ts
// geo-engine/packages/engine/src/renderer/quality/ReprojectedMesh.ts
import { Mesh, MeshBasicMaterial, PlaneGeometry, BufferGeometry, Float32BufferAttribute, Object3D } from "three";
import { Tile } from "../../tile/Tile";
import { QualityMesh } from "./SimplePlane";

/**
 * 重投影细分网格 — 解决 XYZ 底图投影弯曲问题。
 *
 * zoom ≤ 10 → 8×8 = 64 顶点
 * zoom 11-14  → 4×4 = 16 顶点
 * zoom ≥ 15 → 2×2 = 4 顶点（几乎矩形）
 */
export class ReprojectedMesh implements QualityMesh {
  createMesh(_data: unknown, tile: Tile): Object3D {
    const bounds = tile.bounds;
    const width = bounds[2] - bounds[0];
    const height = bounds[3] - bounds[1];

    const subdivision = this.getSubdivision(tile.key.level);
    const geometry = new PlaneGeometry(width, height, subdivision, subdivision);

    const material = new MeshBasicMaterial({ side: 2 });
    const mesh = new Mesh(geometry, material);
    mesh.position.set(width / 2, height / 2, 0);

    return mesh;
  }

  private getSubdivision(level: number): number {
    if (level <= 10) return 8;
    if (level <= 14) return 4;
    return 2;
  }
}
```

- [ ] **Step 2: 修改 RasterRenderer** — 根据 Layer 类型选择 QualityMesh

在 `RasterRenderer.createContent()` 中：
```ts
// 如果是 XYZ 底图层 → 使用 ReprojectedMesh
// 否则使用默认 SimplePlane
```

或者通过配置参数 `qualityTier` 让用户选择。

- [ ] **Step 3: 更新 quality/index.ts + Commit**

---

### Task 20: GeoTIFFSource 真数据加载（geotiff.js）

**Files:**
- Create: `geo-engine/packages/engine/src/source/GeoTIFFSource.ts`
- Modify: `geo-engine/packages/engine/src/source/index.ts`
- Modify: `geo-engine/packages/engine/package.json`

- [ ] **Step 1: 安装 geotiff.js**

Run: `cd D:/study/code/webgl/three-tile-gis/geo-engine && npm install geotiff -w packages/engine`

- [ ] **Step 2: 创建 GeoTIFFSource.ts**

```ts
// geo-engine/packages/engine/src/source/GeoTIFFSource.ts
import { fromUrl, GeoTIFF } from "geotiff";
import { CrsBounds } from "../core";
import { IProjectCRS } from "../crs";
import { TileKey } from "../tile";
import { IDataSource } from "./IDataSource";

export interface GeoTIFFSourceOptions {
  url: string;
  /** Engine CRS（数据输出坐标必须在此 CRS 下） */
  engineCRS: IProjectCRS;
  /** 数据自身的 CRS（仅声明，不自动转换） */
  dataCRS?: IProjectCRS;
}

export class GeoTIFFSource implements IDataSource<ImageData> {
  readonly dataType = "geotiff";
  readonly crs: IProjectCRS;
  readonly bounds: CrsBounds = [0, 0, 0, 0]; // Phase 2: 从文件头读取

  private url: string;
  private tiff: GeoTIFF | null = null;
  private engineCRS: IProjectCRS;

  constructor(options: GeoTIFFSourceOptions) {
    this.url = options.url;
    this.crs = options.engineCRS;
    this.engineCRS = options.engineCRS;
  }

  private async getTIFF(): Promise<GeoTIFF> {
    if (!this.tiff) {
      this.tiff = await fromUrl(this.url);
    }
    return this.tiff;
  }

  async fetch(_key: TileKey, tileBounds: CrsBounds): Promise<ImageData> {
    const tiff = await this.getTIFF();
    const image = await tiff.getImage();
    const raster = await image.readRasters();

    // raster[0] = Red, raster[1] = Green, raster[2] = Blue
    const [r, g, b] = raster as Float32Array[];
    const width = image.getWidth();
    const height = image.getHeight();

    // 创建 ImageData
    const imageData = new ImageData(width, height);
    for (let i = 0; i < width * height; i++) {
      imageData.data[i * 4] = r[i];
      imageData.data[i * 4 + 1] = g[i];
      imageData.data[i * 4 + 2] = b[i];
      imageData.data[i * 4 + 3] = 255;
    }

    return imageData;
  }

  dispose(_data: ImageData): void { /* GC */ }
}
```

- [ ] **Step 3: DataSourceRegistry.register("geotiff", GeoTIFFSource)**

- [ ] **Step 4: Commit**

---

### Task 21: DEMSource + DemMesh 质量层

**Files:**
- Create: `geo-engine/packages/engine/src/source/DEMSource.ts`
- Create: `geo-engine/packages/engine/src/renderer/quality/DemMesh.ts`

- [ ] **Step 1: 创建 DEMSource.ts** — 从 GeoTIFF 读取高程波段

```ts
// geo-engine/packages/engine/src/source/DEMSource.ts
import { fromUrl } from "geotiff";
import { CrsBounds } from "../core";
import { IProjectCRS } from "../crs";
import { TileKey } from "../tile";
import { IDataSource } from "./IDataSource";

export class DEMSource implements IDataSource<Float32Array> {
  readonly dataType = "dem";
  readonly crs: IProjectCRS;
  readonly bounds: CrsBounds = [0, 0, 0, 0];

  private url: string;

  constructor(url: string, engineCRS: IProjectCRS) {
    this.url = url;
    this.crs = engineCRS;
  }

  async fetch(_key: TileKey, _tileBounds: CrsBounds): Promise<Float32Array> {
    const tiff = await fromUrl(this.url);
    const image = await tiff.getImage();
    const [elevation] = await image.readRasters() as Float32Array[];
    return elevation;
  }

  dispose(_data: Float32Array): void {}
}
```

- [ ] **Step 2: 创建 DemMesh.ts** — 使用 DEM 数据修改顶点 Z

```ts
// 参考 three-tile 的 Martini 网格简化算法
// Phase 2 简化：直接用 DEM 修改 PlaneGeometry 顶点
import { Mesh, MeshBasicMaterial, PlaneGeometry } from "three";
import { Tile } from "../../tile/Tile";
import { QualityMesh } from "./SimplePlane";

export class DemMesh implements QualityMesh {
  createMesh(data: unknown, tile: Tile): Mesh {
    const dem = data as Float32Array;
    const bounds = tile.bounds;
    const width = bounds[2] - bounds[0];
    const height = bounds[3] - bounds[1];
    const segW = Math.ceil(Math.sqrt(dem.length));
    const segH = segW;

    const geometry = new PlaneGeometry(width, height, segW - 1, segH - 1);
    const positions = geometry.attributes.position.array as Float32Array;

    // 修改 Z 值为 DEM 高度
    for (let i = 0; i < positions.length / 3; i++) {
      const demIdx = Math.min(i, dem.length - 1);
      positions[i * 3 + 2] = dem[demIdx];
    }
    geometry.computeVertexNormals();

    const material = new MeshBasicMaterial({
      side: 2,
      wireframe: false,
    });
    const mesh = new Mesh(geometry, material);
    mesh.position.set(width / 2, height / 2, 0);

    return mesh;
  }
}
```

- [ ] **Step 3: 在 RasterRenderer 中支持 DemMesh 选择**

```ts
// RasterRenderer 的 qualityTier 选项默认 SimplePlane，
// 用户传入 DemMesh 即可使用地形
new RasterRenderer({ qualityTier: new DemMesh() })
```

- [ ] **Step 4: DataSourceRegistry.register("dem", DEMSource)**

- [ ] **Step 5: 测试 + Commit**

---

### Task 22: TileScheduler 升级 — 四维优先级 + 渐进显示

**Files:**
- Modify: `geo-engine/packages/engine/src/manager/TileScheduler.ts`

- [ ] **Step 1: 升级 computePriority 方法**

```ts
priority =
  w1 * screenArea(tile)        // 屏幕占比
  + w2 * 1 / distToCenter      // 距屏幕中心距离
  + w3 * inFrustum(tile) ? 1 : 0  // 视锥内优先
  + w4 * parentLoaded(tile) ? 1 : 0 // 父tile已加载优先
```

- [ ] **Step 2: 添加 tile fade-in 效果**（0.3s opacity 动画）

- [ ] **Step 3: Commit**

---

### Task 23: Demo — XYZ 底图 + GeoTIFF 叠加验证

**Files:**
- Modify: `geo-engine/packages/demo/src/main.ts`
- Create: `geo-engine/packages/demo/public/data/`

- [ ] **Step 1: 准备测试数据** — 下载一个小的 GeoTIFF 文件放到 `demo/public/data/ortho.tif`

- [ ] **Step 2: 编写 Demo**

```ts
// 底图：天地图/OSM XYZ
const baseLayer = new RasterLayer({
  name: "OSM 底图",
  tileScheme: new XYZTileScheme(engine.crs),
  dataSource: new XYZTileSource({
    url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    crs: engine.crs,
  }),
  renderer: new RasterRenderer({ qualityTier: new ReprojectedMesh() }),
});

// 叠加层：本地 GeoTIFF
const orthoLayer = new RasterLayer({
  name: "正射影像",
  tileScheme: new ProjectTileScheme(500),
  dataSource: new GeoTIFFSource({ url: "/data/ortho.tif", engineCRS: engine.crs }),
  renderer: new RasterRenderer({ qualityTier: new DemMesh() }),
});

// 添加两组到 LayerManager
```

- [ ] **Step 3: 运行验证** — 对齐精度测试

- [ ] **Step 4: Commit**

---

## Verification Checklist (Phase 2)

1. XYZ 底图正确显示在屏幕上（无投影错位）
2. GeoTIFF 叠加层对齐 XYZ 底图
3. DEM 地形正确渲染（有高度变化）
4. 缩放/平移流畅，无卡帧
5. Floating Origin 在 XYZ + ProjectTile 双方案下正常切换
6. 所有测试通过

*Plan generated: 2026-07-24*
