---
artifact: 02-assessment.md
agent: knowledge-assessor
run_id: run-04-claude-certified-architect-professional
attempt: 1
depends_on: [requirements-formalizer]
status: complete
sources_used: 4
---

# Knowledge Assessment: Claude Certified Architect – Professional

## Summary
The exam (CCAR-P) is reported to have seven weighted domains, 63 questions and a 720/1000 pass score. The learner's strongest area is software engineering and Claude Code practice. The biggest gaps are Governance/Safety/Risk, Stakeholder Communication and Lifecycle, and formal Evaluation/Testing. These are architect-level topics that hands-on Claude Code work does not cover. Seven modules (M1–M7) map one to one onto the seven exam domains. They total 150 h against a 182 h budget, which leaves 32 h (about 18 %) for checkpoints, the mock exam, practice and final review. Domain weights come from third-party guides, so they must be checked against the official exam guide PDF.

## Content

### Target competency map
Domain weights are as reported by third-party sources (see Sources); the official guide may differ slightly.

| Competency (exam domain) | Why it matters for the goal | Target level |
|---|---|---|
| C1 Solution Design & Architecture (17 %) | Core of the architect role: choosing patterns (single agent, multi-agent, workflow), trade-offs, reference architectures | Design and justify |
| C2 Claude Models, Prompting & Context Engineering (13 %) | Model selection, prompt/context design, caching, long-context handling drive quality and cost | Apply and compare |
| C3 Integration (19 %, heaviest) | Tools, MCP, Agent SDK, enterprise systems and data wiring | Design and critique |
| C4 Evaluation, Testing & Optimization (16 %) | Evals, regression testing, cost/latency tuning, proof that a solution works | Design eval strategy |
| C5 Governance, Safety & Risk Management (14 %) | Differentiator of Professional level; compliance, guardrails, data handling, risk | Assess and mitigate |
| C6 Stakeholder Communication & Lifecycle Management (14 %) | Differentiator; business cases, rollout, versioning, model migration, change management | Explain and plan |
| C7 Developer Productivity & Operational Enablement (7 %) | Team-scale use of Claude Code, standards, enablement, ops | Design team practices |

### Current-state mapping

| Competency | Current level (from 01) | Gap | Transferable knowledge the learner already has |
|---|---|---|---|
| C1 Solution Design | basic for Claude (assumed); strong in general | partial | 16 years of system design, trade-off analysis, documentation habits |
| C2 Models, Prompting, Context | working (Claude Code daily use) | partial | Practical prompting and context handling from 6 months of Claude Code; lacks API-level knowledge (model tiers, caching, token economics) |
| C3 Integration | working for plugins, basic for the API and MCP (assumed) | partial | Marketplace plugin building; strong integration engineering background |
| C4 Evaluation, Testing | basic (assumed) | full to partial | Software testing and QA discipline; LLM-specific evals (graders, datasets, non-determinism) are new |
| C5 Governance, Safety, Risk | none stated | full | General security and risk awareness; no Claude-specific policy, safety or compliance knowledge |
| C6 Stakeholder and Lifecycle | none stated | partial | 16 years of stakeholder communication and lifecycle management in general; Claude-specific topics (model deprecation, cost/ROI framing) are new |
| C7 Developer Productivity | working | none to partial | Tech docs, development and plugins in Claude Code; may lack team rollout, settings governance, CI use |
| Exam format and content | none | full | Closed by M1 orientation and the mock exam |

### Prioritized gaps
1. **C5 Governance, Safety & Risk** — full gap, 14 % of the exam, and no prior exposure.
2. **C4 Evaluation, Testing & Optimization** — 16 % of the exam; LLM evals differ from classic testing.
3. **C3 Integration (API, MCP, Agent SDK depth)** — heaviest domain at 19 %; the learner has plugin experience but needs breadth.
4. **C1 Solution Design & Architecture** — 17 %; needs Claude-specific patterns and the exam's scenario-style trade-offs.
5. **C6 Stakeholder Communication & Lifecycle** — 14 %; general experience helps, Claude-specific content is new.
6. **C2 Models, Prompting & Context** — 13 %; partly known, needs API-level detail.
7. **C7 Developer Productivity** — 7 %; closest to existing skills, so a short review is enough.

### Prerequisite order
- M1 has no prerequisites; it comes first and also covers exam orientation.
- M2 requires M1 (patterns rely on model, context and prompt basics).
- M3 requires M1 (tool use and API basics); M3 is best after M2 begins, but only M1 is mandatory.
- M4 requires M1 and M2 (you evaluate designs and prompts).
- M5 requires M2 and M3 (risk analysis needs a known architecture and integrations).
- M6 requires M2 and M4 (business cases and lifecycle use designs and evaluation results).
- M7 requires M1 (can run in parallel with M3–M6).
- The full mock exam requires M1–M7.

### Module list

| Module | Name | Competencies covered | Prerequisite modules | Estimated hours | Difficulty |
|---|---|---|---|---|---|
| M1 | Claude Platform Foundations and Exam Orientation | C2 | none | 20 | Medium |
| M2 | Solution Design and Agentic Architecture | C1 | M1 | 26 | Hard |
| M3 | Integration: Tools, MCP, Agent SDK and Enterprise Systems | C3 | M1 | 30 | Hard |
| M4 | Evaluation, Testing and Optimization | C4 | M1, M2 | 24 | Hard |
| M5 | Governance, Safety and Risk Management | C5 | M2, M3 | 20 | Medium |
| M6 | Stakeholder Communication and Lifecycle Management | C6 | M2, M4 | 20 | Medium |
| M7 | Developer Productivity and Operational Enablement | C7 | M1 | 10 | Easy |

**Total estimated module hours: 150 h. Budget: 182 h (14 h/week x 13 weeks). Remaining 32 h (about 18 %) is reserved for practice tasks, the capstone, checkpoint quizzes, a full mock exam and the final review week.** This fits with the intended roughly 15 % reserve plus slack.

### Starting level and self-check

| Module | Starting level | Note |
|---|---|---|
| M1 | Intermediate | Skim Claude Code-related prompting; focus on API, model tiers, caching, token costs, exam format |
| M2 | Beginner to intermediate | Learner designs systems well but needs Claude and agent patterns |
| M3 | Intermediate | Plugins known; study MCP internals, Agent SDK, enterprise integration |
| M4 | Beginner | Start from basics of LLM evals |
| M5 | Beginner | Start from scratch |
| M6 | Beginner to intermediate | Claude-specific lifecycle and ROI topics |
| M7 | Advanced | Review only, check team and CI usage |

Self-check questions (answer them before starting; each miss points to the module in brackets):

1. When is a multi-agent design preferable to a single agent with tools, and what is its main cost? [M2]
   *Answer: when tasks are parallelizable, need isolated context, or exceed one context window; the cost is higher tokens, latency, coordination complexity and harder debugging.*
2. What does prompt caching save, and what makes a cache hit fail? [M1]
   *Answer: it reuses an unchanged prompt prefix, reducing cost and latency; any change to the prefix content before the cached breakpoint invalidates it, and entries expire after a short time.*
3. What are the three capability types an MCP server can expose? [M3]
   *Answer: tools, resources and prompts.*
4. Why is a single golden-answer exact-match test insufficient for an LLM feature? [M4]
   *Answer: outputs are non-deterministic and varied; you need representative datasets, rubric or model-graded checks, multiple runs and regression tracking.*
5. Name two controls that reduce the risk of prompt injection in an agent with tool access. [M5]
   *Answer: least-privilege tool permissions, human approval for sensitive actions, input/output validation, isolating untrusted content, sandboxing.*

Reading guide: 5/5 correct means start with M1 skim and spend extra time on M4–M6; 3–4 correct means follow the order as given; 0–2 correct means keep the full M1 hours.

## Assumptions
- The seven domains and weights come from third-party summaries of the official CCAR-P guide; module hours are scaled to those weights and to the learner's gaps, not computed exactly.
- Module order M1 → M2/M3 → M4 → M5/M6, with M7 in parallel, fits the 13-week window.
- The learner's knowledge of the API and agents is basic, as assumed in 01.
- Module hours include reading and short applied tasks; formal quizzes, the capstone and the mock exam are counted in the 32 h reserve.

## Open Issues
- Official exam guide PDF was not read directly; domain names and weights are from secondary sources and could differ. The resource-researcher should locate the official guide on Anthropic's certification platform and the validator should compare.
- Pass mark (720/1000), question count (63) and price ($175) are reported by third parties and unverified. Third-party figures for the Foundations exam differ slightly (60 questions), so the Professional numbers need checking.
- Exam prerequisites (for example whether Foundations must be passed first) are unknown. If Foundations is required, add that to the path; there is room in the 32 h reserve, but it would reduce checkpoint time.
- Free-only: official practice material may be limited; the practice-designer must create most mock questions.

## Sources
- [Claude Certified Architect Professional (CCAR-P): Exam Domains, Weights and Topics - DEV Community](https://dev.to/poorna_reddy/claude-certified-architect-professional-ccar-p-exam-domains-weights-and-topics-clf) — third-party article, accessed 2026-10-02
- [Claude Certified Architect (Professional): Exam Guide and Blueprint](https://claudecertificationguide.com/blog/claude-certified-architect-professional-exam-guide) — third-party blueprint, accessed 2026-10-02
- [Claude Architect Professional Exam: Cost, Format, 7 Domains](https://findskill.ai/blog/claude-certified-architect-professional-exam/) — third-party article, accessed 2026-10-02
- [Claude Certified Architect (Anthropic Skilljar)](https://anthropic.skilljar.com/claude-certified-architect-foundations-certification/444989) — official platform page (Foundations), accessed 2026-10-02
