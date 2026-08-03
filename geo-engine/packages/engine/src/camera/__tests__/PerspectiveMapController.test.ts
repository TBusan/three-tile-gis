// geo-engine/packages/engine/src/camera/__tests__/PerspectiveMapController.test.ts
import { describe, it, expect } from "vitest";
import * as THREE from "three";
import { PerspectiveMapController } from "../PerspectiveMapController";

describe("PerspectiveMapController", () => {
  it("camera.up 应为世界朝上 +Z（根因断言）", () => {
    const ctrl = new PerspectiveMapController();
    expect(ctrl.camera.up.x).toBe(0);
    expect(ctrl.camera.up.y).toBe(0);
    expect(ctrl.camera.up.z).toBe(1);
  });

  it("初始位置符合指定俯仰角（默认 45°）+ 默认方位 -π/2（正南）", () => {
    const ctrl = new PerspectiveMapController({
      center: { x: 0, y: 0 },
      distance: 1000,
    });
    const phi = Math.PI / 4;
    // 方位角默认 -π/2：cos(-π/2)=0（x=0）、sin(-π/2)=-1 → 相机在正南 -Y（屏幕上方 = 北）
    expect(ctrl.camera.position.x).toBeCloseTo(0, 6);
    expect(ctrl.camera.position.y).toBeCloseTo(-1000 * Math.sin(phi), 6);
    expect(ctrl.camera.position.z).toBeCloseTo(1000 * Math.cos(phi), 6);
  });

  it("自定义 initialPolarAngle 生效", () => {
    const ctrl = new PerspectiveMapController({
      distance: 2000,
      initialPolarAngle: Math.PI / 3,
    });
    const phi = Math.PI / 3;
    expect(ctrl.camera.position.x).toBeCloseTo(0, 6);
    expect(ctrl.camera.position.y).toBeCloseTo(-2000 * Math.sin(phi), 6);
    expect(ctrl.camera.position.z).toBeCloseTo(2000 * Math.cos(phi), 6);
  });

  it("initialAzimuth=0 → 相机在正东", () => {
    const ctrl = new PerspectiveMapController({
      distance: 1000,
      initialAzimuth: 0,
    });
    const phi = Math.PI / 4;
    expect(ctrl.camera.position.x).toBeCloseTo(1000 * Math.sin(phi), 6);
    expect(ctrl.camera.position.y).toBeCloseTo(0, 6);
    expect(ctrl.camera.position.z).toBeCloseTo(1000 * Math.cos(phi), 6);
  });

  it("屏幕上方应为远处地面（核心回归：旧代码上下颠倒）", () => {
    const ctrl = new PerspectiveMapController({
      center: { x: 0, y: 0 },
      distance: 1000,
    });
    ctrl.update(0);
    ctrl.camera.updateMatrixWorld(true);

    // 相机局部 +Y（屏幕向上方向）在世界空间的投影
    const upWorld = new THREE.Vector3().setFromMatrixColumn(
      ctrl.camera.matrixWorld,
      1,
    );
    // 视线沿地面投影的方向 = target - camera 的水平分量（远处地面方向）
    const cam = ctrl.camera.position;
    const groundDir = new THREE.Vector2(0 - cam.x, 0 - cam.y).normalize();
    const dot = upWorld.x * groundDir.x + upWorld.y * groundDir.y;

    // 屏幕向上方向应指向远处地面（dot > 0）；旧实现为负（≈ -0.99）
    expect(dot).toBeGreaterThan(0);
  });

  it("初始视角屏幕上方应为正北（地图文字朝上，不反向）", () => {
    const ctrl = new PerspectiveMapController({ distance: 1000 });
    ctrl.update(0);
    ctrl.camera.updateMatrixWorld(true);

    // 相机局部 +Y（屏幕向上方向）在世界空间的投影
    const upWorld = new THREE.Vector3().setFromMatrixColumn(
      ctrl.camera.matrixWorld,
      1,
    );
    // 默认方位 π → 相机在正南，屏幕向上应指向世界 +Y（北）。
    // 旧实现相机在正北 → upWorld.y < 0（地图南北向反，需手动旋转 180°）。
    expect(upWorld.y).toBeGreaterThan(0);
  });

  it("extent / resolution 在 45° 初始下返回有效值", () => {
    const ctrl = new PerspectiveMapController({
      distance: 6000,
      fov: 60,
    });
    ctrl.update(0);

    const extent = ctrl.extent;
    for (const v of extent) {
      expect(Number.isFinite(v)).toBe(true);
    }
    expect(extent[2]).toBeGreaterThan(extent[0]);
    expect(extent[3]).toBeGreaterThan(extent[1]);
    expect(ctrl.resolution).toBeGreaterThan(0);
  });

  it("extent 在 45°/6km 时应覆盖远端地面（目标北侧 >10km）", () => {
    const ctrl = new PerspectiveMapController({
      center: { x: 0, y: 0 },
      distance: 6000,
      fov: 60,
    });
    ctrl.update(0);

    const extent = ctrl.extent;
    // 45° 倾斜下可见地面远端 ≈ 目标北侧 11.6km；旧的对称补偿只覆盖到 ~4.9km → 顶部灰带
    expect(extent[3]).toBeGreaterThan(10000);
    // 近端不再过度覆盖（可见近端 ≈ 3.1km；旧实现到 -4.9km）
    expect(extent[1]).toBeGreaterThan(-3500);
  });

  it("近正俯视时 extent 接近无倾斜矩形", () => {
    const ctrl = new PerspectiveMapController({
      distance: 6000,
      fov: 60,
      initialPolarAngle: 0.01, // 会被 update() 钳位到 minPolarAngle(0.15)
    });
    ctrl.update(0);

    const extent = ctrl.extent;
    for (const v of extent) expect(Number.isFinite(v)).toBe(true);
    expect(extent[2]).toBeGreaterThan(extent[0]);
    expect(extent[3]).toBeGreaterThan(extent[1]);
    // 近俯视下南北半高约为 tan(30°)*dist = 3464m（对称矩形，无远端放大）
    expect(extent[3] - extent[1]).toBeLessThan(2 * 3464 * 1.05);
  });

  it("minPolarAngle 选项应应用到 controls（默认 0.15）", () => {
    const ctrl = new PerspectiveMapController();
    expect(ctrl.controls.minPolarAngle).toBeCloseTo(0.15, 6);
  });
});
