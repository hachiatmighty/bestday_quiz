import test from 'node:test';
import assert from 'node:assert/strict';
import {capturePayload,commitmentPayload,newDelivery,changedDelivery,deliveryDue,completedDelivery} from '../src/lib/life-audit-capture.mjs';
import {emails,renderEmail,sample} from '../life-audit/data/emails.mjs';
import {lifeAuditProperties} from '../src/lib/life-audit-analytics.mjs';
test('explicit stage payloads exclude archetype keys and unrelated data',()=>{
 const input={attemptId:'opaque',firstName:'A',email:'a@example.com',whatsapp:'',whatsappConsent:false,consent:true,focusArea:'work',segment:'curious',timeOption:'hour',ratings:{work:0,money:null},source:{ref:null},quizVersion:'dev',goal:'Ask someone',goalEdited:true,horizon:8,firstStep:'Call',archetype:'bad',category:'bad'};
 const capture=capturePayload(input),commitment=commitmentPayload(input);
 assert.deepEqual(Object.keys(capture),['quiz','stage','attemptId','firstName','email','whatsapp','whatsappConsent','consent','focusArea','segment','timeOption','ratings','source','quizVersion']);
 assert.deepEqual(commitment,{quiz:'life_audit',stage:'commitment',attemptId:'opaque',email:input.email,goal:input.goal,goalEdited:true,horizon:8,firstStep:'Call',day:null});
 assert.equal(capture.stage,'capture');assert.deepEqual(capture.ratings,input.ratings);
 for(const p of [capture,commitment]){assert.equal('archetype' in p,false);assert.equal('category' in p,false);}
});
test('delivery debounce, successful dedupe, failure retry and edits in flight',()=>{
 let s=changedDelivery(newDelivery(),{goal:'one'},0);
 assert.equal(deliveryDue(s,3999),false);assert.equal(deliveryDue(s,4000),true);
 s=changedDelivery(s,{goal:'two'},3000);assert.equal(deliveryDue(s,6999),false);
 const sent=s.pending;s={...s,inFlight:true};assert.equal(deliveryDue(s,9000,true),false);
 s=changedDelivery(s,{goal:'three'},8000);s=completedDelivery(s,sent,true);
 assert.equal(deliveryDue(s,11999),false);assert.equal(deliveryDue(s,12000),true);
 s=completedDelivery(s,s.pending,false);assert.equal(deliveryDue(s,12000),true);
 s=completedDelivery(s,s.pending,true);assert.equal(deliveryDue(s,15000,true),false);
 assert.deepEqual(changedDelivery(s,{goal:'three'},16000),s);
});
test('missing day emails read sensibly',()=>{
 for(const day of [null,undefined,''])for(const email of emails){const rendered=renderEmail(email,{...sample,day});const text=JSON.stringify(rendered);assert.doesNotMatch(text,/undefined|null|on :|Before ,/);if(email.slug!=='week')assert.match(text,/this week/);}
});
test('capture status allowlist rejects personal fields and unknown statuses',()=>{
 for(const status of ['ok','failed'])assert.deepEqual(lifeAuditProperties({status,attemptId:'secret',goal:'private'}),{quiz:'life_audit',status});
 assert.deepEqual(lifeAuditProperties({status:'email@example.com'}),{quiz:'life_audit'});
});
