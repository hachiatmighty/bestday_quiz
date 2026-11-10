import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,readdir} from 'node:fs/promises';
import {areas} from '../life-audit/data/audit.mjs';
import {referralLine,shareUrl,validArea,wrapLines,exampleWheel,wheelGrid} from '../src/lib/life-audit-sharing.mjs';
import {emails,renderEmail,sample} from '../life-audit/data/emails.mjs';
import {lifeAuditProperties} from '../src/lib/life-audit-analytics.mjs';
test('referral variants are deterministic for every valid pair and reject arbitrary text',()=>{
 for(const a of areas)for(const b of areas){const line=referralLine(a.id,b.id);assert.equal(line,referralLine(a.id,b.id));assert.match(line,/this week/);assert.equal(line===referralLine('work','work'),a.id===b.id)}
 for(const bad of [null,'name@example.com','private goal','unknown']){assert.equal(validArea(bad),null);assert.equal(referralLine(bad,'work'),null)}
});
test('public links carry only the selected area and ref analytics is allowlisted',()=>{
 for(const a of areas){const url=new URL(shareUrl('https://example.com',a.id));assert.equal(url.pathname,`/life-audit/r/${a.id}`);assert.equal(url.search,`?ref=${a.id}`)}
 assert.throws(()=>shareUrl('https://example.com','my private goal'));
 assert.deepEqual(lifeAuditProperties({ref:'private_name',goal:'private',ratings:{work:8},email:'private'}),{quiz:'life_audit'});
 assert.equal(lifeAuditProperties({ref:'work'}).ref,'work');
});
test('card wrapping limits lines, escapes overlong words and adds ellipsis',()=>{
 assert.deepEqual(wrapLines('one two',s=>s.length,20),['one two']);
 for(const text of ['one two three four five six seven eight nine', 'x'.repeat(300)]){const lines=wrapLines(text,s=>s.length,10,4);assert.equal(lines.length,4);assert.ok(lines.every(l=>l.length<=10));assert.match(lines[3],/…$/)}
 assert.equal((wheelGrid().match(/<circle/g)||[]).length,3);assert.equal((wheelGrid().match(/<path/g)||[]).length,8);
 assert.equal((exampleWheel('work').match(/fill="#FFDE59"/g)||[]).length,1);
});
test('email sequence includes the approved commitment and private plain text wheel',()=>{
 assert.deepEqual(emails.map(e=>e.timing),['Immediately','Day 2','Day 4','Day 7']);
 for(const email of emails){const rendered=renderEmail(email);assert.equal(rendered.signoff,'Bestday\nDo it. Together.');assert.ok(rendered.paragraphs.join(' ').includes(sample.firstStep));assert.doesNotMatch(rendered.paragraphs.join(' '),/[—–]/)}
 const result=renderEmail(emails[0]).paragraphs.join('\n');assert.match(result,/Rest and enjoyment: skipped/);assert.match(result,/Work and direction: 7\/10/);assert.ok(result.includes(sample.day));assert.ok(result.includes(sample.goal));
});
test('static share pages have area-specific metadata and only public example images',async()=>{
 for(const a of areas){const html=await readFile(`dist-life-audit/r/${a.id}/index.html`,'utf8');assert.ok(html.includes(`/life-audit/?ref=${a.id}&amp;start=1`));assert.ok(html.includes(`/life-audit/assets/og/${a.id}.png`));assert.match(html,/name="robots" content="noindex"/);assert.ok(!html.includes(sample.goal));}
 const home=await readFile('dist-life-audit/index.html','utf8');assert.match(home,/WebApplication/);assert.match(home,/FAQPage/);assert.match(home,/twitter:card/);
 assert.deepEqual((await readdir('dist-life-audit/assets')).sort(),['fonts','logos','og']);
 for(const name of ['default',...areas.map(a=>a.id)]){const png=await readFile(`life-audit/public/assets/og/${name}.png`);assert.equal(png.readUInt32BE(16),1200);assert.equal(png.readUInt32BE(20),630);const chunks=[];for(let i=8;i<png.length;){chunks.push(png.toString('ascii',i+4,i+8));i+=png.readUInt32BE(i)+12}assert.ok(chunks.every(c=>['IHDR','IDAT','IEND'].includes(c)));}
});

test('handoff requires links and tracking for launch, and warns on review escapes',async()=>{
 const {validateHandoff}=await import('../scripts/life-audit-handoff-checks.mjs');
 const ready={web:'https://example.app.link/web',email:'https://example.app.link/email',token:'provided',noindex:'false'};
 assert.deepEqual(validateHandoff(ready),[]);
 for(const missing of [{web:null},{email:null},{token:''},{token:'',allowNoToken:'1'}])assert.throws(()=>validateHandoff({...ready,...missing}));
 assert.throws(()=>validateHandoff({noindex:'true'}),/TOKEN/);
 assert.equal(validateHandoff({noindex:'true',allowNoToken:'1'}).length,2);
});

test('shared-link start begins a fresh flow while reload preserves progress',async()=>{
 const {startsNewAudit}=await import('../src/lib/life-audit-sharing.mjs');
 assert.equal(startsNewAudit('?ref=work&start=1','navigate'),true);
 assert.equal(startsNewAudit('?ref=work&start=1','reload'),false);
 assert.equal(startsNewAudit('?ref=work&start=1','back_forward'),false);
 assert.equal(startsNewAudit('?ref=work','navigate'),false);
});
