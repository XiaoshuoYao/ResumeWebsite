---
name: "Xiaoshuo Yao"
title: "Technical Designer"
email: "yaoxiaos@usc.edu"
github: "https://github.com/XiaoshuoYao"
---

## Education

### University of Southern California — M.S. in Computer Science, Game Development
*Los Angeles, CA | Jan 2024 - Dec 2025*

### University of California, San Diego — B.S. in Cognitive Science
*San Diego, CA | Sep 2018 - Dec 2022*
- Minor in Computer Science, Minor in Interactive Design

## Projects

### UE5 Model Context Protocol Editor Plugin — *UE5, C++*
*Dec 2025 - Present*
- Designed and implemented a UE5 editor tool plugin that exposes 68 tool interfaces (12 functional domains) via JSON-RPC 2.0 protocol, enabling AI Agents to query and manipulate engine reflection data, assets, blueprints, materials, and structured data in real-time
- Built complete CRUD operations for DataTable/DataAsset (including automatic UScriptStruct Schema inference, row-level UPSERT/DELETE/REPLACE), allowing designers to manipulate structured game data via AI Agent without writing code
- Implemented blueprint graph extraction and editing system supporting full data export of nodes, pins, and connections with CDO default value modification, integrated Undo/Redo transactions and dry-run preview for editing safety

### Unwaking -- Interactive Comic Panel Narrative Game — *Unity6, C#*
*Sep 2025 - Nov 2025*
- Implemented a four-level coordinate conversion chain (Screen → Panel → RenderTexture pixel → World-space ray), bridging 2D comic panel and 3D world interaction
- Implemented a view-independent unified interaction layer, enabling 2D comic panels and first-person exploration to share the same target selection, gesture recognition, and action execution logic for world objects
- Wrote custom URP Renderer Feature and toon shader implementing volume-based progressive unlock rendering effects
- Built 4 custom editor tools (scene setup wizard, event log window, world state debugger, panel preview) to improve team collaboration and allow non-programmer members to independently debug and preview content

### BLUE -- Multiplayer Spaceship Building & Combat Game — *UE5, C++*
*Jun 2025 - Present*
- Designed and co-implemented a DAG-based modular spaceship building system where vertices represent parts and edges represent connections, supporting runtime dynamic assembly/disassembly for free-form ship construction
- Built a five-state building mode state machine (Flight/Free/Selected/Snap/Delete) based on GAS, with each state as an independent Ability driven by GameplayEvent + Tag transitions for clear building interaction flow
- Implemented complete server-authoritative building confirmation pipeline (Preview → Validate → Broadcast → Merge → Physics Constraint), ensuring building consistency in multiplayer environments

### Balloon -- Physics-Based Balloon Control Simulation — *UE5, C++, Lua*
*May 2025 - Present*
- Co-designed FSM-driven physics-based balloon controls using continuous physical forces instead of kinematic control, allowing balloons to be affected by wind, collisions, and other environmental interactions during follow/drag states for organic game feel
- Designed a DataTable-driven tutorial system with dual Subsystems separating flow control and behavior monitoring, supporting multi-condition AND/OR trigger logic and custom teaching widgets, enabling designers to configure tutorials via DataTable without code changes

## Experience

### Research Assistant — University of Minnesota & Harvard University (Remote from USC)
*Advisors: Chen Zhu-Tian, Elena Glassman | Mar 2024 - Mar 2025*
- Co-authored [*Sketch Then Generate*](https://arxiv.org/abs/2405.03998): A language-oriented code sketching system that leverages NLP to generate code sketches from natural language in real-time as intermediate feedback, reducing cognitive load during user-LLM collaboration

### Research Assistant — University of California, San Diego
*Advisor: Haijun Xia | Jan 2022 - Aug 2023*
- Co-authored [*CrossTalk*](https://arxiv.org/abs/2308.03311) (ACM UIST 2023): An intelligent video conferencing system that uses speech recognition to identify user intent for low-disruption context-aware intelligent assistance; participated in formative user studies to identify communication pain points and translate them into product design directions

## Skills

- **Engines & Tools**: Unreal Engine 5 (C++/Blueprint/Lua), Unity (C#/HLSL), URP
- **Languages**: C++, C#, Lua, Python, TypeScript, JavaScript, HLSL
