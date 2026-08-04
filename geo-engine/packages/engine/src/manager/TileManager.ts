// geo-engine/packages/engine/src/manager/TileManager.ts

import type { CrsBounds, CrsCoord } from "../core/types";
import type { IProjectCRS } from "../crs/IProjectCRS";
import type { TileKey } from "../tile/TileKey";
import { tileKeyToString } from "../tile/TileKey";
import type { ITileScheme } from "../tile/ITileScheme";
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
   * 在途加载离开视野的宽限记录：tileKey → 首次离开可见集合的时刻。
   *
   * 旋转扫掠时边缘在途瓦片会短暂离开可见集合：立即 abort 会导致每帧
   * abort → 重新入队 → 重新解码（createImageBitmap 主线程）→ 帧率骤降。
   * 记录首次离开时刻，超过宽限期仍未回到视野才真正 abort。
   */
  private _loadingLeftView = new Map<string, number>();
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
  /** 上一次调度时的相机位置（用于旋转检测） */
  private _lastCameraPos: { x: number; y: number } | null = null;
  private static readonly EXTENT_MOVE_FACTOR = 0.05;

  /**
   * Zoom 级别切换跟踪：schemeId → 上一次确认的 zoom。
   * 用于检测 zoom 变化并触发渐进式淘汰。
   */
  private _schemeZooms = new Map<string, number>();

  /**
   * 最近一次调度时的「当前级别可见瓦片」TileKey 映射（strKey → TileKey）。
   *
   * 在 update() 调度块（extentChanged）中重建。供 _staleKeysCoveredByVisible
   * 做「旧级别瓦片是否被当前级别可见瓦片完全覆盖」的原子 LOD 判定：
   * 需要知道哪些当前级别瓦片覆盖某个旧瓦片的地理范围、以及它们是否已加载。
   */
  private _visibleKeyMap = new Map<string, TileKey>();

  /**
   * 底图/坐标系切换代际号：schemeId → 当前代际。
   *
   * resetScheme 递增代际；_loadTile 捕获进入时的代际，完成时若代际已变
   * （reset 之后才完成、与 abort 竞争的旧代加载）则丢弃结果，防止旧底图
   * 瓦片重新回插 _loadedTiles / cache。
   */
  private _schemeGen = new Map<string, number>();

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
   * _nullLayers 容量上限 — 防止长时间平移浏览时空瓦片记录无界增长。
   *
   * 空瓦片（无要素区域返回 null）的记录只在同瓦片同层后续产出内容时删除，
   * 否则条目永久残留。超限时清空重建（同 TileScheduler._loadedParents 模式），
   * 仅影响「空瓦片跳过」的命中精度（清空后最多重试一次重新确认），无正确性影响。
   */
  private static readonly NULL_LAYERS_MAX = 8192;

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
      // 相机位移触发：旋转时 footprint AABB（45° 梯形投影）角点位移可能 <5% 视野宽，
      // 但相机（围绕 target 转动）位移显著。不触发则新露出条带瓦片迟迟不请求
      // → 旋转时边缘空白延迟，加重抖动观感。
      let cameraMoved = false;
      if (this._lastCameraPos) {
        const camThreshold =
          Math.max(lw, lh) * TileManager.EXTENT_MOVE_FACTOR;
        cameraMoved =
          Math.abs(cameraPos.x - this._lastCameraPos.x) > camThreshold ||
          Math.abs(cameraPos.y - this._lastCameraPos.y) > camThreshold;
      }
      // 平移不超过视野 5%、缩放变化不超过 20%、相机位移不超过阈值 → 跳过重新调度
      if (
        !resChanged &&
        !cameraMoved &&
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
      this._lastCameraPos = { x: cameraPos.x, y: cameraPos.y };

      // 0. 按依赖拓扑排序图层（无依赖的先处理）
    const sorted = this._sortByDeps(layers);

    // 1. 收集候选 TileKey → layerIds（按 key 合并）
    const keyToLayerIds = new Map<string, { key: TileKey; layerIds: Set<string>; bounds: CrsBounds }>();
    // 本帧所有可见瓦片 key（scheme.getVisibleTiles 原始结果，未经 _addKeyRequest 去重）。
    // 用途：① 取消加载时保护仍可见的在途瓦片（在途瓦片不在 keyToLayerIds 中，
    //       否则会被误取消导致每帧 abort/重建）② 持续淘汰时判断屏幕内外。
    const visibleKeys = new Set<string>();
    // 同步重建「当前级别可见瓦片」映射：旧级别瓦片的覆盖率判定依赖它。
    // 只有 extentChanged 时可见集合才变化，所以无需在每帧重建。
    this._visibleKeyMap = new Map<string, TileKey>();
    for (const layer of sorted) {
      const keys = layer.getVisibleTiles(extent, crs, resolution);
      for (const k of keys) {
        const strK = tileKeyToString(k);
        visibleKeys.add(strK);
        this._visibleKeyMap.set(strK, k);
      }

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
    const now = Date.now();
    for (const [strKey, entry] of this._loading) {
      // 占位父瓦片用于渐进式显示（子瓦片未加载时兜底），不能因离开可见集合而取消，
      // 否则子瓦片加载期间占位永不完成。
      if (this._parentPlaceholders.has(strKey)) continue;

      if (!visibleKeys.has(strKey)) {
        // 离开视野 → 300ms 宽限期。旋转扫掠时边缘在途瓦片刚离开可见集合就立即
        // abort，会形成「abort → 重新调度 → 重新入队 → 重新解码（createImageBitmap
        // 主线程）」的每帧循环，帧率骤降且同一瓦片反复请求。记录首次离开时刻，
        // 超过宽限期仍未回到视野才真正 abort。
        const leftAt = this._loadingLeftView.get(strKey);
        if (leftAt == null) {
          this._loadingLeftView.set(strKey, now);
          continue;
        }
        if (now - leftAt <= TileManager.LOADING_LEAVE_VIEW_GRACE_MS) {
          continue;
        }
        entry.controller.abort();
        this._loading.delete(strKey);
        this._loadingLeftView.delete(strKey);
        this.scheduler.abortByKey(strKey);
      } else {
        // 回到视野 → 清除宽限记录，加载继续
        this._loadingLeftView.delete(strKey);
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
    this._schemeGen.clear();
    this._loadingLeftView.clear();
    this._visibleKeyMap.clear();
  }

  /**
   * 底图/坐标系切换：清除某一 scheme 的全部瓦片状态并终止在途加载。
   *
   * 用于 Engine.replaceLayer（底图切换）：新底图与旧底图共用同一 schemeId
   * （如 "xyz"），旧底图已加载瓦片必须整体移除（LRU cache 一并释放 GPU 资源），
   * 否则会与新材料混合显示。其它 scheme 的图层（矢量/检查板等）不受影响。
   *
   * 同时递增该 scheme 的代际号：_loadTile 中在 reset 之后才完成的旧代加载
   * （数据源忽略 signal / 解码已在途）被代际检查丢弃，防止旧底图瓦片回插。
   */
  resetScheme(schemeId: string): void {
    const prefix = `${schemeId}:`;
    // 代际递增：后续完成的旧代加载全部失效
    this._schemeGen.set(schemeId, (this._schemeGen.get(schemeId) ?? 0) + 1);

    // 1. 终止在途加载（TileManager 持有的 controller + 调度器队列）
    for (const [key, entry] of this._loading) {
      if (key.startsWith(prefix)) {
        entry.controller.abort();
        this._loading.delete(key);
        this._loadingLeftView.delete(key);
      }
    }
    this.scheduler.abortScheme(prefix);

    // 2. 移除已加载瓦片（不直接 dispose —— 资源由 cache 统一释放一次）
    for (const [key, tile] of this._loadedTiles) {
      if (tile.key.schemeId === schemeId) {
        this._loadedTiles.delete(key);
      }
    }

    // 3. 释放 LRU cache 中该 scheme 全部瓦片的资源（纹理/材质/非共享几何）
    this.cache.clearByPrefix(prefix);

    // 4. 清理状态跟踪：占位父瓦片 / 空层记录 / 失败冷却 / 级别状态
    for (const key of this._parentPlaceholders) {
      if (key.startsWith(prefix)) this._parentPlaceholders.delete(key);
    }
    for (const key of this._nullLayers.keys()) {
      if (key.startsWith(prefix)) this._nullLayers.delete(key);
    }
    for (const key of this._failTimes.keys()) {
      if (key.startsWith(prefix)) this._failTimes.delete(key);
    }
    this._schemeZooms.delete(schemeId);
    // 可见映射下次 update 会整体重建；此处清空以防残留旧 scheme 条目
    this._visibleKeyMap.clear();

    // 关键：重置视野缓存。update() 用 extentChanged 优化跳过「视野未变」的调度
    // 块（平移<5% 且缩放<20%）。resetScheme 已清空本 scheme 的 loadedTiles/cache，
    // 若相机静止不动，下一次 update() 会误以为视野没变而跳过调度 → 切换后的
    // 新底图瓦片永远不会被请求（调度器 0 queued / 0 loading，底图空白）。
    // 清空后下次 update() 的 extentChanged 恒为 true，强制重新生成可见瓦片集合。
    this._lastExtent = null;
    this._lastResolution = null;
  }

  // ---- private ----

  /**
   * Zoom 级别切换淘汰（原子 LOD，解决缩放时上下层底图同时显示）
   *
   * 核心策略（参考 Mapbox replace-refinement）：
   *   - zoom 变化时不立即移除旧瓦片（避免白屏/空洞）
   *   - 旧瓦片只有被「当前级别可见瓦片」完全覆盖（与其 bounds 相交的所有可见
   *     瓦片均已加载）才替换 —— 见 _staleKeysCoveredByVisible
   *   - 不设超时强删：替换瓦片未就绪时旧瓦片作为均匀兜底（子瓦片被 isTileHidden
   *     隐藏，区域内保持单一级别），避免「3 细 1 粗」或背景洞
   *
   * 覆盖判定统一了放大/缩小与多级跳变：
   *   - 放大（z → z+1）：旧瓦片被其覆盖范围内的新级别子瓦片替换（原子切换）
   *   - 缩小（z → z-1）：旧（更细）瓦片被覆盖该区域的新级别（更粗）瓦片替换
   *   - 多级跳变（z → z+n，_pickZoom 跳过中间级别）：中间级别子瓦片永远不会被
   *     请求，不再要求「4 个直接子瓦片全部加载」，按与当前级别可见瓦片相交判定，
   *     避免旧瓦片因中间级别缺失而永久钉死（isTileHidden 永久隐藏新瓦片）
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

      // zoom 发生变化 → 收集旧级别瓦片，对可见区域做覆盖率检查后原子替换
      const staleTiles: Tile[] = [];
      for (const [key, tile] of this._loadedTiles) {
        if (tile.key.schemeId !== schemeId) continue;
        if (tile.key.level !== prevZoom) continue;
        // 当前可见集合中的瓦片不淘汰（可能是新级别的）
        if (visibleKeys.has(key)) continue;
        staleTiles.push(tile);
      }
      if (staleTiles.length === 0) continue;

      // 原子 LOD：与旧瓦片 bounds 相交的所有当前级别可见瓦片均加载完成才移除。
      // 未就绪时旧级别瓦片作为均匀兜底（子瓦片被 isTileHidden 隐藏），
      // 不提前移除 → 无空洞、无 z/z-1 混杂。
      for (const strK of this._staleKeysCoveredByVisible(scheme, staleTiles)) {
        this._loadedTiles.delete(strK);
        this._parentPlaceholders.delete(strK);
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
   *   - 在视野内的旧瓦片：仅当「与其 bounds 相交的所有当前级别可见瓦片已加载」
   *     时才移除（避免拼接缝/白屏）—— 见 _staleKeysCoveredByVisible。
   *     单级（z→z+1）与多级跳变（z→z+n，中间级别不请求）均能收敛。
   *   - 不设屏上超时强删：替换瓦片未就绪时旧瓦片作为均匀兜底
   *     （子瓦片被 isTileHidden 隐藏，区域内保持单一级别，无空洞/混杂）；
   *     内存由 LRU 缓存预算兜底，离开视野后由屏外规则淘汰
   *
   * 占位符父瓦片（_parentPlaceholders）同样走覆盖率判定（不再跳过）：
   *   - 正常慢速缩放时占位父瓦片位于 currentZoom-1，其子瓦片 = 当前级别可见瓦片，
   *     覆盖率判定与 _evictRefinedParents 的「4 子瓦片全加载」语义一致；
   *   - 多级跳变（如 z2→z4）时旧占位父瓦片（z1）的子瓦片（z2）永远不会被请求，
   *     _evictRefinedParents 的 childrenLoaded===4 永不满足 → 占位父瓦片 20s 内
   *     一直挂在 _parentPlaceholders → isTileHidden 永久隐藏其全部可见后代
   *     （图面停留低等级，正是用户报告的放大后不切换）。
   *     覆盖率判定只看「可见后代是否就绪」，中间级别缺失也能收敛，
   *     淘汰时同步清除占位标记（见下方 toDelete 循环），子瓦片随即不再被隐藏。
   */
  private static readonly OFFSCREEN_EVICT_TIMEOUT_MS = 1500;

  /** 在途加载离开视野的宽限期：超过仍未回到视野才 abort（防旋转时 abort/重建循环） */
  private static readonly LOADING_LEAVE_VIEW_GRACE_MS = 300;

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
    // 屏内旧级别瓦片按 scheme 分组：覆盖率判定（_staleKeysCoveredByVisible）需要
    // 同一 scheme 的可见瓦片集合整体参与，逐瓦片独立判断无法复用已算好的交集。
    const staleInViewByScheme = new Map<string, Tile[]>();

    for (const [key, tile] of this._loadedTiles) {
      const currentZoom = schemeZooms.get(tile.key.schemeId);
      if (currentZoom == null) continue;
      // 占位符父瓦片也参与覆盖率判定（不跳过）：多级跳变时旧占位父瓦片的
      // 直接子瓦片永远不会被请求，_evictRefinedParents 的 childrenLoaded===4
      // 永不满足 → 占位父瓦片 20s 内一直隐藏其可见后代（图面停留低等级）。
      // 覆盖率判定只看「可见后代是否就绪」，中间级别缺失也能收敛（见上方注释）。
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

      // 当前 zoom 级别的瓦片：只允许「屏幕外超时淘汰」，禁止覆盖率淘汰。
      // 屏内当前级别瓦片就是可见 LOD，必须保留（覆盖率淘汰只针对旧级别残留瓦片）；
      // 屏幕外当前级别瓦片在旋转扫掠时大量累积（直到 256MB LRU 上限才被 trim，
      // ~1000+ 瓦片），必须超时移除以收敛 _loadedTiles / sceneTiles、释放 GPU 资源。
      // 被移除瓦片仍在 LRU cache 中，重新进入视野时 _addKeyRequest cache 命中
      // 回挂，无需重新下载。
      if (tile.key.level === currentZoom) {
        if (!isInView && age > TileManager.OFFSCREEN_EVICT_TIMEOUT_MS) {
          toDelete.push(key);
        }
        continue;
      }

      if (!isInView) {
        // 不在视野内 → 短超时后移除（不可见，无需保留）
        if (age > TileManager.OFFSCREEN_EVICT_TIMEOUT_MS) {
          toDelete.push(key);
        }
      } else {
        // 在视野内 → 加入分组，统一做覆盖率判定。
        const scheme = tile.scheme;
        if (!scheme) continue;
        let group = staleInViewByScheme.get(tile.key.schemeId);
        if (!group) {
          group = [];
          staleInViewByScheme.set(tile.key.schemeId, group);
        }
        group.push(tile);
      }
    }

    // 覆盖率感知淘汰：仅当与旧瓦片 bounds 相交的所有当前级别可见瓦片均已加载
    // 时才移除（原子 LOD）。支持单级（z→z+1）与多级跳变（z→z+n）—— 中间级别
    // 瓦片永远不会被请求时，旧规则「4 个直接子瓦片全部加载」会永久钉死旧瓦片。
    for (const [, tiles] of staleInViewByScheme) {
      const scheme = tiles[0].scheme;
      if (!scheme) continue;
      for (const k of this._staleKeysCoveredByVisible(scheme, tiles)) {
        toDelete.push(k);
      }
    }

    for (const key of toDelete) {
      this._loadedTiles.delete(key);
      // 同步清除占位标记：被覆盖率淘汰的占位父瓦片必须一并解除占位身份，
      // 否则 isTileHidden 仍会因 _parentPlaceholders 命中而永久隐藏其可见后代
      // （这正是「放大后高等级瓦片已请求但图面停留低等级」的另一半根因）。
      this._parentPlaceholders.delete(key);
    }
  }

  /** 两个 CRS 包围盒是否相交 */
  private static _boundsIntersect(a: CrsBounds, b: CrsBounds): boolean {
    return a[0] <= b[2] && a[2] >= b[0] && a[1] <= b[3] && a[3] >= b[1];
  }

  /**
   * 计算旧级别（stale）瓦片中，哪些已被「当前级别可见瓦片」完全覆盖。
   *
   * 覆盖 = 该 stale 瓦片在 LOD 层级链上的所有可见「替代瓦片」均已加载。
   *   · 放大（stale 更粗）：替代瓦片 = 可见的当前级别后代瓦片 —— 沿可见瓦片的
   *     getParentKey 祖先链向上遍历，命中 stale 祖先即标记该可见瓦片为需求；
   *   · 缩小（stale 更细）：替代瓦片 = 覆盖该区域的当前级别祖先瓦片 —— 沿 stale
   *     瓦片的 getParentKey 祖先链向上到当前级别，祖先可见且已加载才可淘汰；
   *   · 多级跳变（_pickZoom 跳过中间级别，如 z4→z8）：中间级别子瓦片永远不会被
   *     请求，旧规则「4 个直接子瓦片全部加载」会因 loadedCount=0 永久钉死旧瓦片
   *     （isTileHidden 永久隐藏新级别瓦片）。按「可见后代」判定，中间级别缺失时
   *     也能收敛；
   *   · 无可见替代瓦片（区域不可见/数据缺失）→ 保守不淘汰。
   *
   * 用「层级链」而非几何相交：父/子瓦片边界因浮点误差不精确对齐，几何相交会把
   * 仅共边/共角的邻接瓦片误判为覆盖该区域（零面积接触）→ 本可淘汰的 stale 瓦片
   * 被未加载的邻接瓦片钉死，其可见后代被 isTileHidden 永久隐藏（视口边缘条带
   * 停留在低级别，正是用户报告的放大后不切换的根因）。
   */
  private _staleKeysCoveredByVisible(
    scheme: ITileScheme,
    staleTiles: Tile[],
  ): string[] {
    const covered: string[] = [];
    if (staleTiles.length === 0 || this._visibleKeyMap.size === 0) return covered;

    const currentZoom = scheme.currentZoom;
    const staleByKey = new Set<string>();
    for (const tile of staleTiles) staleByKey.add(tileKeyToString(tile.key));

    const hasVisible = new Set<string>();
    const notCovered = new Set<string>();

    // 方向① 放大：可见瓦片的每个 stale 祖先都需要该可见瓦片加载后才可淘汰。
    // 注意不 break —— 多级跳变时多个旧级别（z2 与 z1）可同时为 stale 祖先，
    // 需全部标记，否则粗祖先（z1）永远不会满足需求 → isTileHidden 仍隐藏后代。
    for (const [vStr, vKey] of this._visibleKeyMap) {
      if (vKey.schemeId !== scheme.schemeId) continue;
      const isLoaded = this._loadedTiles.has(vStr);
      let anc = scheme.getParentKey(vKey);
      while (anc) {
        const ancStr = tileKeyToString(anc);
        if (staleByKey.has(ancStr)) {
          hasVisible.add(ancStr);
          if (!isLoaded) notCovered.add(ancStr);
        }
        anc = scheme.getParentKey(anc);
      }
    }

    // 方向② 缩小：stale 比当前级别更细，需其「当前级别祖先」加载后才可淘汰
    // （祖先未就绪时细瓦片作为兜底，避免空洞）。
    if (currentZoom != null) {
      for (const tile of staleTiles) {
        if (tile.key.level <= currentZoom) continue;
        const strK = tileKeyToString(tile.key);
        let anc = scheme.getParentKey(tile.key);
        while (anc && anc.level > currentZoom) {
          anc = scheme.getParentKey(anc);
        }
        if (!anc || anc.level !== currentZoom) continue;
        const ancStr = tileKeyToString(anc);
        // 祖先必须可见（当前级别可见集内）且已加载；不可见的细瓦片
        // 由 _evictStaleZoomTilesContinuous 的屏外超时规则淘汰。
        if (!this._visibleKeyMap.has(ancStr)) continue;
        hasVisible.add(strK);
        if (!this._loadedTiles.has(ancStr)) notCovered.add(strK);
      }
    }

    for (const tile of staleTiles) {
      const strK = tileKeyToString(tile.key);
      if (hasVisible.has(strK) && !notCovered.has(strK)) covered.push(strK);
    }
    return covered;
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
    // 捕获代际号：完成时若 resetScheme 已递增（底图切换），丢弃本加载。
    const gen = this._schemeGen.get(req.tileKey.schemeId) ?? 0;

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
                // 容量上限：防长时间平移浏览时空瓦片记录无界增长。
                // 超限清空重建，仅影响「空瓦片跳过」命中精度，无正确性影响。
                if (this._nullLayers.size >= TileManager.NULL_LAYERS_MAX) {
                  this._nullLayers.clear();
                }
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

      // 底图切换代际守卫：resetScheme 之后才完成（与 abort 竞争）的旧代加载全部
      // 丢弃 —— 不写入 _loadedTiles / cache、不记录失败冷却，防止旧底图瓦片回插
      // 与新底图混合显示。已产出的 content 显式 dispose，避免 GPU 资源泄漏。
      if ((this._schemeGen.get(req.tileKey.schemeId) ?? 0) !== gen) {
        for (const content of tile.contents) {
          if (!content.disposed) content.dispose();
        }
        tile.contents.length = 0;
        tile.state = "unloaded";
        return;
      }

      // 共享瓦片守卫：加载期间该瓦片可能被 cache.trim 淘汰并 dispose（内存预算回收）。
      // 迟到的 content（含已释放 GPU 资源的 renderObject）不能回插到已 dispose 的瓦片，
      // 否则 demo syncScene 会把已释放 mesh 挂回场景渲染已释放资源。
      // contents 是 readonly，原地删除 disposed 项（倒序遍历避免索引偏移）。
      if (tile.contents.some((c) => c.disposed)) {
        for (let i = tile.contents.length - 1; i >= 0; i--) {
          if (tile.contents[i].disposed) tile.contents.splice(i, 1);
        }
      }

      // 按 content.layerId 去重（防内容重复泄漏）：同一 layerId 只保留最新 content。
      // 正常路径下 _addKeyRequest 已按 layerId 命中缓存提前返回、pendingLayerIds 也
      // 排除了已有 content 的 layer，不会出现重复；此守卫兜底「调用方未传 layer.id
      // 导致 content.layerId 与 layer.id 不匹配（如 renderer 默认 "raster-layer"）」
      // 等回归 —— 那种情况下瓦片会反复重载、每次 push 一份同 layerId 内容（纹理/
      // 材质/网格泄漏 → 旋转时帧率下降），去重把泄漏从「无界」压到「每 tile 1 份」。
      // 一个 layer 在一个 tile 上至多产出 1 份 content，同 layerId 重复即异常。
      if (tile.contents.length > 1) {
        const seenLayerIds = new Set<string>();
        for (let i = tile.contents.length - 1; i >= 0; i--) {
          const c = tile.contents[i];
          if (seenLayerIds.has(c.layerId)) {
            if (!c.disposed) c.dispose();
            tile.contents.splice(i, 1);
          } else {
            seenLayerIds.add(c.layerId);
          }
        }
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
      // 加载完成（成功/失败/取消）→ 清理宽限记录，避免残留
      this._loadingLeftView.delete(cacheKey);
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
