# Action Plan — dmfootballservices.it

Prioritized by impact/effort. "Effort" is rough dev time, not calendar time.

## Critical (fix immediately)

1. **Commit and deploy today's ClubIS-first repositioning** (index.html, llms.txt, llms-full.txt, ai-content.html, sitemap.xml, src/pages/Index.tsx). Effort: minutes. Unlocks GEO +2-3 points immediately and makes every other GEO recommendation below meaningful.
2. **Fix hero content visibility timing.** Either remove the opacity:0→1 gate on the H1/hero for first paint, or shorten it dramatically (target <1s) and ensure it's not blocking LCP measurement. Effort: 1-2h.
3. **Build real Privacy Policy, Terms of Service, and Cookie Policy pages** and link them from the footer (currently dead `href="#"`). Add a physical business address and P.IVA/VAT number to the footer and Organization schema. Effort: half a day (content + 3 static routes).

## High (fix within 1 week)

4. **Code-split the JS bundle.** Lazy-load Three.js (PitchCanvas), Recharts, and any Radix components not needed on first paint; defer video-player logic until a role card is opened. Effort: 1-2 days.
5. **Force a real 404 status for unmatched SPA routes** (or at minimum `X-Robots-Tag: noindex` on the Vercel rewrite fallback) instead of serving 200 + homepage content. Effort: 1-2h (vercel.json + a light edge check).
6. **Add `www` as a domain alias in Vercel** so a SAN cert is issued and the apex redirect actually works over HTTPS. Effort: 15 min.
7. **Add a founder/team bio section** ("Chi siamo") with 1-2 named people + photo, and a corresponding `Person` schema node. Effort: half a day content + 1h schema.
8. **Add 2-3 named customer case studies or testimonials** (even one beta club). Effort: depends on availability of a willing customer; content itself is ~half a day once you have the quote/data.
9. **Give ClubIS and DM Scout real, distinct routes** (`/clubis`, `/dmscout` at minimum) with their own title/meta/H1/schema instead of same-page anchors, since clubis.it and dmscout.it currently redirect to bare login shells with no marketing value. Effort: 2-3 days (routing + content split, reusing existing copy).
10. **Delete the deprecated HowTo schema node**, fix the dead `SpeakableSpecification` selector, remove the misapplied BreadcrumbList (or replace with real routed breadcrumbs once #9 ships). Effort: 1h.
11. **Throttle/pause the Three.js animation loop** when off-screen (IntersectionObserver-gated `requestAnimationFrame`, same pattern already used correctly for ScrollVideo). Effort: 1-2h.
12. **Preconnect to Google Fonts** and/or self-host the font files instead of a CSS `@import`. Effort: 30 min.

## Medium (fix within 1 month)

13. Add VideoObject schema for the 12 embedded product videos (real duration/thumbnail/uploadDate, not placeholders).
14. Fix `operatingSystem` on both SoftwareApplication nodes to reflect PWA-only (no native iOS/Android app).
15. Add descriptive alt text to product dashboard screenshots (not just role-name labels).
16. Expand the 2-3 top FAQ answers to the 134-167 word AI-citation sweet spot without padding the shorter ones.
17. Increase the mobile hamburger touch target to ~48×48px.
18. Add `prefers-reduced-motion` fallback so scroll-reveal sections aren't permanently invisible if JS errors or a tool doesn't scroll.
19. Add CSP and Referrer-Policy security headers.
20. Automate `lastmod`/`dateModified` freshness stamping as part of the build/deploy step so it stops drifting.
21. Generate an IndexNow key and POST to `api.indexnow.org` on deploy (cheap, helps Bing/Copilot — the weakest AI platform score at 52/100).

## Low / Backlog

22. Build initial backlink profile via free listings: G2, Capterra, GetApp, PagineGialle, Camera di Commercio, sports-tech directories, FIGC/LND regional forums, Startup Italia, EU-Startups, Crunchbase.
23. Re-run the backlink audit once a Moz API key is added.
24. Longer-term GEO roadmap (unchanged from the 2026-05-15 baseline, still the largest single opportunity): YouTube demo videos, LinkedIn company page, Reddit/forum presence — projected to lift GEO from ~66 to 78-82/100.
