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
  /** 每帧最大加载数 */
  maxPerFrame = 2;
  /** 优先级权重 */
  weights: ScheduleWeights = { ...DEFAULT_WEIGHTS };

  /** 正在加载的 tile（key → AbortController） */
  private readonly _loading = new Map<string, AbortController>();
  /** 已加载的 parent tile key 集合（用于 parentReady 权重） */
  private readonly _loadedParents = new Set<string>();

  /** 当前排队中的请求（每帧 reset） */
  private _queue: LoadRequest[] = [];

  /** 注册一个 tile 已加载完成 */
  markLoaded(tileKey: TileKey): void {
    const key = tileKeyToString(tileKey);
    this._loading.delete(key);
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
   * 取下一帧应加载的 Tile 列表（受 maxPerFrame 限制）
   */
  takeNext(): LoadRequest[] {
    const batch: LoadRequest[] = [];
    while (batch.length < this.maxPerFrame && this._queue.length > 0) {
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
    const w4 =
      weights.parentReady *
      (this._loadedParents.has(tileKeyToString(req.tileKey))
        ? 1
        : 0);

    return w1 + w2 + w3 + w4;
  }
}
