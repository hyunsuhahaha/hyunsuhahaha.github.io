'use strict';
// Shared behaviour for detail pages: stack-diagram frames, quiet section entrance, active contents link.
(() => {
  const root = document.documentElement;

  // Diagrams are same-origin iframes: follow the site theme and scale to the column width.
  const frames = [...document.querySelectorAll('iframe.stack-frame')];
  function fit(frame) {
    let doc;
    try { doc = frame.contentDocument; } catch (e) { return; }
    if (!doc || !doc.body) return;
    const canvas = doc.querySelector('.canvas'), page = doc.querySelector('.page');
    if (!canvas || !page) return;
    doc.documentElement.dataset.theme = root.dataset.theme === 'light' ? 'light' : 'dark';
    doc.body.style.background = 'transparent';
    page.style.zoom = '';
    const natural = canvas.offsetWidth + 30;
    const fitZoom = (frame.clientWidth - 2) / natural, zoom = Math.max(0.6, Math.min(1, fitZoom));
    page.style.zoom = String(zoom);
    const scroller = doc.querySelector('.scroller');
    if (scroller) scroller.style.overflowX = fitZoom < 0.6 ? 'auto' : 'hidden';
    frame.style.height = Math.ceil(page.getBoundingClientRect().bottom + 12) + 'px';
  }
  frames.forEach(frame => { frame.addEventListener('load', () => fit(frame)); fit(frame); });
  addEventListener('resize', () => frames.forEach(fit));
  new MutationObserver(() => frames.forEach(fit)).observe(root, {attributes: true, attributeFilter: ['data-theme']});

  // Sections fade in once as they enter the viewport.
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const blocks = [...document.querySelectorAll('.hero, .facts, .item')];
  if (!reduced && 'IntersectionObserver' in window) {
    blocks.forEach(el => el.classList.add('reveal'));
    const io = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) { entry.target.classList.add('is-in'); io.unobserve(entry.target); }
    }, {rootMargin: '0px 0px -8% 0px'});
    blocks.forEach(el => io.observe(el));
  }

  // Highlight the contents entry for the section in view.
  const links = new Map([...document.querySelectorAll('.toc a')].map(a => [a.getAttribute('href').slice(1), a]));
  if (links.size && 'IntersectionObserver' in window) {
    const spy = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) {
        links.forEach(a => a.classList.remove('is-active'));
        const a = links.get(entry.target.id); if (a) a.classList.add('is-active');
      }
    }, {rootMargin: '-35% 0px -55% 0px'});
    document.querySelectorAll('.item[id]').forEach(el => spy.observe(el));
  }
})();
