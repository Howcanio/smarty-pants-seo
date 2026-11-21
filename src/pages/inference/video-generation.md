---
layout: ../../layouts/ContentLayout.astro
title: "Video generation API: Wan 2.2 on Smarty Pants"
description: "Make short 480p video clips from a text prompt with Wan 2.2 5B on Apple Silicon Macs. $0.011 a clip, OpenAI-style requests, every clip labeled as AI-made."
h1: "Video generation API: short clips with Wan 2.2"
eyebrow: "For developers"
audience: "buyer"
status: "released"
primaryKeyword: "video generation api"
keywords: ["video generation api", "ai video api", "open source video model api", "text to video api", "wan 2.2 api"]
summary: "Smarty Pants makes short video clips from a text prompt with Wan 2.2 5B (FastWan build) on Apple Silicon Macs. Clips are 480p (832x480 or 480x832) and 2, 3 or 5 seconds long, cost $0.011 each, and take a few minutes. Send POST /v1/videos for a job id and poll it, or POST /v1/videos/generations to wait for the MP4. Every clip is labeled as made by AI."
published: "2026-11-09"
updated: "2026-11-19"
readingMinutes: 3
faqs:
  - q: "What does a video clip cost?"
    a: "$0.011 a clip at 480p, for 2, 3 or 5 seconds. You are not charged for a clip that fails or is refused."
  - q: "How long does a clip take?"
    a: "A few minutes on a Mac. Use POST /v1/videos, which answers at once with a job id, and poll GET /v1/videos/{id}; it shows your place in line and an estimate."
  - q: "Which sizes are supported?"
    a: "832x480 (landscape) or 480x832 (portrait), 2, 3 or 5 seconds. Higher resolutions are not offered."
  - q: "Are there content rules?"
    a: "Yes. No sexual content involving minors, no sexual or nude video of real people, no fakes meant to fool people. Prompts are checked on the Mac before generation, and every clip is labeled as AI-made."
  - q: "How does the price compare?"
    a: "On 19 Nov 2026 DeepInfra listed the same model at $0.0225 for a 5 second 720p clip and half that at 480p, and fal listed $0.0125 for a 480p clip. Smarty Pants is $0.011."
related: ["/ai-models/wan2-2-5b-video/", "/inference/image-generation-api/", "/inference/", "/pricing/"]
sources:
  - label: "Smarty Pants: llms.txt (Video)"
    url: "https://smartypants.network/llms.txt"
  - label: "Smarty Pants: GET /v1/models"
    url: "https://smartypants.network/v1/models"
  - label: "DeepInfra: FastWan 2.2 TI2V 5B"
    url: "https://deepinfra.com/FastVideo/FastWan2.2-TI2V-5B-FullAttn-Diffusers/api"
  - label: "fal: Wan 2.2 5B fast"
    url: "https://fal.ai/models/fal-ai/wan/v2.2-5b/text-to-video/fast-wan"
---

Smarty Pants turns a text prompt into a short video clip on an Apple Silicon Mac. It is made for concept clips, mood shots and quick drafts, not long or high-resolution video.

## How do I make a clip?

Start a job, then poll it. The request body is the same for both routes.

```sh
curl https://smartypants.network/v1/videos \
  -H "Authorization: Bearer $SMARTYPANTS_API_KEY" -H "Content-Type: application/json" \
  -d '{"model": "smartypants/wan2.2-5b-video", "prompt": "A paper boat drifting down a rainy street", "size": "832x480", "seconds": 3}'
# -> {"id": "...", "status": "queued", "ahead": 0, "eta_seconds": ...}
curl https://smartypants.network/v1/videos/ID -H "Authorization: Bearer $SMARTYPANTS_API_KEY"
```

When `status` is `completed`, the response carries the MP4 as `b64_json`. A finished clip is held for at most 30 minutes, so collect it soon. `POST /v1/videos/generations` does the same in one call and waits for the clip.

## What are the limits?

| Setting | Value |
|---|---|
| Model | `smartypants/wan2.2-5b-video` (Wan 2.2 TI2V 5B, FastWan build) |
| Size | 832x480 or 480x832 |
| Length | 2, 3 or 5 seconds |
| Time | A few minutes per clip |
| Price | $0.011 a clip |
| Labels | Every clip is labeled as made by AI |

## When is another provider better?

When you need 720p or higher, clips longer than 5 seconds, image-to-video, or results in seconds. GPU providers offer those. Smarty Pants fits low-cost drafts where a few minutes' wait is fine.

Video runs only on Macs with enough memory, and how many are online changes through the day: check `is_ready` on [/v1/models](https://smartypants.network/v1/models) first. Compare all prices on the [price page](/pricing/).
