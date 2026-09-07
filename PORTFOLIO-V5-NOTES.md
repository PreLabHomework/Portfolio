# Portfolio v5 — Session Notes

## What was built

### Visual

- **Background** — Full OW2 character-select atmosphere. Canvas 2D shader with 9 bokeh
  light sources (warm/cool, breathing), 7 architectural column silhouettes with rim
  lighting, atmospheric haze band, warm hero spotlight from below center, 22 dust motes,
  vignette. Hero accent colors bleed into the atmosphere on hover.

- **Icons** — 30+ distinct white-silhouette SVGs in the OW ability-icon style. Every
  category has a unique shape. No two rows share a glyph.

- **View buttons** — OW parallelogram diagonal clip-path on every hero page action button.

- **Roster** — Centered flex layout so heroes sit in the middle of the screen, not
  left-aligned.

- **Detail header** — Reduced ~20% globally (smaller heading, tighter padding) so sections
  have more room.

### Sections redesigned

| Section | Format |
|---|---|
| Home | D.Va 3-column overview (profile, quick facts, how to navigate) |
| Labs | Tabbed dossier (Chrome / WNIS / Biomechanics) |
| Experience | Prose paragraph entries, no bullet lists |
| Capstone | D.Va layout: clinical context left, pipeline right, TremorMonitor app full-width below |
| Projects | 4-column hero gallery |
| Research | 2-column: papers left, compact cert grid right |
| Loadout | Languages at top as bars, then 2-column skill bar grid |
| Timeline | 2-column card grid with OW diagonal clip-path |
| Affiliations | Grouped: Academic / Industry / Orgs, brand-color diagonal tiles |
| Contact | OW comms panel with pulsing status dot, direct lines, quick link CTAs |
| Astakeria | Expanded: 5-tier Entropy system, hero mechanics, Lite Nemesis, Godot architecture, build phases, 3 source documents |
| Personal | Flag emoji fixed, geo cards + rank grid + stories + endeavors |

### Content (from master context doc)

- All section subtitles rewritten to be specific and impressive
- Home bio updated: credentials + tangible achievements in two sentences
- All 4 experience entries rewritten as narrative prose, not resume bullets
- GUARD: co-authored multi-author paper, correct framing
- Tremor Trackers: 4-member team (no names), FDR clinical content, medication concept
- QBC: SLU Launch prize, Sam Ghaddar, full redesign motivation, cost breakdown
- Capstone data expanded with clinical problem, approach, validation target
- Astakeria: massively expanded from 3 source documents
- Projects: UART upgraded to full narrative, lab websites split into 3 entries, Arabic pipeline before Waylo
- Personal endeavors ordered by ECE relevance; stories ordered by impressiveness
- "Graduated May 2026" everywhere (was graduating)
- Zero em dashes anywhere
- All flag emoji fixed (were double-encoded garbage from a PowerShell encoding incident)

### Pro Mode fixes

- Clip-path removed from `.cv-lab-status` and `.cs-chip` — was cutting first character off every lab status and chip label
- Capstone: `[object Object]` fixed (modules are now objects, cv.js updated to use `m.n`)
- Capstone: `s.pitch` undefined fixed (now reads from `s.clinical.approach`)
- Loadout left padding added
- Timeline left padding added
- Certification box left padding added
- cv.html hero header: "Graduated May 2026", "available now"

### Code

- Deleted: `boot.js`, `select.js`, 4 CHANGELOG files, `.codex-screens/`, 6 hero source
  images, `loadout-rack.svg`, `models/README.md`, temp logs
- `styles.css`: 3,111 lines -> 2,761 lines (removed 390+ lines of dead pre-v5 section CSS)
- `data.js`: removed all `recruiter` arrays, `CONTACT` export
- `main.js`: removed dead CONTACT import
- All `kr2-strip` stat bars removed from every section

---

## What's left

### Blocked on you (can't do without your input)

| Item | Notes |
|---|---|
| **Background building art** | The shader is procedural. You said you'd take screenshots from your own games/environments to use as the actual arena backdrop. Drop a file in `assets/` and reference it in the CSS/shader. |
| **GLB model assets** | The loader is wired in `stage.js`. Drop a `.glb` in `assets/models/`, add `model: "assets/models/labs.glb"` to the hero in `data.js`. Done. No other code needed. |
| **Personal copy you want to rewrite** | The data is structured and ready. Anything you want to say differently just update in `data.js`. |

### Small polish items (no blockers, just not done yet)

| Item | Notes |
|---|---|
| **Boot screen "LAST VISIT / ARENA"** line | That text at the bottom of the choose-experience card is hardcoded. Could be dynamic based on localStorage. Low priority. |
| **Filled-silhouette icons** | Current icons are outline pictographs. A filled-silhouette style matching the OW reference sheet would need a per-glyph redraw in `glyph()` in `sections.js`. Optional polish. |
| **Section formats for remaining heroes** | All 13 heroes have bespoke formats now. If you want to push any further (e.g. Affiliations as a full-bleed endorsement poster, Contact as a more elaborate comms screen), those are ready to build. |
| **Mobile** | Desktop experience is the priority. Mobile is functional but not optimized. |

---

## How to run locally

```bash
npm install
npm run dev        # http://127.0.0.1:5173
npm run build      # production build to dist/
npm run check:syntax && npm run check:content   # before every push
```

## Repo

`https://github.com/PreLabHomework/Portfolio.git`
