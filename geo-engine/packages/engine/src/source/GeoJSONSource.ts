// geo-engine/packages/engine/src/source/GeoJSONSource.ts

import type { CrsBounds } from "../core/types";
import type { IProjectCRS } from "../crs/IProjectCRS";
import type { TileKey } from "../tile/TileKey";
import type { IDataSource } from "./IDataSource";

/**
 * GeoJSON Feature 几何体类型
 */
export type GeoJSONGeometryType =
  | "Point"
  | "MultiPoint"
  | "LineString"
  | "MultiLineString"
  | "Polygon"
  | "MultiPolygon";

/**
 * 引擎内部使用的简化 Feature 表示
 *
 * 坐标已经是 Engine CRS 坐标（米），不需要投影转换。
 * 属性存储在 properties 中，供 IMaterialFactory 使用。
 */
export interface GeoFeature {
  type: GeoJSONGeometryType;
  /** 坐标数组（Point: [x,y], LineString: [[x,y],...], Polygon: [[[x,y],...]]) */
  coordinates: any;
  /** Feature 属性（用于符号化） */
  properties: Record<string, unknown>;
  /** 快速包围盒 [minX, minY, maxX, maxY] */
  bbox: CrsBounds;
}

/**
 * GeoJSON 数据源 — 从 URL 加载 GeoJSON，按 Tile 空间裁剪
 *
 * 约定：文件中的坐标必须是 Engine CRS 坐标（米）。
 * 如果 GeoJSON 是经纬度坐标，需要先用外部工具转换为目标 CRS。
 */
export class GeoJSONSource implements IDataSource<GeoFeature[]> {
  readonly dataType = "geojson";
  readonly crs: IProjectCRS;
  bounds: CrsBounds;

  private readonly _url: string;
  private _features: GeoFeature[] | null = null;
  private _loadPromise: Promise<GeoFeature[]> | null = null;

  constructor(url: string, crs: IProjectCRS) {
    this._url = url;
    this.crs = crs;
    // 数据范围在首次加载后更新
    this.bounds = [0, 0, 0, 0] as CrsBounds;
  }

  async fetch(
    _key: TileKey,
    tileBounds: CrsBounds,
    _signal?: AbortSignal,
  ): Promise<GeoFeature[]> {
    const all = await this._loadAll();
    return this._clip(all, tileBounds);
  }

  dispose(_data: GeoFeature[]): void {
    // GeoJSON 数据是内存中的对象，无需特殊释放
  }

  // ---- private ----

  private async _loadAll(): Promise<GeoFeature[]> {
    if (this._features) return this._features;
    if (this._loadPromise) return this._loadPromise;

    this._loadPromise = (async () => {
      const response = await fetch(this._url);
      if (!response.ok) {
        throw new Error(
          `GeoJSONSource: HTTP ${response.status} for ${this._url}`,
        );
      }
      const geojson = await response.json();
      this._features = this._parse(geojson);

      // 更新全局 bounds
      if (this._features.length > 0) {
        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
        for (const f of this._features) {
          if (f.bbox[0] < minX) minX = f.bbox[0];
          if (f.bbox[1] < minY) minY = f.bbox[1];
          if (f.bbox[2] > maxX) maxX = f.bbox[2];
          if (f.bbox[3] > maxY) maxY = f.bbox[3];
        }
        this.bounds = [minX, minY, maxX, maxY];
      }

      return this._features;
    })();

    return this._loadPromise;
  }

  private _parse(geojson: any): GeoFeature[] {
    const features: GeoFeature[] = [];

    if (geojson.type === "FeatureCollection") {
      for (const f of geojson.features ?? []) {
        const parsed = this._parseFeature(f);
        if (parsed) features.push(parsed);
      }
    } else if (geojson.type === "Feature") {
      const parsed = this._parseFeature(geojson);
      if (parsed) features.push(parsed);
    }

    return features;
  }

  private _parseFeature(f: any): GeoFeature | null {
    if (!f.geometry || !f.geometry.type) return null;

    const type = f.geometry.type as GeoJSONGeometryType;
    const coordinates = f.geometry.coordinates;
    if (!coordinates) return null;

    const properties = (f.properties ?? {}) as Record<string, unknown>;
    const bbox = this._computeBbox(type, coordinates);

    return { type, coordinates, properties, bbox };
  }

  private _computeBbox(type: GeoJSONGeometryType, coords: any): CrsBounds {
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;

    const visit = (x: number, y: number) => {
      if (x < minX) minX = x;
      if (y < minY) minY = y;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
    };

    if (type === "Point") {
      visit(coords[0], coords[1]);
    } else if (type === "MultiPoint" || type === "LineString") {
      for (const pt of coords) {
        visit(pt[0], pt[1]);
      }
    } else if (type === "MultiLineString" || type === "Polygon") {
      for (const ring of coords) {
        for (const pt of ring) {
          visit(pt[0], pt[1]);
        }
      }
    } else if (type === "MultiPolygon") {
      for (const poly of coords) {
        for (const ring of poly) {
          for (const pt of ring) {
            visit(pt[0], pt[1]);
          }
        }
      }
    }

    if (!isFinite(minX)) return [0, 0, 0, 0];
    return [minX, minY, maxX, maxY];
  }

  /**
   * 空间裁剪 — 只保留 bbox 与 tileBounds 相交的 Feature
   */
  private _clip(features: GeoFeature[], tileBounds: CrsBounds): GeoFeature[] {
    const [tx0, ty0, tx1, ty1] = tileBounds;

    return features.filter((f) => {
      const [fx0, fy0, fx1, fy1] = f.bbox;
      // 包围盒相交检测
      return !(fx1 < tx0 || fx0 > tx1 || fy1 < ty0 || fy0 > ty1);
    });
  }
}
