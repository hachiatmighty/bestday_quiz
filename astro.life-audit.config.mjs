import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
import { execFileSync } from 'node:child_process';
import { LIFE_AUDIT_WEB, LIFE_AUDIT_EMAIL } from './life-audit/data/links.mjs';

const command = process.argv.includes('build') ? 'build' : 'dev';
const mode = command === 'build' ? 'production' : 'development';
const env = { ...loadEnv(mode, process.cwd(), ''), ...process.env };
if (command === 'build' && !env.PUBLIC_MIXPANEL_TOKEN?.trim() && env.LIFE_AUDIT_ALLOW_NO_TOKEN !== '1') {
  throw new Error('PUBLIC_MIXPANEL_TOKEN is required. Local review only: LIFE_AUDIT_ALLOW_NO_TOKEN=1');
}
console.info('Life Audit Branch links (TODO before launch):', { LIFE_AUDIT_WEB, LIFE_AUDIT_EMAIL });
export default defineConfig({
  site: 'https://bestday.ai', base: '/life-audit', srcDir: './life-audit', outDir: './dist-life-audit',
  output: 'static', build: { inlineStylesheets: 'always' },
  vite: { define: { 'import.meta.env.PUBLIC_QUIZ_VERSION': JSON.stringify(execFileSync('git', ['rev-parse', '--short', 'HEAD'], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'inherit'] }).trim()) } },
});
