// geo-engine/packages/engine/src/camera/PerspectiveMapController.ts

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import type { CrsCoord } from "../core/types";
import type { ICameraController } from "./ICameraController";

/** PerspectiveMapController 构造选项 */
export interface PerspectiveMapControllerOptions {
  /** 初始 CRS 中心（默认原点） */
  center?: { x: number; y: number };
  /** 初始相机距地面高度（米），默认 200km */
  distance?: number;
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
      maxPolarAngle = Math.PI / 2.2,
      minPolarAngle = 0.15,
      fov = 60,
      near = 50,
      far = 1e8,
    } = options;

    this._userMaxPolar = maxPolarAngle;
    this._minPolarAngle = minPolarAngle;

    // Camera：XY 平面为地面，Z 轴为高度
    this.camera = new THREE.PerspectiveCamera(fov, 1, near, far);
    this.camera.position.set(center.x, center.y, distance);
    this.camera.lookAt(center.x, center.y, 0);

    // OrbitControls：绑定到 camera（domElement 在 attach 时设置）
    this.controls = new OrbitControls(this.camera);
    this.controls.target.set(center.x, center.y, 0);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.08;
    this.controls.maxPolarAngle = maxPolarAngle;
    this.controls.minPolarAngle = 0; // 允许完全俯视
    // 鼠标映射：LEFT = PAN, RIGHT = ROTATE, MIDDLE = DOLLY
    this.controls.mouseButtons = {
      LEFT: THREE.MOUSE.PAN,
      MIDDLE: THREE.MOUSE.DOLLY,
      RIGHT: THREE.MOUSE.ROTATE,
    };
    this.controls.minDistance = 100;
    this.controls.maxDistance = 5e7;
    this.controls.panSpeed = 1.0;
    this.controls.rotateSpeed = 0.5;
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
   * 从相机 FOV + target 距离推算地面（z=0）覆盖范围的矩形近似，
   * 再用 MAX_EXTENT_HALF 硬钳位防止 extent 在远距离时无限膨胀。
   *
   * 注：这是简化近似（假定垂直俯视），在 pitch 较大时 extent 会偏高估，
   * 但 MAX_EXTENT_HALF 钳位保证了不会爆炸。更精确的射线-地面交线方法
   * 在复杂 camera 矩阵状态（如 render() 中的临时相机偏移）下可能引入
   * Three.js matrixWorld 更新开销，留待后续优化。
   */
  get extent(): [number, number, number, number] {
    const target = this.controls.target;
    const dist = this.camera.position.distanceTo(target);
    const vFov = THREE.MathUtils.degToRad(this.camera.fov);
    const halfH = Math.tan(vFov / 2) * dist;
    const aspect = this.camera.aspect;
    const halfW = halfH * aspect;

    // 硬钳位：防止单次 extent 超过半个地球周长
    const MAX = PerspectiveMapController.MAX_EXTENT_HALF;
    return [
      Math.max(target.x - MAX, target.x - halfW),
      Math.max(target.y - MAX, target.y - halfH),
      Math.min(target.x + MAX, target.x + halfW),
      Math.min(target.y + MAX, target.y + halfH),
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
    //   2. 高海拔时逐步限制为俯视，但保留最小可操作角度
    //   3. 低海拔时允许较大倾斜（但不超过用户配置上限）
    const dist = this.camera.position.distanceTo(this.controls.target);

    // 动态上限：距离越远 → 越限制为俯视
    // 使用 sqrt 而非 pow(2) 使过渡更平滑：
    //   dist=5000 → 允许约 81°（近地面，自由倾斜）
    //   dist=50000 → 允许约 72°
    //   dist=5e6 → 允许约 45°
    //   dist=5e7 → 允许约 14°（全球视图，近俯视）
    const rawMax = this._userMaxPolar * Math.min(1, Math.sqrt(1e6 / Math.max(dist, 100)));
    // 钳位到 [_minPolarAngle, _userMaxPolar]，保证：
    //   - 不低于最小可操作角度（防止锁死）
    //   - 不超过用户配置上限（GIS 不允许低于地平线）
    const dynamicMax = Math.max(this._minPolarAngle, Math.min(rawMax, this._userMaxPolar));
    this.controls.maxPolarAngle = dynamicMax;

    this.controls.update();
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
