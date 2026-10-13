# Execution plan: run-03-spanish-a2-to-b1-conversation

**Goal:** Spanish A2 to B1 conversation in 10 weeks

Created: 2026-10-02T10:15:26.750Z  
Research mode: free-only  
Retry limit: 3 validation rounds per approval cycle

## Selected subagents

| # | Agent | Artifact | Depends on | Role |
|---|---|---|---|---|
| 1 | requirements-formalizer | artifacts/01-requirements.md | input.md | planner |
| 2 | knowledge-assessor | artifacts/02-assessment.md | requirements-formalizer | planner |
| 3 | resource-researcher | artifacts/03-resources.md | knowledge-assessor | planner |
| 4 | practice-designer | artifacts/04-exercises.md | knowledge-assessor | planner |
| 5 | schedule-planner | artifacts/06-schedule.md | resource-researcher, practice-designer | planner |
| 6 | validator | artifacts/07-validation.md | resource-researcher, practice-designer, schedule-planner | gate |
| 7 | path-synthesizer | artifacts/08-learning-path.md | validator | synthesis (requires validation_pass) |
| 8 | html-builder | output/learning-path.html | path-synthesizer | render (requires approval) |

## Skipped subagents

- assessment-designer: not selected for this run

## Execution waves

1. requirements-formalizer
2. knowledge-assessor
3. [parallel] resource-researcher, practice-designer
4. schedule-planner
5. validator
6. path-synthesizer
7. html-builder

## Gates

- validator verdict must be PASS before path-synthesizer runs; failures re-run only the named agents and their dependents.
- html-builder runs only after deterministically verified human approval (approval.json hash + captured answer).
