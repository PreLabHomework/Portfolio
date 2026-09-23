// ============================================================
//  HERO INFO SCREEN (v13)
//  Overwatch Hero Info look, laid out per hero from HERO_INFO.
//  Sized to the screen height on desktop: nothing scrolls.
//  Items with `more` open a details popup built from data.js:
//  What it is, What I did, Skills I learned, Links.
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
const ACC = 'var(--screen-acc)';

const T = {
  title: 'font-hi-head italic font-extrabold uppercase leading-[0.9] text-white text-[clamp(34px,5.2vh,60px)]',
  h2: 'font-hi-head italic font-extrabold uppercase leading-none hi-head-fill text-[clamp(24px,3.2vh,40px)]',
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
    return `<li class="${T.fact}">${rest.length ? `<span class="text-hi-bone/85">${esc(k)}:</span> ${esc(rest.join(': '))}` : esc(f)}</li>`;
  }).join('');
  return `
    <p class="${T.name}">${esc(it.name)}${moreHint(it)}</p>
    ${it.desc ? `<p class="${T.desc} mt-0.5">${esc(it.desc)}</p>` : ''}
    ${it.shipped ? `<p class="${T.desc} mt-1"><span class="text-hi-result">Shipped:</span> ${esc(it.shipped)}</p>` : ''}
    ${facts ? `<ul class="mt-1 space-y-0.5 list-disc pl-4 marker:text-[var(--screen-acc)]">${facts}</ul>` : ''}`;
}

const moreHint = it => (it.more ? `<span class="ml-2 align-middle text-[10px] font-bold tracking-wide text-hi-ink bg-[var(--screen-acc)] px-1.5 py-0.5 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity" aria-hidden="true">DETAILS</span>` : '');

// Rows: popup trigger, link, or static. Hover draws the hero-colored border.
let moreRegistry = [];
const HOVER = 'hover:bg-white/[0.06] hover:outline hover:outline-1 hover:outline-[var(--screen-acc)] hover:shadow-[0_0_18px_-6px_var(--screen-acc)] transition-[background-color,box-shadow]';
function wrap(it, inner, pad) {
  const base = `${pad} w-full text-left ${T.focus}`;
  if (it.more) {
    const id = moreRegistry.push(it.more) - 1;
    return `<button type="button" data-more="${id}" class="${base} group cursor-pointer ${HOVER}">${inner}<span class="sr-only"> (open details)</span></button>`;
  }
  if (it.href) {
    const h = hrefOf(it.href);
    return `<a href="${esc(h)}" ${external(h) || h === LINKS.resume ? 'target="_blank" rel="noopener"' : ''} class="${base} block group ${HOVER}">${inner}</a>`;
  }
  return `<div class="${base}">${inner}</div>`;
}

// ---- blocks ------------------------------------------------
function blockStats(b) {
  const pips = b.difficulty ? `
    <div class="flex items-center gap-1" role="img" aria-label="Difficulty ${b.difficulty} of 3">
      ${[1, 2, 3].map(n => `<span class="h-3.5 w-6 ${n <= b.difficulty ? 'bg-[var(--screen-acc)]' : 'bg-white/15'}"></span>`).join('')}
      <span class="ml-1.5 ${T.fact}">Difficulty</span>
    </div>` : '';
  const stats = arr(b.stats).map(s => `
    <div class="min-w-0 flex flex-col-reverse">
      <dt class="${T.fact} mt-0.5">${esc(s.label)}</dt>
      <dd class="flex items-center gap-1.5 font-semibold text-white text-[clamp(14px,1.75vh,20px)] leading-tight whitespace-nowrap">${icon(s.icon, 'w-4 h-4 shrink-0 text-[var(--screen-acc)]')}${esc(s.value)}</dd>
    </div>`).join('');
  return `
    <div class="flex ${T.gap} items-center">
      <div class="shrink-0 w-[clamp(54px,7vh,84px)] h-[clamp(62px,8vh,96px)] grid place-items-center text-white bg-[var(--screen-acc)] shadow-[0_0_30px_-8px_var(--screen-acc)] [clip-path:polygon(50%_0,100%_25%,100%_75%,50%_100%,0_75%,0_25%)]">
        ${icon(b.portrait, 'w-[55%] h-[55%] drop-shadow')}
      </div>
      <div class="min-w-0 flex-1 grid gap-y-[clamp(6px,1vh,12px)]">
        ${pips}
        <dl class="grid grid-cols-2 gap-x-5 gap-y-[clamp(6px,1vh,12px)]">${stats}</dl>
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
      <div class="min-w-0">${textBlock(it)}</div>
    </div>`, 'p-2 -m-2')).join('');
}

function blockTile(b) {
  return arr(b.items).map(it => wrap(it, `
    <div class="flex ${T.gap} items-start">
      <div class="relative shrink-0 ${T.tile} bg-hi-bone text-hi-ink grid place-items-center">
        ${icon(it.icon, T.tileIcon)}
        ${keybind(it.key, 'absolute left-1/2 -translate-x-1/2 -bottom-2.5')}
      </div>
      <div class="min-w-0">${textBlock(it)}</div>
    </div>`, 'p-2 -m-2')).join('');
}

function blockCircle(b) {
  return arr(b.items).map(it => wrap(it, `
    <div class="flex gap-3 items-start">
      <div class="shrink-0 w-[clamp(32px,4.2vh,46px)] h-[clamp(32px,4.2vh,46px)] rounded-full bg-white/10 ring-1 ring-[var(--screen-acc)]/60 grid place-items-center text-hi-bone">
        ${icon(it.icon, 'w-[60%] h-[60%]')}
      </div>
      <div class="min-w-0">
        <p class="uppercase font-semibold leading-tight text-hi-bone text-[clamp(12.5px,1.45vh,17px)]">${esc(it.name)}${moreHint(it)}</p>
        ${it.desc ? `<p class="${T.fact}">${esc(it.desc)}</p>` : ''}
      </div>
    </div>`, 'p-1.5 -m-1.5')).join('');
}

function blockUlt(b) {
  return arr(b.items).map(it => wrap(it, `
    <div class="flex ${T.gap} items-start">
      <div class="relative shrink-0 m-1.5">
        <div class="hi-ult w-[clamp(54px,7vh,84px)] h-[clamp(54px,7vh,84px)] rounded-full bg-hi-bone text-hi-ink grid place-items-center">${icon(it.icon, 'w-[58%] h-[58%]')}</div>
        ${keybind('Q', 'absolute left-1/2 -translate-x-1/2 -bottom-2.5')}
      </div>
      <div class="min-w-0 pt-1">${textBlock(it)}</div>
    </div>`, 'p-2 -m-2')).join('');
}

function blockButton(b) {
  return arr(b.items).map(it => {
    const id = moreRegistry.push(it.more) - 1;
    return `<button type="button" data-more="${id}" class="border border-white/50 px-4 py-2 uppercase font-semibold tracking-wide text-hi-bone text-[clamp(12px,1.35vh,15px)] hover:bg-[var(--screen-acc)] hover:text-hi-ink ${T.focus}">${esc(it.name)}</button>`;
  }).join('');
}

const BLOCKS = { stats: blockStats, weapon: blockWeapon, tile: blockTile, circle: blockCircle, ult: blockUlt, button: blockButton };
const BODY_GAP = { stats: T.gap, weapon: T.gap, tile: 'gap-[clamp(12px,2vh,26px)]', circle: 'gap-[clamp(6px,1.05vh,14px)]', ult: T.gap, button: 'gap-3' };

function renderColumn(blocks) {
  return `<div class="flex flex-col ${T.gap}">
    ${blocks.map(b => `
      <section class="flex flex-col">
        ${b.h ? `<h2 class="${T.h2} mb-[clamp(6px,1.2vh,14px)] flex items-center gap-3">${esc(b.h)}<span class="h-[3px] w-8 bg-[var(--screen-acc)] -skew-x-[20deg] translate-y-1" aria-hidden="true"></span></h2>` : ''}
        <div class="flex ${b.style === 'button' ? 'flex-row flex-wrap' : 'flex-col'} ${BODY_GAP[b.style] || T.gap}">${(BLOCKS[b.style] || blockTile)(b)}</div>
      </section>`).join('')}
  </div>`;
}

// Prominent action, styled like the Pro Mode / GitHub buttons in the top bar.
function actionButton(info) {
  const a = info.action === 'resume' ? { label: 'View resume', url: LINKS.resume } : info.action;
  if (!a) return '';
  const cls = `group/act shrink-0 inline-flex items-center gap-3 -skew-x-12 border border-white/35 border-l-4 border-l-[var(--screen-acc)] bg-[color-mix(in_srgb,var(--screen-acc)_22%,transparent)] px-6 py-2.5 shadow-[0_0_26px_-6px_var(--screen-acc)] hover:bg-[var(--screen-acc)] hover:text-hi-ink transition-colors ${T.focus}`;
  const inner = `<span class="skew-x-12 inline-flex items-center gap-3 font-hi-head italic font-extrabold uppercase leading-none tracking-wide text-[clamp(18px,2.3vh,28px)]">${esc(a.label)}<svg class="w-4 h-4 transition-transform group-hover/act:translate-x-1" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 11h10.2l-4.6-4.6L12 5l7 7-7 7-1.4-1.4 4.6-4.6H5z" fill="currentColor"/></svg></span>`;
  if (a.more) { const id = moreRegistry.push(a.more) - 1; return `<button type="button" data-more="${id}" class="${cls}">${inner}</button>`; }
  const h = hrefOf(a.url);
  return `<a class="${cls}" href="${esc(h)}" ${external(h) ? 'target="_blank" rel="noopener"' : ''}>${inner}</a>`;
}

// ---- screen ------------------------------------------------
export function renderHeroInfo(hero) {
  const info = HERO_INFO[hero.id];
  if (!info) return '';
  moreRegistry = [];
  const cols = info.cols.map(renderColumn).join('');
  const emblem = info.cols.flat().find(b => b.portrait)?.portrait || 'circuitry';
  return `
    <article class="hero-info relative isolate lg:h-full min-h-full flex flex-col font-hi-body text-hi-bone bg-hi-ink/55 overflow-hidden" style="--screen-acc:${hero.accent};--screen-acc2:${hero.accent2};">
      <div class="pointer-events-none absolute -z-10 inset-0 bg-[radial-gradient(ellipse_at_8%_0%,color-mix(in_srgb,var(--screen-acc)_26%,transparent),transparent_45%),radial-gradient(ellipse_at_100%_100%,color-mix(in_srgb,var(--screen-acc2)_16%,transparent),transparent_50%)]" aria-hidden="true"></div>
      ${icon(emblem, 'pointer-events-none absolute -z-10 right-[-4vh] bottom-[-6vh] w-[46vh] h-[46vh] text-[var(--screen-acc)] opacity-[0.07]')}

      <header class="relative flex items-end justify-between gap-6 px-5 lg:px-12 pt-[clamp(10px,1.8vh,22px)] pb-[clamp(8px,1.4vh,16px)]">
        <div class="min-w-0 flex items-end gap-5">
          <div class="min-w-0">
            <span class="inline-block -skew-x-12 bg-[var(--screen-acc)] px-2.5 py-0.5 mb-1.5"><span class="block skew-x-12 font-hi-body font-bold uppercase tracking-wide text-hi-ink text-[clamp(10px,1.2vh,13px)]">${esc(hero.codename)} / ${esc(hero.role)}</span></span>
            <div class="flex items-end gap-3">
              <h1 class="${T.title}">${esc(info.title)}</h1>
              <svg class="w-[clamp(22px,2.8vh,32px)] h-[clamp(22px,2.8vh,32px)] mb-1 text-white shrink-0" viewBox="0 0 24 24" role="img" aria-label="${info.role} role">${ROLE_ICONS[info.role] || ''}</svg>
            </div>
          </div>
          <p class="hidden md:block ${T.desc} text-hi-bone/80 max-w-[58ch] mb-1 pl-5 border-l-2 border-[var(--screen-acc)]">${esc(info.tagline || '')}</p>
        </div>
        ${actionButton(info)}
        <span class="absolute left-0 right-0 bottom-0 h-[2px] bg-[linear-gradient(90deg,var(--screen-acc),color-mix(in_srgb,var(--screen-acc)_30%,transparent)_40%,rgb(255_255_255/0.12))]" aria-hidden="true"></span>
      </header>

      <div class="flex-1 min-h-0 grid gap-10 lg:grid-cols-3 lg:gap-[clamp(20px,3vw,56px)] px-5 lg:px-12 pt-[clamp(12px,2.2vh,28px)] pb-2">
        ${cols}
      </div>

      <footer class="flex items-center justify-between gap-4 px-5 lg:px-12 py-[clamp(6px,1.2vh,14px)]">
        <button type="button" data-close-detail class="flex items-center gap-2 text-[clamp(12px,1.4vh,16px)] font-semibold uppercase text-hi-bone hover:text-white ${T.focus}">
          <kbd class="font-hi-body text-xs border border-white/40 px-1.5 py-0.5">ESC</kbd>Back
        </button>
        <p class="hidden sm:flex items-center gap-2 text-[clamp(11px,1.3vh,14px)] font-semibold uppercase text-hi-dim">Select any item for details
          <svg class="w-4 h-4 text-[var(--screen-acc)]" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="11" fill="currentColor"/><path d="M11 10h2v8h-2zm0-4h2v2h-2z" fill="#070d18"/></svg>
        </p>
      </footer>
    </article>`;
}

// ---- details popup: What it is / What I did / Skills I learned / Links ----
const find = (list, key, val) => arr(list).find(x => String(x[key]).toUpperCase() === String(val).toUpperCase());
const pairs = obj => Object.entries(obj || {}).filter(([, v]) => v && typeof v !== 'object').map(([k, v]) => ({ n: k.replace(/([A-Z])/g, ' $1'), d: v }));
const phrases = s => (s ? String(s).replace(/,? and /g, ', ').split(/,\s*/).map(x => x.trim()).filter(Boolean) : []);

function resolve(m) {
  if (m.job) {
    const j = find(S.experience.jobs, 'org', m.job); if (!j) return null;
    return { title: j.org, meta: [j.title, j.place, j.date].filter(Boolean).join(', '), what: [`${j.title}${j.place ? ` in ${j.place}` : ''}, ${j.date}.`], did: j.bullets, skills: j.tags };
  }
  if (m.lab) {
    const l = find(S.labs.labs, 'key', m.lab); if (!l) return null;
    return { title: l.name, meta: l.pi, what: [...arr(l.story), l.funding].filter(Boolean),
      did: arr(l.subprojects).map(p => `${p.n}: ${p.d}`), skills: l.proof, links: arr(l.links) };
  }
  if (m.project) {
    const p = find(S.projects.items, 'title', m.project); if (!p) return null;
    return { title: p.title, meta: [p.tag, p.year].filter(Boolean).join(', '), what: [p.body], skills: [...arr(p.tech), ...phrases(p.proof)],
      links: p.url ? [{ label: 'Open project', url: p.url }] : [] };
  }
  if (m.paper) {
    const p = find(S.research.papers, 'title', m.paper); if (!p) return null;
    return { title: p.title, meta: [p.status, p.venue, p.year].filter(v => v && v !== 'undefined').join(', '), what: [p.blurb], links: p.url ? [{ label: 'Open', url: p.url }] : [] };
  }
  if (m.event) {
    const e = arr(S.timeline.events).find(x => x.tag === m.event && (!m.date || x.date === m.date)); if (!e) return null;
    return { title: `${e.date}, ${e.tag}`, what: [e.body] };
  }
  if (m.cert) { const c = find(S.research.certifications, 'title', m.cert); return c && { title: c.title, meta: c.year, what: [c.detail] }; }
  if (m.story) { const s = find(S.personal.stories, 't', m.story); return s && { title: s.t, what: [s.d] }; }
  if (m.skill) { const c = find(S.skills.resume, 'name', m.skill); return c && { title: c.name, what: ['From the Technical Skills section of my resume.'], skills: c.items }; }
  if (m.hero) { const h = find(S.astakeria.heroes, 'name', m.hero); return h && { title: h.name, meta: h.role, what: [h.tagline, h.mechanic] }; }
  if (m.doc !== undefined) { const d = arr(S.astakeria.documents)[m.doc]; return d && { title: d.title, meta: d.pages, what: [d.desc] }; }
  if (m.ast === 'scope') return { title: S.astakeria.subtitle || 'Astakeria', what: [S.astakeria.hook].filter(Boolean), list: { h: 'Scope', items: pairs(S.astakeria.scope) } };
  if (m.ast === 'entropy') { const e = S.astakeria.entropy || {}; return { title: 'The Entropy system', what: [e.desc], list: { h: 'Tiers', items: arr(e.tiers).map(t => ({ n: `${t.label} (${t.range})`, d: t.effect })) } }; }
  if (m.pillars) return { title: 'Design pillars', list: { h: 'Pillars', items: arr(S.astakeria.pillars) } };
  if (m.cap === 'clinical') return { title: 'TremorMonitor, clinical design', list: { h: 'Design', items: pairs(S.capstone.clinical) }, links: arr(S.capstone.links) };
  if (m.cap === 'architecture') return { title: 'TremorMonitor, system architecture', what: ['Sense, detect, stream, log, report.'], list: { h: 'Stages', items: arr(S.capstone.architecture).map(a => ({ n: `${a.stage}${a.chip ? `, ${a.chip}` : ''}`, d: a.text })) }, links: arr(S.capstone.links) };
  if (m.cap === 'app') { const a = S.capstone.app || {}; return { title: a.name || 'TremorMonitor app', meta: a.platform, what: [a.description], did: arr(a.modules).map(x => `${x.n}: ${x.d}`), links: arr(S.capstone.links) }; }
  if (m.home === 'bio') return { title: 'Hamza Abu Khalaf Al Takrouri', what: arr(S.home.bio), list: { h: 'Quick facts', items: arr(S.home.quickfacts).map(q => ({ n: q.k, d: q.v })) }, links: [{ label: 'Resume PDF', url: LINKS.resume }] };
  if (m.timeline === 'all') return { title: 'Full timeline', list: { items: arr(S.timeline.events).map(e => ({ n: `${e.date}, ${e.tag}`, d: e.body })) } };
  if (m.teams) return { title: 'Favorite teams', list: { items: arr(S.personal.teams).map(t => ({ n: t.sport, d: t.team })) } };
  return null;
}

const PL = 'font-hi-head italic font-extrabold uppercase text-xl leading-none text-[var(--screen-acc)]';
function popupHTML(d) {
  const rows = [];
  if (arr(d.what).length) rows.push(['What it is', arr(d.what).filter(Boolean).map(p => `<p class="leading-relaxed">${esc(p)}</p>`).join('')]);
  if (arr(d.did).length) rows.push(['What I did', `<ul class="list-disc pl-5 space-y-1.5 marker:text-hi-name leading-relaxed">${arr(d.did).map(b => `<li>${esc(b)}</li>`).join('')}</ul>`]);
  if (arr(d.skills).length) rows.push(['Skills I learned', `<ul class="list-disc pl-5 grid sm:grid-cols-2 gap-x-8 gap-y-1 marker:text-hi-name">${arr(d.skills).map(t => `<li>${esc(t)}</li>`).join('')}</ul>`]);
  if (d.list && arr(d.list.items).length) rows.push([d.list.h || 'Details', `<dl class="space-y-2.5">${arr(d.list.items).map(x => typeof x === 'string' ? `<dd>${esc(x)}</dd>` : `<div><dt class="uppercase font-semibold text-hi-name text-sm">${esc(x.n || x.name || x.title || '')}</dt><dd class="leading-relaxed">${esc(x.d || x.desc || x.text || '')}</dd></div>`).join('')}</dl>`]);
  const links = arr(d.links).filter(l => l && l.url);
  if (links.length) rows.push(['Links', `<ul class="flex flex-wrap gap-x-5 gap-y-2">${links.map(l => `<li><a class="text-hi-name underline underline-offset-4 decoration-white/30 hover:text-white ${T.focus}" href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label || 'Open')}</a></li>`).join('')}</ul>`]);

  return `
    <div class="hi-pop fixed inset-0 z-[90] grid place-items-center bg-black/65 p-4" data-pop-backdrop>
      <div role="dialog" aria-modal="true" aria-labelledby="hi-pop-title" class="relative w-[min(780px,94vw)] max-h-[84vh] flex flex-col bg-[#0b1526]/97 border border-white/15 border-t-4 border-t-[var(--screen-acc)] shadow-[0_0_60px_-10px_var(--screen-acc)] font-hi-body text-hi-bone">
        <div class="flex items-start justify-between gap-4 px-6 pt-5 pb-4 border-b border-white/15">
          <div class="min-w-0">
            <h2 id="hi-pop-title" class="font-hi-head italic font-extrabold uppercase text-4xl leading-none text-white">${esc(d.title)}</h2>
            ${d.meta ? `<p class="mt-1.5 text-hi-dim">${esc(d.meta)}</p>` : ''}
          </div>
          <button type="button" data-pop-close class="shrink-0 flex items-center gap-2 uppercase font-semibold text-sm hover:text-white ${T.focus}"><kbd class="font-hi-body text-xs border border-white/40 px-1.5 py-0.5">ESC</kbd>Close</button>
        </div>
        <dl class="overflow-y-auto hi-col px-6 py-5 space-y-5 text-[15px]">
          ${rows.map(([label, body]) => `<div class="grid gap-2 sm:grid-cols-[9.5rem_1fr] sm:gap-5"><dt class="${PL} sm:pt-1">${label}:</dt><dd class="min-w-0">${body}</dd></div>`).join('')}
        </dl>
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
  const acc = opener?.closest('.hero-info')?.style.getPropertyValue('--screen-acc') || '#f9a826';
  document.body.insertAdjacentHTML('beforeend', popupHTML(d));
  const el = document.body.lastElementChild;
  el.style.setProperty('--screen-acc', acc);
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
