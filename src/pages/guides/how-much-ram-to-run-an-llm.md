---
layout: ../../layouts/ContentLayout.astro
title: "How much RAM to run an LLM: Mac memory guide"
description: "How much RAM you need to run an LLM: the parameters × bits ÷ 8 rule, KV cache and macOS headroom, plus measured peak memory on Apple Silicon Macs."
h1: "How much RAM do you need to run an LLM?"
eyebrow: "Guide"
audience: "both"
primaryKeyword: "how much ram to run an llm"
keywords: ["how much ram to run an llm", "llm memory requirements", "vram for llm", "mac unified memory llm", "4-bit model size", "kv cache memory"]
summary: "Estimate the weights first: parameters × bits per weight ÷ 8 gives bytes. A 4-bit MLX build uses about 4.5 bits per weight once group scales are counted, so a 27-billion-parameter model is about 16 GB on disk. Then add the KV cache, which grows with prompt length, and leave room for macOS. In Smarty Pants measurements, Qwen 3.8 27B peaked at 18.26 GB, which is why it needs a 32 GB Mac."
published: "2026-11-09"
updated: "2026-11-09"
readingMinutes: 7
faqs:
  - q: "How much RAM does a 7B or 8B model need?"
    a: "At 4-bit, the weights are roughly 4 to 5 GB, so a 16 GB Mac usually has room for the model, a few thousand tokens of context and macOS. At 16-bit the same model needs more than 14 GB for weights alone."
  - q: "Is 16 GB of unified memory enough for an LLM?"
    a: "For small models, yes. Smarty Pants lists 16 GB+ as the minimum for Qwen3.5-4B and Qwen3.5-9B, and measured Qwen3.5-4B at 4.13 GB peak on a 4,096-token prompt."
  - q: "Why does a model use more memory than its file size?"
    a: "The running model also needs a KV cache for the prompt and answer, plus working buffers. The cache grows with context length, so long prompts raise peak memory."
  - q: "Can the Mac's GPU use all of its unified memory?"
    a: "Not by default. macOS caps how much memory the GPU can wire; mlx-lm warns when a model is close to that cap and documents raising it with the iogpu.wired_limit_mb setting on macOS 15 or later."
  - q: "Does a mixture-of-experts model need less RAM?"
    a: "Not for storage. All experts must be in memory, so Qwen3.6-35B-A3B still needs room for all 35 billion parameters even though only about 3 billion are active per token."
related: ["/guides/how-to-run-an-llm-on-a-mac/", "/guides/what-is-mlx/", "/guides/mac-mini-for-ai/", "/ai-models/", "/macs/", "/inference/"]
sources:
  - label: "Smarty Pants: Mac benchmarks dataset (README)"
    url: "https://huggingface.co/datasets/smartypantsnet/mac-benchmarks"
  - label: "ml-explore: mlx.core.quantize docstring (quantization modes table)"
    url: "https://github.com/ml-explore/mlx/blob/main/python/src/ops.cpp"
  - label: "MLX documentation: mlx.core.quantize"
    url: "https://ml-explore.github.io/mlx/build/html/python/_autosummary/mlx.core.quantize.html"
  - label: "ml-explore: mlx-lm README (Large models, KV cache)"
    url: "https://github.com/ml-explore/mlx-lm"
  - label: "ml-explore: mlx-lm HTTP model server, KV cache quantization"
    url: "https://github.com/ml-explore/mlx-lm/blob/main/mlx_lm/SERVER.md"
  - label: "Apple Developer: recommendedMaxWorkingSetSize"
    url: "https://developer.apple.com/documentation/metal/mtldevice/recommendedmaxworkingsetsize"
  - label: "Hugging Face: mlx-community/Qwen3.5-4B-MLX-4bit"
    url: "https://huggingface.co/mlx-community/Qwen3.5-4B-MLX-4bit"
  - label: "Hugging Face: Qwen/Qwen3.6-35B-A3B model card"
    url: "https://huggingface.co/Qwen/Qwen3.6-35B-A3B"
  - label: "Hugging Face: openai/gpt-oss-20b model card"
    url: "https://huggingface.co/openai/gpt-oss-20b"
  - label: "Hugging Face: Qwen/Qwen3.5-4B (parameter count)"
    url: "https://huggingface.co/Qwen/Qwen3.5-4B"
  - label: "Hugging Face: Qwen/Qwen3.5-9B (parameter count)"
    url: "https://huggingface.co/Qwen/Qwen3.5-9B"
  - label: "Hugging Face: Qwen/Qwen3.8-27B (parameter count)"
    url: "https://huggingface.co/Qwen/Qwen3.8-27B"
  - label: "Hugging Face: Nanbeige/Nanbeige4.3-33B (parameter count)"
    url: "https://huggingface.co/Nanbeige/Nanbeige4.3-33B"
  - label: "Hugging Face: Qwen/Qwen3-Embedding-0.6B (parameter count)"
    url: "https://huggingface.co/Qwen/Qwen3-Embedding-0.6B"
  - label: "Hugging Face: 4-bit MLX builds (mlx-community/Qwen3.8-27B-4bit, Qwen3.6-35B-A3B-4bit, gpt-oss-20b-MXFP4-Q8; lmstudio-community/Qwen3.5-9B-MLX-4bit)"
    url: "https://huggingface.co/mlx-community"
  - label: "Smarty Pants: live models and prices (/v1/models)"
    url: "https://smartypants.network/v1/models"
---

The memory a language model needs comes from three things: the weights, the working memory for your prompt and answer, and everything else your computer is running. On an Apple Silicon Mac all three share one pool of unified memory, so you can add them up against the number on About This Mac. Here is the rule of thumb, the limits macOS adds, and real measured numbers.

## How do you estimate the size of an LLM's weights?

Multiply the parameter count by the bits per weight and divide by 8 to get bytes. A model with 27.8 billion parameters at 16 bits is about 55.6 GB; at 4 bits it is about 14 GB, before overhead.

Quantized formats store a little more than the headline bit count. In MLX's default "affine" mode, every group of weights also stores a scale and a bias in the input's own type. The defaults are 4 bits and a group size of 64 ([MLX `quantize` docs](https://ml-explore.github.io/mlx/build/html/python/_autosummary/mlx.core.quantize.html), [source](https://github.com/ml-explore/mlx/blob/main/python/src/ops.cpp)). With 16-bit scales and biases, that adds 32 bits per 64 weights, so a "4-bit" build is about **4.5 bits per weight**. Some builds keep small or sensitive layers at higher precision, which pushes the average up: the card for [Qwen3.5-4B-MLX-4bit](https://huggingface.co/mlx-community/Qwen3.5-4B-MLX-4bit) reports 5.347 bits per weight.

| Precision | Bits per weight | 9.65B model (Qwen3.5-9B) | 27.8B model (Qwen3.8-27B) |
|---|---|---|---|
| 16-bit (bf16) | 16 | 19.3 GB | 55.6 GB |
| 8-bit, group 64 | about 8.5 | 10.3 GB | 29.5 GB |
| 4-bit, group 64 | about 4.5 | 5.4 GB | 15.6 GB |

Parameter counts are from each model's safetensors metadata on Hugging Face ([Qwen3.5-9B](https://huggingface.co/Qwen/Qwen3.5-9B), [Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B)).

## What else uses memory besides the weights?

The KV cache and macOS. The KV cache stores attention data for every token in the conversation, so it grows with context length; on top of that, the system and your open apps need their share.

- **KV cache.** mlx-lm offers a fixed-size rotating cache: small values "use very little RAM but result in worse quality", larger values use more ([mlx-lm README](https://github.com/ml-explore/mlx-lm)). Its server can also quantize the cache with `--kv-bits` to save memory on long contexts ([SERVER.md](https://github.com/ml-explore/mlx-lm/blob/main/mlx_lm/SERVER.md)).
- **Prompt processing.** Long prompts are read in steps; a smaller `--prefill-step-size` lowers peak memory at some cost to speed (default 2,048).
- **macOS and apps.** Plan to leave several gigabytes free. On a 16 GB Mac, a model that needs 14 GB at peak will crowd out everything else.

You can see the overhead in measured numbers below: Qwen 3.8 27B is a 16.05 GB download as a 4-bit MLX build, and it peaked at 18.26 GB during a 4,096-token prompt.

## Can the Mac's GPU use all of its unified memory?

No, not by default. Metal reports a recommended working-set size, which Apple describes as "an approximation of how much memory, in bytes, this GPU device can allocate without affecting its runtime performance" ([Apple Developer](https://developer.apple.com/documentation/metal/mtldevice/recommendedmaxworkingsetsize)).

mlx-lm tries to wire the model's memory so it stays resident, which needs macOS 15 or later. If you see a warning that generating "requires" more memory, the model will likely be slow. If the model does fit, the [mlx-lm README](https://github.com/ml-explore/mlx-lm) says you can raise the limit:

```sh
sudo sysctl iogpu.wired_limit_mb=N
```

N should be larger than the model in megabytes but smaller than the Mac's memory. Raising it leaves less memory for macOS and your apps, so keep headroom.

## How much memory does each Smarty Pants model need?

The table shows the minimum Mac memory Smarty Pants lists for each model, the estimated 4-bit weight size, a public 4-bit MLX download for comparison, and measured peak memory where the [Smarty Pants Mac benchmarks](https://huggingface.co/datasets/smartypantsnet/mac-benchmarks) have one. Peak memory was measured during a 4,096-token prompt unless noted.

| Model | Parameters | 4-bit estimate | Public MLX file | Measured peak (Mac, date) | Minimum Mac memory |
|---|---|---|---|---|---|
| [smartypants/qwen3.5-4b](/ai-models/qwen3-5-4b/) | 4.66B | 2.6 GB | 3.03 GB ([mlx-community](https://huggingface.co/mlx-community/Qwen3.5-4B-MLX-4bit)) | 4.13 GB (M5 Pro Mac mini, 22 Oct 2026) | 16 GB+ |
| [smartypants/qwen3.5-9b](/ai-models/qwen3-5-9b/) | 9.65B | 5.4 GB | 5.95 GB ([lmstudio-community](https://huggingface.co/lmstudio-community/Qwen3.5-9B-MLX-4bit)) | not measured | 16 GB+ |
| [smartypants/gpt-oss-20b](/ai-models/gpt-oss-20b/) | 20.9B (3.6B active) | ships in MXFP4 | 12.08 GB ([mlx-community](https://huggingface.co/mlx-community/gpt-oss-20b-MXFP4-Q8)) | not measured | 24 GB+ |
| [smartypants/qwen3.8-27b](/ai-models/qwen3-8-27b/) | 27.8B | 15.6 GB | 16.05 GB ([mlx-community](https://huggingface.co/mlx-community/Qwen3.8-27B-4bit)) | 18.26 GB (M5 Pro Mac mini, 2 Nov 2026) | 32 GB+ |
| [smartypants/nanbeige4.3-33b](/ai-models/nanbeige4-3-33b/) | 33.1B | 18.6 GB | none found | not measured | 32 GB+ |
| [smartypants/qwen3.6-35b-a3b](/ai-models/qwen3-6-35b-a3b/) | 36.0B (3B active) | 20.2 GB | 20.40 GB ([mlx-community](https://huggingface.co/mlx-community/Qwen3.6-35B-A3B-4bit)) | 21.52 GB (M3 Max 36 GB MacBook Pro, 8 Sep 2026; 500 to 4,096-token prompts) | 32 GB+ |
| [smartypants/qwen3-embedding-0.6b](/ai-models/qwen3-embedding-0-6b/) | 0.60B | 0.3 GB | not checked | not measured | 16 GB+ |
| [smartypants/whisper-large-v3-turbo](/ai-models/whisper-large-v3-turbo/) | not checked | not checked | not checked | not measured | 16 GB+ |
| [smartypants/flux.1-schnell](/ai-models/flux-1-schnell/) | not checked | not checked | not checked | not measured | 48 GB+ |

Notes on the table:

- Parameter counts come from the safetensors metadata of each base model on Hugging Face ([Qwen3.5-4B](https://huggingface.co/Qwen/Qwen3.5-4B), [Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B), [Nanbeige4.3-33B](https://huggingface.co/Nanbeige/Nanbeige4.3-33B), [Qwen3.6-35B-A3B](https://huggingface.co/Qwen/Qwen3.6-35B-A3B), [gpt-oss-20b](https://huggingface.co/openai/gpt-oss-20b), [Qwen3-Embedding-0.6B](https://huggingface.co/Qwen/Qwen3-Embedding-0.6B)). Active parameter counts are from the model cards.
- OpenAI says gpt-oss-20b was post-trained with MXFP4 quantization of its expert weights so it can "run within 16GB of memory" ([model card](https://huggingface.co/openai/gpt-oss-20b)). Smarty Pants asks for 24 GB+ to leave room for context and macOS.
- Peak memory depends on the prompt. The same Qwen 3.8 27B build peaked at 15.80 GB in a separate math test on 6 Nov 2026, and Qwen3.5-4B at 2.90 GB on 5 Nov 2026.
- Smarty Pants serves each model as a named build; the exact build and quantization are in [`/v1/models`](https://smartypants.network/v1/models). The public files above are for comparison only.

For which chips come with which memory, see the [Macs](/macs/) pages.

## What if the model doesn't fit?

Pick a smaller model, a lower-bit build, or a shorter context, or run it somewhere else. The [Smarty Pants benchmarks](https://huggingface.co/datasets/smartypantsnet/mac-benchmarks) found that below 4 bits "quality drops sharply" for Qwen3.5-4B, so 4-bit is a sensible floor for most chat use.

If you would rather not buy more memory, a hosted API runs the model for you. [Smarty Pants](/inference/) serves these models from idle Apple Silicon Macs through an OpenAI-compatible API, priced per token. [[API_ACCESS]]
