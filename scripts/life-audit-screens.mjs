import { chromium } from 'playwright-core';
import { mkdir } from 'node:fs/promises';
import assert from 'node:assert/strict';
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/opt/pw-browsers/chromium',headless:true,args:['--no-sandbox']});
await mkdir('review/life-audit',{recursive:true});
try{for(const [width,height] of [[390,844],[1440,900]]){
 const page=await browser.newPage({viewport:{width,height}});
 await page.route('**/*',route=>{const request=route.request();const local=['127.0.0.1','localhost'].includes(new URL(request.url()).hostname);if(!local||request.method()==='POST')return route.fulfill({status:200,contentType:'application/json',body:'{}'});return route.continue();});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 let index=0;
 async function shot(name,fullPage=true){await page.waitForTimeout(400);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,`${width} ${name} overflow`);await page.screenshot({path:`review/life-audit/${width}-${String(index++).padStart(2,'0')}-${name}.png`,fullPage});}
 const preview=process.env.AUDIT_PREVIEW_URL||'http://127.0.0.1:4321/life-audit/';
 await page.goto(new URL('r/relationships/',preview).toString());await shot('share-page');
 await page.goto(preview);
 const autoStart=new URL(preview).searchParams.get('start')==='1';await page.evaluate(()=>document.fonts.ready);await page.waitForTimeout(1600);if(!autoStart){await shot('landing');await page.click('[data-start]');}
 await shot('context');await page.click('[data-option=curious]');await shot('before');await page.click('[data-begin]');
 for(let i=0;i<8;i++){await shot(`area-${i+1}`);await page.click(`[data-rating="${[7,5,8,4,6,3,8,6][i]}"]`);await page.waitForTimeout(300);}
 await shot('focus');await page.click('[data-option=relationships]');await shot('time');await page.click('[data-option=hour]');await shot('loading');await page.waitForSelector('[data-gate]');await page.waitForTimeout(1600);await shot('teaser');
 await page.click('[data-gate]');await shot('gate');await page.fill('[name=firstName]','Review');await page.fill('[name=email]','review@example.com');assert.equal(await page.locator('[data-phone-consent]').isVisible(),false);await page.fill('[name=whatsapp]','+447700900123');assert.equal(await page.locator('[name=whatsappConsent]').isChecked(),false);await shot('gate-whatsapp');await page.click('#gate button[type=submit]');await page.waitForSelector('#result:not([hidden])');await page.waitForTimeout(1600);await shot('result');if(await page.locator('[data-referral]:not([hidden])').count()){await page.locator('[data-referral]').scrollIntoViewIfNeeded();await shot('referral-card');}
 await page.click('[data-goal="1"]');await page.fill('[data-goal-edit]','Make time to speak properly with one friend each week');await page.click('[data-horizon="8"]');await page.click('[data-day=Wed]');await shot('result-edited');
 assert.equal(await page.locator('[data-result-context]').innerText(),'About 1 hour a week');
 assert.match(await page.locator('[data-signup]').getAttribute('href'),/^https:\/\/.*app\.link\//);
 assert.equal(await page.locator('[data-include-wheel]').isChecked(),false);
 if(width===1440){await page.locator('[data-goal-edit]').scrollIntoViewIfNeeded();const sticky=await page.locator('.result-layout aside').evaluate(el=>({position:getComputedStyle(el).position,top:el.getBoundingClientRect().top}));assert.equal(sticky.position,'sticky');assert.ok(Math.abs(sticky.top-32)<2);await shot('result-sticky',false);}
 const download=page.waitForEvent('download');await page.click('[data-audit-save]');const file=await download;await file.saveAs(`review/life-audit/${width}-personal-card.png`);
 await page.reload();await page.waitForSelector('#result:not([hidden])');assert.equal(await page.inputValue('[data-goal-edit]'),'Make time to speak properly with one friend each week');await shot('result-restored');
 // Exercise skip-only recovery and returning to a saved rating.
 await page.click('[data-again]');await page.click('[data-start]');await page.click('[data-option=season]');await page.click('[data-begin]');for(let i=0;i<8;i++){await page.click('[data-skip]');await page.waitForTimeout(300)}await shot('all-skipped');await page.click('[data-return]');await page.click('[data-rating="0"]');await page.waitForTimeout(300);await page.click('[data-back]');assert.equal(await page.getAttribute('[data-rating="0"]','aria-pressed'),'true');await shot('back-zero');
 assert.deepEqual(errors,[]);await page.close();
}}finally{await browser.close()}
