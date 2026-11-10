import test from 'node:test';
import assert from 'node:assert/strict';
import sharp from 'sharp';
import { areas, colours, coverage } from '../scripts/process-figures.mjs';

test('figure extraction removes white and neutral background noise', () => {
  assert.equal(coverage(255, 255, 255), 0);
  assert.equal(coverage(249, 249, 248), 0);
});
test('figure extraction preserves solid yellow and anti-aliased alpha', () => {
  assert.equal(coverage(255, 222, 89), 255);
  assert.equal(coverage(255, 222, 89, 128), 128);
  assert.ok(Math.abs(coverage(255, 239, 172) - 128) <= 1);
});

test('exported figures have exact colours, transparency, centred padding and web sizes', async () => {
  for (const area of areas) for (const [colour, rgb] of Object.entries(colours)) {
    const suffix = colour === 'yellow' ? '' : `-${colour}`;
    const base = new URL(`../life-audit/public/assets/figures/${area}${suffix}`, import.meta.url).pathname;
    const { data, info } = await sharp(`${base}.png`).raw().toBuffer({ resolveWithObject: true });
    assert.equal(info.width, 1024); assert.equal(info.height, 1024);
    let left = 1024, right = -1, top = 1024, bottom = -1, soft = 0;
    for (let p = 0; p < data.length; p += 4) if (data[p + 3]) {
      assert.ok(rgb.every((value, channel) => data[p + channel] === value), `${area} ${colour} colour`);
      const x = p / 4 % 1024, y = Math.floor(p / 4 / 1024);
      left = Math.min(left, x); right = Math.max(right, x); top = Math.min(top, y); bottom = Math.max(bottom, y);
      if (data[p + 3] < 255) soft++;
    }
    assert.ok(soft > 0);
    assert.ok(Math.abs(left - (1023 - right)) <= 2);
    assert.ok(Math.abs(top - (1023 - bottom)) <= 2);
    assert.ok(Math.max(right - left + 1, bottom - top + 1) >= 818);
    const web = await sharp(`${base}.webp`).metadata();
    assert.equal(Math.max(web.width, web.height), 512);
  }
});
