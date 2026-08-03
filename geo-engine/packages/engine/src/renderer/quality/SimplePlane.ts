// geo-engine/packages/engine/src/renderer/quality/SimplePlane.ts

import * as THREE from "three";
import type { CrsBounds, CrsCoord } from "../../core/types";
import type { IQualityTier } from "./IQualityTier";

/**
 * SimplePlane — 无细分平面几何体生成器
 *
 * 为每个 tile 创建平面几何体，所有顶点坐标相对于 tile.origin（局部坐标）。
 *
 * 两种路径：
 *   - 提供 reprojector（XYZ 瓦片）：用 4 个重投影角点构建四边形。
 *     瓦片投影到目标 CRS 后是弯曲四边形，其 AABB（getTileBounds 的包围盒）
 *     会侵入相邻瓦片区域（GK/UTM 下相邻 AABB 可重叠数公里），
 *     若直接用 AABB 画矩形，边界处会显示邻居瓦片的内容 → "湖/建筑"串扰。
 *     用角点四边形可保证相邻瓦片的共享边完全重合（同一投影曲线的同一条弦）。
 *   - 无 reprojector（ProjectTileScheme 矩形瓦片）：覆盖 AABB 的 PlaneGeometry。
 *
 * 更精细的重投影校正（消除内部弯曲畸变）由 SubdividedPlane 提供。
 */
export class SimplePlane implements IQualityTier {
  readonly type = "simple";

  /**
   * 创建 Tile 的平面几何体
   *
   * @param bounds — Tile 在 CRS 空间中的包围盒
   * @param origin — Tile 的局部原点（CRS 坐标）
   * @param reprojector — 可选重投影函数（归一化瓦片坐标 → CRS 坐标）。
   *   提供时用 4 角点重投影构建四边形，避免 AABB 侵入相邻瓦片。
   * @param bleedUV — 可选边缘出血（归一化 UV 单位）。>0 时矩形路径向四边各扩展该比例，
   *   且 **UV 同步外延到 [-b, 1+b]**（clampToEdge 把出血条带采样为边缘纹素）。
   *   注意：不能只扩位置不扩 UV——那会把整个纹理拉伸，内容错位。
   *   reprojector 路径（单四边形）不做出血：无法表达钳制条带且需扩展出 8 个顶点；
   *   demo 均用 SubdividedPlane，此为回退路径，无出血。
   */
  createGeometry(
    bounds: CrsBounds,
    origin: CrsCoord,
    reprojector?: (u: number, v: number) => { x: number; y: number },
    _level?: number,
    bleedUV?: number,
  ): THREE.BufferGeometry {
    if (reprojector) {
      // 4 个重投影角点（SW, SE, NE, NW），与 reprojector 的 (u,v) 约定一致
      const corners = [
        reprojector(0, 0),
        reprojector(1, 0),
        reprojector(1, 1),
        reprojector(0, 1),
      ];

      const positions = new Float32Array(4 * 3);
      for (let i = 0; i < 4; i++) {
        positions[i * 3] = corners[i].x - origin.x;
        positions[i * 3 + 1] = corners[i].y - origin.y;
        positions[i * 3 + 2] = 0;
      }

      // UV：与 SubdividedPlane 一致，v=0 南、v=1 北（纹理底部 = 南侧）
      const uvs = new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]);
      // 两个三角形，法线 +z（CCW，从 +z 俯视）
      const indices = new Uint32Array([0, 1, 2, 0, 2, 3]);

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));
      geometry.setIndex(new THREE.BufferAttribute(indices, 1));
      geometry.computeVertexNormals();
      return geometry;
    }

    const [xmin, ymin, xmax, ymax] = bounds;
    const b = Math.max(0, bleedUV ?? 0);
    const bx = b * (xmax - xmin);
    const by = b * (ymax - ymin);

    // 4 角点（SW, SE, NE, NW），位置扩展到出血边界，UV 同步外延到 [-b, 1+b]
    const positions = new Float32Array([
      xmin - bx - origin.x, ymin - by - origin.y, 0,
      xmax + bx - origin.x, ymin - by - origin.y, 0,
      xmax + bx - origin.x, ymax + by - origin.y, 0,
      xmin - bx - origin.x, ymax + by - origin.y, 0,
    ]);
    const uvs = new Float32Array([-b, -b, 1 + b, -b, 1 + b, 1 + b, -b, 1 + b]);
    const indices = new Uint32Array([0, 1, 2, 0, 2, 3]);

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));
    geometry.setIndex(new THREE.BufferAttribute(indices, 1));
    geometry.computeVertexNormals();
    return geometry;
  }
}
