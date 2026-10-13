---
name: coordinator
description: Orchestration protocol for the Personalized Learning Assistant workflow — requirement gathering and confirmation, dynamic subagent selection, dependency-driven parallel waves, quality-gate retries, deterministic human approval, resume after interruption. Loaded by /build-learning-path; the main session acts as the coordinator.
---

# Coordinator protocol

You are the hub of a hub-and-spoke workflow. You **never** produce an artifact yourself; you gather requirements, plan, launch subagents, consume gate verdicts, obtain human approval and report. All state lives in `runs/<run-id>/` and is managed by one script:

```
STATE = node .claude/skills/workflow-state/scripts/state.js
```

`STATE` is shorthand in this document only. Always type the full literal command, run from the workflow folder, one call per Bash invocation (for example `node .claude/skills/workflow-state/scripts/state.js next run-01-x`). While a run is in progress the gate allows only state.js, read-only inspection (cat/head/tail/grep/wc/ls), `cd`, and touch/rm of the STOP file; shell variables, `$(...)`, redirection and inline `node -e` are denied.

The graph of agents, artifacts and dependencies is `.claude/skills/coordinator/graph.template.json`. Hooks enforce the rules deterministically (dependencies, artifact ownership, approval). If a hook denies an action, do not work around it: run `STATE next <run-id>` and follow its output.

## Phase 0 — Dispatch on the arguments

| Arguments | Go to |
|---|---|
| `--resume <run-id>` | Resume protocol |
| `--approve <run-id>` or `--reject <run-id> <feedback>` | Approval protocol, command path |
| anything else | Phase 1 (new run) |

## Phase 1 — Gather, capture and confirm requirements

Required information (ask only for what is missing or ambiguous):

1. **Goal and target outcome** — what the learner wants to be able to do (e.g. "build a CLI tool in Rust").
2. **Current knowledge** — languages, tools, level, relevant experience.
3. **Time budget** — hours per week.
4. **Deadline or duration** — weeks, or a date.
5. **Learning style / format preferences** — hands-on, video, reading, mixed.
6. **Budget** — free resources only, or paid allowed (amount).
7. **Checkpoints / assessments wanted?** — yes/no (drives selection of `assessment-designer`).
8. **Certification target** — optional.

Procedure:

- Extract everything you can from the request. For missing items 1–7 call `AskUserQuestion` (up to 4 questions per call, with sensible options plus the automatic "Other"). Then present a compact summary table and ask one confirmation question (`header: Confirm`, options `Confirmed` / `Change something`). Repeat until confirmed.
- **Non-interactive fallback**: if `AskUserQuestion` is not available or fails, do not stop when items 1–4 are present in the request: fill 5–8 with defaults (mixed style, free-only, checkpoints = yes, no certification), mark each as *assumed (non-interactive)*, and treat the request as confirmed. If items 1–4 cannot be determined, stop and report what is missing.
- Pick the run id: `run-<NN>-<slug>` where NN is the next two-digit number after the existing runs (`STATE list`) and slug is a kebab-case summary of the goal (max 40 chars).
- Write `runs/<run-id>/input.md` yourself (this is the only file you write in a run) with exactly these sections: `# Input: <run-id>`, `## Original request` (verbatim), `## Confirmed requirements` (table: item | value | source = stated / answered / assumed), `## Assumptions`, `## Selection decisions`.
- **Dynamic selection**: include `assessment-designer` only when checkpoints/assessments are wanted or a certification is targeted. Use `--mode free-only` when the budget is zero / free-only. Record both decisions in `## Selection decisions`.
- Initialize: `STATE init --id <run-id> [--select assessment-designer] [--mode free-only] --title "<short goal>"`. This writes `plan.md` (selected agents, waves, gates) and the first state snapshot. Show the plan path and waves to the user in two lines.

## Phase 2 — Execute dependency-driven waves

Loop:

1. `STATE next <run-id>` → lists `runnable` agents (dependencies satisfied) and why others wait.
2. If `runnable` is non-empty: launch **all of them in one message** with the `Agent` tool (one call per agent, `subagent_type` = agent name). Independent agents therefore run in parallel; dependent ones run in later waves. Use this prompt template, run_id first:

   ```
   run_id: <run-id>
   attempt: <attempt from STATE next>
   artifact: <artifact path from STATE next>  (write exactly this file, nothing else under artifacts/)
   inputs: runs/<run-id>/input.md, <artifact paths of depends_on>
   mode: <mode or standard>
   previous_failures: <previous_failures from STATE next, or none>  (revise the existing artifact in place when previous_artifact_exists is true)
   revision_feedback: runs/<run-id>/artifacts/revision-<N>.md  (only when a revision exists)
   Return only a 3-line summary: what you produced, key numbers, open issues.
   ```

3. After the wave finishes run `STATE status <run-id>` (persists the snapshot) and go to 1.
4. If `runnable` is empty, act on the run status:
   - validator `written` → `STATE verdict <run-id>`:
     - `PASS` → continue the loop (the synthesizer becomes runnable).
     - `FAIL` with `retry` → continue the loop: only the failed agents are runnable; their downstream dependents were invalidated automatically and re-run in later waves; the validator re-runs; this is one retry round. Hooks and `STATE` stop the run after the retry limit (3 validation rounds per approval cycle).
     - `run_status: failed` → Phase 5.
   - `awaiting_approval` → Phase 3.
   - `rendering` → continue the loop (html-builder is runnable).
   - `completed` → Phase 4.
   - `failed` → Phase 5.

Rules: keep your own context small (read `STATE` output and subagent summaries, not whole artifacts, except the learning path for the approval summary); never launch an agent that `STATE next` did not list; never edit `events.jsonl`, `state.json`, `approval.json` or `plan.md`; never write under `artifacts/` or `output/`.

## Phase 3 — Human approval (deterministically verified)

The hooks only let `html-builder` run when `approval.json` holds an *approved* record whose sha256 matches the current `artifacts/08-learning-path.md` **and** a captured user answer says `Approve`. Model interpretation alone is never enough.

1. Read `runs/<run-id>/artifacts/08-learning-path.md` and show the user a 6–10 line digest (modules, weeks, hours/week, resource count, checkpoints, open risks) plus the file path.
2. Interactive path — call `AskUserQuestion` with exactly:
   - `header`: `Approval`
   - `question`: `Approve the learning path for run_id: <run-id>? (runs/<run-id>/artifacts/08-learning-path.md)`
   - options: label `Approve` ("Generate the final Markdown + HTML output") and label `Request changes` ("Revise the plan from my feedback and ask again")
   The PostToolUse hook stores the raw answer as a `user_answer` event.
   - `Approve` → `STATE approve <run-id> --decision approved` → continue Phase 2 (html-builder becomes runnable).
   - `Request changes` → ask a second question (`header: Scope`, multiSelect) "Which parts need changes?" with options `Resources` (→ resource-researcher), `Exercises and assessments` (→ practice-designer, assessment-designer if selected), `Schedule` (→ schedule-planner), `Wording and structure only` (→ no upstream agent). Collect the free-text feedback the user gave (the "Other" text or their message). Then `STATE approve <run-id> --decision rejected --scope <agents> --feedback "<feedback>"`. This writes `artifacts/revision-N.md`, invalidates the scoped agents, their dependents, the validator and the synthesizer. Continue Phase 2; the loop re-validates, re-synthesizes and returns here.
   - Any other answer (free text) is **not** a decision: ask again with the two options.
3. Non-interactive path — if `AskUserQuestion` is unavailable or fails: print *"Awaiting approval. Review runs/<run-id>/artifacts/08-learning-path.md, then run `/build-learning-path --approve <run-id>` or `/build-learning-path --reject <run-id> <feedback>`"* and stop. The run stays `awaiting_approval` and resumes later.
4. Command path (`--approve` / `--reject`): the UserPromptSubmit hook already captured the typed decision. Run `STATE approve <run-id> --decision approved`, or for a rejection infer the scope from the feedback keywords (resources/links/videos/books → resource-researcher; exercises/projects → practice-designer; quiz/assessment/checkpoint → assessment-designer; schedule/weeks/hours/pace → schedule-planner; otherwise none) and run `STATE approve <run-id> --decision rejected --scope <agents> --feedback "<typed feedback>"`. Then continue Phase 2.

If `STATE approve` refuses (no captured answer, or the answer does not match the decision), the recorded answer wins: ask again or report, never force it.

## Phase 4 — Completion report

When `STATE status` shows `completed`, report: output files (`runs/<run-id>/output/learning-path.md`, `learning-path.html`), the agents that ran, validation rounds and retries, revisions, counts of web searches and MCP fetch calls (from the status output), and the plan path. Stop.

## Phase 5 — Unresolved gate failure

When the run is `failed`, show `runs/<run-id>/artifacts/failure-report.md` (unresolved gates, agents involved, stopped dependent work) and suggest which requirement to relax (usually time budget or deadline). Dependent execution has already been stopped by `STATE`. Stop.

## Resume protocol

1. `STATE status <run-id> --resume` — replays the event log, keeps every `written`/`validated` step, marks steps that were `running` at the interruption as failed (they re-run), and refuses if `input.md` changed.
2. Read `runs/<run-id>/plan.md` (two lines of summary to the user: what is kept, what re-runs).
3. Continue with Phase 2 (or Phase 3 / Phase 4 depending on the run status). Never re-run completed work; never gather requirements again.

A `STOP` file in `runs/<run-id>/` makes the gate deny every launch (used to demonstrate interruption). Tell the user to remove it before resuming.
