# GeoEngine 研发计划总览

> 设计文档：`doc/设计文档.md` | 需求文档：`doc/需求.md`

## 计划文件

| Phase | 文件 | 目标 | 任务数 |
|-------|------|------|--------|
| Phase 1 | [2026-07-24-phase-1-skeleton.md](2026-07-24-phase-1-skeleton.md) | 骨架跑通：CRS + ProjectTileScheme + GeoTIFF → 屏幕 | Task 1-15 |
| Phase 2 | [2026-07-24-phase-2-xyz-basemap.md](2026-07-24-phase-2-xyz-basemap.md) | XYZ 底图 + 双 TileScheme 混合 | Task 16-23 |
| Phase 3 | [2026-07-24-phase-3-vectors.md](2026-07-24-phase-3-vectors.md) | GeoJSON 矢量 + DXF stub | Task 24-29 |
| Phase 4 | [2026-07-24-phase-4-stubs.md](2026-07-24-phase-4-stubs.md) | PointCloud + GPR stubs | Task 30-36 |
| Phase 5 | [2026-07-24-phase-5-polish.md](2026-07-24-phase-5-polish.md) | 开源项目打磨 | Task 37-42 |

## 总任务统计：42 tasks

## 设计文档 ↔ 任务映射

| 设计文档章节 | 对应 Phase | 对应 Task |
|-------------|-----------|----------|
| §3 CRS 坐标系 | Phase 1 | Task 3 (IProjectCRS + CGCS2000GK), Task 16 (Proj4CRS) |
| §4 TileScheme | Phase 1 + 2 | Task 6 (ProjectTileScheme), Task 17 (XYZTileScheme) |
| §5 Tile/TileManager/TileCache | Phase 1 | Task 4-5 (Tile/TileContent), Task 7 (Cache), Task 13 (TileManager) |
| §6 Layer 系统 | Phase 1 + 3 | Task 11 (RasterLayer/LayerManager), Task 28 (VectorLayer), Task 35 (PointCloudLayer/VolumeLayer) |
| §7 Local/Floating Origin | Phase 1 | Task 8 |
| §8 DataSource | Phase 1 + 2 + 3 + 4 | Task 9 (接口), Task 18 (XYZTile), Task 20 (GeoTIFF), Task 21 (DEM), Task 24 (GeoJSON), Task 27 (DXF stub), Task 31 (PointCloud stub), Task 33 (GPR stub) |
| §9 Worker 策略 | Phase 2+ | (DataSource.fetch 返回 Promise，天然支持 Worker — 不在 Phase 1 强制) |
| §10 Renderer | Phase 1 + 2 + 3 + 4 | Task 12 (RasterRenderer), Task 19 (ReprojectedMesh), Task 21 (DemMesh), Task 26 (VectorRenderer), Task 32 (PointCloud stub), Task 34 (Volume stub) |
| §11 Engine | Phase 1 | Task 14 |
| §12 目录结构 | Phase 1 | Task 1 (脚手架) |
| §13 分阶段实施 | All | 所有 Task |
| §14 复用关系 | N/A | 借鉴 three-tile 的 skirt.ts 和 Martini 算法 |
| §15 GPU 内存管理 | Phase 1 | Task 2 (Disposable), Task 5 (RenderObject.dispose) |
| §16 设计决策 | N/A | 边界澄清已体现在各 Task 实现中 |

## Step-by-step 覆盖度自检

✅ 所有设计文档接口均有对应 Task 实现
✅ 无 "TBD" / "TODO" / "implement later" 占位符
✅ 类型签名在前后 Task 中一致
✅ 所有 stub 统一抛出 NotImplementedError
✅ 每个 Task 有明确的 commit message

---

*Index generated: 2026-07-24*
