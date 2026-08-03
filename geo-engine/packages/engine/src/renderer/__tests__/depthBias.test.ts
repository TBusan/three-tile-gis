// geo-engine/packages/engine/src/renderer/__tests__/depthBias.test.ts

import { describe, it, expect, vi } from "vitest";
import * as THREE from "three";
import { applyDepthBias } from "../depthBias";

describe("applyDepthBias", () => {
  it("should set polygonOffset fallback (non-log depth path)", () => {
    const mat = new THREE.MeshBasicMaterial();
    applyDepthBias(mat, 0.5);
    expect(mat.polygonOffset).toBe(true);
    expect(mat.polygonOffsetFactor).toBe(-1);
    expect(mat.polygonOffsetUnits).toBe(-1);
  });

  it("should inject uDepthBias and override the logdepth chunk on compile", () => {
    const mat = new THREE.MeshBasicMaterial();
    applyDepthBias(mat, 0.5);

    const shader = {
      fragmentShader: `#include <common>
#include <logdepthbuf_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
}`,
      uniforms: {},
    } as any;

    mat.onBeforeCompile!(shader, {} as any);

    // uniform 声明注入到 pars chunk 之后
    expect(shader.fragmentShader).toContain("uniform float uDepthBias;");
    // 深度编码覆盖注入到 fragment chunk 之后（保留原 chunk）
    expect(shader.fragmentShader).toContain("vFragDepth - uDepthBias");
    const idxFragment = shader.fragmentShader.indexOf(
      "#include <logdepthbuf_fragment>",
    );
    const idxOverride = shader.fragmentShader.indexOf("vFragDepth - uDepthBias");
    expect(idxOverride).toBeGreaterThan(idxFragment);
    // uniform 值上传
    expect(shader.uniforms.uDepthBias).toEqual({ value: 0.5 });
  });

  it("should be idempotent: second call does not re-wrap onBeforeCompile", () => {
    const mat = new THREE.MeshBasicMaterial();
    applyDepthBias(mat, 0.5);
    const firstOnBeforeCompile = mat.onBeforeCompile;
    applyDepthBias(mat, 0.8); // 不同 bias 也被忽略（共享材质只注入一次）
    expect(mat.onBeforeCompile).toBe(firstOnBeforeCompile);
  });

  it("should set polygonOffset but skip shader injection when bias <= 0", () => {
    const mat = new THREE.MeshBasicMaterial();
    // three 的 Material 原型自带 no-op onBeforeCompile，bias<=0 时不应被包装
    const originalOnBeforeCompile = mat.onBeforeCompile;
    applyDepthBias(mat, 0);
    expect(mat.polygonOffset).toBe(true);
    expect(mat.onBeforeCompile).toBe(originalOnBeforeCompile);
  });

  it("should skip injection and not throw when logdepthbuf chunks are missing", () => {
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    const mat = new THREE.MeshBasicMaterial();
    applyDepthBias(mat, 0.5);

    const shader = { fragmentShader: "void main() {}", uniforms: {} } as any;
    expect(() => mat.onBeforeCompile!(shader, {} as any)).not.toThrow();
    expect(shader.fragmentShader).not.toContain("uDepthBias");
    expect(warnSpy).toHaveBeenCalled();

    warnSpy.mockRestore();
  });
});
