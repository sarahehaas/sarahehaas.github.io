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
