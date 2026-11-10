export function validateHandoff({noindex='true',token,allowNoToken,web,email}) {
 const warnings=[];
 if(!web || !email){const message='Life Audit Branch links missing: LIFE_AUDIT_WEB / LIFE_AUDIT_EMAIL';if(noindex==='false')throw new Error(message);warnings.push('WARNING: REVIEW ONLY. '+message);}
 if(!token?.trim()) {if(allowNoToken!=='1' || noindex==='false')throw new Error('PUBLIC_MIXPANEL_TOKEN is required');warnings.push('WARNING: REVIEW ONLY. NO MIXPANEL TOKEN. DO NOT LAUNCH THIS ZIP.');}
 return warnings;
}
