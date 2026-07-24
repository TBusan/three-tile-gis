// geo-engine/packages/engine/src/core/Engine.ts

import type { IProjectCRS } from "../crs/IProjectCRS";
import type { ILayer } from "../layer/ILayer";
import { LayerManager, type ILayerGroup } from "../layer/LayerManager";
import type { ITileCache } from "../tile/ITileCache";
import { LRUTileCache } from "../tile/LRUTileCache";
import type { IFloatingOrigin } from "../origin/IFloatingOrigin";
import { FloatingOrigin } from "../origin/FloatingOrigin";
import type { ICameraController } from "../camera/ICameraController";
import { MapCameraController } from "../camera/MapCameraController";
import { TileManager, type TileLoadCallback } from "../manager/TileManager";
import { Tile } from "../tile/Tile";
import type { CrsBounds, CrsCoord } from "./types";

/** Engine 构造配置 */
export interface EngineConfig {
  /** 工程坐标系（必填） */
  crs: IProjectCRS;
  /** DOM 挂载点（必填） */
  container: HTMLElement;
  /** 初始图层组 */
  groups?: ILayerGroup[];
  /** 自定义 Floating Origin */
  floatingOrigin?: IFloatingOrigin;
  /** 自定义 Tile 缓存 */
  tileCache?: ITileCache<Tile>;
  /** 自定义相机控制器 */
  cameraController?: ICameraController;
  /** Tile 加载回调（必填 — 由 Demo 注入） */
  tileLoadFn: TileLoadCallback;
  /** CPU 缓存上限（字节），默认 256MB */
  maxCacheBytes?: number;
}

/**
 * Engine — GIS 引擎顶层入口
 *
 * 组合所有子系统，提供统一的生命周期管理：
 *   1. 每帧更新相机 → 获取视野范围
 *   2. 更新 Floating Origin
 *   3. TileManager 调度加载可见 Tile
 *   4. 淘汰超出缓存的 Tile
 */
export class Engine {
  readonly crs: IProjectCRS;
  readonly layerManager = new LayerManager();
  readonly floatingOrigin: IFloatingOrigin;
  readonly tileManager: TileManager;
  readonly cameraController: ICameraController;

  private readonly _container: HTMLElement;
  private readonly _maxCacheBytes: number;
  private _running = false;
  private _rafId = 0;
  private _lastTime = 0;

  constructor(config: EngineConfig) {
    this.crs = config.crs;
    this._container = config.container;
    this._maxCacheBytes = config.maxCacheBytes ?? 256 * 1024 * 1024;

    this.floatingOrigin =
      config.floatingOrigin ?? new FloatingOrigin({ threshold: 500 });

    this.tileManager = new TileManager(
      config.tileCache ?? new LRUTileCache<Tile>(),
      this.floatingOrigin,
      config.tileLoadFn,
    );

    this.cameraController =
      config.cameraController ?? new MapCameraController();

    // 注册初始图层组
    if (config.groups) {
      for (const group of config.groups) {
        this.layerManager.addGroup(group);
      }
    }
  }

  /** 获取 Tile 缓存（方便外部查询） */
  get tileCache(): ITileCache<Tile> {
    return this.tileManager.cache;
  }

  /** 启动引擎 */
  start(): void {
    if (this._running) return;
    this._running = true;

    this.cameraController.attach(this._container);

    this._lastTime = performance.now();
    this._tick();
  }

  /** 停止引擎 */
  stop(): void {
    this._running = false;
    if (this._rafId) {
      cancelAnimationFrame(this._rafId);
      this._rafId = 0;
    }
    this.cameraController.detach();
  }

  /** 销毁引擎，释放所有资源 */
  dispose(): void {
    this.stop();
    this.tileManager.dispose();
    this.cameraController.dispose();
    this.layerManager.clear();
  }

  // ---- Coordinate conversion (§11) ----

  /**
   * CRS 坐标 → World 坐标（减 Floating Origin）
   *
   * 用于将 CRS 空间坐标转换为场景局部坐标。
   * 所有 Tile Group 的 position 都用此方法计算。
   */
  crsToWorld(coord: CrsCoord): { x: number; y: number; z: number } {
    return {
      x: coord.x - this.floatingOrigin.current.x,
      y: coord.y - this.floatingOrigin.current.y,
      z: coord.z,
    };
  }

  /**
   * World 坐标 → CRS 坐标（加 Floating Origin）
   *
   * 用于将场景局部坐标转换回 CRS 空间坐标。
   */
  worldToCrs(world: { x: number; y: number; z: number }): CrsCoord {
    return {
      x: world.x + this.floatingOrigin.current.x,
      y: world.y + this.floatingOrigin.current.y,
      z: world.z,
    };
  }

  /**
   * 屏幕像素坐标 → CRS 空间坐标
   *
   * 使用正交相机参数做反向映射，用于鼠标点击拾取等场景。
   *
   * @param camera — 正交相机 frustum（left, right, top, bottom）
   * @param pointer — 屏幕像素坐标 (0, 0 = 左上角)
   * @param containerWidth — 容器宽度（像素）
   * @param containerHeight — 容器高度（像素）
   */
  screenToCrs(
    camera: { left: number; right: number; top: number; bottom: number },
    pointer: { x: number; y: number },
    containerWidth: number,
    containerHeight: number,
  ): CrsCoord {
    // 屏幕 → NDC: [0, w]×[0, h] → [-1, 1]×[-1, 1]（Y 翻转 = NDC y-up）
    const ndcX = (pointer.x / containerWidth) * 2 - 1;
    const ndcY = -(pointer.y / containerHeight) * 2 + 1;

    // NDC → World: 线性映射
    const worldX =
      camera.left + ((ndcX + 1) / 2) * (camera.right - camera.left);
    const worldY =
      camera.bottom + ((ndcY + 1) / 2) * (camera.top - camera.bottom);

    return this.worldToCrs({ x: worldX, y: worldY, z: 0 });
  }

  // ---- private ----

  private _tick = (): void => {
    if (!this._running) return;

    const now = performance.now();
    const dt = (now - this._lastTime) / 1000;
    this._lastTime = now;

    // 1. 更新相机
    this.cameraController.update(dt);

    const extent = this.cameraController.extent;
    const cameraPos = this.cameraController.cameraWorldPos;

    // 2. 更新 Floating Origin
    this.floatingOrigin.update(cameraPos);

    // 3. 获取可见图层
    const layers = this.layerManager.getVisibleLayers();

    // 4. TileManager 调度
    this.tileManager.update(
      extent,
      cameraPos,
      this.crs,
      layers,
      this.cameraController.resolution,
    );

    // 5. 淘汰超出缓存的 Tile
    this.tileManager.evict(this._maxCacheBytes);

    this._rafId = requestAnimationFrame(this._tick);
  };
}
