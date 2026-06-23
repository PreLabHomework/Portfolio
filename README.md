# Hamza's House

Portfolio site built as an Overwatch 2 arena character-select screen. Each section is a hero with stats, lore, and a full detail view. Dual mode: Arena (full experience) and Pro (recruiter-friendly CV). Vite + vanilla JS + WebGL canvas.

Hover to preview. Select to enter. ESC to go back.

**Live:** [https://prelabhomework.github.io/Portfolio/](https://prelabhomework.github.io/Portfolio/)

---

## Two modes

**Arena Mode** (`index.html`) is for everyone. Character roster, per-hero 3D figures, a reactive OW2-style atmospheric background, audio cues, and full detail screens for each section.

**Pro Mode** (`cv.html`) is for recruiters. Sticky left rail, scrollable right pane, clean layout, print-friendly. Dual-persona system: ABU (Firmware / Embedded) and AKAT (Software / AI / ML) summaries always visible. Direct link: `/cv.html`.

Both modes pull from `js/data.js`. Edit content once, both modes update.

Clicking any resume button opens a full-screen OW-style resume select modal with two track cards, ABU (gold) and AKAT (cyan), each linking to its own resume PDF.

URL hashes open a section directly: `#labs`, `#capstone`, `#projects`, `#experience`, etc.

---

## File structure

```
index.html          Arena mode shell
cv.html             Pro mode shell
styles.css          Arena mode styles
cv.css              Pro mode styles
cv.js               Pro mode renderers
js/
  data.js           All content. One file, no CMS.
  main.js           Wires everything together
  sections.js       Per-hero detail screen renderers
  resume-picker.js  Full-screen OW-style resume select modal
  stage.js          Three.js per-hero figures
  shader.js         Canvas 2D atmospheric background
  audio.js          Synth tones + hover audio
assets/
  arena-backdrop.png  Boot screen + resume modal background
  heroes/             Hero portrait tiles
scripts/
  check-syntax.mjs    Syntax check across all JS modules
  check-content.mjs   Content audit: links, em dashes, roster integrity
```

---

## Run locally

```bash
npm install
npm run dev
```

Opens at `http://127.0.0.1:5173`. Hot reload on save.

---

## Build

```bash
npm run build
```

Output goes to `dist/`. Built with Vite.

---

## Before pushing

```bash
npm run check:syntax
npm run check:content
```

Syntax check across all JS modules, then a content audit for broken links, encoding issues, and duplicate roster entries. Both must pass before pushing.

---

## Tech

- Vanilla HTML, CSS, ES modules. No framework.
- **Three.js** for per-hero 3D figures and environments
- **Canvas 2D** for the reactive atmospheric background shader (bokeh, columns, spotlight, dust)
- **Vite** for dev server and production build
- **Web Audio API** for synth tones
- `speechSynthesis` for hover voice cues (muted by default)

Designed for desktop. Wide screen gets the full experience.

---

## About

Built by [Hamza Abu Khalaf Al Takrouri](https://www.linkedin.com/in/hakat/) — Computer and Electrical Engineer, Saint Louis University, graduated May 2026.

[LinkedIn](https://www.linkedin.com/in/hakat/) · [GitHub](https://github.com/PreLabHomework) · hamzaabukat@gmail.com
