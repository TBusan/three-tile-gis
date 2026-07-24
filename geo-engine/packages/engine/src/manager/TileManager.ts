// geo-engine/packages/engine/src/manager/TileManager.ts

import type { CrsBounds, CrsCoord } from "../core/types";
import type { IProjectCRS } from "../crs/IProjectCRS";
import type { TileKey } from "../tile/TileKey";
import { tileKeyToString } from "../tile/TileKey";
import { Tile } from "../tile/Tile";
import { TileContent } from "../tile/TileContent";
import type { ILayer } from "../layer/ILayer";
import type { ITileCache } from "../tile/ITileCache";
import type { IFloatingOrigin } from "../origin/IFloatingOrigin";
import { TileScheduler, type LoadRequest } from "./TileScheduler";

/**
 * Tile 加载回调 — 由外部实现实际的数据加载和渲染
 *
 * @returns TileContent（已包含 renderObjects），或 null 表示加载失败
 */
export type TileLoadCallback = (
  tile: Tile,
  layer: ILayer,
  signal: AbortSignal,
) => Promise<TileContent | null>;

/**
 * TileManager — 每帧调度并加载可见 Tile
 *
 * 流程：
 *   1. 计算共享 CRS 视野范围
 *   2. 从所有可见 Layer 收集候选 TileKey
 *   3. 查 Cache → 命中则直接显示
 *   4. TileScheduler → 优先级排序
 *   5. 按帧预算取 batch → 加载 → 创建 TileContent
 */
export class TileManager {
  readonly scheduler = new TileScheduler();
  readonly cache: ITileCache<Tile>;
  readonly floatingOrigin: IFloatingOrigin;

  private readonly _loadFn: TileLoadCallback;
  private _loadedTiles = new Map<string, Tile>();

  constructor(
    cache: ITileCache<Tile>,
    floatingOrigin: IFloatingOrigin,
    loadFn: TileLoadCallback,
  ) {
    this.cache = cache;
    this.floatingOrigin = floatingOrigin;
    this._loadFn = loadFn;
  }

  get loadedTiles(): ReadonlyMap<string, Tile> {
    return this._loadedTiles;
  }

  /**
   * 每帧调用一次
   * @param extent — CRS 空间中的当前视野范围
   * @param cameraPos — 相机在 CRS 空间中的位置
   * @param crs — 当前工程坐标系
   * @param layers — 所有可见图层（已排序）
   */
  update(
    extent: CrsBounds,
    cameraPos: CrsCoord,
    crs: IProjectCRS,
    layers: ILayer[],
    resolution?: number,
  ): void {
    // 1. 收集所有候选请求
    const requests: LoadRequest[] = [];
    for (const layer of layers) {
      const keys = layer.getVisibleTiles(extent, crs, resolution);
      for (const key of keys) {
        const cacheKey = tileKeyToString(key);

        // 已在缓存或 loaded → 更新访问时间，跳过
        if (this._loadedTiles.has(cacheKey)) {
          const tile = this._loadedTiles.get(cacheKey)!;
          tile.lastAccessTime = Date.now();
          continue;
        }
        if (this.cache.has(cacheKey)) {
          const tile = this.cache.get(cacheKey)!;
          this._loadedTiles.set(cacheKey, tile);
          tile.lastAccessTime = Date.now();
          continue;
        }

        // 计算距离和面积（简化：用中心点）
        const bounds = layer.tileScheme.getTileBounds(key);
        const centerX = (bounds[0] + bounds[2]) / 2;
        const centerY = (bounds[1] + bounds[3]) / 2;
        const dx = centerX - cameraPos.x;
        const dy = centerY - cameraPos.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const area = (bounds[2] - bounds[0]) * (bounds[3] - bounds[1]);

        requests.push({
          tileKey: key,
          layerId: layer.id,
          distanceToCamera: dist,
          screenArea: Math.min(area / 1e6, 1), // 归一化
          inFrustum: true, // 简化：extent 内即视为在视锥内
        });
      }
    }

    // 2. 调度排序
    this.scheduler.schedule(requests);

    // 3. 取本帧 batch 并加载
    const batch = this.scheduler.takeNext();
    for (const req of batch) {
      this._loadTile(req, layers);
    }
  }

  /** 强制加载指定 Tile（不受帧预算限制，用于初始加载） */
  async loadTileNow(
    tileKey: TileKey,
    layer: ILayer,
  ): Promise<TileContent | null> {
    const bounds = layer.tileScheme.getTileBounds(tileKey);
    const origin: CrsCoord = {
      x: Math.floor(bounds[0] / 500) * 500,
      y: Math.floor(bounds[1] / 500) * 500,
      z: 0,
    };

    const tile = new Tile(tileKey, bounds, origin);
    const controller = new AbortController();
    const content = await this._loadFn(tile, layer, controller.signal);
    if (content) {
      tile.state = "loaded";
      tile.contents.push(content);
      const cacheKey = tileKeyToString(tileKey);
      this._loadedTiles.set(cacheKey, tile);
      this.cache.set(cacheKey, tile, this._estimateBytes(tile));
    }
    return content;
  }

  /** 清理移出视野的 tile（回收到 cache 或 dispose） */
  evict(maxByteSize: number): void {
    this.cache.trim(maxByteSize);

    // 移除不在 cache 中的 loaded tiles
    for (const [key, tile] of this._loadedTiles) {
      if (!this.cache.has(key)) {
        this._loadedTiles.delete(key);
        if (!tile.contents.every((c) => c.disposed)) {
          // 已在 cache.trim 中 dispose
        }
      }
    }
  }

  dispose(): void {
    this.scheduler.abortAll();
    this.cache.clear();
    this._loadedTiles.clear();
  }

  // ---- private ----

  private async _loadTile(
    req: LoadRequest,
    layers: ILayer[],
  ): Promise<void> {
    const layer = layers.find((l) => l.id === req.layerId);
    if (!layer) return;

    const bounds = layer.tileScheme.getTileBounds(req.tileKey);
    const origin: CrsCoord = {
      x: Math.floor(bounds[0] / 500) * 500,
      y: Math.floor(bounds[1] / 500) * 500,
      z: 0,
    };

    const tile = new Tile(req.tileKey, bounds, origin);
    const cacheKey = tileKeyToString(req.tileKey);

    const controller = new AbortController();
    this.scheduler.startLoading(req.tileKey, controller.signal);

    try {
      tile.state = "loading";
      const content = await this._loadFn(tile, layer, controller.signal);

      if (content) {
        tile.state = "loaded";
        tile.contents.push(content);
        this._loadedTiles.set(cacheKey, tile);
        this.cache.set(cacheKey, tile, this._estimateBytes(tile));
        this.scheduler.markLoaded(req.tileKey);
      } else {
        tile.state = "failed";
        this.scheduler.markFailed(req.tileKey);
      }
    } catch (err: any) {
      if (err?.name === "AbortError") return;
      tile.state = "failed";
      tile.failCount++;
      this.scheduler.markFailed(req.tileKey);
    }
  }

  private _estimateBytes(tile: Tile): number {
    // 简化估算：每个 RenderObject ~1KB + 内容大小
    let bytes = 1024; // Tile 元数据
    for (const content of tile.contents) {
      bytes += content.renderObjects.length * 1024;
    }
    return bytes;
  }
}
