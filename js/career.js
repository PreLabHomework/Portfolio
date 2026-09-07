// ============================================================
//  CAREER PROFILE - OW stats screen (v6)
//  The Overwatch career profile, rebuilt with real numbers:
//  player banner, hero time-played bars (engineering domains),
//  lifetime stat cards, medal case, and career highlights.
// ============================================================

const OVERLAY_ID = "cp-overlay";
const STYLE_ID = "cp-styles";

// Domain investment, rendered as OW "time played" bars.
// Values are relative weights, labels carry the truth.
const TIME_PLAYED = [
  { name: "EMBEDDED / FIRMWARE", detail: "C, C++, FreeRTOS, ESP32, ATmega, ARM", w: 100, color: "#ffd166" },
  { name: "SOFTWARE ENGINEERING", detail: "Python, React Native, SQL, tooling", w: 88, color: "#25c7f7" },
  { name: "ML / APPLIED AI", detail: "PyTorch, GANs, radar ML, pipelines", w: 72, color: "#b58fe8" },
  { name: "HARDWARE / FPGA", detail: "Verilog, Basys-3, JTAG, bring-up", w: 60, color: "#4ade80" },
  { name: "CLINICAL DEVICES", detail: "PT KIDS, QBC, TremorMonitor", w: 55, color: "#ef476f" },
  { name: "RF / NETWORKING", detail: "mmWave radar, WiFi survey, BLE", w: 44, color: "#f59e0b" }
];

const STAT_CARDS = [
  ["UNAUTHORIZED DRIVERS DETECTED", "100%", "GUARD, IEEE INFOCOM 2027 (under review)"],
  ["DEVICE COST REDUCTION", "$10K → <$300", "QBC hematology redesign"],
  ["WIFI MEASUREMENTS LOGGED", "194K+", "952 survey locations, delivered to SLU IT"],
  ["CAPSTONE OUTCOME", "SOLD", "TremorMonitor, acquired by a research lab"],
  ["CLINICAL SITES SERVED", "3+", "PT KIDS pediatric therapy tool"],
  ["MIMICRY ATTACKS REJECTED", "100%", "within 4 minutes, GUARD evaluation"],
  ["TRUE ACCEPTANCE RATE", "90%", "5-driver, 25-session dataset"],
  ["PAPERS IN FLIGHT", "3", "1 under review, 1 submitted, 1 published"]
];

const MEDALS = [
  { tier: "gold", label: "SLU LAUNCH INVENTOR AWARD", note: "$2,500 prize, QBC (with Sam Ghaddar)" },
  { tier: "gold", label: "CAPSTONE ACQUIRED", note: "TremorMonitor sold post-symposium" },
  { tier: "silver", label: "FIELD DEPLOYMENT", note: "QBC heading to Haiti and West Africa" },
  { tier: "silver", label: "DELIVERED TO PRODUCTION", note: "WiFi analysis in active use by SLU IT" },
  { tier: "bronze", label: "PUBLISHED", note: "TheStemSpectrum, 2025" }
];

const HIGHLIGHTS = [
  "Dual-degree Computer and Electrical Engineering, minors in CS and Mathematics, Saint Louis University, May 2026",
  "Three research labs in parallel: CHROME (clinical wearables), WNIS (radar ML), Musculoskeletal Biomechanics",
  "Industry rotation across four countries: Doha Bank, Corsair, Samsung, GSK",
  "Spanish / EU citizen based in St. Louis, authorized to work in the US on OPT"
];

function injectStyles() {
  if (document.getElementById(STYLE_ID)) return;
  const s = document.createElement("style");
  s.id = STYLE_ID;
  s.textContent = `
    #${OVERLAY_ID} {
      position: fixed; inset: 0; z-index: 9400;
      display: none; overflow-y: auto;
      background:
        radial-gradient(ellipse at 20% 0%, rgba(37,199,247,0.06), transparent 55%),
        radial-gradient(ellipse at 85% 100%, rgba(249,168,38,0.05), transparent 50%),
        #060a12;
      font-family: 'Inter Tight', sans-serif;
      color: rgba(230,238,248,0.92);
    }
    #${OVERLAY_ID}.open { display: block; }
    .cp-wrap { max-width: 1160px; margin: 0 auto; padding: 34px 40px 80px; }

    .cp-topline {
      display: flex; justify-content: space-between; align-items: center;
      margin-bottom: 26px;
    }
    .cp-back {
      cursor: pointer; background: none;
      border: 1px solid rgba(255,255,255,0.22);
      color: rgba(185,195,209,0.75);
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.65rem; letter-spacing: 0.3em; text-transform: uppercase;
      padding: 8px 20px;
      transition: border-color .15s, color .15s;
    }
    .cp-back:hover { border-color: #fff; color: #fff; }
    .cp-topline .cp-crumb {
      font-family: 'JetBrains Mono', monospace; font-size: 0.62rem;
      letter-spacing: 0.36em; text-transform: uppercase;
      color: rgba(185,195,209,0.45);
    }

    /* player banner */
    .cp-banner {
      position: relative; overflow: hidden;
      display: flex; align-items: center; gap: 26px;
      padding: 30px 34px;
      border: 1px solid rgba(255,255,255,0.16);
      background: linear-gradient(120deg, rgba(14,22,34,0.92), rgba(8,14,22,0.7));
      clip-path: polygon(0 0, calc(100% - 30px) 0, 100% 30px, 100% 100%, 30px 100%, 0 calc(100% - 30px));
      margin-bottom: 34px;
    }
    .cp-banner::after {
      content: ""; position: absolute; inset: 0;
      background: repeating-linear-gradient(115deg, rgba(255,255,255,0.022) 0 26px, transparent 26px 52px);
      pointer-events: none;
    }
    .cp-level {
      flex: 0 0 auto;
      width: 92px; height: 92px;
      display: grid; place-items: center;
      background: conic-gradient(from 210deg, #ffd166, #f9a826, #ef476f, #ffd166);
      clip-path: polygon(50% 0, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%);
    }
    .cp-level .inner {
      width: 80px; height: 80px;
      display: grid; place-items: center;
      background: #0a121e;
      clip-path: polygon(50% 0, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%);
      font-family: 'Oswald', sans-serif; font-weight: 700; font-size: 1.7rem;
      color: #ffd166;
    }
    .cp-id h1 {
      margin: 0;
      font-family: 'Oswald', sans-serif; font-weight: 700;
      font-size: clamp(2rem, 4.5vw, 3.2rem);
      line-height: 0.95; text-transform: uppercase; color: #fff;
    }
    .cp-id .cp-title-bar {
      font-family: 'JetBrains Mono', monospace; font-size: 0.68rem;
      letter-spacing: 0.3em; text-transform: uppercase;
      color: #ffd166; margin-top: 6px;
    }
    .cp-id .cp-sub {
      color: rgba(185,195,209,0.66); font-size: 0.95rem; margin-top: 8px;
    }
    .cp-endorse {
      margin-left: auto; text-align: right; flex: 0 0 auto;
      font-family: 'JetBrains Mono', monospace;
      display: grid; gap: 6px;
    }
    .cp-endorse .k { font-size: 0.6rem; letter-spacing: 0.32em; color: rgba(185,195,209,0.5); text-transform: uppercase; }
    .cp-endorse .v { font-family: 'Oswald', sans-serif; font-size: 1.35rem; font-weight: 700; color: #4ade80; }

    .cp-h {
      display: flex; align-items: center; gap: 16px;
      margin: 0 0 18px;
    }
    .cp-h::after { content: ""; flex: 1; height: 1px; background: linear-gradient(90deg, rgba(249,168,38,0.6), transparent); }
    .cp-h span {
      font-family: 'Oswald', sans-serif; font-weight: 700;
      font-size: 1.35rem; letter-spacing: 0.14em; text-transform: uppercase;
      color: #fff;
    }

    .cp-section { margin-bottom: 42px; }

    /* time played bars */
    .cp-bars { display: grid; gap: 12px; }
    .cp-bar { display: grid; grid-template-columns: 250px 1fr; gap: 16px; align-items: center; }
    .cp-bar .lbl { display: grid; gap: 1px; }
    .cp-bar .lbl strong {
      font-family: 'Oswald', sans-serif; font-size: 0.95rem; font-weight: 600;
      letter-spacing: 0.08em; color: #fff;
    }
    .cp-bar .lbl span { font-size: 0.75rem; color: rgba(185,195,209,0.55); }
    .cp-bar .trough {
      height: 26px; background: rgba(255,255,255,0.05);
      clip-path: polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%);
      overflow: hidden;
    }
    .cp-bar .fill {
      height: 100%; width: 0;
      background: linear-gradient(90deg, color-mix(in srgb, var(--bar) 65%, #000), var(--bar));
      clip-path: polygon(0 0, 100% 0, calc(100% - 6px) 100%, 0 100%);
      transition: width 900ms cubic-bezier(0.2, 0.7, 0.2, 1);
    }

    /* stat cards */
    .cp-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
    .cp-stat {
      padding: 18px 18px 16px;
      border: 0;
      background:
        repeating-linear-gradient(115deg, rgba(255,255,255,0.018) 0 18px, transparent 18px 36px),
        linear-gradient(160deg, rgba(14,22,34,0.88), rgba(8,14,22,0.6));
      clip-path: polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px);
      box-shadow: inset 0 1px 0 rgba(255,255,255,0.07);
      display: grid; gap: 6px; align-content: start;
      transition: transform 150ms ease, box-shadow 150ms ease;
    }
    .cp-stat:hover {
      transform: translateY(-4px);
      box-shadow: inset 0 1px 0 rgba(255,255,255,0.07), 0 14px 30px rgba(0,0,0,0.4);
    }
    @keyframes cpStatIn {
      from { opacity: 0; transform: translateY(14px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    #cp-overlay.open .cp-stat { animation: cpStatIn 420ms cubic-bezier(0.2,0.7,0.2,1) both; }
    #cp-overlay.open .cp-stat:nth-child(1) { animation-delay: 60ms; }
    #cp-overlay.open .cp-stat:nth-child(2) { animation-delay: 120ms; }
    #cp-overlay.open .cp-stat:nth-child(3) { animation-delay: 180ms; }
    #cp-overlay.open .cp-stat:nth-child(4) { animation-delay: 240ms; }
    #cp-overlay.open .cp-stat:nth-child(5) { animation-delay: 300ms; }
    #cp-overlay.open .cp-stat:nth-child(6) { animation-delay: 360ms; }
    #cp-overlay.open .cp-stat:nth-child(7) { animation-delay: 420ms; }
    #cp-overlay.open .cp-stat:nth-child(8) { animation-delay: 480ms; }
    .cp-stat .k {
      font-family: 'JetBrains Mono', monospace; font-size: 0.58rem;
      letter-spacing: 0.24em; color: rgba(185,195,209,0.55);
    }
    .cp-stat .v {
      font-family: 'Oswald', sans-serif; font-size: 1.9rem; font-weight: 700;
      color: #fff; line-height: 1;
    }
    .cp-stat .n { font-size: 0.76rem; color: rgba(185,195,209,0.6); }

    /* medals */
    .cp-medals { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 14px; }
    .cp-medal {
      display: flex; gap: 16px; align-items: center;
      padding: 14px 18px;
      border: 0;
      background: rgba(10, 16, 26, 0.78);
      clip-path: polygon(9px 0, 100% 0, calc(100% - 9px) 100%, 0 100%);
      box-shadow: inset 0 1px 0 rgba(255,255,255,0.06);
      transition: transform 140ms ease;
    }
    .cp-medal:hover { transform: translateX(6px); }
    .cp-medal .coin {
      flex: 0 0 auto; width: 44px; height: 44px;
      display: grid; place-items: center;
      border-radius: 50%;
      font-family: 'Oswald', sans-serif; font-weight: 700; color: #08101a;
    }
    .cp-medal.gold .coin   { background: radial-gradient(circle at 35% 30%, #ffe9ad, #f9c545 60%, #b8860b); }
    .cp-medal.silver .coin { background: radial-gradient(circle at 35% 30%, #f3f6fa, #bfc7d1 60%, #7d8794); }
    .cp-medal.bronze .coin { background: radial-gradient(circle at 35% 30%, #e8b98a, #a97142 60%, #6e4426); }
    .cp-medal .txt strong {
      display: block;
      font-family: 'Oswald', sans-serif; font-size: 0.95rem; font-weight: 600;
      letter-spacing: 0.06em; color: #fff;
    }
    .cp-medal .txt span { font-size: 0.78rem; color: rgba(185,195,209,0.6); }

    .cp-highlights { display: grid; gap: 10px; }
    .cp-highlights li {
      list-style: none; position: relative;
      padding: 12px 18px 12px 26px;
      background: linear-gradient(100deg, color-mix(in srgb, var(--acc, #f9a826) 10%, rgba(10,16,26,0.6)), rgba(10,16,26,0.6) 60%);
      clip-path: polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%);
      font-size: 0.94rem; color: rgba(220,229,240,0.88);
    }

    @media (max-width: 900px) {
      .cp-stats { grid-template-columns: repeat(2, 1fr); }
      .cp-bar { grid-template-columns: 1fr; gap: 6px; }
      .cp-banner { flex-wrap: wrap; }
      .cp-endorse { margin-left: 0; text-align: left; }
      .cp-wrap { padding: 24px 20px 60px; }
    }
  `;
  document.head.appendChild(s);
}

function render() {
  return `
    <div class="cp-wrap">
      <div class="cp-topline">
        <button class="cp-back" type="button" data-cp="back">ESC / BACK TO ARENA</button>
        <span class="cp-crumb">CAREER PROFILE / OVERVIEW</span>
      </div>

      <header class="cp-banner">
        <div class="cp-level"><div class="inner">26</div></div>
        <div class="cp-id">
          <h1>HAMZA ABU KHALAF AL TAKROURI</h1>
          <div class="cp-title-bar">COMPUTER &amp; ELECTRICAL ENGINEER / SAINT LOUIS UNIVERSITY / CLASS OF MAY 2026</div>
          <div class="cp-sub">Dual identity roster: ABU (embedded firmware) and AKAT (software, AI, ML). St. Louis based, Spanish / EU citizen.</div>
        </div>
        <div class="cp-endorse">
          <span class="k">Status</span>
          <span class="v">OPEN TO HIRE</span>
          <span class="k">Region</span>
          <span class="v" style="color:#25c7f7;">USA / ON OPT</span>
        </div>
      </header>

      <section class="cp-section">
        <h2 class="cp-h"><span>Time Invested</span></h2>
        <div class="cp-bars">
          ${TIME_PLAYED.map(b => `
            <div class="cp-bar" style="--bar:${b.color};">
              <div class="lbl"><strong>${b.name}</strong><span>${b.detail}</span></div>
              <div class="trough"><div class="fill" data-w="${b.w}"></div></div>
            </div>
          `).join("")}
        </div>
      </section>

      <section class="cp-section">
        <h2 class="cp-h"><span>Lifetime Statistics</span></h2>
        <div class="cp-stats">
          ${STAT_CARDS.map(([k, v, n]) => `
            <div class="cp-stat">
              <span class="k">${k}</span>
              <span class="v">${v}</span>
              <span class="n">${n}</span>
            </div>
          `).join("")}
        </div>
      </section>

      <section class="cp-section">
        <h2 class="cp-h"><span>Medal Case</span></h2>
        <div class="cp-medals">
          ${MEDALS.map(m => `
            <div class="cp-medal ${m.tier}">
              <span class="coin">${m.tier === "gold" ? "I" : m.tier === "silver" ? "II" : "III"}</span>
              <span class="txt"><strong>${m.label}</strong><span>${m.note}</span></span>
            </div>
          `).join("")}
        </div>
      </section>

      <section class="cp-section">
        <h2 class="cp-h"><span>Career Highlights</span></h2>
        <ul class="cp-highlights">
          ${HIGHLIGHTS.map(h => `<li>${h}</li>`).join("")}
        </ul>
      </section>
    </div>
  `;
}

let onExitCb = null;

export function initCareer({ onExit } = {}) {
  onExitCb = onExit || null;
  injectStyles();
  if (!document.getElementById(OVERLAY_ID)) {
    const el = document.createElement("section");
    el.id = OVERLAY_ID;
    el.setAttribute("role", "dialog");
    el.setAttribute("aria-label", "Career profile");
    document.body.appendChild(el);
  }
}

export function openCareer() {
  initCareer({ onExit: onExitCb });
  const el = document.getElementById(OVERLAY_ID);
  el.innerHTML = render();
  el.classList.add("open");
  el.scrollTop = 0;
  document.body.style.overflow = "hidden";
  el.querySelector('[data-cp="back"]').addEventListener("click", closeCareer);
  document.addEventListener("keydown", escClose);
  // animate the time-played bars in
  requestAnimationFrame(() => {
    setTimeout(() => {
      el.querySelectorAll(".fill").forEach(f => { f.style.width = `${f.dataset.w}%`; });
    }, 80);
  });
}

export function closeCareer() {
  const el = document.getElementById(OVERLAY_ID);
  if (!el) return;
  el.classList.remove("open");
  document.body.style.overflow = "";
  document.removeEventListener("keydown", escClose);
  if (typeof onExitCb === "function") onExitCb();
}

export function isCareerOpen() {
  const el = document.getElementById(OVERLAY_ID);
  return !!(el && el.classList.contains("open"));
}

function escClose(e) {
  if (e.key === "Escape") closeCareer();
}
