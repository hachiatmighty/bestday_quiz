import { exampleAreas, scale } from './example.mjs';

const answers = document.querySelector('#area-answers');
function showEvidence(id) {
  const area = exampleAreas.find(item => item.id === id);
  if (!area) return;
  document.querySelector('#evidence-area').textContent = area.name;
  const skipped = area.responses.every(answer => answer === null);
  document.querySelector('#evidence-count').textContent = skipped ? 'Area skipped' : '5 answers';
  document.querySelector('#evidence-intro').textContent = skipped
    ? 'This area was skipped. Its slice stays missing.'
    : 'This slice came from these 5 answers.';
  const rows = skipped ? [['No answers given', 'Missing']] : [
    ...area.statements.map((statement, index) => [statement, scale[area.responses[index]]]),
    ['How is it going, in a word?', area.check],
  ];
  answers.replaceChildren(...rows.map(([statement, answer]) => {
    const row = document.createElement('li');
    const text = document.createElement('span');
    const value = document.createElement('strong');
    text.textContent = statement;
    value.textContent = answer;
    row.append(text, value);
    return row;
  }));
  document.querySelectorAll('[data-area]').forEach(button => {
    button.setAttribute('aria-pressed', String(button.dataset.area === id));
  });
  document.querySelectorAll('.large-wheel [data-wheel-area]').forEach(sector => {
    sector.classList.toggle('wheel-active', sector.dataset.wheelArea === id);
    sector.classList.toggle('wheel-muted', sector.dataset.wheelArea !== id);
  });
}
document.querySelectorAll('[data-area]').forEach(button => {
  button.addEventListener('click', () => showEvidence(button.dataset.area));
});

const landing = document.querySelector('#top');
const footer = document.querySelector('.closing');
const handoff = document.querySelector('#audit');
const navLinks = document.querySelector('.nav__links');
const navBack = document.querySelector('.nav-back');
let returnScroll = 0;
let returnFocus = null;
let inAudit = false;

document.querySelectorAll('a[href="#audit"]').forEach(link => {
  link.addEventListener('click', () => {
    returnScroll = window.scrollY;
    returnFocus = link;
  });
});

function syncRoute() {
  const next = window.location.hash === '#audit';
  if (next === inAudit) return;
  inAudit = next;
  landing.hidden = next;
  footer.hidden = next;
  handoff.hidden = !next;
  navLinks.hidden = next;
  navBack.hidden = !next;
  document.querySelector('.skip-link').setAttribute('href', next ? '#audit' : '#top');
  document.body.classList.toggle('is-audit', next);
  document.title = next ? 'Work and direction | Bestday Life Audit' : 'Bestday Life Audit: a view of your life, one goal to take forward';
  if (next) {
    window.scrollTo(0, 0);
    document.querySelector('#question-title').focus({ preventScroll: true });
  } else {
    requestAnimationFrame(() => {
      window.scrollTo(0, returnScroll);
      returnFocus?.focus({ preventScroll: true });
    });
  }
}
window.addEventListener('hashchange', syncRoute);
syncRoute();

document.querySelectorAll('[data-answer]').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-answer]').forEach(choice => {
      choice.setAttribute('aria-pressed', String(choice === button));
    });
    document.querySelector('.answer-status').textContent = `You chose “${scale[Number(button.dataset.answer)]}”.`;
  });
});
