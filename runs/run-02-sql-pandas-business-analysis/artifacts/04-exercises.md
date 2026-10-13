---
artifact: 04-exercises.md
agent: practice-designer
run_id: run-02-sql-pandas-business-analysis
attempt: 3
depends_on: [knowledge-assessor]
status: complete
sources_used: 2
---

# Practice Plan: SQL and pandas for business analysis

## Summary
Eleven short exercises (E1.1-E6.1) and one capstone, "Northwind Sales Review: five business questions answered in SQL and pandas", cover modules M1-M6. All work uses the Northwind dataset defined in the Practice dataset section of 03 (SQL in PlayCode, CSV files for Excel and pandas, loaded with the snippet given there). Revenue is defined once as unit_price * quantity * (1 - discount). Dedicated practice totals 1.75 h: 1.25 h of exercises plus 0.5 h of capstone, matching the 1.75 h (14.6 %) reserve in 02. Every exercise output is reused in the capstone, which is the independent-analysis outcome the learner asked for.

## Content

### Practice principles
- Practice follows each short video or tutorial: do the matching exercise straight away, within the same 3 h weekly session.
- Every task starts from an Excel equivalent (pivot, VLOOKUP, filter). The learner first predicts the result, then runs the query or code; a mismatch is the learning moment.
- Feedback loop: each exercise has a self-check (a count or total to compare with a second method), plus the checkpoints in 05-assessments.
- Data: only the dataset and files named in 03 › Practice dataset (Northwind in the PlayCode SQL Playground for SQL; the three CSV files for Excel and Colab). Company data is used only in the optional M6 step, read-only, if access is allowed.
- Shared names and definitions, used in every exercise: snake_case columns `order_id, customer_id, order_date, ship_country, product_id, unit_price, quantity, discount, company_name, country`; `revenue = unit_price * quantity * (1 - discount)` from order_details; "latest date" = `MAX(order_date)` in orders. Date filters are always relative to that latest date (e.g. "last 90 days before the latest date"), never to today, because Northwind covers only 1996-1998.
- If an exercise runs more than 50 % over its estimate, take the hint and move on; skip steps marked optional first.

### Exercises by module

#### M1 — Setup and data orientation
| Field | E1.1 Open the tools and explore Northwind |
|---|---|
| Objective | C1: run a query and a notebook cell unaided |
| Steps | 1. Open the PlayCode SQL Playground, load the Northwind sample, and open a Colab notebook. 2. Run `SELECT * FROM <table> LIMIT 10` on orders, order_details and customers (confirm the table names with a schema query first, as 03 advises). 3. Write down table names, row counts and key columns (order_id, customer_id) like Excel sheets and ID columns. 4. Download orders.csv, order_details.csv and customers.csv from the links in 03 › Practice dataset only, using the delimiter stated there for Excel (Data > From Text/CSV) and, in Colab, load the files with the snippet in 03 › Practice dataset. Check that the row counts equal the SQL counts. 5. Run `SELECT MIN(order_date), MAX(order_date) FROM orders` and record the range (03 gives the expected range). 6. Choose the 5 business questions for the capstone (K1). |
| Deliverable | `schema-notes.md` (tables, keys, row counts, date range, revenue definition) and `questions.md` (5 questions in plain language) |
| Est. hours | 0.15 |
| Difficulty | easy |
| Self-check | Both tools run without errors, CSV and SQL row counts agree per table, and each question names the tables it needs |

#### M2 — SQL basics: SELECT, WHERE, ORDER BY, LIMIT
| Field | E2.1 Rebuild Excel filters in SQL |
|---|---|
| Objective | C2: write retrieval queries from scratch |
| Steps | 1. In Excel on orders.csv (no join yet), do 4 filter-and-sort tasks, e.g. orders shipped to one ship_country, orders in a given month, orders in the last 90 days before the latest order_date, orders with an empty shipped date. 2. Write each as SELECT with WHERE and ORDER BY on the orders table. 3. Combine conditions with AND/OR and use IN, BETWEEN, LIKE. 4. Handle NULL with IS NULL once. 5. Write one query on order_details for lines with discount > 0 ordered by revenue (the shared revenue formula as a computed column). 6. (Optional) pgexercises "Basic" problems for repetition. |
| Deliverable | `m2-queries.sql` with 6 commented queries |
| Est. hours | 0.2 |
| Difficulty | easy |
| Self-check | The row count of each orders query equals the count from the same filter in Excel on orders.csv |

#### M3 — SQL aggregation and joins
| Field | E3.1 Pivot table in SQL |
|---|---|
| Objective | C3: write GROUP BY queries from scratch |
| Steps | 1. Join-free first: in Excel, add a revenue column to order_details.csv and pivot revenue by order_id (or product_id). 2. Write the same as `GROUP BY` with `SUM`, `COUNT`, `AVG` on order_details. 3. Then compute revenue by month: join orders to order_details and group by `date_trunc('month', order_date)`. 4. Add `HAVING` to keep months above a threshold. 5. Compare totals with the pivot. |
| Deliverable | `m3-aggregation.sql` (4 queries) |
| Est. hours | 0.25 |
| Difficulty | medium |
| Self-check | The grand total of revenue in SQL (by product and by month) equals the Excel pivot grand total to the cent |

| Field | E3.2 VLOOKUP as JOIN |
|---|---|
| Objective | C4: join 2-3 tables and verify row counts |
| Steps | 1. Join orders to customers on customer_id with `INNER JOIN`; note the row count. 2. Change to `LEFT JOIN` and explain any difference in count (compare with the orders count from E1.1). 3. Add order_details as the third table and aggregate revenue by customers.country. 4. Compare the row count of orders JOIN order_details with the order_details count, and explain it. 5. Check for duplicated revenue by comparing the joined total with the order_details-only total from E3.1. |
| Deliverable | `m3-joins.sql` (3 queries) with a one-line note on each row count |
| Est. hours | 0.2 |
| Difficulty | medium |
| Self-check | The LEFT JOIN count is at least the INNER JOIN count, and the joined revenue total equals the order_details-only total |

#### M4 — Python basics for data work
| Field | E4.1 Python for Excel users |
|---|---|
| Objective | C5: read and edit a short script |
| Steps | 1. In Colab, create variables for unit_price, quantity and discount and compute one line's revenue with the shared formula. 2. Make a list of 5 line revenues and a dict of country to order count. 3. Loop over the list to compute a sum and compare it with `sum()`. 4. Trigger one error on purpose (typo, wrong index) and read the message. 5. Fix a provided 6-line broken script. |
| Deliverable | `m4-basics.ipynb` |
| Est. hours | 0.1 |
| Difficulty | medium |
| Self-check | The notebook runs top to bottom with no errors and the fixed script prints the expected values |

#### M5 — pandas core
| Field | E5.1 From CSV to a clean table |
|---|---|
| Objective | C6: load, inspect, filter and clean a CSV |
| Steps | 1. Load orders.csv, order_details.csv and customers.csv with the snippet in 03 › Practice dataset (it handles the delimiter and the stray first header field documented there); check `head()`, `info()`, `describe()`. 2. Because 03 notes that the three files use mixed header styles, rename every column that is not yet snake_case so the names are exactly order_id, customer_id, order_date, ship_country (orders); order_id, product_id, unit_price, quantity, discount (order_details); customer_id, company_name, country (customers); confirm with `df.columns`. 3. Filter orders with a boolean condition and select columns. 4. Fix dates with `pd.to_datetime`, handle missing values (e.g. shipped date) with `fillna` or `dropna`. 5. Repeat the E2.1 filters, including the "last 90 days before the latest order_date" one, using `orders["order_date"].max()`. |
| Deliverable | `m5-clean.ipynb` |
| Est. hours | 0.15 |
| Difficulty | medium |
| Self-check | Column names match the list above, and filtered row counts match the E2.1 results exactly |

| Field | E5.2 groupby and merge |
|---|---|
| Objective | C6: groupby, merge, simple chart and export |
| Steps | 1. Add a `revenue` column to order_details with the shared formula; repeat the E3.1 aggregation with `groupby` and `agg`. 2. Merge orders with order_details (`on="order_id"`) and with customers using `merge(how="left")` on customer_id. 3. Plot revenue by month with `.plot()`. 4. Export the monthly result with `to_csv`. |
| Deliverable | `m5-groupby-merge.ipynb` and `revenue_by_month.csv` |
| Est. hours | 0.1 |
| Difficulty | medium |
| Self-check | pandas monthly totals equal the E3.1 SQL totals, and the merged row count equals the E3.2 joined count |

#### M6 — From business question to answer
| Field | E6.1 One question, two tools |
|---|---|
| Objective | C7 (and C8 awareness): same question in SQL and pandas, then sanity-check |
| Steps | 1. Take one new question not used before: top 5 customers (company_name) by revenue in the last 90 days before the latest order_date. 2. Answer it in SQL (orders, order_details, customers). 3. Answer it in pandas on the CSV files loaded as in E5.1. 4. Run three sanity checks: total revenue, row counts, and a spot check of one customer's revenue in Excel. 5. (Optional) run the provided example that reads a query into pandas with `pd.read_sql` (C8). |
| Deliverable | `m6-two-tools.md` (query, code, results, checks) |
| Est. hours | 0.1 |
| Difficulty | medium |
| Self-check | Both tools give the same top 5 and figures, and the three sanity checks are written down |

### Capstone project

**Title:** Northwind Sales Review: five business questions answered in SQL and pandas

**Description:** Using the Northwind dataset from 03 › Practice dataset (PlayCode SQL Playground for SQL, the matching CSV files in Colab for pandas), answer the 5 business questions chosen in E1.1. Suggested set: revenue by month, top 10 customers by revenue, revenue by customer country, orders without a customer match (LEFT JOIN check), and month-on-month revenue change. Revenue is always `unit_price * quantity * (1 - discount)`; any "recent" period is relative to `MAX(order_date)`. Each question is answered in SQL and in pandas, the results are reconciled, and a one-page summary is written for a non-technical reader. If company access is allowed, the learner runs the schema-exploration step and one question on the company PostgreSQL database, read-only.

**Milestones**
| Milestone | Module | Work | Hours |
|---|---|---|---|
| K1 Questions and schema notes | M1 | Reuse E1.1; check that each question is answerable from the three tables | 0.05 |
| K2 SQL answers | M3 | Write 5 queries, reusing E2.1, E3.1, E3.2 | 0.10 |
| K3 pandas answers | M5 | Reproduce the 5 answers in a notebook, reusing E5.1, E5.2 | 0.10 |
| K4 Reconcile and report | M6 | Reconcile SQL vs pandas, write the one-page summary, optional company-database run | 0.25 |

**Deliverables:** `questions.md`, `capstone.sql`, `capstone.ipynb`, `summary.md` (one page: question, answer, method, checks).

**Acceptance criteria**
- All 5 questions have an answer in both SQL and pandas, and the figures match (or the difference is explained).
- Revenue uses the stated formula in every answer, and date filters are relative to the dataset's latest order_date.
- At least one query joins 2 or more tables, and its row count is explained.
- Each answer has at least one sanity check (total, count or Excel spot check).
- The notebook runs top to bottom without errors from a fresh start.
- The summary can be read without knowing SQL or Python.

**Est. hours:** 0.5 dedicated (plus reuse of exercise outputs; the capstone work happens in the M6 module slot).

### Hours summary
Budget 12 h; practice share about 15 % = 1.8 h; planned practice 1.75 h (14.6 %), as reserved in 02.

| Module | Exercise hours | Capstone share | Total |
|---|---|---|---|
| M1 | 0.15 | 0.05 | 0.20 |
| M2 | 0.20 | 0.00 | 0.20 |
| M3 | 0.45 | 0.10 | 0.55 |
| M4 | 0.10 | 0.00 | 0.10 |
| M5 | 0.25 | 0.10 | 0.35 |
| M6 | 0.10 | 0.25 | 0.35 |
| **Total** | **1.25** | **0.50** | **1.75** |

## Assumptions
- Exercise hours are the dedicated practice time inside the 1.75 h reserve of 02; the guided hands-on part of each module (about 40 % of module time) is already counted in the module hours.
- Checkpoint time is owned by 05-assessments and the schedule; it is assumed to fit in module time or the schedule slack.
- The database, the CSV files, their delimiter and the pandas loading snippet are exactly those in 03 › Practice dataset; this artifact adds no other data source. Column names are the snake_case set in Practice principles; the rename step in E5.1 maps the files' mixed header styles (documented in 03) to that set.
- Northwind order dates span 1996-1998, so "recent" is defined from the dataset's own latest order_date.
- Company database use is optional and depends on the learner's access and policy.

## Open Issues
- Practice time is very small (1.75 h); exercises are intentionally minimal and rely on the learner reusing their own outputs.
- Capstone work is mostly placed in M6, so a missed final week removes the capstone; the schedule should protect that slot.
- PlayCode's Northwind table and column names are not confirmed in 03, so E1.1 step 2 starts with a schema query; its row counts may differ slightly from the CSV files, and E1.1 step 4 records any difference before later checks rely on it.
- PlayCode's documentation does not show a CSV export, so CSVs come from the repository named in 03, not from PlayCode.

## Sources
- [PostgreSQL Exercises](https://pgexercises.com/) — practice platform (browser, PostgreSQL, immediate feedback), via web search result, accessed 2026-10-02
- [SQLBolt](https://sqlbolt.com/) — practice platform (browser, SQLite, lesson-based), via web search result, accessed 2026-10-02
