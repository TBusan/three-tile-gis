// geo-engine/packages/engine/src/origin/IFloatingOrigin.ts

import type { CrsCoord } from "../core/types";

/**
 * Floating Origin — 全局精度偏移
 *
 * 相机离开当前原点超过阈值时，统一平移所有 Tile 的 Group.position，
 * 相机归零。避免 GPU 大坐标精度丢失。
 */
export interface IFloatingOrigin {
  /** 当前世界原点 */
  readonly current: CrsCoord;
  /** 触发平移的阈值（米） */
  readonly threshold: number;
  /** 本帧是否发生了平移（性能优化：只有 dirty 时才更新 position） */
  readonly dirty: boolean;

  /**
   * 根据相机位置更新原点，返回 true 表示原点发生了平移
   */
  update(cameraWorldPos: CrsCoord): boolean;

  /** 重置原点 */
  reset(): void;
}
