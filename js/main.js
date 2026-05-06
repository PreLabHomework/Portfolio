// ============================================================
//  MAIN - wires every module together (v4.1 boot-safe patch)
//  Boot no longer depends on Three.js loading successfully.
// ============================================================

import { setupBoot }    from './boot.js';
import { createShader } from './shader.js';
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

// If the GSAP CDN is blocked or slow, keep the site usable instead of freezing on boot.
installGsapFallback();

// Shader is local and lightweight. If WebGL fails, use a safe fallback.
let bg = safeCreateShader(bgCanvas);
let stage = createStageFallback();
let selectMounted = false;

window.addEventListener('resize', () => {
  bg.resize();
  stage.resize();
});

// ─── render loop ────────────────────────────────────────────
let last = performance.now();
let frames = 0;
let fpsTimer = 0;

function frame(now) {
  const dt = Math.min(0.05, (now - last) / 1000);
  last = now;
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

async function loadStage() {
  try {
    const mod = await import('./stage.js');
    const nextStage = mod.createStage(stCanvas);
    stage = nextStage;
    stage.resize();
    return stage;
  } catch (err) {
    console.warn('[Hamza House] 3D stage failed to load. Continuing with 2D fallback.', err);
    stCanvas.style.display = 'none';
    return stage;
  }
}

async function enterApp() {
  audio.unlock();

  appEl.classList.add('live');
  appEl.setAttribute('aria-hidden', 'false');
  gsap.fromTo(appEl, { opacity: 0 }, { opacity: 1, duration: 0.55, ease: 'power2.out' });

  if (selectMounted) return;
  selectMounted = true;

  await loadStage();
  initSelect({ bg, stage });
}

// ─── boot ───────────────────────────────────────────────────
setupBoot({ onStart: enterApp });

// ─── mute toggle ────────────────────────────────────────────
// Default to MUTED so visitors are not surprised by audio.
let muted = true;
audio.setMuted(true);
function refreshMuteUI() {
  if (muteOn)  muteOn.style.display  = muted ? 'none' : '';
  if (muteOff) muteOff.style.display = muted ? '' : 'none';
}
refreshMuteUI();
if (muteBtn) {
  muteBtn.addEventListener('click', () => {
    muted = !muted;
    audio.setMuted(muted);
    refreshMuteUI();
  });
}

// ─── prevent context menu from breaking the experience ──────
window.addEventListener('contextmenu', e => {
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
  e.preventDefault();
});

function safeCreateShader(canvas) {
  try {
    return createShader(canvas);
  } catch (err) {
    console.warn('[Hamza House] Background shader failed. Continuing with static background.', err);
    if (canvas) canvas.style.display = 'none';
    return {
      resize() {},
      tick() {},
      setAccent() {},
      setPattern() {},
      setIntensity() {}
    };
  }
}

function createStageFallback() {
  return {
    resize() {},
    tick() {},
    setCharacter() {}
  };
}

function installGsapFallback() {
  if (window.gsap) return;

  const normalizeTargets = target => {
    if (!target) return [];
    if (typeof target === 'string') return Array.from(document.querySelectorAll(target));
    if (target instanceof Element || target === window) return [target];
    if (Array.isArray(target)) return target.filter(Boolean);
    if (target.length !== undefined) return Array.from(target).filter(Boolean);
    return [target];
  };

  const setStyles = (target, vars = {}) => {
    normalizeTargets(target).forEach(el => {
      const transform = [];
      if ('x' in vars) transform.push(`translateX(${vars.x}px)`);
      if ('y' in vars) transform.push(`translateY(${vars.y}px)`);
      if ('scale' in vars) transform.push(`scale(${vars.scale})`);
      if (transform.length && el.style) el.style.transform = transform.join(' ');
      if ('opacity' in vars && el.style) el.style.opacity = vars.opacity;
      if ('filter' in vars && el.style) el.style.filter = vars.filter;
      if ('display' in vars && el.style) el.style.display = vars.display;
      if ('pointerEvents' in vars && el.style) el.style.pointerEvents = vars.pointerEvents;
      if ('autoAlpha' in vars && el.style) {
        el.style.opacity = vars.autoAlpha;
        el.style.visibility = vars.autoAlpha === 0 ? 'hidden' : 'visible';
      }
    });
  };

  const run = (target, vars = {}) => {
    const delay = Math.max(0, Number(vars.delay || 0) * 1000);
    window.setTimeout(() => {
      if (typeof vars.onStart === 'function') vars.onStart();
      setStyles(target, vars);
      const doneDelay = Math.max(0, Number(vars.duration || 0) * 1000);
      window.setTimeout(() => {
        if (typeof vars.onComplete === 'function') vars.onComplete();
      }, doneDelay);
    }, delay);
    return window.gsap;
  };

  window.gsap = {
    to: run,
    fromTo(target, fromVars = {}, toVars = {}) {
      setStyles(target, fromVars);
      return run(target, toVars);
    },
    set: setStyles,
    killTweensOf() {},
    timeline(config = {}) {
      let offset = 0;
      const api = {
        to(target, vars = {}) {
          offset += Number(vars.delay || 0);
          run(target, { ...vars, delay: offset });
          offset += Number(vars.duration || 0);
          return api;
        },
        fromTo(target, fromVars = {}, toVars = {}) {
          setStyles(target, fromVars);
          offset += Number(toVars.delay || 0);
          run(target, { ...toVars, delay: offset });
          offset += Number(toVars.duration || 0);
          return api;
        },
        set(target, vars = {}) {
          window.setTimeout(() => setStyles(target, vars), offset * 1000);
          return api;
        },
        call(fn) {
          window.setTimeout(() => {
            if (typeof fn === 'function') fn();
            if (typeof config.onComplete === 'function') config.onComplete();
          }, offset * 1000);
          return api;
        }
      };
      return api;
    }
  };

  console.warn('[Hamza House] GSAP CDN unavailable. Using simple animation fallback.');
}
