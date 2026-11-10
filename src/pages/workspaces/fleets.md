---
layout: ../../layouts/ContentLayout.astro
title: "Parallel agent sandboxes and browser work (Planned)"
description: "Planned for Smarty Pants workspaces: run several agent sandbox sessions at once, and use a web browser in a workspace. Not available yet."
h1: "Fleets and browser work for agent workspaces (Planned)"
eyebrow: "Agent workspaces"
audience: "buyer"
status: "planned"
primaryKeyword: "parallel agent sandboxes"
keywords: ["parallel agent sandboxes", "run many sandboxes at once", "browser sandbox for ai agents", "agent fleet"]
summary: "Fleets and browser work are Planned for Smarty Pants agent workspaces and are not available today. They will let one account run several workspace sessions at once, and let an agent use a web browser in a workspace. Today, single workspace sessions run on Smarty Pants' own account first, with no network."
published: "2026-11-09"
updated: "2026-11-09"
readingMinutes: 3
faqs:
  - q: "Can I run several Smarty Pants workspaces at once today?"
    a: "No. Fleets are Planned and not available. Today, single workspace sessions run on Smarty Pants' own account first."
  - q: "Can a workspace run a web browser today?"
    a: "No. Workspaces have no network today, and browser work is Planned and not available."
  - q: "What happens to a workspace when the Mac's owner comes back?"
    a: "It ends within 5 seconds, because the owner comes first. Plan for sessions that end early and start them again."
  - q: "How will I know when fleets open?"
    a: "We'll announce it on smartypants.network/docs/agents when it opens."
related: ["/workspaces/", "/workspaces/sessions/", "/workspaces/model-calls/", "/workspaces/snapshots-and-recovery/"]
sources:
  - label: "Smarty Pants: Agent kit (Workspaces)"
    url: "https://smartypants.network/docs/agents"
---

**Planned.** Fleets and browser work are not available today. Fleets will let one account run several workspace sessions at once. Browser work will let an agent open and use web pages in a workspace.

## What is available today and what is Planned?

| Feature | Status |
|---|---|
| A single [workspace session](/workspaces/sessions/), with no network, on Smarty Pants' own account first | Available today |
| Several workspace sessions at once for one job (a fleet) | Planned |
| A web browser inside a workspace | Planned |
| Internet access from a workspace | Planned |

## What is a fleet?

Several workspace sessions running at the same time for one job. For example, an agent splits a test suite into parts, or tries several fixes in parallel, each in its own sealed VM. This is Planned and not available.

## What would browser work mean?

Running a browser inside a workspace so an agent can open and use web pages. It needs internet access, which workspaces do not have today. Both are Planned and not available.

## How should I design for Macs going away?

The same way as for today's sessions. The Mac's owner comes first: if they return, the workspace on that Mac ends within 5 seconds with `OWNER_RETURNED`.

Give each task its own inputs, make each step safe to redo, and collect results as they arrive. [Snapshots and recovery](/workspaces/snapshots-and-recovery/), which will let a workspace continue on another Mac, are Planned and not available.

## What about my data?

The trust model does not change with scale. VM isolation protects each Mac's owner from guest code. It does not keep the guest's files or memory confidential from the Mac's owner. Keep secrets out of every workspace.

## When will fleets open?

There is no date. We'll announce it on smartypants.network/docs/agents when it opens. Until then, read the live [agent docs](https://smartypants.network/docs/agents) and the [workspaces overview](/workspaces/).
