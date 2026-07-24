// geo-engine/packages/engine/src/renderer/PointCloudRenderer.ts

import type { Tile } from "../tile/Tile";
import { TileContent } from "../tile/TileContent";
import type { ILayerRenderer } from "./ILayerRenderer";

/**
 * 点云渲染器（占位实现）
 *
 * 后续实现将支持八叉树 LOD：
 *   - 远处稀疏采样 → 少量 Points
 *   - 近处原始密度 → 全分辨率 Points
 *   - 基于相机距离的动态 LOD 切换
 */
export class PointCloudRenderer implements ILayerRenderer<unknown> {
  readonly name: string;

  constructor(name = "pointcloud-renderer") {
    this.name = name;
  }

  async createContent(_data: unknown, _tile: Tile): Promise<TileContent> {
    throw new Error(
      "PointCloudRenderer: not implemented — coming in a future release",
    );
  }

  disposeContent(_content: TileContent): void {
    // no-op
  }
}
