'use strict';
// stack-diagram pages are embedded as same-origin iframes: follow the site theme and scale to the card width.
(() => {
  const root = document.documentElement;
  const frames = [...document.querySelectorAll('iframe.stack-frame')];
  function fit(frame) {
    let doc;
    try { doc = frame.contentDocument; } catch (e) { return; }
    if (!doc || !doc.body) return;
    const canvas = doc.querySelector('.canvas'), page = doc.querySelector('.page');
    if (!canvas || !page) return;
    doc.documentElement.dataset.theme = root.dataset.theme === 'light' ? 'light' : 'dark';
    page.style.zoom = '';
    // Shrink to the card, but never below a readable size: narrow screens scroll the canvas instead.
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
})();
