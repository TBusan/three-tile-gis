// geo-engine/packages/engine/src/layer/RasterLayer.ts

import type { IProjectCRS } from "../crs/IProjectCRS";
import type { CrsBounds } from "../core/types";
import type { TileKey } from "../tile/TileKey";
import type { ITileScheme } from "../tile/ITileScheme";
import type { IDataSource } from "../source/IDataSource";
import type { ILayerRenderer } from "../renderer/ILayerRenderer";
import type { ILayer, LayerType } from "./ILayer";

/** RasterLayer 构造选项 */
export interface RasterLayerOptions {
  id?: string;
  name: string;
  type?: LayerType;
  tileScheme: ITileScheme;
  dataSource: IDataSource;
  renderer: ILayerRenderer;
  visible?: boolean;
  opacity?: number;
  zIndex?: number;
  dependsOn?: ILayer[];
}

/**
 * 栅格图层 — 最常用的 Layer 实现
 *
 * 用法：
 *   const layer = new RasterLayer({
 *     name: "正射影像",
 *     tileScheme: new ProjectTileScheme(500),
 *     dataSource: new GeoTIFFSource({ url: "./ortho.tif", crs: ... }),
 *     renderer: new RasterRenderer({ qualityTier: new SimplePlane() }),
 *   });
 */
export class RasterLayer implements ILayer {
  readonly id: string;
  readonly name: string;
  readonly type: LayerType;
  visible: boolean;
  opacity: number;
  zIndex: number;
  readonly tileScheme: ITileScheme;
  readonly dataSource: IDataSource;
  readonly renderer: ILayerRenderer;
  readonly dependsOn: ILayer[];

  constructor(options: RasterLayerOptions) {
    this.id = options.id ?? `raster-${++RasterLayer._nextId}`;
    this.name = options.name;
    this.type = options.type ?? "raster";
    this.tileScheme = options.tileScheme;
    this.dataSource = options.dataSource;
    this.renderer = options.renderer;
    this.visible = options.visible ?? true;
    this.opacity = options.opacity ?? 1;
    this.zIndex = options.zIndex ?? 0;
    this.dependsOn = options.dependsOn ?? [];
  }

  getVisibleTiles(
    extent: CrsBounds,
    crs: IProjectCRS,
    resolution?: number,
  ): TileKey[] {
    if (!this.visible) return [];
    return this.tileScheme.getTilesInView(extent, crs, resolution);
  }

  private static _nextId = 0;
}
