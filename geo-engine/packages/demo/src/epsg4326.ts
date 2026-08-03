/**
 * GeoEngine Demo — EPSG:4326 经纬度坐标系（WGS84 地理坐标）
 *
 * 演示：
 *   1. EPSG:4326 作为工程坐标系：单位 = 度，project/unproject 恒等（lon/lat ↔ x/y）
 *   2. XYZ 在线底图（OSM 街图，3857 分块）通过 XYZTileScheme 重投影到经纬度空间
 *   3. 矢量叠加：点（兴趣点）、线（道路）、面（建筑）—— 坐标直接是经纬度（度）
 *   4. 透视相机 + OrbitControls（GIS 约束：不允许低于地平线）
 *
 * 坐标说明：
 *   EPSG:4326 坐标单位为度：
 *   - x: 经度，西经负、东经正（-180 ~ 180）
 *   - y: 纬度，南纬负、北纬正（-90 ~ 90）
 *
 * 示例位置：北京市（经度 ≈ 116.397°，纬度 ≈ 39.909°）
 */

import * as THREE from "three";
import {
  Engine,
  CustomCRS,
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
// EPSG:4326 经纬度 CRS：单位 = 度，project/unproject 恒等
//   project(lon, lat)  → { x: lon, y: lat }
//   unproject(x, y)    → { lon: x, lat: y }
// ═══════════════════════════════════════════════════════════════
const crs = new CustomCRS("EPSG:4326", "degree", {
  project: (lon, lat) => ({ x: lon, y: lat }),
  unproject: (x, y) => ({ lon: x, lat: y }),
});

// ═══════════════════════════════════════════════════════════════
// 示例矢量数据 — 经纬度坐标（单位：度），以北京市为中心
// ═══════════════════════════════════════════════════════════════

function createSampleGeoJSON(crs: IProjectCRS) {
  // 用 CRS 的 project 方法将经纬度转为平面坐标（4326 下即经纬度本身）
  const p = (lon: number, lat: number) => {
    const { x, y } = crs.project(lon, lat);
    return [Math.round(x * 100000) / 100000, Math.round(y * 100000) / 100000];
  };

  return {
    type: "FeatureCollection",
    features: [
      // ── 兴趣点（Point）──
      {
        type: "Feature",
        geometry: { type: "Point", coordinates: p(116.397, 39.909) },
        properties: { name: "天安门", type: "landmark" },
      },
      {
        type: "Feature",
        geometry: { type: "Point", coordinates: p(116.391, 39.906) },
        properties: { name: "前门", type: "landmark" },
      },
      {
        type: "Feature",
        geometry: { type: "Point", coordinates: p(116.403, 39.924) },
        properties: { name: "景山公园", type: "park" },
      },
      {
        type: "Feature",
        geometry: { type: "Point", coordinates: p(116.413, 39.871) },
        properties: { name: "永定门", type: "landmark" },
      },

      // ── 道路（LineString）──
      {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: [
            p(116.36, 39.915),
            p(116.375, 39.912),
            p(116.397, 39.909),
            p(116.42, 39.905),
            p(116.44, 39.902),
          ],
        },
        properties: { name: "长安街", highway: "primary", width: 60 },
      },
      {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: [
            p(116.397, 39.88),
            p(116.397, 39.895),
            p(116.397, 39.909),
            p(116.397, 39.925),
            p(116.397, 39.94),
          ],
        },
        properties: { name: "中轴线", highway: "secondary", width: 40 },
      },
      {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: [
            p(116.35, 39.89),
            p(116.365, 39.90),
            p(116.38, 39.91),
            p(116.395, 39.92),
            p(116.41, 39.93),
          ],
        },
        properties: { name: "北二环", highway: "tertiary", width: 30 },
      },
      // 二环环路（近似闭合）
      {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: [
            p(116.36, 39.93),
            p(116.38, 39.945),
            p(116.41, 39.945),
            p(116.43, 39.93),
            p(116.435, 39.905),
            p(116.43, 39.88),
            p(116.41, 39.865),
            p(116.38, 39.865),
            p(116.36, 39.88),
            p(116.355, 39.905),
            p(116.36, 39.93),
          ],
        },
        properties: { name: "二环路", highway: "ring", width: 35 },
      },

      // ── 建筑（Polygon）──
      {
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              p(116.391, 39.907),
              p(116.399, 39.907),
              p(116.399, 39.912),
              p(116.391, 39.912),
              p(116.391, 39.907),
            ],
          ],
        },
        properties: { name: "天安门广场", landuse: "plaza" },
      },
      {
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              p(116.40, 39.915),
              p(116.406, 39.915),
              p(116.406, 39.920),
              p(116.40, 39.920),
              p(116.40, 39.915),
            ],
          ],
        },
        properties: { name: "故宫博物院", landuse: "historic" },
      },
      {
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              p(116.375, 39.90),
              p(116.385, 39.90),
              p(116.385, 39.905),
              p(116.375, 39.905),
              p(116.375, 39.90),
            ],
          ],
        },
        properties: { name: "金融街地块", landuse: "commercial" },
      },
      {
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              p(116.42, 39.925),
              p(116.428, 39.925),
              p(116.428, 39.932),
              p(116.42, 39.932),
              p(116.42, 39.925),
            ],
            // 内院（洞）
            [
              p(116.422, 39.927),
              p(116.426, 39.927),
              p(116.426, 39.930),
              p(116.422, 39.930),
              p(116.422, 39.927),
            ],
          ],
        },
        properties: { name: "科技园区（带内院）", landuse: "industrial" },
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
  el("crs-pos").textContent = `(${x.toFixed(5)}°, ${y.toFixed(5)}°)`;
  el("crs-zoom").textContent = `${resolution.toFixed(6)} °/px`;
  el("tile-count").textContent = `${tileCount}`;
  el("scheduler-stats").textContent = `${queueLen} 排队 / ${loadingCount} 加载中`;
}

// ═══════════════════════════════════════════════════════════════
// Main
// ═══════════════════════════════════════════════════════════════

async function main() {
  // 计算地图中心（北京市：经度 116.397，纬度 39.909 → 4326 平面坐标即度数本身）
  const center = crs.project(116.397, 39.909);

  const app = document.getElementById("app")!;

  // ── Three.js 渲染器 ──────────────────────────────────────────
  // 低填充率配置：瓦片纹理仅 256px、场景为扁平地图，无需 MSAA / 对数深度缓冲。
  // MSAA(4×) + log-depth(禁用 early-Z) + DoubleSide 叠加会把填充率推上悬崖（10-30 FPS）。
  const MAX_PIXEL_RATIO = 1.5; // 过高 DPR 只烧填充率，画面无增益（瓦片纹理 256px）
  const renderer = new THREE.WebGLRenderer({
    antialias: false, // 关闭 MSAA（填充率 ×4 的元凶）
    logarithmicDepthBuffer: false, // 恢复 early-Z；深度精度由 render() 中自适应 near/far 保证
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, MAX_PIXEL_RATIO));
  renderer.setClearColor(0x0d1b2a);
  app.appendChild(renderer.domElement);

  const scene = new THREE.Scene();

  // World 根节点 — Floating Origin 偏移锚点（设计文档 §7.2）
  const worldRoot = new THREE.Group();
  scene.add(worldRoot);

  // ── 相机控制器 ──────────────────────────────────────────────
  // 注意：EPSG:4326 单位是「度」，所有相机距离参数都以度计：
  //   distance = 0.4° ≈ 44km 视高（恢复默认视角；OSM 矢量底图无数据缝）
  //   near/far 上下限也按度缩放到合理量级（世界范围 ≈ 360°）。
  const mapController = new PerspectiveMapController({
    center: { x: center.x, y: center.y },
    distance: 0.4, // 初始高度 0.4°（≈44km，恢复默认视角）
    maxPolarAngle: Math.PI / 2.2, // GIS 约束：不允许低于地平线
    fov: 60,
    near: 1e-5,
    far: 360,
  });
  const camera = mapController.camera;

  // 度数坐标系：重设轨道控制器缩放上下限。
  // 控制器默认按「米制」世界给 minDistance=100 / maxDistance=5e7，
  // 在度单位下会把缩放锁死在 100°（≈ 全球视角），无法靠近。
  mapController.controls.minDistance = 0.0002; // ≈ 22m
  mapController.controls.maxDistance = 200; // 略大于全球（360°）

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

  // ── Layer 1: XYZ 底图（OSM 街图）──────────────────────────────
  // XYZTileScheme 将 EPSG:3857 瓦片重投影到 EPSG:4326 经纬度空间
  // SubdividedPlane(4, true) 自适应细分：低 zoom 时网格更密，消除投影弯曲
  const xyzScheme = new XYZTileScheme(crs, 0, 18);
  const xyzSource = new XYZTileSource(
    "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    { minZoom: 0, maxZoom: 18 },
  );
  const xyzRenderer = new RasterRenderer({
    name: "basemap-renderer",
    // 关键：启用自适应细分（adaptive=true）
    // 3857 与 4326 经纬度空间差异明显，低缩放时瓦片投影后弯曲
    // 需要密集网格（zoom≤3 时 32×32）才能平滑跟随投影曲线
    quality: new SubdividedPlane(4, true),
  });

  const basemapLayer = new RasterLayer({
    name: "OSM 街图底图",
    tileScheme: xyzScheme,
    dataSource: xyzSource,
    renderer: xyzRenderer,
    zIndex: 0,
  });

  // ── Layer 2: 矢量叠加（点/线/面，坐标 = 经纬度度值）──────────
  const sampleGeoJSON = createSampleGeoJSON(crs);
  const geoBlob = new Blob([JSON.stringify(sampleGeoJSON)], {
    type: "application/json",
  });
  const geoURL = URL.createObjectURL(geoBlob);

  const vectorSource = new GeoJSONSource(geoURL, crs);
  const vectorScheme = new ProjectTileScheme(0.02); // 0.02° ≈ 2.2km 分块
  const vectorMatFactory = new DefaultMaterialFactory({
    pointColor: 0xff4444, // 红色兴趣点
    lineColor: 0x00ff88, // 绿色道路
    fillColor: 0xffa500, // 橙色建筑
  });
  const vectorRenderer = new VectorRenderer(vectorMatFactory, "wgs84-vector");

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
        name: "EPSG:4326 Demo",
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

  // 已淘汰瓦片的淡出集合：key → { group, startTime }。
  // 淘汰时先淡出再移除，把「新旧级别瓦片硬切」变成软过渡，
  // 缓解缩放过程中粗粒度父瓦片与细粒度子瓦片拼接处内容对不上的观感。
  const fadeOuts = new Map<string, { group: THREE.Group; startTime: number }>();

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

  /** 从场景移除 group，但不释放其内 GPU 资源（设计文档 §15） */
  function disposeGroup(group: THREE.Group) {
    // 只做场景摘除。geometry/material/map 的生命周期归 TileManager 的 LRU cache：
    // 瓦片淡出通常并未从 cache 移除（cache 按字节预算独立于 _loadedTiles），
    // 回屏时直接复用 cache 里的 renderObject。若在这里 dispose geometry，
    // 回屏瓦片会用已释放的 geometry 渲染；dispose 共享材质（DefaultMaterialFactory
    // 的矢量材质被所有瓦片共用一个实例）会让其它所有瓦片立刻失效并触发全局重编译。
    worldRoot.remove(group);
  }

  function syncScene() {
    const loaded = engine.tileManager.loadedTiles;
    const origin = engine.floatingOrigin.current;

    // Floating Origin 偏移
    worldRoot.position.set(-origin.x, -origin.y, 0);

    // 添加新 tile / 补挂共享瓦片迟到的 content
    for (const [key, tile] of loaded) {
      // 原子 LOD：祖先更粗瓦片仍上屏时隐藏本瓦片（避免区域内 z/z-1 内容混杂 =
      // 瓦片错落的视觉根因）。祖先被淘汰后本瓦片自动恢复可见。
      if (engine.tileManager.isTileHidden(tile)) {
        const g = sceneTiles.get(key) ?? fadeOuts.get(key)?.group;
        sceneTiles.delete(key);
        fadeOuts.delete(key);
        if (g) disposeGroup(g);
        continue;
      }
      let existing = sceneTiles.get(key);
      if (!existing && fadeOuts.has(key)) {
        // 瓦片被淘汰后重新出现在视野内：取消淡出，恢复旧 group，
        // 避免「淡出中的旧 group」与「新创建的 group」同时渲染造成闪动。
        const fo = fadeOuts.get(key)!;
        fadeOuts.delete(key);
        forEachMaterial(fo.group, (mat) => {
          if ((mat as any).userData?.shared) return;
          if ("opacity" in mat) {
            const base: number =
              (mat as any).__baseOpacity ?? (mat as any).__targetOpacity ?? 1;
            mat.opacity = base;
            delete (mat as any).__fadeOutFrom;
          }
        });
        sceneTiles.set(key, fo.group);
        existing = fo.group;
        // 恢复后重新淡入，避免瞬间弹出
        (existing as any).__fadeStart = performance.now();
      }
      if (existing) {
        // 共享瓦片：其他 layer 后到的 content 需要补挂，否则该 layer 永远缺失
        const fading = (existing as any).__fadeStart != null;
        for (const content of tile.contents) {
          for (const ro of content.renderObjects) {
            if (ro.object instanceof THREE.Object3D && ro.object.parent == null) {
              existing.add(ro.object);
              if (fading) {
                // group 尚在淡入：新对象也随 group 一起淡入（避免整组重淡）。
                // 共享材质跳过（与组创建时的淡入起点逻辑一致，不参与淡入）。
                const obj = ro.object;
                if (
                  obj instanceof THREE.Mesh ||
                  obj instanceof THREE.Line ||
                  obj instanceof THREE.Points
                ) {
                  const mat = obj.material as THREE.Material;
                  if (mat && "opacity" in mat && !(mat as any).userData?.shared) {
                    (mat as any).__baseOpacity = mat.opacity;
                    (mat as any).__targetOpacity = mat.opacity;
                    mat.transparent = true;
                    mat.opacity = 0;
                  }
                }
              }
            }
          }
        }
        continue;
      }
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

      // 淡入动画：记录目标透明度后置 0。用「加入场景的时刻」而非 content.createdAt
      // —— createdAt 是加载开始时刻，慢速加载的瓦片出现时淡入期早已过去，会直接"弹出"。
      // 跳过共享材质（DefaultMaterialFactory 矢量材质被所有瓦片共用）：直接改它们
      // 会让整层一起闪动；纯矢量瓦片整组直接满透明度出现，不走淡入。
      let fadeable = false;
      forEachMaterial(group, (mat) => {
        if ((mat as any).userData?.shared) return;
        fadeable = true;
        (mat as any).__baseOpacity = mat.opacity; // 持久记录目标透明度（恢复/淡出用）
        (mat as any).__targetOpacity = mat.opacity;
        mat.transparent = true;
        mat.opacity = 0;
      });
      if (fadeable) (group as any).__fadeStart = performance.now();
    }

    // 移除淘汰的 tile：先淡出再移除（软过渡，避免新旧级别瓦片硬切）。
    // 纯矢量瓦片（全部共享材质）无可淡出材质 → 立即移除。共享材质无法单独淡出
    // （淡出它们会让整层闪动），屏幕边缘的矢量瓦片瞬时消失观感可接受。
    for (const [key, group] of sceneTiles) {
      if (!loaded.has(key)) {
        sceneTiles.delete(key);
        // 记录每个材质的当前透明度作为淡出起点
        let fadeable = false;
        forEachMaterial(group, (mat) => {
          if ((mat as any).userData?.shared) return;
          if ("opacity" in mat) {
            fadeable = true;
            (mat as any).__fadeOutFrom = mat.opacity;
            mat.transparent = true;
          }
        });
        if (fadeable) {
          fadeOuts.set(key, { group, startTime: performance.now() });
        } else {
          disposeGroup(group);
        }
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

    // 标准深度缓冲的自适应 near/far：near 随相机距离放大、far 随距离收窄，
    // 保证任意缩放级别下 z-buffer 不塌缩（替代对数深度缓冲）。
    // 需在相机位置从浮动原点偏移恢复后计算，距离才与 target 同坐标系。
    // 注意：这里是「度」单位 — 世界范围 ≈ 360°，上下限按度缩放到合理量级。
    const camDist = camera.position.distanceTo(mapController.controls.target);
    const near = Math.min(Math.max(camDist / 5000, 1e-5), 0.5);
    const far = Math.min(Math.max(camDist * 100, 0.5), 360);
    if (near !== camera.near || far !== camera.far) {
      camera.near = near;
      camera.far = far;
      camera.updateProjectionMatrix();
    }

    // 淡入动画 (300ms)
    const FADE_DURATION = 300;
    const FADE_OUT_DURATION = 400;
    const now = performance.now();
    for (const [, group] of sceneTiles) {
      const start: number | undefined = (group as any).__fadeStart;
      if (start == null) continue;
      const elapsed = now - start;
      const done = elapsed >= FADE_DURATION;
      const progress = done ? 1 : Math.min(1, elapsed / FADE_DURATION);

      forEachMaterial(group, (mat) => {
        if ((mat as any).userData?.shared) return;
        const base: number =
          (mat as any).__baseOpacity ?? (mat as any).__targetOpacity ?? 1;
        mat.opacity = base * progress;
        if (done) {
          mat.opacity = base;
          mat.transparent = base < 1;
          delete (mat as any).__targetOpacity;
        }
      });

      if (done) delete (group as any).__fadeStart;
    }

    // ── Fade-out animation (被淘汰的旧级别瓦片) ──────────────
    // 旧瓦片被淘汰时淡出再移除：粗粒度父瓦片淡出的同时细粒度子瓦片已淡入，
    // 让「路→田」的硬切变成一段平滑过渡，而不是瞬间替换。
    for (const [key, fo] of fadeOuts) {
      const elapsed = now - fo.startTime;
      const done = elapsed >= FADE_OUT_DURATION;
      const progress = done ? 1 : Math.min(1, elapsed / FADE_OUT_DURATION);

      forEachMaterial(fo.group, (mat) => {
        if ((mat as any).userData?.shared) return;
        if (!("opacity" in mat)) return;
        if (done) {
          // 淡出完成：必须恢复透明度，不能停在 0。
          // 材质可能是共享的（DefaultMaterialFactory 的矢量材质被所有瓦片共用），
          // 或该瓦片仍留在 LRU cache 中（淡出时瓦片通常未从 cache 移除）。
          // 停在 0 会让「共享同一材质的其它瓦片」以及「从 cache 回屏的瓦片」
          // 永久不可见且无法通过淡入恢复（淡入捕获到的 __baseOpacity 也是 0）。
          const base: number = (mat as any).__baseOpacity ?? 1;
          mat.opacity = base;
          mat.transparent = base < 1;
          delete (mat as any).__fadeOutFrom;
        } else {
          const from: number = (mat as any).__fadeOutFrom ?? 1;
          mat.transparent = true;
          mat.opacity = from * (1 - progress);
        }
      });

      if (done) {
        disposeGroup(fo.group);
        fadeOuts.delete(key);
      }
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
