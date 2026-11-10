---
layout: ../../layouts/ContentLayout.astro
title: "Call LLMs from an agent sandbox (Planned)"
description: "Planned for Smarty Pants workspaces: call models from inside a workspace with a key limited to that workspace and a spending budget. Not available yet."
h1: "Model calls from agent workspaces (Planned)"
eyebrow: "Agent workspaces"
audience: "buyer"
status: "planned"
primaryKeyword: "llm calls from agent sandbox"
keywords: ["llm calls from agent sandbox", "workspace scoped api key", "llm budget for ai agents", "call models from a sandbox"]
summary: "Model calls from Smarty Pants workspaces are Planned and not available today. They will let an agent inside a workspace call Smarty Pants models with a key limited to that workspace and a spending budget. Today, workspaces have no network, so call the Smarty Pants inference API from your own code outside the workspace."
published: "2026-11-09"
updated: "2026-11-09"
readingMinutes: 3
faqs:
  - q: "Can code in a Smarty Pants workspace call a model today?"
    a: "No. Workspaces have no network today, and model calls from workspaces are Planned. Call the Smarty Pants API from your own code outside the workspace instead."
  - q: "What will model calls from a workspace let me do?"
    a: "Call Smarty Pants models from inside a workspace with a key limited to that workspace and a spending budget. This is Planned and not available."
  - q: "Why not just put my API key in the workspace?"
    a: "Because a workspace's files and memory are not confidential from the Mac's owner. Never put a real key in a workspace."
  - q: "How will I know when this opens?"
    a: "We'll announce it on smartypants.network/docs/agents when it opens."
related: ["/inference/", "/inference/openai-compatible-api/", "/workspaces/", "/workspaces/sessions/"]
sources:
  - label: "Smarty Pants: Agent kit"
    url: "https://smartypants.network/docs/agents"
---

**Planned.** Model calls from workspaces are not available today. They will let an agent running inside a workspace call Smarty Pants models with a key limited to that workspace and a spending budget.

## What is available today and what is Planned?

| Feature | Status |
|---|---|
| Call the Smarty Pants [inference API](/inference/) from your own code, outside the workspace | Available today |
| [Workspace sessions](/workspaces/sessions/), with no network, on Smarty Pants' own account first | Available today |
| Call Smarty Pants models from inside a workspace, with a key limited to that workspace and a spending budget | Planned |

## How do I use a model with a workspace today?

From outside it. Today's [workspace sessions](/workspaces/sessions/) have no network, so code inside them cannot reach any API. Call the Smarty Pants [inference API](/inference/) from your own code, and pass results into the workspace as files.

The API is OpenAI-compatible at `https://smartypants.network/v1`. See the [OpenAI-compatible API](/inference/openai-compatible-api/) page and the live [/v1/models](https://smartypants.network/v1/models) list for models and prices.

Inference requests run on Macs owned by other people. A serving Mac decrypts each request in memory to answer it. Owners agree not to read requests and the app doesn't show them, but that is a rule and a design, not a technical guarantee, so don't send sensitive data on the general network.

## Why not put an API key in a workspace?

Because the VM does not hide its contents from the Mac's owner. VM isolation protects the Mac's owner from guest code. It does not keep the guest's files or memory confidential from the Mac's owner. A real key inside a workspace could be read on the Mac it runs on, so never put one there.

## When will it open?

There is no date. We'll announce it on smartypants.network/docs/agents when it opens. Until then, read the live [agent docs](https://smartypants.network/docs/agents), and use the [inference API](/inference/) from outside the workspace. [[API_ACCESS]]
