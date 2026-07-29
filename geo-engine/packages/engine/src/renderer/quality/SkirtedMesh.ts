// geo-engine/packages/engine/src/renderer/quality/SkirtedMesh.ts

import * as THREE from "three";
import type { CrsBounds, CrsCoord } from "../../core/types";
import type { IQualityTier } from "./IQualityTier";

/**
 * SkirtedMesh — 带裙边的细分高程网格
 *
 * 在 DemMesh 的基础上，沿 tile 四周边界向下延伸裙边，
 * 填充相邻 LOD 层级之间的裂缝。
 *
 * 裙边高度应设置为相邻两个 LOD 层之间的最大可能高程差。
 *
 * 用法：
 *   const skirted = new SkirtedMesh((x, y) => dem.sample(x, y), 4, 50);
 */
export class SkirtedMesh implements IQualityTier {
  readonly type = "skirted-mesh";
  readonly gridSize: number;

  private readonly _getElevation: (x: number, y: number) => number;
  private readonly _skirtHeight: number;

  /**
   * @param getElevation — 高程采样回调（CRS 坐标 → 米）
   * @param gridSize — 细分密度（2–16，默认 4）
   * @param skirtHeight — 裙边深度（米，默认 100）
   */
  constructor(
    getElevation: (x: number, y: number) => number,
    gridSize: number = 4,
    skirtHeight: number = 100,
  ) {
    this._getElevation = getElevation;
    this.gridSize = Math.max(2, Math.min(16, Math.floor(gridSize)));
    this._skirtHeight = skirtHeight;
  }

  createGeometry(bounds: CrsBounds, origin: CrsCoord): THREE.BufferGeometry {
    const N = this.gridSize;
    const [xmin, ymin, xmax, ymax] = bounds;
    const dx = (xmax - xmin) / N;
    const dy = (ymax - ymin) / N;

    // --- Step 1: Compute terrain vertex positions and elevations ---
    const gridVerts = (N + 1) * (N + 1);
    const skirtVertsPerSide = N + 1;
    const skirtVertexCount = 4 * skirtVertsPerSide;
    const totalVertices = gridVerts + skirtVertexCount;

    const positions = new Float32Array(totalVertices * 3);
    const uvs = new Float32Array(totalVertices * 2);

    // Fill terrain grid vertices (indices 0 .. gridVerts-1)
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

    // --- Step 2: Fill skirt bottom vertices ---
    // Order: bottom edge (row=0, left→right) → right edge (col=N, bottom→top)
    //        → top edge (row=N, right→left) → left edge (col=0, top→bottom)
    const edgeDefs: Array<{
      startCol: number;
      endCol: number;
      startRow: number;
      endRow: number;
      stepCol: number;
      stepRow: number;
    }> = [
      { startCol: 0, endCol: N, stepCol: 1, startRow: 0, endRow: 0, stepRow: 0 },   // bottom
      { startCol: N, endCol: N, stepCol: 0, startRow: 0, endRow: N, stepRow: 1 },   // right
      { startCol: N, endCol: 0, stepCol: -1, startRow: N, endRow: N, stepRow: 0 },  // top
      { startCol: 0, endCol: 0, stepCol: 0, startRow: N, endRow: 0, stepRow: -1 },  // left
    ];

    let skirtIdx = gridVerts;
    for (const edge of edgeDefs) {
      const steps = N; // N segments → N+1 vertices per edge
      for (let s = 0; s <= steps; s++) {
        const col = edge.startCol + s * edge.stepCol;
        const row = edge.startRow + s * edge.stepRow;
        const gridIdx = row * (N + 1) + col;

        // Copy XY from grid vertex
        positions[skirtIdx * 3] = positions[gridIdx * 3];
        positions[skirtIdx * 3 + 1] = positions[gridIdx * 3 + 1];
        // Z = terrain Z - skirtHeight
        positions[skirtIdx * 3 + 2] = positions[gridIdx * 3 + 2] - this._skirtHeight;

        // Skirt UVs aren't meaningful, set to 0
        uvs[skirtIdx * 2] = 0;
        uvs[skirtIdx * 2 + 1] = 0;

        skirtIdx++;
      }
    }

    // --- Step 3: Build index buffer ---
    // Terrain triangles: N×N quads → 2N² triangles (same as DemMesh)
    const terrainTriCount = N * N * 2;
    const skirtTriCount = 4 * N * 2; // 4 edges × N segments × 2 triangles
    const totalTriCount = terrainTriCount + skirtTriCount;
    // 使用 Uint32Array 与 SubdividedPlane/DemMesh 保持一致，防止顶点数溢出
    const indices = new Uint32Array(totalTriCount * 3);

    let i = 0;

    // Terrain indices
    for (let row = 0; row < N; row++) {
      for (let col = 0; col < N; col++) {
        const topLeft = row * (N + 1) + col;
        const topRight = topLeft + 1;
        const bottomLeft = topLeft + (N + 1);
        const bottomRight = bottomLeft + 1;

        indices[i++] = topLeft;
        indices[i++] = topRight;
        indices[i++] = bottomRight;
        indices[i++] = topLeft;
        indices[i++] = bottomRight;
        indices[i++] = bottomLeft;
      }
    }

    // Skirt indices — connect grid perimeter vertices to skirt-bottom vertices
    // Edge 0 (bottom, row=0): grid cols 0→N, step +1
    // Edge 1 (right, col=N): grid rows 0→N, step +(N+1)
    // Edge 2 (top, row=N): grid cols N→0, step -1
    // Edge 3 (left, col=0): grid rows N→0, step -(N+1)
    const edgeGridStarts = [
      0,                          // bottom: (row=0, col=0)
      N,                          // right:  (row=0, col=N)
      N * (N + 1) + N,           // top:    (row=N, col=N)
      N * (N + 1),               // left:   (row=N, col=0)
    ];
    const edgeGridDeltas = [1, N + 1, -1, -(N + 1)];
    i = terrainTriCount * 3;

    for (let e = 0; e < 4; e++) {
      const baseIdx = gridVerts + e * skirtVertsPerSide;
      const gridStart = edgeGridStarts[e];
      const gridDelta = edgeGridDeltas[e];

      for (let s = 0; s < N; s++) {
        const gA = gridStart + s * gridDelta;        // grid vertex at segment start
        const gB = gridStart + (s + 1) * gridDelta;   // grid vertex at segment end
        const bA = baseIdx + s;                       // skirt bottom at segment start
        const bB = baseIdx + s + 1;                   // skirt bottom at segment end

        // Quad: gA → gB → bB → bA → gA
        // Triangle 1: gA → gB → bB (CCW looking from outside)
        indices[i++] = gA;
        indices[i++] = gB;
        indices[i++] = bB;

        // Triangle 2: gA → bB → bA
        indices[i++] = gA;
        indices[i++] = bB;
        indices[i++] = bA;
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
