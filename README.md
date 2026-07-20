# Sarah Haas portfolio update

This package consolidates the latest valid decisions from the portfolio working sessions.

## Upload these files to the GitHub repository
- `index.html`
- `portfolio.html`
- `autofill-audit.html`
- `autofill-optimization.html`
- `accessibility.html`
- `ai-workflows.html`
- `about.html`
- `contact.html`
- `styles.css`
- `script.js`
- `assets/`

## Before publishing
1. Change `PASSWORD` near the top of `script.js`. The current placeholder is `portfolio`.
2. Add the real resume PDF and replace the placeholder link in `contact.html`.
3. Add sanitized images to `assets/` when ready. The case studies are intentionally usable without them for now.
4. Replace placeholder Additional Work and Archive cards as those samples are selected.

## Important security note
This is lightweight client-side password gating. It keeps casual visitors out of the portfolio flow, but it does not securely protect sensitive files committed to a public GitHub repository. Only upload fully sanitized material. For stronger protection, use a host with server-side authentication or keep the repository private.

## Included updates
- Portfolio replaces Work throughout.
- Homepage order: Hero → Confusion → Featured case studies → What I bring → About preview.
- Four featured stories: Autofill strategy audit, Autofill content optimization, Accessibility, AI-assisted content-to-code workflow.
- Autofill is presented as a subtle two-part arc: strategy first, execution second.
- All flagship pages use the same case-study rhythm: Hero → impact/role → Challenge → Approach → Impact 1 → Impact 2 → Evidence → Reflection.
- AI case study accurately states that Content Design added strings directly to code and submitted the actual string diffs; Engineering owned the container, UI wiring, review, and integration.
- Accessibility case study accurately distinguishes Sarah’s ecosystem/test-environment work from the vendor’s formal audit.
