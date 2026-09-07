// ============================================================
//  SECTIONS - unified Hero-Info layout (v5.0)
//  Every section speaks one language: grouped columns of
//  icon + label + sentence rows (the D.Va hero-info screen),
//  over a dimmed hero backdrop. No chip walls, no dash rows.
// ============================================================

import { SECTIONS } from './data.js';

export function renderSection(charId) {
  const s = SECTIONS[charId];
  if (!s) return `<div class="hi-body">section not available.</div>`;
  switch (s.layout) {
    case 'home':       return renderHome(s);
    case 'labs':       return renderLabs(s);
    case 'experience': return renderExperience(s);
    case 'capstone':   return renderCapstone(s);
    case 'gallery':    return renderGallery(s);
    case 'archive':    return renderArchive(s);
    case 'skills':     return renderSkills(s);
    case 'timeline':   return renderTimeline(s);
    case 'wall':       return renderWall(s);
    case 'personal':   return renderPersonal(s);
    case 'astakeria':  return renderAstakeria(s);
    case 'soon':       return renderSoon(s);
    case 'contact':    return renderContact(s);
    default:           return `<h2 class="hi-heading">${esc(s.heading || '')}</h2>`;
  }
}

function esc(str = '') {
  return String(str).replace(/[&<>"]/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]));
}

// ---- shared pieces -----------------------------------------

function head(s, titleOverride) {
  return `
    <header class="hi-head">
      <h2 class="hi-heading">${esc(titleOverride || s.heading)}</h2>
      ${s.sub || s.subtitle ? `<p class="hi-sub">${esc(s.sub || s.subtitle)}</p>` : ''}
    </header>
  `;
}

function link(url, label = 'Open') {
  if (!url) return '';
  return `<a class="hi-link" href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(label)}<span class="hi-link-arrow" aria-hidden="true">↗</span></a>`;
}

function linkRail(links = []) {
  const valid = links.filter(l => l && l.url);
  if (!valid.length) return '';
  return `<div class="hi-rail">${valid.map(l => link(l.url, l.note ? `${l.label}` : l.label)).join('')}</div>`;
}

// the core unit: icon + label + meta + sentence
function row(title, body, opts = {}) {
  const { meta = '', key = title, href = '', hrefLabel = 'link', status = '', tone = 'warn' } = opts;
  const statusEl = status ? `<span class="hi-status hi-status-${esc(tone)}">${esc(status)}</span>` : '';
  return `
    <div class="hi-row">
      <span class="hi-row-icon">${glyph(key)}</span>
      <div class="hi-row-copy">
        <div class="hi-row-name">${esc(title)}${statusEl}${meta ? `<span class="hi-row-meta">${esc(meta)}</span>` : ''}</div>
        ${body ? `<p>${esc(body)}</p>` : ''}
        ${href ? link(href, hrefLabel) : ''}
      </div>
    </div>
  `;
}

function group(title, rowsHtml, cls = '') {
  return `
    <section class="hi-group ${cls}">
      ${title ? `<div class="hi-group-title">${esc(title)}</div>` : ''}
      <div class="hi-rows">${rowsHtml}</div>
    </section>
  `;
}

// OW ability-icon style: bold white-silhouette SVGs, literal to content.
// Each type has a distinct shape - no two categories share a glyph.
function glyph(key = '') {
  const k = String(key).toLowerCase();
  const I = d => `<svg viewBox="0 0 48 48" fill="currentColor" stroke="none" aria-hidden="true">${d}</svg>`;

  // IMU / sensor / wearable / caliper / PPG / measurement
  if (/sense|imu|sensor|ppg|wearable|motion|caliper|measurement/.test(k))
    return I('<path d="M17 3h14l-2 9H19L17 3Zm0 42h14l-2-9H19l-2 9Z"/><path fill-rule="evenodd" d="M13 12h22a5 5 0 0 1 5 5v14a5 5 0 0 1-5 5H13a5 5 0 0 1-5-5V17a5 5 0 0 1 5-5Zm11 5a7 7 0 1 0 0 14 7 7 0 0 0 0-14Z"/><circle cx="24" cy="24" r="3"/>');

  // FFT / signal / radar / waveform / tremor / frequency
  if (/detect|fft|radar|signal|frequency|waveform|tremor/.test(k))
    return I('<path d="M2 26h7l4-14 7 27 5-18 4 8h17v5H26l-2-4-6 20-7-28-3 9H2v-5Z"/>');

  // ML / GAN / neural / AI / behavioral auth
  if (/ml|gan|model|train|neural|ai|authentication|auth/.test(k))
    return I('<path d="m12 16 8 6-2 3-8-6 2-3Zm0 16 8-6-2-3-8 6 2 3Zm24-20-8 9-2.6-2.4 8-9L36 12Zm0 24-8-9-2.6 2.4 8 9L36 36Z"/><circle cx="9" cy="14" r="5"/><circle cx="9" cy="34" r="5"/><circle cx="39" cy="9" r="5"/><circle cx="39" cy="39" r="5"/><circle cx="24" cy="24" r="7"/>');

  // NLP / whisper / dialect / subtitle / speech / transcription
  if (/\bnlp\b|whisper|dialect|subtitle|natural.?language|transcri|speech.to/.test(k))
    return I('<path fill-rule="evenodd" d="M8 4h24a5 5 0 0 1 5 5v11a5 5 0 0 1-5 5H21l-9 8v-8H8a5 5 0 0 1-5-5V9a5 5 0 0 1 5-5Zm5 10a2.6 2.6 0 1 0 0 5.2A2.6 2.6 0 0 0 13 14Zm8 0a2.6 2.6 0 1 0 0 5.2A2.6 2.6 0 0 0 21 14Zm8 0a2.6 2.6 0 1 0 0 5.2A2.6 2.6 0 0 0 29 14Z"/><path d="M32 30h9a4 4 0 0 1 4 4v5a4 4 0 0 1-4 4h-2l-5 4v-4h-2a4 4 0 0 1-4-4v-5a4 4 0 0 1 4-4Z"/>');

  // BLE / bluetooth / wireless / OTA / stream / serial / connect / comms
  if (/stream|ble|bluetooth|ota|link|packet|wireless|comm|serial|connect|network/.test(k))
    return I('<path fill-rule="evenodd" d="M21.5 3.5 34 13l-8.4 7L34 27l-12.5 9.5V25l-7 5.6-3-3.8L20.7 20 11.5 13.2l3-3.8 7 5.6V3.5Zm4.5 9.4-2-1.6v4l2-2.4Zm0 14.2-2 2.4v4l2-1.6-.01-2.4.01-2.4Z"/>');

  // Database / SQLite / SQL / storage / session / records / governance
  if (/record|sqlite|data|database|session|storage|\bsql\b|governance/.test(k))
    return I('<ellipse cx="24" cy="10" rx="16" ry="6.5"/><path d="M8 15.5c2.8 3 9 4.8 16 4.8s13.2-1.8 16-4.8V22c0 3.6-7.2 6.5-16 6.5S8 25.6 8 22v-6.5Z"/><path d="M8 26.5c2.8 3 9 4.8 16 4.8s13.2-1.8 16-4.8V33c0 3.6-7.2 6.5-16 6.5S8 36.6 8 33v-6.5Z"/>');

  // Chart / report / dashboard / CSV / export / shiny / stats / analysis
  if (/report|chart|csv|export|dashboard|shiny|analysis|stats/.test(k))
    return I('<path d="M7 28h7v14H7V28Zm10-8h7v22h-7V20Zm10 5h7v17h-7V25Z"/><path d="M28 5h15v15l-5.4-5.4L30 22.2 25.8 18l7.6-7.6L28 5Z"/>');

  // Publication / paper / patent / archive / document
  if (/paper|publication|patent|archive/.test(k))
    return I('<path fill-rule="evenodd" d="M11 3h19l11 11v31H11V3Zm18 4H15v34h22V16H29V7Zm-12 15h16v4H17v-4Zm0 8h16v4H17v-4Z"/>');

  // Shield / guard / security / cyber / protect
  if (/shield|guard|security|cyber|trust|defensive|protect/.test(k))
    return I('<path fill-rule="evenodd" d="M24 2.5 41.5 10v12.5C41.5 33.7 34 40.8 24 45 14 40.8 6.5 33.7 6.5 22.5V10L24 2.5ZM15 23.4l3.2-3.2 4.6 4.6 9-9 3.2 3.2-12.2 12.2L15 23.4Z"/>');

  // Chip / firmware / microcontroller / C++ / register / MCU / recovery
  if (/firmware|c\+\+|register|embedded|mcu|microcontroller|recovery/.test(k))
    return I('<path d="M15 2h4v8h-4V2Zm7 0h4v8h-4V2Zm7 0h4v8h-4V2ZM15 38h4v8h-4v-8Zm7 0h4v8h-4v-8Zm7 0h4v8h-4v-8ZM2 15h8v4H2v-4Zm0 7h8v4H2v-4Zm0 7h8v4H2v-4Zm36-14h8v4h-8v-4Zm0 7h8v4h-8v-4Zm0 7h8v4h-8v-4Z"/><path fill-rule="evenodd" d="M12 12h24v24H12V12Zm6 6v12h12V18H18Z"/>');

  // FPGA / VHDL / HDMI / FSM / UART / digital logic / timing
  if (/fpga|vhdl|hdmi|logic|fsm|uart|digital|timing/.test(k))
    return I('<path d="M4 32V10h13v14h5V10h13v14h9v6H30V16h-5v22H12V32H4Zm4-4h4V14H8v14Z" fill-rule="evenodd"/>');

  // Award / prize / launch / trophy
  if (/award|prize|trophy|win/.test(k))
    return I('<path fill-rule="evenodd" d="M13 4h22v3h8v5c0 6-4 10-9.3 11A12 12 0 0 1 26 29v5h7v5l3 6H12l3-6v-5h7v-5a12 12 0 0 1-7.7-6C9 22 5 18 5 12V7h8V4Zm-4 8c0 3.4 1.8 5.8 4.3 6.7A19 19 0 0 1 13 12v-1H9v1Zm30 0v-1h-4v1c0 2.4-.5 4.7-1.3 6.7C36.2 17.8 39 15.4 39 12Z"/>');

  // Cost / budget / reduce / price
  if (/cost|reduce|cheap|price|budget/.test(k))
    return I('<path fill-rule="evenodd" d="M22 4h16a6 6 0 0 1 6 6v16L27.6 42.4a6 6 0 0 1-8.5 0L4.6 27.9a6 6 0 0 1 0-8.5L22 4Zm12 5a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z"/>');

  // Mobile / app / React Native / phone / screen
  if (/app|mobile|react|native|expo|phone/.test(k))
    return I('<path fill-rule="evenodd" d="M16 2h16a5 5 0 0 1 5 5v34a5 5 0 0 1-5 5H16a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm4 3.5a1.5 1.5 0 0 0 0 3h8a1.5 1.5 0 0 0 0-3h-8ZM15 11h18v26H15V11Z"/>');

  // Tool / pipeline / workflow / deploy / process / wrench
  if (/build|tool|program|workflow|deploy|pipeline|process/.test(k))
    return I('<path d="M43 13.6A11.5 11.5 0 0 1 28.2 27L15 40.2a5.6 5.6 0 0 1-8-8L20.3 19A11.5 11.5 0 0 1 33.7 4.4l-6.5 6.5 1.6 6 6 1.6L41.3 12c.8 0 1.5.7 1.7 1.6Z"/>');

  // Entropy / Astakeria / lore / echo / world / eye
  if (/entropy|astakeria|lore|mirror|echo|world/.test(k))
    return I('<path fill-rule="evenodd" d="M24 10c10.8 0 19 8.6 21.5 14C43 29.4 34.8 38 24 38S5 29.4 2.5 24C5 18.6 13.2 10 24 10Zm0 5.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17Zm0 4.7a3.8 3.8 0 1 1 0 7.6 3.8 3.8 0 0 1 0-7.6Z"/>');

  // Language / spoken / Arabic / Spanish / dialect / translation
  if (/\blang\b|spoken|arabic|spanish|english|dialect|translat/.test(k))
    return I('<path fill-rule="evenodd" d="M24 3a21 21 0 1 1 0 42 21 21 0 0 1 0-42Zm0 4c-2.5 0-5.7 5-6.6 13h13.2C29.7 12 26.5 7 24 7Zm-6.6 24C18.3 39 21.5 43 24 43s5.7-4 6.6-12H17.4ZM7.3 20A17 17 0 0 0 7.3 28h6c-.2-1.3-.3-2.6-.3-4s.1-2.7.3-4h-6Zm27.4 0c.2 1.3.3 2.6.3 4s-.1 2.7-.3 4h6a17 17 0 0 0 0-8h-6Z"/>');

  // Circuit / analog / electrical / semiconductor / EE
  if (/circuit|analog|electrical|materials|semiconductor|nano/.test(k))
    return I('<path d="M20 4h4v10.3l10 10V32h10v4H30v-9.7l-10-10V4h-4Z" transform="translate(2 0)"/><path d="M8 12h4v10l8 8v14h-4V31.7l-8-8V12Z"/><rect x="18" y="2" width="8" height="8"/><rect x="6" y="10" width="8" height="8"/><rect x="36" y="30" width="8" height="8"/><rect x="14" y="38" width="8" height="8"/>');

  // Location / country / geo / map / where
  if (/place|location|country|geo|map|where/.test(k))
    return I('<path fill-rule="evenodd" d="M24 3c8.6 0 15 6.4 15 14.6C39 28.6 24 45 24 45S9 28.6 9 17.6C9 9.4 15.4 3 24 3Zm0 9a5.6 5.6 0 1 0 0 11.2A5.6 5.6 0 0 0 24 12Z"/>');

  // People / team / leadership / council / volunteer
  if (/people|team|council|leadership|volunteer|story/.test(k))
    return I('<circle cx="33" cy="15" r="5.5"/><path d="M24.5 40c0-7.8 4-12 8.5-12s8.5 4.2 8.5 12h-17Z"/><circle cx="17" cy="13" r="7"/><path d="M4 40c0-9.4 6-15 13-15s13 5.6 13 15H4Z"/>');

  // Audio / sound / synth / music
  if (/audio|sound|synth|tone|music|sonic/.test(k))
    return I('<path d="M5 17h9l11-9v32l-11-9H5V17Z"/><path d="M30.8 15.5c2.7 1.9 4.4 5 4.4 8.5s-1.7 6.6-4.4 8.5l-2.3-3.4c1.7-1.1 2.7-3 2.7-5.1s-1-4-2.7-5.1l2.3-3.4Z"/><path d="M36.6 9.4C41.2 12.5 44 17.9 44 24s-2.8 11.5-7.4 14.6l-2.3-3.5c3.5-2.3 5.7-6.4 5.7-11.1s-2.2-8.8-5.7-11.1l2.3-3.5Z"/>');

  // Web / browser / HTML / CSS / website
  if (/\bweb\b|website|html|css|frontend|browser|pages|responsive/.test(k))
    return I('<path fill-rule="evenodd" d="M6 6h36a3 3 0 0 1 3 3v30a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V9a3 3 0 0 1 3-3Zm1 10v22h34V16H7Zm4 4h12v14H11V20Zm16 0h10v4H27v-4Zm0 7h10v4H27v-4Z"/>');

  // Vision / camera / forensic / OpenCV / glasses / optical
  if (/vision|camera|forensic|glasses|opencv|sift|flann|crime|optical/.test(k))
    return I('<path fill-rule="evenodd" d="M17 8h14l3 5h7a4 4 0 0 1 4 4v19a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V17a4 4 0 0 1 4-4h7l3-5Zm7 9a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 4.8a4.2 4.2 0 1 1 0 8.4 4.2 4.2 0 0 1 0-8.4Z"/>');

  // WiFi / handover / wireless network / Raspberry Pi / 802.11 / RSSI
  if (/wifi|handover|rssi|802|raspberry|pi|scan|beacon|coverage/.test(k))
    return I('<circle cx="24" cy="38" r="4.5"/><path d="M16.2 29.8A11 11 0 0 1 24 26.6c3 0 5.8 1.2 7.8 3.2l-3.7 3.7A5.8 5.8 0 0 0 24 31.8c-1.6 0-3 .6-4.1 1.7l-3.7-3.7Z"/><path d="M9.1 22.7A21 21 0 0 1 24 16.5c5.8 0 11.1 2.4 14.9 6.2l-3.7 3.7A15.8 15.8 0 0 0 24 21.7c-4.4 0-8.3 1.8-11.2 4.7l-3.7-3.7Z"/><path d="M2 15.6A31 31 0 0 1 24 6.5c8.6 0 16.4 3.5 22 9.1l-3.7 3.7A25.8 25.8 0 0 0 24 11.7c-7.2 0-13.6 2.9-18.3 7.6L2 15.6Z"/>');

  // Research / academic / thesis / grad cap
  if (/research|academic|thesis|study|publication/.test(k))
    return I('<path d="M24 6 47 17 24 28 1 17 24 6Z"/><path d="M11 23.8V32c0 3.9 5.8 7 13 7s13-3.1 13-7v-8.2l-13 6.2-13-6.2Z"/><path d="M43 20h3v11h-3V20Z"/>');

  // Rocket / launch / speed / startup
  if (/rocket|launch|startup|speed/.test(k))
    return I('<path fill-rule="evenodd" d="M24 2c6.5 5.2 10 12.6 10 20.3 0 4.2-1.1 8.3-3.1 11.7H17.1A22.4 22.4 0 0 1 14 22.3C14 14.6 17.5 7.2 24 2Zm0 12a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9Z"/><path d="M15 31.5 8 41l9.5-2.6L15 31.5Zm18 0 7 9.5-9.5-2.6L33 31.5ZM21 37h6l-3 9-3-9Z"/>');

  // Email / contact
  if (/email|mail|message/.test(k))
    return I('<path fill-rule="evenodd" d="M6 9h36a3 3 0 0 1 3 3v24a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V12a3 3 0 0 1 3-3Zm1.8 4L24 25.4 40.2 13H7.8ZM41 17.3 24 30.6 7 17.3V35h34V17.3Z"/>');

  // LinkedIn / phone / social
  if (/phone|linkedin|connect/.test(k))
    return I('<path d="M10.2 4.6c1.9-1.9 5-1.7 6.7.4l4.3 5.6c1.5 2 1.2 4.8-.7 6.4l-2.4 2c1.9 4.3 5.6 8 9.9 9.9l2-2.4c1.6-1.9 4.4-2.2 6.4-.7l5.6 4.3c2.1 1.7 2.3 4.8.4 6.7l-2.9 2.9c-2 2-5 2.7-7.7 1.7C20.4 37.1 10.9 27.6 6.6 16.2c-1-2.7-.3-5.7 1.7-7.7l1.9-1.9Z"/>');

  // GitHub / code / repo
  if (/github|code|repo|git/.test(k))
    return I('<path d="M15.5 9 3 24l12.5 15 4.6-3.8L10.5 24l9.6-11.2L15.5 9Zm17 0-4.6 3.8L37.5 24l-9.6 11.2 4.6 3.8L45 24 32.5 9Z"/><path d="M26.3 5h5.2L21.7 43h-5.2L26.3 5Z"/>');

  // Open source / link / external
  if (/open|link|external/.test(k))
    return I('<path d="M6 11h17v5H11v21h21V26h5v16H6V11Z"/><path d="M27 3h18v18l-6.4-6.4L28.2 25 23 19.8l10.4-10.4L27 3Z"/>');

  // fallback: OW-style emblem badge
  return I('<path fill-rule="evenodd" d="M24 2.5 42 12v24L24 45.5 6 36V12L24 2.5Zm0 10.7L13.5 21l4.3 5.5L24 21.6l6.2 4.9L34.5 21 24 13.2Zm-8 17.3h16v5H16v-5Z"/>');
}

// ---- per-section renderers ---------------------------------

function renderHome(s) {
  const facts = s.quickfacts.map(f => row(f.k, f.v, { key: f.k })).join('');
  const steps = [
    ['Hover', 'Preview each character and watch the stage, color, and summary shift.', 'sense'],
    ['Select', 'Enter the section for labs, capstone, projects, research, skills, or personal context.', 'app'],
    ['Play', 'Use the action button for the relevant resume, repo, LinkedIn, or project link.', 'link']
  ].map(([t, b, k]) => row(t, b, { key: k })).join('');

  return `
    ${head(s)}
    ${s.intro ? `<p class="hi-lead">${esc(s.intro)}</p>` : ''}
    <div class="hi-cols3">
      <section class="hi-group">
        <div class="hi-group-title">Profile</div>
        <div class="hi-prose">${s.bio.map(p => `<p>${esc(p)}</p>`).join('')}</div>
      </section>
      ${group('Quick facts', facts)}
      ${group('How to navigate', steps)}
    </div>
  `;
}

function renderLabs(s) {
  const tabs = s.labs.map((lab, i) => `
    <button class="hi-tab ${i === 0 ? 'active' : ''}" data-lab="${esc(lab.key)}" type="button">
      <span class="hi-tab-idx">0${i + 1}</span>
      <span class="hi-tab-name">${esc(lab.name)}</span>
      <span class="hi-tab-focus">${esc(lab.focus)}</span>
    </button>
  `).join('');

  const panels = s.labs.map((lab, i) => {
    const story = lab.story.map(p => `<p>${esc(p)}</p>`).join('');
    const work = lab.subprojects.map(sp => row(sp.n, sp.d, {
      key: `${lab.key} ${sp.n}`,
      href: sp.url || '',
      hrefLabel: 'proof'
    })).join('');
    return `
      <article class="hi-panel ${i === 0 ? 'active' : ''}" data-lab-panel="${esc(lab.key)}">
        <div class="hi-panel-head">
          <div>
            <div class="hi-panel-name">${esc(lab.name)}</div>
            <div class="hi-panel-focus">${esc(lab.focus)} · ${esc(lab.pi)}</div>
          </div>
          <div class="hi-panel-status">${esc(lab.status)}</div>
        </div>
        <div class="hi-panel-cols">
          <div class="hi-panel-lead">
            <div class="hi-prose">${story}</div>
            ${linkRail(lab.links)}
          </div>
          ${group('Active work', work)}
        </div>
      </article>
    `;
  }).join('');

  return `
    ${head(s)}
    <div class="hi-tabbed">
      <div class="hi-tabs">${tabs}</div>
      <div class="hi-tab-stage">${panels}</div>
    </div>
  `;
}

// Career record: OW deployment-log read. Stat strip + de-boxed job entries.
function renderExperience(s) {
  const recs = s.jobs.map(job => {
    const prose = job.bullets.map(b => `<p>${esc(b)}</p>`).join('');
    return `
      <article class="xp-rec">
        <div class="xp-rec-head">
          <span class="xp-rec-icon">${glyph((job.tags || []).join(' ') || job.org)}</span>
          <div class="xp-rec-id">
            <div class="xp-rec-org">${esc(job.org)}<span class="xp-rec-role">${esc(job.title)}</span></div>
            <div class="xp-rec-when">${esc(job.place)} · ${esc(job.date)}</div>
          </div>
        </div>
        <div class="xp-rec-prose">${prose}</div>
        <div class="xp-rec-stack">${(job.tags || []).map(esc).join(' · ')}</div>
      </article>
    `;
  }).join('');

  return `
    ${head(s)}
    <div class="xp-record">${recs}</div>
  `;
}

// D.Va Hero-Info style: bio/context left, pipeline right, app section full-width below.
function renderCapstone(s) {
  const pipeline = (s.architecture || []).map((st, i) => `
    <div class="cap-stage">
      <div class="cap-stage-num">0${i + 1}</div>
      <span class="cap-stage-icon">${glyph(st.stage)}</span>
      <div class="cap-stage-copy">
        <div class="cap-stage-name">${esc(st.stage)}<span class="cap-stage-chip">${esc(st.chip)}</span></div>
        <p>${esc(st.text)}</p>
      </div>
    </div>
  `).join('');

  const appModules = (s.app && s.app.modules) ? s.app.modules.map(m => `
    <div class="cap-mod">
      <span class="cap-mod-icon">${glyph(typeof m === 'object' ? m.n : m)}</span>
      <div>
        <div class="cap-mod-name">${esc(typeof m === 'object' ? m.n : m)}</div>
        ${typeof m === 'object' && m.d ? `<div class="cap-mod-desc">${esc(m.d)}</div>` : ''}
      </div>
    </div>
  `).join('') : '';

  const actions = (s.links || []).map((l, i) => `
    <a class="kr-action${i === 0 ? ' primary' : ''}" href="${esc(l.url)}" target="_blank" rel="noopener noreferrer">${esc(l.label.toUpperCase())}</a>
  `).join('');

  const clin = s.clinical || {};

  return `
    ${head(s)}
    <div class="cap-dva">
      <div class="cap-dva-left">
        <div class="hi-group-title">Clinical context</div>
        <div class="hi-prose">
          ${clin.problem ? `<p>${esc(clin.problem)}</p>` : ''}
          ${clin.approach ? `<p>${esc(clin.approach)}</p>` : ''}
        </div>
        ${clin.validation ? `<div class="cap-callout"><span class="cap-callout-label">Validation target</span>${esc(clin.validation)}</div>` : ''}
        ${clin.medication ? `<div class="cap-callout" style="margin-top:8px"><span class="cap-callout-label">Medication concept</span>${esc(clin.medication)}</div>` : ''}
      </div>
      <div class="cap-dva-right">
        <div class="hi-group-title">Signal pipeline</div>
        <div class="cap-pipeline">${pipeline}</div>
      </div>
    </div>

    <div class="cap-app-section">
      <div class="cap-app-header">
        <div>
          <div class="hi-group-title">${esc(s.app?.name || 'TremorMonitor')}</div>
          <div class="cap-app-sub">${esc(s.app?.platform || 'React Native')} · ${esc(s.app?.stack || 'BLE + SQLite')}</div>
        </div>
        <div class="kr-actions">${actions}</div>
      </div>
      ${s.app?.description ? `<p class="cap-app-desc">${esc(s.app.description)}</p>` : ''}
      <div class="cap-mods">${appModules}</div>
    </div>
  `;
}

// Hero gallery: a clean card grid of builds.
function renderGallery(s) {
  const cards = s.items.map(p => `
    <article class="pg-card">
      <div class="pg-card-top">
        <span class="pg-tag">${esc(p.tag)}</span>
        <span class="pg-year">${esc(p.year)}</span>
      </div>
      <div class="pg-card-main">
        <span class="pg-icon">${glyph(`${p.tag} ${(p.tech || []).join(' ')}`)}</span>
        <h3 class="pg-title">${esc(p.title)}</h3>
      </div>
      <p class="pg-body">${esc(p.body)}</p>
      ${p.proof ? `<p class="pg-proof">${esc(p.proof)}</p>` : ''}
      ${(p.tech && p.tech.length) ? `<div class="pg-tech">${p.tech.map(esc).join('   ·   ')}</div>` : ''}
      ${p.url ? `<a class="hi-link" href="${esc(p.url)}" target="_blank" rel="noopener noreferrer">Open project<span class="hi-link-arrow" aria-hidden="true">↗</span></a>` : ''}
    </article>
  `).join('');

  return `
    ${head(s)}
    <div class="pg-grid">${cards}</div>
  `;
}

function renderArchive(s) {
  const papers = s.papers.map(p => row(
    p.title,
    p.blurb,
    { key: p.title, meta: `${p.venue}${p.year ? ` · ${p.year}` : ''}`, href: p.url || '', hrefLabel: 'record', status: p.status || '', tone: p.statusTone || 'warn' }
  )).join('');
  const certRows = s.certifications.map(c => `
    <div class="arc-cert">
      <div class="arc-cert-name">${esc(c.title)}<span class="arc-cert-year">${esc(c.year || '')}</span></div>
      <div class="arc-cert-detail">${esc(c.detail)}</div>
    </div>
  `).join('');
  return `
    ${head(s)}
    <div class="arc-layout">
      ${group('Papers & patents', papers, 'arc-papers')}
      <section class="hi-group arc-certs">
        <div class="hi-group-title">Certifications</div>
        <div class="arc-cert-grid">${certRows}</div>
      </section>
    </div>
  `;
}

function renderSkills(s) {
  const renderBarCat = cat => {
    const max = Math.max(...cat.items.map(i => i.yrs), 8);
    const rows = cat.items.map(it => {
      const pct = Math.min(100, (it.yrs / max) * 100);
      return `
        <div class="hi-skill">
          <div class="hi-skill-top">
            <span class="hi-skill-n">${esc(it.n)}</span>
            <span class="hi-skill-y">${it.yrs}yr</span>
          </div>
          <div class="hi-skill-bar"><div class="hi-skill-fill" style="width:${pct}%"></div></div>
          <div class="hi-skill-note">${esc(it.note)}</div>
        </div>`;
    }).join('');
    return `<section class="hi-group hi-skillcat">
      <div class="hi-group-title">${esc(cat.name)}</div>
      <div class="hi-skill-list">${rows}</div>
    </section>`;
  };

  const leftCats  = s.categories.slice(0, 2);
  const rightCats = s.categories.slice(2);

  return `
    ${head(s)}
    <div class="skl-layout">
      <div class="skl-col">${leftCats.map(renderBarCat).join('')}</div>
      <div class="skl-col">${rightCats.map(renderBarCat).join('')}</div>
    </div>
  `;
}

function renderTimeline(s) {
  const TAG_ICON = {
    AWARD: 'award', CAPSTONE: 'app', GUARD: 'radar', CHROME: 'wearable',
    INTERN: 'record', SAMSUNG: 'cert', CORSAIR: 'firmware', GSK: 'lab',
    FPGA: 'fpga', NLP: 'nlp', NETWORK: 'wifi', DEBATE: 'people',
    LEADERSHIP: 'people', SLU: 'cert', MIT: 'cert', CMU: 'cert',
    QBC: 'caliper', WEB: 'web', 'MENTAL MATH': 'award', ORIGIN: 'location'
  };

  const cards = s.events.map(e => `
    <div class="tl-card">
      <div class="tl-card-top">
        <span class="tl-card-icon">${glyph(TAG_ICON[e.tag] || e.tag)}</span>
        <div class="tl-card-meta">
          <span class="tl-card-tag">${esc(e.tag)}</span>
          <span class="tl-card-date">${esc(e.date)}</span>
        </div>
      </div>
      <p class="tl-card-body">${esc(e.body)}</p>
    </div>
  `).join('');

  return `
    ${head(s)}
    <div class="tl-grid">${cards}</div>
  `;
}

function renderWall(s) {
  const GROUPS = [
    { label: 'Academic', keys: ['MIT', 'CARNEGIE MELLON', 'SAINT LOUIS U.'] },
    { label: 'Industry', keys: ['SAMSUNG', 'CORSAIR', 'GSK', 'DOHA BANK'] },
    { label: 'Publications & Orgs', keys: ['IEEE', 'RED CROSS · RED CRESCENT', 'THE STEM SPECTRUM', 'PARK HOUSE ENGLISH SCHOOL'] }
  ];

  const findTile = key => {
    const up = key.toUpperCase();
    return s.tiles.find(t => t.n.toUpperCase().includes(up) || up.includes(t.n.toUpperCase().split(' ')[0]));
  };

  const renderTile = t => `
    <div class="wall-tile" style="--brand:${esc(t.brand)};--brand-text:${esc(t.text)};">
      <div class="wall-tile-abbr">${esc(brandLogo(t.n))}</div>
      <div class="wall-tile-name">${esc(t.n)}</div>
      <div class="wall-tile-role">${esc(t.r)}</div>
    </div>`;

  // Render grouped layout
  const ungrouped = s.tiles.filter(t => !GROUPS.some(g => g.keys.some(k => t.n.toUpperCase().includes(k.toUpperCase().split(' ')[0]))));

  const groups = GROUPS.map(g => {
    const tiles = g.keys.map(k => findTile(k)).filter(Boolean);
    if (!tiles.length) return '';
    return `
      <div class="wall-group">
        <div class="wall-group-label">${esc(g.label)}</div>
        <div class="wall-group-tiles">${tiles.map(renderTile).join('')}</div>
      </div>`;
  }).join('');

  const extra = ungrouped.length ? `
    <div class="wall-group">
      <div class="wall-group-label">Also</div>
      <div class="wall-group-tiles">${ungrouped.map(renderTile).join('')}</div>
    </div>` : '';

  return `
    ${head(s)}
    <div class="wall-layout">${groups}${extra}</div>
  `;
}

function renderPersonal(s) {
  const geo = s.geography.map(g => `
    <div class="hi-geo" style="--g1:${esc(g.c1)};--g2:${esc(g.c2)};">
      <span class="hi-geo-flag">${esc(g.flag)}</span>
      <div class="hi-geo-country">${esc(g.country)}</div>
      <div class="hi-geo-years">${esc(g.years)}</div>
      <div class="hi-geo-note">${esc(g.note)}</div>
    </div>
  `).join('');
  const ranks = s.gameranks.map(r => `
    <div class="hi-rank" style="--rc:${esc(r.c)};"><div class="hi-rank-g">${esc(r.g)}</div><div class="hi-rank-r">${esc(r.r)}</div></div>
  `).join('');
  const teams = s.teams.map(t => `
    <div class="hi-team" style="--tc:${esc(t.c)};"><span class="hi-team-s">${esc(t.sport)}</span><span class="hi-team-t">${esc(t.team)}</span></div>
  `).join('');
  const stories = s.stories.map(st => row(st.t, st.d, { key: st.t })).join('');
  const life = s.lifestyle.map(l => `<li>${esc(l)}</li>`).join('');
  return `
    ${head(s)}
    <section class="hi-group"><div class="hi-group-title">Where I've lived</div><div class="hi-geo-strip">${geo}</div></section>
    <div class="hi-cols" style="margin-top:20px">
      <section class="hi-group"><div class="hi-group-title">Game ranks</div><div class="hi-rank-grid">${ranks}</div></section>
      <section class="hi-group"><div class="hi-group-title">Teams I follow</div><div class="hi-team-row">${teams}</div></section>
    </div>
    ${group('Stories', stories)}
    <section class="hi-group"><div class="hi-group-title">${esc(s.endeavorsTitle || 'Currently')}</div><ul class="hi-life">${life}</ul></section>
  `;
}

function renderAstakeria(s) {
  const pillars = s.pillars.map(p => row(p.n, p.d, { key: `entropy ${p.n}`, meta: 'core system' })).join('');

  const heroes = s.heroes.map(h => `
    <div class="hi-ast-hero">
      <div class="hi-ast-name">${esc(h.name)}</div>
      <div class="hi-ast-role">${esc(h.role)}</div>
      <div class="hi-ast-tag">${esc(h.tagline)}</div>
      ${h.mechanic ? `<div class="hi-ast-mech">${esc(h.mechanic)}</div>` : ''}
    </div>
  `).join('');

  const entropyTiers = (s.entropy && s.entropy.tiers) ? s.entropy.tiers.map(t => `
    <div class="ast-tier">
      <div class="ast-tier-range">${esc(t.range)}</div>
      <div class="ast-tier-label">${esc(t.label)}</div>
      <div class="ast-tier-effect">${esc(t.effect)}</div>
    </div>
  `).join('') : '';

  const examples = s.entropyExample.map(e => `
    <div class="hi-ast-ex">
      <div class="hi-ast-trigger">${esc(e.trigger)}</div>
      <span class="hi-ast-arrow" aria-hidden="true">→</span>
      <div class="hi-ast-consequence">${esc(e.consequence)}</div>
    </div>
  `).join('');

  const docs = (s.documents || []).map(d => `
    <div class="ast-doc">
      <div class="ast-doc-title">${esc(d.title)}<span class="ast-doc-pages">${esc(d.pages)}</span></div>
      <div class="ast-doc-desc">${esc(d.desc)}</div>
    </div>
  `).join('');

  const techPhases = (s.tech && s.tech.buildPhases) ? s.tech.buildPhases.map((p, i) => `
    <div class="ast-phase"><span class="ast-phase-n">0${i+1}</span><span>${esc(p)}</span></div>
  `).join('') : '';

  return `
    ${head(s)}
    <div class="hi-ast-hook">${esc(s.hook)}</div>
    <div class="ast-top">
      <div>
        <div class="hi-prose hi-ast-lore">${s.lore.map(p => `<p>${esc(p)}</p>`).join('')}</div>
        ${s.entropy ? `<div class="hi-group-title" style="margin-top:18px">Entropy score (0-100)</div>
        <p class="ast-entropy-desc">${esc(s.entropy.desc)}</p>
        <div class="ast-tiers">${entropyTiers}</div>` : ''}
      </div>
      <div>
        ${pillars ? `<section class="hi-group"><div class="hi-group-title">Design pillars</div><div class="hi-rows">${pillars}</div></section>` : ''}
        ${s.scope ? `<section class="hi-group" style="margin-top:14px">
          <div class="hi-group-title">Scope (Launch)</div>
          <div class="ast-scope-grid">
            ${Object.entries(s.scope).map(([k,v]) => `<div class="ast-scope-item"><span class="ast-scope-k">${esc(k.replace(/([A-Z])/g, ' $1').toLowerCase())}</span><span class="ast-scope-v">${esc(v)}</span></div>`).join('')}
          </div>
        </section>` : ''}
      </div>
    </div>

    <section class="hi-group" style="margin-top:18px"><div class="hi-group-title">Five heroes</div><div class="hi-ast-heroes">${heroes}</div></section>

    <div class="ast-lower">
      <section class="hi-group">
        <div class="hi-group-title">Entropy in practice</div>
        <div class="hi-ast-entropy">${examples}</div>
      </section>
      <div>
        ${s.tech ? `<section class="hi-group">
          <div class="hi-group-title">Technical implementation</div>
          <div class="ast-tech-block">
            <div class="ast-tech-row"><span>Engine</span><strong>${esc(s.tech.engine)}</strong></div>
            <div class="ast-tech-row"><span>Architecture</span><strong>${esc(s.tech.architecture)}</strong></div>
            <div class="ast-tech-row"><span>Combat flow</span><strong>${esc(s.tech.combatFlow)}</strong></div>
          </div>
          <div class="hi-group-title" style="margin-top:12px">Build phases</div>
          <div class="ast-phases">${techPhases}</div>
        </section>` : ''}
        ${docs ? `<section class="hi-group" style="margin-top:14px">
          <div class="hi-group-title">Design documents</div>
          <div class="ast-docs">${docs}</div>
        </section>` : ''}
      </div>
    </div>

    <div class="hi-ast-quote">${esc(s.quote)}</div>
  `;
}

function renderSoon(s) {
  return `
    <div class="hi-soon">
      <div class="hi-soon-glyph" aria-hidden="true">${glyph('unknown')}</div>
      <div class="hi-soon-heading">${esc(s.heading)}</div>
      <div class="hi-prose hi-soon-body">${s.body.map(p => `<p>${esc(p)}</p>`).join('')}</div>
    </div>
  `;
}

function renderContact(s) {
  const commsLines = s.lines.map(l => `
    <div class="comms-line">
      <span class="comms-icon">${glyph(l.label)}</span>
      <span class="comms-label">${esc(l.label)}</span>
      <span class="comms-value">
        ${l.href
          ? `<a href="${esc(l.href)}"${l.href.startsWith('http') ? ' target="_blank" rel="noopener noreferrer"' : ''}>${esc(l.value)}</a>`
          : esc(l.value)}
      </span>
      ${l.href ? `<span class="comms-status comms-live" aria-label="Live"></span>` : `<span class="comms-status comms-static" aria-label="Info"></span>`}
    </div>
  `).join('');

  const ctaLinks = (s.links || []).map((l, i) => `
    <a class="comms-cta${i === 0 ? ' primary' : ''}" href="${esc(l.url)}" target="_blank" rel="noopener noreferrer">
      <span class="comms-cta-icon">${glyph(l.label)}</span>
      <span>${esc(l.label)}</span>
    </a>
  `).join('');

  return `
    ${head(s)}
    <div class="comms-panel">
      <div class="comms-header">
        <div class="comms-status-badge">
          <span class="comms-dot" aria-hidden="true"></span>
          <span>ONLINE · OPEN TO ROLES</span>
        </div>
        <div class="comms-avail">${esc(s.sub)}</div>
      </div>
      <div class="comms-body">
        <div class="comms-lines">${commsLines}</div>
        <div class="comms-actions">
          <div class="hi-group-title">Quick links</div>
          <div class="comms-ctas">${ctaLinks}</div>
        </div>
      </div>
    </div>
  `;
}

function brandLogo(name = '') {
  const clean = String(name).replace(/·/g, ' ');
  const special = {
    'CARNEGIE MELLON': 'CMU', 'SAINT LOUIS U.': 'SLU',
    'RED CROSS RED CRESCENT': 'RC', 'THE STEM SPECTRUM': 'TSS',
    'PARK HOUSE ENGLISH SCHOOL': 'PHES', 'DOHA BANK': 'DB'
  };
  const key = clean.replace(/[^A-Za-z0-9 ]/g, '').replace(/\s+/g, ' ').trim().toUpperCase();
  if (special[key]) return special[key];
  const words = key.split(' ').filter(Boolean);
  if (words.length === 1) return words[0].slice(0, 7);
  return words.map(w => w[0]).join('').slice(0, 5);
}

// ---- interactions ------------------------------------------

export function postRender(charId, el) {
  if (charId === 'labs') setupTabs(el, 'lab', 'lab-panel');
}

function setupTabs(container, tabAttr, panelAttr) {
  const tabs = container.querySelectorAll(`[data-${tabAttr}]`);
  const panels = container.querySelectorAll(`[data-${panelAttr}]`);
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const key = tab.getAttribute(`data-${tabAttr}`);
      tabs.forEach(t => t.classList.toggle('active', t === tab));
      panels.forEach(p => p.classList.toggle('active', p.getAttribute(`data-${panelAttr}`) === key));
    });
  });
}
