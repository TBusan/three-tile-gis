// geo-engine/packages/engine/src/crs/CGCS2000GK.ts

import type { IProjectCRS } from "./IProjectCRS";

/**
 * CGCS2000 高斯-克吕格投影（3度带）
 *
 * 内置公式，无外部依赖。支持任意中央子午线。
 * 东偏移 = 500000m（标准），北偏移 = 0
 *
 * 公式来源：GB/T 18314-2009
 */
export class CGCS2000GKCRS implements IProjectCRS {
  readonly name: string;
  readonly units = "meter" as const;

  /** 椭球参数 — CGCS2000 */
  private static readonly a = 6378137.0; // 长半轴
  private static readonly f = 1 / 298.257222101; // 扁率
  private static readonly e2 =
    2 * CGCS2000GKCRS.f - CGCS2000GKCRS.f * CGCS2000GKCRS.f;
  private static readonly eP2 =
    CGCS2000GKCRS.e2 / (1 - CGCS2000GKCRS.e2);

  /** 中央子午线（度） */
  private readonly centralMeridian: number;
  /** 东偏移（米） */
  private readonly falseEasting = 500000;
  /** 北偏移（米） */
  private readonly falseNorthing = 0;

  constructor(zone: number) {
    this.centralMeridian = 3 * zone;
    this.name = `CGCS2000_GK_${zone}`;
  }

  project(lon: number, lat: number): { x: number; y: number } {
    const L = this.toRadians(lon - this.centralMeridian);
    const B = this.toRadians(lat);
    const { a, e2, eP2 } = CGCS2000GKCRS;

    const sinB = Math.sin(B);
    const cosB = Math.cos(B);
    const tanB = Math.tan(B);

    const N = a / Math.sqrt(1 - e2 * sinB * sinB);
    const T = tanB * tanB;
    const C = eP2 * cosB * cosB;
    const A = L * cosB;

    // 子午线弧长计算
    const e2_2 = e2 * e2;
    const e2_3 = e2_2 * e2;
    const M =
      a *
      ((1 - e2 / 4 - (3 * e2_2) / 64 - (5 * e2_3) / 256) * B -
        ((3 * e2) / 8 + (3 * e2_2) / 32 + (45 * e2_3) / 1024) *
          Math.sin(2 * B) +
        ((15 * e2_2) / 256 + (45 * e2_3) / 1024) * Math.sin(4 * B) -
        ((35 * e2_3) / 3072) * Math.sin(6 * B));

    const x =
      this.falseEasting +
      N *
        (A +
          ((1 - T + C) * A * A * A) / 6 +
          ((5 - 18 * T + T * T + 72 * C - 58 * eP2) * A * A * A * A * A) /
            120);

    const y =
      this.falseNorthing +
      M +
      N *
        tanB *
        ((A * A) / 2 +
          ((5 - T + 9 * C + 4 * C * C) * A * A * A * A) / 24 +
          ((61 - 58 * T + T * T + 600 * C - 330 * eP2) *
            A *
            A *
            A *
            A *
            A *
            A) /
            720);

    return { x, y };
  }

  unproject(x: number, y: number): { lon: number; lat: number } {
    const { a, e2, eP2 } = CGCS2000GKCRS;
    // 子午圈弧长归一化因子 A0 = 1 - e²/4 - 3e⁴/64 - 5e⁶/256
    const e4 = e2 * e2;
    const e6 = e4 * e2;
    const A0 = 1 - e2 / 4 - (3 * e4) / 64 - (5 * e6) / 256;
    const sigma = (y - this.falseNorthing) / (a * A0); // 规格化弧长
    const e1 =
      (1 - Math.sqrt(1 - e2)) / (1 + Math.sqrt(1 - e2));

    // 底点纬度（规格化弧长的直接级数展开，非迭代式）
    const sin2s = Math.sin(2 * sigma);
    const sin4s = Math.sin(4 * sigma);
    const sin6s = Math.sin(6 * sigma);
    const sin8s = Math.sin(8 * sigma);
    const e12 = e1 * e1;
    const e13 = e12 * e1;
    const e14 = e13 * e1;

    const Bf =
      sigma +
      ((3 * e1) / 2 - (27 * e13) / 32) * sin2s +
      ((21 * e12) / 16 - (55 * e14) / 32) * sin4s +
      ((151 * e13) / 96) * sin6s +
      ((1097 * e14) / 512) * sin8s;

    const sinBf = Math.sin(Bf);
    const cosBf = Math.cos(Bf);
    const tanBf = Math.tan(Bf);
    const Nf = a / Math.sqrt(1 - e2 * sinBf * sinBf);
    const Tf = tanBf * tanBf;
    const Cf = eP2 * cosBf * cosBf;
    const D = (x - this.falseEasting) / Nf;

    // 纬度反修正
    // 使用子午圈曲率半径 Mf_radius 而非子午线弧长，与 PROJ 库一致
    const Mf_radius =
      (a * (1 - e2)) / Math.pow(1 - e2 * sinBf * sinBf, 1.5);

    const latCorrection =
      ((Nf * tanBf) / Mf_radius) *
      ((D * D) / 2 -
        ((5 + 3 * Tf + 10 * Cf - 4 * Cf * Cf - 9 * eP2) * D * D * D * D) /
          24 +
        ((61 +
          90 * Tf +
          298 * Cf +
          45 * Tf * Tf -
          252 * eP2 -
          3 * Cf * Cf) *
          D *
          D *
          D *
          D *
          D *
          D) /
          720);

    const latRad = Bf - latCorrection;

    const lonRad =
      this.toRadians(this.centralMeridian) +
      (D -
        ((1 + 2 * Tf + Cf) * D * D * D) / 6 +
        ((5 -
          2 * Cf +
          28 * Tf -
          3 * Cf * Cf +
          8 * eP2 +
          24 * Tf * Tf) *
          D *
          D *
          D *
          D *
          D) /
          120) /
        cosBf;

    return { lon: this.toDegrees(lonRad), lat: this.toDegrees(latRad) };
  }

  private toRadians(deg: number): number {
    return (deg * Math.PI) / 180;
  }

  private toDegrees(rad: number): number {
    return (rad * 180) / Math.PI;
  }
}
