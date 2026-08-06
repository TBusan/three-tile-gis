/**
 * GeoEngine Demo — EPSG:3857 Web Mercator + XYZ 底图 + 矢量叠加
 *
 * 演示：
 *   1. EPSG:3857 Web Mercator 坐标系（XYZ 底图原生投影，无重投影变形）
 *   2. OSM 街图底图（矢量渲染、无影像拼接缝）
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
  PickingManager,
  tileKeyToString,
  type IProjectCRS,
  type TileKey,
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

  // World 根节点 — Floating Origin 偏移锚点
  const worldRoot = new THREE.Group();
  scene.add(worldRoot);

  // ── 相机控制器 ──────────────────────────────────────────────
  const mapController = new PerspectiveMapController({
    center: { x: center.x, y: center.y },
    distance: 6000, // 初始高度 6km（恢复默认视角；OSM 矢量底图 z14 无数据缝）
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

  // ── Layer 1: XYZ 底图（OSM / ArcGIS / Mapbox）────────────────
  // 底图与引擎同为 EPSG:3857，无重投影变形。
  // ArcGIS 用 {y}（与 OSM 同向，无需 {-y}）；Mapbox 需 token（空则点击弹窗提示）。
  // Mapbox token 申请：https://account.mapbox.com/
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
    "arcgis-street": {
      name: "ArcGIS 街道",
      url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
    },
    mapbox: {
      name: "Mapbox 卫星",
      url: `https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v12/tiles/256/{z}/{x}/{y}?access_token=${MAPBOX_TOKEN}`,
    },
  } as const;
  type BasemapKind = keyof typeof BASEMAPS;

  const xyzScheme = new XYZTileScheme(crs, 0, 18);
  const xyzRenderer = new RasterRenderer({
    name: "basemap-renderer",
    // 3857 → 3857 无畸变，但启用自适应以支持缩放级别切换时的平滑过渡
    quality: new SubdividedPlane(2, true),
  });

  function makeBasemapLayer(kind: BasemapKind): RasterLayer {
    return new RasterLayer({
      id: `basemap-${kind}`,
      name: `${BASEMAPS[kind].name}底图`,
      tileScheme: xyzScheme,
      dataSource: new XYZTileSource(BASEMAPS[kind].url, {
        minZoom: 0,
        maxZoom: 18,
      }),
      renderer: xyzRenderer, // 复用共享渲染器（_geomCache 复用，零几何重建）
      zIndex: 0, // 与矢量层 zIndex=10 的排序关系不变
    });
  }

  let currentBasemap = makeBasemapLayer("osm");

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
    // 必须传 layer.id：TileManager 按 content.layerId === layer.id 判断
    // 「该 layer 的 content 是否已存在」（_addKeyRequest 缓存命中 / pendingLayerIds）。
    // 不传时 RasterRenderer/VectorRenderer 会默认成 "raster-layer"/"vector-layer"，
    // 与真实 layer.id（如 "basemap-osm"、"vector-1"）永不匹配 → 每次视野变化都
    // 重新 fetch + 重新创建 content（纹理/材质/网格泄漏，旋转时帧率下降）。
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
        name: "WebMercator Demo",
        visible: true,
        opacity: 1,
        layers: [currentBasemap, vectorLayer],
      },
    ],
    cameraController: mapController,
  });

  engine.start();

  // ── 鼠标拾取（GPU RGB 着色器拾取，非 Raycaster）────────────────
  // 能力由外部接线：move 走廉价地面坐标（零 GPU），click 走完整 GPU 拾取。
  const picking = new PickingManager({
    engine,
    renderer,
    scene,
    container: app,
    sceneRoot: worldRoot,
    camera,
  });
  const pickPosEl = document.getElementById("pick-pos")!;
  const pickInfoEl = document.getElementById("pick-info")!;
  picking.on("move", (e) => {
    const r = picking.getGeoAt(e.x, e.y);
    pickPosEl.textContent = r
      ? `${r.crs.x.toFixed(1)}, ${r.crs.y.toFixed(1)}  [${r.geo?.lon.toFixed(5)}, ${r.geo?.lat.toFixed(5)}]`
      : "—";
  });
  picking.on("click", (e) => {
    const r = picking.pick(e.x, e.y);
    pickInfoEl.textContent = r?.object
      ? `${r.layerId}${r.tileKey ? " " + tileKeyToString(r.tileKey) : ""} z=${r.crs.z.toFixed(1)}m`
      : "无";
  });

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

  /** 从场景移除 group，但不释放其内 GPU 资源（设计文档 §15） */
  function disposeGroup(group: THREE.Group) {
    // 只做场景摘除。geometry/material/map 的生命周期归 TileManager 的 LRU cache：
    // 瓦片淡出通常并未从 cache 移除（cache 按字节预算独立于 _loadedTiles），
    // 回屏时直接复用 cache 里的 renderObject。若在这里 dispose geometry，
    // 回屏瓦片会用已释放的 geometry 渲染；dispose 共享材质（DefaultMaterialFactory
    // 的矢量材质被所有瓦片共用一个实例）会让其它所有瓦片立刻失效并触发全局重编译。
    worldRoot.remove(group);
  }

  /**
   * 切换底图：瞬时清空旧底图瓦片后替换 layer（零重叠，不交叉淡入 — 与条纹修复同哲学）。
   * 引擎 `replaceLayer` 会 resetScheme("xyz")：abort 在途加载、清空旧源缓存并丢弃
   * 旧代完成回调（代际守卫），旧底图瓦片不会回插。矢量层用 project-500 scheme，
   * 不受影响。
   */
  function switchBasemap(kind: BasemapKind) {
    if (kind === currentBasemap.id.slice("basemap-".length)) return;
    if (kind === "mapbox" && !MAPBOX_TOKEN) {
      alert("请先在源码顶部填 MAPBOX_TOKEN（https://account.mapbox.com/）");
      return;
    }
    const next = makeBasemapLayer(kind);
    // 瞬时清空旧底图瓦片（key 前缀 "xyz:" 只命中底图，不动矢量层）
    for (const [key, group] of sceneTiles) {
      if (key.startsWith("xyz:")) {
        disposeGroup(group);
        sceneTiles.delete(key);
      }
    }
    // render-on-demand：旧底图已摘除，新瓦片尚未加载 → 强制重绘一帧清空画面
    needsRender = true;
    engine.replaceLayer(currentBasemap.id, next);
    currentBasemap = next;
    document.querySelectorAll("#basemap-switcher button").forEach((btn) => {
      const el = btn as HTMLElement;
      el.classList.toggle("active", el.dataset.kind === kind);
    });
  }

  function syncScene(): boolean {
    let changed = false;
    const loaded = engine.tileManager.loadedTiles;
    const origin = engine.floatingOrigin.current;

    // LOD 切换：本次同步中被 TileManager 淘汰的旧级别瓦片 key。
    // 旧级别父瓦片被淘汰后，其子瓦片（同一区域的新级别）恢复可见 —— 这些子瓦片
    // 与刚淘汰的父瓦片区域完全重叠，必须满透明度瞬时出现（跳过淡入）；若半透明
    // 子瓦片叠在残留的旧级别父瓦片上，粗网格旧图会透过细网格新图渗出 → 条纹状纹理
    //（根因是交叉淡入的双像/莫尔纹，不是 z-fighting）。
    const evictedKeys = new Set<string>();
    for (const key of sceneTiles.keys()) {
      if (!loaded.has(key)) evictedKeys.add(key);
    }

    // Floating Origin 偏移
    worldRoot.position.set(-origin.x, -origin.y, 0);

    // 添加新 tile / 补挂共享瓦片迟到的 content
    for (const [key, tile] of loaded) {
      // 原子 LOD：祖先更粗瓦片仍上屏时隐藏本瓦片（避免区域内 z/z-1 内容混杂 =
      // 瓦片错落的视觉根因）。祖先被淘汰后本瓦片自动恢复可见。
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
        // 共享瓦片：其他 layer 后到的 content 需要补挂，否则该 layer 永远缺失
        const fading = (existing as any).__fadeStart != null;
        for (const content of tile.contents) {
          for (const ro of content.renderObjects) {
            if (ro.object instanceof THREE.Object3D && ro.object.parent == null) {
              existing.add(ro.object);
              changed = true;
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
      changed = true;

      // LOD 替换瓦片检测：本瓦片是否替代了刚被淘汰的祖先（同一区域的新级别）。
      // 若是 → 满透明度瞬时上屏（跳过淡入），否则半透明新瓦片叠在残留旧级别
      // 父瓦片上，条纹/莫尔纹（见 evictedKeys 注释）。`tile.scheme` 缺失时按
      // 新区域淡入兜底。
      let replacesEvicted = false;
      const scheme = tile.scheme;
      if (scheme) {
        // ① 缩近：本瓦片是某刚淘汰祖先的细化子瓦片（祖先被淘汰）
        let parent: TileKey | null = scheme.getParentKey(tile.key);
        while (parent) {
          if (evictedKeys.has(tileKeyToString(parent))) {
            replacesEvicted = true;
            break;
          }
          parent = scheme.getParentKey(parent);
        }
        // ② 缩远：本瓦片是刚淘汰的 4 个直接子瓦片的父瓦片（zoom-out LOD 替换）。
        //    要求 4 个子瓦片全部本次被淘汰，避免把「平移后屏外淘汰的子瓦片」
        //    误判为本次 LOD 替换（其父瓦片仍应按新区域淡入）。
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

      // 淡入动画：记录目标透明度后置 0。用「加入场景的时刻」而非 content.createdAt
      // —— createdAt 是加载开始时刻，慢速加载的瓦片出现时淡入期早已过去，会直接"弹出"。
      // 跳过共享材质（DefaultMaterialFactory 矢量材质被所有瓦片共用）：直接改它们
      // 会让整层一起闪动；纯矢量瓦片整组直接满透明度出现，不走淡入。
      // LOD 替换瓦片（replacesEvicted）同样跳过淡入，保持满透明度。
      let fadeable = false;
      forEachMaterial(group, (mat) => {
        if ((mat as any).userData?.shared) return;
        if (replacesEvicted) return;
        fadeable = true;
        (mat as any).__baseOpacity = mat.opacity; // 持久记录目标透明度（恢复用）
        (mat as any).__targetOpacity = mat.opacity;
        mat.transparent = true;
        mat.opacity = 0;
      });
      if (fadeable) (group as any).__fadeStart = performance.now();
    }

    // 移除淘汰的 tile：瞬时原子切换（零重叠）。旧级别父瓦片被淘汰时其子瓦片
    // 已全部加载并满透明度上屏（见上方 replacesEvicted 跳过淡入），这里瞬时
    // 摘除旧瓦片，杜绝「旧级别半透明残留 × 新级别半透明淡入」叠加产生的条纹/
    // 莫尔纹。纯矢量瓦片（全部共享材质）同样瞬时移除。
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
  // syncScene 节流时间戳：结构性同步与引擎 UPDATE_INTERVAL_MS(100ms) 对齐
  let lastSyncTs = 0;
  // 上一帧相机位置（世界坐标，未浮动原点偏移）：用于旋转/平移检测
  let lastCamPos = { x: 0, y: 0, z: 0 };
  // render-on-demand：dirty 标志 + 上次实际绘制时刻（空闲显示 "FPS: idle"）
  let needsRender = true;
  let lastRenderTs = performance.now();

  function render() {
    const now = performance.now();

    // 1. 同步瓦片：100ms 节流（与引擎 UPDATE_INTERVAL_MS 对齐）。
    //    render-on-demand：syncScene 结构性遍历（全量 loadedTiles + isTileHidden
    //    祖先链）在调度停顿期间结果不变，无需每帧执行；仅当它实际改变了场景图
    //    （新增/移除/补挂瓦片）才请求渲染。静止时返回 false → GPU 保持空闲。
    if (now - lastSyncTs >= 100) {
      lastSyncTs = now;
      if (syncScene()) needsRender = true;
    }

    // 2. 相机移动检测 + 自适应 near/far（每帧，用还原后的 CRS 坐标）。
    //    near/far 更新仅改投影矩阵，不触发 GPU 绘制。
    const camDist = camera.position.distanceTo(mapController.controls.target);
    const near = Math.min(Math.max(camDist / 5000, 10), 1e5);
    const far = Math.min(Math.max(camDist * 100, 5e5), 1e8);
    if (near !== camera.near || far !== camera.far) {
      camera.near = near;
      camera.far = far;
      camera.updateProjectionMatrix();
    }

    const ddx = camera.position.x - lastCamPos.x;
    const ddy = camera.position.y - lastCamPos.y;
    // 移动阈值（旋转/平移检测）：移动期间跳过淡入推进，直接置满透明度，
    // 否则旋转扫掠时新进入视野的瓦片逐帧淡入 → 随相机移动的亮度条带。
    const camMoved =
      Math.abs(ddx) > camDist * 0.0005 || Math.abs(ddy) > camDist * 0.0005;
    // render-on-demand：任何 >1cm 的相机位移都要重绘（阈值远小于视野，避免
    // 慢速拖拽时逐帧低于 camMoved 阈值而冻结画面）。
    const cameraChanged = Math.abs(ddx) > 0.01 || Math.abs(ddy) > 0.01;
    lastCamPos.x = camera.position.x;
    lastCamPos.y = camera.position.y;
    lastCamPos.z = camera.position.z;
    if (cameraChanged) needsRender = true;

    // 3. 淡入动画 (300ms) — 仅用于「平移进入的新区域」瓦片；
    //    LOD 切换的替换瓦片跳过淡入满透明度上屏（见 syncScene replacesEvicted）。
    //    存在活动淡入时才逐帧推进并请求渲染，否则零开销。
    //    camMoved 时所有未完成淡入的瓦片直接置满透明度（done=true）。
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

    // 4. 实际绘制（dirty 驱动）：空闲（相机未动、无加载、无淡入）时跳过
    //    renderer.render → GPU 完全空闲，避免静止时持续烧 GPU（Intel UHD 实测
    //    每帧 10-43ms 画静态瓦片）。worldRoot 与相机必须同帧使用同一 origin
    //    （F1 防抖）——仅渲染时同步即可。
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

    // 5. FPS 统计 + HUD（500ms，DOM 直写，不依赖渲染）。
    //    空闲（超过 500ms 无实际绘制）时显示 "FPS: idle"，避免误读为 0。
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
      // HUD 随 FPS 统计同频刷新（500ms）：消除每帧 5 次 DOM 写导致的布局抖动
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
