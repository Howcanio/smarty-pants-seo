---
layout: ../../layouts/ContentLayout.astro
title: "What is MLX? Apple's machine learning framework"
description: "What is MLX: Apple's open-source array framework for Apple silicon, how unified memory works, what mlx-lm does, and how 4-bit quantization with groups works."
h1: "What is MLX?"
eyebrow: "Guide"
audience: "buyer"
primaryKeyword: "what is mlx"
keywords: ["what is mlx", "apple mlx", "mlx framework", "mlx-lm", "mlx quantization", "mlx 4-bit", "mlx unified memory"]
summary: "MLX is an open-source array framework for machine learning on Apple silicon, made by Apple machine learning research. Its Python API follows NumPy, and arrays live in unified memory, so the CPU and GPU work on the same data without copying. mlx-lm, built on MLX, runs and fine-tunes language models and makes quantized builds, usually 4-bit with a group size of 64. Smarty Pants serves MLX builds of open models."
published: "2026-11-09"
updated: "2026-11-09"
readingMinutes: 6
faqs:
  - q: "Who makes MLX?"
    a: "MLX is from Apple machine learning research and is developed in the open at github.com/ml-explore. It was first built by Awni Hannun, Jagrit Digani, Angelos Katharopoulos and Ronan Collobert."
  - q: "Does MLX only run on Macs?"
    a: "It is designed for Apple silicon, but the project also publishes Linux packages: a CUDA backend (pip install mlx[cuda]) and a CPU-only build (pip install mlx[cpu])."
  - q: "What is the difference between MLX and mlx-lm?"
    a: "MLX is the general array and neural network framework. mlx-lm is a Python package on top of it for generating text with, fine-tuning and quantizing language models."
  - q: "What does 4-bit with group size 64 mean?"
    a: "Each weight is stored in 4 bits, and every 64 consecutive weights share one scale and one bias used to turn them back into real numbers. Those defaults come from MLX's affine quantization mode."
  - q: "Which MLX build does Smarty Pants serve for a model?"
    a: "Each model's build is named in the Smarty Pants /v1/models list, with a build_id and quantization field, so you can see exactly which build answers your request."
related: ["/guides/how-to-run-an-llm-on-a-mac/", "/guides/how-much-ram-to-run-an-llm/", "/inference/", "/inference/openai-compatible-api/", "/ai-models/", "/macs/"]
sources:
  - label: "ml-explore: MLX README on GitHub"
    url: "https://github.com/ml-explore/mlx"
  - label: "MLX documentation: Unified memory"
    url: "https://ml-explore.github.io/mlx/build/html/usage/unified_memory.html"
  - label: "MLX documentation: mlx.core.quantize"
    url: "https://ml-explore.github.io/mlx/build/html/python/_autosummary/mlx.core.quantize.html"
  - label: "ml-explore: mlx.core.quantize docstring and modes table (python/src/ops.cpp)"
    url: "https://github.com/ml-explore/mlx/blob/main/python/src/ops.cpp"
  - label: "ml-explore: mlx-lm README on GitHub"
    url: "https://github.com/ml-explore/mlx-lm"
  - label: "LM Studio: LM Studio 0.3.4 ships with Apple MLX (8 Oct 2024)"
    url: "https://lmstudio.ai/blog/lmstudio-v0.3.4"
  - label: "Smarty Pants: Mac benchmarks dataset on Hugging Face"
    url: "https://huggingface.co/datasets/smartypantsnet/mac-benchmarks"
  - label: "Smarty Pants: live models and builds (/v1/models)"
    url: "https://smartypants.network/v1/models"
---

MLX is the machine learning framework Apple's researchers built for Apple silicon. If you have run a local model on a Mac, there is a good chance MLX was doing the work, either directly or inside an app such as LM Studio. This guide explains what MLX is, why unified memory matters, what mlx-lm adds, and how MLX quantization makes large models fit.

## What is MLX?

MLX is "an array framework for machine learning on Apple silicon, brought to you by Apple machine learning research" ([MLX README](https://github.com/ml-explore/mlx)). It is open source, installs with `pip install mlx`, and is aimed at researchers who want to train and run models efficiently on a Mac.

Key features, from the project README:

- **Familiar APIs.** The Python API closely follows NumPy. There are also C++, C and Swift APIs, and higher-level `mlx.nn` and `mlx.optimizers` packages that follow PyTorch.
- **Function transformations.** Automatic differentiation, automatic vectorization and graph optimization.
- **Lazy computation.** Arrays are only materialized when needed.
- **Dynamic graphs.** Changing input shapes does not trigger slow recompilation.
- **CPU and GPU.** Operations can run on either device.
- **Unified memory.** Arrays live in shared memory, so any device can work on them without transfers.

MLX is designed for Apple silicon, but the README also lists Linux packages: `pip install mlx[cuda]` for an NVIDIA CUDA backend and `pip install mlx[cpu]` for CPU only.

## Why does unified memory matter for MLX?

On Apple silicon, the CPU and GPU read the same memory, so MLX never has to copy model weights between them. "Apple silicon has a unified memory architecture. The CPU and GPU have direct access to the same memory pool. MLX is designed to take advantage of that" ([MLX docs](https://ml-explore.github.io/mlx/build/html/usage/unified_memory.html)).

In practice, you create an array without saying where it lives, and choose the device when you run an operation:

```python
import mlx.core as mx

a = mx.random.normal((100,))
b = mx.random.normal((100,))
# both live in unified memory; pick the device per operation
mx.add(a, b, stream=mx.gpu)
```

For language models this means one number decides what fits: the Mac's total memory. A 32 GB Mac can give a 16 GB model to the GPU without a separate graphics card. The details, including the macOS limit on how much the GPU can wire, are in [How much RAM do you need to run an LLM?](/guides/how-much-ram-to-run-an-llm/).

## What is mlx-lm?

mlx-lm is the MLX team's Python package "for generating text and fine-tuning large language models on Apple silicon with MLX" ([mlx-lm README](https://github.com/ml-explore/mlx-lm)). It loads models straight from Hugging Face and gives you commands for each common job.

| Command | What it does |
|---|---|
| `mlx_lm.generate` | Answer one prompt |
| `mlx_lm.chat` | Chat in the terminal, keeping context |
| `mlx_lm.server` | Local HTTP server similar to the OpenAI chat API |
| `mlx_lm.convert -q` | Make a quantized MLX build of a Hugging Face model, optionally upload it |
| LoRA and full fine-tuning | Train adapters or the full model, including quantized models |

It also has tools for long prompts (a rotating KV cache, prompt caching and a configurable prefill step) and supports distributed inference and fine-tuning with `mx.distributed`. Thousands of ready-made builds are on the [MLX Community](https://huggingface.co/mlx-community) Hugging Face page. For a step-by-step setup, see [How to run an LLM on a Mac](/guides/how-to-run-an-llm-on-a-mac/).

Other tools use MLX too. LM Studio added "an MLX engine for running on-device LLMs super efficiently on Apple Silicon Macs" in version 0.3.4, alongside its llama.cpp engine ([LM Studio](https://lmstudio.ai/blog/lmstudio-v0.3.4)).

## How does MLX quantization work?

Quantization stores each weight in fewer bits so the model takes less memory and reads faster. MLX's default "affine" mode uses 4 bits per weight and groups of 64 weights; each group shares a scale and a bias that turn the small integers back into real numbers ([`mlx.core.quantize`](https://ml-explore.github.io/mlx/build/html/python/_autosummary/mlx.core.quantize.html)).

The supported modes, from the MLX source ([ops.cpp](https://github.com/ml-explore/mlx/blob/main/python/src/ops.cpp)), with defaults marked:

| Mode | Group size | Bits | Scale type | Bias |
|---|---|---|---|---|
| affine | 32, **64**, 128 | 1, 2, 3, **4**, 5, 6, 8 | same as input | yes |
| mxfp4 | **32** | **4** | e8m0 | no |
| mxfp8 | **32** | **8** | e8m0 | no |
| nvfp4 | **16** | **4** | e4m3 | no |

Two trade-offs follow from this:

- **Group size.** Smaller groups mean more scales, so slightly better accuracy and slightly more memory. Because each group of 64 also stores a 16-bit scale and bias, a 4-bit build averages about 4.5 bits per weight.
- **Bits.** Fewer bits mean a smaller, quicker model, until quality falls off.

The [Smarty Pants Mac benchmarks](https://huggingface.co/datasets/smartypantsnet/mac-benchmarks) tested these choices on Qwen3.5-4B on an Apple M5 Pro Mac mini (measured 22 Oct 2026). The standard 4-bit build ran at 99.7 tokens per second. MXFP4 was about 4% faster with about 4% worse quality. Finer groups (32) were slightly better in quality and 9% slower. 3-bit and mixed 3/6-bit builds were "too lossy". The standard 4-bit build stayed the best trade-off.

## Does Smarty Pants use MLX?

Yes. [Smarty Pants](/inference/) runs open models on idle Apple Silicon Macs, and each model is served as a specific build, for example 4-bit MLX. The build is named in [`/v1/models`](https://smartypants.network/v1/models) with a `build_id` and a `quantization` field, so you know exactly which weights answer your request.

You call those models through an [OpenAI-compatible API](/inference/openai-compatible-api/) at `https://smartypants.network/v1`, priced per token. [[API_ACCESS]] If you have a Mac with enough memory and want full control, running MLX yourself is free and keeps your data on your machine.
