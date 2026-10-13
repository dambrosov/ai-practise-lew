---
artifact: 06-schedule.md
agent: schedule-planner
run_id: run-01-rust-file-organizer-cli
attempt: 2
depends_on: [knowledge-assessor, resource-researcher, practice-designer, assessment-designer]
status: complete
sources_used: 0
---

# Schedule: Rust file organizer CLI

## Summary
An 8-week plan (2026-10-02 to 2026-11-26) at 6 h/week, 48 h total budget. Planned work is 43.9 h: 13.5 h study (skimmed Book chapters), 24.0 h practice (17.0 h exercises + 7.0 h capstone) and 6.4 h assessments (C1, C2, C3, Final). Hands-on work (practice plus the practical tasks inside the checkpoints, 28.2 h) is 64 % of planned hours. The remaining 4.1 h (8.5 %) is unplanned buffer. No week exceeds 6.0 h. Checkpoints sit at the end of weeks 2, 4, 6 and 8, so every two-week window has one. Modules run M1 to M7 in order, which respects the prerequisites in 02, and M5 starts only after C2 passes.

## Content

### Planning parameters
| Parameter | Value |
|---|---|
| Hours per week | 6 |
| Number of weeks | 8 (week 1 starts 2026-10-02; week 8 ends 2026-11-26; deadline ~2026-11-27) |
| Total budget | 48 h |
| Buffer policy | Target about 10 % (4.8 h) kept unplanned; achieved 4.1 h (8.5 %). Use it first for a failed checkpoint (review up to 1 h) and for M2 overruns. Free time is in weeks 3, 6, 7 and mostly week 8. |
| Hour accounting | The 24 h of practice (04) sit inside the 40 h module estimate in 02 and are counted once. Study is reading only and is deliberately shorter than the 23 h of 03 primaries (skimming, see Notes). Checkpoint time (6.4 h) comes from the reserve. |
| Hands-on definition | Exercises + capstone + the practical parts of the checkpoints (C1 45 min, C2 60 min, C3 70 min, Final 75 min = 4.2 h). Quizzes, reviews and the walkthrough are not hands-on. |
| Week boundaries | Week n runs from 2026-10-02 + 7(n-1) days for 7 days (week 1: 10-02 to 10-08, week 8: 11-20 to 11-26). |

### Week-by-week plan
Study names are the primary resources in 03. "Book" is The Rust Book (doc.rust-lang.org/book). Exercises are from 04; CP1-CP5 are the capstone milestones from 04.

| Week | Modules | Study (03) | Practice (04) | Checkpoint (05) | Planned hours |
|---|---|---|---|---|---|
| 1 | M1, M2 | Book ch. 1 and 3, skim (1.5 h); Book ch. 4 Understanding Ownership (2.0 h); Book ch. 10 lifetimes section (0.5 h) | E1.1 (0.5 h), E1.2 (0.75 h), E1.3 (0.75 h) | — | 6.0 |
| 2 | M2, M3 (start) | Book ch. 5 and 6 Structs and Enums, skim (1.25 h, after C1) | E2.1 (2.0 h), E2.2 (1.5 h) | C1 (1.25 h, end of week) | 6.0 |
| 3 | M3, M4 (start) | Book ch. 8 Collections, skim (0.75 h); Book ch. 9 Error Handling (1.5 h) | E3.1 (0.75 h), E3.2 (0.75 h), E3.3 (1.5 h), CP1 design note (0.5 h) | — | 5.75 |
| 4 | M4 | Book ch. 10 Generics and Traits, rest (1.5 h) | E4.1 (1.5 h), E4.2 (1.5 h) | C2 (1.5 h, end of week, after M4) | 6.0 |
| 5 | M5 | Command Line Applications in Rust: Parsing command line arguments, skim (2.0 h); std::fs module docs (0.5 h); Rust Cookbook Directory Traversal (0.5 h) | E5.1 (0.75 h), E5.2 (1.25 h), CP2 core engine, part 1 (1.0 h) | — | 6.0 |
| 6 | M5 (close), M6 | Book ch. 7 and 11 Modules, Automated Tests, skim (1.5 h) | E6.1 (1.5 h), CP2 core engine, part 2 (0.5 h) | C3 (1.67 h, end of week, after M6) | 5.17 |
| 7 | M7 (start) | — (Book ch. 12 is covered by the E5.3 type-along) | E5.3 (2.0 h), CP3 filesystem and CLI (2.0 h), CP4 tests and structure (1.5 h) | — | 5.5 |
| 8 | M7 | — | CP5 polish and review (1.5 h) | Final assessment (2.0 h) | 3.5 |
| Total | | 13.5 h | 24.0 h | 6.42 h | 43.92 |

Notes on the plan:
- Study is cut from the 23 h of 03 primaries to 13.5 h by skimming Book ch. 1/3, 5/6, 8 and the CLI-args page, and by letting Rustlings (E1.3, E2.1, E3.3, E4.2, 4.5 h) carry the learning of syntax, ownership, collections and error handling. The Book ch. 12 primary (3 h) is replaced by the E5.3 type-along (2.0 h, counted as practice). Ch. 10 is read as 0.5 h (lifetimes, week 1) plus 1.5 h (traits and generics, week 4).
- C1 closes M1-M2 at the end of week 2. Only a skim of ch. 5/6 comes after it; the M3 exercises start in week 3.
- C2 closes M4 at the end of week 4. M5 starts in week 5 only after C2 passes. CP2 (core engine, 1.5 h) is built after C2 in weeks 5-6, split 1.0 h and 0.5 h so that no week exceeds 6.0 h.
- C3 closes M5-M6 at the end of week 6. M7 (CP3-CP5) is built in weeks 7-8; E5.3 comes before CP3 as 04 asks. CP1 is placed in week 3 (04 suggested week 4) to keep weeks 3-4 level.
- Week 8 has 2.5 h free on purpose: it holds the fix cycle of the final assessment and the buffer for earlier overruns.

### Milestones
| Week | Milestone | Evidence |
|---|---|---|
| 1 | Toolchain installed, syntax basics done | E1.1 builds with zero clippy warnings; E1.2 output equals the Python script; E1.3 sections passing |
| 2 | Ownership understood | C1 passed (quiz at least 5/6, all rubric criteria at pass); E2.1 and E2.2 deliverables |
| 3 | Capstone design fixed | CP1 one-page design note; E3.1, E3.2, E3.3 deliverables |
| 4 | Language core confirmed | C2 passed (expense tally task and quiz); E4.1 with no `unwrap()` in non-test code |
| 5 | Filesystem and CLI basics work | E5.1 `--help` output saved; E5.2 run log of dry run versus real run |
| 6 | Structure and tests in place | C3 passed (lister task and quiz); E6.1 with 7 passing tests; CP2 core engine tested |
| 7 | Organizer works on disk | CP3 (`--dry-run`, `--recursive`, conflict skip, exit codes); CP4 with at least 8 passing tests, clippy clean; E5.3 minigrep with own extension |
| 8 | `tidy` finished and reviewed | CP5 README and demo run log; Final assessment passed (all rubric criteria at pass) |

### Budget check
| Category | Hours | Share of 48 h |
|---|---|---|
| Study | 13.5 | 28.1 % |
| Practice (exercises 17.0 + capstone 7.0) | 24.0 | 50.0 % |
| Assessments (C1 1.25, C2 1.5, C3 1.67, Final 2.0) | 6.4 | 13.4 % |
| Buffer (unplanned) | 4.1 | 8.5 % |
| **Total** | **48.0** | **100 %** |

Total 43.9 h of 48 h budget over 8 weeks (deadline: 2026-11-27; plan ends 2026-11-26).

Hands-on share of planned time: practice 24.0 h + checkpoint practical tasks 4.2 h = 28.2 h of 43.9 h = 64 % (criterion 6: at least 60 %). Reading is 13.5 h (31 %); the other 2.2 h of assessments are quizzes, reviews and the walkthrough.

Weekly hours: 6.0, 6.0, 5.75, 6.0, 6.0, 5.17, 5.5, 3.5 (sum 43.92). Free time per week: 0.0, 0.0, 0.25, 0.0, 0.0, 0.83, 0.5, 2.5 h (sum 4.08).

### Adjustments
If the learner falls behind:
1. Use the buffer first: weeks 6, 7 and 8 hold 3.8 h of free time. Weeks 1, 2, 4 and 5 are full, so an overrun there moves work into the next week; M2 (rated hard in 02) gets priority.
2. Compress study next: skim Book ch. 8 and the cookbook page (saves about 1 h). Study is already the thinnest category, so do not cut it below the C1-C3 quiz topics.
3. Keep E2.1, E4.1 and E5.2, which carry the main concepts. Shorten the Rustlings drills (E1.3, E3.3, E4.2) to the sections the next checkpoint tests; drop E1.2 and E3.2 first (0.75 h each) because CP1 and CP2 reuse the same ideas.
4. Shorten the capstone to the required feature set from 04 and drop the optional `--undo` or `--rules`. Never cut CP3 and CP4 (they back the final acceptance checks).
5. If a checkpoint fails, spend up to 1 h of buffer on review and redo only the failed part; do not start the next module group (M3 after C1, M5 after C2, M7 after C3) until it passes.

If the learner is ahead:
1. If the self-check in 02 shows Q1-Q4 are all correct, skip E1.1-E1.3 and part of M2 study and move the time into the capstone.
2. Add the 03 alternatives where they help: Book ch. 13.2 Iterators (1 h) before E3.2, anyhow crate docs (0.5 h) before E4.1, walkdir and clap docs (0.5 h each) before E5.1, Command Line Applications in Rust: Testing (1 h) before E6.1.
3. Read the full Book chapters instead of skimming (the 03 estimates), and add the optional `--undo` (move log) or `--rules` TOML extras in the capstone; use the Exercism Rust track for extra practice.
4. Take the strong rubric level in each checkpoint.

## Assumptions
- Weeks are counted from the stated start date 2026-10-02 as seven-day blocks; the learner studies up to 6 h in each.
- Skim-level study hours are my allocation to reach the 60 % hands-on target; they are lower than the 03 estimates, which assume a full read. A learner who finds the pages slower should use the buffer.
- Book ch. 10 is split 0.5 h (lifetimes, M2) and 1.5 h (traits and generics, M4). The ch. 10 lifetimes section is needed for E2.1 and C1.
- CP2 is placed after C2 (weeks 5-6) so that weeks 1-4 fit 24 h and C2 can close M4 at the end of week 4; CP1 is moved to week 3.
- E5.3 (Book ch. 12 type-along) is scheduled in week 7, before CP3, and replaces the separate reading of the M7 primary.
- Rustlings time is inside E1.3, E2.1, E3.3 and E4.2, so it is not counted again as study.
- Checkpoint minutes from 05 (75, 90, 100, 120) are converted to hours and paid from the reserve. Practical minutes in the checkpoints: 45, 60, 70, and 75 (60 acceptance run + 15 live change).

## Open Issues
- The 10 % buffer target (4.8 h) is missed by 0.7 h; 4.1 h (8.5 %) is unplanned. Cause: 24 h of practice and 6.4 h of assessments leave little room once study is kept at 13.5 h.
- Study is 13.5 h against 23 h of primaries in 03. The plan relies on skimming and on Rustlings for learning; weeks 1, 2 and 5 are full (0 h free) and are at risk first.
- The 64 % hands-on share counts the practical parts of the checkpoints. Measured only on exercises and capstone it is 24.0 of 43.9 h (55 %); 04 measures 24 h against the 40 h module time (60 %). The validator should confirm that the checkpoint practical tasks count as hands-on.
- E5.3 (2.0 h) and CP3 are both in week 7 after C3, so the learner does not get a checkpoint on Book ch. 12 material before the capstone; the C3 task (lister) covers the same CLI skills.
- Week 8 is light (3.5 h) and weeks 6-7 carry slack; if the learner wants more even spacing, move E5.3 to week 6 and CP4 partly to week 8.

## Sources
- none (derived from inputs)
