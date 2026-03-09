---
name: "姚晓硕"
title: "技术策划"
email: "yaoxiaos@usc.edu"
github: "https://github.com/XiaoshuoYao"
---

## 教育背景

### 南加州大学 (University of Southern California) — 计算机科学硕士, 游戏开发方向
*洛杉矶, 加州 | 2024年1月 - 2025年12月*

### 加州大学圣地亚哥分校 (University of California, San Diego) — 认知科学理学学士
*圣地亚哥, 加州 | 2018年9月 - 2022年12月*
- 辅修计算机科学, 辅修交互设计

## 项目经历

### UE5 Model Context Protocol 编辑器插件 — *UE5, C++*
*2025年12月 - 至今*
- 从策划开发流程痛点出发，与AI agent配合，设计并实现了嵌入 UE5 编辑器的工具插件，通过 JSON-RPC 2.0 协议暴露 68 个工具接口（12 个功能域），使 AI Agent 能实时查询和操控引擎反射信息、资产、蓝图、材质及结构化数据
- 构建 DataTable/DataAsset 完整 CRUD 操作（含 UScriptStruct Schema 自动推导、行级 UPSERT/DELETE/REPLACE），支持策划通过 AI Agent 直接操作结构化游戏数据而无需编写代码
- 实现蓝图图表提取与编辑系统，支持节点、引脚、连线的完整数据导出及 CDO 默认值修改，集成 Undo/Redo 事务与 dry-run 预览，保障编辑安全性

### Unwaking -- 交互式漫画分格叙事游戏 — *Unity6, C#*
*2025年9月 - 2025年11月*
- 实现屏幕→面板→RenderTexture 像素→世界空间射线的四级坐标转换链，桥接 2D 漫画面板与 3D 世界交互
- 实现视角无关的统一交互层，使 2D 漫画面板与第一人称探索共享同一套世界物体的目标选择、手势识别和动作执行逻辑
- 编写了自定义 URP Renderer Feature 与卡通着色器，实现基于体积的渐进式解锁渲染效果
- 构建了 4 个自定义编辑器工具（场景设置向导、事件日志窗口、世界状态调试器、面板预览），提升团队协作效率，使非程序成员可独立调试和预览内容

### BLUE -- 多人太空飞船建造与战斗游戏 — *UE5, C++*
*2025年6月 - 至今*
- 设计并参与实现了基于有向图（DAG）的模块化飞船建造系统，顶点代表部件、边代表连接关系，支持运行时动态组装/拆卸，玩家可自由创造飞船构型
- 基于 GAS 构建了五状态建造模式状态机（飞行/自由/选中/吸附/删除），每个状态为独立 Ability，通过 GameplayEvent + Tag 驱动状态转换，实现清晰的建造交互流程
- 实现了完整的服务端权威建造确认流程（预览→验证→广播→合并→物理约束），确保多人环境的建造一致性

### Balloon -- 基于物理的气球控制模拟 — *UE5, C++, Lua*
*2025年5月 - 至今*
- 参与设计了 FSM 驱动的基于物理的气球操控，用持续物理力替代运动学控制，使气球在跟随/拖拽时仍受风力、碰撞等环境交互影响，实现有机的游戏手感
- 设计了 DataTable 驱动的教程系统：双 Subsystem 分离流程控制与行为监测，支持多条件 AND/OR 触发逻辑和自定义教学控件，策划可通过 DataTable 配置教程而无需改代码

## 工作经历

### 研究助理 — 明尼苏达大学 & 哈佛大学（USC远程）
*导师: Chen Zhu-Tian, Elena Glassman | 2024年3月 - 2025年3月*
- 合著 [*Sketch Then Generate*](https://arxiv.org/abs/2405.03998)：面向语言的代码草图系统，利用 NLP 技术从自然语言实时生成代码草图作为中间反馈，降低用户与 LLM 协作时的认知负荷

### 研究助理 — 加州大学圣地亚哥分校
*导师: Haijun Xia | 2022年1月 - 2023年8月*
- 合著 [*CrossTalk*](https://arxiv.org/abs/2308.03311)（ACM UIST 2023）：智能视频会议系统，通过语音识别用户意图实现低干扰的上下文感知智能辅助；参与形成性用户研究，识别沟通痛点并转化为产品设计方向

## 技术技能

- **引擎与工具**: Unreal Engine 5 (C++/Blueprint/Lua), Unity (C#/HLSL), URP
- **编程语言**: C++, C#, Lua, Python, TypeScript, JavaScript, HLSL
