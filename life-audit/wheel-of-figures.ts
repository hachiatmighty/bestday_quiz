import { areas } from './data/audit.mjs';
import { radialRating, sectorPath, figureBase } from '../src/lib/wheel-of-figures.mjs';
export function initWheelDemo(onFirstInteraction: () => void) {
  const wheel=document.querySelector<HTMLElement>('[data-demo-wheel]');
  if(!wheel)return;
  let started=false, drag: SVGGElement | null=null, active: SVGGElement | null=null;
  const set=(sector:SVGGElement,value:number)=>{
    if(!started){started=true;onFirstInteraction()}
    if(active && active!==sector){active.querySelector('.figure-fill')!.setAttribute('fill','#FFFCEF');active.querySelector('image')!.setAttribute('href',`${figureBase}${active.dataset.sector}-cream.webp`)}
    active=sector;
    sector.querySelector('.figure-fill')!.setAttribute('fill','#FFDE59');
    const index=areas.findIndex(a=>a.id===sector.dataset.sector);
    sector.setAttribute('aria-valuenow',String(value));
    sector.querySelector('.figure-fill')!.setAttribute('d',sectorPath(index,value));
    sector.querySelector('image')!.setAttribute('href',`${figureBase}${sector.dataset.sector}.webp`);
    sector.querySelector('title')!.textContent=`${areas[index].name}: ${value} out of 10`;
  };
  const pointer=(event:PointerEvent)=>{
    if(!drag)return;
    const svg=wheel.querySelector('svg')!, point=new DOMPoint(event.clientX,event.clientY).matrixTransform(svg.getScreenCTM()!.inverse());
    set(drag,radialRating(point.x,point.y));
  };
  wheel.querySelectorAll<SVGGElement>('[data-sector]').forEach(sector=>{
    sector.addEventListener('pointerdown',event=>{drag=sector;sector.setPointerCapture(event.pointerId);pointer(event)});
    sector.addEventListener('pointermove',pointer);
    sector.addEventListener('pointerup',()=>{drag=null});
    sector.addEventListener('pointercancel',()=>{drag=null});
    sector.addEventListener('keydown',event=>{
      if(!['ArrowUp','ArrowRight','ArrowDown','ArrowLeft','Home','End'].includes(event.key))return;
      event.preventDefault();const old=Number(sector.getAttribute('aria-valuenow'));
      set(sector,event.key==='Home'?0:event.key==='End'?10:Math.max(0,Math.min(10,old+(['ArrowUp','ArrowRight'].includes(event.key)?1:-1))));
    });
  });
}
