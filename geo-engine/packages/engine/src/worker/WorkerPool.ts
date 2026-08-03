// geo-engine/packages/engine/src/worker/WorkerPool.ts

/**
 * Worker 任务描述 — 提交给 WorkerPool 执行
 */
export interface WorkerTask<T = unknown> {
  /** Worker 脚本 URL */
  script: URL | string;
  /** 发送给 worker 的数据 */
  data: unknown;
  /** 可转移对象（ArrayBuffer 等），零拷贝传输 */
  transfer?: Transferable[];
}

/**
 * Worker 返回结果
 */
export interface WorkerResult<T = unknown> {
  data?: T;
  error?: string;
}

interface PendingTask {
  task: WorkerTask;
  resolve: (value: unknown) => void;
  reject: (reason: Error) => void;
}

interface PoolWorker {
  worker: Worker;
  script: string; // script URL used to create this worker
  busy: boolean;
}

/**
 * WorkerPool — 共享 Web Worker 池
 *
 * 管理一组可复用的 Worker，限制并发数，超出时自动排队。
 *
 * 用法：
 *   const pool = new WorkerPool();
 *   const result = await pool.exec<string>({
 *     script: new URL('./my-worker.ts', import.meta.url),
 *     data: { foo: 42 },
 *   });
 *
 * 特性：
 *   - 惰性创建：首次 exec() 时才创建 Worker
 *   - 按 script 复用：相同 script 的任务复用同一个 Worker
 *   - 并发控制：最多 poolSize 个 Worker 同时运行
 *   - 队列调度：超出并发限制时排队，Worker 空闲后自动处理
 *   - 优雅关闭：dispose() 终止所有 Worker 并拒绝队列中的任务
 */
export class WorkerPool {
  readonly poolSize: number;

  private _workers: PoolWorker[] = [];
  private _queue: PendingTask[] = [];
  private _disposed = false;

  /**
   * @param poolSize — 最大并发 Worker 数
   *   默认: navigator.hardwareConcurrency - 1（最小 1，最大 8）
   */
  constructor(poolSize?: number) {
    if (poolSize !== undefined) {
      this.poolSize = Math.max(1, poolSize);
    } else {
      const cores =
        typeof navigator !== "undefined" ? navigator.hardwareConcurrency : 4;
      this.poolSize = Math.max(1, Math.min(cores - 1, 8));
    }
  }

  /** 当前活跃（忙碌中）的 Worker 数 */
  get activeCount(): number {
    return this._workers.filter((w) => w.busy).length;
  }

  /** 排队等待中的任务数 */
  get queueLength(): number {
    return this._queue.length;
  }

  /**
   * 在 Worker 池中执行一个任务
   *
   * @returns Promise<T> — worker 的返回值
   * @throws 如果 pool 已 dispose，或 worker 报错
   */
  exec<T>(task: WorkerTask): Promise<T> {
    if (this._disposed) {
      return Promise.reject(new Error("WorkerPool已disposed"));
    }

    const scriptKey = this._scriptKey(task);

    return new Promise<T>((resolve, reject) => {
      // 1. 查找同 script 的空闲 Worker（按 script 复用）
      const idle = this._workers.find(
        (pw) => !pw.busy && pw.script === scriptKey,
      );
      if (idle) {
        this._dispatch(idle, task, resolve as (v: unknown) => void, reject);
        return;
      }

      // 2. 池未满 → 创建新 Worker
      if (this._workers.length < this.poolSize) {
        const pw = this._createWorker(scriptKey);
        this._workers.push(pw);
        this._dispatch(pw, task, resolve as (v: unknown) => void, reject);
        return;
      }

      // 3. 池满但有空闲异 script Worker → 替换后派发（防止跨 script 任务饥饿）
      const idleAny = this._workers.find((pw) => !pw.busy);
      if (idleAny) {
        const pw = this._replaceIdleWorker(idleAny, scriptKey);
        this._dispatch(pw, task, resolve as (v: unknown) => void, reject);
        return;
      }

      // 4. 池满且全部忙碌 → 排队
      this._queue.push({ task, resolve: resolve as (v: unknown) => void, reject });
    });
  }

  /**
   * 终止所有 Worker 并清空队列
   */
  dispose(): void {
    this._disposed = true;

    for (const pw of this._workers) {
      pw.worker.terminate();
    }
    this._workers = [];

    for (const pending of this._queue) {
      pending.reject(new Error("WorkerPool disposed"));
    }
    this._queue = [];
  }

  // ---- private ----

  private _createWorker(scriptKey: string): PoolWorker {
    const worker = new Worker(scriptKey, { type: "module" });
    return { worker, script: scriptKey, busy: false };
  }

  private _scriptKey(task: WorkerTask): string {
    return typeof task.script === "string" ? task.script : task.script.href;
  }

  /** 终止旧空闲 Worker，用指定 script 的新 Worker 顶替 */
  private _replaceIdleWorker(old: PoolWorker, scriptKey: string): PoolWorker {
    const idx = this._workers.indexOf(old);
    if (idx !== -1) {
      this._workers.splice(idx, 1);
    }
    old.worker.terminate();
    const pw = this._createWorker(scriptKey);
    this._workers.push(pw);
    return pw;
  }

  private _dispatch(
    pw: PoolWorker,
    task: WorkerTask,
    resolve: (value: unknown) => void,
    reject: (reason: Error) => void,
  ): void {
    pw.busy = true;

    const onMessage = (e: MessageEvent) => {
      cleanup();
      const result = e.data as WorkerResult;
      if (result && typeof result === "object" && "error" in result) {
        reject(new Error(result.error));
      } else {
        // Worker may have sent { data: ... } wrapper or raw data
        resolve("data" in (result ?? {}) ? (result as WorkerResult).data! : result);
      }
      this._onWorkerDone(pw);
    };

    const onError = (e: ErrorEvent) => {
      cleanup();
      reject(new Error(e.message || "Worker error"));
      // Replace failed worker
      const idx = this._workers.indexOf(pw);
      if (idx !== -1) {
        pw.worker.terminate();
        this._workers.splice(idx, 1);
      }
      // Check queue — maybe create a replacement
      this._processQueue();
    };

    const cleanup = () => {
      pw.worker.removeEventListener("message", onMessage);
      pw.worker.removeEventListener("error", onError);
    };

    pw.worker.addEventListener("message", onMessage);
    pw.worker.addEventListener("error", onError);

    // Send task data to worker
    if (task.transfer && task.transfer.length > 0) {
      pw.worker.postMessage(task.data, task.transfer);
    } else {
      pw.worker.postMessage(task.data);
    }
  }

  private _onWorkerDone(pw: PoolWorker): void {
    pw.busy = false;
    this._processQueue();
  }

  private _processQueue(): void {
    if (this._queue.length === 0) return;

    // 1. 优先匹配同 script 的空闲 Worker（按 script 复用）
    for (let i = 0; i < this._queue.length; i++) {
      const pending = this._queue[i];
      const scriptKey = this._scriptKey(pending.task);

      const idle = this._workers.find(
        (pw) => !pw.busy && pw.script === scriptKey,
      );
      if (idle) {
        this._queue.splice(i, 1);
        this._dispatch(idle, pending.task, pending.resolve, pending.reject);
        return;
      }
    }

    // 2. 池未满 → 新建 Worker 派发首个排队任务
    if (this._workers.length < this.poolSize) {
      const pending = this._queue.shift()!;
      const scriptKey = this._scriptKey(pending.task);
      const pw = this._createWorker(scriptKey);
      this._workers.push(pw);
      this._dispatch(pw, pending.task, pending.resolve, pending.reject);
      return;
    }

    // 3. 池满但有空闲异 script Worker → 替换后派发（防止跨 script 任务饥饿）
    const idleAny = this._workers.find((pw) => !pw.busy);
    if (idleAny) {
      // 先替换成功再出队：若 new Worker() 抛异常（非法 script URL），
      // 任务仍留在队列（而不是已 shift 导致 Promise 永不 settle 的悬挂）。
      const scriptKey = this._scriptKey(this._queue[0].task);
      try {
        const pw = this._replaceIdleWorker(idleAny, scriptKey);
        const pending = this._queue.shift()!;
        this._dispatch(pw, pending.task, pending.resolve, pending.reject);
      } catch {
        // 替换失败：旧 worker 已 terminate，池子有空位，任务留待下次 _processQueue
      }
    }
  }
}
