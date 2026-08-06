// geo-engine/packages/engine/src/picking/__tests__/PickingManager.test.ts
//
// Node 环境，无 WebGL：真实 PerspectiveCamera / THREE.Mesh + 桩 renderer。
// 桩 renderer 只 stub 渲染管线：render / readRenderTargetPixels / 状态记录。
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import * as THREE from "three";
import { Engine } from "../../core/Engine";
import { Tile } from "../../tile/Tile";
import { TileContent, RenderObject } from "../../tile/TileContent";
import { makeTileKey } from "../../tile/TileKey";
import { PerspectiveMapController } from "../../camera/PerspectiveMapController";
import {
  PickingManager,
  encodeIdToColor,
  decodeColorToId,
  deviceYToGLY,
  deviceToNDC,
  type PickResult,
} from "../PickingManager";

// ───────────────────────────────────────────────────────────────────────────
// 桩：renderer / canvas / container / window
// ───────────────────────────────────────────────────────────────────────────

type ListenerMap = Record<string, Function[]>;

function makeFakeElement() {
  const listeners: ListenerMap = {};
  return {
    listeners,
    addEventListener(type: string, fn: Function) {
      (listeners[type] ||= []).push(fn);
    },
    removeEventListener(type: string, fn: Function) {
      const l = listeners[type];
      if (!l) return;
      const i = l.indexOf(fn);
      if (i >= 0) l.splice(i, 1);
      // 模拟真实 DOM：监听移除后不留空数组痕迹
      if (l.length === 0) delete listeners[type];
    },
  };
}

interface StubRenderer {
  autoClear: boolean;
  domElement: {
    getBoundingClientRect(): {
      left: number;
      top: number;
      width: number;
      height: number;
    };
    contains(n: unknown): boolean;
  };
  capabilities: { isWebGL2: boolean };
  extensions: { has(name: string): boolean };
  _clearColor: THREE.Color;
  _clearAlpha: number;
  calls: string[];
  pickPixel: [number, number, number, number];
  depthPixel: [number, number, number, number];
  pickRead: { x: number; y: number } | null;
}

function makeStubRenderer(opts: {
  width?: number;
  height?: number;
  clearColor?: number;
  clearAlpha?: number;
  depthSupport?: boolean;
} = {}) {
  const {
    width = 800,
    height = 600,
    clearColor = 0x0d1b2a,
    clearAlpha = 1,
    depthSupport = true,
  } = opts;
  const canvas = {
    getBoundingClientRect: () => ({
      left: 0,
      top: 0,
      width,
      height,
      right: width,
      bottom: height,
    }),
    contains: (n: unknown) => n === canvas,
  };
  const renderer: StubRenderer = {
    autoClear: true,
    domElement: canvas as any,
    capabilities: { isWebGL2: depthSupport },
    extensions: { has: () => depthSupport },
    _clearColor: new THREE.Color(clearColor),
    _clearAlpha: clearAlpha,
    calls: [],
    pickPixel: [0, 0, 0, 255],
    depthPixel: [127, 127, 128, 255],
    pickRead: null,
  };
  // 注入 WebGLRenderer 所需方法
  (renderer as any).getPixelRatio = () => 1;
  (renderer as any).getDrawingBufferSize = (target: THREE.Vector2) =>
    target.set(width, height);
  (renderer as any).getClearColor = (color: THREE.Color) =>
    color.copy(renderer._clearColor);
  (renderer as any).getClearAlpha = () => renderer._clearAlpha;
  (renderer as any).setClearColor = (color: unknown, alpha: number) => {
    renderer._clearColor =
      color instanceof THREE.Color ? color : new THREE.Color(color as number);
    renderer._clearAlpha = alpha;
    renderer.calls.push(`clearColor:${renderer._clearColor.getHexString()}`);
  };
  (renderer as any).setViewport = (x: number, y: number, w: number, h: number) => {
    renderer.calls.push(`viewport:${x},${y},${w},${h}`);
  };
  (renderer as any).setScissorTest = (on: boolean) => {
    renderer.calls.push(`scissor:${on}`);
  };
  (renderer as any).setRenderTarget = (rt: THREE.WebGLRenderTarget | null) => {
    renderer.calls.push(`target:${rt ? `${rt.width}x${rt.height}` : "null"}`);
  };
  (renderer as any).clear = () => {
    renderer.calls.push("clear");
  };
  (renderer as any).render = () => {
    renderer.calls.push("render");
  };
  (renderer as any).readRenderTargetPixels = (
    rt: THREE.WebGLRenderTarget | null,
    x: number,
    y: number,
    w: number,
    h: number,
    buf: Uint8Array,
  ) => {
    if (rt && rt.width === 1 && rt.height === 1) {
      buf.set(renderer.depthPixel);
    } else {
      renderer.pickRead = { x, y };
      buf.set(renderer.pickPixel);
    }
  };
  return renderer;
}

// ───────────────────────────────────────────────────────────────────────────
// 辅助：构造 engine / scene / camera / picking
// ───────────────────────────────────────────────────────────────────────────

function makeEngine(
  opts: {
    origin?: { x: number; y: number; z: number };
    loadedTiles?: Map<string, Tile>;
  } = {},
) {
  const {
    origin = { x: 0, y: 0, z: 0 },
    loadedTiles = new Map<string, Tile>(),
  } = opts;
  const engine = {
    crs: {
      name: "test",
      units: "meter",
      project: (lon: number, lat: number) => ({ x: lon, y: lat }),
      unproject: (x: number, y: number) => ({ lon: x, lat: y }),
    },
    floatingOrigin: { current: origin },
    tileManager: { loadedTiles },
  };
  return engine as unknown as Engine;
}

function makeTile(key: { schemeId: string; id: string; level: number }) {
  const tile = new Tile(key, [0, 0, 100, 100], { x: 0, y: 0, z: 0 });
  return tile;
}

/** 注册 mesh 为某 tile 的 content renderObject（返回 tile，mesh 可复用多次） */
function attachToTile(tile: Tile, mesh: THREE.Object3D, layerId: string) {
  const content = new TileContent(`c:${layerId}`, tile.key, layerId);
  content.renderObjects.push(new RenderObject(mesh, () => {}));
  tile.contents.push(content);
}

/** 复算 getGeoAt/pick 地面回退的交点（近/远点 unproject 射线与 z=0 平面求交） */
function groundIntersect(camera: THREE.Camera, ndcX: number, ndcY: number) {
  const v0 = new THREE.Vector3(ndcX, ndcY, 0).unproject(camera);
  const v1 = new THREE.Vector3(ndcX, ndcY, 1).unproject(camera);
  const dir = new THREE.Vector3().subVectors(v1, v0);
  const t = -v0.z / dir.z;
  return v0.addScaledVector(dir, t);
}

// ───────────────────────────────────────────────────────────────────────────

let container: ReturnType<typeof makeFakeElement>;
let fakeWindow: ReturnType<typeof makeFakeElement>;
let renderer: StubRenderer;

beforeEach(() => {
  container = makeFakeElement();
  fakeWindow = makeFakeElement();
  (globalThis as any).window = fakeWindow;
});

afterEach(() => {
  delete (globalThis as any).window;
});

describe("PickingManager 纯函数", () => {
  it("id 编解码往返（0 / 1 / 0xffffff / 随机）", () => {
    const ids = [0, 1, 0x010203, 0xabcdef, 0xffffff, 12345678, 16777215];
    for (const id of ids) {
      const [r, g, b] = encodeIdToColor(id);
      expect(decodeColorToId(r, g, b)).toBe(id);
    }
  });

  it("encodeIdToColor 与片元着色器同式（分量逐字节）", () => {
    const id = 0x12ab7f;
    const [r, g, b] = encodeIdToColor(id);
    expect(r).toBe(0x12);
    expect(g).toBe(0xab);
    expect(b).toBe(0x7f);
  });

  it("deviceYToGLY / deviceToNDC 的 Y 翻转与 readRenderTargetPixels 底左原点一致", () => {
    // 屏幕顶部 → GL 顶行（底左原点下离 y=0 最远）
    expect(deviceYToGLY(0, 600)).toBe(599);
    // 屏幕底部 → GL 底行
    expect(deviceYToGLY(599, 600)).toBe(0);

    // 设备像素(左上原点) → NDC(y-up)：屏幕顶部 → NDC +Y
    const top = deviceToNDC(0, 0, 800, 600);
    expect(top.y).toBeCloseTo((1 - 0.5 / 600) * 2 - 1, 10);
    expect(top.y).toBeGreaterThan(0);
    const bottom = deviceToNDC(0, 599, 800, 600);
    expect(bottom.y).toBeLessThan(0);
    // X 轴不翻转：屏幕左侧 → NDC -X
    expect(deviceToNDC(0, 300, 800, 600).x).toBeLessThan(0);
    expect(deviceToNDC(799, 300, 800, 600).x).toBeGreaterThan(0);
  });
});

describe("PickingManager.pick 控制流（桩 renderer）", () => {
  it("id>0 且深度<1 → 曲面深度重建，返回 object/tile/layerId/crs/geo", () => {
    renderer = makeStubRenderer();
    const scene = new THREE.Scene();
    const mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(1, 1),
      new THREE.MeshBasicMaterial(),
    );
    scene.add(mesh);

    const key = makeTileKey("xyz", "1/1/1", 1);
    const tile = makeTile(key);
    attachToTile(tile, mesh, "basemap");

    const loadedTiles = new Map<string, Tile>();
    loadedTiles.set(tile.id, tile);
    const engine = makeEngine({ loadedTiles });

    const camera = new THREE.PerspectiveCamera(60, 800 / 600, 0.1, 10000);
    camera.up.set(0, 0, 1);
    camera.position.set(0, -1000, 1000);
    camera.lookAt(0, 0, 0);

    const picking = new PickingManager({
      engine,
      renderer: renderer as unknown as THREE.WebGLRenderer,
      scene,
      container: container as any,
      camera,
    });

    // 脚本化：mesh 是场景唯一 Mesh → id=1；深度像素解码 ≈ 0.5
    renderer.pickPixel = [...encodeIdToColor(1), 255] as [number, number, number, number];
    const res = picking.pick(400, 300);
    expect(res).not.toBeNull();

    const r = res as PickResult;
    expect(r.x).toBe(400);
    expect(r.y).toBe(300);
    expect(r.object).toBe(mesh);
    expect(r.tile).toBe(tile);
    expect(r.tileKey).toBe(key);
    expect(r.layerId).toBe("basemap");
    expect(r.isSurfaceHit).toBe(true);

    // Y 翻转：读回 pickRT 用的是底左原点行
    expect(renderer.pickRead?.y).toBe(deviceYToGLY(300, 600));

    // crs = 线性深度 → NDC z 还原再 unproject（offset=0，相机未位移）
    const ndc = deviceToNDC(400, 300, 800, 600);
    const lin01 = 127 / 256 + 127 / 65536 + 128 / 16777216;
    const dist = camera.near + lin01 * (camera.far - camera.near);
    const zNdc =
      (camera.far + camera.near) / (camera.far - camera.near) -
      (2 * camera.far * camera.near) / ((camera.far - camera.near) * dist);
    camera.updateProjectionMatrix();
    camera.updateMatrixWorld();
    const expected = new THREE.Vector3(ndc.x, ndc.y, zNdc).unproject(camera);
    expect(r.crs.x).toBeCloseTo(expected.x, 3);
    expect(r.crs.y).toBeCloseTo(expected.y, 3);
    expect(r.crs.z).toBeCloseTo(expected.z, 3);
    expect(r.geo).toEqual({ lon: r.crs.x, lat: r.crs.y });

    // 恢复：相机位置 / 材质 / 清屏色 / viewport / scissor / target
    expect(camera.position.lengthSq()).toBeCloseTo(1000 * 1000 + 1000 * 1000, 3);
    expect(mesh.material).toBeInstanceOf(THREE.MeshBasicMaterial);
    expect(renderer._clearColor.getHexString()).toBe("0d1b2a");
    expect(renderer._clearAlpha).toBe(1);
    expect(renderer.autoClear).toBe(true);
    expect(renderer.calls).toContain("viewport:0,0,800,600");
    const lastScissor = renderer.calls.filter((c) => c.startsWith("scissor")).at(-1);
    expect(lastScissor).toBe("scissor:false");
    expect(renderer.calls.at(-1)).toBe("target:null");
  });

  it("id=0（背景）→ 地面平面回退，object=null, isSurfaceHit=false", () => {
    renderer = makeStubRenderer();
    const scene = new THREE.Scene();
    const mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(1, 1),
      new THREE.MeshBasicMaterial(),
    );
    scene.add(mesh);

    const engine = makeEngine();
    const camera = new THREE.PerspectiveCamera(60, 800 / 600, 0.1, 10000);
    camera.up.set(0, 0, 1);
    camera.position.set(0, -1000, 1000);
    camera.lookAt(0, 0, 0);

    const picking = new PickingManager({
      engine,
      renderer: renderer as unknown as THREE.WebGLRenderer,
      scene,
      container: container as any,
      camera,
    });

    renderer.pickPixel = [0, 0, 0, 255]; // 背景
    const res = picking.pick(400, 300);
    expect(res).not.toBeNull();
    const r = res as PickResult;
    expect(r.object).toBeNull();
    expect(r.tile).toBeNull();
    expect(r.layerId).toBeNull();
    expect(r.isSurfaceHit).toBe(false);
    expect(r.crs.z).toBe(0);

    // 与文档化地面数学复算一致（像素中心 ≠ 视轴，交点不在严格 (0,0)）
    camera.updateProjectionMatrix();
    camera.updateMatrixWorld();
    const ndc = deviceToNDC(400, 300, 800, 600);
    const expected = groundIntersect(camera, ndc.x, ndc.y);
    expect(r.crs.x).toBeCloseTo(expected.x, 3);
    expect(r.crs.y).toBeCloseTo(expected.y, 3);

    // Y 翻转：屏幕顶部像素 → 更北（crs.y 更大）；若翻转反向则更南
    const top = picking.pick(400, 0) as PickResult;
    expect(top.crs.y).toBeGreaterThan(r.crs.y);
  });

  it("多对象各自唯一 id，克隆材质 u_pickId 独立（不共享 uniform）", () => {
    renderer = makeStubRenderer();
    const scene = new THREE.Scene();
    const mesh1 = new THREE.Mesh(
      new THREE.PlaneGeometry(1, 1),
      new THREE.MeshBasicMaterial({ color: 0xff0000 }),
    );
    const mesh2 = new THREE.Mesh(
      new THREE.PlaneGeometry(1, 1),
      new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
    );
    scene.add(mesh1);
    scene.add(mesh2);

    const key1 = makeTileKey("xyz", "a", 1);
    const key2 = makeTileKey("vec", "b", 1);
    const tile1 = makeTile(key1);
    const tile2 = makeTile(key2);
    attachToTile(tile1, mesh1, "basemap");
    attachToTile(tile2, mesh2, "vector");

    const loadedTiles = new Map<string, Tile>();
    loadedTiles.set(tile1.id, tile1);
    loadedTiles.set(tile2.id, tile2);
    const engine = makeEngine({ loadedTiles });

    const camera = new THREE.PerspectiveCamera(60, 800 / 600, 0.1, 10000);
    camera.up.set(0, 0, 1);
    camera.position.set(0, -1000, 1000);
    camera.lookAt(0, 0, 0);

    const picking = new PickingManager({
      engine,
      renderer: renderer as unknown as THREE.WebGLRenderer,
      scene,
      container: container as any,
      camera,
    });

    // scene.traverse 顺序：mesh1 → mesh2
    renderer.pickPixel = [...encodeIdToColor(1), 255] as [number, number, number, number];
    expect((picking.pick(400, 300) as PickResult).object).toBe(mesh1);
    renderer.pickPixel = [...encodeIdToColor(2), 255] as [number, number, number, number];
    const r2 = picking.pick(400, 300) as PickResult;
    expect(r2.object).toBe(mesh2);
    expect(r2.layerId).toBe("vector");
    expect(r2.tile).toBe(tile2);
  });

  it("sceneRoot 偏移：非零 offset 下屏幕中心仍命中相机 target（验证 offset 符号）", () => {
    renderer = makeStubRenderer();
    const scene = new THREE.Scene();
    const engine = makeEngine();
    const sceneRoot = new THREE.Group();
    sceneRoot.position.set(-100, -200, 0); // offset = (100, 200)

    const camera = new THREE.PerspectiveCamera(60, 800 / 600, 0.1, 10000);
    camera.up.set(0, 0, 1);
    camera.position.set(0, -1000, 1000);
    camera.lookAt(0, 0, 0);

    const picking = new PickingManager({
      engine,
      renderer: renderer as unknown as THREE.WebGLRenderer,
      scene,
      container: container as any,
      sceneRoot,
      camera,
    });

    renderer.pickPixel = [0, 0, 0, 255];
    const res = picking.pick(400, 300) as PickResult;
    expect(res.isSurfaceHit).toBe(false);
    expect(res.crs.z).toBe(0);

    // 复算拾取帧：相机位移 -offset → 场景帧交点，crs = 场景帧 + offset
    const offset = { x: 100, y: 200 };
    camera.position.x -= offset.x;
    camera.position.y -= offset.y;
    camera.updateProjectionMatrix();
    camera.updateMatrixWorld();
    const ndc = deviceToNDC(400, 300, 800, 600);
    const scenePoint = groundIntersect(camera, ndc.x, ndc.y);
    camera.position.x += offset.x;
    camera.position.y += offset.y;
    expect(res.crs.x).toBeCloseTo(scenePoint.x + offset.x, 3);
    expect(res.crs.y).toBeCloseTo(scenePoint.y + offset.y, 3);

    // 相机位置复原（无漂移）
    expect(camera.position.x).toBeCloseTo(0, 6);
    expect(camera.position.y).toBeCloseTo(-1000, 6);
    expect(camera.position.z).toBeCloseTo(1000, 6);
  });
});

describe("PickingManager.getGeoAt（零 GPU 地面数学）", () => {
  it("屏幕中心 → 地面交点与文档化数学一致", () => {
    renderer = makeStubRenderer();
    const scene = new THREE.Scene();
    const ctrl = new PerspectiveMapController({
      center: { x: 0, y: 0 },
      distance: 1000,
      initialPolarAngle: Math.PI / 4,
    });
    ctrl.camera.aspect = 800 / 600;
    const engine = makeEngine();
    const picking = new PickingManager({
      engine,
      renderer: renderer as unknown as THREE.WebGLRenderer,
      scene,
      container: container as any,
      camera: ctrl.camera,
    });
    const r = picking.getGeoAt(400, 300);
    expect(r).not.toBeNull();
    expect(r!.crs.z).toBe(0);

    ctrl.camera.updateProjectionMatrix();
    ctrl.camera.updateMatrixWorld();
    const ndc = deviceToNDC(400, 300, 800, 600);
    const expected = groundIntersect(ctrl.camera, ndc.x, ndc.y);
    expect(r!.crs.x).toBeCloseTo(expected.x, 3);
    expect(r!.crs.y).toBeCloseTo(expected.y, 3);
    expect(r!.geo).toEqual({ lon: r!.crs.x, lat: r!.crs.y });
  });

  it("朝上射线（dir.z ≥ 0）→ null", () => {
    renderer = makeStubRenderer();
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, 800 / 600, 0.1, 10000);
    camera.up.set(0, 1, 0);
    camera.position.set(0, 0, 100);
    camera.lookAt(0, 0, 200); // 视线朝上 +Z
    const engine = makeEngine();
    const picking = new PickingManager({
      engine,
      renderer: renderer as unknown as THREE.WebGLRenderer,
      scene,
      container: container as any,
      camera,
    });
    expect(picking.getGeoAt(400, 300)).toBeNull();
  });

  it("越界坐标 → null", () => {
    renderer = makeStubRenderer();
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, 800 / 600, 0.1, 10000);
    const engine = makeEngine();
    const picking = new PickingManager({
      engine,
      renderer: renderer as unknown as THREE.WebGLRenderer,
      scene,
      container: container as any,
      camera,
    });
    expect(picking.getGeoAt(900, 300)).toBeNull();
    expect(picking.getGeoAt(-1, 300)).toBeNull();
  });
});

describe("PickingManager 事件管线", () => {
  function build() {
    renderer = makeStubRenderer();
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, 800 / 600, 0.1, 10000);
    const engine = makeEngine();
    return { scene, camera, engine };
  }

  function fire(el: { listeners: ListenerMap }, type: string, evt: any) {
    for (const fn of el.listeners[type] ?? []) fn(evt);
  }

  it("click：按下/抬起位移 < 容差 → 回调 {x,y}；拖拽超容差 → 不触发", () => {
    const { scene, camera, engine } = build();
    const picking = new PickingManager({
      engine,
      renderer: renderer as unknown as THREE.WebGLRenderer,
      scene,
      container: container as any,
      camera,
      clickMoveTolerance: 6,
    });
    const clicks: Array<{ x: number; y: number }> = [];
    picking.on("click", (e) => clicks.push(e));

    const canvas = renderer.domElement as any;
    fire(container, "pointerdown", {
      pointerId: 1,
      clientX: 100,
      clientY: 100,
      target: canvas,
    });
    fire(fakeWindow, "pointerup", {
      pointerId: 1,
      clientX: 100,
      clientY: 100,
      target: canvas,
    });
    expect(clicks).toEqual([{ x: 100, y: 100 }]);

    // 拖拽（位移 √(10²+10²) > 6）→ 不判为点击
    fire(container, "pointerdown", {
      pointerId: 2,
      clientX: 100,
      clientY: 100,
      target: canvas,
    });
    fire(fakeWindow, "pointerup", {
      pointerId: 2,
      clientX: 110,
      clientY: 110,
      target: canvas,
    });
    expect(clicks.length).toBe(1);
  });

  it("target 非 canvas（底图切换按钮）→ 不触发", () => {
    const { scene, camera, engine } = build();
    const picking = new PickingManager({
      engine,
      renderer: renderer as unknown as THREE.WebGLRenderer,
      scene,
      container: container as any,
      camera,
    });
    const clicks: unknown[] = [];
    picking.on("click", (e) => clicks.push(e));

    const button = {} as any; // 非 canvas 元素
    fire(container, "pointerdown", {
      pointerId: 1,
      clientX: 100,
      clientY: 100,
      target: button,
    });
    fire(fakeWindow, "pointerup", {
      pointerId: 1,
      clientX: 100,
      clientY: 100,
      target: button,
    });
    expect(clicks.length).toBe(0);
  });

  it("move 节流：首帧触发，紧随其后被去抖；窗口过后恢复", () => {
    const { scene, camera, engine } = build();
    const picking = new PickingManager({
      engine,
      renderer: renderer as unknown as THREE.WebGLRenderer,
      scene,
      container: container as any,
      camera,
      moveThrottleMs: 1000,
    });
    const moves: Array<{ x: number; y: number }> = [];
    picking.on("move", (e) => moves.push(e));
    const canvas = renderer.domElement as any;

    const before = performance.now() - 5000;
    (picking as any)._lastMoveTs = before;
    fire(container, "pointermove", {
      clientX: 200,
      clientY: 200,
      target: canvas,
    });
    expect(moves.length).toBe(1);

    // 紧跟第二次（仍在节流窗口内）→ 被去抖
    fire(container, "pointermove", {
      clientX: 210,
      clientY: 210,
      target: canvas,
    });
    expect(moves.length).toBe(1);

    // 节流窗口过后（重置 _lastMoveTs 到过去）→ 恢复触发
    (picking as any)._lastMoveTs = performance.now() - 5000;
    fire(container, "pointermove", {
      clientX: 220,
      clientY: 220,
      target: canvas,
    });
    expect(moves.length).toBe(2);
    expect(moves[1]).toEqual({ x: 220, y: 220 });
  });

  it("on() 解绑 + dispose() 移除 container/window 监听", () => {
    const { scene, camera, engine } = build();
    const picking = new PickingManager({
      engine,
      renderer: renderer as unknown as THREE.WebGLRenderer,
      scene,
      container: container as any,
      camera,
    });
    const clicks: unknown[] = [];
    const off = picking.on("click", (e) => clicks.push(e));
    const canvas = renderer.domElement as any;

    fire(container, "pointerdown", {
      pointerId: 1,
      clientX: 50,
      clientY: 50,
      target: canvas,
    });
    fire(fakeWindow, "pointerup", {
      pointerId: 1,
      clientX: 50,
      clientY: 50,
      target: canvas,
    });
    expect(clicks.length).toBe(1);

    off(); // 解绑单个 handler
    fire(container, "pointerdown", {
      pointerId: 2,
      clientX: 50,
      clientY: 50,
      target: canvas,
    });
    fire(fakeWindow, "pointerup", {
      pointerId: 2,
      clientX: 50,
      clientY: 50,
      target: canvas,
    });
    expect(clicks.length).toBe(1);

    picking.dispose();
    expect(container.listeners["pointerdown"]).toBeUndefined();
    expect(container.listeners["pointermove"]).toBeUndefined();
    expect(fakeWindow.listeners["pointerup"]).toBeUndefined();
    expect(fakeWindow.listeners["pointercancel"]).toBeUndefined();
  });
});
