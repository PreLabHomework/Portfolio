# Portfolio v6.0 - "The Arena Is A Game Now"

One massive bundle. Three new systems, one art-direction overhaul, GLB slots ready.

## Files in this bundle

| File | Status | What it does |
|---|---|---|
| js/toon.js | NEW | Cel-shading pipeline: stepped toon ramp, ink outlines, contact shadow |
| js/transitions.js | NEW | OW diagonal wipe transition system |
| js/training.js | NEW | Training Range minigame |
| js/career.js | NEW | Career Profile stats screen |
| js/main.js | REWRITTEN | Menu restructure, wipes on every screen change, new screen wiring |
| js/audio.js | EXTENDED | hit / crit / miss / countdown / roundEnd SFX added at the end |
| js/stage.js | 2 SURGICAL EDITS | imports toon.js, applies pipeline in mountFigure |
| styles.css | APPENDED | v6 menu block at the very end (authoritative, keep last) |

No changes to data.js, index.html, cv.html, sections.js, shader.js, resume-picker.js.
Both check scripts pass. Zero em dashes in all new code.

## 1. Main menu restructure + transitions

The menu is now two groups: your hero list under PLAY, then a divider, then the
system group: TRAINING, CAREER PROFILE, PRO MODE, in smaller OW2 system type.

Every screen change now goes through the signature OW diagonal wipe (two skewed
panels, accent + dark, sweep across, the screen swaps while covered). Applied to:
boot to arena, hero detail open, detail close, entering Training, entering Career.
Respects prefers-reduced-motion (instant swap, no wipe). Deep links work:
`#training` and `#career` open their screens directly, existing section hashes
unchanged.

## 2. Training Range (the flagship)

A real playable aim trainer, OW practice-range style:

- Training bots pop up in lanes, wobble, and despawn if ignored (despawn = combo break)
- Head hits are CRITICAL (2x), body hits standard, combo multiplier up to +100%
- Bots spawn faster and live shorter as the round goes on
- 14% of bots are accent-colored BONUS bots tagged with a real project (QBC, GUARD,
  TREMOR, WIFI, PT KIDS, ABU, AKAT). Destroying one drops a one-line fact ticker.
  Recruiters literally shoot targets to learn your resume.
- 3-2-1-GO countdown, 60 second rounds, custom crosshair, hit/crit/miss SFX
- Result card: score, rank (BRONZE through GRANDMASTER), eliminations, crits,
  accuracy, best combo, REQUEUE / LEAVE RANGE
- Personal best persists in localStorage with a NEW PERSONAL BEST tag

Tuning knobs at the top of training.js: ROUND_SECONDS, RANKS thresholds, INTEL facts.

## 3. Career Profile

The OW career stats screen with real numbers:

- Player banner: hex level badge (26, class year), name, title bar, OPEN TO HIRE /
  USA ON OPT status
- TIME INVESTED: animated OW-style bars per engineering domain
- LIFETIME STATISTICS: 8 stat cards (100% unauthorized detection, $10K to <$300,
  194K+ measurements, SOLD capstone, etc.)
- MEDAL CASE: gold/silver/bronze coins for the award, the acquisition, deployments,
  and the publication
- CAREER HIGHLIGHTS: degree, labs, industry rotation, work authorization

All content lives in constants at the top of career.js. When numbers change,
edit there (duplicated from data.js on purpose so this screen has zero coupling).

## 4. Cel-shading + GLB slots

Every figure, primitive or loaded GLB, now runs through applyToonPipeline in
mountFigure:

- 4-step toon ramp (hard light bands, hand-painted look)
- Ink outlines via inverted hull on static meshes (skinned GLBs use ramp + rim light)
- Soft contact shadow under every hero
- Holo panels, glass, and strong emissive glow strips are preserved as-is
- Rigged GLBs keep their skinning and their baked idle animation

This means any model you drop in automatically matches the site's art direction.

### GLB shopping list (the path to actual game characters)

Best to worst effort-to-quality:

1. **Quaternius (quaternius.com)** - CC0, stylized game characters, downloads as
   GLB directly, zero conversion. Ultimate Modular Characters or Animated
   Characters packs. This is the fastest path and the style already suits the site.
2. **Mixamo (mixamo.com)** - free with an Adobe account. Pick a character, apply
   the Idle animation, download FBX (with skin). Convert to GLB in Blender:
   File > Import > FBX, then File > Export > glTF 2.0 with animations checked.
   The baked idle clip plays automatically (stage.js already handles mixers).
3. **Sketchfab** - filter Downloadable + CC license, search "stylized character
   rigged low poly". Check the license per model and credit where required.

Wiring per hero, exactly one line in data.js:

```js
{ id: "labs", ..., model: "assets/models/labs.glb" }
```

Drop the file in assets/models/. Primitive stays as instant fallback, GLB swaps
in when loaded, toon pipeline applies automatically.

## Test checklist before pushing

1. npm run dev, load the boot screen, ENTER arena: wipe plays
2. Hover heroes in menu and roster: toon-shaded figures with outlines and contact shadows
3. Open any hero: wipe in, ESC: wipe out
4. TRAINING: countdown, shoot bots, hit a gold bonus bot and see the fact ticker,
   let the clock run out, check the rank card, REQUEUE once, LEAVE RANGE
5. CAREER PROFILE: bars animate in, scroll the whole screen, ESC back
6. Deep links: /#training and /#career from a cold load
7. Mute toggle off: hover/hit/crit sounds audible
8. npm run check:syntax and npm run check:content (both already pass)
9. npm run build locally (registry was blocked in the build sandbox, verified via
   static import-graph check instead; your local build should be routine)

## Known follow-ups (not in this bundle)

- GLB models themselves (your download session, list above)
- Filled-silhouette icon redraw (optional polish from the v5 notes)
- README.md still has em dashes from before v6; sweep when convenient
- Mobile: Training Range is mouse-first; consider hiding TRAINING below 700px
  or adding touch support in a later pass
