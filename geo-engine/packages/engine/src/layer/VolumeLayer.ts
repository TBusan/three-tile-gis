// geo-engine/packages/engine/src/layer/VolumeLayer.ts

import type { IProjectCRS } from "../crs/IProjectCRS";
import type { CrsBounds } from "../core/types";
import type { TileKey } from "../tile/TileKey";
import type { ITileScheme } from "../tile/ITileScheme";
import type { IDataSource } from "../source/IDataSource";
import type { ILayerRenderer } from "../renderer/ILayerRenderer";
import type { ILayer, LayerType } from "./ILayer";

/** VolumeLayer 构造选项 */
export interface VolumeLayerOptions {
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
 * 体渲染图层 — 组合 TileScheme + GPRSource + VolumeRenderer
 *
 * 后续实现将支持：
 *   - GPR 数据体渲染
 *   - 医学影像 / 气象体数据
 *   - Ray Marching 实时渲染
 *
 * 用法：
 *   const layer = new VolumeLayer({
 *     name: "地下雷达",
 *     tileScheme: new ProjectTileScheme(500),
 *     dataSource: new GPRSource("./scan.gpr", crs),
 *     renderer: new VolumeRenderer(),
 *   });
 */
export class VolumeLayer implements ILayer {
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

  constructor(options: VolumeLayerOptions) {
    this.id = options.id ?? `volume-${++VolumeLayer._nextId}`;
    this.name = options.name;
    this.type = options.type ?? "volume";
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
