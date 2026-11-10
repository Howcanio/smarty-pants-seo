---
layout: ../../layouts/ContentLayout.astro
title: "How earning with your Mac works on Smarty Pants"
description: "Step by step: the browser check, the invite, the signed Mac app's checks, serving AI work while idle, and getting paid through Stripe."
h1: "How earning with your Mac works, from check to payout"
eyebrow: "For Mac owners"
audience: "supplier"
status: "invite"
primaryKeyword: "how to rent out my mac for ai"
keywords: ["how to rent out my mac for ai", "smarty pants mac app", "share mac compute", "mac ai node setup", "which ai models can my mac run"]
summary: "You run a 3-second browser check, leave your email and wait for an invite. Then you install the signed Smarty Pants app, connect the Mac, and the app verifies its chip, memory, disk, power, temperature and real model speed. Once ready, the Mac serves AI requests while idle and you are paid through Stripe. Which models it can hold depends on its memory."
published: "2026-11-09"
updated: "2026-11-09"
readingMinutes: 5
faqs:
  - q: "Do I have to install anything to see if my Mac qualifies?"
    a: "No. The first check runs in your browser in about 3 seconds, with no download and nothing leaving the Mac. Only the signed Mac app can confirm final eligibility."
  - q: "What does the Mac app check before paid work?"
    a: "The app checks the exact chip, memory, free disk, power, temperature, system pressure and network, then runs the signed MLX model to measure real speed. It keeps rechecking while the Mac is in the network."
  - q: "Which AI models can a 16 GB Mac run for Smarty Pants?"
    a: "On 8 November 2026 the catalog listed Qwen3.5 9B, Qwen3.5 4B, Qwen3 Embedding 0.6B and Whisper large-v3 turbo for 16 GB+ Macs. Bigger models need 24, 32 or 48 GB."
  - q: "How do I get paid?"
    a: "Earnings are paid out through Stripe. You need to provide accurate payee and tax details, and a payout fee of 3% with a $3.00 minimum applies."
  - q: "Can my company keep its Macs for its own team?"
    a: "Yes, through a Group. Each Mac can serve the company only, the general network only, or both, and the Macs' earnings go to one company wallet. Group sign-up is invite only for now."
related: ["/earn/", "/earn/safety-and-controls/", "/earn/earnings/", "/ai-models/", "/macs/", "/guides/how-much-ram-to-run-an-llm/"]
sources:
  - label: "Smarty Pants: How Mac qualification works, viewed 8 Nov 2026"
    url: "https://smartypants.network/compatibility"
  - label: "Smarty Pants: For humans with Macs, viewed 8 Nov 2026"
    url: "https://smartypants.network/humans"
  - label: "Smarty Pants: home page, viewed 8 Nov 2026"
    url: "https://smartypants.network/"
  - label: "Smarty Pants: For teams, viewed 8 Nov 2026"
    url: "https://smartypants.network/for-teams"
  - label: "Smarty Pants: current model list"
    url: "https://smartypants.network/v1/models"
  - label: "Smarty Pants: Legal center (Node Operator Agreement 2026-11-06.1; Tax and Payout Policy 2026-08-27.1), viewed 9 Nov 2026"
    url: "https://smartypants.network/legal"
---

Earning with a Mac on Smarty Pants takes a few steps, and only the last one involves money. The browser gives an estimate, the signed Mac app does the real check, and the Mac serves AI requests only after it passes. Owners are invited in small batches today, so expect a wait between the first two steps.

## What are the steps?

There are seven, from a browser check to a Stripe payout. Steps 1 and 2 work today for anyone; the rest need an invite.

1. **Run the browser check.** At [smartypants.network](https://smartypants.network/), one click runs a test of about 3 seconds, with no download or questionnaire. The check runs in your browser. Smarty Pants records that a check started and finished, with an anonymous visitor ID and where you came from, but not the result. If you then ask for an invite, it sends your email, country, when the Mac is usually free and the check result (Apple silicon or not, memory size and the tier it suggests).
2. **Save your spot.** Leave your email and Smarty Pants invites you when a batch opens. Your test result travels with your request, so stronger Macs can be invited first.
3. **Install the signed app.** Invited testers download the signed installer, move Smarty Pants to Applications and open it. Later releases install through **Check for updates…** inside the app.
4. **Connect the Mac.** Choose **Connect this Mac**, sign in with your email, accept the terms, then turn on earning.
5. **Let the app verify the Mac.** It checks the exact chip, memory, free disk, power, temperature, system pressure and network, then runs the signed MLX model to measure real speed.
6. **Serve while idle.** Once the Mac is checked and ready, it can answer AI requests from the network. Safety checks keep running, and you can pause at any time.
7. **Get paid through Stripe.** Eligible earnings are paid out through Stripe, with a payout fee of 3% and a $3.00 minimum.

## Why doesn't the browser check count?

Because a browser can only guess. The [qualification page](https://smartypants.network/compatibility) says "No browser result allows paid work."

| The website can estimate | The Mac app verifies |
|---|---|
| Whether this looks like a Mac | Exact Mac model and Apple chip |
| Rough hardware hints | Exact unified memory and free disk |
| Brief local graphics speed | Real tokens per second, latency and stability |
| A likely tier | Whether this Mac may accept work now |

The app also verifies model files, behavior, sustained speed and safety, and keeps rechecking. A Mac that passed yesterday can still be paused today for heat or memory pressure.

## Which models can my Mac hold?

It depends on memory. Each model in the catalog names the minimum Mac memory it is served on. These are the listings on 8 November 2026; check the [current model list](https://smartypants.network/v1/models) or the [AI models hub](/ai-models/) for today's status.

| Mac memory | Models it can be qualified for (8 Nov 2026) |
|---|---|
| 16 GB+ | Qwen3.5 9B, Qwen3 Embedding 0.6B; in testing: Qwen3.5 4B, Whisper large-v3 turbo |
| 24 GB+ | Adds gpt-oss-20b (in testing) |
| 32 GB+ | Adds Qwen3.8 27B, Nanbeige4.3 33B; in testing: Qwen3.6 35B-A3B |
| 48 GB+ | Adds FLUX.1 schnell image making (in testing) |

The API names are `smartypants/qwen3.5-9b`, `smartypants/qwen3-embedding-0.6b`, `smartypants/qwen3.5-4b`, `smartypants/whisper-large-v3-turbo`, `smartypants/gpt-oss-20b`, `smartypants/qwen3.8-27b`, `smartypants/nanbeige4.3-33b`, `smartypants/qwen3.6-35b-a3b` and `smartypants/flux.1-schnell`.

On a Mac with 48 GB or more, the [Node Operator Agreement](https://smartypants.network/legal) says the app may also make pictures from buyers' text requests. Safety checks on the Mac read each request first and look at each picture before it is sent. You never see the requests or pictures, and you can turn picture making off in the app's settings.

For how each Apple chip and memory size compares, see [Macs by chip](/macs/) and our guide to [how much RAM you need to run an LLM](/guides/how-much-ram-to-run-an-llm/).

## How does payment work?

You are paid for the hours your Mac is ready, through Stripe. During the intro offer, the Mac does not need to be running a job to earn.

The Tax and Payout Policy on the [legal center](https://smartypants.network/legal) says verified earnings are platform credits, not bank deposits or guaranteed cash. Balances become payable only after the published threshold, recipient readiness, reconciliation and any holds. US payees may be asked for Form W-9 and a valid taxpayer ID. The rates, the payout fee and a worked example are on [how earnings work](/earn/earnings/).

## How do Groups work for companies?

A Group lets a company pool its own Macs. Team members use the Group's Macs for AI work for free, work stays on the Group's Macs first, and what the Macs earn goes to one company wallet, according to the [teams page](https://smartypants.network/for-teams).

Each Mac's owner chooses its network:

| Setting | What the Mac serves |
|---|---|
| Company only | Requests from its Group |
| General network only | Requests from the wider Smarty Pants network |
| Both | Its Group and the general network |

Smarty Pants is candid that this is not for everyone: "Use a hosted small model if the cheapest, least-effort AI is your only goal." Group sign-up is invite only and listed as "Opening soon."

## What should I do next?

Run the 3-second check at [smartypants.network](https://smartypants.network/), then read [safety and controls](/earn/safety-and-controls/) to see exactly what the app can and cannot do on your Mac.
