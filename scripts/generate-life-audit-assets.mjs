import {Buffer} from 'node:buffer';
import {readFile,mkdir,writeFile,mkdtemp} from 'node:fs/promises';
import {resolve} from 'node:path';
import {tmpdir} from 'node:os';
import sharp from 'sharp';
import {areas} from '../life-audit/data/audit.mjs';
import {escapeXml,wrapLines} from '../src/lib/life-audit-sharing.mjs';
const root='life-audit/public/assets';
// Local fonts and a writable cache also work in the offline review sandbox.
const temp=await mkdtemp(`${tmpdir()}/bestday-fonts-`);
const config=`${temp}/fonts.conf`;
await writeFile(config,`<?xml version="1.0"?><!DOCTYPE fontconfig SYSTEM "fonts.dtd"><fontconfig><dir>${resolve(root,'fonts')}</dir><cachedir>${temp}/cache</cachedir></fontconfig>`);
process.env.FONTCONFIG_FILE=config;
const data=async(path)=>`data:image/png;base64,${(await readFile(`${root}/${path}`)).toString('base64')}`;
export function stripPngMetadata(buffer){const chunks=[buffer.subarray(0,8)];for(let offset=8;offset<buffer.length;){const end=offset+buffer.readUInt32BE(offset)+12;const type=buffer.toString('ascii',offset+4,offset+8);if(['IHDR','IDAT','IEND'].includes(type))chunks.push(buffer.subarray(offset,end));offset=end}return Buffer.concat(chunks)}
await mkdir(`${root}/og`,{recursive:true});
const logo=await data('logos/wordmark-white.png');
for(const area of [null,...areas]){
 const title=area?"This month I'm giving attention to":'Look at your whole life. Then choose one thing.';
 const lines=wrapLines(title,s=>s.length,area?28:23,4);
 let art;
 if(area)art=`<image href="${await data(`figures/${area.id}.png`)}" x="725" y="120" width="410" height="410"/>`;
 else art=`<image href="${await data('figures/hero-ring.png')}" x="725" y="120" width="410" height="410"/>`;
 const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#0D0D0D"/><image href="${logo}" x="65" y="55" width="150" height="47"/>${lines.map((line,i)=>`<text x="65" y="${205+i*68}" font-family="Urbanist" font-weight="800" font-size="62" fill="#FFFCEF">${escapeXml(line)}</text>`).join('')}${area?wrapLines(area.name,s=>s.length,28,2).map((line,i)=>`<text x="65" y="${410+i*48}" font-family="Urbanist" font-weight="800" font-size="42" fill="#FFDE59">${escapeXml(line)}</text>`).join(''):''}${art}<text x="65" y="582" font-family="Urbanist" font-weight="500" font-size="24" fill="#FFFCEF">bestday.ai/life-audit</text></svg>`;
 await writeFile(`${root}/og/${area?.id||'default'}.png`,stripPngMetadata(await sharp(Buffer.from(svg)).png().toBuffer()));
}
