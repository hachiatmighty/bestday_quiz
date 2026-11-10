import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import postcss from 'postcss';
import {areas} from '../life-audit/data/audit.mjs';
const luminance=rgb=>rgb.map(v=>v/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4).reduce((sum,v,i)=>sum+v*[.2126,.7152,.0722][i],0);
const contrast=(a,b)=>(Math.max(luminance(a),luminance(b))+.05)/(Math.min(luminance(a),luminance(b))+.05);
function rgb(hex,bg=[13,13,13]){let h=hex.slice(1);if(h.length===3)h=[...h].map(x=>x+x).join('');const a=h.length===8?parseInt(h.slice(6),16)/255:1;return [0,2,4].map((p,i)=>parseInt(h.slice(p,p+2),16)*a+bg[i]*(1-a))}
test('built Life Audit text/surface tokens pass AA and surfaces are explicit',async()=>{
 for(const path of ['index.html','email/index.html',...['result','people','return','week'].map(s=>`email/${s}/index.html`),...areas.map(a=>`r/${a.id}/index.html`)]){
  const html=await readFile(`dist-life-audit/${path}`,'utf8');
  const css=[...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map(m=>m[1]).join('\n');
  const tree=postcss.parse(css),tokens={};
  tree.walkDecls(/^--/,d=>tokens[d.prop]=d.value);
  const resolve=value=>value.replace(/var\((--[\w-]+)\)/g,(_,key)=>tokens[key]||'unresolved');
  const black=rgb(tokens['--black']), cream=rgb(tokens['--cream']);
  for(const [fg,bg] of [['--black','--cream'],['--cream','--black'],['--yellow','--black'],['--muted','--black']])assert.ok(contrast(rgb(tokens[fg]),rgb(tokens[bg]))>=4.5,`${fg}/${bg}`);
  let htmlBackground=false,bodyBackground=false,sectionBackground=false,pairs=0;
  tree.walkRules(rule=>{
   const declarations={};rule.walkDecls(d=>declarations[d.prop]=resolve(d.value));
   const bg=declarations.background||declarations['background-color'];
   if(/\bhtml\b/.test(rule.selector)&&bg?.includes(tokens['--black']))htmlBackground=true;
   if(/\bbody\b/.test(rule.selector)&&bg?.includes(tokens['--black']))bodyBackground=true;
   if(rule.selector==='section'&&bg?.includes(tokens['--black']))sectionBackground=true;
   const bgHex=bg?.match(/#[\da-f]{3,8}/i)?.[0];
   const inheritedCream=/hero|demo-invitation|blockquote|header/.test(rule.selector)&&!/share-page/.test(rule.selector);
   const surface=bgHex?rgb(bgHex):inheritedCream?cream:black;
   const fgHex=declarations.color?.match(/#[\da-f]{3,8}/i)?.[0];
   if(fgHex){pairs++;assert.ok(contrast(rgb(fgHex,surface),surface)>=4.5,`${path}: ${rule.selector}: ${fgHex}/${bgHex||tokens['--black']}`)}
   if(bgHex&&contrast(surface,cream)<1.01){assert.notEqual(fgHex?.toLowerCase(),tokens['--yellow'].toLowerCase(),`${rule.selector}: yellow on cream`)}
   if(/hero.*button/.test(rule.selector)&&!/share-page/.test(rule.selector)&&bgHex)assert.notEqual(bgHex.toLowerCase(),tokens['--yellow'].toLowerCase(),'yellow button on cream hero');
  });
  assert.ok(htmlBackground,'html must set its background');
  assert.ok(bodyBackground,'body must set its background');assert.ok(sectionBackground,'every section has an explicit base surface');assert.ok(pairs>10,'check built colour declarations');
  assert.ok(contrast(rgb(tokens['--muted']),black)>=3,'UI on black');assert.ok(contrast(black,cream)>=3,'UI on cream');
 }
});
