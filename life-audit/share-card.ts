import { exampleWheel, escapeXml, wrapLines, fitCardGoal } from '../src/lib/life-audit-sharing.mjs';
// All personal artwork stays in this browser. Assets below are public brand files.
let assetsPromise: Promise<string[]>;
function assets(){return assetsPromise ||= Promise.all(['fonts/Urbanist-Medium.ttf','fonts/Urbanist-ExtraBold.ttf','logos/wordmark-white.png'].map(async path=>{const blob=await (await fetch(`/life-audit/assets/${path}`)).blob();return new Promise<string>(resolve=>{const reader=new FileReader();reader.onload=()=>resolve(String(reader.result));reader.readAsDataURL(blob)})}));}
export async function personalCard({area,goal,horizon,ratings,includeWheel}:any){
 await Promise.all([document.fonts.load('500 60px Urbanist'),document.fonts.load('800 76px Urbanist')]);
 const [medium,bold,logo]=await assets();
 const measure=document.createElement('canvas').getContext('2d')!;measure.font='500 54px Urbanist';
 const {size,lines}=fitCardGoal(goal,(s:string,fontSize:number)=>{measure.font=`500 ${fontSize}px Urbanist`;return measure.measureText(s).width});
 const areaLines=wrapLines(area.name,(s:string)=>{measure.font='800 76px Urbanist';return measure.measureText(s).width},920,2);
 const focusOnly=Object.fromEntries(Object.keys(ratings).map(id=>[id,id===area.id?10:0]));
 const wheel=exampleWheel(area.id,includeWheel?ratings:focusOnly);
 // Layout, top to bottom: wordmark, the wheel as the hero, then the commitment anchored to the lower half.
 const areaTop=820, areaStep=84;
 const goalY=areaTop+(areaLines.length-1)*areaStep+82;
 const lineHeight=size*1.2;
 const horizonY=goalY+(lines.length-1)*lineHeight+56;
 const pillText=`For ${horizon} weeks`;
 measure.font='800 28px Urbanist';
 const pillWidth=Math.ceil(measure.measureText(pillText).width*1.1)+48;
 const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350"><style>@font-face{font-family:Urbanist;src:url('${medium}');font-weight:500}@font-face{font-family:Urbanist;src:url('${bold}');font-weight:800}text{font-family:Urbanist;fill:#FFFCEF}</style><rect width="1080" height="1350" fill="#0D0D0D"/><image href="${logo}" x="80" y="72" width="170" height="54"/><svg x="290" y="150" width="500" height="500" viewBox="-10 -10 220 220">${wheel.replace(/^<svg[^>]*>|<\/svg>$/g,'')}</svg><text x="80" y="${areaTop-92}" font-size="34">This month I'm giving attention to</text>${areaLines.map((s:string,i:number)=>`<text x="80" y="${areaTop+i*areaStep}" font-size="76" font-weight="800" style="fill:#FFDE59">${escapeXml(s)}</text>`).join('')}${lines.map((s:string,i:number)=>`<text x="80" y="${goalY+i*lineHeight}" font-size="${size}">${escapeXml(s)}</text>`).join('')}<rect x="80" y="${horizonY-36}" width="${pillWidth}" height="54" rx="27" fill="none" stroke="#FFFCEF" stroke-opacity=".4"/><text x="104" y="${horizonY}" font-size="28" font-weight="800">${escapeXml(pillText)}</text><text x="80" y="1278" font-size="28" style="fill:#FFFCEF;opacity:.7">bestday.ai/life-audit</text></svg>`;
 const url=URL.createObjectURL(new Blob([svg],{type:'image/svg+xml'}));
 try{const image=new Image();image.src=url;await image.decode();const canvas=document.createElement('canvas');canvas.width=1080;canvas.height=1350;canvas.getContext('2d')!.drawImage(image,0,0);const blob=await new Promise<Blob>((resolve,reject)=>canvas.toBlob(b=>b?resolve(b):reject(new Error('Card unavailable')),'image/png'));return new File([blob],'bestday-my-commitment.png',{type:'image/png'});}finally{URL.revokeObjectURL(url)}
}
export function downloadCard(file:File){const url=URL.createObjectURL(file);const link=document.createElement('a');link.href=url;link.download=file.name;link.click();setTimeout(()=>URL.revokeObjectURL(url),1000)}
