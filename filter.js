'use strict';
// Timeline filter: keep only the entries of the chosen kind of work; everything else folds away.
(() => {
  const bar = document.getElementById('journey-filter');
  if (!bar) return;
  const section = document.getElementById('journey');
  const items = [...document.querySelectorAll('.timeline-list > li')];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const LEAVE = 320;
  let timer = 0;
  const matches = (li, kind) => kind === 'all' || (li.dataset.cat || '').split(' ').includes(kind);

  for (const button of bar.querySelectorAll('[data-filter]')) {
    const kind = button.dataset.filter, count = button.querySelector('.count');
    if (count) count.textContent = items.filter(li => matches(li, kind)).length;
  }

  function apply(kind) {
    for (const button of bar.querySelectorAll('[data-filter]')) button.setAttribute('aria-pressed', String(button.dataset.filter === kind));
    section.dataset.filter = kind;
    clearTimeout(timer);
    const leaving = items.filter(li => !li.hidden && !matches(li, kind));
    const entering = items.filter(li => li.hidden && matches(li, kind));
    const instant = reduced.matches || !leaving.length;
    // Fold leaving rows: pin their height, then collapse it while they fade and slide.
    for (const li of leaving) {
      li.style.maxHeight = li.offsetHeight + 'px';
      void li.offsetHeight;
      li.classList.add('is-leaving');
      li.style.maxHeight = '0px';
    }
    dispatchEvent(new Event('timeline-filter'));
    timer = setTimeout(() => {
      for (const li of leaving) { li.hidden = true; li.classList.remove('is-leaving'); li.style.maxHeight = ''; }
      entering.forEach((li, i) => { li.hidden = false; li.classList.add('is-entering'); li.style.transitionDelay = Math.min(i * 40, 400) + 'ms'; });
      dispatchEvent(new Event('timeline-filter'));
      requestAnimationFrame(() => requestAnimationFrame(() => {
        entering.forEach(li => li.classList.remove('is-entering'));
        setTimeout(() => entering.forEach(li => { li.style.transitionDelay = ''; }), 800);
      }));
      const top = section.getBoundingClientRect().top;
      if (top < 0) section.scrollIntoView({behavior: reduced.matches ? 'auto' : 'smooth'});
    }, instant ? 0 : LEAVE);
  }

  bar.addEventListener('click', event => {
    const button = event.target.closest('[data-filter]');
    if (button && button.getAttribute('aria-pressed') !== 'true') apply(button.dataset.filter);
  });
})();
