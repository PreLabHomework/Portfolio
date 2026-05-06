# Hamza's House

A personal portfolio styled as a fighter-select screen. Each hero is a part of my work: three research labs, a senior design capstone, a project gallery, papers and patents, skills, timeline, affiliations, off-duty life, and one weird game I'm building on the side.

Hover to preview. Select to enter. ESC to come back.

**Live at:** [https://prelabhomework.github.io/Portfolio/](https://prelabhomework.github.io/Portfolio/)

The site opens with a boot sequence that ends in two choices: **Professional Mode** (clean scrollable resume) or **Interactive Mode** (the full character-select experience). Both are powered by the same content file.

## What's in here

```
index.html             interactive mode shell
cv.html                professional mode shell
styles.css             interactive mode styles
cv.css                 professional mode styles
cv.js                  professional mode renderers
js/
  main.js              wires everything together
  data.js              all content. one file, no CMS.
  sections.js          per-character page renderers (interactive)
  select.js            character-select state machine
  stage.js             Three.js per-character figures + environments
  shader.js            reactive WebGL background
  boot.js              opening sequence + dual-mode picker
  audio.js             synth tones + speechSynthesis TTS
scripts/
  check-content.mjs    lint for stale copy and broken links
  check-syntax.mjs     syntax sweep across all JS modules
```

`data.js` is the single source of truth. Edit content there and both modes update.

No build step required. Vanilla HTML, ES modules, GSAP, and Three.js. The `package.json` is for dev tooling and an optional Vite dev server. Live Server works fine.

## Two modes

**Professional Mode** (`cv.html`) is for recruiters, HR, and PIs. Sticky left rail, scrollable right pane, no animations, print-friendly. Recruiter shortcut: `https://prelabhomework.github.io/Portfolio/cv.html`.

**Interactive Mode** (`index.html`) is for everyone else. Fighter-select roster, per-character 3D figures, reactive background, audio cues. ESC returns from a section. Use the HUD HOME button to return to the start screen.

URL hashes skip the boot picker:
- `index.html#interactive` enters interactive mode directly
- `index.html#pro` redirects to professional mode

## Run it locally

With VS Code Live Server (easiest):

1. Open the folder in VS Code
2. Right-click `index.html`, then click `Open with Live Server`

With Vite (faster reload, optional):

```bash
npm install
npm run dev
```

## Before pushing

```bash
npm run check
```

Runs a syntax check across the JS modules and a content audit (no stale copy, no broken links, no duplicate roster entries). Useful before every push because vanilla JS breaks silently.

## Tech

* Vanilla HTML, CSS, ES modules. No framework, no bundler required.
* Three.js for the per-character 3D figures and environments
* WebGL fragment shader for the reactive background
* GSAP for animation
* `speechSynthesis` for the hover voice cues
* Web Audio API for the synth tones
* Audio is muted by default. Visitors opt in with the speaker icon.

Designed first for desktop. Mobile is functional but the experience is built for a wide screen.

## Roadmap

A few things I want to add when there's time:

* Real character art over the procedural Three.js figures
* Real screenshots in the projects gallery (TremorMonitor, FPGA HDMI output, WiFi heatmap, Waylo)
* Actual logos in the affiliations wall
* One more character in the `???-11` slot
* Re-enable the resume download link once the new resume is final

## Credits

Built by [Hamza Abu Khalaf Al Takrouri](https://www.linkedin.com/in/hakat/). Senior Computer and Electrical Engineer at Saint Louis University, graduating May 2026.

Visual references: Overwatch 2 character select, Mortal Kombat X roster screen.

Open to firmware, hardware, software, and anything that lets me work close to the metal. [LinkedIn](https://www.linkedin.com/in/hakat/) · [GitHub](https://github.com/PreLabHomework) · contact: hamzaabukat@gmail.com
