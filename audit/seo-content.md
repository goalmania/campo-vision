# Content Quality / E-E-A-T Audit — dmfootballservices.it

**Date:** 2026-07-15
**Scope:** Live single-page site (CSR React SPA). Sources analyzed: rendered `<noscript>` fallback in `index.html`, `/ai-content.html` (static HTML mirror for non-JS/AI crawlers), `/llms-full.txt` (full AI documentation), cross-checked against source (`src/pages/Index.tsx`) for signals not present in the text mirrors (images, videos, footer links).
**Context acknowledged:** Site was repositioned today (2026-07-15) to lead with ClubIS (club management, primary) and DM Scout (scouting AI, secondary). The dual-product structure itself is NOT flagged as a problem — this audit evaluates execution quality only.

---

## Content Quality Score: 61/100

Solid topical depth and unusually strong AI-crawler infrastructure (noscript mirror, static HTML twin, llms.txt/llms-full.txt, dense JSON-LD) dragged down by a near-total absence of trust/authorship signals and three broken legal-policy links that actively undermine the GDPR/data-security claims made in the copy itself.

---

## E-E-A-T Breakdown

| Factor | Score | Key Signals |
|--------|------:|-------------|
| Experience | 11/20 | **Positive:** 11 real per-role product demo videos (`presidente.mp4`, `segretario.mp4`, etc.) + dozens of actual product screenshots (`clubis-*.webp`, `dmscout-*.webp`) — genuine first-hand product evidence, not stock imagery. Specific, verifiable operational claims ("30 min → 60 sec", "4-6 ore/settimana risparmiate"). **Negative:** Zero named customer clubs, zero case studies, zero quotes/testimonials, zero before/after data tied to a real user. All experience signals are about the *product*, none about *people who used it*. |
| Expertise | 12/25 | **Positive:** Deep, accurate domain-specific terminology (C.U. FIGC/LND, distinte gara, tesseramenti, SEPA XML, quote Under) — reads like it was written by people who understand Italian amateur football administration, not generic AI filler. **Negative:** No author byline anywhere (all three sources credit only the generic org, `meta name="author" = "DM Football Services"`), no founder/team bio, no credentials, no "chi siamo" page. Per Sept 2025 QRG and the Dec 2025 core update, anonymous corporate authorship is now penalized even for non-YMYL content — and this site touches YMYL-adjacent territory (player medical certificates, minors' data in the youth-sector/famiglia dashboards, financial/SEPA payment data). |
| Authoritativeness | 9/25 | No external citations, press mentions, awards, FIGC/LND partnership validation, or third-party recognition found anywhere in the three sources or the footer. `sameAs` in Organization schema only points to the company's own two other domains (clubis.it, dmscout.it) — self-referential, not external validation. No backlink/citation signals assessed (out of scope for this content pass) but on-page authority markers are effectively absent. |
| Trustworthiness | 10/30 | **Positive:** HTTPS + HSTS, working email/phone contact (visible on all three sources and on-page), GDPR compliance claim, security claim (EU hosting, encryption at rest/in transit). **Critical negative:** Privacy Policy, Termini di Servizio, and Cookie Policy footer links all point to `href="#"` (dead placeholders, confirmed in `src/pages/Index.tsx:566-568`) — no actual policy pages exist. No physical address, no P.IVA/VAT number, no legal entity name anywhere in code or content. No customer testimonials/reviews. This is the weakest pillar and pulls the overall score down significantly, especially given the org handles payment (Stripe/PayPal) and medical data. |

**Overall E-E-A-T: 42/100** (Weak — per the framework's 30-49 band: "minimal signals, significant gaps"). Weighted (20/25/25/30): Experience 11×0.20≈2.2/4 pro-rated... using raw sums above (11+12+9+10=42/100) is the reportable figure.

---

## AI Citation Readiness Score: 74/100

**Strengths:**
- Full-content noscript block in `index.html` + dedicated `/ai-content.html` static twin + `/llms.txt` + `/llms-full.txt` — a notably above-average GEO setup for a small SaaS site.
- robots.txt explicitly allows GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, anthropic-ai, Google-Extended, cohere-ai, Meta-ExternalAgent.
- Dense, well-formed JSON-LD (`@graph`) with Organization, WebSite, WebPage, 2× SoftwareApplication (with `offers`/pricing), FAQPage (11 Q&As), HowTo, BreadcrumbList, ItemList, and even a `SpeakableSpecification` block.
- Explicit citation guidance for AI systems in `llms-full.txt` ("Come citare DM Football Services" with short/long attribution formats) — an unusually mature GEO practice.
- Comparison tables (vs. software generico / Excel-WhatsApp) give AI systems clean, quotable differentiators.
- Quantified, quotable facts throughout ("60 secondi invece di 30 minuti", "4-6 ore/settimana", "100+ campi statistici", "60+ ruoli tattici") — exactly the kind of extractable statistic GEO rewards.

**Gaps:**
- **Zero paragraphs fall in the 134-167 word optimal GEO passage-length band.** Measured across all 45 `<p>` blocks in `ai-content.html`: lengths range 5–102 words, average 36 words. Content is written as short, punchy feature-list paragraphs (good for skimming, weaker for the "self-contained, quotable passage" GEO wants an LLM to lift wholesale). The FAQ answers are the closest candidates (43-65 words) but still well under the target band — consider merging/expanding 2-3 of the highest-value FAQ answers (e.g., "differenza tra ClubIS e software generico", "quanto tempo si risparmia") to hit 134-167 words for maximum extractability.
- No visible `dateModified`/"last updated" badge on the human-facing page itself (only present as text inside `ai-content.html`/`llms-full.txt`), and even that stamp is stale (see Freshness section below) — undermines the freshness signal GEO explicitly rewards.
- No `Person`/author entity anywhere in schema — AI systems citing this content have no expert or founder entity to attribute expertise to, only the generic Organization node.

---

## Thin Content / Word Count Assessment

| Source | Word count | Gate (Homepage: 500 min) |
|--------|-----------:|---------------------------|
| `index.html` `<noscript>` fallback | ~1,489 | ✅ 3x minimum |
| `/ai-content.html` | ~2,232 | ✅ 4.5x minimum |
| `/llms-full.txt` | ~2,530 | ✅ 5x minimum |
| `/llms.txt` | ~1,125 | ✅ (summary tier, no minimum applies) |

**No thin-content risk at the aggregate level.** All three sources clear the homepage floor by a wide margin, and each of the two products gets what is effectively "service-page" depth (800-word gate) within its section — ClubIS section alone runs ~900-1,100 words across the 11 dashboards, DM Scout section ~500-650 words. This is comprehensive topical coverage, not word-count padding: content is concrete (specific numbers, specific FIGC processes) rather than generic filler.

**Minor structural note (not a defect):** Because ClubIS and DM Scout share one URL (`/` with `#clubis`/`#dmscout` anchors) rather than each having its own indexable page/meta/title, the homepage is simultaneously trying to rank for two fairly distinct query clusters ("software gestionale calcio" vs. "scouting calcio AI con intelligenza artificiale"). Given clubis.it and dmscout.it exist as separate product domains (per `sameAs`), this is likely an intentional hub/spoke architecture rather than an oversight — flagged as **informational only**, not a content-quality defect.

---

## Readability

- Average sentence length (ai-content.html): **13.3 words** — within/below the 15-20 word target, generally good accessibility.
- One outlier sentence ran to 141 words (likely a run-on in a dense feature list) — worth a manual copy pass to break up.
- Approximate Gulpease Index (Italian readability analogue to Flesch, since Flesch itself is not calibrated for Italian): **~59**, just under the 60-80 "comfortable for general adult readers" band — expected and acceptable given the FIGC/LND technical vocabulary and B2B professional audience (club secretaries, DS, scouts), not a general consumer audience. Per the skill guidance, this is a content-quality indicator, not a ranking factor — no action required beyond the run-on-sentence cleanup above.
- Structure is strongly scannable: consistent H2→H3→H4 hierarchy, bulleted feature lists, comparison tables. No heading-hierarchy violations found.

## Keyword Optimization

Density is natural, no stuffing detected: "ClubIS" 1.28%, "DM Scout" 1.07%, "FIGC" 1.02%, "AI" 1.28%, "gestionale" 0.30%, "calcio" 0.38%. All well within the 1-3% natural range.

---

## Duplicate / Near-Duplicate Content & Freshness Consistency (Priority: HIGH)

Intentional overlap between `index.html` noscript, `ai-content.html`, and `llms-full.txt` is expected and fine (each targets a different consumer: no-JS users, AI crawlers wanting clean HTML, AI crawlers wanting exhaustive text) — the three are not competing for the same organic ranking and this is standard GEO practice, not a duplicate-content penalty risk.

However, a genuine **freshness/consistency defect** was found:

- Server `Last-Modified` headers show `ai-content.html` and `llms-full.txt` were physically edited **today, 2026-07-15 09:50 UTC** (matching the repositioning), and `index.html` was edited **2026-07-14 22:00 UTC**.
- Yet the **visible "last updated" date stamps inside the content itself still read `2026-05-15`** in three separate places: the `<em>` byline at the top of `ai-content.html` ("Ultimo aggiornamento: 2026-05-15"), the header block of `llms-full.txt` ("Ultimo aggiornamento: 2026-05-15"), and the JSON-LD `WebPage.dateModified` field in `index.html` ("2026-05-15").
- `sitemap.xml` also lists `<lastmod>2026-05-15</lastmod>` for all four URLs.
- **Net effect:** every machine-readable and human-readable freshness signal on the site claims the content is ~2 months old at the exact moment it was substantively rewritten for the repositioning. AI crawlers and search engines reading these dates will under-value the freshness of today's changes, and any AI system quoting the "Ultimo aggiornamento" line will misreport the content's actual currency. This is a straightforward fix (update the three date strings + sitemap lastmod to 2026-07-15) but was clearly missed in the repositioning workflow.
- No factual/positioning inconsistency was found between the three sources — all three correctly lead with ClubIS, list DM Scout second, and agree on pricing (€59/€99/€179 for ClubIS Starter/Pro/Elite, €49 for DM Scout), feature lists, and FAQ content. The repositioning itself was executed consistently across sources; only the date metadata was left stale.

---

## AI-Generated Content Quality Markers (Sept 2025 QRG)

| Marker | Assessment |
|--------|------------|
| Generic phrasing / lack of specificity | **Not present.** Content is highly specific (exact FIGC processes, exact time savings, exact pricing) — reads as domain-expert-written or heavily fact-checked, not generic AI filler. |
| No original insight | **Partially present.** The comparison tables and "why choose us" framing are original to this product, but nothing rises to "unique research/data" (e.g., no proprietary survey of Italian clubs, no aggregate usage stats from real customers). |
| No first-hand experience signals | **Present as a gap.** See Experience score above — product screens/videos exist, but no human "we built this because..." founder narrative or customer voice. |
| Factual inaccuracies | **None found** in this pass; figures are internally consistent across all three sources. |
| Repetitive structure across pages | **N/A** — single page; internal repetition across the three AI-facing mirrors is intentional and acceptable per GEO practice (see above). |
| No author attribution | **Present as a gap** — flagged under Expertise/Trustworthiness above. |

---

## Issues Found (Priority-Labeled)

**CRITICAL**
1. Footer "Privacy Policy," "Termini di Servizio," and "Cookie Policy" links are dead placeholders (`href="#"`, `src/pages/Index.tsx:566-568`) — no actual policy pages exist anywhere on the site. This directly contradicts the on-page GDPR-compliance claim ("Conformità GDPR completa") in the FAQ and is a hard trust failure for a SaaS processing payment data and player medical certificates.

**HIGH**
2. Zero named authorship anywhere (no founder/team bio, no `Person` schema, only generic `meta name="author"="DM Football Services"`) — per the Sept 2025 QRG and Dec 2025 core update, anonymous corporate authorship is now penalized even outside YMYL, and this site's data (medical certs, minors' data, payments) sits close to YMYL territory.
3. No customer testimonials, named-club case studies, or third-party validation anywhere across all three content sources — Authoritativeness and Experience (the "people used this and it worked" dimension) are essentially at zero.
4. Freshness metadata inconsistency: `ai-content.html`, `llms-full.txt` "Ultimo aggiornamento," JSON-LD `dateModified`, and `sitemap.xml` `lastmod` all still read `2026-05-15` despite the files being physically edited today (2026-07-15) for the repositioning — every freshness signal on the site is stale by construction.
5. No physical address or P.IVA/VAT/legal entity identifier found anywhere in code or content — a basic Trustworthiness gate per the E-E-A-T framework.

**MEDIUM**
6. No paragraph across the `ai-content.html` mirror falls in the 134-167 word GEO-optimal passage length (measured range 5-102 words, avg 36). The best FAQ answers (43-65 words) are the closest candidates for expansion to hit the target band and maximize verbatim-quotability by AI answer engines.
7. Generic image `alt` text on logos/screenshots (e.g., `alt="ClubIS"`, `alt={cur.label}`) — acceptable for logos, but dashboard screenshots would benefit from descriptive alt text (e.g., "Dashboard Segretario ClubIS: certificati medici con semaforo verde/giallo/rosso") for accessibility and image-search/AI-vision citation value.

**LOW**
8. One 141-word run-on sentence found in `ai-content.html` — worth a manual copy pass to break into 2-3 shorter sentences.
9. Gulpease readability index (~59) sits just under the "comfortable general adult" band (60-80) — acceptable given the professional/technical B2B audience, but a candidate for simplification if the target audience is later broadened beyond club administrators.
10. ClubIS and DM Scout share a single homepage URL/meta rather than each having a dedicated indexable page — likely intentional given clubis.it/dmscout.it exist as separate product domains; flagged as informational only.

---

## Recommendations (in priority order)

1. **Build real Privacy Policy, Terms of Service, and Cookie Policy pages** and wire the existing footer links to them immediately — this is the single highest-leverage fix given the GDPR/payment-data claims already made in the copy.
2. **Add a founder/team bio section** (even a simple "Chi siamo" block with 1-2 named people, their football/tech background, and a photo) plus a corresponding `Person` schema node linked to the `Organization` — directly addresses the Expertise/Authoritativeness gap the Dec 2025 core update specifically targets.
3. **Add 2-3 named customer case studies or testimonials** (even a beta club willing to be quoted) — this is the fastest way to move the Experience and Authoritativeness scores, and pairs naturally with the existing product-screenshot/video assets already on the page.
4. **Fix the freshness metadata**: update `ai-content.html` and `llms-full.txt` "Ultimo aggiornamento" strings, the JSON-LD `dateModified`, and `sitemap.xml` `lastmod` values to `2026-07-15` (or automate this as part of the deploy/build step so it never drifts again).
5. **Add a physical business address and P.IVA/VAT number** to the footer and Organization schema.
6. **Expand 2-3 top FAQ answers** (differenza vs. software generico; tempo risparmiato; sicurezza dati) to the 134-167 word range to improve verbatim-extractability by AI answer engines, without padding the shorter ones.
7. **Add descriptive alt text** to the product dashboard screenshots (not just role-name labels).
