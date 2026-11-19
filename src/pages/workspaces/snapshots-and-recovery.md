---
layout: ../../layouts/ContentLayout.astro
title: "Sandbox snapshots and failover for agent workspaces"
description: "Save a Smarty Pants workspace by name, open copies of it, and let a long run carry on on another Mac if its Mac goes away. How saves and failover work."
h1: "Save, copy and failover for agent workspaces"
eyebrow: "Agent workspaces"
audience: "buyer"
status: "invite"
primaryKeyword: "sandbox snapshots"
keywords: ["sandbox snapshots", "agent sandbox recovery", "workspace checkpoint", "restore sandbox on another machine"]
summary: "A Smarty Pants workspace can be saved by name and opened again as any number of copies. With autoSave and failover on, a long run survives its Mac going away: the site starts a new workspace on another Mac from the last save, with the time that was left, and the lost workspace is never charged. Saves keep the disk, not running programs. Paid use is on Smarty Pants' own account first."
published: "2026-11-09"
updated: "2026-11-19"
readingMinutes: 3
faqs:
  - q: "How do I save a workspace?"
    a: "POST /v1/cpu/sessions/{id}/save with a name, or smartypants ws save ID NAME. Then open copies with POST /v1/cpu/sessions {from: NAME}."
  - q: "What happens to my run if the Mac goes away?"
    a: "If you opened the workspace with autoSave and failover: true, the site starts a new workspace on another Mac from the last save, with the time that was left. The lost workspace shows movedTo and is not charged."
  - q: "Does a save keep running programs?"
    a: "No. A save keeps the workspace's disk, so files and installed packages come back, but programs that were running must be started again."
  - q: "Can I make a saved setup for a repo?"
    a: "Yes. smartypants setup NAME --repo URL --setup \"npm ci\" clones and installs once; later jobs start from it with everything installed. A Dockerfile's RUN, ENV, WORKDIR and COPY steps can also become a saved setup."
related: ["/workspaces/", "/workspaces/sessions/", "/workspaces/fleets/", "/pricing/"]
sources:
  - label: "Smarty Pants: Agent kit (Workspaces)"
    url: "https://smartypants.network/docs/agents"
---

Macs in Smarty Pants belong to people, and a person can take theirs back at any moment. Saves and failover are how a workspace copes with that: keep the disk, and carry on somewhere else.

## How do saves and copies work?

Save a workspace by name, then open any number of copies of it. A copy starts with the same files and installed packages.

| Step | API | Command line |
|---|---|---|
| Save | `POST /v1/cpu/sessions/{id}/save` `{name}` | `smartypants ws save ID NAME` |
| Open one copy | `POST /v1/cpu/sessions` `{from: NAME}` | `smartypants ws new --from NAME` |
| Open many copies | `POST /v1/cpu/fleets` `{size, from: NAME}` | `smartypants fleet new --size 4 --from NAME` |

`GET` on the new workspace shows `copy.state` until the copy is ready.

## How does failover work?

Open a workspace with `"autoSave": {"name": "NAME"}` and `"failover": true`. When its Mac drops off, the site starts a new workspace on another Mac from the last save, with the time that was left. The lost one shows `movedTo` and costs nothing.

For whole jobs, add `--retries 2` (or `retries=2` in the kits). The job saves after each finished step; if its Mac is lost it opens a copy of that save, on another Mac when there is one, and goes on from the step that was cut off.

## What should I know before relying on it?

A save keeps the disk, not memory: running programs start again. Failover needs another Mac to be free, which is not guaranteed. And saves live on Macs other people own, so the same data rule applies as for any workspace: nothing secret on other people's Macs.

## What does it cost?

Saves are part of the workspace; time is billed at the workspace rate, $0.0129 an hour for 2 vCPU and 2 GB, and free on your own or your Group's Macs. See the [price page](/pricing/#workspaces).
