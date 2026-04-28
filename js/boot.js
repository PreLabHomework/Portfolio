// ============================================================
//  BOOT — opening sequence (v3)
//  Cooler, more detailed. Ends in single "START" button.
// ============================================================

import * as audio from './audio.js';

export function setupBoot({ onStart }) {
  const bootEl = document.getElementById('boot');
  const linesEl = document.getElementById('boot-lines');
  const startEl = document.getElementById('boot-start');
  const skipEl = document.getElementById('boot-skip');
  const fxEl = document.getElementById('boot-fx');

  const lines = [
    { tag: '01', body: 'BOOT  …  initializing personal site',                   ok: true },
    { tag: '02', body: 'AUTH  …  hamza abu khalaf al takrouri',                ok: true },
    { tag: '03', body: 'SCAN  …  three labs, one capstone, twelve projects',  ok: true },
    { tag: '04', body: 'LOAD  …  hero roster',                                 ok: true },
    { tag: '05', body: 'CHECK …  publications · patent · certifications',     ok: true },
    { tag: '06', body: 'LINK  …  github · linkedin · resume',                  ok: true },
    { tag: '07', body: 'PORT  …  audio module attached',                       ok: true },
    { tag: '08', body: 'NET   …  connection stable',                           ok: true },
    { tag: '09', body: 'READY …  awaiting input',                              ok: true }
  ];

  // build line rows
  linesEl.innerHTML = lines.map(l => `
    <div class="bl-row ${l.ok ? 'ok' : ''}">
      <span class="bl-tag">${l.tag}</span>
      <span class="bl-body">${l.body}</span>
      <span class="bl-status">${l.ok ? 'OK' : '…'}</span>
    </div>
  `).join('');

  // boot fx — light particle field
  drawBootFx(fxEl);

  // animate corner brackets in
  gsap.fromTo('.bm-corner', { opacity: 0, scale: 0.4 },
    { opacity: 1, scale: 1, duration: 0.5, stagger: 0.06, ease: 'back.out(2.4)', delay: 0.1 });

  // animate lines in sequence — TICK on each
  const rows = linesEl.querySelectorAll('.bl-row');
  rows.forEach((row, i) => {
    gsap.to(row, {
      opacity: 1, duration: 0.18, delay: 0.55 + i * 0.18,
      onStart: () => audio.tick()
    });
  });

  // reveal START
  gsap.to(startEl, {
    opacity: 1, duration: 0.45, ease: 'power2.out',
    delay: 0.55 + rows.length * 0.18 + 0.15
  });

  function startBoot() {
    audio.unlock();
    audio.start();

    gsap.to(bootEl, {
      opacity: 0, duration: 0.7, ease: 'power2.inOut',
      onComplete: () => {
        bootEl.classList.add('hide');
        onStart();
      }
    });
  }

  startEl.addEventListener('click', startBoot);
  skipEl.addEventListener('click', startBoot);
  window.addEventListener('keydown', function bootKey(e) {
    if (bootEl.classList.contains('hide')) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      startBoot();
      window.removeEventListener('keydown', bootKey);
    }
  });
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

    // sweeping horizon line — sleek touch
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
