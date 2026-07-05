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

/* Scroll reveals (D-029) — restrained, reduced-motion-safe. The fixed site
   video (D-030) supplies the persistent background motion on every scroll. */
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduce || !('IntersectionObserver' in window)) return;
  // Marketing elements only; anything inside a [data-static] surface
  // (guides — long-form reading, D-020) is never hidden.
  var targets = Array.prototype.filter.call(
    document.querySelectorAll(
      '.section-head, .peptide-card, .switch-panel-head, .rows .row, .dose-readout'
    ),
    function (el) { return !el.closest('[data-static]'); }
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

/* Switchers (D-026, D-034) — one stage, tabs, content swaps in place.
   Generic: any .switcher with .switch-tab[aria-controls] + .switch-panel. */
(function () {
  document.querySelectorAll('.switcher').forEach(function (sw) {
    var tabs = sw.querySelectorAll('.switch-tab');
    var panels = sw.querySelectorAll('.switch-panel');
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

  /* Peptide selector (D-031) — labels the math and links the guide.
     Selecting a peptide NEVER prefills a dose: protocol figures are
     sourced slots (CONTEXT.md §8), and the calculator does unit math
     on user-entered values only. */
  var select = document.getElementById('peptide-select');
  var ctx = document.getElementById('peptide-context');
  var ctxTag = document.getElementById('peptide-cat');
  var ctxLink = document.getElementById('peptide-guide');
  if (!select) return;

  var RX = 'Rx medication';
  var RC = 'Research chemical — not for human use';
  var PEPTIDES = {
    'semaglutide': { name: 'Semaglutide', cat: RX },
    'tirzepatide': { name: 'Tirzepatide', cat: RX },
    'ipamorelin':  { name: 'Ipamorelin',  cat: RC },
    'cjc-1295':    { name: 'CJC-1295',    cat: RC },
    'sermorelin':  { name: 'Sermorelin',  cat: RC },
    'bpc-157':     { name: 'BPC-157',     cat: RC },
    'tb-500':      { name: 'TB-500',      cat: RC },
    'pt-141':      { name: 'PT-141',      cat: RC },
    'melanotan':   { name: 'Melanotan',   cat: RC }
  };

  select.addEventListener('change', function () {
    var p = PEPTIDES[select.value];
    if (!p) {
      ctx.hidden = true;
      return;
    }
    ctxTag.textContent = p.cat;
    // hash-router build (single-file preview) vs multi-page site
    var hashRouted = !!document.querySelector('.page[data-route]');
    ctxLink.setAttribute('href', hashRouted
      ? '#/guides/' + select.value
      : '/guides/' + select.value + '.html');
    ctx.hidden = false;
  });
})();

/* Account form (D-032/D-035) — one implementation serves the modal and the
   standalone /account.html page. Demo-only: idea-stage, no account system. */
(function () {
  document.querySelectorAll('.account-card').forEach(function (card) {
    var form = card.querySelector('.account-form');
    if (!form) return;
    var email = card.querySelector('.acc-email');
    var pass = card.querySelector('.acc-pass');
    var error = card.querySelector('.account-error');
    var done = card.querySelector('.account-done');
    var submit = card.querySelector('.account-submit');
    var toggle = card.querySelector('.account-toggle');
    var title = card.querySelector('.account-title');
    var signin = false;

    toggle.addEventListener('click', function () {
      signin = !signin;
      title.textContent = signin ? 'Sign in' : 'Create a free account';
      submit.textContent = signin ? 'Sign in' : 'Create free account ↗';
      toggle.textContent = signin
        ? 'New here? Create a free account'
        : 'Already have an account? Sign in';
      error.hidden = true;
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!email.value || !pass.value) {
        error.textContent = '[Enter both email and password]';
        error.hidden = false;
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        error.textContent = '[Enter a valid email address]';
        error.hidden = false;
        return;
      }
      error.hidden = true;
      form.hidden = true;
      done.hidden = false;
    });
  });
})();

/* Account modal chrome (D-032) — open/close wiring where the modal exists */
(function () {
  var modal = document.getElementById('account-modal');
  if (!modal) return;
  var card = modal.querySelector('.account-card');

  function open() {
    modal.hidden = false;
    card.querySelector('.account-form').hidden = false;
    card.querySelector('.account-done').hidden = true;
    card.querySelector('.account-error').hidden = true;
    card.querySelector('.acc-email').focus();
  }
  function close() { modal.hidden = true; }

  document.querySelectorAll('.float-cta, [data-account-open]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      open();
    });
  });
  modal.addEventListener('click', function (e) {
    if (e.target === modal) close();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.hidden) close();
  });
  modal.querySelectorAll('[data-account-close]').forEach(function (el) {
    el.addEventListener('click', close);
  });
})();
