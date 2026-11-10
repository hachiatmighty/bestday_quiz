import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { lifeAuditEventNames } from '../src/lib/life-audit-analytics.mjs';
import { figureWheel, radialRating, sectorPath } from '../src/lib/wheel-of-figures.mjs';
test('demo radial distance snaps and clamps without changing audit state',()=>{
 for(const [x,y,value] of [[0,0,0],[30,40,5],[200,0,10],[14,0,1],[15,0,2]])assert.equal(radialRating(x,y),value);
 assert.equal(sectorPath(0,0),'M 0 0 L 0 0 A 0 0 0 0 1 0 0 Z');
});
test('figure wheel renders skipped, rated and focus states without JS',()=>{
 const html=figureWheel({work:7,money:0},'work',{demo:true});
 assert.equal((html.match(/role="slider"/g)||[]).length,8);
 assert.match(html,/work.webp/);assert.match(html,/money-cream.webp/);assert.match(html,/rest-grey.webp/);
 assert.match(html,/Work and direction: 7 out of 10/);assert.match(html,/Rest and enjoyment: skipped/);
 assert.equal((html.match(/class="rim-figure focus-figure"/g)||[]).length,1);
});
test('demo is isolated and fires one event with no rating properties',async()=>{
 assert.ok(lifeAuditEventNames.has('landing_demo'));
 const client=await readFile('life-audit/client.ts','utf8'), demo=await readFile('life-audit/wheel-of-figures.ts','utf8');
 assert.match(client,/initWheelDemo\(\(\)=>trackLifeAudit\('landing_demo'\)\)/);
 assert.match(demo,/if\(!started\)\{started=true;onFirstInteraction\(\)\}/);
 assert.doesNotMatch(demo,/question_answered|sessionStorage|recordRating/);
});

test('no-JS supporting artwork does not hide the interactive SVG for JS visitors',async()=>{
 const html=await readFile('dist-life-audit/index.html','utf8');
 assert.match(html,/<noscript><style>\.hero-demo \.figure-wheel svg\{display:none\}<\/style><img[^>]+hero-ring\.png/);
 const withJS=html.replace(/<noscript>[\s\S]*?<\/noscript>/g,'');
 assert.doesNotMatch(withJS,/\.hero-demo \.figure-wheel svg\{display:none\}/);
});
