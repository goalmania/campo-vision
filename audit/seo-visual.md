# Visual / Mobile-Rendering Audit — dmfootballservices.it

Date: 2026-07-15
Tool: Playwright (Chromium), screenshots in `/Users/giuseppedimuro/Downloads/campo-vision-main 2/audit/screenshots/`

- `desktop.png` — 1280x800, above-the-fold, hero fully rendered
- `mobile-hero.png` — 375x812 (iPhone UA, DPR 2), above-the-fold viewport only
- `mobile.png` — 375x812, full-page stitched capture (see caveat below)

## Method note (important)
Both screenshots required a **~5–7 second wait after DOMContentLoaded** before the hero content (and every below-the-fold section) became visible. Instrumented checks showed the `<h1>` sits at `opacity: 0` for roughly 4–6 seconds on both desktop and mobile before a JS-driven fade-in sets it to `opacity: 1`. A first-pass screenshot taken at the "normal" 2s wait used by most automated tools/crawlers captured a **completely blank hero** (nav only, no H1, no copy, no CTAs) — see `desktop_retry` test artifact. This is flagged as Issue #1 below, since it's not just a scripting quirk: it reflects real content-visibility timing that a crawler, social-preview bot, or slow real-world device would also experience.

Additionally, sections below the hero use scroll-triggered reveal animations (opacity 0 until scrolled into view / IntersectionObserver or `whileInView`-style triggers). A naive Playwright `full_page` screenshot (which resizes the viewport and captures in one shot without incrementally scrolling) rendered large black gaps for ~70% of the page height, because those reveal animations never fired. To properly audit reflow, the page was instead walked in real scroll steps (viewport-height increments with a pause at each step) — this produced correct renders of every section (role cards, galleries, pricing, footer) and is what the findings below are based on.

## Above-the-fold findings

### Desktop (1280x800)
- Once rendered, the hero is clean: eyebrow label, 3-line H1 ("TECNOLOGIA PER IL CALCIO / CHE CAPISCE / IL TUO LAVORO."), supporting paragraph, and both CTAs ("Scopri ClubIS" filled lime, "Scopri DM Scout" outlined) all fit above the fold with room to spare. No overlap with the sticky nav.
- The 3D pitch canvas is subtle in the background (visible as faint pitch-line geometry, bottom-right) and does not interfere with text legibility or contrast.
- No horizontal scroll (scrollWidth == clientWidth == 1280).

### Mobile (375x812)
- H1, all 3 lines, renders fully without truncation or overlap with the fixed header/hamburger icon.
- Supporting paragraph and **both CTA buttons are fully visible without scrolling** — "Scopri ClubIS" and "Scopri DM Scout" both sit above the 812px fold line, stacked vertically, full-width, adequately sized.
- A "11" numeral (likely part of a stats/counter element) peeks in at the very bottom edge of the fold — not a problem, just confirms the fold cutoff point.
- No horizontal scroll (scrollWidth == clientWidth == 375).
- Product identity is reasonably clear within the hero copy: "Due prodotti. Un ecosistema. ClubIS per la gestione completa del club, DM Scout per lo scouting professionale." This does communicate what the product is, but the H1 itself ("Tecnologia per il calcio che capisce il tuo lavoro") is generic/emotive copy — it does not itself say "for structured football clubs" or name the audience; that specificity only appears in the smaller body copy below. On a quick 2-second glance a visitor sees "football tech" but not explicitly "for strutturata clubs" unless they read the paragraph.

## Mobile reflow (scrolled through full page)
- **ClubIS role cards** (11 total): stack correctly as full-width accordion rows with icon, title, one-line description, and a chevron. No overlap, no text truncation observed on the ones sampled (Osservatore, Medico, Team Manager, Giocatore, Famiglia, Ufficio Stampa, Custode). Good touch-target height on each row (~90px+).
- **Screenshot galleries** (both ClubIS and DM Scout): tab pills wrap correctly to 3 lines at 375px width, remain tappable, and the screenshot image below scales to full container width without distortion or overflow. Caption copy below each screenshot reflows to 3 lines cleanly.
- **Pricing section**: monthly/annual toggle pill is compact and centered; the 4 plan cards (ClubIS Starter/Pro/Enterprise + DM Scout) stack in a single column, full width, with feature checklists reflowing to multiple lines without clipping. CTA buttons in each card are full-width.
- **Final CTA + footer**: heading, subtext, two CTA buttons (lime "Prova ClubIS", gold "Prova DM Scout"), contact email/phone, and footer link columns all stack cleanly with no overlap.
- **Mobile nav**: hamburger opens a clean full-screen-style overlay with Home/ClubIS/DM Scout/Prezzi/Contatti + "Inizia Gratis" CTA, all legibly stacked, no overlap with hero content behind it.

## Issues found

1. **Hero content is invisible for several seconds after load (High priority).** The H1 and all above-the-fold copy/CTAs sit at `opacity:0` for a measured ~4–6 seconds on both desktop and mobile before a JS fade-in reveals them (confirmed reproducible across multiple runs: 4.76s, 5.23s, 5.72s, 5.47s...). Real users on average or slow connections/devices will see an empty dark screen with just the nav for multiple seconds — this directly hurts perceived load speed, likely hurts LCP (Largest Contentful Paint, since the H1/hero image is probably the LCP element and its visual completion is delayed by the animation, not just network/asset loading), and risks looking "broken" to first-time visitors and to any tool/bot that snapshots the page early (social share previews, some crawlers, this very audit's first screenshot attempt). Recommend removing or drastically shortening the initial fade-in delay on the hero, or making the hero content visible-by-default (no JS-gated opacity) with only a subtle/fast enhancement animation layered on top.

2. **Touch target on mobile hamburger menu button is undersized.** Measured bounding box is only 22x22px (well under the ~48x48px recommended minimum), even though it likely has padding making the actual tappable area larger in practice — worth confirming the visual icon/click target relationship in code, since 22x22 is borderline for reliable thumb tapping on a real device.

3. **All content beyond the hero is gated behind scroll-triggered "reveal" animations (opacity 0 until in-view).** This isn't a bug for normal scrolling users, but it's a fragility risk: if a user scrolls very fast, if JS throws an error partway down the page, if a crawler/tool captures a single viewport snapshot instead of scrolling, or if IntersectionObserver support/timing is inconsistent (older devices, reduced-motion settings not respected), entire sections (role cards, galleries, pricing, footer) can remain permanently invisible. Given this is a single-page React SPA that already relies on JS for all content, consider auditing whether `prefers-reduced-motion` is respected and whether there's a safe fallback (e.g., a max-time auto-reveal or IntersectionObserver `rootMargin` generous enough to avoid missed triggers).

## Minor / lower-priority notes
- Hero H1 wording is compelling but generic at first glance; the explicit audience qualifier "società di calcio strutturate" lives only in the smaller sub-copy, not the H1 itself, slightly diluting the "who it's for" signal in the first 2 seconds.
- No horizontal scroll, no overlapping elements, no obvious CLS from the 3D canvas or autoplay videos were observed once content was fully rendered — layout itself (spacing, stacking, responsive breakpoints) is solid across both viewports tested.
