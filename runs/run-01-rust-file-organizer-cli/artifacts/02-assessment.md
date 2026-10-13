---
artifact: 02-assessment.md
agent: knowledge-assessor
run_id: run-01-rust-file-organizer-cli
attempt: 1
depends_on: [requirements-formalizer]
status: complete
sources_used: 0
---

# Knowledge Assessment: Rust file organizer CLI

## Summary
The learner (strong Python, basic C, no Rust, no CLI experience) needs seven modules (M1-M7) to reach the goal of a tested file organizer CLI in Rust. The modules total 40 estimated hours against a 48 h budget (6 h/week x 8 weeks), which leaves 8 h (about 17 %) for practice and checkpoints. The biggest gap is ownership, borrowing and lifetimes (M2): Python has no equivalent, and basic C only partly transfers. Error handling (M4) and filesystem/CLI work (M5) are the next largest gaps. Scope follows 01-requirements.md, so async, unsafe and packaging are excluded.

## Content

### Target competency map
| ID | Competency | Why it matters for the goal | Target level |
|---|---|---|---|
| C1 | Rust toolchain and cargo workflow (rustup, cargo new/build/run/clippy/fmt) | Every step of the project depends on it | Working |
| C2 | Core syntax, types, control flow, functions | Basic fluency for writing any code | Working |
| C3 | Ownership, borrowing, slices, basic lifetimes | The compiler enforces this in every program | Solid |
| C4 | Structs, enums, pattern matching, impl blocks | Model file categories and rules | Solid |
| C5 | Collections and iterators (Vec, HashMap, String, closures) | Group and process file lists | Working |
| C6 | Error handling (Result, Option, ?, custom errors, anyhow) | Success criterion 4: no panics on bad input | Solid |
| C7 | Traits and generics at a practical level | Needed to read std/clap APIs and implement Display/From | Basic |
| C8 | Filesystem and paths (std::fs, Path/PathBuf, walkdir) | The core work of the organizer | Working |
| C9 | CLI argument parsing (clap derive) and output | Dry-run flag, directory argument, rule options | Working |
| C10 | Modules, crates and project structure | Keep the capstone maintainable | Working |
| C11 | Testing (unit, integration, tempfile directories) | Success criterion 5: at least 5 passing tests | Working |
| C12 | Designing and finishing a small tool independently | The capstone outcome | Working |

### Current-state mapping
| Competency | Current level (from 01) | Gap | Transferable knowledge |
|---|---|---|---|
| C1 | none | full | pip/venv habits map to cargo; the learner knows package managers |
| C2 | none (Rust); strong Python, basic C | partial | C-like static types and functions; Python control flow and f-string formatting concepts |
| C3 | basic (inferred from C, unverified) | full | C pointers and stack/heap give intuition; Python has no equivalent rules |
| C4 | none | partial | Python classes and dataclasses; enum-like ideas from C |
| C5 | none | partial | Python lists, dicts, comprehensions map to Vec, HashMap, iterator chains |
| C6 | none | full | Python try/except is a different model; Result is new |
| C7 | none | partial | Python duck typing and protocols; abstract-interface concepts |
| C8 | none (Rust); strong Python | partial | Python pathlib, os, shutil give the exact operations needed |
| C9 | none | partial | Python argparse concepts (flags, subcommands, help text) |
| C10 | none | partial | Python modules and packages |
| C11 | none | partial | pytest ideas (fixtures, temp dirs, assertions) |
| C12 | none (CLI development) | full | General programming experience, but no CLI project history |

### Prioritized gaps
1. C3 Ownership, borrowing, lifetimes: the single largest conceptual hurdle, and every later module relies on it.
2. C6 Error handling: required for the "no panics" success criterion and used in all filesystem code.
3. C8 + C9 Filesystem and CLI parsing: the functional core of the organizer.
4. C4 + C5 Structs, enums, collections, iterators: needed to model rules and process files.
5. C11 Testing: required for the 5-test criterion; also a safe way to practice with temp directories.
6. C1 + C2 + C10 Toolchain, syntax, modules: quick to close because of Python and C background.
7. C7 Traits and generics: only practical depth is needed, and it is picked up inside M4.
8. C12 Capstone integration: closed last by building the project.

### Prerequisite order
- M2 requires M1.
- M3 requires M2.
- M4 requires M3.
- M5 requires M4.
- M6 requires M4 (can overlap with M5 after the Result basics are known).
- M7 requires M5 and M6.

### Module list
| Module | Name | Competencies | Prerequisites | Est. hours | Difficulty |
|---|---|---|---|---|---|
| M1 | Toolchain, cargo and Rust syntax for Python programmers | C1, C2 | none | 4 | easy |
| M2 | Ownership, borrowing, slices and lifetimes | C3 | M1 | 7 | hard |
| M3 | Structs, enums, pattern matching, collections and iterators | C4, C5 | M2 | 6 | medium |
| M4 | Error handling, traits and generics basics | C6, C7 | M3 | 6 | medium-hard |
| M5 | Filesystem, paths and CLI argument parsing | C8, C9 | M4 | 6 | medium |
| M6 | Modules, project structure and testing | C10, C11 | M4 | 4 | medium |
| M7 | Capstone: file organizer CLI | C12 (integrates C1-C11) | M5, M6 | 7 | medium-hard |

**Total estimated hours: 40 h. Budget: 48 h (6 h/week x 8 weeks). Reserve: 8 h (about 17 %) for practice and checkpoints.** The module hours already assume hands-on work (exercises, small programs); the reserve covers extra practice, bi-weekly checkpoints and review. This design allows at least 60 % hands-on time (success criterion 6).

### Starting level and self-check
Starting level per module:
| Module | Starting level | Note |
|---|---|---|
| M1 | Beginner, fast track | Skip general programming concepts; install tools and read syntax differences only |
| M2 | Beginner | Start from the beginning; do not skip |
| M3 | Beginner | Python classes and dicts help, but pattern matching on enums is new |
| M4 | Beginner | Start from Result and Option |
| M5 | Beginner in Rust, familiar with the operations | Use pathlib/argparse knowledge as a map |
| M6 | Beginner | pytest knowledge transfers conceptually |
| M7 | Beginner | Starts only after M5 and M6 |

Self-check (answer without looking anything up; if you cannot answer Q1-Q2 you start at M1, which is the expected case):
1. What command creates a new Rust binary project, and which file lists its dependencies?
   Answer: `cargo new <name>`; `Cargo.toml`.
2. In `let a = String::from("x"); let b = a; println!("{a}");` why does it not compile?
   Answer: the String is moved to `b`, so `a` is no longer valid (ownership). Fix by cloning or borrowing.
3. What is the difference between `&T` and `&mut T`, and how many of each may exist at once?
   Answer: shared vs exclusive reference; many `&T` or exactly one `&mut T`, not both at once.
4. What does a function returning `Result<T, E>` give the caller, and what does `?` do?
   Answer: either `Ok(T)` or `Err(E)`; `?` returns the error early to the caller, or unwraps the Ok value.
5. Which Python tools would you map to `std::fs`/`Path` and to `clap`?
   Answer: `os`/`shutil`/`pathlib` and `argparse`.

If Q1-Q4 are all answered correctly, the learner can skip M1 and M2 (the saved time goes to the capstone). All five answered is not expected for a learner with no Rust.

## Assumptions
- The gap levels use the conservative readings from 01-requirements.md (basic C, no CLI experience).
- Module hours are estimates based on typical effort for experienced programmers learning Rust; they were not checked against any external source.
- Target levels: Basic = can read and use with reference; Working = can write independently with documentation; Solid = can write and explain without much lookup.
- Resources are not selected here; the resource researcher picks free materials per module.

## Open Issues
- No web search was run, so the curriculum shape (language fundamentals, then error handling, then filesystem/CLI, then testing, then a project) comes from general knowledge of common free Rust paths, not a cited source.
- Operating system is unknown (see 01); M5 filesystem exercises should avoid OS-specific paths.
- M2 is rated hard. If the learner falls behind, move 1-2 h from the reserve into M2 rather than shortening M7.
- The exact feature list of the organizer (rules, dry-run, undo) is open; it should be fixed in the capstone design, with undo as an optional extra.

## Sources
- none (derived from inputs)
