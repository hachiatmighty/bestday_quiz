(()=>{
const validAnswer = value => Number.isInteger(value) && value >= 0 && value <= 4;

// Example answers never become personal answers. Nothing persists outside this visit.
function createExplorationState() {
  return { practice: null, answer: null, screen: 'landing', returnY: 0 };
}

function selectAnswer(state, channel, value) {
  if (!['practice', 'answer'].includes(channel) || !validAnswer(value)) return false;
  state[channel] = value;
  return true;
}

function openAudit(state, returnY) {
  state.screen = 'audit';
  state.returnY = Number.isFinite(returnY) ? Math.max(0, returnY) : 0;
  return state;
}

function closeAudit(state) {
  state.screen = 'landing';
  return state.returnY;
}

globalThis.BestdayEditorialState = Object.freeze({ createExplorationState, selectAnswer, openAudit, closeAudit });
})();
