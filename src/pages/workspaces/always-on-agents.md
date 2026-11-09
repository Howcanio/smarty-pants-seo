---
layout: ../../layouts/ContentLayout.astro
title: "Persistent AI agents that survive host loss (Planned)"
description: "Planned for Smarty Pants workspaces: persistent agents that wake on a schedule or event and survive a lost Mac through recovery. Design only."
h1: "Always-on agents (Planned)"
eyebrow: "Agent workspaces"
audience: "buyer"
status: "planned"
primaryKeyword: "persistent ai agents"
keywords: ["persistent ai agents", "long-running agent sandbox", "scheduled ai agent", "agent that survives host loss"]
summary: "Always-on agents are Planned for Smarty Pants workspaces, design only, and not available today. The idea: an agent that keeps working for days, waking on a schedule or an event, running briefly in its workspace, saving a checkpoint and going quiet. If its Mac goes away, it continues on another Mac from the last checkpoint. Here, always on means always recoverable, not always running on one Mac."
published: "2026-11-09"
updated: "2026-11-09"
readingMinutes: 4
faqs:
  - q: "Can I run a persistent agent on Smarty Pants today?"
    a: "No. Always-on agents are Planned and only exist as design notes. Today's workspace sessions last up to 30 minutes."
  - q: "Would an always-on agent run on one Mac all the time?"
    a: "No. The plan is for the agent to run in short bursts and exist as a checkpoint between them, so it can move to any free Mac."
  - q: "What happens if the Mac running my agent is lost?"
    a: "Under the plan, the run moves to another Mac, restores the last saved checkpoint and runs again, and the agent is told it is a re-run."
  - q: "Could my agent run the same step twice?"
    a: "Yes. The design promises a wakeup runs at least once, not exactly once, so your agent's outside actions must be safe to repeat."
  - q: "How will I know when always-on agents open?"
    a: "We'll announce it on smartypants.network/docs/agents when it opens."
related: ["/workspaces/", "/workspaces/snapshots-and-recovery/", "/workspaces/model-calls/", "/workspaces/sessions/"]
sources:
  - label: "Smarty Pants: Agent kit (Workspaces)"
    url: "https://smartypants.network/docs/agents"
---

**Planned.** Nothing on this page is available today, and nothing for it is built. It describes the design Smarty Pants intends to follow for agents that keep working for days. Today's [workspace sessions](/workspaces/sessions/) last up to 30 minutes and keep nothing after they end.

## What does "always on" mean here?

Always recoverable, not always running on one Mac. Owner Macs sleep, travel and get used by their owners, and the owner always comes first. So the plan is for an agent to run in short bursts and, between them, exist only as a saved checkpoint and a record on the Smarty Pants site, which needs no Mac at all.

## How would an always-on agent work?

It would wake, run, save and sleep.

1. **Wake.** On a schedule, at a set time, or on an event such as a webhook call. Wakeups are queued on the site, never on a Mac. Wakeups missed while no Mac was free would be combined into one, so an agent does not get a burst of runs when Macs come back.
2. **Place.** The site picks a free Mac using the same checks as today's workspaces: owner away, on power, not too hot, enough memory.
3. **Run.** The Mac restores the agent's latest checkpoint, and the agent does a bounded piece of work. Long work is split into several runs with a checkpoint between them.
4. **Save and sleep.** The agent checkpoints its disk and goes quiet until the next wakeup.

Everything the agent must keep would live on its workspace disk, so the checkpoint carries it.

## How would it survive a lost Mac?

Through Planned [snapshots and recovery](/workspaces/snapshots-and-recovery/). If the Mac running the agent goes quiet, the site marks it lost, that Mac stops on its own clock, and another Mac restores the last saved checkpoint and runs the wakeup again.

The agent would be told it is a re-run, so it can avoid repeating an outside action. The design promises a wakeup runs at least once, never exactly once. Making outside actions safe to repeat is the agent's job.

## What about keys and outside services?

The plan is to use the Planned [model calls](/workspaces/model-calls/) approach: each run gets fresh placeholder keys, and the old ones stop working when the run ends. A copy left on a lost Mac would be useless. Real keys would never enter the VM.

The trust model stays the same: VM isolation protects the Mac's owner, and does not keep the guest's files or memory confidential from the Mac's owner. Do not store secrets on an agent's disk.

## How would it be priced?

Not decided. The design notes suggest the normal CPU price while the agent runs and a storage charge while it sleeps, with runs that fail because of Smarty Pants (a lost Mac or a returning owner) not charged. None of this is set.

## What has to happen first?

Recovery has to work on real Macs. The order in the roadmap is: snapshots and recovery on a second Mac, then agent records and schedules, then placement and restart rules, then webhook wakeups and per-run keys, then a week-long run on Smarty Pants' own account.

## When is a persistent agent here the wrong fit?

When it must hold live state in memory, keep a server running for hours, or act exactly once without help from your own code. Those fit a dedicated server better.

## When will it open?

There is no date. We'll announce it on smartypants.network/docs/agents when it opens. Until then, read the live [agent docs](https://smartypants.network/docs/agents) and the [workspaces overview](/workspaces/).
