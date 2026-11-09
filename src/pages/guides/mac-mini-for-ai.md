---
layout: ../../layouts/ContentLayout.astro
title: "Mac mini for AI: which configuration runs which LLM"
description: "Mac mini for AI and local LLMs: which memory configurations fit which model sizes, how it compares with Mac Studio and MacBook, and how an idle mini can earn."
h1: "Mac mini for AI: which configuration fits which model?"
eyebrow: "Guide"
audience: "both"
primaryKeyword: "mac mini for ai"
keywords: ["mac mini for ai", "mac mini llm", "mac mini m4 pro llm", "mac mini m5 pro ai", "mac mini vs mac studio for ai", "best mac for local llm"]
summary: "For local AI, the Mac mini's memory decides what it can run. Apple's current Mac mini comes with the M6 chip (16 GB, up to 32 GB) or M5 Pro (24 GB, up to 64 GB). 16 GB fits small 4B to 9B models, 24 GB adds 20B models, 32 GB fits 27B to 35B models at 4-bit, and 48 GB or more fits image models like FLUX.1 schnell. For more than 64 GB you need a Mac Studio."
published: "2026-11-09"
updated: "2026-11-09"
readingMinutes: 7
faqs:
  - q: "Is a Mac mini good for running LLMs?"
    a: "For models that fit its memory, yes. A Smarty Pants test measured Qwen 3.8 27B at 35.7 tokens per second on an M5 Pro Mac mini (2 Nov 2026), but the mini tops out at 64 GB, which rules out the largest open models."
  - q: "How much memory should I get in a Mac mini for AI?"
    a: "Buy for the largest model you plan to run. 16 GB covers 4B to 9B models, 32 GB covers most 27B to 35B models at 4-bit, and 48 to 64 GB gives room for image models and long contexts."
  - q: "Which Mac mini has the most memory for AI?"
    a: "The M5 Pro Mac mini, configurable to 64 GB. Apple lists memory as a configure-to-order option, so choose the amount when you buy."
  - q: "Mac mini or Mac Studio for AI?"
    a: "The Mac Studio offers far more memory (up to 512 GB with M5 Ultra) and more memory bandwidth. The Mac mini is smaller and draws much less power. If your models fit in 64 GB, the mini is the simpler choice."
  - q: "Can a Mac mini earn money when I'm not using it?"
    a: "Possibly, with Smarty Pants. Intro offer: up to $1 a day per idle Mac, until 50 computers join. It is US only and for supported Apple Silicon Macs with 16 GB or more; Macs are being invited in small batches."
related: ["/guides/how-much-ram-to-run-an-llm/", "/guides/how-to-run-an-llm-on-a-mac/", "/guides/make-money-with-an-idle-mac/", "/earn/", "/macs/", "/ai-models/"]
sources:
  - label: "Apple: Mac mini, Tech Specs (current models)"
    url: "https://www.apple.com/mac-mini/specs/"
  - label: "Apple Support: Mac mini (2024), Tech Specs"
    url: "https://support.apple.com/en-us/121555"
  - label: "Apple: Mac Studio, Tech Specs"
    url: "https://www.apple.com/mac-studio/specs/"
  - label: "Apple Support: Mac mini power consumption and thermal output (BTU) information"
    url: "https://support.apple.com/en-us/103253"
  - label: "Smarty Pants: Mac benchmarks dataset on Hugging Face"
    url: "https://huggingface.co/datasets/smartypantsnet/mac-benchmarks"
  - label: "Smarty Pants: Compatibility check"
    url: "https://smartypants.network/compatibility"
  - label: "Smarty Pants: For humans (owner FAQ)"
    url: "https://smartypants.network/humans"
---

The Mac mini is the smallest Mac that can run serious open models. Its chip shares one pool of unified memory between CPU and GPU, so the memory you order is the ceiling on model size. This guide maps each Mac mini configuration to the models it fits, compares it with the Mac Studio and MacBooks, and covers the option to let an idle Mac mini earn.

## Which Mac mini configurations are there?

Apple's current Mac mini comes with the M6 or M5 Pro chip; the 2024 model had the M4 or M4 Pro. Memory is chosen when you buy.

| Mac mini | Memory options | Memory bandwidth | Power, idle / max |
|---|---|---|---|
| M6 (current) | 16 GB, configurable to 24 or 32 GB | 153 GB/s (16 GB), 170 GB/s (24 or 32 GB) | 4 W / 70 W |
| [M5 Pro](/macs/m5-pro/) (current) | 24 GB, configurable to 48 or 64 GB | 307 GB/s | 6 W / 145 W |
| [M4](/macs/m4/) (2024) | 16 GB, configurable to 24 or 32 GB | 120 GB/s | 4 W / 65 W |
| [M4 Pro](/macs/m4-pro/) (2024) | 24 GB, configurable to 48 or 64 GB | 273 GB/s | 5 W / 140 W |

Specs from Apple's [current Mac mini tech specs](https://www.apple.com/mac-mini/specs/) and [Mac mini (2024) tech specs](https://support.apple.com/en-us/121555). Power figures are Apple's measurements from the wall for the configurations it tested (16 GB M6 and M4; 64 GB M5 Pro and M4 Pro) on its [power consumption page](https://support.apple.com/en-us/103253).

Memory bandwidth matters because generating each token reads through the model's weights. The [Smarty Pants benchmarks](https://huggingface.co/datasets/smartypantsnet/mac-benchmarks) found that "speed tracks how many bits each weight uses", which is what you'd expect when memory reads are the limit.

## Which models fit each Mac mini memory size?

Match the memory to the largest model you want, leaving room for context and macOS. The minimums below are the ones Smarty Pants lists for its catalog models, all served as 4-bit or similar builds.

| Mac mini memory | Models that fit (Smarty Pants minimum) | Available on |
|---|---|---|
| 16 GB | [qwen3.5-4b](/ai-models/qwen3-5-4b/), [qwen3.5-9b](/ai-models/qwen3-5-9b/), [qwen3-embedding-0.6b](/ai-models/qwen3-embedding-0-6b/), [whisper-large-v3-turbo](/ai-models/whisper-large-v3-turbo/) | M6, M4 |
| 24 GB | All of the above, plus [gpt-oss-20b](/ai-models/gpt-oss-20b/) | M6, M5 Pro, M4, M4 Pro |
| 32 GB | All of the above, plus [qwen3.8-27b](/ai-models/qwen3-8-27b/), [nanbeige4.3-33b](/ai-models/nanbeige4-3-33b/), [qwen3.6-35b-a3b](/ai-models/qwen3-6-35b-a3b/) | M6, M4 |
| 48 or 64 GB | All of the above, plus [flux.1-schnell](/ai-models/flux-1-schnell/) image making | M5 Pro, M4 Pro |

Note that the M5 Pro and M4 Pro jump from 24 GB straight to 48 GB, so a "Pro" mini with 32 GB is not an option. If you want 27B to 35B chat models on a Pro chip, order 48 GB.

What it looks like in practice, from the [Smarty Pants Mac benchmarks](https://huggingface.co/datasets/smartypantsnet/mac-benchmarks) (standard 4-bit MLX builds, one request at a time):

| Model | Mac | Speed | Peak memory | Measured |
|---|---|---|---|---|
| Qwen3.5-4B | M5 Pro Mac mini | 99.7 tok/s | 4.13 GB | 22 Oct 2026 |
| Qwen 3.8 27B | M5 Pro Mac mini | 35.7 tok/s | 18.26 GB | 2 Nov 2026 |
| Qwen3.6-35B-A3B | M3 Max 36 GB MacBook Pro | 61.4 tok/s | 21.52 GB | 8 Sep 2026 |

These are single tests on one Mac each; your numbers will vary with prompt length and settings. For the memory math, see [How much RAM do you need to run an LLM?](/guides/how-much-ram-to-run-an-llm/).

## Mac mini, Mac Studio or MacBook for AI?

Pick the Mac mini if your models fit in 64 GB, the Mac Studio if you need more memory or bandwidth, and a MacBook if you need to carry it. Here is how they compare.

| | Mac mini | Mac Studio | MacBook |
|---|---|---|---|
| Max memory | 64 GB (M5 Pro) | 128 GB ([M5 Max](/macs/m5-max/)), 512 GB (M5 Ultra) | Depends on chip |
| Top memory bandwidth | 307 GB/s (M5 Pro) | 614 GB/s (M5 Max), 1.2 TB/s (M5 Ultra) | Depends on chip |
| Max continuous power | 155 W | 480 W | Varies by model |
| Good for | Models up to about 35B at 4-bit, quiet always-on box | Very large models, many users | Running models on the go |

Studio figures are from Apple's [Mac Studio tech specs](https://www.apple.com/mac-studio/specs/): M5 Max starts at 36 GB (configurable to 48, 64 or 128 GB) and M5 Ultra at 96 GB (configurable to 256 or 512 GB).

Trade-offs worth naming:

- **Mac mini.** Low idle power (4 to 6 W in Apple's tests) suits a machine left on. The ceiling is 64 GB.
- **Mac Studio.** The only Mac here that can hold the very largest open models in memory. Its rated maximum continuous power is 480 W, against 155 W for the mini.
- **MacBook.** Portable, with memory that depends on the chip you choose. If you want it to serve Smarty Pants work, it must be plugged in, and it pauses itself on battery.

Chip-by-chip details are on the [Macs](/macs/) pages.

## Can a Mac mini earn money when it's idle?

It can, with [Smarty Pants](/earn/), which sends AI requests to Apple Silicon Macs while their owners aren't using them. A Mac mini that is already on most of the day is a natural fit.

What Smarty Pants says today (8 Nov 2026):

- **Intro offer: up to $1 a day per idle Mac, until 50 computers join.** It applies to the first 50 supported Apple Silicon Macs with 16 GB+, US only, and pays for hours the Mac is on, plugged in, online and ready, even with no job running. After the first 50, pay depends on the Mac's memory, speed and how often it's on, and the app tells you before your pay changes. Details: [How earnings work](/earn/earnings/).
- **Requirements:** Apple Silicon, 16 GB memory or more, macOS 14 or later. The app also checks for 15 GB+ free disk, power, temperature, system pressure, network and a model benchmark ([compatibility](https://smartypants.network/compatibility)).
- **Controls:** Pause any time; the Mac also pauses itself for unsafe heat, memory or battery conditions. Smarty Pants "cannot browse your files, watch your screen, or control your Mac" ([for humans](https://smartypants.network/humans)).
- **Access:** the Mac app is invite only for now. We're inviting Macs in small batches.

Electricity and internet are your costs, and displayed earnings are gross. For the cost math with Apple's power figures, see [How to make money with an idle Mac](/guides/make-money-with-an-idle-mac/).
