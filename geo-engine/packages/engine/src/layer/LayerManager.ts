// geo-engine/packages/engine/src/layer/LayerManager.ts

import type { ILayer } from "./ILayer";

/**
 * 图层组 — 组织相关图层，支持批量 visible/opacity 控制
 */
export interface ILayerGroup {
  id: string;
  name: string;
  visible: boolean;
  opacity: number;
  layers: ILayer[];
}

/**
 * 图层管理器
 *
 * 维护图层层次结构（Group > Layer），提供排序和查询。
 * Group 只做组织不影响调度逻辑，Scheduler 看到的是扁平列表。
 */
export class LayerManager {
  private _groups: ILayerGroup[] = [];
  private _layerIndex = new Map<string, ILayer>();

  get groups(): readonly ILayerGroup[] {
    return this._groups;
  }

  addGroup(group: ILayerGroup): void {
    if (this._groups.find((g) => g.id === group.id)) {
      throw new Error(`Group "${group.id}" already exists`);
    }
    this._groups.push(group);
  }

  removeGroup(groupId: string): void {
    const idx = this._groups.findIndex((g) => g.id === groupId);
    if (idx === -1) return;
    const group = this._groups[idx];
    // 清理索引
    for (const layer of group.layers) {
      this._layerIndex.delete(layer.id);
    }
    this._groups.splice(idx, 1);
  }

  addLayerToGroup(layer: ILayer, groupId: string): void {
    const group = this._groups.find((g) => g.id === groupId);
    if (!group) throw new Error(`Group "${groupId}" not found`);

    if (this._layerIndex.has(layer.id)) {
      throw new Error(`Layer "${layer.id}" already exists`);
    }

    group.layers.push(layer);
    this._layerIndex.set(layer.id, layer);
  }

  removeLayer(layerId: string): void {
    for (const group of this._groups) {
      const idx = group.layers.findIndex((l) => l.id === layerId);
      if (idx !== -1) {
        group.layers.splice(idx, 1);
        this._layerIndex.delete(layerId);
        return;
      }
    }
  }

  getLayer(layerId: string): ILayer | undefined {
    return this._layerIndex.get(layerId);
  }

  /**
   * 返回所有可见 Layer，按 zIndex 排序（升序 = 先渲染的在下）
   */
  getVisibleLayers(): ILayer[] {
    const result: ILayer[] = [];
    for (const group of this._groups) {
      if (!group.visible) continue;
      for (const layer of group.layers) {
        if (layer.visible) {
          result.push(layer);
        }
      }
    }
    result.sort((a, b) => a.zIndex - b.zIndex);
    return result;
  }

  /** 上移图层（zIndex + 1），与上方图层交换 */
  moveUp(layerId: string): void {
    const layer = this._layerIndex.get(layerId);
    if (!layer) return;

    const all = this._getAllFlat();
    const idx = all.indexOf(layer);
    if (idx > 0) {
      // 用 zIndex 交换
      const above = all[idx - 1];
      const tmp = layer.zIndex;
      layer.zIndex = above.zIndex;
      above.zIndex = tmp;
    }
  }

  /** 下移图层（zIndex - 1），与下方图层交换 */
  moveDown(layerId: string): void {
    const layer = this._layerIndex.get(layerId);
    if (!layer) return;

    const all = this._getAllFlat();
    const idx = all.indexOf(layer);
    if (idx < all.length - 1) {
      const below = all[idx + 1];
      const tmp = layer.zIndex;
      layer.zIndex = below.zIndex;
      below.zIndex = tmp;
    }
  }

  /** 移动图层到指定 Group */
  moveToGroup(layerId: string, targetGroupId: string): void {
    const layer = this._layerIndex.get(layerId);
    if (!layer) return;

    // 先从原 Group 移除
    for (const group of this._groups) {
      const idx = group.layers.findIndex((l) => l.id === layerId);
      if (idx !== -1) {
        group.layers.splice(idx, 1);
        break;
      }
    }

    // 加入目标 Group
    const targetGroup = this._groups.find((g) => g.id === targetGroupId);
    if (!targetGroup) throw new Error(`Group "${targetGroupId}" not found`);
    targetGroup.layers.push(layer);
  }

  /** 清理所有图层和组 */
  clear(): void {
    this._groups = [];
    this._layerIndex.clear();
  }

  private _getAllFlat(): ILayer[] {
    const result: ILayer[] = [];
    for (const group of this._groups) {
      for (const layer of group.layers) {
        result.push(layer);
      }
    }
    result.sort((a, b) => a.zIndex - b.zIndex);
    return result;
  }
}
