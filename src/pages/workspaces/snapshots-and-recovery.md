---
layout: ../../layouts/ContentLayout.astro
title: "Sandbox snapshots and recovery for agents (Planned)"
description: "Planned for Smarty Pants workspaces: disk-only snapshots and restoring a workspace on another Mac after a host is lost. Not available yet."
h1: "Snapshots and recovery for agent workspaces (Planned)"
eyebrow: "Agent workspaces"
audience: "buyer"
status: "planned"
primaryKeyword: "sandbox snapshots"
keywords: ["sandbox snapshots", "agent sandbox recovery", "workspace checkpoint", "restore sandbox on another machine"]
summary: "Snapshots and recovery are Planned for Smarty Pants agent workspaces, not available today. The plan: save the workspace disk as checkpoints, never memory or running processes, and if a Mac is lost, restore the last acknowledged checkpoint on another Mac and continue from there. The snapshot format and checkpoint store are in development, tested offline only, and not connected to any live workspace."
published: "2026-11-09"
updated: "2026-11-09"
readingMinutes: 4
faqs:
  - q: "Can I snapshot a Smarty Pants workspace today?"
    a: "No. Snapshots and recovery are Planned. Today, a workspace keeps nothing after it ends."
  - q: "Will a snapshot keep running processes or memory?"
    a: "No. The plan is disk-only snapshots: files, folders and their permissions. Memory, running processes, /tmp and network state are not kept, and a restored workspace starts fresh processes."
  - q: "What would be lost if a Mac goes away?"
    a: "Under the plan, anything after the last acknowledged checkpoint. The intent is to checkpoint after each finished command, so that is at most one command's work."
  - q: "Could two Macs run the same workspace at once after a move?"
    a: "The plan is designed to prevent it: each workspace has one lease, and the site refuses reports from an older lease, while a cut-off Mac stops itself before another Mac can start."
  - q: "How will I know when snapshots open?"
    a: "We'll announce it on smartypants.network/docs/agents when it opens."
related: ["/workspaces/", "/workspaces/sessions/", "/workspaces/always-on-agents/", "/guides/ai-agent-sandboxes-explained/"]
sources:
  - label: "Smarty Pants: Agent kit (Workspaces)"
    url: "https://smartypants.network/docs/agents"
---

**Planned.** Nothing on this page is available today. It describes what Smarty Pants intends to build so that a workspace can survive its Mac going away. Today's [workspace sessions](/workspaces/sessions/) keep files only until the workspace ends, and nothing is kept after.

## Why does a workspace need recovery?

Because workspaces run on Macs that owners lend while idle, and the owner comes first. Macs sleep, travel and get used. Today, if the owner returns, the workspace ends within 5 seconds with `OWNER_RETURNED`, and the work in it is gone.

The plan is for a workspace to pick up on another Mac from its last saved state instead of starting over.

## What would a snapshot keep?

The disk only. A snapshot would be the files of the workspace: folders, files with their permission bits, and links that stay inside the workspace.

It would not keep:

- memory
- running processes
- `/tmp` and system folders
- network state

Each snapshot is planned to list what it does not keep, so an agent can see what a restore will not bring back. After a restore, the workspace would start fresh processes on the restored disk. If your agent needs a long-running server, it would start it again.

## How would recovery work?

The plan has three parts: checkpoints, one lease per workspace, and restore on another Mac.

1. **Checkpoints.** The intent is to save a checkpoint after each finished command and when the workspace is idle. Only changed pieces of files are uploaded again.
2. **One lease at a time.** Each workspace would have one lease naming the Mac that holds it. The site refuses writes from an older lease, and a Mac that loses touch with the site stops its VM on its own clock before another Mac is allowed to start. The goal is that two Macs never run the same workspace.
3. **Restore elsewhere.** When the site decides a Mac is lost, another Mac takes the next lease, restores the last acknowledged checkpoint, checks every file against its hash, and continues. If a check fails, the restore stops and the workspace is not run there.

## What would be lost on a move?

Everything after the last acknowledged checkpoint. Nothing newer is guessed at. With a checkpoint after each command, that is planned to be at most one command's work.

Design your agent so its last step can be safely redone: write outputs to files, and make outside actions idempotent.

## What is built so far?

The snapshot format, the checkpoint store and the lease rules are in development, not available. They have been tested offline with a simulated second Mac. They are not connected to any live route or to any Mac, and they change nothing on the site.

Still to come before this can open: the per-session disk in workspaces, the worker side that saves and restores checkpoints, and a test on real hardware where a Mac is disconnected and the workspace continues on another one. Storage and pricing for snapshots are not decided.

## What does this mean for my data?

The same trust model applies. VM isolation protects the Mac's owner; it does not keep the guest's files confidential from the Mac's owner. A restored workspace would sit on a different person's Mac, so the rule stays: no secrets in a workspace.

## When will snapshots open?

There is no date. We'll announce it on smartypants.network/docs/agents when it opens. Until then, read the live [agent docs](https://smartypants.network/docs/agents) and the [workspaces overview](/workspaces/). Snapshots are also the base for Planned [always-on agents](/workspaces/always-on-agents/).
