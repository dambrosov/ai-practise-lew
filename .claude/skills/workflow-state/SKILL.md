---
name: workflow-state
description: Persistent workflow state for the learning-path workflow — event log, derived state snapshot, dependency-driven scheduling, targeted retries, approval records and resume. Use the state.js commands described here whenever a run must be initialized, advanced, validated, approved, resumed or inspected.
---

# workflow-state

Every run lives in `runs/<run-id>/`. State is an **append-only event log**; the snapshot is derived from it, so parallel subagents never race on a shared file and a restarted process reconstructs the exact position of the run.

```
runs/<run-id>/
  input.md           confirmed request (written by the coordinator, hashed; resume refuses if it changed)
  plan.md            selected agents, dependency table, execution waves (rendered by state.js)
  events.jsonl       the source of truth; appended by hooks and state.js only
  state.json         derived snapshot (state.js status / next); never edited by hand
  approval.json      history of approval records {decision, sha256 of 08-learning-path.md, feedback}
  artifacts/         one Markdown artifact per subagent (01…08), revision-N.md, failure-report.md
  output/            learning-path.md + learning-path.html (only after verified approval)
  STOP               optional test aid: present = every subagent launch is denied (interruption)
```

## Commands

```
node .claude/skills/workflow-state/scripts/state.js <command>

init --id <run-id> [--select a,b] [--skip a] [--mode free-only] [--title "..."]   create the run from input.md; records the selected subgraph; renders plan.md
next <run-id> [--json]           runnable agents now (deps satisfied, gate conditions met) + why others wait; refreshes state.json
status <run-id> [--resume] [--json]   snapshot; --resume marks interrupted steps failed, keeps completed ones, refuses if input.md changed
verdict <run-id>                 consume the validator's JSON verdict: PASS → synthesizer unlocked; FAIL → failed agents + dependents marked needs_rerun; enforces the retry limit
invalidate <run-id> <agent...> [--reason "..."]   manual targeted re-run (agents + transitive dependents)
approve <run-id> --decision approved|rejected [--feedback "..."] [--scope a,b]   record the human decision; requires a captured user answer; rejected → revision-N.md + invalidation
render-plan <run-id>             re-render plan.md
list                             all runs with status
evidence <run-id>                what the run proves: requirement answers, approval answers by source, MCP/web calls, gate denials, rounds, resumes
```

## Event types (events.jsonl)

`run_created`, `requirements_answer` (imported from runs/.pending-answers.jsonl by init), `plan`, `agent_started` (PreToolUse gate), `artifact_written` (PostToolUse lint + sha256), `agent_finished`, `validation_round`, `invalidated`, `user_answer` (AskUserQuestion answer or typed `--approve/--reject` command), `approval`, `gate_denied`, `mcp_call`, `web_search`, `web_fetch`, `resume`, `run_failed`, `output_written`.

## Step statuses

`pending → running → written → validated` on the happy path; `failed` (no artifact or interrupted), `needs_rerun` (gate failure, downstream invalidation or revision). An agent is runnable when its status is `pending|failed|needs_rerun`, all dependencies are `written|validated`, the attempt limit is not reached and, for `path-synthesizer`, the last verdict is PASS; for `html-builder`, approval is valid.

Run statuses: `planning → executing → validating → awaiting_approval → (revising →) rendering → completed`, or `failed`.

## Determinism rules

- Only `state.js` and the hooks write state files; the gate denies direct edits.
- Approval is valid only when the latest record is `approved`, its hash equals the current `08-learning-path.md`, and the latest captured user answer is `Approve` (option label) or a typed `--approve` command. Any later change to the learning path invalidates it.
- Retry limit: 3 validation rounds per approval cycle; after the third failing round the run is `failed`, `failure-report.md` is written and dependent steps never run.
