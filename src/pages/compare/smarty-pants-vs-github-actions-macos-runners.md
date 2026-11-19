---
layout: ../../layouts/ContentLayout.astro
title: "Smarty Pants vs. GitHub macOS runners for Mac builds"
description: "Run Xcode builds on Macs your team already owns with Smarty Pants (coming, free) or on GitHub's hosted macOS runners (per minute). Cost, limits and fit."
h1: "Smarty Pants vs. GitHub's macOS runners"
eyebrow: "Compare"
audience: "buyer"
status: "planned"
primaryKeyword: "github actions macos runner alternative"
keywords: ["github actions macos runner alternative", "self-hosted macos runner", "cheap macos ci", "xcode build on own mac"]
summary: "GitHub's hosted macOS runners charge per minute (listed at $0.062 a minute for the standard runner on 19 Nov 2026). Smarty Pants Mac app builds, coming soon, will run Xcode builds in macOS VMs on Macs you or your Group own, free, two at a time per Mac. They do not run on strangers' Macs, because Apple's license does not allow renting macOS VMs by the minute. GitHub stays the choice if you don't own spare Macs."
published: "2026-11-19"
updated: "2026-11-19"
readingMinutes: 3
faqs:
  - q: "Can I use Smarty Pants for Mac builds today?"
    a: "Not yet. The API is built and switched off until the Mac app side ships."
  - q: "Why can't Smarty Pants sell macOS build minutes on any Mac?"
    a: "Apple's macOS license allows up to 2 macOS virtual machines per Mac for development and testing by the Mac's own user. Renting them to strangers by the minute is not allowed, so builds run only on your own or your Group's Macs."
  - q: "How is this different from a self-hosted GitHub runner?"
    a: "Both use your own Macs. Smarty Pants adds a fresh macOS VM per build, owner controls and pause, and the same account, Group and budget as the rest of Smarty Pants."
related: ["/compare/", "/workspaces/mac-builds/", "/groups/", "/pricing/"]
sources:
  - label: "GitHub Docs: Actions runner pricing (checked 19 Nov 2026)"
    url: "https://docs.github.com/en/billing/reference/actions-runner-pricing"
  - label: "Smarty Pants: Agent kit (Mac app builds)"
    url: "https://smartypants.network/docs/agents"
---

Building Mac and iPhone apps needs macOS, and macOS CI minutes are among the most expensive in hosted CI. Teams that already own Macs can use them instead.

## How do they compare?

| | Smarty Pants Mac app builds | GitHub hosted macOS runner |
|---|---|---|
| Where it runs | Macs you or your Group own | GitHub's Macs |
| Price | Free | $0.062 a minute (standard runner, 19 Nov 2026) |
| Builds at once | Up to 2 per Mac | Per plan |
| Signing keys | Never sent to a Mac | Stored as GitHub secrets |
| Status | Coming, switched off today | Available |

Source: [GitHub's runner pricing](https://docs.github.com/en/billing/reference/actions-runner-pricing), checked 19 Nov 2026.

## When should I stay with GitHub's runners?

When you don't have spare Macs, need many builds at once, or want zero setup. Hosted runners are ready now; Smarty Pants Mac builds are not.

## When will Smarty Pants fit better?

When your team already owns Macs that sit idle at night. Builds will run in a fresh macOS VM, only when the Mac's owner allows it, and cost nothing. Read [Mac app builds](/workspaces/mac-builds/) and [Groups](/groups/).
