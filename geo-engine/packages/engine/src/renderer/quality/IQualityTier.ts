// geo-engine/packages/engine/src/renderer/quality/IQualityTier.ts

import type * as THREE from "three";
import type { CrsBounds, CrsCoord } from "../../core/types";

/**
 * 质量等级接口 — 几何体生成器
 *
 * 不同质量等级生成不同的 Three.js BufferGeometry：
 *   - SimplePlane:  4 顶点矩形（无细分）
 *   - SubdividedPlane: N×N 顶点网格（用于 GPU 重投影校正）
 *   - DemMesh:       顶点 z = DEM 高度（后续实现）
 *   - SkirtedMesh:   带裙边防 LOD 裂缝（后续实现）
 */
export interface IQualityTier {
  /** 质量等级标识 */
  readonly type: string;

  /**
   * 创建 Tile 的 Three.js 几何体
   *
   * @param bounds — Tile 在 CRS 空间中的包围盒
   * @param origin — Tile 的局部原点（CRS 坐标）
   * @returns BufferGeometry，所有顶点在局部坐标中
   */
  createGeometry(bounds: CrsBounds, origin: CrsCoord): THREE.BufferGeometry;
}
