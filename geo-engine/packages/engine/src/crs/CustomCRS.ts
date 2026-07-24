// geo-engine/packages/engine/src/crs/CustomCRS.ts

import { IProjectCRS } from "./IProjectCRS";

/**
 * CustomCRS — 用户自定义投影
 *
 * 传入 project / unproject 函数，适配任意非标准投影。
 * 不做任何内置坐标转换。
 *
 * 用法：
 *   const custom = new CustomCRS("my-crs", "meter", {
 *     project: (lon, lat) => ({ x: lon * 1000, y: lat * 1000 }),
 *     unproject: (x, y) => ({ lon: x / 1000, lat: y / 1000 }),
 *   });
 */
export class CustomCRS implements IProjectCRS {
  readonly name: string;
  readonly units: "meter" | "degree";

  private readonly _project: (lon: number, lat: number) => { x: number; y: number };
  private readonly _unproject: (x: number, y: number) => { lon: number; lat: number };

  constructor(
    name: string,
    units: "meter" | "degree",
    fns: {
      project: (lon: number, lat: number) => { x: number; y: number };
      unproject: (x: number, y: number) => { lon: number; lat: number };
    },
  ) {
    this.name = name;
    this.units = units;
    this._project = fns.project;
    this._unproject = fns.unproject;
  }

  project(lon: number, lat: number): { x: number; y: number } {
    return this._project(lon, lat);
  }

  unproject(x: number, y: number): { lon: number; lat: number } {
    return this._unproject(x, y);
  }
}
