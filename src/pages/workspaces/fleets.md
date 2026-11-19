---
layout: ../../layouts/ContentLayout.astro
title: "Parallel agent sandboxes: workspace fleets"
description: "Run many identical Smarty Pants workspaces at once, from a saved setup, and send the same command to all of them. Free on your own Macs."
h1: "Fleets: many agent workspaces at once"
eyebrow: "Agent workspaces"
audience: "buyer"
status: "invite"
primaryKeyword: "parallel agent sandboxes"
keywords: ["parallel agent sandboxes", "run many sandboxes at once", "agent fleet", "parallel test runs"]
summary: "A Smarty Pants fleet opens several identical workspaces at once, each a sealed Linux VM on a different Mac where one is free, optionally from a saved setup. Send the same command to all of them, read each result, and end them together. Each workspace is billed at $0.0129 an hour for 2 vCPU and 2 GB, and fleets on your own or your Group's Macs are free. A web browser inside a workspace is not available yet."
published: "2026-11-09"
updated: "2026-11-19"
readingMinutes: 3
faqs:
  - q: "How do I open a fleet?"
    a: "POST /v1/cpu/fleets with {size} (and from: NAME to start every copy from a saved workspace), or smartypants fleet new --size 4."
  - q: "What does a fleet cost?"
    a: "Each workspace in it costs the normal workspace price, $0.0129 an hour for 2 vCPU and 2 GB, billed per second. On your own or your Group's Macs it is free."
  - q: "Is there a size limit?"
    a: "A fleet can only be as big as the number of free Macs at that moment, and each Mac runs a limited number of workspaces. Capacity is not guaranteed."
  - q: "Can a workspace run a web browser?"
    a: "Not yet. Browser work inside a workspace is being built and is not available."
related: ["/workspaces/", "/workspaces/snapshots-and-recovery/", "/workspaces/sessions/", "/pricing/"]
sources:
  - label: "Smarty Pants: Agent kit (Command line, Workspaces)"
    url: "https://smartypants.network/docs/agents"
---

A fleet is several workspaces opened together, for work that splits well: running a test suite in pieces, trying one change many ways, or grading many answers at once.

## How do I use a fleet?

Open it, send a command to every workspace, read the results, end it.

```sh
F=$(smartypants fleet new --size 4)
smartypants fleet exec $F sh -c 'uname -m'
smartypants fleet end $F
```

Add `--from NAME` to start every workspace from a [saved setup](/workspaces/snapshots-and-recovery/), so dependencies are already installed. The API is `POST /v1/cpu/fleets` with `{size, from}`.

## What are the limits?

Each workspace has the [session limits](/workspaces/sessions/): 2 vCPU, 2 GB, up to 2 hours. How many you get at once depends on how many Macs are idle and online, so plan for a smaller fleet than you asked for, or keep the work on your own Macs with `--where mine`.

## Who can use it?

Free on Macs you own and on your Group's Macs. Paid fleets on Macs other people own are on Smarty Pants' own account first. See the [price page](/pricing/#workspaces).
