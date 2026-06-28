(function () {
  'use strict';

  /* ─── Thresholds ─── */
  var T = {
    LCP:  { good: 2500,  poor: 4000,  unit: 'ms',  fmt: function(v){ return Math.round(v)+'ms'; } },
    INP:  { good: 200,   poor: 500,   unit: 'ms',  fmt: function(v){ return Math.round(v)+'ms'; } },
    CLS:  { good: 0.1,   poor: 0.25,  unit: '',    fmt: function(v){ return v.toFixed(3); } },
    FCP:  { good: 1800,  poor: 3000,  unit: 'ms',  fmt: function(v){ return Math.round(v)+'ms'; } },
    TTFB: { good: 800,   poor: 1800,  unit: 'ms',  fmt: function(v){ return Math.round(v)+'ms'; } },
    TBT:  { good: 200,   poor: 600,   unit: 'ms',  fmt: function(v){ return Math.round(v)+'ms'; } },
  };
  var ORDER = ['LCP','INP','CLS','FCP','TTFB','TBT'];

  function rating(name, val) {
    if (val === null) return 'pending';
    return val <= T[name].good ? 'good' : val <= T[name].poor ? 'ni' : 'poor';
  }

  function fmt(name, val) {
    if (val === null) return '——';
    return T[name].fmt(val);
  }

  /* ─── TBT via PerformanceObserver ─── */
  var tbt = 0;
  try {
    new PerformanceObserver(function(list) {
      list.getEntries().forEach(function(entry) {
        var blocked = entry.duration - 50;
        if (blocked > 0) tbt += blocked;
      });
      updateMetric('TBT', tbt);
    }).observe({ type: 'longtask', buffered: true });
  } catch(e) {}

  /* ─── State ─── */
  var state = { LCP:null, INP:null, CLS:null, FCP:null, TTFB:null, TBT:null };

  /* ─── Badge from URL ─── */
  function pageBadge() {
    var p = window.location.pathname;
    if (/bad\.html/.test(p))  return { text:'BAD PATTERN',  cls:'wvl-badge-bad'  };
    if (/good\.html/.test(p)) return { text:'GOOD PATTERN', cls:'wvl-badge-good' };
    return { text:'DASHBOARD', cls:'wvl-badge-dash' };
  }

  /* ─── Build overlay DOM ─── */
  function buildOverlay() {
    var badge = pageBadge();
    var el = document.createElement('div');
    el.id = 'wvl';
    el.innerHTML = [
      '<div id="wvl-hd">',
        '<span id="wvl-title">⚡ WEB VITALS</span>',
        '<span id="wvl-pg-badge" class="'+badge.cls+'">'+badge.text+'</span>',
        '<button id="wvl-min" title="Minimise">−</button>',
      '</div>',
      '<div id="wvl-body">',
        ORDER.map(function(n){
          return [
            '<div class="wvl-row" id="wvl-r-'+n+'">',
              '<span class="wvl-name">'+n+'</span>',
              '<div class="wvl-track"><div class="wvl-fill" id="wvl-fill-'+n+'"></div></div>',
              '<span class="wvl-val" id="wvl-v-'+n+'">——</span>',
            '</div>',
          ].join('');
        }).join(''),
      '</div>',
      '<div id="wvl-legend">',
        '<span class="leg-g">● good</span>',
        '<span class="leg-n">● fair</span>',
        '<span class="leg-p">● poor</span>',
      '</div>',
    ].join('');
    document.body.appendChild(el);
    return el;
  }

  /* ─── Update a single metric ─── */
  function updateMetric(name, val) {
    state[name] = val;
    var r = rating(name, val);
    var row  = document.getElementById('wvl-r-'+name);
    var fill = document.getElementById('wvl-fill-'+name);
    var valEl= document.getElementById('wvl-v-'+name);
    if (!row) return;

    valEl.textContent = fmt(name, val);
    valEl.className   = 'wvl-val wvl-c-'+r;
    row.className     = 'wvl-row wvl-row-'+r;

    if (fill) {
      var t = T[name];
      var pct = 0;
      if (val !== null) {
        pct = Math.min(100, Math.round(
          (t.unit === '' ? val / (t.poor * 1.5) : val / (t.poor * 1.5)) * 100
        ));
      }
      fill.style.width     = pct + '%';
      fill.className       = 'wvl-fill wvl-fill-'+r;
    }
  }

  /* ─── Drag ─── */
  function makeDraggable(el) {
    var hd = document.getElementById('wvl-hd');
    var dragging = false, ox = 0, oy = 0;

    hd.style.cursor = 'grab';

    hd.addEventListener('mousedown', function(e) {
      if (e.target.id === 'wvl-min') return;
      dragging = true;
      var rect = el.getBoundingClientRect();
      ox = e.clientX - rect.left;
      oy = e.clientY - rect.top;
      hd.style.cursor = 'grabbing';
      e.preventDefault();
    });

    document.addEventListener('mousemove', function(e) {
      if (!dragging) return;
      el.style.right  = 'auto';
      el.style.bottom = 'auto';
      el.style.left   = Math.max(0, e.clientX - ox) + 'px';
      el.style.top    = Math.max(0, e.clientY - oy) + 'px';
    });

    document.addEventListener('mouseup', function() {
      dragging = false;
      hd.style.cursor = 'grab';
    });
  }

  /* ─── Minimise toggle ─── */
  function wireMinimise() {
    var btn  = document.getElementById('wvl-min');
    var body = document.getElementById('wvl-body');
    var leg  = document.getElementById('wvl-legend');
    btn.addEventListener('click', function() {
      var collapsed = body.style.display === 'none';
      body.style.display   = collapsed ? '' : 'none';
      leg.style.display    = collapsed ? '' : 'none';
      btn.textContent      = collapsed ? '−' : '+';
    });
  }

  /* ─── Load web-vitals and register callbacks ─── */
  function loadWebVitals() {
    var s = document.createElement('script');
    s.src = 'https://unpkg.com/web-vitals@4/dist/web-vitals.iife.js';
    s.onload = function() {
      var wv = window.webVitals;
      if (!wv) return;
      wv.onLCP(function(m)  { updateMetric('LCP',  m.value); });
      wv.onINP(function(m)  { updateMetric('INP',  m.value); });
      wv.onCLS(function(m)  { updateMetric('CLS',  m.value); });
      wv.onFCP(function(m)  { updateMetric('FCP',  m.value); });
      wv.onTTFB(function(m) { updateMetric('TTFB', m.value); });
    };
    document.head.appendChild(s);
  }

  /* ─── Init ─── */
  function init() {
    var el = buildOverlay();
    makeDraggable(el);
    wireMinimise();
    loadWebVitals();
    // Seed TBT display at 0
    updateMetric('TBT', tbt);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
