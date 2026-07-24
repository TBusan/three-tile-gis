// geo-engine/packages/engine/src/renderer/VectorRenderer.ts

import * as THREE from "three";
import type { Tile } from "../tile/Tile";
import { TileContent, RenderObject } from "../tile/TileContent";
import type { ILayerRenderer } from "./ILayerRenderer";
import type { IMaterialFactory } from "./IMaterialFactory";
import type { GeoFeature } from "../source/GeoJSONSource";

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

  constructor(materialFactory: IMaterialFactory, name = "vector-renderer") {
    this._materialFactory = materialFactory;
    this.name = name;
  }

  async createContent(
    features: GeoFeature[],
    tile: Tile,
  ): Promise<TileContent> {
    const content = new TileContent(
      `vector-${tile.key.id}`,
      tile.key,
      "vector-layer",
    );

    const ox = tile.origin.x;
    const oy = tile.origin.y;

    for (const f of features) {
      const obj = this._createObject(f, ox, oy);
      if (!obj) continue;

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
