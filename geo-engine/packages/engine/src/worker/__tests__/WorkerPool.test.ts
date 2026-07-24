// geo-engine/packages/engine/src/worker/__tests__/WorkerPool.test.ts
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { WorkerPool } from "../WorkerPool";

// ---- Mock Worker ----

/**
 * Create a controllable mock Worker for testing.
 * Each mock tracks its listeners and lets tests trigger responses.
 */
function makeMockWorker(scriptKey: string) {
  const listeners: Record<string, Array<(...args: any[]) => void>> = {};

  const mock = {
    scriptKey,
    addEventListener: vi.fn(
      (type: string, fn: (...args: any[]) => void) => {
        (listeners[type] ??= []).push(fn);
      },
    ),
    removeEventListener: vi.fn(
      (type: string, fn: (...args: any[]) => void) => {
        const arr = listeners[type];
        if (arr) {
          const idx = arr.indexOf(fn);
          if (idx !== -1) arr.splice(idx, 1);
        }
      },
    ),
    postMessage: vi.fn(),
    terminate: vi.fn(),

    // Test helpers
    _emitMessage(data: unknown): void {
      for (const fn of listeners["message"] ?? []) {
        fn({ data } as MessageEvent);
      }
    },
    _emitError(message: string): void {
      for (const fn of listeners["error"] ?? []) {
        fn({ message } as ErrorEvent);
      }
    },
  };

  return mock;
}

// Store created mocks so tests can access them
const workerMocks: ReturnType<typeof makeMockWorker>[] = [];

function createWorkerMock(scriptKey: string) {
  const mock = makeMockWorker(scriptKey);
  workerMocks.push(mock);
  return mock;
}

// ---- Setup ----

describe("WorkerPool", () => {
  beforeEach(() => {
    workerMocks.length = 0;
    vi.stubGlobal(
      "Worker",
      vi.fn((script: string) => createWorkerMock(script)),
    );
    vi.stubGlobal("navigator", {
      hardwareConcurrency: 8,
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("should create pool with default size (cores - 1)", () => {
    const pool = new WorkerPool();
    expect(pool.poolSize).toBe(7); // 8 - 1
    expect(pool.activeCount).toBe(0);
    expect(pool.queueLength).toBe(0);
    pool.dispose();
  });

  it("should respect explicit poolSize", () => {
    const pool = new WorkerPool(3);
    expect(pool.poolSize).toBe(3);
    pool.dispose();
  });

  it("should clamp poolSize to at least 1", () => {
    const pool = new WorkerPool(0);
    expect(pool.poolSize).toBe(1);
    pool.dispose();
  });

  it("should exec a task and return the worker's result", async () => {
    const pool = new WorkerPool(2);

    const resultP = pool.exec<string>({
      script: "/workers/test.worker.js",
      data: { input: 42 },
    });

    // Worker should have been created and posted
    expect(workerMocks.length).toBe(1);
    const w = workerMocks[0];
    expect(w.postMessage).toHaveBeenCalledWith({ input: 42 });

    // Simulate worker response
    w._emitMessage({ data: "result-42" });

    const result = await resultP;
    expect(result).toBe("result-42");

    pool.dispose();
  });

  it("should reuse idle worker for same script", async () => {
    const pool = new WorkerPool(2);

    // Task 1
    const p1 = pool.exec<string>({
      script: "/workers/test.worker.js",
      data: { n: 1 },
    });
    expect(workerMocks.length).toBe(1);

    // Worker1 responds
    workerMocks[0]._emitMessage({ data: "r1" });
    await p1;

    // Task 2 — should reuse the same worker (now idle)
    const p2 = pool.exec<string>({
      script: "/workers/test.worker.js",
      data: { n: 2 },
    });

    // Should NOT create a second worker
    expect(workerMocks.length).toBe(1);
    // Same worker received new message
    expect(workerMocks[0].postMessage).toHaveBeenCalledTimes(2);

    workerMocks[0]._emitMessage({ data: "r2" });
    const result = await p2;
    expect(result).toBe("r2");

    pool.dispose();
  });

  it("should create separate worker for different script", async () => {
    const pool = new WorkerPool(4);

    const p1 = pool.exec<string>({
      script: "/workers/a.worker.js",
      data: { n: 1 },
    });
    const p2 = pool.exec<string>({
      script: "/workers/b.worker.js",
      data: { n: 2 },
    });

    // Two different scripts → two workers
    expect(workerMocks.length).toBe(2);
    expect(workerMocks[0].scriptKey).toBe("/workers/a.worker.js");
    expect(workerMocks[1].scriptKey).toBe("/workers/b.worker.js");

    workerMocks[0]._emitMessage({ data: "a" });
    workerMocks[1]._emitMessage({ data: "b" });

    expect(await p1).toBe("a");
    expect(await p2).toBe("b");

    pool.dispose();
  });

  it("should queue tasks when pool is full", async () => {
    const pool = new WorkerPool(1);

    // Task 1 begins immediately
    const p1 = pool.exec<string>({
      script: "/workers/test.worker.js",
      data: { n: 1 },
    });
    expect(pool.activeCount).toBe(1);

    // Task 2 queued (same script, but worker is busy)
    const p2 = pool.exec<string>({
      script: "/workers/test.worker.js",
      data: { n: 2 },
    });
    expect(pool.queueLength).toBe(1);
    expect(pool.activeCount).toBe(1);

    // Worker finishes task 1
    workerMocks[0]._emitMessage({ data: "r1" });
    expect(await p1).toBe("r1");

    // Now task 2 should be dispatched on the freed worker
    expect(pool.queueLength).toBe(0);
    expect(pool.activeCount).toBe(1);
    expect(workerMocks[0].postMessage).toHaveBeenCalledTimes(2);

    workerMocks[0]._emitMessage({ data: "r2" });
    expect(await p2).toBe("r2");
    expect(pool.activeCount).toBe(0);

    pool.dispose();
  });

  it("should reject on worker error and replace the worker", async () => {
    const pool = new WorkerPool(2);

    const p1 = pool.exec<string>({
      script: "/workers/test.worker.js",
      data: { n: 1 },
    });

    // Worker errors
    workerMocks[0]._emitError("Something went wrong");

    await expect(p1).rejects.toThrow("Something went wrong");

    // The failed worker should be terminated
    expect(workerMocks[0].terminate).toHaveBeenCalled();

    pool.dispose();
  });

  it("should reject on worker result with error field", async () => {
    const pool = new WorkerPool(2);

    const p = pool.exec<string>({
      script: "/workers/test.worker.js",
      data: { n: 1 },
    });

    // Worker sends back an error result (worker does postMessage({error: ...}))
    // _emitMessage wraps this as MessageEvent.data, so pass what worker posts:
    workerMocks[0]._emitMessage({ error: "decode failed" });

    await expect(p).rejects.toThrow("decode failed");

    pool.dispose();
  });

  it("should dispose all workers and reject queued tasks", async () => {
    const pool = new WorkerPool(1);

    // Fill the worker
    const p1 = pool.exec<string>({
      script: "/workers/test.worker.js",
      data: { n: 1 },
    });

    // Queue two more
    const p2 = pool.exec<string>({
      script: "/workers/test.worker.js",
      data: { n: 2 },
    });
    const p3 = pool.exec<string>({
      script: "/workers/test.worker.js",
      data: { n: 3 },
    });

    expect(pool.queueLength).toBe(2);

    // Dispose — should terminate worker and reject queued
    pool.dispose();

    expect(workerMocks[0].terminate).toHaveBeenCalled();
    await expect(p2).rejects.toThrow("WorkerPool disposed");
    await expect(p3).rejects.toThrow("WorkerPool disposed");
  });

  it("should reject exec after dispose", async () => {
    const pool = new WorkerPool(1);
    pool.dispose();

    await expect(
      pool.exec({ script: "/w.js", data: {} }),
    ).rejects.toThrow("WorkerPool已disposed");
  });

  it("should respect concurrency: max poolSize active tasks", async () => {
    const pool = new WorkerPool(2);

    // Start 4 tasks with the SAME script — workers get reused
    const p0 = pool.exec({ script: "/w.js", data: { n: 0 } });
    const p1 = pool.exec({ script: "/w.js", data: { n: 1 } });
    const p2 = pool.exec({ script: "/w.js", data: { n: 2 } });
    const p3 = pool.exec({ script: "/w.js", data: { n: 3 } });

    // First 2 get workers immediately (poolSize=2, same script → reuse)
    expect(workerMocks.length).toBe(2);
    expect(pool.activeCount).toBe(2);
    expect(pool.queueLength).toBe(2);

    // Worker 0 finishes → queued task p2 dispatched on freed worker 0
    workerMocks[0]._emitMessage({ data: "r0" });
    await p0;
    expect(pool.queueLength).toBe(1); // p3 still queued
    expect(pool.activeCount).toBe(2); // worker 1 busy, worker 0 now handling p2

    // Worker 0 finishes p2 → p3 dispatched
    workerMocks[0]._emitMessage({ data: "r2" });
    await p2;
    expect(pool.queueLength).toBe(0);

    // Finish remaining
    workerMocks[1]._emitMessage({ data: "r1" });
    workerMocks[0]._emitMessage({ data: "r3" });
    await Promise.all([p1, p3]);

    // Only 2 workers were ever created (reuse, not new)
    expect(workerMocks.length).toBe(2);

    pool.dispose();
  });

  it("should handle result without explicit data wrapper", async () => {
    const pool = new WorkerPool(1);

    const p = pool.exec<number>({
      script: "/workers/test.worker.js",
      data: {},
    });

    // Worker sends raw value (not wrapped in {data: ...})
    workerMocks[0]._emitMessage({ data: 12345 });

    const result = await p;
    expect(result).toBe(12345);

    pool.dispose();
  });

  it("should default to 4 when navigator is not available", () => {
    vi.stubGlobal("navigator", undefined);
    const pool = new WorkerPool();
    // Without navigator, default cores=4 → poolSize = max(1, min(3, 8)) = 3
    expect(pool.poolSize).toBe(3);
    pool.dispose();
  });
});
