---
artifact: 03-resources.md
agent: resource-researcher
run_id: run-01-rust-file-organizer-cli
attempt: 2
depends_on: [knowledge-assessor]
status: complete
sources_used: 25
---

# Resources: Rust file organizer CLI

## Summary
Free resources were selected for all seven modules (M1-M7), with exactly one free primary per module and 1-2 free alternatives each (19 module rows, plus 3 cross-cutting items). The spine is the official Rust Book, paired with Rustlings exercises for hands-on practice, the "Command Line Applications in Rust" book for M5-M6, and std/crate documentation for filesystem work. The M5 primary now bundles the std::fs docs, the Rust Cookbook directory recipes and the CLI argument tutorial, so both C8 (filesystem) and C9 (CLI parsing) have a primary. Primary hours total 23 h against 40 h of module estimates (alternatives, own exercises and the 8 h reserve absorb the rest). No paid resources are used. All 25 URLs were fetched on 2026-10-02.

## Content

### Research approach
- Queries (WebSearch): Rust Book ownership tutorial; Rustlings for Python programmers; Rust CLI book and clap derive; Rust by Example and Comprehensive Rust; Rust Cookbook directory traversal and Exercism Rust track.
- Selection: official or widely recommended, free, hands-on first (Rustlings, project chapters), suited to a Python/C programmer, current in 2026 (clap 4.6.7 and anyhow 1.0.104 docs seen).
- Mode: free-only; every row is free. Hours are my estimates for an experienced programmer (the pages give no reading times).
- Verification: `mcp__fetch__fetch` was not available in this run, so every URL was verified with `WebFetch` (page loaded, title and topic matched).
- Revision (attempt 2): M5 primary changed from the CLI-args page alone to a filesystem + CLI bundle, to cover prioritized gap C8.

### Resources by module

#### M1 - Toolchain, cargo and Rust syntax for Python programmers
| Resource | Type | Cost | Est. hours | Level | Role | Why it fits | Verified |
|---|---|---|---|---|---|---|---|
| [The Rust Book ch. 1 and 3: Getting Started, Common Programming Concepts](https://doc.rust-lang.org/book/ch01-00-getting-started.html) ([ch. 3](https://doc.rust-lang.org/book/ch03-00-common-programming-concepts.html)) | docs | free | 2.5 | beginner | primary | Install, cargo and syntax in one place; skim familiar concepts | 2026-10-02 |
| [Rustlings (intro exercises)](https://rustlings.rust-lang.org/) | interactive | free | 1.5 | beginner | alternative | `cargo install rustlings`; early exercises drill syntax with compiler feedback | 2026-10-02 |
| [Comprehensive Rust (Day 1)](https://google.github.io/comprehensive-rust/) | course | free | 2 | beginner | alternative | Written for programmers; compares to C, fine for Python users | 2026-10-02 |

#### M2 - Ownership, borrowing, slices and lifetimes
| Resource | Type | Cost | Est. hours | Level | Role | Why it fits | Verified |
|---|---|---|---|---|---|---|---|
| [The Rust Book ch. 4: Understanding Ownership](https://doc.rust-lang.org/book/ch04-00-understanding-ownership.html) | docs | free | 3 | beginner | primary | Canonical treatment of ownership, borrowing, slices | 2026-10-02 |
| [Rustlings (move semantics, ownership exercises)](https://github.com/rust-lang/rustlings/) | interactive | free | 2.5 | beginner | alternative | Hands-on fixing of borrow-checker errors; pairs with the chapter | 2026-10-02 |
| [Brown University interactive Rust Book ch. 4](https://rust-book.cs.brown.edu/ch04-00-understanding-ownership.html) | docs/quiz | free | 3 | beginner | alternative | Edition with added ownership explanations and quizzes (intro page itself shows none) | 2026-10-02 |

Lifetimes basics are in [Book ch. 10](https://doc.rust-lang.org/book/ch10-00-generics.html) (see M4); read its lifetimes section during M2 (about 1 h counted in M4).

#### M3 - Structs, enums, pattern matching, collections and iterators
| Resource | Type | Cost | Est. hours | Level | Role | Why it fits | Verified |
|---|---|---|---|---|---|---|---|
| [The Rust Book ch. 5, 6, 8: Structs, Enums, Collections](https://doc.rust-lang.org/book/ch05-00-structs.html) ([ch. 6](https://doc.rust-lang.org/book/ch06-00-enums.html), [ch. 8](https://doc.rust-lang.org/book/ch08-00-common-collections.html)) | docs | free | 4 | beginner | primary | Covers structs, enums, `match`, Vec/String/HashMap for modelling file categories | 2026-10-02 |
| [The Rust Book ch. 13.2: Iterators](https://doc.rust-lang.org/book/ch13-02-iterators.html) | docs | free | 1 | beginner | alternative | Maps to Python comprehensions; needed for processing file lists | 2026-10-02 |
| [Rust by Example](https://doc.rust-lang.org/rust-by-example/) | docs/examples | free | 2 | beginner | alternative | Runnable examples to see the syntax in action | 2026-10-02 |

#### M4 - Error handling, traits and generics basics
| Resource | Type | Cost | Est. hours | Level | Role | Why it fits | Verified |
|---|---|---|---|---|---|---|---|
| [The Rust Book ch. 9: Error Handling](https://doc.rust-lang.org/book/ch09-00-error-handling.html) | docs | free | 2 | beginner | primary | Result, Option, `?`, panic vs recoverable; supports the "no panics" criterion | 2026-10-02 |
| [The Rust Book ch. 10: Generic Types, Traits, and Lifetimes](https://doc.rust-lang.org/book/ch10-00-generics.html) | docs | free | 3 | beginner | alternative | Practical traits/generics depth; also lifetimes for M2 | 2026-10-02 |
| [anyhow crate docs](https://docs.rs/anyhow) | docs | free | 0.5 | intermediate | alternative | Application-level error type with `context`, used in the capstone | 2026-10-02 |

Note: the primary row is 2 h; ch. 10 is required reading for C7 and must be done (total 5 h with anyhow, within the 6 h estimate).

#### M5 - Filesystem, paths and CLI argument parsing
| Resource | Type | Cost | Est. hours | Level | Role | Why it fits | Verified |
|---|---|---|---|---|---|---|---|
| Primary bundle (C8 + C9): [std::fs module docs](https://doc.rust-lang.org/std/fs/index.html) (1.5 h) + [Rust Cookbook: Directory Traversal](https://rust-lang-nursery.github.io/rust-cookbook/file/dir.html) (1 h) for filesystem and paths, then [Command Line Applications in Rust: Parsing command line arguments](https://rust-cli.github.io/book/tutorial/cli-args.html) (3 h) for CLI parsing | docs + recipes + tutorial | free | 5.5 | intermediate | primary | C8: `read_dir`, `rename`, `create_dir_all`, `metadata`, PathBuf and walkdir recipes, mapped to Python pathlib/os.walk/shutil. C9: hands-on build from `std::env::args` to clap `#[derive(Parser)]` | 2026-10-02 |
| [walkdir crate docs](https://docs.rs/walkdir/) | docs | free | 0.5 | intermediate | alternative | Recursive traversal and symlink handling beyond what std::fs offers | 2026-10-02 |
| [clap crate docs](https://docs.rs/clap) | docs | free | 0.5 | intermediate | alternative | Current API reference for flags such as `--dry-run` | 2026-10-02 |

The primary is one bundle read in order: filesystem items first (C8), then CLI parsing (C9).

#### M6 - Modules, project structure and testing
| Resource | Type | Cost | Est. hours | Level | Role | Why it fits | Verified |
|---|---|---|---|---|---|---|---|
| [The Rust Book ch. 7 and 11: Modules, Automated Tests](https://doc.rust-lang.org/book/ch07-00-managing-growing-projects-with-packages-crates-and-modules.html) ([ch. 11](https://doc.rust-lang.org/book/ch11-00-testing.html)) | docs | free | 3 | beginner | primary | Official coverage of module system and unit/integration tests | 2026-10-02 |
| [Command Line Applications in Rust: Testing](https://rust-cli.github.io/book/tutorial/testing.html) | tutorial | free | 1 | intermediate | alternative | CLI-specific: lib/bin split, `assert_cmd`, `assert_fs` temp dirs | 2026-10-02 |

#### M7 - Capstone: file organizer CLI
| Resource | Type | Cost | Est. hours | Level | Role | Why it fits | Verified |
|---|---|---|---|---|---|---|---|
| [The Rust Book ch. 12: An I/O Project (minigrep)](https://doc.rust-lang.org/book/ch12-00-an-io-project.html) | project tutorial | free | 3 | intermediate | primary | Guided CLI project to copy the structure from (config, lib/bin split, errors, tests); learner then builds the organizer on their own | 2026-10-02 |
| [Exercism Rust track](https://exercism.org/tracks/rust) | interactive | free | 3 | beginner-intermediate | alternative | 99 exercises with automated feedback and optional mentoring for extra practice | 2026-10-02 |

The organizer itself is built by the learner; the primary supplies a pattern, not the final design. Build time beyond the primary comes from the M7 estimate (7 h).

### Cross-cutting resources
| Resource | Type | Cost | Est. hours | Level | Role | Why it fits | Verified |
|---|---|---|---|---|---|---|---|
| [clap crate docs (derive tutorial and reference)](https://docs.rs/clap) | docs | free | reference | intermediate | alternative | Current API (4.6.7 seen) for flags such as `--dry-run` | 2026-10-02 |
| [walkdir crate docs](https://docs.rs/walkdir/) | docs | free | reference | intermediate | alternative | Recursive directory traversal, symlink handling | 2026-10-02 |
| [Rustlings (setup and full set)](https://rustlings.rust-lang.org/) | interactive | free | see modules | beginner | alternative | Weekly practice across M1-M4 | 2026-10-02 |

### Hours summary
| Module | Primary resource hours | Module estimate (02) | Fit |
|---|---|---|---|
| M1 | 2.5 | 4 | ok |
| M2 | 3 | 7 | ok |
| M3 | 4 | 6 | ok |
| M4 | 2 | 6 | ok |
| M5 | 5.5 | 6 | ok |
| M6 | 3 | 4 | ok |
| M7 | 3 | 7 | ok |
| Total | 23 | 40 | ok |

The primaries are reading/tutorial time only. The remaining hours per module go to alternatives (mainly Rustlings) and the learner's own exercises, which keeps hands-on time above 60 %.

### Unverified or excluded
- `mcp__fetch__fetch` was not available in this run; `WebFetch` was used for all verification. The validator should re-check with the fetch server if it is available.
- Excluded: Medium, blog and aggregator pages from search (LinuxLinks, Class Central, codezup, etc.), because they are secondary and not needed.
- Excluded: egghead Rustlings course and the Python-focused YouTube course (not fetched; the YouTube course could not be verified as current or free).
- Excluded: paid books (No Starch print edition of the Rust Book); the free online version covers the same content.

## Assumptions
- Hours are my own estimates for a strong Python programmer, not figures stated by the sources.
- Rustlings exercise topics are taken from the project's description and search summary; the GitHub page fetch did not list exercises, so the module mapping (ownership, error handling, etc.) should be checked by the learner in the exercise folder.
- The Rust Book online edition at doc.rust-lang.org is the current stable version; no publication year was visible on the pages.
- The M5 bundle counts as one primary resource (same pattern as the multi-chapter primaries in M1, M3 and M6).

## Open Issues
- Primary hours (23 h) are well under the 40 h estimate; the gap relies on Rustlings and self-directed exercises (not separate "primary" items). The validator may want the schedule to allocate them explicitly.
- M5 primary is a bundle of three pages (std::fs, Cookbook, CLI book args) covering C8 and C9; no single free tutorial covers filesystem work step by step.
- Brown interactive edition: quizzes were not visible on the chapter intro page, so confirm it fits.
- Fetch MCP unavailable (see Unverified or excluded).

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
