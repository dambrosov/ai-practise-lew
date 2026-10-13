---
artifact: 04-exercises.md
agent: practice-designer
run_id: run-01-rust-file-organizer-cli
attempt: 2
depends_on: [knowledge-assessor]
status: complete
sources_used: 4
---

# Practice Plan: Rust file organizer CLI

## Summary
Fourteen exercises (E1.1-E6.1, ids from attempt 1 unchanged, new ids added) across M1-M6 build the pieces of the capstone file organizer, and the capstone (M7) assembles them. Exercises total 17.0 h and the capstone 7.0 h, so hands-on work is 24.0 h. That is 60 % of the 40 h of module time in 02 (success criterion 6) and 50 % of the 48 h budget. The remaining 16 h of module time is reading, watching and checkpoints; the 8 h reserve is unallocated. Every exercise uses only the free Rust toolchain and free crates, and none depends on an operating system.

## Content

### Practice principles
- Build-first: each exercise produces a piece of the organizer (classification, errors, directory walking, move with dry-run, tests), so no work is thrown away. Timed Rustlings sections (E1.3, E2.1, E3.3, E4.2) give compiler feedback on each topic.
- Cadence: practice is at least 60 % of every study session (about 3.6 of 6 h per week). Read a topic for up to 40 minutes, then do the matching exercise. Run `cargo fmt`, `cargo clippy` and `cargo test` before calling an exercise done.
- Feedback loop: the compiler and clippy are the first reviewer, the self-check line is the second. Every second week a checkpoint (from the assessment designer) reuses the deliverables.
- Python bridge: where useful, write the Python version (pathlib/shutil) first for 5 minutes, then port it and compare behaviour.
- Keep all work in one Git repository, one folder per exercise (`exercises/e1_1/` etc.) and the capstone in `tidy/`. Time-box each exercise to 1.5x its estimate; if it overruns, note it and move on.

### Exercises by module

#### M1 - Toolchain, cargo and Rust syntax for Python programmers
| Field | E1.1 Hello cargo and quality tools | E1.2 Extension counter (port from Python) | E1.3 Rustlings basics (timed) |
|---|---|---|---|
| Objective | C1 | C2 | C2 |
| Steps | 1. Install via rustup, run `cargo new hello`. 2. Add a function with a typed argument and return value. 3. Run `cargo build`, `cargo run`, `cargo fmt`, `cargo clippy`. 4. Add one dependency to `Cargo.toml` and build. | 1. Write a short Python script that returns the extension of each name in a hard-coded list. 2. Port it to Rust with `for` loops, `match` and `if`. 3. Print results with `println!` formatting. 4. Compare both outputs. | 1. Install Rustlings and run `rustlings` in watch mode. 2. Complete the intro, variables, functions, if and primitive types sections. 3. Keep a log of start and end times. 4. Note each compiler message that surprised you. |
| Deliverable | Project that builds with zero clippy warnings | `e1_2` project plus the Python script | Sections passing plus a time log and a 5-line "surprises" note |
| Est. hours | 0.5 | 0.75 | 0.75 |
| Difficulty | easy | easy | easy |
| Self-check | `cargo clippy` is clean and you can explain what `Cargo.toml` and `Cargo.lock` do | Rust output equals Python output for 5 test names, including one with no extension | Rustlings shows all exercises of the chosen sections as done |

#### M2 - Ownership, borrowing, slices and lifetimes
| Field | E2.1 Fix-the-compiler ownership drills (timed Rustlings) | E2.2 Borrowing string helpers |
|---|---|---|
| Objective | C3 | C3 |
| Steps | 1. Complete the move semantics, references and borrowing, strings, slices and lifetimes sections of Rustlings. 2. For each fixed file, write one comment saying which rule was broken. 3. Re-do three exercises from memory the next day. 4. Log time per section. | 1. Write `fn extension(name: &str) -> Option<&str>` returning a slice. 2. Write `fn stem(name: &str) -> &str`. 3. Write `fn longest<'a>(a: &'a str, b: &'a str) -> &'a str` and explain the lifetime. 4. Call them from `main` without cloning. 5. Write 8 test names, including `"a.tar.gz"`, `".bashrc"` and `"noext"`, and check them in `main`. |
| Deliverable | Rustlings sections passing plus a notes file with rule comments and time log | `e2_2` project, no `.clone()` or `.to_string()` in the helpers |
| Est. hours | 2.0 | 1.5 |
| Difficulty | hard | hard |
| Self-check | You can answer self-check Q2 and Q3 from 02 aloud without notes | Helpers handle all 8 names without a panic and you can say who owns each returned slice |

#### M3 - Structs, enums, pattern matching, collections and iterators
| Field | E3.1 Category enum and classifier | E3.2 Group files with iterators | E3.3 Rustlings structs, enums, collections, iterators (timed) |
|---|---|---|---|
| Objective | C4 | C5 | C4, C5 |
| Steps | 1. Define `enum Category { Image, Document, Audio, Video, Archive, Other }`. 2. Write `fn classify(ext: Option<&str>) -> Category` with `match`. 3. Add `impl Category { fn folder_name(&self) -> &'static str }`. 4. Handle upper-case extensions. 5. Add 10-12 hard-coded cases checked in `main`. | 1. Take a `Vec<String>` of file names. 2. Build `HashMap<Category, Vec<String>>` using iterators and `entry().or_default()`. 3. Print counts per category, sorted. 4. Use at least one closure and one `.filter()` or `.map()` chain. 5. Write the Python `defaultdict` version and compare. | 1. Complete the structs, enums, strings, vecs, hashmaps and iterators sections of Rustlings. 2. Log time per section. 3. Rewrite one iterator exercise as a Python comprehension and back. |
| Deliverable | `e3_1` project | `e3_2` project reusing E3.1 and E2.2 code | Sections passing plus time log |
| Est. hours | 0.75 | 0.75 | 1.5 |
| Difficulty | medium | medium | medium |
| Self-check | Compiler confirms the `match` is exhaustive, with no wildcard hiding a case you meant to list | Output is identical on every run (sorted) and equals the Python version | Rustlings shows the chosen sections as done |

#### M4 - Error handling, traits and generics basics
| Field | E4.1 Custom error type for the organizer | E4.2 Rustlings errors, generics, traits (timed) |
|---|---|---|
| Objective | C6, C7 | C6, C7 |
| Steps | 1. Define `enum OrganizerError { Io(std::io::Error), InvalidPath(String), Conflict(String) }`. 2. Implement `Display` and `From<std::io::Error>`. 3. Write `fn read_names(dir: &str) -> Result<Vec<String>, OrganizerError>` using `?`. 4. In `main`, match on the result and print a friendly message with a non-zero exit code. 5. Try a missing path and a file path instead of a directory. 6. Add a second function that calls `read_names` with `?` and returns the same error type. | 1. Complete the options, error handling, generics and traits sections of Rustlings. 2. Log time per section. 3. For two exercises, write down in one sentence why `?` compiles or does not. |
| Deliverable | `e4_1` project with the error type in `error.rs` | Sections passing plus time log and notes |
| Est. hours | 1.5 | 1.5 |
| Difficulty | medium-hard | medium-hard |
| Self-check | Bad input never prints "panicked at"; searching for `unwrap()` finds none in non-test code; you can explain what `?` does (self-check Q4) | Rustlings shows the chosen sections as done |

#### M5 - Filesystem, paths and CLI argument parsing
| Field | E5.1 Directory lister with clap | E5.2 Move plan with dry-run | E5.3 Type-along: The Book ch. 12 I/O project |
|---|---|---|---|
| Objective | C8, C9 | C8, C9 | C6, C9, C10 |
| Steps | 1. Add `clap` (derive) and `walkdir`. 2. Define args: `path`, `--recursive`. 3. List files with `PathBuf` and `file_name()`. 4. Return `OrganizerError` for bad paths. | 1. Add `--dry-run`. 2. Build a plan `Vec<(PathBuf, PathBuf)>` of source and destination using E3.1. 3. In dry-run print the plan; otherwise `create_dir_all` and `fs::rename`. 4. Skip, and report, a destination that already exists. 5. Run only inside a temp directory you created. | 1. Type (do not paste) the `minigrep` project from chapter 12 of The Rust Programming Language. 2. Do the refactor into `lib.rs` and `main.rs` and the `Config` struct. 3. Add the case-insensitive option and the environment-variable switch. 4. Add one extension of your own (for example `--count`). 5. Write a 5-line comparison with how `argparse` would do it. |
| Deliverable | `e5_1` project; `--help` output saved in a file | `e5_2` project and a short run log of dry run versus real run | `minigrep` project with your own extension and the comparison note |
| Est. hours | 0.75 | 1.25 | 2.0 |
| Difficulty | medium | medium | medium |
| Self-check | `--help` shows every flag and a missing path gives a clear error | Dry run changes nothing on disk (verify with a directory listing before and after) and the real run matches the printed plan | `cargo test` of `minigrep` passes and your extension works without copying code |

#### M6 - Modules, project structure and testing
| Field | E6.1 Modules and first test suite |
|---|---|
| Objective | C10, C11 |
| Steps | 1. Split E5.2 code into `main.rs`, `cli.rs`, `classify.rs`, `error.rs`, `mover.rs`. 2. Add `tempfile` as a dev-dependency. 3. Write 4 unit tests for `classify` and `extension`. 4. Write 2 integration tests in `tests/` that organize a temp directory (one with a name conflict). 5. Write 1 test that checks dry-run leaves files untouched. 6. Run `cargo test` with output shown and read one failing test on purpose. |
| Deliverable | `e6_1` project with 7 passing tests |
| Est. hours | 1.5 |
| Difficulty | medium |
| Self-check | `cargo test` shows 7 passed, 0 failed; each module compiles with only the `pub` items that other modules use |

### Capstone project

**Title:** `tidy` - a file organizer CLI in Rust (module M7).

**Description:** A command-line tool that takes a directory and moves its files into category subfolders by extension. It has a dry-run mode and clear error messages. The learner starts from the E6.1 structure and extends it independently, without copying a full solution.

**Feature set (fixed here, as 02 left it open):**
- Required: directory argument, `--dry-run`, `--recursive`, category rules by extension, skip on name conflicts with a report, summary at the end (moved, skipped, failed).
- Required: no panics on bad input (missing path, no permission, a file given instead of a directory).
- Optional extra (only if time remains): `--undo` using a log of moves, or a rules file (TOML) read from `--rules`.

**Milestones mapped to modules**
| Milestone | Module | Content | Hours | Target week |
|---|---|---|---|---|
| CP1 Design note | M3 | One page: features, folder layout, data types (reuses E3.1, E3.2) | 0.5 | week 4 |
| CP2 Core engine | M4 | `classify`, `plan`, error enum; plan building is pure and tested | 1.5 | week 5 |
| CP3 Filesystem and CLI | M5 | Walking, `--dry-run`, `--recursive`, conflict handling, exit codes | 2.0 | week 6 |
| CP4 Tests and structure | M6 | At least 8 tests including temp-directory integration tests; clippy clean | 1.5 | week 7 |
| CP5 Polish and review | M7 | README with usage, error review (no `unwrap` in non-test code), final demo run on a sample tree | 1.5 | week 8 |

**Deliverables:** the `tidy` repository (source, `Cargo.toml`, `Cargo.lock`), README, tests, and a recorded demo run log (dry run, real run, error cases).

**Acceptance criteria** (aligned with 01 criteria 4 and 5)
1. `cargo build` finishes with no errors and `cargo clippy` shows no warnings.
2. `cargo test` has at least 5 passing tests (target 8), including at least one integration test using a temp directory.
3. Running with `--dry-run` prints the plan and changes nothing on disk.
4. A real run moves files into the correct category folders and prints a summary.
5. Missing path, file-as-directory and name conflict each produce a clear message and a non-zero exit code (conflict: skip and report), with no panic.
6. The learner can explain in their own words the ownership choices in two functions (checked at the final checkpoint).

**Est. hours:** 7.0.

### Hours summary
Target: success criterion 6 needs at least 60 % hands-on. Hands-on is counted against the 40 h of module time in 02: 60 % is 24 h. Exercises are 17.0 h and the capstone is 7.0 h, giving 24.0 h (60 % of 40 h, 50 % of the 48 h budget). Each module's exercise plus capstone hours stay within that module's hours in 02.

| Module | Exercise hours | Capstone share | Total | Module hours in 02 |
|---|---|---|---|---|
| M1 | 2.0 | 0.0 | 2.0 | 4 |
| M2 | 3.5 | 0.0 | 3.5 | 7 |
| M3 | 3.0 | 0.5 | 3.5 | 6 |
| M4 | 3.0 | 1.5 | 4.5 | 6 |
| M5 | 4.0 | 2.0 | 6.0 | 6 |
| M6 | 1.5 | 1.5 | 3.0 | 4 |
| M7 | 0.0 | 1.5 | 1.5 | 7 (capstone, shares above) |
| **Total** | **17.0** | **7.0** | **24.0** | 40 |

Capstone shares follow the milestone table (CP1 to CP5).

## Assumptions
- The 60 % hands-on target is measured against the 40 h of module time in 02, which is where 02 says hands-on is counted. Hours are inside those 40 h, not on top; the 8 h reserve covers overruns and checkpoints.
- M5 reaches its full 6 h through practice (4.0 exercise + 2.0 capstone), so its reading time is short. The learner should read only the clap and `std::fs` pages needed for each step.
- The learner can install `clap`, `walkdir` and `tempfile` from crates.io (free); this needs internet access.
- Capstone feature set is fixed here because 02 left it open; undo is optional.
- Week targets for CP1-CP5 are suggestions; the schedule planner may shift them.
- Sources below were not opened in this run (no web search); they are well-known free resources and the resource researcher should confirm the links.

## Open Issues
- Rustlings section names in E1.3, E2.1, E3.3 and E4.2 may differ by version; the resource researcher should pin the sections.
- E5.3 adds a Book chapter that the resource researcher must list under M5; the schedule planner should place it before CP3.
- The operating system is unknown; rename and permission-error behaviour may vary slightly between systems (for example, moves across drives fail with `fs::rename`).
- The 24 h of practice overlaps the 40 h of module time; the schedule planner should not add it on top.
- M5 has no spare time inside its 6 h; if E5.3 overruns, take the time from the reserve.

## Sources
- [Rustlings](https://github.com/rust-lang/rustlings) - exercise set, accessed 2026-10-02 (not opened this run)
- [Exercism Rust track](https://exercism.org/tracks/rust) - practice platform, accessed 2026-10-02 (not opened this run)
- [Command Line Applications in Rust](https://rust-cli.github.io/book/) - free guide for CLI structure and testing, accessed 2026-10-02 (not opened this run)
- [The Rust Programming Language, ch. 12 An I/O Project](https://doc.rust-lang.org/book/ch12-00-an-io-project.html) - free book chapter, accessed 2026-10-02 (not opened this run)
