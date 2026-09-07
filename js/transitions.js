// ============================================================
//  TRANSITIONS - OW diagonal wipe (v6)
//  The signature Overwatch screen wipe: two skewed panels sweep
//  across, the screen swaps behind them mid-flight, then they
//  clear. wipe(swapFn) resolves after the full sweep.
// ============================================================

const WIPE_ID = "ow-wipe";
const STYLE_ID = "ow-wipe-styles";
const SWEEP_MS = 340;   // one direction of travel
const HOLD_MS = 60;     // covered dwell while the swap happens

let busy = false;

function injectStyles() {
  if (document.getElementById(STYLE_ID)) return;
  const s = document.createElement("style");
  s.id = STYLE_ID;
  s.textContent = `
    #${WIPE_ID} {
      position: fixed; inset: -12vh -18vw;
      z-index: 12000;
      pointer-events: none;
      overflow: hidden;
      display: none;
    }
    #${WIPE_ID}.running { display: block; }

    .ow-wipe-panel {
      position: absolute; top: 0; bottom: 0;
      width: 165%;
      transform: translateX(-118%) skewX(-14deg);
      will-change: transform;
    }
    .ow-wipe-panel.accent {
      left: -6%;
      background:
        repeating-linear-gradient(115deg,
          rgba(255,255,255,0.05) 0 22px,
          rgba(255,255,255,0.00) 22px 44px),
        linear-gradient(115deg,
          color-mix(in srgb, var(--acc, #f9a826) 88%, #000) 0%,
          color-mix(in srgb, var(--acc2, #ef476f) 82%, #000) 100%);
      box-shadow: 0 0 90px rgba(0,0,0,0.55);
    }
    .ow-wipe-panel.dark {
      left: 0;
      background: linear-gradient(115deg, #070b12 0%, #0b1220 100%);
    }
    .ow-wipe-edge {
      position: absolute; top: 0; bottom: 0; right: -3px;
      width: 7px;
      background: linear-gradient(180deg,
        rgba(255,255,255,0.85), rgba(255,255,255,0.25), rgba(255,255,255,0.85));
      filter: blur(0.4px);
    }

    #${WIPE_ID}.in .ow-wipe-panel.dark   { transition: transform ${SWEEP_MS}ms cubic-bezier(0.6,0,0.2,1); transform: translateX(-8%) skewX(-14deg); }
    #${WIPE_ID}.in .ow-wipe-panel.accent { transition: transform ${SWEEP_MS}ms cubic-bezier(0.6,0,0.2,1) 40ms; transform: translateX(-12%) skewX(-14deg); }

    #${WIPE_ID}.out .ow-wipe-panel.dark   { transition: transform ${SWEEP_MS}ms cubic-bezier(0.8,0,0.55,1) 40ms; transform: translateX(112%) skewX(-14deg); }
    #${WIPE_ID}.out .ow-wipe-panel.accent { transition: transform ${SWEEP_MS}ms cubic-bezier(0.8,0,0.55,1); transform: translateX(108%) skewX(-14deg); }

    @media (prefers-reduced-motion: reduce) {
      #${WIPE_ID} { display: none !important; }
    }
  `;
  document.head.appendChild(s);
}

function injectWipe() {
  if (document.getElementById(WIPE_ID)) return;
  const el = document.createElement("div");
  el.id = WIPE_ID;
  el.setAttribute("aria-hidden", "true");
  el.innerHTML = `
    <div class="ow-wipe-panel dark"></div>
    <div class="ow-wipe-panel accent"><span class="ow-wipe-edge"></span></div>
  `;
  document.body.appendChild(el);
}

export function initTransitions() {
  injectStyles();
  injectWipe();
}

// wipe(swapFn): panels sweep in, swapFn fires while the screen is
// covered, panels sweep out. Falls back to an instant swap if the
// user prefers reduced motion or a wipe is already in flight.
export function wipe(swapFn) {
  initTransitions();
  const el = document.getElementById(WIPE_ID);
  const reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (busy || reduced || !el) {
    if (typeof swapFn === "function") swapFn();
    return Promise.resolve();
  }

  busy = true;
  return new Promise(resolve => {
    el.classList.add("running");
    // force layout so the transition actually plays
    void el.offsetWidth;
    el.classList.add("in");

    setTimeout(() => {
      try { if (typeof swapFn === "function") swapFn(); }
      finally {
        setTimeout(() => {
          el.classList.remove("in");
          el.classList.add("out");
          setTimeout(() => {
            el.classList.remove("out", "running");
            // reset panels to start position for the next run
            busy = false;
            resolve();
          }, SWEEP_MS + 60);
        }, HOLD_MS);
      }
    }, SWEEP_MS + 50);
  });
}
