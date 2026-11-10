---
layout: ../../layouts/ContentLayout.astro
title: "LLM API pricing explained: tokens, input and output"
description: "How LLM API pricing works: tokens, input vs. output price per million, reasoning tokens, embeddings and per-second compute, with a worked cost example."
h1: "LLM API pricing explained, with a worked example"
eyebrow: "Guide"
audience: "buyer"
primaryKeyword: "llm api pricing"
keywords: ["llm api pricing", "price per million tokens", "input vs output tokens", "reasoning tokens cost", "embeddings api pricing", "open model api price"]
summary: "LLM APIs charge per token, usually quoted in dollars per million tokens, with separate prices for input (your prompt) and output (the model's answer). Output usually costs more. Reasoning tokens are billed as output on OpenAI. Embeddings charge for input only. To estimate cost, multiply input and output token counts by their prices, and compare providers for the same model and build on the same day."
published: "2026-11-09"
updated: "2026-11-09"
readingMinutes: 7
faqs:
  - q: "How is LLM API pricing calculated?"
    a: "Cost equals input tokens times the input price plus output tokens times the output price. Prices are usually quoted per million tokens, so divide your token counts by 1,000,000 first."
  - q: "Does output cost more than input?"
    a: "On the price lists cited here, yes: each output token costs more than each input token. On Smarty Pants, smartypants/qwen3.5-9b listed $0.10 per million input tokens and $0.40 per million output tokens on 8 Nov 2026."
  - q: "Do reasoning tokens cost money?"
    a: "On OpenAI, yes: reasoning tokens are not visible but are billed as output tokens. On other providers, check the usage object in the response and the provider's pricing page."
  - q: "How much does an embeddings API cost?"
    a: "Embeddings charge for input tokens only. smartypants/qwen3-embedding-0.6b listed $0.01 per million input tokens on 8 Nov 2026."
  - q: "Is the same open model the same price everywhere?"
    a: "No. On 9 Nov 2026, published input prices for Qwen3.5 9B ranged from $0.059 to $0.17 per million tokens across providers, and builds, context limits and capacity differ too."
  - q: "Where can I see current Smarty Pants prices?"
    a: "On https://smartypants.network/v1/models, which lists the per-token price for every model, and on the pricing page at /inference/pricing/."
related: ["/inference/pricing/", "/inference/", "/inference/embeddings-api/", "/ai-models/qwen3-5-9b/", "/guides/openai-compatible-api-explained/", "/guides/decentralized-vs-centralized-inference/"]
sources:
  - label: "OpenAI Help Center: What are tokens and how to count them?"
    url: "https://help.openai.com/en/articles/4936856-what-are-tokens-and-how-to-count-them"
  - label: "OpenAI: Reasoning models guide"
    url: "https://developers.openai.com/api/docs/guides/reasoning"
  - label: "OpenAI API reference: Create chat completion (usage object)"
    url: "https://developers.openai.com/api/reference/resources/chat/subresources/completions/methods/create"
  - label: "Smarty Pants: /v1/models (live prices)"
    url: "https://smartypants.network/v1/models"
  - label: "Smarty Pants: Agent kit and docs (CPU job prices)"
    url: "https://smartypants.network/docs/agents"
  - label: "OpenRouter: Qwen3.5-9B (checked 9 Nov 2026)"
    url: "https://openrouter.ai/qwen/qwen3.5-9b"
  - label: "Together AI: Pricing (checked 9 Nov 2026)"
    url: "https://www.together.ai/pricing"
---

Most LLM APIs bill per token, with one price for what you send and another for what the model writes. Once you know your token counts, the math is simple. The hard part is comparing providers fairly, because the same model name can mean different builds, limits and prices. This guide explains each part of a price list and works through one example.

## What is a token?

**A token is a chunk of text the model reads or writes, usually part of a word.** OpenAI's rule of thumb for English is that ["1 token ~= 4 chars"](https://help.openai.com/en/articles/4936856-what-are-tokens-and-how-to-count-them) and "1 token ~= ¾ words". Each model has its own tokenizer, so the same text can be a different number of tokens on different models.

The API tells you the exact count. In OpenAI-format responses, the `usage` object reports `prompt_tokens`, `completion_tokens` and `total_tokens` ([reference](https://developers.openai.com/api/reference/resources/chat/subresources/completions/methods/create)). Use those numbers, not estimates, for billing checks.

## What is the difference between input and output price?

**Input price covers the tokens you send; output price covers the tokens the model generates.** Both are usually quoted in dollars per million tokens. Output is usually the higher number.

Smarty Pants listed prices on 8 Nov 2026 (check [/v1/models](https://smartypants.network/v1/models) for current prices):

| Model | Input, per M tokens | Output, per M tokens | Status |
|---|---|---|---|
| `smartypants/qwen3.5-9b` | $0.10 | $0.40 | released |
| `smartypants/qwen3.8-27b` | $0.20 | $1.20 | released |
| `smartypants/nanbeige4.3-33b` | $0.30 | $2.00 | released |
| `smartypants/gpt-oss-20b` | $0.027 | $0.135 | in testing, opens soon |
| `smartypants/qwen3-embedding-0.6b` | $0.01 | none | released |

Two habits keep costs in check: cap output with `max_tokens`, and trim long prompts, because every resent message in a chat counts as input again.

## How are reasoning tokens billed?

**Reasoning tokens are the model's hidden "thinking" before its answer, and they usually count as output.** OpenAI's [reasoning guide](https://developers.openai.com/api/docs/guides/reasoning) says reasoning tokens "are not visible via the API" but "still occupy space in the model's context window and are billed as output tokens." The usage object reports them in `completion_tokens_details.reasoning_tokens`.

A reasoning model can write far more tokens than the visible answer, so turn reasoning on only when the task needs it. On Smarty Pants, the listed chat models have reasoning off by default (`default_reasoning: "disabled"` on /v1/models), and you turn it on with the `reasoning` parameter.

## How is embeddings pricing different?

**Embeddings charge for input tokens only, because the output is a vector, not text.** `smartypants/qwen3-embedding-0.6b` listed $0.01 per million input tokens on 8 Nov 2026, with 1,024 dimensions or fewer. Embedding one million tokens of documents at that price costs $0.01. Re-embedding the same documents costs the same again, so store vectors once.

## What is per-second compute pricing?

**Some services bill for machine time instead of tokens.** You pay for how long the hardware runs, whatever it produces.

For example, Smarty Pants CPU jobs bill by machine time: listed at $0.00405 per vCPU-hour plus $0.002025 per GB-hour, which the [agent docs](https://smartypants.network/docs/agents) put at about $0.00007 for a 20-second job at the default size of 2 vCPU and 2 GB of memory. CPU jobs are open to Smarty Pants' own account first; see [/cpu/](/cpu/). You pay for the time the machine runs, not for tokens.

Per-second pricing suits steady, heavy traffic that keeps the hardware busy. Per-token pricing suits uneven traffic, because you pay nothing between requests.

## Worked example: what does a summarization job cost?

**Say you summarize 1,000 documents of about 2,000 tokens each into 500-token summaries.** That is 2,000,000 input tokens and 500,000 output tokens on Qwen3.5 9B.

Cost = (2.0 × input price per M) + (0.5 × output price per M).

| Provider | Build | Context | Input / output per M | Calculation | Total | Price checked |
|---|---|---|---|---|---|---|
| Smarty Pants (`smartypants/qwen3.5-9b`) | 4-bit MLX, named in `build_id` | 16,384 tokens | $0.10 / $0.40 | 2.0 × 0.10 + 0.5 × 0.40 | $0.40 | listed 8 Nov 2026, [/v1/models](https://smartypants.network/v1/models) |
| Together AI (Qwen3.5 9B) | Not checked; may differ | Not checked | $0.17 / $0.25 | 2.0 × 0.17 + 0.5 × 0.25 | $0.465 | 9 Nov 2026, [together.ai/pricing](https://www.together.ai/pricing) |
| OpenRouter (Qwen3.5-9B, lowest listed route) | Varies by route: bf16, fp8 or fp4 | 262,144 tokens | $0.059 / $0.086 | 2.0 × 0.059 + 0.5 × 0.086 | $0.161 | 9 Nov 2026, [openrouter.ai](https://openrouter.ai/qwen/qwen3.5-9b) |

The three rows are the same model name but not the same build, so this is a price comparison, not a like-for-like quality comparison. In this example, the lowest OpenRouter route costs less than Smarty Pants, and Together costs a little more. The totals are small either way. What usually decides it is everything else:

- **Build.** Smarty Pants serves a pinned 4-bit MLX build (`build_id` `qwen3.5-9b-mlx-4bit-r938d891`). OpenRouter's provider list on 9 Nov 2026 showed bf16, fp8 and fp4 routes. Different builds can give different answers.
- **Context.** Smarty Pants lists 16,384 tokens of context for this model. OpenRouter lists 262,144. If your documents are longer than the context, the cheaper price doesn't help.
- **Capacity.** Check `is_ready` on Smarty Pants before sending traffic, and keep a fallback.
- **Prices move.** The lowest OpenRouter price for this model changed during the day we checked it. Re-check every provider's own page on the day you compare.

## How do I estimate my own cost?

**Log real token counts from a sample of requests, then multiply by each provider's listed prices.** Run 50 to 100 representative, non-sensitive requests, sum `prompt_tokens` and `completion_tokens` from the usage objects, and scale up to your monthly volume. Use the calculator on [/inference/pricing/](/inference/pricing/) for Smarty Pants models. You are not charged for a request Smarty Pants can't serve.

On Smarty Pants, requests run on Macs owned by other people. A serving Mac decrypts each request in memory to answer it. Owners agree not to read requests and the app doesn't show them, but that is a rule and a design, not a technical guarantee, so don't send sensitive data on the general network.
