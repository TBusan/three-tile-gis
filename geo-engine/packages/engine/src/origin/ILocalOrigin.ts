// geo-engine/packages/engine/src/origin/ILocalOrigin.ts

import type { CrsCoord } from "../core/types";

/**
 * Local Origin — 将 CRS 世界坐标转换为 tile 局部坐标
 *
 * 每个 Tile 拥有一个 Local Origin。Geometry 顶点存储
 * worldCoord - localOrigin 的差值，确保 GPU float32 精度。
 */
export interface ILocalOrigin {
  /** 将世界坐标取整对齐到 tileSize 的整数倍 */
  snap(world: CrsCoord, tileSize: number): CrsCoord;

  /** 世界坐标 → 局部坐标（减原点） */
  worldToLocal(world: CrsCoord, origin: CrsCoord): CrsCoord;

  /** 局部坐标 → 世界坐标（加原点） */
  localToWorld(local: CrsCoord, origin: CrsCoord): CrsCoord;
}

/** 默认 Local Origin 实现 */
export const DefaultLocalOrigin: ILocalOrigin = {
  snap(world: CrsCoord, tileSize: number): CrsCoord {
    return {
      x: Math.floor(world.x / tileSize) * tileSize,
      y: Math.floor(world.y / tileSize) * tileSize,
      z: 0,
    };
  },

  worldToLocal(world: CrsCoord, origin: CrsCoord): CrsCoord {
    return {
      x: world.x - origin.x,
      y: world.y - origin.y,
      z: world.z - origin.z,
    };
  },

  localToWorld(local: CrsCoord, origin: CrsCoord): CrsCoord {
    return {
      x: local.x + origin.x,
      y: local.y + origin.y,
      z: local.z + origin.z,
    };
  },
};
