---
layout: ../../layouts/ContentLayout.astro
title: "AI agent sandboxes explained: code sandbox APIs"
description: "What an AI agent sandbox is, how code sandbox APIs handle commands, files, snapshots and network access, and how Smarty Pants CPU jobs and workspaces work."
h1: "What is an AI agent sandbox, and how do code sandbox APIs work?"
eyebrow: "Guide"
audience: "buyer"
primaryKeyword: "ai agent sandbox"
keywords: ["ai agent sandbox", "code sandbox api", "sandbox for llm generated code", "remote code execution api", "agent workspace vm"]
summary: "An AI agent sandbox is an isolated VM or container where an agent can run code, read and write files, and see the output, without touching the machine it runs on. Sandbox APIs offer one-shot runs or long-lived sessions, stream output as it arrives, and often control network access. Isolation protects the host from the guest's code. It does not hide the guest's data from whoever runs the host."
published: "2026-11-09"
updated: "2026-11-09"
readingMinutes: 7
faqs:
  - q: "What is an AI agent sandbox?"
    a: "It is an isolated VM or container where an AI agent can run code it wrote, work with files and read the results. If the code misbehaves, the damage stays inside the sandbox."
  - q: "What is the difference between a one-shot run and a session?"
    a: "A one-shot run starts a fresh environment, runs one program, returns the output and is wiped. A session keeps one environment open so an agent can run many commands and keep files between them."
  - q: "Does a sandbox keep my code and data private from the host?"
    a: "No. VM isolation protects the host from the guest's code. Whoever runs the host machine is not kept out of the guest's files or memory, so don't put secrets in a sandbox on hardware you don't trust."
  - q: "Can I use Smarty Pants CPU jobs today?"
    a: "Not yet for most people. Smarty Pants runs CPU jobs and workspaces on its own account first, and other accounts get a 403 error until they open."
  - q: "Do Smarty Pants sandboxes have internet access?"
    a: "CPU jobs run with no network. Guest internet through a filter that allows listed public sites only is Planned, not available."
  - q: "Should an agent retry a failed sandbox command automatically?"
    a: "Only when rerunning is safe. A command can have changed files before it failed, so check state first, or use an idempotency key where the API offers one."
related: ["/cpu/", "/workspaces/", "/workspaces/sessions/", "/workspaces/snapshots-and-recovery/", "/workspaces/model-calls/", "/workspaces/fleets/", "/workspaces/always-on-agents/"]
sources:
  - label: "Firecracker: Design document (threat model)"
    url: "https://github.com/firecracker-microvm/firecracker/blob/4a3e9bd76d9fc57a3538c1aeb7e5687de43a0efa/docs/design.md"
  - label: "E2B Docs: Sandbox"
    url: "https://docs.e2b.dev/sandbox.md"
  - label: "E2B Docs: Streaming command output"
    url: "https://docs.e2b.dev/commands/streaming.md"
  - label: "E2B Docs: Snapshots"
    url: "https://docs.e2b.dev/sandbox/snapshots.md"
  - label: "E2B Docs: Internet access"
    url: "https://docs.e2b.dev/network/internet-access.md"
  - label: "Modal Docs: Sandboxes"
    url: "https://modal.com/docs/guide/sandboxes.md"
  - label: "Smarty Pants: Agent kit and docs"
    url: "https://smartypants.network/docs/agents"
  - label: "Smarty Pants: Python starter kit"
    url: "https://smartypants.network/kits/smartypants.py"
---

AI agents that write code need somewhere to run it. Running it on your laptop or server is risky: generated code can delete files, leak keys or loop forever. A sandbox gives the agent its own disposable machine. This guide covers what sandboxes are, the patterns most sandbox APIs share, and how Smarty Pants CPU jobs and workspaces work today.

## What is an AI agent sandbox?

**It is an isolated VM or container where an agent can run commands, work with files and read the output.** Whatever the code does stays inside the sandbox, and the sandbox can be thrown away after.

The isolation layer varies. [Modal](https://modal.com/docs/guide/sandboxes.md) runs sandboxes on gVisor, a container runtime, or on a VM runtime with its own Linux kernel. [E2B](https://docs.e2b.dev/sandbox.md) describes its sandbox as an "isolated Linux VM for your agent." Firecracker, a microVM monitor used for multi-tenant services, treats the guest as hostile from the start: its [design document](https://github.com/firecracker-microvm/firecracker/blob/4a3e9bd76d9fc57a3538c1aeb7e5687de43a0efa/docs/design.md) says "all vCPU threads are considered to be running malicious code as soon as they have been started."

## What do sandbox APIs usually offer?

**Most offer the same building blocks: run a command, move files, stream output, control the network and, on some, save state.**

| Feature | What it does | Example |
|---|---|---|
| Run commands | Start a program in the sandbox and get its exit code and output | Modal `sb.exec(...)` with an optional timeout |
| Files | Write files in, read results out | Smarty Pants workspace `/files` requests |
| Streamed output | Send stdout and stderr while the program runs | E2B `onStdout` / `onStderr` callbacks |
| Snapshots | Save the sandbox's state and start new ones from it | E2B snapshots capture filesystem and memory; Modal filesystem snapshots |
| Egress control | Turn network off or allow only some destinations | E2B can disable internet or use allow and deny lists |
| Lifetime limits | End the sandbox after a time or idle period | Modal: 5-minute default, up to 24 hours |

Defaults differ. E2B's [internet access page](https://docs.e2b.dev/network/internet-access.md) says "Every sandbox has outbound access to the internet by default," and lets you turn it off. Check each provider's default before running untrusted code.

## One-shot run or long-lived session?

**Use a one-shot run for a single calculation; use a session when the agent needs to build on earlier steps.**

- **One-shot run.** Send code, get output, and the environment is wiped. Nothing carries over, which keeps runs simple and independent.
- **Long-lived session.** One environment stays open for many commands. The agent can write a file, run a script against it and read the result. Sessions end on a time limit or an idle limit, so the agent has to plan for that.

## How does streamed output work?

**The sandbox sends output as the program prints it, so an agent can watch progress instead of waiting.** Some APIs push output through callbacks, as [E2B does](https://docs.e2b.dev/commands/streaming.md). Others let you poll by byte offset: you ask for output from a position, receive new text and a next offset, and repeat until the API says the command is done. Polling by offset never repeats text you already have, and you can resume after a dropped connection.

## Why not retry sandbox commands automatically?

**Because a failed command may already have changed something.** A script can write half a file, or a job can finish while the response is lost. Rerunning it blindly can double the effect. Before retrying, check the sandbox state, or send an idempotency key so the service can recognize a repeat. The Smarty Pants Python starter kit sends an `idempotencyKey` with each CPU job.

## How do Smarty Pants CPU jobs and workspaces work today?

**Both run in a sealed Linux VM on an Apple Silicon Mac, and both are open to Smarty Pants' own account first.** Other accounts get a 403 error until they open. Details from the [agent docs](https://smartypants.network/docs/agents):

### CPU jobs (one-shot)

- A short Python, JavaScript or shell program runs in a sealed Linux (ARM64) VM: no network, no disk, wiped after.
- Up to 30 seconds per job and up to 4 KB of output.
- Output streams while it runs: `GET /v1/cpu/jobs/{id}/output?stdoutOffset=0&stderrOffset=0` returns what it has printed so far. Pass back each stream's `nextOffset` until `done` is true.
- Listed price: $0.00405 per vCPU-hour plus $0.002025 per GB-hour, about $0.00007 for a 20-second job at the default size of 2 vCPU and 2 GB of memory.

More on the [CPU jobs page](/cpu/).

### Workspaces (sessions)

- One sealed VM stays open for many commands and files. Files live until the workspace ends; nothing is kept after.
- Limits: 30 minutes per workspace, 10 minutes idle, 10 minutes per command, files up to 8 KB, 4 KB of output per stream.
- The Mac's owner comes first. If they come back, the workspace ends within 5 seconds.
- API: `POST /v1/cpu/sessions`, then `/exec` and `/files`; end it with `DELETE /v1/cpu/sessions/{id}`.
- Not charged while it is tested on Smarty Pants' own account.

More on [Agent workspaces](/workspaces/) and [Workspace sessions](/workspaces/sessions/).

## What is Planned for Smarty Pants workspaces?

**These features are on the roadmap and not usable by the public. Each is Planned.**

- **Planned:** [Snapshots and recovery](/workspaces/snapshots-and-recovery/): disk-only snapshots, and restoring on another Mac after a host is lost.
- **Planned:** [Model calls from workspaces](/workspaces/model-calls/): a workspace-scoped inference key with a budget, and a credential proxy with placeholder keys.
- **Planned:** [Browser work and fleets](/workspaces/fleets/): several sessions at once.
- **Planned:** [Always-on agents](/workspaces/always-on-agents/): persistent agents.
- **Planned:** Guest internet through a filter that allows listed public sites only and blocks home-network addresses.
- **Planned:** A CLI and SDK for paid developer use.

## Who does sandbox isolation protect?

**It protects the host from the guest, not the guest from the host.** That is true for any sandbox. On Smarty Pants, VM isolation protects the Mac's owner from guest code. It does not keep the guest's files or memory confidential from the Mac's owner, who controls the hardware.

So treat a Smarty Pants workspace like any machine you don't control: don't put API keys, customer data or other secrets in it. If your agent handles sensitive data, run its sandbox on hardware you or a provider you trust controls.
