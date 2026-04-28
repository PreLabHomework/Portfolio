import { ROSTER, SECTIONS, LINKS } from '../js/data.js';

let failed = false;
const fail = (msg) => { console.error(`ERROR: ${msg}`); failed = true; };
const warn = (msg) => console.warn(`WARN: ${msg}`);

const textBlob = JSON.stringify({ ROSTER, SECTIONS, LINKS });
if (textBlob.includes('2014')) fail('Visible content contains an em dash character. Use a comma, colon, or middle dot instead.');

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

const projectTitles = SECTIONS.projects?.items?.map(p => p.title) || [];
const seenProjects = new Set();
for (const title of projectTitles) {
  if (seenProjects.has(title)) fail(`Duplicate project title: ${title}`);
  seenProjects.add(title);
}

if (failed) process.exit(1);
console.log('Content check passed.');
