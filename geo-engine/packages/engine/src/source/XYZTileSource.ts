// geo-engine/packages/engine/src/source/XYZTileSource.ts

import type { CrsBounds } from "../core/types";
import type { IProjectCRS } from "../crs/IProjectCRS";
import { WebMercatorCRS } from "../crs/WebMercator";
import type { TileKey } from "../tile/TileKey";
import type { IDataSource } from "./IDataSource";

/**
 * XYZ 瓦片数据源 — 从 HTTP 获取 XYZ 瓦片图像
 *
 * 支持标准 URL 模板变量：
 *   - {z} — zoom 级别
 *   - {x} — 列号（从左到右）
 *   - {y} — 行号（从上到下，TMS 约定）
 *   - {-y} — 反转的行号（Google/Bing 约定，-y = 2^z - 1 - y）
 *
 * 用法：
 *   const osm = new XYZTileSource(
 *     "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
 *     { minZoom: 0, maxZoom: 19 },
 *   );
 */
export class XYZTileSource implements IDataSource<ImageBitmap> {
  readonly dataType = "image";
  readonly crs: IProjectCRS;
  readonly bounds: CrsBounds;

  private readonly urlTemplate: string;
  readonly minZoom: number;
  readonly maxZoom: number;

  /** 请求超时（毫秒），默认 15000 */
  timeout: number;

  constructor(
    urlTemplate: string,
    options?: {
      minZoom?: number;
      maxZoom?: number;
      timeout?: number;
    },
  ) {
    this.urlTemplate = urlTemplate;
    this.crs = new WebMercatorCRS();
    this.minZoom = options?.minZoom ?? 0;
    this.maxZoom = options?.maxZoom ?? 18;
    this.timeout = options?.timeout ?? 15000;

    // 全 Web Mercator 世界范围
    const R = 6378137;
    const halfWorld = Math.PI * R;
    this.bounds = [-halfWorld, -halfWorld, halfWorld, halfWorld];
  }

  async fetch(
    key: TileKey,
    _tileBounds: CrsBounds,
    signal?: AbortSignal,
  ): Promise<ImageBitmap> {
    const url = this.buildUrl(key);

    // 合并 AbortSignal 和超时
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    // 外部 signal 触发时也 abort
    const onExternalAbort = () => controller.abort();
    signal?.addEventListener("abort", onExternalAbort, { once: true });

    try {
      const response = await fetch(url, { signal: controller.signal });
      if (!response.ok) {
        throw new Error(
          `XYZTileSource: HTTP ${response.status} for ${url}`,
        );
      }
      const blob = await response.blob();
      return createImageBitmap(blob);
    } finally {
      clearTimeout(timeoutId);
      signal?.removeEventListener("abort", onExternalAbort);
    }
  }

  dispose(data: ImageBitmap): void {
    data.close();
  }

  /**
   * 根据 TileKey 构建实际 URL
   *
   * 模板变量 {z} → level, {x} → col, {y} → row,
   * {-y} → 2^z - 1 - row（Google 反转 y）
   */
  buildUrl(key: TileKey): string {
    const { z, x, y } = this._parseId(key.id);
    const invY = Math.pow(2, z) - 1 - y;
    return this.urlTemplate
      .replace(/\{z\}/g, String(z))
      .replace(/\{x\}/g, String(x))
      .replace(/\{-y\}/g, String(invY))
      .replace(/\{y\}/g, String(y));
  }

  // ---- private ----

  private _parseId(id: string): { z: number; x: number; y: number } {
    const parts = id.split("/");
    if (parts.length !== 3) {
      throw new Error(
        `XYZTileSource: invalid tile id "${id}" (expected "z/x/y")`,
      );
    }
    return {
      z: parseInt(parts[0], 10),
      x: parseInt(parts[1], 10),
      y: parseInt(parts[2], 10),
    };
  }
}
