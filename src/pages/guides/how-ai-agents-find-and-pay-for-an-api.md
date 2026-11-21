---
layout: ../../layouts/ContentLayout.astro
title: "How an AI agent can find, try and pay for an AI API"
description: "How an AI agent finds an AI API, checks models and prices, stays inside a spending limit and gets a person to pay."
h1: "How can an AI agent find, try and pay for an AI API on its own?"
eyebrow: "Guide"
audience: "buyer"
primaryKeyword: "ai agent api discovery"
keywords: ["llms.txt", "mcp registry", "ai agent pay for api", "agent spending limit api", "machine readable api pricing", "agent sign up api"]
summary: "An agent finds an API through llms.txt, the MCP Registry, OpenAPI files and package registries; checks models, prices and readiness from a JSON list such as /v1/models; asks its person before spending; stays inside a per-key limit it can read; and never handles card details: it hands the person a payment page. Smarty Pants offers each of these: llms.txt, an MCP server listed in the official MCP Registry, /openapi.json, /v1/models with prices and is_ready, GET /v1/key for the limit, and add_credit for a Stripe page the person pays on."
published: "2026-11-19"
updated: "2026-11-19"
readingMinutes: 5
faqs:
  - q: "What is llms.txt?"
    a: "A plain-text file at the root of a site that tells language models what the site offers and links its key docs. Smarty Pants publishes https://smartypants.network/llms.txt and a longer https://smartypants.network/llms-full.txt."
  - q: "How does an agent find an MCP server?"
    a: "From the official MCP Registry (registry.modelcontextprotocol.io), from directories that copy it, or from a site's /.well-known/mcp.json. Smarty Pants is listed in the registry as network.smartypants/smartypants."
  - q: "Can an agent pay for an API by itself?"
    a: "It should not handle card details. On Smarty Pants an agent calls add_credit over MCP, which returns a Stripe payment page, and the person pays there. The agent should ask the person before spending at all."
  - q: "How does an agent know how much it may spend?"
    a: "GET https://smartypants.network/v1/key shows the key's own spending limit, what it has spent and remaining_usd. Each MCP connection is capped at $20 a month."
  - q: "How do I get a key?"
    a: "[[API_ACCESS]]"
related: ["/guides/use-open-models-in-agent-frameworks/", "/guides/openai-compatible-api-explained/", "/guides/ai-agent-sandboxes-explained/", "/inference/pricing/"]
sources:
  - label: "llms.txt proposal"
    url: "https://llmstxt.org/"
  - label: "Official MCP Registry"
    url: "https://registry.modelcontextprotocol.io/"
  - label: "Smarty Pants in the MCP Registry"
    url: "https://registry.modelcontextprotocol.io/v0/servers?search=network.smartypants"
  - label: "Smarty Pants: llms.txt"
    url: "https://smartypants.network/llms.txt"
  - label: "Smarty Pants: Agent kit and docs"
    url: "https://smartypants.network/docs/agents"
---

People pick an API by reading a pricing page. Agents pick one by reading files. An API an agent can use without a human walking it through needs five things: a way to be found, a machine-readable list of models and prices, a way to know if it works right now, a spending limit the agent can read, and a payment step that a person completes. Here is how each one looks, with Smarty Pants as the worked example.

## 1. How does an agent find the API?

**Through files and registries made for machines.**

| Door | What it is | Smarty Pants |
|---|---|---|
| llms.txt | A plain-text summary for language models at the site root | [/llms.txt](https://smartypants.network/llms.txt), [/llms-full.txt](https://smartypants.network/llms-full.txt) |
| MCP Registry | The official list of MCP servers that clients search | `network.smartypants/smartypants` |
| Well-known file | A JSON card at a fixed path | [/.well-known/mcp.json](https://smartypants.network/.well-known/mcp.json) |
| OpenAPI | A description of every public route | [/openapi.json](https://smartypants.network/openapi.json) |
| Package registries | Install by name | `pip install smartypants-network`, `npm install smartypants-network` |

## 2. How does it check models and prices?

**From a JSON list it can read without signing in.** `GET https://smartypants.network/v1/models` lists every model with its exact build, context size, per-token price and license. The MCP server at `/mcp` (no sign-in) adds `find_model` and `estimate_cost`.

## 3. How does it know the API works right now?

**From a readiness field and honest errors.** On Smarty Pants each model has `is_ready`; when it is false, keep your current provider. A 429 or 503 means no Mac can take the request right now, with a `Retry-After` header. For code jobs, [/v1/results/jobs](https://smartypants.network/v1/results/jobs) publishes how recent jobs went as JSON, with a sha256 anyone can check.

## 4. How does it stay inside a budget?

**It reads its own limit before costly work.** `GET https://smartypants.network/v1/key` returns the key's limit, what it has spent and `remaining_usd`. A person can give any key its own monthly limit; each connected MCP app is capped at $20 a month and its connection lasts 90 days.

## 5. Who pays?

**The person, on a payment page.** The agent should ask its person before spending, and never handle card details. Over the signed-in MCP server (`/mcp/account`), `add_credit` returns a Stripe page; the person pays there and the balance updates about a minute later.

[[API_ACCESS]] [[PRIVACY]]
