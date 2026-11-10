import { answerSelection, sharePreview } from './preview.mjs';

const landing = document.querySelectorAll('#main > section:not(#first-question)');
const handoff = document.querySelector('#first-question');
const footer = document.querySelector('#start');
const toggle = document.querySelector('#include-wheel');
const sharedWheel = document.querySelector('#shared-wheel');
const shareStatus = document.querySelector('#share-status');
let returnFocus;
let returnScroll = 0;

function renderRoute() {
  const isAudit = location.hash === '#first-question';
  landing.forEach(section => { section.hidden = isAudit; });
  footer.hidden = isAudit;
  handoff.hidden = !isAudit;
  document.querySelector('.nav-links').hidden = isAudit;
  document.querySelector('.nav-start').hidden = isAudit;
  if (isAudit) {
    window.scrollTo(0, 0);
    document.querySelector('#question-title').focus({ preventScroll: true });
    document.title = 'Work and direction | Bestday Life Audit';
  } else {
    document.title = 'Bestday Life Audit | Your people, too';
    if (returnFocus) {
      window.scrollTo(0, returnScroll);
      returnFocus.focus({ preventScroll: true });
      returnFocus = undefined;
    }
  }
}

document.querySelectorAll('[data-start]').forEach(link => link.addEventListener('click', () => {
  returnFocus = link;
  returnScroll = window.scrollY;
}));
document.querySelector('#return-landing').addEventListener('click', () => {
  if (returnFocus) history.back();
  else location.hash = '#home';
});
window.addEventListener('hashchange', renderRoute);
renderRoute();

toggle.addEventListener('change', () => {
  const state = sharePreview(toggle.checked);
  sharedWheel.hidden = !state.includeWheel;
  shareStatus.textContent = state.description;
  document.querySelector('.share-export').classList.toggle('with-wheel', state.includeWheel);
});

document.querySelectorAll('[data-answer]').forEach(button => button.addEventListener('click', () => {
  const answer = answerSelection(Number(button.dataset.answer));
  document.querySelectorAll('[data-answer]').forEach(option => option.setAttribute('aria-pressed', String(option === button)));
  document.querySelector('#answer-status').textContent = `You chose “${answer.label}”. This first-question preview ends here. You can change your answer.`;
}));
