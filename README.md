# Hamza's House

Portfolio site built as an Overwatch arena character-select screen. Each section is a hero with an Overwatch-style Hero Info page: weapon, abilities, ultimate, passive, and perks, with the full story in a Debrief tab. Dual mode: Arena (full experience) and Pro (recruiter-friendly CV). Vite, vanilla JS, Tailwind v4, Three.js.

Hover to preview. Select to enter. ESC to go back.

**Live:** [https://prelabhomework.github.io/Portfolio/](https://prelabhomework.github.io/Portfolio/)

---

## Two modes

**Arena Mode** (`index.html`) is for everyone. Character roster, per-hero 3D figures, a reactive Overwatch-style atmospheric background, audio cues, and full detail screens for each section.

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

Built by [Hamza Abu Khalaf Al Takrouri](https://www.linkedin.com/in/hakat/). M.S. Computer Engineering student at George Mason University (CAES/DSYS), B.S. Computer and Electrical Engineering from Saint Louis University. Open to internships and co-ops in embedded, firmware, RTL, and validation.

Icons: [game-icons.net](https://game-icons.net), CC BY 3.0. See [CREDITS.md](CREDITS.md).

[LinkedIn](https://www.linkedin.com/in/hakat/) · [GitHub](https://github.com/PreLabHomework) · hamzaabukat@gmail.com
