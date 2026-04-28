# Hamza's House v4.6 Final Polish

This pass starts from v4.5 corrections and adds the final recruiter-facing polish before a future framework migration.

## Content

- Treated Hamza Abu Resume as the source of truth anywhere it overlaps with the older CV.
- Added recruiter signal strips to Home, Labs, Capstone, Research, and Skills.
- Added recruiter readouts to every project detail panel.
- Clarified official lab links versus the unpublished lab websites built by Hamza.
- Kept Waylo as one project and removed duplicate full-stack security app framing.
- Preserved the personal section additions: OPT filing, job or RA search, next GitHub project, genetics modeling, Dukan diet, Expedition 33, and Red Cross Disaster Action Team.

## Design

- Added stronger stage atmosphere overlays so each character reads more like a setting than a single tint.
- Added premium roster hover glow and portrait treatment.
- Added non-card recruiter strips and proof blocks to make the content easier for hiring reviewers to scan.
- Added responsive guardrails for smaller screens.

## Developer Tools

- Added `.gitignore` so node_modules and build output stay out of GitHub.
- Added `.prettierrc`.
- Added VS Code recommendations and local settings.
- Added ESLint flat config.
- Added content and syntax checks through npm scripts.

## Useful Commands

```bash
npm install
npm run dev
npm run check
npm run build
```
