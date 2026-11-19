---
layout: ../../layouts/ContentLayout.astro
title: "Workspace sessions: one VM for many agent commands"
description: "Smarty Pants workspace sessions keep one sealed Linux VM open for many commands and files. Limits, API calls and a Python example."
h1: "Workspace sessions: one sealed VM, many commands"
eyebrow: "Agent workspaces"
audience: "buyer"
status: "invite"
primaryKeyword: "agent sandbox session"
keywords: ["agent sandbox session", "persistent sandbox for ai agents", "run multiple commands in a sandbox", "cpu sessions api", "sp.workspace"]
summary: "A Smarty Pants workspace session keeps one sealed Linux VM open on a Mac so an agent can put files, run several commands and read results, then end it. Limits: up to 2 hours per workspace, 10 minutes idle, 10 minutes per command, files up to 16 MiB in and 64 MiB out. It costs $0.0129 an hour for 2 vCPU and 2 GB, billed per second, and is free on your own or your Group's Macs. If the Mac's owner returns, it ends within 5 seconds."
published: "2026-11-09"
updated: "2026-11-19"
readingMinutes: 4
faqs:
  - q: "How long can a workspace session last?"
    a: "Up to 2 hours per workspace. It also ends after 10 minutes idle, and each command can run up to 10 minutes."
  - q: "Are workspace sessions charged?"
    a: "Free on Macs you own or your Group's Macs. On other people's Macs, $0.0129 an hour for 2 vCPU and 2 GB, billed per second; that paid use is on Smarty Pants' own account first."
  - q: "What does OWNER_RETURNED mean?"
    a: "The Mac's owner came back, so the workspace ended within 5 seconds. With autoSave and failover on, the site opens a copy on another Mac from the last save; otherwise start a new session and redo the step."
  - q: "Are files kept after a session ends?"
    a: "Not unless you save it. Save a workspace by name and open copies of it later; otherwise files are gone when it ends."
  - q: "Can a session install packages from the internet?"
    a: "Only from reviewed public sites such as GitHub, PyPI and npm, when the workspace is opened with them. There is no network by default, and home-network and private addresses are always blocked."
related: ["/workspaces/", "/cpu/", "/workspaces/snapshots-and-recovery/", "/guides/ai-agent-sandboxes-explained/"]
sources:
  - label: "Smarty Pants: Agent kit (Workspaces: one VM, many commands)"
    url: "https://smartypants.network/docs/agents"
---

A workspace session is the building block of Smarty Pants agent workspaces. It keeps one sealed Linux VM open on an Apple Silicon Mac so your agent can write a file, run a program, run another one on the result, and read the answer back. When you end it, everything is gone unless you saved it. All details here come from the live [agent docs](https://smartypants.network/docs/agents).

## Who can use sessions today?

Anyone on Macs they own, and Group members on their Group's Macs, free: add `where: "mine"` or `where: {group: "<Group id>"}`. Paid sessions on Macs other people own run on Smarty Pants' own account first; other accounts get a 403 until that opens. The [agent docs](https://smartypants.network/docs/agents) will say when it does.

## What are the limits?

Up to 2 hours per workspace, with files up to 16 MiB in and 64 MiB out.

| Limit | Value |
|---|---|
| Size | 2 vCPU, 2 GB of memory |
| Workspace lifetime | Up to 2 hours |
| Idle timeout | 10 minutes |
| Per command | Up to 10 minutes |
| Files | Up to 16 MiB in and 64 MiB out (8 KiB at once, larger ones in pieces of up to 256 KiB) |
| Output | 64 KiB per stream |
| Network | None by default; reviewed public sites when asked for |
| After it ends | Nothing is kept unless you saved it |
| Owner returns | Workspace ends within 5 seconds, `OWNER_RETURNED` |
| Price | $0.0129 an hour, billed per second from ready to end; free on your own or your Group's Macs |

The VM is the same kind used for [CPU jobs](/cpu/): ARM64 Linux with Python 3, Node.js and a basic shell.

## How do I use a session from Python?

With `sp.workspace()` in the starter kit. The VM stays open until the `with` block ends.

```python
from smartypants import SmartyPants
sp = SmartyPants()

with sp.workspace(minutes=10) as ws:          # one VM until the block ends
    ws.put_file("notes.txt", "first line\n")
    ws.run("sh", "echo second line >> notes.txt")
    print(ws.run("python", "print(open('notes.txt').read().upper())")["stdout"])
    print(ws.get_file("notes.txt"))
```

This example is copied from the live docs. It puts a file, adds to it with a shell command, reads it with Python, and fetches the file back, all in one VM.

## Which API calls does a session use?

Five routes: create, run, move files, read a request, end.

| Call | What it does |
|---|---|
| `POST /v1/cpu/sessions` | Create a workspace (one VM) |
| `POST /v1/cpu/sessions/{id}/exec` | Run a command in it |
| `POST /v1/cpu/sessions/{id}/files` | Put or get a file |
| `GET /v1/cpu/sessions/{id}/requests/{requestId}` | Read the result of each request |
| `DELETE /v1/cpu/sessions/{id}` | End the workspace |

Each command or file call is a request with its own id; you read its outcome with the `GET` route. Always end a session with `DELETE` when you are done rather than waiting for the timeout.

## What should my agent do when it sees OWNER_RETURNED?

Treat it as normal, not as a bug. The Mac's owner comes first: if they return, the workspace ends within 5 seconds and the request says `OWNER_RETURNED`.

Good habits:

- Keep each command short and redoable.
- Fetch any file you need as soon as a step produces it.
- On `OWNER_RETURNED`, start a new session, put the inputs back and redo the last step.

To carry on automatically, open the workspace with `"autoSave": {"name": "NAME"}` and `"failover": true`: when its Mac drops off, the site starts a new workspace on another Mac from the last save. See [save, copy and failover](/workspaces/snapshots-and-recovery/).

## What should not go into a session?

Secrets and confidential data. The VM protects the Mac's owner from your code. It does not keep your files or memory confidential from the Mac's owner.

Use sessions on other people's Macs for public code, test data and throwaway work, and your own or your Group's Macs for anything private. If you need GPUs, x86 machines or a single VM for more than 2 hours, a hosted sandbox on dedicated servers fits better today.

## What else works with sessions?

| Feature | Status |
|---|---|
| Sessions on your own or your Group's Macs | Available, free |
| Paid sessions on other people's Macs | Smarty Pants' own account first |
| [Save, copy and failover](/workspaces/snapshots-and-recovery/) | Available |
| Reviewed public sites (GitHub, PyPI, npm and others) | Available when asked for |
| [Model calls from a workspace](/workspaces/model-calls/) | Available |
| [Fleets of identical workspaces](/workspaces/fleets/) | Available |
| Command-line tool and Python and JavaScript kits | Available (`npm install -g smartypants-network`) |
| [Always-on agents](/workspaces/always-on-agents/) | Planned |

## Where next?

Read the [workspaces overview](/workspaces/) for everything a workspace can do, [CPU jobs](/cpu/) for single short runs, or the [price page](/pricing/#workspaces) to compare costs. For background, see [AI agent sandboxes explained](/guides/ai-agent-sandboxes-explained/).
