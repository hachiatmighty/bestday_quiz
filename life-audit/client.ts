// @ts-nocheck
import { areas, contextOptions, timeOptions, horizonOptions } from './data/audit.mjs';
import { copy as c } from './data/copy.mjs';
import { appLinks } from '../src/lib/signup';
import { personalCard, downloadCard } from './share-card';
import { figureWheel } from '../src/lib/wheel-of-figures.mjs';
import { initWheelDemo } from './wheel-of-figures';
import { validArea, referralLine, shareUrl, startsNewAudit } from '../src/lib/life-audit-sharing.mjs';
import { LIFE_AUDIT_WEB } from './data/links.mjs';
import * as audit from '../src/lib/life-audit.mjs';
import { initAnalytics, trackLifeAudit, trackingContext } from '../src/lib/analytics';
import { submitCapture } from '../src/lib/capture';
import { capturePayload, commitmentPayload, newDelivery, changedDelivery, deliveryDue, completedDelivery } from '../src/lib/life-audit-capture.mjs';
const $ = (s) => document.querySelector(s);
const esc = (s) => String(s).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
let state = audit.createAuditState();
let attemptId = crypto.randomUUID(), contact = null, captureFailed = false, delivery = newDelivery(), deliveryTimer, beaconPending = false;
const endpoint = import.meta.env.PUBLIC_CAPTURE_ENDPOINT;
let screen = 'landing', selected = 0, goal = '', firstStep = '', horizon = 4, day = null, busy = false;
const key = 'bestday:life-audit:progress:v1';
const ref = validArea(new URLSearchParams(location.search).get('ref'));
const siteOrigin = import.meta.env.PUBLIC_SITE_ORIGIN || 'https://bestday.ai';
const context = () => ({ref,segment:state.segment,focus_area_id:state.focusArea,time_option:state.timeOption});
const track = (event, props={}) => trackLifeAudit(event, {...context(),...props});
initAnalytics(import.meta.env.PUBLIC_MIXPANEL_TOKEN);
function persist(){try{sessionStorage.setItem(key,JSON.stringify({state,screen,selected,goal,firstStep,horizon,day,attemptId,contact,captureFailed,delivery:{...delivery,inFlight:false}}));}catch{}}
function show(next){screen=next;for(const id of ['landing','flow','gate','result']) $('#'+id).hidden=id!==next; window.scrollTo(0,0);if(next==='gate')$('#gate h1').focus({preventScroll:true});persist();}
function wheel(ratings, focus=null, animated=false, mini=false, liveArea=null){
 return figureWheel(ratings,focus,{mini,animated});
}
const reducedMotion=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
function animateWheels(){const observer=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('animate');observer.unobserve(e.target)}})},{rootMargin:'-35% 0px -45% 0px',threshold:.1});document.querySelectorAll('[data-animate-wheel]').forEach(el=>observer.observe(el));}
const heading=(title,body='')=>`<h1 class="screen-heading" tabindex="-1">${title}</h1>${body?`<p>${body}</p>`:''}`;
const options=(items,chosen)=>`<div class="options">${items.map(o=>`<button class="option ${chosen===o.id?'selected':''}" data-option="${o.id}" aria-pressed="${chosen===o.id}"><span class="option-label">${o.label}</span><span class="choice-check" aria-hidden="true">${chosen===o.id?'✓':''}</span></button>`).join('')}</div>`;
function render(){show('flow');const n=state.questionIndex;track('step_view',{step:n});$('[data-back]').hidden=n===12;
 if(n===0){$('#stage').innerHTML=heading(c.context)+options(contextOptions,state.segment);bindOptions(id=>{audit.recordSegment(state,id);render()});}
 else if(n===1){$('#stage').innerHTML=heading(c.before,c.beforeBody)+`<p class="muted">${c.beforeNote}</p><button class="button" data-begin>${c.begin}</button>`;$('[data-begin]').onclick=()=>{audit.startAudit(state);render()};}
 else if(n>=2&&n<=9){const area=areas[n-2],value=state.ratings[area.id];$('#stage').innerHTML=`<div class="progress-row"><span>${c.areaProgress(n-1)}</span>${wheel(state.ratings,null,false,true)}</div><img class="rating-figure" src="/life-audit/assets/figures/${area.id}.webp" alt=""/>`+heading(area.name)+`<p class="rating-prompt">${area.prompt}</p><div class="ratings" role="group" aria-label="${esc(area.name)}">${Array.from({length:11},(_,v)=>`<button class="rating ${value===v?'selected':''}" data-rating="${v}" aria-pressed="${value===v}" aria-label="${v} ${c.outOf}${v===5?', '+c.mixed:''}">${v}</button>`).join('')}</div><div class="scale-labels"><span>${c.low}</span><span>5 ${c.mixed}</span><span>${c.high}</span></div><button class="quiet" data-skip>${c.skip}</button>`;document.querySelectorAll('[data-rating]').forEach(el=>el.onclick=()=>answer(Number(el.dataset.rating)));$('[data-skip]').onclick=()=>answer(null);}
 else if(n===10){const available=audit.focusOptions(state);$('#stage').innerHTML=available.length?heading(c.focus,c.focusBody)+'<div class="focus-wheel">'+wheel(state.ratings,state.focusArea,false,true)+'</div>'+'<div class="focus-tiles">'+options(available.map(a=>({id:a.id,label:`<img class="focus-tile-figure" src="/life-audit/assets/figures/${a.id}${state.focusArea===a.id?'':'-cream'}.webp" alt=""/><span class="area-name">${a.name}</span><span class="rating-summary"><span class="rating-value">${state.ratings[a.id]}/10</span><span class="rating-bar" aria-hidden="true"><span style="width:${state.ratings[a.id]*10}%"></span></span></span>`})),state.focusArea)+'</div>':heading(c.empty,c.emptyBody)+`<button class="button" data-return>${c.emptyButton}</button>`;if(available.length)bindOptions(id=>{audit.recordFocus(state,id);render()});else $('[data-return]').onclick=()=>{state.questionIndex=2;render()};}
 else if(n===11){$('#stage').innerHTML=heading(c.time,c.timeBody)+options(timeOptions,state.timeOption);bindOptions(id=>{audit.recordTime(state,id);track('quiz_complete');render()});}
 else {$('#stage').innerHTML=heading(c.loading)+wheel(state.ratings,state.focusArea,true);animateWheels();setTimeout(teaser,reducedMotion()?0:1500);}
 persist();const h=$('#stage h1');h?.focus({preventScroll:true});
}
function bindOptions(fn){document.querySelectorAll('[data-option]').forEach(el=>el.onclick=()=>fn(el.dataset.option));}
function answer(value){if(busy)return;busy=true;const area=areas[state.questionIndex-2];if(value!==null){document.querySelectorAll('[data-rating]').forEach(el=>{el.classList.toggle('selected',Number(el.dataset.rating)===value);el.setAttribute('aria-pressed',String(Number(el.dataset.rating)===value))});}const updated={...state.ratings,[area.id]:value};$('.progress-row .wheel').outerHTML=wheel(updated,null,false,true,area.id);track('question_answered',{area_id:area.id});setTimeout(()=>{audit.recordRating(state,area.id,value);busy=false;render()},reducedMotion()?0:250);}
function teaser(){show('flow');screen='teaser';$('[data-back]').hidden=false;const area=areas.find(a=>a.id===state.focusArea);$('#stage').innerHTML=`<div class="teaser-wheel">${wheel(state.ratings,state.focusArea,true)}</div><h1 class="screen-heading focus-title">${area.name}</h1><p>${area.reflection}</p><h2 class="teaser-heading">${c.locked}</h2><div class="locked">${c.tiles.map(t=>`<div class="lock"><span aria-hidden="true">▣</span>${t}</div>`).join('')}</div><button class="button" data-gate>${c.show}</button><p class="small">${c.emailNote}</p>`;$('[data-gate]').onclick=()=>show('gate');$('#stage h1').tabIndex=-1;$('#stage h1').focus({preventScroll:true});track('teaser_view');animateWheels();persist();}
document.querySelectorAll('[data-start]').forEach(button=>button.addEventListener('click',event=>{event.preventDefault();track('quiz_start');render()}));
initWheelDemo(()=>trackLifeAudit('landing_demo'));
$('[data-back]').onclick=()=>{if(busy)return;if(screen==='teaser')state.questionIndex=11;else audit.goBack(state);render()};
$('[data-teaser-back]').onclick=teaser;
const phone=$('input[name=whatsapp]');phone.oninput=()=>{const typed=Boolean(phone.value.trim());$('[data-phone-consent]').hidden=!typed;if(!typed)$('input[name=whatsappConsent]').checked=false};
async function sendContact(){
 if(delivery.inFlight || !contact)return;
 delivery={...delivery,inFlight:true};
 try{await submitCapture(contact,endpoint);captureFailed=false;track('capture_submit',{status:'ok'});}
 catch{captureFailed=true;track('capture_submit',{status:'failed'});}
 finally{delivery={...delivery,inFlight:false};$('[data-delivery-status]').hidden=!captureFailed;persist();scheduleCommitment();}
}
$('[data-capture-retry]').onclick=async()=>{const button=$('[data-capture-retry]');button.disabled=true;await sendContact();button.disabled=false;};
$('[data-capture-form]').onsubmit=async event=>{event.preventDefault();const button=$('#gate button[type=submit]');button.disabled=true;const form=new FormData(event.currentTarget);
 contact=capturePayload({attemptId,firstName:String(form.get('firstName')),email:String(form.get('email')),whatsapp:String(form.get('whatsapp')),whatsappConsent:Boolean(phone.value.trim())&&form.get('whatsappConsent')==='on',consent:true,focusArea:state.focusArea,segment:state.segment,timeOption:state.timeOption,ratings:state.ratings,source:trackingContext(),quizVersion:import.meta.env.PUBLIC_QUIZ_VERSION||'dev'});
 fullResult();await sendContact();button.disabled=false;
};
function scheduleCommitment(){
 if(screen!=='result'||!contact)return;
 const original=audit.suggestionsFor(state.focusArea,state.timeOption)[selected].goal;
 delivery=changedDelivery(delivery,commitmentPayload({attemptId,email:contact.email,goal,goalEdited:goal!==original,horizon,firstStep,day}),Date.now());
 clearTimeout(deliveryTimer);deliveryTimer=setTimeout(sendCommitment,Math.max(0,4000-(Date.now()-delivery.changedAt)));persist();
}
async function sendCommitment(){
 if(captureFailed||!contact||!deliveryDue(delivery,Date.now()))return;
 const sent=delivery.pending;delivery={...delivery,inFlight:true};
 let ok=false;try{await submitCapture(JSON.parse(sent),endpoint);ok=true;}catch{}
 delivery=completedDelivery(delivery,sent,ok);persist();
 if(delivery.pending!==sent)scheduleCommitment();
}
function flushCommitment(){
 if(screen!=='result'||captureFailed||!endpoint||!navigator.sendBeacon||!deliveryDue(delivery,Date.now(),true))return;
 // A queued beacon is not a server acknowledgement; keep it eligible for retry.
 if(navigator.sendBeacon(endpoint,new Blob([delivery.pending],{type:'application/json'}))){beaconPending=true;delivery={...delivery,inFlight:true};}
}
window.addEventListener('pagehide',flushCommitment);
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden')flushCommitment();else if(beaconPending){beaconPending=false;delivery={...delivery,inFlight:false};scheduleCommitment();}});
function fullResult(){delivery={...delivery,changedAt:Date.now()};$('[data-delivery-status]').hidden=!captureFailed;const area=areas.find(a=>a.id===state.focusArea);const suggestions=audit.suggestionsFor(area.id,state.timeOption);if(!goal){goal=suggestions[selected].goal;firstStep=suggestions[selected].firstStep;}show('result');$('[data-result-wheel]').innerHTML=wheel(state.ratings,state.focusArea,true);$('[data-focus-name]').textContent=area.name;$('[data-result-context]').textContent=timeOptions.find(t=>t.id===state.timeOption).label.replace('About 1 hour','About 1 hour a week').replace('2 to 3 hours','2 to 3 hours a week');$('[data-reflection]').textContent=audit.wheelReflection(state.ratings);$('[data-area-reflection]').textContent=area.reflection;
 $('[data-goals]').innerHTML=suggestions.map((s,i)=>`<button class="option ${i===selected?'selected':''}" aria-pressed="${i===selected}" data-goal="${i}">${esc(s.goal)}<span aria-hidden="true">${i===selected?'✓':''}</span></button>`).join('');
 document.querySelectorAll('[data-goal]').forEach(el=>el.onclick=()=>{selected=Number(el.dataset.goal);goal=suggestions[selected].goal;firstStep=suggestions[selected].firstStep;track('goal_selected');updateGoalCards();});
 function updateGoalCards(){document.querySelectorAll('[data-goal]').forEach(el=>{const active=Number(el.dataset.goal)===selected;el.classList.toggle('selected',active);el.setAttribute('aria-pressed',String(active));el.querySelector('span').textContent=active?'✓':''});$('[data-goal-edit]').value=goal;$('#first-step').value=firstStep;updateCommitment();persist();}
 updateGoalCards();$('[data-goal-edit]').oninput=e=>{goal=e.target.value;updateCommitment();persist()};$('[data-goal-edit]').onchange=()=>track('goal_edited',{edited:true});$('#first-step').oninput=e=>{firstStep=e.target.value;scheduleCommitment();persist()};
 $('[data-horizons]').innerHTML=horizonOptions.map(h=>`<button class="${h.id===horizon?'selected':''}" aria-pressed="${h.id===horizon}" data-horizon="${h.id}">${h.label}</button>`).join('');document.querySelectorAll('[data-horizon]').forEach(el=>el.onclick=()=>{horizon=Number(el.dataset.horizon);document.querySelectorAll('[data-horizon]').forEach(b=>{b.classList.toggle('selected',b===el);b.setAttribute('aria-pressed',String(b===el))});track('horizon_selected',{horizon});scheduleCommitment();persist()});
 $('[data-days]').innerHTML=c.days.map(d=>`<button class="${d===day?'selected':''}" aria-pressed="${d===day}" data-day="${d}">${d}</button>`).join('');document.querySelectorAll('[data-day]').forEach(el=>el.onclick=()=>{day=el.dataset.day;document.querySelectorAll('[data-day]').forEach(b=>{b.classList.toggle('selected',b===el);b.setAttribute('aria-pressed',String(b===el))});scheduleCommitment();persist()});const line=referralLine(ref,state.focusArea);$('[data-referral]').hidden=!line;if(line){$('[data-referral-title]').textContent=`Your friend chose ${areas.find(a=>a.id===ref).name}. You chose ${area.name}.`;$('[data-referral-line]').textContent=line;}track('result_view');animateWheels();$('[data-focus-name]').focus({preventScroll:true});persist();}
function commitment(){return `${c.shareIntro} ${areas.find(a=>a.id===state.focusArea).name}: ${goal}`;}
function message(){return `${commitment()}\n\n${c.shareEnd} ${shareUrl(siteOrigin,state.focusArea)}`;}
function updateCommitment(){scheduleCommitment();$('[data-commitment]').textContent=commitment();$('[data-audit-whatsapp]').href='https://wa.me/?text='+encodeURIComponent(message());}
$('[data-audit-whatsapp]').onclick=()=>track('share_click',{channel:'whatsapp'});
$('[data-audit-share]').onclick=async()=>{track('share_click',{channel:'share'});try{if(navigator.share)await navigator.share({text:message()});else{await navigator.clipboard.writeText(message());$('[data-share-status]').textContent=c.copied}}catch{}};
for(const channel of ['save','instagram'])$('[data-audit-'+channel+']').href='#';
for(const channel of ['save','instagram'])$('[data-audit-'+channel+']').onclick=async event=>{event.preventDefault();track('share_click',{channel});try{const file=await personalCard({area:areas.find(a=>a.id===state.focusArea),goal,horizon,ratings:state.ratings,includeWheel:$('[data-include-wheel]').checked});if(channel==='instagram' && navigator.canShare?.({files:[file]}) && navigator.share){await navigator.share({files:[file],text:message()});}else{downloadCard(file);track('card_download',{channel});}}catch(error){if(error.name!=='AbortError')$('[data-share-status]').textContent='Your card could not be saved. Please try again.'}};
for(const el of [$('[data-signup]'),$('[data-referral-signup]')]){el.href=LIFE_AUDIT_WEB || appLinks.web;el.onclick=()=>track('signup_click',{channel:'web'});}
$('[data-again]').onclick=()=>{if(delivery.inFlight)return;clearTimeout(deliveryTimer);attemptId=crypto.randomUUID();contact=null;captureFailed=false;delivery=newDelivery();state=audit.createAuditState();$('[data-include-wheel]').checked=false;selected=0;goal='';firstStep='';horizon=4;day=null;show('landing');$('[data-start]').focus();track('landing_view')};
document.addEventListener('keydown',event=>{if(screen!=='flow'||state.questionIndex<2||state.questionIndex>9||event.altKey||event.ctrlKey||event.metaKey)return;if(/^\d$/.test(event.key)){event.preventDefault();answer(Number(event.key))}else if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(event.key)){event.preventDefault();const buttons=[...document.querySelectorAll('[data-rating]')];const index=buttons.indexOf(document.activeElement);const next=Math.max(0,Math.min(10,(index<0?5:index)+(['ArrowRight','ArrowUp'].includes(event.key)?1:-1)));buttons[next].focus()}});
try{const fresh=startsNewAudit(location.search,performance.getEntriesByType('navigation')[0]?.type);const saved=fresh?null:audit.restoreAuditProgress(sessionStorage.getItem(key));if(saved){({state,selected,goal,firstStep,horizon,day}=saved);const extra=JSON.parse(sessionStorage.getItem(key));attemptId=extra.attemptId||attemptId;contact=extra.contact||null;captureFailed=Boolean(extra.captureFailed);delivery=extra.delivery?{...extra.delivery,inFlight:false}:newDelivery();if(saved.screen==='result')fullResult();else if(saved.screen==='gate')show('gate');else teaser();}}catch{}
if(ref)track('referral_landing',{ref});
if(screen==='landing'){track('landing_view');if(new URLSearchParams(location.search).get('start')==='1'){track('quiz_start');render();}}
