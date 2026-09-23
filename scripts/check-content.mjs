import { ROSTER, SECTIONS, LINKS } from '../js/data.js';
import { HERO_INFO } from '../js/heroinfo-data.js';
import { ICON_SPRITE } from '../js/icons.js';
import { resolveMore } from '../js/heroinfo.js';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';
import { URL, fileURLToPath } from 'node:url';

let failed = false;
const fail = (msg) => { console.error(`ERROR: ${msg}`); failed = true; };
const warn = (msg) => console.warn(`WARN: ${msg}`);

const textBlob = JSON.stringify({ ROSTER, SECTIONS, LINKS });
if (/[\u00c2\u00e2\ufffd]/.test(textBlob)) fail('Visible content contains mojibake artifacts.');

for (const [name, url] of Object.entries(LINKS)) {
  if (!/^https?:\/\//.test(url)) fail(`LINKS.${name} is not an absolute URL: ${url}`);
}

if (!Array.isArray(ROSTER) || ROSTER.length < 10) fail('Roster should have at least 10 characters.');
const ids = new Set();
for (const c of ROSTER) {
  if (ids.has(c.id)) fail(`Duplicate roster id: ${c.id}`);
  ids.add(c.id);
  for (const key of ['id', 'title', 'subtitle', 'accent', 'accent2', 'figure', 'play_url']) {
    if (!c[key]) fail(`Roster item ${c.id || '(missing id)'} is missing ${key}.`);
  }
  if (!SECTIONS[c.id]) warn(`Roster item ${c.id} has no matching section.`);
}

for (const [id, section] of Object.entries(SECTIONS)) {
  if (!section.layout) fail(`Section ${id} has no layout.`);
  if (section.heading && /^[a-z]/.test(section.heading)) warn(`Section ${id} heading starts lowercase: ${section.heading}`);
}

const sourceFiles = [
  'index.html',
  'cv.html',
  'cv.js',
  'js/main.js',
  'js/sections.js',
  'js/stage.js',
  'js/shader.js',
  'README.md'
];

for (const file of sourceFiles) {
  const source = readFileSync(new URL(`../${file}`, import.meta.url), 'utf8');
  if (/[\u00c2\u00e2\ufffd]/.test(source)) fail(`${file} contains mojibake artifacts.`);
}

const projectTitles = SECTIONS.projects?.items?.map(p => p.title) || [];
const seenProjects = new Set();
for (const title of projectTitles) {
  if (seenProjects.has(title)) fail(`Duplicate project title: ${title}`);
  seenProjects.add(title);
}

// ---- dash gate: no em or en dashes anywhere (Node, so Unicode is exact) ----
const SKIP = new Set(['node_modules', '.git', 'dist', '.vscode']);
const EXTS = new Set(['.js', '.mjs', '.html', '.css', '.md']);
function walk(dir) {
  for (const name of readdirSync(dir)) {
    if (SKIP.has(name)) continue;
    const path = join(dir, name);
    if (statSync(path).isDirectory()) { walk(path); continue; }
    if (!EXTS.has(extname(name))) continue;
    readFileSync(path, 'utf8').split('\n').forEach((line, i) => {
      if (line.includes('\u2014')) fail(`${path}:${i + 1} contains an em dash.`);
      if (line.includes('\u2013')) fail(`${path}:${i + 1} contains an en dash.`);
    });
  }
}
walk(fileURLToPath(new URL('..', import.meta.url)));

// ---- Hero Info: every hero laid out, icons real, every popup resolves ----
const STYLES = new Set(['stats', 'weapon', 'tile', 'circle', 'ult', 'button']);
for (const hero of ROSTER) {
  const info = HERO_INFO[hero.id];
  if (!info) { fail(`Hero ${hero.id} has no HERO_INFO entry.`); continue; }
  if (!info.title || !['support', 'tank', 'damage'].includes(info.role)) fail(`Hero ${hero.id} needs a title and a valid role.`);
  if (!Array.isArray(info.cols) || info.cols.length !== 3) fail(`Hero ${hero.id} needs exactly 3 columns.`);
  for (const block of (info.cols || []).flat()) {
    if (!STYLES.has(block.style)) fail(`Hero ${hero.id} has a block with unknown style ${block.style}.`);
    for (const item of block.items || []) {
      if (item.more && !resolveMore(item.more)) fail(`Hero ${hero.id} item "${item.name}" has a popup that resolves to nothing.`);
    }
  }
  const icons = JSON.stringify(info).match(/"(?:icon|portrait)":"([a-z0-9-]+)"/g) || [];
  for (const m of icons) {
    const name = m.split(':')[1].replace(/"/g, '');
    if (!ICON_SPRITE.includes(`id="gi-${name}"`)) fail(`Hero ${hero.id} uses icon ${name}, which is not in js/icons.js.`);
  }
}
for (const id of Object.keys(HERO_INFO)) if (!ROSTER.some(h => h.id === id)) warn(`HERO_INFO.${id} has no roster hero.`);

if (failed) process.exit(1);
console.log('Content check passed.');
