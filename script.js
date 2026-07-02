:root {
  --bg: #f7f3ec;
  --surface: #fbf8f2;
  --surface-soft: #f0eee5;
  --ink: #151914;
  --muted: #5f625a;
  --line: #d9d2c5;
  --green: #0c4d43;
  --green-2: #0f6b5d;
  --green-soft: #e7eee7;
  --accent: #8a704b;
  --max: 1180px;
  --serif: Georgia, 'Times New Roman', serif;
  --sans: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  margin: 0;
  background: var(--bg);
  color: var(--ink);
  font-family: var(--sans);
  font-size: 16px;
  line-height: 1.55;
  text-rendering: optimizeLegibility;
}
img { max-width: 100%; display: block; }
a { color: inherit; text-decoration: none; }

.skip-link {
  position: absolute;
  left: -999px;
  top: 0;
  background: var(--green);
  color: #fff;
  padding: 0.75rem 1rem;
  z-index: 100;
}
.skip-link:focus { left: 1rem; top: 1rem; }

.site-header {
  position: sticky;
  top: 0;
  z-index: 40;
  background: rgba(247,243,236,0.94);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--line);
}
.header-inner {
  max-width: var(--max);
  margin: 0 auto;
  padding: 1.35rem 1.4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
}
.brand {
  font-family: var(--serif);
  font-size: clamp(1.35rem, 2vw, 1.75rem);
  letter-spacing: -0.02em;
}
.nav { display: flex; align-items: center; gap: clamp(1rem, 3vw, 2.35rem); }
.nav a {
  font-size: 0.92rem;
  font-weight: 650;
  letter-spacing: 0.01em;
  color: #1d241f;
}
.nav a:hover, .nav a[aria-current="page"] { color: var(--green); }
.nav .contact-link {
  padding: 0.62rem 0.9rem;
  border: 1px solid var(--green);
  border-radius: 4px;
  color: var(--green);
}

main { min-height: 70vh; }
.section {
  max-width: var(--max);
  margin: 0 auto;
  padding: clamp(3.25rem, 7vw, 5.5rem) 1.4rem;
  border-top: 1px solid var(--line);
}
.section:first-child { border-top: 0; }
.eyebrow {
  margin: 0 0 1.25rem;
  color: var(--green);
  text-transform: uppercase;
  letter-spacing: 0.15em;
  font-weight: 800;
  font-size: 0.76rem;
}
h1, h2, h3, .display {
  font-family: var(--serif);
  font-weight: 500;
  letter-spacing: -0.04em;
  color: var(--ink);
}
h1 {
  font-size: clamp(3.05rem, 7vw, 6.4rem);
  line-height: 0.98;
  margin: 0 0 2rem;
  max-width: 850px;
}
h2 {
  font-size: clamp(2rem, 4vw, 3.2rem);
  line-height: 1.05;
  margin: 0 0 1rem;
}
h3 { font-size: 1.35rem; line-height: 1.18; margin: 0 0 0.65rem; }
p { margin: 0 0 1rem; }
.muted { color: var(--muted); }
.rule { width: 56px; height: 2px; background: var(--green); margin: 0 0 1.8rem; }

.hero {
  max-width: var(--max);
  margin: 0 auto;
  padding: clamp(4rem, 8vw, 7rem) 1.4rem clamp(3rem, 6vw, 5.5rem);
  display: grid;
  grid-template-columns: minmax(0, 1.65fr) minmax(280px, 0.85fr);
  gap: clamp(2rem, 6vw, 5.2rem);
  align-items: center;
}
.hero-copy { max-width: 860px; }
.hero-sub {
  font-size: clamp(1.06rem, 1.7vw, 1.32rem);
  max-width: 650px;
  color: #29332f;
}
.hero-side {
  border-left: 1px solid var(--line);
  padding-left: clamp(1.5rem, 4vw, 3rem);
  align-self: stretch;
  display: flex;
  align-items: center;
}
.hero-side .callout {
  font-family: var(--serif);
  font-size: clamp(1.65rem, 2.4vw, 2.35rem);
  line-height: 1.14;
  letter-spacing: -0.03em;
  color: var(--green);
}
.hero-side .callout span {
  display: block;
  color: var(--ink);
  margin-top: 1.7rem;
  padding-top: 1.7rem;
  border-top: 1px solid var(--line);
}
.button-row { display: flex; gap: 1rem; flex-wrap: wrap; align-items: center; margin-top: 2rem; }
.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  border: 1px solid var(--green);
  border-radius: 4px;
  padding: 0.82rem 1.1rem;
  color: var(--green);
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  font-size: 0.78rem;
  transition: 160ms ease;
}
.btn.primary { background: var(--green); color: #fff; }
.btn:hover { transform: translateY(-1px); box-shadow: 0 10px 20px rgba(12,77,67,0.12); }

.section-head {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 1.5rem;
  align-items: end;
  margin-bottom: 2rem;
}
.section-lede {
  max-width: 610px;
  font-size: 1.1rem;
  color: #2d3632;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.8rem;
}
.card {
  background: rgba(251,248,242,0.72);
  border: 1px solid var(--line);
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-height: 100%;
}
.card-body { padding: 1.35rem; }
.card-kicker {
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--green);
  font-weight: 800;
  font-size: 0.72rem;
  margin: 0 0 0.6rem;
}
.card p { color: #2e3834; }
.card .mini-link, .mini-link {
  display: inline-flex;
  align-items: center;
  gap: .5rem;
  margin-top: auto;
  color: var(--green);
  font-weight: 800;
  font-size: .82rem;
  text-transform: uppercase;
  letter-spacing: .05em;
}
.card .mini-link.button-like {
  background: var(--green);
  color: #fff;
  padding: .62rem .82rem;
  border-radius: 4px;
  margin-top: 1rem;
}
.preview {
  height: 235px;
  background: #f1f3ef;
  border-bottom: 1px solid var(--line);
  padding: 1.15rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.preview-ui {
  background: #fff;
  border: 1px solid #d9ddd9;
  border-radius: 8px;
  width: 100%;
  max-width: 310px;
  min-height: 168px;
  padding: 1rem;
  box-shadow: 0 16px 35px rgba(20,20,20,0.07);
  font-size: .85rem;
}
.preview-ui.dark { background: #141917; color: #fff; border-color: #333; }
.preview-ui.bluebar::before {
  content: '';
  display: block;
  margin: -1rem -1rem 1rem;
  height: 42px;
  background: #1462c5;
  border-radius: 8px 8px 0 0;
}
.preview-ui.purple { background: linear-gradient(135deg, #1d123e, #3f2c75); color: #fff; }
.preview-ui .line {
  height: 11px;
  background: #e3e5e1;
  border-radius: 20px;
  margin: .55rem 0;
}
.preview-ui.dark .line, .preview-ui.purple .line { background: rgba(255,255,255,0.28); }
.preview-ui .line.short { width: 55%; }
.preview-ui .pill { display: inline-block; background: #0b64e9; color:#fff; padding: .55rem 1.4rem; border-radius: 8px; margin-top: 1rem; }
.preview-ui .small-pill { display: inline-block; border:1px solid currentColor; border-radius: 20px; padding: .25rem .55rem; margin: .35rem .25rem 0 0; font-size:.72rem; opacity:.8; }

.bring-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0;
  border-top: 1px solid var(--line);
  border-left: 1px solid var(--line);
}
.capability {
  padding: 1.45rem;
  border-right: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  background: rgba(251,248,242,0.35);
}
.capability h3 { font-size: 1.25rem; }
.capability p { color: #2d3632; font-size: .98rem; }

.impact {
  border: 1px solid var(--line);
  background: linear-gradient(90deg, #e9f0e9, #f8f4ec);
  border-radius: 8px;
  padding: clamp(1.6rem, 4vw, 2.6rem);
  display: grid;
  gap: 1.5rem;
}
.impact-path {
  display: flex;
  flex-wrap: wrap;
  gap: .6rem 1rem;
  align-items: baseline;
  font-family: var(--serif);
  font-size: clamp(1.5rem, 3vw, 2.15rem);
  letter-spacing: -0.035em;
  color: var(--green);
}
.impact-path span { color: var(--ink); }
.impact-path .arrow { font-family: var(--sans); color: var(--accent); font-size: 1.1rem; letter-spacing: 0; }
.impact-text { max-width: 780px; color: #26342f; }

.about-teaser {
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: clamp(2rem, 6vw, 4rem);
  align-items: center;
}
.about-photo img {
  width: 250px;
  height: 250px;
  object-fit: cover;
  border-radius: 8px;
}
.caption {
  margin-top: .7rem;
  color: var(--muted);
  font-size: .92rem;
}
.about-copy h2 { max-width: 800px; }
.about-copy p { max-width: 760px; color:#2c3733; }

.contact-block {
  display: grid;
  grid-template-columns: 1fr 1.25fr;
  gap: 3rem;
  align-items: start;
}
.contact-list { border-top: 1px solid var(--line); }
.contact-row {
  display: grid;
  grid-template-columns: 160px 1fr auto;
  gap: 1rem;
  padding: 1.1rem 0;
  border-bottom: 1px solid var(--line);
}
.contact-row .label { text-transform: uppercase; letter-spacing: .12em; font-size: .78rem; color: var(--muted); font-weight: 800; }

.footer {
  max-width: var(--max);
  margin: 0 auto;
  padding: 1.7rem 1.4rem;
  color: var(--muted);
  display: flex;
  justify-content: space-between;
  border-top: 1px solid var(--line);
  gap: 2rem;
}
.footer strong { color: var(--green); }

.page-hero {
  max-width: var(--max);
  margin: 0 auto;
  padding: clamp(4rem, 8vw, 6.5rem) 1.4rem 3rem;
}
.page-hero h1 { max-width: 1000px; }
.page-hero .lede { font-size: 1.2rem; max-width: 760px; color: #2d3632; }

.work-list { display: grid; gap: 1rem; }
.work-row {
  display: grid;
  grid-template-columns: 1fr 2.2fr auto;
  gap: 1.5rem;
  padding: 1.3rem 0;
  border-top: 1px solid var(--line);
  align-items: start;
}
.work-row:last-child { border-bottom: 1px solid var(--line); }
.work-row .meta { color: var(--muted); font-size: .92rem; }
.tags { display:flex; gap:.5rem; flex-wrap: wrap; margin-top:.8rem; }
.tag { border:1px solid var(--line); border-radius: 999px; padding:.22rem .55rem; font-size:.72rem; color: var(--green); text-transform: uppercase; letter-spacing: .04em; font-weight:750; }

.filter-list { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1rem 2rem; margin-top: 2rem; }
.archive-item { border-top: 1px solid var(--line); padding: 1rem 0; }
.archive-item strong { font-family: var(--serif); font-size: 1.2rem; }
.archive-item small { display:block; color: var(--muted); margin-top:.2rem; }

.timeline {
  display: grid;
  gap: 1.2rem;
  margin-top: 2rem;
}
.timeline-item {
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 2rem;
  padding: 1.2rem 0;
  border-top: 1px solid var(--line);
}
.timeline-item .stage { font-family: var(--serif); font-size: 1.45rem; color: var(--green); }
.timeline-item .org { color: var(--muted); margin-top: .2rem; }

.case-layout { max-width: 1120px; margin: 0 auto; padding: 0 1.4rem 4rem; }
.case-meta { display:flex; gap:.8rem; flex-wrap: wrap; margin: 1rem 0 2rem; }
.case-section { display:grid; grid-template-columns: 1fr 1fr; gap: clamp(2rem, 6vw, 5rem); padding: 3rem 0; border-top: 1px solid var(--line); }
.case-section .note { color: var(--muted); font-style: italic; font-size:.95rem; }
.placeholder-shot { border:1px dashed #c7bda8; min-height: 260px; border-radius:8px; display:flex; align-items:center; justify-content:center; color:#a79e90; background:#f2eee6; }
.stat-grid { display:grid; grid-template-columns: repeat(3, 1fr); gap:1rem; margin:2rem 0; }
.stat { background: var(--green); color:white; border-radius: 8px; padding:1.4rem; }
.stat strong { display:block; font-family:var(--serif); font-size:2.4rem; line-height:1; }

@media (max-width: 920px) {
  .header-inner { align-items: flex-start; }
  .nav { gap: .8rem; flex-wrap: wrap; justify-content: flex-end; }
  .hero { grid-template-columns: 1fr; }
  .hero-side { border-left: 0; border-top: 1px solid var(--line); padding-left: 0; padding-top: 2rem; }
  .card-grid, .bring-grid, .contact-block, .case-section, .about-teaser { grid-template-columns: 1fr; }
  .bring-grid { border-left: 0; }
  .capability { border-left: 0; border-right: 0; padding-left: 0; padding-right: 0; }
  .work-row { grid-template-columns: 1fr; }
  .filter-list { grid-template-columns: 1fr; }
  .timeline-item { grid-template-columns: 1fr; gap:.2rem; }
}
@media (max-width: 620px) {
  .site-header { position: static; }
  .header-inner { display:block; }
  .nav { margin-top:1rem; justify-content:flex-start; }
  h1 { font-size: 3rem; }
  .contact-row { grid-template-columns: 1fr; gap:.25rem; }
  .section-head { grid-template-columns: 1fr; }
  .stat-grid { grid-template-columns:1fr; }
  .footer { display:block; }
}
