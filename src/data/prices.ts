// Every Smarty Pants product price next to the entry-level price for the same thing elsewhere.
// Rule (Nat, 19 Nov 2026): give away the entry points (your own and your Group's Macs) and price paid use
// at 95-100% of the entry-level price in its space. We use 95%.
// "Entry" means the cheapest listed seller we could find for the same model or the same kind of machine,
// on the date shown. Competitor prices change often: every row names its source and date.

export const PRICES_CHECKED = '2026-11-19';
export const PRICES_CHECKED_LABEL = 'November 19, 2026';

export type Source = { label: string; url: string };

const OR = (slug: string): Source => ({ label: `OpenRouter sellers for ${slug}, 19 Nov 2026`, url: `https://openrouter.ai/${slug}` });

/** Models that other providers also sell, compared with the cheapest seller (per million tokens unless noted). */
export const MODEL_ENTRY: {
  id: string; name: string; ours: string; entry: string; entrySeller: string; share: string; source: Source;
}[] = [
  { id: 'smartypants/qwen3.5-9b', name: 'Qwen3.5 9B', ours: '$0.076 in / $0.114 out', entry: '$0.08 / $0.12', entrySeller: 'DeepInfra', share: '95%', source: OR('qwen/qwen3.5-9b') },
  { id: 'smartypants/qwen3.8-27b', name: 'Qwen3.8 27B', ours: '$0.037 / $1.19', entry: '$0.039 / $1.25', entrySeller: 'Chutes', share: '95%', source: OR('qwen/qwen3.8-27b') },
  { id: 'smartypants/qwen3.6-35b-a3b', name: 'Qwen3.6 35B-A3B', ours: '$0.048 / $0.665', entry: '$0.05 / $0.70', entrySeller: 'Darkbloom', share: '95%', source: OR('qwen/qwen3.6-35b-a3b') },
  { id: 'smartypants/gpt-oss-20b', name: 'gpt-oss-20b', ours: '$0.0171 / $0.0855', entry: '$0.018 / $0.09', entrySeller: 'Darkbloom, AkashML', share: '95%', source: OR('openai/gpt-oss-20b') },
  { id: 'smartypants/muse-glimmer-30b', name: 'Muse Glimmer 30B', ours: '$0.285 / $1.14', entry: '$0.30 / $1.20', entrySeller: 'DeepInfra, ModelRun', share: '95%', source: OR('meta/muse-glimmer-30b') },
  { id: 'smartypants/qwen3-reranker-0.6b', name: 'Qwen3 Reranker 0.6B', ours: '$0.0095 in', entry: '$0.01 in', entrySeller: 'DeepInfra (9 Nov)', share: '95%', source: { label: 'DeepInfra model page, 9 Nov 2026', url: 'https://deepinfra.com/Qwen/Qwen3-Reranker-0.6B' } },
  { id: 'smartypants/whisper-large-v3-turbo', name: 'Whisper large-v3 turbo', ours: 'about $0.011 an hour of audio', entry: '$0.012 an hour ($0.0002 a minute)', entrySeller: 'DeepInfra', share: '95%', source: { label: 'computeprices.com, Whisper v3 turbo, updated 19 Nov 2026', url: 'https://computeprices.com/providers/groq/models/whisper-v3-turbo' } },
  { id: 'smartypants/wan2.2-5b-video', name: 'Wan 2.2 5B video, 480p clip', ours: '$0.011 a clip', entry: 'about $0.0113 a clip (half of $0.0225 for 720p)', entrySeller: 'DeepInfra', share: '98%', source: { label: 'DeepInfra FastWan 2.2 5B, 19 Nov 2026', url: 'https://deepinfra.com/FastVideo/FastWan2.2-TI2V-5B-FullAttn-Diffusers/api' } },
  { id: 'smartypants/flux.1-schnell', name: 'FLUX.1 schnell picture', ours: '$0.003 a picture', entry: 'about $0.003 to $0.005 a picture', entrySeller: 'fal (reported)', share: 'about 100%', source: { label: 'DEV Community: Flux AI pricing 2026 (rates as of June 2026)', url: 'https://dev.to/techsifted/flux-ai-pricing-2026-api-costs-hosted-platform-rates-and-free-options-1ol1' } },
];

/** Models nobody else sells yet: priced at the market rate of the nearest comparable model. */
export const UNIQUE_MODELS = [
  { name: 'Arete 27B', ours: '$0.20 / $1.20', note: 'No other seller found on 19 Nov 2026; priced like a 27B chat model.' },
  { name: 'Axion 1.0 35B', ours: '$0.09 / $0.80', note: 'No other seller found; priced like its 35B-A3B base at launch.' },
  { name: 'Nanbeige4.3 33B', ours: '$0.30 / $2.00', note: 'No other seller found.' },
  { name: 'Qwen3 Embedding 0.6B', ours: '$0.01 in', note: 'No current seller price verified.' },
  { name: 'Qwen3.5 4B', ours: '$0.10 / $0.25', note: 'In testing.' },
];

const FLY: Source = { label: 'Fly.io: AI sandbox pricing compared (published 9 Sep 2026, prices checked 5 Oct 2026)', url: 'https://fly.io/learn/ai-sandbox-pricing/' };
const NORTHFLANK: Source = { label: 'Northflank: AI sandbox pricing (5 May 2026)', url: 'https://northflank.com/blog/ai-sandbox-pricing' };

/** Our workspace and code-run price, and the same 2 vCPU / 2 GB machine elsewhere, per hour. */
export const SANDBOX_ROWS: {
  name: string; vcpuHour: string; gibHour: string; twoByTwo: number; free: string; source: Source; ours?: boolean;
}[] = [
  { name: 'Smarty Pants workspace', vcpuHour: '$0.0043', gibHour: '$0.00215', twoByTwo: 0.0129, free: '$10 starter credit for 90 days; free on your own and your Group\'s Macs', source: { label: 'Smarty Pants: GET /v1/prices/workspaces', url: 'https://smartypants.network/v1/prices/workspaces' }, ours: true },
  { name: 'boat', vcpuHour: '$0.0045', gibHour: '$0.00225', twoByTwo: 0.0135, free: 'Not checked', source: { label: 'boat.dev pricing, as compared in GET /v1/prices/workspaces (8 Nov 2026)', url: 'https://smartypants.network/v1/prices/workspaces' } },
  { name: 'Northflank', vcpuHour: '$0.01667', gibHour: '$0.00833', twoByTwo: 0.05, free: 'None stated', source: NORTHFLANK },
  { name: 'Fly.io Sprites', vcpuHour: '$0.0385', gibHour: '$0.021875', twoByTwo: 0.12, free: 'None stated', source: FLY },
  { name: 'E2B', vcpuHour: '$0.0504', gibHour: '$0.0162', twoByTwo: 0.1332, free: '$100 one-time credit (Hobby)', source: { label: 'E2B pricing, 19 Nov 2026', url: 'https://e2b.dev/pricing' } },
  { name: 'Daytona', vcpuHour: '$0.0504', gibHour: '$0.0162', twoByTwo: 0.1332, free: '$200 starter credit', source: FLY },
  { name: 'Modal Sandboxes', vcpuHour: 'about $0.071 ($0.1419 a core of 2 vCPU)', gibHour: '$0.024', twoByTwo: 0.1899, free: '$30 a month (Starter)', source: FLY },
  { name: 'Vercel Sandbox', vcpuHour: '$0.128 (active CPU)', gibHour: '$0.0212', twoByTwo: 0.2984, free: 'Pro plan credit', source: FLY },
];

export const GITHUB_MACOS: Source = { label: 'GitHub Docs: Actions runner pricing (macOS, checked 19 Nov 2026)', url: 'https://docs.github.com/en/billing/reference/actions-runner-pricing' };

export const usd = (n: number) => (n >= 1 ? `$${n.toFixed(2)}` : `$${Number(n.toFixed(5))}`);
