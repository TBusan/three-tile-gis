// geo-engine/packages/engine/src/core/types.ts

/** CRS 空间中的点坐标（米） */
export interface CrsCoord {
  x: number; // 东向
  y: number; // 北向
  z: number; // 高程
}

/** CRS 空间包围盒 [xmin, ymin, xmax, ymax] */
export type CrsBounds = [number, number, number, number];
