---
artifact: 01-requirements.md
agent: requirements-formalizer
run_id: run-02-sql-pandas-business-analysis
attempt: 1
depends_on: []
status: complete
sources_used: 0
---

# Requirements: SQL and pandas for business analysis

## Summary
The learner is an Excel power user with no programming experience who wants to answer business questions independently using PostgreSQL SQL and Python/pandas on CSV exports and the company database. The window is 4 weeks (2026-10-02 to about 2026-10-30) at 3 h/week, giving a total budget of 12 hours. Paid resources are allowed up to 50 USD total. Learning is video plus practice, with checkpoints wanted and no certification. Research mode is standard.

## Content

### Learner goal and target outcome
**Goal:** By 2026-10-30, the learner can independently answer a typical business question (for example, "revenue by month and region, top 10 customers, and churned customers") by (a) writing a PostgreSQL query using SELECT, WHERE, GROUP BY/aggregates, ORDER BY and JOINs, and (b) loading a CSV in pandas and producing the same kind of result using filtering, groupby, merge and a simple export or chart, without step-by-step guidance.

**Context:** The learner wants to move from Excel-only analysis to reproducible analysis of CSV exports and the company PostgreSQL database, so they can answer their own business questions without waiting on others.

### Current knowledge and experience
| Area | Level | Evidence from the input |
|---|---|---|
| Excel (tables, formulas, pivots) | strong | "Excel power user" |
| Data and business-question thinking | working | Power-user context; wants to answer business questions (inferred) |
| SQL | none | "no programming experience (no SQL, no Python)" |
| Python | none | Same statement |
| pandas | none | Same statement |
| PostgreSQL / database access | none | No programming experience; the company database is named only as a target |
| Command line / dev tooling | none | No programming experience (inferred) |

### Constraints
| Constraint | Value |
|---|---|
| Hours per week | 3 |
| Duration | 4 weeks (start 2026-10-02, end about 2026-10-30) |
| **Total hour budget** | **12 h (3 h/week x 4 weeks)** |
| Money budget | Up to 50 USD total for paid resources; free resources preferred where equivalent |
| Language | English (assumed; the request is in English) |
| Tooling and platform | Target database is PostgreSQL; Python with pandas; the platform is not stated, so the learner's setup effort counts against the 12 h |
| Data access | Read access to the company PostgreSQL database assumed; otherwise use a public sample database |

### Preferences
- **Learning style and formats:** a mix of short videos and hands-on practice.
- **Pace:** steady 3 h/week; the total is small, so sessions should be focused with little setup overhead.
- **Checkpoints:** wanted, to check progress during the 4 weeks.
- **Avoid:** long lecture-only courses, theory-heavy material, and anything that needs a certification track.
- **Analogies:** the learner's strong Excel background can be used (pivot to GROUP BY, VLOOKUP to JOIN) but is not a stated preference.

### Scope
**In scope**
- PostgreSQL querying: SELECT, WHERE, ORDER BY/LIMIT, aggregates and GROUP BY/HAVING, INNER/LEFT JOIN.
- Python basics needed for pandas: running code, variables, lists/dicts, and reading simple code.
- pandas: read_csv, inspecting data, filtering, selecting columns, groupby/aggregation, merge, basic cleaning (missing values, types, dates), export, and a simple chart.
- Translating a business question into a query or pandas steps, and sanity-checking the result.
- Connecting to PostgreSQL from Python only if the 12 h budget allows (to be decided in later artifacts).

**Out of scope**
- Certification preparation.
- Database administration, schema design, indexing and performance tuning.
- Advanced SQL (window functions, CTEs, recursive queries, stored procedures) unless the budget leaves room.
- Machine learning, statistics beyond descriptive aggregates, and advanced visualization or BI tools.
- Writing to or modifying the production database (read-only analysis).
- General software engineering (packaging, testing, version control).

### Success criteria
1. The learner writes, without help, a PostgreSQL query on a multi-table sample dataset that joins at least 2 tables, filters, aggregates with GROUP BY and sorts, and the result matches a reference answer.
2. The learner loads a CSV in pandas and answers a business question using filter, groupby and merge, and the result matches a reference answer.
3. The learner solves the same business question in both SQL and pandas and explains in one or two sentences how the two approaches correspond.
4. The learner passes each checkpoint with at least 70% (threshold to be set in the assessments) by week 4, with at least one checkpoint in each of weeks 1 to 4 or at an equivalent cadence.
5. The learning path totals no more than 12 h of planned activity (3 h per week) and ends by 2026-10-30.
6. The total cost of paid resources is at most 50 USD, and every resource is verified as reachable.

### Workflow options
| Option | Value |
|---|---|
| Assessments wanted | yes (checkpoints to check progress) |
| Certification target | none |
| Research mode | standard (paid resources allowed up to 50 USD; not free-only) |

## Assumptions
- Language is English, because the request is written in English.
- The 4-week period runs from 2026-10-02 and ends about 2026-10-30, and the schedule uses weeks of 3 h each with no buffer weeks.
- Environment setup (installing or opening Python and a SQL client, or using a browser-based option) counts against the 12 h, which is the conservative reading.
- The learner has read access to the company PostgreSQL database; if not, a public sample database is used for practice.
- Accuracy checks for "independently" in the goal use sample datasets with reference answers, not live company data.
- The 70% checkpoint pass mark is a proposed default, not stated by the learner.
- The company-database connection from Python is optional and depends on the remaining time budget.

## Open Issues
- 12 h is tight for two new tools from zero. Later artifacts must prioritize core skills and may need to trim pandas or SQL breadth.
- Operating system, Python installation rights and database access are unknown. These could consume setup time on a managed machine.
- The company database schema is unknown, so transfer from the sample database to the real one is not verified within this plan.

## Sources
- none (derived from inputs)
