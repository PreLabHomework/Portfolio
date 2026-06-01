# Hamza's House

A personal portfolio built as an Overwatch 2-style character-select screen. Each hero is a section of my work: research labs, a senior design capstone, projects, papers, skills, timeline, affiliations, personal life, and Astakeria.

Hover to preview. Select to enter. ESC to go back.

**Live:** [https://prelabhomework.github.io/Portfolio/](https://prelabhomework.github.io/Portfolio/)

---

## Two modes

**Arena Mode** (`index.html`) is for everyone. Character roster, per-hero 3D figures, a reactive OW2-style atmospheric background, audio cues, and full detail screens for each section.

**Pro Mode** (`cv.html`) is for recruiters. Sticky left rail, scrollable right pane, clean layout, print-friendly. Direct link: `/cv.html`.

Both modes pull from the same `js/data.js`. Edit content once, both modes update.

URL hashes open a section directly — `#labs`, `#capstone`, `#projects`, `#experience`, etc.

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
  stage.js          Three.js per-hero figures
  shader.js         Canvas 2D atmospheric background
  audio.js          Synth tones + hover audio
assets/
  arena-backdrop.png  Boot screen background
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

Or use VS Code Live Server: right-click `index.html` and open with Live Server.

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
- **Three.js** for the per-hero 3D figures and environments
- **Canvas 2D** for the reactive atmospheric background shader (bokeh, columns, spotlight, dust)
- **Vite** for dev server and production build
- **GSAP** for figure animations (loaded via CDN, optional)
- **Web Audio API** for synth tones
- `speechSynthesis` for hover voice cues (muted by default)

Designed for desktop. Wide screen gets the full experience.

---

## About

Built by [Hamza Abu Khalaf Al Takrouri](https://www.linkedin.com/in/hakat/) — Computer and Electrical Engineer, Saint Louis University, graduated May 2026.

[LinkedIn](https://www.linkedin.com/in/hakat/) · [GitHub](https://github.com/PreLabHomework) · hamzaabukat@gmail.com
