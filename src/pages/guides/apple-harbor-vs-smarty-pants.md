---
layout: ../../layouts/ContentLayout.astro
title: "Apple Harbor vs. Smarty Pants: your Macs or a Mac network"
description: "What is known about Harbor, the Claris app for running AI on your own Macs, and how it differs from Smarty Pants. Honest pros and cons both ways."
h1: "Harbor vs. Smarty Pants: two different ways to use Macs for AI"
eyebrow: "Guide"
audience: "buyer"
primaryKeyword: "apple harbor app"
keywords: ["apple harbor app", "claris harbor", "harbor local ai mac", "mac cluster ai", "thunderbolt 5 mac cluster", "local ai server mac"]
summary: "Harbor is a Mac app from Claris, Apple's subsidiary, that news reports describe as turning your own Apple silicon Macs into a private AI server, and linking several Macs over Thunderbolt 5 to pool their memory. It is in early access and not public; no price or release date has been given. Smarty Pants is different: it is a network where you pay per token to use open models running on Macs other people own, and where Mac owners can earn from idle time. Harbor fits work that must stay on hardware you own. Smarty Pants fits non-sensitive work when you don't want to buy or run the Macs yourself."
published: "2026-11-11"
updated: "2026-11-11"
readingMinutes: 6
faqs:
  - q: "What is Apple's Harbor app?"
    a: "Harbor is a Mac app from Claris, the Apple subsidiary best known for FileMaker. According to MacRumors and 9to5Mac (10 Nov 2026), it turns Apple silicon Macs into a private AI server that runs open-weight models, and can link two or more Thunderbolt 5 Macs to pool their memory."
  - q: "Is Harbor available yet?"
    a: "Not publicly. On 10 Nov 2026, MacRumors reported that Harbor is in early access and not publicly available, and that a brief App Store listing had been removed. No release date has been announced."
  - q: "How much does Harbor cost?"
    a: "Claris has not said. Reports say the company describes the setup as having no cloud fees and no per-token billing, but you supply and run the Macs yourself."
  - q: "Can you earn money with Harbor?"
    a: "None of the reports we read mention earning money or selling spare capacity. Harbor is described as a way to run AI on your own Macs for your own use."
  - q: "Is Smarty Pants affiliated with Apple or Claris?"
    a: "No. Smarty Pants is an independent network run by Howcan, Inc. It has no connection to Apple, Claris or Harbor."
  - q: "Can I use both?"
    a: "They solve different problems, so yes in principle: Harbor for private work on Macs you own, Smarty Pants to call models without buying hardware, or to earn from an idle Mac. We have not tested Harbor, since it is not public."
related: ["/guides/decentralized-vs-centralized-inference/", "/guides/how-to-run-an-llm-on-a-mac/", "/guides/how-much-ram-to-run-an-llm/", "/inference/vs-centralized-providers/", "/earn/", "/guides/what-is-mlx/"]
sources:
  - label: "MacRumors: Apple's Claris Testing 'Harbor' App for Local AI on Macs (10 Nov 2026)"
    url: "https://www.macrumors.com/2026/11/10/apple-claris-harbor-app/"
  - label: "9to5Mac: Apple has new Mac app coming to make running local AI models easy (10 Nov 2026)"
    url: "https://9to5mac.com/2026/11/10/apple-has-new-mac-app-coming-to-make-running-local-ai-models-easy/"
  - label: "Globe TV: Claris previews Harbor, a Mac app that pools Apple silicon memory for local AI (10 Nov 2026)"
    url: "https://globetv.app/news/claris-previews-harbor-a-mac-app-that-pools-apple-silicon-memory-for-local-ai-6af3abf5765e9"
  - label: "Exo Labs: What is distributed inference?"
    url: "https://exolabs.net/faq/what-is-distributed-inference/"
  - label: "Smarty Pants: API"
    url: "https://smartypants.network/api"
  - label: "Smarty Pants: Agent kit and docs"
    url: "https://smartypants.network/docs/agents"
  - label: "Smarty Pants: For teams"
    url: "https://smartypants.network/for-teams"
  - label: "Smarty Pants: /v1/models"
    url: "https://smartypants.network/v1/models"
---

On 10 November 2026, news sites reported that Claris, Apple's software subsidiary, is testing a Mac app called Harbor for running AI models on your own Macs. People have asked how that compares with Smarty Pants, which also uses Macs for AI. The short answer: they do different jobs. This page sets out what is actually known about Harbor, where each one is the better fit, and the downsides of both.

Smarty Pants is not affiliated with Apple or Claris, and we have not used Harbor, because it is not public yet. Everything we say about Harbor comes from the reports linked on this page.

## What is Harbor?

**Harbor is a Mac app from Claris that turns Apple silicon Macs into a private AI server, according to reports from 10 November 2026.**

Here is what the reports say:

- **Who makes it.** Claris, the Apple subsidiary known for FileMaker. [9to5Mac](https://9to5mac.com/2026/11/10/apple-has-new-mac-app-coming-to-make-running-local-ai-models-easy/) says it was found by leaker Aaron Perris and is "in a private preview under Apple's Claris brand."
- **What it does.** It lets you "browse for, download, and load open-weight models" and run them on your Mac, according to [MacRumors](https://www.macrumors.com/2026/11/10/apple-claris-harbor-app/).
- **Linking Macs.** It can connect "multiple Mac computers over Thunderbolt 5 to pool unified memory," so several Macs together can hold a model too big for one. MacRumors notes Apple added faster Mac-to-Mac links over Thunderbolt 5 in macOS Tahoe 26.2.
- **Privacy.** The marketing copy quoted by MacRumors says "your data never leaves your hardware, and nothing reaches the cloud."
- **Status.** "Harbor is in early access and is not publicly available," per MacRumors, which adds that a short-lived App Store listing was removed.
- **Price and date.** Not announced. [Globe TV](https://globetv.app/news/claris-previews-harbor-a-mac-app-that-pools-apple-silicon-memory-for-local-ai-6af3abf5765e9) reports Claris "has not said what Harbor will cost or when it will be released."
- **Who it's for.** Not stated. MacRumors points out that the early access form asks for a company name, which "suggests more of a business focus." That is the reporter's guess, not a statement from Claris.

What we could not find in any report: support for earning money, selling spare time, or sharing your Macs with other people over the internet. Treat anything beyond the list above as unconfirmed until Claris publishes more.

## What is Smarty Pants?

**Smarty Pants is a network that runs AI requests on Apple silicon Macs that their owners make available while idle.**

- **For developers:** you call exact, pinned open models through an OpenAI-compatible API at `https://smartypants.network/v1`, and pay per token. Each model's build is named in [/v1/models](https://smartypants.network/v1/models). You are not charged for a request Smarty Pants can't serve.
- **For Mac owners:** you can earn from a Mac that would otherwise sit idle. Earn up to $1/day per eligible Mac during the intro offer. Eligible means a supported Apple silicon Mac with 16 GB of memory or more, in the US; see [smartypants.network](https://smartypants.network/) for current terms.
- **For teams:** a company can put its own Macs in a Group. Members use them for AI for free and work stays on the Group's Macs first ([For teams](https://smartypants.network/for-teams)). Group sign-up is invite only for now.

## The core difference

**Harbor is about running AI on Macs you own, for yourself. Smarty Pants is about sharing Macs across many owners and users.**

| | Harbor (as reported) | Smarty Pants |
|---|---|---|
| Whose Macs run the model | Yours | Macs owned by other people (or your own, in a Group) |
| Do you need to buy Macs? | Yes | No, to use the API |
| Where your data goes | Stays on your hardware, per Claris | Runs on another owner's Mac on the general network |
| Big models split across Macs | Yes, pooled over Thunderbolt 5 | No: each request runs whole on one Mac |
| How you pay | Price not announced; reports say no per-token billing | Per token, listed per model |
| Earn from idle Macs | Not mentioned | Yes, during the intro offer, for eligible Macs |
| Available today | Early access only | API sign-up is open; Mac owners join by invite |

## Where Harbor is the better choice

Be honest with yourself about these. If they apply, Harbor (or a free tool like it) is likely the better fit.

- **Sensitive data.** If your prompts are confidential, personal or regulated, keep them on hardware you control. On the Smarty Pants general network, your request runs on a stranger's Mac. [[PRIVACY]]
- **Very large models.** Harbor pools memory across Macs, so a group of Macs can run a model too big for any one of them. Smarty Pants runs each request on a single Mac, so model size is limited by what one Mac can hold.
- **Steady, predictable speed.** Macs on your own desk, linked by cable, avoid the internet hops and changing capacity of a shared network. On Smarty Pants, how many Macs have a model online changes by the hour.
- **No metered bill.** Once you own the Macs, reports say Harbor has no per-token fees. Heavy, steady use on your own hardware can make sense.
- **Made by Apple's own subsidiary.** Some buyers will prefer a tool from Claris for support and long-term trust.

## Where Smarty Pants is the better choice

- **You don't want to buy hardware.** Linking Macs over Thunderbolt 5 means owning several recent Macs with Thunderbolt 5 ports. With Smarty Pants you pay only for the tokens you use.
- **Light or uneven use.** If you only need AI now and then, paying per token can cost less than buying Macs that sit idle most of the day.
- **You want to earn from a Mac you already have.** Harbor, as reported, is for your own use. Smarty Pants pays eligible owners during the intro offer for idle time. [[MAC_ACCESS]]
- **A standard API today.** Smarty Pants works with the OpenAI SDK: change the base URL and key. Harbor's developer features, if any, have not been described.
- **Exact, named builds.** Every Smarty Pants model names its exact build in `/v1/models`, so you know which weights answered.
- **It exists now.** Harbor has no public release date. [[API_ACCESS]]

## Downsides of each, plainly

**Harbor**

- Not public, with no price or release date.
- You pay up front for the Macs, and for running them.
- Linking Macs needs Thunderbolt 5 Macs, physically cabled together.
- Your models can only use the Macs you own.
- Details beyond the early reports are unknown.

**Smarty Pants**

- Requests run on other people's Macs: don't send sensitive data on the general network.
- Capacity varies: a model may have few or no Macs online at a given moment, so keep a fallback provider. The [agent docs](https://smartypants.network/docs/agents) list strict latency guarantees as not a fit yet.
- No splitting one model across Macs, so the biggest models are out of reach.
- Mac owners join by invite only for now.

## Other free options

Harbor is not the first way to run AI on Macs you own. MacRumors names [LM Studio](https://lmstudio.ai/) and [exo](https://exolabs.net/) as existing free tools; exo also splits a model across several devices so their memory adds up ([exo explains how](https://exolabs.net/faq/what-is-distributed-inference/)). Our guide on [how to run an LLM on a Mac](/guides/how-to-run-an-llm-on-a-mac/) covers the single-Mac options.

## The bottom line

**If your data must stay on hardware you own, or you need models too big for one Mac, a local tool like Harbor is the better fit once it ships. If you want to call open models without buying Macs, or earn from a Mac you already have, Smarty Pants is built for that.** Many teams will reasonably use both: local for private work, a network for everything else.

We will update this page when Claris publishes official details about Harbor.
