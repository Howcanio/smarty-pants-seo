# Handoff for the smartypants.network web app

For the web app owner. Checked 2026-11-09 against `Howcanio/smarty-pants` main and the live site. Nothing here has been changed in the core repo; each item is a suggested change for you to make and deploy.

## Why this matters

Search engines and AI crawlers read the HTML the server sends before any JavaScript runs. Today the gateway sends the same `apps/web/index.html` for every route, so Google sees one title ("See what your Mac could earn · Smarty Pants") and one description on `/api`, `/playground`, `/models/<id>`, `/for-teams` and every other page. `/robots.txt` and `/sitemap.xml` also return that HTML page (status 200, text/html).

## 1. Real robots.txt and sitemap.xml (small, do first)

In `apps/gateway/src/server.ts`, inside `if (existsSync(config.webDistPath)) { ... }`, before `app.setNotFoundHandler`:

```ts
const CONTENT_SITEMAP = "https://smartypants.network/_seo/sitemap.xml"; // only once the content site is live on this domain

app.get("/robots.txt", async (_request, reply) => {
  reply.type("text/plain").header("Cache-Control", "public, max-age=3600");
  return [
    "User-agent: *",
    "Disallow: /api/",
    "Disallow: /v1/",
    "Disallow: /operator",
    "Disallow: /computers",
    "Disallow: /my-group",
    "Allow: /",
    "",
    "Sitemap: https://smartypants.network/sitemap.xml",
    // Add this line when the content site is served from this domain:
    // `Sitemap: ${CONTENT_SITEMAP}`,
    "",
  ].join("\n");
});

const PUBLIC_PATHS = ["/", "/api", "/playground", "/network", "/for-teams", "/docs/agents", "/legal"];
app.get("/sitemap.xml", async (_request, reply) => {
  const models = await listPublicModelIdsForSitemap(); // see note below
  const urls = [...PUBLIC_PATHS, ...models.map((id) => `/models/${id}`)];
  reply.type("application/xml").header("Cache-Control", "public, max-age=3600");
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls.map((path) => `  <url><loc>https://smartypants.network${path}</loc></url>`),
    "</urlset>",
    "",
  ].join("\n");
});
```

`listPublicModelIdsForSitemap` should return the same model ids the public model list (`/api/public/models`) shows; reuse whatever function backs that route. Adjust `PUBLIC_PATHS` to the pages you want found. Keep signed-in pages out.

## 2. A real title, description and canonical per route

The SPA already has the right words in `modeMeta` (`apps/web/src/App.tsx` line 96) and sets them with JavaScript. Send them in the HTML too. In `server.ts`:

```ts
import { readFileSync } from "node:fs";
import { join } from "node:path";

const indexHtml = readFileSync(join(config.webDistPath, "index.html"), "utf8");
const escapeHtml = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// Keep in step with modeMeta in apps/web/src/App.tsx (or move that table to a shared file both import).
const ROUTE_META: Record<string, { title: string; description: string; noindex?: boolean }> = {
  "/": { title: "See what your Mac could earn", description: "Test an eligible Mac in seconds, then keep it available for useful AI work and clear monthly earnings." },
  "/api": { title: "Move one request and measure the difference", description: "Test Smarty Pants through the OpenAI-compatible API without replacing your current provider." },
  "/playground": { title: "Model Playground", description: "Discover open models and try them on shared Mac capacity." },
  "/network": { title: "The network, measured", description: "See real Smarty Pants capacity, completed work, speed, and launch readiness." },
  "/computers": { title: "Your Macs and earnings", description: "See what each connected Mac is doing and exactly what it has earned.", noindex: true },
  "/operator": { title: "Launch operations", description: "Review supply, model evidence, requests, invitations, and settlement controls.", noindex: true },
};

function renderShell(path: string, meta?: { title: string; description: string; noindex?: boolean }) {
  const m = meta ?? ROUTE_META[path] ?? ROUTE_META["/"];
  const canonical = `https://smartypants.network${path === "/" ? "/" : path.replace(/\/+$/, "")}`;
  const head = [
    `<title>${escapeHtml(m.title)} · Smarty Pants</title>`,
    `<meta name="description" content="${escapeHtml(m.description)}" />`,
    `<link rel="canonical" href="${canonical}" />`,
    m.noindex ? '<meta name="robots" content="noindex" />' : "",
    `<meta property="og:title" content="${escapeHtml(m.title)} · Smarty Pants" />`,
    `<meta property="og:description" content="${escapeHtml(m.description)}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    '<meta property="og:type" content="website" />',
  ].join("\n    ");
  return indexHtml
    .replace(/<title>[^<]*<\/title>/, "")
    .replace(/<meta name="description"[^>]*>/, "")
    .replace("</head>", `    ${head}\n  </head>`);
}
```

Then:

- Register static files with `index: false` so `/` also goes through the handler: `app.register(fastifyStatic, { root: config.webDistPath, prefix: "/", index: false })`.
- In `app.setNotFoundHandler` and in the `/agents` route, replace `reply.sendFile("index.html")` with:

```ts
const path = request.url.split("?")[0];
reply.type("text/html; charset=utf-8");
return reply.send(renderShell(path));
```

- For `/models/<id>`, pass the model's own title: `renderShell(path, { title: model.name, description: model.description })`, looking the model up from the same data as `/api/public/models`.
- Unknown paths: send the shell with status 404 (`reply.code(404)`) unless the path is a real SPA route, so typos don't get indexed as copies of the home page.

## 3. Organization and WebSite structured data

Add to the `<head>` of `apps/web/index.html` (the content site uses the same identity):

```html
<script type="application/ld+json">{"@context":"https://schema.org","@graph":[{"@type":"Organization","@id":"https://smartypants.network/#organization","name":"Smarty Pants","url":"https://smartypants.network/","logo":"https://smartypants.network/brand/smarty-pants-icon.png","email":"info@howcan.io","parentOrganization":{"@type":"Organization","name":"Howcan, Inc."},"sameAs":["https://huggingface.co/smartypantsnet"]},{"@type":"WebSite","@id":"https://smartypants.network/#website","url":"https://smartypants.network/","name":"Smarty Pants","publisher":{"@id":"https://smartypants.network/#organization"}}]}</script>
```

Check the site's Content-Security-Policy allows `application/ld+json` script tags (it is data, not executed, so most policies are fine). If it blocks inline scripts of every type, inject it from `renderShell` instead.

## 4. Fix the sign-up wording in /llms.txt and /docs/agents

`apps/gateway/src/agentDocs.ts` (line ~334 serves `/llms.txt`) says anyone can sign up and gets $10 free credit. `/network` says prelaunch is closed to public traffic and `/legal` says invitation-only. AI assistants quote `/llms.txt` directly. Please make them agree. The content site uses: "Smarty Pants is opening in stages. You can see the models, prices and code today; sign in with your email on smartypants.network/api to get a key."

## 5. Serve the content site under smartypants.network

The content site lives on Render (this repo). None of its folders are used by the web app (checked: `/inference/`, `/ai-models/`, `/macs/`, `/guides/`, `/earn/`, `/cpu/`, `/workspaces/` all fall through to the SPA shell today). Its files and fonts are under `/_seo/`, so nothing collides with the app's `/fonts/` or `/brand/`.

### Option A (recommended): Cloudflare Worker, no app change

DNS for smartypants.network is on Cloudflare. Create a Worker with this code:

```js
// Sends the content site's folders to the Render static site; everything else goes to the app as before.
const ORIGIN = "https://smarty-pants-seo.onrender.com";
export default {
  async fetch(request) {
    const url = new URL(request.url);
    const target = new URL(url.pathname + url.search, ORIGIN);
    const response = await fetch(target, { method: request.method, headers: { Accept: request.headers.get("Accept") || "*/*" }, redirect: "manual" });
    const headers = new Headers(response.headers);
    const location = headers.get("Location");
    if (location) headers.set("Location", location.replace(ORIGIN, url.origin));
    return new Response(response.body, { status: response.status, headers });
  },
};
```

Add Worker routes (Workers & Pages → the Worker → Settings → Domains & Routes), one per line:

```
smartypants.network/inference*
smartypants.network/ai-models*
smartypants.network/macs*
smartypants.network/guides*
smartypants.network/earn*
smartypants.network/cpu*
smartypants.network/workspaces*
smartypants.network/_seo/*
```

Then on Render (the content site's settings): set `SITE_URL=https://smartypants.network` and, when Nat says go, `INDEXABLE=true`, and redeploy. Add the `Sitemap: https://smartypants.network/_seo/sitemap.xml` line to the app's robots.txt (item 1).

Free Workers plans include 100,000 requests a day; check the account's plan before relying on it.

### Option B: subdomain

Add `learn.smartypants.network` as a custom domain on the Render static site, then a CNAME in Cloudflare from `learn` to `smarty-pants-seo.onrender.com` (DNS only, not proxied, until Render issues the certificate). Set `SITE_URL=https://learn.smartypants.network`. Simpler, but the pages don't share the main domain's ranking as directly.

### Option C: gateway proxy

Possible with `@fastify/http-proxy` for the same prefixes, but it changes the production app, so prefer A.

## 6. Small things

- Add `<meta property="og:image">` with a 1200×630 image to `index.html` (the content site's is at `/_seo/og.png`).
- After going live: verify the domain in Google Search Console and Bing Webmaster Tools, submit both sitemaps.
- On 2026-11-08 the rendered footer had a "Mac owner agreement" link to `/legal/owner-terms` (an empty page; the working page is `/legal/node-operator`). The current repo no longer contains `owner-terms`, so this may already be fixed by the next deploy; please check the live footer.
