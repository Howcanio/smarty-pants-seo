---
layout: ../../layouts/ContentLayout.astro
title: "Video generation API on Smarty Pants (Planned)"
description: "Video generation on Smarty Pants is Planned and not available. Here is what exists today, what to use instead, and how to ask for a video model."
h1: "Video generation on Smarty Pants: Planned"
eyebrow: "For developers"
audience: "buyer"
status: "planned"
primaryKeyword: "video generation api"
keywords: ["video generation api", "ai video api", "open source video model api", "text to video api"]
summary: "Video generation on Smarty Pants is Planned. It is not available, there is no video model in the catalog, and there is no date. Today Smarty Pants serves chat and embedding models, and is testing speech to text (Whisper large-v3 turbo) and image generation (FLUX.1 schnell); both open soon. If you need video now, use a provider that offers it. To ask for a specific open video model, use smartypants.network/request-a-model."
published: "2026-11-09"
updated: "2026-11-09"
readingMinutes: 3
faqs:
  - q: "Can I generate video with Smarty Pants?"
    a: "No. Video generation is Planned and not available. There is no video model in the Smarty Pants catalog today."
  - q: "When will video generation open?"
    a: "There is no date. Planned means it is on the roadmap but not usable by the public."
  - q: "Which video model will Smarty Pants use?"
    a: "Smarty Pants has not named one. You can ask for a specific open video model at smartypants.network/request-a-model."
  - q: "What can I use instead today?"
    a: "For still images, FLUX.1 schnell is in testing on Smarty Pants and opens soon. For video, use a provider that offers it now."
  - q: "Will AI-made video be labeled?"
    a: "The Smarty Pants use rules already say that images and video are labeled as made by AI, and that you must not remove the label to pass them off as real."
related: ["/inference/image-generation-api/", "/inference/", "/ai-models/flux-1-schnell/", "/inference/vs-centralized-providers/"]
sources:
  - label: "Smarty Pants: GET /v1/models (catalog and use rules)"
    url: "https://smartypants.network/v1/models"
  - label: "Smarty Pants: Request a model"
    url: "https://smartypants.network/request-a-model"
  - label: "Smarty Pants: llms.txt"
    url: "https://smartypants.network/llms.txt"
  - label: "Smarty Pants: OpenAPI description (model wishes)"
    url: "https://smartypants.network/openapi.json"
---

Video generation is Planned on Smarty Pants. It is not available, and there is no date. This page says what that means, what you can use today, and how to tell the team which video model you want.

## Can you generate video on Smarty Pants today?

No. There is no video model in the catalog, and no video endpoint. The endpoints that exist are `GET /v1/models`, `POST /v1/chat/completions`, `POST /v1/embeddings` and `POST /v1/audio/transcriptions` ([llms.txt](https://smartypants.network/llms.txt)).

| Capability | Status on Smarty Pants |
|---|---|
| Chat (Qwen3.5 9B, Qwen3.8 27B, Nanbeige4.3 33B) | Released; check `is_ready` |
| Embeddings (Qwen3 Embedding 0.6B) | Released; check `is_ready` |
| Speech to text (Whisper large-v3 turbo) | In testing, opens soon |
| Images (FLUX.1 schnell) | In testing, opens soon |
| Video | Planned |

"Planned" means it is on the roadmap, not usable by the public. It is not a promise of a launch date or of a particular model.

## Which video model is being considered?

Smarty Pants has not named one, so this page doesn't either. If there is an open video model you want, ask for it.

## How do you ask for a video model?

Use [smartypants.network/request-a-model](https://smartypants.network/request-a-model). You can paste a Hugging Face link, an org/name id or a model name, and add a short note about what you would use it for. No sign-in is needed. Agents can send the same request to `POST https://smartypants.network/v1/model-wishes` ([llms.txt](https://smartypants.network/llms.txt)).

Requests help the team see which models people want. They don't guarantee a model will be added.

## What can you use instead right now?

For still images, look at FLUX.1 schnell, which is in testing on Smarty Pants: up to 4 images of up to 1536×1024 per request, each labeled as made by AI. See the [image generation API](/inference/image-generation-api/).

For video you need today, use a provider that already offers video models. Smarty Pants is not the right choice for that work yet.

## What rules will apply to AI video?

The Smarty Pants use rules already cover video, listed in `use_rules` on [`/v1/models`](https://smartypants.network/v1/models):

- No sexual content involving anyone under 18, ever.
- No sexual or nude images or video of real people, and no fake images meant to fool people about real people.
- Images and video are labeled as made by AI. Do not remove the label to pass them off as real.
- Requests and answers that break these rules are blocked and thrown away.

Every model in the Smarty Pants catalog lists these rules today.
