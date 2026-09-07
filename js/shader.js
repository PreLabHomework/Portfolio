// OW2 character-select atmosphere - dark industrial environment with
// bokeh defocused lights, architectural columns, haze, hero spotlight, dust, vignette.
export function createShader(canvas) {
  const ctx = canvas.getContext("2d", { alpha: true });
  let width = 1, height = 1;
  let time = 0;
  let accent  = [56, 189, 248];   // cool teal default
  let accent2 = [251, 191, 36];   // warm gold default

  // Bokeh light sources - fixed world-space fractions, mix of warm/cool
  const BOKEH = [
    { x: 0.10, y: 0.12, r: 0.28, warm: false, phase: 0.0,  a: 0.055 },
    { x: 0.30, y: 0.06, r: 0.18, warm: true,  phase: 1.40, a: 0.050 },
    { x: 0.52, y: 0.04, r: 0.22, warm: false, phase: 2.60, a: 0.045 },
    { x: 0.74, y: 0.10, r: 0.24, warm: true,  phase: 0.85, a: 0.050 },
    { x: 0.90, y: 0.22, r: 0.20, warm: false, phase: 3.20, a: 0.048 },
    { x: 0.04, y: 0.48, r: 0.16, warm: true,  phase: 1.90, a: 0.038 },
    { x: 0.96, y: 0.44, r: 0.18, warm: false, phase: 2.80, a: 0.040 },
    { x: 0.22, y: 0.72, r: 0.14, warm: true,  phase: 4.10, a: 0.030 },
    { x: 0.78, y: 0.68, r: 0.15, warm: false, phase: 0.50, a: 0.028 },
  ];

  // Architectural column x-positions (fraction of width)
  const COLS = [0.05, 0.17, 0.32, 0.50, 0.68, 0.83, 0.95];

  // Dust mote seeds
  const DUST = Array.from({ length: 22 }, (_, i) => ({
    sx: (Math.sin(i * 137.508) * 0.5 + 0.5),
    sy: (Math.cos(i * 97.334) * 0.5 + 0.5),
    speed: 2.5 + (i % 7) * 1.8,
    phase: i * 0.61,
    sz: 1 + (i % 3) * 0.7
  }));

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    width  = Math.max(1, Math.floor(rect.width  * dpr));
    height = Math.max(1, Math.floor(rect.height * dpr));
    canvas.width  = width;
    canvas.height = height;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function tick(dt) {
    time += dt;
    const rect = canvas.getBoundingClientRect();
    const w = rect.width, h = rect.height;
    ctx.clearRect(0, 0, w, h);
    paintBase(w, h);
    paintBokeh(w, h);
    paintColumns(w, h);
    paintHaze(w, h);
    paintSpotlight(w, h);
    paintDust(w, h);
    paintVignette(w, h);
  }

  // ---- layers ------------------------------------------------

  function paintBase(w, h) {
    // Near-black charcoal/navy base - the forge darkness
    const bg = ctx.createLinearGradient(0, 0, 0, h);
    bg.addColorStop(0,   `rgba(7, 12, 20, 1)`);
    bg.addColorStop(0.5, `rgba(5,  9, 16, 1)`);
    bg.addColorStop(1,   `rgba(3,  6, 12, 1)`);
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);

    // Cool atmospheric tint on the ceiling (hero accent colour bleeds in)
    const atm = ctx.createLinearGradient(0, 0, 0, h * 0.55);
    atm.addColorStop(0, `rgba(${accent[0]},${accent[1]},${accent[2]}, 0.07)`);
    atm.addColorStop(1, `rgba(0,0,0,0)`);
    ctx.fillStyle = atm;
    ctx.fillRect(0, 0, w, h);
  }

  function paintBokeh(w, h) {
    BOKEH.forEach(b => {
      const drift  = Math.sin(time * 0.22 + b.phase) * 0.018;
      const bob    = Math.cos(time * 0.16 + b.phase) * h * 0.012;
      const x      = (b.x + drift) * w;
      const y      = b.y * h + bob;
      const pulse  = 1 + Math.sin(time * 0.38 + b.phase) * 0.06;
      const r      = b.r * Math.min(w, h) * pulse;
      const col    = b.warm ? accent2 : accent;
      const alpha  = b.a * (0.85 + Math.sin(time * 0.55 + b.phase) * 0.15);
      const g = ctx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0,    `rgba(${col[0]},${col[1]},${col[2]},${alpha})`);
      g.addColorStop(0.35, `rgba(${col[0]},${col[1]},${col[2]},${alpha * 0.45})`);
      g.addColorStop(0.70, `rgba(${col[0]},${col[1]},${col[2]},${alpha * 0.12})`);
      g.addColorStop(1,    `rgba(0,0,0,0)`);
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
    });
  }

  function paintColumns(w, h) {
    COLS.forEach((cx, i) => {
      const x    = cx * w;
      const cw   = w * 0.026;
      const side = i < COLS.length / 2 ? 1 : -1;  // which edge catches rim light

      // Column silhouette - slightly darker than base
      const sg = ctx.createLinearGradient(x - cw, 0, x + cw, 0);
      sg.addColorStop(0,    `rgba(0,0,0,0)`);
      sg.addColorStop(0.22, `rgba(2,5,10, 0.50)`);
      sg.addColorStop(0.50, `rgba(1,3, 7, 0.72)`);
      sg.addColorStop(0.78, `rgba(2,5,10, 0.50)`);
      sg.addColorStop(1,    `rgba(0,0,0,0)`);
      ctx.fillStyle = sg;
      ctx.fillRect(x - cw, 0, cw * 2, h * 0.88);

      // Rim-light edge - hero's cool accent colour catches the column edge
      if (i > 0 && i < COLS.length - 1) {
        const ex = x + side * cw * 0.55;
        const eg = ctx.createLinearGradient(ex - 4, 0, ex + 4, 0);
        eg.addColorStop(0, `rgba(0,0,0,0)`);
        eg.addColorStop(0.5, `rgba(${accent[0]},${accent[1]},${accent[2]}, 0.10)`);
        eg.addColorStop(1, `rgba(0,0,0,0)`);
        ctx.fillStyle = eg;
        ctx.fillRect(ex - 4, h * 0.04, 8, h * 0.78);
      }
    });
  }

  function paintHaze(w, h) {
    // Mid-ground atmospheric band - simulates in-world depth fog
    const haze = ctx.createLinearGradient(0, h * 0.30, 0, h * 0.68);
    haze.addColorStop(0,   `rgba(0,0,0,0)`);
    haze.addColorStop(0.5, `rgba(${accent[0]},${accent[1]},${accent[2]}, 0.022)`);
    haze.addColorStop(1,   `rgba(0,0,0,0)`);
    ctx.fillStyle = haze;
    ctx.fillRect(0, h * 0.30, w, h * 0.38);

    // Ground plane mist (accumulates at the base)
    const floor = ctx.createLinearGradient(0, h * 0.75, 0, h);
    floor.addColorStop(0, `rgba(0,0,0,0)`);
    floor.addColorStop(1, `rgba(${accent[0]},${accent[1]},${accent[2]}, 0.038)`);
    ctx.fillStyle = floor;
    ctx.fillRect(0, h * 0.75, w, h * 0.25);
  }

  function paintSpotlight(w, h) {
    // Warm hero spotlight - radiates from below the frame centre
    const sx = w * 0.52;
    const sy = h * 1.08;
    const sr = Math.min(w, h) * 0.82;
    const sg = ctx.createRadialGradient(sx, sy, 0, sx, sy, sr);
    sg.addColorStop(0,    `rgba(${accent2[0]},${accent2[1]},${accent2[2]}, 0.075)`);
    sg.addColorStop(0.38, `rgba(${accent2[0]},${accent2[1]},${accent2[2]}, 0.030)`);
    sg.addColorStop(0.65, `rgba(${accent2[0]},${accent2[1]},${accent2[2]}, 0.008)`);
    sg.addColorStop(1,    `rgba(0,0,0,0)`);
    ctx.fillStyle = sg;
    ctx.fillRect(0, 0, w, h);
  }

  function paintDust(w, h) {
    ctx.save();
    DUST.forEach(d => {
      const x = (d.sx * w + time * d.speed * 0.4) % w;
      const rawY = d.sy * h - time * d.speed;
      const y = ((rawY % h) + h) % h;
      const alpha = 0.035 + Math.sin(time * 0.7 + d.phase) * 0.018;
      const col = (d.phase % 2 < 1) ? accent : accent2;
      ctx.fillStyle = `rgba(${col[0]},${col[1]},${col[2]},${alpha})`;
      ctx.fillRect(x, y, d.sz, d.sz);
    });
    ctx.restore();
  }

  function paintVignette(w, h) {
    const vg = ctx.createRadialGradient(w * 0.5, h * 0.48, h * 0.28, w * 0.5, h * 0.48, h * 0.88);
    vg.addColorStop(0, `rgba(0,0,0,0)`);
    vg.addColorStop(1, `rgba(0,0,0,0.62)`);
    ctx.fillStyle = vg;
    ctx.fillRect(0, 0, w, h);
  }

  // ---- API ---------------------------------------------------

  function setAccent(a, b) {
    accent  = hexToRgb(a);
    accent2 = hexToRgb(b);
  }

  function setPattern() {}  // kept for API compatibility

  resize();
  return { resize, tick, setAccent, setPattern, setIntensity() {} };
}

function hexToRgb(hex) {
  let v = String(hex || '#ffffff').replace('#', '');
  if (v.length === 3) v = v.split('').map(c => c + c).join('');
  return [parseInt(v.slice(0,2),16), parseInt(v.slice(2,4),16), parseInt(v.slice(4,6),16)];
}
