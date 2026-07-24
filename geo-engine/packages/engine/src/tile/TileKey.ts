// geo-engine/packages/engine/src/tile/TileKey.ts

/**
 * Tile 键 — 唯一标识一个 Tile
 *
 * schemeId 绑定到具体的 TileScheme，id 是 scheme 内部的键。
 * 两个不同 Scheme 的 TileKey 总是不相等（即使 id 相同）。
 */
export type TileKey = {
  readonly schemeId: string;
  readonly id: string;
  readonly level: number;
};

/** 创建 TileKey 的便捷工厂 */
export function makeTileKey(
  schemeId: string,
  id: string,
  level: number,
): TileKey {
  return { schemeId, id, level };
}

/** 比较两个 TileKey 是否相等 */
export function tileKeyEquals(a: TileKey, b: TileKey): boolean {
  return a.schemeId === b.schemeId && a.id === b.id;
}

/** TileKey 的字符串表示（用于 Map key） */
export function tileKeyToString(key: TileKey): string {
  return `${key.schemeId}:${key.id}`;
}
