# Core Web Vitals / Performance Audit — dmfootballservices.it

Date: 2026-07-15
Scope: `/` (homepage), lab-style source + live-response analysis. **No PageSpeed Insights / CrUX field data available** (see Data Availability below) — do not treat any LCP/INP/CLS millisecond figure below as measured; they are estimates from static analysis unless explicitly marked "measured."

## Data Availability (read first)

- `python3 ~/.claude/skills/seo/scripts/pagespeed_check.py https://dmfootballservices.it/ --json` was run twice. Both mobile and desktop calls returned: `"PSI rate limit exceeded (240 QPM / 25,000 QPD). Wait and retry."` — this is the script's generic public-quota response when no `GOOGLE_API_KEY` is configured (confirmed by reading `pagespeed_check.py`; the `key` param is only attached `if api_key`). **No PSI Lighthouse scores, no CrUX field data (28-day real-user percentiles) were obtainable in this environment.**
- No Lighthouse/Puppeteer/Playwright binary is installed locally (`npx lighthouse` prompted to install a package, no network install attempted) and no headless browser was run — so no lab trace (actual LCP/INP/CLS timings, main-thread task list, DOM node count at runtime) was captured either.
- **Every metric below is either (a) directly measured via `curl` against the live site/response headers, (b) computed from the built `dist/` output and source code, or (c) a source-derived estimate.** Each is labeled accordingly. Treat this as a static/heuristic audit, not a substitute for a real Lighthouse run or CrUX data once traffic accrues.

## What Was Measured Directly

| Item | Value | Method |
|---|---|---|
| TTFB, `/` | 141ms | `curl -w time_starttransfer` |
| HTML transfer size | 35,790 bytes (Brotli, `content-encoding: br`) | `curl -I` |
| Server / CDN | Vercel, HTTP/2, `x-vercel-cache: HIT` (edge cache hit) | response headers |
| Main JS bundle (`index-CxT4NBUk.js`) | 849,933 bytes uncompressed / ~237KB gzip / Brotli confirmed in transit | `dist/` + `curl -H "Accept-Encoding"` |
| Main CSS bundle (`index-mdAhDdn4.css`) | 62,986 bytes uncompressed / ~11.4KB gzip | `dist/` |
| Total `public/videos/` payload | 81MB across 12 `.mp4` files (2.6MB–16.9MB each) | `du -sh` |
| Largest single video | `segretario.mp4` — 16,948,643 bytes (confirmed live via `curl -I`) | live fetch |
| Second largest | `presidente.mp4` — 13,482,892 bytes | `ls -la` |
| Total `.webp` screenshot payload (built) | 632KB across 19 images (20KB–56KB each) | `du -ch dist/assets/*.webp` |
| Cache headers, `/assets/*` (JS/CSS/webp) | `Cache-Control: public, max-age=31536000, immutable` | `vercel.json` + live `curl -I` |
| Cache headers, `/videos/*` | `Cache-Control: public, max-age=0, must-revalidate` (NOT covered by the `/assets/(.*)` immutable rule in `vercel.json`) | live `curl -I` |
| Fonts | Loaded via `@import url(fonts.googleapis.com/...)` at the top of `src/index.css` (compiled into the render-blocking CSS bundle) | `src/index.css:1` |
| No `<link rel=preconnect>` to `fonts.googleapis.com`/`fonts.gstatic.com`, no `<link rel=preload>` for any resource | confirmed absent | `dist/index.html` head |
| App architecture | Client-rendered React 18 SPA (Vite, no SSR/SSG), single JS entry, `<div id="root"></div>` empty until hydration | `dist/index.html`, `src/main.tsx` |

## Estimates / Source-Derived (not measured at runtime)

- **DOM size**: role-card function bullets alone = 92 `<li>` (counted from `ROLES[].functions` arrays: 10,13,10,9,7,7,8,8,7,7,6), all unconditionally rendered in the DOM (only visually collapsed via `max-height:0`), each producing ~3 nodes (li + icon svg + span) ≈ 276 nodes. Adding DM_FEATURES (9 cards × ~13 nodes ≈ 117), pricing plan cards (4 × ~22 ≈ 88), screenshot gallery tabs (19 buttons), nav/hero/footer chrome → **estimated 700–1,000 DOM nodes total**, likely under the 1,500-node "concerning" threshold, but non-trivial for a single landing page and worth monitoring as more roles/plans are added.
- **LCP element**: almost certainly the hero `<h1>` text ("Il gestionale per società di calcio strutturate.") since there is no `<img>`/hero photo — but because this is a pure CSR SPA, that text renders only after JS parses+executes+hydrates, not from server HTML. No lab trace was run to confirm actual LCP timing.

## Priority Findings

### P0 — Critical

**1. Client-side-rendered SPA with a single 850KB JS bundle blocks all rendering, including the LCP text.**
`dist/index.html` ships an empty `<div id="root">`; nothing paints until `index-CxT4NBUk.js` (849KB raw / ~237KB Brotli) downloads, parses, executes, and React hydrates. This bundle contains React, ReactDOM, React Router, the full Three.js library (for the hero WebGL background), Recharts, Embla Carousel, react-hook-form + zod, date-fns, cmdk, vaul, and ~20 Radix UI primitives in one chunk with no code-splitting (`vite.config.ts` has no `manualChunks`/dynamic `import()` anywhere in `Index.tsx`). On a throttled mobile CPU, JS parse+execute time on an 850KB bundle routinely adds many hundreds of ms to a second before the LCP text can paint — this is very likely the single biggest lever on LCP and "poor" is plausible on median mobile hardware without a lab trace to confirm. **Recommendation**: code-split with `React.lazy()`/dynamic import for anything not needed for first paint (Three.js/`PitchCanvas`, Recharts, react-hook-form, cmdk, vaul, unused Radix primitives), verify which shadcn/ui components are actually used on this page vs. dead weight from the scaffold, and consider SSR/SSG (e.g., prerendering this static marketing page) to remove the CSR blank-page problem entirely.

**2. Fonts loaded via `@import` inside CSS, no preconnect — adds a serial 2–3 round-trip chain before custom-font text can render.**
`src/index.css:1` — `@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed...&display=swap')`. Because this is inside the CSS file (not a `<link>` in HTML `<head>`), the browser cannot discover the Google Fonts stylesheet until the main CSS file itself has downloaded, then must fetch the fonts.googleapis.com CSS, then the actual `.woff2` from fonts.gstatic.com — three sequential hops to two extra third-party origins, with zero `<link rel="preconnect">`/`dns-prefetch"` hints in `dist/index.html` to warm those connections early. `font-display: swap` is present so text won't be invisible indefinitely (no FOIT), but this still adds avoidable latency directly in the LCP text's render path. **Recommendation**: move the font `<link>` into `index.html` `<head>` (or self-host the two Barlow woff2 files), add `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>`.

### P1 — High

**3. Autoplaying video (with attempted audio) per role card and per pricing scroll section is a major mobile bandwidth/INP risk — even though it is already lazy-mounted.**
Good news first: the lazy-loading pattern is real and correctly implemented — `RoleCard` only mounts `<SmartVideo>` when `open` is true (click-triggered, not page-load), and `ScrollVideo` uses a genuine `IntersectionObserver` (`threshold: 0.35`) to mount `<SmartVideo>` only when ≥35% visible, unmounting/pausing otherwise. This is correctly built.

The risk is what happens **after** mount: `SmartVideo`'s `useEffect` immediately calls `v.muted = false; v.play()`, and on `NotAllowedError` falls back to muted+play plus a "Attiva audio" button (`src/pages/Index.tsx:591-657`). Every role card the user opens out of curiosity, and the pricing video the moment it scrolls 35% into view, triggers a full-quality-video fetch attempt of files up to **16.9MB** (`segretario.mp4`) and **13.5MB** (`presidente.mp4`) on any connection, including mobile data — `preload="metadata"` limits the *idle* download to just metadata, but calling `.play()` forces the browser to start buffering the actual media stream immediately. On a phone on cellular data, scrolling past the pricing section or tapping two or three role cards can pull down tens of MB unintentionally. This also risks INP: decoding video frames and the double play()/catch()/fallback-play() sequence run on the main thread right after a click, competing with the click's own paint work.
**Recommendation**: don't attempt unmuted autoplay at all on mobile viewports (detect via `matchMedia`/pointer:coarse or just default muted+tap-to-unmute universally — simpler and removes the double-`play()` attempt); honor `navigator.connection.saveData` / `prefers-reduced-data` to skip autoplay on constrained connections; consider serving a lower-bitrate/shorter preview clip (or an animated poster/first-frame image) instead of the full source, with the full video loading only on explicit tap; re-encode existing videos — 5–17MB for what appear to be short dashboard-demo clips suggests high bitrate/no compression pass (H.264 at a lower CRF or AV1/VP9 would likely cut these by 60-80%).

**4. `/videos/*` assets are not covered by the immutable long-cache rule in `vercel.json`.**
`vercel.json`'s cache-control override only targets `source: "/assets/(.*)"` (confirmed applied: JS/CSS/webp under `/assets/` all return `Cache-Control: public, max-age=31536000, immutable` live). Files under `/videos/` fall through to the default `public, max-age=0, must-revalidate` (confirmed live via `curl -I` on `segretario.mp4`). Every repeat visitor who reopens a role card must revalidate a multi-MB video with the origin instead of serving instantly from disk/HTTP cache. Since video filenames aren't content-hashed, don't blindly copy the `immutable` directive (that would break cache invalidation on video updates) — instead add an explicit `/videos/(.*)` rule with a moderate `max-age` (e.g. a day to a week) or move to hashed filenames + immutable, matching the pattern already used for images/JS.

**5. No code-splitting / bundle audit for unused UI library weight.**
Bundle includes Recharts, react-hook-form + zod, date-fns, cmdk, vaul, embla-carousel, and ~20 `@radix-ui/*` packages, none of which are imported in `Index.tsx` (only `lucide-react` icons and `three` are). These may be used by other routes (`NotFound.tsx`) or leftover shadcn/ui scaffold components not referenced on the homepage at all. Worth auditing with a bundle visualizer (`rollup-plugin-visualizer` or `vite-bundle-visualizer`) to confirm and tree-shake/remove dead imports, since this is a single-page marketing site and the homepage shouldn't need form-validation, charting, or a command palette library.

### P2 — Medium

**6. `PitchCanvas` (Three.js hero background) runs an unthrottled, unpaused `requestAnimationFrame` loop for the entire session.**
`src/components/PitchCanvas.tsx:125-140` — the render loop starts on mount and only stops on unmount, which on this single-page site effectively means "never," including after the user has scrolled far past the hero and the canvas is off-screen. Unlike `ScrollVideo`, there's no `IntersectionObserver` gating here, so the WebGL renderer keeps re-rendering and requesting frames at up to 60fps indefinitely, consuming CPU/GPU and battery, and competing with the main thread for time whenever the user interacts elsewhere on the page (e.g., clicking a role card while a WebGL frame is mid-render). Also note the `resize` listener (line 150) is unthrottled/undebounced, calling `renderer.setSize` synchronously on every resize event.
**Recommendation**: pause the rAF loop (and ideally dispose/recreate the renderer) when the hero section leaves the viewport, using the same `IntersectionObserver` pattern already proven elsewhere in this codebase; debounce the resize handler.

**7. Screenshot gallery `<img>` tags have `loading="lazy"` (good) but no explicit `width`/`height` attributes.**
`ScreenshotGallery` (`src/pages/Index.tsx:746-788`) renders `<img src={cur.src} alt={cur.label} className="w-full h-auto block" loading="lazy" />` with no intrinsic `width`/`height` and no reserved aspect-ratio box. Since different screenshots in the same gallery (ClubIS: 12 tabs, DM Scout: 7 tabs) may not share identical dimensions, switching tabs can shift layout if the new image's aspect ratio differs, and the initial image load (before its size is known) has no reserved space either. This is a CLS risk, though likely modest since these are UI screenshots probably captured at a consistent aspect ratio — not confirmed, as actual pixel dimensions weren't extracted from the webp files in this pass.
**Recommendation**: add explicit `width`/`height` (or `aspect-ratio` CSS) matching each screenshot's real dimensions.

**8. `<video>` elements have no `width`/`height`/`poster` attributes.**
`SmartVideo` (`src/pages/Index.tsx:591-657`) renders `<video ref={ref} src={src} playsInline loop preload="metadata" className={...w-full h-auto...} />` with no explicit dimensions or `poster` image. Before metadata loads, the video element has no reserved intrinsic size, which is a layout-shift risk when it pops in (partially mitigated here because it sits inside the role card's animated `max-height` container, which is already itself changing size on open — but the video's own internal shift, once its metadata resolves and it snaps to its native aspect ratio, is not covered by that container transition and isn't guaranteed to fall inside the 500ms post-input CLS exclusion window).
**Recommendation**: set explicit `width`/`height` (or CSS `aspect-ratio`) and a lightweight `poster` frame so a placeholder box is reserved immediately.

### P3 — Low / Notes

- **TTFB is good** (141ms measured, well under the 800ms LCP-subpart target), and Vercel edge cache (`x-vercel-cache: HIT`) plus HTTP/2 + Brotli are all working correctly — server/CDN layer is not a concern.
- **Image format choice (webp) and lazy-loading discipline for screenshots is already good practice** — 19 webp images totaling only 632KB combined, all using `loading="lazy"`. No action needed here beyond the missing width/height (see #7).
- The `RoleCard` expand/collapse uses a `max-height: 2000px` transition (`src/pages/Index.tsx:712-717`), a common CSS technique that is layout-triggering; with 92 total bullet items already resident in the DOM (see DOM-size estimate above) this is a minor, not urgent, INP-adjacent cost confined to the clicked card's subtree — flagging for awareness, not a priority fix.
- **SPA / Soft Navigations note**: per the CWV thresholds reference, Google's CrUX/PSI tooling has a documented blind spot for SPA "soft navigations" (Chrome 139+ origin trial, no ranking impact yet). This site is a single route today (`/` plus a catch-all `NotFound`), so this is not currently a practical concern, but worth remembering if the site adds client-routed pages later.
- **Next step recommendation**: once the domain accrues sufficient Chrome traffic, re-run this audit with a configured `GOOGLE_API_KEY` (`python3 ~/.claude/skills/seo/scripts/pagespeed_check.py` / `crux_history.py`) to get real field-data percentiles, and/or run an actual Lighthouse trace (mobile, throttled) to confirm or refute the LCP/INP estimates above with real numbers.
