// geo-engine/packages/engine/src/camera/PerspectiveMapController.ts

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import type { CrsCoord } from "../core/types";
import type { ICameraController } from "./ICameraController";

/** PerspectiveMapController 构造选项 */
export interface PerspectiveMapControllerOptions {
  /** 初始 CRS 中心（默认原点） */
  center?: { x: number; y: number };
  /** 初始相机到 target 的直线距离（米），默认 200km */
  distance?: number;
  /** 初始俯仰角（与垂直方向 +Z 的夹角，弧度），默认 π/4（45°） */
  initialPolarAngle?: number;
  /**
   * 初始方位角（XY 平面内自 +X 逆时针，弧度），默认 -π/2（即 3π/2）。
   * -π/2 → 相机在 target 正南 -Y，朝北俯瞰 → 屏幕上方 = 北（标准地图朝向，文字朝上）。
   */
  initialAzimuth?: number;
  /** 最大俯仰角（弧度），默认 π/2.2（约 82°），GIS 引擎不允许低于地平线 */
  maxPolarAngle?: number;
  /** 最小俯仰角（弧度），默认 0.15（约 8.6°），防止高海拔时完全锁死旋转 */
  minPolarAngle?: number;
  /** 视场角（度），默认 60 */
  fov?: number;
  /** 近裁剪面（米），默认 50 */
  near?: number;
  /** 远裁剪面（米），默认 1e8 */
  far?: number;
}

/**
 * 透视地图相机控制器 — 实现 ICameraController
 *
 * 内部使用 Three.js PerspectiveCamera + OrbitControls 提供：
 *   - 3D 透视视角（支持 pitch 倾斜）
 *   - 成熟的鼠标交互（左键平移、右键旋转、滚轮缩放）
 *   - 动态 polar angle（高空俯视、低空倾斜）
 *
 * 约定：地面 = XY 平面，世界朝上 = +Z（camera.up）。初始视角为
 * initialPolarAngle（默认 45°）的三维倾斜视图 —— 屏幕上方 = 远处、下方 = 近处；
 * 方位角 initialAzimuth（默认 -π/2，相机在 target 正南）使屏幕上方 = 北（地图文字朝上）。
 * 倾斜角度不锁死，用户可通过鼠标拖拽在 [0, maxPolarAngle] 内自由调整。
 *
 * 对外暴露 camera 和 controls 属性，Demo 直接用于渲染。
 */
export class PerspectiveMapController implements ICameraController {
  readonly camera: THREE.PerspectiveCamera;
  readonly controls: OrbitControls;

  private _container: HTMLElement | null = null;
  private _resizeObserver: ResizeObserver | null = null;

  /** 用户配置的最大俯仰角上限（弧度） */
  private readonly _userMaxPolar: number;
  /** 最小俯仰角下限（弧度），防止高海拔时旋转完全锁死 */
  private readonly _minPolarAngle: number;

  constructor(options: PerspectiveMapControllerOptions = {}) {
    const {
      center = { x: 0, y: 0 },
      distance = 2e5,
      initialPolarAngle = Math.PI / 4,
      initialAzimuth = -Math.PI / 2,
      maxPolarAngle = Math.PI / 2.2,
      minPolarAngle = 0.15,
      fov = 60,
      near = 50,
      far = 1e8,
    } = options;

    this._userMaxPolar = maxPolarAngle;
    this._minPolarAngle = minPolarAngle;

    // Camera：XY 平面为地面，Z 轴为高度（世界朝上 = +Z）
    this.camera = new THREE.PerspectiveCamera(fov, 1, near, far);
    // 关键：OrbitControls 的旋转轴 = camera.up。默认 (0,1,0) 躺在地面平面内，
    // 俯仰角从平面内轴测量 → 初始视角上下颠倒（屏幕上方反而近）。世界朝上应为 +Z。
    this.camera.up.set(0, 0, 1);

    // 初始位置：以 target 为球心、直线距离 = distance、俯仰角 = initialPolarAngle、
    // 方位角 = initialAzimuth（默认 -π/2）。-π/2 → 相机在 target 正南 -Y，朝北俯瞰：
    // 屏幕上方 = 远端 = 北（标准地图朝向，文字朝上）。旧实现把相机放正北 +Y，
    // 屏幕上方变成南端 → 地图南北向反（需用户手动旋转 180° 才正常）。
    // 必须非零俯仰角：up=+Z 时完全正俯视下 lookAt 退化（产生 90° 旋转朝向）。
    const phi = Math.max(initialPolarAngle, 0.0001);
    const r = distance;
    this.camera.position.set(
      center.x + r * Math.sin(phi) * Math.cos(initialAzimuth),
      center.y + r * Math.sin(phi) * Math.sin(initialAzimuth),
      r * Math.cos(phi),
    );
    this.camera.lookAt(center.x, center.y, 0);

    // OrbitControls：绑定到 camera（domElement 在 attach 时设置）
    this.controls = new OrbitControls(this.camera);
    this.controls.target.set(center.x, center.y, 0);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.08;
    this.controls.maxPolarAngle = maxPolarAngle;
    // 应用用户配置的最小俯仰角（默认 0.15 ≈ 8.6°）：完全正俯视（polar≈0）下
    // OrbitControls 的 makeSafe() 会让方位角退化 → 视图抖动；也防止高海拔时旋转锁死。
    this.controls.minPolarAngle = minPolarAngle;
    // 鼠标映射：遵循 GIS 引擎惯例（Google Maps / CesiumJS / Mapbox）
    //   LEFT = ROTATE（旋转/倾斜）
    //   RIGHT = PAN（平移）
    //   MIDDLE = DOLLY（缩放）
    this.controls.mouseButtons = {
      LEFT: THREE.MOUSE.ROTATE,
      MIDDLE: THREE.MOUSE.DOLLY,
      RIGHT: THREE.MOUSE.PAN,
    };
    // 平移沿地平面进行（而非屏幕空间），避免倾斜时 Z 分量漂移
    this.controls.screenSpacePanning = false;
    this.controls.minDistance = 100;
    this.controls.maxDistance = 5e7;
    this.controls.panSpeed = 1.0;
    this.controls.rotateSpeed = 1.0;
    this.controls.zoomSpeed = 1.2;
  }

  // ---- ICameraController ----

  get cameraWorldPos(): CrsCoord {
    return {
      x: this.camera.position.x,
      y: this.camera.position.y,
      z: this.camera.position.z,
    };
  }

  /** Web Mercator 半周长（≈地球半周长）— extent 超此值无实际意义 */
  private static readonly MAX_EXTENT_HALF = 20_037_508.34;

  /**
   * 近水平倾斜时远处 extent 的钳制系数（单位与 resolution 相同：3857 为米、4326 为度）。
   *
   * 预算推导：XYZTileScheme 单视野最多 MAX_TILES_PER_VIEW(512) 瓦片，且
   *   tileSize(z) = resolution * TILE_TARGET_PX(400)
   * 正方形 extent 半宽不超过
   *   half ≤ √512 * tileSize / 2 ≈ 4525 * resolution
   * 取 55% 裕量（多图层、非对称几何留余量）→ 2500。
   *
   * 该系数只用于「越过地平线」（aboveHorizon）分支：此时屏幕上方是天空，
   * 可见地面只有 target 附近一圈，按 target ± cap 取有界范围即可。
   * 未越过地平线但接近地平线（视线仍与地面相交、远端交点却达数百至数千公里）的
   * 过渡区由下方 area 预算收缩处理（锚定最近角点、只砍远端），见 extent getter。
   */
  private static readonly HORIZON_CAP_FACTOR = 2500;

  /** 与 XYZTileScheme.MAX_TILES_PER_VIEW 保持一致（本地常量避免 camera → tile 依赖） */
  private static readonly MAX_TILES_PER_VIEW = 512;

  /** 与 XYZTileScheme.TILE_TARGET_PX 保持一致 */
  private static readonly TILE_TARGET_PX = 400;

  /**
   * CRS 空间视野范围。
   *
   * 按「屏幕四角视线与地面(z=0)的交点」取 AABB（标准 footprint 算法）。
   * 倾斜时远端地面覆盖远大于近端（45°/6km 时远端到 ~11.6km、近端仅 ~3.1km），
   * 旧的对称扩展（1/cos(θ)）会欠覆盖远端 → 屏幕顶部灰带，且过度覆盖近端 → 调度浪费。
   * 取真实可视梯形的 AABB 能精确覆盖可见地面，倾斜角任意都成立。
   */
  get extent(): [number, number, number, number] {
    const target = this.controls.target;
    const camPos = this.camera.position;

    const vFov = THREE.MathUtils.degToRad(this.camera.fov);
    const halfV = Math.tan(vFov / 2);
    const halfH = halfV * this.camera.aspect;

    // 相机局部基：fwd（视线朝向）、right（屏幕右）、up2（屏幕上）。
    // 注意右手系：right = fwd × up，up2 = right × fwd。
    const fwd = new THREE.Vector3()
      .subVectors(target, camPos)
      .normalize();
    const up = new THREE.Vector3(0, 0, 1);
    const right = new THREE.Vector3().crossVectors(fwd, up);
    // 近正俯视（polar≈0）时 fwd ∥ up → right 退化。minPolarAngle(0.15) 已挡，
    // 防御性兜底：退化时退回对称矩形近似。
    if (right.lengthSq() < 1e-12) {
      const dist = camPos.distanceTo(target);
      const halfHt = halfV * dist;
      const halfWd = halfHt * this.camera.aspect;
      const MAXd = PerspectiveMapController.MAX_EXTENT_HALF;
      return [
        Math.max(target.x - MAXd, target.x - halfWd),
        Math.max(target.y - MAXd, target.y - halfHt),
        Math.min(target.x + MAXd, target.x + halfWd),
        Math.min(target.y + MAXd, target.y + halfHt),
      ];
    }
    right.normalize();
    const up2 = new THREE.Vector3().crossVectors(right, fwd);

    // 四角视线方向（不必归一化：交点 t = -camPos.z / dir.z 随 |dir| 反比，结果不变）
    const MAX = PerspectiveMapController.MAX_EXTENT_HALF;
    let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
    let aboveHorizon = false;
    for (const sx of [-1, 1]) {
      for (const sy of [-1, 1]) {
        const dir = new THREE.Vector3()
          .copy(fwd)
          .addScaledVector(right, sx * halfH)
          .addScaledVector(up2, sy * halfV);
        if (dir.z >= 0) {
          // 视线越过地平线（无地面交点，极远）→ 钳位到半个地球
          aboveHorizon = true;
          continue;
        }
        const t = -camPos.z / dir.z;
        const gx = camPos.x + t * dir.x;
        const gy = camPos.y + t * dir.y;
        if (gx < x0) x0 = gx;
        if (gy < y0) y0 = gy;
        if (gx > x1) x1 = gx;
        if (gy > y1) y1 = gy;
      }
    }

    const res = Math.max(this.resolution, 1e-9);
    const cap = Math.min(
      res * PerspectiveMapController.HORIZON_CAP_FACTOR,
      MAX,
    );

    // 单一 zoom 调度下瓦片数 = (extentW × extentH) / (res × TILE_TARGET_PX)²。
    // 预算面积：512 × (400·res)²。面积一旦超预算，getVisibleTiles 撞 512 上限后
    // 按行优先返回任意条带（不覆盖视野）→ 调度 churn、空白 + 帧率崩塌。
    const budgetArea =
      PerspectiveMapController.MAX_TILES_PER_VIEW *
      Math.pow(PerspectiveMapController.TILE_TARGET_PX * res, 2);
    const area = (x1 - x0) * (y1 - y0);

    if (aboveHorizon || area > budgetArea) {
      // 触发条件有两种（旧实现都把 extent 钳到 ±半个地球 → 全球调度 → 帧率崩塌）：
      //   1. aboveHorizon：相机近水平倾斜（俯仰超过 fov 半角 + 90° 阈值），屏幕上方
      //      视线越过地平线、无地面交点，可见地面沿该方向延伸到无限远。
      //   2. 未越过地平线但接近地平线（俯仰 ≈ 53°~60° 过渡区）：屏幕上方视线仍与地面
      //      相交，但近水平射线的地面交点可达数百至数千公里 → 面积远超瓦片预算。
      // 统一按「当前分辨率 × 预算系数」把远处钳到以 target 为中心的有界范围
      // （见 HORIZON_CAP_FACTOR 注释）。以 target 为中心保证地图中心始终有瓦片
      // （角落锚定收缩会把 target 挤出 extent → 屏幕中心空白，更糟）。
      // 近水平视角下远处只是屏幕顶部一条低分辨率细带，截掉不损失观感；
      // 正常浏览角度（≤~53°）面积在预算内，不触发、零裁剪。
      x0 = target.x - cap;
      y0 = target.y - cap;
      x1 = target.x + cap;
      y1 = target.y + cap;
    }

    return [
      Math.max(target.x - MAX, x0),
      Math.max(target.y - MAX, y0),
      Math.min(target.x + MAX, x1),
      Math.min(target.y + MAX, y1),
    ];
  }

  /** 当前分辨率（米/像素） */
  get resolution(): number {
    const dist = this.camera.position.distanceTo(this.controls.target);
    const vFov = THREE.MathUtils.degToRad(this.camera.fov);
    const groundHeight = 2 * Math.tan(vFov / 2) * dist;
    const h = this._container?.clientHeight ?? 600;
    return groundHeight / Math.max(h, 1);
  }

  attach(container: HTMLElement): void {
    this._container = container;

    // OrbitControls 隐式接管 pointer events
    this.controls.domElement = container;
    this.controls.connect(container);

    // 容器尺寸变化 → 更新相机 aspect
    this._resizeObserver = new ResizeObserver(() => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      this.camera.aspect = w / Math.max(h, 1);
      this.camera.updateProjectionMatrix();
    });
    this._resizeObserver.observe(container);
  }

  detach(): void {
    this.controls.disconnect();
    if (this._resizeObserver) {
      this._resizeObserver.disconnect();
      this._resizeObserver = null;
    }
    this._container = null;
  }

  update(_deltaTime: number): void {
    // 动态 polar angle：高空限制俯视，低空允许倾斜
    // GIS 引擎设计约束：
    //   1. 相机永远不能低于地平线（maxPolarAngle ≤ π/2）
    //   2. 正常浏览距离（<500km）允许完全自由倾斜
    //   3. 仅在极远距离（全球视图）才逐步限制为俯视
    const dist = this.camera.position.distanceTo(this.controls.target);

    // 动态上限：使用线性衰减，仅在极远距离才限制倾斜
    //   dist ≤ 500,000 (500km) → 允许完全自由倾斜（用户配置上限）
    //   dist = 5,000,000 (5000km) → 约 60% 的用户上限
    //   dist = 50,000,000 (全球) → 约 18% 的用户上限（近俯视）
    const freeRange = 5e5; // 500km 内完全自由
    const ratio = dist <= freeRange ? 1 : freeRange / dist;
    const rawMax = this._userMaxPolar * ratio;
    // 钳位到 [_minPolarAngle, _userMaxPolar]
    const dynamicMax = Math.max(this._minPolarAngle, Math.min(rawMax, this._userMaxPolar));
    this.controls.maxPolarAngle = dynamicMax;

    this.controls.update();

    // GIS 约束：锁定 target 在地面平面（z=0）
    // OrbitControls 的 screenSpacePanning 在相机倾斜时会让 target.z 漂移，
    // 导致向上平移方向异常（表现为“不能向上翻转”）。
    this.controls.target.z = 0;
  }

  dispose(): void {
    this.detach();
    this.controls.dispose();
  }

  // ---- 便捷方法 ----

  /** 设置地图中心（CRS 坐标） */
  setCenter(x: number, y: number): void {
    this.controls.target.set(x, y, 0);
    this.camera.lookAt(x, y, 0);
  }

  /** 设置相机到地面的距离 */
  setDistance(dist: number): void {
    const dir = this.camera.position
      .clone()
      .sub(this.controls.target)
      .normalize();
    this.camera.position.copy(
      this.controls.target.clone().addScaledVector(dir, dist),
    );
  }
}
