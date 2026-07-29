/**
 * GeoEngine Demo — CGCS2000 高斯-克吕格投影（中央经线 114°）
 *
 * 演示：
 *   1. CGCS2000 GK 3度带 第38带（中央经线 114°）作为工程坐标系
 *   2. XYZ 在线底图（ArcGis 卫星影像）通过 proj4 重投影到 CGCS2000 GK114
 *   3. 矢量叠加：点（控制点）、线（道路）、面（建筑用地）
 *   4. SubdividedPlane 自适应细分 — 低缩放级别时消除投影畸变
 *   5. 透视相机 + OrbitControls（GIS 约束：不允许低于地平线）
 *
 * 坐标说明：
 *   CGCS2000 GK114 坐标单位为米：
 *   - x: 东向，中央经线处 = 500000（假东偏移）
 *   - y: 北向，赤道 = 0，北纬30° ≈ 3320000
 *
 * 示例数据位于武汉市附近（经度 ≈ 114.0°~114.05°，纬度 ≈ 30.5°~30.55°）
 */

import * as THREE from "three";
import {
  Engine,
  CGCS2000GKCRS,
  RasterLayer,
  VectorLayer,
  ProjectTileScheme,
  XYZTileScheme,
  XYZTileSource,
  GeoJSONSource,
  RasterRenderer,
  VectorRenderer,
  DefaultMaterialFactory,
  SubdividedPlane,
  PerspectiveMapController,
  type Tile,
  type ILayerRenderer,
  type IProjectCRS,
  type CrsBounds,
  type TileKey,
  type TileLoadCallback,
  TileContent,
  RenderObject,
} from "@geo-engine/core";

// ═══════════════════════════════════════════════════════════════
// 示例矢量数据 — CGCS2000 GK114 坐标（单位：米）
//
// 位置：武汉市附近
//   经度 ≈ 114.0°（中央经线上）→ x ≈ 500000
//   纬度 ≈ 30.5° → y ≈ 3375000
//
// 注意：GeoJSONSource 要求坐标已经是 Engine CRS 坐标（米），
// 不是经纬度。如果原始数据是经纬度，需先用 CGCS2000GKCRS.project() 转换。
// ═══════════════════════════════════════════════════════════════

function createSampleGeoJSON(crs: IProjectCRS) {
  // 用 CRS 的 project 方法将经纬度转为平面坐标，确保数据精确
  const p = (lon: number, lat: number) => {
    const { x, y } = crs.project(lon, lat);
    return [Math.round(x * 100) / 100, Math.round(y * 100) / 100];
  };

  return {
    type: "FeatureCollection",
    features: [
      // ── 控制点（Point）──
      {
        type: "Feature",
        geometry: { type: "Point", coordinates: p(114.0, 30.52) },
        properties: { name: "GPS控制点 A", type: "control", elevation: 23.5 },
      },
      {
        type: "Feature",
        geometry: { type: "Point", coordinates: p(114.02, 30.53) },
        properties: { name: "GPS控制点 B", type: "control", elevation: 31.2 },
      },
      {
        type: "Feature",
        geometry: { type: "Point", coordinates: p(114.01, 30.505) },
        properties: { name: "水准点 BM01", type: "benchmark", elevation: 18.7 },
      },
      {
        type: "Feature",
        geometry: { type: "Point", coordinates: p(113.99, 30.515) },
        properties: { name: "导线点 D03", type: "traverse", elevation: 25.1 },
      },

      // ── 道路（LineString）──
      {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: [
            p(113.985, 30.50),
            p(113.995, 30.505),
            p(114.005, 30.51),
            p(114.015, 30.515),
            p(114.025, 30.52),
            p(114.035, 30.525),
          ],
        },
        properties: { name: "建设大道", highway: "primary", width: 40 },
      },
      {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: [
            p(114.0, 30.495),
            p(114.005, 30.505),
            p(114.01, 30.515),
            p(114.015, 30.525),
            p(114.02, 30.535),
          ],
        },
        properties: { name: "中南路", highway: "secondary", width: 30 },
      },
      {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: [
            p(113.99, 30.515),
            p(114.0, 30.52),
            p(114.01, 30.52),
            p(114.02, 30.525),
          ],
        },
        properties: { name: "和平路", highway: "tertiary", width: 20 },
      },
      // 环形道路
      {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: [
            p(114.0, 30.51),
            p(114.01, 30.51),
            p(114.015, 30.515),
            p(114.01, 30.52),
            p(114.0, 30.52),
            p(113.995, 30.515),
            p(114.0, 30.51),
          ],
        },
        properties: { name: "环线", highway: "ring", width: 25 },
      },

      // ── 建筑用地（Polygon）──
      {
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              p(114.002, 30.512),
              p(114.008, 30.512),
              p(114.008, 30.516),
              p(114.002, 30.516),
              p(114.002, 30.512),
            ],
          ],
        },
        properties: { name: "住宅区 A", landuse: "residential", floors: 18 },
      },
      {
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              p(114.01, 30.513),
              p(114.016, 30.513),
              p(114.016, 30.518),
              p(114.01, 30.518),
              p(114.01, 30.513),
            ],
          ],
        },
        properties: { name: "商业中心 B", landuse: "commercial", floors: 32 },
      },
      {
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              p(113.995, 30.505),
              p(114.003, 30.505),
              p(114.003, 30.51),
              p(113.995, 30.51),
              p(113.995, 30.505),
            ],
            // 内院（洞）
            [
              p(113.997, 30.506),
              p(114.001, 30.506),
              p(114.001, 30.509),
              p(113.997, 30.509),
              p(113.997, 30.506),
            ],
          ],
        },
        properties: { name: "工业园 C（带内院）", landuse: "industrial", floors: 3 },
      },
      {
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              p(114.005, 30.52),
              p(114.012, 30.52),
              p(114.014, 30.524),
              p(114.01, 30.527),
              p(114.005, 30.525),
              p(114.003, 30.522),
              p(114.005, 30.52),
            ],
          ],
        },
        properties: { name: "公园绿地 D", landuse: "park", floors: 0 },
      },
    ],
  };
}

// ═══════════════════════════════════════════════════════════════
// HUD
// ═══════════════════════════════════════════════════════════════

function updateHUD(
  crsName: string,
  x: number,
  y: number,
  resolution: number,
  tileCount: number,
  queueLen: number,
  loadingCount: number,
) {
  const el = (id: string) => document.getElementById(id)!;
  el("crs-name").textContent = crsName;
  el("crs-pos").textContent = `(${x.toFixed(1)}, ${y.toFixed(1)}) m`;
  el("crs-zoom").textContent = `${resolution.toFixed(2)} m/px`;
  el("tile-count").textContent = `${tileCount}`;
  el("scheduler-stats").textContent = `${queueLen} 排队 / ${loadingCount} 加载中`;
}

// ═══════════════════════════════════════════════════════════════
// Main
// ═══════════════════════════════════════════════════════════════

async function main() {
  // ── CRS：CGCS2000 高斯-克吕格 3度带 第38带（中央经线 = 3×38 = 114°）──
  const crs = new CGCS2000GKCRS(38);

  // 计算地图中心（经纬度 114.01, 30.515 → CGCS2000 GK114 平面坐标）
  const center = crs.project(114.01, 30.515);

  const app = document.getElementById("app")!;

  // ── Three.js 渲染器 ──────────────────────────────────────────
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    logarithmicDepthBuffer: true, // 解决大场景深度精度问题
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x0d1b2a);
  app.appendChild(renderer.domElement);

  const scene = new THREE.Scene();

  // World 根节点 — Floating Origin 偏移锚点（设计文档 §7.2）
  const worldRoot = new THREE.Group();
  scene.add(worldRoot);

  // ── 相机控制器 ──────────────────────────────────────────────
  const mapController = new PerspectiveMapController({
    center: { x: center.x, y: center.y },
    distance: 8000, // 初始高度 8km，看到约 10km 范围
    maxPolarAngle: Math.PI / 2.2, // GIS 约束：不允许低于地平线
    fov: 60,
    near: 10,
    far: 1e8,
  });
  const camera = mapController.camera;

  // 尺寸自适应
  function onResize() {
    const w = app.clientWidth || window.innerWidth;
    const h = app.clientHeight || window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / Math.max(h, 1);
    camera.updateProjectionMatrix();
  }
  new ResizeObserver(onResize).observe(app);
  onResize();

  // ── Layer 1: XYZ 底图（ArcGis 卫星影像）──────────────────────
  // XYZTileScheme 将 EPSG:3857 瓦片重投影到 CGCS2000 GK114
  // SubdividedPlane(4, true) 自适应细分：低 zoom 时网格更密，消除投影弯曲
  const xyzScheme = new XYZTileScheme(crs, 0, 18);
  const xyzSource = new XYZTileSource(
    "https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    { minZoom: 0, maxZoom: 18 },
  );
  const xyzRenderer = new RasterRenderer({
    name: "basemap-renderer",
    // 关键：启用自适应细分（adaptive=true）
    // CGCS2000 GK 与 Web Mercator 差异大，低缩放时瓦片投影后严重弯曲
    // 需要密集网格（zoom≤3 时 32×32）才能平滑跟随投影曲线
    quality: new SubdividedPlane(4, true),
  });

  const basemapLayer = new RasterLayer({
    name: "ArcGis 卫星底图",
    tileScheme: xyzScheme,
    dataSource: xyzSource,
    renderer: xyzRenderer,
    zIndex: 0,
  });

  // ── Layer 2: 矢量叠加（点/线/面）────────────────────────────
  const sampleGeoJSON = createSampleGeoJSON(crs);
  const geoBlob = new Blob([JSON.stringify(sampleGeoJSON)], {
    type: "application/json",
  });
  const geoURL = URL.createObjectURL(geoBlob);

  const vectorSource = new GeoJSONSource(geoURL, crs);
  const vectorScheme = new ProjectTileScheme(500); // 500m 分块
  const vectorMatFactory = new DefaultMaterialFactory({
    pointColor: 0xff4444, // 红色控制点
    lineColor: 0xffcc00, // 黄色道路
    fillColor: 0x00b4ff, // 蓝色建筑用地
  });
  const vectorRenderer = new VectorRenderer(vectorMatFactory, "cgcs-vector");

  const vectorLayer = new VectorLayer({
    name: "矢量叠加（点线面）",
    tileScheme: vectorScheme,
    dataSource: vectorSource,
    renderer: vectorRenderer,
    zIndex: 10,
  });

  // ── Tile 加载回调 ────────────────────────────────────────────
  const tileLoadFn: TileLoadCallback = async (tile, layer, signal) => {
    const source = layer.dataSource;
    const layerRenderer = layer.renderer;
    const data = await source.fetch(tile.key, tile.bounds, signal);
    if (signal.aborted) return null;
    if (Array.isArray(data) && data.length === 0) return null;
    return layerRenderer.createContent(data, tile);
  };

  // ── Engine ───────────────────────────────────────────────────
  const engine = new Engine({
    crs,
    container: app,
    tileLoadFn,
    groups: [
      {
        id: "default",
        name: "CGCS2000 Demo",
        visible: true,
        opacity: 1,
        layers: [basemapLayer, vectorLayer],
      },
    ],
    cameraController: mapController,
  });

  engine.start();

  // ── 场景同步 ─────────────────────────────────────────────────
  const sceneTiles = new Map<string, THREE.Group>();

  function forEachMaterial(
    group: THREE.Group,
    fn: (mat: THREE.Material) => void,
  ) {
    group.traverse((child) => {
      if (
        child instanceof THREE.Mesh ||
        child instanceof THREE.Line ||
        child instanceof THREE.Points
      ) {
        const mat = child.material as THREE.Material;
        if (mat && "opacity" in mat) fn(mat);
      }
    });
  }

  function syncScene() {
    const loaded = engine.tileManager.loadedTiles;
    const origin = engine.floatingOrigin.current;

    // Floating Origin 偏移
    worldRoot.position.set(-origin.x, -origin.y, 0);

    // 添加新 tile
    for (const [key, tile] of loaded) {
      if (sceneTiles.has(key)) continue;
      if (tile.contents.length === 0) continue;

      const group = new THREE.Group();
      let hasObjects = false;

      for (const content of tile.contents) {
        for (const ro of content.renderObjects) {
          if (ro.object instanceof THREE.Object3D) {
            group.add(ro.object);
            hasObjects = true;
          }
        }
      }

      if (!hasObjects) continue;

      group.position.set(tile.origin.x, tile.origin.y, 0);
      worldRoot.add(group);
      sceneTiles.set(key, group);

      // 淡入动画
      forEachMaterial(group, (mat) => {
        (mat as any).__targetOpacity = mat.opacity;
        mat.transparent = true;
        mat.opacity = 0;
      });
      (group as any).__fadeContent = tile.contents[0];
    }

    // 移除淘汰的 tile（释放 GPU 资源）
    for (const [key, group] of sceneTiles) {
      if (!loaded.has(key)) {
        group.traverse((child) => {
          if (
            child instanceof THREE.Mesh ||
            child instanceof THREE.Line ||
            child instanceof THREE.Points
          ) {
            child.geometry?.dispose();
            const mat = child.material as THREE.Material | THREE.Material[];
            if (Array.isArray(mat)) {
              for (const m of mat) {
                if ("map" in m && (m as any).map) (m as any).map.dispose();
                m.dispose();
              }
            } else if (mat) {
              if ("map" in mat && (mat as any).map) (mat as any).map.dispose();
              mat.dispose();
            }
          }
        });
        worldRoot.remove(group);
        sceneTiles.delete(key);
      }
    }
  }

  // ── 渲染循环 ─────────────────────────────────────────────────
  const fpsEl = document.getElementById("fps-value")!;
  const frameTimeEl = document.getElementById("frame-time")!;
  let fpsFrames = 0;
  let fpsLastTime = performance.now();

  function render() {
    // FPS 统计
    fpsFrames++;
    const fpsNow = performance.now();
    const fpsElapsed = fpsNow - fpsLastTime;
    if (fpsElapsed >= 500) {
      const fps = (fpsFrames * 1000) / fpsElapsed;
      const frameMs = fpsElapsed / fpsFrames;
      fpsEl.textContent = fps.toFixed(0);
      fpsEl.style.color = fps >= 50 ? "#7CFC00" : fps >= 30 ? "#FFD700" : "#FF6B6B";
      frameTimeEl.textContent = `(${frameMs.toFixed(1)} ms/帧)`;
      fpsFrames = 0;
      fpsLastTime = fpsNow;
    }

    // 同步瓦片
    syncScene();

    // 渲染（相机临时偏移到局部坐标）
    const origin = engine.floatingOrigin.current;
    camera.position.x -= origin.x;
    camera.position.y -= origin.y;
    renderer.render(scene, camera);
    camera.position.x += origin.x;
    camera.position.y += origin.y;

    // 淡入动画 (300ms)
    const FADE_DURATION = 300;
    const now = performance.now();
    for (const [, group] of sceneTiles) {
      const content = (group as any).__fadeContent;
      if (!content) continue;
      const elapsed = now - content.createdAt;
      const done = elapsed >= FADE_DURATION;
      const progress = done ? 1 : Math.min(1, elapsed / FADE_DURATION);

      forEachMaterial(group, (mat) => {
        const target: number = (mat as any).__targetOpacity ?? 1;
        mat.opacity = target * progress;
        if (done) {
          mat.opacity = target;
          mat.transparent = target < 1;
          delete (mat as any).__targetOpacity;
        }
      });

      if (done) delete (group as any).__fadeContent;
    }

    // HUD
    updateHUD(
      crs.name,
      mapController.controls.target.x,
      mapController.controls.target.y,
      mapController.resolution,
      engine.tileManager.loadedTiles.size,
      engine.tileManager.scheduler.queueLength,
      engine.tileManager.scheduler.loadingCount,
    );

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

main();
