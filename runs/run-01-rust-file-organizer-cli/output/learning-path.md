# Learning Path: Build a small file organizer CLI in Rust in 8 weeks

## Overview
This path takes a learner with strong Python and some C, but no Rust, to a working, tested file organizer CLI (`tidy`). It runs for 8 weeks from 2026-10-02 to 2026-11-26 at 6 h/week, against a 48 h budget. Seven modules (M1-M7) are taken in prerequisite order. The early modules cover language fundamentals, ownership and error handling. The later modules cover the filesystem, CLI parsing, project structure and testing. The final module is the capstone. Each module pairs a free primary resource, mostly The Rust Book, with hands-on exercises that build pieces of the capstone, plus timed Rustlings drills. Checkpoints come at the end of weeks 2, 4 and 6, and a final assessment of the capstone comes in week 8. The plan schedules 43.92 h: 13.5 h study, 24.0 h practice and 6.42 h assessments. That leaves 4.1 h of unplanned buffer. Hands-on work makes up 64 % of planned hours.

| At a glance | Value |
|---|---|
| Modules | 7 (M1-M7) |
| Weeks | 8 (2026-10-02 to 2026-11-26; deadline ~2026-11-27) |
| Total hours | 43.92 h planned of 48 h budget (study 13.5, practice 24.0, assessments 6.42, buffer 4.1) |
| Resources | 22 free resource rows (19 module rows + 3 cross-cutting), 25 URLs in 03 |
| Checkpoints | 3 checkpoints (Checkpoint C1, C2, C3) + Final assessment, in weeks 2, 4, 6, 8 |
| Capstone | `tidy`, a file organizer CLI in Rust (M7), 7.0 h across milestones CP1-CP5 |

**Note on ids:** this document uses two id series. Competency ids from 02 are written as "competency C1" to "competency C12". Checkpoint ids from 05 are written as "Checkpoint C1" to "Checkpoint C3". Read "C1" in a table by its column heading.

## Learner Profile
| Area | Level | Evidence from input |
|---|---|---|
| Python | strong | "I know Python well" |
| C | basic | "some C" (taken as basic, the conservative reading) |
| Rust | none | "no Rust" in confirmed requirements |
| Command-line tool development | none | Not stated; conservative assumption |
| Memory and ownership concepts | basic | Inferred from some C; not verified |

**Constraints**
| Constraint | Value |
|---|---|
| Hours per week | 6 |
| Duration | 8 weeks (2026-10-02 to about 2026-11-27) |
| Total hour budget | 48 hours (6 h/week x 8 weeks) |
| Money budget | Free resources only (0 currency units) |
| Language of materials | English (assumed) |
| Tooling and platform | Not stated. Assumed: the learner can install the free Rust toolchain (rustup, cargo) on their own machine; no paid tools or services. |

**Preferences**
- Learning style: hands-on and project-based.
- Formats: free resources only. Interactive exercises and writing code are preferred over long passive reading or video.
- Pace: a steady 6 h/week over 8 weeks, with checkpoints to track progress.
- Avoid: paid courses, paid books, subscriptions and certification-oriented material.
- Certification target: none.

## Goals and Success Criteria
**Goal statement:** By 2026-11-27 the learner can design, implement, test and run a small file organizer CLI in Rust. The tool takes a directory and sorts or moves its files into subfolders by rule (for example by extension or category). It supports a dry-run mode and reports errors clearly. The learner builds it without copying a full solution.

**In scope:** the Rust fundamentals needed for a CLI (ownership and borrowing, structs and enums, error handling, collections, modules, and traits at a practical level); filesystem and path handling; argument parsing; basic testing with cargo; the capstone; and progress checkpoints.
**Out of scope:** certification preparation; async, networking and web frameworks; unsafe Rust, FFI and macros beyond basic use; GUI and cross-platform packaging; advanced performance tuning; paid resources.

**Success criteria**
1. The learning path totals at most 48 hours and fits 6 h/week over 8 weeks (2026-10-02 to about 2026-11-27).
2. Every resource in the path is free to access.
3. The path includes at least one checkpoint every 2 weeks, and each checkpoint is measurable.
4. By the end of week 8 the learner has a working file organizer CLI in Rust. It organizes files in a directory by rule, has a dry-run mode, and handles bad input without panicking.
5. The final project has automated tests (at least 5 passing `cargo test` cases) and builds with no compiler errors.
6. The path is hands-on: at least 60 % of the planned hours are coding practice or project work.

**How the plan meets them (from 06 and 07):** (1) 43.92 h, and no week goes over 6.0 h. (2) All 22 resource rows are free. (3) Checkpoints fall in weeks 2, 4, 6 and 8. (4) and (5) The capstone acceptance criteria and the Final assessment test them directly. (6) Hands-on time is 28.2 h of 43.92 h (64 %).

## Knowledge Gap Analysis
**Competency map (condensed)**
| Competency | Name | Target level | Current level | Gap |
|---|---|---|---|---|
| C1 | Rust toolchain and cargo workflow | Working | none | full |
| C2 | Core syntax, types, control flow, functions | Working | none (Rust); strong Python, basic C | partial |
| C3 | Ownership, borrowing, slices, basic lifetimes | Solid | basic (inferred from C, unverified) | full |
| C4 | Structs, enums, pattern matching, impl blocks | Solid | none | partial |
| C5 | Collections and iterators | Working | none | partial |
| C6 | Error handling (Result, Option, ?, custom errors, anyhow) | Solid | none | full |
| C7 | Traits and generics at a practical level | Basic | none | partial |
| C8 | Filesystem and paths (std::fs, Path/PathBuf, walkdir) | Working | none (Rust); strong Python | partial |
| C9 | CLI argument parsing (clap derive) and output | Working | none | partial |
| C10 | Modules, crates and project structure | Working | none | partial |
| C11 | Testing (unit, integration, tempfile directories) | Working | none | partial |
| C12 | Designing and finishing a small tool independently | Working | none (CLI development) | full |

Target levels: Basic means you can read and use it with a reference. Working means you can write it yourself with documentation. Solid means you can write and explain it without much lookup.

**Prioritized gaps**
1. Competency C3 (ownership, borrowing, lifetimes): the largest conceptual hurdle, and every later module relies on it.
2. Competency C6 (error handling): needed for the "no panics" criterion and used in all filesystem code.
3. Competencies C8 + C9 (filesystem and CLI parsing): the functional core of the organizer.
4. Competencies C4 + C5 (structs, enums, collections, iterators): used to model rules and process files.
5. Competency C11 (testing): needed for the 5-test criterion.
6. Competencies C1 + C2 + C10 (toolchain, syntax, modules): quick to close given the Python and C background.
7. Competency C7 (traits and generics): practical depth only, picked up in M4.
8. Competency C12 (capstone integration): closed last by building the project.

**Self-check before you start (from 02).** Answer these without looking anything up. If Q1-Q4 are all correct, you can skip M1 and M2 and move the saved time to the capstone. For a learner with no Rust, starting at M1 is the expected case.
1. What command creates a new Rust binary project, and which file lists its dependencies? (`cargo new <name>`; `Cargo.toml`)
2. In `let a = String::from("x"); let b = a; println!("{a}");` why does it not compile? (The String is moved to `b`, so `a` is no longer valid. Fix it by cloning or borrowing.)
3. What is the difference between `&T` and `&mut T`, and how many of each may exist at once? (Shared vs exclusive. Many `&T` or exactly one `&mut T`, not both at once.)
4. What does a function returning `Result<T, E>` give the caller, and what does `?` do? (`Ok(T)` or `Err(E)`. `?` returns the error early or unwraps the Ok value.)
5. Which Python tools map to `std::fs`/`Path` and to `clap`? (`os`/`shutil`/`pathlib` and `argparse`.)

## Learning Path
Modules are listed in prerequisite order: M2 requires M1, M3 requires M2, M4 requires M3, M5 requires M4, M6 requires M4, and M7 requires M5 and M6. Hours are the module estimates from 02, 40 h in total. Weeks follow 06.

### M1 - Toolchain, cargo and Rust syntax for Python programmers
- **Purpose:** install the toolchain and learn Rust syntax quickly, skipping general programming concepts you already know. Difficulty: easy. Weeks: 1.
- **Competencies:** C1, C2.
- **Primary resource:** [The Rust Book ch. 1 and 3: Getting Started, Common Programming Concepts](https://doc.rust-lang.org/book/ch01-00-getting-started.html) ([ch. 3](https://doc.rust-lang.org/book/ch03-00-common-programming-concepts.html)). Skimmed in 1.5 h; 03 estimates 2.5 h for a full read.
- **Exercises:** E1.1 Hello cargo and quality tools; E1.2 Extension counter (port from Python); E1.3 Rustlings basics (timed).
- **Checkpoint:** Checkpoint C1 (end of week 2, together with M2).
- **Hours:** 4 (exercises 2.0).

### M2 - Ownership, borrowing, slices and lifetimes
- **Purpose:** close the largest gap. Start from the beginning and do not skip. Difficulty: hard. Weeks: 1-2.
- **Competencies:** C3.
- **Primary resource:** [The Rust Book ch. 4: Understanding Ownership](https://doc.rust-lang.org/book/ch04-00-understanding-ownership.html), 2.0 h scheduled (3 h in 03). Also read the lifetimes section of [Book ch. 10](https://doc.rust-lang.org/book/ch10-00-generics.html), 0.5 h in week 1.
- **Exercises:** E2.1 Fix-the-compiler ownership drills (timed Rustlings); E2.2 Borrowing string helpers.
- **Checkpoint:** Checkpoint C1 (end of week 2) covers M1-M2.
- **Hours:** 7 (exercises 3.5). If you fall behind, move 1-2 h from the buffer into M2 rather than shortening M7.

### M3 - Structs, enums, pattern matching, collections and iterators
- **Purpose:** model file categories and process file lists. Python classes and dicts help, but pattern matching on enums is new. Difficulty: medium. Weeks: 2-3, starting after Checkpoint C1.
- **Competencies:** C4, C5.
- **Primary resource:** [The Rust Book ch. 5, 6, 8: Structs, Enums, Collections](https://doc.rust-lang.org/book/ch05-00-structs.html) ([ch. 6](https://doc.rust-lang.org/book/ch06-00-enums.html), [ch. 8](https://doc.rust-lang.org/book/ch08-00-common-collections.html)). Skimmed in 2.0 h (4 h in 03).
- **Exercises:** E3.1 Category enum and classifier; E3.2 Group files with iterators; E3.3 Rustlings structs, enums, collections, iterators (timed). Capstone milestone CP1 Design note.
- **Checkpoint:** Checkpoint C2 (end of week 4) covers M3-M4.
- **Hours:** 6 (exercises 3.0 + capstone 0.5).

### M4 - Error handling, traits and generics basics
- **Purpose:** handle errors without panicking, and get enough traits and generics to read the std and clap APIs. Difficulty: medium-hard. Weeks: 3-4.
- **Competencies:** C6, C7.
- **Primary resource:** [The Rust Book ch. 9: Error Handling](https://doc.rust-lang.org/book/ch09-00-error-handling.html), 1.5 h scheduled (2 h in 03).
- **Required reading:** [The Rust Book ch. 10: Generic Types, Traits, and Lifetimes](https://doc.rust-lang.org/book/ch10-00-generics.html), 1.5 h in week 4 plus 0.5 h of lifetimes in week 1. 03 lists it as an "alternative", but it is the only resource for competency C7, so treat it as mandatory. [anyhow crate docs](https://docs.rs/anyhow) are optional (0.5 h).
- **Exercises:** E4.1 Custom error type for the organizer; E4.2 Rustlings errors, generics, traits (timed). Capstone milestone CP2 Core engine, scheduled after Checkpoint C2 in weeks 5-6.
- **Checkpoint:** Checkpoint C2 (end of week 4). Do not start M5 until it passes.
- **Hours:** 6 (exercises 3.0 + capstone 1.5).

### M5 - Filesystem, paths and CLI argument parsing
- **Purpose:** the functional core of the organizer. Use what you know from Python's pathlib, os.walk, shutil and argparse as a map. Difficulty: medium. Weeks: 5-6, plus E5.3 in week 7.
- **Competencies:** C8, C9.
- **Primary resource (bundle, read in order):** [std::fs module docs](https://doc.rust-lang.org/std/fs/index.html), then [Rust Cookbook: Directory Traversal](https://rust-lang-nursery.github.io/rust-cookbook/file/dir.html), then [Command Line Applications in Rust: Parsing command line arguments](https://rust-cli.github.io/book/tutorial/cli-args.html). Scheduled as 0.5 + 0.5 + 2.0 h; 03 estimates 1.5 + 1 + 3 = 5.5 h.
- **Exercises:** E5.1 Directory lister with clap; E5.2 Move plan with dry-run; E5.3 Type-along: The Book ch. 12 I/O project. Capstone milestone CP3 Filesystem and CLI.
- **Checkpoint:** Checkpoint C3 (end of week 6) covers M5-M6.
- **Hours:** 6 (exercises 4.0 + capstone 2.0). There is no spare time in this module. If E5.3 overruns, take the time from the buffer.

### M6 - Modules, project structure and testing
- **Purpose:** keep the capstone maintainable and meet the 5-test criterion. Difficulty: medium. Weeks: 6.
- **Competencies:** C10, C11.
- **Primary resource:** [The Rust Book ch. 7 and 11: Modules, Automated Tests](https://doc.rust-lang.org/book/ch07-00-managing-growing-projects-with-packages-crates-and-modules.html) ([ch. 11](https://doc.rust-lang.org/book/ch11-00-testing.html)). Skimmed in 1.5 h (3 h in 03).
- **Exercises:** E6.1 Modules and first test suite. Capstone milestone CP4 Tests and structure.
- **Checkpoint:** Checkpoint C3 (end of week 6). Do not start M7 until it passes.
- **Hours:** 4 (exercises 1.5 + capstone 1.5).

### M7 - Capstone: file organizer CLI
- **Purpose:** build `tidy` on your own, starting from the E6.1 structure. Difficulty: medium-hard. Weeks: 7-8.
- **Competencies:** C12 (integrates C1-C11).
- **Primary resource:** [The Rust Book ch. 12: An I/O Project (minigrep)](https://doc.rust-lang.org/book/ch12-00-an-io-project.html), worked through as the E5.3 type-along in week 7 rather than read separately. It gives you a pattern to follow, not the final design.
- **Exercises:** capstone milestones CP1-CP5 (CP5 Polish and review falls inside M7 itself).
- **Checkpoint:** Final assessment (week 8).
- **Hours:** 7 (capstone total across CP1-CP5; 1.5 h of it is CP5 inside M7).

## Weekly Schedule
Week n runs for 7 days from 2026-10-02 + 7(n-1) days. Week 1 is 10-02 to 10-08 and week 8 is 11-20 to 11-26. "Book" is The Rust Book (doc.rust-lang.org/book).

| Week | Modules | Study (03) | Practice (04) | Checkpoint (05) | Planned hours |
|---|---|---|---|---|---|
| 1 | M1, M2 | Book ch. 1 and 3, skim (1.5 h); Book ch. 4 Understanding Ownership (2.0 h); Book ch. 10 lifetimes section (0.5 h) | E1.1 (0.5 h), E1.2 (0.75 h), E1.3 (0.75 h) | — | 6.0 |
| 2 | M2, M3 (start) | Book ch. 5 and 6 Structs and Enums, skim (1.25 h, after Checkpoint C1) | E2.1 (2.0 h), E2.2 (1.5 h) | Checkpoint C1 (1.25 h, end of week) | 6.0 |
| 3 | M3, M4 (start) | Book ch. 8 Collections, skim (0.75 h); Book ch. 9 Error Handling (1.5 h) | E3.1 (0.75 h), E3.2 (0.75 h), E3.3 (1.5 h), CP1 design note (0.5 h) | — | 5.75 |
| 4 | M4 | Book ch. 10 Generics and Traits, rest (1.5 h) | E4.1 (1.5 h), E4.2 (1.5 h) | Checkpoint C2 (1.5 h, end of week, after M4) | 6.0 |
| 5 | M5 | Command Line Applications in Rust: Parsing command line arguments, skim (2.0 h); std::fs module docs (0.5 h); Rust Cookbook Directory Traversal (0.5 h) | E5.1 (0.75 h), E5.2 (1.25 h), CP2 core engine, part 1 (1.0 h) | — | 6.0 |
| 6 | M5 (close), M6 | Book ch. 7 and 11 Modules, Automated Tests, skim (1.5 h) | E6.1 (1.5 h), CP2 core engine, part 2 (0.5 h) | Checkpoint C3 (1.67 h, end of week, after M6) | 5.17 |
| 7 | M7 (start) | — (Book ch. 12 is covered by the E5.3 type-along) | E5.3 (2.0 h), CP3 filesystem and CLI (2.0 h), CP4 tests and structure (1.5 h) | — | 5.5 |
| 8 | M7 | — | CP5 polish and review (1.5 h) | Final assessment (2.0 h) | 3.5 |
| Total | | 13.5 h | 24.0 h | 6.42 h | 43.92 |

Free time per week: 0.0, 0.0, 0.25, 0.0, 0.0, 0.83, 0.5, 2.5 h, for 4.08 h in total. Week 8 is deliberately light: it holds the fix cycle for the Final assessment and the buffer for earlier overruns.

**Budget check**
| Category | Hours | Share of 48 h |
|---|---|---|
| Study | 13.5 | 28.1 % |
| Practice (exercises 17.0 + capstone 7.0) | 24.0 | 50.0 % |
| Assessments (Checkpoint C1 1.25, C2 1.5, C3 1.67, Final 2.0) | 6.4 | 13.4 % |
| Buffer (unplanned) | 4.1 | 8.5 % |
| **Total** | **48.0** | **100 %** |

Hands-on share of planned time is 28.2 h of 43.92 h, or 64 %. That is practice (24.0 h) plus the practical tasks inside the checkpoints (4.2 h). Counting exercises and capstone only, it is 24.0 of 43.9 h (55 %).

**Milestones**
| Week | Milestone | Evidence |
|---|---|---|
| 1 | Toolchain installed, syntax basics done | E1.1 builds with zero clippy warnings; E1.2 output equals the Python script; E1.3 sections passing |
| 2 | Ownership understood | Checkpoint C1 passed (quiz at least 5/6, all rubric criteria at pass); E2.1 and E2.2 deliverables |
| 3 | Capstone design fixed | CP1 one-page design note; E3.1, E3.2, E3.3 deliverables |
| 4 | Language core confirmed | Checkpoint C2 passed (expense tally task and quiz); E4.1 with no `unwrap()` in non-test code |
| 5 | Filesystem and CLI basics work | E5.1 `--help` output saved; E5.2 run log of dry run versus real run |
| 6 | Structure and tests in place | Checkpoint C3 passed (lister task and quiz); E6.1 with 7 passing tests; CP2 core engine tested |
| 7 | Organizer works on disk | CP3 (`--dry-run`, `--recursive`, conflict skip, exit codes); CP4 with at least 8 passing tests, clippy clean; E5.3 minigrep with own extension |
| 8 | `tidy` finished and reviewed | CP5 README and demo run log; Final assessment passed (all rubric criteria at pass) |

**If you fall behind**
1. Use the buffer first. Weeks 6, 7 and 8 hold 3.8 h of free time. Weeks 1, 2, 4 and 5 are full, so an overrun there pushes work into the next week. M2 (rated hard) gets priority.
2. Compress study next: skim Book ch. 8 and the Cookbook page more lightly (saves about 1 h). Do not cut study below the topics the Checkpoint C1-C3 quizzes test.
3. Keep E2.1, E4.1 and E5.2, which carry the main concepts. Shorten the Rustlings drills (E1.3, E3.3, E4.2) to the sections the next checkpoint tests. Drop E1.2 and E3.2 first (0.75 h each).
4. Cut the capstone back to the required feature set and drop the optional `--undo` or `--rules`. Never cut CP3 and CP4, because the final acceptance checks depend on them.
5. If a checkpoint fails, spend up to 1 h of buffer on review and redo only the failed part. Do not start the next module group (M3 after Checkpoint C1, M5 after Checkpoint C2, M7 after Checkpoint C3) until it passes.

**If you are ahead**
1. If the self-check shows Q1-Q4 are all correct, skip E1.1-E1.3 and part of the M2 study, and move that time into the capstone.
2. Add these alternatives: Book ch. 13.2 Iterators (1 h) before E3.2; anyhow crate docs (0.5 h) before E4.1; walkdir and clap docs (0.5 h each) before E5.1; Command Line Applications in Rust: Testing (1 h) before E6.1.
3. Read the full Book chapters instead of skimming, add the optional `--undo` (move log) or `--rules` TOML extras to the capstone, and use the Exercism Rust track for extra practice.
4. Aim for the "strong" rubric level in each checkpoint.

## Exercises and Projects
**Practice principles:** each exercise produces a piece of the organizer, so no work is thrown away. Read a topic for up to 40 minutes, then do the matching exercise. Run `cargo fmt`, `cargo clippy` and `cargo test` before calling an exercise done. Keep everything in one Git repository, with one folder per exercise (`exercises/e1_1/` and so on) and the capstone in `tidy/`. Time-box each exercise to 1.5x its estimate.

**Exercise index**
| Id | Module | Title | Competencies | Deliverable | Est. hours | Difficulty | Week |
|---|---|---|---|---|---|---|---|
| E1.1 | M1 | Hello cargo and quality tools | C1 | Project that builds with zero clippy warnings | 0.5 | easy | 1 |
| E1.2 | M1 | Extension counter (port from Python) | C2 | `e1_2` project plus the Python script | 0.75 | easy | 1 |
| E1.3 | M1 | Rustlings basics (timed) | C2 | Sections passing plus a time log and a 5-line "surprises" note | 0.75 | easy | 1 |
| E2.1 | M2 | Fix-the-compiler ownership drills (timed Rustlings) | C3 | Rustlings sections passing plus a notes file with rule comments and time log | 2.0 | hard | 2 |
| E2.2 | M2 | Borrowing string helpers | C3 | `e2_2` project, no `.clone()` or `.to_string()` in the helpers | 1.5 | hard | 2 |
| E3.1 | M3 | Category enum and classifier | C4 | `e3_1` project | 0.75 | medium | 3 |
| E3.2 | M3 | Group files with iterators | C5 | `e3_2` project reusing E3.1 and E2.2 code | 0.75 | medium | 3 |
| E3.3 | M3 | Rustlings structs, enums, collections, iterators (timed) | C4, C5 | Sections passing plus time log | 1.5 | medium | 3 |
| E4.1 | M4 | Custom error type for the organizer | C6, C7 | `e4_1` project with the error type in `error.rs` | 1.5 | medium-hard | 4 |
| E4.2 | M4 | Rustlings errors, generics, traits (timed) | C6, C7 | Sections passing plus time log and notes | 1.5 | medium-hard | 4 |
| E5.1 | M5 | Directory lister with clap | C8, C9 | `e5_1` project; `--help` output saved in a file | 0.75 | medium | 5 |
| E5.2 | M5 | Move plan with dry-run | C8, C9 | `e5_2` project and a short run log of dry run versus real run | 1.25 | medium | 5 |
| E5.3 | M5 | Type-along: The Book ch. 12 I/O project | C6, C9, C10 | `minigrep` project with your own extension and the comparison note | 2.0 | medium | 7 |
| E6.1 | M6 | Modules and first test suite | C10, C11 | `e6_1` project with 7 passing tests | 1.5 | medium | 6 |
| **Total** | | | | | **17.0** | | |

The Competencies column uses competency ids from 02. Full steps and self-checks for each exercise are in 04-exercises.md.

### Capstone: `tidy` - a file organizer CLI in Rust (M7)
A command-line tool that takes a directory and moves its files into category subfolders by extension. It has a dry-run mode and clear error messages. The learner starts from the E6.1 structure and extends it on their own, without copying a full solution.

**Feature set**
- Required: a directory argument, `--dry-run`, `--recursive`, category rules by extension, skipping name conflicts with a report, and a summary at the end (moved, skipped, failed).
- Required: no panics on bad input (missing path, no permission, a file given instead of a directory).
- Optional extra, only if time remains: `--undo` using a log of moves, or a rules file (TOML) read from `--rules`.

**Milestones** (weeks from 06)
| Milestone | Module | Content | Hours | Week |
|---|---|---|---|---|
| CP1 Design note | M3 | One page: features, folder layout, data types (reuses E3.1, E3.2) | 0.5 | 3 |
| CP2 Core engine | M4 | `classify`, `plan`, error enum; plan building is pure and tested | 1.5 | 5 (1.0 h) and 6 (0.5 h) |
| CP3 Filesystem and CLI | M5 | Walking, `--dry-run`, `--recursive`, conflict handling, exit codes | 2.0 | 7 |
| CP4 Tests and structure | M6 | At least 8 tests including temp-directory integration tests; clippy clean | 1.5 | 7 |
| CP5 Polish and review | M7 | README with usage, error review (no `unwrap` in non-test code), final demo run on a sample tree | 1.5 | 8 |

**Deliverables:** the `tidy` repository (source, `Cargo.toml`, `Cargo.lock`), a README, the tests, and a recorded demo run log covering a dry run, a real run and the error cases.

**Acceptance criteria**
1. `cargo build` finishes with no errors and `cargo clippy` shows no warnings.
2. `cargo test` has at least 5 passing tests (target 8), including at least one integration test that uses a temp directory.
3. Running with `--dry-run` prints the plan and changes nothing on disk.
4. A real run moves files into the correct category folders and prints a summary.
5. A missing path, a file given as the directory, and a name conflict each produce a clear message and a non-zero exit code, with no panic. On a conflict the tool skips the file and reports it.
6. The learner can explain in their own words the ownership choices in two functions (checked at the final checkpoint).

**Est. hours:** 7.0. Together with the exercises (17.0 h), hands-on practice is 24.0 h.

## Checkpoints and Assessments
Each checkpoint has a closed-book quiz of 6 questions followed by an open-book practical task done with `cargo`. To pass, you need at least 5/6 on the quiz and every rubric criterion at "pass" level. If you fail, review the weak module for up to 1 h from the buffer, redo only the failed part, and do not start the next module group until it passes. The full quiz questions and answers are in 05-assessments.md.

| Checkpoint | When | Competencies tested | Practical task | Pass criterion | Est. time |
|---|---|---|---|---|---|
| Checkpoint C1 | after M2, end of week 2 | competencies C1, C2, C3 | `count_words`, `longest_word`, `push_all` without needless cloning; reproduce and fix one move error and one borrow conflict | quiz >= 5/6 and all 4 rubric criteria at pass | 75 min (20 quiz, 45 practical, 10 review) |
| Checkpoint C2 | after M4, end of week 4 | competencies C4, C5, C6, C7 | "Expense tally": struct `Entry`, enum `Kind`, custom error or anyhow for bad lines, totals via `HashMap`, `Display` for `Entry`; reports malformed lines and continues | quiz >= 5/6 and all 5 rubric criteria at pass | 90 min (20 quiz, 60 practical, 10 review) |
| Checkpoint C3 | after M6, end of week 6 | competencies C8, C9, C10, C11 | `lister` CLI with `dir` and `--dry-run`, moves files into subfolders by extension (`misc/` for none), at least two modules, at least 3 tests (one with `tempfile`) | quiz >= 5/6 and all 4 rubric criteria at pass | 100 min (20 quiz, 70 practical, 10 review) |
| Final assessment | after M7, week 8 | success criteria 4 and 5 (capstone) | Acceptance review of `tidy` on a clean clone | every rubric criterion at pass | 120 min (60 acceptance run, 20 walkthrough, 15 live change, 25 buffer) |
| **Total** | | | | | **385 min (about 6.4 h)** |

**Rubric criteria per checkpoint**
- Checkpoint C1: Builds and runs; Borrowing; Lifetimes; Error reading.
- Checkpoint C2: Data model; Error handling; Collections and iterators; Traits; Robustness.
- Checkpoint C3: CLI; Filesystem; Structure; Tests.

**Final assessment: acceptance checks** (run on a clean clone)
1. `cargo build` completes with no errors.
2. `cargo test` shows at least 5 passing tests and no failures.
3. Running the tool on a prepared test directory organizes the files into subfolders by rule. The directory has mixed extensions, one file with no extension and one name collision.
4. Running with `--dry-run` prints the planned moves and leaves the directory unchanged. Compare a file listing before and after.
5. Bad input does not panic. A nonexistent directory, a path that is a file, and a read-only target each produce a readable message and a non-zero exit code.
6. A walkthrough of about 20 min, spoken or written, without notes: explain one ownership decision, one error-handling decision and one module boundary in the code.
7. No copied full solution: name the sources you used for individual techniques, and make one small change live (for example a new category) within 15 min.

| Criterion | Pass | Strong |
|---|---|---|
| Functionality | Checks 1-4 pass | Collisions handled safely and reported |
| Robustness | Check 5 passes for all three cases | Errors use a custom type; exit codes documented |
| Tests | At least 5 passing tests, including one dry-run and one error case | Tests cover collisions and use temp directories throughout |
| Code quality | `cargo clippy` has no errors; `cargo fmt` applied; at least 2 modules | Zero clippy warnings; README with usage examples |
| Understanding | Walkthrough explains the three decisions correctly | Can name an alternative design and its trade-off |
| Independence | Live change completed within 15 min | Change includes a new test |

If a check fails, fix it and re-run only the failed checks. One fix cycle is included in the time estimate. No certification is targeted.

## Resources
All resources are free. URLs were verified with WebFetch on 2026-10-02. The validator re-fetched 14 of them: the 13 primaries and Book ch. 10. Hours are the estimates in 03 for a full read. The schedule uses shorter, skim-level times (see Weekly Schedule).

### M1 - Toolchain, cargo and Rust syntax for Python programmers
| Resource | Type | Est. hours | Level | Role |
|---|---|---|---|---|
| [The Rust Book ch. 1 and 3: Getting Started, Common Programming Concepts](https://doc.rust-lang.org/book/ch01-00-getting-started.html) ([ch. 3](https://doc.rust-lang.org/book/ch03-00-common-programming-concepts.html)) | docs | 2.5 | beginner | primary |
| [Rustlings (intro exercises)](https://rustlings.rust-lang.org/) | interactive | 1.5 | beginner | alternative |
| [Comprehensive Rust (Day 1)](https://google.github.io/comprehensive-rust/) | course | 2 | beginner | alternative |

### M2 - Ownership, borrowing, slices and lifetimes
| Resource | Type | Est. hours | Level | Role |
|---|---|---|---|---|
| [The Rust Book ch. 4: Understanding Ownership](https://doc.rust-lang.org/book/ch04-00-understanding-ownership.html) | docs | 3 | beginner | primary |
| [Rustlings (move semantics, ownership exercises)](https://github.com/rust-lang/rustlings/) | interactive | 2.5 | beginner | alternative |
| [Brown University interactive Rust Book ch. 4](https://rust-book.cs.brown.edu/ch04-00-understanding-ownership.html) | docs/quiz | 3 | beginner | alternative |

Lifetimes basics are in [Book ch. 10](https://doc.rust-lang.org/book/ch10-00-generics.html). Read its lifetimes section during M2 (0.5 h in week 1).

### M3 - Structs, enums, pattern matching, collections and iterators
| Resource | Type | Est. hours | Level | Role |
|---|---|---|---|---|
| [The Rust Book ch. 5, 6, 8: Structs, Enums, Collections](https://doc.rust-lang.org/book/ch05-00-structs.html) ([ch. 6](https://doc.rust-lang.org/book/ch06-00-enums.html), [ch. 8](https://doc.rust-lang.org/book/ch08-00-common-collections.html)) | docs | 4 | beginner | primary |
| [The Rust Book ch. 13.2: Iterators](https://doc.rust-lang.org/book/ch13-02-iterators.html) | docs | 1 | beginner | alternative |
| [Rust by Example](https://doc.rust-lang.org/rust-by-example/) | docs/examples | 2 | beginner | alternative |

### M4 - Error handling, traits and generics basics
| Resource | Type | Est. hours | Level | Role |
|---|---|---|---|---|
| [The Rust Book ch. 9: Error Handling](https://doc.rust-lang.org/book/ch09-00-error-handling.html) | docs | 2 | beginner | primary |
| [The Rust Book ch. 10: Generic Types, Traits, and Lifetimes](https://doc.rust-lang.org/book/ch10-00-generics.html) | docs | 3 | beginner | required (listed as alternative in 03; only resource for competency C7) |
| [anyhow crate docs](https://docs.rs/anyhow) | docs | 0.5 | intermediate | alternative |

### M5 - Filesystem, paths and CLI argument parsing
| Resource | Type | Est. hours | Level | Role |
|---|---|---|---|---|
| Primary bundle (competencies C8 + C9): [std::fs module docs](https://doc.rust-lang.org/std/fs/index.html) (1.5 h) + [Rust Cookbook: Directory Traversal](https://rust-lang-nursery.github.io/rust-cookbook/file/dir.html) (1 h), then [Command Line Applications in Rust: Parsing command line arguments](https://rust-cli.github.io/book/tutorial/cli-args.html) (3 h) | docs + recipes + tutorial | 5.5 | intermediate | primary |
| [walkdir crate docs](https://docs.rs/walkdir/) | docs | 0.5 | intermediate | alternative |
| [clap crate docs](https://docs.rs/clap) | docs | 0.5 | intermediate | alternative |

### M6 - Modules, project structure and testing
| Resource | Type | Est. hours | Level | Role |
|---|---|---|---|---|
| [The Rust Book ch. 7 and 11: Modules, Automated Tests](https://doc.rust-lang.org/book/ch07-00-managing-growing-projects-with-packages-crates-and-modules.html) ([ch. 11](https://doc.rust-lang.org/book/ch11-00-testing.html)) | docs | 3 | beginner | primary |
| [Command Line Applications in Rust: Testing](https://rust-cli.github.io/book/tutorial/testing.html) | tutorial | 1 | intermediate | alternative |

### M7 - Capstone: file organizer CLI
| Resource | Type | Est. hours | Level | Role |
|---|---|---|---|---|
| [The Rust Book ch. 12: An I/O Project (minigrep)](https://doc.rust-lang.org/book/ch12-00-an-io-project.html) | project tutorial | 3 | intermediate | primary (done as the E5.3 type-along, 2.0 h) |
| [Exercism Rust track](https://exercism.org/tracks/rust) | interactive | 3 | beginner-intermediate | alternative |

### Cross-cutting resources
| Resource | Type | Est. hours | Level | Role |
|---|---|---|---|---|
| [clap crate docs (derive tutorial and reference)](https://docs.rs/clap) | docs | reference | intermediate | alternative (4.6.7 seen) |
| [walkdir crate docs](https://docs.rs/walkdir/) | docs | reference | intermediate | alternative |
| [Rustlings (setup and full set)](https://rustlings.rust-lang.org/) | interactive | see modules | beginner | alternative (weekly practice across M1-M4) |

Primary resource hours total 23 h, against 40 h of module estimates. The schedule plans 13.5 h of study.

## Assumptions and Risks
**Assumptions**
- The start date is 2026-10-02 and weeks are seven-day blocks from that date. The total budget is 48 h (6 h/week x 8 weeks).
- Requirements were confirmed through the non-interactive fallback. All eight items were stated explicitly in the request, so no defaults were needed.
- C experience is read as "basic" and CLI experience as none (conservative readings). Materials are in English, and the learner can install the Rust toolchain and the free crates `clap`, `walkdir` and `tempfile` from crates.io, which needs internet access.
- The 60 % hands-on target, the 5-test minimum and the one-checkpoint-per-2-weeks frequency are conservative targets set in 01. "Hands-on" means exercises, capstone work and the practical parts of checkpoints. Reading, quizzes and reviews do not count.
- Module hours (02) and resource hours (03) are estimates for an experienced programmer and are not taken from the sources. The 24 h of practice sits inside the 40 h of module time and is counted once. Checkpoint time (6.4 h) comes from the reserve.
- Study hours are skim-level allocations (13.5 h). Rustlings time is counted inside E1.3, E2.1, E3.3 and E4.2, not as study.
- The capstone feature set was fixed in 04 because 02 left it open. `--undo` and `--rules` are optional.
- There is no proctoring. The closed-book rules rely on the learner, and a reviewer is optional.

**Risks and open issues**
- **Study time is well below the resource estimates.** The schedule plans 13.5 h of study against 23 h of primary reading in 03. M5 filesystem reading is 1.0 h against 2.5 h in 03, and the separate ch. 12 reading is replaced by the E5.3 type-along. If you read more slowly than a skim, expect the 4.1 h buffer to absorb it. Weeks 1, 2, 4 and 5 have no free time, so they are at risk first. (Validator advisory)
- **Buffer is below target.** The buffer is 4.1 h (8.5 %) against a 10 % target (4.8 h). After 6.4 h of assessments, only about 1.6 h of the original 8 h reserve is left for remediation, and a failed Checkpoint C1 (M2 is rated hard) could use it up.
- **Book ch. 10 is required.** 03 lists it as an "alternative", but it is the only resource for competency C7. This document treats it as required reading for M4 (0.5 h in week 1, 1.5 h in week 4). (Validator advisory)
- **Id clash.** Checkpoint ids C1-C3 (05) clash with competency ids C1-C12 (02). This document writes "Checkpoint C1" and "competency C1" to tell them apart. (Validator advisory)
- **E5.3 timing.** E5.3 is an M5 exercise but runs in week 7, after Checkpoint C3, so Checkpoint C3 does not test its ch. 12 material. The 06 week table shows "M5 (close)" in week 6, which is slightly misleading. This is acceptable because the C3 `lister` task covers the same CLI skills. If you want more even spacing, move E5.3 to week 6 and part of CP4 to week 8. (Validator advisory)
- **Discrepancy: Book ch. 12 module.** 03 lists Book ch. 12 as the M7 primary, while 04 makes it the M5 exercise E5.3. This document follows 02 and 03 for module definitions and lists it under M7, and follows 04 and 06 for the exercise id and timing.
- **Discrepancy: milestone weeks.** 04 suggested CP1 in week 4, CP2 in week 5 and CP3 in week 6. 06 places CP1 in week 3, CP2 in weeks 5-6 and CP3 in week 7. This document follows 06.
- **Discrepancy: end date.** 01 gives the end as about 2026-11-27, and the 06 plan ends on 2026-11-26. This document follows 06. The deadline is still met.
- **Discrepancy: hands-on share.** The share depends on how it is measured: 64 % of planned hours including checkpoint practicals (06, 07), 62 % without the Final acceptance run (07), 60 % of the 40 h module time (04), or 55 % counting exercises and capstone only (06).
- **Topics not fully covered by resources.** Checkpoint C3 quiz Q3 (the fallback for cross-filesystem `rename`) and Final check 5 (read-only target) go slightly beyond the scheduled resources and depend on the OS. Cross-filesystem rename is discussed but not practised. (Validator advisory)
- **Operating system unknown.** Exercises are OS-neutral, but rename and permission-error behaviour may vary between systems. For example, `fs::rename` fails on moves across drives.
- **Rustlings section names** in E1.3, E2.1, E3.3 and E4.2 may differ between versions. The mapping came from the project description, so check the actual exercise folder.
- **Brown interactive edition:** no quizzes were visible on the chapter intro page, so confirm it fits before using it.
- **Citation status.** 04 Sources say "not opened this run". The links match URLs that 03 verified, so they do not mislead. (Validator advisory)
- **Curriculum shape.** The order in 02 comes from general knowledge of common free Rust paths, not from a cited source. No external syllabus is cited for the checkpoints.
- **Tooling.** The fetch MCP server was not available to the resource researcher or the validator, so URLs were verified with WebFetch. Check the MCP configuration for future runs.

## Sources
- [The Rust Book ch. 1: Getting Started](https://doc.rust-lang.org/book/ch01-00-getting-started.html) — docs, accessed 2026-10-02
- [The Rust Book ch. 3: Common Programming Concepts](https://doc.rust-lang.org/book/ch03-00-common-programming-concepts.html) — docs, accessed 2026-10-02
- [The Rust Book ch. 4: Understanding Ownership](https://doc.rust-lang.org/book/ch04-00-understanding-ownership.html) — docs, accessed 2026-10-02
- [Brown interactive Rust Book ch. 4](https://rust-book.cs.brown.edu/ch04-00-understanding-ownership.html) — docs, accessed 2026-10-02
- [Rustlings (GitHub)](https://github.com/rust-lang/rustlings/) — interactive, accessed 2026-10-02
- [Rustlings (site)](https://rustlings.rust-lang.org/) — interactive, accessed 2026-10-02
- [Rust by Example](https://doc.rust-lang.org/rust-by-example/) — docs, accessed 2026-10-02
- [Comprehensive Rust](https://google.github.io/comprehensive-rust/) — course, accessed 2026-10-02
- [The Rust Book ch. 5: Structs](https://doc.rust-lang.org/book/ch05-00-structs.html) — docs, accessed 2026-10-02
- [The Rust Book ch. 6: Enums](https://doc.rust-lang.org/book/ch06-00-enums.html) — docs, accessed 2026-10-02
- [The Rust Book ch. 8: Common Collections](https://doc.rust-lang.org/book/ch08-00-common-collections.html) — docs, accessed 2026-10-02
- [The Rust Book ch. 13.2: Iterators](https://doc.rust-lang.org/book/ch13-02-iterators.html) — docs, accessed 2026-10-02
- [The Rust Book ch. 9: Error Handling](https://doc.rust-lang.org/book/ch09-00-error-handling.html) — docs, accessed 2026-10-02
- [The Rust Book ch. 10: Generics, Traits, Lifetimes](https://doc.rust-lang.org/book/ch10-00-generics.html) — docs, accessed 2026-10-02
- [anyhow crate docs](https://docs.rs/anyhow) — docs, accessed 2026-10-02
- [Command Line Applications in Rust: Parsing arguments](https://rust-cli.github.io/book/tutorial/cli-args.html) — tutorial, accessed 2026-10-02
- [std::fs module docs](https://doc.rust-lang.org/std/fs/index.html) — docs, accessed 2026-10-02
- [Rust Cookbook: Directory Traversal](https://rust-lang-nursery.github.io/rust-cookbook/file/dir.html) — recipes, accessed 2026-10-02
- [The Rust Book ch. 7: Packages, Crates, Modules](https://doc.rust-lang.org/book/ch07-00-managing-growing-projects-with-packages-crates-and-modules.html) — docs, accessed 2026-10-02
- [The Rust Book ch. 11: Automated Tests](https://doc.rust-lang.org/book/ch11-00-testing.html) — docs, accessed 2026-10-02
- [Command Line Applications in Rust: Testing](https://rust-cli.github.io/book/tutorial/testing.html) — tutorial, accessed 2026-10-02
- [The Rust Book ch. 12: An I/O Project](https://doc.rust-lang.org/book/ch12-00-an-io-project.html) — project tutorial, accessed 2026-10-02
- [Exercism Rust track](https://exercism.org/tracks/rust) — interactive, accessed 2026-10-02
- [clap crate docs](https://docs.rs/clap) — docs, accessed 2026-10-02
- [walkdir crate docs](https://docs.rs/walkdir/) — docs, accessed 2026-10-02
- [Command Line Applications in Rust](https://rust-cli.github.io/book/) — free guide for CLI structure and testing, accessed 2026-10-02 (cited in 04, not opened in that run)
