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
 *
 * 三个材质在所有矢量瓦片间共享（VectorRenderer 不 dispose 材质，契约见该文件）。
 * `userData.shared = true` 供上层（demo 淡入淡出）识别共享材质并跳过修改：
 * 直接改 opacity/transparent 会让整个矢量层一起闪动。
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
      userData: { shared: true },
    });
    this._lineMat = new THREE.LineBasicMaterial({
      color: options?.lineColor ?? 0x2ecc71,
      userData: { shared: true },
    });
    this._fillMat = new THREE.MeshBasicMaterial({
      color: options?.fillColor ?? 0x3498db,
      // 地图平面只从上方观察，背面不可见；FrontSide 剔除背面，填充率减半。
      // ShapeGeometry 默认 CCW 正面朝 +z，FrontSide 下从上方可见。
      side: THREE.FrontSide,
      userData: { shared: true },
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
