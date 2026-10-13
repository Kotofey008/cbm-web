/* Charms Bar Mica — main.js
   Обычный скрипт (не ES-module), чтобы сайт работал при открытии файлов напрямую (file://). */
(function () {
  "use strict";

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var root = document.documentElement;
  var page = document.body.getAttribute("data-page") || "home";
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) {} return null; }
  function ico(name, cls) { return '<svg class="i ' + (cls || "") + '"><use href="#i-' + name + '"/></svg>'; }

  /* ======================================================================
     1. Header and Footer (one source for all pages)
     ====================================================================== */
  var REPO = "https://github.com/Kotofey008/charms-bar-mica";

  function buildHeader() {
    var host = $("#site-header");
    if (!host) return;
    var cur = function (p) { return page === p ? ' aria-current="page"' : ""; };
    host.innerHTML =
      '<nav class="nav mica-alt" aria-label="Main">' +
        '<div class="container nav__in">' +
          '<a class="brand" href="index.html"><img src="favicon.svg" alt="" width="26" height="26">Charms Bar Mica</a>' +
          '<div class="nav__links">' +
            '<a class="nav__link" href="index.html#features" data-i18n="nav.features">Features</a>' +
            '<a class="nav__link" href="index.html#screenshots" data-i18n="nav.screens">Screenshots</a>' +
            '<a class="nav__link" href="download.html"' + cur("download") + ' data-i18n="nav.download">Download</a>' +
            '<a class="nav__link" href="faq.html"' + cur("faq") + ' data-i18n="nav.faq">FAQ</a>' +
          '</div>' +
          '<span class="nav__spacer"></span>' +
          '<div class="nav__end">' +
            '<div class="menu-wrap">' +
              '<button class="btn btn--icon" id="lang-btn" aria-haspopup="true" aria-expanded="false" aria-label="Language" title="Language">' + ico("globe") + '</button>' +
              '<div class="flyout" id="lang-menu" role="menu">' +
                '<button class="flyout__item" role="menuitemradio" data-lang="en" aria-checked="false">English</button>' +
                '<button class="flyout__item" role="menuitemradio" data-lang="ru" aria-checked="false">Русский</button>' +
              '</div>' +
            '</div>' +
            '<div class="menu-wrap">' +
              '<button class="btn btn--icon" id="theme-btn" aria-haspopup="true" aria-expanded="false" aria-label="Theme" title="Theme">' +
                '<span id="theme-ico"></span></button>' +
              '<div class="flyout" id="theme-menu" role="menu">' +
                '<button class="flyout__item" role="menuitemradio" data-theme-set="light" aria-checked="false">' + ico("sun") + '<span data-i18n="theme.light">Light</span></button>' +
                '<button class="flyout__item" role="menuitemradio" data-theme-set="dark" aria-checked="false">' + ico("moon") + '<span data-i18n="theme.dark">Dark</span></button>' +
                '<div class="flyout__sep"></div>' +
                '<button class="flyout__item" role="menuitemradio" data-theme-set="system" aria-checked="false">' + ico("system") + '<span data-i18n="theme.system">Use system setting</span></button>' +
              '</div>' +
            '</div>' +
            '<a class="btn btn--icon gh" href="' + REPO + '" target="_blank" rel="noopener" aria-label="GitHub" title="GitHub">' + ico("github", "i--fill") + '</a>' +
            '<a class="btn btn--accent" href="download.html" data-i18n="nav.download">Download</a>' +
            '<button class="btn btn--icon nav__burger" id="burger" aria-label="Menu" aria-expanded="false" aria-controls="mobile-panel">' + ico("menu") + '</button>' +
          '</div>' +
        '</div>' +
      '</nav>' +
      '<div class="mobile-panel" id="mobile-panel">' +
        '<a href="index.html#features"><span data-i18n="nav.features">Features</span>' + ico("arrow") + '</a>' +
        '<a href="index.html#screenshots"><span data-i18n="nav.screens">Screenshots</span>' + ico("arrow") + '</a>' +
        '<a href="download.html"><span data-i18n="nav.download">Download</span>' + ico("arrow") + '</a>' +
        '<a href="faq.html"><span data-i18n="nav.faq">FAQ</span>' + ico("arrow") + '</a>' +
        '<a href="' + REPO + '" target="_blank" rel="noopener"><span>GitHub</span>' + ico("external") + '</a>' +
      '</div>';
  }

  function buildFooter() {
    var host = $("#site-footer");
    if (!host) return;
    host.innerHTML =
      '<footer class="footer"><div class="container">' +
        '<div class="footer__grid">' +
          '<div><a class="brand" href="index.html"><img src="favicon.svg" alt="" width="26" height="26">Charms Bar Mica</a>' +
            '<p class="footer__about" data-i18n="foot.about">The Windows 8.x Charms Bar in modern Fluent Design with native Mica support.</p></div>' +
          '<div><h4 data-i18n="foot.pages">Pages</h4><ul>' +
            '<li><a href="index.html" data-i18n="foot.home">Home</a></li>' +
            '<li><a href="download.html" data-i18n="nav.download">Download</a></li>' +
            '<li><a href="faq.html" data-i18n="nav.faq">FAQ</a></li></ul></div>' +
          '<div><h4 data-i18n="foot.project">Project</h4><ul>' +
            '<li><a href="' + REPO + '" target="_blank" rel="noopener">GitHub</a></li>' +
            '<li><a href="' + REPO + '/releases" target="_blank" rel="noopener" data-i18n="foot.releases">Releases</a></li>' +
            '<li><a href="' + REPO + '/issues" target="_blank" rel="noopener" data-i18n="foot.issues">Report an issue</a></li>' +
            '<li><a href="' + REPO + '/wiki" target="_blank" rel="noopener" data-i18n="foot.docs">Documentation (WIP)</a></li></ul></div>' +
          '<div><h4 data-i18n="foot.credits">Credits</h4><ul>' +
            '<li><a href="https://github.com/Icepenguins101/charms-bar-port" target="_blank" rel="noopener">Charms Bar Port — Icepenguins101</a></li>' +
            '<li><a href="https://github.com/microsoft/fluentui-system-icons" target="_blank" rel="noopener">Fluent UI System Icons</a></li>' +
            '<li><a href="https://fluentflyout.com/" target="_blank" rel="noopener" data-i18n="foot.inspired">Site design inspired by FluentFlyout</a></li></ul></div>' +
        '</div>' +
        '<div class="footer__legal">' +
          '<p data-i18n-html="foot.disc">Charms Bar Mica is an unofficial project. It is not affiliated with, endorsed by or sponsored by Microsoft Corporation. Windows, Mica and Fluent are trademarks of Microsoft Corporation; their use here is descriptive.</p>' +
          '<p data-i18n-html="foot.lic">Original work by Kotofey008 is licensed under <a href="' + REPO + '/blob/main/LICENSE.md" target="_blank" rel="noopener">PolyForm Noncommercial 1.0.0</a>. Material from the original Charms Bar Port and third parties is not relicensed.</p>' +
        '</div>' +
      '</div></footer>';
  }

  buildHeader();
  buildFooter();

  /* ======================================================================
     2. Multilanguage (EN - default inside HTML, RU - i18n-ru.js)
     ====================================================================== */
  var lang = "en";
  var RU = window.I18N_RU || {};

  function applyLang(l) {
    lang = l;
    root.setAttribute("lang", l);
    $$("[data-i18n]").forEach(function (el) {
      if (el.__en === undefined) el.__en = el.textContent;
      el.textContent = (l === "ru" && RU[el.getAttribute("data-i18n")]) || el.__en;
    });
    $$("[data-i18n-html]").forEach(function (el) {
      if (el.__enh === undefined) el.__enh = el.innerHTML;
      el.innerHTML = (l === "ru" && RU[el.getAttribute("data-i18n-html")]) || el.__enh;
    });
    $$("[data-i18n-attr]").forEach(function (el) {
      el.__ena = el.__ena || {};
      el.getAttribute("data-i18n-attr").split(";").forEach(function (pair) {
        var p = pair.split(":"), attr = p[0].trim(), key = p[1].trim();
        if (el.__ena[attr] === undefined) el.__ena[attr] = el.getAttribute(attr);
        el.setAttribute(attr, (l === "ru" && RU[key]) || el.__ena[attr]);
      });
    });
    var tk = "title." + page;
    if (document.__enTitle === undefined) document.__enTitle = document.title;
    document.title = (l === "ru" && RU[tk]) || document.__enTitle;
    $$("[data-lang]").forEach(function (b) { b.setAttribute("aria-checked", b.getAttribute("data-lang") === l ? "true" : "false"); });
    updateClock();
    layoutPivot();
    refreshOpenFaq();
  }

  function initLang() {
    var saved = store("lang");
    var l = saved || ((navigator.language || "en").toLowerCase().indexOf("ru") === 0 ? "ru" : "en");
    applyLang(l);
    $$("[data-lang]").forEach(function (b) {
      b.addEventListener("click", function () {
        var nl = b.getAttribute("data-lang");
        store("lang", nl);
        applyLang(nl);
        closeMenus();
      });
    });
  }

  /* ======================================================================
     3. Theme: auto (system) + manual, Fluent menu
     ====================================================================== */
  var mq = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;

  function currentMode() { return root.getAttribute("data-theme-mode") || "system"; }

  function applyTheme(mode) {
    var dark = mode === "dark" || (mode === "system" && mq && mq.matches);
    root.setAttribute("data-theme-mode", mode);
    root.setAttribute("data-theme", dark ? "dark" : "light");
    var icon = $("#theme-ico");
    if (icon) icon.innerHTML = ico(dark ? "moon" : "sun");
    $$("[data-theme-set]").forEach(function (b) { b.setAttribute("aria-checked", b.getAttribute("data-theme-set") === mode ? "true" : "false"); });
    // addressbar color on mobiles
    $$('meta[name="theme-color"]').forEach(function (m) { m.setAttribute("content", dark ? "#202020" : "#f3f3f3"); });
  }

  function initTheme() {
    applyTheme(currentMode());
    $$("[data-theme-set]").forEach(function (b) {
      b.addEventListener("click", function () {
        var m = b.getAttribute("data-theme-set");
        if (m === "system") { try { localStorage.removeItem("theme"); } catch (e) {} } else store("theme", m);
        applyTheme(m);
        closeMenus();
      });
    });
    // Automatic theme: follow the system, until the user selects manually
    var onChange = function () { if (currentMode() === "system") applyTheme("system"); };
    if (mq) { if (mq.addEventListener) mq.addEventListener("change", onChange); else if (mq.addListener) mq.addListener(onChange); }
  }

  /* ----- Fluent menu (flyout) ----- */
  function closeMenus(except) {
    $$(".flyout.open").forEach(function (f) {
      if (f === except) return;
      f.classList.remove("open");
      var b = f.parentNode.querySelector("[aria-haspopup]");
      if (b) b.setAttribute("aria-expanded", "false");
    });
  }
  function initMenus() {
    [["#theme-btn", "#theme-menu"], ["#lang-btn", "#lang-menu"]].forEach(function (p) {
      var btn = $(p[0]), menu = $(p[1]);
      if (!btn || !menu) return;
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        var open = !menu.classList.contains("open");
        closeMenus(menu);
        menu.classList.toggle("open", open);
        btn.setAttribute("aria-expanded", open ? "true" : "false");
        if (open) { var sel = menu.querySelector('[aria-checked="true"]') || menu.querySelector("button"); if (sel) sel.focus(); }
      });
      menu.addEventListener("click", function (e) { e.stopPropagation(); });
    });
    document.addEventListener("click", function () { closeMenus(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") { closeMenus(); closeMobile(); } });

    // mobile menu (burger)
    var burger = $("#burger"), panel = $("#mobile-panel");
    if (burger && panel) {
      burger.addEventListener("click", function () {
        var open = !panel.classList.contains("open");
        panel.classList.toggle("open", open);
        burger.setAttribute("aria-expanded", open ? "true" : "false");
        burger.innerHTML = ico(open ? "close" : "menu");
        document.body.style.overflow = open ? "hidden" : "";
      });
      $$("a", panel).forEach(function (a) { a.addEventListener("click", closeMobile); });
    }
  }
  function closeMobile() {
    var burger = $("#burger"), panel = $("#mobile-panel");
    if (!burger || !panel || !panel.classList.contains("open")) return;
    panel.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
    burger.innerHTML = ico("menu");
    document.body.style.overflow = "";
  }

  /* ======================================================================
     4. Scroll reveal (IntersectionObserver)
     ====================================================================== */
  function initReveal() {
    var els = $$("[data-reveal]");
    if (!("IntersectionObserver" in window) || reduceMotion) { els.forEach(function (e) { e.classList.add("in"); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    els.forEach(function (e) { io.observe(e); });
  }

  function initRevealHighlight() {
    document.addEventListener("pointermove", function (e) {
      var card = e.target.closest && e.target.closest(".card--reveal");
      if (!card) return;
      var r = card.getBoundingClientRect();
      card.style.setProperty("--mx", (e.clientX - r.left) + "px");
      card.style.setProperty("--my", (e.clientY - r.top) + "px");
    }, { passive: true });
  }

  /* ======================================================================
     5. Waves in hero (port of fluentflyout.com animation, rewritten for readability)
     ====================================================================== */
  function initWaves() {
    var svg = $("#hero-lines");
    if (!svg) return;
    var hero = svg.closest(".hero"), anchor = $("#lines-center");
    var NS = "http://www.w3.org/2000/svg", W = 1000, H = 560, raf = 0, waves = [];
    var rnd = function (a, b) { return Math.random() * (b - a) + a; };
    var envelope = function (x) { var t = Math.max(0, Math.min(1, x / W)); return Math.pow(Math.sin(Math.PI * t), 4); };

    function pathFor(w, t) {
      var pts = [], x, y;
      for (x = -32; x <= W + 32; x += 32) {
        var a = Math.sin(x * w.freq - t * w.speed + w.phase);
        var b = Math.sin(x * w.freq * 0.57 - t * w.speed * 0.74 + w.phaseB);
        y = w.baseY + (a * w.amp + b * w.amp * 0.48) * envelope(x);
        pts.push([x, y]);
      }
      var d = "M " + pts[0][0] + " " + pts[0][1].toFixed(1);
      for (var i = 0; i < pts.length - 1; i++) {      // сглаживание Catmull-Rom → Bezier
        var p0 = pts[Math.max(0, i - 1)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(pts.length - 1, i + 2)];
        d += " C " + (p1[0] + (p2[0] - p0[0]) / 6).toFixed(1) + " " + (p1[1] + (p2[1] - p0[1]) / 6).toFixed(1) + " " +
                     (p2[0] - (p3[0] - p1[0]) / 6).toFixed(1) + " " + (p2[1] - (p3[1] - p1[1]) / 6).toFixed(1) + " " +
                     p2[0] + " " + p2[1].toFixed(1);
      }
      return d;
    }

    function gradient(id, color) {
      var g = document.createElementNS(NS, "linearGradient");
      g.setAttribute("id", id); g.setAttribute("gradientUnits", "userSpaceOnUse");
      g.setAttribute("x1", 0); g.setAttribute("x2", W); g.setAttribute("y1", 0); g.setAttribute("y2", 0);
      [["15%", 0], ["40%", 1], ["60%", 1], ["85%", 0]].forEach(function (s) {
        var st = document.createElementNS(NS, "stop");
        st.setAttribute("offset", s[0]); st.setAttribute("stop-color", color); st.setAttribute("stop-opacity", s[1]);
        g.appendChild(st);
      });
      return g;
    }

    function build() {
      cancelAnimationFrame(raf);
      svg.innerHTML = ""; waves = [];
      var box = hero.getBoundingClientRect();
      H = Math.max(560, Math.round(box.height * 1.18));
      svg.setAttribute("viewBox", "0 0 " + W + " " + H);
      var defs = document.createElementNS(NS, "defs");
      defs.appendChild(gradient("hl-a", "#0078d4"));
      defs.appendChild(gradient("hl-b", "#60cdff"));
      svg.appendChild(defs);
      var g = document.createElementNS(NS, "g");
      svg.appendChild(g);
      var frac = 0.4;
      if (anchor) { var ar = anchor.getBoundingClientRect(); frac = Math.max(0.15, Math.min(0.85, (ar.top + ar.height / 2 - box.top) / Math.max(1, box.height))); }
      for (var i = 0; i < 5; i++) {
        var p = document.createElementNS(NS, "path");
        p.setAttribute("fill", "none");
        p.setAttribute("vector-effect", "non-scaling-stroke");
        p.style.stroke = i % 2 === 0 ? "url(#hl-a)" : "url(#hl-b)";
        p.style.strokeWidth = "2";
        p.style.opacity = String(rnd(0.22, 0.38));
        g.appendChild(p);
        waves.push({ el: p, baseY: H * frac, amp: rnd(50, 80) / 1.5, freq: rnd(0.009, 0.015), speed: rnd(0.07, 0.12), phase: rnd(0, 6.28), phaseB: rnd(0, 6.28) });
      }
      if (reduceMotion) { waves.forEach(function (w) { w.el.setAttribute("d", pathFor(w, 0)); }); return; }
      var t0 = performance.now();
      (function frame(now) {
        var t = (now - t0) / 1000;
        waves.forEach(function (w) { w.el.setAttribute("d", pathFor(w, t)); });
        raf = requestAnimationFrame(frame);
      })(t0);
    }
    build();
    var rt;
    window.addEventListener("resize", function () { clearTimeout(rt); rt = setTimeout(build, 150); }, { passive: true });
    document.addEventListener("visibilitychange", function () { if (document.hidden) cancelAnimationFrame(raf); else build(); });
  }

  /* ======================================================================
     6. Interactive Charms Bar demo (clock + hover)
     ====================================================================== */
  var clockT, clockD;
  function updateClock() {
    if (!clockT) return;
    var now = new Date(), loc = lang === "ru" ? "ru-RU" : undefined;
    try {
      clockT.textContent = now.toLocaleTimeString(loc, { hour: "2-digit", minute: "2-digit" });
      clockD.textContent = now.toLocaleDateString(loc, { weekday: "long", month: "long", day: "numeric" });
    } catch (e) {}
  }

  function initDemo() {
    var desk = $("#desk");
    if (!desk) return;
    clockT = $("#clock-time"); clockD = $("#clock-date");
    updateClock(); setInterval(updateClock, 1000);

    // Ensure charms in the demo don't exceed 84px; on smaller screens they get smaller.
    var charmsNodeList = $$(".charm", desk);
    function updateCharmSize() {
      if (!charmsNodeList || !charmsNodeList.length) return;
      // size is min(84px, 12% of viewport width)
      var size = Math.min(84, Math.max(20, Math.floor(window.innerWidth * 0.12)));
      charmsNodeList.forEach(function (c) { c.style.width = c.style.height = size + "px"; });
      // Ensure the charms panel itself does not exceed the same maximum width
      var barEl = document.getElementById('charms') || document.querySelector('#charms');
      if (barEl) {
        barEl.style.maxWidth = size + "px";
        barEl.style.width = size + "px";
      }
    }
    updateCharmSize();
    window.addEventListener('resize', updateCharmSize, { passive: true });

    var hot = $("#hot"), bar = $("#charms"), toggle = $("#demo-toggle");
    var auto = !reduceMotion, pinned = false, closeT = 0, loopT = 0;

    function open() { clearTimeout(closeT); desk.classList.add("open"); }
    function close() { desk.classList.remove("open"); }
    function later() { clearTimeout(closeT); closeT = setTimeout(function () { if (!pinned) close(); }, 800); }
    function stopAuto() { auto = false; clearTimeout(loopT); }

    function loop() {
      if (!auto) return;
      open();
      loopT = setTimeout(function () {
        if (!auto) return;
        close();
        loopT = setTimeout(loop, 2800);
      }, 4400);
    }
    loopT = setTimeout(loop, 1600);

    hot.addEventListener("mouseenter", function () { stopAuto(); open(); });
    hot.addEventListener("click", function () { stopAuto(); pinned = !pinned; pinned ? open() : close(); toggle.setAttribute("aria-pressed", String(pinned)); });
    bar.addEventListener("mouseenter", function () { stopAuto(); open(); });
    hot.addEventListener("mouseleave", later);
    bar.addEventListener("mouseleave", later);

    toggle.addEventListener("click", function () {
      stopAuto();
      pinned = !desk.classList.contains("open");
      pinned ? open() : close();
      toggle.setAttribute("aria-pressed", String(pinned));
    });

    $$(".charm", bar).forEach(function (c) {
      c.addEventListener("click", function () {
        stopAuto();
        $$(".charm.pop", bar).forEach(function (o) { o.classList.remove("pop"); });
        c.classList.add("pop");
        setTimeout(function () { c.classList.remove("pop"); }, 1500);
      });
    });
  }

  /* ======================================================================
     7. Screenshots: Pivot + lightbox
     ====================================================================== */
  var RAW = "https://raw.githubusercontent.com/Kotofey008/charms-bar-mica/main/resource/";
  var pivot, ind, tabs = [];

  function layoutPivot() {
    if (!pivot) return;
    var sel = tabs.filter(function (t) { return t.getAttribute("aria-selected") === "true"; })[0];
    if (!sel) return;
    ind.style.width = sel.offsetWidth + "px";
    ind.style.transform = "translateX(" + sel.offsetLeft + "px)";
  }

  function initShots() {
    pivot = $("#pivot");
    if (!pivot) return;
    ind = $("#pivot-ind");
    tabs = $$(".pivot__btn", pivot);
    var shot = $("#shot"), img = $("#shot-img");

    function select(tab, first) {
      tabs.forEach(function (t) { t.setAttribute("aria-selected", t === tab ? "true" : "false"); t.tabIndex = t === tab ? 0 : -1; });
      layoutPivot();
      shot.classList.remove("failed"); shot.classList.add("loading");
      img.classList.remove("show");
      var src = RAW + tab.getAttribute("data-file");
      img.onload = function () { shot.classList.remove("loading"); img.classList.add("show"); };
      img.onerror = function () { shot.classList.remove("loading"); shot.classList.add("failed"); };
      img.src = src;
      img.alt = "Charms Bar Mica - " + tab.textContent;
    }
    tabs.forEach(function (t, i) {
      t.addEventListener("click", function () { select(t); });
      t.addEventListener("keydown", function (e) {
        var n = e.key === "ArrowRight" ? i + 1 : e.key === "ArrowLeft" ? i - 1 : null;
        if (n === null) return;
        n = (n + tabs.length) % tabs.length; tabs[n].focus(); select(tabs[n]); e.preventDefault();
      });
    });
    // start with the tab that matches the current theme, or the first one
    select(root.getAttribute("data-theme") === "dark" ? tabs[1] : tabs[0]);
    window.addEventListener("resize", layoutPivot, { passive: true });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(layoutPivot);

    var lb = $("#lightbox"), lbImg = lb && $("img", lb);
    if (lb && lbImg) {
      img.addEventListener("click", function () {
        if (!img.classList.contains("show")) return;
        lbImg.src = img.src; lbImg.alt = img.alt;
        if (lb.showModal) lb.showModal(); else lb.setAttribute("open", "");
      });
      lb.addEventListener("click", function (e) { if (e.target === lb || e.target === lbImg) lb.close(); });
      $("#lightbox-close").addEventListener("click", function () { lb.close(); });
    }
  }

  /* ======================================================================
     8. FAQ (accordion)
     ====================================================================== */
  function setQA(qa, open) {
    qa.setAttribute("data-open", open ? "true" : "false");
    var q = $(".qa__q", qa);
    if (q) q.setAttribute("aria-expanded", open ? "true" : "false");
  }
  function refreshOpenFaq() { /* grid-rows animation adapts to height */ }
  function initFaq() {
    var items = $$(".qa");
    if (!items.length) return;
    items.forEach(function (qa) {
      var q = $(".qa__q", qa);
      if (!q) return;
      q.addEventListener("click", function () {
        var willOpen = qa.getAttribute("data-open") !== "true";
        items.forEach(function (o) { if (o !== qa) setQA(o, false); });
        setQA(qa, willOpen);
        if (willOpen && qa.id) { try { history.replaceState(null, "", "#" + qa.id); } catch (e) {} }
      });
    });
    function fromHash() {
      var id = location.hash.slice(1);
      var t = id && document.getElementById(id);
      if (t && t.classList.contains("qa")) {
        items.forEach(function (o) { setQA(o, o === t); });
        setTimeout(function () { t.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" }); }, 120);
      }
    }
    fromHash();
    window.addEventListener("hashchange", fromHash);

    // Search through questions (FAQ page)
    var input = $("#faq-search"), empty = $("#faq-empty");
    if (input) {
      input.addEventListener("input", function () {
        var q = input.value.trim().toLowerCase(), shown = 0;
        items.forEach(function (qa) {
          var hit = !q || qa.textContent.toLowerCase().indexOf(q) !== -1;
          qa.hidden = !hit;
          if (hit) shown++;
        });
        $$(".faq-group").forEach(function (g) {
          var n = g.nextElementSibling, any = false;
          while (n && n.classList.contains("qa")) { if (!n.hidden) any = true; n = n.nextElementSibling; }
          g.hidden = !any;
        });
        if (empty) empty.hidden = shown !== 0;
      });
    }
  }

  /* ======================================================================
     9. Other
     ====================================================================== */
  function initMarquee() {
    var t = $("#marquee");
    if (!t) return;
    t.innerHTML += t.innerHTML;          // seamless loop
  }

  function initCopy() {
    $$("[data-copy]").forEach(function (b) {
      b.addEventListener("click", function () {
        var txt = b.getAttribute("data-copy");
        var done = function () {
          var old = b.innerHTML; b.innerHTML = ico("check") + "<span>" + (lang === "ru" ? "Скопировано" : "Copied") + "</span>";
          setTimeout(function () { b.innerHTML = old; }, 1400);
        };
        if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(txt).then(done, done);
        else { var ta = document.createElement("textarea"); ta.value = txt; document.body.appendChild(ta); ta.select(); try { document.execCommand("copy"); } catch (e) {} ta.remove(); done(); }
      });
    });
  }

  /* ---------- init ---------- */
  initTheme();
  initMenus();
  initLang();
  initReveal();
  initRevealHighlight();
  initWaves();
  initDemo();
  initShots();
  initFaq();
  initMarquee();
  initCopy();
})();
