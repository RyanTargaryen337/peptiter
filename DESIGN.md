# DESIGN.md — PepTiter

> The merged design system for the PepTiter website. Two inputs, one precedence
> rule:
>
> - **BRAND.md wins on colors and typography** (identity).
> - **The reference system wins on layout, feel, spacing, and components**
>   (structure). Reference: the Alejandro Mejias brutalist-editorial system.
>
> Where the two collide, this file is the resolution and §10 (Decision log) is
> the record. Where this file amends BRAND.md, the amendment is logged.
>
> Siblings: `CONTEXT.md` (product facts) · `BRAND.md` (identity) · `COPY.md`
> (page copy — pending).

---

## 1. The merge in one paragraph

PepTiter takes the reference's editorial-brutalist skeleton — full-bleed
canvases that flip light to dark, a three-zone top bar, tiny tracked monospace
labels in square brackets, a strict three-tier radius system, floating corner
chrome, typography doing all the hierarchy work — and pours the PepTiter
identity into it: Titer teal replaces acid lime as the single chromatic voice,
Ink/Paper replace obsidian/bone, and the type stack is the brand's four faces.
The result keeps the brief's core demand ("measured reads as trustworthy")
because the reference system is itself an exercise in restraint: monochrome
plus one accent, flat surfaces, no decoration. The bracketed mono labels —
`[THIRD-PARTY TESTED]`, `[SOURCED]` — read like archival lab codes, which is
exactly the register a product named after a measure of concentration should
speak in.

---

## 2. Color

Palette is BRAND.md §3, unchanged, plus two dark-canvas additions (D-019).
What changes is the *usage discipline*, inherited from the reference.

### Palette

| Token | Hex | Role |
|---|---|---|
| Titer teal | `#0F766E` | The single chromatic accent. Fills: primary CTA pill, calculator status pill, selected/active states. Text: links, all mono data readouts on light canvases. |
| Teal tint | `#E6F4F1` | Teal wash backgrounds, subtle highlight plates |
| Teal deep | `#0B5A54` | Text on teal tint; hover/pressed on teal fills |
| Teal light | `#7FD1C5` | **Dark-canvas only:** mono data readouts and links on Ink (added for WCAG AA — D-019) |
| Ink | `#16212B` | Primary text, structural 1px borders, wordmark, dark section canvas |
| Slate | `#5C6A67` | Secondary text, muted labels (light canvases) |
| Mist | `#EDF0EE` | Hairline dividers on dense surfaces, image/mockup plates |
| Paper | `#FBFAF6` | Light canvas; text and reversed wordmark on Ink |
| White | `#FFFFFF` | Raised cards on Paper (used sparingly — most content sits directly on canvas) |
| Paper muted | `rgba(251,250,246,.64)` | **Dark-canvas only:** secondary text on Ink (D-019) |

### Path accents — wayfinding only (unchanged from BRAND.md)

| Path | Accent | Tint |
|---|---|---|
| Weight-loss (GLP-1) | `#3E6FA3` | `#ECF1F7` |
| Performance | `#BE5A3C` | `#F7ECE7` |
| Recovery | `#5E8C62` | `#EDF3EE` |
| Longevity | `#6A5CA0` | `#EEECF5` |

### Usage rules (reference discipline, brand colors)

- **One chromatic voice.** On any view: monochrome (Ink/Slate/Mist/Paper) +
  teal. On a path page only: + that path's single accent as signposting
  (badge, filter chip, section spine). Never two path accents in one view.
- **Teal fills appear only at conversion moments** — the primary CTA, the
  calculator status pill, selected states. Teal never fills large sections;
  the teal tint may wash a small highlight plate at most.
- **Canvas flip is the section-break mechanism.** Marketing pages alternate
  Paper and Ink sections with hard edges — no gradients, no fades. App/tool
  surfaces (calculator, log, library browsing) stay Paper-only (D-011).
- **Text on dark:** Paper primary, Paper-muted secondary, Teal light for data
  and links. Never Slate or Titer teal as text on Ink (both fail contrast).
- **Structural borders are 1px Ink** on marketing surfaces (the reference's
  outlined voice). **0.5px Mist hairlines** remain for dense data surfaces —
  tables, the log, calculator internals (D-012).
- Flat everywhere. No gradients, glows, or decorative shadows (see §5).
- WCAG AA for all text. Verify path-accent-on-tint chips before ship.

---

## 3. Typography

Faces are BRAND.md §4, unchanged. Scale, case, and roles follow the reference
(D-010, D-013).

| Face | Role |
|---|---|
| DM Serif Display *(stand-in for licensed Savio/Wafture — D-003, open)* | Wordmark + the marketing hero headline only. Never caps. Never in UI, guides, or calculator. |
| Space Grotesk | Section display headings — **all-caps**, 32/48px, line-height 1.0, tracking +0.03–0.042em. Also sentence-case subheadings at 18px. |
| Inter | All body and interface copy. 16px only — one body size, no intermediates. Line-height 1.6 in long-form guides/articles, 1.4 in UI (D-024). |
| IBM Plex Mono | Two registers — see below. |

### The two mono registers (D-014)

Same family, two behaviors. This is where brand signature and reference
signature turn out to be the same font:

1. **Data register** (brand signature): every dose, unit, concentration,
   volume, and calculator readout. Sized to context (14–22px), weight 500,
   normal tracking, sentence case with units — `0.25 mg → 25 units · U-100`.
   Teal on light canvases; Teal light on Ink.
2. **Label register** (reference signature): all microlabels, nav items,
   metadata tags, section indices, button labels. 10–11px, weight 500–600,
   **all-caps**, tracking +0.086–0.109em. Ink on light, Paper on dark.
   Square-bracket notation for tags: `[THIRD-PARTY TESTED]` `[SOURCED]`
   `[UPDATED 2026-07]`.

### Case system (amends BRAND.md §4 — D-010)

- **ALL-CAPS:** mono label register · Space Grotesk display headings · logo
  kicker lines.
- **Sentence case:** body, subheadings, long-form, data register.
- **The serif is never set in caps.**

### Type scale (D-013)

| Role | Face | Size / LH / Tracking |
|---|---|---|
| Hero display | DM Serif Display | 56–64 / 1.05 / normal (marketing hero only) |
| Heading | Space Grotesk caps | 48 / 1.0 / +0.042em |
| Heading-sm | Space Grotesk caps | 32 / 1.0 / +0.042em |
| Subheading | Space Grotesk | 18 / 1.4 / −0.01em (sentence case) |
| Body | Inter | 16 / 1.6 long-form · 1.4 UI |
| Data mono | IBM Plex Mono 500 | 14–22 to context / 1.2 |
| Caption / label | IBM Plex Mono 500–600 caps | 10–11 / 1.0–1.4 / +0.086–0.109em |

No intermediate display sizes. Hierarchy comes from the jump between tiny
tracked labels and large headings, not from many steps.

Weights: 400 and 500 sitewide; 600 permitted only in the mono label register.
Number formatting: always mono, always sensibly rounded, units spelled
(mg, mL, units, U-100).

---

## 4. Spacing & shape

**Density:** compact (reference), with the large steps carrying marketing
breathing room.

### Spacing scale

`4 · 8 · 10 · 16 · 20 · 24 · 48 · 80 · 100` (px)

- Marketing section vertical padding: 80–100. Gap between sub-blocks: 48.
- Element gap: 10. Component padding: 4–16. Card padding: 16.
- Tool/data surfaces may tighten further but stay on the scale.

### Radius — strict three tiers (amends BRAND.md §5 — D-009)

| Tier | Value | Applies to |
|---|---|---|
| Precise | 4px | Buttons, tags, chips, inputs, outlined actions, the dose readout |
| Soft | 24px | Images, image plates, large content cards |
| Pill | 72–84px | Status pill, floating CTA, avatar pills only |

No 8px, no 12px, no intermediates. Sharp where the user acts; soft where
content sits; pill only for floating chrome.

### Borders & elevation

- 1px Ink structural borders (marketing); 0.5px Mist hairlines (dense data).
- **Flat system.** Exactly two elements may carry a soft shadow: the floating
  account CTA (`0 4px 12px rgba(0,0,0,.15)`) and small floating preview cards
  (`0 2px 8px rgba(0,0,0,.08)`). Nothing else. Focus rings are functional and
  exempt (D-023).

---

## 5. Layout

- **Full-bleed, edge-to-edge.** No centered max-width container on marketing
  pages; tight gutters (24 mobile / 48 desktop). Section transitions are
  immediate canvas flips (Paper ↔ Ink).
- **Reading measure exception (D-020):** long-form guide/article text is
  capped at ~72ch inside the full-bleed canvas. Educational health content
  outranks edge-to-edge purity.
- **Three-zone top bar:** left wordmark (serif, small lockup) · center nav
  (mono label register) · right calculator status pill (teal). Transparent
  over both canvases; sticky.
- **Floating chrome:** account CTA pill fixed bottom-right; "How we think"
  vertical tab on the right edge (D-018). Both persist across pages.
- **Hero (marketing):** wide left/right split — headline block left, bracketed
  metadata top-right, brand-object slot center/right (§7). `SCROLL ↓`
  indicator bottom-center in the label register.
- **Grids:** 2-column full-bleed for library/article cards; single column
  under 768px. Floating chrome persists on mobile; the edge tab collapses
  into the footer.
- **One primary action per screen** — create free account. The calculator
  pill is utility access, not a competing conversion (D-016/D-017).

---

## 6. Components

Reference components remapped to PepTiter. All obey the tokens above.

**Top bar** — three zones as in §5. Nav labels in the mono label register
(final wording pending COPY.md).

**Calculator status pill** — the reference's time badge, repurposed as the
product promise made persistent (D-016): teal fill, pill radius, mono caps
11px — `CALCULATOR — NO SIGNUP`, or a live conversion once the tool exists.
Teal deep on hover. The only teal fill in the header.

**Floating account CTA** — teal pill, bottom-right fixed: `CREATE FREE
ACCOUNT ↗` in mono caps 11px, Paper text. 4/16 padding, 84px radius, the
permitted soft shadow. Inverts correctly over Ink sections.

**Section display heading** — Space Grotesk caps per §3. Ink on Paper, Paper
on Ink. Optionally preceded by a mono section index (`014 — LIBRARY`).

**Bracketed metadata tag** — mono label register wrapped in literal square
brackets. Canonical PepTiter uses: `[SOURCED]` `[THIRD-PARTY TESTED]`
`[UPDATED 2026-07]` `[BEGINNER]`. No background, no border.

**Category tag (regulatory)** — a bracketed tag with a fixed, non-negotiable
vocabulary enforcing the brief's category line: `[RX MEDICATION]` for GLP-1s,
`[RESEARCH CHEMICAL — NOT FOR HUMAN USE]` for the rest. Always present on
peptide cards and guide headers. Path accents never restyle it — it renders
Ink/Paper only, so the warning never becomes decoration.

**Peptide card (library entry)** — the reference's project card: image or
molecular diagram on a Mist plate, 24px radius, optional 1px Ink border.
Above the plate: peptide name left (mono 14px) · category tag right. Below:
one Inter line + bracketed tags. No card background — sits on canvas.

**Dose readout** — data register mono on a Paper/White field, 1px Ink border,
**4px radius** (re-tiered per D-009): `0.25 mg → 25 units · U-100`. The
calculator's output moment; teal text, sized 18–22px.

**Outlined action button** — transparent, 1px Ink border (Paper on dark),
4px radius, mono caps 11px label + optional icon: `COPY` `VIEW SOURCES ↗`.
Secondary actions only.

**Source citation row** — guide footer rows: `[1]` mono index · source title
in Inter 16 · outlined `VIEW ↗`. 0.5px Mist dividers. This row is the
product's biggest trust signal rendered as a component.

**Contact/structured row** — the reference's two-column dark rows, reused for
the footer and the "paths" section: mono caps label left, value/action right,
48px row gap, 1px hairline dividers.

**Disclaimer strip** — mono label register, full-width: `EDUCATIONAL ONLY —
NOT MEDICAL ADVICE`. Persistent in the footer; repeated above calculator
output and guide protocol sections. Ink on Paper / Paper on Ink; never
smaller than 10px, never collapsed behind a toggle.

**Edge tab** — vertical `HOW WE THINK` strip, right viewport edge, mono caps
rotated 90°, 1px Ink left border. Links to the harm-reduction statement, so
the trust page is one click from everywhere (D-018).

**Scroll indicator** — `SCROLL ↓`, label register, hero bottom-center.

**Brand-object slot (D-022, open)** — the reference's 3D sculpture role: one
glossy sculptural object anchoring the hero (~280–340px). PepTiter candidate:
a rendered droplet/meniscus or vial form in Ink glass. **To be commissioned —
never faked with CSS.** Until the asset exists the slot renders empty, with a
flat SVG placeholder, or with owner-supplied contained video on a Mist plate
(D-027); it is the only non-flat element permitted in the system.

---

## 7. Imagery

Contained, never full-bleed decorative (reference rule). **One exception (D-028): the marketing hero runs the owner-supplied video full-bleed behind a functional Paper scrim.** Product/UI mockups
and vial/lab macro shots on Mist plates at 24px radius, desaturated or
monochrome-leaning. No lifestyle photography on marketing pages; no gym-bro
intensity; no fear imagery (D-021). Icons: mono-stroke, 1.5–2px, monochrome,
paired with mono labels. The design is the decoration.

---

## 8. Do / Don't

**Do**

- Keep every view monochrome + teal (+ at most one path accent on path pages).
- Set every label, tag, nav item, and button in the mono label register.
- Flip canvases Paper ↔ Ink as the only section-break mechanism.
- Hold the 4 / 24 / pill radius tiers exactly.
- Put the disclaimer strip and category tags where the eye already is.
- Keep the calculator reachable from the top bar on every page, no wall.

**Don't**

- Don't introduce chromatic colors beyond teal + the active path accent.
- Don't use teal as a large background fill, or restyle regulatory tags in
  path colors.
- Don't use 8px/12px radii, soft shadows (beyond the two floating elements),
  gradients, blurs, or glow.
- Don't set the serif in caps, in UI, or anywhere near dosing content.
- Don't set body above 18px or center-align body copy.
- Don't stack more than two type voices in one component (mono + one other).

---

## 9. Token quick-start

```css
:root {
  /* Color — brand (BRAND.md §3) + dark-canvas additions (D-019) */
  --brand-teal: #0F766E;
  --teal-tint: #E6F4F1;
  --teal-deep: #0B5A54;
  --teal-light: #7FD1C5;          /* dark-canvas data/links only */
  --ink: #16212B;
  --slate: #5C6A67;
  --mist: #EDF0EE;
  --paper: #FBFAF6;
  --white: #FFFFFF;
  --paper-muted: rgba(251,250,246,.64); /* dark-canvas secondary text */

  --path-weightloss: #3E6FA3;  --path-weightloss-tint: #ECF1F7;
  --path-performance: #BE5A3C; --path-performance-tint: #F7ECE7;
  --path-recovery: #5E8C62;    --path-recovery-tint: #EDF3EE;
  --path-longevity: #6A5CA0;   --path-longevity-tint: #EEECF5;

  /* Type — brand faces (BRAND.md §4) */
  --font-display: 'DM Serif Display', Georgia, serif; /* swap on license — D-003 */
  --font-heading: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif;
  --font-body: 'Inter', ui-sans-serif, system-ui, sans-serif;
  --font-mono: 'IBM Plex Mono', ui-monospace, SFMono-Regular, monospace;

  /* Scale (D-013) */
  --text-display: 64px;  --leading-display: 1.05;
  --text-heading: 48px;  --text-heading-sm: 32px;
  --leading-heading: 1.0; --tracking-heading: 0.042em;
  --text-subheading: 18px; --leading-subheading: 1.4;
  --text-body: 16px; --leading-body-longform: 1.6; --leading-body-ui: 1.4;
  --text-caption: 11px; --tracking-caption: 0.109em;

  /* Spacing */
  --space-4: 4px; --space-8: 8px; --space-10: 10px; --space-16: 16px;
  --space-20: 20px; --space-24: 24px; --space-48: 48px;
  --space-80: 80px; --space-100: 100px;
  --section-pad: var(--space-80);
  --section-gap: var(--space-48);
  --element-gap: var(--space-10);

  /* Radius tiers (D-009) */
  --radius-precise: 4px;
  --radius-soft: 24px;
  --radius-pill: 84px;

  /* Borders */
  --border-structural: 1px solid var(--ink);
  --border-hairline: 0.5px solid var(--mist);

  /* Elevation — floating chrome only (D-023) */
  --shadow-float: 0 4px 12px rgba(0,0,0,.15);
  --shadow-card: 0 2px 8px rgba(0,0,0,.08);
}
```

---

## 10. Decision log

Every design choice gets a row: ID, date, decision, rationale, and what it
supersedes. Statuses: **Locked** (build against it) · **Open** (needs an
asset, purchase, or owner call) · **Superseded** (replaced by a later row).
New decisions append; nothing is deleted.

| ID | Date | Decision | Rationale / supersedes | Status |
|---|---|---|---|---|
| D-001 | 2026-07-04 | Titer teal is the brand constant; four muted path accents are wayfinding only, one per view. | Brand-kit session; "one calm clinical thing." | Locked |
| D-002 | 2026-07-04 | All numerals/doses/readouts render in IBM Plex Mono (data register). | The signature tying product to name (*titer*). | Locked |
| D-003 | 2026-07-04 | Display face: dramatic ligature serif (Savio/Wafture spirit). DM Serif Display is the embeddable stand-in; Cormorant is the alternate. | Owner's uploaded references; commercial faces need a web license before final logo ships. | **Open** — license purchase |
| D-004 | 2026-07-04 | Serif scope: wordmark + marketing hero headline only. Never UI, guides, calculator. | Keeps drama as personality, precision where accuracy matters. | Locked |
| D-005 | 2026-07-04 | Wordmark is single-color (Ink / reversed Paper); teal-seam variant sparing, non-primary. | Cleaner with a dramatic serif; teal stays systemic. | Locked |
| D-006 | 2026-07-04 | BRAND.md is the identity source of truth. | Session close. | Locked |
| D-007 | 2026-07-04 | DESIGN.md created with precedence: brand wins colors+type; reference wins layout+feel+components; this log is the tiebreak record. | Owner instruction on merging uploaded references. | Locked |
| D-008 | 2026-07-04 | Teal inherits the reference's single-accent discipline: fills only at conversion moments; net rule = monochrome + teal (+ ≤1 path accent on path pages). | Reference's "one chromatic voice" is feel; palette is brand's. | Locked |
| D-009 | 2026-07-04 | Radius tiers 4 / 24 / 72–84 adopted; no 8px or 12px. | Reference's explicit tiering. **Supersedes BRAND.md §5 radii (8px controls / 12px cards).** | Locked |
| D-010 | 2026-07-04 | Case system: ALL-CAPS for mono label register + Space Grotesk display headings + logo kickers; sentence case elsewhere; serif never caps. | Reference feel. **Amends BRAND.md §4** ("all-caps for kickers only"). | Locked |
| D-011 | 2026-07-04 | Canvas-flip rhythm (Paper ↔ Ink) on marketing pages; app/tool surfaces stay Paper-only. | Reference section language; BRAND.md already confined dark treatments to marketing. | Locked |
| D-012 | 2026-07-04 | Borders: 1px Ink structural on marketing; 0.5px Mist hairlines on dense data surfaces. | Reference's outlined voice; hairlines kept for data legibility. | Locked |
| D-013 | 2026-07-04 | Type scale skeleton from reference (11 · 16 · 18 · 32 · 48) + 64px serif display; no intermediate steps. | Hierarchy via size contrast, not many steps. Supersedes BRAND.md §4 suggested scale. | Locked |
| D-014 | 2026-07-04 | Two mono registers defined: data (brand) and label (reference), same family. | The happy collision — both systems chose IBM Plex Mono. | Locked |
| D-015 | 2026-07-04 | Bracketed mono tags are the metadata voice: `[SOURCED]`, `[THIRD-PARTY TESTED]`, etc. | Reference signature; reads as lab catalog codes — on-concept. | Locked |
| D-016 | 2026-07-04 | Top-bar right zone = teal calculator status pill (`CALCULATOR — NO SIGNUP`). | Repurposes the reference's status pill as the product promise, persistent. | Locked |
| D-017 | 2026-07-04 | Floating bottom-right CTA = create free account; remains the single primary action per screen. | Reference chrome + brand conversion rule. | Locked |
| D-018 | 2026-07-04 | Right-edge vertical tab links to "How we think about this." | Reference's corner tab, repurposed so the trust statement is one click from everywhere. | Locked |
| D-019 | 2026-07-04 | Palette extended for dark canvases: Teal light `#7FD1C5` (data/links) and Paper-muted `rgba(251,250,246,.64)` (secondary text). | Titer teal and Slate fail WCAG AA on Ink; extension required for compliance. | Locked |
| D-020 | 2026-07-04 | Long-form guide/article text capped at ~72ch inside full-bleed canvases. | Legibility of educational health content outranks edge-to-edge purity. | Locked |
| D-021 | 2026-07-04 | Imagery: contained on Mist plates, 24px, desaturated; no lifestyle on marketing; vial/lab macro preferred. | Reference feel wins over BRAND.md's "calm lifestyle" allowance. | Locked |
| D-022 | 2026-07-04 | Brand-object slot defined (rendered droplet/meniscus or vial in Ink glass), the system's only non-flat element. Asset to be commissioned, never CSS-faked. | Reference's 3D anchor, translated to PepTiter's subject. | **Open** — commission asset |
| D-023 | 2026-07-04 | Flat system; exactly two floating elements may carry soft shadows. | Reference elevation model; brand was already flat-first. | Locked |
| D-024 | 2026-07-04 | Body line-height 1.6 long-form / 1.4 UI. | Deliberate softening of the reference's 1.4 for beginner-facing health reading. | Locked |
| D-025 | 2026-07-04 | Regulatory category tags (`[RX MEDICATION]` / `[RESEARCH CHEMICAL — NOT FOR HUMAN USE]`) are fixed-vocabulary, monochrome-only, mandatory on peptide cards and guide headers. | Enforces CONTEXT.md's category line at the component level. | Locked |
| D-026 | 2026-07-04 | Home "paths" section is an interactive switcher — one stage, four mono-caps tabs (4px radius, teal selected state), panel content swaps in place. Monochrome + teal only: home is not a path page, so path accents stay off it per D-008. Pill radius not used (reserved for floating chrome per D-009). | Structural donor: a pasted product-showcase component (per CLAUDE.md donor rule — skeleton kept, skin and words replaced). Avoids four stacked near-identical rows; adds an instrument-like interaction beside the calculator. | Locked |
| D-027 | 2026-07-05 | The brand-object slot may carry owner-supplied **contained** video until the commissioned asset exists: Mist plate, 24px radius, 1px Ink border, muted loop, no audio track, desaturated, poster fallback, paused under `prefers-reduced-motion`. Full-bleed video/imagery remains forbidden — owner asked for a hero *background*, conflict surfaced per CLAUDE.md, owner chose the contained treatment. §7 and D-021 stand unamended. | Owner-supplied hero video (2026-07-05). Contained treatment keeps §7's rule and suits the 736×400 source. **Superseded by D-028.** | Superseded |
| D-028 | 2026-07-05 | The owner-supplied video runs **full-bleed behind the marketing hero** — home hero only — desaturated, muted loop, with a functional Paper legibility scrim (a gradient, permitted as function, not decoration; wordmark/headline never sit on busy imagery unscrimmed per BRAND.md §2). The brand-object slot vacates the home hero; its definition (D-022) stands for the future commissioned asset. Everywhere else §7's containment rule holds. | Owner saw the contained version (D-027) and overruled: "I want it like a background of the website." Supersedes D-027; narrowly amends §7/D-021 for the marketing hero only. | Locked |
| D-029 | 2026-07-05 | Scroll motion language: slow hero-video parallax (0.22× scroll) and scroll-triggered fade-up reveals (0.5s, 14px rise) on structured elements sitewide. All motion disabled under `prefers-reduced-motion`; no-JS renders everything static and visible. | Owner request for Apple-grade scroll dynamism, implemented at the system's level of restraint. | Locked |
| D-030 | 2026-07-05 | The owner video becomes a **fixed, site-wide background** visible through every scroll: a fixed layer behind every page, with Paper/Ink canvases becoming near-opaque washes (rgba .95/.96) so the flip rhythm, contrast, and WCAG AA hold while the background breathes through. Hero keeps its lighter scrim so the video is strongest there. Parallax transform dropped — the fixed layer supplies the scroll effect natively. | Owner: "when I mean background I want it everywhere, with every scroll in the background." Extends D-028; amends §2's opaque-canvas rule. Reveals re-scoped and strengthened (24px / 0.65s), guides stay static via `data-static` (D-020). | Locked |
| D-031 | 2026-07-05 | Calculator gains an optional peptide selector: labels the calculation, shows the mandatory category tag, and links the guide. Selecting a peptide **never prefills or alters any figure** — protocol values remain sourced slots (CONTEXT.md §8); the math runs only on user-entered values. | Owner request; the guardrail keeps the reference-not-prescriber line intact. | Locked |
| D-032 | 2026-07-05 | Account modal built from the pasted sign-in donor (per CLAUDE.md donor rule): White content card at the 24px tier, 1px Ink border, instrument inputs, teal block button, monochrome mono error tags, sign-in/create toggle. Opens from every "create free account" action. Stripped on sight: Google button, avatar row, "join thousands" user-count claim, glassmorphism. Submitting shows the idea-stage state (`[IDEA STAGE — ACCOUNTS ARE NOT LIVE YET]`) — no fake success. | Owner request for sign-in/sign-up on account CTA; product is idea-stage (CONTEXT.md §1), so the modal is honest about not being live. | Locked |
| D-033 | 2026-07-05 | Home hero adopts the pasted glassmorphism-hero donor's **skeleton**: two-column layout (copy + CTA row left, trust cards right), staggered load-in, stats-card structure, and marquee mechanic. Refilled with real proofs: a calculator preview card (generic sample readout + conversion steps + open-calculator action) and a library marquee of the nine real guide links. Stripped on sight: award badge, "150+ projects", "98% satisfaction" progress bar, "5+ years / 24-7 / 100%" grid, PREMIUM/ACTIVE pills, fake-brand marquee, glassmorphism blur, glow, gradient text, Unsplash background instruction. Skin: White preview cards, 24px tier, 1px Ink border, `--shadow-card`. Motion honors `prefers-reduced-motion`; marquee pauses on hover. | Owner pasted the donor for integration; CLAUDE.md donor rule applied in full. | Locked |
| D-034 | 2026-07-05 | Second instance of the spatial-showcase donor (owner: "implement in addition"): the library gains a **category showcase** — one stage, four category tabs (shared switcher component), a Mist stage plate (24px tier) whose category motif scales in on swap, and the real peptide rows with mandatory regulatory tags beside it. The card grid remains below. Stripped: fake battery/latency/sync metrics and bars, glow rings, gradients, blur, bottom-fixed pill island (floating chrome is already spoken for), earbud imagery/imagekit URLs, framer-motion dependency. | CLAUDE.md donor rule; switcher JS generalized to serve both instances. | Locked |

**Open items beyond the log:** page list confirmation (gates the copy
interview) · COPY.md (pending) · display-face license (D-003) · brand-object
asset (D-022).

---

*End of DESIGN.md*
