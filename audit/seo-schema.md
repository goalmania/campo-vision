# Schema.org / Structured Data Audit — dmfootballservices.it

**Audited URL:** https://dmfootballservices.it/
**Audit date:** 2026-07-15
**Method:** Live `curl` fetch of homepage HTML (HTTP 200), JSON-LD `@graph` extracted from `<head>`, cross-checked against React source (`src/pages/Index.tsx`) and `/public/videos/*.mp4`.
**Reference:** `~/.claude/skills/seo-schema/SKILL.md`, `~/.claude/skills/seo/references/schema-types.md`

---

## 1. Detection Summary

Single JSON-LD `<script type="application/ld+json">` block in `<head>`, one `@graph` with **10 nodes**:

| # | @type | @id | Status |
|---|-------|-----|--------|
| 1 | Organization | `#organization` | ✅ Valid |
| 2 | WebSite | `#website` | ✅ Valid |
| 3 | WebPage | `#webpage` | ⚠️ Stale `dateModified` |
| 4 | SoftwareApplication (ClubIS) | `#clubis` | ⚠️ Missing `aggregateRating`; questionable `operatingSystem` |
| 5 | SoftwareApplication (DM Scout) | `#dmscout` | ⚠️ Same as above |
| 6 | FAQPage | *(no @id)* | ℹ️ Info priority — see §3 |
| 7 | **HowTo** | *(no @id)* | 🔴 **Deprecated — remove** |
| 8 | BreadcrumbList | *(no @id)* | ⚠️ Misapplied to single-page anchors |
| 9 | ItemList | *(no @id)* | ✅ Valid, low impact |
| 10 | SpeakableSpecification | `#speakable` | 🔴 Broken selector |

No Microdata or RDFa detected. No VideoObject, Person, AggregateRating, or Review schema present, despite 12 local product videos (`/public/videos/*.mp4`) embedded on the page.

---

## 2. Critical / High Priority Issues

### 2.1 HowTo schema present — deprecated since September 2023 (Priority: High — remove)
```json
{
  "@type": "HowTo",
  "name": "Come iniziare con ClubIS in 3 passi",
  ...
}
```
Google removed HowTo rich results in September 2023. This node produces zero search benefit today and should be deleted from the `@graph` entirely — do not replace with anything, and do not re-add HowTo elsewhere on the site.

**Fix:** delete the entire `{"@type": "HowTo", ...}` object (lines ~288–313 of the current `<head>` block) from the `@graph` array.

### 2.2 SpeakableSpecification references a CSS selector that doesn't exist in the DOM (Priority: High — fix)
```json
"cssSelector": ["h1", "h2", ".product-summary", "noscript"]
```
Verified against `src/pages/Index.tsx`: there is exactly **one** `<h1>` and no element anywhere in the source carries a class `product-summary` — this selector matches nothing. Including `"noscript"` is also incorrect: when JavaScript executes (the normal case for this SPA), the `<noscript>` block's text is not part of the rendered/spoken DOM, so it can't be a valid "speakable" target for the live page.

**Fix (copy-paste):**
```json
{
  "@type": "SpeakableSpecification",
  "@id": "https://dmfootballservices.it/#speakable",
  "cssSelector": ["h1", "h2"]
}
```
If you want richer speakable coverage, add a real, stable class (e.g. `speakable-summary`) to the hero paragraph in `Index.tsx` and reference that instead of a phantom `.product-summary`.

### 2.3 BreadcrumbList applied to in-page anchors, not a real page hierarchy (Priority: Medium)
```json
{ "@type": "ListItem", "position": 2, "name": "ClubIS — Gestionale Club", "item": "https://dmfootballservices.it/#clubis" },
{ "@type": "ListItem", "position": 3, "name": "DM Scout — Scouting AI", "item": "https://dmfootballservices.it/#dmscout" },
{ "@type": "ListItem", "position": 4, "name": "Prezzi", "item": "https://dmfootballservices.it/#prezzi" }
```
This is a one-page site (React SPA, no distinct routed URLs for ClubIS/DM Scout/Pricing — confirmed in `Index.tsx`, they are `<section id="clubis">`, `id="dmscout">` anchors on the same document). BreadcrumbList is meant to represent actual site/page hierarchy for Google's breadcrumb rich result; anchor fragments on a single URL aren't a hierarchy and there's no visible breadcrumb UI on the page for Google to corroborate. This is unlikely to render as a breadcrumb rich result and adds noise.

**Recommendation:** Remove the BreadcrumbList node. If/when the site splits ClubIS, DM Scout, and Pricing into real routed pages, re-add BreadcrumbList reflecting genuine navigation depth at that point.

---

## 3. FAQPage — Info Priority Only (not Critical)

Per Google's August 2023 policy change, FAQ rich results are restricted to government and healthcare authority sites. `dmfootballservices.it` is a commercial SaaS site, so this FAQPage (13 Q&A pairs) will **not** produce a rich result in Google Search.

- **Do not remove it outright** — it still has value for AI/LLM citation (ChatGPT, Perplexity, Google AI Overviews commonly ground answers in FAQPage-marked content), and the site is already explicitly optimized for AI crawlers (`llms.txt`, `ai-content.html`, noscript fallback).
- **Do not add more FAQPage markup elsewhere** on the site expecting a Google rich-result benefit — there is none for a commercial site.
- Flagged here at **Info** priority per policy, not Critical/High.

---

## 4. SoftwareApplication Nodes (#clubis, #dmscout)

| Check | ClubIS | DM Scout |
|---|---|---|
| `name` | ✅ | ✅ |
| `applicationCategory` | ✅ BusinessApplication | ✅ BusinessApplication |
| `offers` (price/currency/availability) | ✅ 3 valid Offers | ✅ 1 valid Offer |
| `priceValidUntil` ISO 8601 | ✅ `2027-12-31` | ✅ `2027-12-31` |
| `availability` absolute URL | ✅ `https://schema.org/InStock` | ✅ |
| `aggregateRating` | ❌ Missing | ❌ Missing |
| `operatingSystem` accuracy | ⚠️ See below | ⚠️ See below |

**4.1 Missing `aggregateRating` (Priority: Medium — do not fabricate).**
Google's "software app" rich result (star rating in SERPs) requires `aggregateRating`. Neither node has one, so today neither is eligible for that rich result — this is expected to show as a missing-field warning in the Rich Results Test, not a hard error. **Do not add placeholder/fake ratings** — that risks a manual action for misleading structured data. Add real `AggregateRating` (with genuine `ratingValue`/`reviewCount`) once verified customer reviews exist.

**4.2 `operatingSystem: "Web, iOS, Android (PWA)"` overstates platform reality (Priority: Medium).**
Confirmed via repo search: there is no Capacitor/Cordova/React Native config — ClubIS and DM Scout are web apps installable as a Progressive Web App, not distinct native iOS/Android binaries. Listing "iOS, Android" alongside "Web" implies native app store presence that doesn't exist. This is a truthfulness/accuracy issue under the schema validation checklist ("no placeholder or misleading data").

**Fix (both `#clubis` and `#dmscout`):**
```json
"operatingSystem": "Web (PWA)"
```

---

## 5. Consistency Check: Schema vs. Live Content (post-repositioning)

The task brief assumed `WebPage.about` now points to `#clubis` following today's ClubIS-first repositioning. **That is not what the live schema shows** — `WebPage.about` currently points to `#organization`:
```json
"about": { "@id": "https://dmfootballservices.it/#organization" }
```
Verified against `src/pages/Index.tsx`: the hero **is** ClubIS-first in the rendered content — tag "ClubIS — by DM Football Services", H1 "Il gestionale per società di calcio strutturate", ClubIS section (`#clubis`) rendered before the DM Scout section (`#dmscout`) in DOM order. So the repositioning is real in the visible page, but the schema's `WebPage.about` was **not** updated to match, and — importantly — that's actually fine: the homepage still fully covers both products (FAQPage, ItemList, and BreadcrumbList all list ClubIS and DM Scout together), so `about: Organization` remains the technically correct target. **No fix required here**, but flagging the mismatch between the assumed and actual state for the record. If the business wants schema to explicitly signal "ClubIS-first," add `mainEntity: {"@id": "#clubis"}` on the WebPage node in addition to (not instead of) `about: Organization`.

**Stale `dateModified` (Priority: Medium).**
`WebPage.dateModified` is `"2026-05-15"` — two months old — despite the ClubIS-first repositioning reportedly shipping today (2026-07-15). Update on every meaningful content change:
```json
"dateModified": "2026-07-15"
```

No other name/description mismatches found between JSON-LD and visible/noscript content — product descriptions, pricing (€59/€99/€179 ClubIS, €49 DM Scout), and feature lists match across `<head>` JSON-LD, `<noscript>` fallback, and the React source.

---

## 6. Missing Opportunities

### 6.1 VideoObject — not implemented (Priority: Medium-High)
Confirmed 12 local MP4s serving real product content, with zero VideoObject markup:
```
/public/videos/presidente.mp4, segretario.mp4, direttore-sportivo.mp4, allenatore.mp4,
osservatore.mp4, team-manager.mp4, medico.mp4, giocatore.mp4, famiglia.mp4,
ufficio-stampa.mp4, custode.mp4, pricing.mp4
```
These are role-dashboard walkthroughs (11) plus a pricing overview (1), directly tied to the `ROLES` array in `Index.tsx`. Adding VideoObject markup is a genuine opportunity for video rich results / video AI Overviews citations. **`duration`, `uploadDate`, and `thumbnailUrl` are placeholders below — fill with real values (I cannot read video metadata from a static file listing).**

Template for one role video (replicate for all 11, changing name/description/contentUrl):
```json
{
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "@id": "https://dmfootballservices.it/#video-presidente",
  "name": "ClubIS — Dashboard Presidente",
  "description": "Panoramica della dashboard Presidente in ClubIS: KPI esecutivi, Financial Fair Play, compliance iscrizione campionato, gestione sponsor e obiettivi stagionali.",
  "thumbnailUrl": ["https://dmfootballservices.it/PLACEHOLDER-thumb-presidente.jpg"],
  "uploadDate": "PLACEHOLDER-YYYY-MM-DD",
  "duration": "PLACEHOLDER-ISO8601-e.g.-PT45S",
  "contentUrl": "https://dmfootballservices.it/videos/presidente.mp4",
  "publisher": { "@id": "https://dmfootballservices.it/#organization" },
  "isPartOf": { "@id": "https://dmfootballservices.it/#clubis" }
}
```
Then reference these from the `#clubis` SoftwareApplication node (schema.org's `video` property is valid on any CreativeWork, which SoftwareApplication inherits from):
```json
"video": [
  { "@id": "https://dmfootballservices.it/#video-presidente" },
  { "@id": "https://dmfootballservices.it/#video-segretario" },
  { "@id": "https://dmfootballservices.it/#video-direttore-sportivo" }
  /* ... one entry per role video ... */
]
```
The `pricing.mp4` overview video spans both products, so attach it at the WebPage or Organization level instead of a single product node:
```json
{
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "@id": "https://dmfootballservices.it/#video-pricing",
  "name": "DM Football Services — Panoramica Prezzi ClubIS e DM Scout",
  "description": "Panoramica dei piani ClubIS (Starter, Pro, Elite) e DM Scout, con 7 giorni di prova gratuita.",
  "thumbnailUrl": ["https://dmfootballservices.it/PLACEHOLDER-thumb-pricing.jpg"],
  "uploadDate": "PLACEHOLDER-YYYY-MM-DD",
  "duration": "PLACEHOLDER-ISO8601",
  "contentUrl": "https://dmfootballservices.it/videos/pricing.mp4",
  "publisher": { "@id": "https://dmfootballservices.it/#organization" }
}
```

### 6.2 Person / Founder schema — missing, tied to E-E-A-T (Priority: Info/Medium — content decision, not just technical)
No `Person` node exists for a founder, product lead, or subject-matter authority. There is currently no publicly named founder on the site to attach schema to — **adding Person markup requires a business decision first** (who is named as founder/author, what bio/credentials are published), before it becomes a schema task. Flagging as a gap: named-author/founder Person schema (with `sameAs` to LinkedIn, `worksFor` → Organization) is one of the more effective E-E-A-T signals for a niche B2B software site and is worth prioritizing once a name is chosen.

### 6.3 Minor / low-priority nitpicks (Info)
- `FAQPage`, `HowTo` (pre-removal), `BreadcrumbList` (pre-removal), and `ItemList` nodes lack `@id` — every other node in the `@graph` has one; add for internal-reference consistency, not required by Google.
- `Organization.logo` (`favicon.png`, ImageObject) has no `width`/`height` — recommended minimum 112×112px for logo rich results; verify actual favicon dimensions meet this before/after adding.
- `WebSite` has no `potentialAction` (SearchAction) — not applicable/needed since there's no on-site search feature; no action needed unless one is added later.

---

## 7. Priority Summary Table

| Priority | Issue |
|---|---|
| High | Remove deprecated `HowTo` node entirely |
| High | Fix broken `SpeakableSpecification.cssSelector` (`.product-summary` matches nothing; drop `noscript`) |
| Medium | Remove/rework `BreadcrumbList` — misapplied to single-page anchors, no real hierarchy |
| Medium | Update stale `WebPage.dateModified` (`2026-05-15` → `2026-07-15`) |
| Medium | Fix `operatingSystem` on both SoftwareApplication nodes — no native iOS/Android app exists, only PWA |
| Medium | Add VideoObject markup for 12 embedded product videos (placeholders need real duration/thumbnail/uploadDate) |
| Medium (no fabrication) | `aggregateRating` missing on both SoftwareApplication nodes — add only once real reviews exist |
| Info | FAQPage on commercial site — no Google rich-result benefit since Aug 2023, but keep for AI/LLM citation value; don't add more FAQPage elsewhere |
| Info | `WebPage.about` correctly targets `#organization`, not `#clubis` — contrary to the repositioning assumption, but this is actually correct given the page still covers both products fully |
| Info | Person/founder schema gap — business/content decision needed before it's a schema task |
| Info | Missing `@id` on FAQPage/BreadcrumbList/ItemList nodes; missing logo `width`/`height` |

---

## Files Referenced
- Live HTML fetch: homepage `<head>` JSON-LD (curl, 2026-07-15)
- `/Users/giuseppedimuro/Downloads/campo-vision-main 2/src/pages/Index.tsx` (hero copy, section order, ROLES array, video paths)
- `/Users/giuseppedimuro/Downloads/campo-vision-main 2/public/videos/*.mp4` (12 files, confirmed present)
