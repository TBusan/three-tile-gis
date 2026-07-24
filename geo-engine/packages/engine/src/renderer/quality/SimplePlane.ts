// geo-engine/packages/engine/src/renderer/quality/SimplePlane.ts

import * as THREE from "three";
import type { CrsBounds, CrsCoord } from "../../core/types";
import type { IQualityTier } from "./IQualityTier";

/**
 * SimplePlane — 无细分平面几何体生成器
 *
 * 为每个 tile 创建覆盖其 CRS 包围盒的单个 PlaneGeometry，
 * 所有顶点坐标相对于 tile.origin（局部坐标）。
 *
 * 后续可升级为 SubdividedPlane（N×N 细分网格用于 GPU 重投影校正）。
 */
export class SimplePlane implements IQualityTier {
  readonly type = "simple";

  /**
   * 创建 Tile 的平面几何体
   */
  createGeometry(bounds: CrsBounds, origin: CrsCoord): THREE.BufferGeometry {
    const [xmin, ymin, xmax, ymax] = bounds;
    const width = xmax - xmin;
    const height = ymax - ymin;

    const geometry = new THREE.PlaneGeometry(width, height);

    // 平移到 tile 中心（局部坐标）
    const cx = (xmin + xmax) / 2 - origin.x;
    const cy = (ymin + ymax) / 2 - origin.y;
    geometry.translate(cx, cy, 0);

    return geometry;
  }
}
