// ============================================================
//  BOOT - opening sequence (v4.7.3 dual-mode)
//  Loading lines play, then split into a two-button picker.
//  Pro mode → cv.html, Interactive mode → existing onStart flow.
// ============================================================

import * as audio from './audio.js';

const LS_KEY = 'hh_mode_choice';

export function setupBoot({ onStart }) {
  const bootEl  = document.getElementById('boot');
  const linesEl = document.getElementById('boot-lines');
  const startEl = document.getElementById('boot-start');
  const skipEl  = document.getElementById('boot-skip');
  const fxEl    = document.getElementById('boot-fx');

  // ─── URL hash routing: skip picker if a mode was requested ───
  const hash = (window.location.hash || '').toLowerCase().replace('#', '');
  if (hash === 'pro' || hash === 'professional' || hash === 'cv') {
    // strip hash and redirect to professional mode
    window.location.replace('cv.html');
    return;
  }
  if (hash === 'interactive' || hash === 'int') {
    // skip the boot picker entirely, go straight in
    if (history.replaceState) {
      history.replaceState(null, '', window.location.pathname);
    }
    bootEl.style.display = 'none';
    bootEl.classList.add('hide');
    onStart();
    return;
  }

  const lines = [
    { tag: '01', body: 'BOOT  …  loading portfolio lobby',                       ok: true },
    { tag: '02', body: 'AUTH  …  hamza abu khalaf al takrouri',                  ok: true },
    { tag: '03', body: 'SCAN  …  labs, capstone, projects, research',            ok: true },
    { tag: '04', body: 'LOAD  …  character roster and stage lighting',           ok: true },
    { tag: '05', body: 'CHECK …  skills, timeline, affiliations, personal file', ok: true },
    { tag: '06', body: 'LINK  …  github, linkedin, resume',                       ok: true },
    { tag: '07', body: 'AUDIO …  subtle cues and speech synthesis ready',        ok: true },
    { tag: '08', body: 'NET   …  local session stable',                          ok: true },
    { tag: '09', body: 'READY …  choose how to view',                             ok: true }
  ];

  // build line rows
  linesEl.innerHTML = lines.map(l => `
    <div class="bl-row ${l.ok ? 'ok' : ''}">
      <span class="bl-tag">${l.tag}</span>
      <span class="bl-body">${l.body}</span>
      <span class="bl-status">${l.ok ? 'OK' : '…'}</span>
    </div>
  `).join('');

  // boot fx - light particle field
  drawBootFx(fxEl);

  // ─── Build dual-mode picker (injected, no HTML changes) ───
  const picker = document.createElement('div');
  picker.className = 'boot-picker';
  picker.innerHTML = `
    <div class="bp-prompt">
      <span class="bp-prompt-arrow">▸</span>
      <span class="bp-prompt-text">CHOOSE YOUR EXPERIENCE</span>
      <span class="bp-prompt-arrow">◂</span>
    </div>
    <div class="bp-modes">
      <button class="bp-mode bp-pro" type="button" data-mode="pro" aria-label="Open professional mode">
        <span class="bp-mode-tag">FOR RECRUITERS · HR · PIs</span>
        <span class="bp-mode-title">PROFESSIONAL MODE</span>
        <span class="bp-mode-sub">cleaner access, faster scan</span>
        <ul class="bp-mode-list">
          <li>Resume-style scroll layout</li>
          <li>Sticky section navigation</li>
          <li>Direct download and contact</li>
          <li>Print-friendly</li>
        </ul>
        <span class="bp-mode-cta">▸ ENTER</span>
      </button>
      <div class="bp-divider" aria-hidden="true">
        <span class="bp-divider-line"></span>
        <span class="bp-divider-or">OR</span>
        <span class="bp-divider-line"></span>
      </div>
      <button class="bp-mode bp-int" type="button" data-mode="interactive" aria-label="Open interactive mode">
        <span class="bp-mode-tag">FOR EVERYONE ELSE</span>
        <span class="bp-mode-title">INTERACTIVE MODE</span>
        <span class="bp-mode-sub">fighter select, full details</span>
        <ul class="bp-mode-list">
          <li>Character-select roster</li>
          <li>Per-section atmospheres</li>
          <li>Full lore and personality</li>
          <li>Audio, motion, the works</li>
        </ul>
        <span class="bp-mode-cta">▸ ENTER</span>
      </button>
    </div>
    <div class="bp-foot">
      <span class="bp-hint">${getRemembered() ? 'last visit · ' + (getRemembered() === 'pro' ? 'professional' : 'interactive') : 'either is fine. you can switch anytime.'}</span>
    </div>
  `;
  // Hide original single START button — picker replaces it
  startEl.style.display = 'none';
  startEl.parentNode.insertBefore(picker, startEl.nextSibling);

  // animate corner brackets in
  gsap.fromTo('.bm-corner', { opacity: 0, scale: 0.4 },
    { opacity: 1, scale: 1, duration: 0.5, stagger: 0.06, ease: 'back.out(2.4)', delay: 0.1 });

  // animate lines in sequence - TICK on each
  const rows = linesEl.querySelectorAll('.bl-row');
  rows.forEach((row, i) => {
    gsap.to(row, {
      opacity: 1, duration: 0.18, delay: 0.55 + i * 0.18,
      onStart: () => audio.tick()
    });
  });

  // reveal picker
  const pickerDelay = 0.55 + rows.length * 0.18 + 0.2;
  gsap.fromTo(picker, { opacity: 0, y: 10 },
    { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out', delay: pickerDelay });

  // stagger the two mode cards in
  gsap.fromTo(picker.querySelectorAll('.bp-mode'),
    { opacity: 0, y: 16, scale: 0.97 },
    { opacity: 1, y: 0, scale: 1, duration: 0.45, stagger: 0.12, ease: 'back.out(1.5)', delay: pickerDelay + 0.15 });

  function leaveBoot(mode) {
    // remember choice for next visit
    try { localStorage.setItem(LS_KEY, mode); } catch(e) { /* private mode */ }
    audio.unlock();
    audio.start();

    gsap.to(bootEl, {
      opacity: 0, duration: 0.65, ease: 'power2.inOut',
      onComplete: () => {
        bootEl.classList.add('hide');
        if (mode === 'pro') {
          // route to CV mode
          window.location.href = 'cv.html';
        } else {
          onStart();
        }
      }
    });
  }

  // wire picker buttons
  picker.querySelectorAll('.bp-mode').forEach(btn => {
    btn.addEventListener('click', () => {
      const mode = btn.dataset.mode;
      // little hover sound on click for feedback
      if (audio.hover) audio.hover();
      leaveBoot(mode);
    });
    // hover audio cue
    btn.addEventListener('mouseenter', () => {
      if (audio.hover) audio.hover();
    });
  });

  // skip button → defaults to interactive (the v4.7.2 behavior)
  skipEl.addEventListener('click', () => leaveBoot('interactive'));

  // keyboard: Enter / Space defaults to last-chosen or interactive; Tab navigates
  window.addEventListener('keydown', function bootKey(e) {
    if (bootEl.classList.contains('hide')) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const remembered = getRemembered();
      const focused = document.activeElement;
      // if a mode card is focused, use that
      if (focused && focused.classList.contains('bp-mode')) {
        leaveBoot(focused.dataset.mode);
      } else {
        leaveBoot(remembered || 'interactive');
      }
      window.removeEventListener('keydown', bootKey);
    } else if (e.key === '1') {
      leaveBoot('pro');
      window.removeEventListener('keydown', bootKey);
    } else if (e.key === '2') {
      leaveBoot('interactive');
      window.removeEventListener('keydown', bootKey);
    }
  });
}

function getRemembered() {
  try { return localStorage.getItem(LS_KEY); } catch(e) { return null; }
}

// ─── boot canvas particle field ─────────────────────────────
function drawBootFx(canvas) {
  const ctx = canvas.getContext('2d');
  let w, h, particles = [];

  function resize() {
    const dpr = Math.min(window.devicePixelRatio, 2);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    ctx.scale(dpr, dpr);
    w = window.innerWidth;
    h = window.innerHeight;

    particles = [];
    const count = Math.floor((w * h) / 24000);
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.4 + 0.3,
        vx: (Math.random() - 0.5) * 0.18,
        vy: -Math.random() * 0.45 - 0.1,
        a: Math.random() * 0.7 + 0.15,
        flicker: Math.random()
      });
    }
  }

  resize();
  window.addEventListener('resize', resize);

  let t = 0;
  function loop() {
    t += 0.016;
    ctx.clearRect(0, 0, w, h);

    // particles
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.flicker += 0.03;
      if (p.y < -10) { p.y = h + 5; p.x = Math.random() * w; }
      if (p.x < -5)  p.x = w + 5;
      if (p.x > w + 5) p.x = -5;
      const a = p.a * (0.7 + Math.sin(p.flicker) * 0.3);
      ctx.fillStyle = `rgba(255, 209, 102, ${a})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    });

    // sweeping horizon line - sleek touch
    const lineY = h * 0.5 + Math.sin(t * 0.4) * 30;
    const grad = ctx.createLinearGradient(0, lineY - 1, 0, lineY + 2);
    grad.addColorStop(0, 'rgba(255, 209, 102, 0)');
    grad.addColorStop(0.5, 'rgba(255, 209, 102, 0.18)');
    grad.addColorStop(1, 'rgba(255, 209, 102, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, lineY - 1, w, 2);

    requestAnimationFrame(loop);
  }
  loop();
}
