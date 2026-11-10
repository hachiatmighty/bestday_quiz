import { areas } from '../../life-audit/data/audit.mjs';
export const figureBase = '/life-audit/assets/figures/';
export function radialRating(x, y, radius = 100) {
  return Math.max(0, Math.min(10, Math.round(Math.hypot(x, y) / radius * 10)));
}
export function sectorPath(index, rating, radius = 100) {
  const r = radius * Math.max(0, Math.min(10, rating)) / 10;
  const a = -Math.PI / 2 + index * Math.PI / 4, b = a + Math.PI / 4;
  return `M 0 0 L ${Math.cos(a)*r} ${Math.sin(a)*r} A ${r} ${r} 0 0 1 ${Math.cos(b)*r} ${Math.sin(b)*r} Z`;
}
export function figureWheel(ratings = {}, focus = null, {demo = false, mini = false, animated = false, liveArea = null} = {}) {
  if (mini) return `<div class="wheel figure-wheel mini"><svg viewBox="-104 -104 208 208" role="img" aria-label="Your wheel">${areas.map((a,i)=>`<path data-sector="${a.id}" d="${sectorPath(i,10)}" fill="${Number.isInteger(ratings[a.id])?'#FFFCEF':'none'}" stroke="#0D0D0D" stroke-width="2"/><path d="${sectorPath(i,10)}" fill="none" stroke="${liveArea===a.id?'#FFDE59':'#B6B4AB'}" stroke-width="${liveArea===a.id?3:1}"/>`).join('')}</svg></div>`;
  if (demo && !focus) focus = 'relationships';
  return `<div class="wheel figure-wheel ${mini?'mini':''}" ${demo?'data-demo-wheel':''} ${animated?'data-animate-wheel':''}><svg viewBox="-170 -170 340 340" role="${demo?'group':'img'}" aria-label="${demo?'Try your wheel':'Your wheel'}"><circle r="169" fill="#0D0D0D"/>${areas.map((a,i)=>{
    const value=ratings[a.id], rated=Number.isInteger(value), active=focus===a.id;
    const angle=-Math.PI/2+(i+.5)*Math.PI/4, x=Math.cos(angle)*134, y=Math.sin(angle)*134;
    const variant=active?'':rated?'-cream':'-grey';
    return `<g data-sector="${a.id}" ${demo?`role="slider" tabindex="0" aria-label="${a.name}" aria-valuemin="0" aria-valuemax="10" aria-valuenow="${rated?value:0}"`:''}><path class="sector-hit" d="${sectorPath(i,10,168)}" fill="transparent"/><path d="${sectorPath(i,10)}" fill="none" stroke="#B6B4AB" stroke-width=".7"/><path class="figure-fill ${active?'focus':''}" d="${sectorPath(i,rated?value:0)}" fill="${active?'#FFDE59':'#FFFCEF'}" stroke="#0D0D0D" stroke-width="1.5"/><image class="rim-figure ${active?'focus-figure':''}" href="${figureBase}${a.id}${variant}.webp" x="${x-28}" y="${y-28}" width="56" height="56"/><title>${a.name}: ${rated?value+' out of 10':'skipped'}</title></g>`;
  }).join('')}</svg><ul class="sr-only">${areas.map(a=>`<li>${a.name}: ${Number.isInteger(ratings[a.id])?ratings[a.id]+' out of 10':'skipped'}</li>`).join('')}</ul></div>`;
}
