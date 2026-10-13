---
artifact: 01-requirements.md
agent: requirements-formalizer
run_id: run-01-rust-file-organizer-cli
attempt: 1
depends_on: []
status: complete
sources_used: 0
---

# Requirements: Rust file organizer CLI

## Summary
The learner (strong Python, some C, no Rust) wants to build a small file organizer command-line tool in Rust within 8 weeks, starting 2026-10-02 and ending about 2026-11-27. The budget is 6 hours per week, so the total is 48 hours. Only free resources are allowed, the style is hands-on and project-based, and progress checkpoints are wanted. No certification is targeted. Five measurable success criteria are defined.

## Content

### Learner goal and target outcome
**Goal statement:** By 2026-11-27 the learner will be able to design, implement, test, and run a small file organizer CLI in Rust. The tool takes a directory and sorts or moves its files into subfolders by rule (for example by extension or category), supports a dry-run mode, and reports errors clearly. The learner builds it without copying a full solution.

**Context:** Personal upskilling. The learner knows Python well and wants Rust as a systems-style language for practical command-line tools. The file organizer is the capstone project that proves working competence.

### Current knowledge and experience
| Area | Level | Evidence from input |
|---|---|---|
| Python | strong | "I know Python well" |
| C | basic | "some C" (taken as basic, the conservative reading) |
| Rust | none | "no Rust" in confirmed requirements |
| Command-line tool development | none | Not stated; conservative assumption |
| Memory and ownership concepts | basic | Inferred from some C; not verified |

### Constraints
| Constraint | Value |
|---|---|
| Hours per week | 6 |
| Duration | 8 weeks (2026-10-02 to about 2026-11-27) |
| **Total hour budget** | **48 hours (6 h/week × 8 weeks)** |
| Money budget | Free resources only (0 currency units) |
| Language of materials | English (assumed) |
| Tooling and platform | Not stated. Assume the learner can install the free Rust toolchain (rustup, cargo) on their own machine; no paid tools or services. |

### Preferences
- Learning style: hands-on, project-based.
- Formats: free resources only; interactive exercises and building code over long passive reading or video. No other format restrictions were stated.
- Pace: steady 6 h/week over 8 weeks, with checkpoints to track progress.
- Avoid: paid courses, paid books, subscriptions, and certification-oriented material.

### Scope
In scope:
- Rust fundamentals needed for a CLI: ownership and borrowing, structs and enums, error handling, collections, modules, and traits at a practical level.
- Filesystem and path handling, argument parsing, and basic testing with cargo.
- A capstone project: a small file organizer CLI.
- Progress checkpoints throughout the 8 weeks.

Out of scope:
- Certification preparation or exams.
- Async programming, networking, and web frameworks.
- Unsafe Rust, FFI, and macros beyond basic use.
- GUI or cross-platform packaging and distribution.
- Advanced performance tuning.
- Paid resources.

### Success criteria
1. The learning path totals at most 48 hours and fits 6 h/week over 8 weeks (2026-10-02 to about 2026-11-27).
2. Every resource in the path is free to access.
3. The path includes at least one checkpoint per 2 weeks, and the checkpoints are measurable.
4. By the end of week 8 the learner has a working file organizer CLI in Rust that organizes files in a directory by rule, has a dry-run mode, and handles errors without panicking on bad input.
5. The final project has automated tests (at least 5 passing `cargo test` cases) and builds with no compiler errors.
6. The path is hands-on: at least 60% of the planned hours are coding practice or project work.

### Workflow options
| Option | Value |
|---|---|
| Assessments wanted | Yes (learner wants checkpoints) |
| Certification target | None |
| Research mode | free-only |

## Assumptions
- Total budget is 48 hours, as stated in the input assumptions; the 8 weeks start on the day of 2026-10-02.
- C experience is treated as "basic" because the input says only "some C".
- Command-line tool experience is treated as none, because the input is silent.
- Materials are in English and the learner can install the Rust toolchain locally, because the input does not say otherwise.
- The 60% hands-on share (criterion 6) and the 5-test minimum (criterion 5) are conservative targets chosen here to make "hands-on" and "well enough" measurable.
- The one-checkpoint-per-2-weeks frequency (criterion 3) is a minimum; the assessment designer may add more.

## Open Issues
- The operating system is not stated, so later artifacts should avoid OS-specific instructions or note the differences.
- "Small file organizer" is not specified in detail; the exact feature list (rules, dry-run, undo) is left to the later design.

## Sources
- none (derived from inputs)
