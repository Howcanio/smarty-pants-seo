---
layout: ../../layouts/ContentLayout.astro
title: "Agent sandbox: Smarty Pants agent workspaces"
description: "An agent sandbox on Apple Silicon Macs: one sealed Linux VM per workspace for many commands and files. What works today and what is Planned."
h1: "Agent sandbox: workspaces for AI agents on Apple Silicon Macs"
eyebrow: "Agent workspaces"
audience: "buyer"
status: "invite"
primaryKeyword: "agent sandbox"
keywords: ["agent sandbox", "cloud sandbox for ai agents", "ai agent workspace", "sandbox for ai agents", "code execution sandbox"]
summary: "A Smarty Pants agent workspace keeps one sealed Linux VM open on an Apple Silicon Mac so an AI agent can write files, run several programs and read results back, then end it. Sessions run on Smarty Pants' own account first and are not charged while tested. Snapshots, model calls, fleets, always-on agents, filtered internet access and a CLI or SDK are Planned. The Mac's owner always comes first."
published: "2026-11-09"
updated: "2026-11-09"
readingMinutes: 5
faqs:
  - q: "Can I use Smarty Pants agent workspaces today?"
    a: "Not from your own account yet. Workspace sessions run on Smarty Pants' own account first and are not charged while tested; everything else on this page is Planned."
  - q: "Does a workspace have internet access?"
    a: "No. Today the VM has no network. Internet access through a filter that allows listed public sites only and blocks home-network addresses is Planned."
  - q: "Are my files in a workspace confidential?"
    a: "No. VM isolation protects the Mac's owner from guest code, but it does not keep the guest's files or memory confidential from the Mac's owner. Do not put secrets in a workspace."
  - q: "What happens if the Mac's owner comes back?"
    a: "The owner comes first. If they return, the workspace ends within 5 seconds and the request reports OWNER_RETURNED."
  - q: "How is a workspace different from a CPU job?"
    a: "A CPU job runs one short program and is wiped. A workspace keeps one VM open for many commands and files, for up to 30 minutes."
related: ["/workspaces/sessions/", "/workspaces/snapshots-and-recovery/", "/workspaces/model-calls/", "/workspaces/fleets/", "/workspaces/always-on-agents/", "/cpu/", "/guides/ai-agent-sandboxes-explained/"]
sources:
  - label: "Smarty Pants: Agent kit (Workspaces, Run code on a Mac)"
    url: "https://smartypants.network/docs/agents"
---

An agent sandbox is a place where an AI agent can run code, keep files and try things without touching your own machine. Smarty Pants agent workspaces put that sandbox in a sealed Linux VM on an Apple Silicon Mac that its owner makes available when idle. This page says what works today, what is Planned, and what the trust model means for what you put inside.

## What is a Smarty Pants workspace?

One sealed VM kept open so your agent can write files, run several programs and read results back, then end it. Files live until the workspace ends; nothing is kept after.

The VM is ARM64 Linux with no network. The starter kits wrap it as `sp.workspace()`, and the API has routes to create a session, run commands, move files and end it. Details and limits are on [workspace sessions](/workspaces/sessions/).

## What works today and what is Planned?

Only sessions exist today, and only on Smarty Pants' own account. Every other piece is on the roadmap and labeled Planned.

| Piece | Status today | What it is |
|---|---|---|
| [Sessions](/workspaces/sessions/) | Our own account first, not charged while tested | One sealed VM for many commands and small files, up to 30 minutes |
| [Snapshots and recovery](/workspaces/snapshots-and-recovery/) | Planned | Disk-only snapshots; restore on another Mac after a host is lost |
| [Model calls](/workspaces/model-calls/) | Planned | Call Smarty Pants models from inside a workspace with a workspace-scoped key and budget |
| [Fleets and browser work](/workspaces/fleets/) | Planned | Several sessions at once, and browser work |
| [Always-on agents](/workspaces/always-on-agents/) | Planned | Persistent agents that survive a host loss through recovery |
| Internet through a filter | Planned | Listed public sites only; home-network addresses blocked |
| CLI and SDK | Planned | Tools for paid developer use (today there are one-file starter kits) |

For one-off code with no files, [CPU jobs](/cpu/) run a single program for up to 30 seconds.

## What does the trust model mean for my data?

The VM protects the Mac's owner from your code. It does not hide your files or memory from the Mac's owner. So do not put secrets, keys, personal, customer or regulated data in a workspace.

Workspaces run on Macs other people own. VM isolation protects the owner from guest code. But the person who owns the Mac controls the hardware the VM runs on, so the guest's contents are not confidential from them. Choose workloads accordingly: public code, test data, throwaway work.

## Why does the Mac's owner come first?

Because these are people's own computers, lent while idle. If the owner comes back, the workspace ends within 5 seconds and the request says `OWNER_RETURNED`.

Plan for that. Keep each command short enough to redo, and fetch results you need before the next step. Planned [snapshots and recovery](/workspaces/snapshots-and-recovery/) aim to let a workspace continue on another Mac from its last saved checkpoint.

## When is a Smarty Pants workspace the wrong choice?

When you need internet access, long-running work, large files, x86 tools or guaranteed capacity today. Sessions have no network, files up to 8 KB, and 30 minutes at most.

A hosted sandbox service on dedicated servers is the better choice for those needs right now. Smarty Pants workspaces fit small, self-contained agent tasks where the code and data are fine to run on someone else's Mac.

## How do I follow what opens next?

Read the live [agent docs](https://smartypants.network/docs/agents). We'll announce it on smartypants.network/docs/agents when each piece opens. For background on sandboxes in general, see [AI agent sandboxes explained](/guides/ai-agent-sandboxes-explained/).
