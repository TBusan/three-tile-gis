// geo-engine/packages/engine/src/renderer/quality/SubdividedPlane.ts

import * as THREE from "three";
import type { CrsBounds, CrsCoord } from "../../core/types";
import type { IQualityTier } from "./IQualityTier";

/**
 * SubdividedPlane — N×N 细分网格用于 GPU 重投影校正
 *
 * 将 tile 细分为 gridSize×gridSize 个四边形（共 (gridSize+1)×(gridSize+1) 个顶点）。
 * GPU 在顶点之间线性插值纹理坐标，产生更精确的重投影结果。
 *
 * 自适应密度（设计文档 §3.5）：
 *   - zoom ≤ 4: gridSize = 8 (81 vertices)
 *   - zoom 5-8: gridSize = 6 (49 vertices)
 *   - zoom 9-12: gridSize = 4 (25 vertices)
 *   - zoom ≥ 13: gridSize = 2 (9 vertices)
 *
 * 顶点位置在 CRS 空间均匀分布，UV 坐标从 (0,0) 到 (1,1)。
 */
export class SubdividedPlane implements IQualityTier {
  readonly type = "subdivided";
  readonly gridSize: number;

  /**
   * @param gridSize — 每轴细分数量（2–16，默认 4）
   */
  constructor(gridSize: number = 4) {
    this.gridSize = Math.max(2, Math.min(16, Math.floor(gridSize)));
  }

  /**
   * 根据 zoom level 选择自适应 gridSize
   */
  static gridSizeForZoom(zoom: number): number {
    if (zoom <= 4) return 8;
    if (zoom <= 8) return 6;
    if (zoom <= 12) return 4;
    return 2;
  }

  /**
   * 创建细分平面几何体
   *
   * @param bounds — Tile 在 CRS 空间中的包围盒（用于计算现有顶点的局部坐标）
   * @param origin — Tile 的局部原点
   * @returns 索引化的 BufferGeometry，含 position 和 uv 属性
   */
  createGeometry(bounds: CrsBounds, origin: CrsCoord): THREE.BufferGeometry {
    const N = this.gridSize;
    const [xmin, ymin, xmax, ymax] = bounds;
    const dx = (xmax - xmin) / N;
    const dy = (ymax - ymin) / N;

    const vertexCount = (N + 1) * (N + 1);
    const positions = new Float32Array(vertexCount * 3);
    const uvs = new Float32Array(vertexCount * 2);

    // Generate vertices in row-major order
    for (let row = 0; row <= N; row++) {
      for (let col = 0; col <= N; col++) {
        const idx = row * (N + 1) + col;
        const u = col / N;
        const v = row / N;

        // CRS position (linear interpolation)
        const x = xmin + col * dx;
        const y = ymin + row * dy;

        // Local coordinates (relative to origin)
        positions[idx * 3] = x - origin.x;
        positions[idx * 3 + 1] = y - origin.y;
        positions[idx * 3 + 2] = 0;

        // UV coordinates (Three.js convention: origin at bottom-left)
        uvs[idx * 2] = u;
        uvs[idx * 2 + 1] = v;
      }
    }

    // Build index buffer: N×N quads → 2N² triangles
    const triCount = N * N * 2;
    const indices = new Uint16Array(triCount * 3);

    let i = 0;
    for (let row = 0; row < N; row++) {
      for (let col = 0; col < N; col++) {
        const topLeft = row * (N + 1) + col;
        const topRight = topLeft + 1;
        const bottomLeft = topLeft + (N + 1);
        const bottomRight = bottomLeft + 1;

        // Triangle 1: bottomLeft → bottomRight → topRight (CCW)
        indices[i++] = topLeft;
        indices[i++] = topRight;
        indices[i++] = bottomRight;

        // Triangle 2: bottomLeft → topRight → topLeft (CCW)
        indices[i++] = topLeft;
        indices[i++] = bottomRight;
        indices[i++] = bottomLeft;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3),
    );
    geometry.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));
    geometry.setIndex(new THREE.BufferAttribute(indices, 1));
    geometry.computeVertexNormals();

    return geometry;
  }
}
