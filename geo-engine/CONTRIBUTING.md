# Contributing to @geo-engine/core

## Setup

```bash
git clone <repo-url>
cd geo-engine
npm install
```

## Development

| Command | Description |
|---------|-------------|
| `npm test` | Run all tests (vitest) |
| `npm run test:watch` | Run tests in watch mode |
| `cd packages/demo && npx vite` | Start demo dev server |
| `npx tsc --noEmit` | Type-check without emitting |

## Project Structure

```
geo-engine/
├── packages/
│   ├── engine/src/          # @geo-engine/core library
│   │   ├── core/            # Engine, Disposable, types
│   │   ├── crs/             # Coordinate reference systems
│   │   ├── tile/            # Tile, TileKey, TileScheme, Cache
│   │   ├── manager/         # TileManager, TileScheduler
│   │   ├── origin/          # Floating Origin
│   │   ├── layer/           # Layer interfaces and manager
│   │   ├── source/          # Data sources (GeoTIFF, DEM, GeoJSON, etc.)
│   │   ├── renderer/        # Renderers (Raster, Vector, Volume, PointCloud)
│   │   │   └── quality/     # Geometry quality tiers (Plane, SubdividedPlane, DemMesh, SkirtedMesh)
│   │   ├── worker/          # Web Worker pool + worker scripts
│   │   └── camera/          # Camera controller
│   └── demo/                # Interactive demo (Vite + Three.js)
├── doc/                     # Design documents
└── CONTRIBUTING.md
```

## Architecture Principles

- **Interface-driven design** — depend on interfaces (`ILayer`, `IDataSource`, `IProjectCRS`), not implementations
- **CRS-agnostic** — all spatial data in original engineering coordinates, GPU precision via Floating Origin
- **Tile-based** — data organized by LOD tiles, loaded on demand
- **Pluggable** — DataSource + Renderer + TileScheme compose into Layers

## Testing

- All code must have tests. Run `npx vitest run` before submitting.
- Test files live in `__tests__/` directories next to source files.
- Use `vitest` with `vi.mock` for external dependencies (geotiff, proj4, Three.js).
- Worker-related integration tests may be skipped in Node.js (browser-only).

## Code Style

- TypeScript strict mode (`strict: true`)
- Classes implement interfaces explicitly
- Use `readonly` for immutable properties
- TDD: write failing test → implement → refactor
- Commit messages: `feat:`, `fix:`, `refactor:`, `test:`, `docs:` prefixes

## Adding a New Data Source

1. Implement `IDataSource<T>` interface in `source/`
2. Add tests in `source/__tests__/`
3. If heavy computation needed, add a worker script in `worker/` and use `WorkerPool`
4. Register via `DataSourceRegistry.register()` (automatic in future)

## Adding a New CRS

1. Implement `IProjectCRS` interface in `crs/`
2. Implement `project(lon, lat): CrsCoord` and `unproject(x, y): LonLat`
3. Provide `name`, `units`, and optional `bounds`
4. Add tests verifying round-trip accuracy

## License

MIT
