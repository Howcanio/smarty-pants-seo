---
layout: ../../layouts/ContentLayout.astro
title: "Persistent AI agents that survive host loss (Planned)"
description: "Planned for Smarty Pants workspaces: agents that keep working for days and continue on another Mac if theirs goes away. Not available yet."
h1: "Always-on agents (Planned)"
eyebrow: "Agent workspaces"
audience: "buyer"
status: "planned"
primaryKeyword: "persistent ai agents"
keywords: ["persistent ai agents", "long-running agent sandbox", "scheduled ai agent", "agent that survives host loss"]
summary: "Always-on agents are Planned for Smarty Pants workspaces and are not available today. They will let an agent keep working for days, waking on a schedule or an event, and continue on another Mac if the Mac it runs on goes away. Today a workspace lasts up to 2 hours, and saves with failover let a long run carry on on another Mac."
published: "2026-11-09"
updated: "2026-11-19"
readingMinutes: 3
faqs:
  - q: "Can I run a persistent agent on Smarty Pants today?"
    a: "No. Always-on agents are Planned and not available. Today a workspace lasts up to 2 hours; saves and failover carry a run across Macs."
  - q: "What will always-on agents let me do?"
    a: "Keep an agent working for days, waking on a schedule or an event, and continuing on another Mac if its Mac goes away. This is Planned and not available."
  - q: "How will I know when always-on agents open?"
    a: "We'll announce it on smartypants.network/docs/agents when it opens."
related: ["/workspaces/", "/workspaces/snapshots-and-recovery/", "/workspaces/model-calls/", "/workspaces/sessions/"]
sources:
  - label: "Smarty Pants: Agent kit (Workspaces)"
    url: "https://smartypants.network/docs/agents"
---

**Planned.** Always-on agents are not available today. They will let an agent keep working for days, waking on a schedule or an event, and continue on another Mac if the Mac it runs on goes away.

## What is available today and what is Planned?

| Feature | Status |
|---|---|
| [Workspace sessions](/workspaces/sessions/): up to 2 hours, free on your own Macs | Available today |
| [Save, copy and failover](/workspaces/snapshots-and-recovery/) | Available today |
| An agent that keeps working for days | Planned |
| Batches and jobs on a schedule (`/v1/batch-schedules`, `smartypants job --every`) | Available today |
| A single agent that wakes on any event and runs for days | Planned |

## What does "always on" mean here?

Always recoverable, not always running on one Mac. Owner Macs sleep, travel and get used by their owners, and the owner always comes first. Always-on agents will keep going when one Mac goes away. This is Planned and not available.

## What does this mean for my data?

The trust model is the same as for today's workspaces. VM isolation protects the Mac's owner from guest code. It does not keep the guest's files or memory confidential from the Mac's owner. Do not store secrets or API keys in a workspace.

## What should I use for a long-running agent today?

Split it into jobs of up to 2 hours that save as they go (`--retries`, `autoSave` with failover), and run them on a schedule. For one process that must stay up for days, use a dedicated server.

## When will it open?

There is no date. We'll announce it on smartypants.network/docs/agents when it opens. Until then, read the live [agent docs](https://smartypants.network/docs/agents) and the [workspaces overview](/workspaces/).
