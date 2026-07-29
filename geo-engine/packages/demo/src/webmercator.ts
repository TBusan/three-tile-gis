/**
 * GeoEngine Demo — EPSG:3857 Web Mercator + XYZ 底图 + 矢量叠加
 *
 * 演示：
 *   1. EPSG:3857 Web Mercator 坐标系（XYZ 底图原生投影，无重投影变形）
 *   2. ArcGis World_Imagery 卫星影像底图
 *   3. 矢量叠加：点（兴趣点）、线（道路）、面（建筑物）
 *   4. 透视相机 + OrbitControls（GIS 约束）
 *   5. 自适应细分网格 + 对数深度缓冲
 *
 * 坐标说明：
 *   EPSG:3857 坐标单位为米：
 *   - x: 东向，范围 [-20037508, 20037508]
 *   - y: 北向，范围 [-20037508, 20037508]
 *   - 北京（116.4°E, 39.9°N）→ x ≈ 12958137, y ≈ 4852832
 *
 * 示例数据位于北京市中心附近（故宫/长安街一带）
 */

import * as THREE from "three";
import {
  Engine,
  WebMercatorCRS,
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
  type IProjectCRS,
  type TileLoadCallback,
} from "@geo-engine/core";

// ═══════════════════════════════════════════════════════════════
// 示例矢量数据 — EPSG:3857 坐标（单位：米）
//
// 位置：北京市中心
//   经度 ≈ 116.38°~116.42° → x ≈ 12955000~12960000
//   纬度 ≈ 39.90°~39.93° → y ≈ 4851000~4855000
//
// 使用 crs.project(lon, lat) 将经纬度精确转为 3857 平面坐标
// ═══════════════════════════════════════════════════════════════

function createSampleGeoJSON(crs: IProjectCRS) {
  // 经纬度 → EPSG:3857 平面坐标
  const p = (lon: number, lat: number) => {
    const { x, y } = crs.project(lon, lat);
    return [Math.round(x * 10) / 10, Math.round(y * 10) / 10];
  };

  return {
    type: "FeatureCollection",
    features: [
      // ── 兴趣点（Point）──
      {
        type: "Feature",
        geometry: { type: "Point", coordinates: p(116.397, 39.909) },
        properties: { name: "故宫博物院", type: "landmark" },
      },
      {
        type: "Feature",
        geometry: { type: "Point", coordinates: p(116.387, 39.907) },
        properties: { name: "人民大会堂", type: "government" },
      },
      {
        type: "Feature",
        geometry: { type: "Point", coordinates: p(116.403, 39.914) },
        properties: { name: "景山公园", type: "park" },
      },
      {
        type: "Feature",
        geometry: { type: "Point", coordinates: p(116.41, 39.905) },
        properties: { name: "王府井", type: "commercial" },
      },
      {
        type: "Feature",
        geometry: { type: "Point", coordinates: p(116.38, 39.915) },
        properties: { name: "北海公园", type: "park" },
      },

      // ── 道路（LineString）──
      // 长安街（东西向主干道）
      {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: [
            p(116.37, 39.907),
            p(116.38, 39.907),
            p(116.39, 39.907),
            p(116.40, 39.907),
            p(116.41, 39.907),
            p(116.42, 39.907),
          ],
        },
        properties: { name: "长安街", highway: "primary", lanes: 8 },
      },
      // 中轴线（南北向）
      {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: [
            p(116.397, 39.895),
            p(116.397, 39.903),
            p(116.397, 39.909),
            p(116.397, 39.915),
            p(116.397, 39.922),
          ],
        },
        properties: { name: "中轴线", highway: "primary", lanes: 6 },
      },
      // 二环路（北段弧形）
      {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: [
            p(116.37, 39.92),
            p(116.38, 39.925),
            p(116.39, 39.928),
            p(116.40, 39.928),
            p(116.41, 39.925),
            p(116.42, 39.92),
          ],
        },
        properties: { name: "北二环", highway: "trunk", lanes: 6 },
      },
      // 王府井大街（南北向）
      {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: [
            p(116.41, 39.90),
            p(116.41, 39.905),
            p(116.41, 39.91),
            p(116.41, 39.915),
          ],
        },
        properties: { name: "王府井大街", highway: "secondary", lanes: 4 },
      },
      // 文津街（东西向）
      {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: [
            p(116.38, 39.915),
            p(116.39, 39.915),
            p(116.40, 39.915),
            p(116.41, 39.915),
          ],
        },
        properties: { name: "文津街", highway: "tertiary", lanes: 2 },
      },

      // ── 建筑物（Polygon）──
      // 故宫（大型矩形）
      {
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              p(116.391, 39.906),
              p(116.403, 39.906),
              p(116.403, 39.913),
              p(116.391, 39.913),
              p(116.391, 39.906),
            ],
          ],
        },
        properties: { name: "故宫", building: "palace", height: 35 },
      },
      // 人民大会堂
      {
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              p(116.385, 39.905),
              p(116.389, 39.905),
              p(116.389, 39.909),
              p(116.385, 39.909),
              p(116.385, 39.905),
            ],
          ],
        },
        properties: { name: "人民大会堂", building: "government", height: 40 },
      },
      // 国家博物馆
      {
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              p(116.399, 39.903),
              p(116.404, 39.903),
              p(116.404, 39.907),
              p(116.399, 39.907),
              p(116.399, 39.903),
            ],
          ],
        },
        properties: { name: "国家博物馆", building: "museum", height: 30 },
      },
      // 北海公园（带内湖洞的不规则多边形）
      {
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              p(116.378, 39.912),
              p(116.384, 39.912),
              p(116.385, 39.916),
              p(116.383, 39.92),
              p(116.379, 39.92),
              p(116.377, 39.916),
              p(116.378, 39.912),
            ],
            // 北海（内湖 = 洞）
            [
              p(116.38, 39.914),
              p(116.383, 39.914),
              p(116.383, 39.918),
              p(116.38, 39.918),
              p(116.38, 39.914),
            ],
          ],
        },
        properties: { name: "北海公园", building: "park", height: 0 },
      },
      // 商业建筑群（王府井附近）
      {
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              p(116.408, 39.904),
              p(116.412, 39.904),
              p(116.412, 39.907),
              p(116.408, 39.907),
              p(116.408, 39.904),
            ],
          ],
        },
        properties: { name: "王府井商业区", building: "commercial", height: 80 },
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
  el("crs-pos").textContent = `(${x.toFixed(0)}, ${y.toFixed(0)}) m`;
  el("crs-zoom").textContent = `${resolution.toFixed(2)} m/px`;
  el("tile-count").textContent = `${tileCount}`;
  el("scheduler-stats").textContent = `${queueLen} 排队 / ${loadingCount} 加载中`;
}

// ═══════════════════════════════════════════════════════════════
// Main
// ═══════════════════════════════════════════════════════════════

async function main() {
  // ── CRS：EPSG:3857 Web Mercator ──────────────────────────────
  const crs = new WebMercatorCRS();

  // 地图中心：北京市中心（故宫附近）
  const center = crs.project(116.397, 39.909);

  const app = document.getElementById("app")!;

  // ── Three.js 渲染器 ──────────────────────────────────────────
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    logarithmicDepthBuffer: true,
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x0d1b2a);
  app.appendChild(renderer.domElement);

  const scene = new THREE.Scene();

  // World 根节点 — Floating Origin 偏移锚点
  const worldRoot = new THREE.Group();
  scene.add(worldRoot);

  // ── 相机控制器 ──────────────────────────────────────────────
  const mapController = new PerspectiveMapController({
    center: { x: center.x, y: center.y },
    distance: 6000, // 初始高度 6km
    maxPolarAngle: Math.PI / 2.2,
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
  // 底图与引擎同为 EPSG:3857，无重投影变形
  const xyzScheme = new XYZTileScheme(crs, 0, 18);
  const xyzSource = new XYZTileSource(
    "https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    { minZoom: 0, maxZoom: 18 },
  );
  const xyzRenderer = new RasterRenderer({
    name: "basemap-renderer",
    // 3857 → 3857 无畸变，但启用自适应以支持缩放级别切换时的平滑过渡
    quality: new SubdividedPlane(2, true),
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
    pointColor: 0xff4444, // 红色兴趣点
    lineColor: 0x00ff88, // 绿色道路
    fillColor: 0xffa500, // 橙色建筑
  });
  const vectorRenderer = new VectorRenderer(vectorMatFactory, "wm-vector");

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
        name: "WebMercator Demo",
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
