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

- [x] B1 Screenshots from the live store: card image, home, category,
      product with suggestions, cart with the free-shipping note, order
      page with photos, playmats, and phone shots in phone frames.
- [x] B2 Card in `proyects.ts` and the `llms.txt.ts` entry.
- [x] B3 Case-study page `src/pages/brutal-ink.md`.
- [x] B4 Verification: `npm test`, `npm run build`, browser check of the
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
| B1, B3 | delegated | image work plus 2+ non-trivial files | 5a87afa | medium, granted, approved |
| B2 | delegated | same writer | c0edfc5 | medium, granted, approved |
| B3 fix | inline | 2 sentences in one file | 1f4baea | medium, granted, approved |
| B4 | delegated, parent spot check | full build and browser run | none | not applicable |

Evidence B1-B3 (delegated writer, `sonnet`):
- Images, all captured from the live store with `wa.me` and
  `whatsapp.com` aborted and `window.open` stubbed (0 blocked attempts,
  0 `window.open` calls). The buyer name "Ana Pérez" is invented.
  - `public/project/brutal-ink-2026.jpg`: 1920x1080, 195 KB.
  - `public/project/brutal-ink/`, at 1440 px wide:
    - `hero-escritorio.jpg`: 143 KB.
    - `categoria.jpg`: 133 KB.
    - `producto.jpg`: 116 KB.
    - `sugerencias.jpg`: 70 KB.
    - `carrito.jpg`: 1440x1600, 114 KB.
    - `pedido.jpg`: 94 KB.
    - `playmats.jpg`: 1440x1240, 244 KB.
  - `movil.webp`: 1600x1528, 115 KB, transparent, two phone frames,
    inserted as `<img class="mockup">` like the Arsenal phone image.
- No real person's face appears in any image; the prints are
  illustrations. No capture reaches the footer, which prints the
  store's phone number.
- Every fact on the page comes from the brutal-ink repo (README,
  `odd/tasks/shirt-store-mvp.md`, `odd/tasks/order-value.md`,
  `src/config/store.ts`) or from the live site.
- Lighthouse 12.8.2 on the live site, 2026-10-25, load average 2.1, one
  run each (perf/a11y/best practices/SEO):
  - home: mobile 96/100/100/100 with LCP 2.6 s; desktop 100/100/100/100;
  - Kaiba product: mobile 99/100/100/100 with LCP 2.0 s; desktop
    100/100/100/100;
  - CLS 0 in all four.
- Left out on purpose: the client's personal name, prices charged,
  hosting, the phone number, quotes.
- Parent fix 1f4baea: the page credited Baymard and NN/g for abandonment
  reasons without a link, and claimed every new test was written first.
  It now links Baymard's survey
  (https://baymard.com/lists/cart-abandonment-rate) with the reasons it
  lists: 40%, 18%, 17% and 12%. It drops the size claim, which that list
  does not support, and limits the test-first claim to the suggestions,
  where RED was observed.

Evidence B4:
- Writer, in this repo:
  - `npm test`: 12 passed.
  - `npm run build`: 0 errors, 0 warnings, 0 hints, 10 pages.
  - Browser check of `astro preview` at 1440x900 and 390x844: 40/40.
    The card is first, its image loads, its links go to `/brutal-ink`
    and the live store, and it has no GitHub link. `/brutal-ink` returns
    200 and its 8 images load with alt text. No overflow, no console
    errors, no 4xx or 5xx responses. `/llms.txt` lists the page.
- Parent, after 1f4baea:
  - `npm test`: 12 passed.
  - `npm run build`: 0 warnings, 0 hints, 10 pages; the Baymard link is
    in `dist/brutal-ink/index.html`.
  - Viewed the card image and `pedido.jpg`.
- No new tests (content and images), so the Test Value Gate has nothing
  to list.

Review (range 5ee1739..1f4baea, 13 files, 224 lines): medium, consent
granted, reliability lens, approved and acknowledged, lineage
`review-682f73d7328d8a1f`. Suggestions, non-blocking:
- R3-task-tracker-stale: this progress record was empty in the
  candidate; it is now filled in.
- Follow-up R3-llms-title-coupling: `llms.txt.ts` keys `PAGES` by the
  card title, so renaming a card silently drops its page link. The
  design predates this change; the FUNDAMUVI review raised the same
  point.
- Follow-up R3-card-live-whatsapp: the card links straight to the live
  store, and the "do not send" note is only on the case-study page. The
  FUNDAMUVI and Arsenal cards also link to their live sites.

## Next step

B5: push `feat/brutal-ink-case-study` and open one PR. The merge is the
user's.
