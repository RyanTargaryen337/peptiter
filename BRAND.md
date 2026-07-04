# BRAND.md — PepTiter

> The visual and verbal identity for PepTiter. This is the source of truth the
> website and `COPY.md` must be consistent with. Locked to the decisions made so
> far — anything here can be changed, but until it is, build against it.

Sibling document: `COPY.md` (page copy, drafted next).

---

## 1. Essence

**Modern lab tool, meet clean fitness app.** PepTiter is a free, web-based
peptide tracker that removes guesswork for beginners and prevents dosing errors
through accurate reconstitution math.

The identity has one job: **make precision feel trustworthy.** Calm, clean, and
measured — because for a health tool, measured *is* the message. No neon "GAINS"
energy. No fear-mongering. Whitespace and restraint.

Structurally, the brand is **one constant plus wayfinding**:

- **Titer teal** is the single brand color, used everywhere, so the whole product
  reads as one calm, clinical thing.
- **Four muted path accents** (one per audience) act as signposting only —
  weight-loss, performance, recovery, longevity — never as decoration and never
  mixed on the same view.

---

## 2. Logo & wordmark

The wordmark is the **one expressive element** in an otherwise restrained system.
It carries the personality; everything else stays quiet.

**Display face**

- **Intended face:** a dramatic, high-contrast ligature serif in the spirit of
  *Savio* / *Wafture* (the uploaded references). These are commercial fonts —
  **license the web font to ship the final logo.**
- **Working stand-in (embeddable now):** `DM Serif Display` — free via Google
  Fonts, logotype-ready, closest to the featured lockups. The swap to a licensed
  face is drop-in and won't change layout.
- **Closest free match to the references' delicate ligatures:** `Cormorant`
  (alternate stand-in if preferred over DM Serif Display).

**Construction**

- One word, camel-capped: **PepTiter** (capital P, capital T).
- **Single color.** Default `Ink #16212B` on light; reversed `Paper #F5F4EF` on
  dark or over imagery.
- Teal is the *systemic* accent, **not** the wordmark color by default.
- Optional expressive variant: teal at the `Pep│Titer` seam. Use sparingly —
  not the primary lockup.

**Editorial ("hero") lockup** — the treatment from your references:

- Tracked all-caps kicker above → wordmark → tracked all-caps kicker below.
  Example: `PEPTIDE TRACKER` / **PepTiter** / `PRECISION DOSING · EST. 2026`,
  with a teal middot.
- **All-caps + wide letter-tracking is reserved for these kicker lines only.**
  Nothing else in the product uses all-caps.

**Clear space & minimum size**

- Clear space on all sides = the cap height of the "P".
- Minimum size ≈ **110px wide** (digital) / 24px cap height. Below this the serif
  hairlines break up.

**Don'ts**

- Don't stretch, condense, or skew.
- Don't add shadows, gradients, outlines, or glow.
- Don't set body text, UI, or guide/calculator content in the display serif.
- Don't recolor the wordmark into a path accent.
- Don't place it on busy imagery without a scrim/overlay.

**Where the serif is allowed:** the logo/wordmark, and (optionally) large
marketing hero headlines. **Never** in the interface, guides, or calculator.

---

## 3. Color

### Core palette

| Token        | Hex       | Role |
|--------------|-----------|------|
| Titer teal   | `#0F766E` | Brand primary — primary CTA, links, active states, and the color of all mono data/numerals |
| Teal tint    | `#E6F4F1` | Teal wash backgrounds, subtle highlights |
| Teal deep    | `#0B5A54` | Text on teal tint, hover/pressed states |
| Ink          | `#16212B` | Primary text, wordmark, dark hero background |
| Slate        | `#5C6A67` | Secondary text, muted labels |
| Mist         | `#EDF0EE` | Dividers, hairline borders, light surfaces |
| Paper        | `#FBFAF6` | Page background (warm off-white); reversed wordmark color on dark |
| White        | `#FFFFFF` | Cards and raised surfaces |

### Path accents — wayfinding only

One accent per path. Used on that path's landing page, its library filter/badge,
and its section spine. **Never** used to color dosing content, and never mixed
two-to-a-view.

| Path         | Audience                 | Accent    | Tint (bg) |
|--------------|--------------------------|-----------|-----------|
| Weight-loss  | GLP-1 users              | `#3E6FA3` | `#ECF1F7` |
| Performance  | gym / bodybuilding       | `#BE5A3C` | `#F7ECE7` |
| Recovery     | healing / recovery       | `#5E8C62` | `#EDF3EE` |
| Longevity    | biohackers / enthusiasts | `#6A5CA0` | `#EEECF5` |

### Color rules

- **Teal is the constant; a path accent is contextual signposting.** Body copy
  stays Ink/Slate regardless of path. The accent marks *where you are*, not the
  content itself.
- **One accent per view.** Never rainbow a page.
- **Text on a colored fill** uses the deep end of that same family — never black
  or generic gray. (On a tint, use the accent itself or a darkened version.)
- **Flat only.** No gradients, glows, neon, or decorative effects — anywhere.
- Target **WCAG AA** contrast for all text. Ink and Slate on Paper pass; verify
  accent-on-tint chips before shipping.

Wire every value above as a CSS custom property (e.g. `--brand-teal`, `--ink`,
`--paper`, `--path-weightloss`).

---

## 4. Typography

Four roles, each with a clear lane:

| Role            | Typeface            | Used for |
|-----------------|---------------------|----------|
| Display / logo  | `DM Serif Display` (stand-in for licensed *Savio*/*Wafture*) | Wordmark + optional marketing hero headlines **only** |
| Headings / UI   | `Space Grotesk`     | Section headings, navigation, interface labels |
| Body / interface| `Inter`             | All reading copy and UI text |
| Data / numerals | `IBM Plex Mono`     | **Every** dose, unit, concentration, volume, and calculator readout |

All four are on Google Fonts and embeddable today.

**The signature rule:** numbers are always mono. Any figure a user reads —
`0.25 mg`, `25 units`, `U-100`, a concentration, a volume, a calculator output —
renders in IBM Plex Mono. This is what ties the product back to its name (*titer*
= a measure of concentration) and makes the calculator feel like an instrument
rather than a form.

**Type scale (suggested)**

- Display 48–64 · H1 28 · H2 22 · H3 18 · Body 16 (line-height 1.6–1.7) ·
  Small 13 · Inline mono matches its surrounding size · Hero dose readout 18–22.

**Weights:** regular (400) and medium (500) only. Avoid heavier weights — they
fight the calm, clinical feel.

**Case:** sentence case for all UI, headings, and buttons. Tracked all-caps is
reserved for the logo kicker lines (see §2).

**Number formatting:** always round to a sensible precision, always mono, and
spell units where it aids clarity (mg, mL, units, U-100).

---

## 5. UI & layout principles

- **Restraint first.** "Too cluttered" is the failure mode. Default to less.
- **The calculator is an instrument.** Mono readouts, clean inputs, and it is
  **usable instantly — no signup wall.** An account only *saves* the work.
- **Hairline borders** (`0.5px`, Mist), `12px` radius on cards, `8px` on
  controls.
- **One primary action per screen** — almost always *Create a free account*.
- **Flat surfaces.** White cards on a Paper page. No shadows beyond functional
  focus rings; no gradients.
- **Imagery:** clinical-but-warm — vial/lab macro, clean product shots, or calm
  lifestyle. Avoid gym-bro intensity and avoid fear imagery. The dark editorial
  hero is fine for marketing; the app interface stays light/Paper.

---

## 6. Voice & tone

**Personality:** a knowledgeable, non-judgmental guide. Precise, plain-spoken,
and calm.

**Principles**

- **Plain language.** Explain reconstitution and dosing so a beginner gets it,
  without dumbing it down.
- **Harm-reduction framing.** Meet people where they are, assume some will
  proceed regardless, and help them do it more safely. Accurate dosing math is
  the central harm-reduction feature — dosing errors are the biggest real risk.
- **Reference, not prescriber.** The site **"shows common protocols and
  calculates yours."** It never *recommends* or *prescribes* a dose.
- **Educational only — not medical advice.** Stated up front and visibly, never
  buried as fine print.
- **Sourced and transparent.** Every per-peptide guide cites its sources. This is
  the single biggest trust signal and the core differentiator from anonymous
  forum threads.
- **Never blur the categories.** GLP-1s (e.g. semaglutide, tirzepatide) are
  prescription medications. Many other peptides are sold as "research chemicals"
  **not approved for human consumption.** These are not the same thing, and the
  copy must never imply they are.

**Use:** reconstitute, bacteriostatic water, concentration, units, U-100,
protocol, common protocols, calculate yours, sourced, third-party tested, sterile
technique, refrigerated after reconstitution, harm reduction.

**Avoid:** prescribe, recommend (a dose), cure, "guaranteed," "safe" as an
absolute, hype ("GAINS," "shredded," "stacked"), fear ("dangerous!!"), and any
medical claim.

**Tone don'ts:** no fear-mongering, no hype, no condescension, no absolute safety
promises.

**Do / Don't**

- Do: "Enter your vial's concentration and target dose — we'll show the units."
- Don't: "Take 25 units of [peptide] for best results."
- Do: "GLP-1s like semaglutide are prescription medications. Many other peptides
  are sold as research chemicals not approved for human use — they aren't the
  same thing."
- Don't: present those two categories as interchangeable.

---

## 7. Content-integrity rules (non-negotiable)

These come straight from the brief and constrain both copy and UI:

- **Dosage numbers, cycle lengths, and mg-per-protocol values are sourced
  slots — never fabricated.** Every figure traces to a verified source supplied
  by the product owner. Anywhere a guide or the calculator would show a protocol
  figure, treat it as a slot fed by sourced data, not a hard-coded guess.
- **The calculator does unit math on user-entered values.** It converts
  concentration + target dose into syringe units; it does not originate protocol
  recommendations.
- **Every guide cites its sources.** This is the product's biggest trust signal.
- **The "How we think about this" statement is visible and up front:**
  harm-reduction, sources cited, not medical advice.
- Any example figures used for design or illustration (like `0.25 mg → 25 units`
  in a type specimen) are generic unit-conversion samples, **not** protocol
  recommendations for any named peptide.

---

## 8. Assets & swap path

- **Fonts (all Google Fonts, embeddable now):** DM Serif Display, Space Grotesk,
  Inter, IBM Plex Mono. Licensing *Savio* or *Wafture* for the display face is a
  drop-in replacement.
- **Color:** the hex values in §3 are the source of truth — implement as CSS
  custom properties and reference nowhere as raw hex in components.

---

*End of BRAND.md*
