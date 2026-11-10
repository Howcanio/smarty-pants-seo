---
layout: ../../layouts/ContentLayout.astro
title: "Embedding API for Qwen3 Embedding 0.6B | Smarty Pants"
description: "The Smarty Pants embedding API serves Qwen3 Embedding 0.6B: 1,024 dimensions or fewer, 8,192-token input, OpenAI-format POST /v1/embeddings."
h1: "Embedding API: Qwen3 Embedding 0.6B on Apple Silicon Macs"
eyebrow: "For developers"
audience: "buyer"
primaryKeyword: "embedding api"
keywords: ["embedding api", "text embedding api", "qwen3 embedding api", "openai compatible embeddings", "semantic search api", "cheap embedding api"]
summary: "The Smarty Pants embedding API serves Qwen3 Embedding 0.6B, a released open model, through the OpenAI-format endpoint POST https://smartypants.network/v1/embeddings. It returns 1,024-dimension vectors, or fewer if you pass dimensions, for inputs up to 8,192 tokens. The listed price on 8 Nov 2026 was $0.01 per million input tokens. Use it for search, matching and grouping text that is not sensitive."
published: "2026-11-09"
updated: "2026-11-09"
readingMinutes: 5
faqs:
  - q: "Which embedding model does Smarty Pants offer?"
    a: "Smarty Pants serves Qwen3 Embedding 0.6B as smartypants/qwen3-embedding-0.6b, a 4-bit MLX build. It is released in the catalog; check is_ready on /v1/models before sending traffic."
  - q: "How many dimensions do the embeddings have?"
    a: "1,024 by default. Pass the dimensions parameter to get shorter vectors; the upstream Qwen model card says the model supports output sizes from 32 to 1,024."
  - q: "How long can the input be?"
    a: "Smarty Pants lists a context of 8,192 tokens per input for this model. The upstream model supports 32K, but the Smarty Pants build is listed at 8,192, so split longer documents into chunks."
  - q: "What does the Smarty Pants embedding API cost?"
    a: "The listed price on 8 Nov 2026 was $0.01 per million input tokens, with no output charge. Check /v1/models for the current price."
  - q: "Can I use the OpenAI SDK for embeddings?"
    a: "Yes. Set the base URL to https://smartypants.network/v1, use your Smarty Pants key, and call client.embeddings.create with model smartypants/qwen3-embedding-0.6b."
related: ["/ai-models/qwen3-embedding-0-6b/", "/inference/", "/inference/openai-compatible-api/", "/inference/pricing/", "/guides/openai-compatible-api-explained/"]
sources:
  - label: "Smarty Pants: GET /v1/models"
    url: "https://smartypants.network/v1/models"
  - label: "Smarty Pants: llms.txt"
    url: "https://smartypants.network/llms.txt"
  - label: "Smarty Pants: Agent kit and docs"
    url: "https://smartypants.network/docs/agents"
  - label: "Hugging Face: Qwen/Qwen3-Embedding-0.6B model card"
    url: "https://huggingface.co/Qwen/Qwen3-Embedding-0.6B"
---

Embeddings turn text into lists of numbers so that texts with similar meaning end up close together. Smarty Pants serves one embedding model, Qwen3 Embedding 0.6B, on Apple Silicon Macs, through the same OpenAI-compatible API as its chat models.

## What does the Smarty Pants embedding API offer?

One released model, `smartypants/qwen3-embedding-0.6b`, at a listed price of $0.01 per million input tokens (8 Nov 2026). The specs from [`/v1/models`](https://smartypants.network/v1/models):

| Spec | Value |
|---|---|
| API name | `smartypants/qwen3-embedding-0.6b` |
| Build | `qwen3-embedding-0.6b-mlx-4bit-dwq-r6c3ae70` (4-bit MLX) |
| Dimensions | 1,024, or fewer with `dimensions` |
| Max input | 8,192 tokens |
| Parameters | `dimensions`, `encoding_format` |
| Listed price (8 Nov 2026) | $0.01 per million input tokens |
| License | Apache-2.0 |
| Status | Released; check `is_ready` before sending traffic |
| Served on | qualified 16 GB+ Apple Silicon Macs |

The upstream [Qwen3-Embedding-0.6B model card](https://huggingface.co/Qwen/Qwen3-Embedding-0.6B) says the model supports 100+ languages, including programming languages, and output sizes from 32 to 1,024. It also lists a 32K context, but the Smarty Pants build is listed at 8,192 tokens, so plan your chunks for 8,192.

"Released" does not mean a Mac is serving it at this moment. Availability changes hour to hour. See the [model page](/ai-models/qwen3-embedding-0-6b/) for its current state.

## How do you call POST /v1/embeddings?

Send OpenAI-format requests to `https://smartypants.network/v1/embeddings` with your Smarty Pants key. [[API_ACCESS]]

### Python

```python
import os
from openai import OpenAI

client = OpenAI(base_url="https://smartypants.network/v1", api_key=os.environ["SMARTYPANTS_API_KEY"])

result = client.embeddings.create(
    model="smartypants/qwen3-embedding-0.6b",
    input=["Refund for a damaged blender", "My blender arrived broken"],
    dimensions=256,  # optional; leave out for 1,024
)
vectors = [item.embedding for item in result.data]
print(len(vectors), len(vectors[0]))
```

### curl

```bash
curl https://smartypants.network/v1/embeddings \
  -H "Authorization: Bearer $SMARTYPANTS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model": "smartypants/qwen3-embedding-0.6b", "input": ["Refund for a damaged blender", "My blender arrived broken"]}'
```

Errors follow the rest of the API: 402 means not enough balance; 429 or 503 means no Mac is free, so wait the `Retry-After` seconds or use your fallback. You are not charged for a request Smarty Pants can't serve. More in the [OpenAI-compatible API how-to](/inference/openai-compatible-api/).

## What can you build with it?

Search, matching and grouping, wherever "similar meaning" matters more than exact words.

- **Semantic search.** Embed your documents once, embed each query, and return the closest documents. Works for help centers, product catalogs and code search.
- **Matching.** Pair support tickets with past answers, resumes with job posts, or new products with existing ones to find duplicates.
- **Grouping and tagging.** Cluster feedback or reviews by topic, or classify text by comparing it to a few labeled examples.
- **Retrieval for chat.** Find the passages to put in a prompt for a [chat model](/inference/) such as Qwen3.8 27B.

Shorter vectors from `dimensions` take less storage and make search cheaper in your vector database. Test a smaller size against 1,024 on your own examples before you switch.

## When is it not the right choice?

When your data is sensitive, or you need a larger embedding model. Requests run on Macs other people own, and a serving Mac must decrypt a request in memory to answer it. The live site says: "General network: please don't send sensitive data." Embedding a private document collection means sending all of it, so keep confidential text on a provider you have approved for it.

If you need vectors longer than 1,024 dimensions or inputs longer than 8,192 tokens in one piece, use a different provider. If you already have vectors from another model, you must re-embed everything: vectors from different models can't be compared with each other.
