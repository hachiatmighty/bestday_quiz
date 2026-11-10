(()=>{
const { createExplorationState, selectAnswer, openAudit, closeAudit } = globalThis.BestdayEditorialState;

const state = createExplorationState();
const landing = document.querySelector('#landing');
const audit = document.querySelector('#audit');
const heading = document.querySelector('#audit-heading');
const skip = document.querySelector('.skip-link');
let returnTarget = null;

function renderRoute() {
  const inAudit = location.hash === '#audit';
  landing.hidden = inAudit;
  audit.hidden = !inAudit;
  skip.href = inAudit ? '#audit' : '#content';
  if (inAudit) {
    if (state.screen !== 'audit') openAudit(state, window.scrollY);
    window.scrollTo(0, 0);
    heading.focus({ preventScroll: true });
  } else if (state.screen === 'audit') {
    const returnY = closeAudit(state);
    window.scrollTo(0, returnY);
    returnTarget?.focus({ preventScroll: true });
  }
}

skip.addEventListener('click', event => {
  if (state.screen === 'audit') { event.preventDefault(); heading.focus(); }
});

document.querySelectorAll('[data-start]').forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    returnTarget = link;
    openAudit(state, window.scrollY);
    history.pushState({ editorialAudit: true }, '', '#audit');
    renderRoute();
  });
});

function returnToNote(event) {
  if (state.screen !== 'audit') return;
  event.preventDefault();
  if (history.state?.editorialAudit) history.back();
  else {
    history.replaceState(null, '', location.pathname + location.search);
    renderRoute();
  }
}

document.querySelector('[data-return]').addEventListener('click', returnToNote);
document.querySelector('.nav .brand').addEventListener('click', returnToNote);
window.addEventListener('popstate', renderRoute);
window.addEventListener('hashchange', renderRoute);

function bindScale(selector, channel, statusSelector) {
  const scale = document.querySelector(selector);
  scale.addEventListener('click', event => {
    const button = event.target.closest('button[data-value]');
    if (!button || !scale.contains(button)) return;
    if (!selectAnswer(state, channel, Number(button.dataset.value))) return;
    scale.querySelectorAll('button').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    const answer = button.textContent.trim();
    document.querySelector(statusSelector).textContent = channel === 'practice'
      ? `Example answer: “${answer}”. The audit still starts fresh.`
      : `Your answer: “${answer}”.`;
  });
}

bindScale('[data-practice-scale]', 'practice', '[data-practice-status]');
bindScale('[data-audit-scale]', 'answer', '[data-audit-status]');

// Only this section responds to arrival. Every word is visible before and after it.
const statements = document.querySelector('.statements');
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
if ('IntersectionObserver' in window && !reduced.matches) {
  const observer = new IntersectionObserver(entries => {
    if (!entries.some(entry => entry.isIntersecting)) return;
    statements.classList.add('is-setting');
    observer.disconnect();
  }, { threshold: 0.5 });
  observer.observe(statements);
  reduced.addEventListener('change', event => {
    if (event.matches) { observer.disconnect(); statements.classList.remove('is-setting'); }
  });
}

renderRoute();

})();
