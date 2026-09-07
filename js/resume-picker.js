// ─── Resume Picker Modal ───────────────────────────────────
// Full-screen OW-style resume select screen, same feel as the
// Arena/Pro boot choice. Works in both index.html and cv.html.

const ABU_URL  = 'https://drive.google.com/file/d/1KPpaF4SslyHd3tfZcxat-oF_x0n2g95O/view?usp=sharing';
const AKAT_URL = 'https://drive.google.com/file/d/1FxQQoqarz58hHtp1wZ4GobYd6D7_j80B/view?usp=sharing';
const MODAL_ID = 'rp-resume-modal';
const STYLE_ID = 'rp-resume-styles';

function injectStyles() {
  if (document.getElementById(STYLE_ID)) return;
  const s = document.createElement('style');
  s.id = STYLE_ID;
  s.textContent = `
    #rp-resume-modal {
      position: fixed; inset: 0; z-index: 9999;
      display: flex; align-items: center; justify-content: center;
      opacity: 0; pointer-events: none;
      transition: opacity 0.22s ease;
    }
    #rp-resume-modal.open { opacity: 1; pointer-events: all; }

    .rp-bg {
      position: absolute; inset: 0;
      width: 100%; height: 100%; object-fit: cover;
      filter: brightness(0.32) saturate(0.65);
    }
    .rp-shade {
      position: absolute; inset: 0;
      background: linear-gradient(135deg, rgba(5,9,14,0.82), rgba(5,9,14,0.48));
    }

    .rp-card {
      position: relative; z-index: 1;
      width: min(760px, calc(100vw - 40px));
      padding: 34px 38px;
      border: 1px solid rgba(255,255,255,0.22);
      box-shadow: inset 0 2px 0 #f9a826;
      background: linear-gradient(135deg, rgba(7,12,19,0.95), rgba(7,12,19,0.72));
      box-shadow: 0 30px 90px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.12);
      clip-path: polygon(0 0, calc(100% - 28px) 0, 100% 28px, 100% 100%, 28px 100%, 0 calc(100% - 28px));
    }

    .rp-titlelock {
      position: relative;
      padding: 16px 20px 12px;
      margin-bottom: 18px;
    }
    .rp-corner {
      position: absolute;
      width: 20px; height: 20px;
      border: 0 solid rgba(249,168,38,0.65);
    }
    .rp-corner.tl { left:0; top:0;    border-width: 2px 0 0 2px; }
    .rp-corner.tr { right:0; top:0;   border-width: 2px 2px 0 0; }
    .rp-corner.bl { left:0; bottom:0; border-width: 0 0 2px 2px; }
    .rp-corner.br { right:0; bottom:0;border-width: 0 2px 2px 0; }

    .rp-kicker {
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.65rem; letter-spacing: 0.4em;
      text-transform: uppercase;
      color: rgba(185,195,209,0.58);
      display: block; margin-bottom: 6px;
    }
    .rp-heading {
      margin: 0;
      font-family: 'Oswald', 'Arial Narrow', Impact, sans-serif;
      font-size: clamp(2.6rem, 5.5vw, 4rem);
      line-height: 0.9; font-weight: 700;
      text-transform: uppercase; color: #f5f8fd;
    }
    .rp-heading strong { color: #ffd16d; }

    .rp-divider {
      display: grid;
      grid-template-columns: 1fr auto 1fr;
      align-items: center; gap: 14px;
      margin-bottom: 18px;
    }
    .rp-divider-line {
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(249,168,38,0.72), transparent);
    }
    .rp-divider-label {
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.65rem; letter-spacing: 0.32em;
      text-transform: uppercase; color: rgba(249,168,38,0.88);
    }

    .rp-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 18px; margin-bottom: 20px;
    }

    .rp-option-card {
      position: relative;
      display: grid; gap: 7px;
      min-height: 215px;
      padding: 22px 24px 20px;
      text-decoration: none; text-align: left;
      border: 1px solid rgba(255,255,255,0.17);
      border-radius: 4px;
      background:
        linear-gradient(135deg, rgba(14,22,34,0.86), rgba(8,14,22,0.62)),
        radial-gradient(circle at 85% 10%, rgba(255,255,255,0.05), transparent 11rem);
      box-shadow: inset 0 1px 0 rgba(255,255,255,0.08), 0 18px 46px rgba(0,0,0,0.3);
      transition: transform 160ms ease, border-color 160ms ease;
    }
    .rp-option-card {
      clip-path: polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px);
      border-radius: 0;
    }
    .rp-option-card::before {
      content: '';
      position: absolute; left: 0; right: 0; top: 0;
      height: 3px;
      background: linear-gradient(90deg, var(--rp-acc, #f9a826), transparent 70%);
    }
    .rp-option-card:hover {
      transform: translateY(-4px);
      border-color: var(--rp-acc, #f9a826);
    }
    .rp-opt-kicker {
      color: var(--rp-acc, #f9a826);
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.6rem; font-weight: 700;
      letter-spacing: 0.28em; text-transform: uppercase;
    }
    .rp-opt-title {
      color: #fff;
      font-family: 'Oswald', 'Arial Narrow', Impact, sans-serif;
      font-size: clamp(2rem, 3.8vw, 2.9rem);
      line-height: 0.9; text-transform: uppercase;
    }
    .rp-opt-sub {
      color: rgba(185,195,209,0.68);
      font-size: 0.92rem; font-style: italic;
    }
    .rp-opt-body {
      color: rgba(185,195,209,0.62);
      font-size: 0.83rem; line-height: 1.48;
      margin: 3px 0 6px; font-family: inherit;
    }
    .rp-opt-enter {
      justify-self: start; align-self: end;
      min-width: 100px; padding: 7px 16px;
      color: #08101a;
      background: var(--rp-acc, #f9a826);
      border-radius: 999px;
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-weight: 700; font-size: 0.78rem;
      letter-spacing: 0.24em; text-align: center;
      box-shadow: 0 8px 22px color-mix(in srgb, var(--rp-acc, #f9a826) 36%, transparent);
    }

    .rp-close {
      display: block; margin: 0 auto;
      background: none;
      border: 1px solid rgba(255,255,255,0.18);
      color: rgba(185,195,209,0.55);
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.65rem; letter-spacing: 0.28em;
      text-transform: uppercase;
      padding: 7px 22px; cursor: pointer;
      transition: border-color 0.15s, color 0.15s;
    }
    .rp-close:hover { border-color: rgba(255,255,255,0.45); color: #f5f8fd; }

    @media (max-width: 600px) {
      .rp-grid { grid-template-columns: 1fr; }
      .rp-card { padding: 24px 20px; }
      .rp-titlelock { padding: 12px 14px 10px; }
    }
  `;
  document.head.appendChild(s);
}

function injectModal() {
  if (document.getElementById(MODAL_ID)) return;
  const el = document.createElement('div');
  el.id = MODAL_ID;
  el.setAttribute('role', 'dialog');
  el.setAttribute('aria-modal', 'true');
  el.setAttribute('aria-label', 'Select resume track');
  el.innerHTML = `
    <img class="rp-bg" src="assets/arena-backdrop.png" alt="" />
    <div class="rp-shade"></div>
    <section class="rp-card">
      <div class="rp-titlelock" aria-hidden="true">
        <span class="rp-corner tl"></span>
        <span class="rp-corner tr"></span>
        <span class="rp-corner bl"></span>
        <span class="rp-corner br"></span>
        <span class="rp-kicker">RESUME SELECT / HAMZA ABU KHALAF</span>
        <h2 class="rp-heading"><strong>SELECT</strong> RESUME</h2>
      </div>
      <div class="rp-divider">
        <span class="rp-divider-line"></span>
        <span class="rp-divider-label">CHOOSE YOUR TRACK</span>
        <span class="rp-divider-line"></span>
      </div>
      <div class="rp-grid">
        <a class="rp-option-card" href="${ABU_URL}" target="_blank" rel="noopener" style="--rp-acc:#ffd166;">
          <span class="rp-opt-kicker">FIRMWARE / EMBEDDED / HARDWARE</span>
          <span class="rp-opt-title">ABU</span>
          <span class="rp-opt-sub">register level, real hardware</span>
          <p class="rp-opt-body">C/C++ firmware, FreeRTOS, ESP32, ATmega, ARM Cortex-A, FPGA, JTAG. Systems that talk directly to the physical world.</p>
          <span class="rp-opt-enter">DOWNLOAD</span>
        </a>
        <a class="rp-option-card" href="${AKAT_URL}" target="_blank" rel="noopener" style="--rp-acc:#25c7f7;">
          <span class="rp-opt-kicker">SOFTWARE / AI / ML / DATA</span>
          <span class="rp-opt-title">AKAT</span>
          <span class="rp-opt-sub">systems, models, pipelines</span>
          <p class="rp-opt-body">Python, PyTorch, SQL, React Native, REST APIs. End-to-end ML and software engineering from data acquisition to deployment.</p>
          <span class="rp-opt-enter">DOWNLOAD</span>
        </a>
      </div>
      <button class="rp-close" type="button">ESC / CLOSE</button>
    </section>
  `;
  document.body.appendChild(el);

  el.addEventListener('click', e => { if (e.target === el) _close(); });
  el.querySelector('.rp-close').addEventListener('click', _close);
  el.querySelectorAll('.rp-option-card').forEach(c => {
    c.addEventListener('click', () => setTimeout(_close, 80));
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') _close();
  });
}

function _open() {
  const m = document.getElementById(MODAL_ID);
  if (m) { m.classList.add('open'); document.body.style.overflow = 'hidden'; }
}
function _close() {
  const m = document.getElementById(MODAL_ID);
  if (m) { m.classList.remove('open'); document.body.style.overflow = ''; }
}

export function initResumePickers(root = document) {
  injectStyles();
  injectModal();
  const target = (root === document ? document : root);
  target.querySelectorAll('.resume-picker-btn').forEach(btn => {
    if (btn._rp) return;
    btn._rp = true;
    btn.addEventListener('click', e => { e.stopPropagation(); _open(); });
  });
}
