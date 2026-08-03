// geo-engine/packages/engine/src/source/GeoTIFFSource.ts

import { fromUrl as geotiffFromUrl, type GeoTIFF } from "geotiff";
import type { CrsBounds } from "../core/types";
import type { IProjectCRS } from "../crs/IProjectCRS";
import type { TileKey } from "../tile/TileKey";
import type { IDataSource } from "./IDataSource";
import { WorkerPool } from "../worker/WorkerPool";
import type { GeoTiffDecodeOutput } from "../worker/geotiff-decoder.worker";

/** Lazy-loaded worker script URL (set by first GeoTIFFSource with useWorker=true) */
let _geotiffWorkerUrl: URL | null = null;

function getGeoTiffWorkerUrl(): URL {
  if (!_geotiffWorkerUrl) {
    _geotiffWorkerUrl = new URL(
      "../worker/geotiff-decoder.worker.ts",
      import.meta.url,
    );
  }
  return _geotiffWorkerUrl;
}

/**
 * GeoTIFFSource 构造选项
 */
export interface GeoTIFFSourceOptions {
  /** GeoTIFF 文件 URL */
  url: string;
  /** 数据的 CRS（必须与 Engine CRS 一致，Phase 5 不做重投影） */
  crs: IProjectCRS;
  /**
   * 使用 Web Worker 池解码 GeoTIFF（默认: false）
   *
   * 开启后，GeoTIFF 解码在 Worker 线程中执行，不阻塞主线程渲染。
   * Worker 池自动管理并发，首次使用时会创建 WorkerPool。
   */
  useWorker?: boolean;
}

/**
 * GeoTIFF 栅格数据源 — 从 .tif 文件按 tile 窗口读取栅格数据
 *
 * Phase 5 限制：数据 CRS 必须等于引擎 CRS（不做自动重投影）。
 * 后续版本将支持 CRS 转换。
 *
 * geotiff.js 使用 HTTP Range 请求只读取需要的像素窗口，
 * 无需下载整个文件。适合大型正射影像。
 *
 * 用法：
 *   const source = new GeoTIFFSource({
 *     url: "/data/ortho.tif",
 *     crs: new CGCS2000GKCRS(38),
 *   });
 *   const bitmap = await source.fetch(tileKey, tileBounds);
 */
export class GeoTIFFSource implements IDataSource<ImageBitmap> {
  readonly dataType = "geotiff";
  readonly crs: IProjectCRS;
  bounds: CrsBounds;

  private readonly _url: string;
  private readonly _useWorker: boolean;
  private _tiffPromise: Promise<GeoTIFF> | null = null;
  private _imageWidth = 0;
  private _imageHeight = 0;
  private _bbox: [number, number, number, number] = [0, 0, 0, 0];
  private _pool: WorkerPool | null = null;

  constructor(options: GeoTIFFSourceOptions) {
    this._url = options.url;
    this.crs = options.crs;
    this._useWorker = options.useWorker ?? false;
    this.bounds = [0, 0, 0, 0] as CrsBounds;
  }

  /**
   * 按 tile 窗口读取栅格数据
   *
   * @param _key — TileKey（未使用，通过 tileBounds 定位）
   * @param tileBounds — Tile 在 CRS 空间中的包围盒
   * @param signal — AbortSignal 用于取消加载
   * @returns 裁剪后的 ImageBitmap
   */
  async fetch(
    _key: TileKey,
    tileBounds: CrsBounds,
    signal?: AbortSignal,
  ): Promise<ImageBitmap> {
    // Worker mode: offload decode to Web Worker pool
    if (this._useWorker) {
      return this._fetchViaWorker(tileBounds, signal);
    }

    // Direct mode (default)
    const tiff = await this._load();
    this._throwIfAborted(signal);
    const image = await tiff.getImage();
    this._throwIfAborted(signal);

    if (this._imageWidth === 0) {
      // First load — populate metadata
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

    // Compute pixel window from tile bounds
    const window = this._computeWindow(tileBounds);
    if (!window) {
      // Tile outside image bounds — return a 1x1 transparent pixel
      return createImageBitmap(new ImageData(1, 1));
    }

    this._throwIfAborted(signal);

    // Read raster data for the window
    const rasters = await image.readRasters({
      window: [window.col, window.row, window.width, window.height],
      samples: [0, 1, 2], // Try RGB first, fallback to single band
    });

    // Convert to ImageBitmap
    return this._rastersToBitmap(rasters, window.width, window.height);
  }

  /**
   * 释放 ImageBitmap 资源
   */
  dispose(data: ImageBitmap): void {
    data.close();
  }

  // ---- private ----

  /**
   * 共享元数据 fetch：不绑定逐瓦片 signal（与 DEMSource 一致）。
   *
   * 绑定首个调用方的 signal 有两个问题：
   *   1. 该瓦片被取消 → 共享 fetch 被 abort → 缓存的 rejected promise 永久生效，
   *      之后所有瓦片 fetch 全部失败（无法恢复）。
   *   2. 单瓦片取消会连带中止其它所有等待同一 TIFF 的瓦片。
   * 单个瓦片的取消通过 fetch 内各 await 点之后的 _throwIfAborted 检查处理。
   *
   * 失败时重置 _tiffPromise，允许下一次 fetch 重试（网络抖动不永久拉黑）。
   */
  private _load(): Promise<GeoTIFF> {
    if (this._tiffPromise) return this._tiffPromise;
    this._tiffPromise = geotiffFromUrl(this._url).catch((err) => {
      this._tiffPromise = null;
      throw err;
    });
    return this._tiffPromise;
  }

  private _throwIfAborted(signal?: AbortSignal): void {
    if (signal?.aborted) {
      const err = new Error("Aborted");
      err.name = "AbortError";
      throw err;
    }
  }

  /**
   * 将 CRS tileBounds 映射到像素坐标窗口
   */
  private _computeWindow(
    tileBounds: CrsBounds,
  ): { col: number; row: number; width: number; height: number } | null {
    if (this._imageWidth === 0) {
      // Image not loaded yet — return null (let fetch continue)
      return null;
    }

    const [tx0, ty0, tx1, ty1] = tileBounds;
    const [bx0, by0, bx1, by1] = this._bbox;

    // Check intersection
    if (tx1 <= bx0 || tx0 >= bx1 || ty1 <= by0 || ty0 >= by1) {
      return null; // No overlap
    }

    // Map CRS coordinates to pixel coordinates
    const pxPerUnitX = this._imageWidth / (bx1 - bx0);
    const pxPerUnitY = this._imageHeight / (by1 - by0);

    // Clamp to image bounds
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

  /**
   * 将 geotiff.js 的 raster 数组转换为 ImageBitmap
   */
  private async _rastersToBitmap(
    rasters: Array<ArrayLike<number>>,
    width: number,
    height: number,
  ): Promise<ImageBitmap> {
    const pixelCount = width * height;
    const imageData = new ImageData(width, height);

    if (rasters.length >= 3) {
      // RGB/RGBA
      const [rBand, gBand, bBand] = rasters;
      for (let i = 0; i < pixelCount; i++) {
        imageData.data[i * 4] = this._sampleBand(rBand, i);
        imageData.data[i * 4 + 1] = this._sampleBand(gBand, i);
        imageData.data[i * 4 + 2] = this._sampleBand(bBand, i);
        imageData.data[i * 4 + 3] = 255;
      }
    } else {
      // Single band (grayscale) — replicate to RGB
      const band = rasters[0];
      for (let i = 0; i < pixelCount; i++) {
        const value = this._sampleBand(band, i);
        imageData.data[i * 4] = value;
        imageData.data[i * 4 + 1] = value;
        imageData.data[i * 4 + 2] = value;
        imageData.data[i * 4 + 3] = 255;
      }
    }

    // 与 XYZTileSource 相同的翻转约定：位图第 0 行 = 南端，
    // 配合 RasterRenderer texture.flipY=false 原样上传（GeoTIFF 行 0 = 北端，
    // 与 PNG 一致，故同样需要预翻转）。
    return createImageBitmap(imageData, { imageOrientation: "flipY" });
  }

  /**
   * Worker 模式加载 — 将 GeoTIFF 解码卸载到 Worker 线程
   */
  private async _fetchViaWorker(
    tileBounds: CrsBounds,
    signal?: AbortSignal,
  ): Promise<ImageBitmap> {
    // Load metadata on main thread first (lightweight)
    if (this._imageWidth === 0) {
      const tiff = await this._load();
      this._throwIfAborted(signal);
      const image = await tiff.getImage();
      this._throwIfAborted(signal);
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
      return createImageBitmap(new ImageData(1, 1));
    }

    // Lazy-init worker pool
    if (!this._pool) {
      this._pool = new WorkerPool();
    }

    // Offload TIFF decode to worker thread
    const workerUrl = getGeoTiffWorkerUrl();
    const result = await this._pool.exec<GeoTiffDecodeOutput>({
      script: workerUrl,
      data: {
        url: this._url,
        window: [window.col, window.row, window.width, window.height],
      },
    });

    // 直接使用 Worker 返回的 TypedArray（保留类型）。不能再 new Uint8Array(r)：
    // 那会把 Uint16/Float32 值按 256 取模，导致高精度栅格颜色/采样完全错乱。
    return this._rastersToBitmap(result.rasters, result.width, result.height);
  }

  /**
   * 采样单个像素值 — 处理不同数据类型
   */
  private _sampleBand(band: ArrayLike<number>, idx: number): number {
    const raw = band[idx];
    if (band instanceof Float32Array) {
      // Float32: assume values in [0, 1] or linear
      return Math.round(Math.max(0, Math.min(1, raw)) * 255);
    }
    if (band instanceof Uint16Array) {
      // Uint16: scale from [0, 65535] to [0, 255]
      return Math.round(raw / 257);
    }
    // Uint8: pass through
    return raw;
  }
}
