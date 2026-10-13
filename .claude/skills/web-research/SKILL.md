---
name: web-research
description: How workflow agents use external information — WebSearch for discovery, the fetch MCP server (mcp__fetch__fetch) to verify and read pages, citation format, freshness and cost labelling. Used by resource-researcher and validator; never rely on model memory alone for resources or URLs.
---

# web-research

External data is mandatory: resources must be discovered with **WebSearch** and every URL that ends up in an artifact must be **verified with the fetch MCP server** (`mcp__fetch__fetch`). Model memory is only a starting point for query ideas.

## Procedure per module

1. **Discover** — 1–3 `WebSearch` queries per module, e.g. `"<topic> official tutorial"`, `"<topic> free course <current year>"`, `"<topic> book for <background> developers"`. Prefer: official documentation, well-known free courses, widely recommended books, reputable video series.
2. **Verify** — call `mcp__fetch__fetch` with `url` and `max_length: 2500` for each candidate you intend to keep. Confirm the page exists, matches the title, and is about the topic. Record the verification date. If fetch fails (blocked, timeout), try `WebFetch` once; if that also fails, do not include the URL (or list it explicitly under Open Issues as unverified).
3. **Label** — type (docs, course, book, video, interactive, article), cost (free / paid with price or "subscription"), estimated hours, level (beginner / intermediate / advanced), why it fits this learner.
4. **Limit** — keep 2–4 resources per module (one primary, the rest alternatives). Verify at most ~6 URLs per module; do not fetch every search result.

## Free-only mode

When the run mode is `free-only`, every primary resource must be free. Paid items may appear only as clearly labelled optional alternatives, maximum one per module.

## Citation format

In tables: `[Title](URL)` with separate columns for type, cost, hours, level, verified date.
In `## Sources`: `- [Title](URL) — type, accessed YYYY-MM-DD`.

## Validator use

The validator re-verifies URLs with `mcp__fetch__fetch`: all of them if the artifact lists 10 or fewer, otherwise a sample of at least 8 including every primary resource. A dead or off-topic primary resource is a `url-reachability` failure attributed to `resource-researcher`.

## Rules

- Never invent or "recall" a URL without fetching it in this run.
- Prefer stable canonical URLs (no tracking parameters).
- Note the publication/update year when the page shows it; flag resources older than 4 years for fast-moving topics.
