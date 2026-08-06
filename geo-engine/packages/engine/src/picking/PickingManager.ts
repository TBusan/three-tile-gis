// geo-engine/packages/engine/src/picking/PickingManager.ts
//
// 鼠标拾取 / 坐标信息能力（GPU RGB 着色器拾取，非 Raycaster）。
//
// 设计契约：
//   - 本模块不拥有 renderer/scene/camera —— 全部由调用方（demo）注入。
//   - 浮点原点契约：场景根 sceneRoot（demo 的 worldRoot）位于 (-origin.x, -origin.y, 0)，
//     相机处于 CRS 帧。拾取帧临时把相机减 offset（sceneRoot 提供时用 -sceneRoot.position，
//     否则用 engine.floatingOrigin.current），与 4 个 demo 的渲染位移一致；crx 换算 =
//     场景帧点 + offset。
//   - pick() 用 GPU 渲染一帧 id 色 + 深度纹理，读回像素反查对象；绝不使用 Raycaster。
//   - getGeoAt() 纯矩阵数学（unproject 近/远点与 z=0 平面求交），零 GPU。
//
// 事件坐标基准：PointerInfo.{x,y} 与 pick/getGeoAt 入参均为「canvas 相对 CSS 像素」。

import * as THREE from "three";
import type { Engine } from "../core/Engine";
import type { CrsCoord } from "../core/types";
import type { Tile } from "../tile/Tile";
import type { TileKey } from "../tile/TileKey";

// ───────────────────────────────────────────────────────────────────────────
// 纯函数（着色器同式；供测试）
// ───────────────────────────────────────────────────────────────────────────

/** 24-bit id → RGB（与 pick 片元着色器同式，浮点数学，GLSL ES 1.0 兼容） */
export function encodeIdToColor(id: number): [number, number, number] {
  return [
    Math.floor(id / 65536.0) % 256,
    Math.floor((id % 65536.0) / 256.0) % 256,
    Math.floor(id % 256.0),
  ];
}

/** RGB → 24-bit id（读回像素解码） */
export function decodeColorToId(r: number, g: number, b: number): number {
  return (r << 16) | (g << 8) | b;
}

/** 设备像素 y（左上原点）→ GL 像素 y（底左原点，readRenderTargetPixels 约定） */
export function deviceYToGLY(deviceY: number, bufferHeight: number): number {
  return bufferHeight - deviceY - 1;
}

/** 设备像素（左上原点）→ 像素中心 NDC（y-up，供 unproject；屏幕上方 = NDC +Y） */
export function deviceToNDC(
  deviceX: number,
  deviceY: number,
  bufferWidth: number,
  bufferHeight: number,
): { x: number; y: number } {
  return {
    x: ((deviceX + 0.5) / bufferWidth) * 2 - 1,
    y: (1 - (deviceY + 0.5) / bufferHeight) * 2 - 1,
  };
}

// ───────────────────────────────────────────────────────────────────────────
// 类型
// ───────────────────────────────────────────────────────────────────────────

/** 像素坐标（canvas 相对 CSS px） */
export interface PointerInfo {
  x: number;
  y: number;
}

/** 拾取结果 */
export interface PickResult {
  /** canvas 相对 CSS px（回显入参） */
  x: number;
  y: number;
  /** 拾取到的渲染对象（背景/空白 → null） */
  object: THREE.Object3D | null;
  /** 所属 Tile（来自 loadedTiles 关联；非瓦片对象 → null） */
  tile: Tile | null;
  tileKey: TileKey | null;
  layerId: string | null;
  /** 命中点 CRS 坐标（z = 地形高程或 0） */
  crs: CrsCoord;
  /** crs.unproject；CRS 不支持反投影时为 null */
  geo: { lon: number; lat: number } | null;
  /** true = 深度重建（曲面精确命中）；false = 地面平面(z=0)回退 */
  isSurfaceHit: boolean;
}

export interface PickingManagerOptions {
  engine: Engine;
  renderer: THREE.WebGLRenderer;
  /** 待拾取场景（demo 的 scene，整棵可拾取） */
  scene: THREE.Scene;
  /** DOM 事件监听挂载点 */
  container: HTMLElement;
  /**
   * 浮点原点根（demo 的 worldRoot）。拾取帧用 -sceneRoot.position 作场景偏移，
   * 免除对 engine.floatingOrigin.current 同步时差的依赖。缺省时回退用
   * floatingOrigin.current（须保证场景已按 -current 偏移，即浮点原点契约）。
   */
  sceneRoot?: THREE.Object3D;
  /**
   * 拾取用相机。必填（ICameraController 抽象不暴露 camera；demo 传
   * mapController.camera）。缺省时尝试从 engine.cameraController 读取 `.camera`。
   */
  camera?: THREE.Camera;
  /** 'move' 节流（ms），默认 80；0 = 不节流 */
  moveThrottleMs?: number;
  /** click 判定移动容差（px），默认 6 */
  clickMoveTolerance?: number;
}

/** 拾取到对象 → 瓦片信息（来自 engine.tileManager.loadedTiles） */
interface TileInfo {
  tile: Tile;
  tileKey: TileKey;
  layerId: string;
}

/** 拾取帧材质交换记录（finally 逆序恢复） */
interface SwapEntry {
  object: THREE.Mesh | THREE.Line | THREE.Points;
  originalMaterial: THREE.Material | THREE.Material[];
  pickMaterial: THREE.Material | THREE.Material[];
}

/** 拾取用相机：需要 updateProjectionMatrix / far 的投影相机 */
type PickableCamera = THREE.PerspectiveCamera | THREE.OrthographicCamera;

// ───────────────────────────────────────────────────────────────────────────
// 着色器
// ───────────────────────────────────────────────────────────────────────────

const PICK_VERT = /* glsl */ `
uniform float u_pointSize;
void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  gl_PointSize = u_pointSize;
}
`;

// 不显式声明 precision：依赖 three 按渲染器能力注入默认精度（桌面默认 highp；
// highp 才能精确编码 24-bit id；显式 highp 在无 highp 片元的极老 GPU 会编译失败）。
const PICK_FRAG = /* glsl */ `
uniform float u_pickId;
void main() {
  float id = u_pickId;
  gl_FragColor = vec4(vec3(
    floor(id / 65536.0),
    floor(mod(id, 65536.0) / 256.0),
    mod(id, 256.0)
  ) / 255.0, 1.0);
}
`;

const DEPTH_QUAD_VERT = /* glsl */ `
void main() {
  gl_Position = vec4(position, 1.0);
}
`;

const DEPTH_QUAD_FRAG = /* glsl */ `
#include <packing>
uniform sampler2D u_depthTexture;
uniform vec2 u_mouse;
uniform float u_near;
uniform float u_far;
void main() {
  // 先按近/远把非线性的窗口深度线性化，再 24-bit 打包：
  // 远处物体窗口深度贴近 1，直接打包会让前导字节饱和（>=0.9961 即 255）
  // 导致解码溢出 >=1、被误判为背景 → 曲面深度重建失效。
  float w = texture2D(u_depthTexture, u_mouse).r;
  float zNdc = w * 2.0 - 1.0;
  float dist = (2.0 * u_near * u_far) / (u_far + u_near - zNdc * (u_far - u_near));
  float lin01 = clamp((dist - u_near) / (u_far - u_near), 0.0, 1.0);
  gl_FragColor = packDepthToRGBA(lin01);
}
`;

// ───────────────────────────────────────────────────────────────────────────
// PickingManager
// ───────────────────────────────────────────────────────────────────────────

export class PickingManager {
  readonly renderer: THREE.WebGLRenderer;
  readonly scene: THREE.Scene;

  private readonly _engine: Engine;
  private readonly _container: HTMLElement;
  private readonly _sceneRoot?: THREE.Object3D;
  private readonly _camera: PickableCamera;
  private readonly _moveThrottleMs: number;
  private readonly _clickMoveTolerance: number;

  private _pickRT: THREE.WebGLRenderTarget | null = null;
  private _depthRT: THREE.WebGLRenderTarget | null = null;
  private _bufferW = 0;
  private _bufferH = 0;
  private _depthSupported: boolean;

  private _quadScene: THREE.Scene | null = null;
  private _quadCamera: THREE.OrthographicCamera | null = null;
  private _quadMaterial: THREE.ShaderMaterial | null = null;

  private _pickMaterialTemplate = new THREE.ShaderMaterial({
    vertexShader: PICK_VERT,
    fragmentShader: PICK_FRAG,
    uniforms: {
      u_pickId: { value: 0 },
      u_pointSize: { value: 8 },
    },
  });

  private _objToInfo = new WeakMap<THREE.Object3D, TileInfo>();

  private readonly _clickHandlers = new Set<(e: PointerInfo) => void>();
  private readonly _moveHandlers = new Set<(e: PointerInfo) => void>();

  private _down: { x: number; y: number } | null = null;
  private _downPointerId: number | null = null;
  private _lastMoveTs = 0;

  constructor(options: PickingManagerOptions) {
    this._engine = options.engine;
    this.renderer = options.renderer;
    this.scene = options.scene;
    this._container = options.container;
    this._sceneRoot = options.sceneRoot;
    this._moveThrottleMs = options.moveThrottleMs ?? 80;
    this._clickMoveTolerance = options.clickMoveTolerance ?? 6;

    const camera = options.camera ?? (options.engine.cameraController as unknown as { camera?: THREE.Camera }).camera;
    if (!camera) {
      throw new Error(
        "PickingManager: camera 必填（ICameraController 抽象不暴露 camera，demo 传 mapController.camera）",
      );
    }
    this._camera = camera as PickableCamera;

    const isWebGL2 = this.renderer.capabilities.isWebGL2;
    const hasDepthTex = this.renderer.extensions.has("WEBGL_depth_texture");
    this._depthSupported = isWebGL2 || hasDepthTex;

    this._container.addEventListener("pointerdown", this._onPointerDown);
    this._container.addEventListener("pointermove", this._onPointerMove);
    window.addEventListener("pointerup", this._onPointerUp);
    window.addEventListener("pointercancel", this._onPointerCancel);
  }

  // ── 公共 API ────────────────────────────────────────────────────────────

  /**
   * 全 GPU 拾取（同步）。x/y 为 canvas 相对 CSS 像素。
   * 越界 / 指向地平线 / 朝上射线 → null。
   */
  pick(x: number, y: number): PickResult | null {
    const device = this._toDevice(x, y);
    if (!device) return null;
    const { dpx, dpy } = device;

    this._ensureTargets();
    this._ensureQuad();
    this._rebuildObjInfo();

    const { idToObject, swapList, hiddenSprites } = this._preparePick();
    const camera = this._camera;
    const offset = this._sceneOffset();

    const prevBackground = this.scene.background;
    const prevClear = this.renderer.getClearColor(new THREE.Color());
    const prevClearAlpha = this.renderer.getClearAlpha();
    const prevAutoClear = this.renderer.autoClear;

    try {
      // 1. 复刻 demo 渲染位移（仅 x/y），并保证投影/世界矩阵新鲜（渲染与 unproject 用同一矩阵）
      camera.position.x -= offset.x;
      camera.position.y -= offset.y;
      camera.updateProjectionMatrix();
      camera.updateMatrixWorld();

      // 2. 渲染 id 色帧到 pickRT
      this.renderer.autoClear = false;
      this.scene.background = null;
      this.renderer.setClearColor(0x000000, 1); // 背景必须解出 id=0（demo 清屏色会解出假 id）
      this.renderer.setRenderTarget(this._pickRT!);
      this.renderer.clear(true, true, false);
      this.renderer.render(this.scene, camera);

      // 3. 读 id 像素（GL 底左原点）
      const glY = deviceYToGLY(dpy, this._pickRT!.height);
      const px = new Uint8Array(4);
      this.renderer.readRenderTargetPixels(this._pickRT!, dpx, glY, 1, 1, px);
      const id = decodeColorToId(px[0], px[1], px[2]);

      // 4. 读深度（深度纹理采样到 1×1 depthRT，quad 内先线性化再 packDepthToRGBA 输出 24-bit 线性深度）
      let depth01 = 1; // 线性深度（0=近 1=远）；无深度纹理能力 → 保持 1 → 地面回退
      if (this._depthSupported) {
        this._quadMaterial!.uniforms.u_depthTexture.value = this._pickRT!.depthTexture;
        (this._quadMaterial!.uniforms.u_mouse.value as THREE.Vector2).set(
          (dpx + 0.5) / this._pickRT!.width,
          (glY + 0.5) / this._pickRT!.height,
        );
        this._quadMaterial!.uniforms.u_near.value = camera.near;
        this._quadMaterial!.uniforms.u_far.value = camera.far;
        this.renderer.setRenderTarget(this._depthRT!);
        this.renderer.clear(true, true, false);
        this.renderer.render(this._quadScene!, this._quadCamera!);
        const d = new Uint8Array(4);
        this.renderer.readRenderTargetPixels(this._depthRT!, 0, 0, 1, 1, d);
        // three 0.168 的 packDepthToRGBA 是 modf 基 256 编码（非旧版 fract 基 255）
        depth01 = d[0] / 256 + d[1] / 65536 + d[2] / 16777216;
      }

      // 5. 世界点：id>0 且深度<1 → 曲面深度重建；否则地面平面回退
      const ndc = deviceToNDC(dpx, dpy, this._pickRT!.width, this._pickRT!.height);
      let worldPoint: THREE.Vector3;
      let isSurfaceHit: boolean;
      if (id > 0 && depth01 < 1) {
        // depth01 是线性深度（quad 已按 near/far 线性化）→ 还原 NDC z 再 unproject
        const dist = camera.near + depth01 * (camera.far - camera.near);
        const zNdc =
          (camera.far + camera.near) / (camera.far - camera.near) -
          (2 * camera.far * camera.near) / ((camera.far - camera.near) * dist);
        worldPoint = new THREE.Vector3(ndc.x, ndc.y, zNdc).unproject(camera);
        isSurfaceHit = true;
      } else {
        const ground = this._groundRayIntersection(ndc.x, ndc.y);
        if (!ground) return null;
        worldPoint = ground;
        isSurfaceHit = false;
      }

      // 6. 组装结果
      const object = idToObject.get(id) ?? null;
      const info = object ? this._objToInfo.get(object) : undefined;
      const crs: CrsCoord = {
        x: worldPoint.x + offset.x,
        y: worldPoint.y + offset.y,
        // 地面回退的 z 精确为 0（浮点求交会有 ~1e-13 误差，须归零）
        z: isSurfaceHit ? worldPoint.z : 0,
      };
      let geo: { lon: number; lat: number } | null = null;
      try {
        geo = this._engine.crs.unproject(crs.x, crs.y);
      } catch {
        geo = null;
      }
      return {
        x,
        y,
        object,
        tile: info?.tile ?? null,
        tileKey: info?.tileKey ?? null,
        layerId: info?.layerId ?? null,
        crs,
        geo,
        isSurfaceHit,
      };
    } finally {
      // 恢复：材质（逆序）、Sprite 可见性、相机、GL 状态、viewport/scissor
      for (let i = swapList.length - 1; i >= 0; i--) {
        const e = swapList[i];
        e.object.material = e.originalMaterial;
      }
      for (const s of hiddenSprites) s.visible = true;

      camera.position.x += offset.x;
      camera.position.y += offset.y;
      camera.updateMatrixWorld();

      this.scene.background = prevBackground;
      this.renderer.autoClear = prevAutoClear;
      this.renderer.setClearColor(prevClear, prevClearAlpha);
      const size = this.renderer.getDrawingBufferSize(new THREE.Vector2());
      this.renderer.setViewport(0, 0, size.x, size.y);
      this.renderer.setScissorTest(false);
      this.renderer.setRenderTarget(null);
    }
  }

  /**
   * 地面平面坐标（零 GPU，纯矩阵数学）。x/y 为 canvas 相对 CSS 像素。
   * 返回 { crs, geo }；越界 / 朝上或平行射线 → null。
   */
  getGeoAt(
    x: number,
    y: number,
  ): { crs: CrsCoord; geo: { lon: number; lat: number } | null } | null {
    const device = this._toDevice(x, y);
    if (!device) return null;

    const camera = this._camera;
    const offset = this._sceneOffset();
    camera.position.x -= offset.x;
    camera.position.y -= offset.y;
    try {
      // getGeoAt 不渲染 → 投影/世界矩阵可能陈旧，必须刷新再 unproject
      camera.updateProjectionMatrix();
      camera.updateMatrixWorld();
      const ndc = deviceToNDC(device.dpx, device.dpy, this._bufferW, this._bufferH);
      const ground = this._groundRayIntersection(ndc.x, ndc.y);
      if (!ground) return null;
      const crs: CrsCoord = {
        x: ground.x + offset.x,
        y: ground.y + offset.y,
        z: 0,
      };
      let geo: { lon: number; lat: number } | null = null;
      try {
        geo = this._engine.crs.unproject(crs.x, crs.y);
      } catch {
        geo = null;
      }
      return { crs, geo };
    } finally {
      camera.position.x += offset.x;
      camera.position.y += offset.y;
      camera.updateMatrixWorld();
    }
  }

  /**
   * 订阅鼠标事件。事件只上报位置 {x, y}（canvas 相对 CSS px）；
   * 具体行为（getGeoAt / pick / 业务逻辑）由外部 handler 自行决定。
   * 返回解绑函数。
   */
  on(type: "click" | "move", handler: (e: PointerInfo) => void): () => void {
    const set = type === "click" ? this._clickHandlers : this._moveHandlers;
    set.add(handler);
    return () => set.delete(handler);
  }

  dispose(): void {
    this._container.removeEventListener("pointerdown", this._onPointerDown);
    this._container.removeEventListener("pointermove", this._onPointerMove);
    window.removeEventListener("pointerup", this._onPointerUp);
    window.removeEventListener("pointercancel", this._onPointerCancel);
    this._clickHandlers.clear();
    this._moveHandlers.clear();

    this._pickRT?.dispose();
    this._depthRT?.dispose();
    this._pickMaterialTemplate.dispose();
    if (this._quadScene) {
      this._quadScene.traverse((o) => {
        if (o instanceof THREE.Mesh) {
          o.geometry.dispose();
          const mat = o.material;
          if (Array.isArray(mat)) for (const m of mat) m.dispose();
          else mat?.dispose();
        }
      });
    }
    this._pickRT = null;
    this._depthRT = null;
  }

  // ── 拾取帧准备 ──────────────────────────────────────────────────────────

  /**
   * 遍历整棵 scene：给 Mesh/Line/Points 分配唯一 id 并换 pick 材质；
   * 隐藏会写颜色进 id 缓冲的非 Mesh/Line/Points 渲染对象（THREE.Sprite）。
   * 先收集完整 swapList 再统一交换，异常时 finally 按列表逆序恢复。
   */
  private _preparePick(): {
    idToObject: Map<number, THREE.Object3D>;
    swapList: SwapEntry[];
    hiddenSprites: THREE.Sprite[];
  } {
    const idToObject = new Map<number, THREE.Object3D>();
    const swapList: SwapEntry[] = [];
    const hiddenSprites: THREE.Sprite[] = [];
    let nextId = 1;

    this.scene.traverse((obj) => {
      if (!obj.visible) return;
      if (
        obj instanceof THREE.Mesh ||
        obj instanceof THREE.Line ||
        obj instanceof THREE.Points
      ) {
        const originalMaterial = obj.material as THREE.Material | THREE.Material[];
        if (!originalMaterial) return;
        const id = nextId++;
        idToObject.set(id, obj);
        // 逐对象克隆：u_pickId uniform 是逐材质全局的，共享实例会让所有对象渲染成同一 id。
        // 克隆共享同一 GPU program，仅 uniforms 独立。
        const makeClone = () => {
          const c = this._pickMaterialTemplate.clone();
          c.uniforms.u_pickId.value = id;
          return c;
        };
        const pickMaterial = Array.isArray(originalMaterial)
          ? originalMaterial.map(() => makeClone())
          : makeClone();
        swapList.push({ object: obj, originalMaterial, pickMaterial });
      } else if (obj instanceof THREE.Sprite) {
        hiddenSprites.push(obj);
      }
    });

    // 统一交换（先收集后交换，finally 逆序恢复）
    for (const e of swapList) e.object.material = e.pickMaterial;
    for (const s of hiddenSprites) s.visible = false;

    return { idToObject, swapList, hiddenSprites };
  }

  /** 重建 对象 → 瓦片信息 关联（遍历 loadedTiles 的 contents.renderObjects） */
  private _rebuildObjInfo(): void {
    const map = new WeakMap<THREE.Object3D, TileInfo>();
    for (const tile of this._engine.tileManager.loadedTiles.values()) {
      for (const content of tile.contents) {
        for (const ro of content.renderObjects) {
          const obj = ro.object;
          if (obj instanceof THREE.Object3D) {
            map.set(obj, { tile, tileKey: tile.key, layerId: content.layerId });
          }
        }
      }
    }
    this._objToInfo = map;
  }

  // ── 几何 / RT ───────────────────────────────────────────────────────────

  private _sceneOffset(): { x: number; y: number } {
    if (this._sceneRoot) {
      return { x: -this._sceneRoot.position.x, y: -this._sceneRoot.position.y };
    }
    const cur = this._engine.floatingOrigin.current;
    return { x: cur.x, y: cur.y };
  }

  private _ensureTargets(): void {
    const size = this.renderer.getDrawingBufferSize(new THREE.Vector2());
    const w = Math.max(1, Math.floor(size.x));
    const h = Math.max(1, Math.floor(size.y));
    if (this._pickRT && (this._pickRT.width !== w || this._pickRT.height !== h)) {
      this._pickRT.dispose();
      this._pickRT = null;
    }
    if (!this._pickRT) {
      this._pickRT = new THREE.WebGLRenderTarget(w, h, {
        depthTexture: new THREE.DepthTexture(w, h),
      });
    }
    if (!this._depthRT) {
      this._depthRT = new THREE.WebGLRenderTarget(1, 1, {
        type: THREE.UnsignedByteType,
      });
    }
    this._bufferW = w;
    this._bufferH = h;
  }

  private _ensureQuad(): void {
    if (this._quadScene) return;
    const material = new THREE.ShaderMaterial({
      vertexShader: DEPTH_QUAD_VERT,
      fragmentShader: DEPTH_QUAD_FRAG,
      uniforms: {
        u_depthTexture: { value: null },
        u_mouse: { value: new THREE.Vector2(0, 0) },
        u_near: { value: 1 },
        u_far: { value: 1000 },
      },
      depthTest: false,
      depthWrite: false,
    });
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    mesh.renderOrder = 1e9;
    mesh.frustumCulled = false; // Object3D 属性（顶点着色器直通 NDC，须禁止视锥剔除）
    // 独立 quadScene：绝不能加进主 scene（depthTest:false + renderOrder:max 会覆盖正常画面）
    const quadScene = new THREE.Scene();
    quadScene.add(mesh);
    this._quadScene = quadScene;
    this._quadCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    this._quadMaterial = material;
  }

  /** 屏幕像素 → 设备像素（越界 → null） */
  private _toDevice(x: number, y: number): { dpx: number; dpy: number } | null {
    if (!this._bufferW || !this._bufferH) this._ensureTargets();
    const pr = this.renderer.getPixelRatio();
    const dpx = Math.floor(x * pr);
    const dpy = Math.floor(y * pr);
    if (dpx < 0 || dpy < 0 || dpx >= this._bufferW || dpy >= this._bufferH) {
      return null;
    }
    return { dpx, dpy };
  }

  /**
   * 近/远点 unproject 构造射线与 z=0 平面求交（纯矩阵数学，非 Raycaster）。
   * 朝上/平行（dir.z >= -1e-6）或交点超远（t > camera.far，指向地平线）→ null。
   * 相机须处于场景帧（已减 offset）。
   */
  private _groundRayIntersection(ndcX: number, ndcY: number): THREE.Vector3 | null {
    const camera = this._camera;
    const v0 = new THREE.Vector3(ndcX, ndcY, 0).unproject(camera);
    const v1 = new THREE.Vector3(ndcX, ndcY, 1).unproject(camera);
    const dir = new THREE.Vector3().subVectors(v1, v0);
    if (dir.z >= -1e-6) return null;
    const t = -v0.z / dir.z;
    if (t < 0 || t > camera.far) return null;
    return v0.addScaledVector(dir, t);
  }

  // ── 事件 ────────────────────────────────────────────────────────────────

  /** 只处理 target 为 canvas（或其内部元素）的指针事件：HUD(pointer-events:none) 穿透后仍是 canvas；按钮等控件 target 是按钮 → 不触发拾取 */
  private _isCanvasTarget(e: Event): boolean {
    const target = e.target as Node | null;
    if (!target) return false;
    return this.renderer.domElement.contains(target);
  }

  private _onPointerDown = (e: PointerEvent): void => {
    if (!this._isCanvasTarget(e)) return;
    this._down = { x: e.clientX, y: e.clientY };
    this._downPointerId = e.pointerId;
  };

  private _onPointerUp = (e: PointerEvent): void => {
    if (e.pointerId !== this._downPointerId) return;
    const down = this._down;
    this._down = null;
    this._downPointerId = null;
    if (!down) return;
    const dx = e.clientX - down.x;
    const dy = e.clientY - down.y;
    // 位移超容差 = 拖拽（OrbitControls 旋转/平移），不判为点击
    if (Math.hypot(dx, dy) > this._clickMoveTolerance) return;
    const info = this._toCanvasPos(e.clientX, e.clientY);
    if (!info) return;
    for (const h of this._clickHandlers) h(info);
  };

  private _onPointerCancel = (e: PointerEvent): void => {
    if (e.pointerId !== this._downPointerId) return;
    this._down = null;
    this._downPointerId = null;
  };

  private _onPointerMove = (e: PointerEvent): void => {
    if (!this._isCanvasTarget(e)) return;
    const now = performance.now();
    if (this._moveThrottleMs > 0 && now - this._lastMoveTs < this._moveThrottleMs) {
      return;
    }
    this._lastMoveTs = now;
    const info = this._toCanvasPos(e.clientX, e.clientY);
    if (!info) return;
    for (const h of this._moveHandlers) h(info);
  };

  /** client 坐标 → canvas 相对 CSS 像素（越界 → null） */
  private _toCanvasPos(clientX: number, clientY: number): PointerInfo | null {
    const rect = this.renderer.domElement.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    if (x < 0 || y < 0 || x > rect.width || y > rect.height) return null;
    return { x, y };
  }
}
