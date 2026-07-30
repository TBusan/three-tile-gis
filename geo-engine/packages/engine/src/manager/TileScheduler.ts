// geo-engine/packages/engine/src/manager/TileScheduler.ts

import type { CrsCoord } from "../core/types";
import type { TileKey } from "../tile/TileKey";
import { tileKeyToString } from "../tile/TileKey";

/**
 * 待加载 Tile 及其元数据
 */
export interface LoadRequest {
  tileKey: TileKey;
  /** All layers that need this tile (merged by TileKey for sharing) */
  layerIds: string[];
  /** Distance to camera (meters) */
  distanceToCamera: number;
  /** 屏幕面积占比 (0–1)，越大越优先 */
  screenArea: number;
  /** 是否在视锥内 */
  inFrustum: boolean;
  /** 父瓦片字符串 key（用于 parentReady 权重判断） */
  parentKey?: string;
}

/**
 * 四维优先级模型配置
 */
export interface ScheduleWeights {
  screenArea: number;   // w1
  distance: number;     // w2 (1/distance)
  inFrustum: number;    // w3
  parentReady: number;  // w4
}

const DEFAULT_WEIGHTS: ScheduleWeights = {
  screenArea: 0.4,
  distance: 0.3,
  inFrustum: 0.2,
  parentReady: 0.1,
};

/**
 * Tile 调度器 — 优先级排序 + 帧预算控制
 *
 * 按四维权重计算每个待加载 Tile 的优先级，
 * 每帧最多加载 MAX_PER_FRAME 个 tile。
 */
export class TileScheduler {
  /** 每帧基础加载数（正常浏览时） */
  maxPerFrame = 4;
  /** 队列积压时的加速上限（缩小时快速填充） */
  burstPerFrame = 8;
  /** 优先级权重 */
  weights: ScheduleWeights = { ...DEFAULT_WEIGHTS };

  /** 正在加载的 tile（key → AbortController） */
  private readonly _loading = new Map<string, AbortController>();
  /** 已加载的 parent tile key 集合（用于 parentReady 权重） */
  private readonly _loadedParents = new Set<string>();
  /** _loadedParents 容量上限 — 超过后清空重建（仅影响优先级权重精度） */
  private static readonly LOADED_PARENTS_MAX = 4096;

  /** 当前排队中的请求（每帧 reset） */
  private _queue: LoadRequest[] = [];

  /** 注册一个 tile 已加载完成 */
  markLoaded(tileKey: TileKey): void {
    const key = tileKeyToString(tileKey);
    this._loading.delete(key);
    // 容量保护：超过上限时清空重建，防止长时间浏览导致无限增长
    if (this._loadedParents.size >= TileScheduler.LOADED_PARENTS_MAX) {
      this._loadedParents.clear();
    }
    this._loadedParents.add(key);
  }

  /** 注册加载失败 */
  markFailed(tileKey: TileKey): void {
    this._loading.delete(tileKeyToString(tileKey));
  }

  /** 取消一个 tile 的加载 */
  abort(tileKey: TileKey): void {
    const key = tileKeyToString(tileKey);
    this.abortByKey(key);
  }

  /** 通过字符串 key 取消加载 */
  abortByKey(strKey: string): void {
    const controller = this._loading.get(strKey);
    if (controller) {
      controller.abort();
      this._loading.delete(strKey);
    }
  }

  /** 清除不在可见集合中的队列条目 */
  cancelOffscreen(visibleKeys: Set<string>): void {
    this._queue = this._queue.filter((req) =>
      visibleKeys.has(tileKeyToString(req.tileKey)),
    );
  }

  /** 取消所有正在加载的 tile */
  abortAll(): void {
    for (const [, ctrl] of this._loading) {
      ctrl.abort();
    }
    this._loading.clear();
    this._queue = [];
  }

  /**
   * 提交一批候选 Tile 到调度队列
   * @returns 排序后的请求列表（按优先级降序）
   */
  schedule(requests: LoadRequest[]): LoadRequest[] {
    // 去重：同 key 只保留第一个请求
    const seen = new Set<string>();
    const unique: LoadRequest[] = [];
    for (const req of requests) {
      const key = tileKeyToString(req.tileKey);
      if (seen.has(key)) continue;
      if (this._loading.has(key)) continue; // 已在加载中
      seen.add(key);
      unique.push(req);
    }

    // 按优先级排序（降序）
    unique.sort((a, b) => this._computePriority(b) - this._computePriority(a));

    this._queue = unique;
    return unique;
  }

  /**
   * 取下一帧应加载的 Tile 列表（受帧预算限制）
   *
   * 动态帧预算：队列积压较多时加速加载（burst），
   * 避免缩小后长时间看到空白/低分辨率瓦片。
   */
  takeNext(): LoadRequest[] {
    // 动态调整：队列超过 8 个时用 burst 模式加速
    const budget = this._queue.length > 8 ? this.burstPerFrame : this.maxPerFrame;
    const batch: LoadRequest[] = [];
    while (batch.length < budget && this._queue.length > 0) {
      const req = this._queue.shift()!;
      const key = tileKeyToString(req.tileKey);
      if (this._loading.has(key)) continue;
      batch.push(req);
    }
    return batch;
  }

  /** 标记一个 tile 开始加载 */
  startLoading(tileKey: TileKey, controller: AbortController): void {
    const key = tileKeyToString(tileKey);
    this._loading.set(key, controller);
  }

  get queueLength(): number {
    return this._queue.length;
  }

  get loadingCount(): number {
    return this._loading.size;
  }

  // ---- private ----

  private _computePriority(req: LoadRequest): number {
    const { weights } = this;

    const w1 = weights.screenArea * req.screenArea;
    const w2 = weights.distance * (1 / Math.max(req.distanceToCamera, 1));
    const w3 = weights.inFrustum * (req.inFrustum ? 1 : 0.1);
    // parentReady：父瓦片已加载 → 当前瓦片可渐进细化，优先级提升
    const w4 =
      weights.parentReady *
      (req.parentKey && this._loadedParents.has(req.parentKey)
        ? 1
        : 0);

    return w1 + w2 + w3 + w4;
  }
}
