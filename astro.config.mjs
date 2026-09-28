import { defineConfig } from 'astro/config';

const configuredBasePath = process.env.QUIZ_BASE_PATH ?? '/quiz';
const base = `/${configuredBasePath.split('/').filter(Boolean).join('/')}`;

export default defineConfig({
  site: 'https://bestday.ai',
  base,
  output: 'static',
  build: { inlineStylesheets: 'always' },
});
