import { chromium } from 'playwright-core';
import { mkdir } from 'node:fs/promises';
import assert from 'node:assert/strict';
const browser=await chromium.launch({executablePath:'/opt/pw-browsers/chromium',headless:true,args:['--no-sandbox']});
await mkdir('review/life-audit',{recursive:true});
try{for(const [width,height] of [[390,844],[1440,900]]){
 const page=await browser.newPage({viewport:{width,height}});
 await page.route('**/*',route=>{const request=route.request();const local=['127.0.0.1','localhost'].includes(new URL(request.url()).hostname);if(!local||request.method()==='POST')return route.fulfill({status:200,contentType:'application/json',body:'{}'});return route.continue();});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 let index=0;
 async function shot(name,fullPage=true){await page.waitForTimeout(400);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,`${width} ${name} overflow`);await page.screenshot({path:`review/life-audit/${width}-${String(index++).padStart(2,'0')}-${name}.png`,fullPage});}
 await page.goto(process.env.AUDIT_PREVIEW_URL||'http://127.0.0.1:4321/life-audit/');await page.evaluate(()=>document.fonts.ready);await page.waitForTimeout(1600);await shot('landing');
 await page.click('[data-start]');await shot('context');await page.click('[data-option=curious]');await shot('before');await page.click('[data-begin]');
 for(let i=0;i<8;i++){await shot(`area-${i+1}`);await page.click(`[data-rating="${[7,5,8,4,6,3,8,6][i]}"]`);await page.waitForTimeout(300);}
 await shot('focus');await page.click('[data-option=relationships]');await shot('time');await page.click('[data-option=hour]');await shot('loading');await page.waitForSelector('[data-gate]');await page.waitForTimeout(1600);await shot('teaser');
 await page.click('[data-gate]');await shot('gate');await page.fill('[name=firstName]','Review');await page.fill('[name=email]','review@example.com');assert.equal(await page.locator('[data-phone-consent]').isVisible(),false);await page.fill('[name=whatsapp]','+447700900123');assert.equal(await page.locator('[name=whatsappConsent]').isChecked(),false);await shot('gate-whatsapp');await page.click('#gate button[type=submit]');await page.waitForSelector('#result:not([hidden])');await page.waitForTimeout(1600);await shot('result');
 await page.click('[data-goal="1"]');await page.fill('[data-goal-edit]','Make time to speak properly with one friend each week');await page.click('[data-horizon="8"]');await page.click('[data-day=Wed]');await shot('result-edited');await page.reload();await page.waitForSelector('#result:not([hidden])');assert.equal(await page.inputValue('[data-goal-edit]'),'Make time to speak properly with one friend each week');await shot('result-restored');
 // Exercise skip-only recovery and returning to a saved rating.
 await page.click('[data-again]');await page.click('[data-start]');await page.click('[data-option=season]');await page.click('[data-begin]');for(let i=0;i<8;i++){await page.click('[data-skip]');await page.waitForTimeout(300)}await shot('all-skipped');await page.click('[data-return]');await page.click('[data-rating="0"]');await page.waitForTimeout(300);await page.click('[data-back]');assert.equal(await page.getAttribute('[data-rating="0"]','aria-pressed'),'true');await shot('back-zero');
 assert.deepEqual(errors,[]);await page.close();
}}finally{await browser.close()}
