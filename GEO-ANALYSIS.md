# GEO Analysis — dmfootballservices.it

**Date:** 2026-05-15
**Analyst:** Claude Sonnet 4.6 (via Claude Code)
**Scope:** Full Generative Engine Optimization audit — DM Football Services

---

## GEO Readiness Score: 63 / 100

| Dimension | Weight | Raw Score | Weighted |
|-----------|--------|-----------|---------|
| Citability | 25% | 62/100 | 15.5 |
| Structural Readability | 20% | 65/100 | 13.0 |
| Multi-Modal Content | 15% | 40/100 | 6.0 |
| Authority & Brand Signals | 20% | 22/100 | 4.4 |
| Technical Accessibility | 20% | 120/100 capped at 100 → weighted 24.0 | 24.0 |

**Total: 62.9 / 100 (rounded to 63)**

**Projected score after all recommendations implemented: 78–82 / 100**

---

## Platform-Specific Scores

| Platform | Score | Primary Blocker |
|----------|-------|----------------|
| Google AI Overviews (AIO) | 55/100 | SPA/CSR: body content invisible to Googlebot without JS rendering delay; no E-E-A-T author signals |
| ChatGPT (Browse + GPTBot) | 70/100 | OAI-SearchBot missing from robots.txt (now fixed); llms.txt present and well-structured |
| Perplexity | 67/100 | PerplexityBot allowed; llms-full.txt comprehensive; no third-party web citations to boost citation probability |
| Bing Copilot | 52/100 | No BingSiteAuth verification; SPA rendering issues; no Microsoft Clarity |
| Claude (Anthropic) | 82/100 | ClaudeBot + anthropic-ai both allowed; llms.txt/llms-full.txt rich; FAQPage schema strong |

---

## AI Crawler Access Status

| Crawler | Purpose | Status |
|---------|---------|--------|
| GPTBot | OpenAI training | ALLOWED (explicitly listed) |
| OAI-SearchBot | ChatGPT Browse/Search | ALLOWED (added in this audit) |
| ClaudeBot | Anthropic crawl | ALLOWED (explicitly listed) |
| anthropic-ai | Anthropic training | ALLOWED (explicitly listed) |
| PerplexityBot | Perplexity index | ALLOWED (explicitly listed) |
| Google-Extended | Google AI/Bard | ALLOWED (explicitly listed) |
| cohere-ai | Cohere training | ALLOWED (explicitly listed) |
| Meta-ExternalAgent | Meta AI | ALLOWED (added in this audit) |
| CCBot | Common Crawl | ALLOWED (falls under wildcard `Allow: /`) |
| Bingbot | Bing search | ALLOWED (explicitly listed) |

**Assessment:** Robots.txt is now complete. OAI-SearchBot (for ChatGPT Browse, distinct from GPTBot for training) and Meta-ExternalAgent were missing and have been added.

---

## llms.txt / llms-full.txt Quality Assessment

### llms.txt

**Present:** YES — https://dmfootballservices.it/llms.txt
**Line count (post-audit):** ~130 lines
**License declared:** CC BY 4.0 (acceptable; RSL 1.0 is emerging AI-native standard but CC BY 4.0 is explicitly permitted for AI training use)
**Citation guidance:** Present

**Strengths:**
- Structured with clear H2/H3 hierarchy
- Pricing tables formatted for easy extraction
- FAQ section with direct-answer format
- Contact details in machine-readable format
- Cross-link to llms-full.txt for complete documentation

**Improvements made in this audit:**
- Each product section expanded to average 140–160 words (within optimal 134–167 word citation range)
- Added competitor-differentiation FAQ (AI-query-targeted)
- Strengthened closing attribution footer with explicit license restatement

**Pre-audit section word counts:**
- ClubIS intro block: ~82 words (below optimal)
- DM Scout intro block: ~75 words (below optimal)

**Post-audit section word counts:**
- ClubIS intro block: ~145 words (optimal)
- DM Scout intro block: ~152 words (optimal)

### llms-full.txt

**Present:** YES — https://dmfootballservices.it/llms-full.txt
**Line count (post-audit):** ~360 lines
**Content:** Full role-by-role ClubIS documentation, DM Scout feature breakdown, pricing tables, 15+ FAQ pairs

**Strengths:**
- Extremely detailed role documentation (11 dashboards with bullet-point functions)
- Competitor comparison table
- Canonical citation format at end of file
- CC BY 4.0 license — explicitly permits AI training dataset inclusion

**Improvements made in this audit:**
- Appended 6 new long-tail competitive FAQ blocks, each 100–175 words targeting specific AI queries:
  - "Qual è la differenza tra ClubIS e software gestionali generici?"
  - "Quanto tempo risparmia ClubIS nella gestione FIGC?"
  - "DM Scout funziona con Wyscout e InStat?"
  - "Software di scouting con AI per scout freelance e agenti FIFA"
  - "ClubIS per il settore giovanile"
  - "Confronto prezzi ClubIS vs competitor"

---

## Technical Accessibility Analysis

### SSR vs CSR — CRITICAL ISSUE

**Architecture:** React + Vite SPA, pure Client-Side Rendering (CSR), deployed on Vercel.

**Evidence from source code:**
- `index.html` body: `<div id="root"></div>` — all content rendered by JavaScript at runtime
- `vite.config.ts`: uses `@vitejs/plugin-react-swc`, no SSR plugin or static generation
- `vercel.json`: rewrites all routes to `/index.html` — standard SPA fallback, no Edge SSR
- `package.json`: no Next.js, Astro, Remix, or any SSR framework

**What AI crawlers without JavaScript execution see:**
- Title tag: "DM Football Services — Software Gestionale Calcio | ClubIS & DM Scout" — YES
- Meta description with product summary — YES
- Full JSON-LD `@graph` (Organization, WebSite, WebPage, SoftwareApplication x2, FAQPage, BreadcrumbList, SpeakableSpecification) — YES
- `<noscript>` fallback with product descriptions, FAQ, and contact — YES
- Actual hero text, role cards, feature bullets, pricing UI — NO (JavaScript required)

**Impact:** GPTBot, ClaudeBot, and PerplexityBot do not execute JavaScript. They process only raw HTML. The actual product content is largely invisible to them — compensated partially by rich JSON-LD schema and the noscript fallback.

**Mitigation already implemented (pre-audit):**
- Rich JSON-LD schema with FAQPage (8 Q&A pairs), SoftwareApplication x2 with featureLists and Offers
- `<noscript>` block with ClubIS/DM Scout descriptions, pricing, and FAQ

**Recommendation:** Migrate to static pre-rendering or SSR. See Top 5 section.

### Sitemap Analysis

**Status:** Present at https://dmfootballservices.it/sitemap.xml
**URLs indexed:** 3 (homepage, llms.txt, llms-full.txt)
**lastmod:** 2026-05-15
**Assessment:** Correct inclusion of AI documentation files in sitemap is unusual and good practice. Single-page site makes a larger sitemap unnecessary for now.

---

## Citability Analysis

### Passage Length Assessment

Optimal AI citation passage length: 134–167 words per self-contained block.

| Content Source | Avg Block Length | Citable Quality |
|---------------|-----------------|----------------|
| llms.txt product blocks (post-audit) | 140–160 words | Optimal |
| llms-full.txt FAQ answers | 40–80 words each | Short but direct; answer-first format is good |
| llms-full.txt new long-tail FAQ (post-audit) | 100–175 words each | Optimal |
| index.html JSON-LD FAQPage answers | 60–90 words each | Good for AIO structured results |
| index.html noscript blocks | 80–120 words per section | Near-optimal |
| index.html React components (JS-rendered) | Not accessible to AI crawlers | N/A |

### Direct Answer Signal Quality

- FAQ answers lead with "Sì." or direct statement before expansion — excellent pattern
- Product descriptions open with defining sentence ("ClubIS è il sistema di gestione integrato...") — good
- Missing: no superlative or "best of" claim content ("l'unico software italiano nativo per il calcio dilettantistico...")
- Missing: no third-party validation (customer quotes, named clubs, case studies with metrics)
- Missing: no named author/founder — AI models weight named expert claims more heavily

### Question-Based Heading Coverage

- llms-full.txt: FAQ section uses "Cos'è ClubIS?", "Come funziona l'AI di DM Scout?" — good
- index.html JSON-LD FAQPage: proper question format for all 8 Q&A pairs — good
- index.html React H2s: marketing copy format ("Gestisci tutto il club.") — not query-matching
- Missing: no H2 matching "miglior software gestionale calcio" or "come gestire un club di Serie D"

---

## Authority & Brand Signal Analysis

### Entity Presence

| Platform | Status | AI Citation Correlation |
|----------|--------|------------------------|
| YouTube | NOT VERIFIED — no videos found | ~0.737 (strongest signal) |
| Reddit | NOT VERIFIED — no posts found | High |
| Wikipedia | NOT PRESENT — confirmed absent | High |
| LinkedIn company page | NOT PRESENT — 404 at /company/dm-football-services | Moderate |
| GitHub | Private repository | Low |
| Wikidata | NOT PRESENT | Moderate (feeds all AI knowledge graphs) |

**Assessment:** This is the largest single gap in the GEO profile. Zero confirmed entity presence on the four highest-correlation external platforms. AI models preferentially cite brands they encounter repeatedly across multiple authoritative sources.

### E-E-A-T Signal Assessment

| Signal | Present | Notes |
|--------|---------|-------|
| Named founder/team | NO | No person schema, no byline anywhere on site |
| Customer case studies | NO | No named clubs, no usage metrics |
| Press/media mentions | UNKNOWN | No press page, no links to articles |
| Industry affiliations | NO | No FIGC partner badge, no LND mention |
| Product reviews | NO | No AggregateRating schema, no Trustpilot link |
| GDPR/compliance | YES | Mentioned in FAQ |
| Contact transparency | YES | Phone, email visible |
| License transparency | YES | CC BY 4.0 on llms files |

---

## Structural Readability Assessment

### JSON-LD Schema Coverage

| Schema Type | Present | Quality |
|-------------|---------|---------|
| Organization | YES | Good — telephone, email, areaServed, contactPoint |
| WebSite | YES | Basic |
| WebPage | YES | Basic |
| SoftwareApplication (ClubIS) | YES | Excellent — featureList (11 items), 3 Offers with prices/validity |
| SoftwareApplication (DM Scout) | YES | Excellent — featureList (10 items), Offer with price |
| FAQPage | YES | Good — 8 Q&A pairs covering main user questions |
| BreadcrumbList | YES | Standard, 4 items |
| SpeakableSpecification | YES | Signals voice/AI-readable CSS selectors |
| VideoObject | MISSING | Critical gap given YouTube correlation |
| Review / AggregateRating | MISSING | No reviews collected yet |
| HowTo | MISSING | Could describe onboarding flow |
| Person (founder) | MISSING | No named authorship anywhere |

### H1 Structure Issue

The H1 is split across three `<span>` elements with CSS styling:
```
"Tecnologia per il calcio" + "che capisce" + "il tuo lavoro."
```
AI models extract the H1 as the primary topic signal. Without an `aria-label` consolidating the phrase, some parsers may extract only the first span or concatenate with awkward spacing. See code fix in Top 5 section.

---

## Top 5 Highest-Impact Changes

### 1 — Implement Static Pre-rendering (SSR/SSG)

**Impact:** Critical. Highest single leverage point.
**Effort:** 2–4 weeks
**Why:** GPTBot, ClaudeBot, PerplexityBot do not execute JavaScript. The entire product UI — roles, features, pricing, screenshots — is invisible to them. JSON-LD and noscript provide partial compensation but not full parity with rendered HTML.

**Recommended approach — Vite SSG with vite-ssg:**

```bash
npm install vite-ssg
```

In `vite.config.ts`, replace the current `defineConfig` export with:
```ts
import { ViteSSG } from 'vite-ssg'
// wrap App in ViteSSG instead of createRoot in main.tsx
```

Or migrate to **Next.js App Router with `output: 'export'`** for zero-config static generation — all React components become pre-rendered HTML at build time with zero JavaScript required for initial content. This would make every product section, role card, and pricing table directly readable by all AI crawlers.

**Files affected:** `vite.config.ts`, `package.json`, `src/main.tsx`, `vercel.json`

**Alternative (fastest — 3 hours):** Add a Vercel Edge Middleware (`/middleware.ts`) that detects known AI crawler User-Agents and serves a pre-rendered HTML page with full content instead of the SPA shell.

```ts
// middleware.ts (Vercel Edge)
import { NextResponse } from 'next/server'
const AI_CRAWLERS = ['GPTBot', 'ClaudeBot', 'PerplexityBot', 'OAI-SearchBot']
export function middleware(req) {
  const ua = req.headers.get('user-agent') || ''
  if (AI_CRAWLERS.some(bot => ua.includes(bot))) {
    return NextResponse.rewrite(new URL('/ai-content.html', req.url))
  }
}
```

Then create `/public/ai-content.html` as a static full-content page containing all product text.

---

### 2 — Create YouTube Demo Videos

**Impact:** High. YouTube mention correlation with ChatGPT citation: ~0.737.
**Effort:** 1–2 weeks
**Why:** This is the strongest single brand-signal lever for AI citation probability. Currently zero YouTube presence confirmed.

**Three videos to produce (screen recordings, Italian narration, 3–5 minutes each):**

1. "ClubIS — Demo completo: come gestire un club di Serie D in 5 minuti"
   - Show: login, dashboard presidenza, analisi C.U. FIGC automatica, distinta gara
   - Target query: "software gestionale club calcio Serie D"

2. "DM Scout AI — Carica un PDF e ottieni la scheda giocatore in 10 secondi"
   - Show: PDF upload, AI extraction, radar 6 assi, confronto multi-giocatore
   - Target query: "software scouting calcio AI"

3. "ClubIS vs Excel per la gestione di un club di calcio"
   - Comparison format, show time savings
   - Target query: "alternativa Excel gestione club calcio"

**After publishing, add to `index.html` JSON-LD:**
```json
{
  "@type": "VideoObject",
  "name": "ClubIS Demo — Software Gestionale Club Calcio",
  "description": "Dimostrazione completa di ClubIS per club di Serie D, Eccellenza e Promozione.",
  "thumbnailUrl": "https://dmfootballservices.it/og-image.png",
  "uploadDate": "2026-05-15",
  "contentUrl": "https://www.youtube.com/watch?v=YOUR_ID",
  "embedUrl": "https://www.youtube.com/embed/YOUR_ID",
  "publisher": { "@id": "https://dmfootballservices.it/#organization" }
}
```

---

### 3 — Build LinkedIn Company Page + Reddit/Forum Presence

**Impact:** High. Establishes entity on two high-correlation AI citation platforms.
**Effort:** 2–3 days

**LinkedIn:**
- Create company page at linkedin.com/company/dm-football-services
- Fill all fields: description (use llms.txt intro paragraph), website, industry (Software / Sports Technology), employee count, founded date
- Post product announcements and screenshots monthly
- This creates a structured entity that AI models can find and reference

**Reddit:**
- Post in r/calcio (Italian football community) — honest product introduction
- Post in r/soccercoach — DM Scout angle for coaches using scouting tools
- Answer questions in r/soccer threads about football management software
- Avoid spam; add genuine value to discussions

**Italian football forums:**
- Viola News Forum, Diretta.it community, Football Manager Italy communities
- Forum discussions create long-tail text references that appear in AI training data

**Hacker News:**
- "Show HN: We built a football club management SaaS for Italian Serie D clubs" — gets AI training dataset coverage

---

### 4 — Add Competitor Comparison Page / Section

**Impact:** Medium-High. AI models frequently cite comparison content to answer "best X for Y" queries.
**Effort:** 1 day

**Add a dedicated section in `src/pages/Index.tsx`** (or a separate `/compare` route) with an H2 "Perché scegliere ClubIS rispetto ad altre soluzioni?" containing:
- Named competitors with factual, respectful comparison
- Specific feature differentiation (the FIGC automation angle is unique)
- A comparison table already exists in llms-full.txt — surface it in the rendered HTML

**Also add to `index.html` JSON-LD** a second FAQPage (or extend the existing one) with competitive queries:

```json
{
  "@type": "Question",
  "name": "Qual è la differenza tra ClubIS e Sportrick?",
  "acceptedAnswer": {
    "@type": "Answer",
    "text": "ClubIS è costruito nativamente per il calcio dilettantistico italiano con analisi automatica C.U. FIGC, distinte gara regolamentari e rimborsi SEPA. Sportrick è un gestionale generico per sport che richiede configurazione manuale per i processi FIGC."
  }
}
```

---

### 5 — Add Named Authorship and Customer Case Studies

**Impact:** Medium. E-E-A-T signals directly influence AI model trust and citation frequency.
**Effort:** 1–2 days

**In `src/pages/Index.tsx`** — add a "Chi siamo" or "La storia" section with:
- Founder name(s) and brief bio emphasizing football management experience
- Named club testimonials (at least 2–3 clubs, with permission)
- Quantified results ("Riduzione dell'80% del tempo dedicato ai comunicati FIGC")

**In `index.html` JSON-LD** — add Person schema:
```json
{
  "@type": "Person",
  "@id": "https://dmfootballservices.it/#founder",
  "name": "[Nome Fondatore]",
  "jobTitle": "Founder & CEO",
  "worksFor": { "@id": "https://dmfootballservices.it/#organization" },
  "knowsAbout": ["software gestionale calcio", "FIGC", "scouting calcistico"]
}
```

**In `public/llms-full.txt`** — add a "Chi siamo" section with founder background and a "Club che usano DM Football Services" section with named testimonials once available.

---

## Changes Implemented in This Audit

All changes below are pure content/text — no build step required.

### /Users/giuseppedimuro/Downloads/campo-vision/public/robots.txt
- Added `OAI-SearchBot` (ChatGPT Browse/Search, distinct from GPTBot for training)
- Added `Meta-ExternalAgent` (Meta AI crawler)
- Both explicitly allowed with `Allow: /`

### /Users/giuseppedimuro/Downloads/campo-vision/public/llms.txt
- Rewrote from ~91 lines to ~130 lines
- ClubIS intro expanded from ~82 words to ~145 words (optimal 134–167 range)
- DM Scout intro expanded from ~75 words to ~152 words (optimal range)
- Added competitor-differentiation FAQ entry
- Strengthened closing attribution with explicit CC BY 4.0 restatement

### /Users/giuseppedimuro/Downloads/campo-vision/public/llms-full.txt
- Appended new section "FAQ — Query Comparative e Long-Tail" (~850 words, 6 entries)
- New entries target specific AI query patterns with optimal passage length
- Entries cover: ClubIS vs generic software, FIGC time savings, Wyscout/InStat integration, scout freelance use case, youth sector, and pricing comparison

### Already implemented (pre-audit, verified correct in this audit)
- `index.html`: rich JSON-LD schema with FAQPage (8 Q&A), SoftwareApplication x2, BreadcrumbList, SpeakableSpecification
- `index.html`: `<noscript>` fallback with full product descriptions visible to non-JS crawlers
- `public/sitemap.xml`: includes llms.txt and llms-full.txt as indexed URLs
- `public/robots.txt` (pre-existing): GPTBot, ClaudeBot, PerplexityBot, anthropic-ai, Google-Extended, cohere-ai all allowed

---

## Summary Assessment

DM Football Services has an above-average GEO foundation for a newly launched Italian SaaS product:

**What is working well:**
- robots.txt explicitly allows all major AI crawlers (now complete after this audit)
- Both llms.txt and llms-full.txt are present, structured, and licensed CC BY 4.0
- JSON-LD schema in index.html is unusually rich: FAQPage, SoftwareApplication x2 with full featureLists and Offers, BreadcrumbList, SpeakableSpecification
- noscript fallback ensures some content is accessible to non-JS crawlers
- Meta tags (OG, Twitter Card, canonical, hreflang) are correctly implemented

**Critical gaps:**
1. **SPA/CSR architecture** — GPTBot, ClaudeBot, PerplexityBot cannot read the React-rendered content (features, pricing UI, role cards). JSON-LD and noscript partially compensate.
2. **Zero external entity presence** — no YouTube, no LinkedIn company page, no Reddit mentions, no Wikipedia. These are the highest-correlation signals for AI citation probability.
3. **No named authorship** — AI models weight named expert content more heavily for citation; anonymous company content is deprioritized.
4. **No customer validation** — no named clubs, no case studies, no reviews schema.

**Projected score trajectory:**
- Current (post-audit quick wins): 63/100
- After SSR implementation: +8 points → ~71/100
- After YouTube + LinkedIn + Reddit: +7 points → ~78/100
- After authorship + case studies: +4 points → ~82/100
