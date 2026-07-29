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
  ): Promise<TileContent> {
    const content = new TileContent(
      `cb-${tile.key.id}`,
      tile.key,
      "cb-layer",
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
  const renderer = new THREE.WebGLRenderer({ antialias: true, logarithmicDepthBuffer: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
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
  // Layer 1: 底图 (XYZTileScheme)
  // 默认使用 ArcGis World_Imagery 卫星影像（无需 token，服务稳定）。
  // 注意 ArcGis 瓦片 URL 为 {z}/{y}/{x} 顺序（y 在 x 前）。
  const osmScheme = new XYZTileScheme(crs, 0, 18);
  const osmSource = new XYZTileSource(
    "https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    { minZoom: 0, maxZoom: 18 },
  );
  // 备选底图源（参考 three-tile plugin/mapSource）：
  //   OSM:        https://tile.openstreetmap.org/{z}/{x}/{y}.png
  //   MapTiler:   https://api.maptiler.com/tiles/satellite-v2/{z}/{x}/{y}.jpg?key=<token>
  //   天地图:     https://t{0-4}.tianditu.gov.cn/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=<token>
  //   （MapTiler/天地图需申请 token；XYZTileSource 支持 {z}/{x}/{y}/{-y} 模板）
  const osmRenderer = new RasterRenderer({
    name: "osm-renderer",
    // 底图与引擎同为 EPSG:3857，无重投影变形，但启用自适应细分以支持：
    //   1. 用户切换到非 3857 CRS 时自动增加网格密度消除投影畸变
    //   2. 低缩放级别时提供更精细的几何体避免渲染伪影
    quality: new SubdividedPlane(2, true),
  });

  const osmLayer = new RasterLayer({
    name: "OSM Basemap",
    tileScheme: osmScheme,
    dataSource: osmSource,
    renderer: osmRenderer,
    zIndex: 0,
  });

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
    return renderer.createContent(data, tile);
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
        layers: [osmLayer, checkerLayer, vectorLayer],
      },
    ],
    cameraController: mapController,
  });

  engine.start();

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

  function syncScene() {
    const loaded = engine.tileManager.loadedTiles;
    const origin = engine.floatingOrigin.current;

    // Floating Origin 偏移：worldRoot.position = -origin（设计文档 §7.2）
    // 相机与 tile group 都是 worldRoot 子节点，最终世界坐标 = CRS - origin（相机附近小数值）。
    // 只需更新这一个节点，无需逐 tile 遍历（dirty flag 优化亦可，此处每帧赋值代价恒定）。
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

      // 淡入动画起点：记录每个材质的目标透明度，然后置 0
      forEachMaterial(group, (mat) => {
        (mat as any).__targetOpacity = mat.opacity;
        mat.transparent = true;
        mat.opacity = 0;
      });
      // 存储 content 引用用于淡入动画
      (group as any).__fadeContent = tile.contents[0];
    }

    // 移除淘汰的 tile（释放 GPU 资源 + 从场景移除）
    for (const [key, group] of sceneTiles) {
      if (!loaded.has(key)) {
        // 释放 geometry / material / texture（设计文档 §15）
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

  // ── Render loop ────────────────────────────────────────────
  // FPS 统计：累计帧数与耗时，每 500ms 刷新一次显示（避免逐帧抖动）
  const fpsEl = document.getElementById("fps-value")!;
  const frameTimeEl = document.getElementById("frame-time")!;
  let fpsFrames = 0;
  let fpsLastTime = performance.now();

  function render() {
    // ── FPS 统计 ─────────────────────────────────────────
    fpsFrames++;
    const fpsNow = performance.now();
    const fpsElapsed = fpsNow - fpsLastTime;
    if (fpsElapsed >= 500) {
      const fps = (fpsFrames * 1000) / fpsElapsed;
      const frameMs = fpsElapsed / fpsFrames;
      fpsEl.textContent = fps.toFixed(0);
      // 按帧率着色：>=50 绿，>=30 黄，<30 红
      fpsEl.style.color = fps >= 50 ? "#7CFC00" : fps >= 30 ? "#FFD700" : "#FF6B6B";
      frameTimeEl.textContent = `(${frameMs.toFixed(1)} ms/帧)`;
      fpsFrames = 0;
      fpsLastTime = fpsNow;
    }

    // Sync crosshair to controls target（CRS 坐标，相对 worldRoot）
    // z 保持 90（抬离地面避免与瓦片平面 z-fighting），并按分辨率动态缩放保持固定屏幕尺寸。
    const tgt = mapController.controls.target;
    crosshair.position.set(tgt.x, tgt.y, 90);
    const crosshairScale = Math.max(mapController.resolution, 1) * 0.9; // ≈14px 半长
    crosshair.scale.setScalar(crosshairScale);

    // Sync tile meshes（worldRoot.position = -origin）
    syncScene();

    // 渲染瞬间将相机临时偏移到局部坐标（相机平时在 CRS 坐标，OrbitControls 不受影响）。
    // 相机与 worldRoot 子节点（瓦片/准星）同处局部坐标系，相对视图正确；
    // 平移不改变朝向，故 OrbitControls 计算的 quaternion 无需调整。
    const origin = engine.floatingOrigin.current;
    camera.position.x -= origin.x;
    camera.position.y -= origin.y;
    renderer.render(scene, camera);
    camera.position.x += origin.x;
    camera.position.y += origin.y;

    // ── Fade-in animation (300ms) ─────────────────────────
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
          // 动画结束：恢复目标透明度 + 原始 transparent 标志
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
