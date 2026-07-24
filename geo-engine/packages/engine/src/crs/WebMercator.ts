// geo-engine/packages/engine/src/crs/WebMercator.ts

import type { IProjectCRS } from "./IProjectCRS";

/**
 * Web Mercator (EPSG:3857 / EPSG:900913) — 内联公式，无外部依赖
 *
 * 使用 WGS84 椭球半长轴 R = 6378137m。
 * 纬度限制在 ±85.06° 内（Web Mercator 的有效范围）。
 *
 * 公式来源：OpenStreetMap Wiki / EPSG:3857
 */
export class WebMercatorCRS implements IProjectCRS {
  readonly name = "EPSG:3857";
  readonly units = "meter" as const;

  /** WGS84 椭球半长轴（米） */
  private static readonly R = 6378137.0;

  /** 纬度有效范围（度），对应 y ≈ ±20037508.34 */
  private static readonly MAX_LAT = 85.0511287798066;

  project(lon: number, lat: number): { x: number; y: number } {
    const lonRad = (lon * Math.PI) / 180;
    const latRad = (lat * Math.PI) / 180;
    const R = WebMercatorCRS.R;

    const x = lonRad * R;
    // ln(tan(π/4 + lat/2))
    const y = R * Math.log(Math.tan(Math.PI / 4 + latRad / 2));

    return { x, y };
  }

  unproject(x: number, y: number): { lon: number; lat: number } {
    const R = WebMercatorCRS.R;

    const lon = (x / R) * (180 / Math.PI);
    // atan(sinh(y/R)) — 等价于 2*atan(e^(y/R)) - π/2
    const lat = Math.atan(Math.sinh(y / R)) * (180 / Math.PI);

    return { lon, lat };
  }

  /** 钳制纬度到 Web Mercator 有效范围 */
  static clampLat(lat: number): number {
    return Math.max(-this.MAX_LAT, Math.min(this.MAX_LAT, lat));
  }
}
