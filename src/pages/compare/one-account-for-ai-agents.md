---
layout: ../../layouts/ContentLayout.astro
title: "One account for AI agents instead of five: Smarty Pants"
description: "What developers stitch together for AI agents today (model API, batch, sandboxes, dev VMs, Mac CI, workers) and what one Smarty Pants account covers, with dated prices."
h1: "One account for your agents, instead of five"
eyebrow: "Compare"
audience: "buyer"
primaryKeyword: "all in one platform for ai agents"
keywords: ["all in one platform for ai agents", "ai agent infrastructure", "openrouter e2b alternative", "one api for models and sandboxes", "free ci on your own macs", "agent sandbox and model api", "developer platform for agents"]
summary: "Teams running AI agents usually stitch together a model API, a batch service, a sandbox provider, a dev VM, Mac CI minutes and a worker host, each with its own key, bill and dashboard. Smarty Pants puts open models, embeddings, reranking, half-price batches, scheduled batches, scheduled jobs on your Group's Macs, a skills shelf and sealed Linux workspaces behind one key and one balance. Work on Macs you or your Group own is free. GitHub Actions runners on your Group's Macs, Linux CI and Docker builds are coming soon, and are marked that way below."
published: "2026-11-21"
updated: "2026-11-22"
readingMinutes: 5
faqs:
  - q: "What can I use on Smarty Pants today?"
    a: "Open models through an OpenAI-compatible API (12 listed on /v1/models on 21 Nov 2026), embeddings, reranking, video, batches at half the normal per-token price, saved batches that run on a schedule, an MCP server, a command-line tool and a skills shelf of vetted agent skills. Sign-up is open and new accounts get $10 of free credit. Workspaces and Groups are invite only for now."
  - q: "What is coming soon?"
    a: "GitHub Actions runners on your own or your Group's Macs, Linux CI runners, arm64 Docker builds and Mac app builds. None of these are on sale today."
  - q: "Is it really free on my own Macs?"
    a: "Yes. Model calls, workspaces, code runs and batches on Macs you own, or your Group's Macs for its members, cost nothing. You pay only for work that runs on other people's Macs."
  - q: "Will CI runners run on strangers' Macs?"
    a: "No. Apple's macOS license does not allow renting macOS by the minute, so Mac CI runs only on Macs you or your Group own."
  - q: "When should I keep my current tools?"
    a: "When you need GPUs, x86 machines, very long context, guaranteed capacity, a SOC 2 report, or always-on services. Smarty Pants depends on Macs that are idle and online."
related: ["/compare/", "/groups/", "/workspaces/", "/pricing/", "/compare/smarty-pants-vs-github-codespaces/", "/compare/smarty-pants-vs-cirrus-runners/"]
sources:
  - label: "Smarty Pants: GET /v1/models (21 Nov 2026)"
    url: "https://smartypants.network/v1/models"
  - label: "Smarty Pants: llms.txt (batches, MCP, CLI; 21 Nov 2026)"
    url: "https://smartypants.network/llms.txt"
  - label: "GitHub Docs: Actions runner pricing (checked 21 Nov 2026)"
    url: "https://docs.github.com/en/billing/reference/actions-runner-pricing"
  - label: "GitHub Docs: Codespaces billing (checked 21 Nov 2026)"
    url: "https://docs.github.com/en/billing/concepts/product-billing/github-codespaces"
  - label: "Render: pricing (checked 21 Nov 2026)"
    url: "https://render.com/pricing"
  - label: "Depot: pricing (checked 21 Nov 2026)"
    url: "https://depot.dev/pricing"
---

An agent with a real job needs more than a model. It needs somewhere to run code, somewhere to run tests, something that wakes it up on a schedule, and a way to do a thousand cheap calls overnight. Today that usually means five sign-ups, five keys in your secrets file and five invoices at the end of the month. We counted. Then we built one account.

## What do developers stitch together today?

| The job | What people often use | Their listed price (checked 21 Nov 2026) | On Smarty Pants |
|---|---|---|---|
| Open model calls | OpenRouter, Together AI | Varies by model | Live: the median price of hosted sellers of the same model; free on your own and your Group's Macs |
| Overnight bulk calls | A batch API | Often half price | Live: batches at half the per-token price, plus saved batches that run every 15 minutes or more |
| Embeddings and reranking | A second vendor | Varies | Live, same key |
| Agent skills | Copying SKILL.md files from repos | Free, unchecked | Live: a shelf of checked skills, one command to install |
| Agent sandboxes | E2B, Daytona, Modal | Per second | Our own account first: sealed Linux workspaces, $0.0666 an hour for 2 vCPU and 2 GB |
| Dev VM | GitHub Codespaces | $0.18 an hour, 2-core | Workspaces as above; free on your own Macs |
| Mac CI | GitHub macOS runners, Cirrus Runners | $0.062 a minute; $150 a month per runner | Coming soon: GitHub Actions runners on your own or your Group's Macs, free |
| Linux CI | GitHub Linux runners | $0.006 a minute, 2-core | Coming soon |
| Background workers and cron | Render | From $7 a month per worker | Live: scheduled code runs and background jobs on your own or your Group's Macs, free, plus scheduled batches |
| Docker builds | Depot, Docker Build Cloud | Depot $20 a month for 500 build minutes | Coming soon: arm64 builds on your Group's Macs |

Sources: [GitHub runner pricing](https://docs.github.com/en/billing/reference/actions-runner-pricing), [Codespaces billing](https://docs.github.com/en/billing/concepts/product-billing/github-codespaces), [Cirrus Runners](https://cirrus-runners.app/), [Render pricing](https://render.com/pricing), [Depot pricing](https://depot.dev/pricing), all checked 21 Nov 2026. The products differ in size and features; each comparison page has the details.

## Why is one account easier?

- **One key, one balance, one bill.** The same key calls models, runs batches and opens workspaces. Nothing to reconcile across five dashboards on the first of the month.
- **Your Group's Macs are free.** Invite your team into a [Group](/groups/) and every member uses the Macs the Group owns for models, workspaces, code runs and batches at no charge. Work can stay on those Macs only, or spill over to the network when they're busy. This is the part the stitched-together stack can't copy: you already paid for those Macs.
- **Built for agents to drive.** An OpenAI-compatible API, an [MCP server](https://smartypants.network/docs/agents), a command-line tool with `--json` output, and `is_ready` on every model so an agent can check before it sends. Your agent can do the setup itself, which is more than can be said for most billing pages.
- **Fewer ways to get it wrong.** Each model is one pinned build named in `build_id`, batches can check their own results and rerun only what failed, and `max_spend_usd` stops a batch at the price you set.

## What is live and what is coming soon?

Live today, with open sign-up and $10 of free credit: model calls, embeddings, reranking, video, batches and scheduled batches, scheduled code runs and background jobs on your own or your Group's Macs (free; if a Mac drops out, the job retries on another), the MCP server and the CLI, and a skills shelf of skills we've checked (outside skills are pinned to a commit) that an agent installs with `npx -y smartypants-network skills add <name>` (listed at [/v1/skills](https://smartypants.network/v1/skills)).

Invite only for now: [workspaces](/workspaces/) and [fleets](/workspaces/fleets/) on the network (free on your own Macs), and [Groups](/groups/).

Coming soon, and not on sale today: GitHub Actions runners on your own or your Group's Macs, Linux CI runners, arm64 Docker builds and [Mac app builds](/workspaces/mac-builds/). Each one stays "coming soon" here until it is live and has passed our own checks.

## When should I keep the stack I have?

Keep a hosted provider when you need GPUs, x86 machines, more than about 16K tokens of context on most models, guaranteed capacity, a SOC 2 report, or a web service that never sleeps. Smarty Pants runs on Macs that are idle and online, so plan a fallback. Many teams start by moving the work that is fine on their own Macs, which is also the work that becomes free.

## How do I start?

Change the base URL to `https://smartypants.network/v1` and the key, and keep the OpenAI SDK. [Get a key](https://smartypants.network/api), see [all prices](/pricing/), or read [how Groups work](/groups/). [[API_ACCESS]]
