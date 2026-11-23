import catalog from './catalog.json';
import facts from './modelFacts.json';

/** Models that are in the catalog but not on this site (see docs/allowed-claims.md). */
const SKIP = new Set(['smartypants/ribt']);

type Fact = {
  developer: string | null; upstreamRepo: string; params: string | null; activeParams: string | null;
  architecture: string | null; nativeContext: string | null; released: string | null; license: string | null;
  strengths: string | null; uniqueFact: string | null; sources: { label: string; url: string }[];
};

type Extra = {
  slug: string; short: string; kindLabel: string; endpoint: string; served: string;
  priceText?: string; bench?: { text: string; date: string };
  useFor: string[]; avoidFor: string[];
};

export const BENCH_URL = 'https://huggingface.co/datasets/smartypantsnet/mac-benchmarks';

/** Per-model notes written for this site. Plain-language "what it does" lines match smartypants.network/api. */
const EXTRA: Record<string, Extra> = {
  'smartypants/qwen3.5-9b': {
    slug: 'qwen3-5-9b', short: 'Everyday chat, writing and simple code.', kindLabel: 'Chat', endpoint: 'POST /v1/chat/completions', served: '4-bit MLX',
    useFor: ['Summaries, extraction and classification', 'Drafting and rewriting', 'Tool calls and JSON output on short inputs'],
    avoidFor: ['Inputs longer than 16,384 tokens', 'Work that needs a frontier-size model'],
  },
  'smartypants/qwen3.5-4b': {
    slug: 'qwen3-5-4b', short: 'Quick everyday chat and short answers.', kindLabel: 'Chat', endpoint: 'POST /v1/chat/completions', served: '4-bit MLX',
    bench: { text: 'The standard 4-bit build Smarty Pants serves ran at 99.7 tokens a second with 4.13 GB peak memory on an Apple M5 Pro Mac mini with 64 GB, and answered 89.0% of 500 GSM8K math problems correctly with thinking off.', date: '2026-11-05' },
    useFor: ['Short answers and classification', 'High-volume, simple text tasks'],
    avoidFor: ['Inputs longer than 8,192 tokens', 'Multi-step reasoning and harder code'],
  },
  'smartypants/qwen3.8-27b': {
    slug: 'qwen3-8-27b', short: 'Strong chat, writing and coding.', kindLabel: 'Chat', endpoint: 'POST /v1/chat/completions', served: '3.8-bit MLX',
    bench: { text: 'A standard 4-bit build ran at 35.7 tokens a second with 18.26 GB peak memory (4,096-token prompt) on an Apple M5 Pro Mac mini. Smarty Pants now serves a smaller 3.8-bit build.', date: '2026-11-02' },
    useFor: ['Writing and editing that needs more care', 'Coding help', 'Agent steps with tool calls'],
    avoidFor: ['Inputs longer than 16,384 tokens', 'Latency-critical chat (it is slower than the small models)'],
  },
  'smartypants/nanbeige4.3-33b': {
    slug: 'nanbeige4-3-33b', short: 'Strong chat, writing and coding.', kindLabel: 'Chat', endpoint: 'POST /v1/chat/completions', served: '4-bit MLX',
    useFor: ['Agent-style coding and multi-turn tool use', 'English and Chinese text work'],
    avoidFor: ['Inputs longer than 16,384 tokens', 'Image input (text only)'],
  },
  'smartypants/qwen3.6-35b-a3b': {
    slug: 'qwen3-6-35b-a3b', short: 'Strong chat, writing and coding.', kindLabel: 'Chat', endpoint: 'POST /v1/chat/completions', served: '4-bit MLX',
    bench: { text: 'A standard 4-bit build ran at 61.4 tokens a second with 21.52 GB peak memory on an Apple M3 Max MacBook Pro with 36 GB, one request at a time (193 tokens a second in total with 8 at once). Speed only; no quality test yet.', date: '2026-09-08' },
    useFor: ['Coding and agent work where speed matters', 'Longer answers at a mid-range price'],
    avoidFor: ['Inputs longer than 16,384 tokens'],
  },
  'smartypants/gpt-oss-20b': {
    slug: 'gpt-oss-20b', short: 'Strong chat, writing and coding.', kindLabel: 'Chat', endpoint: 'POST /v1/chat/completions', served: '4-bit MLX',
    useFor: ['Reasoning and tool use at a low listed price', 'Structured output'],
    avoidFor: ['Inputs longer than 16,384 tokens'],
  },
  'smartypants/qwen3-embedding-0.6b': {
    slug: 'qwen3-embedding-0-6b', short: 'Turns text into numbers for search and matching.', kindLabel: 'Embeddings', endpoint: 'POST /v1/embeddings', served: '4-bit MLX',
    useFor: ['Semantic search and retrieval (RAG)', 'Deduplication, clustering and matching'],
    avoidFor: ['Texts longer than 8,192 tokens per input'],
  },
  'smartypants/whisper-large-v3-turbo': {
    slug: 'whisper-large-v3-turbo', short: 'Turns recordings into text.', kindLabel: 'Speech to text', endpoint: 'POST /v1/audio/transcriptions', served: 'Core ML',
    priceText: 'about $0.011 an hour of audio',
    useFor: ['Transcribing calls, meetings and voice notes', 'Files up to 30 minutes or 25 MB'],
    avoidFor: ['Files over 30 minutes or 25 MB (split them first)', 'Live, word-by-word captions'],
  },
  'smartypants/flux.1-schnell': {
    slug: 'flux-1-schnell', short: 'Makes pictures from a description.', kindLabel: 'Image making', endpoint: 'Image generation (request format in the docs at launch)', served: '8-bit MLX',
    priceText: '$0.003 a picture',
    useFor: ['Illustrations, mockups and concept images', 'Up to 4 images up to 1536×1024 per request'],
    avoidFor: ['Sexual or nude images of real people, or fakes meant to fool people about real people (not allowed by the use rules)', 'Anything that must not be labeled as AI-made'],
  },
  'smartypants/arete-27b': {
    slug: 'arete-27b', short: 'Strong chat, writing and agent work.', kindLabel: 'Chat', endpoint: 'POST /v1/chat/completions', served: '4-bit MLX',
    bench: { text: 'The 4-bit build Smarty Pants serves answered 94.3% of 300 GSM8K math problems correctly (thinking off) at 35.5 tokens a second with 18.26 GB peak memory on an Apple M5 Pro Mac mini with 64 GB.', date: '2026-11-09' },
    useFor: ['General assistance and agent steps with tool calls', 'Writing and analysis where you want its changed framing on political topics'],
    avoidFor: ['Inputs longer than 16,384 tokens', 'Latency-critical chat (it is slower than the small models)'],
  },
  'smartypants/axion-1.0-35b': {
    slug: 'axion-1-0-35b', short: 'Reasoning, research and tool use.', kindLabel: 'Chat', endpoint: 'POST /v1/chat/completions', served: '4-bit MLX',
    bench: { text: 'The 4-bit build Smarty Pants serves answered 92.3% of 300 GSM8K math problems correctly (thinking off) at 74.7 tokens a second with 21.09 GB peak memory on an Apple M5 Pro Mac mini with 64 GB.', date: '2026-11-11' },
    useFor: ['Scientific and multi-step reasoning', 'Agent work with tools and information seeking', 'Fast answers from a larger model (about 3B active)'],
    avoidFor: ['Inputs longer than 16,384 tokens'],
  },
  'smartypants/muse-glimmer-30b': {
    slug: 'muse-glimmer-30b', short: 'Agent work, tool use and many languages.', kindLabel: 'Chat', endpoint: 'POST /v1/chat/completions', served: '4-bit MLX',
    bench: { text: 'A 4-bit build answered 90.7% of 300 GSM8K math problems correctly (thinking off) at 17.5 tokens a second with 15.98 GB peak memory on an Apple M5 Pro Mac mini with 64 GB.', date: '2026-11-10' },
    useFor: ['Multi-step agent tasks with tool calls', 'Text work in many languages'],
    avoidFor: ['Inputs longer than 16,384 tokens', 'Image input (Smarty Pants serves it for text only)', 'Latency-critical chat'],
  },
  'smartypants/qwen3-reranker-0.6b': {
    slug: 'qwen3-reranker-0-6b', short: 'Puts the best search results first.', kindLabel: 'Reranking', endpoint: 'POST /v1/rerank', served: 'bf16',
    priceText: '$0.0095 per million input tokens',
    useFor: ['Reordering search or retrieval (RAG) results by how well they answer a query', 'Picking the top few documents before a chat model reads them'],
    avoidFor: ['Turning text into vectors (use the embeddings model)', 'Generating text'],
  },
  'smartypants/wan2.2-5b-video': {
    slug: 'wan2-2-5b-video', short: 'Makes short video clips from a description.', kindLabel: 'Video', endpoint: 'POST /v1/videos', served: 'bf16',
    priceText: '$0.0125 a 480p clip',
    useFor: ['Short 2, 3 or 5 second clips at 480p (832x480 or 480x832)', 'Concept and mood clips'],
    avoidFor: ['Long or high-resolution video', 'Sexual or nude content of real people, or fakes meant to fool people about real people (not allowed by the use rules)', 'Anything that must not be labeled as AI-made'],
  },
};

const money = (n: number) => {
  // Exact listed rate, never rounded (gpt-oss-20b output is $0.135, not $0.14); at least 2 decimals.
  const [whole, frac = ''] = String(Number(n.toFixed(6))).split('.');
  return `$${whole}.${frac.padEnd(2, '0')}`;
};

export const MODELS = catalog.models
  .filter((m) => !SKIP.has(m.id) && EXTRA[m.id])
  .map((m) => {
    const x = EXTRA[m.id];
    const f = (facts as Record<string, Fact>)[m.id];
    const minMemoryGB = Number((m.description.match(/(\d+) GB\+/) || [])[1] || 16);
    const shortName = m.name.replace(/ \(Smarty Pants\)$/, '');
    const priceText =
      x.priceText ??
      (m.kind === 'embedding'
        ? `${money(m.inputPricePerMillionUsd)} per million input tokens`
        : `${money(m.inputPricePerMillionUsd)} per million input tokens, ${money(m.outputPricePerMillionUsd)} per million output tokens`);
    const status: 'released' | 'testing' = m.released ? 'released' : 'testing';
    return { ...m, ...x, facts: f, shortName, minMemoryGB, priceText, status };
  })
  .sort((a, b) => Number(b.released) - Number(a.released) || a.minMemoryGB - b.minMemoryGB);

export type Model = (typeof MODELS)[number];
export const modelHref = (m: { slug: string }) => `/ai-models/${m.slug}/`;
export const CATALOG_CHECKED = catalog.checked;
export const MEMORY_TIERS = [...new Set(MODELS.map((m) => m.minMemoryGB))].sort((a, b) => a - b);
