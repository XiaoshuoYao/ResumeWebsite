---
title: "BLUE — Multiplayer Spaceship Building & Combat"
title_zh: "BLUE — 多人太空飞船建造与对战"
description: "A UE5 multiplayer sandbox where players modular-build spaceships and fight in 6DoF combat — designed the core gameplay systems (Verb System, Matter System), modular ship graph, and GAS-based build workflow."
description_zh: "UE5 多人太空飞船建造对战沙盒 — 设计了核心玩法系统（动词系统、物质系统）、模块化飞船图结构和基于 GAS 的建造流程。"
tech: ["Unreal Engine 5.7", "C++", "GAS", "Multiplayer"]
type: "other"
featured: true
date: 2025-06-01
---

## Project Video

<iframe width="100%" style="aspect-ratio:16/9; border-radius:8px; margin:1rem 0;" src="https://www.youtube.com/embed/2S5LEavyU5E" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Overview

BLUE is a **multiplayer sandbox game centered on spaceship engineering and combat**. Players rapidly assemble and iterate ship designs using modular parts in an intuitive building system, then bring them into physics-driven 6DoF space battles. During combat, players can re-enter build mode at any time — salvaging, rebuilding, deploying drones and missiles on the fly — turning every engagement into a live design verification and upgrade cycle.

As the **game designer and technical designer**, I was responsible for both the high-level gameplay system design and the technical implementation — from defining the core combat-building loop to choosing the right data structures and networked workflows.

---

## Core Gameplay Design

### Verb System — Intent-Driven Modular Behaviors

**Design Goal**: Let players create complex emergent behaviors (auto-turrets, tracking weapons, guided missiles) from a small set of simple, composable parts.

The Verb System decomposes ship functionality into atomic **behavior modules** mapped to fundamental actions: **See / Aim / Move / Fire / Detect**. Each module does one thing. Players combine these "verb parts" to produce emergent systems:
- **See + Aim + Fire** → auto-turret that acquires and engages targets
- **Detect + Move + Fire** → homing missile
- **See + Aim** → tracking camera / sensor array

This approach keeps the learning curve low (each part is self-explanatory) while enabling deep combinatorial expression — a hallmark of sandbox design.

### Matter System — Unified Physics Rules

**Design Goal**: Replace abstract HP bars with readable, physical damage propagation that creates natural rock-paper-scissors dynamics.

The Matter System governs all damage and system interactions through **three unified physical domains**:
- **Kinetic** — structural impact, penetration, fragmentation
- **Thermal** — heat buildup, radiator management, meltdown cascades
- **Electromagnetic** — power grids, EMP disruption, sensor interference

### Design Philosophy

The overall experience follows two guiding principles:
- **Intuition over realism** — physics feel right but don't punish; players grasp systems through play, not manuals
- **Sandbox over competitive** — encourage unexpected, creative, even absurd ship designs; the fun is in the explosion, the collapse, and the comeback

---

## Modular Ship System — Graph-Based Design

**Design Problem**: How to represent a spaceship made of dynamically assembled parts that can be built, rearranged, and broken apart in real-time?

**Why a Graph, Not a Tree**: Parts can connect on multiple faces in many-to-many relationships — a tree can't express this. I used a graph (DAG) where vertices are parts and edges are connections. This naturally supports:
- Cyclic connections and branching structures
- Automatic fracture detection when a part is destroyed (via connected component analysis — if the graph splits into disconnected subgraphs, the ship physically separates)
- Port-level connections (each part face has named ports for precise attachment)

**Network Sync Strategy**: Since building/dismantling happens at most a few times per second (not per-frame), I chose full replication over incremental sync — simpler to implement, no state inconsistency risks, and the graph is bounded in size. This was a pragmatic trade-off of complexity vs. robustness.

---

## Build Workflow Design

The build confirmation flow was designed to balance **responsive feel** with **multiplayer consistency**:

1. **Client-side preview** — holographic part snaps and aligns instantly (pure local, zero latency)
2. **Server validation** — placement legality check, material cost verification
3. **Authoritative confirmation** — server merges graphs, generates physics constraints, broadcasts to all clients

The holographic preview system gives the player immediate visual feedback, so the RPC round-trip latency becomes imperceptible. Players feel like they're building instantly, while the server maintains authoritative control.

**Two build modes** serve different use cases:
- **Standalone** (from part registry): creates new part, deducts materials, uses pooling for zero-delay response
- **Tracking** (dragging existing part): repositions without material cost

---

## GAS Build State Machine

**Design Problem**: The build mode has 5 distinct states (Flight / Free / Selected / Attaching / Deletion), each with different input handling, visual feedback, and available actions. How to organize this cleanly?

**Why GAS Over Enum+Switch**: I used the Gameplay Ability System not for its networking features (build states are purely local), but for its **architectural benefits**:
- Each state is a self-contained Ability — adding new states doesn't touch existing code
- Built-in event dispatch via GameplayTags eliminates manual event routing
- Input blocking managed through GameplayEffects — activate/deactivate states automatically handles input context
- External systems query state via Tag matching, keeping coupling minimal

**Key boundary design**: GAS handles the "experience layer" (preview, snapping, visual feedback) while all actual state changes (part creation, deletion, graph merging) go through Server RPCs. Clean separation of interaction and authority.

---

## Snap & Attachment System

The attachment algorithm translates mouse input into precise part placement:
- **Voronoi snapping** for position — mouse UV on the target port surface snaps to the nearest valid attachment point
- **4-way roll snapping** with cooldown to prevent jitter
- **Real-time validity feedback** — convex hull boundary + collision overlap checks, with visual indicators showing valid/invalid placement

This was heavily iteration-driven — the snap distances, cooldown timings, and visual feedback were tuned through extensive playtesting.

---

## Ship Fracture & Pooling

When a part is destroyed mid-combat, the graph runs **connected component detection** — if the remaining parts form disconnected subgraphs, the ship physically splits into separate entities. This emergent behavior comes naturally from the graph data structure.

A **pooling system** pre-generates ship instances so rapid building has zero-latency response — important for the flow of combat-building gameplay.
