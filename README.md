# Hamza's House

A personal portfolio styled as a fighter-select screen. Each hero is a part of my work: three research labs, a senior design capstone, a project gallery, papers and patents, skills, timeline, affiliations, off-duty life, and one weird game I'm building on the side.

Hover to preview. Select to enter. ESC to come back.

> **Live at: https://prelabhomework.github.io/Portfolio/

---

## What's in here

```
index.html
styles.css
js/
  main.js          wires everything together
  data.js          all content. one file, no CMS.
  sections.js      per-character page renderers
  select.js        character-select state machine
  stage.js         Three.js per-character figures + environments
  shader.js        reactive WebGL background
  boot.js          opening sequence
  audio.js         synth tones + speechSynthesis TTS
scripts/
  check-content.mjs   lint for stale copy + broken links
  check-syntax.mjs    syntax sweep across all JS modules
```

No build step required. Vanilla HTML + ES modules + GSAP + Three.js. The `package.json` is for dev tooling and an optional Vite dev server. Live Server works fine.

## Run it locally

**With VS Code Live Server** (easiest):

1. Open the folder in VS Code
2. Right-click `index.html` → `Open with Live Server`

**With Vite** (faster reload, optional):

```bash
npm install
npm run dev
```

## Before pushing

```bash
npm run check
```

Runs syntax check across the JS modules and a content audit (no stale copy, no broken links, no duplicate roster entries). Useful before every push because vanilla JS is easy to break silently.

## Tech

- Vanilla HTML, CSS, ES modules — no framework, no bundler required
- Three.js for the per-character 3D figures and environments
- WebGL fragment shader for the reactive background
- GSAP for animation
- `speechSynthesis` for the hover voice cues
- Web Audio API for the synth tones

Designed first for desktop. Mobile is functional but the experience is built for a wide screen.

## Roadmap

A few things I want to add when there's time:

- Real character art over the procedural Three.js figures
- Real screenshots in the projects gallery (TremorMonitor, FPGA HDMI output, WiFi heatmap, Waylo)
- Actual logos in the affiliations wall
- One more character in the `???-11` slot

## Credits

Built by [Hamza Abu Khalaf Al Takrouri](https://www.linkedin.com/in/hakat/). Senior Computer & Electrical Engineer at Saint Louis University, graduating May 2026.

Visual references: Overwatch 2 character select, Mortal Kombat X roster screen.

Open to firmware, hardware, software, and anything that lets me work close to the metal. [Resume](https://drive.google.com/file/d/1SwmqFIcCpLUo2hbO0_iGhyaxgRQwBSgC/view?usp=drive_link) · [LinkedIn](https://www.linkedin.com/in/hakat/) · [GitHub](https://github.com/PreLabHomework)
