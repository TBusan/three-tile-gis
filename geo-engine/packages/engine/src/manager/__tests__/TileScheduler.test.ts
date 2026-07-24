// geo-engine/packages/engine/src/manager/__tests__/TileScheduler.test.ts
import { describe, it, expect, vi } from "vitest";
import { TileScheduler, type LoadRequest } from "../TileScheduler";
import { makeTileKey } from "../../tile/TileKey";

function makeReq(
  id: string,
  dist: number,
  area: number,
  inFrustum = true,
): LoadRequest {
  return {
    tileKey: makeTileKey("proj", id, 0),
    layerIds: ["L1"],
    distanceToCamera: dist,
    screenArea: area,
    inFrustum,
  };
}

describe("TileScheduler", () => {
  it("should sort by priority (in-frustum and close wins)", () => {
    const s = new TileScheduler();
    const reqs = [
      makeReq("far", 10000, 0.3, true),
      makeReq("near", 100, 0.3, true),
      makeReq("out", 100, 0.3, false), // same area, penalized by frustum
    ];

    const sorted = s.schedule(reqs);
    // Near wins (closest, in frustum)
    expect(sorted[0].tileKey.id).toBe("near");
    // Out last (penalized by frustum)
    expect(sorted[2].tileKey.id).toBe("out");
  });

  it("should respect maxPerFrame", () => {
    const s = new TileScheduler();
    s.maxPerFrame = 2;
    s.schedule([
      makeReq("a", 100, 0.5),
      makeReq("b", 200, 0.5),
      makeReq("c", 300, 0.5),
    ]);

    const batch = s.takeNext();
    expect(batch).toHaveLength(2);
    expect(s.queueLength).toBe(1);
  });

  it("should deduplicate requests", () => {
    const s = new TileScheduler();
    const key = makeTileKey("proj", "dup", 0);
    const r1: LoadRequest = {
      tileKey: key,
      layerIds: ["L1"],
      distanceToCamera: 100,
      screenArea: 0.5,
      inFrustum: true,
    };
    const r2: LoadRequest = { ...r1, layerIds: ["L2"] };

    const sorted = s.schedule([r1, r2]);
    expect(sorted).toHaveLength(1); // deduped by tile key
  });

  it("should track loading and loaded tiles", () => {
    const s = new TileScheduler();
    const key = makeTileKey("proj", "0-0", 0);

    const controller = new AbortController();
    s.startLoading(key, controller);
    expect(s.loadingCount).toBe(1);

    s.markLoaded(key);
    expect(s.loadingCount).toBe(0);
  });

  it("should abort a loading tile", () => {
    const s = new TileScheduler();
    const key = makeTileKey("proj", "abort-me", 0);
    const controller = new AbortController();
    const abortSpy = vi.spyOn(controller, "abort");

    s.startLoading(key, controller);
    expect(s.loadingCount).toBe(1);

    s.abort(key);
    expect(abortSpy).toHaveBeenCalledOnce();
    expect(s.loadingCount).toBe(0);
  });

  it("should mark failed and remove from loading", () => {
    const s = new TileScheduler();
    const key = makeTileKey("proj", "fail", 0);
    const controller = new AbortController();

    s.startLoading(key, controller);
    expect(s.loadingCount).toBe(1);

    s.markFailed(key);
    expect(s.loadingCount).toBe(0);
  });

  it("should abort all loading tiles", () => {
    const s = new TileScheduler();
    const c1 = new AbortController();
    const c2 = new AbortController();
    const spy1 = vi.spyOn(c1, "abort");
    const spy2 = vi.spyOn(c2, "abort");

    s.startLoading(makeTileKey("proj", "a", 0), c1);
    s.startLoading(makeTileKey("proj", "b", 0), c2);
    expect(s.loadingCount).toBe(2);

    s.abortAll();
    expect(spy1).toHaveBeenCalledOnce();
    expect(spy2).toHaveBeenCalledOnce();
    expect(s.loadingCount).toBe(0);
    expect(s.queueLength).toBe(0);
  });
});
