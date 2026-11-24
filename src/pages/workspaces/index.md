---
layout: ../../layouts/ContentLayout.astro
title: "Agent sandbox: Smarty Pants agent workspaces"
description: "Agent workspaces on Apple Silicon Macs: a sealed Linux VM per job for code, files, tests and coding agents. Free on your own Macs, $0.0666 an hour elsewhere."
h1: "Agent workspaces: a sealed Linux VM for each agent job"
eyebrow: "Agent workspaces"
audience: "buyer"
status: "invite"
primaryKeyword: "agent sandbox"
keywords: ["agent sandbox", "cloud sandbox for ai agents", "ai agent workspace", "sandbox for ai agents", "code execution sandbox"]
summary: "A Smarty Pants workspace is a sealed ARM64 Linux VM on an Apple Silicon Mac where an agent can clone a repo, run commands and tests, keep files, call models and hand back results. It costs $0.0666 an hour for 2 vCPU and 2 GB, billed per second, and nothing on Macs you or your Group own. Paid use on other people's Macs is on Smarty Pants' own account first. The Mac's owner always comes first."
published: "2026-11-09"
updated: "2026-11-19"
readingMinutes: 5
faqs:
  - q: "Can I use Smarty Pants agent workspaces today?"
    a: "Yes on your own Macs or your Group's Macs, free. Paid workspaces on Macs other people own run on Smarty Pants' own account first; other accounts get a 403 until that opens."
  - q: "What does a workspace cost?"
    a: "$0.0666 an hour for 2 vCPU and 2 GB ($0.0252 per vCPU-hour plus $0.0081 per GB-hour), billed per second from when it is ready until it ends. Model calls from inside are charged per token on the same bill."
  - q: "Does a workspace have internet access?"
    a: "Not by default. A workspace can be opened with a short list of reviewed public sites (for example package registries and GitHub) that it may reach; home-network and private addresses are always blocked."
  - q: "Are my files in a workspace confidential?"
    a: "Not from the Mac's owner. VM isolation protects the owner from your code, but it does not hide the guest's files or memory from them. For private work, use your own or your Group's Macs."
  - q: "What happens if the Mac's owner comes back?"
    a: "The workspace ends within 5 seconds and says OWNER_RETURNED. With autoSave and failover on, the site starts a copy on another Mac from the last save, and you are not charged for the lost one."
related: ["/workspaces/sessions/", "/workspaces/snapshots-and-recovery/", "/workspaces/model-calls/", "/workspaces/fleets/", "/workspaces/mac-builds/", "/cpu/", "/pricing/", "/compare/smarty-pants-vs-e2b/"]
sources:
  - label: "Smarty Pants: Agent kit (Workspaces, Run code on a Mac)"
    url: "https://smartypants.network/docs/agents"
  - label: "Smarty Pants: GET /v1/prices/workspaces"
    url: "https://smartypants.network/v1/prices/workspaces"
---

An agent sandbox is a place where an AI agent can run code, keep files and try things without touching your own machine. A Smarty Pants workspace puts that sandbox in a sealed Linux VM on an Apple Silicon Mac. One workspace can take a whole job: clone a repo, install, let a coding agent change it, run the tests and hand back the files.

## What can a workspace do?

Run several commands in one VM, keep files between them, and give results back. Here is what is built today.

| Piece | What it does | How |
|---|---|---|
| [Sessions](/workspaces/sessions/) | One VM for many commands and files, up to 2 hours | `POST /v1/cpu/sessions`, `sp.workspace()` |
| Run code in one call | Send code and files, get output, charts and files back | `POST /v1/code/run`, `smartypants run` |
| Whole jobs | Clone, set up, optional coding agent, test, collect files | `sp.job(...)`, `smartypants job` |
| [Save, copy and failover](/workspaces/snapshots-and-recovery/) | Save a workspace, open copies of it, carry on elsewhere if a Mac goes away | `POST /v1/cpu/sessions/{id}/save`, `autoSave` + `failover` |
| [Model calls](/workspaces/model-calls/) | Each workspace gets its own key with a budget | Already set in the environment |
| [Fleets](/workspaces/fleets/) | Many identical workspaces at once | `POST /v1/cpu/fleets` |
| Public links | Share a server running in the workspace until it ends | `POST /v1/cpu/sessions/{id}/links` |
| Saved setups from a Dockerfile | Run its RUN, ENV, WORKDIR and COPY steps once and save the result | `smartypants setup NAME --dockerfile` |
| Task board | Agents claim tasks with a lease; offline writes are kept and sent later | `/v1/board/...` |
| [Mac app builds](/workspaces/mac-builds/) | Xcode builds on your own Macs | Coming, switched off today |
| [Always-on agents](/workspaces/always-on-agents/) | An agent that keeps working for days | Planned |

## Who can use it, and what does it cost?

Free on Macs you own, and free for Group members on the Group's Macs. On Macs other people own, it is $0.0666 an hour for 2 vCPU and 2 GB, billed per second; that paid use is on Smarty Pants' own account first.

Add `where: "mine"` or `where: {group: "<Group id>"}` to keep a workspace on your own or your Group's Macs. Opening a paid workspace holds its full length against your balance, and the unused part is let go when it ends. A workspace that never became ready, or that our side lost, costs nothing. See the [price page](/pricing/#workspaces) for how this compares with E2B, Daytona, Modal and others.

## How fast does a workspace start?

Usually about a second, when a Mac has a fresh workspace booted and waiting. Each Mac keeps one ready; when none is, start-up takes longer. `GET /v1/cpu/sessions/{id}` shows `startSeconds` and whether it was warm.

## What does the trust model mean for my data?

The VM protects the Mac's owner from your code. It does not hide your files or memory from the Mac's owner. So keep secrets, personal, customer or regulated data out of workspaces on other people's Macs, or run that work on your own or your Group's Macs.

## When is a Smarty Pants workspace the wrong choice?

When you need GPUs, x86 machines, more than 2 hours in one VM, a SOC 2 report, or guaranteed capacity at a set time. Capacity depends on Macs that are idle and online, and the owner can take their Mac back at any moment. A hosted sandbox on dedicated servers is the better fit for those needs.

## Where are the docs?

The [agent kit](https://smartypants.network/docs/agents) has copy-ready Python, JavaScript and command-line examples for every piece above. For background, read [AI agent sandboxes explained](/guides/ai-agent-sandboxes-explained/).
