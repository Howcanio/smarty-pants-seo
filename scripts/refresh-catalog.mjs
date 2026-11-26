// Refreshes src/data/catalog.json from the live, public Smarty Pants catalog.
// Run by hand (npm run refresh-catalog), review the diff, then commit. The build never fetches,
// so a live outage can't change or break published pages.
// /v1/models is the full list (every listed model, ready or not). /api/public/models only lists
// models some Mac can serve right now, so it is used just to fill in fields; a model missing from
// both keeps its last entry instead of losing its page.
import { readFileSync, writeFileSync } from 'node:fs';

const BASE = process.env.SP_BASE || 'https://smartypants.network';
const file = new URL('../src/data/catalog.json', import.meta.url);
const [pub, v1] = await Promise.all([
  fetch(`${BASE}/api/public/models`).then((r) => r.json()).catch(() => ({ models: [] })),
  fetch(`${BASE}/v1/models`).then((r) => r.json()),
]);
if (!Array.isArray(v1.data) || v1.data.length === 0) throw new Error('/v1/models returned no models; not touching catalog.json');
const pubById = Object.fromEntries((pub.models || []).map((m) => [m.id, m]));
const old = JSON.parse(readFileSync(file, 'utf8'));
const oldById = Object.fromEntries(old.models.map((m) => [m.id, m]));

const fromV1 = (v) => {
  const p = pubById[v.id] || {};
  const prev = oldById[v.id] || {};
  return {
    id: v.id,
    name: p.name ?? v.name ?? prev.name ?? null,
    description: p.description ?? v.description ?? prev.description ?? null,
    kind: p.kind ?? v.kind ?? prev.kind ?? null,
    contextTokens: p.contextTokens ?? v.context_length ?? prev.contextTokens ?? null,
    maxOutputTokens: p.maxOutputTokens ?? v.max_completion_tokens ?? prev.maxOutputTokens ?? null,
    inputPricePerMillionUsd: p.inputPricePerMillionUsd ?? v.pricing?.input ?? prev.inputPricePerMillionUsd ?? null,
    outputPricePerMillionUsd: p.outputPricePerMillionUsd ?? v.pricing?.output ?? prev.outputPricePerMillionUsd ?? null,
    released: p.released ?? (v.status === 'active' ? true : prev.released ?? false),
    buildId: v.build_id ?? null,
    upstream: v.upstream_model_id ?? null,
    quantization: v.quantization ?? null,
    aliases: v.aliases ?? [],
    supportedParameters: v.supported_parameters ?? [],
    supportedFeatures: v.supported_features ?? [],
    embeddingDimensions: v.embedding_dimensions ?? null,
    licenseId: v.license?.id ?? null,
    licenseUrl: v.license?.url ?? null,
    // Live speed and the playground flag only come from /api/public/models, and only for models a Mac
    // can serve now. Never carried over from an older refresh: a stale speed is worse than none.
    tokensPerSecond: p.tokensPerSecond ?? null,
    firstTokenMs: p.firstTokenMs ?? null,
    playgroundReady: p.playgroundReady ?? false,
  };
};
const live = v1.data.map(fromV1);
const liveIds = new Set(live.map((m) => m.id));
const kept = old.models.filter((m) => !liveIds.has(m.id));
const models = [...live, ...kept];
const out = { checked: new Date().toISOString().slice(0, 10), source: `${BASE}/v1/models (plus ${BASE}/api/public/models)`, models };
writeFileSync(file, JSON.stringify(out, null, 2) + '\n');
console.log('Reminder: re-check ONLY_HOSTED in src/data/models.ts (Hugging Face router and OpenRouter) before committing.');
console.log(`catalog: ${live.length} from /v1/models, ${kept.length} kept from before (${kept.map((m) => m.id).join(', ') || 'none'}), checked ${out.checked}`);
