/**
 * GeoTIFF Decoder Worker — 在 Web Worker 中解码 GeoTIFF 栅格数据
 *
 * 输入: { url: string, window: [col, row, width, height] }
 * 输出: { data: { rasters: number[][], width: number, height: number } }
 *   或: { error: string }
 *
 * 用法（主线程）:
 *   const workerUrl = new URL('./geotiff-decoder.worker.ts', import.meta.url);
 *   const pool = new WorkerPool();
 *   const result = await pool.exec({ script: workerUrl, data: { url, window } });
 */

// geotiff.js is imported at the top level so Vite bundles it into the worker chunk
import { fromUrl } from "geotiff";

export interface GeoTiffDecodeInput {
  url: string;
  /** [col, row, width, height] — pixel window to read */
  window: [number, number, number, number];
}

export interface GeoTiffDecodeOutput {
  /**
   * Raster data as typed arrays (one per band).
   * 保留原始 TypedArray 类型：structured clone 可直接传输且零拷贝，
   * 主线程据此区分 Uint8/Uint16/Float32 并做正确的像素换算。
   * 若转成普通 number[] 会丢失类型信息，Uint16/Float32 数据会被错误按 Uint8 取模。
   */
  rasters: Array<Uint8Array | Uint16Array | Int16Array | Float32Array>;
  width: number;
  height: number;
}

self.onmessage = async (e: MessageEvent<GeoTiffDecodeInput>) => {
  const { url, window: wnd } = e.data;
  try {
    const tiff = await fromUrl(url);
    const image = await tiff.getImage();
    const rasters = await image.readRasters({ window: wnd });

    // 直接传输 TypedArray（structured clone 保留类型），不做 Array.from 转换
    const typedRasters = rasters.map((r) =>
      r as Uint8Array | Uint16Array | Int16Array | Float32Array,
    );

    const output: GeoTiffDecodeOutput = {
      rasters: typedRasters,
      width: wnd[2],
      height: wnd[3],
    };

    self.postMessage({ data: output });
  } catch (err) {
    self.postMessage({ error: (err as Error).message });
  }
};
