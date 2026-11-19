# Allowed claims (checked 8–9 November 2026)

Every page on this site may only say what is on this list, or what a writer verified from a public source they opened and cite. Each claim names where it was verified. "Live product" means the public pages of https://smartypants.network as rendered on 8 Nov 2026.

## Status words we use

- **Live**: works today for the general public as described on the live product.
- **In testing / opens soon**: listed on the live product as "In testing, opens soon" or "early testing".
- **Invite only**: available only to invited people today.
- **Planned**: on the roadmap in the repo, not usable by the public. Always label it "Planned".

Never write "available now", "ready now", "always on", "fast", "reliable", "private" or "secure" as a blanket claim. Availability changes hour to hour: the live model pages show how many Macs have each model online, and on 8 Nov most models had 0 or 1 Mac online.

## What Smarty Pants is

1. Smarty Pants (smartypants.network) connects AI requests to Apple Silicon Macs that owners make available when idle. (live home, /api, README)
2. Developers call exact, pinned, unmodified open models through an OpenAI-compatible API at `https://smartypants.network/v1`: change the base URL and key, keep the OpenAI SDK. (live /api, /docs/agents, llms.txt)
3. Endpoints that exist: `GET /v1/models`, `POST /v1/chat/completions` (streaming, tools, JSON output), `POST /v1/embeddings`, `POST /v1/audio/transcriptions`. MCP server at `/mcp` (no sign-in: list_models, find_model, estimate_cost, request_model, get_started) and `/mcp/account` (OAuth sign-in: adds run_prompt, get_balance, add_credit). (llms.txt)
4. Pricing is per token, listed per model in `/v1/models`; you are not charged for a request Smarty Pants can't serve. (live model pages: "You're never charged for a request we can't serve.")
5. Each model is served as a specific build (for example 4-bit MLX), named in `/v1/models` (`build_id`, `quantization`). (live /v1/models)
6. Requests run on Macs other people own. The live site says: keep private data off the shared network; "General network: please don't send sensitive data." A serving Mac must decrypt a request in memory to answer it; Smarty Pants does not show or retain prompt content in its interface or product logs. (live /api, /humans FAQ)
7. Groups: a team puts its own Macs in a Group; members use them for AI for free, work stays on the Group's Macs first, and earnings go to one company wallet. (live /for-teams). Group sign-up is invite-only ("Opening soon").
8. Operated by Howcan, Inc. Support: info@howcan.io. (llms.txt; Dealyo uses the same operator. Confirm legal entity name with Nat before go-live.)

## Access and sign-up (CONFLICTING on the live site: say only the conservative version)

- Live /agents and llms.txt say "Anyone can sign up, and new accounts get $10 of free credit for 90 days". Live /network says "Prelaunch is closed to public traffic", /legal says "Invitation-only release", and the /humans FAQ says the general network "is not publicly open yet".
- **Allowed wording:** "Smarty Pants is opening in stages. You can see the models, prices and code today; sign in with your email on smartypants.network/api to get a key." Do NOT promise free credit, free playground or open access. (Flagged for Nat.)
- Mac app download: invite only for now (live /download). Owner sign-up: "We're inviting Macs in small batches." (live /for-teams, /network)

## Models in the catalog (live /api/public/models, 8 Nov 2026)

| API name | What it does | Minimum Mac memory (from description) | Context / max output | Listed price | Live status |
|---|---|---|---|---|---|
| smartypants/qwen3.5-9b | chat | 16 GB+ | 16,384 / 4,096 | $0.10 in / $0.40 out per M tokens | released |
| smartypants/qwen3.8-27b | chat | 32 GB+ | 16,384 / 4,096 | $0.20 / $1.20 | released |
| smartypants/nanbeige4.3-33b | chat | 32 GB+ | 16,384 / 4,096 | $0.30 / $2.00 | released |
| smartypants/qwen3-embedding-0.6b | embeddings, 1,024 dims (or fewer) | 16 GB+ | 8,192 | $0.01 in per M tokens | released |
| smartypants/qwen3.5-4b (alias smartypants/smarty) | chat | 16 GB+ | 8,192 / 2,048 | $0.10 / $0.25 | in testing, opens soon |
| smartypants/qwen3.6-35b-a3b | chat, mixture of experts | 32 GB+ | 16,384 / 4,096 | $0.09 / $0.80 | in testing, opens soon |
| smartypants/gpt-oss-20b | chat, mixture of experts | 24 GB+ | 16,384 / 4,096 | $0.027 / $0.135 | in testing, opens soon |
| smartypants/whisper-large-v3-turbo | speech to text, up to 30 min or 25 MB per file | 16 GB+ | — | $0.18 an hour of audio (live /api) | in testing, opens soon |
| smartypants/flux.1-schnell | image making, up to 4 images up to 1536×1024 per request, every image labeled as AI-made | 48 GB+ | — | $0.003 a picture (live /api) | in testing, opens soon |

- Always show a price as "listed price on 8 Nov 2026" and link to `/v1/models` for the current price.
- Do not quote live speed or uptime numbers (they change daily). You MAY quote dated benchmark results from https://huggingface.co/datasets/smartypantsnet/mac-benchmarks with the date and Mac named (e.g. "Qwen3.5-4B standard 4-bit: 99.7 tok/s on an M5 Pro Mac mini, measured 22 Oct 2026").
- Not on this site: ribt voice (price not approved).
- Added 19 Nov 2026 from live /v1/models (all released): Arete 27B $0.20/$1.20, Axion 1.0 35B $0.09/$0.80, Muse Glimmer 30B $0.27/$1.08 (text only on SP), Qwen3 Reranker 0.6B $0.009 in, Wan 2.2 video $0.011 a 480p clip (Nat OK'd 11 Nov). Bench lines from the factory reports in the project benchmarks inbox, dated.
- Licenses: all listed models are Apache-2.0 except Whisper (MIT) and FLUX.1 schnell (check its license on Hugging Face before stating it).

## Mac owners (supply)

1. Requirements: Apple Silicon Mac, 16 GB memory or more, macOS 14 or later; the app also checks 15 GB+ free disk, power, temperature, system pressure, network and a model benchmark; MacBooks must be plugged in while serving. (live /compatibility, /download)
2. A browser check (about 3 seconds, nothing leaves the Mac) estimates; the signed Mac app verifies the exact chip, memory, disk and real speed before any paid work. No browser result allows paid work. (live /compatibility)
3. Controls: Pause any time; Pause stops new work and disconnects the Mac, and work in progress is interrupted. The Mac pauses itself for unsafe battery, heat or memory conditions; MacBooks also pause on battery. Owners choose the network: company (Group) only, general network only, or both. (live /humans, /compatibility)
4. Smarty Pants "cannot browse your files, watch your screen, or control your Mac." (live /humans)
5. Earnings (state as the CURRENT intro offer, dated, with a link to the live site): "Intro offer: up to $1 a day per idle Mac, until 50 computers join." It applies to the first 50 supported Apple Silicon Macs with 16 GB+; US only; paid for hours the Mac is on, plugged in, online and ready, even with no job running. After the first 50, pay depends on the Mac's memory, speed and how often it's on, and the app tells you before your pay changes. Paid out through Stripe; payout fee 3% with a $3.00 minimum. Electricity and internet are the owner's costs; displayed earnings are gross (no electricity or tax deducted). (live home, /humans FAQ, /download)
6. Never promise income, never give monthly or yearly earnings beyond "$1 a day ≈ $30 a month if ready all day" as stated live, and never claim earnings after the intro offer.
7. Mac app: windowed app (not menu bar), signed, updates itself via "Check for updates…". (README, live /download)

## CPU jobs and agent workspaces

- **Short code jobs (CPU jobs):** a short Python, JavaScript or shell program runs in a sealed Linux (ARM64) VM on a Mac: no network, no disk, wiped after. Up to 30 seconds per job, up to 4 KB output; output can be streamed while running. Listed price $0.00405 per vCPU-hour + $0.002025 per GB-hour (about $0.00007 for a 20-second job). Status: **our own account first**: other accounts get 403 until it opens. (live /docs/agents)
- **Workspaces (sessions):** one sealed VM kept open for many commands and files; limits 30 min per workspace, 10 min idle, 10 min per command, files up to 8 KB, 4 KB output per stream; the Mac's owner comes first (workspace ends within 5 seconds if they return). Status: **our own account first, not charged while tested.** (live /docs/agents)
- VM isolation protects the owner from guest code; it does NOT keep the guest's files or memory confidential from the Mac's owner. (repo AGENT-WORKSPACES-PLAN.md, rule 5)
- **Planned** (roadmap v1.3, approved 8 Nov 2026; label every one "Planned"): snapshots and recovery (disk-only snapshots; restore on another Mac after a host is lost), model calls from workspaces (workspace-scoped inference key with a budget; credential proxy with placeholder keys), browser work and fleets (several sessions at once), persistent always-on agents, guest internet through a filter that allows listed public sites only and blocks home-network addresses, CLI and SDK for paid developer use.

## Never say

- Any uptime, capacity, Mac count, customer count, request volume, testimonial, partner or logo.
- "Cheaper than X" with a number, unless you cite X's own current price page and our listed price, both dated.
- That data is private, encrypted end to end, or confidential on the general network.
- That anyone can buy today or download the app today.
- "Pilot" (the team does not use the word).

## Agent discovery (checked 19 November 2026)

- Smarty Pants is listed in the official MCP Registry as `network.smartypants/smartypants` (both `/mcp` and `/mcp/account`). (registry.modelcontextprotocol.io, 19 Nov 2026)
- Framework setups (LangChain, OpenAI Agents SDK, Vercel AI SDK, LlamaIndex, Claude Code MCP + skill, GitHub Actions step) are on /docs/agents#frameworks and /llms-full.txt (core PR #517; until it is deployed those links 404 or show the app).
- `GET /v1/key` shows a key's limit and `remaining_usd`; MCP connections are capped at $20 a month and last 90 days; `add_credit` returns a Stripe page the person pays on. (llms.txt)
- Batch API: half the normal per-token price, results within 24 hours. (llms.txt)

## Prices, products and comparisons (checked 19 November 2026)

- Price rule (Nat, 19 Nov 2026): each product at 90-100% of the entry-level (cheapest) price for the same thing elsewhere; we use about 90%. Source of truth for the comparison numbers: `src/data/prices.ts` (each row names its source and date).
- New listed prices from 19 Nov 2026 (core PR on branch claude/project-thread-m5cmnb; live after the next deploy): Qwen3.5 9B $0.072/$0.108, Qwen3.8 27B $0.035/$1.125, Qwen3.6 35B-A3B $0.045/$0.63, gpt-oss-20b $0.0162/$0.081, Whisper about $0.011 an hour ($0.003 per million ms). Unchanged: Arete, Axion, Nanbeige, Muse Glimmer, embeddings, reranker, video $0.011 a clip, pictures $0.003.
- Workspaces: $0.00405 per vCPU-hour + $0.002025 per GB-hour = $0.01215 an hour for 2 vCPU / 2 GB, billed per second from ready to end (GET /v1/prices/workspaces). Limits: up to 2 hours, 10 min idle, 10 min per command, files 16 MiB in / 64 MiB out, 64 KiB output per stream. Free on your own Macs (`where: "mine"`) and Group Macs. Paid use on other people's Macs: our own account first. Available: code run, whole jobs, saves + copies + failover, workspace model key + coding agent, fleets, public links, Dockerfile setups, task board, reviewed public sites (GitHub, PyPI, npm). Mac app builds: built, switched off. Always-on agents and browser workspaces: not available.
- Starter credit $10 for 90 days; top-ups from $10.
- Competitor prices: OpenRouter seller lists (19 Nov); e2b.dev/pricing (19 Nov: $0.000014/vCPU-s, $0.0000045/GiB-s, $100 one-time credit); Daytona, Modal, Sprites, Vercel from Fly.io's comparison (checked 5 Oct 2026); Northflank blog (5 May 2026); GitHub macOS runner $0.062/min (docs.github.com, 19 Nov); DeepInfra Whisper $0.0002/min and FastWan 480p (19 Nov); FLUX schnell about $0.003-0.005 (secondary source, June 2026 rates).
- Always say what we don't do: no GPUs, no x86, no SOC 2 yet, no guaranteed capacity, mostly 16,384-token context, the owner can take the Mac back.
