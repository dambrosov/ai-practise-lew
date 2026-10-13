# CLAUDE.md — Personalized Learning Assistant workflow

This folder is the Claude Code project root of an agentic workflow (assignment spec: `../../../requirements.md`). Start `claude` **here**; the slash command, agents, skills, hooks and MCP config under `.claude/` and `.mcp.json` are project-scoped.

## Components

| Component | Location | Role |
|---|---|---|
| Slash command | `.claude/commands/build-learning-path.md` | entry point; makes the session the coordinator and loads the `coordinator` skill |
| Coordinator (skill) | `.claude/skills/coordinator/SKILL.md`, `graph.template.json` | orchestration protocol; the graph file is the single source of truth for agents, artifacts, dependencies, optional selection |
| workflow-state (skill) | `.claude/skills/workflow-state/` (`scripts/state.js`, `scripts/lib.js`) | event-sourced run state: init / next / status / verdict / invalidate / approve / list |
| artifact-format (skill) | `.claude/skills/artifact-format/` | frontmatter + fixed sections for artifacts, validator verdict block, learning-path skeleton, HTML template |
| web-research (skill) | `.claude/skills/web-research/SKILL.md` | WebSearch + `mcp__fetch__fetch` procedure, citation rules |
| Subagents (9) | `.claude/agents/*.md` | one artifact each, see table below |
| Hooks | `.claude/hooks/pre-tool-gate.js` (PreToolUse), `post-tool-log.js` (PostToolUse), `prompt-capture.js` (UserPromptSubmit), `selftest.js` | deterministic enforcement and logging |
| Settings | `.claude/settings.json` | hook wiring, permission allowlist, `enabledMcpjsonServers: ["fetch"]` |
| MCP | `.mcp.json` | `fetch` = `uvx mcp-server-fetch` (keyless) |
| Runs | `runs/<run-id>/` | input.md, plan.md, events.jsonl, state.json, approval.json, artifacts/, output/ |

### Subagents and artifacts

| Agent | Artifact | Depends on | Notes |
|---|---|---|---|
| requirements-formalizer | artifacts/01-requirements.md | input.md | normalises the confirmed request |
| knowledge-assessor | 02-assessment.md | 01 | gap analysis, prerequisite order, module ids `M1…Mn` |
| resource-researcher | 03-resources.md | 02 | WebSearch + fetch MCP URL verification; `free-only` mode |
| practice-designer | 04-exercises.md | 02 | exercises + capstone |
| assessment-designer | 05-assessments.md | 02 | **optional** (checkpoints/certification wanted) |
| schedule-planner | 06-schedule.md | 03, 04, (05) | week-by-week plan within budget |
| validator | 07-validation.md | 03, 04, (05), 06 | quality gate; JSON verdict block |
| path-synthesizer | 08-learning-path.md | validator PASS | fixed 11-section document; the thing the human approves |
| html-builder | output/learning-path.html (+ .md) | verified approval | render only |

Waves: `01 → 02 → [03 ‖ 04 ‖ 05] → 06 → validator → 08 → approval → html`.

## Execution rules (enforced, not just described)

1. **Hub-and-spoke**: only the coordinator launches workflow agents (nested launches are denied); the coordinator never writes under `artifacts/` or `output/` (denied); each artifact may be written only by its owner (denied otherwise).
2. **Dependency-driven waves**: `state.js next` lists runnable agents; the coordinator launches all of them in one message (parallel). The gate denies launching an agent whose dependencies are not `written`/`validated`.
3. **Consistent artifacts**: every artifact has the frontmatter keys `artifact, agent, run_id, attempt, depends_on, status` and the sections Summary / Content / Assumptions / Open Issues / Sources; the PostToolUse lint rejects anything else (the step is not marked written). `08-learning-path.md` uses the fixed 11-section skeleton; the HTML has the same sections and ids.
4. **Quality gate**: the validator's verdict block (`overall`, `failures[] {agent, gate, reason}`) is consumed by `state.js verdict`; failing agents and their transitive dependents become `needs_rerun`; validated agents stay validated. Retry limit = 3 validation rounds per approval cycle; then the run is `failed`, `failure-report.md` is written and dependent steps never run.
5. **Deterministic approval**: the gate lets `html-builder` run (and `output/` be written) only when `approval.json`'s latest record is `approved`, its sha256 equals the current `08-learning-path.md`, and the latest captured `user_answer` event is the option label `Approve` (PostToolUse hook on AskUserQuestion) or a typed `/build-learning-path --approve <id>` (UserPromptSubmit hook). `state.js approve` refuses without a matching captured answer. Rejection writes `revision-N.md`, invalidates the chosen scope + dependents + synthesizer, and the loop asks again.
6. **Persistent state**: hooks and `state.js` only append to `events.jsonl`; `state.json` is derived. `state.js status --resume` keeps completed steps, re-runs interrupted ones, refuses if `input.md` changed. A `STOP` file denies all launches (interruption test aid).
7. **External data**: `resource-researcher` discovers resources with WebSearch and verifies every URL with `mcp__fetch__fetch` (fallback `WebFetch`). The `validator` has no WebSearch; it re-verifies URLs with `mcp__fetch__fetch` (fallback `WebFetch`). `knowledge-assessor`, `practice-designer` and `assessment-designer` may use WebSearch for curricula and syllabi. Calls are logged as `web_search` / `mcp_call` / `web_fetch` events.
8. **Shell access is locked down**: the PreToolUse gate covers Bash and PowerShell. While any run is in progress (status not completed/failed) only a positive allowlist passes: `node .claude/skills/workflow-state/scripts/state.js …` and `node .claude/hooks/selftest.js` as literal commands, read-only inspection (cat, head, tail, grep, wc, ls), `cd`, and touch/rm of a run's `STOP` file. Output redirection, command substitution and variable indirection are denied. Always, even with no run in progress: anything that writes `events.jsonl`, `approval.json`, `state.json`, `plan.md` or `runs/.current` is denied, as are inline interpreter code (`node -e`, `python -c`, `powershell -Command`, `bash -c`) that references them, and helper scripts outside `.claude/` that reference the state internals. Edits to `.claude/**` and `.mcp.json` require human confirmation (`permissions.ask`). A developer can relax only the in-progress allowlist by starting Claude Code with `WORKFLOW_GATE_MODE=dev`.

## Working on this workflow

- Run `node .claude/hooks/selftest.js` after touching hooks, `lib.js` or `state.js` (57 checks).
- To add an agent: add it to `graph.template.json` (artifact, depends_on, always/select_when), create `.claude/agents/<name>.md` (preload `artifact-format`), and mention it in the coordinator skill if it affects selection. Nothing else needs to change: hooks and `state.js` read the graph.
- Headless testing: `MSYS_NO_PATHCONV=1 claude -p "/build-learning-path <full request>"` from this folder stops at `awaiting_approval`; approve with `claude -p "/build-learning-path --approve <run-id>"`.
- Sample runs under `runs/` are committed evidence; do not regenerate them casually. `runs/selftest-*` are scratch and gitignored.
- Keep secrets out: nothing here needs one; a keyed MCP server would use `${ENV_VAR}` in `.mcp.json`.
- Managed machines with `disableSideloadFlags` cannot load `.mcp.json`; the workflow degrades to `WebFetch` (documented in README).
