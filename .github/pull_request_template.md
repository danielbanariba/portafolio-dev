> **Write for the reviewer.** The description should read in one minute: what changes, why,
> and what to look at closely. No tables, no decorative sections, no repeating what the diff
> already shows. If it doesn't fit in a few lines, the PR is too big: split it.
> The technical detail belongs in the issue or the commit message.
>
> **A diagram when it explains better than text.** For flows, execution order, or
> relationships between components, a diagram replaces paragraphs: include it instead of
> describing them in prose, not in addition to.

## 📝 Description
<!-- Summary of the changes, following the commit template format -->
<!-- Example: :sparkles: feat(portfolio): add the new project card -->

**Detailed context:**
<!-- What changes and why, in a few lines. Mention linked issues (Closes #123) -->

---

## 🧪 Verification Checklist
- [ ] **Tests**: `npm test` (vitest) passes.
- [ ] **Build**: `npm run build` succeeds (it runs `astro check` first: 0 errors).
- [ ] **Browser**: checked with `npm run preview` on desktop and phone width: the changed sections render, images load, links work, no horizontal overflow.
- [ ] **llms.txt**: if a project or page changed, `/llms.txt` lists it correctly (a detail page needs its title in the `PAGES` map of `src/pages/llms.txt.ts`).
- [ ] **Content**: images have alt text, and nothing claims a client, number or result that cannot be shown.
- [ ] **Production impact**: merging `main` deploys production through Cloudflare Pages — confirmed this is intended.

---

## 📸 Attachments (Optional)
<!-- Desktop and phone screenshots if something visible changes -->
