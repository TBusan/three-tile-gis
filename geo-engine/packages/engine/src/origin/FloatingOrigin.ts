// geo-engine/packages/engine/src/origin/FloatingOrigin.ts

import type { CrsCoord } from "../core/types";
import type { IFloatingOrigin } from "./IFloatingOrigin";

/**
 * Floating Origin 默认实现
 *
 * 当相机离开当前原点超过 threshold 时，更新原点为相机位置
 * 并标记 dirty = true。调用方在 dirty 帧更新所有 Tile Group.position。
 *
 * 原点直接取相机位置（不取整）：相机即视野中心，取整会让原点偏离
 * 视野中心反而增大局部坐标量级；相机位置本身量级有限，无累积误差。
 */
export class FloatingOrigin implements IFloatingOrigin {
  private _current: CrsCoord;
  private _dirty = false;
  readonly threshold: number;

  constructor(options?: { threshold?: number; initial?: CrsCoord }) {
    this.threshold = options?.threshold ?? 500;
    this._current = options?.initial ?? { x: 0, y: 0, z: 0 };
  }

  /**
   * 获取当前原点坐标。
   * 返回内部引用（只读语义），避免每帧创建新对象增加 GC 压力。
   * 调用方不应修改返回值。
   */
  get current(): CrsCoord {
    return this._current;
  }

  get dirty(): boolean {
    return this._dirty;
  }

  update(cameraWorldPos: CrsCoord): boolean {
    const dx = cameraWorldPos.x - this._current.x;
    const dy = cameraWorldPos.y - this._current.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist > this.threshold) {
      this._current = {
        x: cameraWorldPos.x,
        y: cameraWorldPos.y,
        z: 0,
      };
      this._dirty = true;
      return true;
    }

    this._dirty = false;
    return false;
  }

  reset(): void {
    this._current = { x: 0, y: 0, z: 0 };
    this._dirty = false;
  }
}
