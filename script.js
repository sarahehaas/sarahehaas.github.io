/* Sarah Haas portfolio — shared password gate
   One localStorage unlock, shared across every protected page, expires after
   8 hours. No redirects, no query parameters, no per-page password state. */
(function () {
  'use strict';

  const PASSWORD = 'portfolio'; // Placeholder only. Client-side deterrence, not server security.
  const STORAGE_KEY = 'sarahPortfolioUnlockedUntil';
  const UNLOCK_DURATION_MS = 8 * 60 * 60 * 1000; // 8 hours

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
