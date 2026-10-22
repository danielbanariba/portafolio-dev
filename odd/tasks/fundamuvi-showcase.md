# FUNDAMUVI showcase — danielbanariba.dev

Locator: `odd/tasks/fundamuvi-showcase.md` in `~/Desktop/portafolio-dev`, branch `feat/fundamuvi-case-study` (from main 3c34130). Engram mirror: `odd/fundamuvi-showcase/tasks`.

## Objective
Show the FUNDAMUVI website redesign on the portfolio as a project card plus a case-study page, so potential clients see the work and the process behind it.

## Problem / why
The user asked (2026-10-21): "publicarlo en mi portafolio web, para poder venderme, que otros miren mi trabajo y quizás así conseguir más trabajo". The redesign lives in `~/Desktop/fundamuvi-web-worktrees/sketch` (branch `redesign/sketch`). It is not merged yet; a demo is live at https://fundamuvi.danielbanariba.com.

## Scope (authorized by the user, 2026-10-21)
- A card in `src/data/proyects.ts`, with a screenshot of the redesign, following the arsenal-de-odio pattern (PR #11, `odd/tasks/arsenal-de-odio-showcase.md`).
- A case-study page `src/pages/fundamuvi.md`: the before and after, what was done (built from the owner's own hand sketch and research, bilingual ES/EN, Netlify forms, accessibility, reduced motion), how it was tested, and screenshots. The card links to it, and it gets a `PAGES` entry in `src/pages/llms.txt.ts`.
- Out of scope:
  - a link to the GitHub repo (`danielbanariba/fundamuvi-web` is private);
  - invented metrics, clients, prices or quotes;
  - any other project or section.

## Decisions (user)
- 2026-10-21: the children's faces in every screenshot are blurred. The design stays visible; the photo consent covers the foundation's site, not a commercial portfolio.
- The redesign is live as a demo at https://fundamuvi.danielbanariba.com, so the portfolio no longer waits for the FUNDAMUVI merge. Cloudflare Pages deploys `main`, so the portfolio merge still needs the user's explicit OK.

## Constraints
- Copy in Spanish, matching the site's register. 2-space indentation; content stays in the data files. Images get alt text.
- Commits use gitmoji + conventional commits, in English (repo history), titles of at most 72 characters. No AI attribution.

## Delivery strategy
`single-pr` on `feat/fundamuvi-case-study`.

## Tasks
- [x] T1 Screenshots: the redesign from the live demo https://fundamuvi.danielbanariba.com (desktop and phone; hero, sections, an instrument page, the blog), and the "antes" from main `f6c1fd5`. Children's faces blurred. Optimized, under `public/project/`.
- [x] T2 Project card in `proyects.ts`, linking to https://fundamuvi.danielbanariba.com and the case study.
- [x] T3 Case-study page `src/pages/fundamuvi.md` and its `llms.txt.ts` `PAGES` entry.
- [x] T4 Verification (`npm test`, `npm run build`, browser check of the card and the page).
- [ ] T5 Open the PR (route: inline git/gh) only with the user's OK; the merge waits for the FUNDAMUVI deploy and the user's explicit OK.

## Open questions
None. The live URL was answered on 2026-10-21: the user publishes it on their own domain, like brutal-ink, at https://fundamuvi.danielbanariba.com (live, serving redesign/sketch a362c4b).

## Acceptance criteria
- `npm test` and `npm run build` (which runs `astro check`) pass.
- The card renders on desktop and phone, and its links work.
- `/fundamuvi` renders with its images, and no child's face is recognisable in any image.
- `/llms.txt` lists the project with its page.

## Progress / evidence
- Branch created from main 3c34130. Route for T1-T4: one delegated writer (2+ non-trivial files plus image work), launched on 2026-10-21 once the FUNDAMUVI S4 review closed. The "después" screenshots come from the live demo, the "antes" from a local build of main `f6c1fd5`.
- T1 (route: delegated writer; trigger: image work plus 2+ non-trivial files):
  - "Después": Playwright (library from another local project, system Chromium 153) against https://fundamuvi.danielbanariba.com at 2x, with cloudflareinsights, googletagmanager and google-analytics blocked, the page scrolled through once so the reveals settle, and fonts ready. Nothing was submitted; the donation dialog was only opened.
  - "Antes": `npm run build` in the clean checkout `~/Desktop/fundamuvi-web` (main `f6c1fd5`), `astro preview` on 127.0.0.1:4455, one hero shot, preview stopped, `.astro/preview.*` removed. `git status --short` of that checkout is empty. The `demo` and `sketch` worktrees were not built, edited or run (the sketch `es.json` was only read).
  - Faces: OpenCV Haar cascades gave 12 to 31 noisy candidates per image (hits on stripes and hands, profile faces missed), so they were only hints. Every blur box was placed by hand from zoomed crops at native resolution, pixelated to about 5 cells across the long side plus a Gaussian blur, on the 2x raw before downscaling. Every final image was opened and zoomed to check. One missed face in the "antes" photo was added after that review. No face is recognisable in any final image; adults were blurred too when they sit among the children.
  - The gallery section was not captured on purpose: its three photos hold about 50 faces. The raw, unblurred screenshots and crops were deleted from the scratch area at the end; only the blurred outputs and the scripts remain there.
  - Encoding: JPEG quality 82, 4:2:0, progressive, metadata stripped (same as the arsenal images).
  - Images (path under `public/project/`, size, KB, blurred regions, hand-placed):
    - `fundamuvi-2026.jpg` (card), 1920x1080, 202 KB, 9 regions (7 hero faces, 2 in the "Quiénes somos" photo cut at the bottom), all by hand.
    - `fundamuvi/hero-escritorio.jpg`, 1440x900, 154 KB, 7 regions, all by hand.
    - `fundamuvi/antes.jpg`, 1440x900, 97 KB, 22 regions, all by hand (1 added after review).
    - `fundamuvi/historia.jpg`, 1440x900, 70 KB, no people.
    - `fundamuvi/donacion.jpg`, 1440x900, 77 KB, no people (the dialog opened over the history section).
    - `fundamuvi/clases.jpg`, 1440x900, 101 KB, no people (illustrations only).
    - `fundamuvi/piano.jpg`, 1440x900, 87 KB, 9 regions (the photo cut at the bottom), all by hand.
    - `fundamuvi/blog.jpg`, 1440x900, 136 KB, 37 regions (34 faces and 3 mirror reflections in one photo), all by hand.
    - `fundamuvi/movil.jpg`, 1600x1688, 272 KB, 7 regions (the phone hero on the left, the classes section on the right), all by hand.
- T2 / T3: the card is first in `projects` (newest first, as with arsenal), has no `githubUrl` (private repo), and its `imageUrl` has a leading slash (the arsenal one is relative). The card alt text is the title: `HoverEffect` sets `alt={title}` and `proyects.ts` has no alt field. The case study is `src/pages/fundamuvi.md` (8 images, each with alt text) and the `PAGES` entry is in `llms.txt.ts`. `llms-full.txt.ts` derives from `projects`, so it needs no entry. Facts that were left out: contact details, testimonial quotes, the stats numbers and names shown on the demo.
- T4 verification (run in the foreground, in `~/Desktop/portafolio-dev`, Node v25.8.0):
  - `npm test`: 2 files, 12 tests passed.
  - `npm run build`: `astro check` 0 errors, 0 warnings, 0 hints; 9 pages built, including `/fundamuvi`.
  - Browser check of the built site (`astro preview` on 127.0.0.1:4466, stopped afterwards, `.astro/preview.*` removed), at 1440x900 and 390x844: 31 of 31 checks passed. The card is the first visible one and its image loads; its links go to `/fundamuvi` and the live preview, and clicking each opens the right page; it has no GitHub link; `/fundamuvi` returns 200, its 8 images load with alt text, there is no horizontal overflow, no console errors and no 4xx or 5xx responses; `/llms.txt` lists the project with `https://www.danielbanariba.dev/fundamuvi` and `/llms-full.txt` includes it. Screenshots of the card and the page were viewed.
  - Not added: no test. This is content and images, so there is no realistic RED, and a test that checks the title or the paths would only echo the diff.
- Commits on `feat/fundamuvi-case-study`: `e4e6afc` (case study and its 8 images), `5c3635d` (card, card image and llms.txt entry).
- Test Value Gate: no new tests, so Pass 3 has nothing to list.
- Engram mirror `odd/fundamuvi-showcase/tasks` (id 8475): update PENDING. `mem_update` with `expected_project` `portafolio-dev` failed with `project_mismatch` because the writer's session runs in the `fundamuvi-web` project. The parent has to resync it from this file.

## Next step
Parent spot check, then ask the user about T5 (push and PR). Open points for the user: the page says the first redesign was generic and the foundation rejected it; the card sits before Arsenal de Odio; the gallery is not shown.
