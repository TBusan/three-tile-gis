/**
 * GeoEngine Phase 9 Demo — OSM Basemap + Checkerboard + Vector Overlay
 *
 * 验证：
 *   1. XYZ 瓦片加载（OSM 底图）通过 XYZTileScheme → XYZTileSource → RasterRenderer
 *   2. 多图层叠加（底图 + 棋盘格 overlay + GeoJSON 矢量覆盖层）
 *   3. Three.js WebGL 渲染管线
 *   4. EPSG:3857 Web Mercator（底图原生投影，无重投影变形）
 *   5. Multi-level LOD（缩放时 tile 级别自动切换）
 *   6. VectorRenderer 支持 Point / LineString / Polygon
 *   7. SubdividedPlane 细分网格（按需启用）
 *   8. Proj4CRS / UTMCRS / CustomCRS 多 CRS 支持
 *   9. DEMSource + DemMesh + SkirtedMesh 地形就绪
 *  10. TileScheduler 4D 优先级 + 渐进式父 Tile 显示
 *  11. 瓦片共享（同 key 多层） + 离屏加载取消
 *  12. 300ms 淡入过渡动画
 *  13. WorkerPool 共享 Web Worker 池（GeoTIFF 解码卸载）
 *  14. DXFSource 入口预留（stub）
 *  15. Engine crsToWorld / worldToCrs / screenToCrs 坐标转换
 *  16. TileManager Layer dependsOn 依赖排序
 *  17. CODE_OF_CONDUCT.md + npm publish 配置
 */

import * as THREE from "three";
import {
  Engine,
  WebMercatorCRS,
  Proj4CRS,
  UTMCRS,
  CustomCRS,
  RasterLayer,
  VectorLayer,
  ProjectTileScheme,
  XYZTileScheme,
  XYZTileSource,
  GeoJSONSource,
  GeoTIFFSource,
  DEMSource,
  RasterRenderer,
  VectorRenderer,
  DefaultMaterialFactory,
  SubdividedPlane,
  DemMesh,
  SkirtedMesh,
  PerspectiveMapController,
  tileKeyToString,
  type Tile,
  type IDataSource,
  type ILayerRenderer,
  type IProjectCRS,
  type CrsBounds,
  type TileKey,
  type CrsCoord,
  type TileLoadCallback,
  TileContent,
  RenderObject,
  WorkerPool,
} from "@geo-engine/core";

// ═══════════════════════════════════════════════════════════════
// Data source: Checkerboard (same as Phase 1, but returns color only)
// ═══════════════════════════════════════════════════════════════

interface CheckerTileData {
  color: string;
  row: number;
  col: number;
}

class CheckerboardSource implements IDataSource<CheckerTileData> {
  readonly dataType = "checkerboard";
  readonly crs: IProjectCRS;
  readonly bounds: CrsBounds = [12950000, 4850000, 12965000, 4870000];

  constructor(crs: IProjectCRS) {
    this.crs = crs;
  }

  async fetch(
    key: TileKey,
  ): Promise<CheckerTileData> {
    const [col, row] = key.id.split("-").map(Number);
    const isDark = (col + row) % 2 === 0;
    return { color: isDark ? "#2a3f5f" : "#3a5f7f", row, col };
  }

  dispose(): void {}
}

// ═══════════════════════════════════════════════════════════════
// Renderer: Checkerboard → THREE.Mesh with colored material
// ═══════════════════════════════════════════════════════════════

class CheckerboardRenderer implements ILayerRenderer<CheckerTileData> {
  readonly name = "checkerboard-renderer";

  async createContent(
    data: CheckerTileData,
    tile: Tile,
    layerId?: string,
  ): Promise<TileContent> {
    const content = new TileContent(
      `cb-${tile.key.id}`,
      tile.key,
      layerId ?? "cb-layer",
    );

    const [xmin, ymin, xmax, ymax] = tile.bounds;
    const width = xmax - xmin;
    const height = ymax - ymin;

    const geometry = new THREE.PlaneGeometry(width, height);
    const cx = (xmin + xmax) / 2 - tile.origin.x;
    const cy = (ymin + ymax) / 2 - tile.origin.y;
    geometry.translate(cx, cy, 0);

    const material = new THREE.MeshBasicMaterial({
      color: new THREE.Color(data.color),
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.65,
    });

    const mesh = new THREE.Mesh(geometry, material);

    const ro = new RenderObject(mesh, (obj: unknown) => {
      const m = obj as THREE.Mesh;
      m.geometry.dispose();
      if (Array.isArray(m.material)) {
        for (const mat of m.material) mat.dispose();
      } else {
        m.material.dispose();
      }
    });

    content.renderObjects.push(ro);
    content.data = data;
    content.state = "ready";
    return content;
  }

  disposeContent(): void {}
}

// ═══════════════════════════════════════════════════════════════
// HUD
// ═══════════════════════════════════════════════════════════════

function updateHUD(
  crsName: string,
  x: number,
  y: number,
  zoom: number,
  tileCount: number,
  queueLen: number,
  loadingCount: number,
) {
  const el = (id: string) => document.getElementById(id)!;
  el("crs-name").textContent = crsName;
  el("crs-pos").textContent = `(${x.toFixed(0)}, ${y.toFixed(0)}) m`;
  el("crs-zoom").textContent = `${zoom.toFixed(1)} m/px`;
  el("tile-count").textContent = `${tileCount}`;
  el("scheduler-stats").textContent = `${queueLen} queued / ${loadingCount} loading`;
}

// ═══════════════════════════════════════════════════════════════
// Main
// ═══════════════════════════════════════════════════════════════

async function main() {
  const crs = new WebMercatorCRS();
  const app = document.getElementById("app")!;

  // ── Three.js setup ──────────────────────────────────────────
  // 低填充率配置：瓦片纹理仅 256px、场景为扁平地图，无需 MSAA / 对数深度缓冲。
  // MSAA(4×) + log-depth(禁用 early-Z) + DoubleSide 叠加会把填充率推上悬崖（10-30 FPS）。
  const MAX_PIXEL_RATIO = 1.5; // 过高 DPR 只烧填充率，画面无增益（瓦片纹理 256px）
  const renderer = new THREE.WebGLRenderer({
    antialias: false, // 关闭 MSAA（填充率 ×4 的元凶）
    logarithmicDepthBuffer: false, // 恢复 early-Z；深度精度由 render() 中自适应 near/far 保证
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, MAX_PIXEL_RATIO));
  renderer.setClearColor(0x1a1a2e);
  app.appendChild(renderer.domElement);

  const scene = new THREE.Scene();

  // World 根节点 — Floating Origin 偏移锚点（设计文档 §7.2）
  // 所有 tile group 与十字准星挂在 worldRoot 下，worldRoot.position = -floatingOrigin，
  // 使子节点的最终世界坐标都是相机附近的小数值，避免 float32 精度损失。
  // 注意：相机不能挂在 worldRoot 下 — OrbitControls 内部 lookAt(target) 把 target 当世界坐标，
  // 若相机父节点带偏移会导致朝向错误。相机保持在 CRS 坐标，仅在渲染瞬间临时偏移到局部坐标。
  const worldRoot = new THREE.Group();
  scene.add(worldRoot);

  // PerspectiveMapController: PerspectiveCamera + OrbitControls
  const mapController = new PerspectiveMapController({
    center: { x: 12957000, y: 4860000 },
    distance: 50000,
    maxPolarAngle: Math.PI / 2.2, // GIS 约束：不允许低于地平线
    fov: 60,
    near: 50,
    far: 1e8,
  });
  const camera = mapController.camera;
  // 相机不加入场景图：始终在 CRS 坐标操作（OrbitControls 交互逻辑完全不受影响），
  // 渲染时临时减去 floatingOrigin 偏移到局部坐标（见 render()）。

  // Crosshair — follows controls.target（CRS 坐标，相对 worldRoot）
  const crosshair = createCrosshair();
  worldRoot.add(crosshair);

  // Sizing — 同步 drawing buffer 到容器尺寸（CSS 负责拉伸显示）
  function onResize() {
    const w = app.clientWidth || window.innerWidth;
    const h = app.clientHeight || window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / Math.max(h, 1);
    camera.updateProjectionMatrix();
  }
  new ResizeObserver(onResize).observe(app);
  onResize();

  // ── Layers ─────────────────────────────────────────────────
  // Layer 1: 底图 (XYZTileScheme) — OSM / ArcGIS / Mapbox 可切换
  // 注：ArcGIS World_Imagery 北京 z14 影像存在源数据拼接缝（三引擎对照已证实），
  // 低缩放级别可接受；OSM 街图为矢量渲染无拼接缝。
  // Mapbox token 申请：https://account.mapbox.com/
  const MAPBOX_TOKEN = ""; // 填你的 token

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
    // 底图与引擎同为 EPSG:3857，无重投影变形，但启用自适应细分以支持：
    //   1. 用户切换到非 3857 CRS 时自动增加网格密度消除投影畸变
    //   2. 低缩放级别时提供更精细的几何体避免渲染伪影
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
      zIndex: 0, // 与 checker/vector 层 zIndex=10 的排序关系不变
    });
  }

  let currentBasemap = makeBasemapLayer("osm");

  // Layer 2: Checkerboard overlay (ProjectTileScheme)
  const checkerScheme = new ProjectTileScheme(1000);
  const checkerSource = new CheckerboardSource(crs);
  const checkerRenderer = new CheckerboardRenderer();

  const checkerLayer = new RasterLayer({
    name: "Checkerboard",
    tileScheme: checkerScheme,
    dataSource: checkerSource,
    renderer: checkerRenderer,
    zIndex: 10,
  });

  // Layer 3: GeoJSON vector overlay (ProjectTileScheme)
  // Sample data in EPSG:3857 coords around Beijing center (~12957000, 4860000)
  const sampleGeoJSON = {
    type: "FeatureCollection",
    features: [
      // Roads (LineStrings)
      {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: [
            [12956500, 4859500],
            [12957500, 4859500],
            [12957500, 4860500],
            [12956500, 4860500],
            [12956500, 4859500],
          ],
        },
        properties: { name: "Ring Road", highway: "primary" },
      },
      {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: [
            [12957000, 4859000],
            [12957000, 4861000],
          ],
        },
        properties: { name: "Main Street", highway: "secondary" },
      },
      {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: [
            [12956000, 4860000],
            [12958000, 4860000],
          ],
        },
        properties: { name: "East-West Ave", highway: "secondary" },
      },
      // Buildings (Polygons)
      {
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [12956800, 4859800],
              [12957000, 4859800],
              [12957000, 4860000],
              [12956800, 4860000],
              [12956800, 4859800],
            ],
          ],
        },
        properties: { name: "Building A", floors: 3 },
      },
      {
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [12957100, 4859700],
              [12957300, 4859700],
              [12957300, 4859900],
              [12957100, 4859900],
              [12957100, 4859700],
            ],
          ],
        },
        properties: { name: "Building B", floors: 5 },
      },
      {
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [12956700, 4860100],
              [12956900, 4860100],
              [12956900, 4860300],
              [12956700, 4860300],
              [12956700, 4860100],
            ],
            // Hole (courtyard)
            [
              [12956750, 4860150],
              [12956850, 4860150],
              [12956850, 4860250],
              [12956750, 4860250],
              [12956750, 4860150],
            ],
          ],
        },
        properties: { name: "Building C (with courtyard)", floors: 2 },
      },
      // Points of interest
      {
        type: "Feature",
        geometry: { type: "Point", coordinates: [12957000, 4860000] },
        properties: { name: "City Center", type: "landmark" },
      },
      {
        type: "Feature",
        geometry: { type: "Point", coordinates: [12957200, 4860200] },
        properties: { name: "Tower", type: "landmark" },
      },
      {
        type: "Feature",
        geometry: { type: "Point", coordinates: [12956600, 4859600] },
        properties: { name: "Entrance", type: "gate" },
      },
    ],
  };

  const geoBlob = new Blob([JSON.stringify(sampleGeoJSON)], {
    type: "application/json",
  });
  const geoURL = URL.createObjectURL(geoBlob);

  const vectorSource = new GeoJSONSource(geoURL, crs);
  const vectorScheme = new ProjectTileScheme(500);
  const vectorMatFactory = new DefaultMaterialFactory({
    pointColor: 0xe74c3c, // red
    lineColor: 0xf39c12, // orange
    fillColor: 0x3498db, // blue
  });
  const vectorRenderer = new VectorRenderer(vectorMatFactory, "vector-renderer");

  const vectorLayer = new VectorLayer({
    name: "Sample Vectors",
    tileScheme: vectorScheme,
    dataSource: vectorSource,
    renderer: vectorRenderer,
    zIndex: 20,
  });

  // ── GeoTIFF Example (commented out — requires a .tif file) ─
  // const geoTiffSource = new GeoTIFFSource({
  //   url: "/data/ortho.tif",
  //   crs, // data CRS must match engine CRS (Phase 5 limitation)
  //   useWorker: true,  // Phase 8: offload decode to WorkerPool
  // });
  // // WorkerPool can also be used directly:
  // // const pool = new WorkerPool();
  // // const result = await pool.exec({ script: workerUrl, data: {...} });
  // const geoTiffScheme = new ProjectTileScheme(500);
  // const geoTiffRenderer = new RasterRenderer({
  //   name: "ortho-renderer",
  //   quality: new SubdividedPlane(4),
  // });
  // const geoTiffLayer = new RasterLayer({
  //   name: "Orthophoto",
  //   tileScheme: geoTiffScheme,
  //   dataSource: geoTiffSource,
  //   renderer: geoTiffRenderer,
  //   zIndex: 5,
  // });

  // ── DEM + Terrain Example (commented out — requires DEM .tif file) ─
  // const demSource = new DEMSource({ url: "/data/dem.tif", crs });
  // const demScheme = new ProjectTileScheme(500);
  //
  // // Build elevation sampler from DEM data:
  // //   const demData = await demSource.fetch(key, bounds);
  // //   const sampler = (x: number, y: number) => bilinearSample(demData, ...)
  //
  // // Flat terrain with DemMesh:
  // // const demRenderer = new RasterRenderer({
  // //   name: "dem-renderer",
  // //   quality: new DemMesh(sampler, 4),
  // // });
  //
  // // With LOD crack prevention (SkirtedMesh):
  // // const demRenderer = new RasterRenderer({
  // //   name: "dem-renderer",
  // //   quality: new SkirtedMesh(sampler, 4, 100),
  // // });

  // ── Tile load callback ─────────────────────────────────────
  const tileLoadFn: TileLoadCallback = async (tile, layer, signal) => {
    const source = layer.dataSource;
    const renderer = layer.renderer;
    const data = await source.fetch(tile.key, tile.bounds, signal);
    if (signal.aborted) return null;
    // 空数据（如矢量瓦片裁剪后无要素）跳过内容创建，避免空 TileContent 被计数。
    // 仅对数组型数据（GeoFeature[]）生效；栅格/棋盘格返回对象不受影响。
    if (Array.isArray(data) && data.length === 0) return null;
    return renderer.createContent(data, tile, layer.id);
  };

  // ── Engine ─────────────────────────────────────────────────
  const engine = new Engine({
    crs,
    container: app,
    tileLoadFn,
    groups: [
      {
        id: "default",
        name: "Default",
        visible: true,
        opacity: 1,
        layers: [currentBasemap, checkerLayer, vectorLayer],
      },
    ],
    cameraController: mapController,
  });

  engine.start();

  // ── 图层显隐控制 ────────────────────────────────────────
  const layerVisibility = new Map<string, boolean>([
    [checkerLayer.id, true],
  ]);

  const btnChecker = document.getElementById("btn-checker")!;
  btnChecker.addEventListener("click", () => {
    const cur = layerVisibility.get(checkerLayer.id) ?? true;
    const next = !cur;
    layerVisibility.set(checkerLayer.id, next);
    checkerLayer.visible = next;
    btnChecker.textContent = `棋盘格: ${next ? "ON" : "OFF"}`;
    btnChecker.classList.toggle("off", !next);
  });

  // ── Scene sync ─────────────────────────────────────────────
  // 跟踪已添加到场景的 tile group
  const sceneTiles = new Map<string, THREE.Group>();

  /** 遍历 group 内所有渲染对象的材质 */
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

  /**
   * 将淡出完成的 group 从场景移除（不释放 GPU 资源）。
   *
   * 资源生命周期归 TileManager 的 LRU cache 所有：
   *   1. 瓦片被淘汰出 _loadedTiles 时仍留在 cache 中（供平移/缩放回程复用），
   *      在此 dispose 会让缓存的瓦片回屏时强制重传 geometry/texture。
   *   2. VectorRenderer 的材质由 DefaultMaterialFactory 在所有瓦片间共享，
   *      在此 dispose 共享材质会让其余所有矢量瓦片重新编译着色器（契约破坏）。
   *   3. 真正释放由 cache.trim → Tile.dispose → renderer.disposeContent + ro.dispose
   *      在引擎内部完成（Engine._tick 每 100ms 调用 tileManager.evict）。
   */
  function disposeGroup(group: THREE.Group) {
    worldRoot.remove(group);
  }

  /**
   * 切换底图：瞬时清空旧底图瓦片后替换 layer（零重叠，不交叉淡入 — 与条纹修复同哲学）。
   * 引擎 `replaceLayer` 会 resetScheme("xyz")：abort 在途加载、清空旧源缓存并丢弃
   * 旧代完成回调（代际守卫），旧底图瓦片不会回插。checker/vector 层用 project-1000/
   * project-500 scheme，不受影响。
   */
  function switchBasemap(kind: BasemapKind) {
    if (kind === currentBasemap.id.slice("basemap-".length)) return;
    if (kind === "mapbox" && !MAPBOX_TOKEN) {
      alert("请先在源码顶部填 MAPBOX_TOKEN（https://account.mapbox.com/）");
      return;
    }
    const next = makeBasemapLayer(kind);
    // 瞬时清空旧底图瓦片（key 前缀 "xyz:" 只命中底图，不动 checker/vector 层）
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

    // Floating Origin 偏移：worldRoot.position = -origin（设计文档 §7.2）
    // 相机与 tile group 都是 worldRoot 子节点，最终世界坐标 = CRS - origin（相机附近小数值）。
    // 只需更新这一个节点，无需逐 tile 遍历（dirty flag 优化亦可，此处每帧赋值代价恒定）。
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
        // 瓦片被多个 layer 共享时，后到的 layer content 需要补挂到已有 group，
        // 否则该 layer 的 renderObject 永远进不了场景（缺失图层）。
        let addedAny = false;
        const fading = (existing as any).__fadeStart != null;
        for (const content of tile.contents) {
          for (const ro of content.renderObjects) {
            if (ro.object instanceof THREE.Object3D && ro.object.parent == null) {
              existing.add(ro.object);
              addedAny = true;
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
        if (addedAny) {
          // 更新 layerId 列表，使图层显隐控制覆盖新补挂的 layer
          (existing as any).__layerIds = tile.contents.map((c) => c.layerId);
        }
        continue;
      }
      if (tile.contents.length === 0) continue;

      const group = new THREE.Group();
      let hasObjects = false;

      for (const content of tile.contents) {
        for (const ro of content.renderObjects) {
          if (ro.object instanceof THREE.Object3D) {
            // Take ownership — move object from RenderObject to scene group
            group.add(ro.object);
            hasObjects = true;
          }
        }
      }

      if (!hasObjects) continue;

      // tile group 位置 = tile.origin（CRS 坐标，相对 worldRoot）
      // 不需减 floatingOrigin — worldRoot 统一偏移
      group.position.set(tile.origin.x, tile.origin.y, 0);

      worldRoot.add(group);
      sceneTiles.set(key, group);
      changed = true;

      // 存储该 group 包含的 layerId 列表（用于图层显隐控制）
      (group as any).__layerIds = tile.contents.map((c) => c.layerId);

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

      // 淡入动画起点：记录每个材质的目标透明度，然后置 0。
      // 用「加入场景的时刻」而非 content.createdAt —— createdAt 是加载开始时刻，
      // 慢速加载的瓦片出现时淡入期早已过去，会直接"弹出"，加剧拼接感。
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

  // ── Render loop ────────────────────────────────────────────
  // FPS 统计：累计帧数与耗时，每 500ms 刷新一次显示（避免逐帧抖动）
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

    // Sync crosshair to controls target（CRS 坐标，相对 worldRoot）
    // z 保持 90（抬离地面避免与瓦片平面 z-fighting），并按分辨率动态缩放保持固定屏幕尺寸。
    // 纯 CPU 赋值，不触发 GPU 绘制；渲染恢复时准星必然已就位。
    const tgt = mapController.controls.target;
    crosshair.position.set(tgt.x, tgt.y, 90);
    const crosshairScale = Math.max(mapController.resolution, 1) * 0.9; // ≈14px 半长
    crosshair.scale.setScalar(crosshairScale);

    // Sync tile meshes（worldRoot.position = -origin）：100ms 节流（与引擎
    // UPDATE_INTERVAL_MS 对齐）。render-on-demand：syncScene 结构性遍历在调度
    // 停顿期间结果不变，无需每帧执行；仅当它实际改变了场景图（新增/移除/补挂
    // 瓦片）才请求渲染。静止时返回 false → GPU 保持空闲。
    if (now - lastSyncTs >= 100) {
      lastSyncTs = now;
      if (syncScene()) needsRender = true;
    }

    // 图层显隐控制：根据 layerVisibility 设置每个 group 的 visible。
    // 显隐状态变化（用户勾选图层 checkbox）需触发重绘。
    for (const [, group] of sceneTiles) {
      const layerIds: string[] | undefined = (group as any).__layerIds;
      if (!layerIds) continue;
      // 只要 group 中有一个 layer 是可见的，就显示该 group
      const newVis = layerIds.some((lid) => layerVisibility.get(lid) !== false);
      if (group.visible !== newVis) {
        group.visible = newVis;
        needsRender = true;
      }
    }

    // 自适应 near/far + 相机移动检测（每帧，用还原后的 CRS 坐标）。
    // near/far 更新仅改投影矩阵，不触发 GPU 绘制。
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

    // ── Fade-in animation (300ms) — 仅用于「平移进入的新区域」瓦片；
    // LOD 切换的替换瓦片跳过淡入满透明度上屏（见 syncScene replacesEvicted）。
    // 存在活动淡入时才逐帧推进并请求渲染，否则零开销。
    // camMoved 时所有未完成淡入的瓦片直接置满透明度（done=true）。
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
          // 动画结束：恢复目标透明度 + 原始 transparent 标志
          mat.opacity = base;
          mat.transparent = base < 1;
          delete (mat as any).__targetOpacity;
        }
      });

      if (done) delete (group as any).__fadeStart;
    }
    if (fadeActive) needsRender = true;

    // 实际绘制（dirty 驱动）：空闲（相机未动、无加载、无淡入）时跳过
    // renderer.render → GPU 完全空闲。worldRoot 与相机必须同帧使用同一 origin
    // （F1 防抖）——仅渲染时同步即可。
    if (needsRender) {
      // 渲染瞬间将相机临时偏移到局部坐标（相机平时在 CRS 坐标，OrbitControls 不受影响）。
      // 相机与 worldRoot 子节点（瓦片/准星）同处局部坐标系，相对视图正确；
      // 平移不改变朝向，故 OrbitControls 计算的 quaternion 无需调整。
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

    // ── FPS 统计 ─────────────────────────────────────────
    // 空闲（超过 500ms 无实际绘制）时显示 "FPS: idle"，避免误读为 0。
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
        // 按帧率着色：>=50 绿，>=30 黄，<30 红
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

// ═══════════════════════════════════════════════════════════════
// Helpers
// ═══════════════════════════════════════════════════════════════

function createCrosshair(): THREE.Object3D {
  const size = 16;
  const material = new THREE.LineBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.6,
  });

  const hPoints = [new THREE.Vector3(-size, 0, 0), new THREE.Vector3(size, 0, 0)];
  const vPoints = [new THREE.Vector3(0, -size, 0), new THREE.Vector3(0, size, 0)];

  const hGeo = new THREE.BufferGeometry().setFromPoints(hPoints);
  const vGeo = new THREE.BufferGeometry().setFromPoints(vPoints);

  const group = new THREE.Group();
  group.add(new THREE.Line(hGeo, material));
  group.add(new THREE.Line(vGeo, material));
  group.position.z = 90; // just below camera

  return group;
}

main();
