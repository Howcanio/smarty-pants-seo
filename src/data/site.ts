const env = process.env;

/** Facts about Smarty Pants used across the site. Keep in step with smartypants.network and docs/allowed-claims.md. */
export const SITE = {
  name: 'Smarty Pants',
  domain: 'smartypants.network',
  operator: 'Howcan, Inc.',
  coreSite: 'https://smartypants.network',
  apiBase: 'https://smartypants.network/v1',
  supportEmail: 'info@howcan.io',
  /** Where developer CTAs go. Add UTM parameters to attribute sign-ups. */
  buyerCtaUrl: env.BUYER_CTA_URL || 'https://smartypants.network/api',
  /** Where Mac-owner CTAs go: the 3-second browser check on the home page. */
  ownerCtaUrl: env.OWNER_CTA_URL || 'https://smartypants.network/#smart-check',
  /** Pages stay noindexed unless INDEXABLE=true, so a staging copy never competes with smartypants.network. */
  indexable: env.INDEXABLE === 'true',
  /** Date the facts on this site were last checked against the live product. */
  checked: '2026-11-09',
  checkedLabel: 'November 9, 2026',
};

/** The current Mac owner offer, word for word from the live home page and FAQ (checked 9 Nov 2026). */
export const OWNER_OFFER = {
  perDay: 1,
  until: 'until 50 computers join',
  monthIfReadyAllDay: 30,
  payoutFeePercent: 3,
  payoutFeeMinimum: 3,
  requirements: 'Apple silicon Mac with 16 GB of memory or more, macOS 14 or later',
  region: 'US only for now',
  /** Said wherever the offer appears: the $1 is a ceiling, not a forecast. */
  caveat: 'That is a ceiling, not a forecast: you earn it only for hours the Mac is on, idle and ready, and real earnings can be lower.',
};

export { API_ACCESS, API_ACCESS_TEXT, MAC_ACCESS_TEXT, PRIVACY_TEXT, expandTokens } from './access.mjs';

export const NAV = [
  { href: '/inference/', label: 'Inference API' },
  { href: '/ai-models/', label: 'Models' },
  { href: '/workspaces/', label: 'Workspaces' },
  { href: '/earn/', label: 'Earn with a Mac' },
  { href: '/guides/', label: 'Guides' },
];

export const BUYER_LINKS = [
  { href: '/inference/', label: 'LLM inference API' },
  { href: '/inference/openai-compatible-api/', label: 'OpenAI-compatible API' },
  { href: '/inference/pricing/', label: 'Prices and cost calculator' },
  { href: '/inference/vs-centralized-providers/', label: 'Vs. centralized providers' },
  { href: '/inference/embeddings-api/', label: 'Embeddings API' },
  { href: '/inference/speech-to-text-api/', label: 'Speech to text API' },
  { href: '/inference/image-generation-api/', label: 'Image generation API' },
  { href: '/inference/video-generation/', label: 'Video generation (planned)' },
];

export const COMPUTE_LINKS = [
  { href: '/cpu/', label: 'Sandboxed CPU jobs' },
  { href: '/workspaces/', label: 'Agent workspaces' },
  { href: '/workspaces/sessions/', label: 'Workspace sessions' },
  { href: '/workspaces/snapshots-and-recovery/', label: 'Snapshots and recovery (planned)' },
  { href: '/workspaces/model-calls/', label: 'Model calls from workspaces (planned)' },
  { href: '/workspaces/fleets/', label: 'Fleets and browser work (planned)' },
  { href: '/workspaces/always-on-agents/', label: 'Always-on agents (planned)' },
];

export const OWNER_LINKS = [
  { href: '/earn/', label: 'Earn with your Mac' },
  { href: '/earn/how-it-works/', label: 'How it works' },
  { href: '/earn/safety-and-controls/', label: 'Safety and controls' },
  { href: '/earn/earnings/', label: 'How earnings work' },
  { href: '/macs/', label: 'Which Macs qualify' },
];

export const GUIDE_LINKS = [
  { href: '/guides/how-to-run-an-llm-on-a-mac/', label: 'How to run an LLM on a Mac' },
  { href: '/guides/how-much-ram-to-run-an-llm/', label: 'How much RAM to run an LLM' },
  { href: '/guides/what-is-mlx/', label: 'What is MLX?' },
  { href: '/guides/mac-mini-for-ai/', label: 'Mac mini for AI' },
  { href: '/guides/make-money-with-an-idle-mac/', label: 'Make money with an idle Mac' },
  { href: '/guides/openai-compatible-api-explained/', label: 'OpenAI-compatible APIs explained' },
  { href: '/guides/decentralized-vs-centralized-inference/', label: 'Decentralized vs. centralized inference' },
  { href: '/guides/llm-api-pricing-explained/', label: 'LLM API pricing explained' },
  { href: '/guides/ai-agent-sandboxes-explained/', label: 'AI agent sandboxes explained' },
];

export const PRODUCT_LINKS = [
  { href: 'https://smartypants.network/api', label: 'Get an API key' },
  { href: 'https://smartypants.network/docs/agents', label: 'Agent kit and docs' },
  { href: 'https://smartypants.network/v1/models', label: 'Live model list (JSON)' },
  { href: 'https://smartypants.network/status', label: 'Status' },
  { href: 'https://smartypants.network/legal', label: 'Legal and trust' },
];

export const LINK_LABELS: Record<string, string> = Object.fromEntries(
  [...BUYER_LINKS, ...COMPUTE_LINKS, ...OWNER_LINKS, ...GUIDE_LINKS, { href: '/guides/', label: 'All guides' }, { href: '/ai-models/', label: 'All models' }, { href: '/macs/', label: 'Macs that can serve models' }].map((l) => [l.href, l.label])
);
