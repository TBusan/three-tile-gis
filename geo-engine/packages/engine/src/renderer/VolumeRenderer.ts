// geo-engine/packages/engine/src/renderer/VolumeRenderer.ts

import type { Tile } from "../tile/Tile";
import { TileContent } from "../tile/TileContent";
import type { ILayerRenderer } from "./ILayerRenderer";

/**
 * 体渲染渲染器（占位实现）
 *
 * 后续实现将支持 Ray Marching：
 *   - VoxelGrid → Data3DTexture → BoxGeometry + ShaderMaterial
 *   - Fragment Shader 中光线步进
 *   - 等值面提取与 alpha 合成
 */
export class VolumeRenderer implements ILayerRenderer<unknown> {
  readonly name: string;

  constructor(name = "volume-renderer") {
    this.name = name;
  }

  async createContent(_data: unknown, _tile: Tile): Promise<TileContent> {
    throw new Error(
      "VolumeRenderer: not implemented — coming in a future release",
    );
  }

  disposeContent(_content: TileContent): void {
    // no-op
  }
}
