# Content brief for writers

Read `docs/allowed-claims.md` first. It is the only list of things we may say about Smarty Pants. Anything else must come from a public source you actually opened, cited inline as a Markdown link and listed in `sources`.

## Voice

Plain, specific, no hype. Short sentences. Say what something is, what it costs (if listed), what it doesn't do yet. Never use: revolutionary, seamless, cutting-edge, unleash, game-changer, supercharge, "in today's fast-paced world". No em dashes; use commas, colons or full stops. Sentence-case headings. American spelling. Name trade-offs honestly (when a hosted provider or a local model is the better choice, say so).

## AI-search rules (AEO)

- Open each page with a 40–80 word `summary` that answers the main question on its own (it shows in a "Short answer" box and is what AI assistants quote).
- Each H2 is a question or a clear task, followed by a one- or two-sentence direct answer, then detail.
- Use tables for comparisons and specs.
- Always call the product "Smarty Pants" and the site "smartypants.network". Model names exactly as in the catalog table.
- 4–6 FAQs per page; each answer 1–3 sentences, self-contained.

## Frontmatter template (Markdown pages)

```yaml
---
layout: ../../layouts/ContentLayout.astro   # ../../ for /x/page.md, ../ for /x/index.md, ../../../ for /x/y/page.md
title: "Under 60 characters, primary keyword first"
description: "110 to 160 characters. Plain sentence with the primary keyword."
h1: "The visible headline (may be longer than title)"
eyebrow: "Guide"            # Guide | For developers | For Mac owners | Agent workspaces | CPU jobs
audience: "buyer"          # buyer | supplier | both
status: "live"             # optional: live | testing | invite | planned  (shows a badge under the h1)
primaryKeyword: "run llm on mac"
keywords: ["…", "…"]
summary: "40-80 word short answer."
published: "2026-11-09"
updated: "2026-11-09"
readingMinutes: 6
faqs:
  - q: "Question?"
    a: "Answer."
related: ["/guides/what-is-mlx/", "/ai-models/"]
sources:
  - label: "Publisher: page title"
    url: "https://…"
---
```

Body: Markdown, starting with an intro paragraph (no H1 in the body; the layout prints it). Use `##` and `###` only. Internal links must use the exact URLs below, with trailing slashes. External links go to the primary source. Length 700–1,400 words for guides, 500–1,000 for product pages.

## URL map (use only these internal URLs)

Hubs: `/` · `/ai-models/` · `/macs/` · `/guides/`

For developers (buyers):
- `/inference/` LLM inference API on Apple Silicon Macs (hub)
- `/inference/openai-compatible-api/` OpenAI-compatible API
- `/inference/pricing/` Prices and cost calculator (built by the lead, don't write it)
- `/inference/vs-centralized-providers/` Smarty Pants vs. centralized providers
- `/inference/embeddings-api/` Embeddings API
- `/inference/speech-to-text-api/` Speech to text (Whisper) API
- `/inference/image-generation-api/` Image generation (FLUX.1 schnell) API
- `/inference/video-generation/` Video generation (Planned)
- `/cpu/` Sandboxed CPU jobs on Macs (remote code runs)
- `/workspaces/` Agent workspaces (hub)
- `/workspaces/sessions/` Workspace sessions
- `/workspaces/snapshots-and-recovery/` Snapshots and recovery (Planned)
- `/workspaces/model-calls/` Model calls from workspaces (Planned)
- `/workspaces/fleets/` Fleets and browser work (Planned)
- `/workspaces/always-on-agents/` Always-on agents (Planned)

For Mac owners (suppliers):
- `/earn/` Earn with your Mac
- `/earn/how-it-works/` How it works
- `/earn/safety-and-controls/` Safety and controls
- `/earn/earnings/` How earnings work

Models (data-driven, built by the lead): `/ai-models/qwen3-5-9b/`, `/ai-models/qwen3-5-4b/`, `/ai-models/qwen3-8-27b/`, `/ai-models/nanbeige4-3-33b/`, `/ai-models/qwen3-6-35b-a3b/`, `/ai-models/gpt-oss-20b/`, `/ai-models/qwen3-embedding-0-6b/`, `/ai-models/whisper-large-v3-turbo/`, `/ai-models/flux-1-schnell/`

Macs (data-driven, built by the lead): `/macs/m1/`, `/macs/m1-pro/`, `/macs/m1-max/`, `/macs/m1-ultra/`, `/macs/m2/`, `/macs/m2-pro/`, `/macs/m2-max/`, `/macs/m2-ultra/`, `/macs/m3/`, `/macs/m3-pro/`, `/macs/m3-max/`, `/macs/m3-ultra/`, `/macs/m4/`, `/macs/m4-pro/`, `/macs/m4-max/`, `/macs/m5/`, `/macs/m5-pro/`, `/macs/m5-max/`, `/macs/m5-ultra/`, `/macs/m6/`

Guides:
- `/guides/how-to-run-an-llm-on-a-mac/`
- `/guides/how-much-ram-to-run-an-llm/`
- `/guides/what-is-mlx/`
- `/guides/mac-mini-for-ai/`
- `/guides/make-money-with-an-idle-mac/`
- `/guides/openai-compatible-api-explained/`
- `/guides/decentralized-vs-centralized-inference/`
- `/guides/llm-api-pricing-explained/`
- `/guides/ai-agent-sandboxes-explained/`

Main product links (external, allowed): `https://smartypants.network/api`, `https://smartypants.network/docs/agents`, `https://smartypants.network/v1/models`, `https://smartypants.network/playground`, `https://smartypants.network/compatibility`, `https://smartypants.network/humans`, `https://smartypants.network/for-teams`, `https://smartypants.network/request-a-model`, `https://smartypants.network/legal`, `https://smartypants.network/llms.txt`, `https://huggingface.co/datasets/smartypantsnet/mac-benchmarks`.

## Verification rule

Every number (memory size, price, speed, date, percentage, electricity rate, wattage) must come from a source you opened in this task. Cite it inline and in `sources`. Prefer: Apple (support.apple.com tech specs, apple.com newsroom), Hugging Face model cards, official provider pricing pages, EIA for electricity prices, the MLX GitHub repo, the OpenAI API reference. If you can't verify a number, leave it out and list it in your final report under "Couldn't verify".
