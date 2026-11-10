---
layout: ../../layouts/ContentLayout.astro
title: "LLM inference API on Apple Silicon Macs | Smarty Pants"
description: "Smarty Pants is an LLM inference API that runs pinned, quantized builds of open models on Apple Silicon Macs, priced per token, behind an OpenAI-compatible endpoint."
h1: "LLM inference API on Apple Silicon Macs"
eyebrow: "For developers"
audience: "buyer"
primaryKeyword: "llm inference api"
keywords: ["llm inference api", "apple silicon inference", "open model api", "openai compatible api", "mlx inference api", "qwen api"]
summary: "Smarty Pants is an LLM inference API that sends your requests to Apple Silicon Macs their owners make available when idle. You call pinned, quantized builds of upstream open-weight models through an OpenAI-compatible endpoint at https://smartypants.network/v1 and pay per token. It fits everyday text work and embeddings where an open model is good enough and price matters. It is not a fit for frontier-size models, long context or strict latency guarantees."
published: "2026-11-09"
updated: "2026-11-09"
readingMinutes: 6
faqs:
  - q: "What is the Smarty Pants inference API?"
    a: "It is an OpenAI-compatible API at https://smartypants.network/v1 that runs pinned, quantized builds of open models on Apple Silicon Macs that owners make available when idle. You pay per token, at the price listed for each model in /v1/models."
  - q: "Which models can I call?"
    a: "The catalog lists chat models (Qwen3.5 9B, Qwen3.8 27B, Nanbeige4.3 33B), an embedding model (Qwen3 Embedding 0.6B), and several models in testing, including gpt-oss-20b, Whisper large-v3 turbo and FLUX.1 schnell. Check is_ready on /v1/models before you send traffic, because availability changes hour to hour."
  - q: "Can I use the OpenAI SDK?"
    a: "Yes. Change the base URL to https://smartypants.network/v1 and the API key to your Smarty Pants key, and keep the rest of your OpenAI SDK code."
  - q: "Am I charged if a request fails?"
    a: "No. The live model pages say you are never charged for a request Smarty Pants can't serve. A 429 or 503 means no Mac is free right now; retry after the Retry-After seconds or use your fallback provider."
  - q: "Can I send sensitive data?"
    a: "No. Requests run on Macs other people own, and a serving Mac must decrypt a request in memory to answer it. The live site asks you not to send sensitive data to the general network."
  - q: "Who can get an API key?"
    a: "[[API_ACCESS]]"
related: ["/inference/openai-compatible-api/", "/inference/pricing/", "/inference/vs-centralized-providers/", "/inference/embeddings-api/", "/ai-models/", "/guides/decentralized-vs-centralized-inference/"]
sources:
  - label: "Smarty Pants: llms.txt"
    url: "https://smartypants.network/llms.txt"
  - label: "Smarty Pants: Agent kit and docs"
    url: "https://smartypants.network/docs/agents"
  - label: "Smarty Pants: GET /v1/models"
    url: "https://smartypants.network/v1/models"
  - label: "Smarty Pants: public model catalog"
    url: "https://smartypants.network/api/public/models"
  - label: "Smarty Pants: OpenAPI description"
    url: "https://smartypants.network/openapi.json"
  - label: "Smarty Pants: API guide"
    url: "https://smartypants.network/api"
  - label: "Smarty Pants: For teams"
    url: "https://smartypants.network/for-teams"
---

Smarty Pants is an inference API for open models that run on Apple Silicon Macs. Owners make their Macs available when idle, and your requests go to one of them. This page covers what you can call, how to call it, and when another provider is the better choice.

## What is Smarty Pants inference?

It is an OpenAI-compatible API for pinned, quantized builds of upstream open-weight models, served on Macs and priced per token. Each build is named in `build_id` and `quantization` on `/v1/models`; quantizing changes how the weights are stored and can change answers slightly compared with the full-precision model. You change your base URL and key, and keep the OpenAI SDK ([llms.txt](https://smartypants.network/llms.txt)).

Each model is served as one specific build, for example a 4-bit MLX build. [`/v1/models`](https://smartypants.network/v1/models) names it in `build_id` and `quantization`, so you know exactly what answered your request. You pay per token at the price listed for each model, and you are not charged for a request Smarty Pants can't serve.

Teams can also put their own Macs in a Group. Members use the Group's Macs for AI for free, work stays on the Group's Macs first, and earnings go to one company wallet ([For teams](https://smartypants.network/for-teams)). Group sign-up is invite only for now ("Opening soon").

## Which models can you call?

Four models are released and five are in testing. Prices below are the listed price on 8 Nov 2026; [`/v1/models`](https://smartypants.network/v1/models) always has the current price.

| Model (API name) | What it does | Context / max output | Listed price (8 Nov 2026) | Status |
|---|---|---|---|---|
| [smartypants/qwen3.5-9b](/ai-models/qwen3-5-9b/) | chat | 16,384 / 4,096 | $0.10 in / $0.40 out per M tokens | Released |
| [smartypants/qwen3.8-27b](/ai-models/qwen3-8-27b/) | chat | 16,384 / 4,096 | $0.20 / $1.20 per M tokens | Released |
| [smartypants/nanbeige4.3-33b](/ai-models/nanbeige4-3-33b/) | chat | 16,384 / 4,096 | $0.30 / $2.00 per M tokens | Released |
| [smartypants/qwen3-embedding-0.6b](/ai-models/qwen3-embedding-0-6b/) | embeddings, 1,024 dims or fewer | 8,192 | $0.01 in per M tokens | Released |
| [smartypants/qwen3.5-4b](/ai-models/qwen3-5-4b/) | chat | 8,192 / 2,048 | $0.10 / $0.25 per M tokens | In testing, opens soon |
| [smartypants/qwen3.6-35b-a3b](/ai-models/qwen3-6-35b-a3b/) | chat, mixture of experts | 16,384 / 4,096 | $0.09 / $0.80 per M tokens | In testing, opens soon |
| [smartypants/gpt-oss-20b](/ai-models/gpt-oss-20b/) | chat, mixture of experts | 16,384 / 4,096 | $0.027 / $0.135 per M tokens | In testing, opens soon |
| [smartypants/whisper-large-v3-turbo](/ai-models/whisper-large-v3-turbo/) | speech to text, up to 30 min or 25 MB per file | n/a | $0.18 an hour of audio | In testing, opens soon |
| [smartypants/flux.1-schnell](/ai-models/flux-1-schnell/) | images, up to 4 per request, up to 1536×1024 | n/a | $0.003 a picture | In testing, opens soon |

"Released" does not mean a model is online right now. Availability changes hour to hour, because it depends on which Macs are idle. Check `is_ready` on `/v1/models` before you send traffic; when it is false, keep your current provider. See all models on [/ai-models/](/ai-models/) and costs on [/inference/pricing/](/inference/pricing/).

## How do you call it?

Point the OpenAI SDK at `https://smartypants.network/v1` and use your Smarty Pants key. The two-line change, from the [agent docs](https://smartypants.network/docs/agents):

```python
import os
from openai import OpenAI

client = OpenAI(base_url="https://smartypants.network/v1", api_key=os.environ["SMARTYPANTS_API_KEY"])
reply = client.chat.completions.create(
    model="smartypants/nanbeige4.3-33b",
    messages=[{"role": "user", "content": "Hello"}],
)
print(reply.choices[0].message.content)
```

The endpoints that exist today ([llms.txt](https://smartypants.network/llms.txt)):

| Endpoint | What it does | Guide |
|---|---|---|
| `GET /v1/models` | models, prices, context size, `is_ready` | [OpenAI-compatible API](/inference/openai-compatible-api/) |
| `POST /v1/chat/completions` | chat, with streaming, tools and JSON output | [OpenAI-compatible API](/inference/openai-compatible-api/) |
| `POST /v1/embeddings` | text embeddings | [Embeddings API](/inference/embeddings-api/) |
| `POST /v1/audio/transcriptions` | speech to text (model in testing) | [Speech to text API](/inference/speech-to-text-api/) |
| `/mcp` and `/mcp/account` | MCP servers for AI apps and agents | [OpenAI-compatible API](/inference/openai-compatible-api/#can-you-use-it-from-an-ai-app-through-mcp) |

Image generation with FLUX.1 schnell is in testing; see [/inference/image-generation-api/](/inference/image-generation-api/). Video generation is Planned and not available; see [/inference/video-generation/](/inference/video-generation/).

[[API_ACCESS]]

## When is Smarty Pants a good fit?

It fits everyday text work where an open model is good enough and price matters. The product's own guidance ([llms.txt](https://smartypants.network/llms.txt)):

- **Good fit:** summaries, extraction, classification, drafting, tool calls, JSON output, and embeddings. Measure quality on your own non-sensitive examples first.
- **Not a fit yet:** work that needs a frontier-size model, more context than a model lists, or strict latency guarantees. Keep your current provider for those, and as a fallback.

The listed context is 16,384 tokens or less for every chat model. If your prompts are longer, a hosted provider with a larger context window is the better choice today. For a side-by-side view, see [Smarty Pants vs. centralized providers](/inference/vs-centralized-providers/).

## What should you know about data?

Keep private data off the shared network. Requests run on Macs other people own, and the live site says: "General network: please don't send sensitive data."

A serving Mac must decrypt a request in memory to answer it. Smarty Pants does not show or retain prompt content in its interface or product logs, but that is not the same as the request being hidden from the machine that runs it. Do not send secrets, personal, customer, regulated or confidential data unless the person you work for has approved it.

## What else runs on the same Macs?

Besides model inference, Smarty Pants is testing short code jobs and agent workspaces on Macs.

- [CPU jobs](/cpu/): a short Python, JavaScript or shell program in a sealed Linux VM. Open to Smarty Pants' own account first.
- [Agent workspaces](/workspaces/): one sealed VM kept open for many commands and files. Open to Smarty Pants' own account first.
