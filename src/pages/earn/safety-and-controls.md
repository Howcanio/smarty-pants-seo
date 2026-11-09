---
layout: ../../layouts/ContentLayout.astro
title: "Smarty Pants Mac app safety and controls"
description: "What the Smarty Pants Mac app does on your Mac: Pause, automatic pauses for battery, heat and memory, network choice, prompt handling and what it cannot do."
h1: "Safety and controls: what the Smarty Pants app does on your Mac"
eyebrow: "For Mac owners"
audience: "supplier"
status: "invite"
primaryKeyword: "is it safe to share my mac for ai"
keywords: ["is it safe to share my mac for ai", "smarty pants pause", "can smarty pants see my files", "mac ai app privacy owner", "sealed vm mac"]
summary: "You can pause the Smarty Pants app at any time: Pause stops new work, disconnects the Mac and interrupts work in progress. The Mac also pauses itself for unsafe battery, heat or memory conditions, and MacBooks pause on battery. You choose company only, general network or both. The app does not ask for macOS file, screen-recording or accessibility permissions, and Smarty Pants says it cannot browse your files, watch your screen or control your Mac. It makes no security guarantee."
published: "2026-11-09"
updated: "2026-11-09"
readingMinutes: 5
faqs:
  - q: "What happens when I press Pause?"
    a: "Pause stops new work and disconnects the Mac from the network. Work in progress is interrupted rather than left running in the background."
  - q: "Does the Mac pause itself?"
    a: "Yes. The Mac pauses for unsafe battery, heat or memory conditions. Mac minis pause for heat or unsafe pressure, and MacBooks also pause on battery."
  - q: "Can Smarty Pants see my files or my screen?"
    a: "The Mac app does not ask for the macOS permissions an app needs to read your protected folders, record your screen or control your Mac (Full Disk Access, Screen Recording, Accessibility). It is not a sandboxed App Store app, so this is Smarty Pants' design and stated policy, not a technical guarantee. Smarty Pants says it cannot browse your files, watch your screen, or control your Mac."
  - q: "Can I read the prompts my Mac answers?"
    a: "Prompts are not shown in the app, and the owner agreement forbids you from trying to access, copy or keep them. But your Mac decrypts each request in memory to answer it, so keeping prompts from the Mac's owner is a rule and an app design, not a technical guarantee. That is why developers are told not to send sensitive data to the general network."
  - q: "Is it guaranteed to be safe for my Mac?"
    a: "No. The Node Operator Agreement says no device safety or useful life is promised. The app keeps the Mac awake, uses processor and memory, and creates heat and fan activity while earning is on."
related: ["/earn/", "/earn/how-it-works/", "/earn/earnings/", "/cpu/", "/guides/ai-agent-sandboxes-explained/"]
sources:
  - label: "Smarty Pants: For humans with Macs (Pause and prompt FAQ), viewed 8 Nov 2026"
    url: "https://smartypants.network/humans"
  - label: "Smarty Pants: How Mac qualification works, viewed 8 Nov 2026"
    url: "https://smartypants.network/compatibility"
  - label: "Smarty Pants: Agent docs (CPU jobs and workspaces), viewed 8 Nov 2026"
    url: "https://smartypants.network/docs/agents"
  - label: "Smarty Pants: Legal center (Node Operator Agreement, version 2026-11-06.1), viewed 9 Nov 2026"
    url: "https://smartypants.network/legal"
---

Letting other people's AI requests run on your Mac is a real trade-off, so this page sticks to what the Smarty Pants app actually does, as described on smartypants.network and in the owner agreement. It covers the controls you have, the pauses the app makes on its own, how prompts are handled and what the app cannot do. It is not a security guarantee.

## How do I stop my Mac serving?

Press Pause. It "stops new work and disconnects the Mac from the network," and "work in progress is interrupted rather than left running in the background," according to the [owner FAQ](https://smartypants.network/humans).

You can pause at any time. The [Node Operator Agreement](https://smartypants.network/legal) also says you can remove the computer at any time, subject to finishing or safely cancelling work already accepted.

The Smarty Pants code has a design rule that the app's local safety, start and pause controls must work without the website. That is how the app is meant to be built, not a guarantee.

## When does the Mac pause itself?

The app pauses the Mac for unsafe battery, heat or memory conditions. These checks keep running while the Mac is in the network.

| Condition | What happens |
|---|---|
| MacBook on battery | The Mac pauses; MacBooks must be plugged in while serving |
| Too much heat | The Mac pauses |
| Memory or system pressure | The Mac pauses |
| Other risks | The owner agreement says checks may also pause for network problems or updates |

## Can I choose who my Mac serves?

Yes. You choose its network: company (Group) only, the general network only, or both. A Group is a company's own pool of Macs; see [how it works](/earn/how-it-works/) for details.

On a Mac with 48 GB or more, you can also turn picture making off in the app's settings.

## Can I see the prompts my Mac answers?

Not in the app, and you are not allowed to try. Smarty Pants "does not show or retain prompt content in its interface or product logs." But a serving Mac must decrypt each request in memory to compute the answer, so confidentiality from the Mac's owner is not guaranteed: it rests on the agreement below and on the app's design, not on something the owner technically cannot get around.

The owner agreement says you will not access, copy, retain, reconstruct, disclose or use request inputs or outputs. The same FAQ calls a general-network Mac "an independently managed trust boundary" and tells developers to use the general network only for non-sensitive work.

## What is the sealed VM for code jobs?

Some work is not an AI model at all but a short program. Those run inside a sealed Linux (ARM64) virtual machine on the Mac, with "no network, no disk, wiped after," according to the [agent docs](https://smartypants.network/docs/agents).

| Type | Limits listed on 8 Nov 2026 | Status |
|---|---|---|
| Short code jobs (CPU jobs) | Up to 30 seconds per job, up to 4 KB output; no network, no disk, wiped after | Smarty Pants' own account first |
| Workspaces | Up to 30 minutes; nothing kept after it ends; the Mac's owner comes first | Smarty Pants' own account first |

For workspaces, "the Mac's owner comes first: if they come back, the workspace ends within 5 seconds." Both are run on Smarty Pants' own account first. The VM is meant to keep guest code away from the rest of your Mac; it is a design measure, not a guarantee. See [CPU jobs](/cpu/) and our explainer on [AI agent sandboxes](/guides/ai-agent-sandboxes-explained/) for how this works.

## What can't the app do?

Smarty Pants says it "cannot browse your files, watch your screen, or control your Mac." It can use approved AI capacity.

The Mac app does not ask for the macOS permissions an app needs to read your protected folders, record your screen or control your Mac (Full Disk Access, Screen Recording, Accessibility). It is not a sandboxed App Store app, so this is Smarty Pants' design and stated policy, not a technical guarantee.

What it does do while earning is on, per the owner agreement: keep the Mac awake while safety checks permit, download and store approved model files, use processor and memory capacity, create heat and fan activity, send and receive request data, and use electricity and bandwidth. The display may sleep.

## What isn't promised?

Device safety and useful life are not promised. The owner agreement says: "No demand, utilization, minimum work, availability, earnings, profit, device safety, or useful life is promised."

You are also responsible for having permission to use the Mac, its electricity and its network, for example from an employer, landlord or household. If that is unclear, ask first. Ready to start? Run the 3-second check at [smartypants.network](https://smartypants.network/), or read [how earnings work](/earn/earnings/).
