---
artifact: 05-assessments.md
agent: assessment-designer
run_id: run-02-sql-pandas-business-analysis
attempt: 3
depends_on: [knowledge-assessor]
status: complete
sources_used: 0
---

# Assessments: SQL and pandas for business analysis

## Summary
Four short checkpoints (C1-C4) and one final assessment prove progress toward the goal. They fall after M2, M3, M5 and M6 in weeks 1 to 4, which meets the "one checkpoint per week" criterion in 01. Checkpoints take 15-20 min each and the final takes 30 min, so assessment totals 1.58 h, inside the 1.75 h reserve in 02. The pass mark is 70% on each quiz and every "pass" level on each practical rubric. SQL tasks use Northwind in PlayCode; pandas tasks use the Northwind CSV files (orders, order_details, customers) from 03, with order lines built by a merge inside the task. No certification is targeted.

## Content

### Assessment strategy
- Cadence: C1 after M2 (week 1), C2 after M3 (week 2), C3 after M5 (week 3 or 4, covering M4 and M5), C4 after M6 (week 4), then the final assessment in week 4. M1 and M4 are short and are covered by the next checkpoint.
- Format: a closed-notes quiz of 5-6 questions (about 5 min) plus one practical task: SQL tasks in the PlayCode Northwind playground, pandas tasks in a notebook on the Northwind CSV files (docs and search allowed for syntax). Answers are self-checked against the keys below.
- Pass threshold: at least 70% of the quiz (4 of 5, or 4 of 6 as written per checkpoint) AND every "pass" level in the rubric. On a miss, review the named module section (about 15 min) and retry once with a variation of the practical (change the country or date range).
- Dataset (Northwind): SQL side `customers(customer_id, company_name, contact_name, city, region, country, ...)`, `orders(order_id, customer_id, employee_id, order_date, shipped_date, freight, ship_city, ship_region, ship_country, ...)`, `order_details(order_id, product_id, unit_price, quantity, discount)`. Revenue per order line = `unit_price * quantity * (1 - discount)`; there is no amount column. Orders run from July 1996 to May 1998, so all date filters use 1996-1998. Region columns are mostly NULL, so country (`customers.country` or `orders.ship_country`) is the geographic dimension. Run `SELECT * FROM orders LIMIT 5;` first and adjust names if the playground build differs.
- pandas side: load `orders`, `order_details` and `customers` with the snippet in 03 > Practice dataset. Use the snake_case names `order_id, customer_id, order_date, ship_country, product_id, unit_price, quantity, discount, company_name, country` (rename any CamelCase column first, as M5 teaches). Build order lines inside the task with `order_details.merge(orders, on="order_id")`, then add `customers` with a merge on `customer_id` when `company_name` or `country` is needed.

### Checkpoints

#### C1 — after M2
**Competencies tested:** C1 (environment), C2 (SQL retrieval).

**Quiz (5 questions)**
1. (Recall) Which clause filters rows before they are returned, and which sorts them? Answer: WHERE filters; ORDER BY sorts.
2. (Recall) What does `LIMIT 10` do, and why is it paired with `ORDER BY ... DESC` for "top 10"? Answer: it returns the first 10 rows; without ORDER BY the order is not defined, so "top" would be arbitrary.
3. (Applied) Write a query returning `order_id`, `customer_id` and `order_date` of orders placed after 1997-12-31, newest first. Answer: `SELECT order_id, customer_id, order_date FROM orders WHERE order_date > '1997-12-31' ORDER BY order_date DESC;`
4. (Applied) `SELECT * FROM customers WHERE country = Germany;` fails. Why? Answer: the text value needs single quotes, `'Germany'`; unquoted, Germany is read as a column name.
5. (Applied) How do you list orders that have not shipped yet (`shipped_date` missing)? Answer: `WHERE shipped_date IS NULL`; `= NULL` never matches.

**Practical (about 8 min):** From `orders`, list `order_id`, `ship_country` and `freight` for orders shipped to Germany or France with freight over 100, placed in 1997, highest freight first, 15 rows at most.

| Criterion | Pass | Strong |
|---|---|---|
| Correct columns and filter | Right columns; freight filter and 1997 date range correct (`order_date >= '1997-01-01' AND order_date < '1998-01-01'`) | Country test written with `IN ('Germany','France')`, or with parentheses around OR combined with AND |
| Ordering and limit | `ORDER BY freight DESC LIMIT 15` | Also states why ties could change the output |
| Result check | Row count plausible (15 or fewer rows, all freight above 100, all dates in 1997) | Cross-checks with `SELECT COUNT(*)` for the same filter |

**Pass criterion:** 4 of 5 quiz answers and all "pass" rubric cells. **Est. time:** 15 min.

#### C2 — after M3
**Competencies tested:** C3 (aggregation), C4 (joins).

**Quiz (6 questions)**
1. (Recall) Which Excel feature corresponds to GROUP BY? Answer: a pivot table.
2. (Recall) Difference between WHERE and HAVING? Answer: WHERE filters rows before grouping; HAVING filters groups after aggregation.
3. (Applied) Write a query for the number of customers per country, largest first. Answer: `SELECT country, COUNT(*) AS customers FROM customers GROUP BY country ORDER BY customers DESC;`
4. (Applied) Write a query for revenue per month. Answer: `SELECT DATE_TRUNC('month', o.order_date) AS month, SUM(od.unit_price * od.quantity * (1 - od.discount)) AS revenue FROM orders o JOIN order_details od ON od.order_id = o.order_id GROUP BY 1 ORDER BY 1;`
5. (Applied) You want every customer with their order count, including customers who never ordered. Which join? Answer: `customers LEFT JOIN orders ON orders.customer_id = customers.customer_id` with `COUNT(orders.order_id)`; an INNER JOIN would drop customers with no orders.
6. (Applied) After joining `orders` to `order_details`, you count orders per customer with `COUNT(o.order_id)` and the numbers are far too high. Why, and what fixes it? Answer: each order has several detail lines, so order rows repeat (join fan-out); use `COUNT(DISTINCT o.order_id)` or aggregate order_details first. Check row counts before and after the join.

**Practical (about 8 min):** Return the top 5 customers by total revenue in 1997, showing `company_name`, number of orders and total revenue (revenue = `unit_price * quantity * (1 - discount)`, summed over order_details).

| Criterion | Pass | Strong |
|---|---|---|
| Join | `customers` to `orders` to `order_details` on the correct keys | Chooses join type deliberately and can say why |
| Aggregation | `SUM` of the revenue expression and `COUNT(DISTINCT order_id)` with correct GROUP BY | Uses aliases and `ROUND(..., 2)` for readable output |
| Filter and ordering | 1997 filter in WHERE on `order_date`, top 5 by revenue | Date filter written as a range (>= and <) |
| Sanity check | Compares the sum of all 1997 revenue (no customer grouping, same join) with a total computed by a separate query, and confirms the top 5 sum is smaller | Explains any difference and checks the order count against `SELECT COUNT(*) FROM orders` for 1997 |

**Pass criterion:** 4 of 6 quiz answers and all "pass" rubric cells. **Est. time:** 15 min.

#### C3 — after M5
**Competencies tested:** C5 (Python basics), C6 (pandas core). Covers M4 and M5.

**Quiz (6 questions)**
1. (Recall) What does `x = [10, 20, 30]` create, and what is `x[1]`? Answer: a list; 20.
2. (Recall) What do `df.head()` and `df.info()` tell you? Answer: head shows the first rows; info shows columns, types and non-null counts.
3. (Applied) Write pandas to keep order lines where `quantity > 20` and `ship_country == "Germany"`. Answer: `df[(df["quantity"] > 20) & (df["ship_country"] == "Germany")]`; parentheses and `&` are required.
4. (Applied) Write pandas for total quantity per ship country. Answer: `df.groupby("ship_country")["quantity"].sum()` (optionally `.reset_index()`).
5. (Applied) Which pandas call is the equivalent of a SQL LEFT JOIN of `customers` and `orders`? Answer: `customers.merge(orders, on="customer_id", how="left")`.
6. (Applied) `order_date` loads from CSV as text and monthly grouping fails. Fix? Answer: `df["order_date"] = pd.to_datetime(df["order_date"])`, then group by month, for example `df.groupby(df["order_date"].dt.to_period("M"))`.

**Practical (about 10 min):** Load `orders`, `order_details` and `customers` with the snippet in 03 > Practice dataset. Build order lines with `order_details.merge(orders, on="order_id")` and check that the row count equals the `order_details` row count. Add a `revenue` column (`unit_price * quantity * (1 - discount)`), run `isna().sum()` on the merged table and state how you treat any missing values (drop or keep, with a reason), convert `order_date` to datetime, compute monthly revenue for 1997, and export it to CSV (a bar chart is a strong extra).

| Criterion | Pass | Strong |
|---|---|---|
| Load and merge | Three tables loaded as in 03; merge on `order_id`; row count after merge equals `order_details` rows | Explains why an inner merge keeps every line here and what a mismatch would mean |
| Cleaning | `order_date` converted to datetime; missing values inspected and the handling choice stated | Documents why dropped or kept and the effect on totals |
| Aggregation | `revenue` column correct; monthly totals for 1997 (12 months, Jan-Dec) match the SQL monthly query from C2 | Sum of the months equals the overall 1997 sum |
| Output | `to_csv` file written | Simple labelled chart produced |

**Pass criterion:** 4 of 6 quiz answers and all "pass" rubric cells. **Est. time:** 20 min.

#### C4 — after M6
**Competencies tested:** C7 (question translation, sanity checks), C8 (awareness of the Python to PostgreSQL link, only if M6 covered it).

**Quiz (5 questions)**
1. (Recall) Name two sanity checks to run before trusting an analysis result. Answer: any two of: row count before and after joins; total against a known figure; look for NULLs or duplicates; spot-check one record by hand.
2. (Applied) Break "revenue by month and country" into steps. Answer: pick the tables and columns (orders, order_details, `ship_country`); filter the period; join on `order_id`; group by month and country; sum `unit_price * quantity * (1 - discount)`; sort; verify the total.
3. (Applied) Name the pandas counterparts of `GROUP BY`, `WHERE`, `JOIN`, `ORDER BY`. Answer: `groupby`, boolean filter `df[cond]`, `merge`, `sort_values`.
4. (Applied) The SQL revenue total for 1997 is higher than the pandas total for the same question. List two likely causes. Answer: rows with NULLs dropped in pandas but not in SQL; different date boundary (`<= '1997-12-31'` vs the range); join type difference; the discount left out of one formula.
5. (Recall, optional, M6 only) Why use a read-only connection for analysis on the company database? Answer: it prevents accidental changes to production data; the scope is read-only analysis.

**Practical (about 10 min):** For the business question "number of orders and revenue per ship country in Q3 1997 (1 July to 30 September)", outline the steps in 3-5 bullet points, then run a SQL query. The pandas version is done in the final assessment.

| Criterion | Pass | Strong |
|---|---|---|
| Question breakdown | Steps name tables, filter, grouping and measure | Notes assumptions (for example orders with no `shipped_date`, or discount handling) |
| Query | Joins orders to order_details; range `order_date >= '1997-07-01' AND order_date < '1997-10-01'`; `COUNT(DISTINCT order_id)` and the revenue expression per `ship_country` | Includes a reconciliation check query (sum of country revenue equals total Q3 1997 revenue) |
| Interpretation | One sentence stating the result in business terms (for example the top country) | Notes one limitation or follow-up question |

**Pass criterion:** 4 of 5 quiz answers (3 of 4 if question 5 was not covered) and all "pass" rubric cells. **Est. time:** 15 min.

### Final assessment
**Goal proven:** the learner independently answers a typical business question in both tools (success criteria 1 to 3 in 01). It is done on an unseen question using the same Northwind data, not the capstone itself. The acceptance checks stay separate from the project in 04.

**Task (30 min, docs and search allowed, no step-by-step help):** "For 1997: revenue by month and ship country, the top 10 customers by revenue, and customers who ordered in the first half of 1997 (January-June) but not in the second half (July-December)." Revenue is `unit_price * quantity * (1 - discount)`. The learner:
1. Answers the first two parts in PostgreSQL (at least one join, a filter, GROUP BY and ordering).
2. Answers the same first two parts in pandas: load `orders`, `order_details` and `customers` with the snippet in 03 > Practice dataset, build order lines with `order_details.merge(orders, on="order_id")`, merge `customers` on `customer_id` for `company_name`, then filter, groupby and sort.
3. Writes 2 sentences explaining how the SQL and pandas approaches correspond, and one sanity check performed on each.
The third part (customers lost in H2) is a stretch item and counts toward "strong" only.

| Criterion | Pass | Strong |
|---|---|---|
| SQL result | Both parts return values that match the reference answer (monthly totals Jan-Dec 1997; 10 customers in the right order) | Also solves the H1-but-not-H2 part |
| pandas result | Both parts match the reference answer and the SQL figures | Code is readable, with comments and clear names |
| Correspondence | States the mapping (GROUP BY to groupby, JOIN to merge) in 1-2 sentences | Gives a case where the results could differ and why |
| Sanity checks | One check each (row count, total, spot check) | Reconciles SQL against pandas totals |
| Independence | Completed with docs only, no copied solution | Completed within 30 min without a hint |

**Pass criterion:** all "pass" cells met, plus at least 70% on each checkpoint C1-C4 (retry rule applied once per checkpoint). Meeting these demonstrates success criteria 1 to 4 in 01.

### Certification mapping
No certification targeted.

### Time summary
| Checkpoint | Est. minutes |
|---|---|
| C1 (after M2) | 15 |
| C2 (after M3) | 15 |
| C3 (after M5) | 20 |
| C4 (after M6) | 15 |
| Final assessment | 30 |
| **Total** | **95 (1.58 h)** |

## Assumptions
- SQL practice uses Northwind as offered by PlayCode (PostgreSQL), per 03; column names follow the common PostgreSQL Northwind build and the learner checks them with `LIMIT 5` before starting. pandas practice uses the Northwind CSV files listed in 03; both sources cover orders dated 1996-1998.
- Revenue is not stored; it is always `unit_price * quantity * (1 - discount)` on `order_details`. Country columns replace region and segment, which Northwind does not have in usable form.
- Reference answers are produced by running the same queries once; no fixed figures are given here, because the PlayCode and CSV builds may differ slightly (03 notes this).
- Quiz questions use only content in 02 (M1-M6 topics); the pass mark of 70% is the default proposed in 01.
- Retry time after a miss is not in the 95 min total; it would come from the remaining 0.17 h or from the module practice time.
- C8 content is optional; C4 question 5 is scored only if M6 includes the database connection example.
- The schedule-planner places C1 and C2 by the end of week 2 at the latest, C3 and C4 in weeks 3 and 4.

## Open Issues
- The 1.58 h of assessment time plus 10.25 h of modules is 11.83 h, leaving only 0.17 h of slack against 12 h; any overrun in M1 setup removes the final assessment's margin.
- Week 1 contains M1 + M2 (2.25 h) and a 15 min checkpoint, which fits in 3 h; the schedule-planner must confirm that C1 lands in week 1 as required by success criterion 4.
- The PlayCode table and column names were not opened by this agent; the learner confirms them in M1. The pandas tasks depend on the loading snippet in 03 > Practice dataset and on the snake_case names being applied (the orders CSV header is CamelCase per 03), which M5 exercises must teach.
- SQL and pandas results may differ slightly if the PlayCode and CSV Northwind builds differ; the sanity-check criteria tell the learner to explain any gap rather than assume an error.

## Sources
- none (derived from inputs)
