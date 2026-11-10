(() => {
  'use strict';
  const { questions, areas, reading, answer, sectorPath } = WorkingAudit;
  const $ = (selector) => document.querySelector(selector);
  let answers = [];
  let landingScroll = 0;
  let restoreFocus = null;
  const labelValues = ['Not me', 'Mostly not me', 'A bit like me', 'Mostly me', 'That’s me'];
  function wheel(values, focus, label) {
    const content = areas.map(([id, name], index) => {
      const value = values[id];
      const active = focus === id;
      const angle = -Math.PI / 2 + (index + .5) * Math.PI / 4;
      const x = Math.cos(angle) * 136, y = Math.sin(angle) * 136;
      const variant = active ? '' : value == null ? '-grey' : '-cream';
      return `<g><path d="${sectorPath(index, 4)}" fill="none" stroke="#B6B4AB" stroke-width=".7"/><path class="slice" data-area="${id}" d="${sectorPath(index, value ?? 0)}" fill="${active ? '#FFDE59' : '#FFFCEF'}" stroke="#0D0D0D" stroke-width="2"/><image class="${active ? 'focus-figure' : 'rim-figure'}" href="assets/figures/${id}${variant}.webp" x="${x - 26}" y="${y - 26}" width="52" height="52"/><title>${name}: ${value == null ? 'unanswered' : 'answered'}</title></g>`;
    }).join('');
    return `<svg class="wheel-svg" viewBox="-172 -172 344 344" role="img" aria-label="${label}"><circle r="172" fill="#0D0D0D"/>${[25,50,75,100].map(r => `<circle r="${r}" fill="none" stroke="#3A3A35" stroke-width=".5"/>`).join('')}${content}<circle r="6" fill="#FFFCEF"/></svg>`;
  }
  function renderDemo(focusAnswer = false) {
    const done = answers.length === questions.length;
    $('.demo').classList.toggle('complete', done);
    $('#demo-count').textContent = done ? '3 of 3' : `${answers.length + 1} of 3`;
    $('#demo-statement').textContent = done ? 'One area taking shape.' : questions[answers.length].text;
    $('#demo-answers').hidden = done;
    $('#demo-done').hidden = !done;
    $('#demo-back').disabled = answers.length === 0;
    $('#demo-status').textContent = answers.length ? `${answers.length} practice ${answers.length === 1 ? 'answer' : 'answers'}. Nothing saved.` : 'Practice only. Nothing is saved.';
    $('#demo-wheel').innerHTML = wheel(answers.length ? { work: reading(answers) } : {}, answers.length ? 'work' : null, answers.length ? `Practice wheel: Work ${done ? 'complete' : 'still building'}, other areas unanswered` : 'Practice wheel: all 8 areas unanswered');
    if (focusAnswer) (done ? $('#demo-reset') : $('#demo-answers .answer')).focus({ preventScroll: true });
  }
  $('#demo-answers').addEventListener('click', event => {
    const button = event.target.closest('[data-value]');
    if (!button) return;
    const keyboard = event.detail === 0;
    answers = answer(answers, Number(button.dataset.value));
    renderDemo(keyboard);
  });
  $('#demo-back').addEventListener('click', () => { answers = answers.slice(0, -1); renderDemo(true); });
  $('#demo-reset').addEventListener('click', () => { answers = []; renderDemo(true); });
  function route() {
    const audit = location.hash === '#audit';
    if (audit && !$('#landing').hidden) {
      landingScroll = window.scrollY;
      restoreFocus = document.activeElement;
      answers = [];
      renderDemo();
      document.querySelectorAll('[data-handoff]').forEach(button => button.setAttribute('aria-pressed', 'false'));
      $('#handoff-status').textContent = 'This is the first question. The full audit continues from here.';
    }
    $('#landing').hidden = audit;
    $('#handoff').hidden = !audit;
    $('.nav__links').hidden = audit;
    $('.nav-start').hidden = audit;
    $('.skip-link').href = audit ? '#handoff' : '#main';
    if (audit) { window.scrollTo(0, 0); $('#handoff').focus({ preventScroll: true }); }
  }
  document.querySelectorAll('[data-start]').forEach(link => link.addEventListener('click', () => {
    // The route is deliberately memory-only; demonstration answers never enter the handoff.
    if (location.hash === '#audit') route();
  }));
  $('#return-link').addEventListener('click', event => {
    event.preventDefault();
    history.replaceState(null, '', location.pathname + location.search + '#hero');
    route();
    window.scrollTo(0, landingScroll);
    restoreFocus?.focus({ preventScroll: true });
  });
  document.querySelectorAll('[data-handoff]').forEach(button => button.addEventListener('click', () => {
    document.querySelectorAll('[data-handoff]').forEach(other => other.setAttribute('aria-pressed', String(other === button)));
    $('#handoff-status').textContent = `You chose “${labelValues[Number(button.dataset.handoff)]}”. This exploration ends here. Your answer hasn’t been saved.`;
  }));
  window.addEventListener('hashchange', route);
  $('#result-wheel').innerHTML = wheel({work:1.9,money:2.7,health:3.2,relationships:2.3,growth:2.9,rest:1.3,home:3.4,meaning:2.6}, 'work', 'Fictional example wheel across 8 life areas. Work is the chosen focus; Rest has a lower reading.');
  renderDemo();
  route();
})();
