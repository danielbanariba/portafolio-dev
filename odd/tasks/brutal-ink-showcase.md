# Brutal Ink showcase — danielbanariba.dev

## Objective

Show the Brutal Ink store on the portfolio as a project card plus a
case-study page, like FUNDAMUVI and Arsenal de Odio, so potential
clients see the work and the process behind it.

## Problem and why

The user asked on 2026-10-25: "Quiero que la pagina lo pongas en mi
portafolio web, explicando todo asi como los otros proyectos que he
puesto como la pagina de asernal de odio y la fundamuvi". The store is
merged in `danielbanariba/brutal-ink` (private) at main `4231587` and is
live at https://brutal-ink.danielbanariba.com.

## Scope

- A card first in `src/data/proyects.ts` (newest first), with a
  screenshot, linking to the live store and the case study. No
  `githubUrl`: the repo is private.
- A case-study page `src/pages/brutal-ink.md` that explains:
  - the client (the Honduran brand Brutal Ink) and what it needed;
  - what was built: catalog by category, color and size with stock,
    cart, order through WhatsApp with one link to an order page with
    photos, TCG playmats, related-product suggestions and free shipping
    from L 1,000;
  - why there is no backend or payment gateway;
  - the honest-selling rules (no countdowns, no fake stock, no invented
    reviews);
  - how it was tested;
  - screenshots on desktop and phone.
- A `PAGES` entry in `src/pages/llms.txt.ts`.
- Images under `public/project/brutal-ink/` and the card image
  `public/project/brutal-ink-2026.jpg`.

Out of scope:
- danielbanariba.com (links-bio): FUNDAMUVI is not there either.
- A link to the repo.
- The client's private name, prices charged, invented metrics or quotes.

## Constraints

- Copy in Spanish, in the register of `fundamuvi.md` and
  `arsenal-de-odio.md`; images get alt text.
- Case-study images sit on the page colour `#101828` (gray-900). The
  phone image is a transparent WebP without the layout border, like the
  FUNDAMUVI and Arsenal phone images on main.
- The WhatsApp number in the store is REAL. Screenshots never send an
  order: block `wa.me`, `api.whatsapp.com` and `whatsapp.com`, and stub
  `window.open`. Any buyer data shown is made up.
- Only measured facts. Lighthouse numbers appear only if measured on the
  live site during this task.
- Commits: gitmoji + Conventional Commits in English, at most 72
  characters, no AI attribution.

## Delivery strategy

`single-pr` on `feat/brutal-ink-case-study` (from main `5ee1739`). The
merge is the user's, because Cloudflare Pages deploys `main`.

## Tasks

- [ ] B1 Screenshots from the live store: card image, home, category,
      product with suggestions, cart with the free-shipping note, order
      page with photos, playmats, and phone shots in phone frames.
- [ ] B2 Card in `proyects.ts` and the `llms.txt.ts` entry.
- [ ] B3 Case-study page `src/pages/brutal-ink.md`.
- [ ] B4 Verification: `npm test`, `npm run build`, browser check of the
      card, the page and `/llms.txt` at 1440 and 390.
- [ ] B5 Review, push and open the PR. The merge is the user's.

## Acceptance criteria

- `npm test` and `npm run build` pass.
- The card renders first, its links work and it has no GitHub link.
- `/brutal-ink` renders every image with alt text, with no horizontal
  overflow and no console errors.
- `/llms.txt` lists the page.

## Progress

| Task | Route | Trigger evidence | Commit | Review |
|---|---|---|---|---|

## Next step

B1-B4 through one delegated writer (image work plus 2+ non-trivial
files).
