import { execFile } from 'node:child_process';
import { access, mkdir, readFile, readdir, rm } from 'node:fs/promises';
import path from 'node:path';
import { promisify } from 'node:util';

const exec = promisify(execFile);
const root = process.cwd();
const dist = path.join(root, 'dist');
const handoff = path.join(root, 'handoff');

const run = (command, args, options = {}) => exec(command, args, {
  cwd: root,
  maxBuffer: 10 * 1024 * 1024,
  ...options,
});

const noindex = process.env.PUBLIC_QUIZ_NOINDEX ?? 'true';

await run('npm', ['run', 'build'], {
  env: {
    ...process.env,
    QUIZ_BASE_PATH: '/quiz',
    PUBLIC_QUIZ_NOINDEX: noindex,
    PUBLIC_MIXPANEL_TOKEN: process.env.PUBLIC_MIXPANEL_TOKEN ?? '',
    PUBLIC_SITE_ORIGIN: process.env.PUBLIC_SITE_ORIGIN ?? 'https://bestday.ai',
  },
});

await rm(path.join(dist, 'email'), { recursive: true, force: true });
await rm(path.join(dist, 'assets', 'review'), { recursive: true, force: true });

await access(path.join(dist, 'index.html'));
await access(path.join(dist, 'r', 'anchor', 'index.html'));
const home = await readFile(path.join(dist, 'index.html'), 'utf8');
const hasNoindex = home.includes('<meta name="robots" content="noindex">');
if (noindex !== 'false' && !hasNoindex) throw new Error('handoff build is missing the default noindex meta tag');
if (noindex === 'false' && hasNoindex) throw new Error('launch handoff still contains the noindex meta tag');

await mkdir(handoff, { recursive: true });
for (const entry of await readdir(handoff)) {
  if (/^bestday-quiz-[0-9a-f]+\.zip$/.test(entry)) await rm(path.join(handoff, entry));
}

const { stdout } = await run('git', ['rev-parse', '--short', 'HEAD']);
const shortSha = stdout.trim();
const archive = path.join(handoff, `bestday-quiz-${shortSha}.zip`);
await run('zip', ['-qr', archive, '.'], { cwd: dist });

console.log(path.relative(root, archive));
