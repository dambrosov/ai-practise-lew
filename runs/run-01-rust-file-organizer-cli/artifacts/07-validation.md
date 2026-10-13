---
artifact: 07-validation.md
agent: validator
run_id: run-01-rust-file-organizer-cli
attempt: 2
depends_on: [requirements-formalizer, knowledge-assessor, resource-researcher, practice-designer, assessment-designer, schedule-planner]
status: complete
sources_used: 14
---

# Validation: Rust file organizer CLI

## Summary
This is validation round 2. All seven gates were re-checked against the revised 03 (attempt 2), 04 (attempt 2) and 06 (attempt 2), plus the unchanged 01, 02, 05 and input.md. Overall verdict: **PASS**. All four round-1 failures are resolved:
- M5 now has a filesystem and CLI primary bundle (std::fs, Cookbook Directory Traversal, CLI-args), so gap C8 is covered.
- Exercises and capstone now total 24.0 h, up from 14 h.
- Hands-on work is 28.2 h of 43.92 h planned (64 %).
- Checkpoints fall at the end of weeks 2, 4, 6 and 8.

The plan stays within budget: 43.92 h of 48 h, the busiest week is 6.0 h, and it runs 8 weeks. All 14 URLs I re-fetched were reachable and on topic: the 13 primaries and Book ch. 10. The remaining observations are advisory only.

## Content

### Gate results
| Gate | Result | Evidence | Attributed agent (if FAIL) |
|---|---|---|---|
| coverage | PASS | Primaries in 03 per module: M1 Book ch. 1+3; M2 ch. 4; M3 ch. 5/6/8; M4 ch. 9; M5 bundle (std::fs + Cookbook dir for C8, CLI-args for C9); M6 ch. 7+11; M7 ch. 12. Prioritized gaps C3, C6, C8, C9, C4/C5, C11, C1/C2/C10 and C12 each map to a primary. C7 is covered by ch. 10, which 03 lists as an alternative marked "must be done" and which 06 schedules (0.5 h in week 1, 1.5 h in week 4); see Advisory. Exercises in 04: M1 E1.1-E1.3, M2 E2.1-E2.2, M3 E3.1-E3.3, M4 E4.1-E4.2, M5 E5.1-E5.3, M6 E6.1, M7 capstone `tidy` (CP1-CP5). Checkpoints in 05: C1 covers M1-M2, C2 covers M3-M4, C3 covers M5-M6, Final covers M7. | - |
| time-fit | PASS | I re-added the week rows of 06: 6.0 / 6.0 / 5.75 / 6.0 / 6.0 / 5.17 / 5.5 / 3.5 h. Every week is ≤ 6.0 h and the sum is 43.92 h ≤ 48 h. Column sums check out: study 13.5 h, practice 24.0 h (04 sums: exercises 17.0 h, capstone 7.0 h), assessments 6.42 h (75 + 90 + 100 + 120 min from 05). Duration is 8 weeks (2026-10-02 to 2026-11-26), which is ≤ 8 weeks. The 02 module estimates total 40 h ≤ 48 h. No tolerance was needed. | - |
| url-reachability | PASS | 03 lists 25 URLs. I re-fetched 14 on 2026-10-02: all 13 primary URLs plus Book ch. 10 (required for C7). All are ok and on topic. The std::fs page lists `read_dir`, `rename`, `create_dir_all` and `metadata`. The Cookbook page has walkdir and `create_dir_all` recipes. The CLI-args page covers `std::env::args` and clap `#[derive(Parser)]`. `mcp__fetch__fetch` is not in the validator toolset, so I used `WebFetch` (the skill's fallback). | - |
| prerequisite-order | PASS | Modules in 06: M1 in week 1, M2 in weeks 1-2, M3 in weeks 2-3 (after C1), M4 in weeks 3-4, M5 in weeks 5-6 (after C2), M6 in week 6, M7 in weeks 7-8 (after C3). Each module starts no earlier than its prerequisite (M2←M1, M3←M2, M4←M3, M5←M4, M6←M4, M7←M5+M6). CP2 (an M4 milestone) runs in weeks 5-6, after M4. E5.3 (an M5 type-along) runs in week 7, before CP3, as 04 requested. | - |
| consistency | PASS | Module ids and names match across 02-06. Every id that 06 references exists in 04/05: the 14 exercises E1.1-E6.1, milestones CP1-CP5, and checkpoints C1, C2, C3 and Final. All 14 exercises and all 5 milestones are scheduled exactly once. In free-only mode, all 22 resource rows in 03 are free and no primary is paid. The 03 Summary figures (19 + 3 rows, 25 URLs, 23 h primaries) match its tables. | - |
| structure | PASS | All six artifacts have complete frontmatter and the required sections (Summary, Content, Assumptions, Open Issues, Sources). Hours and counts are given in every hours table, and the 06 budget table sums to 48.0 h and 100 %. | - |
| requirements | PASS | Criterion 1: 43.92 h ≤ 48 h at ≤ 6 h/week. Criterion 2: all resources are free. Criterion 3: checkpoints fall in weeks 2, 4, 6 and 8, one per 2-week block. Criteria 4 and 5: capstone acceptance in 04 and the Final in 05 require dry-run, no panics and ≥ 5 tests. Criterion 6: hands-on is 24.0 h of practice plus 4.2 h of checkpoint practical tasks = 28.2 h of 43.92 h = 64 %. Excluding the Final's 60-min acceptance run, it is still 27.2 h = 62 %. Other constraints hold: content is in English, exercises are OS-neutral, there is no certification, and async, unsafe and packaging are excluded. | - |

### Findings
No gate fails. All round-1 failures are resolved:
- coverage (resource-researcher): 03 now has an M5 primary bundle that covers C8 (std::fs + Cookbook dir), and 06 schedules it in week 5. The Summary's primary total (23 h) now matches the Hours summary table.
- requirements, hands-on (practice-designer): 04 now has 17.0 h of exercises plus 7.0 h of capstone = 24.0 h. New ids (E1.3, E2.1 re-scoped, E3.3, E4.2, E5.3) were added and the old ids kept.
- requirements, hands-on (schedule-planner): hands-on is 64 %, with one consistent figure in the Summary and the Budget check. The method is stated in Open Issues.
- requirements, cadence (schedule-planner): C2 is at the end of week 4, CP2 is split 1.0 h + 0.5 h across weeks 5-6, and M5 starts only after C2.

**Advisory (no gate failure)**
- **Study time is below the primary estimates.** 06 plans 13.5 h of study against 23 h of 03 primary time. In particular, M5 filesystem reading is 1.0 h against 2.5 h in 03, and ch. 12 reading is replaced by E5.3. The learner should expect the 4.1 h buffer to absorb slower reading. Synthesis (08) should say this plainly.
- **Ch. 10 role in 03.** 03 lists Book ch. 10 as an "alternative" but also says it must be done, and it is the only resource for C7. Synthesis should present it as required reading for M4.
- **Checkpoint ids clash.** Checkpoint ids C1-C3 (05) clash with competency ids C1-C12 (02). Synthesis should label them clearly, for example "Checkpoint C1" versus "competency C1".
- **E5.3 timing.** E5.3 is an M5 exercise scheduled in week 7, after C3, so C3 does not test its ch. 12 material. The 06 week table lists "M5 (close)" in week 6, which is slightly misleading. This is acceptable because C3's lister task covers the same CLI skills.
- **04 citations.** 04 Sources still say "not opened this run". The links match URLs that 03 verified, so this does not mislead the learner.
- **Topics not fully backed by resources.** C3 quiz Q3 (cross-filesystem `rename` fallback) and Final check 5 (read-only target, OS-dependent behaviour) go slightly beyond the scheduled resources and are not OS-neutral. Both are carried over from round 1.

### Verification log
Tool: `WebFetch`, because `mcp__fetch__fetch` was not available in the validator toolset. Date: 2026-10-02.

| URL | Role in 03 | Status |
|---|---|---|
| https://doc.rust-lang.org/book/ch01-00-getting-started.html | M1 primary | ok |
| https://doc.rust-lang.org/book/ch03-00-common-programming-concepts.html | M1 primary | ok |
| https://doc.rust-lang.org/book/ch04-00-understanding-ownership.html | M2 primary | ok |
| https://doc.rust-lang.org/book/ch05-00-structs.html | M3 primary | ok |
| https://doc.rust-lang.org/book/ch06-00-enums.html | M3 primary | ok |
| https://doc.rust-lang.org/book/ch08-00-common-collections.html | M3 primary | ok |
| https://doc.rust-lang.org/book/ch09-00-error-handling.html | M4 primary | ok |
| https://doc.rust-lang.org/book/ch10-00-generics.html | M4 required alternative (C7, lifetimes) | ok (intro page; traits and lifetimes are in its subsections) |
| https://doc.rust-lang.org/std/fs/index.html | M5 primary (bundle, C8) | ok (read_dir, rename, create_dir_all, metadata listed) |
| https://rust-lang-nursery.github.io/rust-cookbook/file/dir.html | M5 primary (bundle, C8) | ok (walkdir and create_dir_all recipes) |
| https://rust-cli.github.io/book/tutorial/cli-args.html | M5 primary (bundle, C9) | ok (std::env::args and clap derive) |
| https://doc.rust-lang.org/book/ch07-00-managing-growing-projects-with-packages-crates-and-modules.html | M6 primary | ok |
| https://doc.rust-lang.org/book/ch11-00-testing.html | M6 primary | ok |
| https://doc.rust-lang.org/book/ch12-00-an-io-project.html | M7 primary | ok (minigrep) |

## Assumptions
- **Meaning of "hands-on" (criterion 6).** It covers exercises, capstone work and the practical parts of checkpoints. Reading, quizzes and review do not count. This is the same reading as in round 1. The result is 64 %, or 62 % if the Final acceptance run is not counted.
- **Checkpoint cadence (criterion 3).** It is checked over consecutive 2-week blocks: weeks 1-2, 3-4, 5-6 and 7-8.
- **Fetch tool.** I accepted WebFetch as the verifier because the fetch MCP tool was unavailable, following the web-research skill fallback.
- **Unchanged artifacts.** 05 is unchanged (attempt 1) and passed in round 1. I re-checked it only for ids, times and cadence.

## Open Issues
- The fetch MCP server was unavailable again to both resource-researcher and validator. Check the MCP configuration so that future runs use `mcp__fetch__fetch`, as the skill requires.
- The thin study allocation (13.5 h) is the main schedule risk; see Advisory. Synthesis should keep the 06 Adjustments section.

## Sources
- [The Rust Book ch. 1](https://doc.rust-lang.org/book/ch01-00-getting-started.html) — docs, accessed 2026-10-02
- [The Rust Book ch. 3](https://doc.rust-lang.org/book/ch03-00-common-programming-concepts.html) — docs, accessed 2026-10-02
- [The Rust Book ch. 4](https://doc.rust-lang.org/book/ch04-00-understanding-ownership.html) — docs, accessed 2026-10-02
- [The Rust Book ch. 5](https://doc.rust-lang.org/book/ch05-00-structs.html) — docs, accessed 2026-10-02
- [The Rust Book ch. 6](https://doc.rust-lang.org/book/ch06-00-enums.html) — docs, accessed 2026-10-02
- [The Rust Book ch. 7](https://doc.rust-lang.org/book/ch07-00-managing-growing-projects-with-packages-crates-and-modules.html) — docs, accessed 2026-10-02
- [The Rust Book ch. 8](https://doc.rust-lang.org/book/ch08-00-common-collections.html) — docs, accessed 2026-10-02
- [The Rust Book ch. 9](https://doc.rust-lang.org/book/ch09-00-error-handling.html) — docs, accessed 2026-10-02
- [The Rust Book ch. 10](https://doc.rust-lang.org/book/ch10-00-generics.html) — docs, accessed 2026-10-02
- [The Rust Book ch. 11](https://doc.rust-lang.org/book/ch11-00-testing.html) — docs, accessed 2026-10-02
- [The Rust Book ch. 12](https://doc.rust-lang.org/book/ch12-00-an-io-project.html) — docs, accessed 2026-10-02
- [std::fs module docs](https://doc.rust-lang.org/std/fs/index.html) — docs, accessed 2026-10-02
- [Rust Cookbook: Directory Traversal](https://rust-lang-nursery.github.io/rust-cookbook/file/dir.html) — recipes, accessed 2026-10-02
- [Command Line Applications in Rust: Parsing command line arguments](https://rust-cli.github.io/book/tutorial/cli-args.html) — tutorial, accessed 2026-10-02

```json
{
  "overall": "PASS",
  "failures": [],
  "notes": "Round 2: all 7 gates pass and all 4 round-1 failures are resolved. Planned 43.92 h of 48 h, max 6.0 h/week, 8 weeks; hands-on 28.2 h (64 %); checkpoints in weeks 2/4/6/8; 14 of 14 re-fetched URLs ok via WebFetch (fetch MCP unavailable). Advisory for synthesis: study (13.5 h) is below the 23 h primary estimate; present Book ch. 10 as required for M4; label checkpoint ids so they are not confused with competency ids."
}
```
