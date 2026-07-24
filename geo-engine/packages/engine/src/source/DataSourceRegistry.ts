// geo-engine/packages/engine/src/source/DataSourceRegistry.ts

import type { IDataSource } from "./IDataSource";

/** DataSource 构造器类型 */
export type DataSourceCtor<T = unknown> = new (
  ...args: any[]
) => IDataSource<T>;

/**
 * DataSource 注册中心
 *
 * 按名称注册 DataSource 实现。用户可扩展自定义格式。
 */
class DataSourceRegistryImpl {
  private readonly _registry = new Map<string, DataSourceCtor>();

  register<T>(name: string, ctor: DataSourceCtor<T>): void {
    if (this._registry.has(name)) {
      throw new Error(
        `DataSource "${name}" is already registered`,
      );
    }
    this._registry.set(name, ctor);
  }

  get<T>(name: string): DataSourceCtor<T> | undefined {
    return this._registry.get(name) as DataSourceCtor<T> | undefined;
  }

  /** 检查是否已注册 */
  has(name: string): boolean {
    return this._registry.has(name);
  }

  /** 返回所有已注册的名称 */
  list(): string[] {
    return Array.from(this._registry.keys());
  }
}

/** 全局单例 */
export const DataSourceRegistry = new DataSourceRegistryImpl();
