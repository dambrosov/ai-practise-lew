# Learning Path: Claude Certified Architect – Professional

## Overview
This path prepares an experienced software engineer (16 years, about 6 months of Claude Code) to pass the "Claude Certified Architect – Professional" (CCAR-P) exam within 13 weeks, from 2026-10-02 to 2027-01-01, at no more than 14 h per week (2 h/day). All resources are free. The path has seven modules, M1–M7, one per exam domain. They run in prerequisite order: M1 foundations and exam orientation, then M2 design and M3 integration, then M4 evaluation, then M5 governance and M6 lifecycle, with M7 developer productivity overlapping M6. Each module combines official Anthropic reading, one or two architecture-style exercises that build a capstone portfolio, and a checkpoint quiz. A full 63-item mock exam comes in week 11. Weeks 12–13 are for review, the capstone defence and the exam. Before relying on the week 13 exam date, confirm in week 1 that you are eligible to sit the exam (it needs a Claude Partner Network company email).

| At a glance | Value |
|---|---|
| Modules | 7 (M1–M7), mapped one to one to the 7 reported exam domains C1–C7 |
| Weeks | 13 (2026-10-02 to 2027-01-01), Friday to Thursday |
| Total hours | 156.25 h planned of a 182 h budget; 25.75 h (14 %) buffer, including a 7 h week 12 contingency; maximum 14.0 h in any week |
| Resources | 7 free primaries, 17 module alternatives, 4 cross-cutting references (one is the optional prep course), plus 3 verified extras the schedule uses |
| Checkpoints | 6 (CK1–CK6), a 63-item full mock (week 11), a 30-item retake subset (week 12, only if needed), and a capstone defence |
| Capstone | Architecture Decision Package for a Claude-based Compliance-Document Assistant (10 h, milestones CP1–CP7) |

## Learner Profile
| Area | Level | Evidence |
|---|---|---|
| Software engineering in general | strong | 16 years of software engineering |
| Claude Code usage | working | about 6 months: development, writing tech docs |
| Claude Code extensibility (marketplace plugins) | working | has created marketplace plugins |
| Claude API / model-level concepts | basic (assumed) | not stated; to be checked with the self-check in Knowledge Gap Analysis |
| Agent / multi-agent architecture and MCP | basic (assumed) | not stated beyond plugin creation |
| Exam content and format | none | has not taken the exam |

**Preferences:** reading, quizzes and hands-on practical tasks. Formats: documentation and articles, checkpoint quizzes, practical tasks, practice/mock exams. Hands-on work builds on Claude Code. Pace: steady 2 h daily sessions, with a lighter day per week possible as buffer. Avoid: paid resources, content that repeats basic software engineering, and resources that need paid API usage.

**Constraints:**

| Constraint | Value |
|---|---|
| Hours per week | 14 (2 h/day, 7 days/week) |
| Duration | 13 weeks (2026-10-02 to about 2027-01-01) |
| Total hour budget | 14 h/week x 13 weeks = 182 h (includes exam review and exam preparation) |
| Money budget | Free resources only; the exam fee is outside this budget |
| Language | English (assumed) |
| Tooling | Existing Claude Code access; keep API spend minimal or use free tiers; no paid courses or paid practice tests |

## Goals and Success Criteria
**Goal:** By the end of week 13 (about 2027-01-01), pass the "Claude Certified Architect – Professional" exam. This means being able to design, justify and critique Claude-based solution architectures (including Claude Code workflows, agents, tools/MCP and plugins) at the level the exam objectives require, and to score at or above the pass level on a full-length practice assessment. The credential is formal validation of existing Claude Code experience and extends it into architect-level knowledge.

**Success criteria:**
1. The learning path covers 100% of the published exam objectives or domains, each mapped to at least one module and resource.
2. The weekly schedule totals no more than 182 h, with no more than 14 h in any week, and ends with a review week before the target exam date.
3. Every resource is free to use, and its URL was verified as reachable.
4. The path has at least one checkpoint quiz per major module and at least one full-length mock assessment, taken before the last week.
5. The path has practical tasks and a capstone that exercise architect-level skills in Claude Code.
6. The learner scores at least 80% on the final mock assessment. This is an assumed readiness threshold; the official pass mark still needs to be confirmed from official sources.

**Scope.** In scope: all official exam objectives; gap-driven study; practical tasks with a capstone; checkpoint quizzes and a full mock; a final exam-review period. Out of scope: general software engineering, cloud or programming fundamentals; paid courses, practice exams or tools; other certifications and levels; exam registration, payment and logistics beyond a readiness checklist; production deployment of the practical tasks.

## Knowledge Gap Analysis
Third-party sources report seven weighted exam domains, 63 questions and a 720/1000 pass score. These figures are not yet verified against the official exam guide.

| Competency (exam domain, reported weight) | Target level | Current level | Gap | Transferable knowledge |
|---|---|---|---|---|
| C1 Solution Design & Architecture (17 %) | Design and justify | basic for Claude; strong in general | partial | 16 years of system design and trade-off analysis |
| C2 Claude Models, Prompting & Context Engineering (13 %) | Apply and compare | working | partial | Practical prompting from Claude Code; lacks model tiers, caching, token economics |
| C3 Integration (19 %, heaviest) | Design and critique | working for plugins, basic for API and MCP | partial | Plugin building; integration engineering |
| C4 Evaluation, Testing & Optimization (16 %) | Design eval strategy | basic | full to partial | Software testing; LLM evals are new |
| C5 Governance, Safety & Risk Management (14 %) | Assess and mitigate | none stated | full | General security and risk awareness |
| C6 Stakeholder Communication & Lifecycle Management (14 %) | Explain and plan | none stated | partial | General stakeholder and lifecycle experience; model deprecation and ROI framing are new |
| C7 Developer Productivity & Operational Enablement (7 %) | Design team practices | working | none to partial | Tech docs, development and plugins; may lack team rollout, settings governance, CI |
| Exam format and content | — | none | full | Closed by M1 orientation and the mock exam |

**Prioritized gaps:** 1) C5 Governance, Safety & Risk (full gap, 14 %); 2) C4 Evaluation, Testing & Optimization (16 %); 3) C3 Integration (19 %, needs breadth); 4) C1 Solution Design & Architecture (17 %); 5) C6 Stakeholder Communication & Lifecycle (14 %); 6) C2 Models, Prompting & Context (13 %, partly known); 7) C7 Developer Productivity (7 %, short review).

| Module | Starting level | Note |
|---|---|---|
| M1 | Intermediate | Skim the Claude Code-related prompting; focus on the API, model tiers, caching, token costs and exam format |
| M2 | Beginner to intermediate | Needs Claude and agent patterns |
| M3 | Intermediate | Study MCP internals, Agent SDK, enterprise integration |
| M4 | Beginner | Start from the basics of LLM evals |
| M5 | Beginner | Start from scratch |
| M6 | Beginner to intermediate | Claude-specific lifecycle and ROI topics |
| M7 | Advanced | Review only; check team and CI usage |

**Self-check (answer before starting; the bracket shows which module covers a miss):**
1. When is a multi-agent design preferable to a single agent with tools, and what is its main cost? [M2] — *When tasks are parallelizable, need isolated context, or exceed one context window; cost is higher tokens, latency, coordination complexity and harder debugging.*
2. What does prompt caching save, and what makes a cache hit fail? [M1] — *It reuses an unchanged prompt prefix, reducing cost and latency; any change to the prefix content before the cached breakpoint invalidates it, and entries expire after a short time.*
3. What are the three capability types an MCP server can expose? [M3] — *Tools, resources and prompts.*
4. Why is a single golden-answer exact-match test insufficient for an LLM feature? [M4] — *Outputs are non-deterministic and varied; you need representative datasets, rubric or model-graded checks, multiple runs and regression tracking.*
5. Name two controls that reduce the risk of prompt injection in an agent with tool access. [M5] — *Least-privilege tool permissions, human approval for sensitive actions, input/output validation, isolating untrusted content, sandboxing.*

Reading guide: 5/5 correct: skim M1 and spend the extra time on M4–M6. 3–4 correct: follow the order as given. 0–2 correct: keep the full M1 hours.

## Learning Path
Module hours are the estimates from 02 (150 h in total, covering reading plus short applied tasks). The schedule plans reading from the per-resource hours in 03 instead, so scheduled hours per module are lower (see Assumptions and Risks).

### M1 — Claude Platform Foundations and Exam Orientation
- **Purpose:** close the API-level gap (model tiers, caching, token economics, context handling) and learn the exam format and domains.
- **Competencies:** C2. **Prerequisites:** none. **Difficulty:** Medium.
- **Primary resource:** [Claude API Features overview (platform docs)](https://platform.claude.com/docs/en/build-with-claude/overview) (10 h). Also scheduled: [Prompt caching](https://platform.claude.com/docs/en/build-with-claude/prompt-caching), part of [Building with the Claude API](https://anthropic.skilljar.com/claude-with-the-anthropic-api), and an eligibility task using the [Claude certification FAQ](https://anthropic-partners.skilljar.com/page/faq-certifications).
- **Exercises:** E1.1 Exam blueprint and gap log; E1.2 Model, cost and caching worksheet; capstone CP1 Scope and model plan.
- **Checkpoint:** CK1 (week 2).
- **Hours:** 20 (02 estimate). **Weeks:** 1–2.

### M2 — Solution Design and Agentic Architecture
- **Purpose:** choose and justify Claude solution patterns (workflows, single agent, multi-agent) with their trade-offs, and produce reference architectures.
- **Competencies:** C1. **Prerequisites:** M1. **Difficulty:** Hard.
- **Primary resource:** [Building Effective AI Agents](https://www.anthropic.com/engineering/building-effective-agents) (1.5 h). Also scheduled: [How We Built Our Multi-Agent Research System](https://www.anthropic.com/engineering/multi-agent-research-system), [Effective Context Engineering for AI Agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents), optional Prep L1, and a 1.25 h deepening block.
- **Exercises:** E2.1 Pattern selection matrix; E2.2 Reference architecture and ADRs; CP2 Architecture.
- **Checkpoint:** CK2 (week 3).
- **Hours:** 26 (02 estimate; about 15.75 h scheduled in 06). **Weeks:** 2–3.

### M3 — Integration: Tools, MCP, Agent SDK and Enterprise Systems
- **Purpose:** design and critique tool, MCP, Agent SDK and enterprise-system integrations. This is the heaviest domain.
- **Competencies:** C3. **Prerequisites:** M1. **Difficulty:** Hard.
- **Primary resource:** [Tool use with Claude (platform docs)](https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview) (6 h). Also scheduled: [What is MCP?](https://modelcontextprotocol.io/docs/getting-started/intro), [Agent SDK overview](https://code.claude.com/docs/en/agent-sdk/overview), [Introduction to Model Context Protocol](https://anthropic.skilljar.com/introduction-to-model-context-protocol), [Model Context Protocol: Advanced Topics](https://anthropic.skilljar.com/model-context-protocol-advanced-topics), and optional Prep L2.
- **Exercises:** E3.1 Tool and MCP server build; E3.2 Enterprise integration design; CP3 Integrations and prototype.
- **Checkpoint:** CK3 (week 5).
- **Hours:** 30 (02 estimate). **Weeks:** 4–6.

### M4 — Evaluation, Testing and Optimization
- **Purpose:** design LLM eval datasets, graders and regression tracking; tune cost and latency using eval evidence.
- **Competencies:** C4. **Prerequisites:** M1, M2. **Difficulty:** Hard.
- **Primary resource:** [Define success criteria and build evaluations (platform docs)](https://platform.claude.com/docs/en/test-and-evaluate/develop-tests) (3 h). Also scheduled: [Writing Effective Tools for AI Agents](https://www.anthropic.com/engineering/writing-tools-for-agents), the verification sections of [Best practices for Claude Code](https://code.claude.com/docs/en/best-practices), and a 2 h deepening block.
- **Exercises:** E4.1 Build a small eval suite; E4.2 Optimization plan; CP4 Eval and optimization.
- **Checkpoint:** CK4 (week 7).
- **Hours:** 24 (02 estimate; about 15.5 h scheduled in 06). **Weeks:** 6–7.

### M5 — Governance, Safety and Risk Management
- **Purpose:** assess and mitigate the risks of agents with tool access (prompt injection, data handling, compliance, oversight). This is the largest gap.
- **Competencies:** C5. **Prerequisites:** M2, M3. **Difficulty:** Medium.
- **Primary resource:** [Mitigate jailbreaks and prompt injections (platform docs)](https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/mitigate-jailbreaks) (2 h). Also scheduled: [Claude Code security](https://code.claude.com/docs/en/security), [API and data retention](https://platform.claude.com/docs/en/manage-claude/api-and-data-retention), [Anthropic Usage Policy](https://www.anthropic.com/legal/aup), [AI Fluency: Framework & Foundations](https://anthropic.skilljar.com/ai-fluency-framework-foundations), and optional Prep L3.
- **Exercises:** E5.1 Threat model and controls; E5.2 Governance checklist; CP5 Risk and governance.
- **Checkpoint:** CK5 (week 8).
- **Hours:** 20 (02 estimate). **Weeks:** 7–8.

### M6 — Stakeholder Communication and Lifecycle Management
- **Purpose:** build business cases and rollout plans for non-technical stakeholders; plan versioning, deprecation and model migration.
- **Competencies:** C6. **Prerequisites:** M2, M4. **Difficulty:** Medium.
- **Primary resource:** [Manage costs effectively (Claude Code docs)](https://code.claude.com/docs/en/costs) (3 h). Also scheduled: [Model deprecations](https://platform.claude.com/docs/en/about-claude/model-deprecations), [Migration guides](https://platform.claude.com/docs/en/about-claude/models/migration-guide), and optional Prep L4 (the main stakeholder-communication content).
- **Exercises:** E6.1 Business case and rollout plan; E6.2 Lifecycle and migration runbook; CP6 Business case and lifecycle.
- **Checkpoint:** CK6 (week 10, together with M7).
- **Hours:** 20 (02 estimate). **Weeks:** 8–9.

### M7 — Developer Productivity and Operational Enablement
- **Purpose:** design team-scale Claude Code practices (standards, settings governance, CI, telemetry, onboarding). This module is a review for an experienced user.
- **Competencies:** C7. **Prerequisites:** M1. **Difficulty:** Easy.
- **Primary resource:** [Best practices for Claude Code](https://code.claude.com/docs/en/best-practices) (3 h). Also scheduled: [Monitoring Claude Code with OpenTelemetry](https://code.claude.com/docs/en/monitoring-usage), [Settings files and precedence](https://code.claude.com/docs/en/settings), [Claude Code in Action](https://anthropic.skilljar.com/claude-code-in-action), [Claude Code overview](https://code.claude.com/docs/en/overview), and optional Prep L5.
- **Exercises:** E7.1 Team enablement kit; CP7 Team enablement and assembly (capstone assembly and design review).
- **Checkpoint:** CK6 (week 10).
- **Hours:** 10 (02 estimate). **Weeks:** 9–10.

### Final phase — mock, review, exam
After M1–M7: the full mock exam in week 11 (needs all modules); review, capstone defence and the readiness checklist in week 12; light review and the exam in week 13.

## Weekly Schedule
"Consol." is a 1 h gap-log review at the end of a module. "Prep L1–L5" are the lessons of the optional Claude Certified Architect – Professional Prep Course. "Deepening" is buffer time deliberately moved into a thin module.

| Week (dates) | Modules | Study | Practice | Checkpoint | Planned h |
|---|---|---|---|---|---|
| 1 (10-02 to 10-08) | M1 | **Eligibility task:** Claude certification FAQ, Partner Academy exam page, Four role-based certifications blog (1.25 h); Claude API Features overview (8 of 10 h); Prompt caching (2 h) | E1.1 (1 h) | — | 12.25 |
| 2 (10-09 to 10-15) | M1, M2 | Claude API Features overview (last 2 h); Building with the Claude API course (first 4 h); Building Effective AI Agents (1.5 h); How We Built Our Multi-Agent Research System (1 h); M1 consol. (1 h) | E1.2 (2 h); CP1 (0.5 h) | CK1 (0.75 h) | 12.75 |
| 3 (10-16 to 10-22) | M2 | Effective Context Engineering for AI Agents (1 h); Prep L1 (4 h); M2 deepening: second pass of Building Effective AI Agents and the multi-agent research article against the E2.1 matrix (1.25 h); M2 consol. (1 h) | E2.1 (2 h); E2.2 (3 h); CP2 (1 h) | CK2 (0.75 h) | 14.00 |
| 4 (10-23 to 10-29) | M3 | Tool use with Claude (6 h); What is MCP? (3 h) | E3.1 (4 h) | — | 13.00 |
| 5 (10-30 to 11-05) | M3 | Agent SDK overview (4 h); Introduction to Model Context Protocol course (3 h); Prep L2 (2.6 h) | E3.2 (2 h); CP3 (1.5 h) | CK3 (0.83 h) | 13.93 |
| 6 (11-06 to 11-12) | M3, M4 | Model Context Protocol: Advanced Topics (3 h); Define success criteria and build evaluations (3 h); Writing Effective Tools for AI Agents (1.5 h); Best practices for Claude Code, verification sections (2 h); M3 consol. (1 h) | E4.1 (3 h) | — | 13.50 |
| 7 (11-13 to 11-19) | M4, M5 | M4 deepening: re-read Define success criteria and build evaluations and Writing Effective Tools for AI Agents against the E4.1 results, then compare with the cost levers in Prompt caching and Manage costs effectively (2 h); M4 consol. (1 h); Mitigate jailbreaks and prompt injections (2 h); Claude Code security (2 h); API and data retention (3 h) | E4.2 (2 h); CP4 (1 h) | CK4 (0.75 h) | 13.75 |
| 8 (11-20 to 11-26) | M5, M6 | Anthropic Usage Policy (1 h); AI Fluency: Framework & Foundations (3 h); Prep L3 (1.9 h); Model deprecations (1.5 h); M5 consol. (1 h) | E5.1 (2 h); E5.2 (1 h); CP5 (1 h) | CK5 (0.75 h) | 13.15 |
| 9 (11-27 to 12-03) | M6, M7 | Manage costs effectively (3 h); Migration guides (1 h); Prep L4 (3 h); M6 consol. (1 h); Best practices for Claude Code (first 2 of 3 h) | E6.1 (2 h); E6.2 (1 h); CP6 (1 h) | — | 14.00 |
| 10 (12-04 to 12-10) | M7 | Best practices for Claude Code (last 1 h); Monitoring Claude Code with OpenTelemetry (1.5 h); Settings files and precedence (2 h); Claude Code in Action (2 h); Prep L5 (0.75 h); Claude Code overview (1 h) | E7.1 (2 h); CP7 assembly part 1 (2 h) | CK6 (covers M6 and M7; 1.17 h) | 13.42 |
| 11 (12-11 to 12-17) | M1–M7 | Review of the two weakest domains from the gap log and CK1–CK6 results (6 h); eligibility and registration re-check (0.5 h) | CP7 assembly part 2 and 30-minute design review (2 h) | Full mock exam: 63 items, 120 min, plus 60 min review (3 h) | 11.50 |
| 12 (12-18 to 12-24) | M1–M7 | Second-pass domain review ordered by exam weight: M3, M2, M4, M5, M6, M1, M7 (4 h) | — | Capstone defence (45 min) and readiness checklist (15 min) (1 h) | 5.00 |
| 12, contingent | M1–M7 | Only if the mock is below 80 % overall or 70 % in a domain: up to 6 h of review of the weakest two domains | — | Retake: 30 flagged items, 45 min plus 15 min review (1 h) | up to 7.00 (not in total; week 12 then 12.0 h) |
| 13 (12-25 to 2027-01-01) | M1–M7 | Final light review from the gap log and quiz misses (4 h) | — | Sit the exam (2 h; date set by the learner and the eligibility result) | 6.00 |
| **Total (excl. contingent)** | | **108.25 h** | **37.00 h** | **11.00 h** | **156.25** |

**Budget:** study 108.25 h (59.5 %), practice 37.00 h (20.3 %; 13 exercises 27 h plus capstone 10 h), assessments 11.00 h (6.0 %), buffer 25.75 h (14.2 %). Total 182.00 h.

### Milestones
| Week | Milestone | Evidence |
|---|---|---|
| 1 | Exam eligibility known and official exam guide located | Note in `m1-blueprint.md` (E1.1): eligibility result (Partner Network email: yes, no, or alternative route), official guide status, domain-weight comparison |
| 2 | M1 complete | CK1 passed (quiz at least 5/6, no rubric "fail"); `m1-model-cost.md` (E1.2) |
| 3 | M2 complete; architecture drafted | CK2 passed (at least 5/6); `m2-pattern-matrix.md`, `m2-architecture.md` (CP2) |
| 5 | M3 complete; MCP prototype running | CK3 passed (at least 5/7); `m3-mcp-server/`, `m3-integration-design.md` (CP3) |
| 7 | M4 complete; eval suite with baseline and tuning | CK4 passed (at least 5/6); `m4-evals/`, `m4-optimization.md` (CP4) |
| 8 | M5 complete | CK5 passed (at least 5/6); `m5-threat-model.md`, `m5-governance.md` (CP5) |
| 10 | M6 and M7 complete | CK6 passed (at least 6/8); `m6-business-case.md`, `m6-lifecycle-runbook.md`, `m7-enablement-kit.md` |
| 11 | Capstone package assembled; full mock taken | `capstone-package.md`; design-review log with 8 scenario answers; mock score recorded |
| 12 | Readiness confirmed | Mock at least 80 % overall and 70 % per domain (or retake at least 24/30 and 75 % in each of the two weakest domains); capstone defence passes the final rubric; readiness checklist complete |
| 13 | Exam sat | Exam attempt within the window (date depends on the eligibility result) |

### If you fall behind or get ahead
**Behind** (drop or compress in this order): 1) use the unscheduled buffer (about 1 h per week), keeping the 7 h week 12 contingency untouched; 2) drop Prep L1–L5 (12.25 h) if Partner Academy access is missing or time is short, but keep the M2 and M4 deepening blocks; 3) drop Building with the Claude API (4 h, week 2), Introduction to Model Context Protocol (3 h, week 5) and AI Fluency (3 h, week 8); 4) reduce consolidation (7 h in total) to a 30-minute gap-log review per module; 5) skim Model Context Protocol: Advanced Topics and Claude Code overview (4 h in total); 6) never drop the eligibility task, E2.2, E3.1, E4.1, E5.1, E6.1, the CK1–CK6 quizzes, the full mock or the week 12 defence. If the mock is below 80 %, use the week 12 contingency and move the exam date rather than skipping the retake.

**Ahead:** finish Building with the Claude API (last 4 h) or take Introduction to Subagents; run the optional API calls in E3.1 and E4.1 and grow the eval set (for example to 30 cases); sit the 30-item retake subset as a second mock after a 7-day gap, with a one-line justification per answer; rehearse the capstone defence aloud with a peer.

## Exercises and Projects
Principles: read first, then do one short architecture-style task. Check the result against its self-check and the official docs, then ask Claude Code to act as a critical exam reviewer ("find the weakest decision and the missing trade-off"). Log every miss in a running gap log. All deliverables live in a `ccar-portfolio/` folder so the capstone can be assembled from them. API calls are optional and capped; Claude Code sessions can substitute.

| Id | Module | Title | Objective | Deliverable | Hours | Difficulty | Self-check |
|---|---|---|---|---|---|---|---|
| E1.1 | M1 | Exam blueprint and gap log | C2: know exam format, domains and own gaps | `m1-blueprint.md` | 1 | Easy | Table cites the official guide; every self-check miss is logged with a module |
| E1.2 | M1 | Model, cost and caching worksheet | C2: choose model tier, apply caching, estimate token cost | `m1-model-cost.md` | 2 | Medium | Each workload has tier, cost estimate and a cache plan with at least one invalidation case |
| E2.1 | M2 | Pattern selection matrix | C1: choose single agent, workflow or multi-agent with trade-offs | `m2-pattern-matrix.md` | 2 | Medium | Every row names a rejected alternative and why |
| E2.2 | M2 | Reference architecture and ADRs | C1: design and justify a full Claude solution | `m2-architecture.md` with diagram and ADRs | 3 | Hard | Each ADR has context, options, decision, consequences; diagram matches the ADRs |
| E3.1 | M3 | Tool and MCP server build | C3: implement tools and an MCP server and understand their contracts | `m3-mcp-server/` with README | 4 | Hard | Server runs; all three capability types are exercised; errors return structured messages |
| E3.2 | M3 | Enterprise integration design | C3: design and critique integration with enterprise systems | `m3-integration-design.md` | 2 | Medium | Each system has auth and failure handling, and every choice has a stated reason |
| E4.1 | M4 | Build a small eval suite | C4: design datasets, graders and regression tracking | `m4-evals/` (cases, rubric, results) | 3 | Hard | Suite has at least 15 cases, repeated runs and a written threshold |
| E4.2 | M4 | Optimization plan | C4: reduce cost and latency without losing quality | `m4-optimization.md` | 2 | Medium | Before/after numbers exist for two levers and the decision cites them |
| E5.1 | M5 | Threat model and controls | C5: assess and mitigate risks of an agent with tool access | `m5-threat-model.md` | 2 | Medium | Every risk has a control and a residual rating; at least one injection scenario is walked through |
| E5.2 | M5 | Governance checklist | C5: map compliance, data handling and oversight needs | `m5-governance.md` | 1 | Easy | Checklist covers data class, retention, audit, oversight and escalation |
| E6.1 | M6 | Business case and rollout plan | C6: explain value and plan adoption for non-technical stakeholders | `m6-business-case.md` | 2 | Medium | A non-engineer can read it in 5 minutes; ROI shows assumptions |
| E6.2 | M6 | Lifecycle and migration runbook | C6: plan versioning and model migration | `m6-lifecycle-runbook.md` | 1 | Medium | Runbook has trigger, test gate, rollout and rollback steps |
| E7.1 | M7 | Team enablement kit | C7: design team-level Claude Code practices | `m7-enablement-kit.md` | 2 | Easy | Kit covers standards, permissions, CI and onboarding; each item is something a new team member could follow |

**Exercise steps (summary):**
- E1.1: find the official exam guide; tabulate the 7 domains, weights and topics; compare with the weights in 02; take the five self-check questions; draft the gap log.
- E1.2: for three workloads (bulk classification, long-doc summary, interactive agent), choose and justify a model tier, estimate tokens and cost from public pricing, mark the cacheable prefix and what invalidates it; optionally run one cached call.
- E2.1: for five scenarios, pick a pattern (single agent with tools, prompt chain, routing, parallel, orchestrator-workers), record cost, latency and failure modes, and write when not to use an agent.
- E2.2: for the capstone scenario, draw a Mermaid component diagram, write 4 ADRs (pattern, model tiering, state/memory, human-in-the-loop) and a failure-mode table; have Claude critique the design and fix two weaknesses.
- E3.1: define two tool schemas with error returns; build a local MCP server with one tool, one resource and one prompt; connect it to Claude Code; test a bad-input case and a timeout; optionally make up to about 20 API tool-use calls.
- E3.2: for ticketing, a document store and an identity provider, decide auth, data flow, rate limits, retries and idempotency; place MCP, Agent SDK or plain API calls; add a sequence diagram.
- E4.1: write 15 test cases (including edge and adversarial cases); define a rubric plus one code-based and one model-graded check; run each case 3 times; record variance; set a pass threshold.
- E4.2: from the E4.1 baseline, list five levers (model tier, caching, prompt trimming, batching, routing); predict their effects; try two and re-run; decide what ships.
- E5.1: list assets, trust boundaries and untrusted inputs; identify risks (prompt injection, data leakage, excessive agency, hallucination); map controls; rank residual risk.
- E5.2: classify data; write retention, access and audit rules; define oversight points and escalation; note the applicable Anthropic usage-policy limits.
- E6.1: write a one-page executive summary (problem, value, cost, risk), ROI assumptions with ranges, a phased rollout with metrics, and objections with answers.
- E6.2: pin and version prompts, tools and eval sets; define migration steps that use the M4 suite; add deprecation monitoring, rollback and a change-communication note.
- E7.1: write a shared team `CLAUDE.md` standard, a settings/permissions/hooks policy, a CI proposal (headless runs, review gates), and onboarding steps with metrics.

### Capstone: Architecture Decision Package for a Claude-based Compliance-Document Assistant
Design, partly prototype and defend a production-grade solution in which Claude drafts and reviews technical and compliance documents from internal sources. You act as a Professional-level architect across all seven exam domains. The output is a portfolio package plus a 30-minute self-run "design review" in which you answer exam-style scenario questions.

| Milestone | Module | Content | Scheduled (06) |
|---|---|---|---|
| CP1 Scope and model plan | M1 | Scenario, requirements, model tiers, cost envelope (from E1.2) | 0.5 h, week 2 |
| CP2 Architecture | M2 | Diagram and ADRs (from E2.2) | 1 h, week 3 |
| CP3 Integrations and prototype | M3 | MCP server plus integration design (E3.1, E3.2) | 1.5 h, week 5 |
| CP4 Eval and optimization | M4 | Eval suite and tuned baseline (E4.1, E4.2) | 1 h, week 7 |
| CP5 Risk and governance | M5 | Threat model and governance rules (E5.1, E5.2) | 1 h, week 8 |
| CP6 Business case and lifecycle | M6 | Executive summary, rollout, migration runbook (E6.1, E6.2) | 1 h, week 9 |
| CP7 Team enablement and assembly | M7 | Enablement kit; assemble `capstone-package.md`; run design review | 4 h, weeks 10–11 |

**Deliverables:** `ccar-portfolio/capstone-package.md` (maximum 15 pages, linking to all module files); the MCP server prototype; the eval results table; a one-page design-review log with 8 scenario questions and answers.

**Acceptance criteria:**
1. All seven domains are addressed with at least one concrete design decision each.
2. The architecture has at least four ADRs, each listing a rejected alternative.
3. The prototype runs, and the eval suite shows a stated pass rate against a stated threshold.
4. The threat model covers prompt injection and data leakage, with controls.
5. The business case and migration runbook are consistent with the architecture and the eval data.
6. The design-review log answers at least 8 scenario questions, and the learner marks any weak answers back into the gap log.

**Estimated hours:** 10, on top of the exercises (27 h). Practice totals 37 h.

## Checkpoints and Assessments
**Strategy:** one checkpoint after each of M1–M5, plus a combined checkpoint after M6 and M7. Each checkpoint is a closed-book quiz plus a rubric grading of the 04 exercise deliverable it names, so it adds no new practical work. Then a 63-item full mock in week 11, and a 30-item retake in week 12 only if needed. Pass thresholds: quiz 5/6, 5/7 or 6/8; no rubric criterion below "pass"; mock at least 80 % overall and 70 % per domain. On a miss: re-read the module section named in the answer, retake only the missed quiz items after 48 h, and fix the failed rubric criterion. The domain stays "open" until it passes.

| Checkpoint | Week | Competencies | Quiz | Grades deliverable | Pass criterion | Time |
|---|---|---|---|---|---|---|
| CK1 — after M1 | 2 | C2 | 6 questions | E1.2 `m1-model-cost.md` | Quiz at least 5/6; no rubric criterion below "pass" | 45 min |
| CK2 — after M2 | 3 | C1 | 6 questions | E2.2 `m2-architecture.md` | Quiz at least 5/6; no rubric criterion below "pass" | 45 min |
| CK3 — after M3 | 5 | C3 | 7 questions | E3.1 `m3-mcp-server/` | Quiz at least 5/7; no rubric criterion below "pass" | 50 min |
| CK4 — after M4 | 7 | C4 | 6 questions | E4.1 `m4-evals/`, E4.2 `m4-optimization.md` | Quiz at least 5/6; no rubric criterion below "pass" | 45 min |
| CK5 — after M5 | 8 | C5 | 6 questions | E5.1 `m5-threat-model.md` | Quiz at least 5/6; no rubric criterion below "pass" | 45 min |
| CK6 — after M6 and M7 | 10 | C6, C7 | 8 questions | E6.1, E6.2, E7.1 | Quiz at least 6/8; no rubric criterion below "pass" | 70 min |

### Checkpoint quizzes (answers in italics)
**CK1 (C2)**
1. What does prompt caching reuse, and what invalidates a cache hit? — *An unchanged prompt prefix up to the cache breakpoint; any change to the prefix content, or expiry of the entry, causes a miss.*
2. Why should stable content (system prompt, tool definitions, reference docs) be placed before variable content? — *So the stable prefix can be cached and reused across calls.*
3. A support bot sends a 30k-token policy document with every request and costs are high. What is the first change you propose? — *Place the document at the start of the prompt as a cached prefix and keep per-request content after it.*
4. A classification task is high-volume, simple and latency-sensitive. Which tier choice and why? — *The smaller, faster, cheaper model tier; test it on a labelled sample first and escalate to a larger tier only if accuracy is short.*
5. Name two techniques that keep long conversations inside the context window. — *Summarising or compacting older turns, trimming tool output, retrieving only relevant documents, moving state to external memory or files.*
6. An agent's answers degrade late in a long session. Give two likely causes and a fix. — *Context filled with stale or noisy tool output and instructions buried far from the current task; compact or restart with a summary, re-state key instructions.*

**CK2 (C1)**
1. When is a multi-agent design preferable to a single agent with tools, and what is its main cost? — *Parallelisable work, isolated context or work beyond one context window; cost is more tokens, latency, coordination complexity and harder debugging.*
2. What distinguishes a fixed workflow (for example prompt chaining) from an autonomous agent? — *A workflow follows predefined code paths; an agent lets the model decide steps and tool use dynamically.*
3. A nightly process always runs the same five steps: extract, classify, enrich, summarise, file. Which pattern and why? — *A fixed prompt-chaining workflow; steps are known, so predictability, cost and testability beat agent autonomy.*
4. Several independent research queries must be run, then merged. Which pattern fits? — *Parallelisation or an orchestrator-worker layout, with a synthesis step.*
5. Reviewers keep finding that a generated report contains unsupported claims. Which pattern adds the most reliability? — *An evaluator-optimiser (generate, critique, revise) loop, or a separate validator step with defined pass criteria.*
6. Name two failure modes specific to multi-agent systems. — *Cascading errors from bad hand-offs, runaway loops or cost, conflicting outputs, lost context between agents.*

**CK3 (C3)**
1. What three capability types can an MCP server expose? — *Tools, resources and prompts.*
2. What are the two common MCP transports for a local server and a remote server? — *stdio for local processes; HTTP-based (streamable HTTP) for remote servers.*
3. What makes a good tool description? — *Clear purpose, when to use and not use it, parameter meaning and types, and expected output; the model chooses tools from this text.*
4. A tool call fails with a transient error. How should the agent loop handle it? — *Return a structured error to the model, retry with limits and backoff where safe, and cap iterations; do not retry non-idempotent actions blindly.*
5. An agent must read a company wiki and write tickets. How do you limit blast radius? — *Separate read and write tools, least-privilege credentials, scoped tokens, human approval on writes if risk warrants.*
6. Thirty tools are loaded and tool selection accuracy drops. What do you do? — *Reduce or group tools, scope tools per sub-agent, improve descriptions, or load tools on demand.*
7. Why use an MCP server rather than a custom function per application? — *A standard, reusable interface that any compatible client can connect to, reducing per-integration code.*

**CK4 (C4)**
1. Why is exact-match testing against one golden answer insufficient for an LLM feature? — *Outputs are non-deterministic and varied; use representative datasets, rubric or model-graded checks, repeated runs and regression tracking.*
2. Name three kinds of grader. — *Code-based (exact or rule checks), model-graded (LLM judge with rubric), and human review.*
3. A model-graded eval gives suspiciously high scores. What do you check? — *Grader bias and rubric clarity; calibrate against human-labelled samples, use a different or stronger grader and check for position or length bias.*
4. A prompt change improves five examples but you ship nothing. Why, and what is needed? — *Five examples are not representative; build a dataset covering common and edge cases and compare before and after on all of it.*
5. Cost must drop 40 % with equal quality. List three levers in the order you would try. — *Prompt caching, a smaller model tier on easy cases (routing), shorter prompts and outputs, batching for non-urgent work; verify with the eval set after each change.*
6. What is a regression suite for an LLM app and when does it run? — *A fixed eval set run on every prompt, model or tool change (for example in CI) to detect quality drops.*

**CK5 (C5)**
1. Name two controls that reduce prompt-injection risk in an agent with tool access. — *Least-privilege permissions, human approval for sensitive actions, input and output validation, isolating untrusted content, sandboxing.*
2. What is the difference between direct and indirect prompt injection? — *Direct comes from the user's own input; indirect hides in content the agent retrieves (web pages, documents, tool output).*
3. An agent summarises inbound emails and can also send email. What risk arises and what is the fix? — *Indirect injection could make it exfiltrate data; separate read and send capabilities, require approval for sends, and restrict recipients.*
4. A regulated customer asks where its data goes. What do you document? — *Data flow, what is sent to the model, retention and training terms, access controls, logging, and the legal basis or region constraints.*
5. Rank these by risk and justify: read-only search agent, agent with shell access, agent with database write access. — *Shell and write access are higher; mitigate with sandboxing, scoped credentials, approvals and audit logs; read-only is lowest but still exposes retrieved data.*
6. What belongs in an AI risk register entry? — *Risk, likelihood, impact, owner, mitigation, residual risk and review date.*

**CK6 (C6, C7)**
1. What should a business case for a Claude-based solution include? — *Problem and baseline, expected benefit, cost model (usage, build, run), risks, success metrics and a pilot plan.*
2. Why plan for model deprecation? — *Models are retired on a schedule; prompts, evals and integrations tied to one version need a migration path.*
3. A new model version is released. Describe a safe migration. — *Run the regression suite on the new model, compare quality and cost, canary or shadow traffic, then roll out with rollback available.*
4. An executive asks "can we trust it?" How do you answer? — *Use eval results with stated limits, describe the guardrails and human oversight, give error rates and an escalation path rather than promises.*
5. Costs grow 3x after launch. What do you present to stakeholders? — *Usage drivers, cost per task, optimisation options with expected savings, and a decision on trade-offs.*
6. What belongs in a team-shared Claude Code project configuration? — *CLAUDE.md conventions, shared settings and permissions, agents, skills, commands, hooks and MCP configuration, committed to version control.*
7. A team wants Claude Code in CI for review comments. Which controls do you set? — *Non-interactive mode with limited tool permissions, no secrets in prompts, human merge approval, logging and spend limits.*
8. Three developers get inconsistent results from Claude Code on one repo. What do you standardise? — *Shared CLAUDE.md, settings, skills and a documented workflow, plus onboarding and review practices.*

### Checkpoint grading rubrics (pass level; "strong" is optional)
| Checkpoint | Criterion | Pass |
|---|---|---|
| CK1 / E1.2 | Tier choice per workload | Each of the 3 workloads has a tier with one stated reason |
| CK1 / E1.2 | Cost estimate | Input/output tokens and cost shown with stated assumptions |
| CK1 / E1.2 | Cache plan | Cacheable prefix marked, with at least one invalidation case |
| CK1 / E1.2 | Self-check complete | All E1.2 self-check bullets met |
| CK2 / E2.2 | ADR completeness | 4 ADRs (pattern, model tiering, state/memory, human-in-the-loop), each with context, options, decision, consequences and a rejected alternative |
| CK2 / E2.2 | Diagram consistency | Mermaid diagram matches the ADRs |
| CK2 / E2.2 | Failure modes | Table with at least three modes, each with a mitigation |
| CK2 / E2.2 | Critique applied | Two weaknesses found by the Claude review are fixed |
| CK3 / E3.1 | Tool schemas | Two tool schemas with clear names, parameters, descriptions and error returns |
| CK3 / E3.1 | Capability coverage | Server runs from Claude Code and the tool, resource and prompt are each exercised |
| CK3 / E3.1 | Error handling | Bad-input and timeout cases return structured messages |
| CK3 / E3.1 | Security | No hard-coded credentials; scope stated in the README |
| CK4 / E4.1–E4.2 | Dataset | At least 15 cases incl. edge and adversarial |
| CK4 / E4.1–E4.2 | Graders and threshold | Rubric plus one code-based and one model-graded check; written pass threshold |
| CK4 / E4.1–E4.2 | Results | Each case run 3 times; table with variance |
| CK4 / E4.1–E4.2 | Optimisation | Before and after numbers for two levers; ship decision cites them |
| CK5 / E5.1 | Assets and boundaries | Assets, trust boundaries and untrusted inputs listed |
| CK5 / E5.1 | Risk coverage | Injection, data leakage, excessive agency and hallucination covered |
| CK5 / E5.1 | Controls and residual risk | Every risk has a control and a residual rating |
| CK5 / E5.1 | Injection walkthrough | At least one injection scenario walked through end to end |
| CK6 / E6.1 | Business case | One-page non-technical summary with value, cost, risk, ROI assumptions as ranges, phased rollout and objections |
| CK6 / E6.2 | Lifecycle runbook | Trigger, test gate, rollout and rollback steps; versions pinned |
| CK6 / E7.1 | Enablement kit | Covers CLAUDE.md standard, settings/permissions/hooks, CI proposal, onboarding |
| CK6 | Consistency | Numbers match the E2.2 architecture and E4.1 results |

### Final assessment
- **Full mock exam (week 11; 120 min plus 60 min review):** 63 new scenario items weighted C1 11, C2 8, C3 12, C4 10, C5 9, C6 9, C7 4. Take it under exam conditions (closed book, timed, items shuffled) after M1–M7. Items are single-answer MCQ unless marked "MRQ (choose 2)".
- **Week 12 retake subset (30 items, contingent):** the items flagged R, with per-domain quota C1 5, C2 4, C3 6, C4 5, C5 4, C6 4, C7 2. Shuffle item and option order, wait at least 7 days after the first sitting, and write a one-line justification for each answer. Pass: at least 80 % overall (24/30) and at least 75 % in each of the two weakest domains. If it still fails, move the exam date.
- **Acceptance checks:** 1) mock at least 80 % overall and at least 70 % in every domain (or the retake passes); 2) `ccar-portfolio/capstone-package.md` meets its six acceptance criteria, with the architecture, eval, governance and rollout parts each rated at least "pass"; 3) CK1–CK6 all passed (a retake counts if the final attempt passes); 4) readiness checklist complete: official exam guide read, domain weights confirmed, registration and exam logistics reviewed.
- **Capstone defence rubric (45 min, self-recorded or peer-reviewed, using the design-review log as input):**

| Criterion | Pass | Strong |
|---|---|---|
| Architecture justification | Pattern and trade-offs justified | Alternatives and failure modes tied to measured evidence |
| Evidence of quality | Eval results shown against the stated threshold | Regression suite and cost data included |
| Risk and governance | Threats and controls listed | Controls enforced and tested |
| Lifecycle and communication | Rollout and migration plan present | Stakeholder plan with metrics |

- **Pass criterion:** all four acceptance checks hold. If the first mock is below 80 %, review the weakest two domains for up to 6 h and sit the retake.
- **Assessment time:** checkpoints 5.0 h, final 240 min (mock 120, review 60, defence 45, checklist 15), 9.0 h in total; plus the 2 h exam = 11.0 h. Contingent and not in the total: retake 60 min plus up to 6 h of review.

### Mock exam item bank
"R" marks the week 12 retake subset. Rationales are kept short.

**C1 — Solution Design and Architecture (Q01–Q11)**

| # | R | Stem and options | Key | Rationale |
|---|---|---|---|---|
| Q01 | | Tickets fall into 4 known categories, each needs a different queue and a drafted reply. Best design? A) Autonomous multi-agent swarm. B) One agent with 40 tools. C) Routing workflow, then a category-specific drafting prompt. D) Human triage only. | C | Known categories favour routing; autonomy adds cost without benefit. |
| Q02 | R | Strongest reason to choose multi-agent over a single agent? A) The team prefers it. B) Subtasks are independent and each needs a large, isolated context. C) It uses fewer tokens. D) It is easier to debug. | B | Parallel, isolated work is the core justification. |
| Q03 | | MRQ (choose 2): real costs of an orchestrator-worker design. A) Higher token use. B) Hand-off and coordination errors. C) Inability to parallelise. D) Always lower latency. | A, B | Overhead and lossy hand-offs; it does enable parallelism. |
| Q04 | R | An orchestrator's brief to a worker drops a constraint, and the final report violates it. Root cause and fix? A) Cache miss; add caching. B) Tool timeout; add retries. C) Lossy hand-off; pass a structured brief with constraints and add a validator step. D) Model too small; upgrade. | C | Fix the contract and verify downstream. |
| Q05 | | Requirement: steps fixed, output reproducible and auditable. Which design? A) Prompt chain with logged intermediate outputs. B) Open-ended autonomous agent. C) Multi-agent debate. D) One long prompt. | A | Fixed steps with logs give predictability and an audit trail. |
| Q06 | R | An ADR lists only the decision and its benefits. What is missing? A) Team names. B) Source code. C) Vendor pricing. D) Consequences and rejected alternatives with reasons. | D | An ADR records context, options, decision and consequences. |
| Q07 | | An agent loops on an ambiguous task and spend spikes. Best mitigation? A) Larger context. B) Iteration and budget caps with escalation to a human. C) Higher temperature. D) Remove all tools. | B | Bounded loops with an escalation path contain runaway cost. |
| Q08 | R | MRQ (choose 2): which cases justify a human-in-the-loop step? A) Irreversible payment. B) Reading a public FAQ. C) Low-confidence legal classification. D) Formatting a table. | A, C | High impact or low confidence warrants approval. |
| Q09 | | 200 independent contracts must be checked concurrently and merged into one report. Best pattern? A) Sequential single agent. B) One prompt with all 200 contracts. C) Evaluator loop only. D) Parallel workers per contract plus a synthesis step. | D | Independent units parallelise and avoid context overflow. |
| Q10 | R | Output quality varies; pass criteria are explicit (schema plus checklist). Add what? A) More tools. B) Bigger model only. C) A bounded evaluator-optimiser loop. D) Remove validation. | C | Explicit criteria let a critic drive revisions; cap the rounds. |
| Q11 | | A stakeholder wants "an agent" for three deterministic API calls. Response? A) Build a multi-agent system. B) Use plain code or a workflow, and call the model only where language judgement is needed. C) Build one agent with all tools. D) Refuse the project. | B | Do not add autonomy where the logic is deterministic. |

**C2 — Claude Models, Prompting and Context Engineering (Q12–Q19)**

| # | R | Stem and options | Key | Rationale |
|---|---|---|---|---|
| Q12 | | Best prompt layout for caching? A) System prompt, tools and reference docs, then the user question. B) User question first. C) Docs after the question. D) Order does not matter. | A | Stable prefix first so it can be reused. |
| Q13 | R | The prompt looks identical yet cache hits are near zero. Likely cause? A) Long prompt. B) Tool names. C) A current timestamp at the start of the system prompt. D) Output too long. | C | A changing token in the prefix invalidates the cache. |
| Q14 | | 1M simple extraction calls a month, sub-second latency. Tier approach? A) Largest tier by default. B) Medium tier untested. C) No model. D) Smallest tier, validated on a labelled sample. | D | Cheap, fast tier with evidence; escalate only if short. |
| Q15 | R | MRQ (choose 2): ways to limit context growth in a long-running agent. A) Compact older turns. B) Append all raw tool output. C) Trim or summarise large tool output. D) Drop the instructions. | A, C | Keep only what the next step needs. |
| Q16 | R | Which inputs are needed for a monthly cost estimate? A) Number of users only. B) Requests x token counts x per-token prices, adjusted for the cached share. C) Model name only. D) Output length only. | B | Cost is tokens times price, input and output separately, with caching. |
| Q17 | | A rule given at turn 3 is ignored at turn 80. Best fix? A) Raise max tokens. B) Bigger tier only. C) Delete the system prompt. D) Compact the history and restate key rules near the current task. | D | Buried instructions fade; restate and compact. |
| Q18 | R | Output tokens cost more than input tokens per unit. Design implication? A) None. B) Add more examples to outputs. C) Ask for concise structured output where full prose is not needed. D) Always use streaming. | C | Shorter outputs reduce the costlier side. |
| Q19 | | How do you choose between two tiers for a task? A) Pick the cheaper. B) Rely on public benchmarks. C) Ask the model. D) Run both on the same labelled sample and compare quality, latency and cost. | D | Decide on your own task data. |

**C3 — Integration (Q20–Q31)**

| # | R | Stem and options | Key | Rationale |
|---|---|---|---|---|
| Q20 | | Which MCP capability is a read-only document the client can load as context? A) Tool. B) Prompt. C) Resource. D) Transport. | C | Resources expose data; tools act. |
| Q21 | R | Claude Code launches a local MCP server as a subprocess. Transport? A) stdio. B) Streamable HTTP. C) SMTP. D) FTP. | A | stdio is for local processes. |
| Q22 | | A tool description reads "Searches stuff." Effect? A) Model may misuse or skip it. B) None. C) Faster calls. D) Schema fails. | A | The model selects tools from the description text. |
| Q23 | R | MRQ (choose 2): improve selection among 35 tools. A) Scope tools per sub-agent. B) Add more tools. C) Sharpen descriptions with when to use and not use. D) Rename tools randomly. | A, C | Fewer, clearer tools per context. |
| Q24 | | A tool gets HTTP 429. Best handling? A) Crash. B) Retry immediately forever. C) Report success. D) Return a structured retryable error; retry with backoff and a cap. | D | Rate limits are transient; bound the retries. |
| Q25 | R | `create_ticket` timed out and its outcome is unknown. Safe approach? A) Retry blindly. B) Use an idempotency key or check for the ticket before retrying. C) Ignore it. D) Delete all tickets. | B | Non-idempotent actions need duplicate protection. |
| Q26 | | Agent reads a wiki and writes tickets. Credential design? A) One admin token. B) The user's password in the prompt. C) Separate read and write tools with scoped tokens. D) A shared team key. | C | Least privilege limits blast radius. |
| Q27 | R | Where should an MCP server's API secret live? A) In the tool description. B) In an environment variable or secret store referenced from config, never committed. C) In the prompt. D) In CLAUDE.md. | B | Secrets stay out of model-visible text and the repo. |
| Q28 | | When does the Agent SDK fit better than a raw single API call? A) Single-turn classification. B) Static text formatting. C) Embedding a tool-using agent loop with permissions and sessions in your app. D) Never. | C | It supplies the loop, tools and permissions. |
| Q29 | R | Integrating an identity provider with an agent. First concern? A) Prompt length. B) Auth flow and token scope with least privilege. C) Colour scheme. D) Batch size. | B | Identity access is the main risk surface. |
| Q30 | | A tool returns a 5 MB JSON. Best change? A) Return everything. B) Raise temperature. C) Remove the tool. D) Paginate or filter in the tool and return only relevant fields. | D | Keep tool output small to protect context. |
| Q31 | R | Main benefit of MCP over a bespoke function per app? A) A standard interface reusable across compatible clients. B) No auth needed. C) No schemas. D) Always faster. | A | Reusability and a common contract. |

**C4 — Evaluation, Testing and Optimisation (Q32–Q41)**

| # | R | Stem and options | Key | Rationale |
|---|---|---|---|---|
| Q32 | | Best dataset for a reply-drafting feature? A) Five happy-path cases. B) Only adversarial cases. C) Representative mix of common, edge and adversarial cases with expected results. D) One case. | C | Coverage of real variation. |
| Q33 | R | Which is a code-based grader? A) LLM judge. B) Schema validation and required-field checks. C) Human reviewer. D) Gut feeling. | B | Rule-based, deterministic. |
| Q34 | | An LLM judge gives 9/10 to everything. First step? A) Remove the judge. B) Lower the threshold. C) Calibrate against hand-scored samples and tighten the rubric. D) Add cases. | C | Check grader validity before trusting scores. |
| Q35 | R | v2 scores 82 versus 80 for v1 on 15 cases, with run-to-run variance of 4 points. Conclusion? A) v2 is better. B) Difference is within noise; add cases or runs. C) v1 is better. D) Ship v2. | B | The gap is smaller than the variance. |
| Q36 | | MRQ (choose 2): when does the regression suite run? A) On prompt changes. B) On model version changes. C) Yearly only. D) Never in CI. | A, B | Any change that can move quality. |
| Q37 | R | Which cost lever can change output quality and so needs the suite? A) Caching a static prefix. B) Smaller tier on all traffic. C) Logging. D) Renaming files. | B | Caching leaves outputs unchanged; a tier switch does not. |
| Q38 | | Correct optimisation procedure? A) Change five levers at once. B) Change one lever, rerun the suite, compare quality, cost and latency. C) Trust intuition. D) Test in production first. | B | Isolate effects. |
| Q39 | R | Adversarial case for a contract-intake system? A) A clean standard contract. B) A document with embedded "ignore previous instructions". C) A short valid document. D) A duplicate of a passing case. | B | Tests injection robustness. |
| Q40 | | When is the pass threshold set? A) After seeing results. B) Randomly. C) Always 100 %. D) Before running, tied to the requirement. | D | Avoids fitting the bar to the outcome. |
| Q41 | R | Outputs vary run to run. How do you grade a case? A) Run it several times and track pass rate and variance. B) Run once. C) Set temperature very high. D) Skip it. | A | Non-determinism needs repeats. |

**C5 — Governance, Safety and Risk Management (Q42–Q50)**

| # | R | Stem and options | Key | Rationale |
|---|---|---|---|---|
| Q42 | | Which is indirect prompt injection? A) User types a hostile prompt. B) A developer edits the system prompt. C) A retrieved web page hides an instruction to the agent. D) A tool timeout. | C | Untrusted retrieved content carries the instruction. |
| Q43 | R | An email-summarising agent can also send email. Best control? A) Longer prompt. B) Trust the model. C) Bigger model. D) Separate read and send capabilities; human approval for sends. | D | Break the exfiltration path. |
| Q44 | | MRQ (choose 2): controls for an agent with a shell tool. A) Sandbox or restricted directory. B) Allowlisted commands with approval for destructive ones. C) Auto-approve everything. D) Disable logs. | A, B | Contain and gate. |
| Q45 | R | Minimum fields of a risk-register entry? A) Title. B) Risk, likelihood, impact, owner, mitigation, residual risk, review date. C) Cost only. D) Author name. | B | Makes the risk managed and reviewable. |
| Q46 | | A customer asks about data handling. Provide? A) Marketing slides. B) Nothing. C) Data flow, retention and training terms, access controls, logging, region limits. D) Source code. | C | Concrete, verifiable facts. |
| Q47 | R | When is a hook better than a prompt rule? A) Tone of voice. B) Deterministic enforcement, e.g. blocking writes to protected paths. C) Brainstorming. D) Summaries. | B | Hooks are enforced; prompts are advisory. |
| Q48 | | Generated compliance text cites sources that do not exist. Control? A) Higher temperature. B) Longer outputs. C) Hide citations. D) Ground in retrieved documents, validate every cited source, and keep human review. | D | Verify claims against real sources. |
| Q49 | R | What is residual risk? A) Risk before controls. B) Zero risk. C) Risk remaining after mitigation, rated and accepted by an owner. D) A legal term for fines. | C | Controls reduce, not remove, risk. |
| Q50 | | An agent has database write access but only reads. Best fix? A) Add "be careful" to the prompt. B) More logging only. C) Larger model. D) Issue read-only credentials. | D | Least privilege beats instruction. |

**C6 — Stakeholder Communication and Lifecycle Management (Q51–Q59)**

| # | R | Stem and options | Key | Rationale |
|---|---|---|---|---|
| Q51 | | A business case should contain? A) Tech stack only. B) Source code. C) Problem baseline, benefit range, cost model, risks, pilot metrics. D) Org chart. | C | Decision-relevant content. |
| Q52 | R | Executive: "Will it ever be wrong?" Best answer? A) Never. B) Measured error rate with limits, guardrails and a human escalation path. C) Ignore. D) Only the vendor's claims. | B | Evidence, not promises. |
| Q53 | | A model deprecation notice arrives. First step? A) Ignore until retirement. B) Rewrite everything. C) Remove the feature. D) Run the regression suite on the replacement and compare quality and cost. | D | Evidence drives migration. |
| Q54 | R | MRQ (choose 2): sound rollout phases. A) Pilot with success metrics. B) Limited release with monitoring. C) Big-bang with no rollback. D) Skip measuring. | A, B | Staged, measured exposure. |
| Q55 | | Costs triple after launch. First deliverable to stakeholders? A) Hide it. B) Cut the project. C) Switch models blindly. D) Breakdown by usage driver and cost per task, with options and expected savings. | D | Diagnose before deciding. |
| Q56 | R | What to pin and version for reproducible lifecycle management? A) Nothing. B) Model id, prompts, tool schemas and eval sets. C) Only the repo name. D) Only the model id. | B | All elements that change behaviour. |
| Q57 | | Objection: "our data leaves the company." Best response? A) Dismiss it. B) Say it is fine. C) Present the data flow, retention terms and governance controls. D) Delay launch. | C | Answer with specifics. |
| Q58 | R | ROI presentation? A) A single number. B) No numbers. C) Only the best case. D) Low/base/high range with stated assumptions. | D | Ranges expose sensitivity. |
| Q59 | | Rollback readiness means? A) Deleting old versions. B) Hoping. C) Keeping the previous model and prompt deployable, with trigger thresholds defined. D) Retraining. | C | A tested path back. |

**C7 — Developer Productivity and Operational Enablement (Q60–Q63)**

| # | R | Stem and options | Key | Rationale |
|---|---|---|---|---|
| Q60 | | Where does shared team configuration belong? A) Committed project files: CLAUDE.md, settings, skills, hooks. B) Each laptop. C) A chat thread. D) Wiki screenshots. | A | Versioned and reviewable. |
| Q61 | R | Claude Code reviewing PRs in CI. Best setup? A) Full permissions. B) Secrets in the prompt. C) Auto-merge. D) Headless mode with restricted tools, no secrets in prompts, human merge approval. | D | Least privilege and human gate. |
| Q62 | | MRQ (choose 2): standardise for consistent results across a team. A) Shared CLAUDE.md. B) Onboarding guide and review practice. C) Per-developer private settings only. D) Disable shared skills. | A, B | Shared conventions and practices. |
| Q63 | R | Personal overrides that must not be committed belong in? A) A gitignored local settings file. B) CLAUDE.md. C) The main settings file. D) The README. | A | Separates personal from shared config. |

Counts: C1 11, C2 8, C3 12, C4 10, C5 9, C6 9, C7 4 = 63. R items: C1 5, C2 4, C3 6, C4 5, C5 4, C6 4, C7 2 = 30.

### Certification mapping
| Exam domain (reported weight) | Module | Checkpoint | Mock items | Coverage |
|---|---|---|---|---|
| C1 Solution Design and Architecture (17 %) | M2 | CK2 | 11 | Full |
| C2 Claude Models, Prompting and Context Engineering (13 %) | M1 | CK1 | 8 | Full |
| C3 Integration (19 %) | M3 | CK3 | 12 | Full |
| C4 Evaluation, Testing and Optimisation (16 %) | M4 | CK4 | 10 | Full |
| C5 Governance, Safety and Risk Management (14 %) | M5 | CK5 | 9 | Full |
| C6 Stakeholder Communication and Lifecycle Management (14 %) | M6 | CK6 | 9 | Full |
| C7 Developer Productivity and Operational Enablement (7 %) | M7 | CK6 | 4 | Full |

Exam facts: official pages confirm 120 minutes, scenario-based multiple choice / multiple response, and a $175 fee. Third-party sources report 63 items, a scaled score of 100–1000 with a pass at 720, a credential valid for 12 months, registration through Anthropic's Partner Academy, and delivery by Pearson VUE (online proctored or at a test centre).

## Resources
All resources are free. Each was verified reachable on 2026-10-02 using `WebFetch`, because `mcp__fetch__fetch` was not available. The validator re-checked a sample of 10 (all 7 primaries included) and all 10 passed.

### M1 — Claude Platform Foundations and Exam Orientation
| Resource | Type | Cost | Est. hours | Level | Role |
|---|---|---|---|---|---|
| [Claude API Features overview (platform docs)](https://platform.claude.com/docs/en/build-with-claude/overview) | docs | free | 10 | intermediate | primary |
| [Prompt caching (platform docs)](https://platform.claude.com/docs/en/build-with-claude/prompt-caching) | docs | free | 2 | intermediate | alternative |
| [Building with the Claude API (Anthropic Academy)](https://anthropic.skilljar.com/claude-with-the-anthropic-api) | course (video) | free (registration) | ~8 (4 scheduled) | intermediate | alternative |

### M2 — Solution Design and Agentic Architecture
| Resource | Type | Cost | Est. hours | Level | Role |
|---|---|---|---|---|---|
| [Building Effective AI Agents (Anthropic Engineering, 2024-12-19)](https://www.anthropic.com/engineering/building-effective-agents) | article | free | 1.5 | intermediate | primary |
| [How We Built Our Multi-Agent Research System (2025-06-13)](https://www.anthropic.com/engineering/multi-agent-research-system) | article | free | 1 | advanced | alternative |
| [Effective Context Engineering for AI Agents (2025-09-29)](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) | article | free | 1 | advanced | alternative |

### M3 — Integration: Tools, MCP, Agent SDK and Enterprise Systems
| Resource | Type | Cost | Est. hours | Level | Role |
|---|---|---|---|---|---|
| [Tool use with Claude (platform docs)](https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview) | docs | free | 6 | intermediate | primary |
| [What is MCP? (modelcontextprotocol.io)](https://modelcontextprotocol.io/docs/getting-started/intro) | docs | free | 3 | intermediate | alternative |
| [Agent SDK overview (Claude Code docs)](https://code.claude.com/docs/en/agent-sdk/overview) | docs | free | 4 | intermediate | alternative |
| [Introduction to Model Context Protocol (Anthropic Academy)](https://anthropic.skilljar.com/introduction-to-model-context-protocol) | course | free (registration) | ~3 | intermediate | alternative |
| [Model Context Protocol: Advanced Topics](https://anthropic.skilljar.com/model-context-protocol-advanced-topics) | course | free (registration) | 3 (scheduled in 06) | — | verified extra |

### M4 — Evaluation, Testing and Optimization
| Resource | Type | Cost | Est. hours | Level | Role |
|---|---|---|---|---|---|
| [Define success criteria and build evaluations (platform docs)](https://platform.claude.com/docs/en/test-and-evaluate/develop-tests) | docs | free | 3 | intermediate | primary |
| [Writing Effective Tools for AI Agents (2025-09-11)](https://www.anthropic.com/engineering/writing-tools-for-agents) | article | free | 1.5 | advanced | alternative |
| [Best practices for Claude Code (verification sections)](https://code.claude.com/docs/en/best-practices) | docs | free | 2 | intermediate | alternative |

### M5 — Governance, Safety and Risk Management
| Resource | Type | Cost | Est. hours | Level | Role |
|---|---|---|---|---|---|
| [Mitigate jailbreaks and prompt injections (platform docs)](https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/mitigate-jailbreaks) | docs | free | 2 | intermediate | primary |
| [Claude Code security (code.claude.com)](https://code.claude.com/docs/en/security) | docs | free | 2 | intermediate | alternative |
| [API and data retention (platform docs)](https://platform.claude.com/docs/en/manage-claude/api-and-data-retention) | docs | free | 3 | advanced | alternative |
| [Anthropic Usage Policy](https://www.anthropic.com/legal/aup) | policy | free | 1 | beginner | alternative |
| [AI Fluency: Framework & Foundations](https://anthropic.skilljar.com/ai-fluency-framework-foundations) | course | free (registration) | 3 (scheduled in 06) | — | verified extra |

### M6 — Stakeholder Communication and Lifecycle Management
| Resource | Type | Cost | Est. hours | Level | Role |
|---|---|---|---|---|---|
| [Manage costs effectively (Claude Code docs)](https://code.claude.com/docs/en/costs) | docs | free | 3 | intermediate | primary |
| [Model deprecations (platform docs)](https://platform.claude.com/docs/en/about-claude/model-deprecations) | docs | free | 1.5 | intermediate | alternative |
| [Migration guides (platform docs)](https://platform.claude.com/docs/en/about-claude/models/migration-guide) | docs | free | 1 | intermediate | alternative |

### M7 — Developer Productivity and Operational Enablement
| Resource | Type | Cost | Est. hours | Level | Role |
|---|---|---|---|---|---|
| [Best practices for Claude Code](https://code.claude.com/docs/en/best-practices) | docs | free | 3 | intermediate | primary |
| [Monitoring Claude Code with OpenTelemetry](https://code.claude.com/docs/en/monitoring-usage) | docs | free | 1.5 | advanced | alternative |
| [Settings files and precedence](https://code.claude.com/docs/en/settings) | docs | free | 2 | advanced | alternative |
| [Claude Code in Action (Anthropic Academy)](https://anthropic.skilljar.com/claude-code-in-action) | course | free (registration) | ~2 | intermediate | alternative |
| [Claude Code overview](https://code.claude.com/docs/en/overview) | docs | free | 1 (scheduled in 06) | — | verified extra |

### Cross-cutting resources
| Resource | Type | Cost | Est. hours | Role | Note |
|---|---|---|---|---|---|
| [Claude Certified Architect – Professional Prep Course (Partner Academy path)](https://anthropic-partners.skilljar.com/path/claude-certified-architect-professional) | official prep course | free registration (Partner Academy) | 12.2 (5 lessons, 733 min: 238, 158, 114, 178, 45) | optional | Lessons map to M2/M1, M3, M5, M6, M7; may need a partner account and completed foundational courses |
| [Claude Certified Architect – Professional (Partner Academy exam page)](https://anthropic-partners.skilljar.com/claude-certified-architect-professional-certification) | official exam page | exam fee $175 (outside study budget) | 0.5 | reference | Confirms the exam price |
| [Claude certification FAQ (Partner Academy)](https://anthropic-partners.skilljar.com/page/faq-certifications) | official FAQ | free | 0.5 | reference | Eligibility (Partner Network email), no formal prerequisites, retake waits (14/30/90 days), practice exam retired, exam guides include sample questions |
| [Four role-based Claude certifications (claude.com blog)](https://claude.com/blog/four-role-based-claude-certifications) | official article | free | 0.25 | reference | Professional covers integration architecture, governance and evaluation; Pearson delivery, Credly badge |

Not scheduled but verified (use if ahead): [Introduction to Subagents](https://anthropic.skilljar.com/introduction-to-subagents). Excluded: the official exam guide PDF (v1.0, July 2026; behind the Partner Academy login), the Anthropic Trust Center (fetch returned only the page title), and third-party practice questions and study guides (unofficial, accuracy unknown).

## Assumptions and Risks
### Assumptions
- "3 months" means 13 weeks, Friday to Thursday, starting 2026-10-02 and ending 2027-01-01. "2 hours per day" means 7 days a week (14 h/week).
- The exam fee ($175) is outside the free-only budget. The learner has working Claude Code access and keeps API costs minimal; the optional API calls in E3.1 and E4.1 are capped and can be replaced by Claude Code sessions.
- Language is English. Knowledge of the Claude API and agent architecture is assumed basic until the self-check shows otherwise.
- The 80 % mock threshold is a conservative planning value from 01, above the reported 720/1000 pass mark. It is not the official pass mark.
- Hours for docs and courses are estimates; only the prep path publishes durations (733 min).
- The capstone scenario (compliance-document assistant) was chosen to fit the learner's technical-writing background. Any scenario that covers all seven domains works.
- Retake items come from the same bank. Shuffling, a 7-day gap and one-line justifications reduce the effect of remembered keys, so the retake is a readiness check, not a new exam.
- Mock keys were drafted for this path and have not been piloted. Flag any item that conflicts with the official guide.

### Risks and open issues
- **Exam eligibility (confirm in week 1):** the official FAQ says registration needs a Claude Partner Network company email on a recognised domain. If you are not eligible, the week 13 exam milestone cannot be met. The study weeks remain useful, and weeks 12–13 can be re-planned.
- **Prep-course access:** the optional prep path lists foundational Academy courses (Claude 101, Building with the Claude API and others) as prerequisites, and Prep L1 falls in week 3 when only 4 of about 8 h of Building with the Claude API are done. If Skilljar enforces completion, L1–L5 may be locked. Fallback: drop Prep L1–L5 (12.25 h) and keep the M2 and M4 deepening blocks.
- **M6 depth depends on Prep L4:** M6 has 3 h of primary reading plus 2.5 h of alternatives, and the exam's stakeholder-communication content is covered mainly by Prep L4 (178 min). If the prep path is locked, M6 is likely to be the weakest module. Use part of the 25.75 h buffer for an M6 deepening block.
- **Unverified exam figures:** the domain names and weights, the 63 items and the 720/1000 pass score are third-party figures. The official guide is behind the Partner Academy login. E1.1 verifies them in week 1. The mock blueprint and the week 12 review order (by weight) may need to change.
- **Mock scores may read high:** about 10–15 of the 63 mock items closely paraphrase checkpoint questions you will already have answered (for example Q02 ≈ CK2 Q1, Q23 ≈ CK3 Q6, Q31 ≈ CK3 Q7, Q43 ≈ CK5 Q3, Q45 ≈ CK5 Q6, Q46 ≈ CK5 Q4, Q51 ≈ CK6 Q1, Q55 ≈ CK6 Q5, Q61 ≈ CK6 Q7, Q62 ≈ CK6 Q8). 05 states that no item repeats a checkpoint question, but these overlap closely. Treat a borderline mock score with caution. The 80 % bar leaves some margin above the reported 72 % pass mark. Once accessible, also work through the official exam guide's sample questions; the official practice exam was retired.
- **Foundations prerequisite (closed):** the FAQ, re-fetched by the validator, confirms there is no formal prerequisite for Professional. The open issues in 02, 04, 05 and 06 about Foundations no longer apply, and 06's "about 12 h of buffer if Foundations is required" scenario does not apply either. A claude.com blog post says paths start with a foundation-level certification; the FAQ is treated as authoritative.
- **Failed mock:** the retake plus up to 6 h of review (7 h) sits in the week 12 contingency. If the retake also fails, move the exam date.
- **Budget basis:** 02's 150 h of module time, plus 04's 20 h of added practice, 05's 9 h of assessment and a 10 % buffer, would need about 197 h. The schedule avoids this by planning reading from the 03 resource hours.

### Discrepancies between artifacts (resolved as noted)
- **Exercise count:** the 04 Summary says "Fourteen exercises", but 04 defines 13 (E1.1–E7.1). 06 and this document use 13 (27 h).
- **Module hours:** 02 estimates 150 h of module time. 06 schedules study from the 03 resource hours (108.25 h of study in total), so per-module scheduled time is lower than 02's estimates (for example M2 about 15.75 h vs 26 h, M4 about 15.5 h vs 24 h). Timing follows 06.
- **Capstone split:** 04 spreads the 10 capstone hours as M1 0.5, M2 2, M3 2.5, M4 2, M5 1.5, M6 1, M7 0.5. 06 uses CP1 0.5, CP2 1, CP3 1.5, CP4 1, CP5 1, CP6 1, CP7 4. Timing follows 06; the total is unchanged.
- **Prep path hours:** 03 lists 12.2 h; 06 uses 12.25 h when dropping Prep L1–L5.
- **Thin-module reading:** 06 cites 3 h and 4 h of free primary reading for M2 and M6. 03 lists 1.5 h and 3 h of primary reading (3.5 h and 5.5 h including alternatives).
- **Resource count:** the 03 Summary states 26 entries (24 distinct URLs). Its tables list 24 module rows (with Best practices for Claude Code in both M4 and M7) plus 4 cross-cutting rows. 06 also schedules three resources that 03 verified but did not select (Model Context Protocol: Advanced Topics, AI Fluency: Framework & Foundations, Claude Code overview). They are listed here as "verified extra".
- **Exam figures source:** 02 and 05 attribute the $175 fee to third parties; 03 confirmed it on the official Partner Academy exam page.
- **Checkpoint ids:** checkpoints are CK1–CK6 so they do not clash with competency ids C1–C7.

### Validator notes
Validation round 2 returned PASS on all seven gates (coverage, time-fit, url-reachability, prerequisite-order, consistency, structure, requirements). Round 1 found two failures in 05 (missing mock items; checkpoint tasks counted as separate work), both now fixed. The advisories are carried above: mock/checkpoint overlap, prep-course prerequisites, Foundations not being a prerequisite, the exercise count of 13, M6 depending on Prep L4, and the unverified exam figures. `mcp__fetch__fetch` was not available to the researcher or the validator; `WebFetch` was used as the fallback.

## Sources
- [Claude API Features overview](https://platform.claude.com/docs/en/build-with-claude/overview) — docs, accessed 2026-10-02
- [Prompt caching](https://platform.claude.com/docs/en/build-with-claude/prompt-caching) — docs, accessed 2026-10-02
- [Building with the Claude API](https://anthropic.skilljar.com/claude-with-the-anthropic-api) — course, accessed 2026-10-02
- [Building Effective AI Agents](https://www.anthropic.com/engineering/building-effective-agents) — article, accessed 2026-10-02
- [How We Built Our Multi-Agent Research System](https://www.anthropic.com/engineering/multi-agent-research-system) — article, accessed 2026-10-02
- [Effective Context Engineering for AI Agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) — article, accessed 2026-10-02
- [Tool use with Claude](https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview) — docs, accessed 2026-10-02
- [What is MCP?](https://modelcontextprotocol.io/docs/getting-started/intro) — docs, accessed 2026-10-02
- [Agent SDK overview](https://code.claude.com/docs/en/agent-sdk/overview) — docs, accessed 2026-10-02
- [Introduction to Model Context Protocol](https://anthropic.skilljar.com/introduction-to-model-context-protocol) — course, accessed 2026-10-02
- [Define success criteria and build evaluations](https://platform.claude.com/docs/en/test-and-evaluate/develop-tests) — docs, accessed 2026-10-02
- [Writing Effective Tools for AI Agents](https://www.anthropic.com/engineering/writing-tools-for-agents) — article, accessed 2026-10-02
- [Best practices for Claude Code](https://code.claude.com/docs/en/best-practices) — docs, accessed 2026-10-02
- [Mitigate jailbreaks and prompt injections](https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/mitigate-jailbreaks) — docs, accessed 2026-10-02
- [Claude Code security](https://code.claude.com/docs/en/security) — docs, accessed 2026-10-02
- [API and data retention](https://platform.claude.com/docs/en/manage-claude/api-and-data-retention) — docs, accessed 2026-10-02
- [Anthropic Usage Policy](https://www.anthropic.com/legal/aup) — policy, accessed 2026-10-02
- [Manage costs effectively](https://code.claude.com/docs/en/costs) — docs, accessed 2026-10-02
- [Model deprecations](https://platform.claude.com/docs/en/about-claude/model-deprecations) — docs, accessed 2026-10-02
- [Migration guides](https://platform.claude.com/docs/en/about-claude/models/migration-guide) — docs, accessed 2026-10-02
- [Monitoring Claude Code with OpenTelemetry](https://code.claude.com/docs/en/monitoring-usage) — docs, accessed 2026-10-02
- [Settings files and precedence](https://code.claude.com/docs/en/settings) — docs, accessed 2026-10-02
- [Claude Code in Action](https://anthropic.skilljar.com/claude-code-in-action) — course, accessed 2026-10-02
- [Claude Certified Architect – Professional Prep Course](https://anthropic-partners.skilljar.com/path/claude-certified-architect-professional) — official prep path, accessed 2026-10-02
- [Claude Certified Architect – Professional exam page](https://anthropic-partners.skilljar.com/claude-certified-architect-professional-certification) — official exam page, accessed 2026-10-02
- [Claude certification FAQ](https://anthropic-partners.skilljar.com/page/faq-certifications) — official FAQ, accessed 2026-10-02
- [Four role-based Claude certifications](https://claude.com/blog/four-role-based-claude-certifications) — official blog, accessed 2026-10-02
- [Claude Certified Architect – Foundations (Partner Academy)](https://anthropic-partners.skilljar.com/claude-certified-architect-foundations-certification) — official exam page, accessed 2026-10-02
- [Claude Certified Architect (Anthropic Skilljar)](https://anthropic.skilljar.com/claude-certified-architect-foundations-certification/444989) — official platform page (Foundations), accessed 2026-10-02
- [CCAR-P Exam Guide and Prep (claudecertificationguide.com)](https://claudecertificationguide.com/ccar-p) — third-party exam guide, accessed 2026-10-02
- [Claude Certified Architect (Professional): Exam Guide and Blueprint](https://claudecertificationguide.com/blog/claude-certified-architect-professional-exam-guide) — third-party blueprint, accessed 2026-10-02
- [Claude Certified Architect Professional (CCAR-P): Exam Domains, Weights and Topics - DEV Community](https://dev.to/poorna_reddy/claude-certified-architect-professional-ccar-p-exam-domains-weights-and-topics-clf) — third-party article, accessed 2026-10-02
- [Claude Architect Professional Exam: Cost, Format, 7 Domains](https://findskill.ai/blog/claude-certified-architect-professional-exam/) — third-party article, accessed 2026-10-02
