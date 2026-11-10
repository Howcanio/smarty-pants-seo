---
layout: ../../layouts/ContentLayout.astro
title: "Sandbox snapshots and recovery for agents (Planned)"
description: "Planned for Smarty Pants workspaces: save a workspace and continue it on another Mac if its Mac goes away. Not available yet. What works today."
h1: "Snapshots and recovery for agent workspaces (Planned)"
eyebrow: "Agent workspaces"
audience: "buyer"
status: "planned"
primaryKeyword: "sandbox snapshots"
keywords: ["sandbox snapshots", "agent sandbox recovery", "workspace checkpoint", "restore sandbox on another machine"]
summary: "Snapshots and recovery are Planned for Smarty Pants agent workspaces and are not available today. They will let you save a workspace and continue it on another Mac if the Mac it runs on goes away. Today, a workspace session keeps nothing after it ends, and if the Mac's owner returns the workspace ends within 5 seconds."
published: "2026-11-09"
updated: "2026-11-09"
readingMinutes: 3
faqs:
  - q: "Can I snapshot a Smarty Pants workspace today?"
    a: "No. Snapshots and recovery are Planned and not available. Today, a workspace keeps nothing after it ends."
  - q: "What will snapshots and recovery let me do?"
    a: "Save a workspace, and continue it on another Mac if the Mac it runs on goes away. This is Planned and not available."
  - q: "What should I do today if a workspace ends early?"
    a: "Start a new session, put the inputs back and redo the last step. Keep each step short and safe to redo."
  - q: "How will I know when snapshots open?"
    a: "We'll announce it on smartypants.network/docs/agents when it opens."
related: ["/workspaces/", "/workspaces/sessions/", "/workspaces/always-on-agents/", "/guides/ai-agent-sandboxes-explained/"]
sources:
  - label: "Smarty Pants: Agent kit (Workspaces)"
    url: "https://smartypants.network/docs/agents"
---

**Planned.** Snapshots and recovery are not available today. They will let you save a workspace and continue it on another Mac if the Mac it runs on goes away.

## What is available today and what is Planned?

| Feature | Status |
|---|---|
| [Workspace sessions](/workspaces/sessions/): one sealed VM for many commands and files, up to 30 minutes, on Smarty Pants' own account first | Available today |
| Files kept after a workspace ends | Not available. Nothing is kept after it ends. |
| Save a workspace as a snapshot | Planned |
| Continue a workspace on another Mac if its Mac goes away | Planned |

## Why would a workspace need recovery?

Because workspaces run on Macs that owners lend while idle, and the owner comes first. Today, if the owner returns, the workspace ends within 5 seconds with `OWNER_RETURNED`, and the work in it is gone. Recovery is Planned so that a workspace can continue on another Mac instead of starting over.

## What should I do today?

Design your agent so a lost workspace costs little:

- Keep each command short and safe to redo.
- Fetch files you need as soon as a step produces them.
- Make outside actions safe to repeat.
- On `OWNER_RETURNED`, start a new session, put the inputs back and redo the last step.

## What does this mean for my data?

The trust model applies today and will not change. VM isolation protects the Mac's owner from guest code. It does not keep the guest's files or memory confidential from the Mac's owner. Do not put secrets in a workspace.

## When will snapshots open?

There is no date. We'll announce it on smartypants.network/docs/agents when it opens. Until then, read the live [agent docs](https://smartypants.network/docs/agents) and the [workspaces overview](/workspaces/).
