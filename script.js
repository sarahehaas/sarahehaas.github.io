/* Sarah Haas portfolio — shared password gate
   One localStorage unlock, shared across every protected page, expires after
   8 hours. No redirects, no query parameters, no per-page password state.

   PORTFOLIO_PASSWORD_ENABLED is the single switch for the whole gate. When
   false, every protected page is directly accessible: the overlay stays
   hidden, the page is never blurred/locked, and the password form is never
   initialized. Flip it back to true to restore the exact prior behavior
   (initial autofocus, blur + pointer-events:none on the background) — no
   other code changes required. */
(function () {
  'use strict';

  const PORTFOLIO_PASSWORD_ENABLED = false;

  const PASSWORD = 'GoodUX'; // Placeholder only. Client-side deterrence, not server security.
  const STORAGE_KEY = 'sarahPortfolioUnlockedUntil';
  const UNLOCK_DURATION_MS = 8 * 60 * 60 * 1000; // 8 hours

  if (!PORTFOLIO_PASSWORD_ENABLED) return;
  if (!document.body.classList.contains('protected-page')) return;

  function isUnlocked() {
    const expiry = Number(window.localStorage.getItem(STORAGE_KEY));
    return Number.isFinite(expiry) && expiry > Date.now();
  }

  function unlock() {
    window.localStorage.setItem(STORAGE_KEY, String(Date.now() + UNLOCK_DURATION_MS));
  }

  const overlay = document.querySelector('[data-password-overlay]');
  if (!overlay) return;

  if (isUnlocked()) {
    overlay.hidden = true;
    document.body.classList.remove('portfolio-locked');
    return;
  }

  overlay.hidden = false;
  document.body.classList.add('portfolio-locked');
  const input = overlay.querySelector('input[name="password"]');
  const form = overlay.querySelector('[data-password-form]');
  const error = overlay.querySelector('[data-password-error]');

  window.setTimeout(() => input && input.focus(), 50);
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (input.value === PASSWORD) {
      unlock();
      overlay.hidden = true;
      document.body.classList.remove('portfolio-locked');
      return;
    }
    error.textContent = 'That password did not work. Please try again or contact Sarah.';
    input.select();
  });
})();

/* Nav scroll shadow — every page, independent of the password gate above. */
(function () {
  'use strict';
  const header = document.querySelector('.site-header');
  if (!header) return;
  const update = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
  update();
  window.addEventListener('scroll', update, { passive: true });
})();

/* Case-study sticky table of contents — active-section highlight on scroll,
   click-to-scroll. Only runs on pages that have a [data-cs-toc] nav. */
(function () {
  'use strict';
  const toc = document.querySelector('[data-cs-toc]');
  if (!toc) return;

  const links = Array.from(toc.querySelectorAll('a[href^="#"]'));
  const sections = links
    .map((link) => document.getElementById(link.getAttribute('href').slice(1)))
    .filter(Boolean);

  links.forEach((link) => {
    link.addEventListener('click', (event) => {
      const target = document.getElementById(link.getAttribute('href').slice(1));
      if (!target) return;
      event.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 90;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  function setActive() {
    let activeId = sections[0] && sections[0].id;
    for (const section of sections) {
      if (section.getBoundingClientRect().top < 170) activeId = section.id;
    }
    links.forEach((link) => {
      link.classList.toggle('is-active', link.getAttribute('href') === `#${activeId}`);
    });
  }

  setActive();
  window.addEventListener('scroll', setActive, { passive: true });
})();

/* Case-study image lightbox — click a [data-lightbox] trigger to open
   the original full-resolution image with zoom and pan. Only runs on
   pages that have both trigger elements and the overlay. Does not
   apply to embeds/iframes/video — those never carry [data-lightbox]. */
(function () {
  'use strict';
  const triggers = Array.from(document.querySelectorAll('[data-lightbox]'));
  const overlay = document.querySelector('[data-lightbox-overlay]');
  if (!triggers.length || !overlay) return;

  const viewport = overlay.querySelector('[data-lightbox-viewport]');
  const image = overlay.querySelector('[data-lightbox-image]');
  const closeBtn = overlay.querySelector('[data-lightbox-close]');
  const zoomInBtn = overlay.querySelector('[data-lightbox-zoom-in]');
  const zoomOutBtn = overlay.querySelector('[data-lightbox-zoom-out]');
  const zoomResetBtn = overlay.querySelector('[data-lightbox-zoom-reset]');
  const fullResLink = overlay.querySelector('[data-lightbox-fullres]');
  const zoomStatus = overlay.querySelector('[data-lightbox-zoom-status]');

  const FITTED = 1;
  const ZOOMED = 2;
  const MAX_ZOOM = 4;
  const ZOOM_STEP = 0.5;
  const PAN_STEP = 40;
  const CLICK_DRAG_THRESHOLD = 6;

  let lastTrigger = null;
  let scale = FITTED;
  let panX = 0;
  let panY = 0;
  let pointerDown = false;
  let dragging = false;
  let startX = 0;
  let startY = 0;
  let startPanX = 0;
  let startPanY = 0;
  let pinchStartDist = 0;
  let pinchStartScale = FITTED;

  function announceZoom() {
    if (zoomStatus) zoomStatus.textContent = `Zoom ${Math.round(scale * 100)}%`;
  }

  function clampPan() {
    const baseW = image.offsetWidth;
    const baseH = image.offsetHeight;
    const vp = viewport.getBoundingClientRect();
    const scaledW = baseW * scale;
    const scaledH = baseH * scale;
    const maxX = Math.max(0, (scaledW - vp.width) / 2);
    const maxY = Math.max(0, (scaledH - vp.height) / 2);
    panX = Math.min(maxX, Math.max(-maxX, panX));
    panY = Math.min(maxY, Math.max(-maxY, panY));
  }

  function applyTransform() {
    clampPan();
    image.style.transform = `translate(${panX}px, ${panY}px) scale(${scale})`;
    image.classList.toggle('is-zoomed', scale > FITTED);
    if (zoomInBtn) zoomInBtn.disabled = scale >= MAX_ZOOM;
    if (zoomOutBtn) zoomOutBtn.disabled = scale <= FITTED;
    announceZoom();
  }

  function resetZoom() {
    scale = FITTED;
    panX = 0;
    panY = 0;
    applyTransform();
  }

  function setZoom(next, focusPoint) {
    const clamped = Math.min(MAX_ZOOM, Math.max(FITTED, next));
    if (focusPoint && clamped !== scale) {
      const ratio = clamped / scale;
      panX = focusPoint.x - (focusPoint.x - panX) * ratio;
      panY = focusPoint.y - (focusPoint.y - panY) * ratio;
    }
    scale = clamped;
    if (scale === FITTED) { panX = 0; panY = 0; }
    applyTransform();
  }

  function open(trigger) {
    lastTrigger = trigger;
    const src = trigger.getAttribute('data-lightbox-src');
    image.src = src;
    image.alt = trigger.getAttribute('data-lightbox-alt') || '';
    if (fullResLink) fullResLink.href = src;
    resetZoom();
    overlay.hidden = false;
    document.body.classList.add('lightbox-open');
    closeBtn.focus();
    document.addEventListener('keydown', onKeydown);
  }

  function close() {
    overlay.hidden = true;
    document.body.classList.remove('lightbox-open');
    image.src = '';
    resetZoom();
    document.removeEventListener('keydown', onKeydown);
    if (lastTrigger) lastTrigger.focus();
  }

  function getFocusable() {
    return Array.from(overlay.querySelectorAll('a[href], button:not([disabled])'))
      .filter((el) => el.offsetParent !== null);
  }

  function onKeydown(event) {
    if (event.key === 'Escape') {
      close();
      return;
    }
    if (event.key === 'Tab') {
      const focusable = getFocusable();
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
      return;
    }
    if (event.key === '+' || event.key === '=') {
      event.preventDefault();
      setZoom(scale + ZOOM_STEP);
    } else if (event.key === '-' || event.key === '_') {
      event.preventDefault();
      setZoom(scale - ZOOM_STEP);
    } else if (event.key === '0') {
      event.preventDefault();
      resetZoom();
    } else if (scale > FITTED && event.key.startsWith('Arrow')) {
      event.preventDefault();
      if (event.key === 'ArrowLeft') panX += PAN_STEP;
      if (event.key === 'ArrowRight') panX -= PAN_STEP;
      if (event.key === 'ArrowUp') panY += PAN_STEP;
      if (event.key === 'ArrowDown') panY -= PAN_STEP;
      applyTransform();
    }
  }

  triggers.forEach((trigger) => {
    trigger.addEventListener('click', (event) => {
      event.preventDefault();
      open(trigger);
    });
  });

  closeBtn.addEventListener('click', close);
  if (zoomInBtn) zoomInBtn.addEventListener('click', () => setZoom(scale + ZOOM_STEP));
  if (zoomOutBtn) zoomOutBtn.addEventListener('click', () => setZoom(scale - ZOOM_STEP));
  if (zoomResetBtn) zoomResetBtn.addEventListener('click', resetZoom);

  overlay.addEventListener('click', (event) => {
    if (event.target === overlay) close();
  });

  /* Click-to-zoom from the fitted state, centered on the click point.
     Once zoomed, a plain click does not zoom further — only dragging
     pans. Distinguished from a drag by pointer-movement distance. */
  image.addEventListener('pointerdown', (event) => {
    pointerDown = true;
    dragging = false;
    startX = event.clientX;
    startY = event.clientY;
    startPanX = panX;
    startPanY = panY;
    image.setPointerCapture(event.pointerId);
  });

  image.addEventListener('pointermove', (event) => {
    if (!pointerDown || scale === FITTED) return;
    const dx = event.clientX - startX;
    const dy = event.clientY - startY;
    if (!dragging && Math.hypot(dx, dy) > CLICK_DRAG_THRESHOLD) {
      dragging = true;
      image.classList.add('is-panning');
    }
    if (dragging) {
      panX = startPanX + dx;
      panY = startPanY + dy;
      applyTransform();
    }
  });

  function endPointer(event) {
    if (!pointerDown) return;
    pointerDown = false;
    image.classList.remove('is-panning');
    if (!dragging && scale === FITTED) {
      const rect = image.getBoundingClientRect();
      const cx = event.clientX - rect.left - rect.width / 2 + panX;
      const cy = event.clientY - rect.top - rect.height / 2 + panY;
      setZoom(ZOOMED, { x: -cx, y: -cy });
    }
    dragging = false;
  }

  image.addEventListener('pointerup', endPointer);
  image.addEventListener('pointercancel', endPointer);

  /* Mouse wheel / trackpad zoom. */
  viewport.addEventListener('wheel', (event) => {
    event.preventDefault();
    const direction = event.deltaY > 0 ? -1 : 1;
    setZoom(scale + direction * (ZOOM_STEP / 2));
  }, { passive: false });

  /* Pinch-to-zoom on touch. */
  viewport.addEventListener('touchstart', (event) => {
    if (event.touches.length === 2) {
      const [a, b] = event.touches;
      pinchStartDist = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
      pinchStartScale = scale;
    }
  }, { passive: true });

  viewport.addEventListener('touchmove', (event) => {
    if (event.touches.length === 2 && pinchStartDist > 0) {
      event.preventDefault();
      const [a, b] = event.touches;
      const dist = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
      setZoom(pinchStartScale * (dist / pinchStartDist));
    }
  }, { passive: false });

  viewport.addEventListener('touchend', () => {
    pinchStartDist = 0;
  });

  window.addEventListener('resize', () => { if (!overlay.hidden) applyTransform(); });
})();
