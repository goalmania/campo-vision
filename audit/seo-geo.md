# GEO Audit Update — dmfootballservices.it

**Date:** 2026-07-15
**Analyst:** Claude Sonnet 5 (via Claude Code)
**Scope:** Re-audit of Generative Engine Optimization posture, verifying implementation status of the 2026-05-15 baseline (`GEO-ANALYSIS.md`, 63/100) and scoring the ClubIS-first repositioning made locally today.
**Method:** Live fetch of `https://dmfootballservices.it/`, `/robots.txt`, `/llms.txt`, `/llms-full.txt`, `/ai-content.html`, `/sitemap.xml` via curl with `GPTBot` user-agent (no JS execution, matching how real AI crawlers see the site); `git diff`/`git log` review of local repo at `/Users/giuseppedimuro/Downloads/campo-vision-main 2`; word-count analysis of new/changed passages; external entity spot-checks (Wikipedia, LinkedIn).

---

## CRITICAL FINDING: Today's repositioning is NOT deployed

`git status` shows `index.html`, `public/llms.txt`, `public/llms-full.txt`, `public/ai-content.html`, `public/sitemap.xml`, and `src/pages/Index.tsx` as **modified but uncommitted**. Live curl fetches confirm the production site still serves the pre-repositioning content:

- Live `<title>`: `"DM Football Services — Software Gestionale Calcio | ClubIS & DM Scout"` (old, dual-product framing)
- Live JSON-LD `dateModified` / llms.txt "Ultimo aggiornamento": `2026-05-15` (unchanged since baseline audit)
- Live llms.txt / llms-full.txt / ai-content.html / index.html: zero occurrences of "società di calcio strutturate" or any ClubIS-first framing
- Live homepage hero, meta tags, OG/Twitter tags, noscript block: all unchanged, still "Due prodotti. Un ecosistema."

**All scores below are split into "Current Live (deployed today)" and "Projected (once today's local changes ship)."** Do not report the projected number as current status to stakeholders until deploy is confirmed.

---

## GEO Readiness Score

| State | Score | Delta vs 63 baseline |
|-------|-------|----------------------|
| **Baseline (2026-05-15 audit)** | 63/100 | — |
| **Current Live (2026-07-15, deployed)** | **64/100** | +1 |
| **Projected (after today's ClubIS-first changes deploy)** | **66/100** | +3 |

### Dimension Breakdown

| Dimension | Weight | Baseline | Current Live | Projected | Notes |
|-----------|--------|----------|---------------|-----------|-------|
| Citability | 25% | 62/100 (15.5) | 62/100 (15.5) | 67/100 (16.75) | No live content change yet; projected gain from single-entity "X is Y" definitional consistency + recurring topic phrase |
| Structural Readability | 20% | 65/100 (13.0) | 65/100 (13.0) | 70/100 (14.0) | Projected gain from more descriptive, query-matching H1 replacing vague slogan |
| Multi-Modal Content | 15% | 40/100 (6.0) | 46/100 (6.9) | 46/100 (6.9) | Self-hosted role-dashboard videos shipped July 13 (commit `91076ab`) — real improvement for human users/Google, but **invisible to non-JS AI crawlers** (no `<video>` tag or VideoObject schema in raw HTML) and not YouTube-hosted, so it doesn't move the external brand-signal needle |
| Authority & Brand Signals | 20% | 22/100 (4.4) | 22/100 (4.4) | 24/100 (4.8) | YouTube/LinkedIn/Reddit/Wikipedia still 100% absent (re-confirmed below); today's changes only sharpen the *recommended citation string*, a marginal E-E-A-T framing gain, not real external validation |
| Technical Accessibility | 20% | 100/100 (24.0) | 100/100 (24.0) | 100/100 (24.0) | Unchanged — robots.txt, llms.txt presence, sitemap all structurally identical; CSR/SSR architecture untouched |

*(Weighting method matches the original audit's convention where Technical Accessibility contributes a flat 24.0 weighted points given full crawler allowlist + llms.txt/llms-full.txt/ai-content.html presence.)*

---

## Does the ClubIS-first repositioning help or hurt citability/entity-clarity?

**Net: helps, moderately.** The prior "two co-equal products under one company" framing is a known AI-extraction failure mode — when a model is asked "what is DM Football Services / what does it make," ambiguity between two co-equal offerings dilutes the single canonical answer a model can quote. Today's uncommitted changes establish a clean hierarchy:

- **ClubIS** = primary product, entity of record (title tag, OG, Twitter, `<h1>`, `ai-content.html` H1, WebPage `about` now points to `#clubis` instead of `#organization`)
- **DM Scout** = explicitly "complementary"/"secondary," consistently described as integrable with ClubIS rather than a parallel flagship
- **DM Football Services** = retained as parent company/publisher in Organization schema and `sameAs`

This mirrors the "Product, by Company" pattern (e.g., "Instagram, by Meta") that AI models handle well for disambiguation. It should specifically improve answers to "cos'è ClubIS," "software gestionale per club di calcio strutturati," and similar product-level queries. The trade-off is a slightly weaker standalone brand recall for company-level queries ("chi è DM Football Services"), but the Organization schema still carries that identity, so the risk is low.

**"Società di calcio strutturate" as a recurring entity/topic signal:** confirmed strong repetition — **25 occurrences** across the six changed files (index.html: 9, ai-content.html: 6, llms-full.txt: 5, llms.txt: 3, Index.tsx: 2). This is a legitimate differentiation angle (distinguishing from purely informal/amateur clubs) and functions as a consistent anchor phrase AI models can learn to associate with ClubIS. **Gap:** the phrase does **not** yet appear in the FAQPage JSON-LD Q&A block or BreadcrumbList item names (`index.html` lines ~188–330, untouched by today's diff) — an easy, high-leverage follow-up to make the signal fully consistent site-wide.

---

## Passage-Length Quality of New/Updated Blocks (target: 134–167 words)

| Block | Before | After (local, pending) | Status |
|-------|--------|------------------------|--------|
| `llms.txt` opening company/product paragraph | 76 words | 107 words | Improved, still below optimal |
| `llms.txt` "ClubIS — Gestionale Completo" section | 87 words | 110 words | Improved, still below optimal |
| `llms-full.txt` "Cos'è ClubIS?" definition | ~60 words (est.) | 68 words | Still short, direct-answer quality is good |
| `index.html` noscript intro (para 1) | combined ~60 words | 71 words | Below optimal, split across 2 paragraphs (weakens self-containment) |
| `index.html` noscript para 2 (DM Scout/company) | — | 34 words | Too short to be independently citable |

**Assessment:** Directionally correct (all blocks got longer and more self-contained with clearer "X is Y" openers), but none of the newly rewritten blocks actually lands inside the 134–167 word optimal range — they're improved from "too short" to "still too short." This is a real, fixable gap: each block needs another ~40–60 words of specific, quotable detail (a stat, a named FIGC process, a concrete outcome) to reach the citation sweet spot.

---

## AI Crawler Access Status (live, re-verified — unchanged from baseline)

| Crawler | Status |
|---------|--------|
| GPTBot | ALLOWED |
| OAI-SearchBot | ALLOWED |
| ClaudeBot | ALLOWED |
| anthropic-ai | ALLOWED |
| PerplexityBot | ALLOWED |
| Google-Extended | ALLOWED |
| cohere-ai | ALLOWED |
| Meta-ExternalAgent | ALLOWED |
| Bingbot / Googlebot / Twitterbot / facebookexternalhit | ALLOWED |
| Wildcard `User-agent: *` | `Allow: /` |

No regressions. robots.txt is untouched by today's repositioning work and remains fully permissive for AI search visibility.

---

## llms.txt / llms-full.txt Status

- **Present (live):** YES, both files, well-structured, CC BY 4.0 licensed, citation guidance present — unchanged from baseline.
- **Live content:** still reflects old "DM Football Services, due prodotti" framing (2026-05-15 dated).
- **Local (pending) content:** rewritten opening + closing citation now lead with ClubIS; citation string changed to `"ClubIS, di DM Football Services (dmfootballservices.it) — gestionale per società di calcio strutturate"` — sharper, more specific, more quotable than the old generic "software gestionale e scouting per il calcio italiano" line.
- **Not malformed** in either state; no RSL 1.0 markup in either version (CC BY 4.0 remains the declared license — acceptable per SKILL.md, though RSL 1.0 is the emerging AI-native standard and still absent).

---

## Brand Mention / Authority Analysis (re-confirmed, unchanged)

| Platform | Status | Correlation w/ AI citation |
|----------|--------|------------------------------|
| YouTube | **Still absent.** Product videos exist but are self-hosted MP4s under `/public/videos/`, not on YouTube — no external brand signal generated. | ~0.737 (strongest) |
| Reddit | **Still absent.** No mentions found. | High |
| Wikipedia | **Still absent — confirmed** (`it.wikipedia.org/wiki/ClubIS` returns 404). | High |
| LinkedIn | **Unverified via automated fetch** (LinkedIn returns HTTP 999 bot-block to curl/WebFetch, consistent with baseline's finding of no confirmed presence). No indication a company page was created since May. | Moderate |

**This remains the single largest gap in the GEO profile**, entirely untouched by today's repositioning. Today's changes are a copy/entity-clarity fix, not an external-authority fix — the Top-5 items from the baseline audit about YouTube, LinkedIn, and Reddit presence are **still 100% unimplemented**.

---

## Technical Accessibility (unchanged)

Architecture is still React + Vite CSR/SPA. The July 13 video-dashboard feature (commit `91076ab`) adds real product demo videos, but they render client-side only — confirmed absent from raw HTML fetched with a `GPTBot` user-agent, with no `VideoObject` JSON-LD added to compensate. This is a missed opportunity: the videos exist and could be surfacing the YouTube-equivalent multimedia signal for at least Google (which renders JS) if `VideoObject` schema were added, even without a YouTube upload.

---

## Platform-Specific Scores

| Platform | Baseline | Current Live | Projected | Rationale |
|----------|----------|---------------|-----------|-----------|
| Google AI Overviews | 55 | 57 | 60 | Videos help Google (renders JS); projected gain from clearer entity + query-matching H1 |
| ChatGPT | 70 | 70 | 74 | Unaffected by CSR-only video; projected gain from tighter single-entity citation format in llms.txt/llms-full.txt |
| Perplexity | 67 | 67 | 70 | Same reasoning as ChatGPT; Reddit/Wikipedia gap still caps upside |
| Bing Copilot | 52 | 53 | 55 | Marginal; SPA rendering and no BingSiteAuth still unresolved |
| Claude (Anthropic) | 82 | 82 | 85 | Already near-ceiling on crawler access + llms files; sharper citation string is a small precision gain |

Note: these are directional estimates based on static analysis, not live query testing. No DataForSEO MCP tools (`ai_optimization_chat_gpt_scraper`, `ai_opt_llm_ment_search`) were available in this session — recommend running those once the repositioning deploys to validate the projected deltas empirically.

---

## Top 5 Highest-Impact Changes (updated)

### 1 — Deploy the ClubIS-first repositioning (currently uncommitted)
**Impact:** Unlocks the entire +3 projected score gain above; costs nothing further.
**Effort:** Minutes (commit + deploy).
**Why:** All of today's entity-clarity work is sitting in the working tree, invisible to every AI crawler and every human visitor until shipped. This is the single highest-ROI action available right now.

### 2 — Push new passage blocks into the 134–167 word optimal range
**Impact:** Medium-High.
**Effort:** 2–3 hours.
**Why:** Every rewritten block today (llms.txt intro, ClubIS section, llms-full.txt definition, noscript paragraphs) moved in the right direction but still lands 30–100 words short of optimal. Add one concrete stat or named FIGC process per block (e.g., "riduzione dell'80% del tempo dedicato ai comunicati FIGC" — still not present anywhere on the site) to both lengthen and strengthen these passages. Also merge the two noscript paragraphs (71 + 34 words) into a single ~150-word self-contained block.

### 3 — Add "società di calcio strutturate" to the FAQPage JSON-LD and BreadcrumbList
**Impact:** Medium.
**Effort:** 1 hour.
**Why:** The phrase is repeated 25 times in the newly repositioned marketing copy but is absent from the structured-data FAQ answers and breadcrumb item names — the exact place AI Overviews and ChatGPT prefer to extract from. Closing this inconsistency completes the entity/topic signal.

### 4 — Build external entity presence: YouTube upload + VideoObject schema + LinkedIn company page
**Impact:** Critical (highest-correlation signal, ~0.737 for YouTube; still 100% unimplemented).
**Effort:** 3–5 days.
**Why:** The 7 role-dashboard MP4s already exist (shot, edited, deployed) — re-uploading them to YouTube and adding `VideoObject` schema referencing the YouTube URLs is nearly free incremental work on top of an asset that's already been produced, and directly targets the strongest brand-mention correlation identified in the baseline audit. Pair with a LinkedIn company page (content already drafted in llms.txt).

### 5 — Named authorship + customer case studies (still 0% done)
**Impact:** Medium.
**Effort:** 1–2 days.
**Why:** Carried over unchanged from the baseline audit — no founder Person schema, no named club testimonials, no quantified outcomes anywhere on the site. This remains an open gap the ClubIS-first repositioning did not address.

---

## Summary

Today's ClubIS-first repositioning is well-executed content strategy — one clear primary entity, a secondary product framed as complementary, and a strong recurring topical anchor ("società di calcio strutturate") — but it is **not yet live**. The production site is byte-for-byte identical to the 2026-05-15 baseline in every AI-crawler-visible respect. Current live score is 64/100 (+1 vs baseline, driven only by a July 13 video feature that's actually invisible to non-JS AI crawlers). Once today's local changes deploy, projected score rises to 66/100 (+3). The larger, previously-identified gaps — CSR/SSR architecture, zero YouTube/LinkedIn/Reddit/Wikipedia presence, no named authorship — remain completely unaddressed and represent far greater upside (baseline's own projection of 78–82/100) than the repositioning alone can deliver.
