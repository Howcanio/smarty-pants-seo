---
layout: ../../layouts/ContentLayout.astro
title: "Remote code execution API: short jobs on Macs"
description: "A remote code execution API for short Python, JavaScript and shell jobs in a sealed ARM64 Linux VM on a Mac, with listed per-second pricing."
h1: "Remote code execution API: run short code jobs in a sealed VM on a Mac"
eyebrow: "CPU jobs"
audience: "buyer"
status: "invite"
primaryKeyword: "remote code execution api"
keywords: ["remote code execution api", "code sandbox api", "run code in a sandbox", "run code in a vm", "mcp run code tool", "python sandbox api"]
summary: "Smarty Pants CPU jobs run a short Python, JavaScript or shell program in a sealed ARM64 Linux VM on a Mac: no network, no disk, wiped after. Each job runs up to 30 seconds and returns up to 4 KB of output, which you can stream while it runs. Listed price: $0.00405 per vCPU-hour plus $0.002025 per GB-hour, about $0.00007 for a 20-second job. Today it runs on Smarty Pants' own account first."
published: "2026-11-09"
updated: "2026-11-09"
readingMinutes: 5
faqs:
  - q: "Can I use Smarty Pants CPU jobs today?"
    a: "Not yet from your own account. Smarty Pants is running CPU jobs on its own account first, and other accounts get a 403 error until it opens. The live agent docs say when it does."
  - q: "What languages can a CPU job run?"
    a: "Python 3, Node.js and a basic shell are inside the VM. You send the program as text and pick the language, for example \"python\" or \"node\" in the starter kits."
  - q: "Can a CPU job reach the internet or install packages?"
    a: "No. The VM has no network and no disk, so it cannot download packages or call outside services. Use it for self-contained code."
  - q: "How much does a CPU job cost?"
    a: "The listed price on 8 Nov 2026 is $0.00405 per vCPU-hour plus $0.002025 per GB-hour, which comes to about $0.00007 for a 20-second job. Each result reports its charge in chargeMicros."
  - q: "How long can a job run and how much can it print?"
    a: "Up to 30 seconds per job and up to 4 KB of output. For longer work with files and several commands, see workspace sessions."
  - q: "Can the Mac's owner see my code?"
    a: "The VM protects the Mac's owner from your code, not your code from the Mac's owner. Do not send secrets, personal or confidential data in a job."
related: ["/workspaces/", "/workspaces/sessions/", "/guides/ai-agent-sandboxes-explained/", "/inference/"]
sources:
  - label: "Smarty Pants: Agent kit (Run code on a Mac, Workspaces)"
    url: "https://smartypants.network/docs/agents"
---

Smarty Pants CPU jobs are a small remote code execution API: your program or your AI agent sends a short piece of code, it runs in a sealed Linux VM on an Apple Silicon Mac, and you get back what it printed and its exit code. It is built for quick, self-contained checks, not long builds. Everything below comes from the live [agent docs](https://smartypants.network/docs/agents).

## Can I use it today?

Not from your own account yet. Smarty Pants runs CPU jobs on its own account first; other accounts get a 403 error until it opens, and the [agent docs](https://smartypants.network/docs/agents) will say when that changes.

Smarty Pants is opening in stages. You can see the models, prices and code today; sign in with your email on [smartypants.network/api](https://smartypants.network/api) to get a key.

## What runs inside a CPU job?

A short Python, JavaScript or shell program, in a sealed ARM64 Linux VM on a Mac. The VM has no network and no disk, and it is wiped after the job.

| Spec | Value |
|---|---|
| Where it runs | Sealed Linux VM (ARM64) on an Apple Silicon Mac |
| Languages | Python 3, Node.js, basic shell |
| Network | None |
| Disk | None; the VM is wiped after the job |
| Time limit | Up to 30 seconds per job |
| Output | Up to 4 KB |
| Streaming | Read output while it runs, by byte offsets |
| Listed price (8 Nov 2026) | $0.00405 per vCPU-hour + $0.002025 per GB-hour |
| Example cost | About $0.00007 for a 20-second job |
| Status | Smarty Pants' own account first |

## How do I run a job from Python or JavaScript?

Use the one-file starter kits from the agent docs: `sp.run_code()` in Python or `sp.runCode()` in JavaScript. Each returns the output, the exit code and the charge.

Python, with the standard-library kit:

```python
# curl -O https://smartypants.network/kits/smartypants.py
# export SMARTYPANTS_API_KEY=sp_live_...
from smartypants import SmartyPants
sp = SmartyPants()

result = sp.run_code("python", "import platform; print(platform.machine(), sum(range(10**6)))")
print(result["stdout"], result["exitCode"], result["chargeMicros"])
```

JavaScript, with the no-package kit (Node 18+, Deno, Bun):

```js
// curl -O https://smartypants.network/kits/smartypants.mjs
import { SmartyPants } from "./smartypants.mjs";
const sp = new SmartyPants();

const result = await sp.runCode("node", "console.log(process.arch, [...Array(1e6).keys()].reduce((a, b) => a + b))");
console.log(result.stdout, result.exitCode, result.chargeMicros);
```

Both examples are copied from the live docs, which say Smarty Pants tests the page's examples every day with the same kits on its own account.

## How does streamed output work?

You poll one route with two byte offsets and pass back what it returns. While the job runs, `GET /v1/cpu/jobs/{id}/output?stdoutOffset=0&stderrOffset=0` returns what the program has printed so far.

Each response gives a `nextOffset` for each stream. Send those back on the next call, and stop when `done` is true. If a call fails, ask again from the last offsets you received.

## Can an AI agent call it through MCP?

Yes, once your account has it. The signed-in MCP server at `https://smartypants.network/mcp/account` has a `run_code` tool that runs a short Python, JavaScript or shell program in a sealed Linux VM on a Mac. It only shows in the tool list once your account has CPU jobs.

The same server also has `run_prompt`, `get_balance` and `add_credit`. Add it as a custom server in an AI app's connector or MCP settings; the app opens a Smarty Pants sign-in page.

## When is a CPU job a good fit?

When the code is short, self-contained and safe to run on someone else's Mac. Good examples:

- An agent checks its own arithmetic, parsing or a regular expression by running it instead of guessing.
- Testing a small generated function against a few inputs.
- Turning a small piece of text or JSON into another shape.
- Running untrusted snippets away from your own machine, with no network to call out on.

## When is it not a good fit?

When the work needs the network, more than 30 seconds, more than 4 KB of output, or confidential data. Specifically:

- **Packages and downloads.** With no network, a job cannot `pip install`, `npm install` or call an API.
- **Long or stateful work.** Use [workspace sessions](/workspaces/sessions/) for many commands and files in one VM.
- **Secrets and sensitive data.** The VM protects the Mac's owner from guest code. It does not keep the guest's files or memory confidential from the Mac's owner. Keep secrets, personal and customer data out.
- **x86-only code or GPUs.** The VM is ARM64 Linux.
- **Guaranteed capacity or latency.** Jobs run on Macs that owners make available when idle, and the owner comes first. If you need guaranteed capacity, longer runs or internet access today, a hosted sandbox service on dedicated servers is the better choice.

## How is a job priced?

By resources used over time: the listed price on 8 Nov 2026 is $0.00405 per vCPU-hour plus $0.002025 per GB-hour of memory. The live docs give about $0.00007 for a 20-second job as an example.

Each result includes `chargeMicros`, the charge for that job. Check the [agent docs](https://smartypants.network/docs/agents) for the current price.

## Where do CPU jobs fit with workspaces?

A CPU job is one program in one VM, then gone. A [workspace](/workspaces/) keeps one VM open for many commands and files, up to 30 minutes. For the bigger picture, read [AI agent sandboxes explained](/guides/ai-agent-sandboxes-explained/). To call models rather than run code, see the [inference API](/inference/).
