---
artifact: 05-assessments.md
agent: assessment-designer
run_id: run-01-rust-file-organizer-cli
attempt: 1
depends_on: [knowledge-assessor]
status: complete
sources_used: 0
---

# Assessments: Rust file organizer CLI

## Summary
Three checkpoints (C1 after M2, C2 after M4, C3 after M6) and one final assessment after M7 give a measurable check roughly every 2 weeks, which meets success criterion 3. Each checkpoint has a 6-question quiz with answers, a practical task with a rubric, and a pass criterion. The final assessment is an acceptance review of the capstone against success criteria 4 and 5. Total assessment time is 385 minutes (about 6.4 hours), inside the 8 h reserve left by 02-assessment.md (40 h of modules vs 48 h budget). No certification is targeted.

## Content

### Assessment strategy
- Cadence: a checkpoint after M2, M4 and M6 (about weeks 2, 4 and 6), plus a final assessment after M7 (week 8).
- Formats: closed-book quiz (no compiler, no notes) followed by an open-book practical task done with `cargo`; the practical task is the larger part of each checkpoint.
- Pass thresholds: quiz at least 5 of 6 correct; practical task needs every rubric criterion at "pass" level. "Strong" is optional and shows readiness to go faster.
- On a fail: review the weak module for up to 1 h from the reserve, redo only the failed part, and do not start the next module group until it passes.
- Checkpoint time comes from the 8 h reserve, not from the module hours.

### Checkpoints

#### C1 - after M2
**Competencies tested:** C1 (toolchain and cargo workflow), C2 (syntax, types, control flow), C3 (ownership, borrowing, slices, basic lifetimes).

**Quiz (6 questions, closed book)**
| # | Type | Question | Answer |
|---|---|---|---|
| 1 | Recall | Which cargo commands build, run, check compile errors quickly without producing a binary, and run the linter? | `cargo build`, `cargo run`, `cargo check`, `cargo clippy` |
| 2 | Recall | Variables in Rust: what is the default mutability and how do you change it? | Immutable by default; add `mut` (`let mut x = 1;`) |
| 3 | Applied | `let s1 = String::from("a"); let s2 = s1; println!("{s1} {s2}");` fails. Why, and name two fixes. | `s1` was moved to `s2`. Fix: `s1.clone()` or borrow with `let s2 = &s1;` |
| 4 | Applied | A function must read a string and not take ownership. What parameter type is idiomatic, and why `&str` rather than `&String`? | `&str`; it accepts both `&String` (deref coercion) and string literals, so it is more general |
| 5 | Applied | What does the compiler reject here and which rule is it? `let mut v = vec![1]; let first = &v[0]; v.push(2); println!("{first}");` | A mutable borrow (`push`) while a shared borrow (`first`) is still used later; rule: many `&T` or one `&mut T`, not both at once |
| 6 | Recall | What does `fn longest<'a>(x: &'a str, y: &'a str) -> &'a str` tell the compiler? | The returned reference is valid no longer than both inputs; annotations describe relations, they do not change how long values live |

**Practical task (about 45 min):** In a new cargo project write `fn count_words(text: &str) -> usize`, `fn longest_word(text: &str) -> &str` and `fn push_all(dest: &mut Vec<String>, items: &[&str])`. Call all three from `main` without cloning where a borrow is enough. Then deliberately introduce one move error and one borrow conflict, read the compiler messages and write one sentence each on how you fixed them.

| Criterion | Pass | Strong |
|---|---|---|
| Builds and runs | `cargo build` has no errors; `cargo clippy` has no errors | Also zero clippy warnings and `cargo fmt` applied |
| Borrowing | Functions take `&str` / `&mut Vec`; no unnecessary `.clone()` | Can explain every borrow and why each clone, if any, is needed |
| Lifetimes | `longest_word` compiles and the return type is correct | Explains why no explicit annotation is needed (elision) or where one would be |
| Error reading | Two compiler errors reproduced and fixed, one-sentence explanation each | Explanations name the exact rule (move, aliasing XOR mutation) |

**Pass criterion:** quiz at least 5/6 and all four rubric criteria at pass.
**Estimated time:** 75 min (20 quiz, 45 practical, 10 review).

#### C2 - after M4
**Competencies tested:** C4 (structs, enums, pattern matching), C5 (collections and iterators), C6 (error handling), C7 (basic traits and generics).

**Quiz (6 questions, closed book)**
| # | Type | Question | Answer |
|---|---|---|---|
| 1 | Recall | What does `match` require of its arms that an `if/else` chain does not? | Exhaustiveness: every variant must be covered (or a `_` wildcard) |
| 2 | Applied | Write an enum `Category` with variants `Image`, `Document` and `Other(String)`, and a `match` returning a folder name for each. | `enum Category { Image, Document, Other(String) }`; `match c { Category::Image => "images".into(), Category::Document => "docs".into(), Category::Other(s) => s }` (any equivalent) |
| 3 | Applied | Rewrite as an iterator chain: collect the lengths of all names in `names: Vec<String>` that start with `"a"`. | `names.iter().filter(\|n\| n.starts_with('a')).map(\|n\| n.len()).collect::<Vec<_>>()` |
| 4 | Recall | What do `Option<T>` and `Result<T, E>` express, and what does `?` do inside a function returning `Result`? | Optional value / success or error. `?` unwraps `Ok` or returns the `Err` early (converting it with `From`) |
| 5 | Applied | A function reads a file with `std::fs::read_to_string` and parses the content as `i32`. Give a signature that can return both error kinds without panicking. | e.g. `fn load(p: &Path) -> Result<i32, Box<dyn Error>>`, or `anyhow::Result<i32>`, or a custom enum with `From` impls |
| 6 | Recall | Why is `unwrap()` on user input a problem, and which trait must a type implement to be printed with `{}`? | It panics on `None`/`Err`; `std::fmt::Display` |

**Practical task (about 60 min):** Build an "expense tally" program: define `struct Entry { name: String, amount: f64, kind: Kind }` and `enum Kind { Food, Travel, Other(String) }`. Parse lines such as `lunch,12.5,food` from a text file into `Vec<Entry>`, using a custom error enum (or anyhow) for bad lines. Print totals per kind using a `HashMap` and iterator methods. Implement `Display` for `Entry`. Feed it a file with at least two malformed lines; it must report them and continue.

| Criterion | Pass | Strong |
|---|---|---|
| Data model | Struct and enum used with `match` covering all variants | Uses `impl` blocks and methods (e.g. `Kind::from_str`) |
| Error handling | No `unwrap`/`expect` on input data; bad lines reported with line number | Custom error type implements `Display` and `From` conversions |
| Collections and iterators | Totals via `HashMap` and at least one iterator chain | Uses `entry().or_insert()` and avoids index loops |
| Traits | `Display` implemented and used in `println!("{}")` | One small generic function with a trait bound |
| Robustness | Runs on the malformed file with exit code 0 and no panic | Missing input file handled with a clear message and non-zero exit |

**Pass criterion:** quiz at least 5/6 and all five rubric criteria at pass.
**Estimated time:** 90 min (20 quiz, 60 practical, 10 review).

#### C3 - after M6
**Competencies tested:** C8 (filesystem and paths), C9 (clap argument parsing), C10 (modules and project structure), C11 (testing).

**Quiz (6 questions, closed book)**
| # | Type | Question | Answer |
|---|---|---|---|
| 1 | Recall | Which type is the owned path and which the borrowed path, and which Python class is closest? | `PathBuf` (owned) and `&Path` (borrowed); `pathlib.Path` |
| 2 | Recall | Name the std functions to list a directory, create nested directories and move a file. | `fs::read_dir`, `fs::create_dir_all`, `fs::rename` |
| 3 | Applied | Why can `fs::rename` fail when source and destination are on different filesystems, and what is a fallback? | Rename cannot cross mount points; fall back to `fs::copy` then `fs::remove_file` |
| 4 | Applied | Write a clap derive struct with a required positional `dir: PathBuf` and a boolean `--dry-run` flag. | `#[derive(Parser)] struct Args { dir: PathBuf, #[arg(long)] dry_run: bool }` (any equivalent) |
| 5 | Recall | How do you make a function in `src/scan.rs` usable from `main.rs`? | Declare `mod scan;` in `main.rs` (or `lib.rs`), mark the function `pub`, call it as `scan::name` |
| 6 | Applied | Where do unit tests and integration tests live, and how is each run? | Unit tests in `#[cfg(test)] mod tests` beside the code; integration tests in `tests/`; both run with `cargo test` |

**Practical task (about 70 min):** Build `lister`, a CLI with a `dir` argument and `--dry-run`. For each file in the directory (non-recursive is enough) it prints the planned move (dry-run) or moves the file into a subfolder named after its extension (`txt/`, `png/`; files with no extension go to `misc/`). Split the code into at least two modules (for example `scan` and `plan`). Write at least 3 tests, at least one using a `tempfile` directory.

| Criterion | Pass | Strong |
|---|---|---|
| CLI | `--help` is generated; `dir` required; `--dry-run` changes nothing on disk | Also has a `--recursive` flag |
| Filesystem | Creates folders and moves files correctly; a missing directory gives an error message, not a panic | Handles name collisions without overwriting |
| Structure | At least two modules; planning logic separate from disk actions | Logic exposed as a library function, tested without the CLI |
| Tests | 3 tests pass with `cargo test`; one uses a temp directory | Dry-run test asserts the directory is unchanged |

**Pass criterion:** quiz at least 5/6 and all four rubric criteria at pass.
**Estimated time:** 100 min (20 quiz, 70 practical, 10 review).

### Final assessment
**Purpose:** show that success criteria 4 and 5 are met. It reviews the M7 capstone built in the practice artifact; it does not repeat the project. The learner gives the repository to a reviewer, or self-reviews with this checklist and records evidence.

**Acceptance checks (all run on a clean clone)**
1. `cargo build` completes with no errors.
2. `cargo test` shows at least 5 passing tests and no failures.
3. Running the tool on a prepared test directory (mixed extensions, one extensionless file, one name collision) organizes files into subfolders by rule.
4. Running with `--dry-run` prints the planned moves and leaves the directory unchanged (compare a file listing before and after).
5. Bad input does not panic: a nonexistent directory, a path that is a file, and a read-only target each produce a readable message and a non-zero exit code.
6. A walkthrough (about 20 min, spoken or written): explain one ownership decision, one error-handling decision and one module boundary in the code, without notes.
7. No copied full solution: the learner can name the sources used for individual techniques and make one small change live (for example a new category) in 15 min.

**Rubric**
| Criterion | Pass | Strong |
|---|---|---|
| Functionality | Checks 1-4 pass | Collisions handled safely and reported |
| Robustness | Check 5 passes for all three cases | Errors use a custom type; exit codes documented |
| Tests | At least 5 passing tests, including one dry-run and one error case | Tests cover collisions and use temp directories throughout |
| Code quality | `cargo clippy` has no errors; `cargo fmt` applied; at least 2 modules | Zero clippy warnings; README with usage examples |
| Understanding | Walkthrough explains the three decisions correctly | Can name an alternative design and its trade-off |
| Independence | Live change completed within 15 min | Change includes a new test |

**Pass criterion:** every criterion at pass. If a check fails, fix and re-run only the failed checks; one fix cycle is in the time estimate.
**Estimated time:** 120 min (60 acceptance run, 20 walkthrough, 15 live change, 25 buffer for one fix cycle).

### Certification mapping
No certification targeted.

### Time summary
| Checkpoint | Est. minutes |
|---|---|
| C1 (after M2) | 75 |
| C2 (after M4) | 90 |
| C3 (after M6) | 100 |
| Final assessment (after M7) | 120 |
| **Total** | **385** |

Total assessment time is about 6.4 hours, which fits in the 8 h reserve from 02-assessment.md and leaves about 1.6 h for review after a failed checkpoint.

## Assumptions
- Checkpoint time is paid from the 8 h reserve, not from the 40 module hours; the schedule planner must reserve it.
- Checkpoint placement follows module order: C1 after about 11 cumulative module hours, C2 after 23 h, C3 after 33 h, final after 40 h.
- No proctoring; closed-book rules rely on the learner. A reviewer is optional.
- The practical tasks use the free `clap` and `tempfile` crates, consistent with C9 and C11.

## Open Issues
- The reserve is tight: 6.4 h of assessment leaves 1.6 h for remediation. A failed C1 (M2 is rated hard) could consume it; the schedule planner should keep slack.
- Resources are chosen in 03; the validator should check that the quiz topics are covered by the selected resources for M1-M6.
- Cross-filesystem rename (C3 quiz Q3) is discussed, not tested in practice.
- No web search was run, so no external syllabus is cited.

## Sources
- none (derived from inputs)
