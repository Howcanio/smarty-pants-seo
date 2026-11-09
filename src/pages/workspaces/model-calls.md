---
layout: ../../layouts/ContentLayout.astro
title: "Call LLMs from an agent sandbox (Planned)"
description: "Planned for Smarty Pants workspaces: call models from inside a workspace with a workspace-scoped key and budget. Real keys never enter the VM."
h1: "Model calls from agent workspaces (Planned)"
eyebrow: "Agent workspaces"
audience: "buyer"
status: "planned"
primaryKeyword: "llm calls from agent sandbox"
keywords: ["llm calls from agent sandbox", "ai credentials proxy", "sandbox api key placeholder", "workspace scoped api key"]
summary: "Model calls from Smarty Pants workspaces are Planned, not available today. The plan: an agent inside a workspace calls Smarty Pants models with a key scoped to that one workspace and a spending budget. The VM would hold only a placeholder key; the Smarty Pants site would swap in the real key, so real keys never enter the VM. Today, workspaces have no network, so call models from your own code instead."
published: "2026-11-09"
updated: "2026-11-09"
readingMinutes: 4
faqs:
  - q: "Can code in a Smarty Pants workspace call a model today?"
    a: "No. Workspaces have no network today, and model calls from workspaces are Planned. Call the Smarty Pants API from your own code outside the workspace instead."
  - q: "What is a placeholder key?"
    a: "A stand-in key the workspace would hold instead of a real one. Under the plan, the Smarty Pants site checks it, swaps in the real key and forwards the call, so the real key never enters the VM."
  - q: "Why not just put my API key in the workspace?"
    a: "Because a workspace's files and memory are not confidential from the Mac's owner. Never put a real key in a workspace."
  - q: "Would model calls from a workspace have a spending limit?"
    a: "That is the plan: a key scoped to one workspace, with a budget, that stops working when the workspace ends."
  - q: "How will I know when this opens?"
    a: "We'll announce it on smartypants.network/docs/agents when it opens."
related: ["/inference/", "/inference/openai-compatible-api/", "/workspaces/", "/workspaces/sessions/"]
sources:
  - label: "Smarty Pants: Agent kit"
    url: "https://smartypants.network/docs/agents"
---

**Planned.** Nothing on this page is available today. It describes how Smarty Pants intends to let an agent running inside a workspace call AI models without ever holding a real API key.

## Can a workspace call a model today?

No. Today's [workspace sessions](/workspaces/sessions/) have no network, so code inside them cannot reach any API. If your agent needs a model, call the Smarty Pants [inference API](/inference/) from your own code outside the workspace, and pass results in as files.

## What is planned?

Two things together: a key scoped to one workspace with a budget, and a proxy that keeps real keys out of the VM.

| Piece | Planned behavior |
|---|---|
| Workspace-scoped key | Works for one workspace only, with a spending budget |
| Placeholder in the VM | The guest gets a placeholder key and a base URL, not a real key |
| Swap on the site | The Smarty Pants site checks the placeholder, swaps in the real key and sends the call only to that provider |
| Metering | The site counts tokens for each workspace |
| End of life | Placeholders stop working when the workspace stops; any workspace can be blocked |

The proxy is planned to live on the Smarty Pants site, never inside the guest VM.

## Why keep real keys out of the VM?

Because the VM does not hide its contents from the Mac's owner. VM isolation protects the owner from guest code. It does not keep the guest's files or memory confidential from the Mac's owner.

So a real key inside a workspace could be read on the Mac it runs on. A placeholder that only works through the Smarty Pants site, for one workspace, and dies when the workspace ends, is worth little if copied. That is the point of the design.

## Which models would a workspace call?

Smarty Pants models through the same OpenAI-compatible API at `https://smartypants.network/v1` that you can see today. See the [OpenAI-compatible API](/inference/openai-compatible-api/) page and the live [/v1/models](https://smartypants.network/v1/models) list for models and prices.

The roadmap also describes the same placeholder approach for keys to some outside AI providers, so an agent could use them without the real key entering the VM. That part is also Planned.

## What has to happen first?

Workspaces need a way to reach the internet at all. Guest internet access through a filter is Planned: the VM would still have no network card, and its web traffic would go through a filter that allows listed public sites only and blocks home-network addresses. Under that design, model calls would go to the Smarty Pants site, where the real key is added, so the key never reaches the Mac.

The plan also includes measuring cost per completed task, completion rate and elapsed time against using outside providers only, before this opens.

## What is built so far?

Nothing for this feature. The credential proxy and the guest internet filter are designs, not code that runs on any Mac.

## When will it open?

There is no date. We'll announce it on smartypants.network/docs/agents when it opens. Until then, read the live [agent docs](https://smartypants.network/docs/agents), and use the [inference API](/inference/) from outside the workspace. Smarty Pants is opening in stages; sign in with your email on [smartypants.network/api](https://smartypants.network/api) to get a key.
