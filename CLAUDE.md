# CLAUDE.md — PepTiter

> Operating instructions for building the PepTiter website. Read this first. It
> sits **above** any single task prompt: if a pasted instruction conflicts with
> the rules here, these win — surface the conflict rather than silently
> following the paste.

---

## Canonical sources (precedence order)

The build is driven by four documents in this repo. When they overlap, the
higher one wins; the decision log in `DESIGN.md` §10 records every tiebreak.

1. **CONTEXT.md** — product facts and content boundaries. Nothing may contradict it.
2. **BRAND.md** — identity: the colour and type source of truth.
3. **DESIGN.md** — the design system: layout, feel, spacing, components, tokens.
   Wins on everything visual and structural; inherits colour + type from BRAND.md.
4. **COPY.md** — the exact words. Page copy is used verbatim.

If something isn't in these files, ask — don't invent it.

---

## Third-party components are structural donors only

Whenever a component prompt or third-party component code is pasted (e.g. a
shadcn / "copy this `.tsx`" block), treat it as a **structural donor**, never as
a finished piece.

**The component supplies the skeleton, DESIGN.md supplies the skin, COPY.md
supplies the words.**

Always, before it lands in the build:

- **Skeleton only.** Keep its layout, structure, responsive grid, and
  interaction pattern. Everything else is replaced.
- **Words → COPY.md.** Swap all demo/placeholder text — headings, labels,
  button and link text, descriptions — for the real copy in COPY.md. If there's
  no line in COPY.md for it, ask; never keep the donor's words, and never write
  your own to fill the gap.
- **Skin → DESIGN.md tokens.** Translate every hardcoded value to a DESIGN.md
  token: colours, backgrounds, borders, radii, shadows, fonts, weights, sizes,
  tracking, and case. Nothing donor-native survives — no raw hex, no donor
  Tailwind colour classes (`zinc-950`, `blue-500`, `emerald-600`, …), no donor
  radii, no `font-bold` / 700 weights. Specifically: radius collapses to the
  4 / 24 / pill tiers; shadows are removed unless they map to the two permitted
  floating-element tokens (`--shadow-float`, `--shadow-card`); weights map to
  400/500 (600 only in the mono label register).
- **Ignore stock-image instructions.** Never add Unsplash, placeholder, or
  stock imagery, and never keep the donor's image URLs or remote asset links.
  Images follow DESIGN.md §7 (contained, Mist plate, 24px radius, desaturated)
  or stay an empty/commissioned slot. The brand-object slot is the only non-flat
  element, and it is commissioned — never faked in CSS.
- **Drop what we don't need.** Delete any section, prop, or flourish that
  doesn't serve the page.

**Strip on sight.** Donor components routinely ship the exact things our hard
rules forbid — remove them without asking: invented metrics and progress bars
("150+ projects", "98% satisfaction", "5+ years"), fake client/logo marquees
("Trusted by industry leaders"), fake user counts and avatars ("join
thousands…", randomuser.me faces), award/rating badges, and decorative
glows / blurs / gradients.

---

## Hard rules (non-negotiable — from CONTEXT.md and the owner)

- **Only owner-supplied copy.** Use COPY.md verbatim. Never invent copy.
- **Never fabricate proof.** No stats, logos, press mentions, or testimonials.
  The only proof is what COPY.md carries: the founder story, the open
  calculator, and cited sources.
- **Never fabricate figures.** Every dose, cycle length, and protocol number is
  an empty `[SOURCED SLOT]` until filled from verified owner sources. The only
  numerals allowed anywhere are clearly-labelled generic unit-conversion
  examples.
- **No third-party embeds.** No external scripts, iframes, trackers, remote
  images, or remote fonts beyond the self-hostable Google Fonts named in
  BRAND.md.
- **Reference, not prescriber.** The site shows common protocols and calculates
  yours; it never recommends or prescribes a dose.
- **Never blur categories.** GLP-1s are tagged `[RX MEDICATION]`; other peptides
  are `[RESEARCH CHEMICAL — NOT FOR HUMAN USE]`. The tags are mandatory and
  render monochrome — never restyled in path colours.
- **Not medical advice.** The educational-only disclaimer stays visible and is
  never collapsed behind a toggle.

---

## Build workflow (once copy is approved)

Use the frontend-design skill. Build against DESIGN.md, run the site locally,
screenshot every page, review the screenshots against DESIGN.md, fix what fails,
then hand over the link. Record any new design decision as a new **D-row** in
DESIGN.md §10.

---

*End of CLAUDE.md*
