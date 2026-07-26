/* Sarah Haas portfolio — validated build 2026-07-26-r3 */
(function () {
  'use strict';

  const PASSWORD = 'portfolio'; // Placeholder only. Client-side deterrence, not server security.
  const STORAGE_KEY = 'sarahPortfolioUnlocked';

  const buttons = document.querySelectorAll('[data-filter]');
  const items = document.querySelectorAll('[data-category]');
  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      buttons.forEach((item) => item.setAttribute('aria-pressed', 'false'));
      button.setAttribute('aria-pressed', 'true');
      items.forEach((item) => {
        item.hidden = !(filter === 'all' || item.dataset.category.includes(filter));
      });
    });
  });

  if (!document.body.classList.contains('protected-page')) return;

  function createOverlay() {
    const wrapper = document.createElement('div');
    wrapper.className = 'password-overlay';
    wrapper.dataset.passwordOverlay = '';
    wrapper.innerHTML = `
      <div class="password-card" role="dialog" aria-modal="true" aria-labelledby="password-title" aria-describedby="password-description">
        <p class="eyebrow">Password-protected portfolio</p>
        <h2 id="password-title">Enter the portfolio password</h2>
        <p id="password-description">This page contains proprietary case studies and work samples that have been sanitized for portfolio use. Enter the password to continue, or contact Sarah to request access.</p>
        <form data-password-form>
          <label for="portfolio-password">Password</label>
          <input id="portfolio-password" name="password" type="password" autocomplete="current-password" required>
          <p class="password-error" data-password-error aria-live="polite"></p>
          <div class="button-row">
            <button class="btn primary" type="submit">View portfolio</button>
            <a class="btn" href="contact.html">Contact me</a>
          </div>
        </form>
      </div>`;
    document.body.appendChild(wrapper);
    return wrapper;
  }

  const unlocked = sessionStorage.getItem(STORAGE_KEY) === 'true';
  const overlay = document.querySelector('[data-password-overlay]') || createOverlay();

  if (unlocked) {
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
      sessionStorage.setItem(STORAGE_KEY, 'true');
      overlay.hidden = true;
      document.body.classList.remove('portfolio-locked');
      window.history.replaceState({}, document.title, window.location.pathname + window.location.hash);
      return;
    }
    error.textContent = 'That password did not work. Please try again or contact Sarah.';
    input.select();
  });
})();
