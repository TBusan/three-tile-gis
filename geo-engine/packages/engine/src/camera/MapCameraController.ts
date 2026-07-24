// geo-engine/packages/engine/src/camera/MapCameraController.ts

import type { CrsCoord } from "../core/types";
import type { ICameraController } from "./ICameraController";

/**
 * 简易地图相机控制器
 *
 * Phase 1 最小实现：支持鼠标拖拽平移和滚轮缩放。
 * 不含 Three.js 相机 — 只输出 CRS 空间的位置和范围。
 */
export class MapCameraController implements ICameraController {
  private _x = 0;
  private _y = 0;
  private _zoom = 1; // meters per pixel
  private _width = 800;
  private _height = 600;

  private _container: HTMLElement | null = null;
  private _dragging = false;
  private _lastMouseX = 0;
  private _lastMouseY = 0;

  private _onMouseDown: (e: MouseEvent) => void;
  private _onMouseMove: (e: MouseEvent) => void;
  private _onMouseUp: () => void;
  private _onWheel: (e: WheelEvent) => void;
  private _onResize: () => void;

  constructor(options?: { x?: number; y?: number; zoom?: number }) {
    this._x = options?.x ?? 0;
    this._y = options?.y ?? 0;
    this._zoom = options?.zoom ?? 1;

    this._onMouseDown = (e: MouseEvent) => {
      this._dragging = true;
      this._lastMouseX = e.clientX;
      this._lastMouseY = e.clientY;
    };

    this._onMouseMove = (e: MouseEvent) => {
      if (!this._dragging) return;
      const dx = e.clientX - this._lastMouseX;
      const dy = e.clientY - this._lastMouseY;
      this._x -= dx * this._zoom;
      this._y += dy * this._zoom;
      this._lastMouseX = e.clientX;
      this._lastMouseY = e.clientY;
    };

    this._onMouseUp = () => {
      this._dragging = false;
    };

    this._onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const factor = e.deltaY > 0 ? 1.1 : 0.9;
      this._zoom *= factor;
      this._zoom = Math.max(0.01, Math.min(1000, this._zoom));
    };

    this._onResize = () => {
      if (this._container) {
        this._width = this._container.clientWidth;
        this._height = this._container.clientHeight;
      }
    };
  }

  get cameraWorldPos(): CrsCoord {
    return { x: this._x, y: this._y, z: 0 };
  }

  get extent(): [number, number, number, number] {
    const halfW = (this._width / 2) * this._zoom;
    const halfH = (this._height / 2) * this._zoom;
    return [
      this._x - halfW, // xmin
      this._y - halfH, // ymin
      this._x + halfW, // xmax
      this._y + halfH, // ymax
    ];
  }

  attach(container: HTMLElement): void {
    this._container = container;
    this._width = container.clientWidth;
    this._height = container.clientHeight;

    container.addEventListener("mousedown", this._onMouseDown);
    window.addEventListener("mousemove", this._onMouseMove);
    window.addEventListener("mouseup", this._onMouseUp);
    container.addEventListener("wheel", this._onWheel, { passive: false });
    window.addEventListener("resize", this._onResize);
  }

  detach(): void {
    if (this._container) {
      this._container.removeEventListener("mousedown", this._onMouseDown);
      this._container.removeEventListener("wheel", this._onWheel);
    }
    window.removeEventListener("mousemove", this._onMouseMove);
    window.removeEventListener("mouseup", this._onMouseUp);
    window.removeEventListener("resize", this._onResize);
    this._container = null;
  }

  /** 设置视口中心到指定 CRS 坐标 */
  setCenter(x: number, y: number): void {
    this._x = x;
    this._y = y;
  }

  /** 设置缩放级别（米/像素） */
  setZoom(metersPerPixel: number): void {
    this._zoom = Math.max(0.01, Math.min(1000, metersPerPixel));
  }

  get zoom(): number {
    return this._zoom;
  }

  /** 分辨率（米/像素），同 zoom */
  get resolution(): number {
    return this._zoom;
  }

  update(_deltaTime: number): void {
    // 大多数更新在事件回调中处理
  }

  dispose(): void {
    this.detach();
  }
}
