// geo-engine/packages/engine/src/camera/ICameraController.ts

import type { CrsCoord } from "../core/types";

/**
 * 相机控制器接口
 *
 * 将用户输入（鼠标/触摸/键盘）转换为相机状态。
 * 输出 CRS 空间中的相机位置和视野范围。
 */
export interface ICameraController {
  /** CRS 空间中的相机位置 */
  readonly cameraWorldPos: CrsCoord;
  /** CRS 空间中的视野范围 [xmin, ymin, xmax, ymax] */
  readonly extent: [number, number, number, number];
  /** 可选：当前分辨率（米/像素），用于 tile 级别选择 */
  readonly resolution?: number;

  /** 绑定到 DOM 元素 */
  attach(container: HTMLElement): void;
  /** 解绑 */
  detach(): void;
  /** 每帧更新 */
  update(deltaTime: number): void;
  /** 销毁 */
  dispose(): void;
}
