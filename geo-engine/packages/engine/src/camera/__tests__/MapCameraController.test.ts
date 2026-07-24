// geo-engine/packages/engine/src/camera/__tests__/MapCameraController.test.ts
import { describe, it, expect } from "vitest";
import { MapCameraController } from "../MapCameraController";

describe("MapCameraController", () => {
  it("should have default position at (0,0)", () => {
    const cam = new MapCameraController();
    expect(cam.cameraWorldPos).toEqual({ x: 0, y: 0, z: 0 });
  });

  it("should accept initial position", () => {
    const cam = new MapCameraController({ x: 500000, y: 3650000, zoom: 2 });
    expect(cam.cameraWorldPos.x).toBe(500000);
    expect(cam.cameraWorldPos.y).toBe(3650000);
    expect(cam.zoom).toBe(2);
  });

  it("should compute extent from position and zoom", () => {
    const cam = new MapCameraController({ x: 0, y: 0, zoom: 1 });
    // Default container size not set yet — width=800, height=600

    const extent = cam.extent;
    // halfW = 400 * 1 = 400, halfH = 300 * 1 = 300
    expect(extent[0]).toBe(-400);
    expect(extent[1]).toBe(-300);
    expect(extent[2]).toBe(400);
    expect(extent[3]).toBe(300);
  });

  it("should set center", () => {
    const cam = new MapCameraController();
    cam.setCenter(512000, 3650000);
    expect(cam.cameraWorldPos.x).toBe(512000);
  });

  it("should clip zoom to valid range", () => {
    const cam = new MapCameraController();
    cam.setZoom(0.001); // too small → clipped to 0.01
    expect(cam.zoom).toBe(0.01);
    cam.setZoom(9999); // too large → clipped to 1000
    expect(cam.zoom).toBe(1000);
  });
});
