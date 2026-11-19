---
layout: ../../layouts/ContentLayout.astro
title: "Batch API for open models at half price"
description: "Send up to 10,000 model calls in one batch at half the normal per-token price, results within 24 hours. OpenAI Batch API format, with checks, spend caps and schedules."
h1: "Batch API: half-price model calls, results within 24 hours"
eyebrow: "For developers"
audience: "buyer"
status: "released"
primaryKeyword: "batch llm api"
keywords: ["batch llm api", "openai batch api alternative", "cheap batch inference", "batch embeddings api", "llm evals batch"]
summary: "The Smarty Pants Batch API runs work that can wait, such as evals, tagging or embedding a library, at half the normal per-token price, with results within 24 hours. It uses OpenAI's Batch API format, so the OpenAI SDK works unchanged. Each batch holds up to 10,000 requests for chat, embeddings, reranking or code jobs, and can check answers, stop at a spending cap, notify you when done and run on a schedule."
published: "2026-11-19"
updated: "2026-11-19"
readingMinutes: 4
faqs:
  - q: "How much cheaper is a batch?"
    a: "Model calls in a batch cost half the normal per-token price. Code jobs in a batch cost the normal CPU price."
  - q: "How fast do results come back?"
    a: "Within 24 hours. Batches run on Macs that are otherwise idle, and live requests always come first, so most batches finish sooner but none is promised sooner."
  - q: "Does the OpenAI SDK work?"
    a: "Yes. Upload a JSONL file with client.files.create(purpose=\"batch\"), then client.batches.create(...) with base_url set to https://smartypants.network/v1."
  - q: "Can a batch check the answers?"
    a: "Yes. Add check, for example required JSON fields or a small schema for chat, or exit_code 0 for code jobs. Each result line says passed or needs_review, and POST /v1/batches/{id}/rerun runs only the ones that failed or need review."
  - q: "Can I cap what a batch spends?"
    a: "Yes. max_spend_usd stops the batch once it has cost that much; work already running finishes."
related: ["/inference/", "/inference/openai-compatible-api/", "/inference/embeddings-api/", "/pricing/", "/compare/smarty-pants-vs-together-ai/"]
sources:
  - label: "Smarty Pants: Agent kit (Batches)"
    url: "https://smartypants.network/docs/agents"
  - label: "Smarty Pants: llms.txt (Batches)"
    url: "https://smartypants.network/llms.txt"
---

Plenty of AI work does not need an answer this second: grading a test set, tagging a catalog, summarizing an archive, embedding a document library. Smarty Pants runs that work on Macs that would otherwise sit idle, and charges half the normal per-token price for it.

## How do I send a batch?

The same way as OpenAI's Batch API: upload a JSONL file, create a batch, poll it, download the results.

```python
import json, os, time
from openai import OpenAI
client = OpenAI(base_url="https://smartypants.network/v1", api_key=os.environ["SMARTYPANTS_API_KEY"])
lines = [{"custom_id": f"q{i}", "method": "POST", "url": "/v1/chat/completions",
          "body": {"model": "smartypants/arete-27b", "messages": [{"role": "user", "content": q}], "max_tokens": 100}}
         for i, q in enumerate(["Name a prime number.", "Name a colour."])]
open("batch.jsonl", "w").write("\n".join(json.dumps(l) for l in lines))
file = client.files.create(file=open("batch.jsonl", "rb"), purpose="batch")
batch = client.batches.create(input_file_id=file.id, endpoint="/v1/chat/completions", completion_window="24h")
while batch.status not in ("completed", "failed", "expired", "cancelled"):
    time.sleep(30); batch = client.batches.retrieve(batch.id)
print(client.files.content(batch.output_file_id).text)
```

No file? Send `requests: [{custom_id, body}]` inline to `POST /v1/batches` instead.

## What can go in a batch?

| Endpoint | Price in a batch |
|---|---|
| `/v1/chat/completions` | Half the model's per-token price |
| `/v1/embeddings` | Half the model's per-token price |
| `/v1/rerank` | Half the model's per-token price |
| `/v1/cpu/jobs` (code jobs, where your account has them) | Normal CPU price |

Up to 10,000 requests per batch and 10 unfinished batches per key.

## What else can a batch do?

- **Check answers:** `check` with required JSON fields, a schema or retries for chat, or `exit_code` for code jobs. Each line says `passed` or `needs_review`.
- **Cap spending:** `max_spend_usd` stops the batch at that cost.
- **Tell you when it is done:** `notify_url` gets a signed POST.
- **Summarize and rerun:** `GET /v1/batches/{id}/summary` gives counts, cost and builds used; `POST /v1/batches/{id}/rerun` reruns only what failed.
- **Run on a schedule:** `POST /v1/batch-schedules` with `every_minutes` (15 or more), or start a run from a webhook.

## When is a batch the wrong choice?

When you need answers now, or a promise faster than 24 hours. Use normal requests for those. And as with all Smarty Pants work, keep sensitive data out of batches on the general network, or run them on your [Group's](/groups/) Macs.

See every price on the [price page](/pricing/).
