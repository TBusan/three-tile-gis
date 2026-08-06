# 新增鼠标交互功能：GPU 拾取 + 鼠标坐标信息

## Context

用户诉求（原话）：
> "缺少鼠标的相关的功能，比如鼠标的拾取，点击，获取鼠标位置的坐标信息，获取鼠标拾取的物体的信息等相关功能，新增这个鼠标关系功能，尽量先用高性能的rgb着色器拾取的相关方式解决拾取功能，不要使用相机的射线功能。"

两个核心能力：
1. **GPU RGB 着色器拾取**（非 Raycaster）：点击/拾取场景中瓦片 mesh → 返回拾取对象 + 所属 Tile/Layer 信息。
2. **鼠标坐标信息**：鼠标位置 → CRS 坐标 + 经纬度（实时、廉价，不触发 GPU）。

### 架构事实（已探明）

- **Engine 不拥有 renderer/scene**：`Engine.ts` 只管理 `cameraController` / `tileManager` / `layerManager` / `floatingOrigin` / `crs`。渲染循环与 `THREE.WebGLRenderer`/`THREE.Scene`/`worldRoot` 全在 demo 里。
- **场景图**：`scene → worldRoot(position = -origin) → tileGroup(position = tile.origin) → mesh`。mesh 来自 `content.renderObjects[].object`，`content.layerId` 记录所属图层。
- **浮点原点**：demo 渲染时把 `camera.position` 临时减 `-origin`，`worldRoot` 置 `-origin`，渲染后恢复（`webmercator.ts` render 循环第 4 步）。拾取渲染必须复刻同样的位移，才能用 `unproject` 反推场景坐标。
- **Tile/Layer 关联**：mesh 上**没有** userData 标记。但 `engine.tileManager.loadedTiles` 每个 Tile 的 `contents[].renderObjects[].object` 就是场景里同一个对象引用 → 可构建 `WeakMap<Object3D, {tileKey, layerId, tile}>`。零渲染器改动，对所有渲染器自动生效。
- **相机**：`PerspectiveMapController.camera`（`THREE.PerspectiveCamera`，up=+Z，地面=XY 平面）。`Vector3.unproject` 纯矩阵数学，非 Raycaster。
- **CRS**：`IProjectCRS.project/unproject`；`Engine.worldToCrs(world)` 加回浮点原点得到 CRS 坐标。
- **测试**：vitest 在 Node 跑，THREE 纯数学可测（无需 WebGL 上下文），`PerspectiveMapController.test.ts` 已示范。
- **约束**：demo 是 render-on-demand（静止 GPU 空闲）、FPS ≥ 50 → hover 用廉价地面坐标数学，不逐帧 GPU 拾取。

---

## Fix 设计

### 新模块 `src/picking/`

```
geo-engine/packages/engine/src/picking/
  PickingManager.ts      // 核心类
  index.ts               // export
  __tests__/PickingManager.test.ts
```

`src/index.ts` 增加 `export * from "./picking";`

### PickingManager API

```ts
export interface PickingManagerOptions {
  engine: Engine;
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;              // 待拾取场景（demo 的 scene，整棵可拾取）
  container: HTMLElement;          // DOM 事件监听挂载点
  sceneRoot?: THREE.Object3D;      // 浮点原点根（demo 的 worldRoot）：拾取帧用它当前位置作场景偏移，避免依赖 floatingOrigin.current 的同步时差
  camera?: THREE.Camera;           // 默认 engine.cameraController 的 camera（demo 传 mapController.camera）
  moveThrottleMs?: number;         // 'move' 节流，默认 80
  clickMoveTolerance?: number;     // click 判定移动容差，默认 6 px
}

export interface PickResult {
  x: number; y: number;            // canvas 相对 CSS px
  object: THREE.Object3D | null;   // 拾取到的渲染对象（背景/空白 → null）
  tile: Tile | null;               // 所属 Tile（来自 loadedTiles 关联）
  tileKey: TileKey | null;
  layerId: string | null;
  crs: CrsCoord;                   // 命中点 CRS 坐标（x,y + z；z=地形高程或 0）
  geo: { lon: number; lat: number } | null;  // crs.unproject
  isSurfaceHit: boolean;           // true=深度重建（地形精确面）；false=地面平面(z=0)回退
}

export interface PointerInfo { x: number; y: number; }  // canvas 相对 CSS px

export class PickingManager {
  constructor(options: PickingManagerOptions);
  pick(clientX: number, clientY: number): PickResult | null;  // 全 GPU 拾取（同步）
  getGeoAt(clientX: number, clientY: number): { crs: CrsCoord; geo: { lon: number; lat: number } | null } | null; // 地面平面数学，零 GPU
  // 事件只上报位置，具体行为（getGeoAt / pick / 业务逻辑）由外部 handler 自行决定
  on(type: "click" | "move", handler: (e: PointerInfo) => void): () => void;  // 返回解绑函数
  dispose(): void;
}
```

### GPU 拾取流程（`pick()`）

1. **像素坐标**：`renderer.domElement.getBoundingClientRect()` 计算 canvas 相对坐标 × `renderer.getPixelRatio()` → 设备像素 `(dpx, dpy)`；越界返回 null。
2. **RT 尺寸**：与 `renderer.getDrawingBufferSize()` 比对，不一致则 **dispose 旧 pickRT** 后重建 `pickRT = WebGLRenderTarget(w, h, { depthTexture: new DepthTexture(w, h) })`（color=id RGBA8、depth 纹理供深度重建）。`depthRT = WebGLRenderTarget(1, 1, { type: UnsignedByteType })` 持久复用（1×1 颜色目标，供 packDepth 回读）。
3. **ID 分配**：`scene.traverse` 收集 `Mesh|Line|Points`（`visible !== false`）→ `idToObject: Map<number, Object3D>`（id 从 1 起）。**必须遍历整棵 scene**：拾取帧把 scene 原样渲染，若只给子树换 id 材质，其余对象会以原材质把颜色写进 id 缓冲、解出乱码 id 污染结果。重建 `objToInfo: WeakMap<Object3D, {tile, tileKey, layerId}>`：遍历 `engine.tileManager.loadedTiles` 的 `contents[].renderObjects[].object`（非瓦片对象 → 有合法 id 但无 tile/layer 信息）。
4. **材质替换**：**不能共用同一个 ShaderMaterial 实例**——`u_pickId` uniform 是逐材质全局的，共享实例会让所有对象渲染成同一个 id！每个 Mesh/Line/Points **克隆**一个 pick ShaderMaterial 并设各自 id（克隆共享同一 GPU program，仅 uniform 独立）。**先遍历收集完整 swapList**（对象 + 原 material + 克隆 + 原 visible），再统一交换，finally 按列表逆序恢复——防止异常时部分对象残留 pick 材质。保留对象 `renderOrder` 保证跨瓦片遮挡正确。**非 Mesh/Line/Points 但会渲染的对象（`THREE.Sprite`）在拾取帧临时 `visible=false`**，否则会用原材质把颜色写进 id 缓冲污染结果；无 material 的对象（Group/灯光）不动。片元用浮点数学把 id 编码为 RGB（GLSL ES 1.0 无整数位运算，不能用 `>>`）：

   ```glsl
   uniform float u_pickId;   // 不显式声明 precision：依赖 three 按渲染器能力注入默认精度（桌面默认 highp；
                             // highp 才能精确编码 24-bit id，mediump 仅精确到 1024；显式 highp 在无 highp 片元的极老 GPU 会编译失败）
   void main() {
     float id = u_pickId;
     gl_FragColor = vec4(floor(id / 65536.0),
                         floor(mod(id, 65536.0) / 256.0),
                         mod(id, 256.0)) / 255.0;
   }
   ```
   顶点：`gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);` + `gl_PointSize = u_pointSize`（默认 8，保证 Points 可拾取）。一个 ShaderMaterial 对 Mesh/Line/Points 通吃（图元类型由对象类型决定）。`depthTest/depthWrite` 保持默认 true → 深度纹理能记录曲面深度。
5. **渲染拾取帧**（GPU 段全程 try/finally 保证恢复）：场景偏移 `offset = sceneRoot ? {x: -sceneRoot.position.x, y: -sceneRoot.position.y} : {x: engine.floatingOrigin.current.x, y: engine.floatingOrigin.current.y}`；复刻 demo 渲染位移 —— `camera.position.x -= offset.x; camera.position.y -= offset.y`（仅 x,y，与 4 个 demo 一致，z 不动）；保存 `renderer.getClearColor()/getClearAlpha()`、viewport/scissor 状态、**`scene.background`**（若设置了背景色会覆盖清屏色）；`renderer.setRenderTarget(pickRT)`；`scene.background = null`；**`renderer.setClearColor(0x000000, 1); renderer.clear(true, true, false)`**（背景必须解出 id=0——4 个 demo 的清屏色 `0x0d1b2a` 会解出假 id≈86 万；不依赖 autoClear）；`renderer.render(scene, camera);`（保持相机位移状态，供后续 unproject）。
6. **读 ID**：`renderer.readRenderTargetPixels(pickRT, dpx, pickH - dpy - 1, 1, 1, px)`（y 从下往上）→ `id = (px[0]<<16)|(px[1]<<8)|px[2]`。id 0 = 背景。
7. **读深度**：全屏 quad（`Mesh(PlaneGeometry(2,2))` + ShaderMaterial，**`depthTest:false, depthWrite:false, frustumCulled:false, renderOrder:max`**，精度同 pick 材质：不显式声明、依赖 three 注入）放在**独立 `quadScene`**（绝不能加进主 scene——否则正常渲染也会画出）渲染到 `depthRT(1×1)`：**片元用 uniform `u_mouse`（=鼠标 uv，底左原点，与第 6 步 `py` 约定一致）采样** `pickRT.depthTexture` 得窗口深度，用 THREE `packing` 的 `packDepthToRGBA`（24 位，兼容 WebGL1/2）输出，`readRenderTargetPixels` 读回解码 → `depth01`。GPU 无深度纹理能力（无 `WEBGL_depth_texture`/非 WebGL2）→ 跳过本步直接走地面回退。
8. **世界点**（unproject 前先 `camera.updateProjectionMatrix()` + `camera.updateMatrixWorld()`，保证 `projectionMatrixInverse` 与位移后的 `matrixWorld` 新鲜）：
   - `id>0` 且 `depth01<1` → `Vector3(ndcX, ndcY, depth01*2-1).unproject(camera)`（相机仍处于 -origin 位移 → 得到场景帧点），`isSurfaceHit = true`。
   - 否则 → 地面平面回退：相机保持位移，`v0=unproject(ndc,0)`、`v1=unproject(ndc,1)`，射线与 `z=0` 相交（纯数学，非 Raycaster），`isSurfaceHit = false`；**`t<0` 或 `t>camera.far`（指向地平线、交点过远）→ 返回 null**，避免 HUD 显示天文数字坐标。
9. **恢复状态**（finally 内）：还原全部材质；`camera.position.x += origin.x; camera.position.y += origin.y` + `camera.updateMatrixWorld()`；恢复清屏色；**`renderer.setViewport(0,0,drawingBufferSize)` + `setScissorTest(false)`**（quad 把 viewport 改成 1×1，不恢复会让后续主画面只画 1×1！）；`renderer.setRenderTarget(null)`。不触碰 demo 的 `needsRender`，主画面零扰动。
10. **结果**：`crs = { x: scenePoint.x + offset.x, y: scenePoint.y + offset.y, z: scenePoint.z }`（offset 同第 5 步：传 sceneRoot 用 `-sceneRoot.position`，否则用 `floatingOrigin.current`，与 `worldToCrs` 语义一致）；`geo = engine.crs.unproject(crs.x, crs.y)`。`tile/tileKey/layerId` 从 `objToInfo` 查。

### `getGeoAt()`（零 GPU 地面坐标）

相机做同样 -origin 位移（仅 x,y），**先 `camera.updateProjectionMatrix()`（刷新 `projectionMatrixInverse`，getGeoAt 不渲染故矩阵可能陈旧）+ `camera.updateMatrixWorld()`**，`Vector3.unproject` 取近/远两点构造射线，与 `z=0` 平面求交（纯矩阵数学），恢复相机，返回 `{ crs, geo }`。射线平行/朝上（`dir.z >= -1e-6`）→ 返回 null。与 `pick()` 地面回退共用同一实现。`worldToCrs` 只加 origin.x/y、z 直通（已核实）→ 地面命中 `crs.z=0`。

### 事件

- **坐标基准**：`{ x, y }` 为 canvas 相对 CSS 像素（用 `renderer.domElement.getBoundingClientRect()` 计算），与 `container` 尺寸无关；`pick/getGeoAt` 内部再 × `getPixelRatio()` 得设备像素。
- **target 过滤**：只处理 `e.target` 为 canvas（或 canvas 内元素）的指针事件——`pointer-events:none` 的 HUD 面板穿透后 target 仍是 canvas（拾取生效）；底图切换按钮等 `pointer-events:auto` 的 DOM 控件 target 是按钮（不触发地图拾取）。
- `on("click")`：`pointerdown`（绑 container）记起点，`pointerup`/`pointercancel`（**绑 window**，防止松开发生在浏览器外丢事件）位移 < `clickMoveTolerance` 判定为点击 → 回调 `{ x, y }`（区分点击 vs OrbitControls 左键旋转拖拽）。
- `on("move")`：`pointermove`（绑 container）节流 `moveThrottleMs` → 回调 `{ x, y }`。**行为不写死**：外部 handler 自行选择调用 `getGeoAt(x, y)`（廉价地面坐标，零 GPU）或 `pick(x, y)`（完整 GPU 拾取）。demo 默认用 `getGeoAt` 满足「高性能」约束。`dispose()` 移除全部 container/window 监听。

### Demo 集成（webmercator + terrain）

两个 demo 的 `terrain.html`/`webmercator.html` HUD 面板加一行：
```html
<div>鼠标: <span id="pick-pos">—</span></div>
<div>拾取: <span id="pick-info">—</span></div>
```
TS 中（演示「能力由外部接线」的用法）：
```ts
const picking = new PickingManager({
  engine, renderer, scene,
  container: app, camera,
});
picking.on("move", (e) => {
  const r = picking.getGeoAt(e.x, e.y); // 外部自行决定：廉价坐标
  pick-pos.textContent = r ? `${r.crs.x.toFixed(1)}, ${r.crs.y.toFixed(1)}  [${r.geo?.lon.toFixed(5)}, ${r.geo?.lat.toFixed(5)}]` : "—";
});
picking.on("click", (e) => {
  const r = picking.pick(e.x, e.y); // 外部自行决定：完整 GPU 拾取
  pick-info.textContent = r?.object ? `${r.layerId} ${r.tileKey ? tileKeyToString(r.tileKey) : ""} z=${r.crs.z.toFixed(1)}m` : "无";
});
```
- `webmercator.ts`：平面 + 矢量叠加 → 演示瓦片/矢量对象拾取。
- `terrain.ts`：地形 DEM → 演示深度重建的曲面命中（`crs.z` 为地形高程）。

### 已知限制 / 行为说明
- **淡入中的瓦片**：拾取材质不透明，点击半透明淡入中的瓦片会返回该瓦片（透明度忽略）。可接受。
- **地平线方向**：`getGeoAt/pick` 地面回退在指向地平线时交点距离趋近无穷 → 用 `t>camera.far` 判定为 null，避免 HUD 显示天文数字坐标。
- **细线/文字/精灵**：WebGL1 线宽恒 1px；`THREE.Sprite` 在拾取帧被隐藏（防污染 id 缓冲）故不可拾取 → 可能点不中细线/精灵；用 `getGeoAt()` 兜底。
- **浮点原点契约**：`pick/getGeoAt` 假定「场景根 sceneRoot（demo 的 worldRoot）位于 (-origin.x,-origin.y,0)、相机处于 CRS 帧」，拾取时临时把相机减 offset（传 sceneRoot 用其 position、否则用 floatingOrigin.current）复刻 4 个 demo 的位移（已核实 `crsToWorld/worldToCrs` 均只处理 x/y、z 直通）。传 sceneRoot 可免除对 floatingOrigin.current 同步时差的依赖；这是新增的**文档化契约**，未来 demo 若改位移方式需同步。
- **`material.visible=false` 的对象**：拾取帧换成不透明 pick 材质后仍会被渲染（只有对象级 `visible=false` 才跳过）→ 用材质隐藏的对象会被误拾取。demo 不用此方式；文档化。
- **深度 z 精度**：深度 24-bit，近处亚米级、数十公里远处可达米级误差；地图拾取可接受。

---

## 测试（`src/picking/__tests__/PickingManager.test.ts`）

Node 环境，无 WebGL；用真实 `PerspectiveCamera`/`THREE.Mesh` 与**桩 renderer**（只 stub `render`/`setRenderTarget`/`readRenderTargetPixels`/`getDrawingBufferSize`）。

1. **ID 编解码往返**：暴露纯函数 `encodeIdToColor(id)` / `decodeColorToId(r,g,b)`（与着色器同式），0、1、0xffffff、随机 id 往返一致。
2. **对象→信息 WeakMap**：构造假 Tile（`contents[].renderObjects[].object = 真实 Mesh`），`_buildObjInfo()` 后查回 `tileKey/layerId/tile` 正确；非瓦片对象查回 undefined。
3. **像素/NDC 与 Y 翻转**：纯函数 `clientToDevice` + `deviceYToGL`（与 `readRenderTargetPixels` 底左原点约定一致）→ 屏幕顶部映射到 GL 顶部、底部↔底部一致；越界 clamp/返回 null。
4. **`getGeoAt` 地面数学**：`PerspectiveMapController` 已知中心 + 真实 `PerspectiveCamera`；屏幕中心 → 命中 CRS ≈ 相机 target；屏幕边缘方向正确（近/远射线方向与 z=0 求交，无 WebGL）；朝上射线 → null。
5. **`pick()` 控制流（桩 renderer 脚本化像素）**：桩 renderer 的 `readRenderTargetPixels` 对 `pickRT` 返回脚本化 id 像素、对 `depthRT` 返回脚本化深度 → 断言 PickResult 的 `object/tileKey/layerId/crs/geo/isSurfaceHit` 全部正确；id=0（背景）→ `object=null` 且 `isSurfaceHit=false`（地面回退）。**多对象分配各自唯一 id（克隆材质 `u_pickId` 独立，非共享 uniform）；场景中瓦片对象与普通对象并存 → 都获得合法 id 互不污染**。
6. **状态恢复**：pick 后相机 position、材质、`renderer` 的 clearColor/clearAlpha/viewport/scissor 全部恢复原值（桩 renderer 记录 `setViewport/setClearColor/setRenderTarget/setScissorTest` 调用序列）→ 防浮点原点与 GL 状态泄漏污染主渲染。
7. **事件管线**：用假 `container` + 假 `window`（记录监听）→ pointerdown/pointerup 位移 < 容差才回调 `click`；**`target` 非 canvas 的指针事件被过滤**（模拟点底图切换按钮不触发拾取）；多次 pointermove 按节流去抖；`on()` 解绑 + `dispose()` 移除 window 监听。

---

## 验证

1. `cd geo-engine/packages/engine && npx vitest run` — 全绿（新增 + 既有 ~395）。
2. `cd geo-engine/packages/engine && npx tsc --noEmit`。
3. `cd geo-engine/packages/demo && npx tsc --noEmit`。
4. 浏览器（dev server 5174 / webmercator.html + terrain.html）：
   - 鼠标移动 → HUD 实时显示 CRS + 经纬度（不卡顿，静止时 GPU 空闲）。
   - 点击底图瓦片 → 显示 `basemap-*` + tileKey；点击矢量点/线/面 → 显示 `vector-*` 与对象。
   - **Y 翻转**：鼠标移到屏幕顶端 → HUD 经纬度应偏北、点击拾取应命中画面顶部的瓦片（而非南边）——验证 client↔GL 像素翻转一致。
   - terrain demo 点击山体 → `z` 为地形高程（深度重建），区别于地面 0。
   - 拖拽旋转/平移期间点击不误触发 click 拾取；FPS ≥ 50。

## 涉及文件
- `geo-engine/packages/engine/src/picking/PickingManager.ts`（新，核心）
- `geo-engine/packages/engine/src/picking/index.ts`（新）
- `geo-engine/packages/engine/src/picking/__tests__/PickingManager.test.ts`（新）
- `geo-engine/packages/engine/src/index.ts`（+`export * from "./picking"`）
- `geo-engine/packages/demo/src/webmercator.ts` + `webmercator.html`（拾取 HUD）
- `geo-engine/packages/demo/src/terrain.ts` + `terrain.html`（拾取 HUD + 地形曲面命中）
