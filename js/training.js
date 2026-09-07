// ============================================================
//  TRAINING RANGE - playable minigame (v6)
//  An Overwatch practice-range aim trainer inside the arena.
//  Training bots pop up in lanes, headshots crit, combos build
//  score, 60 seconds on the clock, ranked result card at the
//  end with a persistent personal best. Bonus bots carry real
//  project tags and drop a one-line fact when destroyed.
// ============================================================

import * as audio from "./audio.js";

const OVERLAY_ID = "tr-overlay";
const STYLE_ID = "tr-styles";
const BEST_KEY = "hh-training-best";
const ROUND_SECONDS = 30;

const RANKS = [
  { min: 0,     name: "BRONZE",      color: "#a97142" },
  { min: 1300,  name: "SILVER",      color: "#bfc7d1" },
  { min: 2300,  name: "GOLD",        color: "#f9c545" },
  { min: 3500,  name: "PLATINUM",    color: "#9adbe8" },
  { min: 4800,  name: "DIAMOND",     color: "#b58fe8" },
  { min: 6300,  name: "MASTER",      color: "#f2a13c" },
  { min: 8000,  name: "GRANDMASTER", color: "#ffd166" }
];

// bonus-bot payloads: real portfolio facts, one line each
const INTEL = [
  ["QBC", "Blood counter redesigned from $10,000 to under $300. SLU Launch Inventor Award winner."],
  ["GUARD", "mmWave driver authentication. 100% unauthorized detection, manuscript at IEEE INFOCOM 2027."],
  ["TREMOR", "Parkinson's monitoring capstone. Sold to an active research lab after the symposium."],
  ["WIFI", "194K measurements across 952 survey locations. Delivered to SLU IT, in active use."],
  ["PT KIDS", "Clinical serial tool running across 3+ pediatric therapy sites."],
  ["ABU", "Firmware track: C/C++, FreeRTOS, ESP32, ATmega, FPGA, JTAG."],
  ["AKAT", "Software track: Python, PyTorch, SQL, React Native, end-to-end ML."]
];

let state = null;

function injectStyles() {
  if (document.getElementById(STYLE_ID)) return;
  const s = document.createElement("style");
  s.id = STYLE_ID;
  s.textContent = `
    #${OVERLAY_ID} {
      position: fixed; inset: 0; z-index: 9500;
      display: none; background: #060a12;
    }
    #${OVERLAY_ID}.open { display: block; }
    #${OVERLAY_ID} canvas {
      position: absolute; inset: 0;
      width: 100%; height: 100%;
      cursor: none;
    }

    .tr-hud {
      position: absolute; top: 0; left: 0; right: 0;
      display: flex; align-items: flex-start; justify-content: space-between;
      padding: 22px 34px; pointer-events: none;
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      color: rgba(230, 238, 248, 0.9);
    }
    .tr-hud-block { display: grid; gap: 2px; }
    .tr-hud-block .k {
      font-size: 0.62rem; letter-spacing: 0.34em; text-transform: uppercase;
      color: rgba(185,195,209,0.55);
    }
    .tr-hud-block .v {
      font-family: 'Oswald', 'Arial Narrow', Impact, sans-serif;
      font-size: 2.1rem; font-weight: 700; line-height: 1;
      text-transform: uppercase;
    }
    .tr-hud-center { text-align: center; }
    .tr-hud-center .v { font-size: 2.7rem; color: #ffd166; }
    .tr-hud-right { text-align: right; }

    .tr-combo {
      position: absolute; left: 50%; top: 108px;
      transform: translateX(-50%);
      font-family: 'Oswald', sans-serif; font-weight: 700;
      font-size: 1.15rem; letter-spacing: 0.18em;
      color: var(--acc, #f9a826);
      opacity: 0; transition: opacity 150ms ease, transform 150ms ease;
      pointer-events: none;
    }
    .tr-combo.hot { opacity: 1; transform: translateX(-50%) scale(1.12); }

    .tr-ticker {
      position: absolute; left: 50%; bottom: 90px;
      transform: translateX(-50%);
      max-width: min(720px, 86vw);
      padding: 10px 22px;
      background: linear-gradient(100deg, rgba(7,12,19,0.92), rgba(7,12,19,0.78));
      clip-path: polygon(12px 0, 100% 0, calc(100% - 12px) 100%, 0 100%);
      font-family: 'Inter Tight', sans-serif; font-size: 0.95rem;
      color: rgba(230,238,248,0.92);
      opacity: 0; transition: opacity 200ms ease;
      pointer-events: none;
    }
    .tr-ticker.show { opacity: 1; }
    .tr-ticker strong { color: var(--acc, #f9a826); margin-right: 10px; letter-spacing: 0.08em; }

    .tr-exit {
      position: absolute; bottom: 24px; left: 34px;
      pointer-events: all; cursor: pointer;
      background: none; border: 1px solid rgba(255,255,255,0.22);
      color: rgba(185,195,209,0.7);
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.65rem; letter-spacing: 0.3em; text-transform: uppercase;
      padding: 8px 20px;
      transition: border-color 0.15s, color 0.15s;
    }
    .tr-exit:hover { border-color: #fff; color: #fff; }

    /* countdown + results share the veil */
    .tr-veil {
      position: absolute; inset: 0; z-index: 3;
      display: none; align-items: center; justify-content: center;
      background: radial-gradient(ellipse at center, rgba(6,10,18,0.55), rgba(6,10,18,0.92));
    }
    .tr-veil.show { display: flex; }

    .tr-count {
      font-family: 'Oswald', sans-serif; font-weight: 700;
      font-size: clamp(6rem, 18vw, 13rem); color: #ffd166;
      text-shadow: 0 0 60px rgba(249,168,38,0.5);
      animation: trPop 900ms ease both;
    }
    @keyframes trPop {
      0% { transform: scale(1.6); opacity: 0; }
      18% { transform: scale(1); opacity: 1; }
      82% { transform: scale(1); opacity: 1; }
      100% { transform: scale(0.9); opacity: 0; }
    }

    .tr-card {
      width: min(680px, calc(100vw - 48px));
      padding: 34px 40px;
      border: 1px solid rgba(255,255,255,0.2);
      background:
        repeating-linear-gradient(115deg, rgba(255,255,255,0.02) 0 22px, transparent 22px 44px),
        linear-gradient(135deg, rgba(9,14,22,0.97), rgba(9,14,22,0.85));
      box-shadow: inset 0 2px 0 var(--tr-rank, #f9a826);
      clip-path: polygon(0 0, calc(100% - 26px) 0, 100% 26px, 100% 100%, 26px 100%, 0 calc(100% - 26px));
      font-family: 'Inter Tight', sans-serif;
      color: rgba(230,238,248,0.92);
    }
    .tr-card .tc-kicker {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.62rem; letter-spacing: 0.4em; text-transform: uppercase;
      color: rgba(185,195,209,0.55);
    }
    .tr-card h2 {
      margin: 6px 0 2px;
      font-family: 'Oswald', sans-serif; font-weight: 700;
      font-size: clamp(2.6rem, 6vw, 4rem);
      line-height: 0.92; text-transform: uppercase; color: #fff;
    }
    .tr-card .tc-rank {
      font-family: 'Oswald', sans-serif; font-weight: 700;
      font-size: 1.4rem; letter-spacing: 0.22em;
      color: var(--tr-rank, #f9a826);
    }
    .tr-card .tc-new-best {
      display: inline-block; margin-left: 14px;
      font-family: 'JetBrains Mono', monospace; font-size: 0.62rem;
      letter-spacing: 0.28em; color: #08101a;
      background: #ffd166; padding: 3px 10px;
      vertical-align: middle;
    }
    .tr-grid {
      display: grid; grid-template-columns: repeat(4, 1fr);
      gap: 14px; margin: 24px 0 26px;
    }
    .tr-grid .tg { display: grid; gap: 3px; }
    .tr-grid .tg span {
      font-family: 'JetBrains Mono', monospace; font-size: 0.6rem;
      letter-spacing: 0.28em; text-transform: uppercase;
      color: rgba(185,195,209,0.5);
    }
    .tr-grid .tg strong {
      font-family: 'Oswald', sans-serif; font-size: 1.75rem; font-weight: 700;
    }
    .tr-actions { display: flex; gap: 14px; }
    .tr-btn {
      cursor: pointer; border: none;
      font-family: 'JetBrains Mono', monospace; font-weight: 700;
      font-size: 0.78rem; letter-spacing: 0.24em; text-transform: uppercase;
      padding: 11px 30px;
      clip-path: polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%);
      transition: transform 120ms ease, filter 120ms ease;
    }
    .tr-btn:hover { transform: translateY(-2px); filter: brightness(1.12); }
    .tr-btn.primary { background: #f9a826; color: #08101a; }
    .tr-btn.ghost {
      background: transparent; color: rgba(230,238,248,0.85);
      box-shadow: inset 0 0 0 1px rgba(255,255,255,0.3);
    }

    @media (max-width: 640px) {
      .tr-grid { grid-template-columns: repeat(2, 1fr); }
      .tr-hud { padding: 14px 18px; }
      .tr-hud-block .v { font-size: 1.5rem; }
      .tr-hud-center .v { font-size: 2rem; }
    }
  `;
  document.head.appendChild(s);
}

function injectOverlay() {
  if (document.getElementById(OVERLAY_ID)) return;
  const el = document.createElement("div");
  el.id = OVERLAY_ID;
  el.setAttribute("role", "dialog");
  el.setAttribute("aria-label", "Training range");
  el.innerHTML = `
    <canvas></canvas>
    <div class="tr-hud">
      <div class="tr-hud-block">
        <span class="k">Score</span>
        <span class="v" data-tr="score">0</span>
      </div>
      <div class="tr-hud-block tr-hud-center">
        <span class="k">Time Remaining</span>
        <span class="v" data-tr="time">1:00</span>
      </div>
      <div class="tr-hud-block tr-hud-right">
        <span class="k">Accuracy</span>
        <span class="v" data-tr="acc">100%</span>
      </div>
    </div>
    <div class="tr-combo" data-tr="combo"></div>
    <div class="tr-ticker" data-tr="ticker"></div>
    <button class="tr-exit" type="button" data-tr="exit">ESC / LEAVE RANGE</button>
    <div class="tr-veil" data-tr="veil"></div>
  `;
  document.body.appendChild(el);
}

// ---- bot model ---------------------------------------------

function spawnBot(w, h, tSinceStart) {
  const bonus = Math.random() < 0.14;
  const scale = 0.8 + Math.random() * 0.55;
  const bw = 66 * scale, bh = 120 * scale;
  const lane = 0.42 + Math.random() * 0.5; // vertical band, lower 60%
  return {
    x: 60 + Math.random() * (w - 120 - bw),
    baseY: h * lane,
    w: bw, h: bh,
    born: tSinceStart,
    ttl: Math.max(1.15, 2.5 - tSinceStart * 0.014), // bots get faster
    rise: 0.28,
    dead: false,
    deathT: 0,
    bonus,
    intel: bonus ? INTEL[(Math.random() * INTEL.length) | 0] : null,
    wobble: Math.random() * Math.PI * 2
  };
}

function botY(bot, age) {
  const up = Math.min(1, age / bot.rise);
  const ease = 1 - Math.pow(1 - up, 3);
  return bot.baseY - bot.h * ease + Math.sin(age * 2.2 + bot.wobble) * 3;
}

// ---- render ------------------------------------------------

function drawBot(ctx, bot, age, accent) {
  const y = botY(bot, age);
  const { x, w, h } = bot;
  const headR = w * 0.30;
  const life = 1 - Math.max(0, (age - (bot.ttl - 0.35)) / 0.35); // fade-out warning
  ctx.save();
  ctx.globalAlpha = bot.dead ? Math.max(0, 1 - bot.deathT * 4) : Math.min(1, life + 0.25);

  if (bot.dead) {
    const s = 1 + bot.deathT * 1.6;
    ctx.translate(x + w / 2, y + h * 0.45);
    ctx.scale(s, s);
    ctx.translate(-(x + w / 2), -(y + h * 0.45));
  }

  const body = bot.bonus ? accent : "#e8edf4";
  const trim = bot.bonus ? "#ffffff" : "#232c3a";

  // torso
  ctx.fillStyle = body;
  roundRect(ctx, x, y + headR * 1.7, w, h - headR * 1.7, 10);
  ctx.fill();
  // chest core
  ctx.fillStyle = trim;
  ctx.beginPath();
  ctx.arc(x + w / 2, y + headR * 1.7 + (h - headR * 1.7) * 0.32, w * 0.14, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = bot.bonus ? "#fff" : "#25c7f7";
  ctx.beginPath();
  ctx.arc(x + w / 2, y + headR * 1.7 + (h - headR * 1.7) * 0.32, w * 0.07, 0, Math.PI * 2);
  ctx.fill();
  // head (crit zone)
  ctx.fillStyle = body;
  ctx.beginPath();
  ctx.arc(x + w / 2, y + headR, headR, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = trim;
  roundRect(ctx, x + w / 2 - headR * 0.62, y + headR * 0.72, headR * 1.24, headR * 0.5, 4);
  ctx.fill();

  // bonus tag
  if (bot.bonus && !bot.dead) {
    ctx.fillStyle = "rgba(7,12,19,0.9)";
    ctx.font = "700 11px 'JetBrains Mono', monospace";
    const tag = bot.intel[0];
    const tw = ctx.measureText(tag).width + 14;
    roundRect(ctx, x + w / 2 - tw / 2, y - 24, tw, 18, 3);
    ctx.fill();
    ctx.fillStyle = accent;
    ctx.fillText(tag, x + w / 2 - tw / 2 + 7, y - 11);
  }
  ctx.restore();
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function drawCrosshair(ctx, mx, my, flash) {
  ctx.save();
  ctx.strokeStyle = flash > 0 ? "#ffd166" : "rgba(255,255,255,0.92)";
  ctx.lineWidth = 2;
  const gap = 7 + flash * 6, len = 11;
  ctx.beginPath();
  ctx.moveTo(mx - gap - len, my); ctx.lineTo(mx - gap, my);
  ctx.moveTo(mx + gap, my);       ctx.lineTo(mx + gap + len, my);
  ctx.moveTo(mx, my - gap - len); ctx.lineTo(mx, my - gap);
  ctx.moveTo(mx, my + gap);       ctx.lineTo(mx, my + gap + len);
  ctx.stroke();
  ctx.fillStyle = "rgba(255,255,255,0.95)";
  ctx.fillRect(mx - 1, my - 1, 2, 2);
  ctx.restore();
}

function drawPopup(ctx, p) {
  ctx.save();
  ctx.globalAlpha = Math.max(0, 1 - p.t / 0.7);
  ctx.fillStyle = p.color;
  ctx.font = `700 ${p.crit ? 26 : 19}px 'Oswald', sans-serif`;
  ctx.textAlign = "center";
  ctx.fillText(p.text, p.x, p.y - p.t * 55);
  ctx.restore();
}

// ---- round lifecycle ---------------------------------------

function startRound(el) {
  const canvas = el.querySelector("canvas");
  const ctx = canvas.getContext("2d");
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  function resize() {
    canvas.width = el.clientWidth * dpr;
    canvas.height = el.clientHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize();

  const accent = getComputedStyle(document.documentElement).getPropertyValue("--acc").trim() || "#f9a826";

  state = {
    running: true, over: false,
    t: 0, roundT: 0, spawnT: 0,
    score: 0, shots: 0, hits: 0, crits: 0, kills: 0, combo: 0, bestCombo: 0,
    bots: [], popups: [],
    mx: el.clientWidth / 2, my: el.clientHeight / 2,
    flash: 0,
    raf: 0, resize, canvas, ctx, el, accent
  };

  const hud = {
    score: el.querySelector('[data-tr="score"]'),
    time: el.querySelector('[data-tr="time"]'),
    acc: el.querySelector('[data-tr="acc"]'),
    combo: el.querySelector('[data-tr="combo"]'),
    ticker: el.querySelector('[data-tr="ticker"]')
  };
  let tickerTimer = 0;

  function onMove(e) {
    const r = canvas.getBoundingClientRect();
    state.mx = e.clientX - r.left;
    state.my = e.clientY - r.top;
  }
  function onShoot(e) {
    if (!state.running || state.over) return;
    onMove(e);
    state.shots++;
    state.flash = 1;
    let hit = null, crit = false;
    // topmost bot wins
    for (let i = state.bots.length - 1; i >= 0; i--) {
      const bot = state.bots[i];
      if (bot.dead) continue;
      const age = state.roundT - bot.born;
      const y = botY(bot, age);
      const headR = bot.w * 0.30;
      const hx = bot.x + bot.w / 2, hy = y + headR;
      const dx = state.mx - hx, dy = state.my - hy;
      if (dx * dx + dy * dy <= headR * headR) { hit = bot; crit = true; break; }
      if (state.mx >= bot.x && state.mx <= bot.x + bot.w &&
          state.my >= y + headR * 1.7 && state.my <= y + bot.h) { hit = bot; break; }
    }
    if (hit) {
      state.hits++; state.kills++;
      state.combo++;
      state.bestCombo = Math.max(state.bestCombo, state.combo);
      if (crit) state.crits++;
      const comboMult = 1 + Math.min(state.combo, 10) * 0.1;
      const base = crit ? 200 : 100;
      const bonusPts = hit.bonus ? 150 : 0;
      const pts = Math.round((base + bonusPts) * comboMult);
      state.score += pts;
      hit.dead = true; hit.deathT = 0;
      state.popups.push({
        x: hit.x + hit.w / 2, y: botY(hit, state.roundT - hit.born),
        text: crit ? `CRITICAL +${pts}` : `+${pts}`,
        color: crit ? "#ff5a5a" : (hit.bonus ? state.accent : "#ffffff"),
        crit, t: 0
      });
      if (hit.bonus && hit.intel) {
        hud.ticker.innerHTML = `<strong>${hit.intel[0]}</strong>${hit.intel[1]}`;
        hud.ticker.classList.add("show");
        clearTimeout(tickerTimer);
        tickerTimer = setTimeout(() => hud.ticker.classList.remove("show"), 3600);
      }
      crit ? audio.crit() : audio.hit();
    } else {
      state.combo = 0;
      audio.miss();
    }
  }

  canvas.addEventListener("mousemove", onMove);
  canvas.addEventListener("mousedown", onShoot);
  window.addEventListener("resize", resize);
  state.cleanup = () => {
    canvas.removeEventListener("mousemove", onMove);
    canvas.removeEventListener("mousedown", onShoot);
    window.removeEventListener("resize", resize);
    cancelAnimationFrame(state.raf);
    clearTimeout(tickerTimer);
  };

  let last = performance.now();
  function frame(now) {
    if (!state || !state.running) return;
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    state.t += dt;

    if (!state.over) {
      state.roundT += dt;
      state.spawnT -= dt;
      const targetInterval = Math.max(0.32, 0.85 - state.roundT * 0.008);
      if (state.spawnT <= 0) {
        state.bots.push(spawnBot(el.clientWidth, el.clientHeight, state.roundT));
        state.spawnT = targetInterval * (0.7 + Math.random() * 0.6);
      }
    }

    // update bots
    state.bots = state.bots.filter(bot => {
      if (bot.dead) { bot.deathT += dt; return bot.deathT < 0.3; }
      const age = state.roundT - bot.born;
      if (age > bot.ttl) { state.combo = 0; return false; } // escaped
      return true;
    });
    state.popups = state.popups.filter(p => (p.t += dt) < 0.7);
    state.flash = Math.max(0, state.flash - dt * 6);

    // draw
    const w = el.clientWidth, h = el.clientHeight;
    ctx.clearRect(0, 0, w, h);
    paintRange(ctx, w, h, state.t, state.accent);
    state.bots.forEach(bot => drawBot(ctx, bot, state.roundT - bot.born, state.accent));
    state.popups.forEach(p => drawPopup(ctx, p));
    if (!state.over) drawCrosshair(ctx, state.mx, state.my, state.flash);

    // hud
    hud.score.textContent = state.score.toLocaleString();
    const remain = Math.max(0, ROUND_SECONDS - state.roundT);
    hud.time.textContent = `${Math.floor(remain / 60)}:${String(Math.ceil(remain % 60) % 60).padStart(2, "0")}`;
    hud.acc.textContent = state.shots ? `${Math.round((state.hits / state.shots) * 100)}%` : "100%";
    if (state.combo >= 3) {
      hud.combo.textContent = `COMBO x${state.combo}`;
      hud.combo.classList.add("hot");
    } else {
      hud.combo.classList.remove("hot");
    }

    if (!state.over && remain <= 0) {
      state.over = true;
      endRound(el);
    }
    state.raf = requestAnimationFrame(frame);
  }
  state.raf = requestAnimationFrame(frame);
}

function paintRange(ctx, w, h, t, accent) {
  const bg = ctx.createLinearGradient(0, 0, 0, h);
  bg.addColorStop(0, "#0a111c");
  bg.addColorStop(1, "#050810");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);
  // floor grid, practice-range style
  ctx.strokeStyle = "rgba(120, 150, 190, 0.07)";
  ctx.lineWidth = 1;
  for (let i = 0; i < 12; i++) {
    const y = h * 0.4 + i * i * 2.4;
    if (y > h) break;
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
  }
  for (let i = -10; i <= 10; i++) {
    ctx.beginPath();
    ctx.moveTo(w / 2 + i * 40, h * 0.4);
    ctx.lineTo(w / 2 + i * 190, h);
    ctx.stroke();
  }
  // hazard stripe wall line
  ctx.fillStyle = "rgba(249,168,38,0.08)";
  ctx.fillRect(0, h * 0.395, w, 3);
  // slow drifting accent glow
  const gx = w * (0.5 + Math.sin(t * 0.1) * 0.25);
  const g = ctx.createRadialGradient(gx, h * 0.2, 0, gx, h * 0.2, h * 0.5);
  g.addColorStop(0, hexA(accent, 0.05));
  g.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
}

function hexA(hex, a) {
  let v = String(hex || "#f9a826").replace("#", "");
  if (v.length === 3) v = v.split("").map(c => c + c).join("");
  const r = parseInt(v.slice(0, 2), 16), g = parseInt(v.slice(2, 4), 16), b = parseInt(v.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${a})`;
}

// ---- countdown / results -----------------------------------

let countdownTO = null;

function runCountdown(el, then) {
  const veil = el.querySelector('[data-tr="veil"]');
  veil.classList.add("show");
  const seq = ["3", "2", "1", "GO"];
  let i = 0;
  function next() {
    if (i >= seq.length) {
      veil.classList.remove("show");
      veil.innerHTML = "";
      then();
      return;
    }
    veil.innerHTML = `<div class="tr-count">${seq[i]}</div>`;
    audio.countdown(i === seq.length - 1);
    i++;
    countdownTO = setTimeout(next, i === seq.length ? 620 : 900);
  }
  next();
}

function endRound(el) {
  const veil = el.querySelector('[data-tr="veil"]');
  const s = state;
  const acc = s.shots ? Math.round((s.hits / s.shots) * 100) : 100;
  const rank = [...RANKS].reverse().find(r => s.score >= r.min) || RANKS[0];
  const prevBest = Number(localStorage.getItem(BEST_KEY) || 0);
  const newBest = s.score > prevBest;
  if (newBest) localStorage.setItem(BEST_KEY, String(s.score));
  audio.roundEnd();

  veil.innerHTML = `
    <section class="tr-card" style="--tr-rank:${rank.color};">
      <span class="tc-kicker">TRAINING RANGE / ROUND COMPLETE</span>
      <h2>${s.score.toLocaleString()} PTS</h2>
      <div>
        <span class="tc-rank">${rank.name}</span>
        ${newBest ? `<span class="tc-new-best">NEW PERSONAL BEST</span>` : ""}
      </div>
      <div class="tr-grid">
        <div class="tg"><span>Eliminations</span><strong>${s.kills}</strong></div>
        <div class="tg"><span>Critical Hits</span><strong>${s.crits}</strong></div>
        <div class="tg"><span>Accuracy</span><strong>${acc}%</strong></div>
        <div class="tg"><span>Best Combo</span><strong>x${s.bestCombo}</strong></div>
      </div>
      <div class="tr-actions">
        <button class="tr-btn primary" data-tr="retry">REQUEUE</button>
        <button class="tr-btn ghost" data-tr="leave">LEAVE RANGE</button>
      </div>
    </section>
  `;
  veil.classList.add("show");
  veil.querySelector('[data-tr="retry"]').addEventListener("click", () => {
    veil.classList.remove("show");
    veil.innerHTML = "";
    s.cleanup();
    startRound(el);
    runCountdownIntoRunning(el);
  });
  veil.querySelector('[data-tr="leave"]').addEventListener("click", () => closeTraining());
}

function runCountdownIntoRunning(el) {
  // freeze spawning during the count, then release
  const s = state;
  s.over = true;
  runCountdown(el, () => { s.over = false; s.roundT = 0; s.bots = []; });
}

// ---- public API --------------------------------------------

let onExitCb = null;

export function initTraining({ onExit } = {}) {
  onExitCb = onExit || null;
  injectStyles();
  injectOverlay();
}

export function openTraining() {
  if (isTrainingOpen()) return;
  initTraining({ onExit: onExitCb });
  const el = document.getElementById(OVERLAY_ID);
  el.classList.add("open");
  document.body.style.overflow = "hidden";
  el.querySelector('[data-tr="exit"]').onclick = () => closeTraining();
  document.addEventListener("keydown", escClose);
  startRound(el);
  runCountdownIntoRunning(el);
}

export function closeTraining() {
  const el = document.getElementById(OVERLAY_ID);
  if (!el) return;
  clearTimeout(countdownTO);
  countdownTO = null;
  if (state) { state.running = false; state.cleanup && state.cleanup(); state = null; }
  const veil = el.querySelector('[data-tr="veil"]');
  if (veil) { veil.classList.remove("show"); veil.innerHTML = ""; }
  el.classList.remove("open");
  document.body.style.overflow = "";
  document.removeEventListener("keydown", escClose);
  if (typeof onExitCb === "function") onExitCb();
}

export function isTrainingOpen() {
  const el = document.getElementById(OVERLAY_ID);
  return !!(el && el.classList.contains("open"));
}

function escClose(e) {
  if (e.key === "Escape") closeTraining();
}
