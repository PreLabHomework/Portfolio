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

// signal line: plain sentence, no badge
function signal(items = []) {
  if (!items || !items.length) return '';
  return `<p class="hi-signal">${items.map(esc).join(' · ')}</p>`;
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
// Each type has a distinct shape — no two categories share a glyph.
function glyph(key = '') {
  const k = String(key).toLowerCase();
  const I = (d, fill = false) => {
    const attrs = fill
      ? `fill="currentColor" stroke="none"`
      : `fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"`;
    return `<svg viewBox="0 0 48 48" ${attrs} aria-hidden="true">${d}</svg>`;
  };
  const F = d => I(d, true);

  // IMU / sensor / wearable / caliper / PPG / measurement
  if (/sense|imu|sensor|ppg|wearable|motion|caliper|measurement/.test(k))
    return I('<rect x="9" y="18" width="30" height="12" rx="3"/><path d="M9 24h30M17 18v-5a7 7 0 0 1 14 0v5M17 30v5a7 7 0 0 0 14 0v-5"/><circle cx="24" cy="24" r="2.5" fill="currentColor"/>');

  // FFT / signal / radar / waveform / tremor / frequency
  if (/detect|fft|radar|signal|frequency|waveform|tremor/.test(k))
    return I('<path d="M4 24h5l4-14 5 28 4-18 4 10 4-6 4 6h10"/><path d="M4 38h40" opacity=".4"/>');

  // ML / GAN / neural / AI / behavioral auth
  if (/ml|gan|model|train|neural|ai|authentication|auth/.test(k))
    return I('<circle cx="10" cy="16" r="4"/><circle cx="10" cy="32" r="4"/><circle cx="38" cy="10" r="4"/><circle cx="38" cy="38" r="4"/><circle cx="24" cy="24" r="5"/><path d="M14 17.5 20 22M14 30.5 20 26M34 13 28 21M34 35 28 27"/>');

  // NLP / whisper / dialect / subtitle / speech / transcription
  if (/\bnlp\b|whisper|dialect|subtitle|natural.?language|transcri|speech.to/.test(k))
    return I('<path d="M7 9h24a3 3 0 0 1 3 3v13a3 3 0 0 1-3 3H19l-7 7v-7H7a3 3 0 0 1-3-3V12a3 3 0 0 1 3-3Z"/><path d="M13 17h18M13 22h13"/><path d="M27 30h10a3 3 0 0 1 3 3v7a3 3 0 0 1-3 3h-3l-4 4v-4h-3a3 3 0 0 1-3-3v-7a3 3 0 0 1 3-3Z"/>');

  // BLE / bluetooth / wireless / OTA / stream / serial / connect / comms
  if (/stream|ble|bluetooth|ota|link|packet|wireless|comm|serial|connect|network/.test(k))
    return I('<path d="M24 8v32M24 8l10 10-10 10M24 8l-10 10 10 10M14 34l10 6 10-6"/><circle cx="24" cy="8" r="3"/><circle cx="24" cy="40" r="3"/>');

  // Database / SQLite / SQL / storage / session / records / governance
  if (/record|sqlite|data|database|session|storage|\bsql\b|governance/.test(k))
    return I('<ellipse cx="24" cy="12" rx="14" ry="5.5"/><path d="M10 12v10c0 3 6.3 5.5 14 5.5S38 25 38 22V12"/><path d="M10 22v10c0 3 6.3 5.5 14 5.5S38 35 38 32V22"/><path d="M18 12v10M18 22v10" opacity=".4"/>');

  // Chart / report / dashboard / CSV / export / shiny / stats / analysis
  if (/report|chart|csv|export|dashboard|shiny|analysis|stats/.test(k))
    return I('<path d="M8 38V8M8 38h32"/><path d="M8 38l10-12 7 7 9-15 6 4"/><rect x="14" y="31" width="5" height="7" rx="1" fill="currentColor" stroke="none"/><rect x="22" y="26" width="5" height="12" rx="1" fill="currentColor" stroke="none"/><rect x="30" y="20" width="5" height="18" rx="1" fill="currentColor" stroke="none"/>');

  // Publication / paper / patent / archive / document
  if (/paper|publication|patent|archive/.test(k))
    return I('<path d="M13 5h18l10 10v28H13Z"/><path d="M31 5v11h11M19 22h14M19 28h14M19 34h9"/><path d="M31 11l10 9" opacity=".3"/>');

  // Shield / guard / security / cyber / protect
  if (/shield|guard|security|cyber|trust|defensive|protect/.test(k))
    return I('<path d="M24 4 41 11.5v13C41 35 33.8 41.5 24 45c-9.8-3.5-17-10-17-20.5v-13Z"/><path d="m16 25 6 6 11-13"/>');

  // Chip / firmware / microcontroller / C++ / register / MCU / recovery
  if (/firmware|c\+\+|register|embedded|mcu|microcontroller|recovery/.test(k))
    return I('<rect x="16" y="16" width="16" height="16" rx="2"/><path d="M20 16V9m4 7V9m4 7V9M20 39v-7m4 7v-7m4 7v-7M16 20H9m0 4h7m0 4H9M39 20h-7m7 4h-7m7 4h-7"/><circle cx="24" cy="24" r="3.5" fill="currentColor" stroke="none"/>');

  // FPGA / VHDL / HDMI / FSM / UART / digital logic / timing
  if (/fpga|vhdl|hdmi|logic|fsm|uart|digital|timing/.test(k))
    return I('<rect x="10" y="10" width="28" height="28" rx="2"/><rect x="18" y="18" width="5" height="5" fill="currentColor" stroke="none"/><rect x="25" y="18" width="5" height="5" fill="currentColor" stroke="none"/><rect x="18" y="25" width="5" height="5" fill="currentColor" stroke="none"/><rect x="25" y="25" width="5" height="5" fill="currentColor" stroke="none"/><path d="M10 19H5m5 5H5m5 5H5M43 19h-5m5 5h-5m5 5h-5M19 10V5m5 5V5m5 5V5M19 43v-5m5 5v-5m5 5v-5"/>');

  // Award / prize / launch / trophy
  if (/award|prize|trophy|win/.test(k))
    return I('<path d="M14 6h20v16c0 7-4.5 12-10 14-5.5-2-10-7-10-14Z"/><path d="M14 12H7a5 5 0 0 0 5 5M34 12h7a5 5 0 0 1-5 5"/><path d="M24 36v7M17 43h14"/>');

  // Cost / budget / reduce / price
  if (/cost|reduce|cheap|price|budget/.test(k))
    return I('<path d="M24 6c-10 0-17 7-17 18s7 18 17 18 17-7 17-18S34 6 24 6Z" opacity=".3"/><path d="M24 6c-10 0-17 7-17 18s7 18 17 18 17-7 17-18S34 6 24 6Z"/><path d="M24 13v22M29 17h-8a4 4 0 0 0 0 8h6a4 4 0 0 1 0 8h-9"/>');

  // Mobile / app / React Native / phone / screen
  if (/app|mobile|react|native|expo|phone/.test(k))
    return I('<rect x="14" y="5" width="20" height="38" rx="4"/><path d="M21 11h6"/><circle cx="24" cy="36.5" r="2" fill="currentColor" stroke="none"/><rect x="17" y="14" width="14" height="18" rx="2" opacity=".4"/>');

  // Tool / pipeline / workflow / deploy / process / wrench
  if (/build|tool|program|workflow|deploy|pipeline|process/.test(k))
    return I('<path d="M33 8a7 7 0 0 0-9.2 9.2L8 33l7 7 15.8-15.8A7 7 0 0 0 40 15l-5 5-4-4Z"/><circle cx="10" cy="39" r="2.5" fill="currentColor" stroke="none"/>');

  // Entropy / Astakeria / lore / echo / world / eye
  if (/entropy|astakeria|lore|mirror|echo|world/.test(k))
    return I('<ellipse cx="24" cy="24" rx="18" ry="10"/><ellipse cx="24" cy="24" rx="18" ry="10" transform="rotate(60,24,24)" opacity=".5"/><ellipse cx="24" cy="24" rx="18" ry="10" transform="rotate(120,24,24)" opacity=".5"/><circle cx="24" cy="24" r="5" fill="currentColor" stroke="none"/>');

  // Language / spoken / Arabic / Spanish / dialect / translation
  if (/\blang\b|spoken|arabic|spanish|english|dialect|translat/.test(k))
    return I('<path d="M8 10h20v15H16l-5 5v-5H8Z"/><path d="M24 22v3c0 2 1.5 3 3 3h8l5 5v-5h1a3 3 0 0 0 3-3V20a3 3 0 0 0-3-3H27"/><path d="M14 17h8M14 21.5h5"/>');

  // Circuit / analog / electrical / semiconductor / EE
  if (/circuit|analog|electrical|materials|semiconductor|nano/.test(k))
    return I('<circle cx="24" cy="24" r="5"/><path d="M24 8v11M24 29v11M8 24h11M29 24h11"/><path d="M12.7 12.7l7.8 7.8M27.5 27.5l7.8 7.8M12.7 35.3l7.8-7.8M27.5 20.5l7.8-7.8"/><circle cx="24" cy="8" r="2.5" fill="currentColor" stroke="none"/><circle cx="24" cy="40" r="2.5" fill="currentColor" stroke="none"/><circle cx="8" cy="24" r="2.5" fill="currentColor" stroke="none"/><circle cx="40" cy="24" r="2.5" fill="currentColor" stroke="none"/>');

  // Location / country / geo / map / where
  if (/place|location|country|geo|map|where/.test(k))
    return I('<path d="M24 5C16.3 5 10 11 10 19c0 11.6 14 24 14 24S38 30.6 38 19C38 11 31.7 5 24 5Z"/><circle cx="24" cy="19" r="6"/>');

  // People / team / leadership / council / volunteer
  if (/people|team|council|leadership|volunteer|story/.test(k))
    return I('<circle cx="17" cy="16" r="5"/><circle cx="31" cy="16" r="5"/><path d="M6 38c0-7 5-11 11-11h14c6 0 11 4 11 11"/><path d="M24 27v-6M20 24h8" opacity=".5"/>');

  // Audio / sound / synth / music
  if (/audio|sound|synth|tone|music|sonic/.test(k))
    return I('<path d="M8 18v12h8l11 8V10L16 18Z"/><path d="M31 18a9 9 0 0 1 0 12"/><path d="M35 13a17 17 0 0 1 0 22"/>');

  // Web / browser / HTML / CSS / website
  if (/\bweb\b|website|html|css|frontend|browser|pages|responsive/.test(k))
    return I('<rect x="6" y="9" width="36" height="30" rx="3"/><path d="M6 17h36"/><circle cx="12" cy="13" r="1.8" fill="currentColor" stroke="none"/><circle cx="18" cy="13" r="1.8" fill="currentColor" stroke="none"/><circle cx="24" cy="13" r="1.8" fill="currentColor" stroke="none"/><path d="M12 24h24M12 29h18"/>');

  // Vision / camera / forensic / OpenCV / glasses / optical
  if (/vision|camera|forensic|glasses|opencv|sift|flann|crime|optical/.test(k))
    return I('<path d="M4 24C9 14 16 9 24 9s15 5 20 15c-5 10-12 15-20 15S9 34 4 24Z"/><circle cx="24" cy="24" r="7"/><circle cx="24" cy="24" r="3" fill="currentColor" stroke="none"/><path d="M20 11 17 6M28 11l3-6" opacity=".5"/>');

  // WiFi / handover / wireless network / Raspberry Pi / 802.11 / RSSI
  if (/wifi|handover|rssi|802|raspberry|pi|scan|beacon|coverage/.test(k))
    return I('<path d="M5 19a27 27 0 0 1 38 0"/><path d="M11 25a19 19 0 0 1 26 0"/><path d="M17 31a11 11 0 0 1 14 0"/><circle cx="24" cy="39" r="3.5" fill="currentColor" stroke="none"/>');

  // Research / academic / thesis / grad cap
  if (/research|academic|thesis|study|publication/.test(k))
    return I('<path d="M7 20 24 10l17 10-17 10Z"/><path d="M13 23.5v10c0 3.5 5 6 11 6s11-2.5 11-6v-10"/><path d="M39 20v9"/><circle cx="39" cy="31" r="2.5" fill="currentColor" stroke="none"/>');

  // Rocket / launch / speed / startup
  if (/rocket|launch|startup|speed/.test(k))
    return I('<path d="M24 6c0 0 10 6 12 20H12C14 12 24 6 24 6Z"/><path d="M17 26v8c0 0 3 5 7 5s7-5 7-5v-8"/><path d="M12 26s-5 3-5 8M36 26s5 3 5 8"/><circle cx="24" cy="18" r="3" fill="currentColor" stroke="none"/>');

  // Email / contact
  if (/email|mail|message/.test(k))
    return I('<rect x="6" y="11" width="36" height="26" rx="3"/><path d="M6 14l18 14L42 14"/>');

  // LinkedIn / phone / social
  if (/phone|linkedin|connect/.test(k))
    return I('<rect x="14" y="5" width="20" height="38" rx="4"/><circle cx="24" cy="36.5" r="2" fill="currentColor" stroke="none"/><path d="M21 11h6"/>');

  // GitHub / code / repo
  if (/github|code|repo|git/.test(k))
    return I('<path d="M24 5C14 5 6 13 6 23c0 8 5.2 14.8 12.4 17.2.9.2 1.2-.4 1.2-.9v-3.2c-5 1.1-6-2.4-6-2.4-.8-2.1-2-2.6-2-2.6-1.6-1.1.1-1.1.1-1.1 1.8.1 2.7 1.8 2.7 1.8 1.6 2.7 4.1 1.9 5.1 1.5.2-1.1.6-1.9 1.1-2.3-3.9-.4-8-2-8-8.8 0-1.9.7-3.5 1.8-4.8-.2-.5-.8-2.3.2-4.7 0 0 1.5-.5 4.8 1.8a16.8 16.8 0 0 1 8.8 0c3.3-2.3 4.8-1.8 4.8-1.8 1 2.4.4 4.2.2 4.7 1.1 1.3 1.8 2.9 1.8 4.8 0 6.8-4.1 8.4-8 8.8.6.5 1.2 1.6 1.2 3.2v4.8c0 .5.3 1.1 1.2.9C36.8 37.8 42 31 42 23 42 13 34 5 24 5Z" fill="currentColor" stroke="none"/>');

  // Open source / link / external
  if (/open|link|external/.test(k))
    return I('<path d="M20 10H10a3 3 0 0 0-3 3v25a3 3 0 0 0 3 3h25a3 3 0 0 0 3-3V28"/><path d="M27 7h14v14M27 21 41 7"/>');

  // Sport / game / rank / controller
  if (/game|rank|sport|play|controller|overwatch|valorant|cod/.test(k))
    return I('<rect x="7" y="16" width="34" height="20" rx="8"/><path d="M16 22v8M12 26h8"/><circle cx="32" cy="24" r="2" fill="currentColor" stroke="none"/><circle cx="37" cy="28" r="2" fill="currentColor" stroke="none"/>');

  // Calendar / timeline / date / history
  if (/date|calendar|history|origin|born|timeline/.test(k))
    return I('<rect x="7" y="9" width="34" height="32" rx="3"/><path d="M7 19h34M16 6v6M32 6v6"/><rect x="13" y="24" width="5" height="5" rx="1" fill="currentColor" stroke="none"/><rect x="22" y="24" width="5" height="5" rx="1" fill="currentColor" stroke="none"/><rect x="31" y="24" width="5" height="5" rx="1" fill="currentColor" stroke="none"/>');

  // Certification / degree / education
  if (/cert|certif|degree|edu|mit|cmu|samsung|program/.test(k))
    return I('<path d="M7 20 24 10l17 10-17 10Z" fill="currentColor" stroke="none" opacity=".3"/><path d="M7 20 24 10l17 10-17 10Z"/><path d="M13 23.5v10c0 3.5 5 6 11 6s11-2.5 11-6v-10"/><path d="M39 20v9"/><circle cx="39" cy="31" r="2.5" fill="currentColor" stroke="none"/>');

  // Unknown / default — crosshair
  return I('<circle cx="24" cy="24" r="15"/><path d="M24 6v10M24 32v10M6 24h10M32 24h10"/><circle cx="24" cy="24" r="4" fill="currentColor" stroke="none"/>');
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
  const years = [];
  s.jobs.forEach(j => (String(j.date).match(/\d{4}/g) || []).forEach(y => years.push(+y)));
  const span = years.length ? `${Math.min(...years)} – ${Math.max(...years)}` : '';
  const regions = [...new Set(s.jobs.map(j => j.place.split(',').pop().trim()))].join(' · ');

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
  const LANG_LEVEL = { 22: 'native', 20: 'fluent', 3: 'conversational' };
  const getLangLevel = yrs => yrs >= 20 ? 'native' : yrs >= 5 ? 'fluent' : 'beginner';

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

  const renderLangCat = cat => {
    const badges = cat.items.map(it => {
      const level = getLangLevel(it.yrs);
      return `<div class="skl-lang skl-lang-${level}">
        <span class="skl-lang-n">${esc(it.n)}</span>
        <span class="skl-lang-lv">${level}</span>
      </div>`;
    }).join('');
    return `<section class="hi-group hi-skillcat">
      <div class="hi-group-title">${esc(cat.name)}</div>
      <div class="skl-lang-grid">${badges}</div>
    </section>`;
  };

  const isLang = cat => /spoken|language/i.test(cat.name);
  const leftCats  = s.categories.slice(0, 2);
  const rightCats = s.categories.slice(2);

  const totalItems = s.categories.reduce((n, c) => n + c.items.length, 0);
  const topLang = s.categories[0]?.items[0];

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

  const tlYears = [];
  s.events.forEach(e => (String(e.date).match(/\d{4}/g) || []).forEach(y => tlYears.push(+y)));
  const tlSpan = tlYears.length ? `${Math.min(...tlYears)} – ${Math.max(...tlYears)}` : '';

  return `
    ${head(s)}
    <div class="tl-grid">${cards}</div>
  `;
}

function renderWall(s) {
  const GROUPS = [
    { label: 'Academic', keys: ['MIT', 'CARNEGIE MELLON', 'SAINT LOUIS U.'] },
    { label: 'Industry', keys: ['SAMSUNG', 'CORSAIR', 'GLAXOSMITHKLINE (GSK)', 'DOHA BANK', 'GSK'] },
    { label: 'Publications & Orgs', keys: ['IEEE', 'RED CROSS · RED CRESCENT', 'THE STEM SPECTRUM', 'PARK HOUSE ENGLISH SCHOOL'] }
  ];

  const tileMap = {};
  (s.tiles || []).forEach(t => { tileMap[t.n.toUpperCase()] = t; });

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
  const groupedTileNames = new Set(GROUPS.flatMap(g => g.keys.map(k => k.toUpperCase())));
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
