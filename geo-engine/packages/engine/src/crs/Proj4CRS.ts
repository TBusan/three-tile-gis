// geo-engine/packages/engine/src/crs/Proj4CRS.ts

import proj4 from "proj4";
import type { IProjectCRS } from "./IProjectCRS";

/**
 * Proj4CRS — 基于 proj4 的任意 EPSG 投影坐标系
 *
 * 通过 proj4 库支持任意 EPSG 代码和自定义 PROJ 定义串。
 *
 * 用法：
 *   // EPSG 代码（proj4 内置定义）
 *   const utm50 = new Proj4CRS("EPSG:32650");
 *
 *   // 自定义 PROJ 定义串
 *   const custom = new Proj4CRS("CUSTOM", "+proj=tmerc +lat_0=0 +lon_0=114 +ellps=GRS80");
 *
 *   // 先注册再使用（对于 proj4 没有内置的 EPSG）
 *   const gk114 = new Proj4CRS("EPSG:4547",
 *     "+proj=tmerc +lat_0=0 +lon_0=114 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m");
 */
export class Proj4CRS implements IProjectCRS {
  readonly name: string;
  readonly units: "meter" | "degree";

  private readonly _wgs84ToTarget: proj4.Converter;
  private readonly _targetToWgs84: proj4.Converter;

  /**
   * @param defFrom — 源坐标系定义（"EPSG:4326" 或 PROJ 串），通常为 "EPSG:4326"
   * @param defTo — 目标坐标系定义（EPSG 代码或 PROJ 串）
   */
  constructor(defFrom: string, defTo: string) {
    this.name = defTo.startsWith("EPSG:") ? defTo : defTo;
    this._wgs84ToTarget = proj4(defFrom, defTo);
    this._targetToWgs84 = proj4(defTo, defFrom);
    this.units = this._detectUnits(defTo);
  }

  /**
   * 便捷构造：EPSG:4326 → targetCRS
   */
  static fromEPSG(epsgCode: string, definition?: string): Proj4CRS {
    if (definition) {
      proj4.defs(epsgCode, definition);
    }
    return new Proj4CRS("EPSG:4326", epsgCode);
  }

  project(lon: number, lat: number): { x: number; y: number } {
    const [x, y] = this._wgs84ToTarget.forward([lon, lat]);
    return { x, y };
  }

  unproject(x: number, y: number): { lon: number; lat: number } {
    const [lon, lat] = this._targetToWgs84.forward([x, y]);
    return { lon, lat };
  }

  // ---- private ----

  private _detectUnits(def: string): "meter" | "degree" {
    // Geographic CRS use degree units
    if (def.includes("+proj=longlat") || def.includes("+proj=latlong")) {
      return "degree";
    }
    // Common geographic EPSG codes
    if (
      def === "EPSG:4326" || def === "EPSG:4269" || def === "EPSG:4612" ||
      def === "EPSG:4490"
    ) {
      return "degree";
    }
    // Default: projected CRS → meter
    return "meter";
  }
}
