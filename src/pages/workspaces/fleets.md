---
layout: ../../layouts/ContentLayout.astro
title: "Parallel agent sandboxes and browser work (Planned)"
description: "Planned for Smarty Pants workspaces: several agent sandbox sessions at once, and browser work. Measured concurrency on real Macs comes first."
h1: "Fleets and browser work for agent workspaces (Planned)"
eyebrow: "Agent workspaces"
audience: "buyer"
status: "planned"
primaryKeyword: "parallel agent sandboxes"
keywords: ["parallel agent sandboxes", "run many sandboxes at once", "browser sandbox for ai agents", "agent fleet"]
summary: "Fleets and browser work are Planned for Smarty Pants agent workspaces, not available today. The plan is to run several workspace sessions at once and support browser work. Before that opens, Smarty Pants intends to measure how many sessions a Mac can carry, at 1, 2, 4 and 6 at once, on representative Macs, for both build-heavy and mostly-waiting work. Nothing for fleets is built yet."
published: "2026-11-09"
updated: "2026-11-09"
readingMinutes: 4
faqs:
  - q: "Can I run several Smarty Pants workspaces at once today?"
    a: "No. Fleets are Planned. Today, workspace sessions run on Smarty Pants' own account only."
  - q: "Can a workspace run a web browser today?"
    a: "No. Workspaces have no network today, and browser work is Planned."
  - q: "How many sessions will one Mac run?"
    a: "That is not decided. The plan is to measure 1, 2, 4 and 6 sessions at once on representative Macs before setting any limit."
  - q: "What happens to a fleet when Mac owners come back?"
    a: "Each workspace on that Mac ends, because the owner comes first. Plan for sessions that end early and start them again."
  - q: "How will I know when fleets open?"
    a: "We'll announce it on smartypants.network/docs/agents when it opens."
related: ["/workspaces/", "/workspaces/sessions/", "/workspaces/model-calls/", "/workspaces/snapshots-and-recovery/"]
sources:
  - label: "Smarty Pants: Agent kit (Workspaces)"
    url: "https://smartypants.network/docs/agents"
---

**Planned.** Nothing on this page is available today. It describes how Smarty Pants intends to let one account run many workspace sessions in parallel, and to support work that needs a web browser. Today there is one kind of workspace: a single [session](/workspaces/sessions/), on Smarty Pants' own account.

## What is a fleet?

Several workspace sessions running at the same time for one job. For example, an agent splits a test suite into parts, or tries several fixes in parallel, each in its own sealed VM.

## What would browser work mean?

Running a browser inside a workspace so an agent can open and use web pages. That needs internet access, which workspaces do not have today.

Guest internet access is Planned through a filter: the VM would still have no network card, and its traffic would go through a filter that allows listed public sites only and blocks home-network addresses. Browser work would be bound by that filter.

## Why does measured concurrency come first?

Because a Mac lent while idle has limited room, and the owner comes first. Before offering fleets, the plan is to measure real sessions running at once on representative Macs:

| Test | Planned |
|---|---|
| Sessions at once per Mac | 1, 2, 4 and 6 |
| Kinds of work | Build-heavy, and mostly waiting |
| Macs | Representative Apple Silicon Macs |

The plan treats CPU, memory, disk, network and storage as separate limits, each with its own check and its own meter. A Mac would only take another session if every check passes, and it would keep checking that the owner is away, that it is on power, and that it is not too hot or short of memory. How many sessions a Mac takes would come from those measurements, not a guess.

## How would fleets handle Macs going away?

By expecting it. If an owner returns, every workspace on that Mac ends. The plan is to pair fleets with Planned [snapshots and recovery](/workspaces/snapshots-and-recovery/), so a session can continue on another Mac from its last saved checkpoint.

Design for it now: give each parallel task its own inputs, make each step safe to redo, and collect results as they arrive.

## Would models be available to a fleet?

That is also Planned. See [model calls from workspaces](/workspaces/model-calls/): a workspace-scoped key with a budget, and placeholder keys so real keys never enter the VM.

## What is built so far?

Nothing for fleets or browser work. Both depend on sessions being usable and on paid developer use, which come first in the roadmap.

## What about my data?

The trust model does not change with scale. VM isolation protects each Mac's owner from guest code. It does not keep the guest's files or memory confidential from the Mac's owner. A fleet spreads your work across several people's Macs, so keep secrets out of every workspace.

## When will fleets open?

There is no date. We'll announce it on smartypants.network/docs/agents when it opens. Until then, read the live [agent docs](https://smartypants.network/docs/agents) and the [workspaces overview](/workspaces/).
