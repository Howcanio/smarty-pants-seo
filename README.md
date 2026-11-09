# smarty-pants-seo

The search and AI-search content site for [Smarty Pants](https://smartypants.network): pages about the inference API, every model, every Apple silicon chip, CPU jobs, agent workspaces, earning with a Mac, and guides. It is a separate static Astro site; it does not touch the Smarty Pants app, gateway or database.

## Commands

```
npm ci
npm run dev              # local preview at http://localhost:4321
npm run build            # astro build + SEO checks (fails on errors)
npm run refresh-catalog  # update src/data/catalog.json from the live model list
```

`npm run build` runs `scripts/postbuild.mjs`, which fails the build on broken internal links, missing or duplicate titles and descriptions, wrong canonicals, a page without exactly one `<h1>`, or an indexable page while indexing is off. It then writes `sitemap.xml`, `_seo/sitemap.xml` (without the home page), `robots.txt` and `llms.txt`.

## Environment

| Variable | Default | What it does |
|---|---|---|
| `SITE_URL` | `RENDER_EXTERNAL_URL`, then `https://smartypants.network` | Origin used for canonicals, sitemap and Open Graph URLs |
| `INDEXABLE` | off | Only `true` lets search engines index. Off: every page is `noindex` and robots.txt disallows everything |
| `BUYER_CTA_URL` | `https://smartypants.network/api` | Where "Get an API key" buttons go |
| `OWNER_CTA_URL` | `https://smartypants.network/#smart-check` | Where "Check my Mac" buttons go |

## Deploy

Render static site: build `npm ci && npm run build`, publish `dist`, env `SITE_URL` = the onrender URL and `INDEXABLE=false` until the pages are served from a Smarty Pants domain.

## Where things are

- `docs/seo-plan.md`: the plan (demand, competitors, URL map, AI search, roadmap, going live)
- `docs/core-site-handoff.md`: changes for the smartypants.network web app
- `docs/keywords.csv`: keyword research from Google autocomplete
- `docs/allowed-claims.md`: the only facts pages may state; `docs/content-brief.md`: voice and page rules
- `src/data/`: catalog snapshot, model facts, chip specs, site settings
- `src/pages/`: Astro and Markdown pages; static files live under `public/_seo/` so they don't collide with the app's paths
