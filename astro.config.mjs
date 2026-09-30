import { defineConfig } from 'astro/config';
import { execFileSync } from 'node:child_process';

const configuredBasePath = process.env.QUIZ_BASE_PATH ?? '/quiz';
const base = `/${configuredBasePath.split('/').filter(Boolean).join('/')}`;
const quizVersion = execFileSync('git', ['rev-parse', '--short', 'HEAD'], { encoding: 'utf8' }).trim();

export default defineConfig({
  site: 'https://bestday.ai',
  base,
  output: 'static',
  build: { inlineStylesheets: 'always' },
  vite: {
    define: {
      'import.meta.env.PUBLIC_QUIZ_VERSION': JSON.stringify(quizVersion),
    },
  },
});
