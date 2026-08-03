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
    this.controls.minPolarAngle = 0; // 允许完全俯视
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
   * CRS 空间视野范围。
   *
   * 考虑相机倾斜角的视野范围计算：
   *   - 垂直俯视时：简单矩形近似
   *   - 倾斜时：远端地面覆盖远大于近端，需扩展 extent
   *
   * 倾斜补偿原理：
   *   polar angle θ 越大（越接近地平线），视野远端地面距离越大。
   *   使用 1/cos(θ) 近似扩展因子，确保远端瓦片被包含在调度范围内。
   */
  get extent(): [number, number, number, number] {
    const target = this.controls.target;
    const camPos = this.camera.position;
    const dist = camPos.distanceTo(target);
    const vFov = THREE.MathUtils.degToRad(this.camera.fov);

    // 计算 polar angle（相机与垂直方向的夹角）
    const heightDiff = Math.abs(camPos.z - target.z);
    const polarAngle = Math.acos(Math.min(1, heightDiff / Math.max(dist, 1)));

    // 基础半尺寸（垂直俯视时的近似）
    const halfH = Math.tan(vFov / 2) * dist;
    const aspect = this.camera.aspect;
    const halfW = halfH * aspect;

    // 倾斜补偿：当 polar angle > 0 时，远端地面覆盖增大
    // 使用保守的扩展因子，确保远端瓦片不被遗漏
    // cos(polarAngle) 在 0° 时为 1（无扩展），在 80° 时约 0.17（扩展约 6 倍）
    const cosPolar = Math.cos(polarAngle);
    const tiltFactor = cosPolar > 0.1 ? 1 / cosPolar : 10; // 钳位防止极端值
    // 对宽度和高度都应用扩展（倾斜时两侧也变宽）
    const expandedHalfW = halfW * Math.min(tiltFactor, 4);
    const expandedHalfH = halfH * Math.min(tiltFactor, 4);

    // 硬钳位：防止单次 extent 超过半个地球周长
    const MAX = PerspectiveMapController.MAX_EXTENT_HALF;
    return [
      Math.max(target.x - MAX, target.x - expandedHalfW),
      Math.max(target.y - MAX, target.y - expandedHalfH),
      Math.min(target.x + MAX, target.x + expandedHalfW),
      Math.min(target.y + MAX, target.y + expandedHalfH),
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
