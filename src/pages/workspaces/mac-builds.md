---
layout: ../../layouts/ContentLayout.astro
title: "Mac app builds on your own Macs (coming)"
description: "Smarty Pants Mac app builds will run Xcode builds and tests on Macs you or your Group own, free, two at a time per Mac. Switched off until the Mac side ships."
h1: "Mac app builds on your own Macs (coming)"
eyebrow: "Agent workspaces"
audience: "buyer"
status: "planned"
primaryKeyword: "macos build runner"
keywords: ["macos build runner", "self-hosted mac runner", "xcode build on own mac", "ios ci on own macs"]
summary: "Smarty Pants Mac app builds will run Xcode builds and tests in macOS VMs on Macs you own or your Group's Macs, never on strangers' Macs, at most 2 at once per Mac, and only where the owner said yes. They are free, because the Macs are yours. The API is built and switched off until the Mac side ships. Signing keys never go to a Mac."
published: "2026-11-19"
updated: "2026-11-19"
readingMinutes: 3
faqs:
  - q: "Can I run Mac app builds on Smarty Pants today?"
    a: "Not yet. The API (POST /v1/mac-builds) is built but switched off until the Mac app side ships."
  - q: "Why only on my own or my Group's Macs?"
    a: "Apple's macOS license allows at most 2 macOS virtual machines per Mac for development and testing by the Mac's own user. Renting them by the minute to strangers is not allowed, so Smarty Pants only runs builds on Macs you or your Group own."
  - q: "What will it cost?"
    a: "Nothing. The builds run on Macs you already own. Hosted macOS CI, such as GitHub's macOS runners, charges per minute."
  - q: "Where do my signing keys go?"
    a: "Nowhere near a Mac in the network. Sign on your own machine or in your existing release pipeline."
related: ["/workspaces/", "/groups/", "/compare/smarty-pants-vs-github-actions-macos-runners/", "/pricing/"]
sources:
  - label: "Smarty Pants: Agent kit (Mac app builds)"
    url: "https://smartypants.network/docs/agents"
  - label: "Apple: software license agreements (macOS)"
    url: "https://www.apple.com/legal/sla/"
---

Teams that build Mac and iPhone apps often already own Macs that sit idle at night. Smarty Pants Mac app builds will turn those Macs into a private build farm, with the same account, Group and controls as the rest of Smarty Pants.

## How will it work?

`POST /v1/mac-builds` with `{repo, scheme or command, where}`. `where` must be `"mine"` or `{group: "<Group id>"}`: builds never go to other people's Macs. Each Mac runs at most 2 builds at once, each in its own macOS VM, and only if its owner turned builds on.

## Why not on any Mac in the network?

Because Apple's license does not allow it. macOS may run in up to 2 virtual machines per Mac for development and testing by the Mac's own user, and leasing a Mac to someone else is allowed only as a whole Mac for at least 24 hours. Selling per-minute builds on strangers' Macs would break that, so we don't.

## What does it cost, and what does it replace?

It is free: the Macs are yours. It can replace hosted macOS runners for teams that already own Macs; see the [comparison with GitHub's macOS runners](/compare/smarty-pants-vs-github-actions-macos-runners/). It will not replace them for teams without spare Macs.

## When does it open?

When the Mac app side ships. We'll announce it on the [agent docs](https://smartypants.network/docs/agents). Until then, [Groups](/groups/) and [workspaces](/workspaces/) work today.
