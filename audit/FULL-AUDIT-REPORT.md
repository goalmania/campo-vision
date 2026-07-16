# Full SEO Audit — dmfootballservices.it

**Date:** 2026-07-15
**Business type detected:** SaaS (B2B software, pricing/sign-up/free-trial signals)
**Scope:** Single-page site (home + /llms.txt + /llms-full.txt + /ai-content.html)
**Subagents run:** seo-technical, seo-content, seo-schema, seo-performance, seo-visual, seo-geo, seo-sxo, seo-backlinks (8/8 — the full "always include" set for this business type; no local/e-commerce/blog/Google-API/drift-baseline signals detected, so seo-local, seo-maps, seo-google, seo-cluster, seo-ecommerce, seo-drift, seo-dataforseo were correctly skipped)

## IMPORTANT — Deploy-Pending Notice

This audit measured the **live production site**. Earlier today, ClubIS-first repositioning changes were made in the local repo (`/Users/giuseppedimuro/Downloads/campo-vision-main 2`) — new title/meta/schema, rewritten `llms.txt`/`llms-full.txt`/`ai-content.html`, new hero copy. **`git status` confirms these are still uncommitted and not deployed.** Every subagent independently found the live site byte-for-byte identical to the pre-repositioning state. Scores below reflect what's actually live today, not the pending local work.

---

## SEO Health Score: 65 / 100

| Category | Weight | Score | Weighted | Source |
|---|---|---|---|---|
| Technical SEO | 22% | 71 | 15.6 | seo-technical (measured) |
| Content Quality | 23% | 61 | 14.0 | seo-content (measured) |
| On-Page SEO | 20% | 66 | 13.2 | derived from technical+content+visual findings — no dedicated on-page pass this round |
| Schema / Structured Data | 10% | 78 | 7.8 | derived from seo-schema findings (no single score given by agent) |
| Performance (CWV) | 10% | 48 | 4.8 | seo-performance, **heuristic/estimated — no Lighthouse/CrUX data available** |
| AI Search Readiness (GEO) | 10% | 64 | 6.4 | seo-geo (measured; projected 66 once deployed, 78-82 long-term per prior roadmap) |
| Images | 5% | 55 | 2.75 | derived — no dedicated image audit this round |

**Total: 64.6 → 65/100**

Supplementary (not part of the 100-point core — reported separately per methodology):
- **SXO Gap Score: 56/100** (seo-sxo)
- **Backlink Health Score: INSUFFICIENT DATA** — 0 of 7 factors have real data; no Moz/Bing keys, Common Crawl fetch didn't complete (seo-backlinks)

---

## Top 5 Critical / High Issues (cross-agent)

1. **[Critical] Nothing from today's ClubIS-first repositioning is deployed.** All the entity-clarity work (title, schema, llms files, hero copy) sits in an uncommitted working tree. Zero value to any crawler or user until shipped. *(seo-geo, seo-technical)*
2. **[Critical] Hero content is invisible for 4-6 seconds after load**, gated behind a JS fade-in (`opacity:0` → `1`). Likely the LCP element. Real users, social-preview bots, and crawlers on a "normal" 2s wait see a blank dark screen. *(seo-visual)*
3. **[High] 850KB (237KB gzip) monolithic JS bundle blocks all rendering.** No code-splitting across React + Three.js + Recharts + ~20 Radix packages + react-hook-form/zod. This is very likely the single biggest lever on LCP. *(seo-performance)*
4. **[High] SPA catch-all returns HTTP 200 (soft-404) for any nonexistent URL**, byte-identical to the homepage with the same canonical. No real 404 is ever emitted server-side. *(seo-technical)*
5. **[High] Zero trust signals anywhere in the codebase**: Privacy Policy / Terms / Cookie Policy footer links are dead `href="#"` placeholders; no P.IVA/VAT, no physical address, no named founder, no customer testimonials or case studies — despite the product handling payment (Stripe/PayPal) and medical data (certificati medici). This is the single weakest pillar in both the Content and SXO audits. *(seo-content, seo-sxo)*

## Additional High/Medium Issues

- `www.dmfootballservices.it` has no valid TLS certificate (SAN mismatch) — the intended redirect to apex can never be delivered. *(seo-technical)*
- CSR/no-JS content gap unchanged since the 2026-05-15 GEO audit; the previously-recommended AI-crawler edge-middleware quick win was never implemented. *(seo-technical, seo-geo)*
- Deprecated `HowTo` schema node still present (Google removed HowTo rich results Sept 2023) — delete outright. *(seo-schema)*
- `SpeakableSpecification` references a dead CSS selector (`.product-summary` doesn't exist in source). *(seo-schema)*
- `BreadcrumbList` is misapplied to same-page anchors (`#clubis`, `#dmscout`, `#prezzi`) with no visible breadcrumb UI — unlikely to render, recommend removal. *(seo-schema)*
- Autoplaying video-with-audio (one per role card + pricing section) risks mobile data/battery and INP jank; files up to 16.9MB fully buffer on `.play()`. *(seo-performance)*
- Fonts loaded via `@import` in CSS with no `preconnect` — adds a serial round-trip chain directly in the LCP render path. *(seo-performance)*
- Unthrottled Three.js `requestAnimationFrame` loop in `PitchCanvas` never pauses even when scrolled off-screen. *(seo-performance)*
- Mobile hamburger menu button is 22×22px — below the ~48×48px touch-target minimum. *(seo-visual)*
- All below-the-fold content is gated behind scroll-triggered reveal animations with no `prefers-reduced-motion` fallback — fragile if JS errors or a tool doesn't scroll. *(seo-visual)*
- Single-URL architecture (`#clubis`/`#dmscout` anchors, not real routes) vs. a SERP dominated by competitors with dedicated per-product landing pages (weSpoort, Golee, SportEasy, 360Player, SportAssist). *(seo-sxo)*
- `clubis.it` redirects straight to `/auth/login` and `dmscout.it` is a bare app shell — the "separate product domains" currently carry zero marketing/SEO value, so every trial CTA dumps high-intent visitors into an unbranded login screen. *(seo-sxo)*
- Stale `dateModified`/`lastmod` values (`2026-05-15`) across JSON-LD, sitemap.xml, ai-content.html, llms files. *(seo-schema, seo-technical, seo-content)*
- Missing `aggregateRating` (don't fabricate — add once real reviews exist), overstated `operatingSystem` claims on both SoftwareApplication schema nodes (PWA only, no native app — no Capacitor/Cordova in repo). *(seo-schema)*
- No VideoObject schema despite 12 real embedded product videos. *(seo-schema, seo-geo)*
- Missing descriptive `alt` text on product dashboard screenshots (role-name labels only). *(seo-content)*
- No CSP / Referrer-Policy security headers; no IndexNow implementation. *(seo-technical)*
- Zero external brand-authority presence confirmed: YouTube, LinkedIn, Reddit, Wikipedia all absent (Wikipedia 404-checked live) — the single largest unaddressed GEO gap, worth far more than the repositioning alone (baseline's own projected ceiling: 78-82/100). *(seo-geo)*

---

## Per-Category Reports

Full detail for each dimension is in the sibling files in this folder:
- `seo-technical.md` — 71/100
- `seo-content.md` — 61/100 (Trustworthiness 10/30 is the weak pillar; AI Citation Readiness 74/100)
- `seo-schema.md` — full JSON-LD node-by-node validation + copy-paste fixes
- `seo-performance.md` — heuristic/estimated only, explicitly labeled (no PSI/CrUX access in this environment)
- `seo-visual.md` — desktop.png / mobile.png / mobile-hero.png in `screenshots/`
- `seo-geo.md` — 64/100 live, 66/100 projected once deployed, 78-82/100 long-term ceiling
- `seo-sxo.md` — 56/100 SXO Gap Score, persona-by-persona breakdown
- `seo-backlinks.md` — insufficient data, free next-step directory list
