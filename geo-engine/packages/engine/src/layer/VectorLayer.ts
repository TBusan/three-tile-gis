// geo-engine/packages/engine/src/layer/VectorLayer.ts

import type { IProjectCRS } from "../crs/IProjectCRS";
import type { CrsBounds } from "../core/types";
import type { TileKey } from "../tile/TileKey";
import type { ITileScheme } from "../tile/ITileScheme";
import type { IDataSource } from "../source/IDataSource";
import type { ILayerRenderer } from "../renderer/ILayerRenderer";
import type { ILayer, LayerType } from "./ILayer";

/** VectorLayer 构造选项 */
export interface VectorLayerOptions {
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
 * 矢量图层 — 组合 TileScheme + DataSource + VectorRenderer
 *
 * 与 RasterLayer 结构相同，仅默认 type 为 "vector"。
 *
 * 用法：
 *   const layer = new VectorLayer({
 *     name: "道路",
 *     tileScheme: new ProjectTileScheme(500),
 *     dataSource: new GeoJSONSource("./roads.geojson", crs),
 *     renderer: new VectorRenderer(new DefaultMaterialFactory()),
 *   });
 */
export class VectorLayer implements ILayer {
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

  constructor(options: VectorLayerOptions) {
    this.id = options.id ?? `vector-${++VectorLayer._nextId}`;
    this.name = options.name;
    this.type = options.type ?? "vector";
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
