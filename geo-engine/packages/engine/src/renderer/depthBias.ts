// geo-engine/packages/engine/src/renderer/depthBias.ts

import * as THREE from "three";

/**
 * 片元深度偏移 — 在对数深度缓冲下给材质一个深度优势。
 *
 * 背景：logarithmicDepthBuffer 开启时，three.js 在 fragment shader 里用
 * `gl_FragDepth = log2(vFragDepth) * logDepthBufFC * 0.5` 覆盖硬件深度，
 * glPolygonOffset（固定管线、vertex 之后）无法影响它 → polygonOffset 完全失效。
 * 这里用 onBeforeCompile 把 `uniform float uDepthBias` 注入深度编码：
 * 先 `vFragDepth - uDepthBias` 再取对数，使该材质所有片元"看起来更近"，
 * 稳定赢过共面（或接近共面）的其它物体。
 *
 * 注意：
 * - uDepthBias 越大越抗 DEM 插值误差（地形鲁棒），但也会穿透更陡的岩坎；
 *   平面（完全共面）场景可设 0 —— renderOrder 已保证后画者胜。
 * - 只改写深度测试值（gl_FragDepth），不改变顶点位置，渲染位置不受影响。
 *   副产品：矢量是 opaque + 更近深度 → 淡入中的栅格（transparent、depthWrite off）
 *   在矢量像素处深度测试失败被丢弃，淡入期间矢量保持在栅格之上。
 * - 幂等：同一材质只注入一次（共享材质由多瓦片共用）。
 */
export function applyDepthBias(material: THREE.Material, bias: number): void {
  const userData = material.userData as Record<string, unknown>;
  if (userData.__depthBiasApplied) return;

  // 非对数深度路径的后备：polygonOffset 在普通深度缓冲下仍有效。
  // bias=0 时也保留该后备（两处都无害：log 深度下被覆盖，普通深度下生效）。
  material.polygonOffset = true;
  material.polygonOffsetFactor = -1;
  material.polygonOffsetUnits = -1;

  if (bias > 0) {
    const prevOnBeforeCompile = material.onBeforeCompile;

    material.onBeforeCompile = function (
      shader: THREE.WebGLProgramParametersWithUniforms,
      renderer: THREE.WebGLRenderer,
    ) {
      if (prevOnBeforeCompile) {
        prevOnBeforeCompile.call(this, shader, renderer);
      }

      // 能力检查：log depth 相关 chunk 必须存在，否则 uDepthBias 会引用未声明变量。
      // three 大版本升级可能改名/移除 chunk，此时退化为 polygonOffset（非对数路径）。
      if (
        !shader.fragmentShader.includes("#include <logdepthbuf_fragment>") ||
        !shader.fragmentShader.includes("#include <logdepthbuf_pars_fragment>")
      ) {
        warnChunkMissing();
        return;
      }

      // 1. 声明 uniform（chunk 的 include 处无守卫，声明落在声明区顶层）
      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <logdepthbuf_pars_fragment>",
        "#include <logdepthbuf_pars_fragment>\nuniform float uDepthBias;",
      );

      // 2. 覆盖对数深度编码：保留原 chunk（内部自带 USE_LOGDEPTHBUF 守卫），
      //    紧跟一条带守卫的偏置覆盖，log 深度开启时后写者生效。
      //    正交分支保持原样（引擎只用透视相机，但避免破坏通用性）。
      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <logdepthbuf_fragment>",
        `#include <logdepthbuf_fragment>
#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( max( vFragDepth - uDepthBias, 1.0001 ) ) * logDepthBufFC * 0.5;
#endif`,
      );

      shader.uniforms.uDepthBias = { value: bias };
    };

    material.needsUpdate = true;
  }

  userData.__depthBiasApplied = true;
}

let chunkMissingWarned = false;

function warnChunkMissing(): void {
  if (chunkMissingWarned) return;
  chunkMissingWarned = true;
  console.warn(
    "[depthBias] 未找到 `#include <logdepthbuf_pars_fragment>` / " +
      "`#include <logdepthbuf_fragment>` chunk，uDepthBias 注入被跳过，" +
      "仅保留 polygonOffset 后备（可能因 three 大版本升级导致 chunk 改名）。",
  );
}
