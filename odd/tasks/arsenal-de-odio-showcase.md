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
- [x] T1 Screenshots of the live redesign (desktop and phone), optimized, under `public/project/`
- [x] T2 Project card in `proyects.ts`, linking to the live site and the case study
- [x] T3 Case-study page `src/pages/arsenal-de-odio.md` and its `llms.txt.ts` `PAGES` entry
- [x] T4 Verification (tests, build, Playwright check of the card and the page)
- [x] T5 Open the PR — route: inline (git/gh) — PR #11; merge waits for the user's explicit OK

## Acceptance criteria
- `npm test` and `npm run build` (which runs `astro check`) pass.
- The card renders on desktop and phone, and its links work.
- `/arsenal-de-odio` renders with its images.
- `/llms.txt` lists the project with its page.

## Progress / evidence
Route: delegated writer (T1-T4, one thread). Trigger: 2+ non-trivial files plus screenshot capture.

- T1: screenshots of the live site taken with Playwright against https://arsenaldeodio.danielbanariba.com, with googletagmanager.com and google-analytics.com blocked, fonts ready, hero video confirmed playing on a lit frame (3.7 s). System Chromium 153 was used because Playwright's bundled browsers did not match the library version. Every shot was viewed before use. Files: `public/project/arsenal-de-odio-2026.jpg` (card, 1920x1080, 156 KB) and `public/project/arsenal-de-odio/` (hero-escritorio, canciones, mercaderia, galeria at 1440x900, movil 1600x1688 with the phone hero and tracks side by side, antes 1600x908 from the old PNG with its scrollbar cropped).
- T2 / T3: card first in `projects` (no `githubUrl`, repo is private), case study at `src/pages/arsenal-de-odio.md`, `PAGES` entry in `llms.txt.ts`. `llms-full.txt.ts` derives from `projects`, so it needs no entry.
- Functional RED (before the change, preview on 4410): card not found, `/arsenal-de-odio` returned 404, `/llms.txt` had no Arsenal line (7 failed, 2 passed).
- Functional GREEN (after): 17 of 17 checks passed on 1440x900 and 390x844 (card first and its image loads, links go to the live site and `/arsenal-de-odio`, page returns 200, 6 images load with alt, no overflow, no page errors, `/llms.txt` lists the project with its page).
- `npm test`: 2 files, 12 tests passed. `npm run build`: `astro check` 0 errors, 0 warnings, 0 hints, 8 pages built. Node v25.8.0 (`.nvmrc` says 23.11.0; fnm only has the system Node).
- Commits: 0618312 (case study), f35fb76 (card and llms entry).
- The old `public/project/arsenal-de-odio.png` (3.2 MB) is still tracked and unreferenced; the case study uses a re-encoded copy.
- Parent review:
  - Read the case study and fixed three inaccurate claims in `8b200be`:
    - the five members belong to the band, not the album;
    - not all nine QA bugs were fixed, since two minor ones remain open (Spotify tab stops, no-JS phone menu);
    - only content images ship as AVIF/WebP.
  - Build re-run green.
  - Viewed the card and the websites screenshots.
- Templates: the repo had none. Added the English commit template and a PR template, noted in CLAUDE.md (`bee0b5d`).
- RDD: assess medium, `under_budget`, so no review was due.
- PR #11 opened. The Cloudflare Pages preview passed at https://feat-arsenal-de-odio-case-st.portafolio-dev.pages.dev:
  - the card renders;
  - `/arsenal-de-odio/` returns 200, with the same trailing-slash 308 as `/metal-archive`;
  - `/llms.txt` lists the page.

- User change request: use the hero frame where the black-and-white singer photo covers the video, taken by the parent rather than from the user's screenshot. Retaken from the live site with Playwright, with GA blocked: 1920x1080 at scroll 880 for the card, 1440x900@2x at scroll 730 for the case-study hero. The hero alt text was updated. `1432c7a`; build green. The Cloudflare preview serves the new files, and their sha256 matches the local copies.

## Next step
The user reviews PR #11 (preview above). Merge only with the user's explicit OK; Cloudflare Pages deploys `main`.
