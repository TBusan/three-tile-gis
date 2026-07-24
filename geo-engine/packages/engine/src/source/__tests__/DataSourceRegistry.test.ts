// geo-engine/packages/engine/src/source/__tests__/DataSourceRegistry.test.ts
import { describe, it, expect } from "vitest";
import { DataSourceRegistry } from "../DataSourceRegistry";
import type { IDataSource } from "../IDataSource";

// Fake DataSource for testing
class FakeSource implements IDataSource<string> {
  dataType = "fake";
  crs: any = { name: "fake", units: "meter" };
  bounds: [number, number, number, number] = [0, 0, 100, 100];

  async fetch() { return "data"; }
  dispose() {}
}

describe("DataSourceRegistry", () => {
  it("should register and retrieve a DataSource ctor", () => {
    // Note: "fake" may already be registered from prior tests
    // Clear or use unique name
    DataSourceRegistry.register("fake-test", FakeSource);
    expect(DataSourceRegistry.has("fake-test")).toBe(true);
    expect(DataSourceRegistry.get("fake-test")).toBe(FakeSource);
  });

  it("should throw on duplicate registration", () => {
    DataSourceRegistry.register("dup-test", FakeSource);
    expect(() =>
      DataSourceRegistry.register("dup-test", FakeSource),
    ).toThrow("already registered");
  });

  it("should return undefined for unregistered name", () => {
    expect(DataSourceRegistry.get("nonexistent")).toBeUndefined();
  });

  it("should list all registered names", () => {
    DataSourceRegistry.register("list-test", FakeSource);
    expect(DataSourceRegistry.list()).toContain("list-test");
  });
});
