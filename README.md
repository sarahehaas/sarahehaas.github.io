# sarahehaas.github.io

Sarah Haas's portfolio site — static HTML, CSS, and JavaScript, served via GitHub Pages. No build step or framework; every page is a plain HTML file that shares `styles.css` and `script.js`.

## Structure

- `index.html`, `about.html`, `contact.html` — public pages.
- `work.html` — the portfolio overview (password-protected).
- `autofill-audit.html`, `autofill.html`, `ai-workflows.html`, `accessibility.html`, `hxp.html` — the five flagship case studies (password-protected).
- `assets/case-studies/` — the images referenced by the case-study pages.
- `portfolio.html`, `autofill-optimization.html`, `in-app-browser.html` — redirect stubs kept so old links keep working.
- `advertiser-education.html`, `device-help.html` — unfinished placeholder pages, intentionally not linked from navigation or the portfolio grid yet.

## Password gate

Protected pages carry the `protected-page` body class and an inline `.password-overlay`. `script.js` checks one shared `localStorage` value; entering the password once unlocks every protected page for 8 hours, with no redirects or query parameters involved. This is a light client-side deterrent, not real security — case-study content is already sanitized for public portfolio use.

## Local preview

No build tools are required. From the repo root:

```
python3 -m http.server 8000
```

Then open `http://localhost:8000/` in a browser.
