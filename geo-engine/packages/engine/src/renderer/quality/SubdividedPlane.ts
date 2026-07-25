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
 * 自适应密度（设计文档 §3.5）：构造时传入 adaptive=true 后，
 * createGeometry 会根据瓦片 zoom 级别（level 参数）自动选择网格密度：
 * level 越小（视野越大、瓦片越大）→ 投影弯曲越剧烈 → 需更细的网格
 * 以消除低缩放级别下的横向条纹/擕裂伪影。
 *
 * 顶点位置在 CRS 空间均匀分布，UV 坐标从 (0,0) 到 (1,1)。
 */
export class SubdividedPlane implements IQualityTier {
  readonly type = "subdivided";
  readonly gridSize: number;
  /** 是否根据 zoom 级别自适应选择网格密度 */
  private readonly adaptive: boolean;

  /**
   * @param gridSize — 每轴细分数量（2–64，默认 4）。自适应模式下作为无 level 时的回退值。
   * @param adaptive — 是否启用自适应细分（默认 false）。启用后根据 createGeometry 的 level 参数选择密度。
   */
  constructor(gridSize: number = 4, adaptive: boolean = false) {
    this.gridSize = Math.max(2, Math.min(64, Math.floor(gridSize)));
    this.adaptive = adaptive;
  }

  /**
   * 根据 zoom level 选择自适应 gridSize
   *
   * 低 zoom（全球/大区域视图）下，单个 XYZ 瓦片投影到局部 CRS（如高斯-克吕格）后
   * 弯曲极其剧烈，需要很细的网格才能平滑跟随投影曲线、消除横向条纹。
   * 高 zoom（近距离视图）下瓦片小、投影近似线性，稀疏网格即可。
   */
  static gridSizeForZoom(zoom: number): number {
    if (zoom <= 1) return 48; // 全球视图：投影畸变极端
    if (zoom <= 3) return 32;
    if (zoom <= 5) return 16;
    if (zoom <= 8) return 8;
    if (zoom <= 11) return 4;
    return 2;
  }

  /**
   * 创建细分平面几何体
   *
   * @param bounds — Tile 在 CRS 空间中的包围盒（用于计算现有顶点的局部坐标）
   * @param origin — Tile 的局部原点
   * @param reprojector — 可选重投影函数（设计文档 §3.5）。
   *   提供时，每个网格顶点通过 (u,v) → 3857 → lon/lat → CRS 精确计算位置，
   *   使几何体跟随投影后的弯曲边界，GPU 在顶点间插值纹理，消除扭曲。
   *   不提供时，顶点在 bounds 内线性插值（适用于 ProjectTileScheme 矩形瓦片）。
   * @param level — 可选瓦片缩放级别。自适应模式（adaptive=true）下据此选择网格密度。
   * @returns 索引化的 BufferGeometry，含 position 和 uv 属性
   */
  createGeometry(
    bounds: CrsBounds,
    origin: CrsCoord,
    reprojector?: (u: number, v: number) => { x: number; y: number },
    level?: number,
  ): THREE.BufferGeometry {
    // 自适应模式：根据 zoom 级别选择网格密度；否则用构造时的固定 gridSize。
    const N =
      this.adaptive && level != null
        ? SubdividedPlane.gridSizeForZoom(level)
        : this.gridSize;
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

        let crsX: number;
        let crsY: number;

        if (reprojector) {
          // 逐顶点重投影：归一化坐标 → CRS 精确位置
          const pt = reprojector(u, v);
          crsX = pt.x;
          crsY = pt.y;
        } else {
          // 线性插值（CRS 矩形瓦片）
          crsX = xmin + col * dx;
          crsY = ymin + row * dy;
        }

        // Local coordinates (relative to origin)
        positions[idx * 3] = crsX - origin.x;
        positions[idx * 3 + 1] = crsY - origin.y;
        positions[idx * 3 + 2] = 0;

        // UV coordinates (Three.js convention: origin at bottom-left)
        // v=0 对应瓦片南边界（纹理底部），v=1 对应北边界（纹理顶部）
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
