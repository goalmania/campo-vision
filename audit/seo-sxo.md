# SXO Analysis: dmfootballservices.it

**SXO Gap Score: 56/100** (separate from SEO Health Score — see `seo-technical.md` / `seo-schema.md`)
Date: 2026-07-15 | Method: WebSearch SERP sampling (no DataForSEO available) + fetch_page.py / parse_html.py + source review of `src/pages/Index.tsx`

---

## 0. Site Model (what was actually verified)

- The entire site is **one URL** (`https://dmfootballservices.it/`) with anchor sections: `#home`, `#clubis`, `#dmscout`, `#prezzi`, `#contatti` (confirmed in `src/pages/Index.tsx` — `Nav.tsx` links and `<section id="...">` blocks).
- Requesting `/clubis`, `/dmscout`, `/blog`, or any other path returns **HTTP 200 with identical HTML** (same `<title>`, same `<link rel="canonical" href="https://dmfootballservices.it/">`) — confirmed via `fetch_page.py`. This is a SPA catch-all rewrite. Canonical tag prevents a duplicate-content penalty, but it also means **no distinct, crawlable, rankable URL exists** for either product or for any informational/blog content.
- `sitemap.xml` lists exactly 4 URLs: `/`, `/llms.txt`, `/llms-full.txt`, `/ai-content.html`. There is no `/clubis`, `/dmscout`, `/prezzi`, or `/blog` in the sitemap.
- **`clubis.it`** (the product's own domain, cited in `sameAs` schema) is a Next.js app that **307-redirects unauthenticated visitors straight to `/auth/login`** — confirmed via `fetch_page.py`. It has a generic title ("ClubIS — The Intelligence System"), a one-line meta description, no schema, and zero marketing content. It is the *product*, not a landing page.
- **`dmscout.it`** loads a bare React app shell (`<div id="root">`, no server-rendered content, no schema, generic meta). Also product, not marketing.
- **Conclusion**: today, splitting traffic to `clubis.it` / `dmscout.it` would not "solve" the single-page problem — those domains currently have *no* SEO value of their own. Any split strategy must build real marketing pages first (either as subdirectories of `dmfootballservices.it`, or as a marketing layer in front of the app login on `clubis.it`/`dmscout.it`).
- Strengths already in place: rich `@graph` JSON-LD (`Organization`, `WebSite`, `WebPage`, 2× `SoftwareApplication`, `FAQPage`, `HowTo`, `BreadcrumbList`, `ItemList`, `SpeakableSpecification`), an AI-crawler noscript fallback + `llms.txt` / `llms-full.txt` / `ai-content.html` (GEO layer), a built-in competitor comparison table, and genuinely deep, specific product content (FIGC/LND terminology, 11 role dashboards, exact time-savings figures).

---

## 1. SERP Landscape (5 target queries, WebSearch sampling)

| Query | Dominant result type observed | Notes |
|---|---|---|
| "software gestionale calcio Serie D" | **Single-product Landing Pages**, often on a football-specific sub-URL (weSpoort `/software-gestionale-calcio`, 360Player `/sports-software/football`, SportEasy `/it/clubs/sports/football/`) | Strong Landing Page consensus, but each has a *dedicated URL* per sport/vertical |
| "gestionale società calcio" | Landing Pages (Golee `/sport/calcio/`, SportAssist, weSpoort, Sporteams) + 1 blog listicle (Teambook) | Same pattern: dedicated vertical URL |
| "software per club di calcio strutturati" + segretario/DS | Landing Pages (SportEasy, GeSoSport, Sporteams, Golee) + 1 comparison directory (Capterra) | Mixed but Landing Page-led |
| "alternativa Excel gestione club calcio" | Landing Pages + forum threads + 1 "27 migliori app" listicle (Clupik) | Comparison/listicle content appears meaningfully here |
| "software scouting calcio AI" | **News/editorial articles** (Social Media Soccer, Money.it, Editoriale Domani, Golix) — almost no vendor product pages in the organic set | Consideration/awareness informational SERP, not commercial |

**SERP consensus**: ~60-65% dedicated single-product Landing Pages (mixed confidence — not a >60% clean majority once the AI-scouting cluster is included), ~20% comparison/listicle content, ~15-20% pure editorial/informational (specific to the DM Scout keyword cluster). No featured snippets, PAA boxes, or ads were surfaced by WebSearch for these queries — sample size and feature detection are limited without DataForSEO (see Limitations).

---

## 2. Page-Type Alignment

- **Target page type**: Hybrid dual-product hub — two stacked Landing-Page-style sections (`#clubis`, `#dmscout`) sharing one pricing block, one FAQ block, and one contact block, all under a single URL/title/meta.
- **SERP expects**: Dedicated, single-intent Landing Pages per vertical/product (competitor pattern: one URL = one product/sport), **plus** an editorial/blog layer for the AI-scouting query cluster.
- **Verdict**: **MISMATCH — HIGH** overall; **CRITICAL** specifically for the "software scouting calcio AI" query cluster, where the site has zero informational/blog content to compete against journalism-style results, and DM Scout's identity is diluted by sharing a URL, title tag, and schema graph with ClubIS.
- **Impact**: Google cannot serve a query-matched title/meta/H1 for "ClubIS" vs "DM Scout" queries (both resolve to the same `<title>`/canonical), cannot attribute `FAQPage`/`HowTo` schema to a single product context, and cannot accrue product-specific backlinks or citations — three structural handicaps competitors with dedicated URLs don't have.

---

## 3. User Stories (derived from SERP + on-page signals)

1. **As a segretario di un club di Serie D**, I want to stop losing ~30 minutes a week manually cross-checking i Comunicati Ufficiali FIGC/LND, because squalifiche sbagliate in distinta costano punti in classifica, but I'm blocked by **information depth buried in an H4 sub-section** of one long page with no dedicated, linkable/rankable URL for "gestionale segreteria calcio FIGC" and by a trial CTA that dumps me on a bare `clubis.it/auth/login` screen with no re-orientation.
   *(Source: on-page "Dashboard Segretario" content + FAQ "Quanto tempo si risparmia con ClubIS?"; SERP pattern of dedicated competitor URLs)*

2. **As a presidente che deve rendicontare il Financial Fair Play** al consiglio direttivo, I want proof this software is trustworthy enough to run club finances, because a wrong FFP number has real regulatory consequences, but I'm blocked by a **trust gap**: no client logos, no case studies from real Serie D/Eccellenza clubs, no reviews — nothing a board member can show as due-diligence evidence.
   *(Source: on-page "Dashboard Presidente" content mentioning FFP/KPI; taxonomy requirement of "at least one testimonial" for Landing Page type, absent here)*

3. **As a scout freelance o agente FIFA**, I want to digitalizzare i miei report cartacei/PDF senza dover imparare un template, because time spent re-formatting reports is time not spent scouting, but I'm blocked by **the same undifferentiated trial CTA** ("Inizia la prova gratuita di DM Scout") landing on a bare `dmscout.it` app shell with no reassurance, pricing recap, or onboarding context at the point of highest intent.
   *(Source: FAQ "DM Scout è adatto a scout freelance e agenti FIFA?"; fetch of `dmscout.it` showing generic app shell, no marketing content)*

4. **As a direttore sportivo che valuta se serve sia ClubIS che DM Scout**, I want to understand exactly what the cross-product integration (DM Scout data feeding into ClubIS "Elite" plan) does and costs, because I don't want to pay for two subscriptions if I don't need both, but I'm blocked by **fragmented information**: the DS-relevant detail is one sentence in the ClubIS section, the DM Scout detail is in a separate section, and the pricing table doesn't show a bundle comparison.
   *(Source: "Dashboard Direttore Sportivo" text: "Accesso al database scouting integrato con DM Scout (piano Elite)"; pricing table only shows 3 ClubIS tiers)*

5. **As a comparison shopper actively evaluating SportEasy / Golee / weSpoort / Excel** before deciding, I want a credible, named side-by-side comparison, because the "vs"/"alternative"/"migliori app" pattern in the SERP shows this is how the market researches, but I'm blocked by a comparison table that only names **generic categories** ("Software generico", "Fogli Excel / WhatsApp") rather than the specific competitors buyers are actually searching against.
   *(Source: on-page "Perché scegliere DM Football Services" table; SERP listicle/comparison results for "alternativa Excel" and "software per club di calcio strutturati")*

---

## 4. Gap Analysis — SXO Gap Score: 56/100

| Dimension | Score | Evidence |
|---|---|---|
| Page Type (0-15) | 6/15 | Single URL serves two distinct commercial intents + one informational intent competitors split across dedicated URLs |
| Content Depth (0-15) | 12/15 | Genuinely deep: 11 named role dashboards, FIGC/LND-specific terminology, exact metrics (30 min → 60 sec); word count ~1,500+ in the crawlable layer alone |
| UX Signals (0-15) | 6/15 | No in-page TOC/jump nav beyond top-level anchors; trial CTAs exit to bare app-login screens (`clubis.it` → 307 to `/auth/login`, `dmscout.it` → empty `#root` shell) |
| Schema Markup (0-15) | 13/15 | Best-in-class graph: Organization, WebSite, WebPage, 2× SoftwareApplication, FAQPage, HowTo, BreadcrumbList, ItemList, SpeakableSpecification |
| Media Richness (0-15) | 8/15 | Rendered React page has product screenshots (imports confirmed in source), but the crawlable/AI-facing noscript layer has **0 images** — no visual proof for image search or AI Overviews |
| Authority Signals (0-15) | 4/15 | No testimonials, no client logos, no case studies, no G2/Capterra/Trustpilot presence anywhere in source (`grep` of `Index.tsx` confirms zero matches); company founded 2024 (young, unverified track record) |
| Freshness (0-10) | 7/10 | `dateModified: 2026-05-15` present in schema (~2 months old at audit time) — acceptable but no visible on-page "last updated" or changelog |
| **Total** | **56/100** | |

---

## 5. Persona Scores

| Persona | Relevance | Clarity | Trust | Action | Total | Rating |
|---|---|---|---|---|---|---|
| Segretario Serie D (FIGC compliance) | 22/25 | 15/25 | 10/25 | 8/25 | 55/100 | Needs Work |
| Presidente (Financial Fair Play) | 20/25 | 13/25 | 8/25 | 10/25 | 51/100 | Needs Work |
| Scout freelance / agente FIFA | 23/25 | 18/25 | 13/25 | 10/25 | 64/100 | Good |
| Direttore Sportivo (cross-product ClubIS+DM Scout) | 16/25 | 10/25 | 10/25 | 7/25 | 43/100 | Needs Work (near-Critical) |
| Comparison shopper (vs SportEasy/Golee/Excel) | 20/25 | 14/25 | 10/25 | 12/25 | 56/100 | Needs Work |

### Weakest Persona: Direttore Sportivo (cross-product) — 43/100
**Top issue:** the bundling logic between ClubIS and DM Scout (the site's biggest cross-sell opportunity, since Elite-tier ClubIS clients are the ideal DM Scout buyers) is a single throwaway sentence, split across two page sections, with no dedicated bundle CTA or pricing comparison.
**Recommended fix:** add a "ClubIS + DM Scout per il Direttore Sportivo" module directly after the pricing table with a named bundle price and a single CTA ("Scopri il bundle DS" → dedicated bundle page/anchor).

### Systemic Issues (affect all personas)
- **Trust**: zero testimonials/case studies/client logos/review-platform badges anywhere in the codebase — every persona scores ≤13/25 on Trust.
- **Action**: every primary CTA ("Inizia la prova gratuita di ClubIS/DM Scout") exits to a bare, unbranded app/login shell on `clubis.it` or `dmscout.it` rather than a guided signup or a marketing-consistent landing step — every persona scores ≤12/25 on Action.

### Priority Actions
1. Fix the Direttore Sportivo cross-sell gap (weakest persona) with a named bundle module + dedicated CTA.
2. Fix the systemic Trust gap: add at least 2-3 named/anonymized case studies or club testimonials (even "Club di Serie D, Lombardia" if anonymity is required) with concrete before/after metrics.
3. Fix the systemic Action gap: build a lightweight marketing/reassurance step on `clubis.it` and `dmscout.it` before the login redirect (or change CTA destination to an in-context signup form on `dmfootballservices.it` itself).

---

## 6. Should the site split into dedicated `/clubis` and `/dmscout` pages (or subdomains)?

**Yes — this is the primary structural finding of this audit.** Recommended approach, in order of effort:

1. **Minimum viable fix (low effort, no new domains):** Convert `#clubis` and `#dmscout` anchor sections into real crawlable subpaths — `dmfootballservices.it/clubis` and `dmfootballservices.it/dmscout` — each with its own `<title>`, meta description, canonical, H1, and a scoped subset of the JSON-LD graph (product-specific `SoftwareApplication` + `FAQPage`). This requires no rewrite-rule changes beyond serving distinct pre-rendered HTML per route instead of the current catch-all (today `/clubis` returns the homepage's HTML verbatim, canonical and all). Keep `dmfootballservices.it/` as a hub/comparison page linking to both. This directly addresses the SERP consensus for single-vertical Landing Pages while preserving the domain's accumulated authority (all under one root domain).
2. **Medium effort:** Add a `/blog` or `/risorse` content layer to compete for the "software scouting calcio AI" informational cluster, which is currently dominated by journalism, not vendors — this is a content gap, not just a structural one (hand off to `/seo content`).
3. **Higher effort, only if product teams want it:** Turn `clubis.it` and `dmscout.it` into full marketing sites with their own SEO-optimized homepages *in front of* `/auth/login`, mirroring what `dmfootballservices.it` already does — today those domains have no marketing content and would need to be built from scratch, so this is **not a quick win**; option 1 achieves most of the SXO benefit faster.

Given clubis.it/dmscout.it are currently pure app shells with a login redirect, splitting to subpaths on the existing authoritative domain (option 1) is the recommended near-term move; treating the separate domains as the "split" (option 3) should wait until there's a content team resourced to build real marketing pages there.

---

## Cross-Skill Recommendations
- **E-E-A-T / Trust gap** (Authority score 4/15, Trust ≤13/25 for every persona) → recommend `/seo content` for a deep E-E-A-T audit and testimonial/case-study content plan.
- **Content depth gap for informational queries** (AI-scouting keyword cluster dominated by editorial content) → recommend `/seo content` or `/seo programmatic` for a blog/resource layer.
- **Schema scoping** (single graph shared by two products) → recommend `/seo schema` to generate per-route `SoftwareApplication`/`FAQPage` schema once `/clubis` and `/dmscout` become real subpaths.
- **Technical routing** (SPA catch-all serving identical HTML for any path) → recommend `/seo technical` to properly scope routes before adding new indexable pages.

---

## Limitations
- SERP data comes from **WebSearch sampling only** (no DataForSEO available in this session) — organic result sets, PAA questions, ads, and featured-snippet formats could not be captured with full SERP-tool precision; treat page-type consensus as directional, not exact-percentage.
- Fewer than 10 organic results per query were returned by WebSearch (typically 8-10 links); the taxonomy classification of each competitor result was done from title/snippet/URL pattern only, not a full fetch of every competitor page.
- The fully client-rendered React page (post-JS, what a real browser/Googlebot-with-JS sees) was not screenshot-tested in this session; findings on media/CTAs/schema combine the static noscript/AI-crawler HTML (verified via `fetch_page.py`/`parse_html.py`) with a source-code review of `src/pages/Index.tsx` for anything not present in the static fallback (e.g., product screenshots, exact CTA hrefs).
- `clubis.it` and `dmscout.it` were checked only for their unauthenticated root response (redirect/app-shell behavior); internal authenticated app UX was out of scope.
- No PAA questions, ads, or featured snippets could be enumerated from WebSearch's summarized output format, so User Stories in Section 3 rely more heavily on on-page signals and observed competitor URL patterns than on classic PAA/ad-copy mining.
