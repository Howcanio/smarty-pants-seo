---
layout: ../../layouts/ContentLayout.astro
title: "OpenAI-compatible API for Qwen and open models"
description: "Use the Smarty Pants OpenAI-compatible API for Qwen and other open models: change two lines, then call chat, tools, JSON output and streaming."
h1: "OpenAI-compatible API for Qwen and other open models"
eyebrow: "For developers"
audience: "buyer"
primaryKeyword: "openai compatible api for qwen"
keywords: ["openai compatible api for qwen", "openai compatible api", "qwen api", "openai sdk base url", "open model api", "mcp server llm"]
summary: "Smarty Pants has an OpenAI-compatible API at https://smartypants.network/v1 for Qwen and other open models. Keep the OpenAI SDK and change two things: the base URL and the API key. Chat models support streaming, tools, JSON output through response_format, and a reasoning switch. A 402 means low balance; a 429 or 503 means no Mac is free, so wait Retry-After seconds or use your fallback provider."
published: "2026-11-09"
updated: "2026-11-09"
readingMinutes: 6
faqs:
  - q: "What is the base URL for the Smarty Pants API?"
    a: "The base URL is https://smartypants.network/v1. Send your key as Authorization: Bearer <API key>, and keep it in an environment variable such as SMARTYPANTS_API_KEY."
  - q: "Does the Smarty Pants API support tool calls and JSON output?"
    a: "Yes. The chat models list tools, tool_choice and response_format in supported_parameters on /v1/models, along with temperature, top_p, max_tokens, stop, stream and reasoning."
  - q: "How do I turn model thinking on?"
    a: "Send \"reasoning\": {\"enabled\": true} in the request body. It is a Smarty Pants extension; /v1/models shows default_reasoning as disabled for each chat model."
  - q: "What does a 429 or 503 from Smarty Pants mean?"
    a: "No Mac can take the request right now, or the model is not ready. Wait the Retry-After seconds and try again, or send the request to your fallback provider. You are not charged for a request Smarty Pants can't serve."
  - q: "Is there an MCP server?"
    a: "Yes. https://smartypants.network/mcp needs no sign-in and lists models, finds models, estimates cost and takes model requests. https://smartypants.network/mcp/account adds run_prompt, get_balance and add_credit after an OAuth sign-in."
related: ["/inference/", "/guides/openai-compatible-api-explained/", "/inference/pricing/", "/inference/embeddings-api/", "/ai-models/qwen3-8-27b/", "/ai-models/qwen3-5-9b/"]
sources:
  - label: "Smarty Pants: llms.txt"
    url: "https://smartypants.network/llms.txt"
  - label: "Smarty Pants: Agent kit and docs"
    url: "https://smartypants.network/docs/agents"
  - label: "Smarty Pants: GET /v1/models"
    url: "https://smartypants.network/v1/models"
  - label: "Smarty Pants: OpenAPI description"
    url: "https://smartypants.network/openapi.json"
  - label: "Smarty Pants: API guide"
    url: "https://smartypants.network/api"
---

This is the Smarty Pants how-to: the exact base URL, the parameters each model accepts, and what to do when a request can't be served. For a general explanation of what "OpenAI-compatible" means across providers, read [OpenAI-compatible APIs explained](/guides/openai-compatible-api-explained/).

## How do you switch from OpenAI to Smarty Pants?

Change two lines: the base URL and the API key. Everything else in your OpenAI SDK code stays the same; only the model name changes to a Smarty Pants one.

Smarty Pants is opening in stages. You can see the models, prices and code today; sign in with your email on [smartypants.network/api](https://smartypants.network/api) to get a key. Keep it in `SMARTYPANTS_API_KEY`, never in code.

### Python

```python
import os
from openai import OpenAI

client = OpenAI(
    base_url="https://smartypants.network/v1",
    api_key=os.environ["SMARTYPANTS_API_KEY"],
)
reply = client.chat.completions.create(
    model="smartypants/qwen3.8-27b",
    messages=[{"role": "user", "content": "Summarize this ticket in one sentence: ..."}],
    max_tokens=200,
)
print(reply.choices[0].message.content)
```

### JavaScript

```js
import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://smartypants.network/v1",
  apiKey: process.env.SMARTYPANTS_API_KEY,
});
const reply = await client.chat.completions.create({
  model: "smartypants/qwen3.8-27b",
  messages: [{ role: "user", content: "Summarize this ticket in one sentence: ..." }],
  max_tokens: 200,
});
console.log(reply.choices[0].message.content);
```

### curl

```bash
curl https://smartypants.network/v1/chat/completions \
  -H "Authorization: Bearer $SMARTYPANTS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model": "smartypants/qwen3.8-27b", "messages": [{"role": "user", "content": "Hello"}], "max_tokens": 200}'
```

Prefer no packages? The [agent docs](https://smartypants.network/docs/agents) have one-file Python and JavaScript starter kits that use only the standard library.

## Which endpoints are there?

Four HTTP endpoints and two MCP servers ([llms.txt](https://smartypants.network/llms.txt)).

| Endpoint | Use |
|---|---|
| `GET /v1/models` | every model with prices, context size and `is_ready` |
| `POST /v1/chat/completions` | chat in the OpenAI format: streaming, tools and JSON output |
| `POST /v1/embeddings` | embeddings in the OpenAI format ([Embeddings API](/inference/embeddings-api/)) |
| `POST /v1/audio/transcriptions` | speech to text, multipart upload ([Speech to text API](/inference/speech-to-text-api/)); model in testing |

Before sending real traffic, read `is_ready` for your model on `/v1/models`. When it is false, keep your current provider.

## Which parameters does each chat model accept?

Each model lists its own `supported_parameters` on [`/v1/models`](https://smartypants.network/v1/models). On 9 Nov 2026 every chat model listed the same set.

| Parameter | Notes |
|---|---|
| `temperature`, `top_p`, `max_tokens`, `stop` | as in the OpenAI format |
| `stream` | `true` returns a server-sent event stream (`text/event-stream`) |
| `tools`, `tool_choice` | OpenAI-format tool calls |
| `response_format` | JSON output (`supported_features` lists `structured_output`) |
| `reasoning` | Smarty Pants extension: `{"enabled": true}` turns model thinking on; `default_reasoning` is `disabled` |

Each model also lists `context_length` and `max_completion_tokens`. The released chat models list 16,384 and 4,096. Requests longer than that are not a fit; see [when Smarty Pants is a fit](/inference/#when-is-smarty-pants-a-good-fit).

### Streaming and tools in Python

```python
stream = client.chat.completions.create(
    model="smartypants/qwen3.5-9b",
    messages=[{"role": "user", "content": "Write three subject lines for a launch email."}],
    stream=True,
)
for chunk in stream:
    print(chunk.choices[0].delta.content or "", end="")

tools = [{
    "type": "function",
    "function": {
        "name": "get_order",
        "description": "Look up an order by id",
        "parameters": {"type": "object", "properties": {"id": {"type": "string"}}, "required": ["id"]},
    },
}]
reply = client.chat.completions.create(
    model="smartypants/qwen3.8-27b",
    messages=[{"role": "user", "content": "Where is order 1042?"}],
    tools=tools,
    extra_body={"reasoning": {"enabled": False}},
)
print(reply.choices[0].message.tool_calls)
```

The OpenAI Python SDK sends fields it does not know, such as `reasoning`, through `extra_body`.

## What errors should you handle?

Handle 402, 429 and 503, and keep a fallback provider. From the [agent docs](https://smartypants.network/docs/agents) and [llms.txt](https://smartypants.network/llms.txt):

| Status | Meaning | What to do |
|---|---|---|
| 401 | missing or wrong key | check `SMARTYPANTS_API_KEY` |
| 402 | not enough balance | add credit on your account page |
| 403 `USE_RULES_NOT_AGREED` | the model has use rules you haven't agreed to | agree once (see `use_rules` on `/v1/models`) |
| 429 | rate limited or no Mac free | wait the `Retry-After` seconds, back off, or fall back |
| 503 | model not ready | same as 429 |

You are not charged for a request Smarty Pants can't serve. Because the Macs belong to their owners and come and go, treat Smarty Pants as one provider in a list, not the only one. A simple pattern: try Smarty Pants, and on 429 or 503 either retry once after `Retry-After` or send the same request to your current provider with the same OpenAI SDK.

## Can you use it from an AI app through MCP?

Yes. There are two MCP servers ([agent docs](https://smartypants.network/docs/agents)).

- `https://smartypants.network/mcp` (no sign-in): `list_models`, `find_model`, `estimate_cost`, `request_model`, `get_started`.
- `https://smartypants.network/mcp/account` (OAuth sign-in by email link): adds `run_prompt`, `get_balance` and `add_credit`. `add_credit` returns a Stripe page for a person to pay; it charges nothing itself. Each connected app can spend up to $20 a month and the connection lasts 90 days.

Add the address as a custom server in your AI app's connector or MCP settings.

## What should you not send?

Requests run on Macs other people own, and a serving Mac must decrypt a request in memory to answer it. The live site says: "General network: please don't send sensitive data." Smarty Pants does not show or retain prompt content in its interface or product logs. Keep secrets, personal, customer and regulated data on a provider you have approved for it.
