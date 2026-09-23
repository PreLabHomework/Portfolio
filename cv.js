// ============================================================
//  PRO MODE (v12)
//  The recruiter view. Same type as the arena, none of the game
//  chrome: one readable column built from js/resume.js.
// ============================================================

import { RESUME as R } from './js/resume.js';
import { LINKS } from './js/data.js';

const esc = (v = '') => String(v).replace(/[&<>"]/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]));
const FOCUS = 'focus-visible:outline-2 focus-visible:outline-hi-key focus-visible:outline-offset-4';
const H2 = 'font-hi-head italic font-extrabold uppercase text-3xl leading-none text-white';
const BTN = `inline-flex items-center gap-2 -skew-x-12 border border-white/25 border-l-[3px] border-l-hi-key bg-white/5 px-4 py-2 hover:bg-hi-key hover:text-hi-ink transition-colors ${FOCUS}`;
const BTN_IN = 'skew-x-12 font-hi-head italic font-extrabold uppercase text-lg leading-none tracking-wide';

function section(title, id, inner) {
  return `
    <section id="${id}" aria-labelledby="${id}-h" class="mt-12">
      <h2 id="${id}-h" class="${H2} pb-2 mb-6 border-b border-white/15">${esc(title)}</h2>
      ${inner}
    </section>`;
}

function entry(e) {
  const title = e.org || e.school || e.name;
  const sub = e.role || e.degree || e.stack;
  const where = [e.date, e.place].filter(Boolean).join(', ');
  const bullets = [...(e.notes || []), ...(e.bullets || [])];
  return `
    <article class="mt-7 first:mt-0">
      <div class="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <h3 class="text-lg font-semibold text-white">${e.url ? `<a class="hover:text-hi-name underline decoration-white/25 underline-offset-4 ${FOCUS}" href="${esc(e.url)}" target="_blank" rel="noopener">${esc(title)}</a>` : esc(title)}</h3>
        <p class="text-sm text-hi-dim">${esc(where)}</p>
      </div>
      ${sub ? `<p class="text-hi-name font-medium mt-0.5">${esc(sub)}</p>` : ''}
      ${bullets.length ? `<ul class="mt-2.5 space-y-2 list-disc pl-5 marker:text-hi-dim text-hi-bone/90 leading-relaxed">${bullets.map(b => `<li>${esc(b)}</li>`).join('')}</ul>` : ''}
    </article>`;
}

function render() {
  const contact = R.contact.map(c => `<li><a class="hover:text-white underline decoration-white/25 underline-offset-4 ${FOCUS}" href="${esc(c.url)}" ${/^https?:/.test(c.url) ? 'target="_blank" rel="noopener"' : ''}>${esc(c.label)}</a></li>`).join('');
  const skills = R.skills.map(([k, v]) => `
    <div class="grid gap-1 sm:grid-cols-[minmax(0,15rem)_1fr] sm:gap-6 py-2.5 border-b border-white/10 last:border-0">
      <dt class="font-semibold text-white">${esc(k)}</dt>
      <dd class="text-hi-bone/90 leading-relaxed">${esc(v)}</dd>
    </div>`).join('');
  const awards = R.awards.map(a => `<li>${esc(a)}</li>`).join('');

  document.getElementById('pro').innerHTML = `
    <div class="pro min-h-screen bg-hi-ink font-hi-body text-hi-bone">
      <nav class="no-print sticky top-0 z-10 flex items-center justify-between gap-4 px-5 md:px-10 py-3 bg-hi-ink/90 backdrop-blur border-b border-white/10" aria-label="Pro Mode">
        <a class="${BTN}" href="./"><span class="${BTN_IN}">Arena mode</span></a>
        <div class="flex items-center gap-3">
          <button type="button" class="${BTN}" data-print><span class="${BTN_IN}">Print</span></button>
          <a class="${BTN}" href="${esc(LINKS.resume)}" target="_blank" rel="noopener"><span class="${BTN_IN}">Resume PDF</span></a>
        </div>
      </nav>

      <div class="max-w-4xl mx-auto px-5 md:px-10 pt-12 pb-20">
        <header>
          <h1 class="font-hi-head italic font-extrabold uppercase text-[clamp(40px,7vw,68px)] leading-[0.95] text-white">${esc(R.name)}</h1>
          <p class="mt-3 text-xl text-white">M.S. Computer Engineering student at George Mason University</p>
          <p class="mt-1 text-hi-dim">${esc(R.location)}. Open to internships and co-ops in embedded, firmware, RTL, and validation.</p>
          <ul class="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-hi-bone">${contact}</ul>
          <p class="mt-7 text-lg leading-relaxed text-hi-bone/90 max-w-[70ch]">${esc(R.summary)}</p>
        </header>

        ${section('Education', 'education', R.education.map(entry).join(''))}
        ${section('Experience', 'experience', R.experience.map(entry).join(''))}
        ${section('Industry programs', 'programs', R.programs.map(entry).join(''))}
        ${section('Projects', 'projects', R.projects.map(entry).join(''))}
        ${section('Technical skills', 'skills', `<dl>${skills}</dl>`)}
        ${section('Awards, programs and memberships', 'awards', `<ul class="space-y-1.5 list-disc pl-5 marker:text-hi-dim text-hi-bone/90">${awards}</ul>`)}

        <footer class="no-print mt-16 pt-6 border-t border-white/10 text-sm text-hi-dim">
          This page mirrors my current resume. The full story of each project lives in <a class="underline underline-offset-4 hover:text-white ${FOCUS}" href="./">arena mode</a>.
        </footer>
      </div>
    </div>`;

  document.querySelector('[data-print]')?.addEventListener('click', () => window.print());
}

render();
