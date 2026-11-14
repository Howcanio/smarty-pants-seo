---
layout: ../../layouts/ContentLayout.astro
title: "Apple Harbor vs. Smarty Pants: two ways to use Macs for AI"
description: "What has been reported about Harbor, the Claris app for running AI on your own Macs, and how it compares with Smarty Pants today."
h1: "Harbor vs. Smarty Pants: two ways to use Macs for AI"
eyebrow: "Guide"
audience: "buyer"
primaryKeyword: "apple harbor app"
keywords: ["apple harbor app", "claris harbor", "harbor local ai mac", "mac cluster ai", "thunderbolt 5 mac cluster", "local ai server mac"]
summary: "Harbor is a Mac app from Claris, Apple's subsidiary, that news reports describe as turning Apple silicon Macs you own into a private AI server. It is in early access, with no price or release date. Smarty Pants is available today. It also runs open models on Apple silicon Macs: models you keep on your own Mac, your team's Macs through a Group, or a network of member Macs when you need capacity on demand. Developers pay per token through an OpenAI-compatible API, and Mac owners can earn from idle time."
published: "2026-11-11"
updated: "2026-11-14"
readingMinutes: 6
faqs:
  - q: "What is Apple's Harbor app?"
    a: "A Mac app from Claris, Apple's subsidiary, reported to turn Apple silicon Macs into a private AI server and link several Macs over Thunderbolt 5."
  - q: "Is Harbor available yet?"
    a: "No. It is in early access, and a short-lived App Store listing was removed."
  - q: "How much does Harbor cost?"
    a: "Claris has not announced a price."
  - q: "Can you earn money with Harbor?"
    a: "No report mentions it. With Smarty Pants, eligible Mac owners can earn from idle time."
  - q: "Can I run a model on my own Mac with Smarty Pants?"
    a: "Yes, if your Mac is in Smarty Pants. Pick models to keep on your Mac in the Mac app, and your own requests for them run there for free. If your Mac is busy or off, the request goes to the network at the normal price. Adding a Mac is by invite for now."
  - q: "Does Smarty Pants work offline?"
    a: "Yes, for models you keep on your own Mac. Apps on that Mac can call them at http://127.0.0.1:7777/v1 with the Mac's own key, or you can use the Chat on this Mac window. These answers are free, work with no internet, and nothing leaves the Mac. Models you haven't kept need an internet connection."
  - q: "How does Smarty Pants protect my requests?"
    a: "Each request travels over an encrypted connection and is sealed with a key that only the Mac chosen to answer it holds. Mac owners join by invite, run our signed app, pass hardware checks, and agree not to read requests, and prompts and answers aren't stored in our product logs. The answering Mac unlocks the request in memory to run the model, so for your most sensitive work use a model kept on your own Mac, which can answer with nothing leaving the Mac, or a Group set to Group only."
  - q: "Can I keep my work on my own Macs with Smarty Pants?"
    a: "Yes. Put your own Macs in a Group and set it to Group only, and your team's work runs only on those Macs. By default a Group uses its own Macs first and can use the wider network when they are busy. Group sign-up is invite only for now."
  - q: "Is Smarty Pants affiliated with Apple or Claris?"
    a: "No."
  - q: "Can I use both?"
    a: "Yes. Smarty Pants uses a standard API, so it fits alongside other tools."
  - q: "Are there other ways to run AI on my own Mac?"
    a: "MacRumors names LM Studio for a single Mac and the open-source Exo for linking several. Our guide, How to run an LLM on a Mac, covers the basics."
related: ["/guides/how-to-run-an-llm-on-a-mac/", "/guides/decentralized-vs-centralized-inference/", "/guides/how-much-ram-to-run-an-llm/", "/inference/vs-centralized-providers/", "/earn/", "/guides/what-is-mlx/"]
sources:
  - label: "MacRumors: Apple's Claris Testing 'Harbor' App for Local AI on Macs (10 Nov 2026)"
    url: "https://www.macrumors.com/2026/11/10/apple-claris-harbor-app/"
  - label: "9to5Mac: Apple has new Mac app coming to make running local AI models easy (10 Nov 2026)"
    url: "https://9to5mac.com/2026/11/10/apple-has-new-mac-app-coming-to-make-running-local-ai-models-easy/"
  - label: "Globe TV: Claris previews Harbor, a Mac app that pools Apple silicon memory for local AI (10 Nov 2026)"
    url: "https://globetv.app/news/claris-previews-harbor-a-mac-app-that-pools-apple-silicon-memory-for-local-ai-6af3abf5765e9"
  - label: "Smarty Pants: API"
    url: "https://smartypants.network/api"
  - label: "Smarty Pants: Agent kit and docs"
    url: "https://smartypants.network/docs/agents"
  - label: "Smarty Pants: For teams"
    url: "https://smartypants.network/for-teams"
  - label: "Smarty Pants: /v1/models"
    url: "https://smartypants.network/v1/models"
---

On 10 November 2026, [MacRumors reported](https://www.macrumors.com/2026/11/10/apple-claris-harbor-app/) that Claris is testing a Mac app called Harbor for running AI models on your own Macs. Harbor and Smarty Pants start from the same idea: Apple silicon is a great place to run open AI models. This page compares what has been reported about Harbor with what Smarty Pants does today. Smarty Pants is not affiliated with Apple or Claris, and we have not used Harbor because it is not public yet.

## What is Smarty Pants?

**Smarty Pants runs AI requests on Apple silicon Macs: your own, your team's, or Macs whose owners make them available while idle.**

- **For developers:** call pinned open models through an OpenAI-compatible API at `https://smartypants.network/v1` and pay per token. Each model's exact build is listed at [/v1/models](https://smartypants.network/v1/models). You are not charged for a request Smarty Pants can't serve. [[API_ACCESS]]
- **For teams:** put your company's own Macs in a Group. Members use them for AI at no charge, and you can set the Group so its work runs only on your Group's Macs ([For teams](https://smartypants.network/for-teams)). Group sign-up is invite only for now.
- **Keep a model on your own Mac:** if your Mac is in Smarty Pants, pick models in the Mac app to keep on it, and your own requests for them run on that Mac for free. If it is busy or off, the request goes to the network at the normal price. Kept models also work with no internet: apps on the Mac call them at `http://127.0.0.1:7777/v1`, or you can use the Chat on this Mac window, and nothing leaves the Mac.
- **For Mac owners:** earn from a Mac that would otherwise sit idle. Earn up to $1/day per eligible Mac during the intro offer. Eligible means a supported Apple silicon Mac with 16 GB of memory or more, in the US. Mac owner sign-up is invite only for now.

## What is Harbor?

**Harbor is a Mac app from Claris that news reports describe as turning Apple silicon Macs into a private AI server.** Here is what the reports say:

- **Who makes it:** Claris, the Apple subsidiary best known for FileMaker. [9to5Mac](https://9to5mac.com/2026/11/10/apple-has-new-mac-app-coming-to-make-running-local-ai-models-easy/) says it was found by leaker Aaron Perris and is in a private preview.
- **What it does:** browse, download and run open-weight models on a Mac. Claris's sign-up copy promises "no manual configuration, no command line," and setup "in minutes, not hours," per MacRumors.
- **Linking Macs:** several Macs connected with Thunderbolt 5 cables can pool their memory to run bigger models or serve more requests at once. MacRumors notes Apple added faster Mac-to-Mac links over Thunderbolt 5 in macOS Tahoe 26.2.
- **Privacy:** the copy quoted by MacRumors says "your data never leaves your hardware, and nothing reaches the cloud."
- **Status and price:** early access only. A short-lived App Store listing was removed, and [Claris has not said](https://globetv.app/news/claris-previews-harbor-a-mac-app-that-pools-apple-silicon-memory-for-local-ai-6af3abf5765e9) what Harbor will cost or when it will ship.
- **Who it's for:** not stated. The sign-up form asks for a company name, which MacRumors reads as a business focus.

No report mentions earning money from idle Macs, sharing capacity with other people, or a pay-per-token API.

## The core difference

**Both run open models on Apple silicon Macs. Harbor is reported as an app for Macs you own. Smarty Pants lets you keep models on your own Mac too, and adds an on-demand network, a standard API and a way to earn.**

| | Harbor (as reported) | Smarty Pants |
|---|---|---|
| Available today | Early access only | Yes. API sign-up is open; Mac owners and Groups join by invite |
| Price | Not announced | Pay per token; your own Macs in a Group are free to use |
| Keep a model on your own Mac for your own use | Yes (price not announced) | Yes, free, in the Mac app (adding a Mac is by invite) |
| Your team's Macs | Yes, cabled together | Yes, with a Group |
| Works with no internet | Not reported; Claris says nothing reaches the cloud | Yes, for models kept on your Mac |
| Extra capacity when you need it | Not reported; uses the Macs you own | Yes, from the network |
| Need to buy Macs first | Yes | No |
| Works with the OpenAI SDK | Not reported | Yes. Change the base URL and key |
| Earn from idle Macs | Not reported | Yes, for eligible Macs |
| How your request is protected | Stays on your own hardware, per Claris | Encrypted for the one Mac that answers; approved, signed Macs; nothing kept in our logs |
| One model split across several Macs | Yes, over Thunderbolt 5 | No. Each request runs on one Mac |

## Where Smarty Pants is the better choice

- **You want to start today.** Harbor has no public release date. Smarty Pants API sign-up is open at [smartypants.network/api](https://smartypants.network/api).
- **You don't want to buy hardware.** With Smarty Pants you pay only for the tokens you use.
- **Your usage is light or uneven.** If you only need AI now and then, paying per token can cost less than buying Macs that sit idle most of the day.
- **You want your own Mac and more.** Keep the models you use most on your own Mac for free, run your team's work on your Group's Macs, and use the network when you need extra capacity, all from one app.
- **You want to earn from a Mac you already have.** Eligible owners earn from idle time during the intro offer, and their own use of kept models stays free.
- **You want a standard API.** Smarty Pants works with the OpenAI SDK: change the base URL and key.
- **You want exact, named builds.** Every model is pinned to the build listed in `/v1/models`, so you know exactly which weights answered.

## When Harbor might fit

Harbor may suit you if you need one model too large for any single Mac and are ready to buy several Thunderbolt 5 Macs and cable them together, or if you need a setup that, per Claris, keeps your data on your own hardware and away from the cloud. Smarty Pants can do that too for models you keep on your own Mac, but it doesn't link several Macs into one.

## How Smarty Pants protects requests on the network

When a request runs on another member's Mac, these protections apply:

- **Encrypted for one Mac.** Each request travels over an encrypted connection, then is sealed with a key that only the Mac chosen to answer it holds (AES-256-GCM). Other Macs on the network can't read it.
- **Approved Macs only.** Mac owners join by invite and run our signed app, which checks the Mac's chip, memory and real speed before it can do any paid work. Owners agree not to read requests, and the app doesn't show them.
- **Nothing kept.** Prompts and answers aren't stored in our product logs, and the Mac drops them when the work is done.
- **Checked models.** Every model is a build we tested and signed, and the app checks each file against that signature before using it.
- **Outgoing connection only.** Each Mac connects out to Smarty Pants for work, so no one connects into it from the internet.

To answer a request, the chosen Mac has to unlock it in memory and run the model on it. That's true of any service that runs AI, and it's why a model kept on your own Mac, or a Group set to Group only, is the best home for your most sensitive work.

## Trade-offs to know

**Smarty Pants**

- On the shared network, requests run on member Macs, protected as described above. For your most sensitive work, call a model kept on your own Mac at `http://127.0.0.1:7777/v1`, which answers on that Mac and never leaves it, or use a Group set to run only on your own Macs. Requests sent through the regular API run on your own Mac first, but if it is busy or off they go to the network.
- Capacity for a given model depends on how many Macs are online. Check live status at [/v1/models](https://smartypants.network/v1/models) before you build on it.
- Each request runs on one Mac, so the very largest models aren't offered.
- Offline use covers only models kept on that one Mac; other models need an internet connection.

**Harbor**

- Not public, with no price or release date.
- You buy and run the Macs yourself.
- Linking Macs requires Thunderbolt 5 Macs cabled together.
- Your models can only use the Macs you own.
- Details come from early reports.

## The bottom line

**If you want open models today without buying hardware, want to keep your favorite models on your own Mac for free, want to run on your team's Macs with extra capacity when you need it, or want to earn from a Mac you already own, Smarty Pants is built for that. If you need one very large model spread across several cabled Macs, Harbor may be worth a look once Claris ships it.** Many teams will reasonably use both. We'll update this page when Claris publishes official details.
