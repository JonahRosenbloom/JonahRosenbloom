/* Replacement for the Wix "Thunderbolt" runtime.
   Re-implements the interactive bits of the original page in plain JS:
   entrance animations, marquee, project lightbox, mobile menu, contact form. */
(function () {
  'use strict';

  /* ---------- CONFIG ---------- */
  // The original form posted to Wix. Point this at your own endpoint
  // (Formspree, Netlify Forms, your API...) to receive submissions.
  // Leave empty to run in demo mode (validates, shows the success message, sends nothing).
  var FORM_ENDPOINT = '';

  var $  = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---------- 1. Entrance animations ----------
     The CSS holds these elements at their first keyframe (paused, fill: backwards)
     until they are marked data-motion-enter="done". Play each when it scrolls into view. */
  // build.py tags every element that has an entrance animation with data-reveal
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var reveals = $$('[data-reveal]');

  function finish(el) { el.setAttribute('data-motion-enter', 'done'); el.style.animationPlayState = ''; }
  function play(el) {
    if (el.getAttribute('data-motion-enter') === 'done') return;
    el.style.animationPlayState = 'running';
    el.addEventListener('animationend', function () { finish(el); }, { once: true });
    setTimeout(function () { finish(el); }, 2500); // safety net
  }
  if (reduce || !('IntersectionObserver' in window)) {
    reveals.forEach(finish);
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { play(e.target); io.unobserve(e.target); }
      });
    }, { threshold: 0.15 });
    reveals.forEach(function (el) { io.observe(el); });
  }

  /* ---------- 2. Marquee ---------- */
  $$('[data-marquee-animation]').forEach(function (u) { u.setAttribute('data-marquee-animation', 'left'); });
  $$('[class*="_pauseMarquee_"]').forEach(function (m) {
    m.className = m.className.replace(/\s*_pauseMarquee_\w+/g, ''); // run by default; CSS pauses on hover
  });
  var mq = $('.text-marquee');
  if (mq) mq.addEventListener('click', function () { mq.classList.toggle('stopMarquee'); });

  /* ---------- 3. Project gallery + lightbox ---------- */
  var track    = $('#projectsTrack');
  var lightbox = $('#projectsLightbox');
  if (track && lightbox) {
    var items   = $$('.projects-slide', track);
    var total   = items.length;
    var img     = $('#projectsLightboxImg');
    var counter = $('#projectsLightboxCounter');
    var titleEl = $('#projectsLightboxTitle');
    var descEl  = $('#projectsLightboxDesc');
    var btnClose = $('#projectsLightboxClose');
    var btnPrev  = $('#projectsLightboxPrev');
    var btnNext  = $('#projectsLightboxNext');
    var current = 0, lastFocus = null;
    var pad = function (n) { return (n < 10 ? '0' : '') + n; };

    function setDisabled(btn, off) { btn.disabled = off; }
    function show(i) {
      current = Math.max(0, Math.min(total - 1, i));
      var it = items[current];
      var caption = $('.projects-slide__label', it);
      img.src = it.querySelector('img').src;
      img.alt = it.getAttribute('aria-label') || '';
      counter.textContent = pad(current + 1) + ' / ' + pad(total);
      titleEl.textContent = it.getAttribute('aria-label') || '';
      descEl.textContent  = caption ? caption.textContent : '';
      setDisabled(btnPrev, current === 0);
      setDisabled(btnNext, current === total - 1);
    }
    function open(i) {
      lastFocus = document.activeElement;
      show(i);
      lightbox.classList.add('is-open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.documentElement.style.overflow = 'hidden';
      btnClose.focus({ preventScroll: true });
    }
    function close() {
      lightbox.classList.remove('is-open');
      lightbox.setAttribute('aria-hidden', 'true');
      document.documentElement.style.overflow = '';
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }
    items.forEach(function (it, i) {
      it.addEventListener('click', function () { open(i); });
    });
    btnClose.addEventListener('click', close);
    btnPrev.addEventListener('click', function () { show(current - 1); });
    btnNext.addEventListener('click', function () { show(current + 1); });
    lightbox.addEventListener('click', function (e) { if (e.target === lightbox) close(); });
    document.addEventListener('keydown', function (e) {
      if (!lightbox.classList.contains('is-open')) return;
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft')  show(current - 1);
      else if (e.key === 'ArrowRight') show(current + 1);
    });

    // main slider arrows: step by one slide's width
    var mPrev = $('.projects-arrow--prev');
    var mNext = $('.projects-arrow--next');
    function step(dir) {
      var w = items[0].getBoundingClientRect().width;
      track.scrollBy({ left: dir * w, behavior: 'smooth' });
    }
    if (mPrev) mPrev.addEventListener('click', function () { step(-1); });
    if (mNext) mNext.addEventListener('click', function () { step(1); });
  }

  /* ---------- 4. Mobile menu (hamburger) ---------- */
  var burger = $('.hamburger-open-button');
  var nav    = $('.navbar ul');
  if (burger && nav) {
    var overlay = document.createElement('div');
    overlay.className = 'mobile-menu';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Site menu');
    overlay.hidden = true;
    var closeBtn = document.createElement('button');
    closeBtn.type = 'button'; closeBtn.className = 'mobile-menu__close';
    closeBtn.setAttribute('aria-label', 'Close menu'); closeBtn.innerHTML = '&times;';
    var ul = document.createElement('ul');
    $$('a[data-part="menu-item-link"]', nav).forEach(function (a) {
      var li = document.createElement('li'), l = document.createElement('a');
      l.href = a.getAttribute('href'); l.textContent = a.textContent.trim();
      if (a.getAttribute('aria-current')) l.setAttribute('aria-current', 'page');
      li.appendChild(l); ul.appendChild(li);
    });
    overlay.appendChild(closeBtn); overlay.appendChild(ul);
    document.body.appendChild(overlay);
    var setMenu = function (open) {
      overlay.hidden = !open;
      document.documentElement.style.overflow = open ? 'hidden' : '';
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    };
    burger.addEventListener('click', function () { setMenu(true); });
    closeBtn.addEventListener('click', function () { setMenu(false); });
    ul.addEventListener('click', function (e) { if (e.target.tagName === 'A') setMenu(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !overlay.hidden) setMenu(false); });
  }

  /* ---------- 5. Contact form ---------- */
  var form = $('form[aria-label="Electrical Engineering Portfolio Contact"]');
  if (form) {
    var submit = $('[data-hook="submit-button"]', form);
    var status = $('[role="region"][aria-live="polite"] > div', form);
    var fields = $$('input[required], textarea[required]', form);
    var errBox = function (input) {
      var wrap = input.closest('[data-hook^="form-field-"]');
      return wrap ? $('[data-hook^="field-error-"]', wrap.parentNode) : null;
    };
    var setError = function (input, msg) {
      var box = errBox(input);
      if (box) { box.textContent = msg || ''; box.style.color = '#ff5c5c'; box.style.fontSize = '13px'; box.style.marginTop = '4px'; }
      input.setAttribute('aria-invalid', msg ? 'true' : 'false');
    };
    var check = function (input) {
      var v = input.value.trim(), msg = '';
      if (!v) msg = 'This field is required.';
      else if (input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) msg = 'Enter a valid email address.';
      setError(input, msg);
      return !msg;
    };
    fields.forEach(function (f) {
      f.addEventListener('blur', function () { check(f); });
      f.addEventListener('input', function () { if (f.getAttribute('aria-invalid') === 'true') check(f); });
    });
    var say = function (text, ok) {
      if (!status) return;
      status.textContent = text;
      status.style.opacity = '1';
      status.style.color = ok ? '#00e5ff' : '#ff5c5c';
      status.style.marginTop = '12px';
    };
    var send = function () {
      var ok = fields.map(check).every(Boolean);
      if (!ok) { var bad = fields.filter(function (f) { return f.getAttribute('aria-invalid') === 'true'; })[0]; if (bad) bad.focus(); return; }
      var data = {};
      fields.forEach(function (f) { data[f.getAttribute('aria-label') || f.name || f.id] = f.value.trim(); });
      submit.disabled = true;
      var done = function (good) {
        submit.disabled = false;
        if (good) { say('Thanks for submitting!', true); form.reset(); }
        else say('Something went wrong. Please try again.', false);
      };
      if (!FORM_ENDPOINT) { setTimeout(function () { done(true); }, 400); return; }
      fetch(FORM_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(data) })
        .then(function (r) { done(r.ok); }).catch(function () { done(false); });
    };
    if (submit) submit.addEventListener('click', send);
    form.addEventListener('submit', function (e) { e.preventDefault(); send(); });
    form.setAttribute('novalidate', '');
  }
})();
