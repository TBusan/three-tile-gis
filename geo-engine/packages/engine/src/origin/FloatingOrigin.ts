// geo-engine/packages/engine/src/origin/FloatingOrigin.ts

import type { CrsCoord } from "../core/types";
import type { IFloatingOrigin } from "./IFloatingOrigin";

/**
 * Floating Origin 默认实现
 *
 * 当相机离开当前原点超过 threshold 时，更新原点为相机位置
 * 并标记 dirty = true。调用方在 dirty 帧更新所有 Tile Group.position。
 *
 * 原点取整到 nearest（而非 floor），减少漂移累积。
 */
export class FloatingOrigin implements IFloatingOrigin {
  private _current: CrsCoord;
  private _dirty = false;
  readonly threshold: number;

  constructor(options?: { threshold?: number; initial?: CrsCoord }) {
    this.threshold = options?.threshold ?? 500;
    this._current = options?.initial ?? { x: 0, y: 0, z: 0 };
  }

  get current(): CrsCoord {
    return { ...this._current };
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
