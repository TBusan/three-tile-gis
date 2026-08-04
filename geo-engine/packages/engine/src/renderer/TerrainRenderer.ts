// geo-engine/packages/engine/src/renderer/TerrainRenderer.ts

import * as THREE from "three";
import type { Tile } from "../tile/Tile";
import { TileContent, RenderObject } from "../tile/TileContent";
import type { ILayerRenderer } from "./ILayerRenderer";
import { SkirtedMesh } from "./quality/SkirtedMesh";

/**
 * 地形叠加数据 — DEM 网格 + 底图影像，二者合成一个 Mesh（零 z-fighting）。
 * 由 demo 级 TerrainOverlaySource 并行取 RGBTerrainSource（高程）与
 * XYZTileSource（影像）组装。
 */
export interface TerrainOverlayData {
  width: number;
  height: number;
  /** 高程数组（米），行主序：row 0 = 南端 */
  elevations: Float32Array;
  /** 底图影像（位图第 0 行 = 南端，与 elevations 方向一致） */
  image: ImageBitmap;
}

/**
 * TerrainRenderer 配置
 */
export interface TerrainRendererOptions {
  name?: string;
  /**
   * 每级瓦片的网格细分密度（N×N 网格）。默认 three-tile 公式
   * clamp((level+2)*3, 2, 64)。与 DEM targetSize 解耦：网格顶点按
   * `getElevation` 回调双线性采样 DEM，任何组合都成立。
   */
  gridSizeForLevel?: (level: number) => number;
  /**
   * 裙边深度（米，默认 600）。向下延伸 tile 四周边界，填充相邻 LOD
   * 层级之间的高程差裂缝（three-tile `geometry/skirt.ts` 概念）。
   */
  skirtHeight?: number;
}

/**
 * TerrainRenderer — 把地形叠加数据渲染为带底图纹理的位移网格
 *
 * 每个 tile 一个 SkirtedMesh（DEM 位移 + 四边裙边）+ MeshLambertMaterial（底图
 * 纹理）。纹理在位移网格之上精确贴合 → 影像「蒙」在立体山体上。与 three-tile
 * TileMapLoader「geometry(demSource) + material(imgSource) 合成一个 Mesh」一致。
 *
 * 方向约定（沿用任务 #66 已验证约定）：
 *   - 数据源用 imageOrientation:"flipY" 预翻转 → 位图第 0 行 = 南端；
 *   - 本渲染器设 texture.flipY=false 原样上传 → 位图第 0 行贴到网格 v=0（南）顶点；
 *   - SkirtedMesh 网格 row=0 → crsY=ymin（南）→ 与 DEM 行 0 = 南端完全对齐。
 *
 * Lambert 材质：方向光/环境光下表现山体明暗（relief 可见）。地形面彼此不共面
 * （DEM 位移），无需 polygonOffset（无 z-fighting）。
 *
 * 用法（demo tileLoadFn 中）：
 *   const content = await renderer.createContent(data, tile, layer.id);
 */
export class TerrainRenderer implements ILayerRenderer<TerrainOverlayData> {
  readonly name: string;
  private readonly _gridSizeForLevel: (level: number) => number;
  private readonly _skirtHeight: number;

  constructor(options: TerrainRendererOptions = {}) {
    this.name = options.name ?? "terrain-renderer";
    this._gridSizeForLevel =
      options.gridSizeForLevel ??
      ((level) => Math.max(2, Math.min(64, (level + 2) * 3)));
    this._skirtHeight = options.skirtHeight ?? 600;
  }

  async createContent(
    data: TerrainOverlayData,
    tile: Tile,
    layerId?: string,
  ): Promise<TileContent> {
    const content = new TileContent(
      `terrain-${tile.key.id}`,
      tile.key,
      layerId ?? "terrain-layer",
    );
    content.renderer = this;

    // 1. 位移网格 + 裙边（每瓦片 DEM 不同 → 不共享几何）
    const gridSize = this._gridSizeForLevel(tile.key.level);
    const sampler = this._createSampler(data, tile.bounds);
    const geometry = new SkirtedMesh(
      sampler,
      gridSize,
      this._skirtHeight,
    ).createGeometry(tile.bounds, tile.origin);

    // 2. 底图纹理（与 RasterRenderer 相同的翻转约定：数据源已 flipY 预翻转，
    //    位图第 0 行 = 南端；这里 flipY=false 原样上传）
    const texture = new THREE.Texture(data.image as unknown as TexImageSource);
    texture.flipY = false;
    texture.needsUpdate = true;
    const isPOT = (v: number) => v > 0 && (v & (v - 1)) === 0;
    texture.generateMipmaps =
      isPOT(data.image.width) && isPOT(data.image.height);
    texture.minFilter = texture.generateMipmaps
      ? THREE.LinearMipmapLinearFilter
      : THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.colorSpace = THREE.SRGBColorSpace;

    // 3. Lambert 材质：方向光/环境光下表现山体明暗（relief 可见）
    const material = new THREE.MeshLambertMaterial({
      map: texture,
      side: THREE.FrontSide,
    });

    // 4. Mesh — 细(高 level)瓦片后画，避免 LOD 接缝处深度竞争
    const mesh = new THREE.Mesh(geometry, material);
    mesh.renderOrder = tile.key.level;

    // 5. RenderObject — 每瓦片独立 geometry/material，dispose 时各自释放
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
    // 释放所有 renderObject 的纹理（在 RenderObject dispose 之前）。
    // 只释放 map 纹理：geometry/material 由 RenderObject 的 disposeFn 负责。
    for (const ro of content.renderObjects) {
      const mesh = ro.object as THREE.Mesh;
      if (!mesh?.material) continue;
      const materials = Array.isArray(mesh.material)
        ? mesh.material
        : [mesh.material];
      for (const mat of materials) {
        if ("map" in mat && (mat as THREE.MeshLambertMaterial).map) {
          (mat as THREE.MeshLambertMaterial).map!.dispose();
        }
      }
    }
  }

  /** 释放渲染器持有的共享资源（本渲染器无共享资源，空实现）。 */
  dispose(): void {
    // 每瓦片独立 geometry/material，无共享资源
  }

  // ---- private ----

  /**
   * 高程采样回调（供 SkirtedMesh）：CRS 坐标 → 米。
   * 用 tile.bounds 把 CRS 坐标映射到 DEM 像素坐标，双线性插值。
   * 边界钳制到 [0, width-1]/[0, height-1]，避免瓦片外采样越界。
   */
  private _createSampler(
    data: TerrainOverlayData,
    bounds: [number, number, number, number],
  ): (x: number, y: number) => number {
    const { width, height, elevations } = data;
    const [xmin, ymin, xmax, ymax] = bounds;
    const xScale = (width - 1) / (xmax - xmin);
    const yScale = (height - 1) / (ymax - ymin);

    return (crsX: number, crsY: number): number => {
      const colF = Math.max(
        0,
        Math.min(width - 1, (crsX - xmin) * xScale),
      );
      const rowF = Math.max(
        0,
        Math.min(height - 1, (crsY - ymin) * yScale),
      );
      const c0 = Math.floor(colF);
      const r0 = Math.floor(rowF);
      const c1 = Math.min(width - 1, c0 + 1);
      const r1 = Math.min(height - 1, r0 + 1);
      const fx = colF - c0;
      const fy = rowF - r0;
      return (
        elevations[r0 * width + c0] * (1 - fx) * (1 - fy) +
        elevations[r0 * width + c1] * fx * (1 - fy) +
        elevations[r1 * width + c0] * (1 - fx) * fy +
        elevations[r1 * width + c1] * fx * fy
      );
    };
  }
}
