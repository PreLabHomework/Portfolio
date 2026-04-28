// ============================================================
//  SECTIONS, per-layout renderers (v4.6 final)
// ============================================================

import { SECTIONS } from './data.js';

export function renderSection(charId) {
  const s = SECTIONS[charId];
  if (!s) return `<div class="sv-body">section not available.</div>`;

  switch (s.layout) {
    case 'home':       return renderHome(s);
    case 'labs':       return renderLabs(s);
    case 'capstone':   return renderCapstone(s);
    case 'gallery':    return renderGallery(s);
    case 'archive':    return renderArchive(s);
    case 'skills':     return renderSkills(s);
    case 'timeline':   return renderTimeline(s);
    case 'wall':       return renderWall(s);
    case 'personal':   return renderPersonal(s);
    case 'astakeria':  return renderAstakeria(s);
    case 'soon':       return renderSoon(s);
    default:           return `<h2 class="sv-heading">${esc(s.heading || '')}</h2>`;
  }
}

function esc(str = '') {
  return String(str).replace(/[&<>"]/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]));
}

function extLink(url, label = 'Open', cls = 'mini-link') {
  if (!url) return '';
  return `<a class="${cls}" href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(label)}</a>`;
}

function recruiterStrip(items = [], title = 'Recruiter Signal') {
  if (!items || !items.length) return '';
  return `
    <div class="recruiter-strip" aria-label="${esc(title)}">
      <div class="rs-title">${esc(title)}</div>
      <div class="rs-chips">${items.map(item => `<span>${esc(item)}</span>`).join('')}</div>
    </div>
  `;
}

function renderHome(s) {
  const facts = s.quickfacts.map(f => `
    <div class="home-fact compact">
      <span class="k">${esc(f.k)}</span>
      <span class="v">${esc(f.v)}</span>
    </div>
  `).join('');

  return `
    <h2 class="sv-heading">${esc(s.heading)}</h2>
    <div class="sv-sub">${esc(s.sub)}</div>
    <div class="layout-home v4-home">
      <section class="home-lobby-panel">
        <div class="home-kicker">PORTFOLIO TUTORIAL</div>
        <div class="home-intro">${esc(s.intro)}</div>
        <div class="home-steps" aria-label="How to use this portfolio">
          <div class="home-step"><span>01</span><strong>Hover</strong><p>Preview each character and watch the stage, color, and summary shift.</p></div>
          <div class="home-step"><span>02</span><strong>Select</strong><p>Enter the section for labs, capstone, projects, research, skills, or personal context.</p></div>
          <div class="home-step"><span>03</span><strong>Play</strong><p>Use the action button for the relevant resume, repo, LinkedIn, or project link.</p></div>
        </div>
      </section>
      <aside class="home-profile-panel">
        <div class="profile-name">Hamza Abu Khalaf Al Takrouri</div>
        <div class="profile-line">${s.bio.map(esc).join(' ')}</div>
        <div class="profile-facts">${facts}</div>
        ${recruiterStrip(s.recruiter, 'Recruiter Snapshot')}
      </aside>
    </div>
  `;
}

function renderLabs(s) {
  const rail = s.labs.map((lab, i) => `
    <button class="lab-tab v4 ${i === 0 ? 'active' : ''}" data-lab="${esc(lab.key)}" type="button">
      <span class="lt-index">0${i + 1}</span>
      <span class="lt-name">${esc(lab.name)}</span>
      <span class="lt-focus">${esc(lab.focus)}</span>
    </button>
  `).join('');

  const dossiers = s.labs.map((lab, i) => {
    const subs = lab.subprojects.map((sp, idx) => `
      <div class="lab-signal-row">
        <span class="ls-num">${String(idx + 1).padStart(2, '0')}</span>
        <span class="ls-name">${esc(sp.n)}</span>
        <span class="ls-desc">${esc(sp.d)} ${extLink(sp.url, 'open')}</span>
      </div>
    `).join('');
    const story = lab.story.map(p => `<p>${esc(p)}</p>`).join('');
    const links = lab.links ? `<div class="link-rail">${lab.links.map(l => extLink(l.url, l.note ? `${l.label} (${l.note})` : l.label, 'pill-link')).join('')}</div>` : '';
    return `
      <article class="lab-dossier v4" data-dossier="${esc(lab.key)}" style="${i === 0 ? '' : 'display:none;'}">
        <div class="lab-dossier-header v4">
          <div>
            <div class="ldh-name">${esc(lab.name)}</div>
            <div class="ldh-focus">${esc(lab.focus)} · ${esc(lab.pi)}</div>
          </div>
          <div class="lab-status-ribbon">${esc(lab.status)}</div>
        </div>
        <div class="lab-story v4">${story}</div>
        ${recruiterStrip(lab.proof, 'Recruiter Signal')}
        <div class="lab-system-map">
          <div class="lab-section-title">Active work inside this lab</div>
          <div class="lab-signal-list">${subs}</div>
        </div>
        <div class="lab-funding">${esc(lab.funding)}</div>
        ${links}
      </article>
    `;
  }).join('');

  return `
    <h2 class="sv-heading">${esc(s.heading)}</h2>
    <div class="sv-sub">${esc(s.sub)}</div>
    <div class="layout-labs v4-labs">
      <nav class="labs-tabs v4" aria-label="Research lab selector">${rail}</nav>
      <div class="labs-content v4">${dossiers}</div>
    </div>
  `;
}

function renderCapstone(s) {
  const stages = s.architecture.map((st, i) => `
    <div class="cap-stage">
      <div class="s-num">${String(i + 1).padStart(2, '0')}</div>
      <div class="s-name">${esc(st.stage)}</div>
      <div class="s-chip">${esc(st.chip)}</div>
      <div class="s-text">${esc(st.text)}</div>
    </div>
  `).join('');
  const modules = s.app.modules.map(m => `<span class="cap-module">${esc(m)}</span>`).join('');
  const links = s.links ? `<div class="link-rail cap-links">${s.links.map(l => extLink(l.url, l.label, 'pill-link')).join('')}</div>` : '';

  return `
    <h2 class="sv-heading">${esc(s.heading)}</h2>
    <div class="sv-sub">${esc(s.sub)}</div>
    <div class="layout-capstone v4-capstone">
      <div class="cap-pitch">${esc(s.pitch)}</div>
      ${recruiterStrip(s.recruiter, 'Recruiter Signal')}
      <div class="cap-build-window">
        <div class="cap-arch-title">Signal to action pipeline</div>
        <div class="cap-arch">${stages}</div>
      </div>
      <div class="cap-app v4">
        <div class="cap-app-copy">
          <div class="cap-app-title">Companion App</div>
          <div class="app-name">${esc(s.app.name)}</div>
          <div class="app-status">${esc(s.app.status)}</div>
        </div>
        <div class="cap-modules">${modules}</div>
      </div>
      ${links}
      <div class="cap-deadline">DEADLINE: ${esc(s.deadline)}</div>
    </div>
  `;
}

function renderGallery(s) {
  const tiles = s.items.map((p, i) => `
    <button class="project-tile ${i === 0 ? 'active' : ''}" data-project="${i}" type="button">
      <span class="tile-num">${String(i + 1).padStart(2, '0')}</span>
      <span class="tile-tag">${esc(p.tag)}</span>
      <span class="tile-title">${esc(p.title)}</span>
      <span class="tile-year">${esc(p.year)}</span>
    </button>
  `).join('');

  const details = s.items.map((p, i) => `
    <article class="project-detail-panel ${i === 0 ? 'active' : ''}" data-project-detail="${i}">
      <div class="proj-head"><span class="proj-tag">${esc(p.tag)}</span><span class="proj-year">${esc(p.year)}</span></div>
      <div class="proj-title">${esc(p.title)}</div>
      <div class="proj-body">${esc(p.body)}</div>
      ${p.proof ? `<div class="proj-proof"><span>Recruiter Readout</span>${esc(p.proof)}</div>` : ''}
      <div class="proj-tech">${p.tech.map(t => `<span class="t">${esc(t)}</span>`).join('')}</div>
      ${extLink(p.url, 'Open project', 'project-link')}
    </article>
  `).join('');

  return `
    <h2 class="sv-heading">${esc(s.heading)}</h2>
    <div class="sv-sub">${esc(s.sub)}</div>
    <div class="layout-gallery v45-gallery">
      <div class="project-tile-grid">${tiles}</div>
      <div class="project-stage">${details}</div>
    </div>
  `;
}

function renderArchive(s) {
  const papers = s.papers.map((p, i) => `
    <div class="arch-paper v4">
      <div class="arch-index">${String(i + 1).padStart(2, '0')}</div>
      <div class="arch-status ${esc(p.statusTone)}">${esc(p.status)}</div>
      <div>
        <div class="p-title">${esc(p.title)}</div>
        <div class="p-meta">${esc(p.venue)}${p.year ? ` · ${esc(p.year)}` : ''}</div>
        <div class="p-blurb">${esc(p.blurb)}</div>
        ${extLink(p.url, 'Open record', 'mini-link')}
      </div>
    </div>
  `).join('');

  const certs = s.certifications.map(c => `
    <div class="arch-cert v4">
      <div>
        <div class="c-title">${esc(c.title)}</div>
        <div class="c-detail">${esc(c.detail)}</div>
      </div>
      <div class="c-year">${esc(c.year)}</div>
    </div>
  `).join('');

  return `
    <h2 class="sv-heading">${esc(s.heading)}</h2>
    <div class="sv-sub">${esc(s.sub)}</div>
    ${recruiterStrip(s.recruiter, 'Recruiter Signal')}
    <div class="layout-archive v4-archive">
      <section>
        <div class="arch-section-title">Papers & Patents</div>
        <div class="arch-papers">${papers}</div>
      </section>
      <aside>
        <div class="arch-section-title">Certifications</div>
        <div class="arch-certs">${certs}</div>
      </aside>
    </div>
  `;
}

function renderSkills(s) {
  const cats = s.categories.map(cat => {
    const maxYrs = Math.max(...cat.items.map(i => i.yrs), 8);
    const rows = cat.items.map(it => {
      const pct = Math.min(100, (it.yrs / maxYrs) * 100);
      return `
        <div class="sk-row">
          <div class="n">${esc(it.n)}</div>
          <div class="bar"><div class="fill" style="width:${pct}%"></div></div>
          <div class="y">${esc(it.yrs)}Y</div>
          <div class="nt">${esc(it.note)}</div>
        </div>
      `;
    }).join('');
    return `<div class="sk-cat"><div class="sk-cat-title">${esc(cat.name)}</div>${rows}</div>`;
  }).join('');

  return `
    <h2 class="sv-heading">${esc(s.heading)}</h2>
    <div class="sv-sub">${esc(s.sub)}</div>
    ${recruiterStrip(s.recruiter, 'Stack Highlights')}
    <div class="layout-skills">${cats}</div>
  `;
}

function renderTimeline(s) {
  const items = s.events.map(e => `
    <div class="tl-item">
      <div class="tl-date">${esc(e.date)}</div>
      <span class="tl-tag">${esc(e.tag)}</span>
      <span class="tl-body">${esc(e.body)}</span>
    </div>
  `).join('');

  return `
    <h2 class="sv-heading">${esc(s.heading)}</h2>
    <div class="sv-sub">${esc(s.sub)}</div>
    <div class="layout-timeline">
      <div class="tl-list">${items}</div>
    </div>
  `;
}

function brandLogo(n) {
  if (!n) return '';
  const words = String(n).split(/\s+/).map(w => w.replace(/[^A-Za-z0-9]/g, '')).filter(Boolean);
  if (!words.length) return n.slice(0, 3).toUpperCase();
  if (words.length === 1) {
    const w = words[0];
    return w.length <= 4 ? w : w.slice(0, 3);
  }
  return words.map(w => w[0]).join('').slice(0, 4);
}

function renderWall(s) {
  const tiles = s.tiles.map(t => `
    <div class="wall-tile v4" style="--brand:${esc(t.brand)};--brand-text:${esc(t.text)};">
      <div class="wt-logo">${esc(brandLogo(t.n))}</div>
      <div class="wt-n">${esc(t.n)}</div>
      <div class="wt-r">${esc(t.r)}</div>
      ${extLink(t.url, 'Open', 'mini-link wall-link')}
    </div>
  `).join('');

  return `
    <h2 class="sv-heading">${esc(s.heading)}</h2>
    <div class="sv-sub">${esc(s.sub)}</div>
    <div class="layout-wall">
      <div class="wall-grid">${tiles}</div>
    </div>
  `;
}

function renderPersonal(s) {
  const geo = s.geography.map(g => `
    <div class="geo-card" style="--gc1:${esc(g.c1)};--gc2:${esc(g.c2)};">
      <span class="geo-flag">${esc(g.flag)}</span>
      <div class="geo-country">${esc(g.country)}</div>
      <div class="geo-years">${esc(g.years)}</div>
      <div class="geo-note">${esc(g.note)}</div>
    </div>
  `).join('');
  const ranks = s.gameranks.map(r => `
    <div class="rank-card" style="--rc:${esc(r.c)};">
      <div class="rg">${esc(r.g)}</div>
      <div class="rr">${esc(r.r)}</div>
    </div>
  `).join('');
  const teams = s.teams.map(t => `
    <div class="team-pill" style="--tc:${esc(t.c)};">
      <div class="ts">${esc(t.sport)}</div>
      <div class="tt">${esc(t.team)}</div>
    </div>
  `).join('');
  const stories = s.stories.map(st => `
    <div class="story-item">
      <div class="t">${esc(st.t)}</div>
      <div class="d">${esc(st.d)}</div>
    </div>
  `).join('');
  const lifestyle = s.lifestyle.map(l => `<li>${esc(l)}</li>`).join('');

  return `
    <h2 class="sv-heading">${esc(s.heading)}</h2>
    <div class="sv-sub">${esc(s.sub)}</div>
    <div class="layout-personal">
      <section><div class="personal-section-title">Where I've lived</div><div class="geo-strip">${geo}</div></section>
      <section><div class="personal-section-title">Game ranks</div><div class="rank-grid">${ranks}</div></section>
      <section><div class="personal-section-title">Teams I follow</div><div class="team-row">${teams}</div></section>
      <section><div class="personal-section-title">Stories</div><div class="stories-list">${stories}</div></section>
      <section><div class="personal-section-title">${esc(s.endeavorsTitle || "Currently")}</div><ul class="lifestyle-list">${lifestyle}</ul></section>
    </div>
  `;
}

function renderAstakeria(s) {
  const pillars = s.pillars.map(p => `<div class="ast-pillar"><div class="n">${esc(p.n)}</div><div class="d">${esc(p.d)}</div></div>`).join('');
  const heroes = s.heroes.map(h => `<div class="ast-hero"><div class="hn">${esc(h.name)}</div><div class="hr">${esc(h.role)}</div><div class="ht">${esc(h.tagline)}</div></div>`).join('');
  const entropy = s.entropyExample.map(e => `<div class="ast-ex"><div class="ext">${esc(e.trigger)}</div><div class="arrow">›</div><div class="exc">${esc(e.consequence)}</div></div>`).join('');
  return `
    <h2 class="sv-heading">${esc(s.heading)}</h2>
    <div class="sv-sub">${esc(s.subtitle)}</div>
    <div class="layout-astakeria">
      <div class="ast-hook">${esc(s.hook)}</div>
      <div class="ast-lore">${s.lore.map(p => `<p>${esc(p)}</p>`).join('')}</div>
      <div class="ast-section-title">Pillars</div><div class="ast-pillars">${pillars}</div>
      <div class="ast-section-title">Heroes</div><div class="ast-heroes">${heroes}</div>
      <div class="ast-section-title">Entropy in practice</div><div class="ast-entropy">${entropy}</div>
      <div class="ast-quote">${esc(s.quote)}</div>
    </div>
  `;
}

function renderSoon(s) {
  const ascii = `
        ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
        █ TRANSMISSION INCOMING █
        ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
  `.trim();
  return `
    <div class="layout-soon">
      <pre class="soon-ascii">${ascii}</pre>
      <div class="soon-heading">${esc(s.heading)}</div>
      <div class="soon-body">${s.body.map(p => `<p>${esc(p)}</p>`).join('')}</div>
    </div>
  `;
}

export function postRender(charId, el) {
  if (charId === 'labs') setupLabTabs(el);
  if (charId === 'projects') setupProjectExplorer(el);
}

function setupLabTabs(container) {
  const tabs = container.querySelectorAll('.lab-tab');
  const dossiers = container.querySelectorAll('[data-dossier]');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const key = tab.dataset.lab;
      tabs.forEach(t => t.classList.toggle('active', t === tab));
      dossiers.forEach(d => { d.style.display = d.dataset.dossier === key ? '' : 'none'; });
    });
  });
}


function setupProjectExplorer(container) {
  const tiles = container.querySelectorAll('.project-tile');
  const panels = container.querySelectorAll('[data-project-detail]');
  tiles.forEach(tile => {
    tile.addEventListener('click', () => {
      const key = tile.dataset.project;
      tiles.forEach(t => t.classList.toggle('active', t === tile));
      panels.forEach(panel => panel.classList.toggle('active', panel.dataset.projectDetail === key));
    });
  });
}
