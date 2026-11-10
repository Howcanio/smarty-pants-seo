// Runs after `astro build`: checks every page's SEO basics and internal links,
// then writes sitemap.xml, robots.txt and llms.txt into dist/.
// Exits non-zero on broken internal links, missing/duplicate titles or descriptions, bad canonicals,
// a page without exactly one <h1>, or an indexable robots tag while INDEXABLE is off, so a bad build never deploys.
import { readdirSync, readFileSync, writeFileSync, existsSync, statSync, mkdirSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { API_ACCESS, API_ACCESS_TEXT, MAC_ACCESS_TEXT, PRIVACY_TEXT } from '../src/data/access.mjs';

const DIST = fileURLToPath(new URL('../dist/', import.meta.url));
const SITE = (process.env.SITE_URL || process.env.RENDER_EXTERNAL_URL || 'https://smartypants.network').replace(/\/+$/, '');
const INDEXABLE = process.env.INDEXABLE === 'true';
const LASTMOD = new Date().toISOString().slice(0, 10);
const catalog = JSON.parse(readFileSync(new URL('../src/data/catalog.json', import.meta.url), 'utf8'));

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });
}
const decode = (s) =>
  s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&#x27;/g, "'");
const first = (html, re) => {
  const m = html.match(re);
  return m ? decode(m[1].trim()) : '';
};

const files = walk(DIST).filter((f) => f.endsWith('.html'));
const pages = files.map((file) => {
  const html = readFileSync(file, 'utf8');
  const rel = relative(DIST, file).split(sep).join('/');
  const path = rel === 'index.html' ? '/' : '/' + rel.replace(/index\.html$/, '').replace(/\.html$/, '');
  return {
    path,
    html,
    title: first(html, /<title>([^<]*)<\/title>/),
    description: first(html, /<meta name="description" content="([^"]*)"/),
    canonical: first(html, /<link rel="canonical" href="([^"]*)"/),
    robots: first(html, /<meta name="robots" content="([^"]*)"/),
    h1s: (html.match(/<h1[\s>]/g) || []).length,
    links: [...html.matchAll(/href="(\/[^"#?]*)/g)].map((m) => m[1]).filter((h) => !h.startsWith('//')),
  };
});

const errors = [];
const warnings = [];
const seenTitles = new Map();
const seenDescriptions = new Map();

for (const p of pages) {
  if (!INDEXABLE && !/noindex/.test(p.robots)) errors.push(`${p.path}: robots is "${p.robots}" but INDEXABLE is off`);
  if (p.path === '/404') continue;
  if (!p.title) errors.push(`${p.path}: missing <title>`);
  if (!p.description) errors.push(`${p.path}: missing meta description`);
  if (p.h1s !== 1) errors.push(`${p.path}: expected 1 <h1>, found ${p.h1s}`);
  if (p.canonical !== SITE + p.path) errors.push(`${p.path}: canonical is ${p.canonical || 'missing'}`);
  if (p.title.length > 70) warnings.push(`${p.path}: title is ${p.title.length} chars`);
  if (p.description && (p.description.length < 100 || p.description.length > 170))
    warnings.push(`${p.path}: description is ${p.description.length} chars`);
  if (seenTitles.has(p.title)) errors.push(`${p.path}: duplicate title with ${seenTitles.get(p.title)}`);
  seenTitles.set(p.title, p.path);
  if (seenDescriptions.has(p.description)) errors.push(`${p.path}: duplicate description with ${seenDescriptions.get(p.description)}`);
  seenDescriptions.set(p.description, p.path);
  if (/\bpilot\b/i.test(p.html.replace(/<[^>]+>/g, ' '))) warnings.push(`${p.path}: uses the word "pilot"`);
}

const GENERATED = new Set(['/llms.txt', '/sitemap.xml', '/robots.txt', '/_seo/sitemap.xml']);
const exists = (href) => {
  if (GENERATED.has(href)) return true;
  const target = join(DIST, decodeURIComponent(href));
  if (existsSync(target) && statSync(target).isFile()) return true;
  return existsSync(join(target, 'index.html'));
};
for (const p of pages) {
  for (const href of new Set(p.links)) {
    if (!exists(href)) errors.push(`${p.path}: broken internal link ${href}`);
    else if (!href.endsWith('/') && !/\.[a-z0-9]+$/i.test(href)) warnings.push(`${p.path}: link without trailing slash ${href}`);
  }
}

const indexable = pages.filter((p) => p.path !== '/404').sort((a, b) => a.path.localeCompare(b.path));
const sitemap = (list) =>
  [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...list.map((p) => `  <url><loc>${SITE}${p.path}</loc><lastmod>${LASTMOD}</lastmod></url>`),
    '</urlset>',
    '',
  ].join('\n');
writeFileSync(join(DIST, 'sitemap.xml'), sitemap(indexable));
// When these pages are served as folders of the main site (the core app owns "/"), the main
// site's robots.txt points at this sitemap, which leaves out the home page.
mkdirSync(join(DIST, '_seo'), { recursive: true });
writeFileSync(join(DIST, '_seo', 'sitemap.xml'), sitemap(indexable.filter((p) => p.path !== '/')));

writeFileSync(
  join(DIST, 'robots.txt'),
  INDEXABLE
    ? `# AI search and assistants are welcome.\n${['OAI-SearchBot', 'ChatGPT-User', 'GPTBot', 'Claude-SearchBot', 'Claude-User', 'ClaudeBot', 'PerplexityBot', 'Perplexity-User', 'Google-Extended', '*'].map((a) => `User-agent: ${a}`).join('\n')}\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`
    : `# Staging copy: kept out of search until it is served from a Smarty Pants domain.\nUser-agent: *\nDisallow: /\n`
);

const section = (prefix) => indexable.filter((p) => p.path.startsWith(prefix));
const line = (p) => `- [${p.title.replace(/ \| Smarty Pants$/, '')}](${SITE}${p.path}): ${p.description}`;
const models = catalog.models.filter((m) => m.id !== 'smartypants/ribt');
const price = (m) =>
  m.kind === 'speech_to_text' ? '$0.18 an hour of audio' : m.kind === 'image_generation' ? '$0.003 a picture'
  : m.kind === 'embedding' ? `$${m.inputPricePerMillionUsd} per million input tokens`
  : `$${m.inputPricePerMillionUsd} per million input tokens, $${m.outputPricePerMillionUsd} per million output tokens`;
const llms = [
  '# Smarty Pants',
  '',
  '> Smarty Pants (smartypants.network) is a distributed inference network powered by independently owned Macs. It runs pinned, quantized builds (named in /v1/models) of upstream open-weight AI models on idle Apple silicon Macs that owners make available. Developers call them through an OpenAI-compatible API at https://smartypants.network/v1 and pay per token; you are not charged for a request Smarty Pants cannot serve. Mac owners with an Apple silicon Mac with 16 GB or more get paid for the hours their Mac is ready; during the intro offer they earn up to $1/day per eligible Mac (first 50 Macs, US only). ' + API_ACCESS_TEXT[API_ACCESS] + ' ' + MAC_ACCESS_TEXT + ' ' + PRIVACY_TEXT + ' Operated by Howcan, Inc. Contact: info@howcan.io.',
  '',
  `## Models (listed on ${catalog.checked}; the live list with prices and is_ready is GET https://smartypants.network/v1/models)`,
  ...models.map((m) => `- \`${m.id}\`: ${m.name.replace(/ \(Smarty Pants\)$/, '')}; ${price(m)}; ${m.released ? 'released' : 'in testing, opens soon'}; ${m.description}`),
  '',
  '## Planned (not available yet)',
  '- Agent workspace snapshots and recovery, model calls from inside workspaces, fleets and browser work, always-on agents, filtered internet access for workspaces, a CLI and SDK for workspaces.',
  '- Video generation.',
  '- Sandboxed CPU jobs and single workspaces run on Smarty Pants\' own account first; other accounts get a 403 until they open.',
  '',
  '## For developers',
  ...section('/inference/').map(line),
  ...section('/cpu/').map(line),
  ...section('/workspaces/').map(line),
  '',
  '## Models',
  ...section('/ai-models/').map(line),
  '',
  '## For Mac owners',
  ...section('/earn/').map(line),
  '',
  '## Macs (Apple silicon chips and which models each memory size can serve)',
  ...section('/macs/').map(line),
  '',
  '## Guides',
  ...section('/guides/').map(line),
  '',
  '## Product',
  '- [API key and quickstart](https://smartypants.network/api)',
  '- [Agent kit and docs](https://smartypants.network/docs/agents)',
  '- [Product llms.txt](https://smartypants.network/llms.txt)',
  '- [Mac benchmarks](https://huggingface.co/datasets/smartypantsnet/mac-benchmarks): speed and quality measured on real Macs',
  '- [Legal and trust](https://smartypants.network/legal)',
  '',
].join('\n');
writeFileSync(join(DIST, 'llms.txt'), llms);

for (const w of warnings) console.warn(`warn  ${w}`);
for (const e of errors) console.error(`error ${e}`);
console.log(`postbuild: ${indexable.length} pages, ${errors.length} errors, ${warnings.length} warnings, indexable=${INDEXABLE}, site=${SITE}`);
if (errors.length) process.exit(1);
