# Technical SEO Audit — dmfootballservices.it

**Date:** 2026-07-15
**Scope:** Homepage (single-page site) — https://dmfootballservices.it/
**Method:** Live HTTP inspection (curl), robots.txt/sitemap.xml fetch, raw HTML source review, local repo comparison (`/Users/giuseppedimuro/Downloads/campo-vision-main 2`)
**Prior audit referenced:** `GEO-ANALYSIS.md` (2026-05-15) — CSR/SSR gap previously flagged as top issue; re-verified below (status: unchanged).

---

## Technical Score: 71/100

## Category Breakdown

| Category | Status | Score |
|----------|--------|-------|
| Crawlability | pass | 90/100 |
| Indexability | warn | 68/100 |
| Security | warn | 62/100 |
| URL Structure | warn | 70/100 |
| Mobile | pass (unverified live rendering) | 78/100 |
| Core Web Vitals | warn | 60/100 |
| Structured Data | pass | 95/100 |
| JS Rendering | fail | 50/100 |
| IndexNow | fail | 20/100 |

---

## 1. Crawlability — PASS (90/100)

**robots.txt** (`https://dmfootballservices.it/robots.txt`) — present, valid syntax, `Sitemap:` directive included.
- Explicitly allows: Googlebot, Bingbot, Twitterbot, facebookexternalhit, GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, anthropic-ai, Google-Extended, cohere-ai, Meta-ExternalAgent, and wildcard `User-agent: * / Allow: /`.
- No regressions vs the 2026-05-15 GEO audit — OAI-SearchBot and Meta-ExternalAgent additions from that audit are live and confirmed. Good AI-crawler posture.
- No `Disallow` rules blocking CSS/JS/assets.

**sitemap.xml** — present, valid XML, 4 URLs: home, `/llms.txt`, `/llms-full.txt`, `/ai-content.html`. `lastmod` on all four is stale at `2026-05-15` despite the homepage's `Last-Modified` response header showing `2026-07-14` (a real content update). This is **not** a penalty risk — a 4-URL sitemap for a genuine single-page site is correct practice, not "thin sitemap" spam — but the stale `lastmod` values understate freshness to crawlers that use them as a recrawl signal.
- Low priority: bump `lastmod` on deploy (ideally via a build step) rather than hand-editing.

**Noindex:** none found. `<meta name="robots" content="index, follow">` is correctly set, no conflicting JS-injected robots meta detected in source.

---

## 2. Indexability — WARN (68/100)

**Canonical:** `<link rel="canonical" href="https://dmfootballservices.it/">` — self-referencing, correct, identical value appears in both the raw HTML and would be unaffected by JS (no JS-injected canonical override found in source) — this satisfies Google's Dec-2025 guidance that raw-HTML and JS-rendered canonicals must match.

**Hreflang:** single `<link rel="alternate" hreflang="it" ...>` entry pointing to itself. For a genuinely single-locale, single-market (IT) site this is **not required** by Google — hreflang exists to disambiguate between locale variants, and there is only one. It is harmless here (self-referencing, not a wrong-value error) but adds no value. Recommendation: either remove it or add `hreflang="x-default"` pointing to the same URL for completeness if the business ever expects international traffic. Low priority, no action strictly needed.

**Critical finding — SPA catch-all creates soft-404 on every invalid URL:**
`vercel.json` rewrites all non-static-file paths to `/index.html`:
```json
{ "source": "/((?!.*\\.(?:xml|txt|html|png|ico|svg|webp|js|css|json|woff2?|ttf|eot|mp4|webm|mov)(?:\\?.*)?$).*)", "destination": "/index.html" }
```
Verified live: `curl -sI https://dmfootballservices.it/this-page-does-not-exist-xyz` returns **HTTP 200**, `content-length: 35790` — byte-identical to the homepage response, with the same canonical (`https://dmfootballservices.it/`), same title, same JSON-LD. `src/App.tsx` routes any unmatched path (`path="*"`) to `src/pages/NotFound.tsx`, but that component only renders client-side after JS executes — the actual HTTP status code returned by the server is always 200, never a real 404.

**Why this matters:**
- Any non-JS crawler (GPTBot, ClaudeBot, PerplexityBot, scrapers, broken/typo'd backlinks, security scanners probing random paths) receives a fully "valid" 200 page with the homepage's canonical tag for literally any URL — a textbook soft-404 pattern.
- For JS-executing crawlers (Googlebot), the client renders NotFound.tsx, but since the canonical tag in raw HTML still says `https://dmfootballservices.it/`, Google's dual-canonical-signal handling could still treat the fake path as a duplicate/canonicalized-to-home page rather than dropping it as 404 — wasted/confusing crawl signal, though low practical risk for a low-authority-path site.
- Currently low real-world impact (there are no internal links to broken paths and the site has few external backlinks), but it will compound if backlinks accumulate or if bots discover garbage paths via scanning.

**Recommendation (High priority):** Add explicit `X-Robots-Tag: noindex` response header on the catch-all rewrite for non-canonical paths, or better, configure the Vercel rewrite to preserve a 404 status (Vercel supports `"statusCode": 404` on `rewrites`/`routes` in some configurations) so `NotFound.tsx` paths return an actual HTTP 404 rather than 200. At minimum, add a `<meta name="robots" content="noindex">` conditionally rendered in `NotFound.tsx` for JS-executing crawlers, and add `X-Robots-Tag: noindex` header scoped to any path not in the known-URL allowlist if full 404 status isn't feasible on this rewrite architecture.

**Deploy-pending discrepancy (flag, not a bug):** Local repo has uncommitted changes (`git status` shows `M index.html`, `public/ai-content.html`, `public/llms-full.txt`, `public/llms.txt`, `public/sitemap.xml`, `src/pages/Index.tsx`) repositioning ClubIS as primary product. Live site still serves the **old** title/meta: `"DM Football Services — Software Gestionale Calcio | ClubIS & DM Scout"`, while local `index.html` has the new `"ClubIS — Gestionale Calcio per Società Strutturate | DM Football Services"`. This is expected/in-progress per the task brief — not a defect — but flagged so it isn't mistaken for a live indexability issue. Once deployed, re-verify canonical/title/JSON-LD consistency and update sitemap `lastmod`.

---

## 3. Security — WARN (62/100)

`curl -sI https://dmfootballservices.it/` headers observed:
```
strict-transport-security: max-age=63072000
x-content-type-options: nosniff
x-frame-options: SAMEORIGIN
permissions-policy: camera=(), microphone=(), geolocation=()
```

**Present and good:** HSTS (2-year max-age), X-Content-Type-Options, X-Frame-Options, Permissions-Policy — all configured in `vercel.json`.

**Missing (Medium priority):**
- `Content-Security-Policy` — not present at all. No CSP means no defense-in-depth against XSS/injection even though this is a static SPA; recommend at minimum a baseline CSP (`default-src 'self'; script-src 'self'; ...`) tuned to the Vercel/Vite build output.
- `Referrer-Policy` — not present. Recommend `Referrer-Policy: strict-origin-when-cross-origin`.
- HSTS present but missing `includeSubDomains` and `preload` — relevant given the www-subdomain issue below.

**High priority — www subdomain has no valid TLS certificate:**
`curl -v https://www.dmfootballservices.it/` fails hard with:
```
subject: CN=dmfootballservices.it
subjectAltName does not match www.dmfootballservices.it
SSL: no alternative certificate subject name matches target host name 'www.dmfootballservices.it'
```
The certificate only covers the apex domain — `www` is not in the SAN list. This means any standard browser or bot connecting to `https://www.dmfootballservices.it/` fails TLS validation **before** the HTTP redirect (307 → apex) can even be delivered; users get a hard security interstitial, not a silent redirect. Only bypassing cert validation (`curl -k`) reveals the intended 307 redirect to the apex domain. **Fix:** add `www.dmfootballservices.it` to the Vercel domain/cert configuration (Vercel auto-provisions SAN certs for all domains attached to the project — this is almost certainly a missing domain-alias configuration in the Vercel dashboard, not a code fix).

**HTTPS enforcement:** HTTP→HTTPS redirect confirmed working (`http://dmfootballservices.it/` → 308 → `https://dmfootballservices.it/`, single hop). No mixed content detected — all asset references in source are root-relative and served over HTTPS by Vercel.

---

## 4. URL Structure — WARN (70/100)

- Single canonical URL with in-page anchors (`#clubis`, `#dmscout`, `#prezzi`, `#contatti`) — clean, hyphen-free, appropriate for a single-page site.
- Redirect chains: apex HTTP→HTTPS is 1 hop (pass). `www` → apex is also architecturally 1 hop (307) but **cannot complete for browsers/bots enforcing TLS validation**, per the certificate issue above — counted against this category since it's effectively a broken URL variant today.
- No query-parameter or trailing-slash inconsistencies observed.
- Trailing slash on canonical (`https://dmfootballservices.it/`) is consistent throughout meta tags, sitemap, and JSON-LD `@id`s.

---

## 5. Mobile Optimization — PASS, largely unverified live (78/100)

- Viewport meta present and correct: `<meta name="viewport" content="width=device-width, initial-scale=1.0" />` — no `maximum-scale` or `user-scalable=no` restricting pinch-zoom (good, avoids an accessibility/mobile-UX penalty pattern).
- Tailwind CSS (`tailwind.config.ts` present) confirms a utility-first responsive framework is in use — strong prior that breakpoints/responsive layout exist, but touch-target sizing (48×48px min) and actual mobile layout could not be verified from static source alone since content is JS-rendered; recommend a live Lighthouse/PSI mobile run once deployed.
- PWA framing in copy ("Web, iOS, Android (PWA)" in JSON-LD) — no manifest.json or service worker found in `public/`; if PWA installability is a real claim being made in schema/marketing copy, verify a web app manifest exists, otherwise this is a schema accuracy issue (Low priority, cross-reference with `seo-schema` skill).

---

## 6. Core Web Vitals — WARN (60/100), source-inspection only, no live PSI/CrUX data pulled

No Google API credentials were used to pull real PSI/CrUX field data in this run — findings below are lab/source-based risk flags only; recommend running `pagespeed_check.py` against the live URL when credentials are available.

**LCP risk — High:**
- Pure CSR (see Section 8): nothing is visible in the initial HTML response; the browser must download, parse, and execute the JS bundle before any LCP candidate (hero heading/video) paints. This is a structural LCP risk independent of asset size.
- `public/videos/` contains 13 MP4 files totaling ~85MB (e.g., `segretario.mp4` 16.9MB, `presidente.mp4` 13.4MB), used as a hero `<video>` and per-role `SmartVideo` components plus a `ScrollVideo` for the pricing section. Good mitigation already in place: `preload="metadata"` (not `auto`) on the video component avoids full-file download on load. Still worth confirming the hero video isn't the LCP element itself without a poster image — an autoplaying video with no `poster` attribute can delay LCP paint vs. a static poster frame.

**CLS risk — Medium:**
- Video elements use `className="w-full h-auto"` with no explicit `width`/`height` or `aspect-ratio` reservation visible in the component (`SmartVideo`, `ScrollVideo`). Until video metadata loads, browsers may not reserve space, risking layout shift as videos pop in. Recommend explicit `aspect-ratio` CSS or fixed container height to reserve space pre-load.
- One `<img>` uses `loading="lazy"` (line ~781 of `src/pages/Index.tsx`) — good practice — but logo images (`logoClubis`, `logoDmscout`) have inline `height` styles which helps prevent shift; no `width` attribute paired with them, minor.

**INP:** cannot be assessed from static source; no long-task-prone patterns (e.g., synchronous large loops) identified in the reviewed portion of `Index.tsx`, but the file is large and uses IntersectionObserver-driven video playback triggers across 11+ video components — worth a real-device INP test given how many observers/refs are active on one page.

---

## 7. Structured Data — PASS (95/100)

Excellent JSON-LD `@graph` in raw HTML `<head>` (present regardless of JS execution — correctly placed per Dec-2025 Google JS-SEO guidance to serve structured data in initial HTML, not inject via JS):
- `Organization` (with contactPoint, sameAs to clubis.it/dmscout.it)
- `WebSite`
- `WebPage`
- `SoftwareApplication` × 2 (ClubIS, DM Scout) — with full `featureList` and `offers` (priced, `priceValidUntil`, `availability`)
- `FAQPage` — 12 Q&A pairs, direct-answer format
- `HowTo` — 3-step onboarding guide
- `BreadcrumbList` — 4 items
- `ItemList` — product list
- `SpeakableSpecification`

This remains one of the site's strongest technical assets and materially mitigates the CSR/no-JS-content gap for AI answer engines and Google's structured-data-aware features. No validation errors observed in a manual read-through (correct `@type`, `@id` cross-referencing, valid schema.org properties). Minor note: `PWA` claim in `SoftwareApplication.operatingSystem` ("Web, iOS, Android (PWA)") should be verified against an actual manifest (see Mobile section) to avoid a structured-data accuracy mismatch.

---

## 8. JavaScript Rendering — FAIL (50/100)

**Re-verified from the 2026-05-15 GEO audit — status: unchanged, no regression, no improvement.**

- Confirmed pure CSR: `<body>` is `<div id="root"></div>` + `<script type="module" src="/src/main.tsx">`. No SSR/SSG framework in `vite.config.ts` (plain `@vitejs/plugin-react-swc`, no `vite-ssg`, no Next.js/Astro/Remix).
- `vercel.json` performs a full SPA catch-all rewrite to `/index.html` — standard client-side routing, no edge-rendering or dynamic-rendering-by-user-agent middleware detected (the GEO audit's "Alternative — 3 hours" recommendation for a UA-based Vercel Edge Middleware rewrite to `/ai-content.html` for known AI bots does not appear to have been implemented; AI crawlers still receive the same `index.html` + noscript fallback as everyone else, not the dedicated `/ai-content.html`).
- Mitigations confirmed present and working: rich JSON-LD `@graph` (Section 7) and a comprehensive `<noscript>` fallback block covering both products, pricing, FAQ, and contact info — genuinely good compensation, but still not equivalent to the fully rendered React UI (role cards, interactive pricing toggle, video demos) that Googlebot/JS-executing crawlers see.
- `/ai-content.html` static fallback exists and is well-formed but is currently reachable only by direct URL or the `Link: rel="alternate"` HTTP header — it is not being actively served in place of the SPA to non-JS user agents, so its value depends entirely on crawlers voluntarily following the `Link` header or sitemap entry rather than an automatic UA-based swap.

**No change in priority from the prior audit:** this remains the top structural technical issue. Recommendation stands as previously documented (SSG migration or UA-based edge middleware serving `/ai-content.html`) — not repeating full implementation detail here per prior GEO-ANALYSIS.md Top-5 section; this audit's incremental contribution is confirming (a) no regression, (b) the UA-based middleware "quick win" from the prior audit was not implemented, and (c) the soft-404 issue in Section 2 compounds this same CSR architecture.

---

## 9. IndexNow Protocol — FAIL (20/100)

- No IndexNow key file found at root (`/indexnow-key.txt` → 404 live).
- No evidence in repo or deployment config of IndexNow API pings on content update (checked `indexing_notify.py` usage — that script targets Google's Indexing API, not IndexNow, and is officially restricted to JobPosting/BroadcastEvent content types anyway, not applicable here).
- **Recommendation (Low-Medium priority, cheap to implement):** Generate an IndexNow key, host it at `/<key>.txt`, and add a simple POST to `https://api.indexnow.org/indexnow` on deploy (e.g., a Vercel post-deploy hook or GitHub Action) whenever the homepage or llms files change. Given this is a single-page site with infrequent updates, impact is modest but the implementation cost is near-zero and it improves Bing/Yandex freshness — useful since Bing Copilot was flagged in the prior GEO audit as the weakest AI-platform score (52/100).

---

## Critical Issues (fix immediately)
- None classified as outage-level critical. The two most severe items (soft-404/SPA rewrite, www SSL cert) are rated High below because they don't currently block core functionality but represent real crawl-signal and security-perception risk.

## High Priority (fix within 1 week)
1. **SPA catch-all returns HTTP 200 for any nonexistent path** (verified: identical 35,790-byte response, homepage canonical, for a random invalid URL) — implement real 404 status or `X-Robots-Tag: noindex` for unmatched routes. See Section 2.
2. **www.dmfootballservices.it has no valid TLS certificate** (SAN mismatch, confirmed via `curl -v`) — add `www` as a domain alias in Vercel project settings so a cert is auto-provisioned; currently any client validating TLS cannot complete the www→apex redirect. See Section 3.
3. **CSR/no-JS content gap unchanged since 2026-05-15 audit** — no regression, but the previously recommended "quick win" (UA-based edge middleware to serve `/ai-content.html` to AI bots) was not implemented; full JS-rendered content remains invisible to GPTBot/ClaudeBot/PerplexityBot. See Section 8.

## Medium Priority (fix within 1 month)
- Add `Content-Security-Policy` and `Referrer-Policy` headers (currently absent) in `vercel.json`.
- Add explicit `aspect-ratio`/fixed dimensions to hero and per-role `<video>` elements to reduce CLS risk from the 13-file, ~85MB video library.
- Confirm/add a poster image on the hero `<video>` if it is the LCP element, to avoid delayed LCP paint.
- Verify PWA manifest exists if `SoftwareApplication.operatingSystem` schema claims "PWA" — align structured data with reality.
- Run a live PSI/CrUX check (`pagespeed_check.py`) once credentials are available; this audit's CWV findings are source-inspection only.

## Low Priority (backlog)
- Update sitemap `lastmod` values (currently stale at 2026-05-15 vs. actual 2026-07-14 content change) — ideally automate via build step.
- Implement IndexNow (key file + ping on deploy) for faster Bing/Yandex/Naver indexing.
- Reconsider the single self-referencing `hreflang="it"` tag — not harmful, but adds no value for a single-locale site; optionally add `x-default`.
- Add `includeSubDomains` and `preload` to the HSTS header once the www cert issue is resolved.
- Once local repositioning changes (ClubIS-primary title/meta/JSON-LD, updated `llms.txt`/`llms-full.txt`/`sitemap.xml`) are deployed, re-run canonical/title/JSON-LD consistency checks — currently local and live diverge (deploy-pending, not a defect).

---

## Files Reviewed
- `/Users/giuseppedimuro/Downloads/campo-vision-main 2/index.html`
- `/Users/giuseppedimuro/Downloads/campo-vision-main 2/vercel.json`
- `/Users/giuseppedimuro/Downloads/campo-vision-main 2/vite.config.ts`
- `/Users/giuseppedimuro/Downloads/campo-vision-main 2/src/App.tsx`
- `/Users/giuseppedimuro/Downloads/campo-vision-main 2/src/pages/NotFound.tsx`
- `/Users/giuseppedimuro/Downloads/campo-vision-main 2/src/pages/Index.tsx`
- `/Users/giuseppedimuro/Downloads/campo-vision-main 2/public/robots.txt`, `public/sitemap.xml`, `public/ai-content.html`, `public/llms.txt`
- `/Users/giuseppedimuro/Downloads/campo-vision-main 2/GEO-ANALYSIS.md` (prior audit, 2026-05-15)
- Live endpoints: `https://dmfootballservices.it/`, `/robots.txt`, `/sitemap.xml`, `/ai-content.html`, `/llms.txt`, `http://dmfootballservices.it/`, `https://www.dmfootballservices.it/`, and a nonexistent test path.
