---
title: "UE5 MCP Editor Plugin"
title_zh: "UE5 MCP 编辑器插件"
description: "A UE5 MCP server plugin (68 tools, 12 domains) — designed the tool taxonomy and API surface to give AI agents first-class access to engine state, then implemented the five-layer architecture with deep reflection integration."
description_zh: "UE5 MCP 服务端插件（68 个工具，12 个功能域）— 设计了工具分类体系和 API 接口，让 AI Agent 获得对引擎状态的一等访问权；实现了五层架构与深度反射系统集成。"
tech: ["Unreal Engine 5", "C++", "JSON-RPC 2.0", "MCP"]
type: "other"
featured: true
date: 2025-08-01
---

## Overview

**Design Motivation**: AI coding assistants can read and write source files, but they are blind to the engine runtime — they can't inspect live actors, query asset metadata, or understand blueprint graphs. This plugin bridges that gap by giving AI agents the same level of engine access that a human developer has through the Editor UI.

A plugin embedded in the UE5 Editor that implements a **Model Context Protocol (MCP) server** via local HTTP, exposing **68 tool interfaces across 12 functional domains**. I designed the **tool taxonomy** (how 68 tools are organized into 12 domains that match developer mental models) and the **API contract** (what each tool exposes, at what granularity), then implemented the full stack from HTTP layer to reflection engine.

---

## Architecture

### Five-Layer Design

```
L1: HTTP Server (UE built-in HttpServerModule, port 8765, auto-retry to 8774)
L2: JSON-RPC 2.0 Protocol Layer (standard error codes, 4 MCP methods)
L3: Tool Registry (Schema-driven, 5900+ lines tool definitions from JSON)
L4: Service Layer (RuntimeState / ResourceStore / LogBuffer / SnapshotStore / ToolMetrics)
L5: Tool Implementation Layer (12 domains, 68 tools)
```

### Threading Model

**Core problem**: UE's reflection APIs, asset registry, and world queries must execute on the GameThread, but HTTP requests arrive on worker threads.

**Solution**: `RunOnGameThread()` unified dispatch — detects current thread; if already on GameThread, executes directly; otherwise dispatches via `AsyncTask(ENamedThreads::GameThread)` and synchronously waits using `FEvent`.

Shared state protection uses the **snapshot pattern** — lock, copy a snapshot, then read lock-free — avoiding long lock holds. Each service (LogBuffer, ResourceStore, SnapshotStore, ToolMetrics) holds an independent `FCriticalSection` to avoid global lock contention.

---

## Core Technical Highlights

### UE5 Reflection System Deep Integration

Built a **universal type introspection engine** on top of UE5's reflection system (UClass/UProperty/UFunction):

- **3 class path resolution strategies**: `/Script/Module.ClassName` direct lookup → `/Game/...` Blueprint soft path loading (with `_C` suffix handling) → short name `TObjectIterator` linear search
- **23+ property types** recursively mapped: 8 scalar types, enums, 3 containers (TArray/TSet/TMap with recursive inner types), 8 object reference types, structs
- **Function signature extraction**: parameter direction (in/out/inout), return types
- **Property flag whitelist filtering**: 16 flag types, 13 metadata keys

### Property Patch Engine (PropertyPatchApplier)

A generic engine that accepts JSON patches and applies them to any UObject property through dot-path addressing (e.g., `SpawnConfig.Delay`):

- **Bidirectional conversion**: JSON → UProperty value write + UProperty value → JSON read, covering 23+ property types
- **Batch patching**: Single call applies multiple field changes, returns old/new value comparison for each field
- **Safety**: Integrated with Undo transactions (Modify + MarkPackageDirty), supports dry-run preview

### DataTable & DataAsset CRUD

Complete structured data operations:

- **Schema auto-derivation** from UScriptStruct/UClass reflection information
- **Row-level operations**: UPSERT, DELETE, REPLACE, RENAME
- **StructJsonConverter**: 1,186-line universal struct ↔ JSON converter handling all UE property types
- **DataAsset collection operations**: TArray<UStruct> fields treated as "collections" with row-level CRUD
- **Validation tool**: Pre-write type correctness validation

### Blueprint Graph Extraction & Editing

- **Stable ID generation**: Prioritizes `PersistentGuid`, falls back to `NodeId:PinName:Direction` composite key for cross-compilation stability
- **Complete graph representation**: Nodes (position, type, title) → Pins (direction, type, defaults, connections) → implicit edges
- **Blueprint editing**: CDO default value modification + component default modification + automatic compilation, with Undo transaction integration

### Project Snapshot System (SnapshotStore)

- **Full snapshot building**: Scans all project assets, classes, blueprints, and materials
- **Metadata/data separation**: Lightweight `.meta.json` + full `.json` data files
- **LRU cache**: Max 3 snapshots in memory, all metadata resident
- **Disk persistence**: Stored in `{Saved}/UEMCP/Snapshots/`, auto-loads metadata on startup
- **Incremental queries**: Filter by asset path prefix, class name, etc.

### Engine Log Capture (LogBuffer)

- Registered as `FOutputDevice` to intercept all engine log output from any thread
- **Ring buffer**: Pre-allocated 5,000 entries, `WriteIndex % MaxCapacity` modulo indexing for O(1) writes, zero dynamic allocation
- **Thread-safe**: `FCriticalSection` + `FScopeLock` protecting writes and reads across GameThread/RenderThread/AudioThread/TaskGraph workers
- **Category filtering**: `TSet<FName>` for O(1) channel matching, reverse traversal with `Algo::Reverse` for chronological output

### Resource Management

- **ResourceStore**: Results exceeding `max_result_bytes` (64KB default) auto-stored as resources, returning URI references (`ue5mcp://resources/{guid}`) for on-demand retrieval
- **TTL expiry**: 5-minute auto-eviction with lazy cleanup
- **ToolMetrics persistence**: Dual-trigger flush (60s interval + 10 call threshold)

---

## Key Metrics

| Metric | Value |
|--------|-------|
| Tool Count | 68 |
| Functional Domains | 12 |
| C++ Code | 15,000+ lines |
| JSON Schema | 5,900+ lines |
| Property Types | 23+ (with recursive containers) |
| Service Components | 5 |
| Log Buffer Capacity | 5,000 entries |
| Resource TTL | 5 minutes |
| Snapshot LRU Cache | 3 entries |
| Default Port | 8765 (auto-retry to 8774) |
