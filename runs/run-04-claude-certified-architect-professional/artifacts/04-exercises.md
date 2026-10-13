---
artifact: 04-exercises.md
agent: practice-designer
run_id: run-04-claude-certified-architect-professional
attempt: 1
depends_on: [knowledge-assessor]
status: complete
sources_used: 0
---

# Practice Plan: Claude Certified Architect – Professional

## Summary
Fourteen exercises (E1.1–E7.1) and one capstone cover modules M1–M7. Exercises total 27 h (about 15 % of the 182 h budget) and the capstone adds 10 h, so practice comes to 37 h. About 17 h of this is the "short applied tasks" that 02 already counts inside the 150 h module hours. The extra 20 h comes from the 32 h reserve, which leaves 12 h for checkpoint quizzes, the mock exam and the final review. Every exercise produces a piece that is reused in the capstone, "Architecture Decision Package for a Claude-based compliance-document assistant". All work uses Claude Code, which the learner already has, plus free documentation. Where an API call is needed, the exercise says so and keeps usage small.

## Content

### Practice principles
- Learn by applying: read first (module hours), then do one short written or hands-on task. The learner has 16 years of engineering experience, so tasks are architecture-style (decisions, trade-offs, designs), not syntax drills.
- Cadence: one exercise per week in most weeks, done in the last 2 to 3 hours of the module. Each exercise ends with a self-check list.
- Feedback loop: the learner checks work against the self-check bullets and the official docs, then asks Claude Code to act as a critical exam reviewer ("find the weakest decision and the missing trade-off"). Misses go into a running "gap log" that feeds the checkpoint quizzes and final review.
- Every deliverable is a Markdown file in a `ccar-portfolio/` repo folder, so the capstone assembles from earlier work.
- Free-only: no paid tools. API calls are optional and capped (see E3.1, E4.1); the learner can use Claude Code sessions as a substitute.

### Exercises by module

#### M1 — Claude Platform Foundations and Exam Orientation

| Field | E1.1 Exam blueprint and gap log | E1.2 Model, cost and caching worksheet |
|---|---|---|
| Objective | C2: know exam format, domains and where own gaps are | C2: choose model tier, apply caching, estimate token cost |
| Steps | 1) Find the official exam guide on Anthropic's certification platform. 2) Build a table of the 7 domains, official weights and topics. 3) Compare with the weights in 02 and note differences. 4) Take the five self-check questions in 02 and record misses. 5) Draft a gap log. | 1) Pick three workloads (bulk classification, long-doc summary, interactive agent). 2) For each choose a model tier and justify it. 3) Estimate input/output tokens and cost from public pricing. 4) Mark which prompt prefix is cacheable and what invalidates it. 5) Optionally run one cached call to confirm. |
| Deliverable | `m1-blueprint.md` | `m1-model-cost.md` |
| Est. hours | 1 | 2 |
| Difficulty | Easy | Medium |
| Self-check | Table cites the official guide; every miss from the self-check is logged with a module | Each workload has tier, cost estimate and a cache plan with at least one invalidation case |

#### M2 — Solution Design and Agentic Architecture

| Field | E2.1 Pattern selection matrix | E2.2 Reference architecture and ADRs |
|---|---|---|
| Objective | C1: choose single agent, workflow or multi-agent with trade-offs | C1: design and justify a full Claude solution |
| Steps | 1) List five scenarios (e.g. support triage, code review, research, data extraction, doc generation). 2) For each pick a pattern (single agent with tools, prompt chain, routing, parallel, orchestrator-workers). 3) Record cost, latency, failure modes. 4) Write when you would not use an agent. | 1) Take the capstone scenario (see below). 2) Draw a component diagram (Mermaid). 3) Write 4 ADRs (pattern, model tiering, state/memory, human-in-the-loop). 4) Add a failure-mode table. 5) Ask Claude to critique, then fix two weaknesses. |
| Deliverable | `m2-pattern-matrix.md` | `m2-architecture.md` with diagram and ADRs |
| Est. hours | 2 | 3 |
| Difficulty | Medium | Hard |
| Self-check | Every row names a rejected alternative and why | Each ADR has context, options, decision, consequences; diagram matches the ADRs |

#### M3 — Integration: Tools, MCP, Agent SDK and Enterprise Systems

| Field | E3.1 Tool and MCP server build | E3.2 Enterprise integration design |
|---|---|---|
| Objective | C3: implement tools and an MCP server and understand their contracts | C3: design and critique integration with enterprise systems |
| Steps | 1) Define two tool schemas with clear descriptions and error returns. 2) Build a small local MCP server exposing one tool, one resource and one prompt. 3) Connect it to Claude Code and call each. 4) Test a bad-input case and a timeout. 5) Optionally call the API once with tool use (cap about 20 calls). | 1) Choose three systems (ticketing, document store, identity provider). 2) For each decide auth, data flow, rate limits, retries, idempotency. 3) Decide where MCP, Agent SDK or plain API calls fit. 4) Add an integration sequence diagram. |
| Deliverable | `m3-mcp-server/` with README | `m3-integration-design.md` |
| Est. hours | 4 | 2 |
| Difficulty | Hard | Medium |
| Self-check | Server runs; all three capability types are exercised; errors return structured messages | Each system has auth and failure handling, and every choice has a stated reason |

#### M4 — Evaluation, Testing and Optimization

| Field | E4.1 Build a small eval suite | E4.2 Optimization plan |
|---|---|---|
| Objective | C4: design datasets, graders and regression tracking | C4: reduce cost and latency without losing quality |
| Steps | 1) Write 15 test cases for the capstone's core task (include edge and adversarial cases). 2) Define a rubric and one code-based plus one model-graded check. 3) Run each case 3 times (Claude Code or API) and record variance. 4) Record results in a table and set a pass threshold. | 1) Take the E4.1 baseline. 2) List five levers (model tier, caching, prompt trimming, batching, routing). 3) Predict effect, then try two and re-run the suite. 4) Decide which change ships. |
| Deliverable | `m4-evals/` (cases, rubric, results) | `m4-optimization.md` |
| Est. hours | 3 | 2 |
| Difficulty | Hard | Medium |
| Self-check | Suite has at least 15 cases, repeated runs and a written threshold | Before/after numbers exist for two levers and the decision cites them |

#### M5 — Governance, Safety and Risk Management

| Field | E5.1 Threat model and controls | E5.2 Governance checklist |
|---|---|---|
| Objective | C5: assess and mitigate risks of an agent with tool access | C5: map compliance, data handling and oversight needs |
| Steps | 1) List assets, trust boundaries and untrusted inputs of the capstone design. 2) Identify risks (prompt injection, data leakage, excessive agency, hallucination). 3) Map each to controls (least privilege, approvals, validation, sandboxing, logging). 4) Rank residual risk. | 1) Classify data the system touches. 2) Write retention, access and audit rules. 3) Define human oversight points and escalation. 4) Note Anthropic usage-policy limits that apply. |
| Deliverable | `m5-threat-model.md` | `m5-governance.md` |
| Est. hours | 2 | 1 |
| Difficulty | Medium | Easy |
| Self-check | Every risk has a control and a residual rating; at least one injection scenario is walked through | Checklist covers data class, retention, audit, oversight and escalation |

#### M6 — Stakeholder Communication and Lifecycle Management

| Field | E6.1 Business case and rollout plan | E6.2 Lifecycle and migration runbook |
|---|---|---|
| Objective | C6: explain value and plan adoption for non-technical stakeholders | C6: plan versioning and model migration |
| Steps | 1) Write a one-page executive summary: problem, value, cost, risk. 2) Add ROI assumptions with ranges. 3) Plan a phased rollout (pilot, limited, general) with success metrics. 4) List likely stakeholder objections with answers. | 1) Pin and version prompts, tools and eval sets. 2) Define steps to move to a new model version using the M4 suite. 3) Add deprecation monitoring and rollback. 4) Define a change-communication note. |
| Deliverable | `m6-business-case.md` | `m6-lifecycle-runbook.md` |
| Est. hours | 2 | 1 |
| Difficulty | Medium | Medium |
| Self-check | A non-engineer can read it in 5 minutes; ROI shows assumptions | Runbook has trigger, test gate, rollout and rollback steps |

#### M7 — Developer Productivity and Operational Enablement

| Field | E7.1 Team enablement kit |
|---|---|
| Objective | C7: design team-level Claude Code practices |
| Steps | 1) Write a shared `CLAUDE.md` standard for a team. 2) Define settings, permissions and hooks policy. 3) Add a CI usage proposal (headless runs, review gates). 4) Add onboarding steps and metrics. |
| Deliverable | `m7-enablement-kit.md` |
| Est. hours | 2 |
| Difficulty | Easy |
| Self-check | Kit covers standards, permissions, CI and onboarding; each item is something a new team member could follow |

### Capstone project

**Title:** Architecture Decision Package for a Claude-based Compliance-Document Assistant.

**Description:** The learner designs, partly prototypes and defends a production-grade solution in which Claude drafts and reviews technical and compliance documents from internal sources. It is the goal statement in practice: acting as a Professional-level architect across all seven exam domains. The output is a portfolio package plus a 30-minute self-run "design review" in which the learner answers scenario questions as in the exam.

**Milestones**

| Milestone | Module | Content |
|---|---|---|
| CP1 Scope and model plan | M1 | Scenario, requirements, model tiers, cost envelope (from E1.2) |
| CP2 Architecture | M2 | Diagram and ADRs (from E2.2) |
| CP3 Integrations and prototype | M3 | MCP server plus integration design (E3.1, E3.2) |
| CP4 Eval and optimization | M4 | Eval suite and tuned baseline (E4.1, E4.2) |
| CP5 Risk and governance | M5 | Threat model and governance rules (E5.1, E5.2) |
| CP6 Business case and lifecycle | M6 | Executive summary, rollout, migration runbook (E6.1, E6.2) |
| CP7 Team enablement and assembly | M7 | Enablement kit; assemble `capstone-package.md`; run design review |

**Deliverables:** `ccar-portfolio/capstone-package.md` (maximum 15 pages, links to all module files); the MCP server prototype; the eval results table; a one-page design-review log listing 8 scenario questions and answers.

**Acceptance criteria**
1. All seven domains are addressed with at least one concrete design decision each.
2. Architecture has at least four ADRs, each listing a rejected alternative.
3. Prototype runs and the eval suite shows a stated pass rate against a stated threshold.
4. Threat model covers prompt injection and data leakage with controls.
5. Business case and migration runbook are consistent with the architecture and eval data.
6. Design-review log answers at least 8 scenario questions, and the learner marks any weak answers back into the gap log.

**Estimated hours:** 10 (the assembly and integration work, on top of the exercises).

### Hours summary
Budget 182 h; 15 % is about 27 h for exercises, and the capstone is added on top.

| Module | Exercise hours | Capstone share | Total |
|---|---|---|---|
| M1 | 3 | 0.5 | 3.5 |
| M2 | 5 | 2 | 7 |
| M3 | 6 | 2.5 | 8.5 |
| M4 | 5 | 2 | 7 |
| M5 | 3 | 1.5 | 4.5 |
| M6 | 3 | 1 | 4 |
| M7 | 2 | 0.5 | 2.5 |
| **Total** | **27** | **10** | **37** |

Reconciliation with 02: about 17 h of the 27 exercise hours are the "short applied tasks" already inside the 150 h module hours. The incremental practice load is therefore 20 h, taken from the 32 h reserve. That leaves about 12 h for checkpoint quizzes, the full mock exam and the final review.

## Assumptions
- The 17 h overlap with module hours is an estimate; if module reading runs long, shift time from the capstone assembly.
- The capstone scenario (compliance-document assistant) is chosen because it fits the learner's technical-writing background; any other scenario works if it covers all seven domains.
- Free-only: tasks run in Claude Code; optional API calls are capped and can be skipped.
- Exercise order follows the prerequisites in 02 (M1, then M2/M3, M4, M5/M6, with M7 anywhere after M1).

## Open Issues
- Official domain names and weights are unconfirmed (see 02); E1.1 makes the learner verify them and may require changes to exercise emphasis.
- Free official practice questions may be limited; the assessment-designer produces the mock questions, and this artifact only covers practical tasks.
- If Foundations is a prerequisite for the exam, it reduces the 12 h assessment and review slack.
- API costs for E3.1 and E4.1 depend on the learner's account; use Claude Code sessions if no API key is available.

## Sources
- none (derived from inputs)
