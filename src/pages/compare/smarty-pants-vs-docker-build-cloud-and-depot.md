---
layout: ../../layouts/ContentLayout.astro
title: "Smarty Pants vs. Docker Build Cloud and Depot for arm64 builds"
description: "Depot and Docker Build Cloud sell remote container build minutes. Smarty Pants plans arm64 Docker builds on Macs your Group owns, free. Not available yet."
h1: "Smarty Pants vs. Docker Build Cloud and Depot"
eyebrow: "Compare"
audience: "buyer"
status: "planned"
primaryKeyword: "depot alternative"
keywords: ["depot alternative", "docker build cloud alternative", "arm64 docker build", "free docker builds on mac", "apple silicon docker build"]
summary: "Depot lists a $20 a month plan with 500 container build minutes and $0.04 a minute after that, and Docker Build Cloud includes 50 to 800 build minutes a month depending on the Docker plan (checked 21 Nov 2026). Smarty Pants arm64 Docker builds on Macs you or your Group own are planned and not available today. Use Depot or Docker Build Cloud now; this page will change when ours ships."
published: "2026-11-21"
updated: "2026-11-21"
readingMinutes: 2
faqs:
  - q: "Can I build Docker images on Smarty Pants today?"
    a: "No. arm64 Docker builds are planned. Today a workspace can run commands in a Linux VM, but there is no build service."
  - q: "Will it build x86 images?"
    a: "The plan is arm64 builds, since the Macs are Apple Silicon. For x86 images, use a hosted builder."
related: ["/compare/", "/compare/one-account-for-ai-agents/", "/workspaces/", "/groups/"]
sources:
  - label: "Depot: pricing (checked 21 Nov 2026)"
    url: "https://depot.dev/pricing"
  - label: "Docker Docs: Build Cloud minutes by plan (checked 21 Nov 2026)"
    url: "https://docs.docker.com/subscription/build-details/"
---

Apple Silicon Macs are arm64 machines, which is exactly what you want for arm64 images. Most of them spend the night building nothing at all.

## How do they compare?

| | Smarty Pants (planned) | Depot | Docker Build Cloud |
|---|---|---|---|
| Where builds run | Macs you or your Group own | Depot's builders | Docker's builders |
| Price | Free on your own Macs | $20 a month with 500 container build minutes, then $0.04 a minute | 50 to 800 minutes a month included with Docker plans |
| Status on 21 Nov 2026 | Planned, not built | Available | Available |

Sources: [Depot pricing](https://depot.dev/pricing) and [Docker Build Cloud minutes](https://docs.docker.com/subscription/build-details/), checked 21 Nov 2026.

## What should I use now?

Depot or Docker Build Cloud. When Smarty Pants builds ship, they'll sit in the [same account](/compare/one-account-for-ai-agents/) as your models, workspaces and CI, and cost nothing on your [Group's](/groups/) Macs.
