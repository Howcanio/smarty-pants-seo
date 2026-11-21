---
layout: ../../layouts/ContentLayout.astro
title: "Call AI models from inside an agent sandbox"
description: "Each Smarty Pants workspace gets its own model key with a spending budget, so code and coding agents inside it can call open models on the same bill."
h1: "Model calls from inside a workspace"
eyebrow: "Agent workspaces"
audience: "buyer"
status: "invite"
primaryKeyword: "llm calls from sandbox"
keywords: ["llm calls from sandbox", "agent sandbox api key", "coding agent sandbox", "sandbox with llm access"]
summary: "Every Smarty Pants workspace gets its own model key, already set in its environment, capped at a budget you choose and ended with the workspace. Code and coding agents inside the workspace call Smarty Pants models at the usual per-token price, on the same bill. sp.coding_agent(task, repo=...) runs Claude Code in a workspace on Smarty Pants models and returns its answer, its changes as a diff and the cost."
published: "2026-11-09"
updated: "2026-11-19"
readingMinutes: 3
faqs:
  - q: "Do I put my own API key in the workspace?"
    a: "No. The workspace gets its own key, set in its environment, with a budget you choose. It can only call models, and it stops working when the workspace ends."
  - q: "How are model calls from a workspace charged?"
    a: "Per token at each model's usual price (GET /v1/models), on the same bill as the workspace time, capped by the budget you set."
  - q: "Can I run a coding agent in a workspace?"
    a: "Yes. sp.coding_agent(task, repo=...) in Python, sp.codingAgent(task, { repo }) in JavaScript, or smartypants job --task opens a workspace, runs Claude Code on Smarty Pants models and returns its answer, a diff and the cost."
  - q: "Can the workspace key make another key?"
    a: "No. The key can call models only; it cannot create keys, spend beyond its budget or reach your account."
related: ["/workspaces/", "/workspaces/sessions/", "/inference/", "/pricing/"]
sources:
  - label: "Smarty Pants: Agent kit (Workspaces)"
    url: "https://smartypants.network/docs/agents"
---

An agent in a sandbox often needs a model. In a Smarty Pants workspace the key is already there, limited to that workspace and to a budget, so you never paste your own key into a VM on someone else's Mac.

## How does the workspace key work?

It is created with the workspace, set in its environment, capped at the budget you pass (`--budget USD`, `budget_usd`), and revoked when the workspace ends. It calls the same OpenAI-compatible API at `https://smartypants.network/v1` as any key.

## How do I run a coding agent?

One call. It opens a workspace with the reviewed internet sites, runs Claude Code there on Smarty Pants models, and returns its answer, its changes as a diff and what it cost.

```python
from smartypants import SmartyPants
sp = SmartyPants()
result = sp.coding_agent("Fix the failing test", repo="https://github.com/you/repo", budget_usd=1)
print(result["output"]); print(result["diff"])
```

For a whole job with setup and tests, use `sp.job(repo=..., setup=..., task=..., test=...)` or `smartypants job --task "..."`.

## What does it cost?

Model calls are per token at the usual model price ([price page](/pricing/#models)), and workspace time is $0.0129 an hour for 2 vCPU and 2 GB, free on your own or your Group's Macs. Paid workspaces on other people's Macs are on Smarty Pants' own account first.
