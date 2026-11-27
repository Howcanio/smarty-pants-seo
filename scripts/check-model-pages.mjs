// Checks that every live model has exactly one canonical page: the content site's /ai-models/<slug>/,
// with the app's /models/<id> pointing its canonical there and left out of sitemap-pages.xml.
// Run by hand or from a nightly check: node scripts/check-model-pages.mjs   (exit 1 on any problem)
const BASE = process.env.SP_BASE || 'https://smartypants.network';
const SKIP = new Set(['smartypants/ribt']); // no content-site page, same as src/data/models.ts
const slug = (id) => id.replace(/^smartypants\//, '').toLowerCase().replace(/\./g, '-');
const get = async (path) => { const r = await fetch(`${BASE}${path}`, { redirect: 'manual' }); return { status: r.status, body: await r.text() }; };
const canonicalOf = (html) => (html.match(/<link rel="canonical" href="([^"]+)"/) || [])[1] || null;

const v1 = JSON.parse((await get('/v1/models')).body).data || [];
const pub = JSON.parse((await get('/api/public/models')).body).models || [];
const ids = [...new Set([...v1.map((m) => m.id), ...pub.map((m) => m.id)])].filter((id) => !SKIP.has(id));
const seoMap = (await get('/_seo/sitemap.xml')).body;
const appMap = (await get('/sitemap-pages.xml')).body;
const problems = [];
for (const id of ids) {
  const guide = `/ai-models/${slug(id)}/`;
  const g = await get(guide);
  if (g.status !== 200) { problems.push(`${id}: ${guide} returns ${g.status}`); continue; }
  if (canonicalOf(g.body) !== `${BASE}${guide}`) problems.push(`${id}: ${guide} canonical is ${canonicalOf(g.body)}`);
  if (!seoMap.includes(`${BASE}${guide}<`)) problems.push(`${id}: ${guide} missing from /_seo/sitemap.xml`);
  const app = await get(`/models/${id}`);
  // A noindex app page (a model the app's own catalog doesn't list) can't compete in search, so it passes.
  const noindex = /<meta name="robots" content="[^"]*noindex/.test(app.body);
  if (!noindex && canonicalOf(app.body) !== `${BASE}${guide}`) problems.push(`${id}: /models/${id} canonical is ${canonicalOf(app.body)}, not ${guide}`);
  if (appMap.includes(`/models/${id}<`)) problems.push(`${id}: /models/${id} still in sitemap-pages.xml`);
}
console.log(`model pages: ${ids.length} models checked, ${problems.length} problem(s)`);
for (const p of problems) console.log(`  - ${p}`);
process.exit(problems.length ? 1 : 0);
