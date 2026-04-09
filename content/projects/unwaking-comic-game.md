---
title: "Unwaking — Interactive Comic Panel Game"
title_zh: "Unwaking — 交互式漫画面板叙事游戏"
description: "A Unity 6 short-form interactive vignette — designed the dual interaction model and comic-panel-as-viewport concept; implemented multi-panel rendering, custom URP toon shader, and event-driven architecture."
description_zh: "基于 Unity 6 + URP 的短篇交互式漫画叙事体验 — 设计了双模式交互模型和「漫画面板即视口」核心概念；实现了多面板渲染、自定义 URP 卡通着色器和事件驱动架构。"
tech: ["Unity 6", "C#", "URP", "Shader"]
download: "https://drive.google.com/file/d/17OX6Jz7a5P54COflkcL1pcUuQNCp04L1/view?usp=sharing"
type: "unity"
featured: true
date: 2025-01-01
---

## Overview

A short-form interactive vignette where you inhabit a weary soul wandering through a monochromatic world of layered ink and manga frames, searching for meaning in their own existence. A compact, 3-minute existential journey designed to be played in a single, quiet sitting.

The core **design concept**: each comic panel is a live viewport into an independent 3D scene, rendered in stark high-contrast ink. Players shift between a distant point-and-click observer and first-person embodied exploration, experiencing a paper-thin reality that bleeds between frames.

**My role**: interaction design and full technical implementation — the dual interaction model, multi-panel rendering, custom shaders, and architecture. Narrative, level design, and art were handled by my teammate.

<video src="/videos/Unwaking/0.mp4" autoplay loop muted playsinline style="width:100%; border-radius:8px; margin:1rem 0;"></video>

---

## Multi-Panel Rendering

Each comic panel is a window into its own 3D scene — independent Camera + RenderTexture per panel, all rendering simultaneously. This creates the core visual identity: a manga page where every panel is a live, interactive viewport.

![Multi-panel city scene with real-time 3D rendering](/photos/Unwaking/0.png)

Key challenges solved:
- **RenderTexture pooling** to manage GPU memory — RTs are pre-allocated and reused across scene transitions instead of creating/destroying per step
- **Four-level coordinate transform** for interaction: screen space → UI canvas → RT texture → world space raycast. This chain must stay precise across different resolutions and panel layouts

---

## Toon Shader & Ink Aesthetic

Built a **custom URP toon shader** to achieve the monochromatic manga look. A companion **outline renderer feature** uses depth + normal edge detection to produce the stark comic-ink line art that defines the game's visual identity.

![Ink-style rendering across panels](/photos/Unwaking/1.png)

---

## Dual Interaction Modes

**Design Decision**: Two play styles serve different narrative moments — contemplative observation vs. embodied exploration — unified under a single interaction framework so switching feels seamless:

- **Point-and-Click**: Mouse maps through the RT coordinate chain to interact with panel contents — a distant, voyeuristic observer perspective
- **First-Person**: Direct embodied exploration, drifting through a paper-thin reality constrained within panel boundaries

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

---

## Gameplay Extension Exploration — Volume-Based Progressive Unlock

An experimental mechanic explored but not shipped in the current build: **volume-based progressive color unlock**. The world starts as line art and fills with color as the player explores — color becomes a narrative reward tied to player agency.

The implementation uses spatial volumes (box, sphere, convex) to define "revealed" regions. The toon shader checks each pixel against active volumes: full color inside, line art outside. As the player moves, new volumes activate and the art progressively comes alive.

This mechanic is designed for longer-form experiences where exploration depth justifies the reveal pacing — a direction for potential future expansion.

![Volume-based progressive color unlock](/photos/Unwaking/Unlock.png)
