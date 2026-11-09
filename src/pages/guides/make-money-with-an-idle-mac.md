---
layout: ../../layouts/ContentLayout.astro
title: "Make money with an idle Mac: honest options and costs"
description: "How to make money with an idle computer like a Mac: which networks support Apple Silicon, electricity costs from EIA and Apple data, taxes and Smarty Pants pay."
h1: "How to make money with an idle Mac"
eyebrow: "Guide"
audience: "supplier"
primaryKeyword: "make money with idle computer"
keywords: ["make money with idle computer", "earn money with my mac", "rent out mac computing power", "passive income mac", "sell idle compute apple silicon", "mac mini earn money"]
summary: "You can rent an idle Apple Silicon Mac's compute to networks that run AI work on it. Smarty Pants has an intro offer of up to $1 a day per idle Mac, until 50 computers join, US only. Some other networks support Macs; Salad doesn't. Count your costs: at the 2025 US average of 17.30 cents per kWh, a Mac mini drawing Apple's measured maximum of 65 W all day costs about 27 cents. Earnings are gross and taxable."
published: "2026-11-09"
updated: "2026-11-09"
readingMinutes: 7
faqs:
  - q: "How much can I earn with an idle Mac on Smarty Pants?"
    a: "Today Smarty Pants has an intro offer: up to $1 a day per idle Mac, until 50 computers join, which is about $30 a month if the Mac is ready all day. It covers the first 50 supported Apple Silicon Macs with 16 GB or more, in the US only; after that, pay depends on the Mac and the app tells you before it changes."
  - q: "How much electricity does an idle Mac mini use?"
    a: "Apple measured 4 W at idle and 65 W at maximum for a 16 GB M4 Mac mini. At the 2025 US average residential price of 17.30 cents per kWh, that is about 1.7 cents a day idle and about 27 cents a day at maximum."
  - q: "Can I earn with a MacBook?"
    a: "On Smarty Pants, yes, if it is a supported Apple Silicon model with 16 GB or more and it stays plugged in. MacBooks pause themselves on battery."
  - q: "Do I pay tax on money my Mac earns?"
    a: "In the US, yes. The IRS says gig economy income is taxable even if you don't get a form such as a 1099. Smarty Pants shows earnings gross, with no electricity or tax taken off."
  - q: "Can Smarty Pants see my files?"
    a: "Smarty Pants says it cannot browse your files, watch your screen, or control your Mac. You can pause any time, and you choose whether your Mac serves a company Group, the general network, or both."
  - q: "Does Salad work on a Mac?"
    a: "No. Salad's own support page says a Mac can't earn on Salad, with or without virtualization."
related: ["/earn/", "/earn/earnings/", "/earn/safety-and-controls/", "/earn/how-it-works/", "/guides/mac-mini-for-ai/", "/macs/"]
sources:
  - label: "U.S. EIA: Electricity explained, prices and factors affecting prices (2025 average residential price)"
    url: "https://www.eia.gov/energyexplained/electricity/prices-and-factors-affecting-prices.php"
  - label: "Apple Support: Mac mini power consumption and thermal output (BTU) information"
    url: "https://support.apple.com/en-us/103253"
  - label: "Apple: Mac mini, Tech Specs"
    url: "https://www.apple.com/mac-mini/specs/"
  - label: "IRS: Gig economy tax center"
    url: "https://www.irs.gov/businesses/gig-economy-tax-center"
  - label: "io.net docs: Install IO Worker on macOS"
    url: "https://io.net/docs/guides/workers/install-on-macos"
  - label: "Darkbloom docs: Provider quickstart"
    url: "https://docs.darkbloom.dev/quickstart-provider.md"
  - label: "Salad Support: Do you support macOS and Linux?"
    url: "https://support.salad.com/faq/compatibility/do-you-support-macos-and-linux/"
  - label: "Smarty Pants: For humans (owner FAQ)"
    url: "https://smartypants.network/humans"
  - label: "Smarty Pants: Compatibility check"
    url: "https://smartypants.network/compatibility"
---

An Apple Silicon Mac spends most of its life waiting. Several networks now pay to use that idle time for AI work, because the same unified memory that runs models for you can run them for someone else. This guide covers the real options, what electricity actually costs, heat and wear, taxes, and what Smarty Pants pays today. No network can promise you a set income, and this page doesn't either.

## What are the ways to make money with an idle Mac?

The main option is renting its compute to a network that runs AI or other jobs on it. Only some networks support Macs, so check each one's own documentation before you install anything.

| Network | Supports Macs? | What it says about Macs | Pay terms published |
|---|---|---|---|
| [Smarty Pants](/earn/) | Yes, Apple Silicon with 16 GB+, macOS 14+ | Runs open AI models through a signed Mac app; MacBooks must be plugged in | Intro offer, see below |
| [io.net](https://io.net/docs/guides/workers/install-on-macos) | Yes, "Apple chip processors (M3, M4)" | Runs a worker in Docker Desktop with a 20 GB container | Describes "block rewards"; no rates on the install page |
| [Darkbloom](https://docs.darkbloom.dev/quickstart-provider.md) | Yes, Apple Silicon M1 or later | 16 GB minimum, 36 GB recommended for most models; calls itself "an experimental research prototype" | Earnings shown in its CLI; no rates on the quickstart page |
| [Salad](https://support.salad.com/faq/compatibility/do-you-support-macos-and-linux/) | No | "A Mac can't earn on Salad, with or without virtualization." | n/a |

Terms on every network change, so read the current page before you rely on any of this.

## What does Smarty Pants pay today?

Smarty Pants has an intro offer, stated on its live site on 8 Nov 2026: **"Intro offer: up to $1 a day per idle Mac, until 50 computers join."** That works out to about $30 a month if the Mac is ready all day.

The fine print:

- It applies to the first 50 supported Apple Silicon Macs with 16 GB+, in the US only.
- It pays for hours the Mac is on, plugged in, online and ready, even with no job running.
- After the first 50, pay depends on the Mac's memory, speed and how often it's on, and the app tells you before your pay changes.
- Payouts go through Stripe. The payout fee is 3% with a $3.00 minimum, so on a $30 payout the fee would be the $3.00 minimum.
- Electricity and internet are your costs. Displayed earnings are gross: no electricity or tax is deducted.

The Mac app is invite only for now; we're inviting Macs in small batches. See [How earnings work](/earn/earnings/) and check [smartypants.network/humans](https://smartypants.network/humans) for the current terms.

## How much does it cost in electricity to leave a Mac on?

Usually cents a day, but it depends on your rate and how hard the Mac works. The U.S. Energy Information Administration puts the 2025 average residential price at [17.30 cents per kWh](https://www.eia.gov/energyexplained/electricity/prices-and-factors-affecting-prices.php). Apple publishes measured power for each Mac mini on its [power consumption page](https://support.apple.com/en-us/103253), measured from the wall.

| Mac mini (Apple's tested configuration) | Idle | Max | Cost per day, idle | Cost per day at max, 24 hours |
|---|---|---|---|---|
| M4, 16 GB (2024) | 4 W | 65 W | about 1.7 cents | about 27 cents |
| M4 Pro, 64 GB (2024) | 5 W | 140 W | about 2.1 cents | about 58 cents |
| M6, 16 GB | 4 W | 70 W | about 1.7 cents | about 29 cents |
| M5 Pro, 64 GB | 6 W | 145 W | about 2.5 cents | about 60 cents |

How the math works: watts × 24 hours ÷ 1,000 = kWh per day, then × your price. For the M4 at maximum: 65 W × 24 ÷ 1,000 = 1.56 kWh, × $0.173 = about $0.27.

Two cautions. Apple's "max" figure comes from "a compute-intensive test application that maximizes processor usage", so a Mac serving AI requests on and off will usually sit somewhere between idle and max. And your own rate may be well above or below the national average, so use the price on your bill.

## What about heat, noise and wear?

A Mac working hard turns its power into heat. Apple lists the M4 Mac mini at 222 BTU/h at maximum and the M5 Pro Mac mini at 495 BTU/h, against 14 and 20 BTU/h at idle ([Apple](https://support.apple.com/en-us/103253)). Apple's [tech specs](https://www.apple.com/mac-mini/specs/) give an operating range of 50° to 95° F (10° to 35° C), so keep it somewhere ventilated.

On Smarty Pants, the Mac pauses itself for unsafe battery, heat or memory conditions, and you can pause any time. Pausing stops new work and disconnects the Mac; work in progress is interrupted. The app needs 15 GB+ of free disk for model files ([compatibility](https://smartypants.network/compatibility)).

We could not find published data on how continuous AI work affects a Mac's lifespan, so we won't claim it has no effect. If your Mac is a work machine you can't do without, weigh that.

## Is it safe to let strangers' AI work run on my Mac?

Each network handles this differently, so read its safety page. Smarty Pants says it "cannot browse your files, watch your screen, or control your Mac", and you choose the network: your company Group only, the general network only, or both. More in [Safety and controls](/earn/safety-and-controls/).

## Do I have to pay tax on what my Mac earns?

Yes, in the US. The IRS says "gig economy income is taxable", and that you must report it even if it isn't reported on a form like a 1099-K, 1099-MISC or 1099-NEC ([IRS](https://www.irs.gov/businesses/gig-economy-tax-center)). Smarty Pants shows your earnings gross, so set aside money for tax and subtract your electricity cost to see what you actually keep. A tax professional can tell you what you may deduct.

## Is it worth it?

It depends on your electricity rate, how many hours your Mac is on anyway, and whether you get into an offer like Smarty Pants' intro offer. A Mac that is already on all day costs little extra at idle; a Mac you would otherwise switch off adds its full power cost. Start with [Earn with your Mac](/earn/), check your Mac against the [Macs](/macs/) pages, and do the math with your own rate.
