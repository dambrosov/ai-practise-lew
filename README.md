# Personalized Learning Assistant — agentic workflow for Claude Code

A hub-and-spoke agentic workflow that turns a learning request ("learn Rust well enough to build a CLI in 8 weeks, 6 h/week, free resources…") into a validated, human-approved learning path delivered as Markdown and HTML.

- **Coordinator** (the Claude Code session, started by `/build-learning-path`) gathers and confirms requirements, selects subagents dynamically, runs them in dependency-driven parallel waves, consumes the quality gate, obtains deterministically verified human approval and reports.
- **9 subagents**, each owning one artifact: requirements-formalizer → knowledge-assessor → [resource-researcher ‖ practice-designer ‖ assessment-designer*] → schedule-planner → validator (gate, targeted retries, max 3 rounds) → path-synthesizer → *human approval* → html-builder. (*optional, selected only when the learner wants checkpoints or a certification.)
- **External data**: WebSearch plus the community **fetch MCP server** (`uvx mcp-server-fetch`, no API key) to verify every resource URL.
- **Persistent state**: an append-only event log per run (`runs/<id>/events.jsonl`) with a derived snapshot; interrupted runs resume without repeating completed work.
- **Hooks**: PreToolUse gate (dependencies, artifact ownership, approval, interruption) and PostToolUse logger (artifact lint, event capture, raw user answers).

See [CLAUDE.md](CLAUDE.md) for the execution rules and component map.

## Prerequisites

| Requirement | Why | Check |
|---|---|---|
| Claude Code 2.x CLI (or the VS Code extension) with a signed-in account that can use WebSearch | runs the coordinator and subagents | `claude --version` |
| Node.js ≥ 18 | hooks and the state script are plain Node (no npm dependencies) | `node --version` |
| uv (provides `uvx`) | runs the fetch MCP server `mcp-server-fetch` (Python, downloaded on first use) | `uvx --version` |
| Git | version control | `git --version` |

No API keys or secrets are required: the fetch MCP server is keyless and WebSearch is a built-in Claude Code tool.
If you add a keyed MCP server later, reference the secret as `"env": { "API_KEY": "${MY_API_KEY}" }` in `.mcp.json` and set `MY_API_KEY` in your shell; never commit the value. `.claude/settings.local.json` and `runs/.current` are gitignored.

## Setup from a clean checkout

```bash
git clone <repo-url>
cd <repo>/src/ai-practise/learning-experience-workflow   # the workflow folder is the Claude Code project root
node .claude/hooks/selftest.js                          # 57 checks of the gates, approval logic and shell lockdown must pass
claude                                                  # start Claude Code here
```

On the first start in this folder Claude Code asks you to trust the project and to approve the project MCP server `fetch` from `.mcp.json`; accept both. `claude mcp list` should then show `fetch … ✓ Connected`. Hooks, the slash command, agents and skills are picked up automatically from `.claude/`.

> **Managed environments**: if your organisation's managed settings contain `disableSideloadFlags`, Claude Code refuses MCP servers that are not administrator-approved and `fetch` will not load. The workflow still runs — `resource-researcher` and `validator` fall back to the built-in `WebFetch` tool — but the `mcp_call` events will be absent from the run log. Ask your administrator to approve `mcp-server-fetch`, or run the workflow on an unmanaged machine to exercise the MCP path.

## Running a workflow

Inside Claude Code (interactive):

```text
/build-learning-path I want to learn Rust well enough to build a small CLI in 8 weeks. I know Python and some C, can study 6 h/week, prefer hands-on projects and free resources, and want checkpoints.
```

What happens:

1. **Gather & confirm** — the coordinator asks for anything missing (goal, current knowledge, hours/week, deadline, style, budget, checkpoints, certification) and asks you to confirm a summary. It writes `runs/<run-id>/input.md` and initialises the run (`plan.md` shows the selected agents and waves).
2. **Execute** — waves of subagents run; independent ones in parallel. Each writes one Markdown artifact under `runs/<run-id>/artifacts/`.
3. **Quality gate** — the validator writes `07-validation.md` with a JSON verdict. On FAIL only the named agents (and their dependents) re-run; after 3 failing rounds the run stops with `failure-report.md`.
4. **Approval** — you get a digest of `08-learning-path.md` and a question with exactly two options: **Approve** / **Request changes**. Your raw answer is captured by a hook; `state.js approve` records it with the document's sha256; the gate lets `html-builder` run only when all three match. *Request changes* asks which parts to revise, re-runs those agents, re-validates, re-synthesises and asks again.
5. **Output** — `runs/<run-id>/output/learning-path.md` and `learning-path.html`.

Approval can also be given by typing a command (the UserPromptSubmit hook captures it deterministically):

```text
/build-learning-path --approve run-01-rust-file-organizer-cli
/build-learning-path --reject run-01-rust-file-organizer-cli The resources for M3 are too advanced; add a gentler intro.
```

### Headless (print) mode

```bash
claude -p "/build-learning-path <request with all 8 items>"       # runs until awaiting_approval, then stops
claude -p "/build-learning-path --approve <run-id>"                # records the decision and renders the output
```

`AskUserQuestion` is unavailable in print mode, so the coordinator fills preference gaps with documented defaults and stops at the approval step. (From Git Bash on Windows prefix the command with `MSYS_NO_PATHCONV=1`, otherwise the shell rewrites the leading `/` of the slash command.)

## Resuming after an interruption

Close the terminal, press Ctrl+C, or kill the process at any point; then:

```text
claude
/build-learning-path --resume <run-id>
```

`state.js status <run-id> --resume` replays the event log: completed/validated steps are kept, steps that were running are marked failed and re-run, and the run refuses to resume if `input.md` changed. Useful commands:

```bash
node .claude/skills/workflow-state/scripts/state.js list              # all runs and their status
node .claude/skills/workflow-state/scripts/state.js status <run-id>   # step table, runnable agents, approval validity
node .claude/skills/workflow-state/scripts/state.js next <run-id>     # what the coordinator would launch now
```

To simulate an interruption deterministically create `runs/<run-id>/STOP`: the PreToolUse gate then denies every subagent launch. Delete the file and resume.

## Repository layout

```text
.claude/commands/build-learning-path.md   slash command → coordinator
.claude/skills/coordinator/               orchestration protocol + graph.template.json (agents, artifacts, dependencies)
.claude/skills/workflow-state/            state model + scripts/state.js (init, next, status, verdict, invalidate, approve)
.claude/skills/artifact-format/           artifact structure, verdict block, learning-path skeleton, HTML template
.claude/skills/web-research/              WebSearch + fetch MCP procedure and citation rules
.claude/agents/*.md                       the 9 subagents
.claude/hooks/pre-tool-gate.js            PreToolUse: dependency / ownership / approval / STOP gates
.claude/hooks/shell-guard.js              Bash/PowerShell lockdown used by the gate (allowlist while a run is in progress)
.claude/hooks/post-tool-log.js            PostToolUse: artifact lint, event log, raw user answers, MCP evidence
.claude/hooks/prompt-capture.js           UserPromptSubmit: typed --approve / --reject / --resume capture
.claude/hooks/selftest.js                 hook self-test (synthetic payloads)
.claude/settings.json                     hooks wiring, permission allowlist, project MCP approval
.mcp.json                                 fetch MCP server
runs/<run-id>/                            sample runs: input, plan, events, state, artifacts, approval, output
```

## Sample runs

| Run | Scenario | What it demonstrates |
|---|---|---|
| `runs/run-01-rust-file-organizer-cli` | Python developer learning Rust for a CLI, 8 weeks × 6 h, free-only, checkpoints wanted | all 9 agents incl. the optional assessment-designer; parallel wave; validation round 1 FAIL on 3 agents → only those 3 and their dependents re-run → round 2 PASS; approval via typed `--approve` (hash-verified); Markdown + HTML output |
| `runs/run-02-sql-pandas-business-analysis` | Excel user learning SQL + pandas, 4 weeks × 3 h, paid allowed | retry limit reached: 3 validation rounds FAIL (4 → 3 → 1 failing agents, each round re-running only the named agents and their dependents); run marked `failed`, `artifacts/failure-report.md` written, synthesizer and html-builder never ran, no output produced. Afterwards a real Claude Code session attempted 7 forbidden actions against it (launching the synthesizer and renderer, writing output and artifacts, forging an approval through Bash and `node -e`, writing `approval.json`); the hook denied all 7 and logged them as `gate_denied` events (see `notes.md`) |
| `runs/run-03-spanish-a2-to-b1-conversation` | Spanish A2 → B1 conversation, 10 weeks × 4 h, free-only, **no assessments** | dynamic selection (assessment-designer skipped, 8 agents); Claude process killed during the parallel wave; `--resume` in a new process kept 2 completed steps and re-ran the 2 interrupted ones; PASS; *Request changes* via `--reject` with feedback → `revision-1.md`, scoped re-run (resources, schedule), re-validation, re-synthesis; then `--approve` → HTML output |

Each run folder contains `input.md`, `plan.md`, `events.jsonl` (full execution trace incl. `gate_denied`, `web_search`, `web_fetch`, `user_answer`), `state.json`, `artifacts/`, `approval.json` (runs 1 and 3) and `output/` (runs 1 and 3). The sample runs were produced headlessly (`claude -p`) on a machine whose managed policy blocks the fetch MCP server, so URL verification in them went through `WebFetch`; approvals were given through the `--approve` / `--reject` command path.

Summarize what a run proves with:

```bash
node .claude/skills/workflow-state/scripts/state.js evidence <run-id>
```

It counts requirement answers from the on-screen questions, approval answers by source, MCP calls, web searches and fetches, gate denials, validation rounds and resumes.

### Recording the interactive, MCP-backed run

The committed runs do not yet show two things: MCP calls, and the interactive question, confirmation and approval dialogs. Both need a person at the keyboard on a machine where the fetch MCP server is allowed. One run covers both:

1. On a machine without the `disableSideloadFlags` policy, run `claude mcp list` from this folder and confirm `fetch` shows as connected.
2. Start `claude` here, interactively, and give it an incomplete request so the coordinator has to ask:

   ```text
   /build-learning-path I want to get comfortable with Docker for my side projects.
   ```

3. Answer the coordinator's questions, choose **Confirmed**, then choose **Request changes** once with feedback, and **Approve** the revised path.
4. Check the run and commit it:

   ```bash
   node .claude/skills/workflow-state/scripts/state.js evidence <run-id>
   ```

   Expect at least one requirement answer, at least one on-screen approval answer, and more than zero MCP calls.

Requirement answers are given before the run exists. The PostToolUse hook buffers them in `runs/.pending-answers.jsonl`, and `state.js init` moves them into the new run's `events.jsonl` as `requirements_answer` events.

## Troubleshooting

- **Hooks do nothing** — `node` must be on PATH for the Claude Code process; check `.claude/settings.json` was not overridden by a `settings.local.json`.
- **"DENIED Agent …waiting for…"** — the coordinator tried to launch an agent before its dependency was written; it must call `state.js next` and follow it.
- **"requires deterministically verified human approval"** — `08-learning-path.md` changed after approval, or the answer was free text; ask again with the two options.
- **`fetch` missing from `claude mcp list`** — approve the project server when prompted, or see the managed-environment note above.
