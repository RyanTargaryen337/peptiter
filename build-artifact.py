#!/usr/bin/env python3
"""Bundle the multi-page site into one self-contained HTML file
(hash-router SPA) for the Claude Artifact preview. Output path: argv[1]."""
import base64, re, sys

def datauri(p, m):
    return f"data:{m};base64," + base64.b64encode(open(p, "rb").read()).decode()

fonts_css = open("assets/css/fonts.css").read()
fonts_css = re.sub(
    r"url\('([^']+)'\) format\('woff2'\)",
    lambda m: "url(%s) format('woff2')" % datauri(m.group(1).replace("../fonts/", "assets/fonts/"), "font/woff2"),
    fonts_css)
main_css = open("assets/css/main.css").read().replace("body.path-", ".page.path-")
main_js = open("assets/js/main.js").read()
tracker_js = open("assets/js/tracker.js").read()

MEDIA = {
    "/assets/media/hero-vial.mp4": datauri("assets/media/hero-vial.mp4", "video/mp4"),
    "/assets/media/hero-vial-poster.jpg": datauri("assets/media/hero-vial-poster.jpg", "image/jpeg"),
}
routes = [
    ("home", "index.html", "PepTiter — free, web-based peptide tracker"),
    ("account", "account.html", "Create a free account — PepTiter"),
    ("library", "library.html", "Library — PepTiter"),
    ("calculator", "calculator.html", "Calculator — PepTiter"),
    ("how-we-think", "how-we-think.html", "How we think about this — PepTiter"),
    ("paths/weight-loss", "paths/weight-loss.html", "Weight-loss path — PepTiter"),
    ("paths/performance", "paths/performance.html", "Performance path — PepTiter"),
    ("paths/recovery", "paths/recovery.html", "Recovery path — PepTiter"),
    ("paths/longevity", "paths/longevity.html", "Longevity path — PepTiter"),
    ("reconstitution", "reconstitution.html", "Reconstitution reference — PepTiter"),
    ("tracker", "tracker.html", "Tracker — PepTiter"),
]
import glob as _glob
GUIDES = sorted(g[len("guides/"):-len(".html")] for g in _glob.glob("guides/*.html"))
for g in GUIDES:
    t = re.search(r"<title>(.*?)</title>", open(f"guides/{g}.html").read()).group(1)
    routes.append((f"guides/{g}", f"guides/{g}.html", t))

HREF = {"/": "#/home", "/index.html": "#/home", "/#account": "#/account",
        "/account.html": "#/account", "#account-page-card": "#/account",
        "/library.html": "#/library", "/calculator.html": "#/calculator",
        "/reconstitution.html": "#/reconstitution",
        "/tracker.html": "#/tracker",
        "/how-we-think.html": "#/how-we-think"}
for p in ["weight-loss", "performance", "recovery", "longevity"]:
    HREF[f"/paths/{p}.html"] = f"#/paths/{p}"
for g in GUIDES:
    HREF[f"/guides/{g}.html"] = f"#/guides/{g}"

def rw(html):
    html = re.sub(r'href="([^"]+)"', lambda m: 'href="%s"' % HREF.get(m.group(1), m.group(1)), html)
    for k, v in MEDIA.items():
        html = html.replace(k, v)
    return html

pages = []
for slug, fname, title in routes:
    src = open(fname).read()
    bc = re.search(r'<body class="([^"]+)"', src)
    cls = " " + bc.group(1) if bc else ""
    main = re.search(r"(<main[^>]*>.*?</main>)", src, re.S).group(1)
    ma = re.search(r"<main([^>]*)>", main).group(1)
    inner = re.sub(r"</main>$", "", re.sub(r"^<main[^>]*>", "", main, count=1).strip())
    pages.append(f'<div class="page{cls}" data-route="{slug}" data-title="{title}" hidden><main{ma}>{inner}</main></div>')
pages = rw("\n".join(pages))

src = open("index.html").read()
sitebg = rw(re.search(r'(<div class="site-bg".*?</video>\s*</div>)', src, re.S).group(1))
topbar = rw(re.search(r'(<header class="topbar">.*?</header>)', src, re.S).group(1))
footer = rw(re.search(r'(<footer class="canvas-ink">.*?</footer>)', src, re.S).group(1))
modal = rw(re.search(r'(<div class="account-modal".*?)\n<script', src, re.S).group(1))
chrome = ('<a class="float-cta" href="#/account">Create free account ↗</a>\n'
          '<a class="edge-tab" href="#/how-we-think">How we think</a>')

router = """
(function(){var pages=document.querySelectorAll('.page');var navLinks=document.querySelectorAll('.topbar-nav a');
function show(route){var found=null;
pages.forEach(function(p){var m=p.dataset.route===route;p.hidden=!m;if(m)found=p;});
if(!found){pages.forEach(function(p){p.hidden=p.dataset.route!=='home';if(p.dataset.route==='home')found=p;});}
document.title=found.dataset.title;
navLinks.forEach(function(a){var t=a.getAttribute('href').slice(2);if(t===route)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
window.scrollTo(0,0);
window.dispatchEvent(new Event('scroll'));}
function fromHash(){show(location.hash.replace(/^#\\//,'')||'home');}
window.addEventListener('hashchange',fromHash);fromHash();})();
"""
art = (f'<meta charset="utf-8">\n<title>PepTiter</title>\n<style>\n{fonts_css}\n{main_css}\n'
       f'.page[hidden]{{display:none;}}\n</style>\n{sitebg}\n{topbar}\n{pages}\n{footer}\n'
       f'{chrome}\n{modal}\n<script>\n{router}\n{main_js}\n{tracker_js}\n</script>\n')
out = sys.argv[1]
open(out, "w").write(art)
print("bundle:", len(art), "bytes | modals:", art.count('id="account-modal"'),
      "| topbars:", art.count('class="topbar"'))
