// geo-engine/packages/engine/src/renderer/IMaterialFactory.ts

import * as THREE from "three";
import type { GeoFeature } from "../source/GeoJSONSource";

/**
 * 材质工厂接口 — 根据 Feature 属性决定渲染样式
 *
 * 每种几何类型（点/线/面）有一个创建方法。
 * 实现类可根据 feature.properties 动态返回不同材质
 * 以实现符号化（按属性着色、虚线、图标等）。
 *
 * 注意：返回的材质生命周期由工厂管理，VectorRenderer 不会 dispose 它们。
 */
export interface IMaterialFactory {
  /** 创建点材质（用于 Point / MultiPoint） */
  createPointMaterial(feature: GeoFeature): THREE.Material;

  /** 创建线材质（用于 LineString / MultiLineString） */
  createLineMaterial(feature: GeoFeature): THREE.Material;

  /** 创建填充材质（用于 Polygon / MultiPolygon） */
  createFillMaterial(feature: GeoFeature): THREE.Material;
}

/**
 * 默认材质工厂 — 所有 Feature 使用相同样式
 *
 * 用法：
 *   const factory = new DefaultMaterialFactory({
 *     pointColor: 0xff0000,
 *     lineColor: 0x00ff00,
 *     fillColor: 0x0000ff,
 *   });
 */
export class DefaultMaterialFactory implements IMaterialFactory {
  private readonly _pointMat: THREE.PointsMaterial;
  private readonly _lineMat: THREE.LineBasicMaterial;
  private readonly _fillMat: THREE.MeshBasicMaterial;

  constructor(options?: {
    pointColor?: number;
    lineColor?: number;
    fillColor?: number;
  }) {
    this._pointMat = new THREE.PointsMaterial({
      color: options?.pointColor ?? 0xe74c3c,
      size: 5,
      sizeAttenuation: false,
    });
    this._lineMat = new THREE.LineBasicMaterial({
      color: options?.lineColor ?? 0x2ecc71,
    });
    this._fillMat = new THREE.MeshBasicMaterial({
      color: options?.fillColor ?? 0x3498db,
      side: THREE.DoubleSide,
    });
  }

  createPointMaterial(_feature: GeoFeature): THREE.Material {
    return this._pointMat;
  }

  createLineMaterial(_feature: GeoFeature): THREE.Material {
    return this._lineMat;
  }

  createFillMaterial(_feature: GeoFeature): THREE.Material {
    return this._fillMat;
  }
}
