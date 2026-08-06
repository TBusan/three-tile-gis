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

  /** 请求超时（毫秒），默认 10000 */
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
    this.timeout = options?.timeout ?? 10000;

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
    // 外部 signal 已取消（进入前已被 abort）→ 立即中止：
    // 已 aborted 的 signal 不会再触发 abort 事件，若不检查，本次请求会白跑全程
    //（下载 + createImageBitmap 主线程解码），浪费带宽与主线程时间。
    if (signal?.aborted) {
      controller.abort();
      const err = new Error("XYZTileSource fetch aborted");
      err.name = "AbortError";
      throw err;
    }
    // 超时必须以「普通 Error」abort，而不是无参数 abort()：
    // 无参数 abort() 让 fetch 以 AbortError 拒绝，TileManager 会把 AbortError
    // 视为「取消」而非失败 → 持续超时的瓦片永远不会被计入 failCount/拉黑，
    // 每帧都会重新发起一次（每次都白等 timeout 毫秒）。
    // 用 Error 作为 abort reason 时，fetch 以该 Error 拒绝（非 AbortError），
    // 会被计入失败并最终触发 MAX_FAIL_COUNT 拉黑。
    const timeoutId = setTimeout(
      () => controller.abort(new Error(`XYZTileSource timeout: ${url}`)),
      this.timeout,
    );

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
      // 显式预翻转（imageOrientation: "flipY"）→ 位图第 0 行 = 南端。
      // 原因：WebGL 的 UNPACK_FLIP_Y_WEBGL 对 ImageBitmap 源在部分浏览器会被
      // 忽略（对 HTMLImageElement 则始终生效）。若只依赖默认 flipY=true，被忽略时
      // 图像顶部(北)会贴到 v=0(南) 顶点 → 整块瓦片垂直翻转（文字上下颠倒、
      // 南北相邻瓦片在共享边界处内容对不上）。
      // 翻转烘焙进位图后，配合 RasterRenderer 的 texture.flipY=false，上传始终
      // "原样"（位图第 0 行 → v=0 南端），不再依赖 pixelStore 是否生效。
      return createImageBitmap(blob, { imageOrientation: "flipY" });
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
   * 模板变量：
   *   {z} → zoom 级别
   *   {x} → 列号
   *   {y} → 行号（Google/OSM 约定，y=0 在北端 — 与 XYZTileScheme 生成的一致）
   *   {-y} → TMS 反转行号（2^z - 1 - y，用于 y=0 在南端的 TMS 服务）
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
