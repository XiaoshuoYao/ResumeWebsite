---
title: "Unwaking — Interactive Comic Panel Game"
title_zh: "Unwaking — 交互式漫画面板叙事游戏"
description: "A Unity 6 interactive comic narrative game with multi-panel rendering, custom URP shaders, and dual interaction modes."
description_zh: "基于 Unity 6 + URP 的交互式漫画面板叙事游戏，实现了多面板渲染、自定义 URP 着色器和双模式交互。"
tech: ["Unity 6", "C#", "URP", "Shader"]
type: "unity"
featured: true
date: 2025-01-01
---

## Overview

An interactive comic panel narrative game built with Unity 6 and URP. Players explore a story told through comic panels that come alive — panels render independent 3D scenes in real-time, and content is progressively revealed as the player interacts and explores.

<video src="/videos/Unwaking/0.mp4" autoplay loop muted playsinline style="width:100%; border-radius:8px; margin:1rem 0;"></video>

---

## Multi-Panel Rendering

Each comic panel is a window into its own 3D scene — independent Camera + RenderTexture per panel, all rendering simultaneously. This creates the core visual identity of the game: a comic page where every panel is a live, interactive viewport.

![Multi-panel city scene with real-time 3D rendering](/photos/Unwaking/0.png)

Key challenges solved:
- **RenderTexture pooling** to manage GPU memory — RTs are pre-allocated and reused across scene transitions instead of creating/destroying per step
- **Four-level coordinate transform** for interaction: screen space → UI canvas → RT texture → world space raycast. This chain must stay precise across different resolutions and panel layouts

---

## Progressive Unlock Rendering

The game's signature visual: the world starts as line art and progressively fills with color as the player explores.

I built a **custom URP toon shader** with volume-based unlock regions. Spatial volumes (box, sphere, convex) define "revealed" areas — the shader checks each pixel against these volumes and renders full color inside, line art outside. As the player moves through the world, new volumes activate and the art progressively comes alive.

![Progressive unlock — panels at different reveal states](/photos/Unwaking/1.png)

A companion **outline renderer feature** handles the line-art look, using depth + normal edge detection for a comic-ink aesthetic.

---

## Dual Interaction Modes

The game supports two play styles with a unified interaction framework:

- **Point-and-Click**: Mouse maps through the RT coordinate chain to interact with panel contents — classic adventure game style
- **First-Person**: Direct embodied exploration with physics-based movement, constrained within panel boundaries

Both modes share an **Affordance system** — a priority-sorted interaction targeting framework with gesture recognition and drag constraints. Switching modes swaps the interaction strategy without changing any gameplay logic.

![Character interaction with dialogue panels](/photos/Unwaking/2.png)

---

## Event-Driven Architecture

To keep systems decoupled across 5 Assembly Definition modules:

- **Custom EventBus** with type-safe pub/sub and exception isolation — systems communicate without direct references
- **WorldState service** with per-key subscriptions — game state changes automatically notify interested systems
- **Service Locator** for lightweight dependency injection, chosen over a full DI framework for simplicity and debuggability

---

## Editor Tooling

Built custom editor tools to accelerate the team's iteration:

- **Scene Setup Wizard** — automates multi-panel scene configuration
- **Event Log Window** — real-time event flow monitoring for debugging
- **WorldState Debugger** — inspect and modify game state at runtime
- **Dialogue Preview** — preview and test dialogue sequences without entering play mode

These tools reflect a core belief: **investing in developer experience pays back through faster iteration**.
