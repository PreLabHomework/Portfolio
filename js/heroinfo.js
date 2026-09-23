// ============================================================
//  HERO INFO SCREEN (v11 "Doctrine")
//  Overwatch Hero Info layout: tab bar, title row, three columns
//  (Hero & Weapon + Ultimate / Abilities + Passive / Perks),
//  footer. The old section body lives in the DEBRIEF tab.
// ============================================================

import { HERO_INFO } from './heroinfo-data.js';
import { LINKS } from './data.js';
import { renderSection } from './sections.js';

const esc = (str = '') => String(str).replace(/[&<>"]/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]));
const icon = (name, cls) => `<svg class="${cls}" aria-hidden="true"><use href="#gi-${name}"/></svg>`;
const url = href => (href === 'resume' ? LINKS.resume : href);

const ROLE_ICONS = {
  support: '<circle cx="12" cy="12" r="10.5" fill="none" stroke="currentColor" stroke-width="2"/><path d="M10 6h4v4h4v4h-4v4h-4v-4H6v-4h4z" fill="currentColor"/>',
  tank: '<path d="M12 1.5 21 5v6.5c0 5.4-3.8 9.6-9 11-5.2-1.4-9-5.6-9-11V5z" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 6 17 8v4c0 3-2 5.4-5 6.4z" fill="currentColor"/>',
  damage: '<circle cx="12" cy="12" r="7" fill="none" stroke="currentColor" stroke-width="2"/><path d="M11 1h2v7h-2zm0 15h2v7h-2zM1 11h7v2H1zm15 0h7v2h-7z" fill="currentColor"/><circle cx="12" cy="12" r="2" fill="currentColor"/>'
};

const MOUSE = {
  LMB: '<path d="M10 1a9 9 0 0 0-9 9v2h9z" fill="#070d18"/>',
  RMB: '<path d="M10 1a9 9 0 0 1 9 9v2h-9z" fill="#070d18"/>'
};

function keybind(key, placement) {
  if (MOUSE[key]) {
    return `<svg class="${placement} w-5 h-7" viewBox="0 0 20 28" role="img" aria-label="${key === 'LMB' ? 'Left' : 'Right'} mouse button"><rect x="1" y="1" width="18" height="26" rx="9" fill="#fff" stroke="#070d18" stroke-width="1.5"/>${MOUSE[key]}</svg>`;
  }
  return `<kbd class="${placement} font-hi-body bg-hi-key text-hi-ink font-bold leading-6 px-1.5 ${key.length > 1 ? 'text-xs' : 'text-sm px-2'}">${esc(key)}</kbd>`;
}

const H2 = 'font-hi-head italic font-extrabold uppercase text-4xl lg:text-5xl leading-none hi-head-fill';
const NAME = 'uppercase font-semibold text-hi-name text-lg lg:text-xl leading-tight';
const BODY = 'mt-1 text-base lg:text-lg leading-snug text-hi-bone';

function shipped(item) {
  return item.shipped ? `<p class="mt-2 text-base lg:text-lg leading-snug text-hi-bone"><span class="text-hi-result">Shipped:</span> ${esc(item.shipped)}</p>` : '';
}

function descOf(item) {
  if (!item.desc) return '';
  if (item.href) return `<p class="${BODY}"><a class="underline decoration-white/30 underline-offset-4 hover:decoration-hi-key" href="${esc(url(item.href))}" ${item.href.startsWith('mailto:') ? '' : 'target="_blank" rel="noopener"'}>${esc(item.desc)}</a></p>`;
  return `<p class="${BODY}">${esc(item.desc)}</p>`;
}

function statsBlock(info) {
  const pips = info.difficulty
    ? `<div class="flex items-center gap-1.5 mt-2" role="img" aria-label="Difficulty ${info.difficulty} of 3">
        ${[1, 2, 3].map(n => `<span class="h-5 w-8 ${n <= info.difficulty ? 'bg-hi-bone' : 'bg-white/15'}"></span>`).join('')}
        <span class="ml-2 text-base font-semibold text-hi-bone">Difficulty</span>
      </div>` : '';
  const stats = (info.stats || []).map(s => `
    <div class="flex items-center gap-2"><dt class="sr-only">${esc(s.label)}</dt>${icon(s.icon, 'w-5 h-5 text-hi-name')}<dd class="font-semibold">${esc(s.value)}</dd></div>`).join('');
  if (!pips && !stats) return '';
  return `
    <div class="pt-1">
      <h3 class="${NAME}">Hero stats</h3>
      ${pips}
      ${stats ? `<dl class="flex flex-wrap gap-x-5 gap-y-2 mt-3 text-base lg:text-lg text-hi-bone">${stats}</dl>` : ''}
    </div>`;
}

function column1(info) {
  const w = info.weapon;
  const u = info.ultimate;
  return `
    <div>
      <h2 class="${H2} mb-5">Hero &amp; weapon</h2>
      <div class="flex gap-6 items-start">
        <div class="shrink-0 w-20 h-24 lg:w-24 lg:h-28 grid place-items-center text-white bg-[var(--screen-acc)] [clip-path:polygon(50%_0,100%_25%,100%_75%,50%_100%,0_75%,0_25%)]">
          ${icon(info.portrait, 'w-12 h-12 lg:w-14 lg:h-14 drop-shadow')}
        </div>
        ${statsBlock(info)}
      </div>
      ${w ? `
      <div class="flex gap-6 mt-9">
        <div class="shrink-0 w-20 lg:w-24 grid justify-items-center">${icon(w.icon, 'w-14 h-14 lg:w-16 lg:h-16 text-hi-bone')}</div>
        <div>
          <h3 class="${NAME}">${esc(w.name)}</h3>
          <div class="flex gap-3 items-start">${keybind(w.key, 'shrink-0 mt-1.5')}<div class="min-w-0">${descOf(w)}${shipped(w)}</div></div>
        </div>
      </div>` : ''}
      ${u ? `
      <h2 class="${H2} mt-10 mb-5">Ultimate</h2>
      <div class="flex gap-6 items-start">
        <div class="relative shrink-0">
          <div class="hi-ult w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-hi-bone text-hi-ink grid place-items-center">${icon(u.icon, 'w-12 h-12 lg:w-14 lg:h-14')}</div>
          ${keybind('Q', 'absolute left-1/2 -translate-x-1/2 -bottom-3')}
        </div>
        <div class="pt-1 min-w-0">
          <h3 class="${NAME}">${esc(u.name)}</h3>
          ${descOf(u)}${shipped(u)}
        </div>
      </div>` : ''}
    </div>`;
}

function column2(info) {
  const abilities = (info.abilities || []).map(a => `
    <li class="flex gap-6">
      <div class="relative shrink-0 w-16 h-16 lg:w-20 lg:h-20 bg-hi-bone text-hi-ink grid place-items-center">
        ${icon(a.icon, 'w-10 h-10 lg:w-12 lg:h-12')}
        ${keybind(a.key, 'absolute left-1/2 -translate-x-1/2 ' + (MOUSE[a.key] ? '-bottom-4' : '-bottom-3'))}
      </div>
      <div class="min-w-0">
        <h3 class="${NAME}">${esc(a.name)}</h3>
        ${descOf(a)}${shipped(a)}
      </div>
    </li>`).join('');
  const p = info.passive;
  return `
    <div>
      ${abilities ? `<h2 class="${H2} mb-5">Abilities</h2><ul class="space-y-8">${abilities}</ul>` : ''}
      ${p ? `
      <h2 class="${H2} mt-10 mb-5">Passive</h2>
      <div class="flex gap-5 items-start">
        <div class="shrink-0 w-14 h-14 rounded-full border-2 border-[var(--screen-acc)] text-hi-bone grid place-items-center">${icon(p.icon, 'w-8 h-8')}</div>
        <div class="min-w-0">
          <h3 class="${NAME}">${esc(p.name)}</h3>
          ${descOf(p)}
        </div>
      </div>` : ''}
    </div>`;
}

function perkGroup(tier, group, first) {
  if (!group || !group.items?.length) return '';
  const items = group.items.map(it => `
    <li class="flex gap-5">
      <div class="shrink-0 w-12 h-12 rounded-full bg-white/10 ring-1 ring-white/25 grid place-items-center text-hi-bone">${icon(it.icon, 'w-7 h-7')}</div>
      <div class="min-w-0">
        <h4 class="uppercase font-semibold text-hi-bone/90 text-base lg:text-lg leading-tight">${esc(it.name)}</h4>
        ${it.desc ? `<p class="text-hi-dim text-base lg:text-lg leading-snug">${esc(it.desc)}</p>` : ''}
      </div>
    </li>`).join('');
  return `
    <p class="text-lg lg:text-xl text-hi-bone ${first ? '' : 'mt-8'}"><span class="font-bold uppercase">${tier}</span><span class="text-hi-dim ml-3">${esc(group.label)}</span></p>
    <ul class="mt-4 space-y-6">${items}</ul>`;
}

function column3(info) {
  const perks = info.perks;
  if (!perks) return '<div></div>';
  return `
    <div>
      <h2 class="${H2} mb-5">Perks</h2>
      ${perkGroup('Minor', perks.minor, true)}
      ${perkGroup('Major', perks.major, !perks.minor)}
    </div>`;
}

function actionButton(info, hero) {
  let label = null, href = null;
  if (info.action === 'resume') { label = 'View resume'; href = LINKS.resume; }
  else if (info.action) { label = info.action.label; href = info.action.url; }
  else if (hero.play_url) { label = hero.play_label ? hero.play_label.toLowerCase() : 'Open'; href = hero.play_url; }
  if (!href) return '<span></span>';
  return `<a class="border-2 border-white/80 bg-hi-ink/60 px-7 py-3 text-base lg:text-lg font-semibold uppercase text-hi-bone hover:bg-white hover:text-hi-ink focus-visible:outline-2 focus-visible:outline-hi-key focus-visible:outline-offset-4" href="${esc(href)}" target="_blank" rel="noopener">${esc(label)}</a>`;
}

const TAB = 'px-6 lg:px-7 py-3.5 text-base lg:text-lg font-semibold uppercase tracking-wide aria-selected:bg-[#1a7fd6] aria-selected:text-white text-hi-dim hover:text-white focus-visible:outline-2 focus-visible:outline-hi-key focus-visible:-outline-offset-4';

export function renderHeroInfo(hero) {
  const info = HERO_INFO[hero.id];
  if (!info) return `<div class="detail-body">${renderSection(hero.id)}</div>`;
  return `
    <article class="hero-info min-h-full flex flex-col font-hi-body text-hi-bone bg-hi-ink/45" style="--screen-acc:${hero.accent};--screen-acc2:${hero.accent2};">
      <header class="flex items-stretch justify-between bg-[#0b1a33]/90">
        <div role="tablist" aria-label="${esc(info.title)} sections" class="flex">
          <button role="tab" id="hi-t-info" aria-selected="true" aria-controls="hi-p-info" class="${TAB} [clip-path:polygon(0_0,100%_0,calc(100%-14px)_100%,0_100%)]">Hero info</button>
          <button role="tab" id="hi-t-debrief" aria-selected="false" aria-controls="hi-p-debrief" tabindex="-1" class="${TAB} [clip-path:polygon(14px_0,100%_0,calc(100%-14px)_100%,0_100%)]">Debrief</button>
        </div>
      </header>

      <div class="flex-1 px-5 lg:px-14 pb-8">
        <div class="flex items-center justify-end gap-4 pt-5 pb-4 border-b border-white/20">
          <svg class="w-8 h-8 lg:w-9 lg:h-9 text-white shrink-0" viewBox="0 0 24 24" role="img" aria-label="${info.role} role">${ROLE_ICONS[info.role] || ''}</svg>
          <h1 class="font-hi-head italic font-extrabold uppercase text-5xl sm:text-6xl lg:text-8xl leading-none text-white text-right">${esc(info.title)}</h1>
        </div>

        <section id="hi-p-info" role="tabpanel" aria-labelledby="hi-t-info" class="grid gap-12 lg:grid-cols-3 lg:gap-10 pt-8">
          ${column1(info)}
          ${column2(info)}
          ${column3(info)}
        </section>

        <section id="hi-p-debrief" role="tabpanel" aria-labelledby="hi-t-debrief" hidden class="pt-8">
          <div class="detail-body">${renderSection(hero.id)}</div>
        </section>
      </div>

      <footer class="flex flex-wrap items-center justify-between gap-4 px-5 lg:px-14 pb-6">
        <button type="button" data-close-detail class="flex items-center gap-3 text-base lg:text-lg font-semibold uppercase text-hi-bone hover:text-white focus-visible:outline-2 focus-visible:outline-hi-key focus-visible:outline-offset-4">
          <kbd class="font-hi-body text-sm border border-white/40 px-2 py-1">ESC</kbd>Roster
        </button>
        ${actionButton(info, hero)}
        <span class="hidden lg:block w-32"></span>
      </footer>
    </article>`;
}

export function setupHeroInfo(root) {
  const tabs = [...root.querySelectorAll('.hero-info [role="tab"]')];
  if (!tabs.length) return;
  const select = (tab, focus = true) => {
    tabs.forEach(t => {
      const on = t === tab;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      root.querySelector('#' + t.getAttribute('aria-controls')).hidden = !on;
    });
    if (focus) tab.focus();
  };
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => select(t));
    t.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight') { e.preventDefault(); select(tabs[(i + 1) % tabs.length]); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); select(tabs[(i - 1 + tabs.length) % tabs.length]); }
    });
  });
}
