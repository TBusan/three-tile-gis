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
  /**
   * 失败冷却节流：tileKey → 最近一次失败时间（Date.now() 毫秒）。
   *
   * 用于节流而非主动重试：抛出真实错误（网络超时、HTTP 404 等非 AbortError）的
   * 瓦片进入冷却期，冷却期内即使视野变化（重新调度）也跳过该瓦片，避免连续
   * 平移时对持续失败的瓦片反复发请求。冷却过期后，下一次视野变化时若仍可见则
   * 自然重新入队（事件驱动，不做定时重试）。
   *
   * 键用含 level 的 _memKey —— strKey 不含 level，跨 LOD 同 (col,row) 的
   * ProjectTileScheme 瓦片会碰撞，冷却/空记录会误伤相邻级别的同位置瓦片。
   */
  private _failTimes = new Map<string, number>();
  /**
   * 已确认「该 layer 在此 tile 上无内容」：tileKey → Set<layerId>。
   *
   * 确定性空结果（如无要素的矢量瓦片返回 null）：_addKeyRequest 顶部直接跳过，
   * 避免共享瓦片下其它层成功时此层每帧被无限重试。
   * 键同样用含 level 的 _memKey。
   */
  private _nullLayers = new Map<string, Set<string>>();
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
   * 渐进式父瓦片占位集合：记录因“渐进式显示”注入的父瓦片 key。
   * 当其子瓦片加载完成后，父瓦片从 _loadedTiles 中移除。
   */
  private _parentPlaceholders = new Set<string>();

  /** 单帧最大瓦片总数 — 安全帽防止多图层叠加超出合理内存 */
  private static readonly MAX_TOTAL_TILES = 8192;

  /** 失败后的冷却重试间隔（毫秒）。超过后经下一次调度重试。 */
  private static readonly FAIL_RETRY_BACKOFF_MS = 5000;

  /**
   * 占位父瓦片硬性生命周期上限（毫秒）— 安全网，非主要淘汰机制。
   *
   * 主要淘汰机制是「子瓦片全部 settle」（见 _evictRefinedParents 注释）：
   * 子瓦片全部加载/失败/确认空后，占位父瓦片立即转背景。此上限只兜底
   * loadFn 永不返回导致子瓦片一直「加载中」的极端情况，届时超过上限强制移除。
   * 阈值大于 XYZ 数据源超时（10s）与典型子瓦片加载时长，正常情况下不会触发。
   */
  private static readonly PLACEHOLDER_MAX_AGE_MS = 20000;

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
   * 原子 LOD：判断一个 tile 当前是否应被渲染。
   *
   * 若其任一祖先瓦片（更粗级别）已在 _loadedTiles 中上屏，则该 tile 应被隐藏：
   * 祖先负责整片区域的均匀显示，子瓦片在「全部加载完成、祖先被淘汰」前单独上屏
   * 会造成区域内 z/z-1 内容混杂（瓦片错落 —— 不同 zoom 拉取的是不同影像源）。
   *
   * 覆盖两类祖先：
   *   ① 渐进式占位父瓦片（_parentPlaceholders）—— 冷启动/失败时注入的 z-1 兜底；
   *   ② 缩放过渡期保留的旧级别瓦片 —— zoom-in 时旧 z 瓦片在全部 z+1 子瓦片
   *      加载完成前作为均匀兜底（见 _evictStaleZoomTilesContinuous / _evictStaleZoomLevels）。
   *
   * Demo 渲染层在 syncScene 中调用此方法跳过隐藏瓦片；祖先被淘汰后子瓦片
   * 自动变为可见（下一帧重新进入渲染路径）。
   */
  isTileHidden(tile: Tile): boolean {
    const scheme = tile.scheme;
    if (!scheme) return false;
    // 向上遍历祖先链：存在已加载的更粗祖先 → 隐藏本瓦片
    let parent = scheme.getParentKey(tile.key);
    while (parent) {
      const parentStr = tileKeyToString(parent);
      if (this._parentPlaceholders.has(parentStr)) return true;
      const pt = this._loadedTiles.get(parentStr);
      if (pt && pt.key.level < tile.key.level) return true;
      parent = scheme.getParentKey(parent);
    }
    return false;
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
    // 调度是事件驱动的（参考 Leaflet/OpenLayers 的「可见集驱动」模型）：
    // 只有视野变化（extentChanged）时才重新生成可见瓦片集合。
    // 失败瓦片不做定时重试 —— 静止相机下调度块不执行，失败瓦片不会被重新请求；
    // 下次视野变化时若仍可见，_addKeyRequest（含失败冷却节流）会自然重新入队。
    // 失败区域的占位父瓦片由 _evictRefinedParents 的「子瓦片全部 settle」规则
    // 转为背景（见该方法注释），避免粗/细混合 LOD 的内容断层永久残留。
    if (extentChanged) {
      this._lastExtent = [...extent] as CrsBounds;
      this._lastResolution = resolution ?? null;

      // 0. 按依赖拓扑排序图层（无依赖的先处理）
    const sorted = this._sortByDeps(layers);

    // 1. 收集候选 TileKey → layerIds（按 key 合并）
    const keyToLayerIds = new Map<string, { key: TileKey; layerIds: Set<string>; bounds: CrsBounds }>();
    // 本帧所有可见瓦片 key（scheme.getVisibleTiles 原始结果，未经 _addKeyRequest 去重）。
    // 用途：① 取消加载时保护仍可见的在途瓦片（在途瓦片不在 keyToLayerIds 中，
    //       否则会被误取消导致每帧 abort/重建）② 持续淘汰时判断屏幕内外。
    const visibleKeys = new Set<string>();
    for (const layer of sorted) {
      const keys = layer.getVisibleTiles(extent, crs, resolution);
      for (const k of keys) visibleKeys.add(tileKeyToString(k));

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
    //    可见集合 = 本帧 scheme 报告的原始可见瓦片 ∪ 本帧待加载瓦片（冗余安全）
    for (const strKey of keyToLayerIds.keys()) visibleKeys.add(strKey);
    for (const [strKey, entry] of this._loading) {
      // 占位父瓦片用于渐进式显示（子瓦片未加载时兜底），不能因离开可见集合而取消，
      // 否则子瓦片加载期间占位永不完成。离开视野的真实瓦片照常取消。
      if (!visibleKeys.has(strKey) && !this._parentPlaceholders.has(strKey)) {
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
    for (const req of requests) {
      // Find a representative layer to compute parent key
      const repLayer = layers.find((l) => l.id === req.layerIds[0]);
      if (!repLayer) continue;
      const parentKey = repLayer.tileScheme.getParentKey(req.tileKey);
      if (!parentKey) continue;
      const parentStr = tileKeyToString(parentKey);
      // 父请求绕过 _addKeyRequest，须在此重复空/冷却守卫：
      // 父瓦片所有请求层均已确认空 → 不注入；父瓦片在失败冷却期 → 不注入。
      const parentMemKey = TileManager._memKey(parentKey);
      const parentNullLayers = this._nullLayers.get(parentMemKey);
      if (parentNullLayers && req.layerIds.every((lid) => parentNullLayers.has(lid))) {
        continue;
      }
      if (
        Date.now() - (this._failTimes.get(parentMemKey) ?? 0) <
        TileManager.FAIL_RETRY_BACKOFF_MS
      ) {
        continue;
      }
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
        // 标记为渐进式占位父瓦片，子瓦片加载完成后自动移除
        this._parentPlaceholders.add(parentStr);
      }
    }

    // Prepend parent requests (higher priority — load low-res first)
    const allRequests = [...parentRequests, ...requests];

    // 5. 调度排序
    this.scheduler.schedule(allRequests);

    // 6. Zoom 级别切换淘汰
    this._evictStaleZoomLevels(layers, visibleKeys);
    } // end if (extentChanged)

    // 父瓦片淘汰：每帧检查（不依赖 extentChanged）
    // 用户停止缩放后子瓦片可能仍在加载，需持续检查
    this._evictRefinedParents();

    // 持续清理非当前 zoom 级别的残留瓦片（每帧运行）
    this._evictStaleZoomTilesContinuous(layers, extent);

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
    tile.scheme = scheme;
    tile.lastAccessTime = Date.now();
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
        // 同步清理父瓦片占位集合，防止孤儿引用累积
        this._parentPlaceholders.delete(key);
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
    // 清理所有状态跟踪集合，防止 dispose 后残留
    this._failTimes.clear();
    this._schemeZooms.clear();
    this._parentPlaceholders.clear();
    this._nullLayers.clear();
  }

  // ---- private ----

  /**
   * Zoom 级别切换淘汰（原子 LOD，解决缩放时上下层底图同时显示）
   *
   * 核心策略（参考 Mapbox replace-refinement）：
   *   - zoom 变化时不立即移除旧瓦片（避免白屏/空洞）
   *   - 逐个检查旧瓦片：只有其空间范围内新级别瓦片「全部就绪」才替换
   *   - 不设超时强删：替换瓦片未就绪时旧瓦片作为均匀兜底（子瓦片被 isTileHidden
   *     隐藏，区域内保持单一级别），避免「3 细 1 粗」或背景洞
   *
   * 对于放大（z → z+1）：一个旧瓦片对应 4 个子瓦片，全部加载才替换
   * 对于缩小（z → z-1）：4 个旧瓦片共享 1 个父瓦片，父加载后立即替换
   * （缩小时旧瓦片更细，作为过渡期均匀显示；父加载后原子切换）
   */
  private _evictStaleZoomLevels(layers: ILayer[], visibleKeys: Set<string>): void {
    for (const layer of layers) {
      const scheme = layer.tileScheme;
      const schemeId = scheme.schemeId;
      const currentZoom = scheme.currentZoom;
      if (currentZoom == null) continue;

      const prevZoom = this._schemeZooms.get(schemeId);
      this._schemeZooms.set(schemeId, currentZoom);

      // zoom 未变化 → 无需淘汰
      if (prevZoom == null || prevZoom === currentZoom) continue;

      // zoom 发生变化 → 对旧级别瓦片做覆盖率检查后原子替换
      const zoomingIn = currentZoom > prevZoom;

      for (const [key, tile] of this._loadedTiles) {
        if (tile.key.schemeId !== schemeId) continue;
        if (tile.key.level !== prevZoom) continue;
        // 当前可见集合中的瓦片不淘汰（可能是新级别的）
        if (visibleKeys.has(key)) continue;

        if (zoomingIn) {
          // 放大：检查该旧瓦片的 4 个子瓦片是否全部加载
          const children = scheme.getChildKeys(tile.key);
          let loadedCount = 0;
          for (const child of children) {
            if (this._loadedTiles.has(tileKeyToString(child))) loadedCount++;
          }
          // 原子 LOD：全部 4 个子瓦片加载完成才移除旧级别瓦片。
          // 移除前旧级别瓦片作为均匀兜底（子瓦片被 isTileHidden 隐藏），
          // 不提前移除 → 无空洞、无 z/z-1 混杂。
          if (loadedCount === 4) {
            this._loadedTiles.delete(key);
            this._parentPlaceholders.delete(key);
          }
        } else {
          // 缩小：新级别（更低 zoom）的父瓦片已加载 → 移除旧级别瓦片。
          // 父瓦片未加载时保留旧级别（更细）瓦片作为均匀兜底，
          // 父加载后立即原子替换（LRU 缓存预算兜底内存）。
          const newParent = scheme.getParentKey(tile.key);
          if (newParent && this._loadedTiles.has(tileKeyToString(newParent))) {
            this._loadedTiles.delete(key);
            this._parentPlaceholders.delete(key);
          }
        }
      }
    }
  }

  /**
   * 父瓦片 refined 退出机制（原子 LOD）
   *
   * 渐进式显示注入的父瓦片只是临时占位：它负责整个 2×2 区域在 z-1 级别的
   * 均匀显示，子瓦片（当前级别）在全部加载完成前被 isTileHidden 隐藏。
   * 因此父占位只能在「全部 4 个子瓦片加载完成」后移除 —— 移除瞬间整片区域
   * 由父（z-1）原子切换到子（z），区域内永不出现 z/z-1 内容混杂。
   *
   * 子瓦片部分失败/确认空（settle 但 <4 加载）时保留父占位作为均匀 z-1 兜底：
   * 显示「整片粗但统一」优于「3 细 1 粗」或「背景洞」。失败瓦片不做定时重试，
   * 下一次视野变化重新调度时自然重试（冷却节流），成功后仍走原子切换。
   */
  private _evictRefinedParents(): void {
    const now = Date.now();
    for (const parentStr of this._parentPlaceholders) {
      const tile = this._loadedTiles.get(parentStr);
      if (!tile) {
        // 父瓦片仍在加载中 → 保留占位标记（子瓦片继续隐藏，避免与父混级）；
        // 父瓦片既未加载也未加载中（失败/被取消）→ 占位无效，清除标记
        //（子瓦片随后不再被隐藏，按自身状态显示）。
        if (!this._loading.has(parentStr)) {
          this._parentPlaceholders.delete(parentStr);
        }
        continue;
      }

      // 通过 scheme 的统一语义获取子瓦片（XYZ 与 Project 均适用）
      const scheme = tile.scheme;
      if (!scheme) continue;

      // 占位瓦片已变为当前 zoom 级别的基础瓦片（用户缩小后）→ 不再视为占位符：
      // 仅移除标记，保留瓦片本身（否则会误删当前级别的底图 → 白屏/闪动）。
      if (tile.key.level === scheme.currentZoom) {
        this._parentPlaceholders.delete(parentStr);
        continue;
      }

      // 统计已加载的子瓦片数量
      let childrenLoaded = 0;
      for (const child of scheme.getChildKeys(tile.key)) {
        if (this._loadedTiles.has(tileKeyToString(child))) childrenLoaded++;
      }

      const age = now - (tile.lastAccessTime || now);

      // 原子 LOD 淘汰规则：
      //   ① 全部 4 个子瓦片已加载 → 整区域原子切换到当前级别，父占位移除。
      //   ② 超龄安全网（防子瓦片 loadFn 永不返回导致永远加载中）→ 强制移除，
      //      此时该区域转背景（异常兜底，正常不会触发）。
      //   其余情况（部分加载 / 部分失败 / 部分加载中）→ 保留父占位：
      //   已加载的子瓦片被隐藏，区域保持均匀的 z-1 显示。
      if (
        childrenLoaded === 4 ||
        age > TileManager.PLACEHOLDER_MAX_AGE_MS
      ) {
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
    // 通过已加载瓦片持有的 scheme 统一语义获取父/子瓦片（XYZ 与 Project 均适用）
    const loadedTile = this._loadedTiles.get(tileKeyToString(loadedKey));
    const scheme = loadedTile?.scheme;
    if (!scheme) return;

    const parentKey = scheme.getParentKey(loadedKey);
    if (!parentKey) return;
    const parentStr = tileKeyToString(parentKey);
    if (!this._loadedTiles.has(parentStr)) return;

    // 只淘汰我们注入的渐进式占位父瓦片，避免误删当前级别的真实父瓦片。
    // 非占位父瓦片（例如放大前已加载的旧级别瓦片）由 _evictStaleZoomTilesContinuous 负责。
    if (!this._parentPlaceholders.has(parentStr)) return;

    // 占位父瓦片已变为当前 zoom 级别的基础瓦片 → 仅移除标记，保留瓦片
    const parentTile = this._loadedTiles.get(parentStr)!;
    if (parentTile.key.level === scheme.currentZoom) {
      this._parentPlaceholders.delete(parentStr);
      return;
    }

    // 检查父瓦片的子瓦片加载情况
    let childrenLoaded = 0;
    for (const child of scheme.getChildKeys(parentKey)) {
      if (this._loadedTiles.has(tileKeyToString(child))) childrenLoaded++;
    }

    // 原子 LOD：全部 4 个子瓦片加载完成才移除父瓦片
    //（部分加载时保留父瓦片作为均匀兜底，子瓦片被 isTileHidden 隐藏）
    if (childrenLoaded === 4) {
      // 级联检查（原子 LOD）：必须在父瓦片移除前判断祖父瓦片是否也可淘汰。
      // 此刻父瓦片仍在 _loadedTiles 中 —— 它刚被 4 个子瓦片完全覆盖（settle），
      // 该区域已视为「更细级别就绪」，应计入祖父的覆盖率。
      // 若在父瓦片删除后再数，父自身不参与计数，祖父最多只有 3 个子瓦片，
      // 「全部 4 个」永远无法满足 → 级联成为死代码。
      const gpKey = scheme.getParentKey(parentKey);
      if (gpKey) {
        const gpStr = tileKeyToString(gpKey);
        const gpTile = this._loadedTiles.get(gpStr);
        if (gpTile && this._parentPlaceholders.has(gpStr)) {
          // 祖父已是当前 zoom 级别 → 仅移除占位标记，保留瓦片本身
          if (gpTile.key.level === scheme.currentZoom) {
            this._parentPlaceholders.delete(gpStr);
          } else {
            // 祖父的 4 个子瓦片（父 + 兄弟父）全部加载 → 祖父整片区域
            // 已被更细级别覆盖 → 级联移除。
            let gpChildrenLoaded = 0;
            for (const child of scheme.getChildKeys(gpKey)) {
              if (this._loadedTiles.has(tileKeyToString(child))) gpChildrenLoaded++;
            }
            if (gpChildrenLoaded === 4) {
              this._loadedTiles.delete(gpStr);
              this._parentPlaceholders.delete(gpStr);
            }
          }
        }
      }

      this._loadedTiles.delete(parentStr);
      this._parentPlaceholders.delete(parentStr);
    }
  }

  /**
   * 持续清理非当前 zoom 级别的残留瓦片（每帧运行，覆盖率感知）
   *
   * 策略（原子 LOD）：
   *   - 不在视野内的旧瓦片：短超时后直接移除（不可见，无需保留）
   *   - 在视野内的旧瓦片：仅当其替换瓦片「全部就绪」时才移除（避免拼接缝/白屏）
   *     - 放大（old < current）：全部 4 个子瓦片加载完成才移除（原子切换）
   *     - 缩小（old > current）：新级别父瓦片已加载才移除
   *   - 不设屏上超时强删：替换瓦片未就绪时旧瓦片作为均匀兜底
   *     （子瓦片被 isTileHidden 隐藏，区域内保持单一级别，无空洞/混杂）；
   *     内存由 LRU 缓存预算兜底，离开视野后由屏外规则淘汰
   */
  private static readonly OFFSCREEN_EVICT_TIMEOUT_MS = 1500;

  private _evictStaleZoomTilesContinuous(
    layers: ILayer[],
    extent: CrsBounds,
  ): void {
    // 收集每个 scheme 的当前级别（XYZ zoom / Project level）
    const schemeZooms = new Map<string, number>();
    for (const layer of layers) {
      const scheme = layer.tileScheme;
      const z = scheme.currentZoom;
      if (z != null) {
        schemeZooms.set(scheme.schemeId, z);
      }
    }
    if (schemeZooms.size === 0) return;

    const now = Date.now();
    const toDelete: string[] = [];

    for (const [key, tile] of this._loadedTiles) {
      const currentZoom = schemeZooms.get(tile.key.schemeId);
      if (currentZoom == null) continue;
      // 当前 zoom 级别的瓦片不淘汰
      if (tile.key.level === currentZoom) continue;
      // 占位符父瓦片由 _evictRefinedParents 管理，此处跳过
      if (this._parentPlaceholders.has(key)) continue;
      // 正在加载中的不淘汰
      if (this._loading.has(key)) continue;

      // 屏幕内外判断用「瓦片包围盒是否与当前帧视野相交」，而非 key 匹配。
      // 旧级别瓦片不在当前级别 getVisibleTiles 的返回集合中，用 key 集合判断
      // 会把仍覆盖屏幕的旧瓦片误判为屏幕外 → 1.5s 强制淘汰 → 子瓦片未加载时白屏。
      // 注意：必须用「当前帧」extent，不能用 _lastExtent —— 慢速平移（每帧 <5%）
      // 时 extentChanged=false，_lastExtent 停留在上次视野变化时的陈旧快照，
      // 新露出条带中的旧瓦片会被误判为屏幕外而提前淘汰。
      const isInView = TileManager._boundsIntersect(tile.bounds, extent);
      const age = now - (tile.lastAccessTime || now);

      if (!isInView) {
        // 不在视野内 → 短超时后移除（不可见，无需保留）
        if (age > TileManager.OFFSCREEN_EVICT_TIMEOUT_MS) {
          toDelete.push(key);
        }
      } else {
        // 在视野内 → 覆盖率感知：仅当替换瓦片已加载时才移除
        const scheme = tile.scheme;
        if (!scheme) continue;

        let covered = false;
        if (tile.key.level < currentZoom) {
          // 放大：检查子瓦片加载情况 —— 全部 4 个加载完成才替换（原子 LOD）
          let loadedCount = 0;
          for (const child of scheme.getChildKeys(tile.key)) {
            if (this._loadedTiles.has(tileKeyToString(child))) loadedCount++;
          }
          covered = loadedCount === 4;
        } else {
          // 缩小：检查父瓦片是否已加载
          const parent = scheme.getParentKey(tile.key);
          covered = parent != null && this._loadedTiles.has(tileKeyToString(parent));
        }

        // 无屏上超时强删：替换瓦片未就绪时保留旧级别瓦片作为均匀兜底，
        // 避免子瓦片未加载完成就移除导致空洞或 z/z-1 混杂。
        if (covered) {
          toDelete.push(key);
        }
      }
    }

    for (const key of toDelete) {
      this._loadedTiles.delete(key);
    }
  }

  /** 两个 CRS 包围盒是否相交 */
  private static _boundsIntersect(a: CrsBounds, b: CrsBounds): boolean {
    return a[0] <= b[2] && a[2] >= b[0] && a[1] <= b[3] && a[3] >= b[1];
  }

  /**
   * 含 level 的内存键 — 用于 _nullLayers / _failTimes。
   *
   * strKey（tileKeyToString）不含 level，跨 LOD 同 (col,row) 的 ProjectTileScheme
   * 瓦片会碰撞成同一键；空/失败记录按 strKey 存储会把某级别的结论误判到
   * 相邻级别同 (col,row) 的瓦片（不同地理范围）。
   */
  private static _memKey(key: TileKey): string {
    return `${tileKeyToString(key)}@${key.level}`;
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
    const memKey = TileManager._memKey(key);

    // 该 layer 在此 tile 已确认为空（返回 null）→ 永久跳过，避免无限重试
    if (this._nullLayers.get(memKey)?.has(layer.id)) return;

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
      // 该 layer 已确认在此 tile 无内容（返回 null）→ 跳过，避免共享瓦片下无限重试
      if (this._nullLayers.get(memKey)?.has(layer.id)) return;
      // 该 layer 未贡献 content 到已存在的 tile，继续添加请求
    }
    if (this.cache.has(strKey)) {
      const tile = this.cache.get(strKey)!;
      this._loadedTiles.set(strKey, tile);
      tile.lastAccessTime = Date.now();
      if (tile.contents.some((c) => c.layerId === layer.id)) return;
      if (this._nullLayers.get(memKey)?.has(layer.id)) return;
      // 该 layer 未贡献 content，继续添加请求
    }

    // 最近失败（抛错/超时）→ 冷却期跳过；冷却过期顺带自清理，防条目无界增长
    const lastFail = this._failTimes.get(memKey) ?? 0;
    if (Date.now() - lastFail < TileManager.FAIL_RETRY_BACKOFF_MS) return;
    if (lastFail !== 0) this._failTimes.delete(memKey);

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
    const memKey = TileManager._memKey(req.tileKey);

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
      tile.scheme = scheme;
      isNew = true;
    }
    // 记录本次访问时间：所有淘汰路径都用 lastAccessTime 计算 age，
    // 若不设置，新建瓦片的 lastAccessTime=0 会被视作 age=0（永不超时），
    // 屏幕外的残留瓦片将永远无法通过超时机制淘汰。
    tile.lastAccessTime = Date.now();

    const controller = new AbortController();
    // 合并而非覆盖：若 _addKeyRequest 已在加载期间把新 layer 并入 layerIds，
    // 直接覆盖会把它们丢掉（该 layer 的内容将永远不会在本次加载中被请求）。
    const prev = this._loading.get(cacheKey);
    const layerIds = new Set<string>(prev?.layerIds ?? []);
    for (const id of req.layerIds) layerIds.add(id);
    this._loading.set(cacheKey, { controller, layerIds });
    this.scheduler.startLoading(req.tileKey, controller);

    try {
      tile.state = "loading";

      // 只加载「尚未有 content」的 layer。已有 content 的 layer 直接跳过：
      // 共享瓦片在加载期间可能被 _addKeyRequest 按 key 重新并入 layerIds
      //（如 A 已有内容、B 触发重载时，A 会被合并进来）。
      // 若把「已有 content」当作「层返回 null」处理，会把它误记入 _nullLayers，
      // 之后瓦片一旦被清出 cache 重建，该层会被永久跳过（见 _addKeyRequest 的
      // _nullLayers 检查）。
      const pendingLayerIds = req.layerIds.filter((layerId) => {
        const layer = layers.find((l) => l.id === layerId);
        if (!layer) return false;
        return !tile.contents.some((c) => c.layerId === layerId);
      });

      // 为每个待加载 layer 并行加载内容（提升多图层共享瓦片的加载速度）
      const loadPromises = pendingLayerIds.map(async (layerId) => {
        const layer = layers.find((l) => l.id === layerId);
        if (!layer) return null;
        const content = await this._loadFn(tile, layer, controller.signal);
        return content;
      });

      const results = await Promise.allSettled(loadPromises);

      // 逐层统计：记录是否有「真实失败」（层返回 null 或抛出非 AbortError）。
      // Promise.allSettled 本身不会抛出，必须自行检查每个结果，
      // 否则逐层的 rejection 会被静默吞掉，failCount 永远不递增 → 拉黑机制失效。
      let hadFailure = false;
      // results 与 pendingLayerIds 按序对应（Promise.allSettled 保持顺序）
      for (let idx = 0; idx < pendingLayerIds.length; idx++) {
        const layerId = pendingLayerIds[idx];
        const result = results[idx];
        if (result.status === "fulfilled") {
          if (result.value) {
            tile.contents.push(result.value);
            // 该 layer 现在有内容了 → 清除「无内容」记录
            // 注意用 _memKey：_nullLayers 已按含 level 的键存储，
            // 用 strKey 会取不到条目，导致空记录永不清理。
            this._nullLayers.get(memKey)?.delete(layerId);
          } else {
            // 该层返回 null。区分「确定性空」（未取消）与「被取消」：
            // 被取消的加载（如 GeoJSON 忽略 signal、demo 在 signal.aborted 时返回 null）
            // 不算失败也不记录 _nullLayers，否则平移回来后该瓦片会被永久跳过。
            if (!controller.signal.aborted) {
              hadFailure = true;
              let set = this._nullLayers.get(memKey);
              if (!set) {
                set = new Set();
                this._nullLayers.set(memKey, set);
              }
              set.add(layerId);
            }
          }
        } else if (result.reason?.name !== "AbortError") {
          // 该层抛出真实错误（非取消）→ 计入失败
          hadFailure = true;
        }
        // AbortError → 取消，不计入失败
      }

      if (tile.contents.length > 0) {
        tile.state = "loaded";
        // 加载成功 → 清除失败冷却，避免瞬时失败（网络抖动等）拖慢后续重试
        this._failTimes.delete(memKey);
        // 无论 isNew 与否都要刷新 loaded/cache：
        //   ① 多图层共享瓦片追加新 content 后（isNew=false），旧字节估算已失效，
        //      LRU 按此做内存预算，陈旧估算会导致预算失真。
        //   ② 若该 Tile 在加载期间被 cache.trim 淘汰出 cache，重新放回，
        //      避免已加载的内容成为孤儿（evict() 会据此从 _loadedTiles 移除）。
        // cache.set 对同一对象重放不会 dispose 自己（有 old.value !== value 守卫）。
        this._loadedTiles.set(cacheKey, tile);
        this.cache.set(cacheKey, tile, this._estimateBytes(tile));
        this.scheduler.markLoaded(req.tileKey);
        // 新瓦片加载完成 → 触发淘汰检查（可能满足覆盖率条件，可移除旧级别瓦片）
        this._evictRefinedParents();
        this._evictOldZoomTilesAfterLoad(req.tileKey);
      } else if (hadFailure) {
        // 所有层均未产出内容（返回 null 或抛出真实错误）→ 记录失败冷却，
        // 冷却期内 _addKeyRequest 跳过，避免对持续 404 / 报错的瓦片无限重试；
        // 冷却过期后自动重试，网络恢复时可自动替换为细粒度瓦片。
        tile.state = "failed";
        tile.failCount++;
        this._failTimes.set(memKey, Date.now());
        this.scheduler.markFailed(req.tileKey);
      } else {
        // 全部被 AbortError 取消 → 视为取消而非失败，恢复未加载状态
        tile.state = "unloaded";
      }
    } catch (err: any) {
      if (err?.name === "AbortError") {
        // 加载被取消 — 恢复 tile 状态（防止卡在 "loading"）
        tile.state = tile.contents.length > 0 ? "loaded" : "unloaded";
        return;
      }
      tile.state = "failed";
      tile.failCount++;
      // 记录失败冷却，冷却期内 _addKeyRequest 跳过重试
      this._failTimes.set(memKey, Date.now());
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
