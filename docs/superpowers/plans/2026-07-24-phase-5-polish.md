# Phase 5: 开源项目打磨

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 将 geo-engine 打磨为可发布的成熟开源库。

**Architecture:** 完整 TS 类型导出 + vitest 测试覆盖 + VitePress 文档 + GitHub Actions CI/CD + npm 发布。

**Tech Stack:** VitePress + vitest + GitHub Actions + npm

**Spec:** `D:\study\code\webgl\three-tile-gis\doc\设计文档.md` 第十三节

**Prerequisite:** Phase 4 完成

---

### Task 37: 完整 TypeScript 类型导出

**Files:**
- Modify: `geo-engine/packages/engine/src/index.ts`

- [ ] **Step 1: 审计导出完整性**

确保以下全部接口/类从 `@geo-engine/core` 可导入：

| 模块 | 导出项 |
|------|--------|
| core | `CrsCoord`, `CrsBounds`, `Disposable`, `Engine`, `EngineConfig`, `NotImplementedError` |
| crs | `IProjectCRS`, `CGCS2000GKCRS`, `Proj4CRS` |
| tile | `Tile`, `TileKey`, `TileState`, `TileContent`, `ContentState`, `RenderObject`, `ITileScheme`, `ProjectTileScheme`, `XYZTileScheme` |
| manager | `ITileCache`, `LRUTileCache`, `TileScheduler`, `ScheduledTile`, `TileManager`, `TileManagerOptions` |
| origin | `ILocalOrigin`, `IFloatingOrigin`, `FloatingOrigin` |
| layer | `ILayer`, `ILayerGroup`, `RasterLayer`, `RasterLayerOptions`, `VectorLayer`, `PointCloudLayer`, `VolumeLayer`, `LayerManager`, `LayerGroup` |
| source | `IDataSource`, `DataSourceRegistry`, `XYZTileSource`, `XYZTileSourceOptions`, `GeoTIFFSource`, `GeoTIFFSourceOptions`, `DEMSource`, `GeoJSONSource`, `GeoJSONFeature`, `FeatureCollection`, `DXFSource`, `DXFEntity`, `PointCloudSource`, `PointCloudData`, `GPRSource`, `VoxelGrid` |
| renderer | `ILayerRenderer`, `RasterRenderer`, `RasterRendererOptions`, `VectorRenderer`, `VectorRendererOptions`, `PointCloudRenderer`, `VolumeRenderer`, `SimplePlane`, `DemMesh`, `ReprojectedMesh`, `QualityMesh`, `IMaterialFactory`, `DefaultMaterialFactory` |
| camera | `ICameraController`, `MapCameraController` |

- [ ] **Step 2: 运行 `npx tsc --noEmit`** — 确保零错误

- [ ] **Step 3: Commit**

---

### Task 38: 单元测试覆盖

**Files:**
- Create/Modify: `geo-engine/packages/engine/src/**/__tests__/*.test.ts`

- [ ] **Step 1: CRS 测试补充** — Proj4CRS, CGCS2000GKCRS 边界情况

```ts
// CGCS2000GKCRS.test.ts 补充
it("should handle equator (lat=0)", () => { ... });
it("should handle high latitude (lat=45)", () => { ... });
it("should handle negative longitude", () => { ... });
```

- [ ] **Step 2: TileScheme 测试补充**

```ts
// XYZTileScheme.test.ts 补充
it("should handle large zoom levels", () => { ... });
// ProjectTileScheme.test.ts 补充
it("should tile continuous ranges correctly", () => { ... });
```

- [ ] **Step 3: TileManager 测试** — 模拟加载流程

```ts
it("should deduplicate tile keys", () => { ... });
it("should respect maxPerFrame budget", () => { ... });
it("should call layer dependsOn checks", () => { ... });
```

- [ ] **Step 4: FloatingOrigin 测试补充** — 多 Group 并发更新

```ts
it("should update all registered groups", () => { ... });
it("should not update unregistered groups", () => { ... });
```

- [ ] **Step 5: 运行全量测试**

Run: `cd D:/study/code/webgl/three-tile-gis/geo-engine && npx vitest run`
Expected: 所有测试通过，覆盖率 > 70%

- [ ] **Step 6: Commit**

---

### Task 39: VitePress 在线文档

**Files:**
- Create: `geo-engine/docs/`

- [ ] **Step 1: 安装 VitePress**

```bash
npm install -D vitepress -w packages/engine
```

- [ ] **Step 2: 创建文档结构**

```
geo-engine/docs/
├── .vitepress/
│   └── config.ts
├── index.md              ← 首页：项目介绍 + 快速开始
├── guide/
│   ├── installation.md   ← 安装
│   ├── quick-start.md    ← 5 分钟上手
│   ├── crs.md            ← CRS 配置指南
│   ├── layers.md         ← 图层管理
│   └── coordinate.md     ← 坐标系统说明
├── api/
│   ├── engine.md         ← Engine API
│   ├── crs.md            ← CRS 接口
│   ├── tile.md           ← Tile 系统
│   ├── layer.md          ← Layer 系统
│   ├── source.md         ← DataSource
│   ├── renderer.md       ← Renderer
│   └── camera.md         ← Camera
├── examples/
│   ├── geotiff.md        ← GeoTIFF 示例
│   ├── xyz-basemap.md    ← XYZ 底图示例
│   └── geojson.md        ← GeoJSON 示例
└── contributing.md       ← 贡献指南
```

- [ ] **Step 3: 编写核心文档内容** — 至少包含 API 参考和 3 个示例

- [ ] **Step 4: 添加 npm scripts**

```json
"docs:dev": "vitepress dev docs",
"docs:build": "vitepress build docs"
```

- [ ] **Step 5: Commit**

---

### Task 40: CI/CD — GitHub Actions

**Files:**
- Create: `geo-engine/.github/workflows/ci.yml`
- Create: `geo-engine/.github/workflows/docs.yml`

- [ ] **Step 1: 创建 ci.yml**

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [18, 20, 22]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
      - run: npm ci
      - run: npm run build
      - run: npm test

  typecheck:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npx tsc --noEmit
```

- [ ] **Step 2: 创建 docs.yml** — 自动部署 VitePress 到 GitHub Pages

- [ ] **Step 3: Commit + Push → 验证 CI 通过**

---

### Task 41: npm 发布准备

**Files:**
- Modify: `geo-engine/packages/engine/package.json`
- Create: `geo-engine/LICENSE`
- Create: `geo-engine/CONTRIBUTING.md`
- Create: `geo-engine/CODE_OF_CONDUCT.md`
- Create: `geo-engine/CHANGELOG.md`

- [ ] **Step 1: 完善 package.json**

```json
{
  "name": "@geo-engine/core",
  "version": "0.1.0",
  "description": "Engineering-grade 3D GIS engine — CRS-aware, interface-driven, Three.js based",
  "license": "MIT",
  "author": "whitebluehorse",
  "keywords": ["gis", "3d", "three.js", "crs", "geotiff", "map", "terrain"],
  "repository": {
    "type": "git",
    "url": "https://github.com/whitebluehorse/geo-engine"
  },
  "files": ["src", "dist", "README.md"],
  "main": "./dist/index.js",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.mjs",
      "require": "./dist/index.js",
      "types": "./dist/index.d.ts"
    }
  },
  "build": "tsup src/index.ts --format cjs,esm --dts --clean",
  "peerDependencies": {
    "three": "^0.168.0"
  },
  "peerDependenciesMeta": {
    "proj4": { "optional": true },
    "geotiff": { "optional": true }
  }
}
```

- [ ] **Step 2: 安装构建工具**

```bash
npm install -D tsup -w packages/engine
```

- [ ] **Step 3: 创建 LICENSE (MIT)**

- [ ] **Step 4: 创建 CONTRIBUTING.md** — 包含扩展 DataSource/Renderer 的指南

- [ ] **Step 5: 创建 CHANGELOG.md** — 记录 v0.1.0

- [ ] **Step 6: 构建 + npm publish（dry-run）**

```bash
npm run build -w packages/engine
npm publish --dry-run -w packages/engine
```

- [ ] **Step 7: Commit**

---

### Task 42: README 完善 + Demo 丰富

**Files:**
- Modify: `geo-engine/README.md`
- Modify: `geo-engine/packages/demo/`

- [ ] **Step 1: 编写 README.md**

```markdown
# GeoEngine

工程级三维 GIS 引擎 — 接口驱动、CRS 支持、Three.js 渲染。

## 特性

- 🗺️ **多 CRS**：CGCS2000 GK / UTM / EPSG:3857 / 自定义投影
- 🧩 **双 TileScheme**：XYZ 四叉树（底图）+ Project 按米分块（工程数据）
- 🎯 **高精度**：Local Origin + Floating Origin 双层 GPU 精度方案
- 🔌 **接口驱动**：每层可替换 — DataSource / Renderer / TileScheme / Cache
- 🌐 **多数据格式**：GeoTIFF / DEM / XYZ / GeoJSON / DXF(stub) / PointCloud(stub)
- ⚡ **渐进式显示**：四维优先级调度 + 帧预算控制 + fade-in

## 快速开始

\`\`\`bash
npm install @geo-engine/core three
\`\`\`

\`\`\`ts
import { Engine, CGCS2000GKCRS, ProjectTileScheme, RasterLayer, GeoTIFFSource, RasterRenderer } from "@geo-engine/core";

const engine = new Engine({
  crs: new CGCS2000GKCRS(38), // CGCS2000 GK 114°E
  container: document.getElementById("map"),
});

const layer = new RasterLayer({
  name: "正射影像",
  tileScheme: new ProjectTileScheme(500),
  dataSource: new GeoTIFFSource({ url: "./ortho.tif", engineCRS: engine.crs }),
  renderer: new RasterRenderer(),
});

engine.layerManager.addLayerToGroup(layer, "default");
engine.start();
\`\`\`

## 文档

访问 [在线文档](https://example.github.io/geo-engine)

## License

MIT
```

- [ ] **Step 2: Demo 丰富 — 添加至少 3 个 demo 页面**

```
demo/
├── index.html          ← 首页：所有 demo 导航
├── basic.html          ← GeoTIFF 加载
├── xyz.html            ← XYZ 底图 + 叠加层
└── geojson.html        ← GeoJSON 矢量
```

- [ ] **Step 3: Commit**

---

## Verification Checklist (Phase 5)

1. `npm run build` 成功生成 `dist/`（CJS + ESM + .d.ts）
2. `npx vitest run` 全量测试通过，覆盖率 > 70%
3. `npm run docs:dev` VitePress 文档可浏览
4. GitHub Actions CI 绿色
5. `npm publish --dry-run` 无报错
6. README 完整、Demo 丰富

## 发布 Checklist

- [ ] npm 发布 `@geo-engine/core@0.1.0`
- [ ] GitHub Release v0.1.0
- [ ] 文档部署到 GitHub Pages

*Plan generated: 2026-07-24*
