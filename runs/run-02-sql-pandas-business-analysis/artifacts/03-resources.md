---
artifact: 03-resources.md
agent: resource-researcher
run_id: run-02-sql-pandas-business-analysis
attempt: 3
depends_on: [knowledge-assessor]
status: complete
sources_used: 24
---

# Resources: SQL and pandas for business analysis

## Summary
Twenty-four URLs were fetched on 2026-10-02 and are used across modules M1-M6. Attempt 3 rewrites the Practice dataset section: the SpocWeb Northwind files are tab-delimited with a marker column and two metadata rows, so the section now gives one canonical pandas loading snippet that yields snake_case columns, and one Excel import instruction, both derived from the fetched file content. Every primary and companion resource is free, so the 50 USD budget is not used. Primary hours plus named companion parts total 10.25 h, equal to the module estimates in 02 and inside the 12 h budget. The fetch MCP tool was not available, so verification used `WebFetch`, the documented fallback. The loading snippet was checked against the fetched text but not executed (no code runner in this agent), see Open Issues.

## Content

### Research approach
- Queries: interactive PostgreSQL tutorials, SQL basics and joins short videos, pandas getting-started docs and short videos, Python lists and dictionaries short videos, Northwind CSV downloads, browser SQL playgrounds, pandas vs SQL comparison.
- Selection: free, hands-on or short-video first (learner preference: a mix of short videos and practice), PostgreSQL dialect for SQL practice, official docs for pandas, no lecture-only long courses. Videos are kept at 20 min or less and used as companions to the hands-on primary.
- Mode: standard (paid allowed up to 50 USD); nothing paid was needed.
- Verification: `mcp__fetch__fetch` was not available, so each URL was fetched with `WebFetch` on 2026-10-02. YouTube pages return only the title through `WebFetch`, so the channel was confirmed through the YouTube oEmbed endpoint and the duration through a page that lists it (see the per-video notes).

### Resources by module

#### M1 - Setup and data orientation
| Resource | Type | Cost | Est. hours | Level | Role | Why it fits | Verified |
|---|---|---|---|---|---|---|---|
| [PlayCode SQL Playground](https://playcode.io/sql-playground) | interactive | free ("Free SQL Sandbox") | 0.5 | beginner | primary | Real PostgreSQL in the browser with Chinook and Northwind sample databases; no install. Use Northwind (see Practice dataset) | 2026-10-02 |
| [Google Colab](https://colab.research.google.com/) | interactive | free tier | 0.25 | beginner | alternative (named companion, counted in hours) | Browser notebook for the pandas modules; needs a Google account; completes the M1 notebook setup | 2026-10-02 |
| [Aiven PostgreSQL Playground](https://aiven.io/tools/pg-playground) | interactive | free, no signup | 0.25 | beginner | alternative | Fallback if PlayCode is blocked; data is lost when the tab closes | 2026-10-02 |

#### M2 - SQL basics: SELECT, WHERE, ORDER BY, LIMIT
| Resource | Type | Cost | Est. hours | Level | Role | Why it fits | Verified |
|---|---|---|---|---|---|---|---|
| [Learn SQL: Interactive SQL Book (The Data School)](https://dataschool.com/learn-sql/) | interactive book | free (no price shown) | 1.2 | beginner | primary | Chapters SELECT, FROM, ORDER BY, LIMIT, WHERE with an in-page SQLBox on a live PostgreSQL database; use the Basic and WHERE/operators chapters | 2026-10-02 |
| [Learn Basic SQL in 15 Minutes (Adam Finer - Learn BI, channel Vitamin BI mirror)](https://www.youtube.com/watch?v=kbKty5ZVKMY) | video | free | 0.3 (about 17 min) | beginner | alternative (named companion, counted in hours) | Short video: SELECT, aliases, WHERE, ORDER BY, then INNER JOIN, GROUP BY, HAVING; watch once at the start of M2, then replay the JOIN and GROUP BY parts in M3. Business-intelligence framing suits an Excel user | 2026-10-02 |
| [PostgreSQL Tutorial (pgtutorial.com)](https://www.pgtutorial.com/) | tutorial | free | 1.0 (optional, not counted) | beginner | alternative | PostgreSQL-specific reference; second explanation for hard topics | 2026-10-02 |

Video notes: title and channel from the YouTube oEmbed response ("Learn Basic SQL in 15 Minutes | Business Intelligence For Beginners | SQL Tutorial For Beginners 1/3", author "Adam Finer - Learn BI"). The duration of about 17 minutes comes from the [Empower Youth listing](https://www.empoweryouth.com/learning/video/learn-basic-sql-in-15-minutes-business-intelligence-for-beginners-sql-tutorial-for-beginners) of the same video (timestamp markers; that page names the channel "Vitamin BI").

#### M3 - SQL aggregation and joins
| Resource | Type | Cost | Est. hours | Level | Role | Why it fits | Verified |
|---|---|---|---|---|---|---|---|
| [Learn SQL: Interactive SQL Book (The Data School)](https://dataschool.com/learn-sql/) | interactive book | free (no price shown) | 1.95 | beginner | primary | Mid-level chapters: aggregate functions, GROUP BY, JOINs, date/time functions, each followed by practice; same tool as M2, so no new setup | 2026-10-02 |
| [Joins in MySQL - Intermediate MySQL (Alex The Analyst)](https://www.youtube.com/watch?v=lXQzD09BOH0) | video | free | 0.3 (about 17 min) | beginner to intermediate | alternative (named companion, counted in hours) | Short visual explanation of INNER, LEFT, RIGHT and self joins with code on GitHub; MySQL syntax, but JOIN logic is the same in PostgreSQL. Watch before the Data School JOIN chapter | 2026-10-02 |
| [PostgreSQL docs: 2.6 Joins Between Tables](https://www.postgresql.org/docs/current/tutorial-join.html) | docs | free | 0.25 | beginner | alternative (named companion, counted in hours) | Short official page on INNER and LEFT OUTER JOIN with NULL behaviour (PostgreSQL 18) | 2026-10-02 |
| [PlayCode SQL Playground](https://playcode.io/sql-playground) | interactive | free | 0.5 (practice, within the M3 exercises, not counted here) | beginner | alternative | Run join exercises on Northwind orders, customers and products, close to the capstone data | 2026-10-02 |

Video notes: title and channel from the YouTube oEmbed response ("Joins in MySQL | Intermediate MySQL", author "Alex The Analyst"). The 17-minute length comes from a Class Central listing seen only as a search snippet (the Class Central page returned HTTP 403), so the duration is secondary evidence.

#### M4 - Python basics for data work
| Resource | Type | Cost | Est. hours | Level | Role | Why it fits | Verified |
|---|---|---|---|---|---|---|---|
| [Kaggle Learn: Python](https://www.kaggle.com/learn/python) | interactive course | free | 1.1 (selected lessons) | beginner | primary | Browser notebooks, no setup; do only syntax and variables, lists, strings and dictionaries (skip the rest). Search results describe the full course as about 5 h; the fetched page did not show the lesson list | 2026-10-02 |
| [Python for Beginners [25 of 44] Collections (Microsoft)](https://learn.microsoft.com/en-us/shows/intro-to-python-development/python-for-beginners-25-of-44-collections) and [[26 of 44] Demo: Collections](https://learn.microsoft.com/en-us/shows/intro-to-python-development/python-for-beginners-26-of-44-demo-collections) | video (2 episodes) | free | 0.15 (about 4 min each, 7-8 min total) | beginner | alternative (named companion, counted in hours) | Lists, arrays and dictionaries explained, then demonstrated in code; watch before the Kaggle lists and dictionaries lesson | 2026-10-02 |
| [Learn Python in 1 Hour - Full Python Crash Course for Beginners (2025 Edition) (channel Jexplain)](https://www.youtube.com/watch?v=1lO8TqRV2VY) | video | free | 1.0 (optional, not counted; longer than 20 min) | beginner | alternative | Fetched title is "Learn Python in 1 Hour \| Full Python Crash Course for Beginners (2025 Edition)", channel "Jexplain" (oEmbed). Use only if Kaggle feels too dry; dictionary coverage not confirmed | 2026-10-02 |

Video notes: each Microsoft episode page was fetched and confirms the title and topic. The "three-to-four minutes per episode" length is stated for the 44-episode series in an [IBL News article](https://iblnews.org/story/microsoft-launches-a-series-of-44-short-videos-to-learn-python-on-youtube) (presenters Christopher Harrison and Susan Ibach); the episode pages themselves show no duration. The series dates from 2019 to 2021, older than 4 years, but the Python basics covered are stable.

#### M5 - pandas core: load, filter, groupby, merge, clean, chart
| Resource | Type | Cost | Est. hours | Level | Role | Why it fits | Verified |
|---|---|---|---|---|---|---|---|
| [pandas Getting started tutorials](https://pandas.pydata.org/docs/getting_started/index.html) | docs / tutorial | free | 2.25 | beginner | primary | Official; covers read/write tables, subset selection, plots, new columns, summary statistics, combining tables (pandas 3.0.6). Use tutorials 2-6 and 8, run on the Northwind CSVs | 2026-10-02 |
| [Easier data analysis in Python with pandas - video series (Data School, Kevin Markham)](https://www.dataschool.io/easier-data-analysis-with-pandas/) | video series | free | 0.75 (4 selected videos, 45:29 total) | beginner | alternative (named companion, counted in hours) | Watch: #2 read a tabular file (8:54), #8 filter rows by column value (13:44), #14 when to use groupby (8:24), #16 handle missing values (14:27); all 20 min or less. Title and duration of each video are listed on the fetched series page | 2026-10-02 |
| [10 minutes to pandas](https://pandas.pydata.org/docs/user_guide/10min.html) | docs | free | 0.5 (optional cheat sheet, not counted) | beginner | alternative | Quick overview incl. missing data (`dropna`, `fillna`), groupby, merge, import/export | 2026-10-02 |
| [How to combine data from multiple tables (pandas)](https://pandas.pydata.org/docs/getting_started/intro_tutorials/08_combine_dataframes.html) | docs | free | 0.5 (inside tutorial 8, not counted separately) | beginner | alternative | Focused concat and merge (`how="left"`, `left_on/right_on`), the VLOOKUP to merge step | 2026-10-02 |

Video notes: the Data School videos date from about 2016-2019 (the page shows no dates), older than 4 years. Core operations (read_csv, boolean filters, groupby, missing values) are unchanged; skip any `inplace` advice and prefer the current docs when code differs. The series page links each video; the videos have no separate URLs in this artifact.

#### M6 - From business question to answer: SQL plus pandas, sanity checks, optional database connection
| Resource | Type | Cost | Est. hours | Level | Role | Why it fits | Verified |
|---|---|---|---|---|---|---|---|
| [pandas: Comparison with SQL](https://pandas.pydata.org/docs/getting_started/comparison/comparison_with_sql.html) | docs | free | 1.0 | beginner | primary | Side-by-side SELECT, WHERE, GROUP BY, JOIN, LIMIT and NULL handling in pandas; supports the "explain how SQL and pandas correspond" criterion | 2026-10-02 |
| [pandas.read_sql](https://pandas.pydata.org/docs/reference/api/pandas.read_sql.html) | docs | free | 0.25 (optional C8 step) | intermediate | alternative (named companion, counted in hours) | Reference for the optional C8 step; PostgreSQL needs a SQLAlchemy or ADBC connection (the DBAPI shortcut supports only sqlite3) | 2026-10-02 |

### Practice dataset
One dataset is used in every practice step, so SQL and pandas answers can be compared (M6). Exercises and assessments refer to "the loading instruction in 03's Practice dataset section", which is the snippet below.

| Item | Detail |
|---|---|
| Dataset | Northwind (classic trading-company sample: customers, orders, order lines, products) |
| SQL practice database | Northwind in the [PlayCode SQL Playground](https://playcode.io/sql-playground) (M1-M3, M6). The page lists Northwind with products, orders, customers and employees; it does not list table names, so confirm them with a schema query at the first use |
| CSV source (M5, M6) | [SpocWeb/Northwind_csv](https://github.com/SpocWeb/Northwind_csv); raw files: [orders.csv](https://raw.githubusercontent.com/SpocWeb/Northwind_csv/main/orders.csv), [order_details.csv](https://raw.githubusercontent.com/SpocWeb/Northwind_csv/main/order_details.csv), [customers.csv](https://raw.githubusercontent.com/SpocWeb/Northwind_csv/main/customers.csv). Despite the `.csv` extension they are **tab-delimited**; GitHub's CSV viewer cannot display orders.csv, so always use the raw URL |
| Order-date range | 1996-07-04 to 1998-05-06 (first row order 10248, last row order 11077; dates are `YYYY-MM-DD`) |
| Size | 830 orders, 91 customers; order_details covers order_id 10248-11077 (standard Northwind has 2,155 lines; the line count was not counted from the fetched file) |
| File layout (read from the fetched text) | Header row: first field is the marker `\P\`, then the column names, and the **last header name ends with a stray backslash** (`ship_country\` in orders, `discount\` in order_details, `fax\` in customers). Rows 2 and 3 are metadata rows (first fields `T` and `N`, holding type and nullability codes, not data). Every data row starts with the marker `V` in the first field. Empty values are consecutive tabs; no quoting |
| Columns (snake_case, after cleaning) | orders: order_id, customer_id, employee_id, order_date, required_date, shipped_date, ship_via, freight, ship_name, ship_address, ship_city, ship_region, ship_postal_code, ship_country. order_details: order_id, product_id, unit_price, quantity, discount. customers: customer_id, company_name, contact_name, contact_title, address, city, region, postal_code, country, phone, fax |
| Join keys | orders.customer_id = customers.customer_id; orders.order_id = order_details.order_id |
| Revenue formula | `unit_price * quantity * (1 - discount)` summed per order or per month |

**Canonical pandas loading snippet** (use exactly this; it skips the two metadata rows, drops the `\P\`/`V` marker column, strips the stray backslash from the last column name, and keeps all names snake_case):

```python
import csv
import pandas as pd

BASE = "https://raw.githubusercontent.com/SpocWeb/Northwind_csv/main/"

def load_northwind(name, parse_dates=None):
    df = pd.read_csv(
        BASE + name + ".csv",
        sep="\t",                  # files are tab-delimited, not comma-delimited
        skiprows=[1, 2],           # metadata rows starting with T and N
        quoting=csv.QUOTE_NONE,    # data has apostrophes and no quoting
        parse_dates=parse_dates,
    )
    df = df.drop(columns=df.columns[0])               # marker column named \P\ (values V)
    df.columns = [c.rstrip("\\") for c in df.columns]  # 'ship_country\' -> 'ship_country'
    return df

orders = load_northwind("orders", parse_dates=["order_date", "shipped_date"])
order_details = load_northwind("order_details")
customers = load_northwind("customers")

print(len(orders), orders["order_date"].min(), orders["order_date"].max())
# expected: 830 1996-07-04 00:00:00 1998-05-06 00:00:00
print(list(orders.columns)[:5])   # ['order_id', 'customer_id', 'employee_id', 'order_date', 'required_date']
```

If the sanity print differs (for example the row count is not 830), check that the first two data lines of the downloaded file are the `T` and `N` metadata rows; the snippet assumes that layout as seen in all three fetched files.

**Excel import instruction** (open the files, not paste): download each file from its raw URL (browser Save as, keep `.csv`). In Excel use Data > From Text/CSV, choose the file, set Delimiter to Tab and File Origin to UTF-8, then Load. In the sheet delete column A (the `\P\` / `V` marker), delete rows 2 and 3 (the `T` and `N` metadata rows) and remove the trailing backslash from the last header cell (`ship_country\` becomes `ship_country`). Convert the sheet to a table (Ctrl+T) and name it `orders`, `order_details` or `customers`.

Checked on 2026-10-02 by re-fetching all three raw files in attempt 3: delimiter (tab), marker field `\P\`, header names, the `T`/`N` rows and the last two data rows (orders 11076 and 11077, both dated 1998-05-06; order_details ends with order 11077) were read directly. The snippet and the Excel steps were derived from that content and have not been executed. PlayCode's Northwind may use different column names or a slightly different row set; the exercises should use only the shared business columns above.

### Cross-cutting resources
| Resource | Type | Cost | Est. hours | Level | Role | Why it fits | Verified |
|---|---|---|---|---|---|---|---|
| [PostgreSQL Tutorial (pgtutorial.com)](https://www.pgtutorial.com/) | tutorial | free | reference only | beginner | alternative | Syntax reference while querying the company database; includes psycopg3 Python integration pages for C8 | 2026-10-02 |

### Hours summary
Primary hours include the module's named companion parts (short videos, docs pages) where the primary alone is shorter than the estimate.

| Module | Primary resource hours | Module estimate (02) | Fit |
|---|---|---|---|
| M1 | 0.5 (PlayCode) + 0.25 (Colab setup) = 0.75 | 0.75 | ok |
| M2 | 1.2 (Data School) + 0.3 (Finer video) = 1.5 | 1.5 | ok |
| M3 | 1.95 (Data School) + 0.3 (Alex joins video) + 0.25 (PostgreSQL join docs) = 2.5 | 2.5 | ok |
| M4 | 1.1 (Kaggle) + 0.15 (Microsoft collections videos) = 1.25 | 1.25 | ok |
| M5 | 2.25 (tutorials 2-6, 8) + 0.75 (4 Data School videos) = 3.0 | 3.0 | ok |
| M6 | 1.0 (SQL comparison) + 0.25 (read_sql, optional) = 1.25 | 1.25 | ok |
| **Total** | 10.25 | 10.25 | ok (12 h budget, 1.75 h left for practice and checkpoints) |

Video minutes inside these hours: about 17 + 17 + 8 + 45 = 87 min (1.45 h) of short videos, each 20 min or less.

### Unverified or excluded
- YouTube durations: `WebFetch` returns only the title for YouTube pages. The Finer video length (about 17 min) comes from a mirror listing page; the Alex the Analyst length (17 min) comes only from a search snippet of Class Central (403 on fetch); the Microsoft episode length (3-4 min) is a series-level statement in a news article. Data School durations are read from the fetched series page. The validator should re-check the three YouTube durations if it has a tool that can read them.
- Kaggle Learn Python lesson list and hours did not render; the 5 h figure and lesson names come from search results.
- The pandas loading snippet and Excel steps were derived from fetched file text, not executed.
- Excluded for length (over 20 min): Keith Galli "Complete Python Pandas Data Science Tutorial" (about 1 h), Web Dev Simplified "Learn SQL in 60 Minutes", Neso Academy joins (24 min).
- Excluded as unconfirmed: "Python Pandas Tutorial: GroupBy + Pivot Tables + Merge" (video Oo0Mio9Gx4A; channel and duration not confirmed) and the Coupler.io "SQL Tutorial for Beginners" and Data with Baraa "SQL Joins Basics" videos (channel confirmed, duration not).
- Excluded as paid or members-only: Real Python video lessons (members only), LinkedIn Learning SQL clips (subscription), LearnSQL.com courses (mostly paid).
- Kaggle Learn pandas: fetched in attempt 1, not selected; not listed.
- Medium and Towards Data Science articles on pandas vs SQL: excluded in favour of the official page.

## Assumptions
- Hours are estimates for the selected parts, assuming about 40 % hands-on time as in 02.
- Alternatives are not counted in the hour totals except the named companion parts marked in the tables and the hours summary.
- The learner has a Google account for Colab; otherwise Kaggle notebooks work as a substitute.
- Practice uses the Northwind sample data, not live company data (as in 01).
- Videos are watched at normal speed; a learner who prefers reading can skip the companion videos and use the docs given in the same module.
- The three SpocWeb files share the same layout (marker column, `T` and `N` metadata rows), as the fetched headers and first rows indicate.

## Open Issues
- The loading snippet was not executed; the validator or learner should run it once and confirm the 830-row, 1996-07-04 to 1998-05-06 check line. If the metadata rows differ, replace `skiprows=[1, 2]` with a filter on the marker column (`V`).
- Three video durations rest on secondary evidence (see Unverified or excluded).
- The PlayCode Northwind table and column names are not confirmed; they may differ from the CSV snake_case names.
- Alex the Analyst joins video uses MySQL, and the Microsoft and Data School videos are older than 4 years; the module exercises should be run in PostgreSQL and current pandas.
- The cross-cutting section has only one item; the pandas docs are already covered by the M5 and M6 primaries.
- No resource is specifically about sanity-checking results; M6 exercises must cover it.
- The Data School interactive book page shows no explicit price or update date.
- The fetch MCP server was unavailable, so the validator should re-verify with it if possible.

## Sources
- [PlayCode SQL Playground](https://playcode.io/sql-playground) — interactive, accessed 2026-10-02
- [Google Colab](https://colab.research.google.com/) — interactive, accessed 2026-10-02
- [Aiven PostgreSQL Playground](https://aiven.io/tools/pg-playground) — interactive, accessed 2026-10-02
- [Learn SQL: Interactive SQL Book (The Data School)](https://dataschool.com/learn-sql/) — interactive book, accessed 2026-10-02
- [PostgreSQL Tutorial (pgtutorial.com)](https://www.pgtutorial.com/) — tutorial, accessed 2026-10-02
- [PostgreSQL docs: 2.6 Joins Between Tables](https://www.postgresql.org/docs/current/tutorial-join.html) — docs, accessed 2026-10-02
- [Learn Basic SQL in 15 Minutes (Adam Finer - Learn BI)](https://www.youtube.com/watch?v=kbKty5ZVKMY) — video, accessed 2026-10-02
- [Learn Basic SQL in 15 Minutes (Empower Youth listing, duration source)](https://www.empoweryouth.com/learning/video/learn-basic-sql-in-15-minutes-business-intelligence-for-beginners-sql-tutorial-for-beginners) — listing page, accessed 2026-10-02
- [Joins in MySQL - Intermediate MySQL (Alex The Analyst)](https://www.youtube.com/watch?v=lXQzD09BOH0) — video, accessed 2026-10-02
- [Kaggle Learn: Python](https://www.kaggle.com/learn/python) — interactive course, accessed 2026-10-02
- [Python for Beginners [25 of 44] Collections (Microsoft Learn)](https://learn.microsoft.com/en-us/shows/intro-to-python-development/python-for-beginners-25-of-44-collections) — video episode page, accessed 2026-10-02
- [Python for Beginners [26 of 44] Demo: Collections (Microsoft Learn)](https://learn.microsoft.com/en-us/shows/intro-to-python-development/python-for-beginners-26-of-44-demo-collections) — video episode page, accessed 2026-10-02
- [Microsoft Launches a Series of 44 Short Videos to Learn Python on YouTube (IBL News)](https://iblnews.org/story/microsoft-launches-a-series-of-44-short-videos-to-learn-python-on-youtube) — article, accessed 2026-10-02
- [Learn Python in 1 Hour - Full Python Crash Course for Beginners (2025 Edition)](https://www.youtube.com/watch?v=1lO8TqRV2VY) — video, accessed 2026-10-02
- [pandas Getting started tutorials](https://pandas.pydata.org/docs/getting_started/index.html) — docs, accessed 2026-10-02
- [Easier data analysis in Python with pandas - video series (Data School)](https://www.dataschool.io/easier-data-analysis-with-pandas/) — video series page, accessed 2026-10-02
- [How to combine data from multiple tables (pandas)](https://pandas.pydata.org/docs/getting_started/intro_tutorials/08_combine_dataframes.html) — docs, accessed 2026-10-02
- [10 minutes to pandas](https://pandas.pydata.org/docs/user_guide/10min.html) — docs, accessed 2026-10-02
- [pandas: Comparison with SQL](https://pandas.pydata.org/docs/getting_started/comparison/comparison_with_sql.html) — docs, accessed 2026-10-02
- [pandas.read_sql](https://pandas.pydata.org/docs/reference/api/pandas.read_sql.html) — docs, accessed 2026-10-02
- [SpocWeb/Northwind_csv (GitHub)](https://github.com/SpocWeb/Northwind_csv) — dataset repository, accessed 2026-10-02
- [Northwind orders.csv (raw)](https://raw.githubusercontent.com/SpocWeb/Northwind_csv/main/orders.csv) — dataset file, accessed 2026-10-02
- [Northwind order_details.csv (raw)](https://raw.githubusercontent.com/SpocWeb/Northwind_csv/main/order_details.csv) — dataset file, accessed 2026-10-02
- [Northwind customers.csv (raw)](https://raw.githubusercontent.com/SpocWeb/Northwind_csv/main/customers.csv) — dataset file, accessed 2026-10-02
