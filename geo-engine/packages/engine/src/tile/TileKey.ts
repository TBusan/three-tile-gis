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

/** 比较两个 TileKey 是否相等（schemeId + id + level 全同才算同一瓦片） */
export function tileKeyEquals(a: TileKey, b: TileKey): boolean {
  return a.schemeId === b.schemeId && a.id === b.id && a.level === b.level;
}

/**
 * TileKey 的字符串表示（用于 Map key）
 *
 * 必须含 level：ProjectTileScheme 的 id 为 "col-row"（不含级别），
 * 不同级别同 (col,row) 的瓦片地理范围不同（级别每 +1 瓦片尺寸加倍）。
 * 若不含 level，跨级别瓦片在 _loadedTiles / cache / _loading 中碰撞成同一键
 * → 缩放换级时命中错误瓦片（内容错乱或区域空白）。
 */
export function tileKeyToString(key: TileKey): string {
  return `${key.schemeId}:${key.id}@${key.level}`;
}
