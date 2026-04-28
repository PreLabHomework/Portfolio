# Hamza's House

A personal portfolio styled as a character-select screen. Each character represents a section of Hamza's work: research labs, capstone, standalone projects, publications, skills, timeline, affiliations, personal context, and Astakeria.

## Run Locally

With VS Code Live Server, open `index.html`.

With Vite:

```bash
npm install
npm run dev
```

## Check Before Pushing

```bash
npm run check
```

This runs JavaScript syntax checks and a content audit for common portfolio mistakes.

## Structure

```text
index.html
styles.css
js/
  audio.js
  boot.js
  data.js
  main.js
  sections.js
  select.js
  shader.js
  stage.js
scripts/
  check-content.mjs
  check-syntax.mjs
```

## Source Notes

Use `Hamza Abu Resume` as the primary content source. Use `Hamza CV` only for extra details not covered by the resume. Live corrections from Hamza override both.
