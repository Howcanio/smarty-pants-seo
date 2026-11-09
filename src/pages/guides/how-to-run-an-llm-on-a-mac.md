---
layout: ../../layouts/ContentLayout.astro
title: "Run an LLM on a Mac: MLX, LM Studio, Ollama, llama.cpp"
description: "How to run an LLM on a Mac with Apple Silicon: the four main tools, how to pick a model size for your memory, and a full mlx-lm walkthrough."
h1: "How to run an LLM on a Mac"
eyebrow: "Guide"
audience: "buyer"
primaryKeyword: "run llm on mac"
keywords: ["run llm on mac", "local llm mac", "mlx-lm", "lm studio mac", "ollama mac", "llama.cpp apple silicon", "run ai model locally mac"]
summary: "To run an LLM on a Mac, use an Apple Silicon Mac and one of four free tools: mlx-lm (Apple's MLX in Python), LM Studio (a desktop app), Ollama (a command-line app with a local API) or llama.cpp (C/C++). Pick a 4-bit model whose file is well under your Mac's memory, since the model, its working memory and macOS all share the same RAM. If your Mac is too small, call a hosted API instead."
published: "2026-11-09"
updated: "2026-11-09"
readingMinutes: 7
faqs:
  - q: "Can I run an LLM on a Mac with 8 GB of memory?"
    a: "Sometimes, with small models. LM Studio says 8 GB Macs may still work if you stick to smaller models and modest context sizes, and recommends 16 GB or more."
  - q: "Which is better on a Mac, MLX or llama.cpp?"
    a: "Both use the Apple GPU. MLX is Apple's own framework and reads MLX-format models; llama.cpp reads GGUF files and runs on many platforms. Try the same model in both on your Mac and keep the one that suits you."
  - q: "Do I need an Apple Silicon Mac?"
    a: "For these tools, yes in practice. LM Studio lists Apple Silicon as its macOS requirement, and MLX is built for Apple silicon."
  - q: "Can my local model work with code written for the OpenAI API?"
    a: "Often, yes. mlx-lm's server, llama.cpp's server and LM Studio's server all offer OpenAI-style endpoints, so you point your client at the local address instead."
  - q: "When should I use a hosted API instead of a local model?"
    a: "When the model you need doesn't fit in your Mac's memory, when you need it while your Mac is off, or when you need more requests at once than one Mac can handle."
related: ["/guides/how-much-ram-to-run-an-llm/", "/guides/what-is-mlx/", "/guides/mac-mini-for-ai/", "/inference/", "/ai-models/", "/macs/"]
sources:
  - label: "ml-explore: mlx-lm README"
    url: "https://github.com/ml-explore/mlx-lm"
  - label: "ml-explore: mlx-lm HTTP model server (SERVER.md)"
    url: "https://github.com/ml-explore/mlx-lm/blob/main/mlx_lm/SERVER.md"
  - label: "LM Studio: System requirements"
    url: "https://lmstudio.ai/docs/app/system-requirements"
  - label: "LM Studio: LM Studio 0.3.4 ships with Apple MLX (8 Oct 2024)"
    url: "https://lmstudio.ai/blog/lmstudio-v0.3.4"
  - label: "LM Studio: LM Studio as a local LLM API server"
    url: "https://lmstudio.ai/docs/developer/core/server"
  - label: "Ollama: README on GitHub"
    url: "https://github.com/ollama/ollama"
  - label: "ggml-org: llama.cpp README on GitHub"
    url: "https://github.com/ggml-org/llama.cpp"
  - label: "Hugging Face: mlx-community/Mistral-7B-Instruct-v0.3-4bit"
    url: "https://huggingface.co/mlx-community/Mistral-7B-Instruct-v0.3-4bit"
  - label: "Smarty Pants: Mac benchmarks dataset on Hugging Face"
    url: "https://huggingface.co/datasets/smartypantsnet/mac-benchmarks"
---

An Apple Silicon Mac can run open language models on its own GPU, with no cloud account. The CPU and GPU share one pool of memory, so the main question is not "do I have a graphics card" but "does the model fit in my Mac's memory". This guide compares the four common tools, shows how to pick a model size, walks through one setup end to end, and says when a hosted API is the better choice.

## Which tools can run an LLM on a Mac?

Four free tools cover most people: mlx-lm, LM Studio, Ollama and llama.cpp. They differ mainly in whether you want a desktop app or a terminal, and which model file format they read.

| Tool | What it is | Model format | Local API | Best for |
|---|---|---|---|---|
| [mlx-lm](https://github.com/ml-explore/mlx-lm) | Python package on Apple's MLX | MLX (thousands on the [MLX Community](https://huggingface.co/mlx-community) page) | Yes, `mlx_lm.server`, similar to the OpenAI chat API | Developers who want Python control, fine-tuning or their own quantized builds |
| [LM Studio](https://lmstudio.ai/docs/app/system-requirements) | Desktop app | Both MLX and llama.cpp (GGUF) models ([since 0.3.4](https://lmstudio.ai/blog/lmstudio-v0.3.4)) | Yes, OpenAI-compatible endpoints ([docs](https://lmstudio.ai/docs/developer/core/server)) | People who want a chat window and a model browser |
| [Ollama](https://github.com/ollama/ollama) | Command-line app with a background service | Its own [library](https://ollama.com/library) | Yes, REST API on `localhost:11434` | A quick `ollama run` and simple app integrations |
| [llama.cpp](https://github.com/ggml-org/llama.cpp) | C/C++ engine and CLI | GGUF | Yes, `llama serve`, OpenAI-compatible | Lowest-level control, many platforms |

A few details from each project's own pages:

- **mlx-lm** is "a Python package for generating text and fine-tuning large language models on Apple silicon with MLX". It can also quantize a model and upload it to Hugging Face. See [What is MLX?](/guides/what-is-mlx/) for how MLX works.
- **LM Studio** asks for an Apple Silicon Mac (M1/M2/M3/M4) and macOS 14.0 or newer, and recommends 16 GB+ of RAM. It says 8 GB Macs may still work "but stick to smaller models and modest context sizes" ([system requirements](https://lmstudio.ai/docs/app/system-requirements)).
- **Ollama** installs on macOS with one command or a `.dmg`, then `ollama run <model>` starts a chat ([README](https://github.com/ollama/ollama)).
- **llama.cpp** calls Apple silicon "a first-class citizen", optimized with ARM NEON, Accelerate and Metal, and supports 1.5-bit to 8-bit integer quantization ([README](https://github.com/ggml-org/llama.cpp)).

## How do I pick a model size for my Mac's memory?

Pick a 4-bit build whose file is clearly smaller than your Mac's memory, leaving room for the model's working memory (the KV cache, which grows with prompt length) and for macOS and your other apps. A rough estimate of the weights is parameters × bits ÷ 8 bytes.

Real numbers from the [Smarty Pants Mac benchmarks](https://huggingface.co/datasets/smartypantsnet/mac-benchmarks), measured on an Apple M5 Pro Mac mini during a 4,096-token prompt:

| Model (standard 4-bit MLX) | Peak memory | Measured |
|---|---|---|
| Qwen3.5-4B | 4.13 GB | 22 Oct 2026 |
| Qwen 3.8 27B | 18.26 GB | 2 Nov 2026 |

So a 4B model is comfortable on a 16 GB Mac, and a 27B model wants a 32 GB Mac. The full method, with more models and the macOS GPU memory limit, is in [How much RAM do you need to run an LLM?](/guides/how-much-ram-to-run-an-llm/). Chip by chip memory options are on the [Macs](/macs/) pages.

## How do I run an LLM on a Mac with mlx-lm, step by step?

Install mlx-lm with pip, then run one command that downloads a model and answers a prompt. These steps follow the [mlx-lm README](https://github.com/ml-explore/mlx-lm) and its [server docs](https://github.com/ml-explore/mlx-lm/blob/main/mlx_lm/SERVER.md).

### 1. Check your memory

Open Apple menu > About This Mac and read the memory line. The example model below is a 4.08 GB download ([Hugging Face](https://huggingface.co/mlx-community/Mistral-7B-Instruct-v0.3-4bit)), so 16 GB is a safe floor.

### 2. Install mlx-lm in its own environment

```sh
python3 -m venv ~/mlx-env
source ~/mlx-env/bin/activate
pip install mlx-lm
```

The README also lists `conda install -c conda-forge mlx-lm`.

### 3. Generate text

```sh
mlx_lm.generate --model mlx-community/Mistral-7B-Instruct-v0.3-4bit \
  --prompt "Explain unified memory in two sentences."
```

The first run downloads the model from Hugging Face. Without `--model`, mlx-lm uses its default, `mlx-community/Llama-3.2-3B-Instruct-4bit`.

### 4. Chat

```sh
mlx_lm.chat --model mlx-community/Mistral-7B-Instruct-v0.3-4bit
```

This opens a chat in the terminal that keeps context until you quit.

### 5. Serve it to your own apps

```sh
mlx_lm.server --model mlx-community/Mistral-7B-Instruct-v0.3-4bit
```

This starts a server on `localhost` port 8080 with a `/v1/chat/completions` endpoint. The mlx-lm team says the server "is not recommended for production as it only implements basic security checks", so keep it on your own machine.

If mlx-lm prints a warning that the model "requires" more memory, the model is large for your Mac and will likely be slow. On macOS 15 or later the README suggests raising the GPU wired memory limit with `sudo sysctl iogpu.wired_limit_mb=N`, where N is larger than the model in megabytes but smaller than your Mac's memory.

A note on newer models: several recent Qwen builds on Hugging Face, such as [Qwen3.5-4B-MLX-4bit](https://huggingface.co/mlx-community/Qwen3.5-4B-MLX-4bit), are vision-language builds made with [mlx-vlm](https://github.com/Blaizzy/mlx-vlm). Check the model card for which package to use.

## When should I call a hosted API instead?

Use a hosted API when the model doesn't fit your Mac, when you need answers while your Mac is asleep or busy, or when many users send requests at once. A local model is the better choice when your data must not leave your machine and the model fits.

Options include the large centralized providers and [Smarty Pants](/inference/), which serves exact, pinned open models from other people's idle Apple Silicon Macs through an OpenAI-compatible API at `https://smartypants.network/v1`. You keep the OpenAI SDK and change the base URL and key. Each model runs as a named build (for example 4-bit MLX), listed with its price in [`/v1/models`](https://smartypants.network/v1/models).

Trade-offs to know before you pick Smarty Pants:

- Requests run on Macs other people own. The live site asks you not to send sensitive data on the general network.
- Availability changes hour to hour; each live model page shows how many Macs have that model online. A large centralized provider will usually have more capacity.
- Smarty Pants is opening in stages. You can see the models, prices and code today; sign in with your email on [smartypants.network/api](https://smartypants.network/api) to get a key.

Compare models and their memory needs on the [AI models](/ai-models/) page.
