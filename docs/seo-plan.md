# Smarty Pants SEO and AI-search plan

Checked 2026-11-09. Every claim on the site comes from `docs/allowed-claims.md`.

## One-screen summary

- **What we built:** a separate Astro content site (this repo) with 61 pages: the inference API, prices with a calculator, one page per model (`/ai-models/`), one page per Apple silicon chip (`/macs/`, M1 to M6), CPU jobs, agent workspaces (live parts plus clearly labelled Planned parts), earning with a Mac, and 9 guides. It is noindex and robots-disallowed until `INDEXABLE=true`.
- **Where the demand is:** Google autocomplete shows the most question-style demand around running LLMs on specific Macs ("run llm on mac mini m4", "m3 ultra llm performance"), how much RAM a model needs, MLX, agent sandboxes, OpenAI-compatible APIs and cheap LLM APIs. The supply side ("make money with my mac", "how to sell computing power") is small but has almost no good answers: today's results are idle clicker games and generic passive-income lists.
- **Our edge:** real measurements from our own Macs (mac-benchmarks dataset), exact model builds, and plain answers. Mac-chip pages and the RAM guide are where we can rank first; head terms like "cheapest llm api" are crowded with comparison blogs.
- **The core site is the biggest problem:** smartypants.network is a single-page app that serves the home title and description on every route, has no real robots.txt or sitemap.xml (both return the HTML shell), no canonicals and no structured data. Google and AI crawlers see one page. `docs/core-site-handoff.md` lists the fixes.
- **Going live:** recommended path is a Cloudflare Worker on smartypants.network that sends seven folders (`/inference/`, `/ai-models/`, `/macs/`, `/guides/`, `/earn/`, `/cpu/`, `/workspaces/`) to this site. No change to the Mac app or gateway is needed for that. None of those folders are used by the core site today (checked: all seven fall through to the SPA shell).

## 1. The product (what the site may say)

**Buyers (developers and agents).** An OpenAI-compatible API at `https://smartypants.network/v1`. Exact, pinned, unmodified open models, priced per million input and output tokens; no charge for a request Smarty Pants cannot serve. Released today: Qwen3.5 9B, Qwen3.8 27B, Nanbeige4.3 33B, Qwen3 Embedding 0.6B. In testing: Qwen3.5 4B, Qwen3.6 35B-A3B, gpt-oss-20b, Whisper large v3 turbo (speech to text), FLUX.1 schnell (pictures). Sandboxed CPU jobs and single agent workspaces run on Smarty Pants' own account first. Snapshots, model calls from workspaces, fleets, always-on agents and video are Planned.

**Suppliers (Mac owners).** Apple silicon Mac with 16 GB or more. Current intro offer: up to $1 a day per idle Mac until 50 computers join, US only. Electricity and internet are the owner's costs; earnings are gross; payouts through Stripe with a 3% fee, $3 minimum. The app is invite only. Pause any time; the app pauses itself for heat, memory pressure and battery.

**Brand.** Name "Smarty Pants" (two words), domain smartypants.network, operated by Howcan, Inc. Signal Yellow #FFD93D, Midnight #071A33, Ink #0B0F19, hard 4px shadows, Barlow Condensed ExtraBold headings, Inter body. Tagline used: "Your intelligence network."

**Never say:** Mac counts, uptime, speed promises, customer counts, privacy guarantees on the general network, free credit, the word "pilot".

## 2. Audit of the current web presence

| Check | smartypants.network today |
|---|---|
| Title per page | Same title on every route: "See what your Mac could earn · Smarty Pants" (only JS changes it) |
| Meta description | Same on every route |
| robots.txt | Returns the HTML app shell (200, text/html) |
| sitemap.xml | Returns the HTML app shell |
| Canonical | None |
| Structured data | None |
| Server-rendered text | Only `/llms.txt`, `/openapi.json` and `/docs/agents` |
| www | 301 to apex (good) |
| Broken link | Footer "Mac owner agreement" goes to `/legal/owner-terms`; the working page is `/legal/node-operator` |
| Conflicting claims | `/llms.txt` and `/docs/agents` say anyone can sign up with $10 free credit; `/network` says prelaunch is closed to public traffic and `/legal` says invitation-only |
| Off-site | Hugging Face dataset smartypantsnet/mac-benchmarks exists; no other profiles found |

## 3. Demand clusters and target pages

From `docs/keywords.csv` (7,064 unique autocomplete suggestions from 62 seeds × a–z and modifiers; volume and KD columns are left empty for Ahrefs).

| Cluster | Suggestions | Priority | Target page | Example queries |
|---|---|---|---|---|
| Mac hardware for LLMs | 853 | high | `/macs/<chip>/`, `/guides/mac-mini-for-ai/` | run llm on mac mini m4, m3 ultra llm performance, how to build mac mini cluster |
| Agent sandboxes | 664 | high | `/workspaces/`, `/guides/ai-agent-sandboxes-explained/` | ai agent sandbox github, agent sandbox docker |
| Speech to text API | 400 | medium | `/inference/speech-to-text-api/` | speech to text api pricing, whisper api pricing |
| Run an LLM locally on a Mac | 382 | medium | `/guides/how-to-run-an-llm-on-a-mac/` | lm studio mac mini, ollama mac app |
| MLX | 330 | high | `/guides/what-is-mlx/` | mlx apple, gpt oss 20b mlx 4bit |
| Specific models we serve | 216 | medium | `/ai-models/<model>/` | gpt oss 20b api pricing, qwen3 embedding api |
| Image generation API | 196 | medium | `/inference/image-generation-api/` | flux 1 schnell api pricing |
| OpenAI-compatible API | 186 | high | `/inference/openai-compatible-api/`, guide | what is openai compatible api, openai compatible api base url |
| Embeddings API | 159 | medium | `/inference/embeddings-api/` | qwen3 embedding api free |
| How much RAM for an LLM | 132 | high | `/guides/how-much-ram-to-run-an-llm/` | how much ram gpt oss 20b, how much ram to run ai locally |
| Cheap LLM API | 111 | high | `/inference/pricing/`, pricing guide | cheapest llm inference api, cheapest llm api for coding |
| Distributed inference | 107 | high | decentralized guide | distributed ai inference consumer hardware |
| Earn with an idle Mac | 73 | high | `/earn/`, `/guides/make-money-with-an-idle-mac/` | make money with my macbook, how to sell computing power |

Flagged low: competitor brand and navigational queries (1,751), job-seeker queries (81, e.g. "together ai careers"), crypto and token-price queries (64, e.g. "akash network price prediction"), text to speech (193; no live TTS model), off-topic noise.

**SERP check of head terms (2026-11-09, web search):**
- "run llm on mac mini": blogs and how-tos (Analytics Vidhya, popularai, rentamac). Winnable with measured numbers.
- "how much ram to run llm": Corsair, computingforgeeks, Runpod, calculators. Winnable with a Mac-specific angle and real peaks.
- "make money with idle mac": idle clicker games, EarnApp, a Dark Bloom earnings page. Very weak results; our guide answers it directly.
- "openai compatible api": docs pages from gateways (Requesty, BentoML, Vercel, LiteLLM). Medium.
- "ai agent sandbox": glossaries and listicles (LangChain, Firecrawl, fly.io). Hard; target long-tail.
- "cheapest llm api": many comparison blogs. Hard; win with the calculator and per-model pages instead.

## 4. Competitor inventory (sitemaps, 2026-11-08)

| Site | URLs | What drives their search traffic |
|---|---|---|
| OpenRouter | 35,367 | 7 locales; 3,054 model-vs-model `/compare/` pages; model pages per vendor; 99 benchmark pages; 551 docs |
| Replicate | 30,879 | one page per user model |
| Together | 664 | 284 model pages, 261 blog posts |
| Fireworks | 615 | 354 model pages, 144 blog posts |
| Vast.ai | 516 | 138 GPU pricing pages, 111 model pages, 184 articles, a hosting earnings calculator |
| io.net | 365 | 174 long-form comparison pages under `/p/`, 144 blog posts |
| Groq | 48 | newsroom and blog only |
| Exo | 46 | 44 FAQ pages ("is local AI cheaper than API", "how much electricity does local AI use") |
| Salad | 44 | "Salad vs X" comparisons, an earning-rates page |
| Akash | sitemap index only; not counted | |

Lessons: a page per model and per hardware type is table stakes; Vast and Salad show suppliers search for earnings calculators; Exo shows short FAQ pages rank for local-AI questions.

## 5. URL map and internal linking

| Section | URLs | Links to |
|---|---|---|
| Home `/` | 1 | every hub |
| Inference `/inference/` | hub + openai-compatible-api, pricing, vs-centralized-providers, embeddings-api, speech-to-text-api, image-generation-api, video-generation (Planned) | models, pricing, guides |
| Models `/ai-models/` | hub + 9 model pages | chips that fit each model, pricing, core `/models/<id>` |
| Macs `/macs/` | hub + 20 chips (M1 to M6) | models each memory size can serve, earning |
| CPU `/cpu/` | 1 | workspaces, sandbox guide |
| Workspaces `/workspaces/` | hub + sessions, snapshots-and-recovery, model-calls, fleets, always-on-agents (Planned parts labelled) | CPU, sandbox guide |
| Earn `/earn/` | hub + how-it-works, safety-and-controls, earnings | Macs, make-money guide |
| Guides `/guides/` | hub + 9 guides | the money page for each topic |

Every page has breadcrumbs (BreadcrumbList), a "Keep reading" block and a CTA band for its audience. Model pages are at `/ai-models/` because the core site already owns `/models/<id>`.

## 6. AI-search plan

- `llms.txt` generated on every build with a one-paragraph summary, every model with price and status, the Planned list and every page grouped by section.
- Each page opens with a "Short answer" of 40 to 80 words that can be quoted on its own, and has an FAQ (FAQPage schema).
- One name everywhere: "Smarty Pants (smartypants.network), operated by Howcan, Inc." Organization and WebSite JSON-LD on every page.
- Every number has a source and a "checked" date.
- After going live: verify the domain in Google Search Console and Bing Webmaster Tools (Bing feeds ChatGPT search and Copilot), submit the sitemap, and use IndexNow on each deploy.
- Fix the core `/llms.txt` sign-up claim so AI answers don't repeat "$10 free credit".

## 7. 12-week content roadmap

| Weeks | Work |
|---|---|
| 1–2 | Go live (Worker or subdomain), Search Console + Bing, core-site fixes from the handoff |
| 3–4 | "Can my Mac run X?" pages: one per model × memory size (from the existing fit table) |
| 5–6 | Earnings calculator page for Mac owners (only once a pay rate after the first 50 is approved) |
| 7–8 | Model comparison pages for models we serve (e.g. Qwen3.5 9B vs gpt-oss-20b), using our own benchmarks |
| 9–10 | Short FAQ pages in the Exo style: electricity of local AI, is local AI cheaper than an API, MacBook vs Mac mini for AI |
| 11–12 | Refresh prices and benchmarks from the catalog; add pages for newly released models; review rankings and prune |

## 8. Going live without touching the core app

**Option A (recommended): subfolder via Cloudflare Worker.** smartypants.network DNS is already on Cloudflare. A Worker on routes `smartypants.network/inference/*`, `/ai-models/*`, `/macs/*`, `/guides/*`, `/earn/*`, `/cpu/*`, `/workspaces/*`, `/_astro/*`, `/seo-fonts/*`… fetches the same path from the Render site. Pages keep the main domain's authority. No gateway deploy. Code in `docs/core-site-handoff.md`.

**Option B: subdomain** `learn.smartypants.network` as a Render custom domain (CNAME in Cloudflare). Simplest, but a subdomain builds its own authority more slowly.

**Option C: gateway proxy.** Add a proxy in the Fastify gateway. Works, but touches the production app, so not recommended for now.

For any option: set `SITE_URL` to the public URL and `INDEXABLE=true` on Render, then redeploy.

## 9. Risks and claims

- Access wording: the core site disagrees with itself about who can sign up; this site says "opening in stages".
- Prices and status change: pages read from `src/data/catalog.json`; run `npm run refresh-catalog` before each deploy.
- Competitor prices quoted on some pages are dated and need a check before going live.
- Earnings examples ($30 a month gross at the intro offer, electricity math) need Nat's sign-off.
- The general network runs on other people's Macs; pages say not to send sensitive data.

## 10. Next actions

| Action | Owner |
|---|---|
| Approve the claims list in the report | Nat |
| Pick Option A or B and say when it's on a Smarty Pants domain | Nat |
| Add the Cloudflare Worker (or subdomain) | Nat, or Claude with Cloudflare access |
| Core-site fixes in `core-site-handoff.md` | Web app owner (Vlada / Damir) |
| Fill Ahrefs volume and KD columns | Nat (needs an Ahrefs account) |
| Weeks 3–12 content | Claude |
