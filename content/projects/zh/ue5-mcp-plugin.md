---
title: "UE5 MCP 编辑器插件"
description: "UE5 MCP 服务端插件（68 个工具，12 个功能域）— 设计了工具分类体系和 API 接口，让 AI Agent 获得对引擎状态的一等访问权；实现了五层架构与深度反射系统集成。"
tech: ["Unreal Engine 5", "C++", "JSON-RPC 2.0", "MCP"]
type: "other"
featured: true
date: 2025-08-01
---

## 项目概述

**设计动机**：AI 编程助手可以读写源文件，但对引擎运行时是"盲"的——无法检查 Actor、查询资产元数据、理解蓝图图表。这个插件弥补了这一鸿沟，让 AI Agent 获得与人类开发者在 Editor UI 中相同层级的引擎访问权。

嵌入 UE5 Editor 的本地 HTTP 服务插件，基于 **Model Context Protocol (MCP)** 协议，暴露 **68 个工具接口（12 个功能域）**。设计了**工具分类体系**（68 个工具如何组织为 12 个符合开发者心智模型的功能域）和 **API 契约**（每个工具暴露什么、粒度如何），然后实现了从 HTTP 层到反射引擎的完整技术栈。

---

## 分层架构

### 五层设计

```
L1: HTTP Server（UE 内建 HttpServerModule，端口 8765，自动重试至 8774）
L2: JSON-RPC 2.0 协议层（标准错误码体系，4 种 MCP 方法）
L3: 工具注册表（Schema 驱动，从 JSON 文件加载 5900+ 行工具定义）
L4: 服务层（RuntimeState / ResourceStore / LogBuffer / SnapshotStore / ToolMetrics）
L5: 工具实现层（12 个功能域，68 个工具）
```

### 线程模型

**核心问题**：UE 的反射 API、资产注册表、世界查询等必须在 GameThread 执行，而 HTTP 请求在工作线程到达。

**解决方案**：`RunOnGameThread()` 统一调度——检测当前线程，若已在 GameThread 则直接执行，否则通过 `AsyncTask(ENamedThreads::GameThread)` 派发并使用 `FEvent` 同步等待结果。

共享状态保护使用**快照模式**——加锁拷贝一份快照，后续无锁读取，避免长时间持锁。各服务（LogBuffer、ResourceStore、SnapshotStore、ToolMetrics）各自持有独立的 `FCriticalSection`，避免全局锁争用。

---

## 核心技术亮点

### UE5 反射系统深度运用

基于 UE5 反射系统（UClass/UProperty/UFunction）构建**通用类型内省引擎**：

- **3 种类路径解析策略**：`/Script/Module.ClassName` 直接查找 → `/Game/...` 蓝图软路径加载（含 `_C` 后缀处理）→ 短名称 `TObjectIterator` 线性搜索
- **23+ 种属性类型递归映射**：8 种标量类型、枚举、3 种容器（TArray/TSet/TMap 递归内部类型）、8 种对象引用类型、结构体
- **函数签名提取**：参数方向（in/out/inout）、返回值类型
- **属性标志位白名单过滤**：16 种标志位，13 种元数据键

### 通用属性补丁引擎（PropertyPatchApplier）

接受 JSON 补丁，通过点路径寻址（如 `SpawnConfig.Delay`）定位目标 UProperty 并安全写入：

- **双向转换**：JSON → UProperty 值写入 + UProperty 值 → JSON 读取，覆盖 23+ 种属性类型
- **批量补丁**：单次调用应用多个字段变更，返回每个字段的 old/new 值对比
- **安全机制**：集成 Undo 事务（Modify + MarkPackageDirty），支持 dry-run 预览

### DataTable & DataAsset 完整 CRUD

结构化数据的完整操作：

- **Schema 自动推导**：从 UScriptStruct/UClass 反射信息自动生成 JSON Schema
- **行级操作**：UPSERT、DELETE、REPLACE、RENAME
- **StructJsonConverter**：1,186 行通用结构体 ↔ JSON 转换器，处理所有 UE 属性类型
- **DataAsset 集合操作**：TArray<UStruct> 类型属性的行级 CRUD
- **校验工具**：写入前校验行数据的类型正确性

### 蓝图图表提取与编辑

- **稳定 ID 生成**：优先使用 `PersistentGuid`，回退到 `NodeId:PinName:Direction` 组合键，确保跨编译 ID 不变
- **完整图表达**：节点（位置、类型、标题）→ 引脚（方向、类型、默认值、连接列表）→ 隐式边
- **蓝图编辑**：CDO 默认值修改 + 组件默认值修改 + 自动编译，集成 Undo 事务

### 项目快照系统（SnapshotStore）

- **全量快照构建**：扫描项目中所有资产、类、蓝图、材质
- **元数据/数据分离**：轻量级 `.meta.json` + 完整 `.json` 数据文件
- **LRU 缓存**：内存中最多缓存 3 份快照数据，全量元数据常驻
- **磁盘持久化**：存储在 `{Saved}/UEMCP/Snapshots/`，启动时自动加载元数据
- **增量查询**：支持按资产路径前缀、类名等条件过滤

### 引擎日志捕获（LogBuffer）

- 注册为 `FOutputDevice` 拦截所有引擎日志输出（任何线程）
- **环形缓冲区**：预分配 5,000 条，`WriteIndex % MaxCapacity` 取模索引 O(1) 写入，零动态内存分配
- **多线程安全**：`FCriticalSection` + `FScopeLock` 保护跨 GameThread/RenderThread/AudioThread/TaskGraph 的读写
- **Category 过滤**：`TSet<FName>` O(1) 匹配，逆序遍历 + `Algo::Reverse` 按时间正序输出

### 资源管理与内存控制

- **ResourceStore**：结果超过 `max_result_bytes`（默认 64KB）时自动存储为资源，返回 URI 引用（`ue5mcp://resources/{guid}`）
- **TTL 过期清理**：5 分钟自动淘汰，惰性清理
- **工具指标持久化**：60 秒间隔 + 10 次调用阈值双触发刷盘
