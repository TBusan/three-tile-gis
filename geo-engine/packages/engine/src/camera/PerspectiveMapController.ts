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
  /** 最大俯仰角（弧度），默认接近垂直俯视 */
  maxPolarAngle?: number;
  /** 视场角（度），默认 70 */
  fov?: number;
  /** 近裁剪面（米），默认 100 */
  near?: number;
  /** 远裁剪面（米），默认 5e7 */
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

  constructor(options: PerspectiveMapControllerOptions = {}) {
    const {
      center = { x: 0, y: 0 },
      distance = 2e5,
      maxPolarAngle = Math.PI / 2.4,
      fov = 70,
      near = 100,
      far = 5e7,
    } = options;

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
    // 鼠标映射：LEFT = PAN, RIGHT = ROTATE, MIDDLE = DOLLY
    this.controls.mouseButtons = {
      LEFT: THREE.MOUSE.PAN,
      MIDDLE: THREE.MOUSE.DOLLY,
      RIGHT: THREE.MOUSE.ROTATE,
    };
    this.controls.minDistance = 100;
    this.controls.maxDistance = 3e7;
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
    const dist = this.camera.position.distanceTo(this.controls.target);
    // 匹配原始 three-tile: maxPolarAngle = min((10_000_000 / dist)^2, π/2.2)
    const dynamicMax = Math.min(
      Math.pow(1e7 / Math.max(dist, 100), 2),
      Math.PI / 2.2,
    );
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
