import { execFile } from 'node:child_process';
import { access, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
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
const buildOrigin = 'https://quiz-origin.invalid';
const originPlaceholder = 'https://__QUIZ_ORIGIN__';

await run('npm', ['run', 'build'], {
  env: {
    ...process.env,
    QUIZ_BASE_PATH: '/quiz',
    PUBLIC_QUIZ_NOINDEX: noindex,
    PUBLIC_MIXPANEL_TOKEN: process.env.PUBLIC_MIXPANEL_TOKEN ?? '',
    PUBLIC_SITE_ORIGIN: buildOrigin,
  },
});

await rm(path.join(dist, 'email'), { recursive: true, force: true });
await rm(path.join(dist, 'assets', 'review'), { recursive: true, force: true });

const rewriteExtensions = new Set(['.html', '.js', '.json']);
const rewrittenFiles = [];
const rewriteBuildOrigin = async directory => {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) await rewriteBuildOrigin(target);
    else if (rewriteExtensions.has(path.extname(entry.name))) {
      const source = await readFile(target, 'utf8');
      await writeFile(target, source.replaceAll(buildOrigin, originPlaceholder));
      rewrittenFiles.push(target);
    }
  }
};
await rewriteBuildOrigin(dist);

await access(path.join(dist, 'index.html'));
await access(path.join(dist, 'r', 'anchor', 'index.html'));
const home = await readFile(path.join(dist, 'index.html'), 'utf8');
if (!home.includes(originPlaceholder)) throw new Error('handoff build is missing the origin placeholder');
if (home.includes(buildOrigin)) throw new Error('handoff build still contains the temporary build origin');
for (const file of rewrittenFiles) {
  const source = await readFile(file, 'utf8');
  if (source.includes(buildOrigin)) throw new Error(`${path.relative(dist, file)} still contains the temporary build origin`);
  if (source.includes('https://bestday.ai') || source.includes('https://bestdayai.vercel.app')) throw new Error(`${path.relative(dist, file)} contains a hard-coded quiz origin`);
}
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
