/* PepTiter — shared chrome behavior */

(function () {
  var topbar = document.querySelector('.topbar');
  if (!topbar) return;

  // The bar is transparent over both canvases (DESIGN.md §5). Track which
  // canvas is under it so its text flips Ink/Paper, and paint the current
  // canvas color once scrolled so sticky text stays legible mid-section.
  var sections = Array.prototype.slice.call(
    document.querySelectorAll('.canvas-paper, .canvas-ink')
  );

  function update() {
    var y = topbar.getBoundingClientRect().bottom / 2;
    var overInk = false;
    for (var i = 0; i < sections.length; i++) {
      var r = sections[i].getBoundingClientRect();
      if (r.top <= y && r.bottom >= y) {
        overInk = sections[i].classList.contains('canvas-ink');
        break;
      }
    }
    topbar.classList.toggle('over-ink', overInk);
    topbar.classList.toggle('is-stuck', window.scrollY > 8);
  }

  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
})();

/* Hero parallax + scroll reveals (D-029) — restrained, reduced-motion-safe */
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var heroVideo = document.querySelector('.hero-bg video');
  if (heroVideo && !reduce) {
    var ticking = false;
    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        heroVideo.style.transform = 'translateY(' + window.scrollY * 0.22 + 'px)';
        ticking = false;
      });
    }, { passive: true });
  }

  if (reduce || !('IntersectionObserver' in window)) return;
  // Section-level marketing elements only. Deliberately excludes long-form
  // guide reading content (guides use .page-head + .stack-16, none of these),
  // so guide body is never hidden — reading surfaces stay static (D-020).
  var targets = document.querySelectorAll(
    '.section-head, .peptide-card, .switch-panel-head'
  );
  if (!targets.length) return;

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('revealed');
        io.unobserve(e.target);
      }
    });
  }, { rootMargin: '0px 0px -8% 0px' });
  targets.forEach(function (el) {
    el.classList.add('reveal');
    io.observe(el);
  });

  // Safety net: nothing may stay hidden. If anything is still unrevealed a
  // few seconds in (observer missed, JS hiccup), reveal it unconditionally.
  setTimeout(function () {
    document.querySelectorAll('.reveal:not(.revealed)').forEach(function (el) {
      el.classList.add('revealed');
    });
  }, 3000);
})();

/* Respect reduced motion: looping ambient video stays on its poster frame */
(function () {
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  document.querySelectorAll('video[autoplay]').forEach(function (v) {
    v.removeAttribute('autoplay');
    v.pause();
  });
})();

/* Path switcher (D-026) — one stage, four tabs, content swaps in place */
(function () {
  var switcher = document.getElementById('path-switcher');
  if (!switcher) return;
  var tabs = switcher.querySelectorAll('.switch-tab');
  var panels = switcher.querySelectorAll('.switch-panel');

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      tabs.forEach(function (t) {
        t.setAttribute('aria-selected', String(t === tab));
      });
      panels.forEach(function (p) {
        p.hidden = p.id !== tab.getAttribute('aria-controls');
      });
    });
  });
})();

/* Reconstitution calculator — unit math on user-entered values only.
   It converts concentration + target dose into syringe units; it does not
   originate protocol recommendations (CONTEXT.md §7). U-100 = 100 units/mL. */
(function () {
  var form = document.getElementById('calc');
  if (!form) return;

  var vialMg = document.getElementById('vial-mg');
  var waterMl = document.getElementById('water-ml');
  var doseMg = document.getElementById('dose-mg');
  var readout = document.getElementById('readout');
  var stepConc = document.getElementById('step-conc');
  var stepVol = document.getElementById('step-vol');
  var stepUnits = document.getElementById('step-units');

  function fmt(n, dp) {
    if (!isFinite(n)) return '—';
    var s = n.toFixed(dp);
    // trim trailing zeros but keep at least integer part
    return s.replace(/\.?0+$/, '') || '0';
  }

  function calc() {
    var mg = parseFloat(vialMg.value);
    var ml = parseFloat(waterMl.value);
    var dose = parseFloat(doseMg.value);

    if (!(mg > 0) || !(ml > 0) || !(dose > 0)) {
      readout.textContent = '— mg → — units · U-100';
      stepConc.textContent = '—';
      stepVol.textContent = '—';
      stepUnits.textContent = '—';
      return;
    }

    var conc = mg / ml;              // mg per mL
    var vol = dose / conc;           // mL to draw
    var units = vol * 100;           // U-100 syringe units

    readout.textContent =
      fmt(dose, 3) + ' mg → ' + fmt(units, 1) + ' units · U-100';
    stepConc.textContent = fmt(conc, 3) + ' mg/mL';
    stepVol.textContent = fmt(vol, 3) + ' mL';
    stepUnits.textContent = fmt(units, 1) + ' units';

    if (units > 100) {
      readout.textContent += ' — more than one U-100 syringe';
    }
  }

  [vialMg, waterMl, doseMg].forEach(function (el) {
    el.addEventListener('input', calc);
  });
  calc();
})();
