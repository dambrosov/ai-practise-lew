---
name: artifact-format
description: Consistent structure for every workflow artifact (frontmatter + fixed sections), the validator verdict block, the fixed learning-path document skeleton and the HTML template. Preloaded into every subagent; follow it exactly or the PostToolUse lint rejects the artifact.
---

# artifact-format

Artifacts are human-readable Markdown read by people and by other agents. A light structural lint runs on every write (frontmatter keys + required `##` sections); content is judged by the validator agent, not by scripts.

## 1. Standard artifact (01–07)

Start from `templates/artifact.md`:

```markdown
---
artifact: 03-resources.md
agent: resource-researcher
run_id: run-01-rust-cli
attempt: 1
depends_on: [knowledge-assessor]
status: complete            # complete | partial
sources_used: 7             # number of external sources (0 if none)
---

# <Title>

## Summary
3–6 sentences: what this artifact decides and the key numbers (hours, counts, dates).

## Content
Domain sections (### headings) as described in your agent instructions. Prefer tables for lists of items.

## Assumptions
Bullets. Anything you decided because the inputs did not say.

## Open Issues
Bullets, or "- none". Risks, gaps, items the validator or the learner should look at.

## Sources
Bullets of `[Title](URL) — type, accessed YYYY-MM-DD`, or "- none (derived from inputs)".
```

Rules:
- Write exactly the artifact path given in your prompt; never create other files under `artifacts/` or `output/`.
- `agent` must be your own name and `run_id` the run you were given (the lint checks both).
- On a retry (`previous_failures` not empty, `previous_artifact_exists: true`) **revise the existing file in place**: fix what the validator or the user asked for, keep what passed, bump `attempt`.
- Be concrete: hours, counts, URLs, module ids (`M1`, `M2`…) used consistently across all artifacts; the module ids come from `02-assessment.md`.
- Keep artifacts compact (roughly 150–400 lines). No marketing language.

## 2. Validator artifact (07-validation.md)

Standard structure plus, as the **last** element of the file, one fenced JSON verdict block:

````markdown
```json
{
  "overall": "FAIL",
  "failures": [
    { "agent": "schedule-planner", "artifact": "06-schedule.md", "gate": "time-fit",
      "reason": "Weeks 3–5 plan 9 h against a 6 h/week budget; total 61 h vs 48 h budget." }
  ],
  "notes": "optional short text"
}
```
````

`overall` is `PASS` or `FAIL`; a FAIL lists at least one failure, each attributed to exactly one agent (the owner of the artifact that must change) with an actionable reason. PASS has an empty `failures` array. `state.js verdict` consumes this block.

## 3. Learning path document (08-learning-path.md)

The synthesized document keeps the same frontmatter but uses this fixed skeleton (all eleven `##` sections, in this order, every time — write "Not requested for this learner." under a section that does not apply):

```
# Learning Path: <goal>
## Overview
## Learner Profile
## Goals and Success Criteria
## Knowledge Gap Analysis
## Learning Path
## Weekly Schedule
## Exercises and Projects
## Checkpoints and Assessments
## Resources
## Assumptions and Risks
## Sources
```

## 4. HTML output

`html-builder` renders `08-learning-path.md` with `templates/learning-path.html`: same eleven sections with the fixed `id`s listed in the template, a table of contents, and a metadata header (run id, generated date, approval hash). Convert Markdown faithfully (headings, tables, lists, links); do not add or drop content.
