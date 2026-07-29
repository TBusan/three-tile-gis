// geo-engine/packages/engine/src/manager/TileManager.ts

import type { CrsBounds, CrsCoord } from "../core/types";
import type { IProjectCRS } from "../crs/IProjectCRS";
import type { TileKey } from "../tile/TileKey";
import { tileKeyToString } from "../tile/TileKey";
import { Tile } from "../tile/Tile";
import type { TileContent } from "../tile/TileContent";
import type { ILayer } from "../layer/ILayer";
import type { ITileCache } from "../tile/ITileCache";
import type { IFloatingOrigin } from "../origin/IFloatingOrigin";
import { TileScheduler, type LoadRequest } from "./TileScheduler";
import { XYZTileScheme } from "../tile/XYZTileScheme";

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
  /** 失败计数：tileKey string → 连续失败次数 */
  private _failCounts = new Map<string, number>();
  /** 上一次的视野范围（用于变化检测） */
  private _lastExtent: CrsBounds | null = null;
  private _lastResolution: number | null = null;
  private static readonly EXTENT_MOVE_FACTOR = 0.05;

  /**
   * Zoom 级别切换跟踪：schemeId → 上一次确认的 zoom。
   * 用于检测 zoom 变化并触发渐进式淘汰。
   */
  private _schemeZooms = new Map<string, number>();

  /**
   * 渐进式父瓦片占位集合：记录因"渐进式显示"注入的父瓦片 key。
   * 当其子瓦片加载完成后，父瓦片从 _loadedTiles 中移除。
   */
  private _parentPlaceholders = new Set<string>();

  /** 单帧最大瓦片总数 — 安全帽防止多图层叠加超出合理内存 */
  private static readonly MAX_TOTAL_TILES = 8192;

  /** 单个 Tile 最大重试次数 — 超过后跳过，避免无限重试持续 404 的瓦片 */
  private static readonly MAX_FAIL_COUNT = 3;

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
    // 探测视野是否明显变化（用于决定是否重新生成 tile key 列表）
    let extentChanged = true;
    if (this._lastExtent && this._lastResolution != null) {
      const [lx0, ly0, lx1, ly1] = this._lastExtent;
      const lw = lx1 - lx0;
      const lh = ly1 - ly0;
      const dx = Math.abs(extent[0] - lx0);
      const dy = Math.abs(extent[1] - ly0);
      const resChanged =
        resolution != null &&
        Math.abs(resolution - this._lastResolution) / this._lastResolution > 0.2;
      // 平移不超过视野 5% 且缩放变化不超过 20% → 跳过重新调度
      if (
        !resChanged &&
        dx < lw * TileManager.EXTENT_MOVE_FACTOR &&
        dy < lh * TileManager.EXTENT_MOVE_FACTOR
      ) {
        extentChanged = false;
      }
    }

    // ── 调度阶段：视野变化时重新生成 tile key 列表并排序 ──
    if (extentChanged) {
      this._lastExtent = [...extent] as CrsBounds;
      this._lastResolution = resolution ?? null;

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
          if (keyToLayerIds.size >= TileManager.MAX_TOTAL_TILES) break;
          this._addKeyRequest(key, layer, keyToLayerIds);
        }
        continue;
      }

      for (const key of keys) {
        if (keyToLayerIds.size >= TileManager.MAX_TOTAL_TILES) break;
        this._addKeyRequest(key, layer, keyToLayerIds);
      }
      if (keyToLayerIds.size >= TileManager.MAX_TOTAL_TILES) break;
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

      // 计算父瓦片 key（用于 TileScheduler parentReady 权重）
      const repLayer = layers.find((l) => layerIds.has(l.id));
      const parentTileKey = repLayer?.tileScheme.getParentKey(key);
      const parentStr = parentTileKey ? tileKeyToString(parentTileKey) : undefined;

      requests.push({
        tileKey: key,
        layerIds: [...layerIds],
        distanceToCamera: dist,
        screenArea: Math.min(area / 1e6, 1),
        inFrustum: true,
        parentKey: parentStr,
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
        // 标记为渐进式占位父瓦片，子瓦片加载完成后自动移除
        this._parentPlaceholders.add(parentStr);
      }
    }

    // Prepend parent requests (higher priority — load low-res first)
    const allRequests = [...parentRequests, ...requests];

    // 5. 调度排序
    this.scheduler.schedule(allRequests);

    // 6. Zoom 级别切换淘汰 + 父瓦片 refined 退出
    this._evictStaleZoomLevels(layers, visibleKeys);
    this._evictRefinedParents();
    } // end if (extentChanged)

    // ── 加载阶段：始终执行（消费已有队列）──
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
    const scheme = layer.tileScheme;
    const bounds = scheme.getTileBounds(tileKey);
    const origin = TileManager._snapOrigin(bounds);

    const tile = new Tile(tileKey, bounds, origin);
    tile.reprojector = scheme.getReprojector?.(tileKey) ?? undefined;
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

  /**
   * Zoom 级别切换淘汰（覆盖率驱动，解决缩放时上下层底图同时显示）
   *
   * 核心策略（参考 CesiumJS / Mapbox 的 tile 替换机制）：
   *   - zoom 变化时不立即移除旧瓦片（避免白屏）
   *   - 逐个检查旧瓦片：当其空间范围内的新级别瓦片已加载足够多时，才移除
   *   - 安全超时：即使新瓦片加载失败，5 秒后也强制移除旧瓦片
   *
   * 对于放大（z → z+1）：一个旧瓦片对应 4 个子瓦片，≥2 个加载即替换
   * 对于缩小（z → z-1）：4 个旧瓦片共享 1 个父瓦片，父加载后立即替换
   */
  private static readonly TRANSITION_TIMEOUT_MS = 5000;

  private _evictStaleZoomLevels(layers: ILayer[], visibleKeys: Set<string>): void {
    for (const layer of layers) {
      const scheme = layer.tileScheme;
      if (!(scheme instanceof XYZTileScheme)) continue;

      const schemeId = scheme.schemeId;
      const currentZoom = scheme.currentZoom;
      if (currentZoom == null) continue;

      const prevZoom = this._schemeZooms.get(schemeId);
      this._schemeZooms.set(schemeId, currentZoom);

      // zoom 未变化 → 无需淘汰
      if (prevZoom == null || prevZoom === currentZoom) continue;

      // zoom 发生变化 → 对旧级别瓦片做覆盖率检查后渐进移除
      const zoomingIn = currentZoom > prevZoom;
      const now = Date.now();

      for (const [key, tile] of this._loadedTiles) {
        if (tile.key.schemeId !== schemeId) continue;
        if (tile.key.level !== prevZoom) continue;
        // 当前可见集合中的瓦片不淘汰（可能是新级别的）
        if (visibleKeys.has(key)) continue;

        if (zoomingIn) {
          // 放大：检查该旧瓦片的 4 个子瓦片是否已加载
          const children = scheme.getChildKeys(tile.key);
          let loadedCount = 0;
          for (const child of children) {
            if (this._loadedTiles.has(tileKeyToString(child))) loadedCount++;
          }
          // ≥2 个子瓦片已加载 → 旧瓦片可安全移除（至少覆盖一半面积）
          if (loadedCount >= 2) {
            this._loadedTiles.delete(key);
            this._parentPlaceholders.delete(key);
          } else if (now - (tile.lastAccessTime || now) > TileManager.TRANSITION_TIMEOUT_MS) {
            // 超时强制移除（防止子瓦片加载失败导致旧瓦片永远残留）
            this._loadedTiles.delete(key);
            this._parentPlaceholders.delete(key);
          }
        } else {
          // 缩小：检查新级别（更低 zoom）的对应父瓦片是否已加载
          const newParent = scheme.getParentKey(tile.key);
          if (newParent && this._loadedTiles.has(tileKeyToString(newParent))) {
            this._loadedTiles.delete(key);
            this._parentPlaceholders.delete(key);
          } else if (now - (tile.lastAccessTime || now) > TileManager.TRANSITION_TIMEOUT_MS) {
            this._loadedTiles.delete(key);
            this._parentPlaceholders.delete(key);
          }
        }
      }
    }
  }

  /**
   * 父瓦片 refined 退出机制
   *
   * 渐进式显示注入的父瓦片只是临时占位，当其子瓦片加载完成后应移除，
   * 否则父瓦片会与子瓦片同时显示（底图混乱的另一个来源）。
   */
  private _evictRefinedParents(): void {
    for (const parentStr of this._parentPlaceholders) {
      const tile = this._loadedTiles.get(parentStr);
      if (!tile) {
        this._parentPlaceholders.delete(parentStr);
        continue;
      }

      // 获取该父瓦片的 scheme（通过 layers 查找）
      // 直接从 tile.key 解析子瓦片：z+1 级别的 4 个子瓦片
      const parts = tile.key.id.split("/");
      if (parts.length !== 3) continue;
      const z = parseInt(parts[0], 10);
      const x = parseInt(parts[1], 10);
      const y = parseInt(parts[2], 10);

      // 检查 4 个子瓦片是否已加载
      let childrenLoaded = 0;
      for (let dy = 0; dy < 2; dy++) {
        for (let dx = 0; dx < 2; dx++) {
          const childStr = `${tile.key.schemeId}:${z + 1}/${x * 2 + dx}/${y * 2 + dy}`;
          if (this._loadedTiles.has(childStr)) childrenLoaded++;
        }
      }

      // 所有 4 个子瓦片都已加载 → 父瓦片完成占位使命，移除
      if (childrenLoaded >= 4) {
        this._loadedTiles.delete(parentStr);
        this._parentPlaceholders.delete(parentStr);
      }
    }
  }

  /**
   * 新瓦片加载完成后的即时淘汰检查
   *
   * 与 _evictStaleZoomLevels 不同，这个方法不依赖 zoom 变化事件，
   * 而是在每个新瓦片加载完成后立即检查其父瓦片是否可被淘汰。
   * 这解决了"用户停止缩放后 extentChanged=false 但新瓦片仍在加载"的场景。
   */
  private _evictOldZoomTilesAfterLoad(loadedKey: TileKey): void {
    // 检查加载的瓦片的父瓦片是否在 _loadedTiles 中
    const parts = loadedKey.id.split("/");
    if (parts.length !== 3) return;
    const z = parseInt(parts[0], 10);
    const x = parseInt(parts[1], 10);
    const y = parseInt(parts[2], 10);
    if (z <= 0) return;

    // 父瓦片 key
    const parentStr = `${loadedKey.schemeId}:${z - 1}/${Math.floor(x / 2)}/${Math.floor(y / 2)}`;
    if (!this._loadedTiles.has(parentStr)) return;

    // 检查父瓦片的 4 个子瓦片加载情况
    const px = Math.floor(x / 2);
    const py = Math.floor(y / 2);
    let childrenLoaded = 0;
    for (let dy = 0; dy < 2; dy++) {
      for (let dx = 0; dx < 2; dx++) {
        const childStr = `${loadedKey.schemeId}:${z}/${px * 2 + dx}/${py * 2 + dy}`;
        if (this._loadedTiles.has(childStr)) childrenLoaded++;
      }
    }

    // ≥2 个子瓦片已加载 → 父瓦片可安全移除
    if (childrenLoaded >= 2) {
      this._loadedTiles.delete(parentStr);
      this._parentPlaceholders.delete(parentStr);
    }
  }

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

    // 失败次数超限 → 跳过，避免无限重试持续 404 的瓦片
    if ((this._failCounts.get(strKey) ?? 0) >= TileManager.MAX_FAIL_COUNT) {
      return;
    }

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

      const scheme = firstLayer.tileScheme;
      const bounds = scheme.getTileBounds(req.tileKey);
      const origin = TileManager._snapOrigin(bounds);
      tile = new Tile(req.tileKey, bounds, origin);
      tile.reprojector = scheme.getReprojector?.(req.tileKey) ?? undefined;
      isNew = true;
    }

    const controller = new AbortController();
    this._loading.set(cacheKey, { controller, layerIds: new Set(req.layerIds) });
    this.scheduler.startLoading(req.tileKey, controller);

    try {
      tile.state = "loading";

      // 为每个 layer 并行加载内容（提升多图层共享瓦片的加载速度）
      const loadPromises = req.layerIds.map(async (layerId) => {
        const layer = layers.find((l) => l.id === layerId);
        if (!layer) return null;

        // 检查该 layer 是否已有 content（避免重复）
        const hasContent = tile.contents.some((c) => c.layerId === layerId);
        if (hasContent) return null;

        const content = await this._loadFn(tile, layer, controller.signal);
        return content;
      });

      const results = await Promise.allSettled(loadPromises);
      for (const result of results) {
        if (result.status === "fulfilled" && result.value) {
          tile.contents.push(result.value);
        }
      }

      if (tile.contents.length > 0) {
        tile.state = "loaded";
        if (isNew) {
          this._loadedTiles.set(cacheKey, tile);
          this.cache.set(cacheKey, tile, this._estimateBytes(tile));
        }
        this.scheduler.markLoaded(req.tileKey);
        // 新瓦片加载完成 → 触发淘汰检查（可能满足覆盖率条件，可移除旧级别瓦片）
        this._evictRefinedParents();
        this._evictOldZoomTilesAfterLoad(req.tileKey);
      } else {
        tile.state = "failed";
        this.scheduler.markFailed(req.tileKey);
      }
    } catch (err: any) {
      if (err?.name === "AbortError") return;
      tile.state = "failed";
      tile.failCount++;
      // 记录失败次数，超过上限后不再重试
      this._failCounts.set(cacheKey, (this._failCounts.get(cacheKey) ?? 0) + 1);
      this.scheduler.markFailed(req.tileKey);
    } finally {
      this._loading.delete(cacheKey);
    }
  }

  private _estimateBytes(tile: Tile): number {
    let bytes = 1024; // Tile 元数据
    for (const content of tile.contents) {
      for (const ro of content.renderObjects) {
        const obj = ro.object as any;
        if (obj?.geometry) {
          // 估算 geometry 占用：position + uv + index
          const posAttr = obj.geometry.getAttribute?.("position");
          if (posAttr) {
            bytes += posAttr.array.byteLength;
            const uvAttr = obj.geometry.getAttribute?.("uv");
            if (uvAttr) bytes += uvAttr.array.byteLength;
            const idx = obj.geometry.getIndex?.();
            if (idx) bytes += idx.array.byteLength;
          }
        }
        if (obj?.material?.map?.image) {
          // 纹理估算：width * height * 4 bytes (RGBA)
          const img = obj.material.map.image;
          bytes += (img.width ?? 256) * (img.height ?? 256) * 4;
        }
      }
      // 最低保底：每个 content 至少 4KB（覆盖小纹理场景）
      bytes = Math.max(bytes, 4096);
    }
    return bytes;
  }

  /**
   * Local Origin 取整对齐（设计文档 §7.2）
   *
   * 将 bounds 最小角对齐到瓦片尺寸 1/4 的整数倍。
   * 对于 ProjectTileScheme(1000m) 瓦片，对齐到 250m 网格；
   * 对于低 zoom 的 XYZ 瓦片（跨度数十公里），对齐到更大的网格，
   * 保证局部坐标始终是小数值（GPU 安全）。
   */
  private static _snapOrigin(bounds: CrsBounds): CrsCoord {
    const w = bounds[2] - bounds[0];
    const h = bounds[3] - bounds[1];
    const snap = Math.max(1, Math.min(w, h) / 4);
    return {
      x: Math.floor(bounds[0] / snap) * snap,
      y: Math.floor(bounds[1] / snap) * snap,
      z: 0,
    };
  }
}
