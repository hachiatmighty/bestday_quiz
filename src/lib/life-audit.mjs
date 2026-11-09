import { areas, contextOptions, timeOptions } from '../../life-audit/data/audit.mjs';

export function createAuditState() {
  return { ratings: {}, segment: null, focusArea: null, timeOption: null, questionIndex: 0 };
}
const hasId = (options, id) => options.some(option => option.id === id);
const rated = value => Number.isInteger(value) && value >= 0 && value <= 10;

export function recordSegment(state, segment) {
  if (!hasId(contextOptions, segment)) throw new RangeError('Unknown segment');
  state.segment = segment;
  state.questionIndex = 1;
}
export function startAudit(state) {
  if (state.questionIndex === 1) state.questionIndex = 2;
}
export function recordRating(state, areaId, value) {
  if (!hasId(areas, areaId) || (value !== null && !rated(value))) throw new RangeError('Invalid rating');
  const index = areas.findIndex(area => area.id === areaId);
  if (state.questionIndex !== index + 2) throw new RangeError('Answer the current area');
  state.ratings[areaId] = value;
  if (value === null && state.focusArea === areaId) {
    state.focusArea = null;
    state.timeOption = null;
  }
  state.questionIndex += 1;
}
export function focusOptions(state) {
  return areas.filter(area => rated(state.ratings[area.id]));
}
export function recordFocus(state, areaId) {
  if (state.questionIndex !== 10 || !focusOptions(state).some(area => area.id === areaId)) throw new RangeError('Choose a rated area');
  state.focusArea = areaId;
  state.questionIndex = 11;
}
export function recordTime(state, timeOption) {
  if (state.questionIndex !== 11 || !state.focusArea || !hasId(timeOptions, timeOption)) throw new RangeError('Invalid time option');
  state.timeOption = timeOption;
  state.questionIndex = 12;
}
export function goBack(state) {
  state.questionIndex = Math.max(0, state.questionIndex - 1);
}
export function suggestionsFor(areaId, timeOption) {
  return [...(areas.find(area => area.id === areaId)?.suggestions[timeOption] ?? [])];
}

// Paths use a 200 x 200 viewBox by default, starting at twelve o'clock.
// Missing sectors have no value path; render their full sector with a hatch or outline.
export function wheelGeometry(ratings, radius = 100) {
  if (!Number.isFinite(radius) || radius <= 0) throw new RangeError('Invalid radius');
  const point = (angle, r) => [radius + Math.cos(angle) * r, radius + Math.sin(angle) * r].map(n => Number(n.toFixed(6))).join(' ');
  const sector = (start, end, r) => r === 0 ? `M ${radius} ${radius} Z` : `M ${radius} ${radius} L ${point(start, r)} A ${r} ${r} 0 0 1 ${point(end, r)} Z`;
  return areas.map((area, index) => {
    const value = ratings[area.id];
    const missing = !rated(value);
    const startAngle = -Math.PI / 2 + index * Math.PI / 4;
    const endAngle = startAngle + Math.PI / 4;
    const valueRadius = missing ? null : radius * value / 10;
    return { id: area.id, missing, radius: valueRadius, startAngle, endAngle,
      sectorPath: sector(startAngle, endAngle, radius),
      path: missing ? null : sector(startAngle, endAngle, valueRadius) };
  });
}
