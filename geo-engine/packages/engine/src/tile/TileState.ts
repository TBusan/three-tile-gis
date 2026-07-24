// geo-engine/packages/engine/src/tile/TileState.ts

/**
 * Tile 生命周期状态机：
 *
 *   unloaded → loading → loaded → visible
 *                 ↓         ↓
 *               failed    unloaded (LRU 淘汰后)
 */
export const TileState = {
  Unloaded: "unloaded",
  Loading: "loading",
  Loaded: "loaded",
  Visible: "visible",
  Failed: "failed",
} as const;

export type TileState = (typeof TileState)[keyof typeof TileState];

/**
 * TileContent 状态机：
 *
 *   pending → creating → ready
 *                ↓
 *              failed
 */
export const ContentState = {
  Pending: "pending",
  Creating: "creating",
  Ready: "ready",
  Failed: "failed",
} as const;

export type ContentState = (typeof ContentState)[keyof typeof ContentState];
