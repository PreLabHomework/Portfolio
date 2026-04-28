// ============================================================
//  SELECT — character select state machine (v3)
// ============================================================

import { ROSTER } from './data.js';
import { renderSection, postRender } from './sections.js';
import * as audio from './audio.js';

// ─── refined SVG icons — more distinct per character ───
const ICONS = {
  protagonist: `<svg viewBox="0 0 32 32"><path d="M16 4 L16 4 M11 8 Q16 4 21 8 L21 12 Q21 14 19 14 L13 14 Q11 14 11 12 Z" fill="currentColor"/><circle cx="16" cy="11" r="2.5" fill="#0a0e16"/><path d="M9 28 L9 18 Q9 15 12 15 L20 15 Q23 15 23 18 L23 28" fill="currentColor"/><path d="M11 22 L21 22" stroke="#0a0e16" stroke-width="1"/></svg>`,
  scientist:    `<svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="10" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="16" cy="16" r="5.5" fill="none" stroke="currentColor" stroke-width="1.2"/><circle cx="16" cy="16" r="1.8" fill="currentColor"/><path d="M16 4 L16 6 M16 26 L16 28 M4 16 L6 16 M26 16 L28 16" stroke="currentColor" stroke-width="1.5"/><path d="M22 10 L25 7 M7 25 L10 22" stroke="currentColor" stroke-width="1" opacity="0.5"/></svg>`,
  engineer:     `<svg viewBox="0 0 32 32"><path d="M10 28 L10 14 Q10 11 13 11 L19 11 Q22 11 22 14 L22 28" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="16" cy="9" r="3.5" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M14 18 L18 18 L18 22 L14 22 Z" fill="currentColor"/><circle cx="16" cy="20" r="0.8" fill="#0a0e16"/><path d="M8 14 L10 14 M22 14 L24 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  builder:      `<svg viewBox="0 0 32 32"><path d="M6 6 L26 6 L26 26 L6 26 Z" fill="none" stroke="currentColor" stroke-width="1.6"/><rect x="9" y="9" width="6" height="6" fill="currentColor"/><rect x="17" y="9" width="6" height="6" fill="currentColor" opacity="0.45"/><rect x="9" y="17" width="6" height="6" fill="currentColor" opacity="0.45"/><rect x="17" y="17" width="6" height="6" fill="currentColor"/></svg>`,
  author:       `<svg viewBox="0 0 32 32"><path d="M6 5 L18 5 L18 25 L6 25 Z" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M9 10 L15 10 M9 14 L15 14 M9 18 L13 18" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><path d="M21 9 L25 13 L16 22 L12 22 L12 18 Z" fill="currentColor"/><path d="M21 9 L25 13" stroke="#0a0e16" stroke-width="1"/></svg>`,
  technician:   `<svg viewBox="0 0 32 32"><rect x="9" y="9" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.8"/><rect x="12" y="12" width="8" height="8" fill="none" stroke="currentColor" stroke-width="1.2"/><circle cx="16" cy="16" r="1.5" fill="currentColor"/><path d="M3 13 L9 13 M3 19 L9 19 M23 13 L29 13 M23 19 L29 19 M13 3 L13 9 M19 3 L19 9 M13 23 L13 29 M19 23 L19 29" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  archivist:    `<svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="11" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M16 7 L16 16 L23 21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/><circle cx="16" cy="16" r="1.8" fill="currentColor"/><circle cx="16" cy="6" r="0.8" fill="currentColor"/><circle cx="26" cy="16" r="0.8" fill="currentColor"/><circle cx="16" cy="26" r="0.8" fill="currentColor"/><circle cx="6" cy="16" r="0.8" fill="currentColor"/></svg>`,
  diplomat:     `<svg viewBox="0 0 32 32"><path d="M16 3 L26 9 L26 18 Q26 25 16 29 Q6 25 6 18 L6 9 Z" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M11 16 L14 19 L21 12" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  civilian:     `<svg viewBox="0 0 32 32"><circle cx="16" cy="11" r="5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M5 28 Q5 18 16 18 Q27 18 27 28" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="14" cy="10" r="0.8" fill="currentColor"/><circle cx="18" cy="10" r="0.8" fill="currentColor"/><path d="M14 13 Q16 14.5 18 13" stroke="currentColor" stroke-width="1" fill="none" stroke-linecap="round"/></svg>`,
  astakeria:    `<svg viewBox="0 0 32 32"><path d="M16 3 L20 11 L29 12 L22 18 L24 27 L16 22 L8 27 L10 18 L3 12 L12 11 Z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><circle cx="16" cy="16" r="2.5" fill="currentColor"/><path d="M16 16 L16 22" stroke="currentColor" stroke-width="1"/></svg>`,
  unknown:      `<svg viewBox="0 0 32 32"><rect x="6" y="6" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2,2"/><text x="16" y="22" text-anchor="middle" fill="currentColor" style="font-family: monospace; font-size: 16px; font-weight: bold;">?</text></svg>`
};

export function initSelect({ bg, stage }) {
  const gridEl     = document.getElementById('sel-grid');
  const sbIdEl     = document.getElementById('sb-id');
  const previewEl  = document.getElementById('preview');
  const pvCode     = document.getElementById('pv-code');
  const pvHead     = document.getElementById('pv-headline');
  const pvSub      = document.getElementById('pv-sub');
  const pvBlurb    = document.getElementById('pv-blurb');
  const pvStats    = document.getElementById('pv-stats');
  const pvTag      = document.getElementById('pv-tagline');
  const pvChips    = document.getElementById('pv-sidechips');
  const sectionEl  = document.getElementById('section-view');
  const svInner    = document.getElementById('sv-inner');
  const svPlay     = document.getElementById('sv-play');
  const svBack     = document.getElementById('sv-back');
  const transEl    = document.getElementById('transition');

  let activeIdx = 0;
  let selectedIdx = -1;
  let lastHover = 0;
  let openedOnce = false;

  ROSTER.forEach((c, i) => {
    const slot = document.createElement('button');
    slot.className = 'slot' + (c.id === 'soon' ? ' soon' : '');
    slot.type = 'button';
    slot.dataset.idx = i;
    slot.style.setProperty('--s-acc', c.accent);
    slot.style.setProperty('--s-acc2', c.accent2);
    slot.style.setProperty('--s-glow', `color-mix(in srgb, ${c.accent} 45%, transparent)`);
    slot.innerHTML = `
      <span class="slot-accent"></span>
      <span class="slot-code">${c.codename}</span>
      <span class="slot-role">${c.role}</span>
      <span class="slot-portrait">${ICONS[c.figure] || ICONS.protagonist}</span>
      <span class="slot-label">${c.title}</span>
      <span class="slot-p1">P1</span>
    `;

    slot.addEventListener('mouseenter', () => {
      if (sectionEl.classList.contains('live')) return;
      const now = performance.now();
      if (now - lastHover > 60) { audio.hover(); lastHover = now; }
      setActive(i, true);
    });
    slot.addEventListener('focus', () => {
      if (sectionEl.classList.contains('live')) return;
      setActive(i, true);
    });
    slot.addEventListener('click', () => selectSlot(i, slot));

    gridEl.appendChild(slot);
  });

  // staggered slot entry
  gsap.fromTo('.slot',
    { y: 40, opacity: 0 },
    {
      y: 0, opacity: 1, duration: 0.45, stagger: 0.04,
      ease: 'back.out(1.6)', delay: 0.3,
      onComplete: () => {
        setActive(0, false);
        // "select your hero" one-time intro line
        if (!openedOnce) {
          openedOnce = true;
          setTimeout(() => audio.speak('Choose your hero', { rate: 1.0, pitch: 0.95 }), 200);
        }
      }
    }
  );

  function setActive(i, doSpeak) {
    if (i === activeIdx) return;
    activeIdx = i;
    const c = ROSTER[i];

    document.documentElement.style.setProperty('--acc',  c.accent);
    document.documentElement.style.setProperty('--acc2', c.accent2);
    document.documentElement.style.setProperty('--acc-glow', hexAlpha(c.accent, 0.4));
    document.documentElement.style.setProperty('--acc-dim',  hexAlpha(c.accent, 0.14));
    // atmosphere — softer color washes for the stage background
    document.documentElement.style.setProperty('--atmos-1', hexAlpha(c.accent,  0.07));
    document.documentElement.style.setProperty('--atmos-2', hexAlpha(c.accent2, 0.06));

    bg.setAccent(c.accent, c.accent2);
    bg.setPattern(patternFor(c.id));
    bg.setIntensity(0.55);

    stage.setCharacter(c.figure, c.accent, c.accent2);

    document.querySelectorAll('.slot').forEach((s, idx) => {
      s.classList.toggle('sel', idx === i);
    });

    sbIdEl.textContent = `${c.codename}  ·  ${c.role}`;
    previewReload(c);

    // TTS — character name on hover
    if (doSpeak && c.id !== 'home') {
      audio.speak(c.title, { rate: 1.1, pitch: 0.92 });
    }
  }

  function previewReload(c) {
    const targets = [pvCode, pvHead, pvSub, pvBlurb, pvStats, pvTag, pvChips];
    gsap.killTweensOf(targets);
    const tl = gsap.timeline();
    tl.to(targets, { opacity: 0, y: -6, duration: 0.1, ease: 'power2.in' })
    .call(() => {
      pvCode.textContent  = c.codename;
      pvHead.textContent  = c.preview.headline;
      pvSub.textContent   = c.preview.sub;
      pvBlurb.textContent = c.preview.blurb;
      pvTag.textContent   = c.tagline;
      pvStats.innerHTML   = c.preview.stats.map(([k, v]) =>
        `<div class="pv-stat"><span class="k">${k}</span><span class="v">${v}</span></div>`
      ).join('');
      pvChips.innerHTML = `
        <span class="chip">ROLE · ${c.role}</span>
        <span class="chip">ID · ${c.codename}</span>
        <span class="chip">SIGNAL · ●●●○</span>
      `;
    })
    .fromTo([pvCode, pvHead, pvSub], { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.32, stagger: 0.04, ease: 'power2.out' })
    .fromTo(pvBlurb, { opacity: 0, y: 6 },
      { opacity: 0.85, y: 0, duration: 0.28, ease: 'power2.out' }, '-=0.18');

    if (pvStats.children.length) {
      gsap.fromTo(pvStats.querySelectorAll('.pv-stat'),
        { opacity: 0, x: -6 },
        { opacity: 1, x: 0, duration: 0.22, stagger: 0.035, ease: 'power2.out', delay: 0.22 });
    }
    gsap.fromTo(pvTag, { opacity: 0 }, { opacity: 1, duration: 0.28, delay: 0.32 });
    if (pvChips.children.length) {
      gsap.fromTo(pvChips.querySelectorAll('.chip'),
        { opacity: 0, x: 12 },
        { opacity: 1, x: 0, duration: 0.28, stagger: 0.05, delay: 0.18 });
    }
  }

  function patternFor(id) {
    if (id === 'labs' || id === 'research') return 1;
    if (id === 'projects' || id === 'skills') return 2;
    if (id === 'astakeria') return 3;
    return 0;
  }

  // ─── selectSlot — polished lens-shift transition (no white flash) ───
  function selectSlot(i, slotEl) {
    if (selectedIdx === i && sectionEl.classList.contains('live')) return;
    selectedIdx = i;
    setActive(i, false);
    audio.select();

    const c = ROSTER[i];

    // lens-shift: blur outgoing, fade-in section without radial wipe
    const tl = gsap.timeline();
    tl.to('#bg-canvas, #stage-canvas', {
        filter: 'blur(8px) brightness(0.7)',
        duration: 0.35, ease: 'power2.inOut'
      }, 0)
      .to(previewEl, { opacity: 0, y: -8, duration: 0.22, ease: 'power2.in' }, 0)
      .to(transEl, { opacity: 1, duration: 0.18, ease: 'power2.in' }, 0.05)
      .call(() => {
        audio.whoosh();
        svInner.innerHTML = renderSection(c.id);
        postRender(c.id, svInner);
        svPlay.href = c.play_url;
        svPlay.querySelector('.sp-label').textContent = c.play_label || 'PLAY';
        sectionEl.classList.add('live');
        sectionEl.setAttribute('aria-hidden', 'false');
        sectionEl.scrollTop = 0;
      })
      .to(transEl, { opacity: 0, duration: 0.45, ease: 'power2.out' }, '+=0.05');

    // section-level enter animations
    setTimeout(() => {
      const heading = sectionEl.querySelector('.sv-heading');
      const sub = sectionEl.querySelector('.sv-sub');
      if (heading) gsap.fromTo(heading, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' });
      if (sub)     gsap.fromTo(sub, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.35, ease: 'power3.out', delay: 0.08 });

      const items = sectionEl.querySelectorAll([
        '.home-intro', '.home-bio p', '.home-fact',
        '.lab-tab', '.lab-dossier-header', '.lab-story p', '.lab-sub', '.lab-funding',
        '.cap-pitch', '.cap-stage', '.cap-app', '.cap-deadline',
        '.proj-card',
        '.arch-paper', '.arch-cert',
        '.sk-cat',
        '.tl-item',
        '.wall-tile',
        '.geo-card', '.rank-card', '.team-pill', '.story-item', '.lifestyle-list li',
        '.ast-hook', '.ast-lore p', '.ast-pillar', '.ast-hero', '.ast-ex', '.ast-quote'
      ].join(','));
      if (items.length) {
        gsap.fromTo(items, { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.38, stagger: 0.022, ease: 'power2.out', delay: 0.18 });
      }

      const play = document.getElementById('sv-play');
      const back = document.getElementById('sv-back');
      gsap.fromTo(play, { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 0.32, ease: 'back.out(2)', delay: 0.45 });
      gsap.fromTo(back, { opacity: 0, x: -8 },        { opacity: 1, x: 0,       duration: 0.28, delay: 0.36 });

      // un-blur background after content settles
      gsap.to('#bg-canvas, #stage-canvas', {
        filter: 'blur(0px) brightness(1)',
        duration: 0.55, ease: 'power2.out', delay: 0.1
      });

      // skill bar fills
      const fills = sectionEl.querySelectorAll('.sk-row .fill');
      fills.forEach(f => {
        const w = f.style.width;
        f.style.width = '0';
        requestAnimationFrame(() => {
          f.style.transition = 'width 1s cubic-bezier(0.16, 1, 0.3, 1)';
          f.style.width = w;
        });
      });
    }, 480);
  }

  function backOut() {
    if (!sectionEl.classList.contains('live')) return;
    audio.back();

    const contents = sectionEl.querySelectorAll('.sv-heading, .sv-sub, .home-intro, .home-bio p, .home-fact, .lab-tab, .lab-dossier-header, .lab-story p, .lab-sub, .lab-funding, .cap-pitch, .cap-stage, .cap-app, .cap-deadline, .proj-card, .arch-paper, .arch-cert, .sk-cat, .tl-item, .wall-tile, .geo-card, .rank-card, .team-pill, .story-item, .lifestyle-list li, .ast-hook, .ast-lore p, .ast-pillar, .ast-hero, .ast-ex, .ast-quote, #sv-play, #sv-back');

    const tl = gsap.timeline({
      onComplete: () => {
        sectionEl.classList.remove('live');
        sectionEl.setAttribute('aria-hidden', 'true');
        svInner.innerHTML = '';
        selectedIdx = -1;
      }
    });
    if (contents.length) {
      tl.to(contents, { opacity: 0, y: -8, duration: 0.22, stagger: 0.008, ease: 'power2.in' });
    }
    tl.to(previewEl, { opacity: 1, y: 0, duration: 0.32, ease: 'power2.out' }, '-=0.1');
  }

  svBack.addEventListener('click', backOut);

  window.addEventListener('keydown', e => {
    if (!document.getElementById('app').classList.contains('live')) return;
    if (sectionEl.classList.contains('live')) {
      if (e.key === 'Escape' || e.key === 'Backspace') { e.preventDefault(); backOut(); }
      return;
    }
    if (e.key === 'ArrowRight') {
      const n = (activeIdx + 1) % ROSTER.length;
      setActive(n, true);
      audio.hover();
    } else if (e.key === 'ArrowLeft') {
      const n = (activeIdx - 1 + ROSTER.length) % ROSTER.length;
      setActive(n, true);
      audio.hover();
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const slot = gridEl.querySelector(`.slot[data-idx="${activeIdx}"]`);
      if (slot) selectSlot(activeIdx, slot);
    }
  });

  return { setActive, selectSlot, backOut };
}

function hexAlpha(hex, a) {
  let h = hex.replace('#', '');
  if (h.length === 3) h = h.split('').map(c => c + c).join('');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${a})`;
}
