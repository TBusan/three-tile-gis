// geo-engine/packages/engine/src/renderer/RasterRenderer.ts

import * as THREE from "three";
import type { Tile } from "../tile/Tile";
import { TileContent, RenderObject } from "../tile/TileContent";
import type { ILayerRenderer } from "./ILayerRenderer";
import type { IQualityTier } from "./quality/IQualityTier";
import { SimplePlane } from "./quality/SimplePlane";

/**
 * RasterRenderer 配置
 */
export interface RasterRendererOptions {
  name?: string;
  /** 几何体质量等级（默认 SimplePlane） */
  quality?: IQualityTier;
}

/**
 * 栅格渲染器 — 将 ImageBitmap 渲染为 Three.js 平面 Mesh
 *
 * 每个 tile 创建一个 PlaneGeometry + MeshBasicMaterial（纹理映射），
 * 几何体顶点在 tile.origin 的局部坐标中。
 *
 * 用法：
 *   const renderer = new RasterRenderer({ name: "osm-renderer" });
 *   // 在 tileLoadFn 中：
 *   const content = await renderer.createContent(imageBitmap, tile);
 */
export class RasterRenderer implements ILayerRenderer<ImageBitmap> {
  readonly name: string;
  private readonly quality: IQualityTier;

  constructor(options: RasterRendererOptions = {}) {
    this.name = options.name ?? "raster-renderer";
    this.quality = options.quality ?? new SimplePlane();
  }

  async createContent(data: ImageBitmap, tile: Tile, layerId?: string): Promise<TileContent> {
    const content = new TileContent(
      `raster-${tile.key.id}`,
      tile.key,
      layerId ?? "raster-layer",
    );

    // 1. 从 ImageBitmap 创建 Three.js 纹理
    const texture = new THREE.Texture(data as unknown as TexImageSource);
    texture.needsUpdate = true;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.colorSpace = THREE.SRGBColorSpace;

    // 2. 创建几何体（局部坐标）
    // XYZ 瓦片：tile.reprojector 提供逐顶点重投影（设计文档 §3.5）
    // Project 瓦片：reprojector 为 undefined，线性插值 bounds
    // 传入 tile.key.level 供自适应质量层按缩放级别选择网格密度（低 zoom 更细）
    const geometry = this.quality.createGeometry(
      tile.bounds,
      tile.origin,
      tile.reprojector,
      tile.key.level,
    );

    // 3. 创建材质
    // polygonOffset 防止多图层叠加时 z-fighting：
    // 底图 factor=1 稍向后推，叠加层默认 factor=0 在前。
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.DoubleSide,
      polygonOffset: true,
      polygonOffsetFactor: 1,
      polygonOffsetUnits: 1,
    });

    // 4. 创建 Mesh
    const mesh = new THREE.Mesh(geometry, material);

    // 5. 包装 RenderObject
    const ro = new RenderObject(mesh, (obj: unknown) => {
      const m = obj as THREE.Mesh;
      m.geometry.dispose();
      if (Array.isArray(m.material)) {
        for (const mat of m.material) mat.dispose();
      } else {
        m.material.dispose();
      }
    });

    content.renderObjects.push(ro);
    content.data = data;
    content.state = "ready";

    return content;
  }

  disposeContent(content: TileContent): void {
    // 释放所有 renderObject 的纹理（在 RenderObject dispose 之前）
    for (const ro of content.renderObjects) {
      const mesh = ro.object as THREE.Mesh;
      if (!mesh?.material) continue;
      const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      for (const mat of materials) {
        if ("map" in mat && (mat as THREE.MeshBasicMaterial).map) {
          (mat as THREE.MeshBasicMaterial).map!.dispose();
        }
      }
    }
  }
}
