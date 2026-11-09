---
layout: ../../layouts/ContentLayout.astro
title: "OpenAI-compatible API: what it means and what differs"
description: "What an OpenAI-compatible API is, which endpoints share one request shape, what still differs between providers, and Python and curl examples."
h1: "What does \"OpenAI-compatible API\" actually mean?"
eyebrow: "Guide"
audience: "buyer"
primaryKeyword: "openai compatible api"
keywords: ["openai compatible api", "openai compatible endpoint", "openai api base url", "chat completions api", "openai sdk other provider"]
summary: "An OpenAI-compatible API accepts the same requests and returns the same response shape as OpenAI's API, so you can keep the OpenAI SDK and change only the base URL and API key. The shared core is /v1/chat/completions, /v1/embeddings, /v1/audio/transcriptions and /v1/models. What still differs between providers: which parameters each model supports, tool calling, reasoning fields, context size and error handling."
published: "2026-11-09"
updated: "2026-11-09"
readingMinutes: 6
faqs:
  - q: "What is an OpenAI-compatible API?"
    a: "It is an API that accepts OpenAI-format requests and returns OpenAI-format responses at its own base URL. You point the OpenAI SDK, or any HTTP client, at that base URL with that provider's key."
  - q: "Do I need a different SDK to use an OpenAI-compatible provider?"
    a: "Usually not. The OpenAI SDK takes a base_url and api_key, so changing those two values is often enough. Model names change too, because each provider lists its own models at /v1/models."
  - q: "Will every OpenAI parameter work on an OpenAI-compatible API?"
    a: "No. Each provider and model supports its own subset. Smarty Pants lists the supported parameters for each model in supported_parameters on /v1/models, so check there before relying on one."
  - q: "What should my code do on a 429 error?"
    a: "Wait at least the number of seconds in the Retry-After header, then retry with backoff, and cap the number of retries. On Smarty Pants a 429 or 503 means no Mac can take the request right now, so a fallback provider is a sensible plan."
  - q: "What is the Smarty Pants base URL?"
    a: "https://smartypants.network/v1. Authentication is a Bearer API key, which you get by signing in with your email on smartypants.network/api."
  - q: "Is an OpenAI-compatible API the same model as OpenAI's?"
    a: "No. Compatibility is about the request and response format, not the model. Smarty Pants serves exact, pinned open models such as smartypants/qwen3.5-9b, not OpenAI's models."
related: ["/inference/openai-compatible-api/", "/inference/", "/inference/embeddings-api/", "/inference/speech-to-text-api/", "/guides/llm-api-pricing-explained/", "/ai-models/"]
sources:
  - label: "OpenAI API reference: Create chat completion"
    url: "https://developers.openai.com/api/reference/resources/chat/subresources/completions/methods/create"
  - label: "OpenAI API reference: Create embeddings"
    url: "https://developers.openai.com/api/reference/resources/embeddings/methods/create"
  - label: "OpenAI API reference: Create transcription"
    url: "https://developers.openai.com/api/reference/resources/audio/subresources/transcriptions/methods/create"
  - label: "OpenAI API reference: List models"
    url: "https://developers.openai.com/api/reference/resources/models/methods/list"
  - label: "OpenAI: Rate limits guide"
    url: "https://developers.openai.com/api/docs/guides/rate-limits"
  - label: "Smarty Pants: Agent kit and docs"
    url: "https://smartypants.network/docs/agents"
  - label: "Smarty Pants: /v1/models (live model list)"
    url: "https://smartypants.network/v1/models"
  - label: "Smarty Pants: llms.txt"
    url: "https://smartypants.network/llms.txt"
---

"OpenAI-compatible" is a promise about format, not about models. A compatible provider accepts the same JSON requests as OpenAI's API and sends back the same response shape, at its own base URL. That lets you keep the OpenAI SDK and your existing code, and change two values: the base URL and the API key. This guide covers what is shared, what usually differs, and how it looks on Smarty Pants.

## What does an OpenAI-compatible API share with OpenAI?

**It shares the endpoint paths, the request fields and the response shape.** Authentication is the same too: a Bearer token in the `Authorization` header, as in OpenAI's own examples in the [chat completions reference](https://developers.openai.com/api/reference/resources/chat/subresources/completions/methods/create).

These four endpoints make up the common core:

| Endpoint | What it does (per the OpenAI reference) | Key fields |
|---|---|---|
| `POST /v1/chat/completions` | "Creates a model response for the given chat conversation." | `model`, `messages`, `tools`, `response_format`, `stream`; response has `choices[].message.content` and `usage` |
| `POST /v1/embeddings` | Creates an embedding vector for input text ([reference](https://developers.openai.com/api/reference/resources/embeddings/methods/create)) | `model`, `input`, optional `dimensions`, `encoding_format`; response has `data[].embedding` |
| `POST /v1/audio/transcriptions` | Transcribes audio, sent as multipart form data with `file` and `model` ([reference](https://developers.openai.com/api/reference/resources/audio/subresources/transcriptions/methods/create)) | response has `text` |
| `GET /v1/models` | Lists available models with `id`, `object`, `created`, `owned_by` ([reference](https://developers.openai.com/api/reference/resources/models/methods/list)) | providers often add their own fields |

Smarty Pants offers all four at `https://smartypants.network/v1`, with streaming, tools and JSON output on chat ([llms.txt](https://smartypants.network/llms.txt)).

## How do I point the OpenAI SDK at another provider?

**Set `base_url` and `api_key`, then use that provider's model names.** This is the Python example from the [Smarty Pants agent docs](https://smartypants.network/docs/agents):

```python
# Already use the OpenAI SDK? Change two lines.
import os
from openai import OpenAI
client = OpenAI(base_url="https://smartypants.network/v1", api_key=os.environ["SMARTYPANTS_API_KEY"])
reply = client.chat.completions.create(model="smartypants/nanbeige4.3-33b", messages=[{"role": "user", "content": "Hello"}])
print(reply.choices[0].message.content)
```

The same request with curl:

```bash
curl https://smartypants.network/v1/chat/completions \
  -H "Authorization: Bearer $SMARTYPANTS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model": "smartypants/nanbeige4.3-33b", "messages": [{"role": "user", "content": "Hello"}], "max_tokens": 200}'
```

Keep the key in an environment variable, never in code. Smarty Pants is opening in stages. You can see the models, prices and code today; sign in with your email on [smartypants.network/api](https://smartypants.network/api) to get a key.

## What usually differs between OpenAI-compatible providers?

**The shape is shared; the details are not.** Plan for these differences before you switch.

### Supported parameters

Each model supports its own subset of fields. Smarty Pants lists them per model in `supported_parameters` on [/v1/models](https://smartypants.network/v1/models). On 9 Nov 2026, `smartypants/qwen3.5-9b` listed `temperature`, `top_p`, `max_tokens`, `stop`, `stream`, `tools`, `tool_choice`, `response_format` and `reasoning`. OpenAI's reference, by contrast, marks `max_tokens` as "deprecated in favor of `max_completion_tokens`". If your code sends a field a provider doesn't list, test what happens before going live.

### Tools and JSON output

Tool calling and structured output use the same request fields, but how well a given open model follows a tool schema varies by model. Test your own tool definitions on non-sensitive examples.

### Reasoning fields

This is where providers diverge most. OpenAI uses `reasoning_effort` and reports `usage.completion_tokens_details.reasoning_tokens`. The listed Smarty Pants chat models accept a `reasoning` parameter instead, with reasoning off by default (`default_reasoning: "disabled"` on /v1/models), and the Smarty Pants starter kit sends `"reasoning": {"enabled": false}` unless you ask for thinking.

### Model list fields

Providers add their own fields to `/v1/models`. Smarty Pants adds per-token `pricing`, `context_length`, `max_completion_tokens`, `build_id`, `quantization` and `is_ready`. Its docs say to check `is_ready` before sending real traffic and to keep your current provider when it is false.

### Context and output limits

Limits are per model and per provider. On 9 Nov 2026 the released Smarty Pants chat models listed 16,384 tokens of context and 4,096 tokens of output.

### Errors and 429 Retry-After

Status codes look alike but can mean different things. OpenAI's [rate limits guide](https://developers.openai.com/api/docs/guides/rate-limits) says a 429 means a temporary rate limit was hit, and recommends waiting at least the `Retry-After` value plus a small random delay, with retries capped by count and total time. On Smarty Pants, the [agent docs](https://smartypants.network/docs/agents) say 402 means not enough balance, and 429 or 503 means no Mac can take the request right now: wait the `Retry-After` seconds and try again, or use your fallback provider.

## When is OpenAI compatibility not enough?

**When you depend on a feature only one provider has.** Compatibility covers the core endpoints. It does not cover a provider's newer APIs, its hosted tools, or its specific models. If you need a frontier-size model, more context than an open model lists, or strict latency guarantees, the Smarty Pants docs say to keep your current provider for that work and as a fallback.

A practical pattern: put the base URL, key and model name in configuration, check `/v1/models` at startup, and route to a second provider on 429, 503 or `is_ready: false`.

## Where does Smarty Pants fit?

Smarty Pants runs exact, pinned, unmodified open models on Apple Silicon Macs that owners make available when idle, and sells them per token through the OpenAI-compatible API above. Each model is a specific build named in `/v1/models`, for example `build_id` `qwen3.5-9b-mlx-4bit-r938d891` for `smartypants/qwen3.5-9b`. Requests run on Macs other people own, so keep private data off the general network. See the [OpenAI-compatible API page](/inference/openai-compatible-api/) for the product details and [/inference/pricing/](/inference/pricing/) for prices.
