---
artifact: 02-assessment.md
agent: knowledge-assessor
run_id: run-02-sql-pandas-business-analysis
attempt: 1
depends_on: [requirements-formalizer]
status: complete
sources_used: 0
---

# Knowledge Assessment: SQL and pandas for business analysis

## Summary
The learner is a strong Excel user with no SQL, Python or pandas, so almost every target competency is a full gap, while spreadsheet and business-question thinking transfer well. Six modules (M1-M6) cover setup, SQL basics, SQL aggregation and joins, Python basics, pandas, and an integrated question-to-answer module. Planned module time is 10.25 h against a 12 h budget, leaving 1.75 h (about 15 %) for practice and checkpoints. Biggest gap: programming concepts (Python and pandas) from zero. The SQL track is front-loaded because it maps most directly onto Excel pivots and lookups.

## Content

### Target competency map
| ID | Competency | Why it matters for the goal | Target level |
|---|---|---|---|
| C1 | Working environment (SQL client, notebook, CSV loading) | Nothing else can be practised without it; setup counts against the 12 h | Can run queries and code unaided |
| C2 | SQL retrieval: SELECT, WHERE, ORDER BY, LIMIT | Foundation of every query on the company database | Writes from scratch |
| C3 | SQL aggregation: GROUP BY, HAVING, aggregates, date truncation | Core of "revenue by month and region" questions | Writes from scratch |
| C4 | SQL joins (INNER, LEFT) across 2-3 tables | Business data is spread over tables; the VLOOKUP equivalent | Writes and checks row counts |
| C5 | Python basics: variables, types, lists/dicts, calling functions, reading errors | Required to use pandas at all | Reads and edits short scripts |
| C6 | pandas core: read_csv, inspect, filter, select, groupby, merge, clean, export, simple chart | Answers questions on CSV exports | Writes from scratch with docs open |
| C7 | Question-to-analysis translation and result sanity-checking | Makes the work independent, the stated goal | Solves the same question in SQL and pandas |
| C8 | Connect Python to PostgreSQL (read-only) | Optional link between both tools | Awareness only; run one provided example |

### Current-state mapping
| Competency | Current level (from 01) | Gap | Transferable knowledge |
|---|---|---|---|
| C1 | none (dev tooling) | full | Comfort with desktop software; CSV files opened in Excel |
| C2 | none | full | Excel filters and sorting, table and column thinking |
| C3 | none | full | Pivot tables map directly to GROUP BY plus aggregates; SUMIFS/COUNTIFS |
| C4 | none | full | VLOOKUP/XLOOKUP and Power Query merges map to JOIN |
| C5 | none | full | Formula logic, cell references and function arguments carry over as ideas |
| C6 | none | full | Pivots, filters and cleaning steps map to groupby, boolean filters, fillna |
| C7 | working | partial | Business-question framing and manual cross-checking from Excel |
| C8 | none | full | None beyond knowing that the database exists |

### Prioritized gaps
1. C2 and C3 (SQL retrieval and aggregation): fastest route to answering real questions on the company database, and closest to pivots.
2. C4 (joins): needed for any multi-table question; the most common beginner error source.
3. C1 (environment): a blocker for everything, but must be kept to under an hour.
4. C5 (Python basics): minimal subset only, a prerequisite for pandas.
5. C6 (pandas core): the second main outcome; covers CSV exports.
6. C7 (question translation and sanity checks): ties both tools together and proves independence.
7. C8 (Python to PostgreSQL): last and optional; drop first if time runs short.

### Prerequisite order
- M2 requires M1
- M3 requires M2
- M4 requires M1
- M5 requires M4 (and benefits from M3, since groupby and merge reuse the SQL concepts)
- M6 requires M3 and M5
- M4 may run before or after M2/M3; the recommended order is M1, M2, M3, M4, M5, M6 for concept reuse

### Module list
| Module | Name | Competencies | Prerequisites | Est. hours | Difficulty |
|---|---|---|---|---|---|
| M1 | Setup and data orientation (sample database, browser SQL client, notebook) | C1 | none | 0.75 | easy |
| M2 | SQL basics: SELECT, WHERE, ORDER BY, LIMIT | C2 | M1 | 1.5 | easy |
| M3 | SQL aggregation and joins | C3, C4 | M2 | 2.5 | medium |
| M4 | Python basics for data work | C5 | M1 | 1.25 | medium |
| M5 | pandas core: load, filter, groupby, merge, clean, chart | C6 | M4 | 3.0 | medium |
| M6 | From business question to answer: SQL plus pandas, sanity checks, optional database connection | C7, C8 | M3, M5 | 1.25 | medium |

Total module time: 10.25 h. Budget: 12 h (3 h/week x 4 weeks). The remaining 1.75 h (14.6 %) is reserved for practice and checkpoints, so the plan fits.

### Starting level and self-check
| Module | Starting level | Start here? |
|---|---|---|
| M1 | none | yes, begin here |
| M2 | none | yes, after M1 |
| M3 | none | after M2 |
| M4 | none | after M3 (or M1) |
| M5 | none | after M4 |
| M6 | working on the question-framing part, none on the technical part | last |

The learner starts at M1. Self-check questions confirm that nothing can be skipped:

1. Which Excel feature is closest to SQL `GROUP BY`? Answer: a pivot table (rows = grouping columns, values = aggregates).
2. What does `SELECT region, SUM(amount) FROM sales GROUP BY region;` return? Answer: one row per region with that region's total amount.
3. What is the difference between INNER JOIN and LEFT JOIN? Answer: INNER keeps only matching rows; LEFT keeps all left rows and fills unmatched right columns with NULL.
4. In Python, what does `x = [1, 2, 3]` create, and what does `x[0]` return? Answer: a list; `1` (indexing starts at 0).
5. In pandas, how do you keep only rows where `amount > 100` in a DataFrame `df`? Answer: `df[df["amount"] > 100]`.

If the learner answers 1-2 correctly but not 3-5, start at M3 skipping M2 only after a quick M2 checkpoint. A fully correct set means that this learner profile does not apply and the path should be re-planned.

## Assumptions
- The learner has no prior SQL or Python, as stated in 01; Excel strength is used for analogies.
- A browser-based SQL client and notebook (no local install) is acceptable, to keep M1 under 1 h; this is a design choice for later artifacts.
- Hour estimates assume short videos plus guided practice, with an average of about 40 % of module time on hands-on exercises.
- A public sample database is used for practice when company access is unavailable or unsafe for learning.
- C8 is treated as awareness only (one provided example), consistent with 01 scope.

## Open Issues
- Hours are tight: if setup on a managed machine takes longer than 0.75 h, drop C8 first, then reduce M6.
- Company schema is unknown, so transfer to the real database is untested; M6 should include a short schema-exploration step.
- Plan assumes 3 h/week are used without buffer weeks; any missed week removes about 25 % of the plan.

## Sources
- none (derived from inputs)
