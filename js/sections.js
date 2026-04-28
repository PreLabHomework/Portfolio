// ============================================================
//  SECTIONS, per-layout renderers (v3)
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
    default:           return `<h2 class="sv-heading">${s.heading || ''}</h2>`;
  }
}

// ─── HOME ──────────────────────────────────────────────────
function renderHome(s) {
  return `
    <h2 class="sv-heading">${s.heading}</h2>
    <div class="sv-sub">${s.sub}</div>
    <div class="layout-home">
      <div>
        <div class="home-intro">${s.intro}</div>
        <div class="home-bio">
          ${s.bio.map(p => `<p>${p}</p>`).join('')}
        </div>
      </div>
      <div class="home-facts">
        ${s.quickfacts.map(f => `
          <div class="home-fact">
            <span class="k">${f.k}</span>
            <span class="v">${f.v}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// ─── LABS ──────────────────────────────────────────────────
function renderLabs(s) {
  const tabs = s.labs.map((lab, i) => `
    <button class="lab-tab ${i === 0 ? 'active' : ''}" data-lab="${lab.key}" type="button">
      <div class="lt-name">${lab.name}</div>
      <div class="lt-focus">${lab.focus}</div>
    </button>
  `).join('');

  const dossiers = s.labs.map((lab, i) => `
    <div class="lab-dossier" data-dossier="${lab.key}" style="${i === 0 ? '' : 'display:none;'}">
      <div class="lab-dossier-header">
        <div class="ldh-name">${lab.name}</div>
        <div class="ldh-focus">${lab.focus}, ${lab.pi}</div>
        <div class="lab-status-ribbon">${lab.status}</div>
      </div>
      <div class="lab-story">
        ${lab.story.map(p => `<p>${p}</p>`).join('')}
      </div>
      <div>
        <div class="lab-section-title">Work within the lab</div>
        <div class="lab-subs">
          ${lab.subprojects.map(sp => `
            <div class="lab-sub">
              <div class="n">${sp.n}</div>
              <div class="d">${sp.d}</div>
            </div>
          `).join('')}
        </div>
      </div>
      <div class="lab-funding">${lab.funding}</div>
    </div>
  `).join('');

  return `
    <h2 class="sv-heading">${s.heading}</h2>
    <div class="sv-sub">${s.sub}</div>
    <div class="layout-labs">
      <div class="labs-tabs">${tabs}</div>
      <div class="labs-content">${dossiers}</div>
    </div>
  `;
}

// ─── CAPSTONE ──────────────────────────────────────────────
function renderCapstone(s) {
  const stages = s.architecture.map((st, i) => `
    <div class="cap-stage">
      <div class="s-num">${String(i + 1).padStart(2, '0')}</div>
      <div class="s-name">${st.stage}</div>
      <div class="s-chip">${st.chip}</div>
      <div class="s-text">${st.text}</div>
    </div>
  `).join('');

  const modules = s.app.modules.map(m => `<span class="cap-module">${m}</span>`).join('');

  return `
    <h2 class="sv-heading">${s.heading}</h2>
    <div class="sv-sub">${s.sub}</div>
    <div class="layout-capstone">
      <div class="cap-pitch">${s.pitch}</div>

      <div>
        <div class="cap-arch-title">Architecture</div>
        <div class="cap-arch">${stages}</div>
      </div>

      <div>
        <div class="cap-app-title">Companion App</div>
        <div class="cap-app">
          <div class="app-name">${s.app.name}</div>
          <div class="app-status">${s.app.status}</div>
          <div class="cap-modules">${modules}</div>
        </div>
      </div>

      <div class="cap-deadline">DEADLINE: ${s.deadline}</div>
    </div>
  `;
}

// ─── GALLERY ───────────────────────────────────────────────
function renderGallery(s) {
  const cards = s.items.map((p, i) => `
    <div class="proj-card${i === 0 ? ' featured' : ''}">
      <div class="proj-head">
        <span class="proj-tag">${p.tag}</span>
        <span class="proj-year">${p.year}</span>
      </div>
      <div class="proj-title">${p.title}</div>
      <div class="proj-body">${p.body}</div>
      <div class="proj-tech">
        ${p.tech.map(t => `<span class="t">${t}</span>`).join('')}
      </div>
    </div>
  `).join('');

  return `
    <h2 class="sv-heading">${s.heading}</h2>
    <div class="sv-sub">${s.sub}</div>
    <div class="layout-gallery">
      <div class="gallery-grid">${cards}</div>
    </div>
  `;
}

// ─── ARCHIVE ───────────────────────────────────────────────
function renderArchive(s) {
  const papers = s.papers.map(p => `
    <div class="arch-paper">
      <div class="arch-status ${p.statusTone}">${p.status}</div>
      <div>
        <div class="p-title">${p.title}</div>
        <div class="p-meta">${p.venue}${p.year ? `, ${p.year}` : ''}</div>
        <div class="p-blurb">${p.blurb}</div>
      </div>
    </div>
  `).join('');

  const certs = s.certifications.map(c => `
    <div class="arch-cert">
      <div>
        <div class="c-title">${c.title}</div>
        <div class="c-detail">${c.detail}</div>
      </div>
      <div class="c-year">${c.year}</div>
    </div>
  `).join('');

  return `
    <h2 class="sv-heading">${s.heading}</h2>
    <div class="sv-sub">${s.sub}</div>
    <div class="layout-archive">
      <div>
        <div class="arch-section-title">Papers & Patents</div>
        <div class="arch-papers">${papers}</div>
      </div>
      <div>
        <div class="arch-section-title">Certifications</div>
        <div class="arch-certs">${certs}</div>
      </div>
    </div>
  `;
}

// ─── SKILLS ────────────────────────────────────────────────
function renderSkills(s) {
  const cats = s.categories.map(cat => {
    const maxYrs = Math.max(...cat.items.map(i => i.yrs), 8);
    const rows = cat.items.map(it => {
      const pct = Math.min(100, (it.yrs / maxYrs) * 100);
      return `
        <div class="sk-row">
          <div class="n">${it.n}</div>
          <div class="bar"><div class="fill" style="width:${pct}%"></div></div>
          <div class="y">${it.yrs}Y</div>
          <div class="nt">${it.note}</div>
        </div>
      `;
    }).join('');
    return `<div class="sk-cat"><div class="sk-cat-title">${cat.name}</div>${rows}</div>`;
  }).join('');

  return `
    <h2 class="sv-heading">${s.heading}</h2>
    <div class="sv-sub">${s.sub}</div>
    <div class="layout-skills">${cats}</div>
  `;
}

// ─── TIMELINE ──────────────────────────────────────────────
function renderTimeline(s) {
  const items = s.events.map(e => `
    <div class="tl-item">
      <div class="tl-date">${e.date}</div>
      <span class="tl-tag">${e.tag}</span>
      <span class="tl-body">${e.body}</span>
    </div>
  `).join('');

  return `
    <h2 class="sv-heading">${s.heading}</h2>
    <div class="sv-sub">${s.sub}</div>
    <div class="layout-timeline">
      <div class="tl-list">${items}</div>
    </div>
  `;
}

// ─── WALL (affiliations) ───────────────────────────────────
function renderWall(s) {
  const tiles = s.tiles.map(t => `
    <div class="wall-tile" style="--brand:${t.brand};--brand-text:${t.text};">
      <div class="wt-n">${t.n}</div>
      <div class="wt-r">${t.r}</div>
    </div>
  `).join('');

  return `
    <h2 class="sv-heading">${s.heading}</h2>
    <div class="sv-sub">${s.sub}</div>
    <div class="layout-wall">
      <div class="wall-grid">${tiles}</div>
    </div>
  `;
}

// ─── PERSONAL ──────────────────────────────────────────────
function renderPersonal(s) {
  const geo = s.geography.map(g => `
    <div class="geo-card" style="--gc1:${g.c1};--gc2:${g.c2};">
      <span class="geo-flag">${g.flag}</span>
      <div class="geo-country">${g.country}</div>
      <div class="geo-years">${g.years}</div>
      <div class="geo-note">${g.note}</div>
    </div>
  `).join('');

  const ranks = s.gameranks.map(r => `
    <div class="rank-card" style="--rc:${r.c};">
      <div class="rg">${r.g}</div>
      <div class="rr">${r.r}</div>
    </div>
  `).join('');

  const teams = s.teams.map(t => `
    <div class="team-pill" style="--tc:${t.c};">
      <div class="ts">${t.sport}</div>
      <div class="tt">${t.team}</div>
    </div>
  `).join('');

  const stories = s.stories.map(st => `
    <div class="story-item">
      <div class="t">${st.t}</div>
      <div class="d">${st.d}</div>
    </div>
  `).join('');

  const lifestyle = s.lifestyle.map(l => `<li>${l}</li>`).join('');

  return `
    <h2 class="sv-heading">${s.heading}</h2>
    <div class="sv-sub">${s.sub}</div>
    <div class="layout-personal">
      <div>
        <div class="personal-section-title">Where I've lived</div>
        <div class="geo-strip">${geo}</div>
      </div>
      <div>
        <div class="personal-section-title">Game ranks</div>
        <div class="rank-grid">${ranks}</div>
      </div>
      <div>
        <div class="personal-section-title">Teams I follow</div>
        <div class="team-row">${teams}</div>
      </div>
      <div>
        <div class="personal-section-title">Stories</div>
        <div class="stories-list">${stories}</div>
      </div>
      <div>
        <div class="personal-section-title">Currently</div>
        <ul class="lifestyle-list">${lifestyle}</ul>
      </div>
    </div>
  `;
}

// ─── ASTAKERIA ─────────────────────────────────────────────
function renderAstakeria(s) {
  const pillars = s.pillars.map(p => `
    <div class="ast-pillar">
      <div class="n">${p.n}</div>
      <div class="d">${p.d}</div>
    </div>
  `).join('');

  const heroes = s.heroes.map(h => `
    <div class="ast-hero">
      <div class="hn">${h.name}</div>
      <div class="hr">${h.role}</div>
      <div class="ht">${h.tagline}</div>
    </div>
  `).join('');

  const entropy = s.entropyExample.map(e => `
    <div class="ast-ex">
      <div class="ext">${e.trigger}</div>
      <div class="arrow">→</div>
      <div class="exc">${e.consequence}</div>
    </div>
  `).join('');

  return `
    <h2 class="sv-heading">${s.heading}</h2>
    <div class="sv-sub">${s.subtitle}</div>
    <div class="layout-astakeria">
      <div class="ast-hook">${s.hook}</div>
      <div class="ast-lore">
        ${s.lore.map(p => `<p>${p}</p>`).join('')}
      </div>
      <div class="ast-section-title">Pillars</div>
      <div class="ast-pillars">${pillars}</div>
      <div class="ast-section-title">Heroes</div>
      <div class="ast-heroes">${heroes}</div>
      <div class="ast-section-title">Entropy in practice</div>
      <div class="ast-entropy">${entropy}</div>
      <div class="ast-quote">${s.quote}</div>
    </div>
  `;
}

// ─── SOON ──────────────────────────────────────────────────
function renderSoon(s) {
  const ascii = `
        ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
        █ TRANSMISSION INCOMING █
        ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
  `.trim();
  return `
    <div class="layout-soon">
      <pre class="soon-ascii">${ascii}</pre>
      <div class="soon-heading">${s.heading}</div>
      <div class="soon-body">
        ${s.body.map(p => `<p>${p}</p>`).join('')}
      </div>
    </div>
  `;
}

// ============================================================
//  POST-RENDER, wires lab tabs (no more constellation)
// ============================================================

export function postRender(charId, el) {
  if (charId === 'labs') setupLabTabs(el);
}

function setupLabTabs(container) {
  const tabs = container.querySelectorAll('.lab-tab');
  const dossiers = container.querySelectorAll('[data-dossier]');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const key = tab.dataset.lab;
      tabs.forEach(t => t.classList.toggle('active', t === tab));
      dossiers.forEach(d => {
        d.style.display = d.dataset.dossier === key ? '' : 'none';
      });
    });
  });
}
