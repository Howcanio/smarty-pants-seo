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
summary: "A Smarty Pants workspace session keeps one sealed Linux VM open on a Mac so an agent can put files, run several commands and read results, then end it. Limits: 30 minutes per workspace, 10 minutes idle, 10 minutes per command, files up to 8 KB, 4 KB of output per stream. It runs on Smarty Pants' own account first and is not charged while tested. If the Mac's owner returns, it ends within 5 seconds."
published: "2026-11-09"
updated: "2026-11-09"
readingMinutes: 4
faqs:
  - q: "How long can a workspace session last?"
    a: "Up to 30 minutes per workspace. It also ends after 10 minutes idle, and each command can run up to 10 minutes."
  - q: "Are workspace sessions charged?"
    a: "Not while Smarty Pants tests them on its own account. Other accounts cannot use them yet."
  - q: "What does OWNER_RETURNED mean?"
    a: "The Mac's owner came back, so the workspace ended within 5 seconds. Start a new session and redo the step that was interrupted."
  - q: "Are files kept after a session ends?"
    a: "No. Files live until the workspace ends and nothing is kept after. Fetch what you need before you end it."
  - q: "Can a session install packages from the internet?"
    a: "No. The VM has no network today. Internet access through a filter of listed public sites is Planned."
related: ["/workspaces/", "/cpu/", "/workspaces/snapshots-and-recovery/", "/guides/ai-agent-sandboxes-explained/"]
sources:
  - label: "Smarty Pants: Agent kit (Workspaces: one VM, many commands)"
    url: "https://smartypants.network/docs/agents"
---

A workspace session is the part of Smarty Pants agent workspaces that exists today. It keeps one sealed Linux VM open on an Apple Silicon Mac so your agent can write a file, run a program, run another one on the result, and read the answer back. When you end it, everything is gone. All details here come from the live [agent docs](https://smartypants.network/docs/agents).

## Who can use sessions today?

Smarty Pants' own account first. Sessions are not charged while Smarty Pants tests them, and other accounts cannot use them until they open. The [agent docs](https://smartypants.network/docs/agents) will say when they do.

## What are the limits?

Short and small: 30 minutes per workspace and files up to 8 KB.

| Limit | Value |
|---|---|
| Workspace lifetime | 30 minutes |
| Idle timeout | 10 minutes |
| Per command | Up to 10 minutes |
| File size | Up to 8 KB |
| Output | 4 KB per stream |
| Network | None |
| After it ends | Nothing is kept |
| Owner returns | Workspace ends within 5 seconds, `OWNER_RETURNED` |
| Charge | Not charged while tested |

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

Moving a workspace to another Mac from a saved checkpoint is Planned; see [snapshots and recovery](/workspaces/snapshots-and-recovery/).

## What should not go into a session?

Secrets and confidential data. The VM protects the Mac's owner from your code. It does not keep your files or memory confidential from the Mac's owner.

Use sessions for public code, test data and throwaway work. If you need internet access, large files or work that runs for hours, a hosted sandbox on dedicated servers fits better today.

## Where next?

Read the [workspaces overview](/workspaces/) for what is Planned, or [CPU jobs](/cpu/) for single 30-second runs. For background, see [AI agent sandboxes explained](/guides/ai-agent-sandboxes-explained/).
