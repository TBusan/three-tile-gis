// geo-engine/packages/engine/src/renderer/quality/DemMesh.ts

import * as THREE from "three";
import type { CrsBounds, CrsCoord } from "../../core/types";
import type { IQualityTier } from "./IQualityTier";

/**
 * DemMesh — 带高程的细分网格
 *
 * 与 SubdividedPlane 类似的 N×N 网格，但每个顶点的 Z 坐标
 * 通过 `getElevation(x, y)` 回调从 DEM 数据采样。
 *
 * 用法：
 *   const demMesh = new DemMesh((x, y) => demData.sample(x, y), 4);
 *   const geo = demMesh.createGeometry(tileBounds, tile.origin);
 */
export class DemMesh implements IQualityTier {
  readonly type = "dem-mesh";
  readonly gridSize: number;

  private readonly _getElevation: (x: number, y: number) => number;

  /**
   * @param getElevation — 给定 CRS 坐标 (x, y)，返回高程（米）
   * @param gridSize — 细分密度（2–16，默认 4）
   */
  constructor(
    getElevation: (x: number, y: number) => number,
    gridSize: number = 4,
  ) {
    this._getElevation = getElevation;
    this.gridSize = Math.max(2, Math.min(16, Math.floor(gridSize)));
  }

  createGeometry(bounds: CrsBounds, origin: CrsCoord): THREE.BufferGeometry {
    const N = this.gridSize;
    const [xmin, ymin, xmax, ymax] = bounds;
    const dx = (xmax - xmin) / N;
    const dy = (ymax - ymin) / N;

    const vertexCount = (N + 1) * (N + 1);
    const positions = new Float32Array(vertexCount * 3);
    const uvs = new Float32Array(vertexCount * 2);

    for (let row = 0; row <= N; row++) {
      for (let col = 0; col <= N; col++) {
        const idx = row * (N + 1) + col;
        const u = col / N;
        const v = row / N;

        const crsX = xmin + col * dx;
        const crsY = ymin + row * dy;
        const elevation = this._getElevation(crsX, crsY);

        positions[idx * 3] = crsX - origin.x;
        positions[idx * 3 + 1] = crsY - origin.y;
        positions[idx * 3 + 2] = isFinite(elevation) ? elevation - origin.z : 0;

        uvs[idx * 2] = u;
        uvs[idx * 2 + 1] = v;
      }
    }

    // Index buffer: N×N quads → 2N² triangles
    // 使用 Uint32Array 与 SubdividedPlane 保持一致，防止未来扩展时顶点数溢出
    const triCount = N * N * 2;
    const indices = new Uint32Array(triCount * 3);

    let i = 0;
    for (let row = 0; row < N; row++) {
      for (let col = 0; col < N; col++) {
        const topLeft = row * (N + 1) + col;
        const topRight = topLeft + 1;
        const bottomLeft = topLeft + (N + 1);
        const bottomRight = bottomLeft + 1;

        // Triangle 1 (CCW)
        indices[i++] = topLeft;
        indices[i++] = topRight;
        indices[i++] = bottomRight;

        // Triangle 2 (CCW)
        indices[i++] = topLeft;
        indices[i++] = bottomRight;
        indices[i++] = bottomLeft;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));
    geometry.setIndex(new THREE.BufferAttribute(indices, 1));
    geometry.computeVertexNormals();

    return geometry;
  }
}
