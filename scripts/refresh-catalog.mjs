// Refreshes src/data/catalog.json from the live, public Smarty Pants catalog.
// Run by hand (npm run refresh-catalog), review the diff, then commit. The build never fetches,
// so a live outage can't change or break published pages.
import { writeFileSync } from 'node:fs';

const BASE = process.env.SP_BASE || 'https://smartypants.network';
const [pub, v1] = await Promise.all([
  fetch(`${BASE}/api/public/models`).then((r) => r.json()),
  fetch(`${BASE}/v1/models`).then((r) => r.json()),
]);
const byId = Object.fromEntries((v1.data || []).map((m) => [m.id, m]));
const keep = ['id', 'name', 'description', 'kind', 'contextTokens', 'maxOutputTokens', 'inputPricePerMillionUsd', 'outputPricePerMillionUsd', 'released'];
const models = (pub.models || []).map((m) => {
  const v = byId[m.id] || {};
  return {
    ...Object.fromEntries(keep.map((k) => [k, m[k] ?? null])),
    buildId: v.build_id ?? null,
    upstream: v.upstream_model_id ?? null,
    quantization: v.quantization ?? null,
    aliases: v.aliases ?? [],
    supportedParameters: v.supported_parameters ?? [],
    supportedFeatures: v.supported_features ?? [],
    embeddingDimensions: v.embedding_dimensions ?? null,
    licenseId: v.license?.id ?? null,
    licenseUrl: v.license?.url ?? null,
  };
});
const out = { checked: new Date().toISOString().slice(0, 10), source: `${BASE}/api/public/models and ${BASE}/v1/models`, models };
writeFileSync(new URL('../src/data/catalog.json', import.meta.url), JSON.stringify(out, null, 2) + '\n');
console.log(`catalog: ${models.length} models, checked ${out.checked}`);
