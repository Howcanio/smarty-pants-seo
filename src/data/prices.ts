// Every Smarty Pants product price next to the same thing elsewhere: the cheapest seller and the median seller.
// Rule (Nat, 23 Nov 2026): paid use on the network's Macs is priced at the MEDIAN of real sellers; Pro members
// pay 85% of it; your own and your Group's Macs stay free. Workspaces are at half the median for now.
// Competitor prices change often: every row names its source and date.

export const PRICES_CHECKED = '2026-11-23';
export const PRICES_CHECKED_LABEL = 'November 23, 2026';
/** Pro members pay this share of the network price. */
export const PRO_PERCENT = 85;

export type Source = { label: string; url: string };

const OR = (slug: string): Source => ({ label: `OpenRouter sellers for ${slug}, 23 Nov 2026`, url: `https://openrouter.ai/${slug}` });

/** Models that other providers also sell: the cheapest and the median seller (per million tokens unless noted). */
export const MODEL_ENTRY: {
  id: string; name: string; ours: string; entry: string; entrySeller: string; median: string; sellers: string; share: string; source: Source;
}[] = [
  { id: 'smartypants/qwen3.5-9b', name: 'Qwen3.5 9B', ours: '$0.10 in / $0.15 out', entry: '$0.08 / $0.12', entrySeller: 'DeepInfra', median: '$0.10 / $0.15', sellers: '8', share: '100%', source: OR('qwen/qwen3.5-9b') },
  { id: 'smartypants/qwen3.8-27b', name: 'Qwen3.8 27B', ours: '$0.21 / $2.10', entry: '$0.035 / $1.05', entrySeller: 'Darkbloom, StreamLake', median: '$0.21 / $2.10', sellers: '22', share: '100%', source: OR('qwen/qwen3.8-27b') },
  { id: 'smartypants/qwen3.6-35b-a3b', name: 'Qwen3.6 35B-A3B', ours: '$0.10 / $0.925', entry: '$0.05 / $0.70', entrySeller: 'Darkbloom', median: '$0.10 / $0.925', sellers: '10', share: '100%', source: OR('qwen/qwen3.6-35b-a3b') },
  { id: 'smartypants/gpt-oss-20b', name: 'gpt-oss-20b', ours: '$0.03 / $0.15', entry: '$0.015 / $0.076', entrySeller: 'Darkbloom', median: '$0.03 / $0.15', sellers: '11', share: '100%', source: OR('openai/gpt-oss-20b') },
  { id: 'smartypants/muse-glimmer-30b', name: 'Muse Glimmer 30B', ours: '$0.325 / $1.35', entry: '$0.30 / $1.20', entrySeller: 'DeepInfra, ModelRun', median: '$0.325 / $1.35', sellers: '4', share: '100%', source: OR('meta/muse-glimmer-30b') },
  { id: 'smartypants/wan2.2-5b-video', name: 'Wan 2.2 5B video, 480p clip', ours: '$0.0125 a clip', entry: 'about $0.0113 a clip (half of $0.0225 for 720p)', entrySeller: 'DeepInfra', median: '$0.0125 a clip', sellers: '3', share: '100%', source: { label: 'fal FastWan 480p, DeepInfra and Replicate, 23 Nov 2026', url: 'https://fal.ai/models/fal-ai/wan/v2.2-5b/text-to-video/fast-wan' } },
];

/** Products we have not re-checked against the market since 19 Nov 2026: priced as before. */
export const NOT_RECHECKED = [
  { id: 'smartypants/qwen3-reranker-0.6b', name: 'Qwen3 Reranker 0.6B', ours: '$0.0095 in', note: 'DeepInfra $0.01 (9 Nov 2026)' },
  { id: 'smartypants/whisper-large-v3-turbo', name: 'Whisper large-v3 turbo', ours: 'about $0.011 an hour of audio', note: 'DeepInfra $0.012 an hour (19 Nov 2026)' },
  { id: 'smartypants/flux.1-schnell', name: 'FLUX.1 schnell picture', ours: '$0.003 a picture', note: 'fal about $0.003 to $0.005 (reported, June 2026)' },
];

/** Models nobody else sells yet: priced at the market rate of the nearest comparable model. */
export const UNIQUE_MODELS = [
  { name: 'Arete 27B', ours: '$0.21 / $2.10', note: 'No other seller found on 23 Nov 2026; priced at the median of Qwen3.8 27B, the model it is built on.' },
  { name: 'Axion 1.0 35B', ours: '$0.11 / $1.00', note: 'No other seller found; priced at the median of 35B-A3B models (Qwen3.5 and 3.6).' },
  { name: 'Nanbeige4.3 33B', ours: '$0.30 / $2.60', note: 'No other seller found; priced at the median of dense 27B models (Qwen3.5 and 3.6).' },
  { name: 'Qwen3 Embedding 0.6B', ours: '$0.01 in', note: 'No current seller price verified.' },
  { name: 'Qwen3.5 4B', ours: '$0.062 / $0.10', note: 'No seller of this exact model; priced at the median of similar small models (Gemma 3 4B, Ministral 3B).' },
];

const FLY: Source = { label: 'Fly.io: AI sandbox pricing compared (published 9 Sep 2026, prices checked 5 Oct 2026)', url: 'https://fly.io/learn/ai-sandbox-pricing/' };
const NORTHFLANK: Source = { label: 'Northflank: AI sandbox pricing (5 May 2026)', url: 'https://northflank.com/blog/ai-sandbox-pricing' };

/** Our workspace and code-run price, and the same 2 vCPU / 2 GB machine elsewhere, per hour. The median of the
 * ten sellers checked on 23 Nov 2026 is $0.0504 per vCPU-hour + $0.0162 per GB-hour ($0.133 an hour); ours is half that for now. */
export const SANDBOX_MEDIAN = { vcpuHour: '$0.0504', gibHour: '$0.0162', twoByTwo: 0.1332 };
export const SANDBOX_ROWS: {
  name: string; vcpuHour: string; gibHour: string; twoByTwo: number; free: string; source: Source; ours?: boolean;
}[] = [
  { name: 'Smarty Pants workspace', vcpuHour: '$0.0252', gibHour: '$0.0081', twoByTwo: 0.0666, free: '$10 starter credit for 90 days; free on your own and your Group\'s Macs', source: { label: 'Smarty Pants: GET /v1/prices/workspaces', url: 'https://smartypants.network/v1/prices/workspaces' }, ours: true },
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
