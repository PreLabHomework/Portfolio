import { ROSTER } from "./data.js";
import { renderSection, postRender } from "./sections.js";
import { createShader } from "./shader.js";
import * as audio from "./audio.js";
import { initResumePickers } from "./resume-picker.js";

const app = document.getElementById("app");
const boot = document.getElementById("boot");
const bootStart = document.getElementById("boot-start");
const bootSkip = document.getElementById("boot-skip");
const bgCanvas = document.getElementById("bg-canvas");
const stageCanvas = document.getElementById("stage-canvas");
const rosterEl = document.getElementById("sel-grid");
const detailEl = document.getElementById("detail-view");
const previewEl = document.getElementById("preview");
const muteBtn = document.getElementById("hud-mute");
const clockEl = document.getElementById("hud-clock");
const menuEl = document.getElementById("main-menu");

const preview = {
  code: document.getElementById("pv-code"),
  head: document.getElementById("pv-headline"),
  sub: document.getElementById("pv-sub"),
  blurb: document.getElementById("pv-blurb"),
  stats: document.getElementById("pv-stats"),
  tag: document.getElementById("pv-tagline")
};

const shader = safeShader(bgCanvas);
let stage = fallbackStage();
let activeIndex = 0;
let started = false;
let muted = true;
let lastFrame = performance.now();

audio.setMuted(true);
renderRoster();
renderMenu();
updateClock();
setInterval(updateClock, 30000);
requestAnimationFrame(frame);

const initialHash = currentHash();
const directIndex = hashIndex(initialHash);
if (directIndex >= 0) {
  startApp().then(() => openDetail(directIndex, { replace: true }));
} else if (initialHash === "interactive" || initialHash === "arena") {
  startApp();
}

bootStart?.addEventListener("click", () => startApp());
bootSkip?.addEventListener("click", () => startApp());
muteBtn?.addEventListener("click", () => {
  muted = !muted;
  audio.setMuted(muted);
  muteBtn.classList.toggle("is-on", !muted);
  muteBtn.setAttribute("aria-label", muted ? "Audio muted" : "Audio enabled");
});

window.addEventListener("resize", () => {
  shader.resize();
  stage.resize();
});

window.addEventListener("keydown", event => {
  if (!started) return;
  if (detailEl.classList.contains("live")) {
    if (event.key === "Escape" || event.key === "Backspace") {
      event.preventDefault();
      closeDetail();
    }
    return;
  }
  if (event.key === "ArrowRight") {
    event.preventDefault();
    setActive((activeIndex + 1) % ROSTER.length, true);
    focusActive();
  }
  if (event.key === "ArrowLeft") {
    event.preventDefault();
    setActive((activeIndex - 1 + ROSTER.length) % ROSTER.length, true);
    focusActive();
  }
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    openDetail(activeIndex);
  }
});

async function startApp() {
  if (started) return;
  started = true;
  audio.unlock();
  audio.start();
  boot?.classList.add("hide");
  app?.classList.add("live");
  app?.setAttribute("aria-hidden", "false");
  stage = await loadStage();
  setActive(directIndex >= 0 ? directIndex : 0, false);
}

async function loadStage() {
  try {
    const mod = await import("./stage.js");
    const next = mod.createStage(stageCanvas);
    next.resize();
    return next;
  } catch (err) {
    console.warn("[portfolio] 3D stage unavailable", err);
    if (stageCanvas) stageCanvas.hidden = true;
    return fallbackStage();
  }
}

function renderRoster() {
  if (!rosterEl) return;
  rosterEl.innerHTML = ROSTER.map((hero, index) => `
    <button class="slot${hero.locked ? " locked" : ""}" type="button" data-index="${index}" style="--slot-acc:${hero.accent};--slot-acc2:${hero.accent2};" aria-label="${hero.title}, ${hero.subtitle}">
      <span class="slot-code">${hero.codename}</span>
      <span class="slot-role">${hero.role}</span>
      <span class="slot-portrait">${portraitIcon(hero.icon || hero.id || hero.figure)}</span>
      <span class="slot-name">${hero.title}</span>
    </button>
  `).join("");

  rosterEl.querySelectorAll(".slot").forEach(button => {
    const index = Number(button.dataset.index);
    button.addEventListener("mouseenter", () => setActive(index, true));
    button.addEventListener("focus", () => setActive(index, false));
    button.addEventListener("click", () => openDetail(index));
  });
}

function renderMenu() {
  if (!menuEl) return;
  const menuItems = ROSTER
    .map((hero, index) => ({ hero, index }))
    .filter(({ hero }) => hero.menu || hero.id === "soon");
  menuEl.innerHTML = menuItems.map(({ hero, index }) => `
    <button type="button" data-index="${index}"${hero.locked ? ' class="menu-soon"' : ""}>${hero.id === "soon" ? "COMING SOON" : hero.title}</button>
  `).join("");
  menuEl.querySelectorAll("button").forEach(button => {
    const index = Number(button.dataset.index);
    button.addEventListener("mouseenter", () => setActive(index, true));
    button.addEventListener("click", () => openDetail(index));
  });
}

function setActive(index, speak = false) {
  activeIndex = index;
  const hero = ROSTER[index];
  document.documentElement.style.setProperty("--acc", hero.accent);
  document.documentElement.style.setProperty("--acc2", hero.accent2);
  document.body.dataset.hero = hero.id;
  shader.setAccent(hero.accent, hero.accent2);
  shader.setPattern(index % 4);
  stage.setCharacter(hero.figure, hero.accent, hero.accent2, hero.model);

  rosterEl?.querySelectorAll(".slot").forEach((slot, slotIndex) => {
    const active = slotIndex === index;
    slot.classList.toggle("is-active", active);
    slot.setAttribute("aria-selected", active ? "true" : "false");
  });
  menuEl?.querySelectorAll("button").forEach(button => {
    button.classList.toggle("is-active", Number(button.dataset.index) === index);
  });
  updatePreview(hero);
  cuePreviewTransition();
  if (speak) {
    audio.hover();
    audio.speak(hero.title, { rate: 1.03, pitch: 0.92, volume: 0.16 });
  }
}

function updatePreview(hero) {
  preview.code.textContent = `${hero.codename} / ${hero.role}`;
  preview.head.textContent = hero.preview.headline;
  preview.sub.textContent = hero.preview.sub;
  preview.blurb.textContent = hero.preview.blurb;
  preview.tag.textContent = hero.tagline;
  preview.stats.innerHTML = hero.preview.stats.map(([label, value]) => `
    <div class="pv-stat"><span>${label}</span><strong>${value}</strong></div>
  `).join("");
}

function openDetail(index, options = {}) {
  if (!started) return;
  const hero = ROSTER[index];
  setActive(index, false);
  audio.select();
  audio.whoosh();
  detailEl.innerHTML = `
    <article class="detail-screen" style="--screen-acc:${hero.accent};--screen-acc2:${hero.accent2};">
      <header class="detail-titlebar">
        <button class="detail-back" type="button" data-close-detail aria-label="Back to roster">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5 8 12l7 7"/></svg>
          <span>BACK</span>
        </button>
        <span class="detail-code">${hero.codename} / ${hero.role}</span>
        <div class="detail-actions">
          ${hero.id === 'home'
            ? `<button type="button" class="ow-action resume-picker-btn">${hero.play_label || 'VIEW RESUME'}</button>`
            : (hero.play_url ? `<a class="ow-action" href="${hero.play_url}" target="_blank" rel="noopener">${hero.play_label || "OPEN"}</a>` : "")}
        </div>
      </header>
      <div class="detail-body">${renderSection(hero.id)}</div>
    </article>
  `;
  detailEl.classList.remove("entering");
  detailEl.classList.add("live", "entering");
  window.setTimeout(() => detailEl.classList.remove("entering"), 620);
  detailEl.scrollTop = 0;
  postRender(hero.id, detailEl);
  initResumePickers(detailEl);
  detailEl.querySelectorAll("[data-close-detail]").forEach(button => {
    button.addEventListener("click", closeDetail);
  });
  writeHash(hero.id, options.replace);
}

function closeDetail() {
  audio.back();
  detailEl.classList.remove("live");
  detailEl.innerHTML = "";
  writeHash("arena", true);
}

function focusActive() {
  const slot = rosterEl?.querySelector(`.slot[data-index="${activeIndex}"]`);
  slot?.focus({ preventScroll: true });
  slot?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
}

function cuePreviewTransition() {
  if (!previewEl || !started) return;
  previewEl.classList.remove("is-swapping");
  void previewEl.offsetWidth;
  previewEl.classList.add("is-swapping");
}

function updateClock() {
  if (!clockEl) return;
  const now = new Date();
  clockEl.textContent = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")} CST`;
}

function frame(now) {
  const dt = Math.min(0.05, (now - lastFrame) / 1000);
  lastFrame = now;
  shader.tick(dt);
  stage.tick(dt);
  requestAnimationFrame(frame);
}

function currentHash() {
  return window.location.hash.replace("#", "").toLowerCase();
}

function hashIndex(hash = currentHash()) {
  return ROSTER.findIndex(hero => hero.id === hash);
}

function writeHash(id, replace = false) {
  if (!window.history?.replaceState) return;
  const next = `${window.location.pathname}${window.location.search}#${id}`;
  if (replace) window.history.replaceState(null, "", next);
  else window.history.pushState(null, "", next);
}

function safeShader(canvas) {
  try {
    return createShader(canvas);
  } catch (err) {
    console.warn("[portfolio] background canvas unavailable", err);
    return { resize() {}, tick() {}, setAccent() {}, setPattern() {}, setIntensity() {} };
  }
}

function fallbackStage() {
  return { resize() {}, tick() {}, setCharacter() {} };
}

function portraitIcon(figure) {
  const icons = {
    home: `<path class="perk-mark" d="M16 47V17h8v11h16V17h8v30h-8V35H24v12Z"/><path class="perk-cut" d="M26 30h12v3H26Z"/>`,
    labs: `<path class="perk-line" d="M19 26 34 17 45 35 28 45Z"/><circle class="perk-mark" cx="19" cy="26" r="6"/><circle class="perk-mark" cx="34" cy="17" r="5"/><circle class="perk-mark" cx="45" cy="35" r="6"/><circle class="perk-mark" cx="28" cy="45" r="4"/>`,
    experience: `<path class="perk-mark" d="M16 23h32v22H16Z"/><path class="perk-cut" d="M27 23v-6h10v6h-4v-2h-2v2Z"/><path class="perk-line" d="M16 31h32M29 35h6"/>`,
    capstone: `<rect class="perk-mark" x="18" y="34" width="28" height="12" rx="3"/><path class="perk-line" d="M16 28h9l4-8 6 18 4-10h9"/><path class="perk-mark" d="M25 13h14l5 10-12 7-12-7Z"/>`,
    projects: `<path class="perk-mark" d="M18 39h28v8H18Z"/><path class="perk-mark" d="M22 27h20v12H22Z"/><path class="perk-mark" d="M30 18h4v9h-4Z"/><path class="perk-line" d="M18 47 12 54m34-7 6 7m-20-7v8"/>`,
    research: `<path class="perk-mark" d="M19 15h20l7 7v27H19Z"/><path class="perk-cut" d="M37 16v9h8"/><path class="perk-line" d="M24 31h15M24 38h12"/><path class="perk-mark" d="m40 42 10-18 4 4-14 14Z"/>`,
    skills: `<rect class="perk-mark" x="20" y="20" width="24" height="24" rx="4"/><rect class="perk-cut" x="27" y="27" width="10" height="10" rx="2"/><path class="perk-line" d="M12 25h8m24 0h8M12 39h8m24 0h8M25 12v8m14-8v8M25 44v8m14-8v8"/>`,
    timeline: `<circle class="perk-line" cx="32" cy="32" r="18"/><path class="perk-line" d="M32 18v15l10 7"/><path class="perk-mark" d="M17 47h30v6H17Z"/><path class="perk-line" d="M21 16 15 10m28 6 6-6"/>`,
    affiliations: `<circle class="perk-mark" cx="32" cy="18" r="5"/><circle class="perk-mark" cx="18" cy="40" r="5"/><circle class="perk-mark" cx="46" cy="40" r="5"/><path class="perk-line" d="M29 22 20 36m15-14 9 14M23 40h18"/>`,
    personal: `<path class="perk-line" d="M17 34a15 15 0 0 1 30 0"/><rect class="perk-mark" x="12" y="32" width="9" height="14" rx="3"/><rect class="perk-mark" x="43" y="32" width="9" height="14" rx="3"/><path class="perk-mark" d="M24 44h16l5 7H19Z"/><circle class="perk-cut" cx="28" cy="48" r="2"/><circle class="perk-cut" cx="36" cy="48" r="2"/>`,
    contact: `<path class="perk-mark" d="M14 17h36v22H30l-10 8v-8h-6Z"/><path class="perk-cut" d="M22 26h20v4H22Zm0 7h13v3H22Z"/>`,
    astakeria: `<path class="perk-mark" d="M10 32c9-13 35-13 44 0-9 13-35 13-44 0Z"/><circle class="perk-cut" cx="32" cy="32" r="8"/><circle class="perk-mark" cx="32" cy="32" r="3"/><path class="perk-line" d="M32 13v7m0 24v7M15 18l5 5m29-5-5 5"/>`,
    unknown: `<path class="perk-mark" d="M18 14h28v28H18Z"/><path class="perk-cut" d="M29 34v-2c0-4 7-4 7-10 0-4-3-7-8-7-4 0-7 2-9 5l5 4c1-2 2-3 4-3s3 1 3 3c0 3-7 4-7 9v1Zm-1 5h7v6h-7Z"/><path class="perk-line" d="M15 48h18m5 0h11M12 19h9m22 0h9"/>`
  };
  icons.protagonist = icons.home;
  icons.scientist = icons.labs;
  icons.engineer = icons.capstone;
  icons.builder = icons.projects;
  icons.author = icons.research;
  icons.technician = icons.skills;
  icons.archivist = icons.timeline;
  icons.diplomat = icons.affiliations;
  icons.civilian = icons.personal;
  return `
    <svg class="perk-icon" viewBox="0 0 64 64" aria-hidden="true">
      <path class="perk-frame" d="M32 4 50 11 60 28 54 49 32 60 10 49 4 28 14 11Z"/>
      <path class="perk-halo" d="M32 11 46 17 53 30 48 45 32 53 16 45 11 30 18 17Z"/>
      ${icons[figure] || icons.protagonist}
    </svg>
  `;
}
