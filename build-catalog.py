#!/usr/bin/env python3
"""Generate the peptide catalog from owner-supplied data (2026-07-05):
guide pages, the library, the reconstitution reference, and the calculator
selector. Reconstitution ratios and unit-conversion are owner-sourced;
protocol doses and cycle lengths remain empty sourced slots (CONTEXT.md §8).
Regulatory tags: RX / RC / BLEND (D-025, D-036) — monochrome, mandatory."""

RX = "Rx medication"
RC = "Research chemical — not for human use"
BLEND = "Supplement / blend"

# Reconstitution notes (owner data, grouped by dosing form)
R_MG = ("Lyophilized powder. Standard ratio: add 1 mL bacteriostatic water to "
        "a 2 mg vial; add 2 mL to 5 mg and larger vials. With 2 mL in a 5 mg+ "
        "vial, a full 100-unit U-100 syringe equals the vial's total mg "
        "(so 20 units = 1 mg on a 5 mg vial; 10 units = 1 mg on a 10 mg vial).")
R_IU = ("Dosed in international units. Add 1 mL bacteriostatic water; 100 units "
        "on a U-100 syringe then equals the vial's total IU.")
R_LIQ = ("Pre-mixed liquid blend — do not reconstitute. It arrives ready in a "
         "10 mL vial; draw directly (0.5 mL = 50 units on a U-100 syringe).")
R_NAD = ("Lyophilized powder. Smaller NAD+ vials follow the standard 2 mL "
         "ratio; for the 1000 mg vial (NJ1000) add 4 mL so the solution isn't "
         "too thick for a standard needle.")
R_CAGRISEMA = ("Contains 5 mg cagrilintide + 5 mg semaglutide — treat as a "
               "10 mg vial; add 2 mL bacteriostatic water (100 units = 10 mg).")
R_BPCTB = ("A 5 mg + 5 mg blend — treat as a 10 mg vial; add 2 mL "
           "bacteriostatic water (100 units = 10 mg).")

# Each product: slug, name, tag, form-note, available sizes, descriptor.
# descriptor defaults to the category line where no owner/CONTEXT fact exists.
CATALOG = [
 ("011", "GLP-1 receptor agonists & incretins", "GLP-1s and incretin analogues are prescription medications.", [
   ("semaglutide", "Semaglutide", RX, R_MG, "5 mg (in CS10 blend)", "A GLP-1 receptor agonist."),
   ("tirzepatide", "Tirzepatide", RX, R_MG, "TR5 · TR10 · TR15 · TR20 · TR30 · TR40 · TR50 · TR60 · TR70 · TR80 · TR90 · TR100 · TR120 (mg)", "A prescription medication."),
   ("retatrutide", "Retatrutide", RX, R_MG, "RT5 · RT10 · RT15 · RT20 · RT30 · RT40 · RT50 · RT60 (mg)", "A prescription medication."),
   ("cagrilintide", "Cagrilintide", RX, R_MG, "CGL5 · CGL10 (mg)", "A prescription medication."),
   ("cagrisema", "CagriSema", RX, R_CAGRISEMA, "CS10 — cagrilintide 5 mg + semaglutide 5 mg", "A prescription-medication blend."),
   ("survodutide", "Survodutide", RX, R_MG, "SUR10 (mg)", "A prescription medication."),
 ]),
 ("012", "Hormones", "Somatropin and hCG are prescription medications.", [
   ("hgh-191aa", "HGH 191AA (Somatropin)", RX, R_IU, "M10 · M12 · M15 · M24 · M36 (IU)", "A prescription medication."),
   ("hcg", "HCG", RX, R_IU, "G5K — 5,000 IU · G10K — 10,000 IU", "A prescription medication. On G10K, 10 units = 1,000 IU."),
 ]),
 ("013", "Growth-hormone secretagogues", "Sold as research chemicals — not approved for human consumption.", [
   ("ipamorelin", "Ipamorelin", RC, R_MG, "IP5 · IP10 (mg)", "A growth-hormone secretagogue."),
   ("cjc-1295-no-dac", "CJC-1295 (no DAC)", RC, R_MG, "CND2 · CND5 · CND10 (mg)", "A growth-hormone secretagogue."),
   ("cjc-1295-ipamorelin", "CJC-1295 (no DAC) + Ipamorelin", RC, R_MG, "CP10 (mg)", "A growth-hormone secretagogue blend."),
   ("cjc-1295-dac", "CJC-1295 (with DAC)", RC, R_MG, "CD2 · CD5 (mg)", "A growth-hormone secretagogue."),
   ("sermorelin", "Sermorelin", RC, R_MG, "SMO5 · SMO10 (mg)", "A growth-hormone secretagogue."),
   ("tesamorelin", "Tesamorelin", RC, R_MG, "TSM2 · TSM5 · TSM10 · TSM20 (mg)", "A growth-hormone secretagogue."),
   ("hexarelin", "Hexarelin Acetate", RC, R_MG, "HX5 (mg)", "A growth-hormone secretagogue."),
   ("ghrp-2", "GHRP-2 Acetate", RC, R_MG, "G25 · G210 (mg)", "A growth-hormone secretagogue."),
   ("ghrp-6", "GHRP-6 Acetate", RC, R_MG, "G65 · G610 (mg)", "A growth-hormone secretagogue."),
   ("mgf", "MGF", RC, R_MG, "FM2 (mg)", "Sold as a research chemical — not approved for human consumption."),
   ("igf-1-lr3", "IGF-1 LR3", RC, R_MG, "IG01 (mg)", "Sold as a research chemical — not approved for human consumption."),
   ("igf-1", "IGF-1", RC, R_MG, "IG1 (mg)", "Sold as a research chemical — not approved for human consumption."),
 ]),
 ("014", "Recovery & repair peptides", "Sold as research chemicals — not approved for human consumption.", [
   ("bpc-157", "BPC-157", RC, R_MG, "BC5 · BC10 (mg)", "A recovery peptide."),
   ("tb-500", "TB-500", RC, R_MG, "BT2 · BT5 · BT10 (mg)", "A recovery peptide."),
   ("bpc-tb", "BPC-157 + TB-500", RC, R_BPCTB, "BB10 · BB20 — 5 mg + 5 mg blend", "A recovery-peptide blend."),
   ("ghk-cu", "GHK-Cu", RC, R_MG, "CU50 · CU100 (mg) — on CU100, 10 units = 10 mg", "Sold as a research chemical — not approved for human consumption."),
   ("kpv", "KPV", RC, R_MG, "KP5 · KP10 (mg)", "Sold as a research chemical — not approved for human consumption."),
   ("vip", "VIP", RC, R_MG, "VP10 (mg)", "Sold as a research chemical — not approved for human consumption."),
   ("ll-37", "LL-37", RC, R_MG, "375 (mg)", "Sold as a research chemical — not approved for human consumption."),
   ("thymalin", "Thymalin", RC, R_MG, "TY10 (mg)", "Sold as a research chemical — not approved for human consumption."),
   ("thymosin-alpha-1", "Thymosin Alpha-1", RC, R_MG, "TA5 · TA10 (mg)", "Sold as a research chemical — not approved for human consumption."),
   ("glow", "GLOW (BBG70)", RC, R_MG, "BBG70 — TB-500 10 mg + BPC-157 10 mg + GHK-Cu 50 mg", "A recovery-peptide blend: TB-500, BPC-157, GHK-Cu."),
   ("klow", "KLOW (Klow80)", RC, R_MG, "Klow80 — TB-500 10 mg + BPC-157 10 mg + GHK-Cu 50 mg + KPV 10 mg", "A recovery-peptide blend: TB-500, BPC-157, GHK-Cu, KPV."),
 ]),
 ("015", "Longevity & metabolic", "Sold as research chemicals — not approved for human consumption.", [
   ("mots-c", "MOTS-c", RC, R_MG, "MS10 · MS20 · MS40 (mg)", "Sold as a research chemical — not approved for human consumption."),
   ("epithalon", "Epithalon", RC, R_MG, "ET10 · ET50 (mg)", "Sold as a research chemical — not approved for human consumption."),
   ("5-amino-1mq", "5-Amino-1MQ", RC, R_MG, "5AM · 50AM (mg)", "Sold as a research chemical — not approved for human consumption."),
   ("ss-31", "SS-31", RC, R_MG, "2S10 · 2S50 (mg)", "Sold as a research chemical — not approved for human consumption."),
   ("foxo4-dri", "FOXO4-DRI", RC, R_MG, "F410 (mg)", "Sold as a research chemical — not approved for human consumption."),
   ("aicar", "AICAR", RC, R_MG, "AR50 (mg)", "Sold as a research chemical — not approved for human consumption."),
   ("adipotide", "Adipotide", RC, R_MG, "AP5 (mg)", "Sold as a research chemical — not approved for human consumption."),
   ("aod-9604", "AOD-9604", RC, R_MG, "2AD · 5AD (mg)", "Sold as a research chemical — not approved for human consumption."),
 ]),
 ("016", "Cognitive & signalling", "Sold as research chemicals — not approved for human consumption.", [
   ("selank", "Selank", RC, R_MG, "SK5 · SK10 (mg)", "Sold as a research chemical — not approved for human consumption."),
   ("semax", "Semax", RC, R_MG, "XA5 · XA10 (mg)", "Sold as a research chemical — not approved for human consumption."),
   ("dsip", "DSIP", RC, R_MG, "DS5 · DS10 · DS15 (mg)", "Sold as a research chemical — not approved for human consumption."),
   ("dermorphin", "Dermorphin", RC, R_MG, "DR5 (mg)", "Sold as a research chemical — not approved for human consumption."),
   ("melanotan-1", "Melanotan I", RC, R_MG, "MT1 (mg)", "Sold as a research chemical — not approved for human consumption."),
   ("melanotan-2", "Melanotan II", RC, R_MG, "MT-2 · ML10 (mg)", "Listed in the library's “others” category."),
   ("pt-141", "PT-141", RC, R_MG, "P41 (mg)", "Listed in the library's “others” category."),
   ("oxytocin", "Oxytocin Acetate", RC, R_MG, "OT2 · OT5 · OT10 (mg)", "Sold as a research chemical — not approved for human consumption."),
   ("gonadorelin", "Gonadorelin", RC, R_MG, "GND2 (mg)", "Sold as a research chemical — not approved for human consumption."),
   ("kisspeptin-10", "Kisspeptin-10", RC, R_MG, "KS5 · KS10 (mg)", "Sold as a research chemical — not approved for human consumption."),
   ("snap-8", "SNAP-8", RC, R_MG, "NP810 — 10 mg", "Sold as a research chemical — not approved for human consumption."),
 ]),
 ("017", "Supplements & blends", "Neither prescription medications nor research chemicals — supplement-style blends and vitamins.", [
   ("shb", "Super Human Blend (SHB)", BLEND, R_LIQ, "10 mL vial", "A blend: L-Arginine, L-Ornithine, L-Citrulline, L-Lysine, L-Glutamine, L-Proline, L-Taurine, L-Carnitine, NAC."),
   ("lc526", "Super Shred (LC526)", BLEND, R_LIQ, "10 mL vial", "A blend: L-Carnitine, Methionine, Inositol, Choline, B12, B6, NAD+."),
   ("lc216", "LC216", BLEND, R_LIQ, "10 mL vial", "A blend: L-Carnitine, Arginine, Methionine, Inositol, Choline, B5, B6, B12."),
   ("nad-plus", "NAD+", BLEND, R_NAD, "NJ100 · NJ500 · NJ1000 (mg)", "NAD+."),
   ("ha5", "Hyaluronic Acid (HA5)", BLEND, R_MG, "HA5", "Hyaluronic acid."),
   ("vitamin-b12", "Vitamin B12", BLEND, R_LIQ, "B1210", "Vitamin B12."),
   ("glutathione", "Glutathione", BLEND, R_LIQ, "GTT600", "Glutathione."),
   ("lemon-bottle", "Lemon Bottle", BLEND, R_LIQ, "LB", "Lemon Bottle."),
   ("melatonin", "Melatonin", BLEND, R_MG, "MT10 (mg)", "Melatonin."),
 ]),
]

# Reconstitution supplies — not carded/tagged as peptides; listed on the
# reconstitution page only.
SUPPLIES = [
  ("Bacteriostatic Water", "BA3 · BA10", "0.9% benzyl alcohol preservative — holds a reconstituted vial in the fridge for up to 14 days."),
  ("Acetic Acid 0.6%", "AA3 · AA10", "A solvent used for peptides that need it."),
]

TAG_INDEX = {  # library group index used in guide breadcrumb
}

PLATE_SVGS = [
  '<circle cx="20" cy="48" r="8"/><circle cx="48" cy="30" r="8"/><circle cx="48" cy="66" r="8"/><circle cx="76" cy="48" r="8"/><path d="M27 43 L41 34 M27 53 L41 62 M55 34 L69 43 M55 62 L69 53"/>',
  '<circle cx="24" cy="24" r="8"/><circle cx="72" cy="24" r="8"/><circle cx="24" cy="72" r="8"/><circle cx="72" cy="72" r="8"/><path d="M32 24 L64 24 M24 32 L24 64 M72 32 L72 64 M32 72 L64 72"/>',
  '<circle cx="20" cy="30" r="8"/><circle cx="48" cy="48" r="8"/><circle cx="76" cy="30" r="8"/><circle cx="48" cy="76" r="8"/><path d="M26 36 L42 44 M70 36 L54 44 M48 56 L48 68"/>',
  '<circle cx="48" cy="20" r="8"/><circle cx="22" cy="60" r="8"/><circle cx="74" cy="60" r="8"/><path d="M42 26 L28 53 M54 26 L68 53 M30 60 L66 60"/>',
  '<circle cx="20" cy="48" r="8"/><circle cx="48" cy="48" r="8"/><circle cx="76" cy="48" r="8"/><path d="M28 48 L40 48 M56 48 L68 48"/>',
]

TOPBAR = '''<header class="topbar">
  <a class="topbar-brand" href="/">PepTiter</a>
  <nav class="topbar-nav" aria-label="Primary">
    <a href="/library.html"{lib}>Library</a>
    <a href="/calculator.html"{calc}>Calculator</a>
    <a href="/how-we-think.html"{hwt}>How we think</a>
  </nav>
  <div class="topbar-right">
    <a class="status-pill" href="/calculator.html">Calculator — no signup</a>
  </div>
</header>'''

SITEBG = '''<!-- Site background video (D-030) — fixed behind every page -->
<div class="site-bg" aria-hidden="true">
  <video src="/assets/media/hero-vial.mp4"
         poster="/assets/media/hero-vial-poster.jpg"
         autoplay muted loop playsinline></video>
</div>'''

FOOTER = '''<footer class="canvas-ink">
  <p class="disclaimer">Educational only — not medical advice</p>
  <div class="footer">
    <a class="footer-brand" href="/">PepTiter</a>
    <div class="footer-grid">
      <p class="muted longform">A free, web-based peptide tracker. Harm-reduction
        framing, sources cited, not medical advice. GLP-1s are prescription
        medications; many other peptides are sold as research chemicals not
        approved for human consumption — they are not the same thing.</p>
      <nav class="footer-links" aria-label="Footer">
        <a href="/library.html">Library</a>
        <a href="/calculator.html">Calculator</a>
        <a href="/reconstitution.html">Reconstitution</a>
        <a href="/tracker.html">Tracker</a>
        <a href="/how-we-think.html">How we think</a>
        <a href="/account.html">Create free account</a>
        <a href="/paths/weight-loss.html">Weight-loss path</a>
        <a href="/paths/performance.html">Performance path</a>
        <a href="/paths/recovery.html">Recovery path</a>
        <a href="/paths/longevity.html">Longevity path</a>
      </nav>
    </div>
  </div>
</footer>'''

MODAL = '''<!-- Account modal (D-032) — donor: pasted sign-in card, reskinned -->
<div class="account-modal" id="account-modal" role="dialog" aria-modal="true" aria-label="Create a free account" hidden>
  <div class="account-card">
    <div class="split">
      <span class="account-brand">PepTiter</span>
      <button class="btn-outline" type="button" data-account-close>Close</button>
    </div>
    <h2 class="subheading account-title">Create a free account</h2>
    <p class="muted" style="font-size: 14px;">The account gates saving your log —
      not the calculator itself. Signing up is what lets you save protocols and
      track progress over time.</p>
    <form class="account-form" novalidate>
      <label class="field">
        <span class="label label--xs">Email</span>
        <span class="field-input"><input class="acc-email" type="email" autocomplete="email"></span>
      </label>
      <label class="field">
        <span class="label label--xs">Password</span>
        <span class="field-input"><input class="acc-pass" type="password" autocomplete="new-password"></span>
      </label>
      <p class="label label--xs account-error" hidden></p>
      <button class="btn-fill btn-fill--block account-submit" type="submit">Create free account ↗</button>
      <p class="label label--xs muted"><button class="linklike account-toggle" type="button">Already have an account? Sign in</button></p>
    </form>
    <div class="account-done stack-16" hidden>
      <span class="tag">Idea stage — accounts are not live yet</span>
      <p class="muted" style="font-size: 14px;">This website is the first step —
        the account system isn't built yet. The calculator is open in the
        meantime: usable instantly, before any signup.</p>
      <a class="btn-outline" href="/calculator.html">Open calculator ↗</a>
    </div>
  </div>
</div>'''

CHROME = '''<a class="float-cta" href="/#account" data-account-open>Create free account ↗</a>
<a class="edge-tab" href="/how-we-think.html">How we think</a>'''

def page(title, desc, main, current=None):
    lib = ' aria-current="page"' if current == 'library' else ''
    calc = ' aria-current="page"' if current == 'calculator' else ''
    hwt = ' aria-current="page"' if current == 'how-we-think' else ''
    return f'''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title}</title>
<meta name="description" content="{desc}">
<link rel="stylesheet" href="/assets/css/fonts.css">
<link rel="stylesheet" href="/assets/css/main.css">
</head>
<body>

{SITEBG}

{TOPBAR.format(lib=lib, calc=calc, hwt=hwt)}

{main}

{FOOTER}

{CHROME}

{MODAL}

<script src="/assets/js/main.js"></script>
</body>
</html>
'''

# ---- Guides ----
GUIDE_MAIN = '''<!-- Guides are long-form reading surfaces: Paper-only (D-011), ~72ch (D-020) -->
<main class="canvas-paper" data-static>

  <div class="page-head">
    <p class="label label--xs section-index">{gindex} — Library / {group}</p>
    <h1 class="heading">{name}</h1>
    <div class="tag-row">
      <span class="tag tag--category">{tag}</span>
      <span class="tag muted">Sources pending</span>
      <span class="tag muted">Updated 2026-07</span>
    </div>
  </div>

  <section class="section" style="padding-top: var(--space-24);">
    <div class="stack-48 measure">

      <div class="stack-16">
        <p class="label label--xs section-index">001 — What it is</p>
        <h2 class="heading heading--sm">What it is</h2>
        <p class="longform">{descriptor}{category_sentence}</p>
        <p class="label label--xs muted">Available: {sizes}</p>
      </div>

      <div class="stack-16">
        <p class="label label--xs section-index">002 — Reconstitution</p>
        <h2 class="heading heading--sm">Reconstitution</h2>
        <p class="longform">{recon}</p>
        <div class="hero-cta-row">
          <a class="btn-outline" href="/calculator.html">Open calculator ↗</a>
          <a class="btn-outline" href="/reconstitution.html">Reconstitution reference ↗</a>
        </div>
      </div>

      <div class="stack-16">
        <p class="label label--xs section-index">003 — Common protocols</p>
        <h2 class="heading heading--sm">Common protocols</h2>
        <p class="disclaimer disclaimer--inline">Educational only — not medical advice</p>
        <div class="sourced-slot">
          <span class="tag">Sourced slot — pending verified sources</span>
          <p class="longform">Dosage numbers, cycle lengths, and mg-per-protocol
            values are sourced slots — never fabricated. Figures appear here
            once verified sources are supplied by the product owner, with
            citations below. The site shows common protocols and calculates
            yours; it never recommends or prescribes a dose.</p>
        </div>
      </div>

      <div class="stack-16">
        <p class="label label--xs section-index">004 — Cycle duration</p>
        <h2 class="heading heading--sm">Cycle duration</h2>
        <div class="sourced-slot">
          <span class="tag">Sourced slot — pending verified sources</span>
          <p class="longform">Cycle-length figures are sourced slots, filled
            only from verified sources supplied by the product owner.</p>
        </div>
      </div>

      <div class="stack-16">
        <p class="label label--xs section-index">005 — On-cycle care</p>
        <h2 class="heading heading--sm">On-cycle care</h2>
        <div class="rows">
          <div class="row">
            <span class="label label--strong row-label">Sterile technique</span>
            <span class="row-value muted">Inject the water slowly against the
              inside glass wall of the vial, not onto the powder; let it sit
              5–10 minutes and swirl gently — never shake.</span>
          </div>
          <div class="row">
            <span class="label label--strong row-label">Refrigerate after reconstitution</span>
            <span class="row-value muted">Keep reconstituted vials at 2–8 °C and
              discard after 14 days.</span>
          </div>
          <div class="row">
            <span class="label label--strong row-label">Sourcing &amp; purity</span>
            <span class="row-value muted">Fake and contaminated product is one
              of the biggest real risks in this space — third-party lab testing
              matters.</span>
          </div>
        </div>
      </div>

      <div class="stack-16">
        <p class="label label--xs section-index">006 — Sources</p>
        <h2 class="heading heading--sm">Sources</h2>
        <p class="longform muted">Every guide cites its sources — the biggest
          trust signal this product has. Reconstitution ratios on this page are
          from owner-supplied guidance; protocol figures are supplied by the
          product owner.</p>
        <div>
          <div class="citation-row">
            <span class="citation-index">[1]</span>
            <span class="citation-title muted">Owner-supplied reconstitution guidance (2026-07)</span>
          </div>
          <div class="citation-row">
            <span class="citation-index">[2]</span>
            <span class="citation-title muted">Protocol source pending — supplied by the product owner</span>
          </div>
        </div>
      </div>

    </div>
  </section>

</main>'''

def category_sentence(tag):
    if tag == RX:
        return (" GLP-1s like semaglutide and tirzepatide are prescription "
                "medications — a different category from peptides sold as "
                "research chemicals, and this guide never blurs the two.")
    if tag == RC:
        return (" It is a different category from prescription medications like "
                "GLP-1s, and this guide never blurs the two.")
    return (" It is a supplement-style product — neither a prescription "
            "medication nor a research chemical.")

import os
os.makedirs("guides", exist_ok=True)

guide_count = 0
for gindex, group, gline, products in CATALOG:
    for slug, name, tag, recon, sizes, descriptor in products:
        # avoid double category sentence when descriptor already carries it
        cs = category_sentence(tag)
        if "never blurs" in descriptor or "supplement-style" in descriptor:
            cs = ""
        main = GUIDE_MAIN.format(
            gindex=gindex, group=group, name=name, tag=tag,
            descriptor=descriptor, category_sentence=cs,
            sizes=sizes, recon=recon)
        html = page(f"{name} guide — PepTiter",
                    "Per-peptide guide: what it is, how to reconstitute it, "
                    "common protocols, cycle duration, and on-cycle care. "
                    "Sources cited.", main, current='library')
        open(f"guides/{slug}.html", "w").write(html)
        guide_count += 1

# ---- Library ----
def card(slug, name, tag, descriptor, i):
    svg = PLATE_SVGS[i % len(PLATE_SVGS)]
    return f'''      <a class="peptide-card" href="/guides/{slug}.html">
        <div class="peptide-card-head">
          <span class="peptide-name">{name}</span>
          <span class="tag tag--category">{tag}</span>
        </div>
        <div class="peptide-plate" aria-hidden="true">
          <svg viewBox="0 0 96 96" fill="none" stroke="currentColor" stroke-width="1.5">{svg}</svg>
        </div>
        <div class="peptide-card-body">
          <p>{descriptor}</p>
          <div class="tag-row"><span class="tag" style="color: var(--brand-teal);">View guide</span></div>
        </div>
      </a>'''

lib_sections = []
i = 0
for gindex, group, gline, products in CATALOG:
    cards = []
    for slug, name, tag, recon, sizes, descriptor in products:
        cards.append(card(slug, name, tag, descriptor, i)); i += 1
    pad = "var(--space-24)" if gindex == "011" else "0"
    lib_sections.append(f'''  <section class="section" style="padding-top: {pad};">
    <div class="section-head">
      <p class="label label--xs section-index">{gindex} — Category</p>
      <h2 class="heading heading--sm">{group}</h2>
      <p class="muted measure">{gline}</p>
    </div>
    <div class="card-grid">
{chr(10).join(cards)}
    </div>
  </section>''')

lib_main = f'''<!-- Library is an app/tool surface: Paper-only (D-011) -->
<main class="canvas-paper">

  <div class="page-head">
    <p class="label label--xs section-index">010 — Library</p>
    <h1 class="heading">Peptide library</h1>
    <p class="muted measure">Per-peptide guides: what it is, how to reconstitute
      it, common protocols, cycle duration, and on-cycle care. Every guide cites
      its sources. Dosage figures come from verified sources supplied by the
      product owner — never fabricated.</p>
    <div class="hero-cta-row">
      <a class="btn-outline" href="/reconstitution.html">Reconstitution reference ↗</a>
      <a class="btn-outline" href="/calculator.html">Open calculator ↗</a>
    </div>
  </div>

{chr(10).join(lib_sections)}

</main>'''
open("library.html", "w").write(page("Library — PepTiter",
    "The peptide library. Per-peptide guides with cited sources.",
    lib_main, current='library'))

# ---- Reconstitution page ----
supply_rows = "\n".join(
  f'''      <div class="row">
        <span class="label label--strong row-label">{n}</span>
        <span class="row-value muted">{d} <span class="data" style="font-size:14px;">{codes}</span></span>
      </div>''' for n, codes, d in SUPPLIES)

recon_main = f'''<main class="canvas-paper" data-static>
  <div class="page-head">
    <p class="label label--xs section-index">025 — Reconstitution</p>
    <h1 class="heading">Reconstitution reference</h1>
    <p class="subheading measure">Peptides come as lyophilized (freeze-dried)
      powder and must be reconstituted with bacteriostatic water before use.
      The ratios below are owner-supplied; the calculator does the exact math
      on your own numbers.</p>
    <div class="tag-row">
      <span class="tag">Owner-supplied</span>
      <span class="tag">Updated 2026-07</span>
    </div>
  </div>

  <section class="section" style="padding-top: var(--space-24);">
    <div class="stack-48 measure">

      <div class="stack-16">
        <p class="label label--xs section-index">001 — Standard ratio</p>
        <h2 class="heading heading--sm">Standard ratio</h2>
        <div class="rows">
          <div class="row"><span class="label label--strong row-label">2 mg vial</span><span class="row-value muted">Add 1 mL bacteriostatic water.</span></div>
          <div class="row"><span class="label label--strong row-label">5 mg vial</span><span class="row-value muted">Add 2 mL — 100 units on a U-100 syringe then equals 5 mg (20 units = 1 mg).</span></div>
          <div class="row"><span class="label label--strong row-label">10 mg vial</span><span class="row-value muted">Add 2 mL — 100 units equals 10 mg (10 units = 1 mg).</span></div>
          <div class="row"><span class="label label--strong row-label">15–120 mg vial</span><span class="row-value muted">Add 2 mL to all — 100 units equals the vial's total mg.</span></div>
          <div class="row"><span class="label label--strong row-label">International units (HGH, HCG)</span><span class="row-value muted">Add 1 mL — 100 units equals the vial's total IU.</span></div>
          <div class="row"><span class="label label--strong row-label">Pre-mixed liquid blends</span><span class="row-value muted">Do not reconstitute — draw directly (0.5 mL = 50 units).</span></div>
        </div>
      </div>

      <div class="stack-16">
        <p class="label label--xs section-index">002 — Conversion chart</p>
        <h2 class="heading heading--sm">Dosage conversion</h2>
        <p class="muted">Example: 1 mL water into a 5 mg vial (U-100 syringe).</p>
        <div class="rows">
          <div class="row"><span class="label label--strong row-label">10 units</span><span class="row-value"><span class="data">0.5 mg</span></span></div>
          <div class="row"><span class="label label--strong row-label">20 units</span><span class="row-value"><span class="data">1.0 mg</span></span></div>
          <div class="row"><span class="label label--strong row-label">50 units</span><span class="row-value"><span class="data">2.5 mg</span></span></div>
          <div class="row"><span class="label label--strong row-label">100 units (full)</span><span class="row-value"><span class="data">5.0 mg</span></span></div>
        </div>
        <div><a class="btn-fill" href="/calculator.html">Calculate yours ↗</a></div>
      </div>

      <div class="stack-16">
        <p class="label label--xs section-index">003 — Exceptions</p>
        <h2 class="heading heading--sm">Exceptions</h2>
        <div class="rows">
          <div class="row"><span class="label label--strong row-label">NAD+ (NJ1000)</span><span class="row-value muted">1000 mg vial — add 4 mL so the solution isn't too thick for a standard needle.</span></div>
          <div class="row"><span class="label label--strong row-label">CagriSema (CS10)</span><span class="row-value muted">5 mg + 5 mg — treat as a 10 mg vial; add 2 mL.</span></div>
          <div class="row"><span class="label label--strong row-label">BPC-157 + TB-500 (BB10/BB20)</span><span class="row-value muted">5 mg + 5 mg — treat as a 10 mg vial; add 2 mL.</span></div>
          <div class="row"><span class="label label--strong row-label">GHK-Cu (CU100)</span><span class="row-value muted">100 mg vial — add 2 mL; 10 units = 10 mg.</span></div>
          <div class="row"><span class="label label--strong row-label">SNAP-8 (NP810)</span><span class="row-value muted">10 mg vial — add 2 mL.</span></div>
        </div>
      </div>

      <div class="stack-16">
        <p class="label label--xs section-index">004 — Handling</p>
        <h2 class="heading heading--sm">Handling</h2>
        <div class="rows">
          <div class="row"><span class="label label--strong row-label">Inject against the glass</span><span class="row-value muted">Aim the water at the inside wall of the vial, not directly at the powder.</span></div>
          <div class="row"><span class="label label--strong row-label">Let it dissolve</span><span class="row-value muted">Sit 5–10 minutes at room temperature; swirl gently, never shake — shaking can damage the peptide bonds.</span></div>
          <div class="row"><span class="label label--strong row-label">Store cold</span><span class="row-value muted">Refrigerate at 2–8 °C and use within 7–14 days.</span></div>
          <div class="row"><span class="label label--strong row-label">Bacteriostatic, not sterile</span><span class="row-value muted">Use bacteriostatic water (0.9% benzyl alcohol) for multi-use vials; sterile water is only for immediate single use.</span></div>
        </div>
      </div>

      <div class="stack-16">
        <p class="label label--xs section-index">005 — Supplies</p>
        <h2 class="heading heading--sm">Supplies</h2>
        <div class="rows">
{supply_rows}
        </div>
      </div>

    </div>
  </section>
</main>'''
open("reconstitution.html", "w").write(page("Reconstitution reference — PepTiter",
    "Owner-supplied reconstitution ratios and unit-conversion charts. The "
    "calculator does the exact math on your own numbers.", recon_main))

# ---- Calculator selector (optgroups + data attributes) ----
opts = ['<option value="">Not selected</option>']
for gindex, group, gline, products in CATALOG:
    opts.append(f'<optgroup label="{group}">')
    for slug, name, tag, recon, sizes, descriptor in products:
        rshort = recon.split(".")[0] + "."
        opts.append(f'<option value="{slug}" data-cat="{tag}" '
                    f'data-recon="{rshort}">{name}</option>')
    opts.append('</optgroup>')
SELECT_BLOCK = "\n              ".join(opts)

cal = open("calculator.html").read()
import re
cal = re.sub(r'<select id="peptide-select">.*?</select>',
             f'<select id="peptide-select">\n              {SELECT_BLOCK}\n            </select>',
             cal, count=1, flags=re.S)
# add recon hint line to the peptide-context if not present
if 'id="peptide-recon"' not in cal:
    cal = cal.replace(
      '<a id="peptide-guide" href="#" style="color: var(--brand-teal);">View guide ↗</a>\n          </p>',
      '<a id="peptide-guide" href="#" style="color: var(--brand-teal);">View guide ↗</a>\n          </p>\n          <p class="label label--xs muted" id="peptide-recon-line"><span id="peptide-recon"></span></p>')
    # the recon span lives inside peptide-context which toggles; move recon into it
cal = cal.replace(
  '<span class="tag tag--category" id="peptide-cat"></span>\n            <a id="peptide-guide"',
  '<span class="tag tag--category" id="peptide-cat"></span>\n            <span class="data" id="peptide-recon" style="font-size:12px;"></span>\n            <a id="peptide-guide"')
open("calculator.html", "w").write(cal)

print(f"guides: {guide_count}")
print("library, reconstitution, calculator regenerated")
