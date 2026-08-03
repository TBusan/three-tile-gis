// geo-engine/packages/engine/src/crs/UTMCRS.ts

import type { IProjectCRS } from "./IProjectCRS";

/**
 * UTM (Universal Transverse Mercator) 投影 — 内置公式实现
 *
 * 支持所有 60 个 UTM 带（1–60），自动计算中央子午线。
 * 使用 WGS84 椭球参数，南部半球的北偏移为 10,000,000m。
 *
 * 公式基于 Schuhr 的 Transverse Mercator 级数展开。
 *
 * 用法：
 *   const utm50n = new UTMCRS(50);           // UTM Zone 50N (中国东部)
 *   const utm19s = new UTMCRS(19, false);    // UTM Zone 19S (南美)
 */
export class UTMCRS implements IProjectCRS {
  readonly units = "meter" as const;
  readonly name: string;

  /** WGS84 椭球参数 */
  private static readonly a = 6378137.0;
  private static readonly f = 1 / 298.257223563;
  private static readonly k0 = 0.9996;
  private static readonly e2 =
    2 * UTMCRS.f - UTMCRS.f * UTMCRS.f;
  private static readonly eP2 =
    UTMCRS.e2 / (1 - UTMCRS.e2);

  private readonly centralMeridian: number;
  private readonly falseEasting = 500000;
  private readonly falseNorthing: number;

  /**
   * @param zone — UTM 带号（1–60）
   * @param northern — true=N（默认），false=S
   */
  constructor(zone: number, northern = true) {
    if (zone < 1 || zone > 60 || !Number.isInteger(zone)) {
      throw new Error(`UTMCRS: invalid zone ${zone}, must be integer 1–60`);
    }
    this.centralMeridian = zone * 6 - 183;
    this.falseNorthing = northern ? 0 : 10000000;
    this.name = `UTM_Zone_${zone}${northern ? "N" : "S"}`;
  }

  /** 经纬度 → UTM 东/北 */
  project(lon: number, lat: number): { x: number; y: number } {
    const L = this.toRadians(lon - this.centralMeridian);
    const B = this.toRadians(lat);
    const { a, e2, eP2, k0 } = UTMCRS;

    const sinB = Math.sin(B);
    const cosB = Math.cos(B);
    const tanB = Math.tan(B);

    const N = a / Math.sqrt(1 - e2 * sinB * sinB);
    const T = tanB * tanB;
    const C = eP2 * cosB * cosB;
    const A = L * cosB;

    // 子午线弧长
    const M = meridianArcLength(a, e2, B);

    const x =
      this.falseEasting +
      k0 * N *
        (A +
          ((1 - T + C) * A * A * A) / 6 +
          ((5 - 18 * T + T * T + 72 * C - 58 * eP2) * A * A * A * A * A) /
            120);

    const y =
      this.falseNorthing +
      k0 *
        (M +
          N * tanB *
            ((A * A) / 2 +
              ((5 - T + 9 * C + 4 * C * C) * A * A * A * A) / 24 +
              ((61 - 58 * T + T * T + 600 * C - 330 * eP2) *
                A * A * A * A * A * A) /
                720));

    return { x, y };
  }

  /** UTM 东/北 → 经纬度 */
  unproject(x: number, y: number): { lon: number; lat: number } {
    const { a, e2, eP2, k0 } = UTMCRS;

    // 底点纬度（规格化弧长）
    const M = (y - this.falseNorthing) / k0;
    const e1 = (1 - Math.sqrt(1 - e2)) / (1 + Math.sqrt(1 - e2));
    const sigma = M / (a * (1 - e2 / 4 - (3 * e2 * e2) / 64 - (5 * e2 * e2 * e2) / 256));

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
    const D = (x - this.falseEasting) / (k0 * Nf);

    // 纬度反修正
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
          D * D * D * D * D * D) /
          720);

    const latRad = Bf - latCorrection;
    const lonRad =
      this.toRadians(this.centralMeridian) +
      (D -
        ((1 + 2 * Tf + Cf) * D * D * D) / 6 +
        ((5 - 2 * Cf + 28 * Tf - 3 * Cf * Cf + 8 * eP2 + 24 * Tf * Tf) *
          D * D * D * D * D) /
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

/** 子午线弧长（从赤道到纬度 B） */
function meridianArcLength(a: number, e2: number, B: number): number {
  const e4 = e2 * e2;
  const e6 = e4 * e2;
  return (
    a *
    ((1 - e2 / 4 - (3 * e4) / 64 - (5 * e6) / 256) * B -
      ((3 * e2) / 8 + (3 * e4) / 32 + (45 * e6) / 1024) * Math.sin(2 * B) +
      ((15 * e4) / 256 + (45 * e6) / 1024) * Math.sin(4 * B) -
      ((35 * e6) / 3072) * Math.sin(6 * B))
  );
}
