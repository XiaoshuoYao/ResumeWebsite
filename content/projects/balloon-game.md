---
title: "Balloon — Physics-Based Balloon Control Game"
title_zh: "Balloon — 物理气球操控模拟游戏"
description: "A UE5 physics balloon game — designed and implemented game feel systems, data-driven tutorials, and interactive UI feedback as a technical designer."
description_zh: "UE5 物理气球操控游戏 — 以技术策划身份设计并实现了手感系统、数据驱动教程和交互式 UI 反馈。"
tech: ["Unreal Engine 5.4", "C++", "Lua", "Blueprint"]
type: "other"
featured: true
date: 2025-03-01
---

## Overview

A physics-based balloon control simulation built with Unreal Engine 5.4. As the technical designer, I was responsible for translating game feel concepts into concrete technical solutions — from the core balloon manipulation system to the tutorial flow and UI feedback.

---

## Balloon Game Feel Design

The central design challenge: how to make a balloon feel "alive" and responsive without sacrificing physics authenticity.

**Design Decision — Force-Driven, Not Kinematic**: Instead of directly controlling balloon position, I used continuous attractive forces so the balloon always remains part of the physics world — wind, collisions, and gravity still affect it even while the player is controlling it. This required careful tuning of damping profiles across four interaction states (Released / FollowCamera / Holding / ReleaseClick) to create distinct tactile feels for each.

**Elliptical Constraint Boundary**: Through playtesting, I found players interact forward/backward more than left/right. This led to an asymmetric elliptical constraint rather than a simple circle — a small design insight that significantly improved control intuitiveness.

**Multi-Layer Feedback Loop**: Game feel isn't just physics — it's the full sensory chain. I designed a layered feedback system where balloon state drives camera effects (bob, roll, FOV), cursor behavior, Niagara particles, and audio simultaneously, giving each interaction a cohesive feel.

---

## Cursor as Core Feedback

A key design insight: in a balloon manipulation game, the cursor **is** the primary feedback channel, not the HUD.

I designed an **18-state cursor system** where each interaction scenario (hover, hold, swipe, reversal, etc.) has its own visual treatment. Two rendering modes — procedural circles for smooth interpolation, and sprite frames for art-driven expression — can be hot-swapped to explore different visual directions.

The cursor also drives **Niagara particles** whose density scales with swipe force, reinforcing the player's sense of control.

---

## Data-Driven Tutorial System

**Problem**: Tutorial steps were initially hardcoded, making iteration slow and requiring programmer involvement for every change.

**Solution**: I built a DataTable-driven tutorial framework where designers can configure everything — trigger conditions, completion conditions, widget types, viewport detection parameters — without touching code. New tutorial steps are added entirely through DataTable rows.

Key design choices:
- **Dual-subsystem architecture** separating behavior detection from flow control, communicating through EventHub — keeping tutorial logic from invading gameplay code
- **AND/OR condition combinators** supporting both "do A then B" and "do either A or B" teaching scenarios
- **Three custom teaching widgets** (text overlay, animated drag demo, PNG sequences) covering different instructional needs

---

## Opening Cinematic

Designed a hybrid cinematic combining physics simulation with Sequencer — the opening uses real physics (constraint fracture, wind forces, NPC AI pickup) rather than pure keyframe animation, making it feel organic and connected to the gameplay world.

---

## Interactive Main Menu

The main menu balloon is physically interactive — players can drag it, and breaking the constraint triggers the game start. This teaches core controls at zero cost before gameplay begins, embodying the principle of "show, don't tell."
