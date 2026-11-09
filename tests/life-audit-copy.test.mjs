import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { copy, wheelWords } from '../life-audit/data/copy.mjs';
import { areas } from '../life-audit/data/audit.mjs';
import { wheelReflection } from '../src/lib/life-audit.mjs';
import { lifeAuditProperties } from '../src/lib/life-audit-analytics.mjs';

test('wheel reflection leads with strength and handles sparse, equal and mixed ratings',()=>{
 assert.match(wheelReflection({work:7}),/^Work is/);
 assert.match(wheelReflection({work:7}),/7 areas open/);
 assert.match(wheelReflection(Object.fromEntries(areas.map(a=>[a.id,5]))),/equally satisfying/);
 assert.match(wheelReflection({work:2,money:9,health:7}),/^Money/);
 assert.match(wheelReflection({work:2,money:9,health:7}),/range from 2 to 9/);
 assert.match(wheelReflection({work:null}),/return/);
 assert.doesNotMatch(wheelReflection({work:0}),/skipped|no ratings/);
 assert.deepEqual(lifeAuditProperties({edited:true,goal:'private'}),{quiz:'life_audit',edited:true});
});
const banned=/[—–]|!!|\b(?:score|scores|journey|unlock|users|customers|assessment|trauma|self-sabotage|supercharge|elevate|organize|realize|color|center|favorite)\b|level up|crush your goals|dream big|stay motivated|game-changer|no excuses|become your best self|hold space|unserious|grind|10x/gi;
function lint(text,path){assert.deepEqual(text.match(banned),null,path);}
test('Life Audit reviewed data and static visible HTML follow voice rules',async()=>{
 for(const file of await readdir('life-audit/data')) if(file.endsWith('.mjs')){
  const mod=await import('../life-audit/data/'+file);
  const strings=[];function collect(value){if(typeof value==='string')strings.push(value);else if(value&&typeof value==='object')Object.values(value).forEach(collect)}collect(mod);lint(strings.join('\n'),file);
 }
 lint([wheelWords.strength('Money'),wheelWords.range(2,8),wheelWords.missing(2)].join(' '),'templates');
 const html=await readFile('dist-life-audit/index.html','utf8');
 // Inspect copy, excluding CSS and bundled script syntax such as color and center.
 lint(html.replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi,'').replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,'').replace(/<[^>]+>/g,' '),'built HTML');
 assert.match(html,/FAQPage/); assert.equal(copy.tiles.length,4);
});
