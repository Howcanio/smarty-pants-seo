---
layout: ../../layouts/ContentLayout.astro
title: "Use open models in LangChain, OpenAI Agents SDK and Vercel AI SDK"
description: "Copy-paste setups for exact open models in LangChain, OpenAI Agents SDK, Vercel AI SDK, LlamaIndex and Claude Code, with listed prices."
h1: "How do I use open models in my agent framework?"
eyebrow: "Guide"
audience: "buyer"
primaryKeyword: "use open models in langchain"
keywords: ["langchain openai compatible", "openai agents sdk other provider", "vercel ai sdk openai compatible", "llamaindex openai like", "claude code mcp server", "open model api for agents"]
summary: "Most agent frameworks talk to models through an OpenAI client, so any OpenAI-compatible API works by changing the base URL, the API key and the model name. For Smarty Pants the base URL is https://smartypants.network/v1 and model ids look like smartypants/qwen3.5-9b. LangChain uses ChatOpenAI(base_url=...), the OpenAI Agents SDK uses OpenAIChatCompletionsModel with an AsyncOpenAI client, the Vercel AI SDK uses createOpenAICompatible, and Claude Code connects to the MCP server at https://smartypants.network/mcp."
published: "2026-11-19"
updated: "2026-11-19"
readingMinutes: 5
faqs:
  - q: "Does LangChain work with an OpenAI-compatible API?"
    a: "Yes. ChatOpenAI and OpenAIEmbeddings from langchain-openai take base_url and api_key. Point base_url at https://smartypants.network/v1 and use a model id from /v1/models."
  - q: "Can the OpenAI Agents SDK use a model that is not from OpenAI?"
    a: "Yes. Wrap an AsyncOpenAI client that has the other provider's base_url in OpenAIChatCompletionsModel and pass it as the agent's model. Turn tracing off, or give it an OpenAI key, because tracing uploads to OpenAI."
  - q: "How do I use an OpenAI-compatible provider in the Vercel AI SDK?"
    a: "Install @ai-sdk/openai-compatible and call createOpenAICompatible with a name, baseURL and apiKey. The result is a function that turns a model id into a model you can pass to generateText or streamText."
  - q: "How does an agent know whether a model is available right now?"
    a: "Check is_ready for the model on https://smartypants.network/v1/models before sending traffic. When it is false, keep your current provider. A 429 or 503 means no Mac can take the request right now: wait the Retry-After seconds or fall back."
  - q: "How do I get a key?"
    a: "[[API_ACCESS]]"
related: ["/guides/openai-compatible-api-explained/", "/inference/openai-compatible-api/", "/inference/pricing/", "/inference/embeddings-api/", "/guides/llm-api-pricing-explained/"]
sources:
  - label: "Smarty Pants: Agent frameworks (copy-ready setups)"
    url: "https://smartypants.network/docs/agents#frameworks"
  - label: "Smarty Pants: /v1/models (live model list and prices)"
    url: "https://smartypants.network/v1/models"
  - label: "Smarty Pants: llms-full.txt"
    url: "https://smartypants.network/llms-full.txt"
  - label: "LangChain: ChatOpenAI integration"
    url: "https://python.langchain.com/docs/integrations/chat/openai/"
  - label: "OpenAI Agents SDK: Using any model"
    url: "https://openai.github.io/openai-agents-python/models/"
  - label: "AI SDK: OpenAI Compatible providers"
    url: "https://ai-sdk.dev/providers/openai-compatible-providers"
---

Agent frameworks rarely need a special plug-in for a new model provider. If the provider speaks the OpenAI API, the framework's OpenAI client already works: change the **base URL**, the **API key** and the **model name**. Below are the setups for the frameworks agents use most, pointed at Smarty Pants, which serves exact, pinned builds of open models on Apple Silicon Macs and prices them per token.

Keep the key in an environment variable, `SMARTYPANTS_API_KEY`, never in code. [[API_ACCESS]]

## Which model id should I use?

**Pick one from `GET https://smartypants.network/v1/models`, and only send traffic when its `is_ready` is true.** Each entry lists the exact build, the context size and the price. Listed prices on 19 Nov 2026 (check `/v1/models` for today's):

| Model id | What it does | Listed price per million tokens |
|---|---|---|
| `smartypants/qwen3.5-9b` | Everyday chat, writing, simple code | $0.076 in / $0.114 out |
| `smartypants/gpt-oss-20b` | Reasoning and tool use | $0.0171 in / $0.0855 out |
| `smartypants/qwen3.6-35b-a3b` | Coding and agent work, 98,304-token context | $0.048 in / $0.665 out |
| `smartypants/qwen3-embedding-0.6b` | Embeddings for search | $0.01 in |

Work that can wait can go through the Batch API (OpenAI format) at half the per-token price, with results within 24 hours.

## LangChain (Python)

**Use `ChatOpenAI` and `OpenAIEmbeddings` with `base_url`.**

```python
# pip install langchain-openai
import os
from langchain_openai import ChatOpenAI, OpenAIEmbeddings

llm = ChatOpenAI(model="smartypants/qwen3.5-9b", base_url="https://smartypants.network/v1",
                 api_key=os.environ["SMARTYPANTS_API_KEY"], max_retries=3)
print(llm.invoke("Summarize: Macs can serve open models.").content)

emb = OpenAIEmbeddings(model="smartypants/qwen3-embedding-0.6b", base_url="https://smartypants.network/v1",
                       api_key=os.environ["SMARTYPANTS_API_KEY"], check_embedding_ctx_length=False)
```

`check_embedding_ctx_length=False` sends plain text instead of OpenAI token ids, which other providers' embedding models need.

## OpenAI Agents SDK (Python)

**Wrap an `AsyncOpenAI` client in `OpenAIChatCompletionsModel`.**

```python
# pip install openai-agents
import os
from openai import AsyncOpenAI
from agents import Agent, Runner, OpenAIChatCompletionsModel, set_tracing_disabled

set_tracing_disabled(True)   # tracing would need an OpenAI key
client = AsyncOpenAI(base_url="https://smartypants.network/v1", api_key=os.environ["SMARTYPANTS_API_KEY"])
agent = Agent(name="helper", instructions="Answer in one short paragraph.",
              model=OpenAIChatCompletionsModel(model="smartypants/qwen3.5-9b", openai_client=client))
print(Runner.run_sync(agent, "What is an exact model build?").final_output)
```

## Vercel AI SDK (TypeScript)

**Use `createOpenAICompatible`.**

```ts
// npm install ai @ai-sdk/openai-compatible
import { generateText } from 'ai';
import { createOpenAICompatible } from '@ai-sdk/openai-compatible';

const smartypants = createOpenAICompatible({
  name: 'smartypants',
  baseURL: 'https://smartypants.network/v1',
  apiKey: process.env.SMARTYPANTS_API_KEY,
});
const { text } = await generateText({ model: smartypants('smartypants/qwen3.5-9b'), prompt: 'Name three uses for embeddings.' });
```

## LlamaIndex (Python)

**Use `OpenAILike`.**

```python
# pip install llama-index-llms-openai-like
import os
from llama_index.llms.openai_like import OpenAILike

llm = OpenAILike(model="smartypants/qwen3.5-9b", api_base="https://smartypants.network/v1",
                 api_key=os.environ["SMARTYPANTS_API_KEY"], is_chat_model=True,
                 is_function_calling_model=True, context_window=16384)
```

## Claude Code and other MCP clients

**Add the MCP server.** The one at `/mcp` needs no sign-in and lists models, prices and costs; `/mcp/account` signs the person in by email link and adds prompts and the balance.

```bash
claude mcp add --transport http smartypants https://smartypants.network/mcp
mkdir -p ~/.claude/skills/smartypants
curl -o ~/.claude/skills/smartypants/SKILL.md https://smartypants.network/kits/skills/smartypants/SKILL.md
```

The skill file tells Claude when Smarty Pants fits (cheap, exact open-model calls) and when it doesn't (work that needs a frontier-size model).

## What should my agent do when no Mac is free?

**Treat 429 and 503 as "try later or fall back".** Wait the `Retry-After` seconds, back off, and keep your current provider as the fallback. [[PRIVACY]]
