---
artifact: failure-report.md
agent: coordinator
run_id: run-02-sql-pandas-business-analysis
attempt: 3
depends_on: [validator]
status: failed
---

# Failure report: run-02-sql-pandas-business-analysis

## Summary

quality gate still failing after 3 validation rounds (limit 3); unresolved: resource-researcher

## Content

### Unresolved gate failures

- **resource-researcher** (consistency): The canonical load_northwind() snippet and the Excel instruction assume 2 metadata rows (T, N) in every file, but orders.csv and order_details.csv have 6 (T, N, K, t, c, #; data from line 8) and customers.csv has 2 (K, #) plus a UTF-8 BOM. With skiprows=[1, 2], the K/t/c/# rows stay in the data, order_date fails to parse, the 830-row sanity print raises an error, and order_details.merge(orders, on='order_id') (used by 04 E5.2, 05 C3 and the final) fails on float vs object keys. Replace the fixed skiprows with a marker filter: read with sep='\t', quoting=csv.QUOTE_NONE, dtype=str, keep_default_na=False, encoding='utf-8-sig'; keep rows where the first column == 'V'; drop that column; rstrip('\\') the column names; re-read through io.StringIO(df.to_csv(index=False)) to restore types and dates. Correct the File layout row, and change the Excel steps to Power Query: filter the first column to 'V', remove it, and fix the last header. Keep the 830-order / 1996-07-04 to 1998-05-06 check and add customers = 91.

### Stopped dependent work

- path-synthesizer: not executed
- html-builder: not executed

## Assumptions

- Artifacts that passed their gates remain valid and are kept for a future run.

## Open Issues

- resource-researcher needs a different approach or changed requirements.

## Sources

- runs/run-02-sql-pandas-business-analysis/artifacts/07-validation.md
