---
layout: ../../layouts/ContentLayout.astro
title: "Whisper API: speech to text on Macs | Smarty Pants"
description: "The Smarty Pants Whisper API runs Whisper large-v3 turbo on Apple Silicon Macs: up to 30 minutes or 25 MB per file. In testing, opens soon."
h1: "Speech to text API with Whisper large-v3 turbo"
eyebrow: "For developers"
audience: "buyer"
status: "testing"
primaryKeyword: "whisper api"
keywords: ["whisper api", "speech to text api", "whisper large v3 turbo api", "audio transcription api", "openai compatible transcription"]
summary: "Smarty Pants has a speech to text API that runs Whisper large-v3 turbo on Apple Silicon Macs through the OpenAI-format endpoint POST https://smartypants.network/v1/audio/transcriptions. Each file can be up to 30 minutes or 25 MB. The listed price on 8 Nov 2026 was $0.18 an hour of audio. The model is in testing and opens soon, so it is not for production traffic yet."
published: "2026-11-09"
updated: "2026-11-09"
readingMinutes: 5
faqs:
  - q: "Can I use the Smarty Pants Whisper API today?"
    a: "Not for production. Whisper large-v3 turbo is in testing and opens soon; the live docs mark it \"early testing, not for production traffic.\" Check is_ready on /v1/models."
  - q: "How long can an audio file be?"
    a: "Up to 30 minutes or 25 MB per file. Split longer recordings into parts before you upload them."
  - q: "What does it cost?"
    a: "The listed price on 8 Nov 2026 was $0.18 an hour of audio. Check /v1/models or smartypants.network/api for the current price."
  - q: "Does it work with the OpenAI SDK?"
    a: "Yes. The endpoint uses the OpenAI format with a multipart audio upload, so client.audio.transcriptions.create works once you set the Smarty Pants base URL and key."
  - q: "Which version of Whisper is it?"
    a: "Whisper large-v3 turbo, served as a Core ML build. The model card on Hugging Face describes turbo as a pruned large-v3 with 4 decoding layers instead of 32, faster with a minor quality loss."
related: ["/ai-models/whisper-large-v3-turbo/", "/inference/", "/inference/openai-compatible-api/", "/inference/pricing/", "/inference/vs-centralized-providers/"]
sources:
  - label: "Smarty Pants: llms.txt"
    url: "https://smartypants.network/llms.txt"
  - label: "Smarty Pants: Agent kit and docs"
    url: "https://smartypants.network/docs/agents"
  - label: "Smarty Pants: GET /v1/models"
    url: "https://smartypants.network/v1/models"
  - label: "Smarty Pants: API guide (listed audio price)"
    url: "https://smartypants.network/api"
  - label: "Hugging Face: openai/whisper-large-v3-turbo model card"
    url: "https://huggingface.co/openai/whisper-large-v3-turbo"
  - label: "GroqCloud: Supported models (checked 9 Nov 2026)"
    url: "https://console.groq.com/docs/models"
---

Smarty Pants is testing a speech to text API that runs Whisper large-v3 turbo on Apple Silicon Macs. It uses the same OpenAI-compatible API as the chat models, so existing transcription code needs only a new base URL and key. It is in testing and opens soon.

## What is the Smarty Pants Whisper API?

It is OpenAI's open Whisper large-v3 turbo model, served on Macs behind `POST /v1/audio/transcriptions`. Right now it is in testing: the live docs list it as "early testing, not for production traffic" ([llms.txt](https://smartypants.network/llms.txt)).

| Spec | Value |
|---|---|
| API name | `smartypants/whisper-large-v3-turbo` |
| Endpoint | `POST https://smartypants.network/v1/audio/transcriptions` (multipart upload) |
| Limit per file | up to 30 minutes or 25 MB |
| Listed price (8 Nov 2026) | $0.18 an hour of audio |
| Build | Core ML |
| License | MIT |
| Served on | qualified 16 GB+ Apple Silicon Macs |
| Status | In testing, opens soon |

The [Hugging Face model card](https://huggingface.co/openai/whisper-large-v3-turbo) describes large-v3 turbo as a pruned Whisper large-v3 with 4 decoding layers instead of 32: "way faster, at the expense of a minor quality degradation." It lists support for many languages and predicts the source language automatically.

## How do you send audio?

Upload the file as multipart form data with your Smarty Pants key, in the OpenAI format. [[API_ACCESS]]

### curl

```bash
curl https://smartypants.network/v1/audio/transcriptions \
  -H "Authorization: Bearer $SMARTYPANTS_API_KEY" \
  -F model="smartypants/whisper-large-v3-turbo" \
  -F file="@meeting.m4a"
```

### Python

```python
import os
from openai import OpenAI

client = OpenAI(base_url="https://smartypants.network/v1", api_key=os.environ["SMARTYPANTS_API_KEY"])

with open("meeting.m4a", "rb") as audio:
    transcript = client.audio.transcriptions.create(
        model="smartypants/whisper-large-v3-turbo",
        file=audio,
    )
print(transcript.text)
```

While the model is in testing, `is_ready` on [`/v1/models`](https://smartypants.network/v1/models) may be false and requests may return 429 or 503. Wait the `Retry-After` seconds or send the file to your current provider. You are not charged for a request Smarty Pants can't serve.

## What does an hour of audio cost?

The listed price on 8 Nov 2026 was $0.18 an hour of audio ([smartypants.network/api](https://smartypants.network/api)). Prices can change; [`/v1/models`](https://smartypants.network/v1/models) has the current one, and [/inference/pricing/](/inference/pricing/) has a calculator.

That is not the lowest listed price for this model. On 9 Nov 2026 Groq's [supported models page](https://console.groq.com/docs/models) listed Whisper Large V3 Turbo at $0.04 an hour, with files up to 100 MB. If price per hour is what matters most, compare both before choosing. See [Smarty Pants vs. centralized providers](/inference/vs-centralized-providers/).

## What is it good for?

Turning recordings into text you can search, summarize or label.

- Meeting and call notes, then a summary with a [chat model](/inference/).
- Draft captions for podcasts and videos.
- Voice memos and interviews you want to search.

Keep files under 30 minutes or 25 MB each. For a long recording, split it into parts and join the text afterward.

## What should you not upload?

Recordings with sensitive content. Requests run on Macs other people own, and a serving Mac must decrypt a request in memory to answer it. The live site says: "General network: please don't send sensitive data." Calls with customers, patients or private conversations belong on a provider you have approved for that data.
