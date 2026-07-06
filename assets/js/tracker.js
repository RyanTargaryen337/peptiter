/* PepTiter tracker (D-038) — donor skeleton: "Peptide Bench".
   Vanilla translation: personal vial log, account-gated (local demo),
   localStorage persistence. Reconstitution/dose math is the donor's;
   all figures are the user's own entered data, not site-fabricated. */
(function () {
  var root = document.getElementById('tracker');
  if (!root) return;

  var STORAGE_KEY = 'pt:vials:v1';
  var GATE_KEY = 'pt:account:v1';
  var EXPIRY_SOON = 5, REORDER_SOON = 7;
  var SITES = ['Abdomen · left', 'Abdomen · right', 'Left flank', 'Right flank',
    'Left thigh', 'Right thigh', 'Left arm', 'Right arm'];
  var WD = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  var NAMES = ['BPC-157', 'TB-500', 'BPC-157 / TB-500', 'Ipamorelin', 'CJC-1295',
    'CJC-1295 / Ipamorelin', 'Sermorelin', 'Tesamorelin', 'GHK-Cu', 'Semaglutide',
    'Tirzepatide', 'Retatrutide', 'MOTS-c', 'Melanotan II', 'PT-141', 'Epithalon',
    'Selank', 'Semax', 'AOD-9604', '5-Amino-1MQ', 'Thymosin Alpha-1', 'NAD+',
    'SS-31', 'Kisspeptin'];

  /* ---- date + math helpers (from donor) ---- */
  var pad = function (n) { return String(n).padStart(2, '0'); };
  var toISO = function (d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); };
  var parseLocal = function (s) { if (s instanceof Date) return s; var p = String(s).split('-').map(Number); return new Date(p[0], (p[1] || 1) - 1, p[2] || 1); };
  var startOfDay = function (d) { var x = new Date(d); x.setHours(0, 0, 0, 0); return x; };
  var today0 = function () { return startOfDay(new Date()); };
  var addDays = function (d, n) { var x = new Date(d); x.setDate(x.getDate() + n); return x; };
  var dayDiff = function (a, b) { return Math.round((startOfDay(b) - startOfDay(a)) / 86400000); };
  var fmtShort = function (d) { return new Date(d).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }); };
  var fmtDate = function (d) { return new Date(d).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' }); };
  var rel = function (n) { return n === 0 ? 'today' : n > 0 ? 'in ' + n + 'd' : (-n) + 'd ago'; };
  var num = function (v, d) { var n = Number(v); return Number.isFinite(n) ? n : (d || 0); };

  var concentration = function (v) { return num(v.waterMl) > 0 ? num(v.vialMg) / num(v.waterMl) : 0; };
  var dosesPerVial = function (v) { return num(v.doseMcg) > 0 ? Math.floor((num(v.vialMg) * 1000) / num(v.doseMcg)) : 0; };
  var volPerDoseMl = function (v) { return concentration(v) > 0 ? (num(v.doseMcg) / 1000) / concentration(v) : 0; };
  var unitsPerDose = function (v) { return volPerDoseMl(v) * 100; };
  var dosesRemaining = function (v) { return Math.max(0, dosesPerVial(v) - ((v.logs && v.logs.length) || 0)); };
  var cadenceDays = function (v) {
    if (v.schedule === 'daily') return 1 / Math.max(1, num(v.perDay, 1));
    if (v.schedule === 'interval') return Math.max(1, num(v.intervalN, 1));
    if (v.schedule === 'weekly') return v.weekdays && v.weekdays.length ? 7 / v.weekdays.length : 7;
    return 1;
  };
  var daysOfSupply = function (v) { return dosesRemaining(v) * cadenceDays(v); };
  var lastLog = function (v) { return v.logs && v.logs.length ? v.logs[v.logs.length - 1] : null; };
  var dosesToday = function (v) { var t = toISO(today0()); return (v.logs || []).filter(function (l) { return l.date === t; }).length; };

  function nextDue(v) {
    var start = startOfDay(parseLocal(v.startDate || v.reconDate));
    var last = lastLog(v);
    if (!last) {
      if (v.schedule === 'weekly') {
        var days = v.weekdays && v.weekdays.length ? v.weekdays : [start.getDay()];
        for (var i = 0; i <= 7; i++) { var c = addDays(start, i); if (days.indexOf(c.getDay()) >= 0) return startOfDay(c); }
      }
      return start;
    }
    var ld = startOfDay(parseLocal(last.date));
    if (v.schedule === 'daily') {
      var per = Math.max(1, num(v.perDay, 1));
      if (per > 1 && dosesToday(v) < per) return today0();
      return startOfDay(addDays(ld, 1));
    }
    if (v.schedule === 'interval') return startOfDay(addDays(ld, Math.max(1, num(v.intervalN, 1))));
    if (v.schedule === 'weekly') {
      var wd = v.weekdays && v.weekdays.length ? v.weekdays : [ld.getDay()];
      for (var j = 1; j <= 7; j++) { var cc = addDays(ld, j); if (wd.indexOf(cc.getDay()) >= 0) return startOfDay(cc); }
      return startOfDay(addDays(ld, 7));
    }
    return startOfDay(addDays(ld, 1));
  }
  var expiryDate = function (v) { return startOfDay(addDays(parseLocal(v.reconDate), num(v.beyondUseDays, 28))); };
  function projectedFinish(v) {
    var rem = dosesRemaining(v);
    if (rem <= 0) return null;
    var extra = Math.ceil((rem - 1) * cadenceDays(v));
    return startOfDay(addDays(nextDue(v), Math.max(0, extra)));
  }
  function evalVial(v) {
    var t = today0(), rem = dosesRemaining(v), exp = expiryDate(v), nd = nextDue(v), finish = projectedFinish(v);
    var expDelta = dayDiff(t, exp), expired = expDelta < 0, dueDelta = dayDiff(t, nd), total = dosesPerVial(v);
    var badges = [], primary;
    if (rem <= 0) primary = { key: 'finished', label: 'Finished', active: false, warn: false, rank: 4 };
    else if (expired) primary = { key: 'expired', label: 'Past beyond-use', active: false, warn: true, rank: 1 };
    else if (dueDelta < 0) primary = { key: 'overdue', label: 'Overdue ' + (-dueDelta) + 'd', active: false, warn: true, rank: 0 };
    else if (dueDelta === 0) primary = { key: 'due', label: 'Due today', active: true, warn: false, rank: 2 };
    else primary = { key: 'ontrack', label: 'On track', active: true, warn: false, rank: 3 };
    if (rem > 0 && !expired && expDelta >= 0 && expDelta <= EXPIRY_SOON) badges.push({ label: 'Expires ' + rel(expDelta), warn: true });
    if (rem > 0 && !expired && daysOfSupply(v) <= REORDER_SOON) badges.push({ label: 'Reorder soon', warn: false });
    return { rem: rem, total: total, exp: exp, nd: nd, finish: finish, expDelta: expDelta, expired: expired, dueDelta: dueDelta, primary: primary, badges: badges };
  }
  function verdict(v, ev) {
    if (ev.rem <= 0) return { warn: false, text: 'All doses used.' };
    if (!ev.finish) return null;
    var gap = dayDiff(ev.finish, ev.exp);
    if (gap >= 0) return { warn: false, text: 'On pace to finish about ' + gap + 'd before the beyond-use date.' };
    var t = today0(), daysToExp = Math.max(0, dayDiff(t, ev.exp));
    var possible = Math.max(0, Math.floor(daysToExp / cadenceDays(v)) + 1);
    var wasted = Math.max(0, ev.rem - possible), mg = (wasted * num(v.doseMcg) / 1000).toFixed(2);
    return { warn: true, text: 'Beyond-use hits ~' + (-gap) + 'd before you’d finish — about ' + wasted + ' dose' + (wasted === 1 ? '' : 's') + ' (' + mg + 'mg) would be discarded. Dose more often, use a larger dose, or choose a smaller vial next time.' };
  }
  function scheduleText(v) {
    if (v.schedule === 'daily') { var p = Math.max(1, num(v.perDay, 1)); return p > 1 ? p + '× daily' : 'Once daily'; }
    if (v.schedule === 'interval') return 'Every ' + Math.max(1, num(v.intervalN, 1)) + ' days';
    if (v.schedule === 'weekly') return v.weekdays && v.weekdays.length ? v.weekdays.slice().sort().map(function (d) { return WD[d]; }).join(' · ') : 'Weekly';
    return '—';
  }

  /* ---- persistence (localStorage) ---- */
  function load() { try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; } catch (e) { return []; } }
  function save(v) { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(v)); } catch (e) {} }
  var vials = load();

  /* ---- gate ---- */
  var gate = document.getElementById('tracker-gate');
  var app = document.getElementById('tracker-app');
  function unlocked() { try { return localStorage.getItem(GATE_KEY) === '1'; } catch (e) { return false; } }
  function applyGate() {
    var ok = unlocked();
    gate.hidden = ok;
    app.hidden = !ok;
    if (ok) render();
  }
  var gateForm = gate.querySelector('.account-form');
  var gateEmail = gate.querySelector('.acc-email');
  var gatePass = gate.querySelector('.acc-pass');
  var gateErr = gate.querySelector('.account-error');
  gateForm.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!gateEmail.value || !gatePass.value) { gateErr.textContent = '[Enter both email and password]'; gateErr.hidden = false; return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(gateEmail.value)) { gateErr.textContent = '[Enter a valid email address]'; gateErr.hidden = false; return; }
    try { localStorage.setItem(GATE_KEY, '1'); } catch (e2) {}
    applyGate();
  });
  var signout = document.getElementById('tracker-signout');
  if (signout) signout.addEventListener('click', function () { try { localStorage.removeItem(GATE_KEY); } catch (e) {} applyGate(); });

  /* ---- helpers to build DOM ---- */
  function el(tag, cls, txt) { var e = document.createElement(tag); if (cls) e.className = cls; if (txt != null) e.textContent = txt; return e; }
  function statusTag(label, active, warn) {
    var s = el('span', 'status-tag' + (warn ? ' status-tag--warn' : active ? ' status-tag--active' : ''), label);
    return s;
  }
  function readout(label, value, sub) {
    var r = el('div', 'readout');
    r.appendChild(el('span', 'label label--xs muted', label));
    var d = el('div', 'data'); d.textContent = value; r.appendChild(d);
    if (sub) r.appendChild(el('div', 'label label--xs muted', sub));
    return r;
  }

  /* ---- form state ---- */
  var editing = null;
  var formEl = document.getElementById('vial-form');
  var F = {}; // field refs
  ['name', 'vialMg', 'waterMl', 'doseMcg', 'perDay', 'intervalN', 'timeOfDay',
    'reconDate', 'beyondUseDays', 'storage', 'lot', 'notes'].forEach(function (k) {
      F[k] = formEl.querySelector('[name="' + k + '"]');
    });
  var schedSeg = formEl.querySelector('.seg-schedule');
  var perDayWrap = formEl.querySelector('.wrap-perDay');
  var intervalWrap = formEl.querySelector('.wrap-interval');
  var weekWrap = formEl.querySelector('.wrap-week');
  var weekSeg = formEl.querySelector('.seg-week');
  var fastedBtn = formEl.querySelector('.btn-fasted');
  var liveCalc = document.getElementById('form-live');
  var state = { schedule: 'daily', weekdays: [1, 4], fasted: false };

  function setSchedule(s) {
    state.schedule = s;
    schedSeg.querySelectorAll('button').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.sched === s)); });
    perDayWrap.hidden = s !== 'daily';
    intervalWrap.hidden = s !== 'interval';
    weekWrap.hidden = s !== 'weekly';
    updateLive();
  }
  schedSeg.querySelectorAll('button').forEach(function (b) { b.addEventListener('click', function () { setSchedule(b.dataset.sched); }); });
  WD.forEach(function (d, i) {
    var b = el('button', null, d); b.type = 'button'; b.dataset.day = i;
    b.setAttribute('aria-pressed', String(state.weekdays.indexOf(i) >= 0));
    b.addEventListener('click', function () {
      var on = state.weekdays.indexOf(i) >= 0;
      state.weekdays = on ? state.weekdays.filter(function (x) { return x !== i; }) : state.weekdays.concat(i);
      b.setAttribute('aria-pressed', String(!on));
    });
    weekSeg.appendChild(b);
  });
  fastedBtn.addEventListener('click', function () {
    state.fasted = !state.fasted;
    fastedBtn.setAttribute('aria-pressed', String(state.fasted));
  });
  var nameList = document.getElementById('pep-names');
  NAMES.forEach(function (n) { var o = el('option'); o.value = n; nameList.appendChild(o); });

  function readForm() {
    return {
      name: F.name.value, vialMg: F.vialMg.value, waterMl: F.waterMl.value, doseMcg: F.doseMcg.value,
      schedule: state.schedule, perDay: F.perDay.value, intervalN: F.intervalN.value, weekdays: state.weekdays,
      timeOfDay: F.timeOfDay.value, fasted: state.fasted, reconDate: F.reconDate.value,
      beyondUseDays: F.beyondUseDays.value, storage: F.storage.value, lot: F.lot.value, notes: F.notes.value
    };
  }
  function updateLive() {
    var f = readForm();
    var ok = num(f.vialMg) > 0 && num(f.waterMl) > 0 && num(f.doseMcg) > 0;
    var supply = ok ? dosesPerVial(f) * cadenceDays(f) : 0;
    var exp = addDays(parseLocal(f.reconDate), num(f.beyondUseDays, 28));
    var willExpireFirst = ok && supply > num(f.beyondUseDays, 28);
    liveCalc.innerHTML = '';
    var g = el('div', 'vial-readouts');
    g.appendChild(readout('Concentration', ok ? concentration(f).toFixed(2) + ' mg/mL' : '—'));
    g.appendChild(readout('Draw / dose', ok ? unitsPerDose(f).toFixed(1) + ' u' : '—', ok ? volPerDoseMl(f).toFixed(3) + ' mL' : ''));
    g.appendChild(readout('Doses / vial', ok ? String(dosesPerVial(f)) : '—'));
    g.appendChild(readout('Supply', ok ? '~' + supply.toFixed(0) + ' d' : '—'));
    g.appendChild(readout('Beyond-use', fmtShort(exp)));
    liveCalc.appendChild(g);
    if (willExpireFirst) {
      var w = el('p', 'label label--xs', 'At this schedule it expires before you’d finish — dose more often, use a larger dose, or a smaller vial.');
      w.style.marginTop = '10px'; liveCalc.appendChild(w);
    }
  }
  ['vialMg', 'waterMl', 'doseMcg', 'beyondUseDays', 'reconDate', 'perDay', 'intervalN'].forEach(function (k) {
    F[k].addEventListener('input', updateLive);
  });

  var modal = document.getElementById('vial-modal');
  var modalTitle = document.getElementById('vial-modal-title');
  function openForm(v) {
    editing = v ? v.id : null;
    modalTitle.textContent = v ? 'Edit vial' : 'New vial';
    F.name.value = v ? v.name : '';
    F.vialMg.value = v ? v.vialMg : '';
    F.waterMl.value = v ? v.waterMl : '2';
    F.doseMcg.value = v ? v.doseMcg : '';
    F.perDay.value = v ? (v.perDay || 1) : '1';
    F.intervalN.value = v ? (v.intervalN || 3) : '3';
    F.timeOfDay.value = v ? (v.timeOfDay || '') : '';
    F.reconDate.value = v ? v.reconDate : toISO(today0());
    F.beyondUseDays.value = v ? v.beyondUseDays : '28';
    F.storage.value = v ? (v.storage || 'Refrigerated (2–8°C)') : 'Refrigerated (2–8°C)';
    F.lot.value = v ? (v.lot || '') : '';
    F.notes.value = v ? (v.notes || '') : '';
    state.weekdays = v ? (v.weekdays || [1, 4]) : [1, 4];
    weekSeg.querySelectorAll('button').forEach(function (b) { b.setAttribute('aria-pressed', String(state.weekdays.indexOf(Number(b.dataset.day)) >= 0)); });
    state.fasted = v ? !!v.fasted : false;
    fastedBtn.setAttribute('aria-pressed', String(state.fasted));
    setSchedule(v ? v.schedule : 'daily');
    modal.hidden = false;
    F.name.focus();
  }
  function closeForm() { modal.hidden = true; }
  modal.addEventListener('click', function (e) { if (e.target === modal) closeForm(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !modal.hidden) closeForm(); });
  modal.querySelectorAll('[data-vial-close]').forEach(function (b) { b.addEventListener('click', closeForm); });
  document.getElementById('tracker-add').addEventListener('click', function () { openForm(null); });

  formEl.addEventListener('submit', function (e) {
    e.preventDefault();
    var f = readForm();
    if (!f.name.trim() || num(f.vialMg) <= 0 || num(f.waterMl) <= 0 || num(f.doseMcg) <= 0) return;
    var prev = vials.filter(function (x) { return x.id === editing; })[0];
    var clean = {
      id: editing || 'v_' + Date.now(), name: f.name.trim(),
      vialMg: num(f.vialMg), waterMl: num(f.waterMl), doseMcg: num(f.doseMcg),
      schedule: f.schedule, perDay: Math.max(1, num(f.perDay, 1)), intervalN: Math.max(1, num(f.intervalN, 1)),
      weekdays: f.weekdays, timeOfDay: f.timeOfDay, fasted: !!f.fasted,
      reconDate: f.reconDate, startDate: f.reconDate, beyondUseDays: Math.max(1, num(f.beyondUseDays, 28)),
      storage: f.storage, lot: f.lot, notes: f.notes,
      logs: prev ? (prev.logs || []) : [], siteIdx: prev ? (prev.siteIdx != null ? prev.siteIdx : -1) : -1
    };
    vials = prev ? vials.map(function (x) { return x.id === clean.id ? clean : x; }) : vials.concat(clean);
    save(vials); closeForm(); render();
  });

  /* ---- actions ---- */
  function logDose(v) {
    var ev = evalVial(v);
    if (ev.expired && !v._confirm) { v._confirm = true; render(); return; }
    var nextIdx = (v.siteIdx + 1 + SITES.length) % SITES.length;
    var entry = { date: toISO(today0()), ts: new Date().toISOString(), site: SITES[nextIdx], units: Number(unitsPerDose(v).toFixed(2)) };
    v.logs = (v.logs || []).concat(entry); v.siteIdx = nextIdx; v._confirm = false;
    save(vials); render();
  }
  function undoLast(v) { v.logs = (v.logs || []).slice(0, -1); save(vials); render(); }
  function removeVial(id) { vials = vials.filter(function (x) { return x.id !== id; }); save(vials); render(); }

  /* ---- render ---- */
  function render() {
    var t = today0();
    var evals = vials.map(function (v) { return { v: v, ev: evalVial(v) }; });
    evals.sort(function (a, b) { return a.ev.primary.rank - b.ev.primary.rank || a.ev.nd - b.ev.nd; });

    // status strip
    var counts = {
      due: evals.filter(function (x) { return x.ev.primary.key === 'due'; }).length,
      over: evals.filter(function (x) { return x.ev.primary.key === 'overdue'; }).length,
      exp: evals.filter(function (x) { return x.ev.rem > 0 && !x.ev.expired && x.ev.expDelta >= 0 && x.ev.expDelta <= EXPIRY_SOON; }).length,
      reorder: evals.filter(function (x) { return x.ev.rem > 0 && !x.ev.expired && daysOfSupply(x.v) <= REORDER_SOON; }).length
    };
    var strip = document.getElementById('tracker-strip');
    strip.innerHTML = '';
    [['Due today', counts.due], ['Overdue', counts.over], ['Expiring ≤5d', counts.exp], ['Reorder soon', counts.reorder]].forEach(function (s) {
      var c = el('div', 'strip-stat' + (s[1] > 0 ? ' is-flagged' : ''));
      c.appendChild(el('span', 'label label--xs muted', s[0]));
      var d = el('div', 'data'); d.textContent = s[1]; c.appendChild(d);
      strip.appendChild(c);
    });

    var meta = document.getElementById('tracker-meta');
    var totalMg = evals.reduce(function (s, x) { return s + x.ev.rem * num(x.v.doseMcg) / 1000; }, 0);
    meta.textContent = vials.length + ' vial' + (vials.length === 1 ? '' : 's') + '  ·  ' + totalMg.toFixed(1) + ' mg on hand';

    // roster
    var roster = document.getElementById('tracker-roster');
    roster.innerHTML = '';
    var empty = document.getElementById('tracker-empty');
    empty.hidden = vials.length > 0;

    evals.forEach(function (pair) {
      var v = pair.v, ev = pair.ev;
      var card = el('div', 'vial');
      var pct = ev.total > 0 ? (ev.rem / ev.total) * 100 : 0;
      var gauge = el('div', 'vial-gauge');
      var fill = el('div', 'vial-gauge-fill'); fill.style.height = Math.max(3, Math.min(100, pct)) + '%';
      gauge.appendChild(fill); card.appendChild(gauge);

      var body = el('div', 'vial-body'); card.appendChild(body);
      var title = el('div', 'vial-title');
      title.appendChild(el('span', 'vial-name', v.name));
      title.appendChild(statusTag(ev.primary.label, ev.primary.active, ev.primary.warn));
      ev.badges.forEach(function (b) { title.appendChild(statusTag(b.label, false, b.warn)); });
      body.appendChild(title);

      var spec = el('div', 'vial-spec');
      spec.innerHTML = '<span>' + num(v.vialMg) + 'mg / ' + num(v.waterMl) + 'mL = <span class="data">' + concentration(v).toFixed(2) + ' mg/mL</span></span>' +
        '<span>' + num(v.doseMcg) + 'mcg → <span class="data">' + unitsPerDose(v).toFixed(1) + 'u</span> (' + volPerDoseMl(v).toFixed(3) + 'mL)</span>' +
        '<span>' + scheduleText(v) + (v.timeOfDay ? ' · ' + v.timeOfDay : '') + (v.fasted ? ' · fasted' : '') + '</span>';
      body.appendChild(spec);

      var grid = el('div', 'vial-readouts');
      grid.appendChild(readout('Reconstituted', fmtShort(parseLocal(v.reconDate)), rel(dayDiff(t, parseLocal(v.reconDate)))));
      grid.appendChild(readout('Doses left', ev.rem + ' / ' + ev.total, '~' + daysOfSupply(v).toFixed(0) + 'd supply'));
      grid.appendChild(readout('Next dose', ev.rem > 0 ? fmtShort(ev.nd) : '—', ev.rem > 0 ? rel(ev.dueDelta) : 'finished'));
      grid.appendChild(readout('Projected finish', ev.finish ? fmtShort(ev.finish) : '—', ev.finish ? rel(dayDiff(t, ev.finish)) : '—'));
      grid.appendChild(readout('Beyond-use', fmtShort(ev.exp), rel(ev.expDelta)));
      body.appendChild(grid);

      var vd = verdict(v, ev);
      if (vd) { var vdEl = el('div', 'verdict', vd.text); body.appendChild(vdEl); }
      if (v.notes) { var n = el('p', 'muted', v.notes); n.style.fontStyle = 'italic'; n.style.fontSize = '14px'; body.appendChild(n); }

      var actions = el('div', 'hero-cta-row');
      if (ev.rem > 0) {
        if (v._confirm) {
          actions.appendChild(el('span', 'label label--xs', 'Past beyond-use — log anyway?'));
          var yes = el('button', 'btn-outline', 'Yes, log'); yes.type = 'button'; yes.addEventListener('click', function () { logDose(v); }); actions.appendChild(yes);
          var no = el('button', 'btn-outline', 'Cancel'); no.type = 'button'; no.addEventListener('click', function () { v._confirm = false; render(); }); actions.appendChild(no);
        } else {
          var log = el('button', ev.expired ? 'btn-outline' : 'btn-fill', ev.expired ? 'Log (past beyond-use)' : 'Log dose'); log.type = 'button';
          log.addEventListener('click', function () { logDose(v); }); actions.appendChild(log);
        }
      } else {
        var refill = el('button', 'btn-fill', 'Reconstitute new vial'); refill.type = 'button';
        refill.addEventListener('click', function () { openForm({ name: v.name, vialMg: v.vialMg, waterMl: v.waterMl, doseMcg: v.doseMcg, schedule: v.schedule, perDay: v.perDay, intervalN: v.intervalN, weekdays: v.weekdays, timeOfDay: v.timeOfDay, fasted: v.fasted, beyondUseDays: v.beyondUseDays, storage: v.storage, reconDate: toISO(today0()) }); });
        actions.appendChild(refill);
      }
      if ((v.logs && v.logs.length) > 0) {
        var undo = el('button', 'btn-outline', 'Undo last'); undo.type = 'button'; undo.addEventListener('click', function () { undoLast(v); }); actions.appendChild(undo);
        var toggle = el('button', 'linklike', v.logs.length + ' dose' + (v.logs.length === 1 ? '' : 's') + ' logged'); toggle.type = 'button';
        toggle.style.fontFamily = 'var(--font-mono)'; toggle.style.fontSize = '11px'; toggle.style.textTransform = 'uppercase'; toggle.style.letterSpacing = '0.086em';
        toggle.addEventListener('click', function () { v._open = !v._open; render(); }); actions.appendChild(toggle);
      }
      var edit = el('button', 'btn-outline', 'Edit'); edit.type = 'button'; edit.addEventListener('click', function () { openForm(v); }); actions.appendChild(edit);
      var del = el('button', 'btn-outline', 'Delete'); del.type = 'button'; del.addEventListener('click', function () { if (confirm('Delete this vial and its dose history?')) removeVial(v.id); }); actions.appendChild(del);
      body.appendChild(actions);

      if (v._open && v.logs && v.logs.length) {
        var logBox = el('div');
        logBox.style.border = 'var(--border-hairline)'; logBox.style.borderRadius = 'var(--radius-precise)'; logBox.style.marginTop = 'var(--space-8)';
        v.logs.slice().reverse().forEach(function (l, i) {
          var r = el('div');
          r.style.display = 'flex'; r.style.justifyContent = 'space-between'; r.style.padding = '6px 12px';
          r.style.fontFamily = 'var(--font-mono)'; r.style.fontSize = '12px'; r.style.color = 'var(--slate)';
          if (i) r.style.borderTop = 'var(--border-hairline)';
          r.appendChild(el('span', null, fmtDate(parseLocal(l.date)) + ' · ' + new Date(l.ts).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })));
          r.appendChild(el('span', null, l.units + 'u · ' + l.site));
          logBox.appendChild(r);
        });
        body.appendChild(logBox);
      }
      roster.appendChild(card);
    });

    // agenda
    var agendaBox = document.getElementById('tracker-agenda');
    var out = [];
    evals.forEach(function (pair) {
      var v = pair.v, ev = pair.ev;
      if (ev.rem <= 0 || ev.expired) return;
      if (v.schedule === 'weekly' && v.weekdays && v.weekdays.length) {
        for (var i = 0; i <= 7; i++) { var c = addDays(t, i); if (c >= startOfDay(ev.nd) && v.weekdays.indexOf(c.getDay()) >= 0) out.push({ date: toISO(c), v: v, multi: 1 }); }
      } else {
        var cursor = new Date(ev.nd), step = Math.max(1, Math.round(cadenceDays(v)));
        for (var k = 0; k < 30 && out.length < 200; k++) {
          var d = startOfDay(cursor), dd = dayDiff(t, d);
          if (dd > 7) break;
          if (dd >= 0) out.push({ date: toISO(d), v: v, multi: v.schedule === 'daily' && num(v.perDay, 1) > 1 ? num(v.perDay, 1) : 1 });
          cursor = addDays(cursor, step);
        }
      }
    });
    var byDay = {};
    out.forEach(function (o) { (byDay[o.date] = byDay[o.date] || []).push(o); });
    var days = Object.keys(byDay).sort();
    agendaBox.innerHTML = '';
    if (!days.length) { agendaBox.hidden = true; }
    else {
      agendaBox.hidden = false;
      var rows = el('div', 'rows');
      days.forEach(function (date) {
        var row = el('div', 'row');
        var dd = dayDiff(t, parseLocal(date));
        row.appendChild(el('span', 'label label--strong row-label', fmtShort(parseLocal(date)) + ' · ' + rel(dd)));
        var items = el('span', 'row-value muted', byDay[date].map(function (o) {
          return o.v.name + ' · ' + num(o.v.doseMcg) + 'mcg' + (o.multi > 1 ? ' ×' + o.multi : '') + (o.v.timeOfDay ? ' · ' + o.v.timeOfDay : '');
        }).join('   ·   '));
        row.appendChild(items);
        rows.appendChild(row);
      });
      agendaBox.appendChild(rows);
    }
  }

  applyGate();
})();
