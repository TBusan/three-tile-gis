// geo-engine/packages/engine/src/crs/IProjectCRS.ts

export interface IProjectCRS {
  /** CRS 名称 */
  readonly name: string;
  /** 坐标单位 */
  readonly units: "meter" | "degree";

  /** 经纬度 → CRS 平面坐标 */
  project(lon: number, lat: number): { x: number; y: number };

  /** CRS 平面坐标 → 经纬度 */
  unproject(x: number, y: number): { lon: number; lat: number };
}
