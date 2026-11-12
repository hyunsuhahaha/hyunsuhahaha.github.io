'use strict';
// Language (KOR/ENG) and colour theme switches shared by every page. Choices persist per visitor.
(() => {
  const root = document.documentElement;
  const save = (key, value) => { try { localStorage.setItem(key, value); } catch (e) { /* private mode: keep for this page only */ } };
  function sync() {
    for (const button of document.querySelectorAll('[data-set-lang]')) {
      button.setAttribute('aria-pressed', String(button.dataset.setLang === root.lang));
    }
    const light = root.dataset.theme === 'light';
    for (const button of document.querySelectorAll('[data-toggle-theme]')) {
      button.setAttribute('aria-pressed', String(!light));
      button.setAttribute('aria-label', root.lang === 'ko' ? (light ? '다크 모드 켜기' : '다크 모드 끄기') : (light ? 'Turn dark mode on' : 'Turn dark mode off'));
    }
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = light ? '#f7f2e7' : '#080d18';
  }
  document.addEventListener('click', event => {
    const lang = event.target.closest('[data-set-lang]');
    if (lang) { root.lang = lang.dataset.setLang; save('lang', root.lang); sync(); dispatchEvent(new Event('resize')); return; }
    if (event.target.closest('[data-toggle-theme]')) {
      root.dataset.theme = root.dataset.theme === 'light' ? 'dark' : 'light';
      save('theme', root.dataset.theme); sync();
    }
  });
  sync();
})();
