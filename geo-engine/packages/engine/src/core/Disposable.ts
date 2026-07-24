// geo-engine/packages/engine/src/core/Disposable.ts

export abstract class Disposable {
  private _disposed = false;

  get disposed(): boolean {
    return this._disposed;
  }

  abstract dispose(): void;

  protected markDisposed(): void {
    this._disposed = true;
  }

  protected assertNotDisposed(): void {
    if (this._disposed) {
      throw new Error(`[${this.constructor.name}] Object already disposed.`);
    }
  }
}
