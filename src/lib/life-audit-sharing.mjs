import { areas } from '../../life-audit/data/audit.mjs';
import { wheelGeometry } from './life-audit.mjs';
export const exampleRatings = {work:7,money:5,health:8,relationships:6,growth:7,rest:4,home:8,meaning:6};
export const validArea = id => areas.some(a => a.id === id) ? id : null;
export const escapeXml = value => String(value).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
export function wheelGrid() {
 const rings = [1,50,100].map(r=>`<circle cx="100" cy="100" r="${r}"/>`).join('');
 return `<g fill="none" stroke="#0D0D0D" stroke-width="1" opacity=".22">${rings}</g><g fill="none" stroke="#FFFCEF" stroke-width=".6" opacity=".18">${[1,50,100].map(r=>`<circle cx="100" cy="100" r="${r}"/>`).join('')}${areas.map((_,i)=>{const a=-Math.PI/2+i*Math.PI/4;return `<path d="M 100 100 L ${100+Math.cos(a)*100} ${100+Math.sin(a)*100}"/>`}).join('')}</g>`;
}
// All wheel surfaces draw petals first and the continuous guide grid last.
export function wheelArtwork(ratings, focus=null, {mini=false,liveArea=null}={}) {
 let order=0;
 return wheelGeometry(ratings).map(s=>{
  const angle=(s.startAngle+s.endAngle)/2, delay=s.id===focus?7:order++;
  return s.missing?`<path class="missing" d="${s.sectorPath}" fill="none" stroke="#FFFCEF" stroke-dasharray="3 3" opacity=".45"/>${ratings[s.id]===null&&!mini?`<text class="skip-label" x="${100+Math.cos(angle)*73}" y="${100+Math.sin(angle)*73}" text-anchor="middle" font-size="6" fill="#FFFCEF">skipped</text>`:''}`:`<path class="petal ${s.id===focus?'focus':''} ${s.id===liveArea?'live-petal':''}" style="--order:${delay}" d="${s.path}" fill="${s.id===focus?'#FFDE59':'#FFFCEF'}"/>`;
 }).join('')+wheelGrid();
}
export function exampleWheel(focus='relationships', ratings=exampleRatings) {
 return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-10 -10 220 220" role="img" aria-label="Example wheel">${wheelArtwork(ratings,focus)}</svg>`;
}
// 920px is the card's text column; measure against 840 so a fallback font used for measuring cannot push the real glyphs past the edge.
export const CARD_TEXT_WIDTH = 840;
export function fitCardGoal(text, measure) {
 for(const size of [60,54,48,42,36,32,28,24]) {
  const lines=wrapLines(text,s=>measure(s,size),CARD_TEXT_WIDTH,Math.max(1,Math.floor(250/(size*1.22))));
  if(!lines.at(-1)?.endsWith('…'))return {size,lines};
 }
 return {size:24,lines:wrapLines(text,s=>measure(s,24),CARD_TEXT_WIDTH,8)};
}
export function referralLine(ref, focus) {
 if (!validArea(ref) || !validArea(focus)) return null;
 return ref === focus
 ? 'Choose a day this week to ask each other about your first step. Give both goals room in the conversation.'
 : 'Send each other your first step this week. Agree on a day to ask what happened, and listen to both answers.';
}
export function shareUrl(origin, focus) {
 if (!validArea(focus)) throw new RangeError('Unknown focus area');
 return new URL(`/life-audit/r/${focus}?ref=${focus}`, origin).toString();
}
export function wrapLines(text, measure, width, max=4) {
 let rest=String(text).trim().replace(/\s+/g,' ');const lines=[];
 while(rest && lines.length<max){
  if(measure(rest)<=width){lines.push(rest);break;}
  let end=0;while(end<rest.length && measure(rest.slice(0,end+1))<=width)end++;
  end=Math.max(1,end);
  if(lines.length===max-1){let line=rest.slice(0,end).trimEnd();while(line && measure(line+'…')>width)line=line.slice(0,-1);lines.push(line+'…');break;}
  const space=rest.lastIndexOf(' ',end);if(space>0)end=space;
  lines.push(rest.slice(0,end).trimEnd());rest=rest.slice(end).trimStart();
 }
 return lines;
}
// A shared-link CTA starts a new audit; reloading that flow keeps its saved result.
export function startsNewAudit(search, navigationType) {
 return new URLSearchParams(search).get('start') === '1' && navigationType !== 'reload' && navigationType !== 'back_forward';
}
