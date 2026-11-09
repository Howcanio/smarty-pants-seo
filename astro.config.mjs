import { defineConfig } from 'astro/config';

// Canonical origin for every URL. On Render, RENDER_EXTERNAL_URL is the onrender address.
// Set SITE_URL to the Smarty Pants origin (e.g. https://smartypants.network) when pages go live there.
const site = (process.env.SITE_URL || process.env.RENDER_EXTERNAL_URL || 'https://smartypants.network').replace(/\/+$/, '');

export default defineConfig({
  site,
  trailingSlash: 'always',
  build: { format: 'directory', assets: '_seo/astro' },
  markdown: { shikiConfig: { theme: 'github-dark' } },
});
