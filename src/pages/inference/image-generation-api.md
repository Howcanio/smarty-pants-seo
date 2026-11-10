---
layout: ../../layouts/ContentLayout.astro
title: "Image generation API: FLUX.1 schnell | Smarty Pants"
description: "The Smarty Pants image generation API runs FLUX.1 schnell on 48 GB+ Macs: up to 4 images up to 1536×1024 per request. In testing, opens soon."
h1: "Image generation API with FLUX.1 schnell"
eyebrow: "For developers"
audience: "buyer"
status: "testing"
primaryKeyword: "image generation api"
keywords: ["image generation api", "flux schnell api", "flux.1 schnell api", "text to image api", "open source image model api"]
summary: "Smarty Pants is testing an image generation API that runs FLUX.1 schnell on Apple Silicon Macs with 48 GB of memory or more. Each request can make up to 4 images of up to 1536×1024, and every image is labeled as made by AI. The listed price on 8 Nov 2026 was $0.003 a picture. It is in testing and opens soon; the request format will be in the docs at launch."
published: "2026-11-09"
updated: "2026-11-09"
readingMinutes: 4
faqs:
  - q: "Can I generate images with Smarty Pants today?"
    a: "Not yet. FLUX.1 schnell is in testing and opens soon. The API docs will describe the request format when it opens."
  - q: "How many images can one request make?"
    a: "Up to 4 images, each up to 1536×1024, per request."
  - q: "What does an image cost?"
    a: "The listed price on 8 Nov 2026 was $0.003 a picture. Check smartypants.network/api for the current price."
  - q: "Are the images labeled as AI-made?"
    a: "Yes. Every image is labeled as made by AI, and the use rules say not to remove the label to pass an image off as real."
  - q: "What is not allowed?"
    a: "No sexual content involving anyone under 18, no sexual or nude images of real people, no fake images meant to fool people about real people, and nothing illegal or meant to hurt people. Requests that break these rules are blocked and thrown away."
  - q: "What license does FLUX.1 schnell use?"
    a: "Apache-2.0, according to the Black Forest Labs model card on Hugging Face, which says it can be used for personal, scientific and commercial purposes."
related: ["/ai-models/flux-1-schnell/", "/inference/", "/inference/video-generation/", "/inference/pricing/", "/inference/vs-centralized-providers/"]
sources:
  - label: "Smarty Pants: model use rules in GET /v1/models"
    url: "https://smartypants.network/v1/models"
  - label: "Smarty Pants: API guide (listed image price)"
    url: "https://smartypants.network/api"
  - label: "Smarty Pants: Agent kit and docs"
    url: "https://smartypants.network/docs/agents"
  - label: "Smarty Pants: Terms (use rules)"
    url: "https://smartypants.network/legal"
  - label: "Hugging Face: black-forest-labs/FLUX.1-schnell model card"
    url: "https://huggingface.co/black-forest-labs/FLUX.1-schnell"
---

Smarty Pants is testing image generation with FLUX.1 schnell, an open text-to-image model from Black Forest Labs, on Apple Silicon Macs. It is not open yet. This page says what it will do, what it costs, and the rules that come with it.

## What is the Smarty Pants image generation API?

It runs FLUX.1 schnell on Macs with 48 GB of memory or more and returns up to 4 images per request. It is in testing and opens soon.

| Spec | Value |
|---|---|
| API name | `smartypants/flux.1-schnell` |
| Images per request | up to 4 |
| Image size | up to 1536×1024 |
| Labeling | every image labeled as made by AI |
| Listed price (8 Nov 2026) | $0.003 a picture |
| Build | 8-bit MLX |
| Served on | qualified 48 GB+ Apple Silicon Macs |
| License | Apache-2.0 ([model card](https://huggingface.co/black-forest-labs/FLUX.1-schnell)) |
| Status | In testing, opens soon |

The [Black Forest Labs model card](https://huggingface.co/black-forest-labs/FLUX.1-schnell) describes FLUX.1 schnell as a 12 billion parameter rectified flow transformer that can make images in 1 to 4 steps. On Smarty Pants, only qualified 48 GB+ Macs serve it.

## How do you call it?

The request format is not published yet. The [API docs](https://smartypants.network/docs/agents) will cover it when image generation opens. Until then, the [model page](/ai-models/flux-1-schnell/) shows its current state.

[[API_ACCESS]]

## What are the use rules?

Everyone agrees to the Smarty Pants use rules once, when they create an API key. The rules listed in `use_rules` on [`/v1/models`](https://smartypants.network/v1/models) (version 2026-11-05):

- No sexual content involving anyone under 18, ever. Accounts that try are blocked for good.
- No sexual or nude images or video of real people, and no fake images meant to fool people about real people.
- Nothing illegal, and nothing meant to hurt people.
- Images and video are labeled as made by AI. Do not remove the label to pass them off as real.
- Requests and answers that break these rules are blocked and thrown away. Smarty Pants keeps only a note that a block happened, never the content.

The full terms are on [smartypants.network/legal](https://smartypants.network/legal).

## What will it cost?

The listed price on 8 Nov 2026 was $0.003 a picture ([smartypants.network/api](https://smartypants.network/api)), so a request for 4 images would be $0.012 at that price. Prices can change before launch. See [/inference/pricing/](/inference/pricing/) for current prices.

## What is it good for?

Drafts and placeholders where an open model that makes images in a few steps is good enough: product mockups, blog and slide illustrations, concept sketches, and test images for your own app. The use rules forbid sexual or nude images of real people and fakes meant to fool people about real people, and every image carries an AI label.

Prompts run on Macs other people own, and the live site says: "General network: please don't send sensitive data." Keep confidential product names or unreleased designs out of prompts.

Want video instead? Video generation is Planned and not available; see [/inference/video-generation/](/inference/video-generation/).
