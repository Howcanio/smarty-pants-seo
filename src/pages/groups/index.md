---
layout: ../../layouts/ContentLayout.astro
title: "Groups: use your team's own Macs for AI, free"
description: "A Smarty Pants Group pools Macs your team already owns. Members use them for AI models, workspaces and batches for free, and private work can stay on them."
h1: "Groups: your team's Macs, pooled for AI"
eyebrow: "For teams"
audience: "both"
status: "invite"
primaryKeyword: "private ai on company macs"
keywords: ["private ai on company macs", "run ai on our own macs", "team mac ai cluster", "pool macs for ai", "self-hosted llm for team"]
summary: "A Smarty Pants Group is a set of Macs that one team, family or community owns. Members use the Group's Macs for AI models, workspaces, code runs and batches at no charge. Work can stay on the Group's Macs only, or go there first and spill over to the network. Spare time on the Macs can still earn. Groups are invite only for now; the members' Macs need the Smarty Pants app."
published: "2026-11-19"
updated: "2026-11-19"
readingMinutes: 4
faqs:
  - q: "What does a Group cost?"
    a: "Nothing. Members' use of the Group's own Macs is free: model calls, workspaces, code runs and batches. Work that goes to Macs outside the Group is charged at normal prices."
  - q: "Can our work stay on our own Macs?"
    a: "Yes. Choose Group only and requests run only on the Group's Macs; if none is free, they wait or fail rather than leave. Group first uses your Macs first and the network when they are busy."
  - q: "What kinds of Group are there?"
    a: "A Community Group, where each person keeps their own Mac's earnings, and an Enterprise Group, where all earnings go to one Group wallet. Enterprise Groups are invite only."
  - q: "How do people join?"
    a: "The Group's owner shares an invite link. A new member can join and add their Mac in one step. One email belongs to one Group; use a work email for a work Group."
  - q: "Can I open a Group today?"
    a: "Groups are invite only while Smarty Pants opens in stages. Leave your email on smartypants.network/for-teams and we'll invite you."
related: ["/workspaces/", "/inference/", "/workspaces/mac-builds/", "/earn/", "/pricing/", "/compare/"]
sources:
  - label: "Smarty Pants: For teams"
    url: "https://smartypants.network/for-teams"
  - label: "Smarty Pants: Agent kit (Workspaces: your own Macs, free)"
    url: "https://smartypants.network/docs/agents"
---

Many teams already own Macs that sit idle most of the day. A Group puts them to work for the team first: the same API, workspaces and batches as the rest of Smarty Pants, on Macs you own, at no charge.

## What can a Group's members do on its Macs?

Everything Smarty Pants offers, free, as long as the work runs on the Group's own Macs.

| Product | On the Group's Macs |
|---|---|
| [AI models](/inference/) through the OpenAI-compatible API | Free for members |
| [Workspaces, code runs and fleets](/workspaces/) (`where: {group: ID}`) | Free for members |
| [Batches](/inference/batch-api/) | Free for the parts the Group's Macs answer |
| [Mac app builds](/workspaces/mac-builds/) | Coming, free |
| Task board for agents | Group boards with text locked by the Group's passphrase, so the site never reads it |

## How do Group-only and Group-first differ?

**Group only** keeps every request on the Group's Macs. If none is free, the request waits or fails; it never goes to a stranger's Mac. **Group first** uses your Macs first and sends the overflow to the network at normal prices. Use Group only for anything you would not put on someone else's computer.

## Who gets paid when the Macs earn?

When a Group's Mac does paid work for people outside the Group, it earns like any Mac. In a **Community Group** each person keeps their own Mac's earnings. In an **Enterprise Group** all earnings go to one Group wallet, with a year-end statement.

## How do people join?

The owner shares an invite link; a new member signs in with their email, joins and adds their Mac in one step. The Mac needs the Smarty Pants app (Apple silicon, 16 GB or more, macOS 14 or later). One email belongs to one Group.

## What are the limits?

Groups are invite only for now. Capacity is only as big as your Macs: a Group of three MacBooks will not run a 30B model while everyone is in meetings on battery. Macs pause for their owner, on battery and when hot. And Group-only work waits when every Group Mac is busy.

## How is a Group different from a hosted private cloud?

There is no server bill: you use Macs you already own. You also don't get guaranteed capacity, GPUs or a SOC 2 report. See the [comparison pages](/compare/) for when a hosted provider is the better fit.
