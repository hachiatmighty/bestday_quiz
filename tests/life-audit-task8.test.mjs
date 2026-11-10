import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {figureWheel} from '../src/lib/wheel-of-figures.mjs';
import {exampleRatings} from '../src/lib/life-audit-sharing.mjs';
test('landing starts with Relationships at 6 highlighted',()=>{
 const html=figureWheel(exampleRatings,null,{demo:true});
 assert.match(html,/relationships.webp/);
 assert.match(html,/Relationships: 6 out of 10/);
 assert.equal((html.match(/class="figure-fill focus"/g)||[]).length,1);
});
test('mini shows answered sectors and outlines the current area without rim artwork',()=>{
 const html=figureWheel({work:0,money:5},null,{mini:true,liveArea:'health'});
 assert.doesNotMatch(html,/<image|<text|<title|role="slider"/);
 assert.equal((html.match(/fill="#FFFCEF"/g)||[]).length,2);
 assert.equal((html.match(/stroke="#FFDE59"/g)||[]).length,1);
 assert.match(html,/stroke-width="3"/);
});
test('focus omits wheel and teaser previews use selected area suggestions',async()=>{
 const client=await readFile('life-audit/client.ts','utf8');
 assert.doesNotMatch(client,/focus-wheel|▣|<span>5 \$\{c.mixed\}/);
 assert.match(client,/suggestionsFor\(area.id,state.timeOption\)\[0\]/);
 assert.match(client,/preview\(suggestion.goal,2\)/);
 assert.match(client,/preview\(suggestion.firstStep,3\)/);
 assert.match(client,/2 or 3 people/);
});
