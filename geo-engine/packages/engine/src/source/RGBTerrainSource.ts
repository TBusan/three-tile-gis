// geo-engine/packages/engine/src/source/RGBTerrainSource.ts

import type { CrsBounds } from "../core/types";
import type { IProjectCRS } from "../crs/IProjectCRS";
import { WebMercatorCRS } from "../crs/WebMercator";
import type { TileKey } from "../tile/TileKey";
import type { IDataSource } from "./IDataSource";

/** terrain-rgb 解码结果 — 规则网格高程（米） */
export interface TerrainRgbData {
  width: number;
  height: number;
  /**
   * 高程数组（米），行主序：row 0 = 南端（与 XYZTileSource 的
   * imageOrientation:"flipY" 预翻转约定一致）。
   */
  elevations: Float32Array;
}

/**
 * RGBTerrainSource 构造选项
 */
export interface RGBTerrainSourceOptions {
  minZoom?: number;
  maxZoom?: number;
  timeout?: number;
  /**
   * 目标 DEM 尺寸（像素，N×N），默认 three-tile 公式 clamp((level+2)*3, 2, 64)。
   *
   * 原始 terrain-rgb 瓦片是 256×256；降采样到 targetSize 后解码，显著减少
   * 网格顶点采样开销（SkirtedMesh gridSize 上限 64）。主线程解码 ≤64px 亚毫秒，
   * 无需 worker（three-tile 的 parse.worker.ts 是可选优化）。
   */
  targetSizeForLevel?: (level: number) => number;
}

/**
 * RGBTerrainSource — Mapbox terrain-rgb 高程数据源
 *
 * 从 Mapbox terrain-rgb PNG（每像素 RGB 编码高程，透明像素 = 0）解码
 * 规则网格高程 Float32Array。解码公式参考 three-tile
 * `loader/terrainRGBLoader/parse.ts`：
 *   h = -10000 + ((r<<16 | g<<8 | b) * 0.1)，alpha === 0 → 0
 *
 * URL 模板示例（需自备 access_token）：
 *   https://api.mapbox.com/v4/mapbox.terrain-rgb/{z}/{x}/{y}.pngraw?access_token=TOKEN
 *
 * 方向约定：与 XYZTileSource 一致，createImageBitmap 用 imageOrientation:"flipY"
 * 预翻转 → 位图第 0 行 = 南端 → elevations 行主序第 0 行 = 南端。
 */
export class RGBTerrainSource implements IDataSource<TerrainRgbData> {
  readonly dataType = "terrain-rgb";
  readonly crs: IProjectCRS;
  readonly bounds: CrsBounds;

  readonly minZoom: number;
  readonly maxZoom: number;
  timeout: number;

  private readonly urlTemplate: string;
  private readonly _targetSizeForLevel: (level: number) => number;

  constructor(urlTemplate: string, options?: RGBTerrainSourceOptions) {
    this.urlTemplate = urlTemplate;
    this.crs = new WebMercatorCRS();
    this.minZoom = options?.minZoom ?? 0;
    this.maxZoom = options?.maxZoom ?? 14; // Mapbox terrain-rgb v1 最高 z14
    this.timeout = options?.timeout ?? 10000;
    this._targetSizeForLevel =
      options?.targetSizeForLevel ??
      ((level) => Math.max(2, Math.min(64, (level + 2) * 3)));

    // 全 Web Mercator 世界范围
    const R = 6378137;
    const halfWorld = Math.PI * R;
    this.bounds = [-halfWorld, -halfWorld, halfWorld, halfWorld];
  }

  async fetch(
    key: TileKey,
    _tileBounds: CrsBounds,
    signal?: AbortSignal,
  ): Promise<TerrainRgbData> {
    const url = this.buildUrl(key);
    const targetSize = this._targetSizeForLevel(key.level);

    // 合并 AbortSignal 和超时（复制 XYZTileSource 模式：超时用普通 Error abort，
    // 让 fetch 以该 Error 拒绝（非 AbortError）→ 计入失败而非取消）。
    const controller = new AbortController();
    const timeoutId = setTimeout(
      () => controller.abort(new Error(`RGBTerrainSource timeout: ${url}`)),
      this.timeout,
    );
    const onExternalAbort = () => controller.abort();
    signal?.addEventListener("abort", onExternalAbort, { once: true });

    try {
      const response = await fetch(url, { signal: controller.signal });
      if (!response.ok) {
        throw new Error(
          `RGBTerrainSource: HTTP ${response.status} for ${url}`,
        );
      }
      const blob = await response.blob();
      // 与 XYZTileSource 同约定：flipY 预翻转 → 位图第 0 行 = 南端
      const bitmap = await createImageBitmap(blob, {
        imageOrientation: "flipY",
      });

      // 降采样到 targetSize×targetSize 后解码（3 字节/像素 → 亚毫秒）
      const canvas = new OffscreenCanvas(targetSize, targetSize);
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) {
        throw new Error(
          "RGBTerrainSource: OffscreenCanvas 2d context unavailable",
        );
      }
      ctx.imageSmoothingEnabled = false; // 最近邻，避免混入插值误差
      ctx.drawImage(bitmap, 0, 0, targetSize, targetSize);
      const imgData = ctx.getImageData(0, 0, targetSize, targetSize);
      bitmap.close();

      return {
        width: targetSize,
        height: targetSize,
        elevations: RGBTerrainSource.decodeTerrainRGB(imgData),
      };
    } finally {
      clearTimeout(timeoutId);
      signal?.removeEventListener("abort", onExternalAbort);
    }
  }

  /**
   * 解码 terrain-rgb ImageData → Float32Array 高程（米）。
   * 纯函数（可单测）。公式与 three-tile `loader/terrainRGBLoader/parse.ts` 一致：
   *   h = -10000 + ((r<<16 | g<<8 | b) * 0.1)，alpha === 0 → 0
   */
  static decodeTerrainRGB(imgData: ImageData): Float32Array {
    const src = imgData.data;
    const count = src.length >>> 2;
    const dem = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const index = i * 4;
      const r = src[index];
      const g = src[index + 1];
      const b = src[index + 2];
      const a = src[index + 3];
      dem[i] = a === 0 ? 0 : -10000 + ((r << 16) | (g << 8) | b) * 0.1;
    }
    return dem;
  }

  dispose(_data: TerrainRgbData): void {
    // Float32Array 无 GPU 资源，GC 回收即可
  }

  /**
   * 根据 TileKey 构建实际 URL（{z}/{x}/{y}/{-y} 替换，同 XYZTileSource）
   */
  buildUrl(key: TileKey): string {
    const { z, x, y } = this._parseId(key.id);
    const tmsY = Math.pow(2, z) - 1 - y;
    return this.urlTemplate
      .replace(/\{z\}/g, String(z))
      .replace(/\{x\}/g, String(x))
      .replace(/\{-y\}/g, String(tmsY))
      .replace(/\{y\}/g, String(y));
  }

  // ---- private ----

  private _parseId(id: string): { z: number; x: number; y: number } {
    const parts = id.split("/");
    if (parts.length !== 3) {
      throw new Error(
        `RGBTerrainSource: invalid tile id "${id}" (expected "z/x/y")`,
      );
    }
    return {
      z: parseInt(parts[0], 10),
      x: parseInt(parts[1], 10),
      y: parseInt(parts[2], 10),
    };
  }
}
