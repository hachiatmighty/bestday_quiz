import { areas, contextOptions, timeOptions, horizonOptions } from '../../life-audit/data/audit.mjs';

const ids = options => new Set(options.map(option => option.id));
const areaIds = ids(areas);
const segments = ids(contextOptions);
const times = ids(timeOptions);
const horizons = ids(horizonOptions);
const attributionKeys = new Set(['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']);

// Allowlist both keys and values. Never accept nested objects or arbitrary free text.
export function lifeAuditProperties(properties = {}) {
  const clean = { quiz: 'life_audit' };
  for (const [key, value] of Object.entries(properties)) {
    const valid =
      (key === 'edited' && typeof value === 'boolean') ||
      (key === 'step' && Number.isInteger(value) && value >= 0 && value <= 32) ||
      (['area_id', 'focus_area_id'].includes(key) && areaIds.has(value)) ||
      (key === 'ref' && areaIds.has(value)) ||
      (key === 'segment' && segments.has(value)) ||
      (key === 'time_option' && times.has(value)) ||
      (key === 'horizon' && horizons.has(value)) ||
      (key === 'channel' && ['whatsapp', 'instagram', 'share', 'save', 'web', 'email'].includes(value)) ||
      (key === 'quiz_version' && typeof value === 'string' && /^(?:dev|[a-f0-9]{7,40})$/.test(value)) ||
      (attributionKeys.has(key) && typeof value === 'string' && /^[a-zA-Z][a-zA-Z0-9_-]{0,79}$/.test(value));
    if (valid) clean[key] = value;
  }
  return clean;
}
