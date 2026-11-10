import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {wheelArtwork,fitCardGoal} from '../src/lib/life-audit-sharing.mjs';
test('legacy wheel export keeps continuous guides above petals',async()=>{
 const svg=wheelArtwork({work:10,money:5},'work');
 assert.ok(svg.indexOf('<circle')>svg.lastIndexOf('class="petal'));
 assert.match(svg,/stroke="#0D0D0D" stroke-width="1" opacity=".22"/);
 assert.match(svg,/stroke="#FFFCEF" stroke-width=".6" opacity=".18"/);
 for(const file of ['src/lib/life-audit-sharing.mjs'])assert.match(await readFile(file,'utf8'),/wheelArtwork/);
});
test('personal goal typography shrinks before truncation and stays above the wheel',()=>{
 const measure=(s,size)=>s.length*size*.6;
 assert.equal(fitCardGoal('Call a friend',measure).size,60);
 for(const goal of ['x'.repeat(300),'Speak with someone you trust this week. '.repeat(8).slice(0,300)]){
  const {size,lines}=fitCardGoal(goal,measure);
  assert.ok(size<60);assert.ok(lines.length*size*1.22<=265);
  assert.ok(lines.every(line=>measure(line,size)<=920));assert.ok(!lines.at(-1).endsWith('…'));
 }
});
test('landing has static method, FAQ and a no-JS destination; controls expose state',async()=>{
 const home=await readFile('dist-life-audit/index.html','utf8');
 assert.match(home,/href="#javascript-note" data-start/);assert.match(home,/Turn on JavaScript to take the life audit/);assert.match(home,/<details>/);assert.match(home,/role="alert" aria-atomic="true" data-status/);
 const client=await readFile('life-audit/client.ts','utf8');assert.match(client,/aria-pressed/);assert.match(client,/aria-label="\$\{v\} \$\{c.outOf\}/);assert.doesNotMatch(client,/↗/);
 const layout=await readFile('life-audit/layouts/AuditLayout.astro','utf8');assert.match(layout,/size-adjust:96.34%/);assert.match(layout,/prefers-reduced-motion/);
});
test('muted body colours meet WCAG AA against black',()=>{
 const luminance=rgb=>rgb.map(v=>v/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4).reduce((sum,v,i)=>sum+v*[.2126,.7152,.0722][i],0);
 for(const rgb of [[200,197,184],[169,166,157],[182,180,171]])assert.ok((luminance(rgb)+.05)/(luminance([13,13,13])+.05)>=4.5);
});
