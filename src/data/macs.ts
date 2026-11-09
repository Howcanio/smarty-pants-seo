import macs from './macs.json';
import { MODELS } from './models';

export type Mac = {
  slug: string; name: string; generation: string; tier: string; announced: string;
  cpuCores: string | null; gpuCores: string | null; memoryOptionsGB: number[];
  memoryBandwidthGBs: string | null; macs: string[]; note: string;
  sources: { label: string; url: string }[];
};

export const MACS = macs as Mac[];
export const macHref = (m: { slug: string }) => `/macs/${m.slug}/`;

/** Smarty Pants measured these chips itself (huggingface.co/datasets/smartypantsnet/mac-benchmarks). */
export const MEASURED: Record<string, { text: string; date: string }[]> = {
  'm5-pro': [
    { text: 'Qwen3.5-4B, standard 4-bit build: 99.7 tokens a second, 4.13 GB peak memory (Mac mini, 64 GB).', date: '2026-10-22' },
    { text: 'Qwen 3.8 27B, standard 4-bit build: 35.7 tokens a second, 18.26 GB peak memory with a 4,096-token prompt (Mac mini).', date: '2026-11-02' },
    { text: 'Qwen3.5-0.8B: 120.0 tokens a second, 2.22 GB peak memory (Mac mini).', date: '2026-11-04' },
  ],
  'm3-max': [
    { text: 'Qwen3.6-35B-A3B, standard 4-bit build: 61.4 tokens a second one request at a time, 193 tokens a second in total with 8 at once, 21.52 GB peak memory (MacBook Pro, 36 GB).', date: '2026-09-08' },
  ],
};

/** Smarty Pants owner requirements: Apple silicon, 16 GB or more (smartypants.network/compatibility). */
export const OWNER_MIN_GB = 16;

export const modelsFor = (gb: number) => MODELS.filter((m) => m.minMemoryGB <= gb);

const fmtMonth = (ym: string) =>
  new Date(`${ym}-15T12:00:00Z`).toLocaleDateString('en-US', { year: 'numeric', month: 'long', timeZone: 'UTC' });
export const announcedLabel = (m: Mac) => fmtMonth(m.announced);
export const bandwidthLabel = (m: Mac) => (m.memoryBandwidthGBs ? `${m.memoryBandwidthGBs} GB/s` : 'Not published by Apple');
