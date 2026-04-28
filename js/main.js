// ============================================================
//  MAIN — wires every module together (v3)
// ============================================================

import { setupBoot }    from './boot.js';
import { createShader } from './shader.js';
import { createStage }  from './stage.js';
import { initSelect }   from './select.js';
import * as audio       from './audio.js';

const appEl     = document.getElementById('app');
const bgCanvas  = document.getElementById('bg-canvas');
const stCanvas  = document.getElementById('stage-canvas');
const muteBtn   = document.getElementById('hud-mute');
const muteOn    = document.getElementById('hud-mute-on');
const muteOff   = document.getElementById('hud-mute-off');
const fpsEl     = document.getElementById('hud-fps');
const clockEl   = document.getElementById('hud-clock');

// ─── shader + stage init ────────────────────────────────────
const bg    = createShader(bgCanvas);
const stage = createStage(stCanvas);

window.addEventListener('resize', () => {
  bg.resize();
  stage.resize();
});

// ─── render loop ────────────────────────────────────────────
let last = performance.now();
let acc = 0;
let frames = 0;
let fpsTimer = 0;

function frame(now) {
  const dt = Math.min(0.05, (now - last) / 1000);
  last = now;
  acc += dt;
  frames++;
  fpsTimer += dt;

  bg.tick(dt);
  stage.tick(dt);

  if (fpsTimer >= 0.5) {
    const fps = Math.round(frames / fpsTimer);
    if (fpsEl) fpsEl.textContent = `${fps} FPS`;
    frames = 0;
    fpsTimer = 0;
  }

  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);

// ─── live clock ─────────────────────────────────────────────
function updateClock() {
  if (!clockEl) return;
  const d = new Date();
  const hh = String(d.getHours()).padStart(2, '0');
  const mm = String(d.getMinutes()).padStart(2, '0');
  clockEl.textContent = `${hh}:${mm} CST`;
}
updateClock();
setInterval(updateClock, 30000);

// ─── boot ───────────────────────────────────────────────────
setupBoot({
  onStart: () => {
    // unlock audio + speech AFTER user gesture
    audio.unlock();

    appEl.classList.add('live');
    appEl.setAttribute('aria-hidden', 'false');

    // initial fade in
    gsap.fromTo(appEl, { opacity: 0 }, { opacity: 1, duration: 0.55, ease: 'power2.out' });

    // mount the select
    initSelect({ bg, stage });
  }
});

// ─── mute toggle ────────────────────────────────────────────
let muted = false;
function refreshMuteUI() {
  if (muteOn)  muteOn.style.display  = muted ? 'none' : '';
  if (muteOff) muteOff.style.display = muted ? '' : 'none';
}
refreshMuteUI();
muteBtn.addEventListener('click', () => {
  muted = !muted;
  audio.setMuted(muted);
  refreshMuteUI();
});

// ─── prevent context menu from breaking the experience ──────
window.addEventListener('contextmenu', e => {
  // allow on form inputs in case any sneak in later
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
  e.preventDefault();
});
