---
artifact: 07-validation.md
agent: validator
run_id: run-02-sql-pandas-business-analysis
attempt: 3
depends_on: [requirements-formalizer, knowledge-assessor, resource-researcher, practice-designer, assessment-designer, schedule-planner]
status: complete
sources_used: 16
---

# Validation (round 3): SQL and pandas for business analysis

## Summary
This is validation round 3 of 3. It was run after 03, 04, 05 and 06 were revised to fix the round-2 consistency failures. Six gates pass and one fails, so the overall verdict is FAIL.
- **Fixed since round 2:** the dead `gordonkjlee` repository is gone from 04. The `order_lines.csv` export is gone from 05, which now builds order lines with `order_details.merge(orders, on="order_id")`. 03 now states that the files are tab-delimited, have a `\P\` marker column and a trailing `\` on the last header name. 06 now uses the same C4 pass rule as 05 and the correct E2.1 step 6 reference.
- **Time:** 12.0 h of 12 h, exactly 3.0 h in each of the 4 weeks. I recomputed every week.
- **URLs:** I fetched 16 URLs, including all 5 primaries, every scheduled companion, the repository and the three raw dataset files. All are reachable and on topic.
- **Why it still fails (consistency gate, 03 only):** the canonical `load_northwind()` snippet in 03 does not match the real file layout. 03 assumes two metadata rows (`T`, `N`) in every file. In fact:
  - `orders.csv` and `order_details.csv` have six metadata lines (`T`, `N`, `K`, `t`, `c`, `#`) between the header and the first `V` row.
  - `customers.csv` has two (`K`, `#`) and starts with a UTF-8 BOM.

  With `skiprows=[1, 2]`, four metadata rows stay in `orders` and `order_details`. As a result, `order_date` does not parse, the 830-row sanity print fails, and the `order_details.merge(orders, on="order_id")` call that 04 and 05 rely on fails on mixed column types. The Excel instruction ("delete rows 2 and 3") is wrong in the same way.

Only resource-researcher has to fix its artifact. 04, 05 and 06 refer to the snippet by reference. The schedule-planner re-runs as a dependent.

## Content

### Gate results
| Gate | Result | Evidence | Attributed agent (if FAIL) |
|---|---|---|---|
| coverage | PASS | Each module has a primary and an exercise. M1: PlayCode and E1.1. M2: Data School learn-sql and E2.1. M3: Data School learn-sql, E3.1 and E3.2. M4: Kaggle Python and E4.1. M5: pandas Getting started, E5.1 and E5.2. M6: pandas Comparison with SQL and E6.1. Checkpoints: C1 covers M1-M2, C2 covers M3, C3 covers M4-M5, and C4 plus the final cover M6. Prioritized gaps C1-C7 are covered. C8 is optional and dropped, as 02 allows. | — |
| time-fit | PASS | W1: study 0.5+0.25+0.95+0.3=2.0, practice 0.35, C1 0.25, so 2.6+0.4 buffer=3.0. W2: study 0.3+1.45+0.25=2.0, practice 0.45, C2 0.25, so 2.7+0.3=3.0. W3: study 0.15+0.85+1.1+0.4=2.5, practice 0.25, C3A 0.1, so 2.85+0.15=3.0. W4: study 0.35+0.15+1.0=1.5, practice 0.1+0.1+0.3=0.5, C3B 0.15 + final 0.5, so 2.65+0.35=3.0. Total 12.0/12 h, 4/4 weeks, ending 2026-10-30. Scheduled M5 video time matches the fetched durations: #2 + #16 = 23:21 (0.4 h scheduled), #14 = 8:24 (0.15 h). | — |
| url-reachability | PASS | 16 URLs fetched on 2026-10-02, all ok. This includes all 5 primaries, both YouTube companions (title and channel through oEmbed match 03), PostgreSQL join docs, Microsoft episodes 25 and 26, the Data School pandas series page (durations match 03), Colab, the SpocWeb repository and the three raw files. Problems with the content of the dataset files are reported under consistency. | — |
| prerequisite-order | PASS | W1: M1, M2. W2: M3. W3: M4, M5 part 1. W4: M5 part 2, then M6 (order stated). This satisfies M2←M1, M3←M2, M4←M1, M5←M4 and M6←M3,M5. | — |
| consistency | FAIL | Module ids and names are identical across 02-06. The ids E1.1-E6.1, K1-K4 and C1-C4 used in 06 exist in 04 and 05. All files use one dataset and one loading reference (03's Practice dataset). **But that reference is wrong.** Two separate fetches of each raw file give these line-by-line layouts. `orders.csv`: line 1 is `\P\ order_id … ship_country\`, lines 2-7 are `T`, `N`, `K`, `t` (FK table names), `c` (FK column names) and `#`, and data starts at line 8 (`V 10248 VINET 5 1996-07-04 …`). `order_details.csv` has the same 7-line preamble, with data from line 8 (`V 10248 11 14 12 0`). `customers.csv` starts with a BOM before `\P\`, then `K` and `#`, with data from line 4 (`V ALFKI …`). 03 states (lines 87, 104, 121, 123) that "Rows 2 and 3 are metadata rows (T and N)" in all three files and hard-codes `skiprows=[1, 2]`. In `orders`, the remaining `K`/`t`/`c`/`#` rows put `0` and blanks into `order_date`, so parsing fails and `orders["order_date"].min()` raises a TypeError. In `order_details`, `order_id` gets the text values `orders` and `order_id`, so the column becomes object dtype, while `orders.order_id` stays numeric. The merge that 04 E5.2, 05 C3 and the final require then fails ("merge on float64 and object columns"). Row counts become 834 and 3,4xx+4, so the E1.1 check "CSV equals SQL counts" fails. The Excel steps leave the same 4 junk rows in two of the files. The learner meets this in W1 (E1.1) and is blocked. | resource-researcher |
| structure | PASS | All six artifacts have the frontmatter keys and Summary / Content / Assumptions / Open Issues / Sources. Attempts are bumped (03, 04, 05 and 06 are at attempt 3). Hours and counts are given throughout. | — |
| requirements | PASS | The plan follows the learner's preference for short videos plus practice. The scheduled videos run about 17, 17, 8 and 32 min, and each is followed by an exercise. There is one checkpoint per week (C1, C2, C3A, then C3B with the final). Cost is 0 of 50 USD. Content is in English. The plan respects the scope exclusions, keeps company-database use read-only and includes no certification. | — |

### Findings
**FAIL items (actionable):**
- **resource-researcher / 03-resources.md / consistency.** Replace the fixed `skiprows=[1, 2]` approach with one that does not depend on how many metadata lines a file has: keep only rows whose marker is `V`. For example:
  ```python
  import csv, io
  import pandas as pd
  BASE = "https://raw.githubusercontent.com/SpocWeb/Northwind_csv/main/"
  def load_northwind(name, parse_dates=None):
      raw = pd.read_csv(BASE + name + ".csv", sep="\t", quoting=csv.QUOTE_NONE,
                        dtype=str, keep_default_na=False, encoding="utf-8-sig")
      raw = raw[raw.iloc[:, 0] == "V"].drop(columns=raw.columns[0])
      raw.columns = [c.rstrip("\\") for c in raw.columns]
      return pd.read_csv(io.StringIO(raw.to_csv(index=False)), parse_dates=parse_dates)
  ```
  The second `read_csv` re-infers numbers, dates and blanks as NaN. Also make these changes:
  - Correct the File layout row. `orders` and `order_details` have header + `T`, `N`, `K`, `t`, `c`, `#` (data from line 8). `customers` has a BOM, then header + `K`, `#` (data from line 4).
  - Rewrite the Excel instruction. In Data > From Text/CSV, choose Transform Data. Filter the first column (`\P\`) to the value `V`, remove that column, rename the last header to drop the trailing `\`, then Close & Load. Do not delete a fixed set of rows.
  - Keep the 830-order / 1996-07-04 to 1998-05-06 sanity line and add the expected `customers` count (91).
  - Have someone execute the snippet once if at all possible. If it cannot be run, say so in Open Issues, as attempt 3 did.

  04, 05 and 06 refer to the snippet and need no text change.

**Advisory (does not fail a gate):**
- 04 E5.1 step 2 still says "Because 03 notes that the three files use mixed header styles, rename every column that is not yet snake_case". 03 no longer says this, and the snippet already yields snake_case. The step is a harmless no-op, but 08 should present it as "confirm `df.columns`".
- 05 still has stale CamelCase remarks: the Dataset bullet says "rename any CamelCase column first", and Open Issues says "the orders CSV header is CamelCase per 03". 08 should not repeat them.
- 06 says the C4 practical (Q3 1997 by ship country) is "covered by the SQL part of the final". The final's SQL question is different (1997 by month and country, plus the top 10 customers). It is close enough for C7 evidence, but 08 should say "replaced by", not "covered by".
- 06 cuts the capstone to 3 of 5 questions, while 04's acceptance criterion says "All 5 questions" (carried over from rounds 1 and 2). 08 should show 3 as scheduled and 5 as the "if ahead" option.
- Video durations for Finer and Alex The Analyst still rest on secondary evidence; titles and channels are confirmed. The 0.3-0.4 h buffers in W1 and W2 absorb small deviations.
- PlayCode's Northwind table and column names are still unconfirmed. E1.1 starts with a schema query, which handles this.

### Verification log
`mcp__fetch__fetch` is not available in this validator session, so every URL was fetched with `WebFetch`, the documented fallback. All fetches were made on 2026-10-02.

| URL | Role | Status | Note |
|---|---|---|---|
| https://playcode.io/sql-playground | M1 primary, SQL host | ok | PostgreSQL and SQLite in the browser; Chinook and Northwind samples; free |
| https://dataschool.com/learn-sql/ | M2/M3 primary | ok | Basic: SELECT, FROM, ORDER BY, LIMIT. Mid-level: WHERE, aggregates, GROUP BY, JOINs, DATEs. SQLBox on live PostgreSQL |
| https://www.kaggle.com/learn/python | M4 primary | ok | "Learn Python Tutorials, Kaggle"; lesson list not rendered |
| https://pandas.pydata.org/docs/getting_started/index.html | M5 primary | ok | pandas 3.0.6; tutorials 1-10 (6 is summary statistics, 8 is combining tables) |
| https://pandas.pydata.org/docs/getting_started/comparison/comparison_with_sql.html | M6 primary | ok | SELECT, WHERE, GROUP BY, JOIN (inner, left, right, full), UNION, LIMIT, top-n |
| https://www.youtube.com/watch?v=kbKty5ZVKMY (oEmbed) | M2 companion | ok | "Learn Basic SQL in 15 Minutes, …1/3", Adam Finer - Learn BI |
| https://www.youtube.com/watch?v=lXQzD09BOH0 (oEmbed) | M3 companion | ok | "Joins in MySQL, Intermediate MySQL", Alex The Analyst |
| https://www.postgresql.org/docs/current/tutorial-join.html | M3 companion | ok | Section 2.6 of the PostgreSQL 18 docs; inner and left outer joins |
| https://learn.microsoft.com/en-us/shows/intro-to-python-development/python-for-beginners-25-of-44-collections | M4 companion | ok | Lists, arrays and dictionaries; updated 2021-11-16 |
| https://learn.microsoft.com/en-us/shows/intro-to-python-development/python-for-beginners-26-of-44-demo-collections | M4 companion | ok | Demo: collections, lists and dictionaries |
| https://www.dataschool.io/easier-data-analysis-with-pandas/ | M5 companion | ok | #2 8:54, #8 13:44, #14 8:24, #16 14:27 (match 03) |
| https://colab.research.google.com/ | M1 companion | ok | Google Colab; sign-in required |
| https://github.com/SpocWeb/Northwind_csv | Dataset repository | ok | 14 tables; README documents the schema but not the marker or metadata rows |
| https://raw.githubusercontent.com/SpocWeb/Northwind_csv/main/orders.csv | Dataset file | ok, layout differs from 03 | Lines 1-7: `\P\` header, then T, N, K, t, c, #; first data line 8 (`V 10248`); 830 `V` rows; last row 11077, 1998-05-06; no trailing `\` on data rows |
| https://raw.githubusercontent.com/SpocWeb/Northwind_csv/main/order_details.csv | Dataset file | ok, layout differs from 03 | Lines 1-7: `\P\` header, then T, N, K, t (`orders`, `products`), c, #; first data line 8 (`V 10248 11 14 12 0`) |
| https://raw.githubusercontent.com/SpocWeb/Northwind_csv/main/customers.csv | Dataset file | ok, layout differs from 03 | BOM + `\P\` header, then K and #; first data line 4 (`V ALFKI`); 91 `V` rows; apostrophes, no double quotes |

Not re-fetched in this round, because they are unscheduled alternatives or duration-source pages and were ok in earlier rounds: Aiven playground, pgtutorial.com, 10 minutes to pandas, pandas tutorial 8, pandas.read_sql, the 1-hour Python video, Empower Youth and IBL News.

## Assumptions
- `WebFetch` is accepted as the verification tool because the fetch MCP server is unavailable in this session.
- The file-layout finding rests on two independent fetches per file with different prompts, which gave the same line-by-line preamble. A summarizing fetch tool can drop lines but is unlikely to invent the `K`, `t`, `c` and `#` lines with plausible FK content (`customers`, `employees`, `shippers`). The failure behaviour of `skiprows=[1, 2]` is reasoned from pandas semantics, not executed.
- Folding C4 into the final does not fail coverage, as in rounds 1 and 2, because the final tests C7 for M6.
- The 5 % time-fit tolerance was not needed: every week is exactly 3.0 h.

## Open Issues
- This is round 3 of 3. Under the retry limit, a FAIL makes the run `failed`, so the coordinator writes `failure-report.md` and the synthesizer does not run. The fix is confined to one section of 03 (snippet, layout row, Excel steps). A manual or new-cycle fix of 03 followed by a 06 re-run should then pass.
- Neither the resource-researcher nor the validator can execute code. Someone should run the corrected snippet once in Colab before the plan is delivered.
- Transfer to the company database remains unverified within the plan. This is acceptable because company use is optional.

## Sources
- [PlayCode SQL Playground](https://playcode.io/sql-playground) — interactive, accessed 2026-10-02
- [Learn SQL: Interactive SQL Book (The Data School)](https://dataschool.com/learn-sql/) — interactive book, accessed 2026-10-02
- [Kaggle Learn: Python](https://www.kaggle.com/learn/python) — interactive course, accessed 2026-10-02
- [pandas Getting started tutorials](https://pandas.pydata.org/docs/getting_started/index.html) — docs, accessed 2026-10-02
- [pandas: Comparison with SQL](https://pandas.pydata.org/docs/getting_started/comparison/comparison_with_sql.html) — docs, accessed 2026-10-02
- [Learn Basic SQL in 15 Minutes (Adam Finer - Learn BI)](https://www.youtube.com/watch?v=kbKty5ZVKMY) — video, accessed 2026-10-02
- [Joins in MySQL - Intermediate MySQL (Alex The Analyst)](https://www.youtube.com/watch?v=lXQzD09BOH0) — video, accessed 2026-10-02
- [PostgreSQL docs: 2.6 Joins Between Tables](https://www.postgresql.org/docs/current/tutorial-join.html) — docs, accessed 2026-10-02
- [Python for Beginners [25 of 44] Collections](https://learn.microsoft.com/en-us/shows/intro-to-python-development/python-for-beginners-25-of-44-collections) — video page, accessed 2026-10-02
- [Python for Beginners [26 of 44] Demo: Collections](https://learn.microsoft.com/en-us/shows/intro-to-python-development/python-for-beginners-26-of-44-demo-collections) — video page, accessed 2026-10-02
- [Easier data analysis in Python with pandas (Data School)](https://www.dataschool.io/easier-data-analysis-with-pandas/) — video series page, accessed 2026-10-02
- [Google Colab](https://colab.research.google.com/) — interactive, accessed 2026-10-02
- [SpocWeb/Northwind_csv](https://github.com/SpocWeb/Northwind_csv) — dataset repository, accessed 2026-10-02
- [Northwind orders.csv (raw)](https://raw.githubusercontent.com/SpocWeb/Northwind_csv/main/orders.csv) — dataset file, accessed 2026-10-02
- [Northwind order_details.csv (raw)](https://raw.githubusercontent.com/SpocWeb/Northwind_csv/main/order_details.csv) — dataset file, accessed 2026-10-02
- [Northwind customers.csv (raw)](https://raw.githubusercontent.com/SpocWeb/Northwind_csv/main/customers.csv) — dataset file, accessed 2026-10-02

```json
{
  "overall": "FAIL",
  "failures": [
    { "agent": "resource-researcher", "artifact": "03-resources.md", "gate": "consistency",
      "reason": "The canonical load_northwind() snippet and the Excel instruction assume 2 metadata rows (T, N) in every file, but orders.csv and order_details.csv have 6 (T, N, K, t, c, #; data from line 8) and customers.csv has 2 (K, #) plus a UTF-8 BOM. With skiprows=[1, 2], the K/t/c/# rows stay in the data, order_date fails to parse, the 830-row sanity print raises an error, and order_details.merge(orders, on='order_id') (used by 04 E5.2, 05 C3 and the final) fails on float vs object keys. Replace the fixed skiprows with a marker filter: read with sep='\\t', quoting=csv.QUOTE_NONE, dtype=str, keep_default_na=False, encoding='utf-8-sig'; keep rows where the first column == 'V'; drop that column; rstrip('\\\\') the column names; re-read through io.StringIO(df.to_csv(index=False)) to restore types and dates. Correct the File layout row, and change the Excel steps to Power Query: filter the first column to 'V', remove it, and fix the last header. Keep the 830-order / 1996-07-04 to 1998-05-06 check and add customers = 91." }
  ],
  "notes": "Round 3 of 3. coverage, time-fit (12.0/12 h, 3.0 h per week), url-reachability (16 URLs ok, all 5 primaries), prerequisite-order, structure and requirements pass. The round-2 failures in 04 (dead repository) and 05 (order_lines.csv) are fixed. 04, 05 and 06 refer to the 03 snippet and need no text change; schedule-planner re-runs only as a dependent. Advisories: stale CamelCase or mixed-header remarks in 04 E5.1 and 05, and the 3-vs-5 capstone questions."
}
```
