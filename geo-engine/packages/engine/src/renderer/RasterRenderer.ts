// geo-engine/packages/engine/src/renderer/RasterRenderer.ts

import * as THREE from "three";
import type { Tile } from "../tile/Tile";
import { TileContent, RenderObject } from "../tile/TileContent";
import type { ILayerRenderer } from "./ILayerRenderer";
import type { IQualityTier } from "./quality/IQualityTier";
import { SimplePlane } from "./quality/SimplePlane";
import { applyDepthBias } from "./depthBias";

/**
 * RasterRenderer 配置
 */
export interface RasterRendererOptions {
  name?: string;
  /** 几何体质量等级（默认 SimplePlane） */
  quality?: IQualityTier;
  /**
   * 多边形偏移 factor（默认 1）。
   * 底图保持默认稍向后推；叠加栅格层可设 0 置前，避免多图层 z-fighting。
   */
  polygonOffsetFactor?: number;
  /**
   * renderOrder 基准（默认 0）。每个瓦片 mesh.renderOrder = renderOrderBase + level。
   *
   * 共面（z=0 平面）下 LessEqualDepth 后画者胜，renderOrder 决定绘制顺序：
   *   栅格层内部：细(高 level)瓦片画在粗(低 level)瓦片之上 → 消除 LOD 叠瓦闪烁；
   *   跨层：多栅格图层按 zIndex 分层时把 base 设为 zIndex 对应的量级即可排序。
   * 对数深度下 glPolygonOffset 失效，renderOrder 是共面场景的主要深度分离手段。
   */
  renderOrderBase?: number;
  /**
   * 每级瓦片的深度偏移量（默认 0，米）。>0 时第 level 级瓦片获得 bias×level 的深度优势。
   *
   * 这是地形 LOD 的旋钮：父/子瓦片 DEM 精度不同 → 表面高度不同 → 不共面，
   * renderOrder 无法覆盖真实深度差，需要着色器深度偏移让细瓦片在接缝处必胜。
   * 平面（完全共面）场景不需要，保持 0。
   */
  depthBiasPerLevel?: number;
  /**
   * 瓦片边缘出血纹素数（默认 0 关闭；opt-in）。
   *
   * 相邻瓦片各自向四边扩展出血量会形成共面重叠 → 接缝处出现边缘纹素被拉伸
   * 复制的条带（影像不一致），并在自适应 near/far 变化时产生 z-fighting 闪烁，
   * 故默认关闭。需要时显式传入 >0 才启用。
   * 几何体向四边各扩展该纹素数对应的归一化比例，出血条带采样为边缘纹素
   * （SubdividedPlane UV 钳制 / SimplePlane UV 外延 + clampToEdge）。
   */
  tileBleedTexels?: number;
}

/**
 * 栅格渲染器 — 将 ImageBitmap 渲染为 Three.js 平面 Mesh
 *
 * 每个 tile 创建一个 PlaneGeometry + MeshBasicMaterial（纹理映射），
 * 几何体顶点在 tile.origin 的局部坐标中。
 *
 * 纹理方向约定：数据源（XYZTileSource / GeoTIFFSource）在解码时已用
 * imageOrientation:"flipY" 预翻转，位图第 0 行 = 南端；本渲染器设
 * texture.flipY=false 原样上传 → 位图第 0 行贴到网格 v=0（南）顶点。
 *
 * 用法：
 *   const renderer = new RasterRenderer({ name: "osm-renderer" });
 *   // 在 tileLoadFn 中：
 *   const content = await renderer.createContent(imageBitmap, tile);
 */
export class RasterRenderer implements ILayerRenderer<ImageBitmap> {
  readonly name: string;
  private readonly quality: IQualityTier;
  private readonly _polygonOffsetFactor: number;
  private readonly _renderOrderBase: number;
  private readonly _depthBiasPerLevel: number;
  private readonly _tileBleedTexels: number;

  /**
   * 共享几何缓存 — 无重投影瓦片（reprojector 为 null/undefined）的 BufferGeometry
   * 仅由「级别 + 出血 + 相对包围盒」决定（SimplePlane 位置 = bounds − origin，
   * ProjectTileScheme / 恒等 3857 瓦片在同级别下全同）。共享省每瓦片的
   * BufferGeometry 创建 + computeVertexNormals + GPU 上传。
   * 键含相对包围盒签名，任何 scheme 返回 null reprojector 时都安全。
   */
  private readonly _geomCache = new Map<string, THREE.BufferGeometry>();

  constructor(options: RasterRendererOptions = {}) {
    this.name = options.name ?? "raster-renderer";
    this.quality = options.quality ?? new SimplePlane();
    this._polygonOffsetFactor = options.polygonOffsetFactor ?? 1;
    this._renderOrderBase = options.renderOrderBase ?? 0;
    this._depthBiasPerLevel = options.depthBiasPerLevel ?? 0;
    this._tileBleedTexels = options.tileBleedTexels ?? 0;
  }

  async createContent(data: ImageBitmap, tile: Tile, layerId?: string): Promise<TileContent> {
    const content = new TileContent(
      `raster-${tile.key.id}`,
      tile.key,
      layerId ?? "raster-layer",
    );
    content.renderer = this;

    // 1. 从 ImageBitmap 创建 Three.js 纹理
    const texture = new THREE.Texture(data as unknown as TexImageSource);
    // 翻转约定：所有 ImageBitmap 源（XYZTileSource / GeoTIFFSource）解码时已用
    // imageOrientation:"flipY" 预翻转（位图第 0 行 = 南端）。这里必须 flipY=false
    // 原样上传：若仍为默认 true，WebGL UNPACK_FLIP_Y_WEBGL 对 ImageBitmap 在部分
    // 浏览器被忽略/生效不一致 → 瓦片垂直翻转（文字上下颠倒、南北相邻瓦片共享
    // 边界内容对不上）。flipY=false + 预翻转后上传始终原样，浏览器行为无关。
    texture.flipY = false;
    texture.needsUpdate = true;
    // 倾斜透视下远距瓦片缩小严重；mipmap 消除逐瓦片不同的缩小锯齿。
    // three-tile 正是注释掉 generateMipmaps=false / minFilter=LinearFilter 保持默认 mipmap 开启。
    const isPOT = (v: number) => v > 0 && (v & (v - 1)) === 0;
    texture.generateMipmaps = isPOT(data.width) && isPOT(data.height);
    texture.minFilter = texture.generateMipmaps
      ? THREE.LinearMipmapLinearFilter
      : THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter; // 放大仍双线性
    texture.colorSpace = THREE.SRGBColorSpace;

    // 2. 创建几何体（局部坐标）
    // XYZ 瓦片：tile.reprojector 提供逐顶点重投影（设计文档 §3.5）
    // Project 瓦片：reprojector 为 null/undefined，线性插值 bounds
    // 传入 tile.key.level 供自适应质量层按缩放级别选择网格密度（低 zoom 更细）
    // 边缘出血（默认 0 关闭）：>0 时向四边各扩展 tileBleedTexels 个纹素
    const bleedTexels = this._tileBleedTexels;
    const bleedUV =
      bleedTexels > 0 && data.width > 0
        ? bleedTexels / Math.max(data.width, data.height)
        : 0;

    // 无重投影瓦片几何共享：reprojector 为 null/undefined 时，SimplePlane 的位置
    // 只由 (bounds − origin, bleedUV) 决定（线性插值路径）。同级别 Project 瓦片 /
    // 恒等 3857 瓦片（XYZTileScheme 恒等短路返回 null）的相对包围盒全同 →
    // 共享同一 BufferGeometry，省每瓦片的几何创建 + computeVertexNormals + GPU 上传。
    // 键含相对包围盒签名：任意 scheme 返回 null reprojector 都安全，
    // 即使不同 scheme 同级别相对几何不同也不会误共享。
    // 共享几何由 RasterRenderer 统一持有，瓦片 dispose 时不再释放（见下方 disposeFn）。
    const shared = tile.reprojector == null;
    let geometry: THREE.BufferGeometry;
    if (shared) {
      const geomKey =
        `${this.quality.type}|${tile.key.level}|${bleedUV}|` +
        `${tile.bounds[0] - tile.origin.x},${tile.bounds[1] - tile.origin.y},` +
        `${tile.bounds[2] - tile.origin.x},${tile.bounds[3] - tile.origin.y}`;
      const cached = this._geomCache.get(geomKey);
      if (cached) {
        geometry = cached;
      } else {
        geometry = this.quality.createGeometry(
          tile.bounds,
          tile.origin,
          undefined,
          tile.key.level,
          bleedUV,
        );
        this._geomCache.set(geomKey, geometry);
      }
    } else {
      geometry = this.quality.createGeometry(
        tile.bounds,
        tile.origin,
        tile.reprojector,
        tile.key.level,
        bleedUV,
      );
    }

    // 3. 创建材质
    // polygonOffset 防止多图层叠加时 z-fighting：
    // 底图默认 factor=1 稍向后推，叠加层可配 factor=0 置前。
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      // 地图平面只从上方观察（maxPolarAngle < π/2），背面永不可见。
      // FrontSide 剔除背面，填充率减半（DoubleSide 会让背面与正面各着一次色）。
      side: THREE.FrontSide,
      polygonOffset: true,
      polygonOffsetFactor: this._polygonOffsetFactor,
      polygonOffsetUnits: 1,
    });

    // 地形 LOD：父/子瓦片不共面时给细瓦片深度优势（仅当 depthBiasPerLevel > 0）。
    if (this._depthBiasPerLevel > 0) {
      applyDepthBias(material, this._depthBiasPerLevel * tile.key.level);
    }

    // 4. 创建 Mesh
    const mesh = new THREE.Mesh(geometry, material);

    // renderOrder：共面（z=0 平面）下 LessEqualDepth 后画者胜，
    // 细(高 level)瓦片画在粗(低 level)之上 → 消除 LOD 叠瓦 z-fighting。
    mesh.renderOrder = this._renderOrderBase + tile.key.level;

    // 5. 包装 RenderObject
    const ro = new RenderObject(mesh, (obj: unknown) => {
      const m = obj as THREE.Mesh;
      // 共享几何由 _geomCache 统一持有，瓦片 dispose 时不能释放
      // （同一实例被多个 mesh 引用，释放一次会连坐其他瓦片）。
      if (!shared) m.geometry.dispose();
      if (Array.isArray(m.material)) {
        for (const mat of m.material) mat.dispose();
      } else {
        m.material.dispose();
      }
    });

    content.renderObjects.push(ro);
    content.data = data;
    content.state = "ready";

    return content;
  }

  disposeContent(content: TileContent): void {
    // 释放所有 renderObject 的纹理（在 RenderObject dispose 之前）
    for (const ro of content.renderObjects) {
      const mesh = ro.object as THREE.Mesh;
      if (!mesh?.material) continue;
      const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      for (const mat of materials) {
        if ("map" in mat && (mat as THREE.MeshBasicMaterial).map) {
          (mat as THREE.MeshBasicMaterial).map!.dispose();
        }
      }
    }
  }

  /** 释放渲染器持有的全部共享几何缓存（渲染器销毁时调用）。 */
  dispose(): void {
    for (const geom of this._geomCache.values()) {
      geom.dispose();
    }
    this._geomCache.clear();
  }
}
