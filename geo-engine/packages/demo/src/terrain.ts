/**
 * GeoEngine Demo — Mapbox 地形（terrain-rgb）+ XYZ 瓦片叠加显示
 *
 * 演示：
 *   1. Mapbox terrain-rgb 高程（每像素 RGB 编码，-10000 ~ 10000m）解码为
 *      N×N 网格并位移生成立体地形（SkirtedMesh + 裙边填充 LOD 裂缝）
 *   2. XYZ 底图（OSM / ArcGIS 影像 / Mapbox 卫星）作为纹理精确贴合地形网格
 *      —— 影像「蒙」在立体山体上（每瓦片单 Mesh，零 z-fighting）
 *   3. 底图切换：引擎 replaceLayer + resetScheme（瞬时清空，不交叉淡入）
 *   4. Lambert 光照：方向光 + 环境光表现山体明暗（relief 可见）
 *
 * 坐标说明：
 *   EPSG:3857 坐标单位为米。中心取瑞士采尔马特（Zermatt）马特洪峰
 *   （7.655°E, 45.976°N）—— 强烈山地 relief 用于验证地形立体感。
 *
 * 注意：需在源码顶部 MAPBOX_TOKEN 填入真实 token（https://account.mapbox.com/），
 * 否则 terrain-rgb 请求 401，地形无法加载。
 */

import * as THREE from "three";
import {
  Engine,
  WebMercatorCRS,
  RasterLayer,
  XYZTileScheme,
  XYZTileSource,
  RGBTerrainSource,
  TerrainRenderer,
  PerspectiveMapController,
  tileKeyToString,
  type IDataSource,
  type TerrainOverlayData,
  type TileKey,
  type TileLoadCallback,
} from "@geo-engine/core";

// ═══════════════════════════════════════════════════════════════
// 底图配置
// ═══════════════════════════════════════════════════════════════

const MAPBOX_TOKEN = 'pk.eyJ1IjoidGJ1c2FuIiwiYSI6ImNtZjY2emZneDBkY24ybXB4cmpvdmwzNWYifQ.h6tcQ380WN5AW6fZr08how';

const BASEMAPS = {
  osm: {
    name: "OSM 街图",
    url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
  },
  "arcgis-img": {
    name: "ArcGIS 影像",
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
  },
  mapbox: {
    name: "Mapbox 卫星",
    url: `https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v12/tiles/256/{z}/{x}/{y}?access_token=${MAPBOX_TOKEN}`,
  },
} as const;
type BasemapKind = keyof typeof BASEMAPS;

// ═══════════════════════════════════════════════════════════════
// 组合数据源：terrain-rgb 高程 + XYZ 底图影像（并行获取）
// ═══════════════════════════════════════════════════════════════

/**
 * 地形叠加数据源 — 把 DEM 高程与底图影像组装成一个 TerrainOverlayData。
 *
 * 设计：与 three-tile `TileMapLoader`「geometry(demSource) + material(imgSource)
 * 合成一个 Mesh」一致 —— 单一 RasterLayer，dataSource 并行取两部分数据，
 * renderer（TerrainRenderer）把两者合成每瓦片一个位移网格。每瓦片单 Mesh
 * → 地形面与影像面完全共形，零 z-fighting。
 */
class TerrainOverlaySource implements IDataSource<TerrainOverlayData> {
  readonly dataType = "terrain-overlay";
  readonly crs;
  readonly bounds;

  constructor(
    private readonly dem: RGBTerrainSource,
    private readonly image: XYZTileSource,
  ) {
    // 字段初始化顺序：constructor 参数属性在类字段定义之后才赋值
    // （ES2022 useDefineForClassFields），不能在字段初始化器里引用 this.dem。
    this.crs = dem.crs;
    this.bounds = dem.bounds;
  }

  async fetch(
    key: TileKey,
    tileBounds: [number, number, number, number],
    signal?: AbortSignal,
  ): Promise<TerrainOverlayData> {
    const [d, img] = await Promise.all([
      this.dem.fetch(key, tileBounds, signal),
      this.image.fetch(key, tileBounds, signal),
    ]);
    return {
      width: d.width,
      height: d.height,
      elevations: d.elevations,
      image: img,
    };
  }

  dispose(data: TerrainOverlayData): void {
    // 引擎不会调用 dataSource.dispose（已 grep 验证）；此处为接口完整实现，
    // 尽力回收位图。TileManager LRU 淘汰时通过 renderer.disposeContent 释放纹理。
    data.image.close();
  }
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

  // 地图中心：瑞士采尔马特（马特洪峰，强烈山地 relief）
  const center = crs.project(7.655, 45.976);

  const app = document.getElementById("app")!;

  // ── 启动守卫：地形数据源必须真实 token ──────────────────────
  // terrain-rgb 请求带 access_token，空 token → HTTP 401 → 所有瓦片失败，
  // 地形网格无法生成。OSM/ArcGIS 底图不依赖 token（mapbox 底图依赖）。
  if (!MAPBOX_TOKEN) {
    alert("请先在源码顶部填 MAPBOX_TOKEN（https://account.mapbox.com/）");
  }

  // ── Three.js 渲染器 ──────────────────────────────────────────
  // 与 webmercator 相同：关闭 MSAA + 禁用 log-depth（恢复 early-Z）。
  // 地形面彼此不共面（DEM 位移），裙边填充 LOD 裂缝 → 无需深度偏移/log-depth。
  const MAX_PIXEL_RATIO = 1.5;
  const renderer = new THREE.WebGLRenderer({
    antialias: false,
    logarithmicDepthBuffer: false,
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, MAX_PIXEL_RATIO));
  renderer.setClearColor(0x0d1b2a);
  app.appendChild(renderer.domElement);

  const scene = new THREE.Scene();

  // World 根节点 — Floating Origin 偏移锚点
  const worldRoot = new THREE.Group();
  scene.add(worldRoot);

  // ── 灯光：Lambert 材质表现山体明暗（relief 可见）────────────
  // 方向光/环境光不随位置变化，放在 worldRoot 外（场景根）即可，
  // 与浮点原点偏移（每帧平移 worldRoot）无关。
  scene.add(new THREE.AmbientLight(0xffffff, 0.6));
  const sun = new THREE.DirectionalLight(0xffffff, 0.85);
  sun.position.set(1, -0.6, 0.8); // 从东北上方斜照，突出山谷/山脊明暗
  scene.add(sun);

  // ── 相机控制器 ──────────────────────────────────────────────
  // 斜视角（俯仰角 60°）看马特洪峰：山体高度 ~4.5km、距离 9km。
  // initialPolarAngle = π/3（与垂直 +Z 夹角），相机在 target 正南俯视北向。
  const mapController = new PerspectiveMapController({
    center: { x: center.x, y: center.y },
    distance: 9000,
    initialPolarAngle: Math.PI / 3,
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

  // ── 单一地形层（RasterLayer）────────────────────────────────
  // 地形 scheme：maxZoom 取 terrain-rgb 上限 14（底图可达 18，scheme 封顶）。
  // 每瓦片一个 TerrainOverlaySource（并行取 DEM + 当前底图影像）。
  const demSource = new RGBTerrainSource(
    "https://api.mapbox.com/v4/mapbox.terrain-rgb/{z}/{x}/{y}.pngraw?access_token=" +
      MAPBOX_TOKEN,
    { minZoom: 0, maxZoom: 14 },
  );
  const terrainScheme = new XYZTileScheme(crs, 0, 14);
  const terrainRenderer = new TerrainRenderer({ skirtHeight: 600 });

  function makeTerrainLayer(kind: BasemapKind): RasterLayer {
    return new RasterLayer({
      id: "terrain", // id 固定；底图种类用 currentKind 单独跟踪
      name: `${BASEMAPS[kind].name} + 地形`,
      tileScheme: terrainScheme,
      dataSource: new TerrainOverlaySource(
        demSource,
        new XYZTileSource(BASEMAPS[kind].url, { minZoom: 0, maxZoom: 18 }),
      ),
      renderer: terrainRenderer, // 共享渲染器（无共享几何，纯逻辑）
      zIndex: 0,
    });
  }

  let currentKind: BasemapKind = "osm";
  let currentTerrainLayer = makeTerrainLayer("osm");

  // ── Tile 加载回调 ────────────────────────────────────────────
  const tileLoadFn: TileLoadCallback = async (tile, layer, signal) => {
    const source = layer.dataSource;
    const layerRenderer = layer.renderer;
    const data = await source.fetch(tile.key, tile.bounds, signal);
    if (signal.aborted) return null;
    if (Array.isArray(data) && data.length === 0) return null;
    // 必须传 layer.id：TileManager 按 content.layerId === layer.id 判断
    // 「该 layer 的 content 是否已存在」（缓存命中 / pendingLayerIds）。
    // 不传时 TerrainRenderer 默认成 "terrain-layer"，与真实 id "terrain"
    // 永不匹配 → 每次视野变化都重新 fetch + 重新创建 content（纹理/材质泄漏）。
    return layerRenderer.createContent(data, tile, layer.id);
  };

  // ── Engine ───────────────────────────────────────────────────
  const engine = new Engine({
    crs,
    container: app,
    tileLoadFn,
    groups: [
      {
        id: "default",
        name: "Terrain Demo",
        visible: true,
        opacity: 1,
        layers: [currentTerrainLayer],
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

  /** 从场景移除 group，但不释放其内 GPU 资源（生命周期归 TileManager LRU） */
  function disposeGroup(group: THREE.Group) {
    worldRoot.remove(group);
  }

  /**
   * 切换底图：瞬时清空旧底图瓦片后替换 layer（零重叠，不交叉淡入）。
   * 引擎 replaceLayer 会 resetScheme("xyz")：abort 在途加载、清空旧源缓存并
   * 丢弃旧代完成回调（代际守卫），旧底图瓦片不会回插。id 固定 "terrain"，
   * 用 currentKind 记录当前底图种类。
   */
  function switchBasemap(kind: BasemapKind) {
    if (kind === currentKind) return;
    if (kind === "mapbox" && !MAPBOX_TOKEN) {
      alert("请先在源码顶部填 MAPBOX_TOKEN（https://account.mapbox.com/）");
      return;
    }
    const next = makeTerrainLayer(kind);
    // 瞬时清空旧底图瓦片（key 前缀 "xyz:" 只命中本层）
    for (const [key, group] of sceneTiles) {
      if (key.startsWith("xyz:")) {
        disposeGroup(group);
        sceneTiles.delete(key);
      }
    }
    // render-on-demand：旧底图已摘除，新瓦片尚未加载 → 强制重绘一帧清空画面
    needsRender = true;
    engine.replaceLayer("terrain", next);
    currentTerrainLayer = next;
    currentKind = kind;
    document.querySelectorAll("#basemap-switcher button").forEach((btn) => {
      const el = btn as HTMLElement;
      el.classList.toggle("active", el.dataset.kind === kind);
    });
  }

  function syncScene(): boolean {
    let changed = false;
    const loaded = engine.tileManager.loadedTiles;
    const origin = engine.floatingOrigin.current;

    // LOD 切换：本次同步中被 TileManager 淘汰的旧级别瓦片 key
    const evictedKeys = new Set<string>();
    for (const key of sceneTiles.keys()) {
      if (!loaded.has(key)) evictedKeys.add(key);
    }

    // Floating Origin 偏移
    worldRoot.position.set(-origin.x, -origin.y, 0);

    // 添加新 tile / 补挂共享瓦片迟到的 content
    for (const [key, tile] of loaded) {
      // 原子 LOD：祖先更粗瓦片仍上屏时隐藏本瓦片
      if (engine.tileManager.isTileHidden(tile)) {
        const g = sceneTiles.get(key);
        sceneTiles.delete(key);
        if (g) {
          disposeGroup(g);
          changed = true;
        }
        continue;
      }
      const existing = sceneTiles.get(key);
      if (existing) {
        // 迟到的 content 补挂
        const fading = (existing as any).__fadeStart != null;
        for (const content of tile.contents) {
          for (const ro of content.renderObjects) {
            if (ro.object instanceof THREE.Object3D && ro.object.parent == null) {
              existing.add(ro.object);
              changed = true;
              if (fading) {
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
      changed = true;

      // LOD 替换瓦片检测：满透明度瞬时上屏（跳过淡入），避免半透明新瓦片
      // 叠在残留旧级别父瓦片上 → 条纹/莫尔纹。
      let replacesEvicted = false;
      const scheme = tile.scheme;
      if (scheme) {
        // ① 缩近：本瓦片是某刚淘汰祖先的细化子瓦片
        let parent: TileKey | null = scheme.getParentKey(tile.key);
        while (parent) {
          if (evictedKeys.has(tileKeyToString(parent))) {
            replacesEvicted = true;
            break;
          }
          parent = scheme.getParentKey(parent);
        }
        // ② 缩远：本瓦片是刚淘汰的 4 个直接子瓦片的父瓦片（全部本次被淘汰）
        if (!replacesEvicted) {
          const children = scheme.getChildKeys(tile.key);
          if (
            children.length > 0 &&
            children.every((c) => evictedKeys.has(tileKeyToString(c)))
          ) {
            replacesEvicted = true;
          }
        }
      }

      // 淡入动画（平移进入的新区域）—— 按「加入场景的时刻」计，非 createdAt
      let fadeable = false;
      forEachMaterial(group, (mat) => {
        if ((mat as any).userData?.shared) return;
        if (replacesEvicted) return;
        fadeable = true;
        (mat as any).__baseOpacity = mat.opacity;
        (mat as any).__targetOpacity = mat.opacity;
        mat.transparent = true;
        mat.opacity = 0;
      });
      if (fadeable) (group as any).__fadeStart = performance.now();
    }

    // 移除淘汰的 tile：瞬时原子切换（零重叠）
    for (const [key, group] of sceneTiles) {
      if (!loaded.has(key)) {
        sceneTiles.delete(key);
        disposeGroup(group);
        changed = true;
      }
    }

    return changed;
  }

  // ── 渲染循环 ─────────────────────────────────────────────────
  const fpsEl = document.getElementById("fps-value")!;
  const frameTimeEl = document.getElementById("frame-time")!;
  let fpsFrames = 0;
  let fpsLastTime = performance.now();
  let lastSyncTs = 0;
  let lastCamPos = { x: 0, y: 0, z: 0 };
  let needsRender = true;
  let lastRenderTs = performance.now();

  function render() {
    const now = performance.now();

    // 1. 同步瓦片：100ms 节流（与引擎 UPDATE_INTERVAL_MS 对齐）
    if (now - lastSyncTs >= 100) {
      lastSyncTs = now;
      if (syncScene()) needsRender = true;
    }

    // 2. 相机移动检测 + 自适应 near/far。
    //    地形 DEM 位移（Z 可达数千米），near 用更小的比例（camDist/3000）
    //    避免近景山体被近平面裁剪；far 同 webmercator。
    const camDist = camera.position.distanceTo(mapController.controls.target);
    const near = Math.min(Math.max(camDist / 3000, 5), 1e5);
    const far = Math.min(Math.max(camDist * 100, 5e5), 1e8);
    if (near !== camera.near || far !== camera.far) {
      camera.near = near;
      camera.far = far;
      camera.updateProjectionMatrix();
    }

    const ddx = camera.position.x - lastCamPos.x;
    const ddy = camera.position.y - lastCamPos.y;
    const camMoved =
      Math.abs(ddx) > camDist * 0.0005 || Math.abs(ddy) > camDist * 0.0005;
    const cameraChanged = Math.abs(ddx) > 0.01 || Math.abs(ddy) > 0.01;
    lastCamPos.x = camera.position.x;
    lastCamPos.y = camera.position.y;
    lastCamPos.z = camera.position.z;
    if (cameraChanged) needsRender = true;

    // 3. 淡入动画 (300ms)
    const FADE_DURATION = 300;
    let fadeActive = false;
    for (const [, group] of sceneTiles) {
      const start: number | undefined = (group as any).__fadeStart;
      if (start == null) continue;
      fadeActive = true;
      const elapsed = now - start;
      const done = elapsed >= FADE_DURATION || camMoved;
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
    if (fadeActive) needsRender = true;

    // 4. 实际绘制（dirty 驱动）：worldRoot 与相机同帧使用同一 origin（F1 防抖）
    if (needsRender) {
      const origin = engine.floatingOrigin.current;
      camera.position.x -= origin.x;
      camera.position.y -= origin.y;
      worldRoot.position.set(-origin.x, -origin.y, 0);
      renderer.render(scene, camera);
      camera.position.x += origin.x;
      camera.position.y += origin.y;
      needsRender = false;
      lastRenderTs = performance.now();
      fpsFrames++;
    }

    // 5. FPS 统计 + HUD（500ms）
    const fpsNow = performance.now();
    const fpsElapsed = fpsNow - fpsLastTime;
    if (fpsElapsed >= 500) {
      const idle = fpsNow - lastRenderTs > 500;
      if (idle) {
        fpsEl.textContent = "idle";
        fpsEl.style.color = "#888888";
        frameTimeEl.textContent = "";
      } else {
        const fps = (fpsFrames * 1000) / fpsElapsed;
        const frameMs = fpsElapsed / Math.max(fpsFrames, 1);
        fpsEl.textContent = fps.toFixed(0);
        fpsEl.style.color = fps >= 50 ? "#7CFC00" : fps >= 30 ? "#FFD700" : "#FF6B6B";
        frameTimeEl.textContent = `(${frameMs.toFixed(1)} ms/帧)`;
      }
      updateHUD(
        crs.name,
        mapController.controls.target.x,
        mapController.controls.target.y,
        mapController.resolution,
        engine.tileManager.loadedTiles.size,
        engine.tileManager.scheduler.queueLength,
        engine.tileManager.scheduler.loadingCount,
      );
      fpsFrames = 0;
      fpsLastTime = fpsNow;
    }

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);

  // 底图切换按钮
  document.querySelectorAll("#basemap-switcher button").forEach((btn) => {
    btn.addEventListener("click", () => {
      const el = btn as HTMLElement;
      switchBasemap(el.dataset.kind as BasemapKind);
    });
  });
}

main();
