# Arsenal de Odio showcase — danielbanariba.dev

## Objective
Show the Arsenal de Odio website redesign on the portfolio as a project card plus a case-study page, so potential clients see the work and the process behind it.

## Problem / why
The user wants more web work. The redesign is live at https://arsenaldeodio.danielbanariba.com, but the portfolio does not show it. `public/project/arsenal-de-odio.png` exists, but it is an unreferenced screenshot of the old design.

## Scope (authorized by the user, 2026-10-21)
- A card in `src/data/proyects.ts`, with a new screenshot of the redesign and a link to the live site.
- A case-study page `src/pages/arsenal-de-odio.md`, with the before and after, what was done, how it was tested and screenshots. The card links to it, and it is added to the `PAGES` map in `src/pages/llms.txt.ts`.
- Out of scope:
  - a link to the GitHub repo (now private);
  - invented metrics, clients, prices or quotes;
  - any other project or section.

## Constraints
- Copy in Spanish, matching the site's register.
- 2-space indentation; content stays in the data files.
- Images get alt text.
- Commits use gitmoji + conventional commits, in English (repo history). No AI attribution.
- Cloudflare Pages deploys `main`, so the merge needs the user's explicit OK.

## Delivery strategy
`single-pr` on `feat/arsenal-de-odio-case-study`.

## Tasks
- [ ] T1 Screenshots of the live redesign (desktop and phone), optimized, under `public/project/`
- [ ] T2 Project card in `proyects.ts`, linking to the live site and the case study
- [ ] T3 Case-study page `src/pages/arsenal-de-odio.md` and its `llms.txt.ts` `PAGES` entry
- [ ] T4 Verification (tests, build, Playwright check of the card and the page), then the PR

## Acceptance criteria
- `npm test` and `npm run build` (which runs `astro check`) pass.
- The card renders on desktop and phone, and its links work.
- `/arsenal-de-odio` renders with its images.
- `/llms.txt` lists the project with its page.

## Progress / evidence

## Next step
T1–T3 via one delegated writer, then T4.
