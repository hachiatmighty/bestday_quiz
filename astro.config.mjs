import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://quiz.bestday.ai',
  output: 'static',
  build: { inlineStylesheets: 'always' },
});
