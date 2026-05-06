// ============================================================
//  AUDIO - synth tones + speechSynthesis TTS (v4)
// ============================================================

let ctx = null;
let master = null;
let muted = true;
let lastSpoken = '';
let lastSpokenAt = 0;
let pickedVoice = null;
let voicesReady = false;

function ensure() {
  if (ctx) return true;
  try {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return false;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = 0.075;       // softer master volume
    master.connect(ctx.destination);
    return true;
  } catch (e) { return false; }
}

export function unlock() {
  ensure();
  if (ctx && ctx.state === 'suspended') ctx.resume();
  primeVoices();
}

export function setMuted(m) {
  muted = m;
  if (master) master.gain.value = muted ? 0 : 0.075;
  if (muted && 'speechSynthesis' in window) speechSynthesis.cancel();
}
export function isMuted() { return muted; }

// ─── Voice priming ───
function primeVoices() {
  if (!('speechSynthesis' in window)) return;
  const tryPick = () => {
    const voices = speechSynthesis.getVoices();
    if (!voices || voices.length === 0) return false;

    // Prefer en-US, prefer "natural" or "neural" voices over default
    const preferred = [
      v => /en-US/i.test(v.lang) && /(neural|natural|enhanced|google|samantha|aria|jenny)/i.test(v.name),
      v => /en-US/i.test(v.lang) && /female|samantha|zira|aria/i.test(v.name),
      v => /en-US/i.test(v.lang),
      v => /^en/i.test(v.lang)
    ];
    for (const pred of preferred) {
      const found = voices.find(pred);
      if (found) { pickedVoice = found; voicesReady = true; return true; }
    }
    pickedVoice = voices[0];
    voicesReady = true;
    return true;
  };

  if (!tryPick()) {
    speechSynthesis.onvoiceschanged = () => { tryPick(); };
  }
}

// ─── envelope helper ───
function env(g, peak, attack = 0.005, decay = 0.12) {
  const now = ctx.currentTime;
  g.gain.setValueAtTime(0, now);
  g.gain.linearRampToValueAtTime(peak, now + attack);
  g.gain.exponentialRampToValueAtTime(0.0001, now + attack + decay);
}

// ─── HOVER - softer, lower, less 8-bit ───
export function hover() {
  if (!ensure() || muted) return;
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  const filt = ctx.createBiquadFilter();
  filt.type = 'lowpass';
  filt.frequency.value = 1200;
  filt.Q.value = 1.5;

  osc.type = 'sine';
  osc.frequency.setValueAtTime(560, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(420, ctx.currentTime + 0.06);
  env(g, 0.02, 0.003, 0.07);
  osc.connect(filt).connect(g).connect(master);
  osc.start();
  osc.stop(ctx.currentTime + 0.1);
}

// ─── SELECT - smoother chord, no sparkle ───
export function select() {
  if (!ensure() || muted) return;
  const freqs = [196, 294]; // G3 + D4
  freqs.forEach((f, i) => {
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    const filt = ctx.createBiquadFilter();
    filt.type = 'lowpass';
    filt.frequency.value = 1800;
    osc.type = i === 0 ? 'triangle' : 'sine';
    osc.frequency.setValueAtTime(f, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(f * 1.35, ctx.currentTime + 0.18);
    env(g, 0.11, 0.005, 0.28);
    osc.connect(filt).connect(g).connect(master);
    osc.start();
    osc.stop(ctx.currentTime + 0.32);
  });
}

// ─── WHOOSH for transitions ───
export function whoosh() {
  if (!ensure() || muted) return;
  const bufSize = ctx.sampleRate * 0.45;
  const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < bufSize; i++) {
    const t = i / bufSize;
    d[i] = (Math.random() * 2 - 1) * Math.pow(1 - t, 2.2);
  }
  const src = ctx.createBufferSource();
  src.buffer = buf;
  const filt = ctx.createBiquadFilter();
  filt.type = 'bandpass';
  filt.frequency.setValueAtTime(280, ctx.currentTime);
  filt.frequency.exponentialRampToValueAtTime(2000, ctx.currentTime + 0.4);
  filt.Q.value = 2.2;
  const g = ctx.createGain();
  g.gain.value = 0.10;
  src.connect(filt).connect(g).connect(master);
  src.start();
}

// ─── BACK ───
export function back() {
  if (!ensure() || muted) return;
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(330, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.18);
  env(g, 0.08, 0.003, 0.22);
  osc.connect(g).connect(master);
  osc.start();
  osc.stop(ctx.currentTime + 0.25);
}

// ─── START - opening boom + whoosh ───
export function start() {
  if (!ensure() || muted) return;
  whoosh();
  setTimeout(() => {
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(72, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(38, ctx.currentTime + 0.3);
    env(g, 0.25, 0.008, 0.42);
    osc.connect(g).connect(master);
    osc.start();
    osc.stop(ctx.currentTime + 0.5);
  }, 110);
}

// ─── TICK for boot lines ───
export function tick() {
  if (!ensure() || muted) return;
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.value = 1100;
  env(g, 0.02, 0.001, 0.025);
  osc.connect(g).connect(master);
  osc.start();
  osc.stop(ctx.currentTime + 0.04);
}

// ─── TTS ───
export function speak(text, opts = {}) {
  if (muted) return;
  if (!('speechSynthesis' in window)) return;

  // dedupe rapid-fire calls (e.g. hover spam)
  const now = performance.now();
  if (text === lastSpoken && (now - lastSpokenAt) < 600) return;
  lastSpoken = text;
  lastSpokenAt = now;

  // cancel any ongoing speech so the latest hover wins
  speechSynthesis.cancel();

  const u = new SpeechSynthesisUtterance(text);
  if (pickedVoice) u.voice = pickedVoice;
  u.rate   = opts.rate   ?? 1.05;
  u.pitch  = opts.pitch  ?? 0.95;
  u.volume = opts.volume ?? 0.22;
  u.lang   = u.voice ? u.voice.lang : 'en-US';

  try { speechSynthesis.speak(u); } catch (e) { /* ignore */ }
}
