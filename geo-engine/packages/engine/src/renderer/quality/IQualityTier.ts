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
   * @param reprojector — 可选重投影函数（归一化瓦片坐标 → CRS 坐标）。
   *   XYZ 瓦片投影到目标 CRS 后是弯曲四边形，提供此函数时
   *   应逐顶点计算精确位置（设计文档 §3.5）；不提供时线性插值 bounds。
   * @param level — 可选瓦片缩放级别（XYZ zoom）。供自适应细分的质量层
   *   根据级别选择网格密度：level 越小（视野越大）→ 投影弯曲越剧烈 → 需更细网格。
   * @returns BufferGeometry，所有顶点在局部坐标中
   */
  createGeometry(
    bounds: CrsBounds,
    origin: CrsCoord,
    reprojector?: (u: number, v: number) => { x: number; y: number },
    level?: number,
  ): THREE.BufferGeometry;
}
