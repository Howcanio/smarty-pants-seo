import type { APIRoute, GetStaticPaths } from 'astro';
import { expandTokens } from '../../data/access.mjs';

// Plain markdown copy of each guide at /guides/<slug>.md, for AI assistants and agents that read
// markdown more reliably than HTML. Same words as the page; nothing extra for bots.
const sources = import.meta.glob('./*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;

function field(front: string, name: string): string | null {
  const m = front.match(new RegExp(`^${name}:\\s*(.*)$`, 'm'));
  if (!m) return null;
  const v = m[1]!.trim();
  return v.startsWith('"') ? JSON.parse(v) : v;
}

export const getStaticPaths: GetStaticPaths = () =>
  Object.entries(sources).map(([file, raw]) => ({ params: { slug: file.replace(/^\.\//, '').replace(/\.md$/, '') }, props: { raw } }));

export const GET: APIRoute = ({ params, props, site }) => {
  const raw = (props as { raw: string }).raw;
  const parts = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  const front = parts?.[1] ?? '';
  const body = parts?.[2] ?? raw;
  const title = field(front, 'h1') ?? field(front, 'title') ?? params.slug!;
  const summary = field(front, 'summary');
  const updated = field(front, 'updated');
  const url = new URL(`/guides/${params.slug}/`, site).href;
  const text = expandTokens([
    `# ${title}`, '',
    ...(summary ? [`> ${summary}`, ''] : []),
    `Source: ${url}${updated ? ` (updated ${updated})` : ''}`, '',
    body.trim(), '',
  ].join('\n'));
  return new Response(text, { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
};
