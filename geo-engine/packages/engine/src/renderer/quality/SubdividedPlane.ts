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
   * @param bleedUV — 可选边缘出血（归一化 UV 单位）。>0 时每轴取值扩展为
   *   `[-b, 0, 1/N, …, 1, 1+b]`，位置用 reprojector 正确外延（3857 恒等 / CRS 曲线），
   *   出血条带 UV 钳制在 [0,1]（clampToEdge 采样边缘纹素）。消除相邻瓦片子像素接缝。
   * @returns 索引化的 BufferGeometry，含 position 和 uv 属性
   */
  createGeometry(
    bounds: CrsBounds,
    origin: CrsCoord,
    reprojector?: (u: number, v: number) => { x: number; y: number },
    level?: number,
    bleedUV?: number,
  ): THREE.BufferGeometry {
    // 自适应模式：根据 zoom 级别选择网格密度；否则用构造时的固定 gridSize。
    const N =
      this.adaptive && level != null
        ? SubdividedPlane.gridSizeForZoom(level)
        : this.gridSize;
    const [xmin, ymin, xmax, ymax] = bounds;
    const dx = (xmax - xmin) / N;
    const dy = (ymax - ymin) / N;

    // 边缘出血：每轴取值 [-b, 0, 1/N, …, 1, 1+b]（N+3 个），UV 钳制在 [0,1]
    const b = Math.max(0, bleedUV ?? 0);
    const axis: number[] = [];
    if (b > 0) axis.push(-b);
    for (let i = 0; i <= N; i++) axis.push(i / N);
    if (b > 0) axis.push(1 + b);
    const gridW = axis.length;
    const clamp01 = (t: number) => Math.min(1, Math.max(0, t));

    const vertexCount = gridW * gridW;
    const positions = new Float32Array(vertexCount * 3);
    const uvs = new Float32Array(vertexCount * 2);

    // Generate vertices in row-major order
    for (let row = 0; row < gridW; row++) {
      for (let col = 0; col < gridW; col++) {
        const idx = row * gridW + col;
        const u = axis[col];
        const v = axis[row];

        let crsX: number;
        let crsY: number;

        if (reprojector) {
          // 逐顶点重投影：归一化坐标 → CRS 精确位置（出血顶点同路径外延）
          const pt = reprojector(u, v);
          crsX = pt.x;
          crsY = pt.y;
        } else {
          // 线性插值（CRS 矩形瓦片）
          crsX = xmin + u * (xmax - xmin);
          crsY = ymin + v * (ymax - ymin);
        }

        // Local coordinates (relative to origin)
        positions[idx * 3] = crsX - origin.x;
        positions[idx * 3 + 1] = crsY - origin.y;
        positions[idx * 3 + 2] = 0;

        // UV coordinates (Three.js convention: origin at bottom-left)
        // v=0 对应瓦片南边界（纹理底部），v=1 对应北边界（纹理顶部）
        // 出血条带 UV 钳制在 [0,1]，clampToEdge 采样为边缘纹素
        uvs[idx * 2] = clamp01(u);
        uvs[idx * 2 + 1] = clamp01(v);
      }
    }

    // Build index buffer: (gridW-1)×(gridW-1) quads → 2×(gridW-1)² triangles
    // 使用 Uint32Array 而非 Uint16Array：
    // 当前 gridSize 上限 64 时顶点数 4225 未超 Uint16 范围，
    // 但 Uint32 防止未来扩展或外部调用时溢出，且现代 GPU 均支持 OES_element_index_uint。
    const seg = gridW - 1;
    const triCount = seg * seg * 2;
    const indices = new Uint32Array(triCount * 3);

    let i = 0;
    for (let row = 0; row < seg; row++) {
      for (let col = 0; col < seg; col++) {
        // 命名按纹理行（v 方向）：row 增大 → v/y 增大（向北）。
        const topLeft = row * gridW + col;
        const topRight = topLeft + 1;
        const bottomLeft = topLeft + gridW;
        const bottomRight = bottomLeft + 1;

        // 两个三角形均为 XY 平面内 CCW 绕序（从 +Z 俯视），
        // 配合 FrontSide 材质正确剔除背面。
        // Triangle 1: topLeft → topRight → bottomRight (CCW)
        indices[i++] = topLeft;
        indices[i++] = topRight;
        indices[i++] = bottomRight;

        // Triangle 2: topLeft → bottomRight → bottomLeft (CCW)
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
