// geo-engine/packages/engine/src/renderer/VectorRenderer.ts

import * as THREE from "three";
import type { Tile } from "../tile/Tile";
import { TileContent, RenderObject } from "../tile/TileContent";
import type { ILayerRenderer } from "./ILayerRenderer";
import type { IMaterialFactory } from "./IMaterialFactory";
import { applyDepthBias } from "./depthBias";
import type { GeoFeature } from "../source/GeoJSONSource";

/**
 * VectorRenderer 构造选项
 */
export interface VectorRendererOptions {
  /** 渲染顺序（默认 1000，画在所有栅格层 renderOrder=base+level 之后） */
  renderOrder?: number;
  /**
   * 片元深度偏移（默认 0.5 米）。越大越抗 DEM 插值误差（地形鲁棒），
   * 但陡峭地形上越易穿透高出矢量不足该值的岩坎；平面场景可设 0
   * （renderOrder 已保证后画者胜）。只改深度测试值，不改变渲染位置。
   */
  depthBias?: number;
}

/**
 * 矢量渲染器 — 将 GeoFeature[] 转换为 Three.js 渲染对象
 *
 * 每种几何类型生成对应的 Three.js 对象：
 *   Point / MultiPoint   → THREE.Points
 *   LineString / MultiLineString → THREE.Line
 *   Polygon / MultiPolygon → THREE.Mesh (ShapeGeometry，earcut 三角剖分)
 *
 * 所有顶点坐标相对于 tile.origin（局部坐标），解决 GPU 精度问题。
 *
 * 用法：
 *   const factory = new DefaultMaterialFactory();
 *   const renderer = new VectorRenderer(factory);
 *   const content = await renderer.createContent(features, tile);
 */
export class VectorRenderer implements ILayerRenderer<GeoFeature[]> {
  readonly name: string;
  private readonly _materialFactory: IMaterialFactory;
  private readonly _renderOrder: number;
  private readonly _depthBias: number;

  constructor(
    materialFactory: IMaterialFactory,
    name = "vector-renderer",
    options: VectorRendererOptions = {},
  ) {
    this._materialFactory = materialFactory;
    this.name = name;
    this._renderOrder = options.renderOrder ?? 1000;
    this._depthBias = options.depthBias ?? 0.5;
  }

  async createContent(
    features: GeoFeature[],
    tile: Tile,
    layerId?: string,
  ): Promise<TileContent> {
    const content = new TileContent(
      `vector-${tile.key.id}`,
      tile.key,
      layerId ?? "vector-layer",
    );
    content.renderer = this;

    const ox = tile.origin.x;
    const oy = tile.origin.y;

    for (const f of features) {
      const obj = this._createObject(f, ox, oy);
      if (!obj) continue;

      this._applyRenderOrderAndDepthBias(obj);
      const ro = new RenderObject(obj, (o: unknown) => {
        this._disposeGeometry(o);
      });
      content.renderObjects.push(ro);
    }

    content.data = features;
    content.state = "ready";
    return content;
  }

  disposeContent(content: TileContent): void {
    for (const ro of content.renderObjects) {
      if (!ro.disposed) ro.dispose();
    }
  }

  // ---- private ----

  /**
   * 为对象（及嵌套叶子）设置 renderOrder 并注入深度偏移。
   *
   * three.js 渲染列表只收集叶子对象（Points/Line/Mesh），Multi* 包装在 Group 里，
   * 故用 traverse 遍历全部叶子统一设置，避免顶层 Group 与叶子对象排序键不一致。
   *
   * 材质是共享的（DefaultMaterialFactory 三材质在所有瓦片间共用），applyDepthBias
   * 幂等：首次注入着色器，后续调用为 no-op，多个瓦片共用同一材质互不干扰。
   */
  private _applyRenderOrderAndDepthBias(obj: THREE.Object3D): void {
    obj.traverse((child) => {
      if (
        child instanceof THREE.Mesh ||
        child instanceof THREE.Line ||
        child instanceof THREE.Points
      ) {
        child.renderOrder = this._renderOrder;
        const mats = Array.isArray(child.material)
          ? child.material
          : [child.material];
        for (const mat of mats) {
          applyDepthBias(mat, this._depthBias);
        }
      }
    });
  }

  private _createObject(
    f: GeoFeature,
    ox: number,
    oy: number,
  ): THREE.Object3D | null {
    switch (f.type) {
      case "Point":
        return this._createPoint(
          f.coordinates,
          ox,
          oy,
          this._materialFactory.createPointMaterial(f),
        );
      case "MultiPoint":
        return this._createMultiPoint(
          f.coordinates,
          ox,
          oy,
          this._materialFactory.createPointMaterial(f),
        );
      case "LineString":
        return this._createLine(
          f.coordinates,
          ox,
          oy,
          this._materialFactory.createLineMaterial(f),
        );
      case "MultiLineString":
        return this._createMultiLine(
          f.coordinates,
          ox,
          oy,
          this._materialFactory.createLineMaterial(f),
        );
      case "Polygon":
        return this._createPolygon(
          f.coordinates,
          ox,
          oy,
          this._materialFactory.createFillMaterial(f),
        );
      case "MultiPolygon":
        return this._createMultiPolygon(
          f.coordinates,
          ox,
          oy,
          this._materialFactory.createFillMaterial(f),
        );
      default:
        return null;
    }
  }

  /** 将 CRS 坐标转为局部坐标 */
  private _toLocal(
    pt: number[],
    ox: number,
    oy: number,
  ): [number, number, number] {
    return [pt[0] - ox, pt[1] - oy, 0];
  }

  // -- Point --

  private _createPoint(
    coords: number[],
    ox: number,
    oy: number,
    mat: THREE.Material,
  ): THREE.Points {
    const [x, y, z] = this._toLocal(coords, ox, oy);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute([x, y, z], 3));
    return new THREE.Points(geo, mat as THREE.PointsMaterial);
  }

  private _createMultiPoint(
    coords: number[][],
    ox: number,
    oy: number,
    mat: THREE.Material,
  ): THREE.Points {
    const positions: number[] = [];
    for (const pt of coords) {
      const [x, y, z] = this._toLocal(pt, ox, oy);
      positions.push(x, y, z);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3),
    );
    return new THREE.Points(geo, mat as THREE.PointsMaterial);
  }

  // -- LineString --

  private _createLine(
    coords: number[][],
    ox: number,
    oy: number,
    mat: THREE.Material,
  ): THREE.Line {
    const positions: number[] = [];
    for (const pt of coords) {
      const [x, y, z] = this._toLocal(pt, ox, oy);
      positions.push(x, y, z);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3),
    );
    return new THREE.Line(geo, mat as THREE.LineBasicMaterial);
  }

  private _createMultiLine(
    coords: number[][][],
    ox: number,
    oy: number,
    mat: THREE.Material,
  ): THREE.Group {
    const group = new THREE.Group();
    for (const line of coords) {
      const lineObj = this._createLine(line, ox, oy, mat);
      group.add(lineObj);
    }
    return group;
  }

  // -- Polygon --

  private _createPolygon(
    coords: number[][][],
    ox: number,
    oy: number,
    mat: THREE.Material,
  ): THREE.Mesh {
    const shape = this._ringToShape(coords[0], ox, oy);

    // 内环 → holes
    for (let i = 1; i < coords.length; i++) {
      shape.holes.push(this._ringToPath(coords[i], ox, oy));
    }

    const geo = new THREE.ShapeGeometry(shape);
    return new THREE.Mesh(geo, mat);
  }

  private _createMultiPolygon(
    coords: number[][][][],
    ox: number,
    oy: number,
    mat: THREE.Material,
  ): THREE.Group {
    const group = new THREE.Group();
    for (const poly of coords) {
      const mesh = this._createPolygon(poly, ox, oy, mat);
      group.add(mesh);
    }
    return group;
  }

  private _ringToShape(
    ring: number[][],
    ox: number,
    oy: number,
  ): THREE.Shape {
    const shape = new THREE.Shape();
    const [sx, sy] = this._toLocal(ring[0], ox, oy);
    shape.moveTo(sx, sy);
    for (let i = 1; i < ring.length; i++) {
      const [x, y] = this._toLocal(ring[i], ox, oy);
      shape.lineTo(x, y);
    }
    shape.closePath();
    return shape;
  }

  private _ringToPath(
    ring: number[][],
    ox: number,
    oy: number,
  ): THREE.Path {
    const path = new THREE.Path();
    const [sx, sy] = this._toLocal(ring[0], ox, oy);
    path.moveTo(sx, sy);
    for (let i = 1; i < ring.length; i++) {
      const [x, y] = this._toLocal(ring[i], ox, oy);
      path.lineTo(x, y);
    }
    path.closePath();
    return path;
  }

  // -- Dispose --

  /**
   * 仅释放几何体，不释放材质。
   *
   * 材质由 IMaterialFactory 管理（契约：VectorRenderer 不 dispose 材质）。
   * DefaultMaterialFactory 的材质在全部瓦片间共享 —— 若在此 dispose，
   * 任意瓦片淘汰都会让其余瓦片重新编译着色器，并违反工厂生命周期契约。
   */
  private _disposeGeometry(obj: unknown): void {
    const o = obj as THREE.Object3D;
    if (o instanceof THREE.Points || o instanceof THREE.Line) {
      o.geometry.dispose();
    } else if (o instanceof THREE.Mesh) {
      o.geometry.dispose();
    } else if (o instanceof THREE.Group) {
      o.traverse((child) => {
        if (
          child instanceof THREE.Points ||
          child instanceof THREE.Line ||
          child instanceof THREE.Mesh
        ) {
          child.geometry.dispose();
        }
      });
    }
  }
}
