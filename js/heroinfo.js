// ============================================================
//  HERO INFO SCREEN (v12)
//  Overwatch Hero Info look, laid out per hero from HERO_INFO.
//  Fits the screen height on desktop: no page scrolling. Every
//  item with `more` opens a details popup built from data.js,
//  so the long-form content lives one click away, not below.
// ============================================================

import { HERO_INFO } from './heroinfo-data.js';
import { LINKS, SECTIONS as S } from './data.js';

// ---- helpers ------------------------------------------------
const tidy = (v = '') => String(v).replace(/\s*·\s*/g, ', ').replace(/,\s*,/g, ',');
const esc = (v = '') => tidy(v).replace(/[&<>"]/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]));
const icon = (name, cls) => `<svg class="${cls}" aria-hidden="true"><use href="#gi-${name}"/></svg>`;
const arr = v => (Array.isArray(v) ? v : v ? [v] : []);
const hrefOf = h => (h === 'resume' ? LINKS.resume : h);
const external = h => /^https?:/.test(h);

// Sizes scale with viewport height so the page fits without scrolling.
const T = {
  title: 'font-hi-head italic font-extrabold uppercase leading-none text-white text-[clamp(34px,5.4vh,62px)]',
  h2: 'font-hi-head italic font-extrabold uppercase leading-none hi-head-fill text-[clamp(24px,3.3vh,42px)]',
  name: 'uppercase font-semibold leading-tight text-hi-name text-[clamp(13px,1.55vh,18px)]',
  desc: 'text-hi-bone leading-snug text-[clamp(12.5px,1.42vh,16px)]',
  fact: 'text-hi-dim leading-snug text-[clamp(11.5px,1.28vh,14.5px)]',
  tile: 'w-[clamp(42px,5.4vh,62px)] h-[clamp(42px,5.4vh,62px)]',
  tileIcon: 'w-[clamp(26px,3.3vh,38px)] h-[clamp(26px,3.3vh,38px)]',
  gap: 'gap-[clamp(10px,1.6vh,22px)]',
  focus: 'focus-visible:outline-2 focus-visible:outline-hi-key focus-visible:outline-offset-4'
};

const ROLE_ICONS = {
  support: '<circle cx="12" cy="12" r="10.5" fill="none" stroke="currentColor" stroke-width="2"/><path d="M10 6h4v4h4v4h-4v4h-4v-4H6v-4h4z" fill="currentColor"/>',
  tank: '<path d="M12 1.5 21 5v6.5c0 5.4-3.8 9.6-9 11-5.2-1.4-9-5.6-9-11V5z" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 6 17 8v4c0 3-2 5.4-5 6.4z" fill="currentColor"/>',
  damage: '<circle cx="12" cy="12" r="7" fill="none" stroke="currentColor" stroke-width="2"/><path d="M11 1h2v7h-2zm0 15h2v7h-2zM1 11h7v2H1zm15 0h7v2h-7z" fill="currentColor"/><circle cx="12" cy="12" r="2" fill="currentColor"/>'
};

const MOUSE = { LMB: '<path d="M10 1a9 9 0 0 0-9 9v2h9z" fill="#070d18"/>', RMB: '<path d="M10 1a9 9 0 0 1 9 9v2h-9z" fill="#070d18"/>' };
function keybind(key, cls) {
  if (!key) return '';
  if (MOUSE[key]) return `<svg class="${cls} w-4 h-6" viewBox="0 0 20 28" aria-hidden="true"><rect x="1" y="1" width="18" height="26" rx="9" fill="#fff" stroke="#070d18" stroke-width="1.5"/>${MOUSE[key]}</svg>`;
  return `<kbd class="${cls} font-hi-body bg-hi-key text-hi-ink font-bold leading-5 px-1.5 ${key.length > 1 ? 'text-[10px]' : 'text-xs'}">${esc(key)}</kbd>`;
}

// ---- item text ---------------------------------------------
function textBlock(it) {
  const facts = arr(it.facts).map(f => {
    const [k, ...rest] = String(f).split(': ');
    return `<li class="${T.fact}">${rest.length ? `<span class="text-hi-bone/80">${esc(k)}:</span> ${esc(rest.join(': '))}` : esc(f)}</li>`;
  }).join('');
  return `
    <p class="${T.name}">${esc(it.name)}</p>
    ${it.desc ? `<p class="${T.desc} mt-0.5">${esc(it.desc)}</p>` : ''}
    ${it.shipped ? `<p class="${T.desc} mt-1"><span class="text-hi-result">Shipped:</span> ${esc(it.shipped)}</p>` : ''}
    ${facts ? `<ul class="mt-1 space-y-0.5 list-disc pl-4 marker:text-hi-dim">${facts}</ul>` : ''}`;
}

// Wrap a row so it opens the popup, follows a link, or stays static.
let moreRegistry = [];
function wrap(it, inner, rowCls) {
  const base = `${rowCls} w-full text-left rounded-sm ${T.focus}`;
  if (it.more) {
    const id = moreRegistry.push(it.more) - 1;
    return `<button type="button" data-more="${id}" class="${base} group cursor-pointer hover:bg-white/[0.06] transition-colors">${inner}<span class="sr-only"> (open details)</span></button>`;
  }
  if (it.href) {
    const h = hrefOf(it.href);
    return `<a href="${esc(h)}" ${external(h) || h === LINKS.resume ? 'target="_blank" rel="noopener"' : ''} class="${base} block hover:bg-white/[0.06] transition-colors">${inner}</a>`;
  }
  return `<div class="${base}">${inner}</div>`;
}

const moreDot = it => (it.more ? `<span class="ml-1 align-middle text-hi-key opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity text-xs" aria-hidden="true">&#9656; more</span>` : '');

// ---- blocks ------------------------------------------------
function blockStats(b) {
  const pips = b.difficulty ? `
    <div class="flex items-center gap-1 mt-1.5" role="img" aria-label="Difficulty ${b.difficulty} of 3">
      ${[1, 2, 3].map(n => `<span class="h-4 w-7 ${n <= b.difficulty ? 'bg-hi-bone' : 'bg-white/15'}"></span>`).join('')}
      <span class="ml-2 ${T.fact} text-hi-bone">Difficulty</span>
    </div>` : '';
  const stats = arr(b.stats).map(s => `
    <div class="flex items-center gap-1.5"><dt class="sr-only">${esc(s.label)}</dt>${icon(s.icon, 'w-4 h-4 text-hi-name shrink-0')}<dd class="${T.desc} font-semibold whitespace-nowrap">${esc(s.value)}</dd></div>`).join('');
  return `
    <div class="flex ${T.gap} items-center">
      <div class="shrink-0 w-[clamp(54px,7vh,84px)] h-[clamp(62px,8vh,96px)] grid place-items-center text-white bg-[var(--screen-acc)] [clip-path:polygon(50%_0,100%_25%,100%_75%,50%_100%,0_75%,0_25%)]">
        ${icon(b.portrait, 'w-[55%] h-[55%] drop-shadow')}
      </div>
      <div class="min-w-0">
        <p class="${T.name}">Stats</p>
        ${pips}
        <dl class="flex flex-wrap gap-x-4 gap-y-1 mt-1">${stats}</dl>
      </div>
    </div>`;
}

function blockWeapon(b) {
  return arr(b.items).map(it => wrap(it, `
    <div class="flex ${T.gap} items-start">
      <div class="shrink-0 w-[clamp(54px,7vh,84px)] grid justify-items-center gap-1 pt-0.5">
        ${icon(it.icon, 'w-[clamp(34px,4.6vh,54px)] h-[clamp(34px,4.6vh,54px)] text-hi-bone')}
        ${keybind(it.key, '')}
      </div>
      <div class="min-w-0">${textBlock(it)}${moreDot(it)}</div>
    </div>`, 'p-1.5 -m-1.5')).join('');
}

function blockTile(b) {
  return arr(b.items).map(it => wrap(it, `
    <div class="flex ${T.gap} items-start">
      <div class="relative shrink-0 ${T.tile} bg-hi-bone text-hi-ink grid place-items-center">
        ${icon(it.icon, T.tileIcon)}
        ${keybind(it.key, 'absolute left-1/2 -translate-x-1/2 -bottom-2.5')}
      </div>
      <div class="min-w-0">${textBlock(it)}${moreDot(it)}</div>
    </div>`, 'p-1.5 -m-1.5')).join('');
}

function blockCircle(b) {
  return arr(b.items).map(it => wrap(it, `
    <div class="flex gap-3 items-start">
      <div class="shrink-0 w-[clamp(32px,4.2vh,46px)] h-[clamp(32px,4.2vh,46px)] rounded-full bg-white/10 ring-1 ring-white/25 grid place-items-center text-hi-bone">
        ${icon(it.icon, 'w-[60%] h-[60%]')}
      </div>
      <div class="min-w-0">
        <p class="uppercase font-semibold leading-tight text-hi-bone text-[clamp(12.5px,1.45vh,17px)]">${esc(it.name)}${moreDot(it)}</p>
        ${it.desc ? `<p class="${T.fact}">${esc(it.desc)}</p>` : ''}
      </div>
    </div>`, 'p-1 -m-1')).join('');
}

function blockUlt(b) {
  return arr(b.items).map(it => wrap(it, `
    <div class="flex ${T.gap} items-start">
      <div class="relative shrink-0 mt-1">
        <div class="hi-ult w-[clamp(54px,7vh,84px)] h-[clamp(54px,7vh,84px)] rounded-full bg-hi-bone text-hi-ink grid place-items-center">${icon(it.icon, 'w-[58%] h-[58%]')}</div>
        ${keybind('Q', 'absolute left-1/2 -translate-x-1/2 -bottom-2.5')}
      </div>
      <div class="min-w-0 pt-1">${textBlock(it)}${moreDot(it)}</div>
    </div>`, 'p-1.5 -m-1.5')).join('');
}

function blockButton(b) {
  return arr(b.items).map(it => {
    const id = moreRegistry.push(it.more) - 1;
    return `<button type="button" data-more="${id}" class="border border-white/50 px-4 py-2 uppercase font-semibold tracking-wide text-hi-bone text-[clamp(12px,1.35vh,15px)] hover:bg-white hover:text-hi-ink ${T.focus}">${esc(it.name)}</button>`;
  }).join('');
}

const BLOCKS = { stats: blockStats, weapon: blockWeapon, tile: blockTile, circle: blockCircle, ult: blockUlt, button: blockButton };
const BODY_GAP = { stats: T.gap, weapon: T.gap, tile: 'gap-[clamp(12px,2vh,26px)]', circle: 'gap-[clamp(6px,1.1vh,14px)]', ult: T.gap, button: 'gap-3' };

function renderColumn(blocks) {
  return `<div class="min-h-0 flex flex-col ${T.gap} lg:overflow-y-auto hi-col pr-1">
    ${blocks.map(b => `
      <section class="flex flex-col">
        ${b.h ? `<h2 class="${T.h2} mb-[clamp(6px,1.2vh,14px)]">${esc(b.h)}</h2>` : ''}
        <div class="flex ${b.style === 'button' ? 'flex-row flex-wrap' : 'flex-col'} ${BODY_GAP[b.style] || T.gap}">${(BLOCKS[b.style] || blockTile)(b)}</div>
      </section>`).join('')}
  </div>`;
}

function actionButton(info, hero) {
  let label = null, href = null;
  if (info.action === 'resume') { label = 'View resume'; href = LINKS.resume; }
  else if (info.action) { label = info.action.label; href = info.action.url; }
  else if (hero.play_url && hero.id !== 'soon') { label = (hero.play_label || 'Open').toLowerCase(); href = hero.play_url; }
  if (!href) return '';
  return `<a class="shrink-0 border-2 border-white/80 bg-hi-ink/60 px-5 py-2 text-[clamp(12px,1.4vh,16px)] font-semibold uppercase text-hi-bone hover:bg-white hover:text-hi-ink ${T.focus}" href="${esc(href)}" target="_blank" rel="noopener">${esc(label)}</a>`;
}

// ---- screen ------------------------------------------------
export function renderHeroInfo(hero) {
  const info = HERO_INFO[hero.id];
  if (!info) return '';
  moreRegistry = [];
  const cols = info.cols.map(renderColumn).join('');
  return `
    <article class="hero-info lg:h-full min-h-full flex flex-col font-hi-body text-hi-bone bg-hi-ink/50" style="--screen-acc:${hero.accent};--screen-acc2:${hero.accent2};">
      <header class="flex items-end justify-between gap-6 px-5 lg:px-12 pt-[clamp(10px,2vh,24px)] pb-[clamp(8px,1.4vh,16px)] border-b border-white/20">
        <div class="min-w-0 flex items-end gap-4">
          <h1 class="${T.title}">${esc(info.title)}</h1>
          <svg class="w-[clamp(22px,2.8vh,32px)] h-[clamp(22px,2.8vh,32px)] mb-1 text-white shrink-0" viewBox="0 0 24 24" role="img" aria-label="${info.role} role">${ROLE_ICONS[info.role] || ''}</svg>
          <p class="hidden md:block ${T.desc} text-hi-dim max-w-[62ch] mb-1">${esc(info.tagline || '')}</p>
        </div>
        ${actionButton(info, hero)}
      </header>

      <div class="flex-1 min-h-0 grid gap-10 lg:grid-cols-3 lg:gap-[clamp(20px,3vw,56px)] px-5 lg:px-12 pt-[clamp(10px,2vh,26px)] pb-2">
        ${cols}
      </div>

      <footer class="flex items-center justify-between gap-4 px-5 lg:px-12 py-[clamp(6px,1.2vh,14px)]">
        <button type="button" data-close-detail class="flex items-center gap-2 text-[clamp(12px,1.4vh,16px)] font-semibold uppercase text-hi-bone hover:text-white ${T.focus}">
          <kbd class="font-hi-body text-xs border border-white/40 px-1.5 py-0.5">ESC</kbd>Back
        </button>
        <p class="hidden sm:flex items-center gap-2 text-[clamp(11px,1.3vh,14px)] font-semibold uppercase text-hi-dim">Select any item for details
          <svg class="w-4 h-4" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="11" fill="currentColor"/><path d="M11 10h2v8h-2zm0-4h2v2h-2z" fill="#070d18"/></svg>
        </p>
      </footer>
    </article>`;
}

// ---- details popup -----------------------------------------
const find = (list, key, val) => arr(list).find(x => String(x[key]).toUpperCase() === String(val).toUpperCase());
const pairs = obj => Object.entries(obj || {}).filter(([, v]) => v && typeof v !== 'object').map(([k, v]) => ({ n: k.replace(/([A-Z])/g, ' $1'), d: v }));

function resolve(m) {
  if (m.job) {
    const j = find(S.experience.jobs, 'org', m.job); if (!j) return null;
    return { title: j.org, meta: [j.title, j.place, j.date].filter(Boolean).join(', '), bullets: j.bullets, tags: j.tags };
  }
  if (m.lab) {
    const l = find(S.labs.labs, 'key', m.lab); if (!l) return null;
    return { title: l.name, meta: [l.pi, l.status].filter(Boolean).join('. '), paras: [...arr(l.story), l.funding].filter(Boolean),
      groups: [{ h: 'Work', items: arr(l.subprojects) }], tags: l.proof, links: arr(l.links) };
  }
  if (m.project) {
    const p = find(S.projects.items, 'title', m.project); if (!p) return null;
    return { title: p.title, meta: [p.tag, p.year].filter(Boolean).join(', '), paras: [p.body, p.proof].filter(Boolean), tags: p.tech,
      links: p.url ? [{ label: 'Open project', url: p.url }] : [] };
  }
  if (m.paper) {
    const p = find(S.research.papers, 'title', m.paper); if (!p) return null;
    return { title: p.title, meta: [p.status, p.venue, p.year].filter(v => v && v !== 'undefined').join(', '), paras: [p.blurb],
      links: p.url ? [{ label: 'Open', url: p.url }] : [] };
  }
  if (m.cert) { const c = find(S.research.certifications, 'title', m.cert); return c && { title: c.title, meta: c.year, paras: [c.detail] }; }
  if (m.story) { const s = find(S.personal.stories, 't', m.story); return s && { title: s.t, paras: [s.d] }; }
  if (m.skill) { const c = find(S.skills.resume, 'name', m.skill); return c && { title: c.name, tags: c.items }; }
  if (m.hero) { const h = find(S.astakeria.heroes, 'name', m.hero); return h && { title: h.name, meta: h.role, paras: [h.tagline, h.mechanic] }; }
  if (m.doc !== undefined) { const d = arr(S.astakeria.documents)[m.doc]; return d && { title: d.title, meta: d.pages, paras: [d.desc] }; }
  if (m.ast === 'scope') return { title: S.astakeria.subtitle || 'Astakeria', paras: [S.astakeria.hook].filter(Boolean), groups: [{ h: 'Scope', items: pairs(S.astakeria.scope) }] };
  if (m.ast === 'entropy') {
    const e = S.astakeria.entropy || {};
    return { title: 'The Entropy system', paras: [e.desc], groups: [{ h: 'Tiers', items: arr(e.tiers).map(t => ({ n: `${t.label} (${t.range})`, d: t.effect })) }] };
  }
  if (m.pillars) return { title: 'Design pillars', groups: [{ items: arr(S.astakeria.pillars) }] };
  if (m.cap === 'clinical') return { title: 'Clinical design', groups: [{ items: pairs(S.capstone.clinical) }] };
  if (m.cap === 'architecture') return { title: 'System architecture', meta: 'Sense, detect, stream, log, report', groups: [{ items: arr(S.capstone.architecture).map(a => ({ n: `${a.stage}${a.chip ? `, ${a.chip}` : ''}`, d: a.text })) }] };
  if (m.cap === 'app') {
    const a = S.capstone.app || {};
    return { title: a.name || 'TremorMonitor app', meta: a.platform, paras: [a.description], groups: [{ h: 'Modules', items: arr(a.modules) }],
      links: arr(S.capstone.links) };
  }
  if (m.home === 'bio') return { title: 'Hamza Abu Khalaf Al Takrouri', paras: arr(S.home.bio), groups: [{ h: 'Quick facts', items: arr(S.home.quickfacts).map(q => ({ n: q.k, d: q.v })) }] };
  if (m.timeline === 'all') return { title: 'Full timeline', groups: [{ items: arr(S.timeline.events).map(e => ({ n: `${e.date}, ${e.tag}`, d: e.body })) }] };
  if (m.teams) return { title: 'Favorite teams', groups: [{ items: arr(S.personal.teams).map(t => ({ n: t.sport, d: t.team })) }] };
  return null;
}

function popupHTML(d) {
  const paras = arr(d.paras).filter(Boolean).map(p => `<p class="text-hi-bone leading-relaxed">${esc(p)}</p>`).join('');
  const bullets = arr(d.bullets).length ? `<ul class="list-disc pl-5 space-y-1.5 marker:text-hi-name text-hi-bone leading-relaxed">${arr(d.bullets).map(b => `<li>${esc(b)}</li>`).join('')}</ul>` : '';
  const groups = arr(d.groups).filter(g => arr(g.items).length).map(g => `
    <div>
      ${g.h ? `<h3 class="font-hi-head italic font-extrabold uppercase text-2xl hi-head-fill mb-2">${esc(g.h)}</h3>` : ''}
      <dl class="space-y-2.5">${arr(g.items).map(x => typeof x === 'string'
        ? `<dd class="text-hi-bone">${esc(x)}</dd>`
        : `<div><dt class="uppercase font-semibold text-hi-name text-sm">${esc(x.n || x.name || x.title || '')}</dt><dd class="text-hi-bone leading-relaxed">${esc(x.d || x.desc || x.text || '')}</dd></div>`).join('')}</dl>
    </div>`).join('');
  const tags = arr(d.tags).length ? `<ul class="flex flex-wrap gap-1.5">${arr(d.tags).map(t => `<li class="border border-white/25 px-2 py-0.5 text-sm text-hi-bone">${esc(t)}</li>`).join('')}</ul>` : '';
  const links = arr(d.links).filter(l => l && l.url).map(l => `<a class="border-2 border-white/80 px-4 py-2 uppercase font-semibold text-sm text-hi-bone hover:bg-white hover:text-hi-ink ${T.focus}" href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label || 'Open')}</a>`).join('');
  return `
    <div class="hi-pop fixed inset-0 z-[90] grid place-items-center bg-black/65 p-4" data-pop-backdrop>
      <div role="dialog" aria-modal="true" aria-labelledby="hi-pop-title" class="relative w-[min(760px,94vw)] max-h-[84vh] flex flex-col bg-[#0b1526]/97 border border-white/15 shadow-2xl font-hi-body">
        <div class="flex items-start justify-between gap-4 px-6 pt-5 pb-4 border-b border-white/15 bg-[#0b1a33]">
          <div class="min-w-0">
            <h2 id="hi-pop-title" class="font-hi-head italic font-extrabold uppercase text-4xl leading-none text-white">${esc(d.title)}</h2>
            ${d.meta ? `<p class="mt-1.5 text-hi-dim">${esc(d.meta)}</p>` : ''}
          </div>
          <button type="button" data-pop-close class="shrink-0 flex items-center gap-2 uppercase font-semibold text-sm text-hi-bone hover:text-white ${T.focus}"><kbd class="font-hi-body text-xs border border-white/40 px-1.5 py-0.5">ESC</kbd>Close</button>
        </div>
        <div class="overflow-y-auto hi-col px-6 py-5 space-y-5 text-[15px]">${paras}${bullets}${groups}${tags}</div>
        ${links ? `<div class="flex flex-wrap gap-3 px-6 py-4 border-t border-white/15">${links}</div>` : ''}
      </div>
    </div>`;
}

let popState = null;
function closePopup() {
  if (!popState) return;
  popState.el.remove();
  window.removeEventListener('keydown', popState.onKey, true);
  popState.opener?.focus();
  popState = null;
}

function openPopup(more, opener) {
  const d = resolve(more);
  if (!d) return;
  closePopup();
  document.body.insertAdjacentHTML('beforeend', popupHTML(d));
  const el = document.body.lastElementChild;
  const dialog = el.querySelector('[role="dialog"]');
  const onKey = e => {
    if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); closePopup(); return; }
    if (e.key === 'Backspace') { e.stopPropagation(); return; }
    if (e.key === 'Tab') {
      const f = [...dialog.querySelectorAll('a[href],button')];
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  };
  window.addEventListener('keydown', onKey, true);
  el.addEventListener('click', e => { if (e.target === el) closePopup(); });
  el.querySelector('[data-pop-close]').addEventListener('click', closePopup);
  popState = { el, onKey, opener };
  el.querySelector('[data-pop-close]').focus();
}

export function setupHeroInfo(root) {
  const registry = moreRegistry;
  root.querySelectorAll('.hero-info [data-more]').forEach(btn => {
    btn.addEventListener('click', () => openPopup(registry[Number(btn.dataset.more)], btn));
  });
}

export function closeHeroInfoPopup() { closePopup(); }
export { resolve as resolveMore };
