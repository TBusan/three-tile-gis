// geo-engine/packages/engine/src/manager/TileManager.ts

import type { CrsBounds, CrsCoord } from "../core/types";
import type { IProjectCRS } from "../crs/IProjectCRS";
import type { TileKey } from "../tile/TileKey";
import { tileKeyToString } from "../tile/TileKey";
import { Tile } from "../tile/Tile";
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

/** Track an in-flight tile load for cancellation */
interface LoadingEntry {
  controller: AbortController;
  layerIds: Set<string>;
}

/**
 * TileManager — 每帧调度并加载可见 Tile
 *
 * 流程：
 *   1. 计算共享 CRS 视野范围
 *   2. 从所有可见 Layer 收集候选 TileKey
 *   3. 按 TileKey 合并同 Key 的多层请求（Tile 共享）
 *   4. 查 Cache → 命中则直接显示
 *   5. 父 Tile 优先（渐进式显示，永不留白）
 *   6. 取消离开视野的加载中 Tile
 *   7. TileScheduler → 优先级排序
 *   8. 按帧预算取 batch → 加载 → 创建 TileContent
 */
export class TileManager {
  readonly scheduler = new TileScheduler();
  readonly cache: ITileCache<Tile>;
  readonly floatingOrigin: IFloatingOrigin;

  private readonly _loadFn: TileLoadCallback;
  private _loadedTiles = new Map<string, Tile>();
  /** In-flight loads: tileKey → { controller, layerIds } */
  private _loading = new Map<string, LoadingEntry>();

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
    // 0. 按依赖拓扑排序图层（无依赖的先处理）
    const sorted = this._sortByDeps(layers);

    // 1. 收集候选 TileKey → layerIds（按 key 合并）
    const keyToLayerIds = new Map<string, { key: TileKey; layerIds: Set<string>; bounds: CrsBounds }>();
    for (const layer of sorted) {
      const keys = layer.getVisibleTiles(extent, crs, resolution);

      // 如果该图层有依赖，检查依赖图层的同 key tile 是否已加载
      if (layer.dependsOn.length > 0) {
        const allDepKeys = new Set<string>();
        for (const dep of layer.dependsOn) {
          if (!sorted.includes(dep)) continue;
          const depKeys = dep.getVisibleTiles(extent, crs, resolution);
          for (const dk of depKeys) {
            allDepKeys.add(tileKeyToString(dk));
          }
        }
        // 只保留依赖已就绪的 tile key（依赖 tile 已 loaded）
        const ready = keys.filter((k) => {
          const strK = tileKeyToString(k);
          // 检查同 key 的依赖 tile 是否已 loaded
          return allDepKeys.has(strK) && this._loadedTiles.has(strK);
        });
        // 跳过不满足依赖的 tile，下次帧重试
        if (ready.length === 0) continue;
        // 继续用 ready 列表处理（只处理依赖就绪的）
        for (const key of ready) {
          this._addKeyRequest(key, layer, keyToLayerIds);
        }
        continue;
      }

      for (const key of keys) {
        this._addKeyRequest(key, layer, keyToLayerIds);
      }
    }

    // 2. 取消离开视野的加载中 Tile + 清除队列
    const visibleKeys = new Set(keyToLayerIds.keys());
    for (const [strKey, entry] of this._loading) {
      if (!visibleKeys.has(strKey)) {
        entry.controller.abort();
        this._loading.delete(strKey);
        this.scheduler.abortByKey(strKey);
      }
    }
    this.scheduler.cancelOffscreen(visibleKeys);

    // 3. 构建 LoadRequest 列表
    const requests: LoadRequest[] = [];
    for (const [strKey, { key, layerIds, bounds }] of keyToLayerIds) {
      const centerX = (bounds[0] + bounds[2]) / 2;
      const centerY = (bounds[1] + bounds[3]) / 2;
      const dx = centerX - cameraPos.x;
      const dy = centerY - cameraPos.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const area = (bounds[2] - bounds[0]) * (bounds[3] - bounds[1]);

      requests.push({
        tileKey: key,
        layerIds: [...layerIds],
        distanceToCamera: dist,
        screenArea: Math.min(area / 1e6, 1),
        inFrustum: true,
      });
    }

    // 4. 渐进式显示：父 Tile 未加载时，插入父 Tile 请求（优先加载低分辨率）
    const parentRequests: LoadRequest[] = [];
    const childKeys = new Set<string>(); // children that got a parent injected
    for (const req of requests) {
      // Find a representative layer to compute parent key
      const repLayer = layers.find((l) => l.id === req.layerIds[0]);
      if (!repLayer) continue;
      const parentKey = repLayer.tileScheme.getParentKey(req.tileKey);
      if (!parentKey) continue;
      const parentStr = tileKeyToString(parentKey);
      // Only inject if parent is NOT loaded, NOT in cache, and NOT already being requested
      if (
        !this._loadedTiles.has(parentStr) &&
        !this.cache.has(parentStr) &&
        !keyToLayerIds.has(parentStr) &&
        !parentRequests.some((p) => tileKeyToString(p.tileKey) === parentStr) &&
        !this._loading.has(parentStr)
      ) {
        const parentBounds = repLayer.tileScheme.getTileBounds(parentKey);
        const pCenterX = (parentBounds[0] + parentBounds[2]) / 2;
        const pCenterY = (parentBounds[1] + parentBounds[3]) / 2;
        const pDx = pCenterX - cameraPos.x;
        const pDy = pCenterY - cameraPos.y;
        const pDist = Math.sqrt(pDx * pDx + pDy * pDy);
        const pArea = (parentBounds[2] - parentBounds[0]) * (parentBounds[3] - parentBounds[1]);

        parentRequests.push({
          tileKey: parentKey,
          layerIds: req.layerIds,
          distanceToCamera: pDist,
          screenArea: Math.min(pArea / 1e6, 1),
          inFrustum: true,
        });
        childKeys.add(tileKeyToString(req.tileKey));
      }
    }

    // Prepend parent requests (higher priority — load low-res first)
    const allRequests = [...parentRequests, ...requests];

    // 5. 调度排序
    this.scheduler.schedule(allRequests);

    // 6. 取本帧 batch 并加载
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
      }
    }
  }

  dispose(): void {
    this.scheduler.abortAll();
    for (const [, entry] of this._loading) {
      entry.controller.abort();
    }
    this._loading.clear();
    this.cache.clear();
    this._loadedTiles.clear();
  }

  // ---- private ----

  /** 拓扑排序图层列表：无依赖的优先，依赖其他图层的在后 */
  private _sortByDeps(layers: ILayer[]): ILayer[] {
    const visited = new Set<string>();
    const result: ILayer[] = [];

    const visit = (layer: ILayer) => {
      if (visited.has(layer.id)) return;
      visited.add(layer.id);
      for (const dep of layer.dependsOn) {
        if (layers.includes(dep)) visit(dep);
      }
      result.push(layer);
    };

    for (const layer of layers) visit(layer);
    return result;
  }

  /** 将单个 tile key 注册到待请求集合 */
  private _addKeyRequest(
    key: TileKey,
    layer: ILayer,
    keyToLayerIds: Map<string, { key: TileKey; layerIds: Set<string>; bounds: CrsBounds }>,
  ): void {
    const strKey = tileKeyToString(key);

    // 已在加载中 → 追加 layerId
    if (this._loading.has(strKey)) {
      this._loading.get(strKey)!.layerIds.add(layer.id);
      return;
    }

    // 已在缓存或 loaded → 更新访问时间；但若该 layer 尚无 content 仍需发起请求
    if (this._loadedTiles.has(strKey)) {
      const tile = this._loadedTiles.get(strKey)!;
      tile.lastAccessTime = Date.now();
      if (tile.contents.some((c) => c.layerId === layer.id)) return;
      // 该 layer 未贡献 content 到已存在的 tile，继续添加请求
    }
    if (this.cache.has(strKey)) {
      const tile = this.cache.get(strKey)!;
      this._loadedTiles.set(strKey, tile);
      tile.lastAccessTime = Date.now();
      if (tile.contents.some((c) => c.layerId === layer.id)) return;
      // 该 layer 未贡献 content，继续添加请求
    }

    // 新请求 → 合并 layerIds
    if (keyToLayerIds.has(strKey)) {
      keyToLayerIds.get(strKey)!.layerIds.add(layer.id);
    } else {
      const bounds = layer.tileScheme.getTileBounds(key);
      keyToLayerIds.set(strKey, {
        key,
        layerIds: new Set([layer.id]),
        bounds,
      });
    }
  }

  private async _loadTile(
    req: LoadRequest,
    layers: ILayer[],
  ): Promise<void> {
    const cacheKey = tileKeyToString(req.tileKey);

    // 检查是否已有 Tile 实例（同 key 多层共享）
    let tile = this._loadedTiles.get(cacheKey);
    let isNew = false;

    if (!tile) {
      // 找第一个有效 layer 获取 bounds
      const firstLayer = layers.find((l) => req.layerIds.includes(l.id));
      if (!firstLayer) return;

      const bounds = firstLayer.tileScheme.getTileBounds(req.tileKey);
      const origin: CrsCoord = {
        x: Math.floor(bounds[0] / 500) * 500,
        y: Math.floor(bounds[1] / 500) * 500,
        z: 0,
      };
      tile = new Tile(req.tileKey, bounds, origin);
      isNew = true;
    }

    const controller = new AbortController();
    this._loading.set(cacheKey, { controller, layerIds: new Set(req.layerIds) });
    this.scheduler.startLoading(req.tileKey, controller);

    try {
      tile.state = "loading";

      // 为每个 layer 加载内容
      for (const layerId of req.layerIds) {
        const layer = layers.find((l) => l.id === layerId);
        if (!layer) continue;

        // 检查该 layer 是否已有 content（避免重复）
        const hasContent = tile.contents.some((c) => c.layerId === layerId);
        if (hasContent) continue;

        const content = await this._loadFn(tile, layer, controller.signal);
        if (content) {
          tile.contents.push(content);
        }
      }

      if (tile.contents.length > 0) {
        tile.state = "loaded";
        if (isNew) {
          this._loadedTiles.set(cacheKey, tile);
          this.cache.set(cacheKey, tile, this._estimateBytes(tile));
        }
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
    } finally {
      this._loading.delete(cacheKey);
    }
  }

  private _estimateBytes(tile: Tile): number {
    let bytes = 1024; // Tile 元数据
    for (const content of tile.contents) {
      bytes += content.renderObjects.length * 1024;
    }
    return bytes;
  }
}
