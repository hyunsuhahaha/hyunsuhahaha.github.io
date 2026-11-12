# Hyunsu Lee — portfolio

[hyunsuhahaha.github.io](https://hyunsuhahaha.github.io/)

Static HTML/CSS/JavaScript portfolio: an animated ASCII technology tree, chronological journey, public project links and three tiny AI workers.

## Preview

```sh
python -m http.server 8000 --bind 127.0.0.1
```

Open http://127.0.0.1:8000. No install or build step is required.

## Checks

```sh
node check-tree.cjs
node check-timeline.cjs
node check-companions.cjs
```

## Structure

- `index.html`, `style.css`: identity, journey, projects and contact.
- `tree.js`: rotating ASCII tree and seventeen technology fruit; names appear on hover/focus.
- `timeline.js`, `emblems.js`: chronological milestones, ASCII symbols and electrical accents.
- `companions.js`: GPT/Codex, Claude and Gemini typing, stashing, resolving conflicts and pushing little commits to the tree. These are visual events; no Git commands execute.
- `assets/`: self-hosted fonts, resume, technology icons and companion marks.
- `projects/mes-anomaly-detection/`, `index/`: retained previous project/index URLs.

GitHub Pages serves the repository root on `main`. `.nojekyll` bypasses Jekyll processing. Previous versions remain in Git history.

## Asset sources

- Space Grotesk and IBM Plex Mono: Google Fonts; OFL licenses included.
- Technology icons: [Devicon](https://github.com/devicons/devicon), MIT license included. Converted into colored ASCII glyphs in the browser.
- Claude mark: [Simple Icons](https://github.com/simple-icons/simple-icons/blob/develop/icons/claude.svg).
- GPT/Codex knot: installed OpenAI desktop application icon.
- Gemini: unmodified official four-color sparkle linked by [Gemini](https://gemini.google.com/).
- Dongguk symbol: [official university UI](https://www.dongguk.edu/page/103).
- Army emblem: [ROK Army official profile](https://x.com/ROK_Army).
- Flag reference: [Ministry of the Interior and Safety](https://www.mois.go.kr/chd/sub/a05/birth/screen.do).
