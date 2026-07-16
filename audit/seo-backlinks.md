# Backlink Profile Audit — dmfootballservices.it

**Date:** 2026-07-15
**Scope:** dmfootballservices.it (primary), plus sibling products clubis.it and dmscout.it
**Credential tier:** **Tier 0 — Basic** (`backlinks_auth.py --check`: Common Crawl + local verification crawler only; no Moz API key, no Bing Webmaster API key configured)

## 1. Data Sources Available vs. Unavailable

| Source | Status | Notes |
|---|---|---|
| Common Crawl web graph (domain-level PageRank / in-degree / harmonic centrality) | Attempted, **no data obtained** | See §2 |
| Moz API (DA/PA, spam score, referring domains, anchor text, top pages) | **Unavailable** — no `MOZ_API_KEY` configured | Not fabricated; would require free signup at moz.com/products/api |
| Bing Webmaster Tools (inbound links, competitor gap) | **Unavailable** — no `BING_WEBMASTER_API_KEY` configured | Not fabricated |
| DataForSEO (premium) | Not installed | Would give confidence 1.00 data if added |
| Backlink verification crawler (`verify_backlinks.py`) | Not run | No known/candidate backlink URLs were supplied to check — nothing to verify yet |

**Bottom line: DA/PA, full referring-domain lists, and anchor-text distribution genuinely cannot be reported — there is no data source for them at this tier, and no numbers are being invented.**

## 2. Common Crawl Web Graph — Result

`commoncrawl_graph.py` was run for all three related domains (`dmfootballservices.it`, `clubis.it`, `dmscout.it`) against the latest available release (`cc-main-2026-jan-feb-mar`). The script streams and decompresses a large `*-domain-ranks.txt.gz` file (up to a 500 MB compressed safety cap) from `data.commoncrawl.org` to search for a matching reversed hostname.

**Result: the download did not complete in this environment.** Three attempts were made (background run with a 500s script timeout, a second background run with 400s, and a final hard-capped 90s foreground test) — all were still actively downloading/decompressing when stopped, none returned a result before being terminated. No `.json` output and no local cache file (`~/.cache/claude-seo/commoncrawl/`) was ever produced.

**This must not be read as "the domain was not found in Common Crawl."** Per the CC-interpretation safeguard in this skill, a failed/timed-out fetch is an **inconclusive network/environment outcome**, not evidence of zero backlinks or low authority. It was independently re-validated with `validate_backlink_report.py`, which passed with 0 issues because the report correctly records this as `status: error` (timeout) rather than a false "not found" claim.

**Practical implication:** No CC-based in-degree, PageRank, or harmonic-centrality figures are available for any of the three domains today. If retried with a faster/uncapped connection (e.g., from a machine with direct AWS/S3 network access, since Common Crawl data is hosted on S3 and mirrored via `data.commoncrawl.org`), the query should be re-attempted — ideally with `--update` skipped (use cache) after first success, since CC data only refreshes quarterly anyway.

## 3. Backlink Health Score

**INSUFFICIENT DATA — no numeric score produced.**

Per this skill's Tier-0 rule, a numeric Backlink Health Score requires at least 4 of the 7 weighted scoring factors (referring domains, domain quality distribution, anchor text naturalness, toxic link ratio, link velocity, follow/nofollow ratio, geographic relevance) to have real data. **0 of 7 factors have data today** (Moz/Bing absent, and the Common Crawl attempt did not return usable metrics). Producing a score under these conditions would be actively misleading, so none is given — this was confirmed by the automated validator (`validate_backlink_report.py`), which flags exactly this situation as an error if a score is present with fewer than 4 populated factors (here `factors_with_data: 0`, `score: null`, and it passed clean).

## 4. Business Context

dmfootballservices.it, clubis.it, and dmscout.it are a brand-new-ish (2024–2026) Italian B2B SaaS family with no confirmed public presence yet on YouTube, LinkedIn, Reddit, or in press (per the prior GEO audit, 2026-05-15). A near-empty backlink profile is expected and normal at this stage — the absence of data is consistent with the product's launch timeline, not necessarily a technical or authority problem.

## 5. Priority Recommendations (Free / Low-Cost Link-Building for a Niche Italian Football SaaS)

**High priority**
1. **SaaS/software directories** — list all three products on G2, Capterra, GetApp, and Software Advice (sports/team-management or club-management SaaS categories). These are free or freemium, DR-strong, and generate both a backlink and third-party review signal.
2. **Italian business directories** — register on PagineGialle, Virgilio Business, and the Registro Imprese/Camera di Commercio online listings where applicable; these are trusted, geo-relevant, low-effort citations.
3. **Sports-tech / calcio-tech directories and aggregators** — seek listing in Italian sports-tech roundups (e.g., blogs and portals covering "tecnologia per il calcio", "software gestionale squadre calcio"), and sports-tech startup directories (e.g., SportTechie's directory-style resources, Sports Innovation Lab-type aggregators) if editorially open to submissions.

**Medium priority**
4. **FIGC/LND-affiliated channels** — explore whether regional Comitati (LND regional committees), Delegazioni provinciali, or affiliated youth-sector (Settore Giovanile e Scolastico) sites/forums accept partner or sponsor listings; also look at Italian coaching-community forums (e.g., allenatore.net-style forums, mister-related communities) for legitimate mentions, not spammy link-drops.
5. **Local sports club partnerships** — as clubis.it/dmscout.it onboard actual client clubs, ask each club to link to the product from their official site's "sponsor/tecnico" or "partner" page — a natural, high-relevance link source specific to this niche.
6. **Startup/company directories** — Italian and EU startup databases (e.g., Startup Italia's database, EU-Startups directory, Crunchbase, AngelList/Wellfound company profile) for a baseline of trustworthy .com/.it citations.

**Low priority / ongoing**
7. **Content-driven links** — once a blog/resource section exists on the marketing sites, target Italian sports-management and coaching blogs for guest posts or data-driven citations (e.g., publishing benchmark stats on Serie D/youth-sector club management).
8. **Re-run this audit** once (a) a Moz API key is added (free, 2,500 rows/month) for DA/PA and a real referring-domain list, and (b) the Common Crawl query succeeds from a connection that can complete the multi-hundred-MB download, to get an actual baseline in-degree/PageRank reading.

## 6. Data Source & Confidence Summary

| Metric | Source | Confidence | Status |
|---|---|---|---|
| DA / PA | Moz API | 0.85 (if available) | Not available — no API key |
| Referring domain count | Moz / DataForSEO / CC in-degree | 0.85 / 1.00 / 0.50 | Not available (CC query timed out) |
| Anchor text distribution | Moz / DataForSEO | 0.85 / 1.00 | Not available |
| Toxic link ratio | Moz spam score / DataForSEO | 0.85 / 1.00 | Not available |
| PageRank / harmonic centrality (domain-level) | Common Crawl | 0.50 | Query timed out — no data returned |
| Backlink Health Score | — | — | **INSUFFICIENT DATA** (0/7 factors populated) |

## 7. Cross-Skill Notes

- E-E-A-T / content quality is out of scope here — run `/seo content <url>` for that.
- Crawlability/technical SEO is out of scope here — run `/seo technical <url>` for that.
- No known backlink URLs were supplied for this audit, so the verification crawler (`verify_backlinks.py`) was not exercised. If a candidate backlink list becomes available (e.g., from a directory submission or partner club link), re-run verification against it.

**Errors encountered (reported, not hidden):** Common Crawl web-graph downloads timed out on all 3 attempts (dmfootballservices.it, clubis.it, dmscout.it) within this environment; no partial cache was produced. `rate_limited: false` (no rate-limit responses were received — this was a download-duration/connectivity issue, not a 429).
