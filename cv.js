// ============================================================
//  CV MODE — flat resume renderers + sticky-rail nav
//  Imports data.js for content sync with the main site.
// ============================================================

import { ROSTER, SECTIONS } from './js/data.js';

const navOrder = [
  'home', 'labs', 'capstone', 'projects', 'research',
  'skills', 'timeline', 'affiliations', 'personal', 'astakeria'
  // 'soon' is intentionally omitted from CV mode
];

// section meta: pulled from ROSTER but re-labeled for resume context
const META = {
  home:         { label: 'Profile',       icon: '◆', tag: '00 / HMZA-01' },
  labs:         { label: 'Research Labs', icon: '⬢', tag: '02 / LAB-02' },
  capstone:     { label: 'Capstone',      icon: '▲', tag: '03 / CAP-03' },
  projects:     { label: 'Projects',      icon: '◇', tag: '04 / PRJ-04' },
  research:     { label: 'Publishing Papers', icon: '✦', tag: '05 / PUB-05' },
  skills:       { label: 'Skills',        icon: '▣', tag: '06 / SKL-06' },
  timeline:     { label: 'Timeline',      icon: '⊿', tag: '07 / TLN-07' },
  affiliations: { label: 'Affiliations',  icon: '⬡', tag: '08 / AFF-08' },
  personal:     { label: 'Personal',      icon: '◔', tag: '09 / PSN-09' },
  astakeria:    { label: 'Astakeria',     icon: '◈', tag: '10 / AST-10' }
};

// ─── nav rail render ───────────────────────────────────────
function renderNav() {
  const nav = document.getElementById('cv-nav');
  const items = ['hero', ...navOrder].map(id => {
    const c = ROSTER.find(r => r.id === id);
    const meta = META[id];
    const label = id === 'hero' ? 'Profile' : (meta?.label || id);
    const tag   = id === 'hero' ? '00 / IDENTITY' : (meta?.tag || '');
    const accent = id === 'hero' ? '#ffd166' : (c?.accent || '#ffd166');
    return `
      <a href="#${id}" class="cv-nav-item" data-target="${id}" style="--nav-acc:${accent};">
        <span class="cni-tag">${tag}</span>
        <span class="cni-label">${label}</span>
        <span class="cni-bar"></span>
      </a>
    `;
  }).join('');
  nav.innerHTML = items;
}

// ─── escape helper ─────────────────────────────────────────
function esc(s) {
  return String(s ?? '').replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
}

// ─── section header (consistent across every CV section) ───
function header(id, char) {
  const meta = META[id];
  const cta = char.play_url ? `
    <a class="cv-sec-cta" href="${esc(char.play_url)}" target="_blank" rel="noopener" style="--sec-acc:${char.accent};">
      <span class="cv-sec-cta-arrow">▸</span>
      ${esc((char.play_label || 'OPEN'))}
    </a>
  ` : '';
  return `
    <div class="cv-sec-head" style="--sec-acc:${char.accent};--sec-acc2:${char.accent2};">
      <div class="cv-sec-head-row">
        <div class="cv-sec-head-text">
          <div class="cv-sec-tag">${meta.tag} · ${esc(char.subtitle)}</div>
          <h2 class="cv-sec-h">${esc(char.title)}</h2>
        </div>
        ${cta}
      </div>
      <div class="cv-sec-rule"></div>
    </div>
  `;
}

// ─── HOME / Profile ─────────────────────────────────────────
function renderHome() {
  const c = ROSTER.find(r => r.id === 'home');
  const s = SECTIONS.home;
  const cvHome = {
    sub: 'Background, focus areas, and what I am looking for.',
    intro: 'I am a senior Computer & Electrical Engineering student at Saint Louis University, graduating May 2026. I work across firmware, hardware, machine learning, and mobile. Three concurrent research labs at SLU, one senior design capstone, an active patent filing, and a few standalone projects on the side. Looking for full-time roles starting May 2026.'
  };
  return `
    <section class="cv-sec" id="home" data-sec="home" style="--sec-acc:${c.accent};--sec-acc2:${c.accent2};">
      ${header('home', c)}
      <div class="cv-home-sub">${esc(cvHome.sub)}</div>
      <div class="cv-grid two">
        <div class="cv-prose">
          ${(s.bio || []).map(p => `<p>${esc(p)}</p>`).join('')}
          <p class="cv-prose-emph">${esc(cvHome.intro)}</p>
        </div>
        <div class="cv-callout">
          <div class="cv-callout-title">Quick Facts</div>
          ${(s.quickfacts || []).map(f => `
            <div class="cv-fact">
              <span class="k">${esc(f.k)}</span>
              <span class="v">${esc(f.v)}</span>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

// ─── LABS ──────────────────────────────────────────────────
function isBoilerplateFunding(s) {
  if (!s) return true;
  const t = s.toLowerCase();
  return /official lab website linked separately|research-site builds are separate|not published yet/.test(t);
}
function cleanFunding(s) {
  if (!s || isBoilerplateFunding(s)) return '';
  // Strip any trailing boilerplate sentence even if mixed in
  return s
    .replace(/Official lab website linked separately\.\s*/gi, '')
    .replace(/My research-site builds are separate and not published yet\.\s*/gi, '')
    .trim();
}
function isInternalSubproject(sp) {
  if (!sp) return false;
  return /research site builds|sites I built are separate|not public yet/i.test(sp.n + ' ' + sp.d);
}

function renderLabs() {
  const c = ROSTER.find(r => r.id === 'labs');
  const s = SECTIONS.labs;
  const labs = (s.labs || []).map(lab => {
    const subs = (lab.subprojects || []).filter(sp => !isInternalSubproject(sp));
    const funding = cleanFunding(lab.funding);
    const links = (lab.links || []).filter(l => l && l.url);
    return `
      <div class="cv-lab" style="--lab-acc:${c.accent};">
        <div class="cv-lab-row">
          <h3 class="cv-lab-name">${esc(lab.name)}</h3>
          <span class="cv-lab-status">${esc(lab.status || '')}</span>
        </div>
        <div class="cv-lab-meta">${esc(lab.focus || '')}${lab.pi ? ` · ${esc(lab.pi)}` : ''}</div>
        ${(lab.story || []).map(p => `<p class="cv-lab-p">${esc(p)}</p>`).join('')}
        ${subs.length ? `
          <div class="cv-lab-subs">
            ${subs.map(sp => `
              <div class="cv-lab-sub">
                <span class="cls-n">${esc(sp.n)}</span>
                <span class="cls-d">${esc(sp.d)}${sp.url ? ` <a class="cls-link" href="${esc(sp.url)}" target="_blank" rel="noopener">▸ link</a>` : ''}</span>
              </div>
            `).join('')}
          </div>
        ` : ''}
        ${links.length ? `
          <div class="cv-lab-links">
            ${links.map(l => `
              <a class="cv-lab-link" href="${esc(l.url)}" target="_blank" rel="noopener">
                <span class="cll-arrow">▸</span> ${esc(l.label || 'Open')}
              </a>
            `).join('')}
          </div>
        ` : ''}
        ${funding ? `<div class="cv-lab-fund">${esc(funding)}</div>` : ''}
      </div>
    `;
  }).join('');

  return `
    <section class="cv-sec" id="labs" data-sec="labs" style="--sec-acc:${c.accent};--sec-acc2:${c.accent2};">
      ${header('labs', c)}
      <div class="cv-labs-list">${labs}</div>
    </section>
  `;
}

// ─── CAPSTONE ──────────────────────────────────────────────
function renderCapstone() {
  const c = ROSTER.find(r => r.id === 'capstone');
  const s = SECTIONS.capstone;
  const stages = (s.architecture || []).map((st, i) => `
    <div class="cv-cap-stage">
      <span class="cs-num">${String(i+1).padStart(2,'0')}</span>
      <div class="cs-body">
        <div class="cs-name">${esc(st.stage)}${st.chip ? ` <span class="cs-chip">${esc(st.chip)}</span>` : ''}</div>
        <div class="cs-text">${esc(st.text)}</div>
      </div>
    </div>
  `).join('');

  return `
    <section class="cv-sec" id="capstone" data-sec="capstone" style="--sec-acc:${c.accent};--sec-acc2:${c.accent2};">
      ${header('capstone', c)}
      <div class="cv-callout cap">
        <div class="cv-callout-title">${esc(s.app?.name || 'TremorMonitor')}</div>
        <p class="cv-cap-pitch">${esc(s.pitch || '')}</p>
      </div>
      <h4 class="cv-h4">Signal pipeline</h4>
      <div class="cv-cap-arch">${stages}</div>
      ${s.app ? `
        <h4 class="cv-h4">Companion app</h4>
        <p class="cv-cap-app-status">${esc(s.app.status || '')}</p>
        ${s.app.modules && s.app.modules.length ? `
          <div class="cv-tag-row">
            ${s.app.modules.map(m => `<span class="cv-tag">${esc(m)}</span>`).join('')}
          </div>
        ` : ''}
      ` : ''}
      ${s.deadline ? `<div class="cv-cap-deadline">DEADLINE · ${esc(s.deadline)}</div>` : ''}
    </section>
  `;
}

// ─── PROJECTS ──────────────────────────────────────────────
function renderProjects() {
  const c = ROSTER.find(r => r.id === 'projects');
  const s = SECTIONS.projects;
  const items = (s.items || []).map(p => `
    <div class="cv-proj">
      <div class="cv-proj-head">
        <span class="cv-proj-year">${esc(p.year || '')}</span>
        <span class="cv-proj-tag">${esc(p.tag || '')}</span>
      </div>
      <h3 class="cv-proj-title">${esc(p.title || '')}</h3>
      <p class="cv-proj-body">${esc(p.body || '')}</p>
      ${p.tech && p.tech.length ? `
        <div class="cv-tag-row sm">
          ${p.tech.map(t => `<span class="cv-tag sm">${esc(t)}</span>`).join('')}
        </div>
      ` : ''}
      ${p.url ? `
        <a class="cv-proj-link" href="${esc(p.url)}" target="_blank" rel="noopener">
          <span class="cpl-arrow">▸</span> Open
        </a>
      ` : ''}
    </div>
  `).join('');
  return `
    <section class="cv-sec" id="projects" data-sec="projects" style="--sec-acc:${c.accent};--sec-acc2:${c.accent2};">
      ${header('projects', c)}
      <div class="cv-proj-grid two-col">${items}</div>
    </section>
  `;
}

// ─── RESEARCH (papers + certs) ─────────────────────────────
function renderResearch() {
  const c = ROSTER.find(r => r.id === 'research');
  const s = SECTIONS.research;
  const papers = (s.papers || []).map(p => `
    <div class="cv-paper">
      <div class="cv-paper-status t-${esc(p.statusTone || 'warn')}">${esc(p.status || '')}</div>
      <div class="cv-paper-body">
        <h3 class="cv-paper-title">${esc(p.title || '')}</h3>
        <div class="cv-paper-meta">${esc(p.venue || '')}${p.year ? ` · ${esc(p.year)}` : ''}</div>
        <p class="cv-paper-blurb">${esc(p.blurb || '')}</p>
      </div>
    </div>
  `).join('');
  const certs = (s.certifications || []).map(ct => `
    <div class="cv-cert">
      <div class="cv-cert-head">
        <span class="cc-title">${esc(ct.title || '')}</span>
        <span class="cc-year">${esc(ct.year || '')}</span>
      </div>
      <div class="cv-cert-detail">${esc(ct.detail || '')}</div>
    </div>
  `).join('');
  return `
    <section class="cv-sec" id="research" data-sec="research" style="--sec-acc:${c.accent};--sec-acc2:${c.accent2};">
      ${header('research', c)}
      <h4 class="cv-h4">Papers & patents</h4>
      <div class="cv-papers">${papers}</div>
      <h4 class="cv-h4">Certifications & continuing education</h4>
      <div class="cv-certs">${certs}</div>
    </section>
  `;
}

// ─── SKILLS ────────────────────────────────────────────────
function renderSkills() {
  const c = ROSTER.find(r => r.id === 'skills');
  const s = SECTIONS.skills;
  const cats = (s.categories || []).map(cat => {
    const max = Math.max(...cat.items.map(i => i.yrs), 1);
    const rows = cat.items.map(it => {
      const pct = Math.min(100, (it.yrs / max) * 100);
      return `
        <div class="cv-sk-row">
          <span class="cs-n">${esc(it.n)}</span>
          <span class="cs-bar"><span class="cs-fill" style="width:${pct}%;"></span></span>
          <span class="cs-y">${esc(it.yrs)}y</span>
          <span class="cs-note">${esc(it.note || '')}</span>
        </div>
      `;
    }).join('');
    return `
      <div class="cv-sk-cat">
        <h4 class="cv-h4">${esc(cat.name)}</h4>
        <div class="cv-sk-rows">${rows}</div>
      </div>
    `;
  }).join('');
  return `
    <section class="cv-sec" id="skills" data-sec="skills" style="--sec-acc:${c.accent};--sec-acc2:${c.accent2};">
      ${header('skills', c)}
      ${cats}
    </section>
  `;
}

// ─── TIMELINE ──────────────────────────────────────────────
function shortTag(tag) {
  // Trim a few too-long tags so they fit in their chip column
  const map = {
    'MENTAL MATH': 'MATH',
    'WORLD SCHOLAR': 'DEBATE',
    'SCHOLARS CUP': 'DEBATE'
  };
  return map[tag] || tag;
}
function renderTimeline() {
  const c = ROSTER.find(r => r.id === 'timeline');
  const s = SECTIONS.timeline;
  const events = (s.events || []).map(e => `
    <div class="cv-tl-row">
      <span class="cv-tl-date">${esc(e.date)}</span>
      <span class="cv-tl-tag">${esc(shortTag(e.tag))}</span>
      <span class="cv-tl-body">${esc(e.body)}</span>
    </div>
  `).join('');
  return `
    <section class="cv-sec" id="timeline" data-sec="timeline" style="--sec-acc:${c.accent};--sec-acc2:${c.accent2};">
      ${header('timeline', c)}
      <div class="cv-tl">${events}</div>
    </section>
  `;
}

// ─── AFFILIATIONS ──────────────────────────────────────────
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
function renderAffiliations() {
  const c = ROSTER.find(r => r.id === 'affiliations');
  const s = SECTIONS.affiliations;
  const tiles = (s.tiles || []).map(t => `
    <div class="cv-aff" style="--brand:${esc(t.brand)};--brand-text:${esc(t.text)};">
      <div class="cv-aff-logo">${esc(brandLogo(t.n))}</div>
      <div class="cv-aff-n">${esc(t.n)}</div>
    </div>
  `).join('');
  return `
    <section class="cv-sec" id="affiliations" data-sec="affiliations" style="--sec-acc:${c.accent};--sec-acc2:${c.accent2};">
      ${header('affiliations', c)}
      <div class="cv-aff-grid">${tiles}</div>
    </section>
  `;
}

// ─── PERSONAL ──────────────────────────────────────────────
function renderPersonal() {
  const c = ROSTER.find(r => r.id === 'personal');
  const s = SECTIONS.personal;
  const geo = (s.geography || []).map(g => `
    <div class="cv-geo" style="--g1:${esc(g.c1)};--g2:${esc(g.c2)};">
      <span class="cg-flag">${esc(g.flag)}</span>
      <div class="cg-c">${esc(g.country)}</div>
      <div class="cg-y">${esc(g.years)}</div>
      <div class="cg-n">${esc(g.note || '')}</div>
    </div>
  `).join('');
  const ranks = (s.gameranks || []).map(r => `
    <div class="cv-rank" style="--rc:${esc(r.c)};">
      <span class="cr-g">${esc(r.g)}</span>
      <span class="cr-r">${esc(r.r)}</span>
    </div>
  `).join('');
  const teams = (s.teams || []).map(t => `
    <div class="cv-team" style="--tc:${esc(t.c)};">
      <span class="ct-s">${esc(t.sport)}</span>
      <span class="ct-t">${esc(t.team)}</span>
    </div>
  `).join('');
  const stories = (s.stories || []).map(st => `
    <div class="cv-story">
      <h4 class="cs-t">${esc(st.t)}</h4>
      <p class="cs-d">${esc(st.d)}</p>
    </div>
  `).join('');
  const lifestyle = (s.lifestyle || []).map(l => `<li>${esc(l)}</li>`).join('');

  return `
    <section class="cv-sec" id="personal" data-sec="personal" style="--sec-acc:${c.accent};--sec-acc2:${c.accent2};">
      ${header('personal', c)}
      <h4 class="cv-h4">Where I've lived</h4>
      <div class="cv-geo-grid">${geo}</div>
      <h4 class="cv-h4">Game ranks</h4>
      <div class="cv-rank-grid">${ranks}</div>
      <h4 class="cv-h4">Teams I follow</h4>
      <div class="cv-team-row">${teams}</div>
      <h4 class="cv-h4">Stories</h4>
      <div class="cv-story-list">${stories}</div>
      <h4 class="cv-h4">Currently</h4>
      <ul class="cv-lifestyle">${lifestyle}</ul>
    </section>
  `;
}

// ─── ASTAKERIA (kept short for resume mode — recruiters can click into the main site) ─
function renderAstakeria() {
  const c = ROSTER.find(r => r.id === 'astakeria');
  const s = SECTIONS.astakeria;
  return `
    <section class="cv-sec" id="astakeria" data-sec="astakeria" style="--sec-acc:${c.accent};--sec-acc2:${c.accent2};">
      ${header('astakeria', c)}
      <p class="cv-ast-hook">${esc(s.hook || '')}</p>
      <div class="cv-ast-lore">
        ${(s.lore || []).slice(0, 2).map(p => `<p>${esc(p)}</p>`).join('')}
      </div>
      ${s.pillars && s.pillars.length ? `
        <h4 class="cv-h4">Pillars</h4>
        <div class="cv-ast-pillars">
          ${s.pillars.map(p => `
            <div class="cv-ast-pillar">
              <span class="cap-n">${esc(p.n)}</span>
              <span class="cap-d">${esc(p.d)}</span>
            </div>
          `).join('')}
        </div>
      ` : ''}
      <a class="cv-ast-cta" href="index.html#astakeria">▸ Read the full lore in interactive mode</a>
    </section>
  `;
}

// ─── render dispatcher ─────────────────────────────────────
const RENDERERS = {
  home: renderHome, labs: renderLabs, capstone: renderCapstone,
  projects: renderProjects, research: renderResearch, skills: renderSkills,
  timeline: renderTimeline, affiliations: renderAffiliations,
  personal: renderPersonal, astakeria: renderAstakeria
};

function renderAll() {
  renderNav();
  const out = navOrder.map(id => RENDERERS[id]?.()).filter(Boolean).join('');
  document.getElementById('cv-sections').innerHTML = out;
}

// ─── scroll-spy: highlight nav item for current section ────
function setupScrollSpy() {
  const navItems = Array.from(document.querySelectorAll('.cv-nav-item'));
  const sections = ['hero', ...navOrder].map(id => document.getElementById(id)).filter(Boolean);
  if (!sections.length) return;

  const setActive = (id) => {
    navItems.forEach(el => el.classList.toggle('active', el.dataset.target === id));
  };

  // IntersectionObserver picks the most visible section
  const obs = new IntersectionObserver((entries) => {
    // pick the entry with the highest intersection ratio that's in view
    let best = null;
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      if (!best || e.intersectionRatio > best.intersectionRatio) best = e;
    }
    if (best) setActive(best.target.id);
  }, {
    rootMargin: '-30% 0px -55% 0px',
    threshold: [0, 0.2, 0.5, 0.8, 1]
  });

  sections.forEach(s => obs.observe(s));

  // smooth scroll on nav click + immediate highlight
  navItems.forEach(item => {
    item.addEventListener('click', e => {
      e.preventDefault();
      const id = item.dataset.target;
      const el = document.getElementById(id);
      if (!el) return;
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActive(id);
    });
  });

  setActive('hero');
}

// ─── subtle WebGL ambient bg ───────────────────────────────
function setupAmbientBg() {
  const canvas = document.getElementById('cv-bg');
  if (!canvas) return;
  const gl = canvas.getContext('webgl', { antialias: false, alpha: true });
  if (!gl) { canvas.style.display = 'none'; return; }

  const VS = `
    attribute vec2 a_pos;
    varying vec2 v_uv;
    void main() { v_uv = a_pos * 0.5 + 0.5; gl_Position = vec4(a_pos, 0.0, 1.0); }
  `;
  const FS = `
    precision mediump float;
    varying vec2 v_uv;
    uniform float u_time;
    uniform vec2 u_res;
    float hash(vec2 p) { p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
    float noise(vec2 p) {
      vec2 i = floor(p); vec2 f = fract(p);
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(mix(hash(i), hash(i+vec2(1,0)), u.x),
                 mix(hash(i+vec2(0,1)), hash(i+vec2(1,1)), u.x), u.y);
    }
    void main() {
      vec2 uv = v_uv;
      vec2 p = uv - 0.5;
      p.x *= u_res.x / u_res.y;
      vec2 q = p * 1.2 + vec2(u_time * 0.012, sin(u_time * 0.04) * 0.06);
      float n = noise(q * 1.4) * 0.5 + noise(q * 2.8) * 0.25;
      vec3 col = vec3(0.04, 0.05, 0.07);
      col += vec3(0.06, 0.05, 0.02) * n;
      col += vec3(0.02, 0.03, 0.06) * (1.0 - smoothstep(0.0, 0.7, length(p)));
      gl_FragColor = vec4(col, 1.0);
    }
  `;
  function compile(type, src) {
    const sh = gl.createShader(type);
    gl.shaderSource(sh, src);
    gl.compileShader(sh);
    return sh;
  }
  const prog = gl.createProgram();
  gl.attachShader(prog, compile(gl.VERTEX_SHADER, VS));
  gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FS));
  gl.linkProgram(prog);
  gl.useProgram(prog);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, -1,1, 1,-1, 1,1]), gl.STATIC_DRAW);
  const aPos = gl.getAttribLocation(prog, 'a_pos');
  gl.enableVertexAttribArray(aPos);
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

  const uTime = gl.getUniformLocation(prog, 'u_time');
  const uRes  = gl.getUniformLocation(prog, 'u_res');

  function resize() {
    const dpr = Math.min(window.devicePixelRatio, 1.5);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    gl.viewport(0, 0, canvas.width, canvas.height);
  }
  resize();
  window.addEventListener('resize', resize);

  let t = 0, last = performance.now();
  function frame(now) {
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now; t += dt;
    gl.uniform1f(uTime, t);
    gl.uniform2f(uRes, canvas.width, canvas.height);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

// ─── init ──────────────────────────────────────────────────
renderAll();
setupScrollSpy();
setupAmbientBg();

// reveal sections on scroll (subtle)
const reveal = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('cv-in');
      reveal.unobserve(e.target);
    }
  });
}, { rootMargin: '0px 0px -10% 0px', threshold: 0.05 });
document.querySelectorAll('.cv-sec, .cv-hero').forEach(el => reveal.observe(el));
