// geo-engine/packages/engine/src/source/__tests__/GeoJSONSource.test.ts
import { describe, it, expect, vi, beforeEach } from "vitest";
import { GeoJSONSource, type GeoFeature } from "../GeoJSONSource";
import { makeTileKey } from "../../tile/TileKey";
import { CGCS2000GKCRS } from "../../crs/CGCS2000GK";

describe("GeoJSONSource", () => {
  const crs = new CGCS2000GKCRS(38);

  beforeEach(() => {
    // Mock fetch for GeoJSON responses
    vi.spyOn(globalThis, "fetch").mockReset();
  });

  function mockGeoJSONResponse(data: any) {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
      ok: true,
      json: async () => data,
    } as Response);
  }

  it("should construct with url and crs", () => {
    const source = new GeoJSONSource("http://example.com/data.json", crs);
    expect(source.dataType).toBe("geojson");
    expect(source.crs).toBe(crs);
  });

  it("should parse FeatureCollection and filter by tile bounds", async () => {
    mockGeoJSONResponse({
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: { type: "Point", coordinates: [500000, 3650000] },
          properties: { name: "A" },
        },
        {
          type: "Feature",
          geometry: { type: "Point", coordinates: [501000, 3650000] },
          properties: { name: "B" },
        },
        {
          type: "Feature",
          geometry: { type: "Point", coordinates: [600000, 3700000] },
          properties: { name: "C" },
        },
      ],
    });

    const source = new GeoJSONSource("http://example.com/points.json", crs);
    const key = makeTileKey("proj", "0-0", 0);

    // Tile covers 500000 ± 500
    const tileBounds: [number, number, number, number] = [
      499500, 3649500, 500500, 3650500,
    ];

    const features = await source.fetch(key, tileBounds);
    expect(features).toHaveLength(1);
    expect(features[0].properties.name).toBe("A");
  });

  it("should compute bbox for each feature", async () => {
    mockGeoJSONResponse({
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: [
          [500000, 3650000],
          [501000, 3651000],
        ],
      },
    });

    const source = new GeoJSONSource("http://example.com/line.json", crs);
    const features = await source.fetch(
      makeTileKey("proj", "0-0", 0),
      [499000, 3649000, 502000, 3652000],
    );

    expect(features).toHaveLength(1);
    const bbox = features[0].bbox;
    expect(bbox[0]).toBeCloseTo(500000);
    expect(bbox[1]).toBeCloseTo(3650000);
    expect(bbox[2]).toBeCloseTo(501000);
    expect(bbox[3]).toBeCloseTo(3651000);
  });

  it("should filter out features outside tile bounds", async () => {
    mockGeoJSONResponse({
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: { type: "Point", coordinates: [500000, 3650000] },
        },
        {
          type: "Feature",
          geometry: { type: "Point", coordinates: [999999, 9999999] },
        },
      ],
    });

    const source = new GeoJSONSource("http://example.com/data.json", crs);
    // Tile far from the second point
    const features = await source.fetch(
      makeTileKey("proj", "0-0", 0),
      [499000, 3649000, 501000, 3651000],
    );

    expect(features).toHaveLength(1);
  });

  it("should update bounds after loading", async () => {
    mockGeoJSONResponse({
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: { type: "Point", coordinates: [500000, 3650000] },
        },
      ],
    });

    const source = new GeoJSONSource("http://example.com/data.json", crs);
    await source.fetch(
      makeTileKey("proj", "0-0", 0),
      [0, 0, 1000000, 10000000],
    );

    expect(source.bounds[0]).toBe(500000);
    expect(source.bounds[1]).toBe(3650000);
  });

  it("should cache features across multiple fetches", async () => {
    mockGeoJSONResponse({
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: { type: "Point", coordinates: [100, 200] },
        },
      ],
    });

    const source = new GeoJSONSource("http://example.com/data.json", crs);

    const r1 = await source.fetch(makeTileKey("proj", "a", 0), [0, 0, 1000, 1000]);
    const r2 = await source.fetch(makeTileKey("proj", "b", 0), [0, 0, 1000, 1000]);

    expect(r1).toHaveLength(1);
    expect(r2).toHaveLength(1);
    // fetch should only be called once (caching)
    expect(globalThis.fetch).toHaveBeenCalledTimes(1);
  });

  it("should handle empty FeatureCollection", async () => {
    mockGeoJSONResponse({ type: "FeatureCollection", features: [] });

    const source = new GeoJSONSource("http://example.com/empty.json", crs);
    const features = await source.fetch(
      makeTileKey("proj", "0-0", 0),
      [0, 0, 1000, 1000],
    );

    expect(features).toHaveLength(0);
  });

  it("dispose should be no-op", () => {
    const source = new GeoJSONSource("http://example.com/data.json", crs);
    expect(() => source.dispose([])).not.toThrow();
  });
});
