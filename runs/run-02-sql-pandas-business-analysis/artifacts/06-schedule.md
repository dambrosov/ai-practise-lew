---
artifact: 06-schedule.md
agent: schedule-planner
run_id: run-02-sql-pandas-business-analysis
attempt: 3
depends_on: [resource-researcher, practice-designer, assessment-designer]
status: complete
sources_used: 0
---

# Schedule: SQL and pandas for business analysis

## Summary
The plan runs 4 weeks (2026-10-02 to 2026-10-30) at 3 h/week, 12 h in total. The uncut inputs (modules 10.25 h, practice 1.75 h, assessments 1.58 h) add up to 13.58 h, which is 1.58 h over budget before any buffer. To fit, content is compressed to 10.8 h and 1.2 h (10 %) is kept as buffer. Attempt 3 aligns the plan with the revised 03/04/05: all practice uses the Northwind dataset and the canonical `load_northwind()` snippet in 03 (Practice dataset), the Excel import uses the tab delimiter, and the C4 pass rule now matches 05. It also corrects the optional-step reference (E2.1 step 6). Module order is M1, M2, M3, M4, M5, M6, which respects every prerequisite in 02. Every week has a checkpoint, every week is 3.0 h, and there are 5 milestones.

## Content

### Planning parameters
| Parameter | Value |
|---|---|
| Hours per week | 3 |
| Weeks | 4 (W1 2026-10-02 to 10-08, W2 10-09 to 10-15, W3 10-16 to 10-22, W4 10-23 to 10-30) |
| Total budget | 12 h |
| Buffer policy | 1.2 h (10 %) reserved: 0.4 h in W1, 0.3 h in W2, 0.15 h in W3, 0.35 h in W4. It is used for retries after a missed checkpoint, setup problems or overruns. Unused buffer goes to the Adjustments "if ahead" items. |
| Planned content | 10.8 h (study 8.0, practice 1.55, assessments 1.25) |
| Dataset | Northwind only. SQL in PlayCode; Excel and pandas on the three tab-delimited files (orders, order_details, customers) listed in 03 (Practice dataset), loaded in Colab with the `load_northwind()` snippet from that section |
| Money | 0 USD (all primary and companion resources are free; 50 USD limit unused) |

### Week-by-week plan
Planned hours are content hours plus the reserved buffer; every week equals the 3 h budget.

| Week | Modules | Study (resources from 03) | Practice (ids from 04) | Checkpoint (05) | Planned hours |
|---|---|---|---|---|---|
| W1 | M1, M2 | M1: PlayCode SQL Playground 0.5 h (use Northwind), Google Colab 0.25 h (paste and run the `load_northwind()` snippet from 03 once). M2: Learn SQL: Interactive SQL Book (The Data School), Basic and WHERE chapters, 0.95 h; video Learn Basic SQL in 15 Minutes (Adam Finer - Learn BI) 0.3 h, watched first. Study 2.0 h | E1.1 (0.15 h; Excel import with Tab delimiter and the Colab snippet, row counts compared with SQL), E2.1 (0.2 h) | C1 (0.25 h) | 2.6 content + 0.4 buffer = 3.0 |
| W2 | M3 | Video Joins in MySQL - Intermediate MySQL (Alex The Analyst) 0.3 h, then Learn SQL: Interactive SQL Book (The Data School), aggregate/GROUP BY/JOIN/date chapters, 1.45 h; PostgreSQL docs 2.6 Joins Between Tables 0.25 h. Study 2.0 h | E3.1 (0.25 h), E3.2 (0.2 h) | C2 (0.25 h) | 2.7 content + 0.3 buffer = 3.0 |
| W3 | M4, M5 (part 1) | M4: Python for Beginners [25 of 44] Collections and [26 of 44] Demo: Collections (Microsoft) 0.15 h, then Kaggle Learn: Python, selected lessons, 0.85 h. M5: pandas Getting started tutorials 2-5 (read/write, subset, plots, new columns) 1.1 h, run on the Northwind files via `load_northwind()`; Easier data analysis in Python with pandas (Data School) videos #2 read a tabular file and #16 handle missing values 0.4 h. Study 2.5 h | E4.1 (0.1 h), E5.1 (0.15 h) | C3 part A: quiz Q1-Q3 and Q6 (0.1 h) | 2.85 content + 0.15 buffer = 3.0 |
| W4 | M5 (part 2), M6 | M5: pandas Getting started tutorials 6 and 8 (summary statistics/groupby, combine tables) 0.35 h; Data School video #14 when to use groupby 0.15 h. M6: pandas: Comparison with SQL 1.0 h. Study 1.5 h | E5.2 (0.1 h), E6.1 (0.1 h), Capstone "Northwind Sales Review" K1-K4 (0.3 h) | C3 part B: quiz Q4, Q5 and practical (0.15 h); C4 quiz Q1-Q4 folded into the Final assessment slot; Final assessment (0.5 h, includes the C4 quiz) | 2.65 content + 0.35 buffer = 3.0 |
| **Total** | M1-M6 | 8.0 h | 1.55 h | 1.25 h | 10.8 + 1.2 = 12.0 |

Order within W4: tutorials 6 and 8 and video #14, E5.2, C3 part B, then M6 study, E6.1, capstone, and the final assessment last (C4 quiz first, then the final task). M6 requires M3 (done in W2) and M5 (finished early in W4). C3 part A needs only M4 and the W3 part of M5 (lists, head/info, filters, to_datetime), so it fits in W3.

Pass rules (aligned with 05):
- C3: the two parts together reach 4 of 6 quiz answers (part A alone: 3 of 4 is on track) and all "pass" cells of the practical rubric.
- C4: not a separate session. The quiz Q1-Q4 is taken at the start of the final slot and passes at 3 of 4, which is the rule 05 gives when question 5 (read-only company connection, C8) is not covered; question 5 is not asked because the optional `pd.read_sql` step is dropped. The C4 practical (Q3 1997 orders and revenue per ship country in SQL) is covered by the SQL part of the final assessment, so it is not run twice. The 0.5 h final slot holds both, so the final task is kept to about 25 min.

Study per module (hours): M1 0.75, M2 1.25, M3 2.0, M4 1.0, M5 2.0, M6 1.0 (total 8.0).

### Milestones
| Week | Milestone | Evidence |
|---|---|---|
| W1 | Tools running; SQL retrieval learned | `schema-notes.md` and `questions.md` (E1.1) with CSV and SQL row counts agreeing, `m2-queries.sql` (E2.1), C1 passed (4 of 5 quiz and all "pass" cells) |
| W2 | SQL aggregation and joins learned | `m3-aggregation.sql` and `m3-joins.sql` (E3.1, E3.2) with totals matching the Excel pivot, C2 passed |
| W3 | Python basics and CSV loading done | `m4-basics.ipynb` (E4.1), `m5-clean.ipynb` (E5.1) with row counts equal to E2.1, C3 part A done (Q1-Q3 and Q6, at least 3 of 4) |
| W4 | pandas learned and capstone delivered | `m5-groupby-merge.ipynb` and `revenue_by_month.csv` (E5.2), `m6-two-tools.md` (E6.1), C3 passed (part B and total), capstone `capstone.sql`, `capstone.ipynb`, `summary.md` |
| W4 | Goal proven | Final assessment passed (all "pass" cells) and C4 quiz passed (3 of 4), with C1-C3 at least 70 %; by 2026-10-30 |

### Budget check
| Category | Hours | Share |
|---|---|---|
| Study | 8.0 | 66.7 % |
| Practice | 1.55 | 12.9 % |
| Assessments | 1.25 | 10.4 % |
| Buffer | 1.2 | 10.0 % |

Total 12.0 h of 12 h budget over 4 weeks (deadline: 2026-10-30).

Compression against the uncut inputs (13.58 h):
| Item | Uncut | Planned | Change |
|---|---|---|---|
| M2 study | 1.5 | 1.25 | -0.25 (Data School chapters 1.2 h cut to 0.95 h; the Finer video is kept in full) |
| M3 study | 2.5 | 2.0 | -0.5 (Data School chapters 1.95 h cut to 1.45 h; PlayCode join practice dropped, E3.2 covers it) |
| M4 study | 1.25 | 1.0 | -0.25 (Kaggle 1.1 h cut to 0.85 h; Microsoft videos kept) |
| M5 study | 3.0 | 2.0 | -1.0 (tutorials 2-6 and 8 cut from 2.25 h to 1.45 h; Data School videos #2, #14, #16 kept, #8 dropped; 10 minutes to pandas not scheduled) |
| M6 study | 1.25 | 1.0 | -0.25 (optional pandas.read_sql step dropped, so C8 is not covered) |
| Capstone | 0.5 | 0.3 | -0.2 (K1 reuses E1.1; 3 of the 5 questions reconciled and summarised) |
| Assessments | 1.58 | 1.25 | -0.33 (C4 folded into the final slot; quizzes cut to about 15 min) |
| **Total** | 13.58 | 10.8 | -2.78 |

### Adjustments
**If the learner falls behind** (drop or compress in this order):
1. Spend buffer first (1.2 h in total); do not borrow from the next week.
2. Drop the optional steps: Colab/PlayCode extras, E2.1 step 6 (optional pgexercises "Basic" problems), E6.1 step 5 and the "strong" rubric levels.
3. Drop the Data School video #16 (0.25 h) and the Alex The Analyst joins video (0.3 h); use the written chapters and docs in the same module instead.
4. Reduce the capstone to 2 questions (K2/K3 only, about 0.2 h), keeping one join.
5. Reduce M6 study to the SELECT, WHERE, GROUP BY and JOIN sections of the comparison page, and skip M5 tutorial 4 (plots).
6. Shorten the final assessment to the first two parts (SQL and pandas); the H1-but-not-H2 stretch item is already excluded.
7. Never drop C1-C3 (including the W3 part A), the C4 quiz, E3.2, E5.2 or E6.1: they carry success criteria 1-4.

**If the learner is ahead:**
1. Reinstate the dropped time in this order: 10 minutes to pandas (0.5 h), the PlayCode join practice (0.5 h), the Data School video #8 filter rows (0.25 h), the full capstone with 5 questions (0.2 h).
2. Run C4 as a separate full checkpoint with its practical (0.25 h) and add the optional pandas.read_sql step (0.25 h, C8 awareness, which also enables C4 question 5 and the 4 of 5 rule).
3. Run the schema-exploration step and one read-only question on the company database, if access is allowed.

## Assumptions
- Week boundaries follow calendar days from 2026-10-02; the last session ends on or before 2026-10-30.
- The learner can do a Data School "chapter subset", the pandas tutorial subset and the 4 short videos as described in 03 within the reduced hours.
- Exercise hours from 04 are dedicated time on top of study hours, as 04 states.
- Dataset handling (tab-delimited files, marker column, metadata rows, stray backslash) is solved by the single snippet and Excel instruction in 03; no extra time is planned for it beyond E1.1 (0.15 h) and the 0.25 h Colab setup in M1.
- C3 is split for scheduling only: part A (Q1-Q3, Q6) in W3 and part B (Q4, Q5, practical) in W4; 05 allows C3 in "week 3 or 4". Q4 (groupby) and Q5 (merge) need tutorials 6 and 8, which are in W4. The 0.25 h total for C3 is a shortened version of the 20 min in 05.
- C4 is shortened to its quiz Q1-Q4 (about 5 min) plus the final's SQL part; the pass rule 3 of 4 is the one 05 defines when question 5 is not covered.
- Buffer hours are not additional study; a week that needs no buffer ends early.
- Companion video durations from 03 (0.3, 0.3, 0.15 and 0.55 h for the three M5 videos used) are taken as given.

## Open Issues
- Overrun: the uncut inputs need 13.58 h against a 12 h budget (1.58 h over, 3.08 h over once a 10 % buffer is added). The plan fits by compressing content by 2.78 h. Trade-off: M5 pandas (-1.0 h) and M3 (-0.5 h) are shortened, C4 is merged into the final slot (quiz only, practical covered by the final), C8 (Python to PostgreSQL) is dropped, and the capstone covers 3 questions instead of 5.
- 02 reserves 1.75 h for practice and checkpoints, while 04 (1.75 h) and 05 (1.58 h) each use that whole reserve. The overlap is the root of the overrun.
- 03 says the loading snippet was not executed. If it fails in W1 (E1.1) the fix comes from the W1 buffer (0.4 h); a failure first noticed in W3 (E5.1) has only 0.15 h of buffer, so run the snippet once in W1 as scheduled.
- W3 buffer is only 0.15 h and W3 content is 2.85 h; a setup problem in W3 must be absorbed by W4 buffer (0.35 h) or by dropping the video items in Adjustments.
- W4 holds the capstone, C3 part B, the C4 quiz and the final; a missed W4 loses all of them.
- The final slot (0.5 h) now holds the C4 quiz and the final task, about 25 min for the task against the 30 min in 05; if the learner needs the full 30 min, 0.08 h comes from the W4 buffer.
- Cleaning (`fillna`, `to_datetime`, E5.1) is only partly covered by tutorials 2-5 and videos #2 and #16; the learner may need the 10 minutes to pandas page as a cheat sheet.
- Three YouTube durations in 03 rest on secondary evidence; if they are longer, the study hours in M2, M3 and M5 grow and buffer is consumed.
- The 04 capstone milestones list 0.5 h (K1 0.05, K2 0.10, K3 0.10, K4 0.25); the plan uses 0.3 h, so K4 is reduced to the 3-question summary.
- PlayCode's Northwind table and column names are not confirmed in 03; E1.1 starts with a schema query and any difference from the CSV files is recorded there.

## Sources
- none (derived from inputs)
