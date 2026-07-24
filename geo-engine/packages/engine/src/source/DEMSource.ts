// geo-engine/packages/engine/src/source/DEMSource.ts

import { fromUrl as geotiffFromUrl, type GeoTIFF } from "geotiff";
import type { CrsBounds } from "../core/types";
import type { IProjectCRS } from "../crs/IProjectCRS";
import type { TileKey } from "../tile/TileKey";
import type { IDataSource } from "./IDataSource";

/**
 * DEMSource 构造选项
 */
export interface DEMSourceOptions {
  /** DEM GeoTIFF 文件 URL */
  url: string;
  /** 数据的 CRS（必须与 Engine CRS 一致） */
  crs: IProjectCRS;
  /** 无效值/NoData 值（默认 NaN） */
  noDataValue?: number;
}

/**
 * DEM 高程数据源 — 从单波段 GeoTIFF 读取高程 Float32Array
 *
 * 每个 tile 获取对应窗口的 `Float32Array` 高程值（米），
 * 供 DemMesh / SkirtedMesh 直接采样。
 *
 * Phase 6 限制：数据 CRS 必须等于引擎 CRS（不做自动重投影）。
 */
export class DEMSource implements IDataSource<Float32Array> {
  readonly dataType = "dem";
  readonly crs: IProjectCRS;
  bounds: CrsBounds;

  private readonly _url: string;
  private readonly _noDataValue: number;
  private _tiffPromise: Promise<GeoTIFF> | null = null;
  private _imageWidth = 0;
  private _imageHeight = 0;
  private _bbox: [number, number, number, number] = [0, 0, 0, 0];

  constructor(options: DEMSourceOptions) {
    this._url = options.url;
    this.crs = options.crs;
    this._noDataValue = options.noDataValue ?? NaN;
    this.bounds = [0, 0, 0, 0] as CrsBounds;
  }

  async fetch(
    _key: TileKey,
    tileBounds: CrsBounds,
    signal?: AbortSignal,
  ): Promise<Float32Array> {
    const tiff = await this._load(signal);
    const image = await tiff.getImage();

    if (this._imageWidth === 0) {
      this._imageWidth = image.getWidth();
      this._imageHeight = image.getHeight();
      const bbox = image.getBoundingBox();
      this._bbox = [
        Math.min(bbox[0], bbox[2]),
        Math.min(bbox[1], bbox[3]),
        Math.max(bbox[0], bbox[2]),
        Math.max(bbox[1], bbox[3]),
      ];
      this.bounds = [...this._bbox] as CrsBounds;
    }

    const window = this._computeWindow(tileBounds);
    if (!window) {
      return new Float32Array(0); // empty — no elevation data
    }

    const rasters = await image.readRasters({
      window: [window.col, window.row, window.width, window.height],
      samples: [0], // single elevation band
    });

    // Convert to Float32Array (geotiff may return various types)
    return this._toFloat32(rasters[0], window.width, window.height);
  }

  dispose(_data: Float32Array): void {
    // Float32Array is GC-collected, no explicit release needed
  }

  // ---- private ----

  private async _load(signal?: AbortSignal): Promise<GeoTIFF> {
    if (this._tiffPromise) return this._tiffPromise;
    this._tiffPromise = geotiffFromUrl(this._url, {
      ...(signal ? { signal } : {}),
    } as any);
    return this._tiffPromise;
  }

  private _computeWindow(
    tileBounds: CrsBounds,
  ): { col: number; row: number; width: number; height: number } | null {
    const [tx0, ty0, tx1, ty1] = tileBounds;
    const [bx0, by0, bx1, by1] = this._bbox;

    // Check intersection
    if (tx1 <= bx0 || tx0 >= bx1 || ty1 <= by0 || ty0 >= by1) {
      return null;
    }

    const pxPerUnitX = this._imageWidth / (bx1 - bx0);
    const pxPerUnitY = this._imageHeight / (by1 - by0);

    const col = Math.max(0, Math.floor((tx0 - bx0) * pxPerUnitX));
    const row = Math.max(0, Math.floor((by1 - ty1) * pxPerUnitY));
    const colEnd = Math.min(
      this._imageWidth,
      Math.ceil((tx1 - bx0) * pxPerUnitX),
    );
    const rowEnd = Math.min(
      this._imageHeight,
      Math.ceil((by1 - ty0) * pxPerUnitY),
    );

    const width = colEnd - col;
    const height = rowEnd - row;
    if (width <= 0 || height <= 0) return null;

    return { col, row, width, height };
  }

  private _toFloat32(
    band: Uint8Array | Uint16Array | Int16Array | Float32Array,
    _width: number,
    _height: number,
  ): Float32Array {
    if (band instanceof Float32Array) return band;
    const result = new Float32Array(band.length);
    const noData = this._noDataValue;
    for (let i = 0; i < band.length; i++) {
      const v = band[i];
      result[i] = isNaN(noData) ? v : (v === noData ? NaN : v);
    }
    return result;
  }
}
