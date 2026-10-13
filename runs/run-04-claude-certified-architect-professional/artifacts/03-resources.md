---
artifact: 03-resources.md
agent: resource-researcher
run_id: run-04-claude-certified-architect-professional
attempt: 1
depends_on: [knowledge-assessor]
status: complete
sources_used: 29
---

# Resources: Claude Certified Architect – Professional

## Summary
This artifact lists 26 resource entries (24 distinct URLs plus a few reused across modules) for modules M1–M7 and the exam. Every primary resource is free and was fetched on 2026-10-02. Sources are mostly official Anthropic documentation, engineering posts and Anthropic Academy courses, because the learner prefers reading. The official exam guide PDF (v1.0, July 2026) is not publicly downloadable. It sits behind the Anthropic Partner Academy, so the domain weights in 02 could not be checked against it. One official page (FAQ) says exam registration needs a Claude Partner Network company email. This is a risk for the learner and is listed in Open Issues. Primary-resource reading is about 28 h of the 150 h module budget. The rest is applied practice, which the practice-designer covers.

## Content

### Research approach
- Queries: official exam guide PDF; Anthropic Academy / Skilljar courses; Anthropic partner certification pages; evals, guardrails and prompt-injection docs. Candidates were then checked with direct fetches of the docs index pages.
- `mcp__fetch__fetch` was not available in this session (tool not found). `WebFetch` was used for all verification, as the skill allows.
- Selection: official first (docs, engineering blog, Academy), reading-first, free, current (docs show models up to 2026-09). Third-party guides are used only to cross-check the domain list.
- Mode `free-only`: no paid primary or alternative is included. The exam fee ($175, per the official certification page) is outside the study budget.
- Hours are estimates: the docs pages list no durations, so each figure is the entry page plus the linked pages worth reading.

### Resources by module

#### M1 — Claude Platform Foundations and Exam Orientation
| Resource | Type | Cost | Est. hours | Level | Role | Why it fits | Verified |
|---|---|---|---|---|---|---|---|
| [Claude API Features overview (platform docs)](https://platform.claude.com/docs/en/build-with-claude/overview) | docs | free | 10 (page plus linked context windows, thinking, batch, caching, models pages) | intermediate | primary | Maps the whole API surface (model capabilities, tools, context management, files). Fills the learner's API-level gap. | 2026-10-02 |
| [Prompt caching (platform docs)](https://platform.claude.com/docs/en/build-with-claude/prompt-caching) | docs | free | 2 | intermediate | alternative | Self-check Q2: cache writes 1.25x/2x, reads 0.1x, min token lengths, usage fields. | 2026-10-02 |
| [Building with the Claude API (Anthropic Academy)](https://anthropic.skilljar.com/claude-with-the-anthropic-api) | course (video) | free (registration) | ~8 (reported by third-party listings; page shows no duration) | intermediate | alternative | Official course on prompting, tool use, RAG, MCP, agents. Needs Python. Use only if reading alone is not enough. | 2026-10-02 |

#### M2 — Solution Design and Agentic Architecture
| Resource | Type | Cost | Est. hours | Level | Role | Why it fits | Verified |
|---|---|---|---|---|---|---|---|
| [Building Effective AI Agents (Anthropic Engineering, 2024-12-19)](https://www.anthropic.com/engineering/building-effective-agents) | article | free | 1.5 | intermediate | primary | Canonical pattern catalogue: prompt chaining, routing, parallelization, orchestrator-workers, evaluator-optimizer, agents. Answers self-check Q1. | 2026-10-02 |
| [How We Built Our Multi-Agent Research System (2025-06-13)](https://www.anthropic.com/engineering/multi-agent-research-system) | article | free | 1 | advanced | alternative | Trade-offs of multi-agent design: gains on breadth-first work, token cost, observability. | 2026-10-02 |
| [Effective Context Engineering for AI Agents (2025-09-29)](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) | article | free | 1 | advanced | alternative | Context rot, compaction and sub-agent context isolation; design input for long-running agents. | 2026-10-02 |

#### M3 — Integration: Tools, MCP, Agent SDK and Enterprise Systems
| Resource | Type | Cost | Est. hours | Level | Role | Why it fits | Verified |
|---|---|---|---|---|---|---|---|
| [Tool use with Claude (platform docs)](https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview) | docs | free | 6 (page plus define-tools, handle-tool-calls, tool search, MCP connector) | intermediate | primary | Client vs server tools, tool_use / tool_result round trip, strict tool use, MCP connector. Core of the heaviest exam domain. | 2026-10-02 |
| [What is MCP? (modelcontextprotocol.io)](https://modelcontextprotocol.io/docs/getting-started/intro) | docs | free | 3 (intro, architecture, security best practices) | intermediate | alternative | Protocol-level view beyond plugin building. Self-check Q3. | 2026-10-02 |
| [Agent SDK overview (Claude Code docs)](https://code.claude.com/docs/en/agent-sdk/overview) | docs | free | 4 | intermediate | alternative | Agent SDK vs CLI vs Client SDK vs Managed Agents; hooks, subagents, MCP, permissions, sessions. | 2026-10-02 |
| [Introduction to Model Context Protocol (Anthropic Academy)](https://anthropic.skilljar.com/introduction-to-model-context-protocol) | course | free (registration) | ~3 (no duration on page; estimate) | intermediate | alternative | Hands-on MCP server and client in Python (tools, resources, prompts, Inspector). Optional if reading is enough. | 2026-10-02 |

#### M4 — Evaluation, Testing and Optimization
| Resource | Type | Cost | Est. hours | Level | Role | Why it fits | Verified |
|---|---|---|---|---|---|---|---|
| [Define success criteria and build evaluations (platform docs)](https://platform.claude.com/docs/en/test-and-evaluate/develop-tests) | docs | free | 3 | intermediate | primary | Success criteria, exact match, similarity, ROUGE, LLM-graded Likert/binary/ordinal evals; eval design principles. Answers Q4. | 2026-10-02 |
| [Writing Effective Tools for AI Agents (2025-09-11)](https://www.anthropic.com/engineering/writing-tools-for-agents) | article | free | 1.5 | advanced | alternative | Evaluation-driven tool design, token-efficient tool output, using Claude to analyse eval transcripts. | 2026-10-02 |
| [Best practices for Claude Code (verification sections)](https://code.claude.com/docs/en/best-practices) | docs | free | 2 for this module (read the rest in M7) | intermediate | alternative | Verification criteria, Stop-hook gates, adversarial review subagent: a practical eval loop in Claude Code. | 2026-10-02 |

#### M5 — Governance, Safety and Risk Management
| Resource | Type | Cost | Est. hours | Level | Role | Why it fits | Verified |
|---|---|---|---|---|---|---|---|
| [Mitigate jailbreaks and prompt injections (platform docs)](https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/mitigate-jailbreaks) | docs | free | 2 | intermediate | primary | Direct vs indirect injection, tool-result isolation, least privilege, screening, red-teaming. Answers Q5. | 2026-10-02 |
| [Claude Code security (code.claude.com)](https://code.claude.com/docs/en/security) | docs | free | 2 | intermediate | alternative | Permission model, sandboxing, MCP security, managed settings, audit and telemetry; links to SOC 2 / ISO resources via the Trust Center. | 2026-10-02 |
| [API and data retention (platform docs)](https://platform.claude.com/docs/en/manage-claude/api-and-data-retention) | docs | free | 3 (long page; read ZDR, HIPAA, feature eligibility) | advanced | alternative | Zero data retention and HIPAA-ready arrangements; the compliance content the exam's governance domain targets. | 2026-10-02 |
| [Anthropic Usage Policy](https://www.anthropic.com/legal/aup) | policy | free | 1 | beginner | alternative | Universal standards, high-risk use cases (human review plus AI disclosure), agentic and MCP rules. | 2026-10-02 |

#### M6 — Stakeholder Communication and Lifecycle Management
| Resource | Type | Cost | Est. hours | Level | Role | Why it fits | Verified |
|---|---|---|---|---|---|---|---|
| [Manage costs effectively (Claude Code docs)](https://code.claude.com/docs/en/costs) | docs | free | 3 | intermediate | primary | Cost figures per developer ($13 per active day average), budgeting, spend limits, rollout piloting; supplies numbers for ROI and business cases. | 2026-10-02 |
| [Model deprecations (platform docs)](https://platform.claude.com/docs/en/about-claude/model-deprecations) | docs | free | 1.5 | intermediate | alternative | Lifecycle terms, 60-day notice, retirement dates, audit of model usage; core of model-migration planning. | 2026-10-02 |
| [Migration guides (platform docs)](https://platform.claude.com/docs/en/about-claude/models/migration-guide) | docs | free | 1 (index; read one guide) | intermediate | alternative | Entry to per-model migration guides; use with the deprecations page for a migration plan exercise. | 2026-10-02 |

#### M7 — Developer Productivity and Operational Enablement
| Resource | Type | Cost | Est. hours | Level | Role | Why it fits | Verified |
|---|---|---|---|---|---|---|---|
| [Best practices for Claude Code](https://code.claude.com/docs/en/best-practices) | docs | free | 3 | intermediate | primary | CLAUDE.md, permissions, hooks, skills, subagents, plugins, headless mode, parallel sessions. Review fit for an experienced user. | 2026-10-02 |
| [Monitoring Claude Code with OpenTelemetry](https://code.claude.com/docs/en/monitoring-usage) | docs | free | 1.5 | advanced | alternative | Team telemetry, metrics, managed OTLP settings. Likely new to the learner. | 2026-10-02 |
| [Settings files and precedence](https://code.claude.com/docs/en/settings) | docs | free | 2 | advanced | alternative | Managed settings vs project/user scope; governance of team configuration. | 2026-10-02 |
| [Claude Code in Action (Anthropic Academy)](https://anthropic.skilljar.com/claude-code-in-action) | course | free (registration) | ~2 (no duration on page; estimate) | intermediate | alternative | Long sessions, hooks, scheduling, GitHub Actions, plugins. Official source for team-wide workflows. | 2026-10-02 |

### Cross-cutting resources
| Resource | Type | Cost | Est. hours | Level | Role | Why it fits | Verified |
|---|---|---|---|---|---|---|---|
| [Claude Certified Architect – Professional Prep Course (Partner Academy path)](https://anthropic-partners.skilljar.com/path/claude-certified-architect-professional) | official prep course | free registration (Partner Academy) | 12.2 (5 lessons, 733 min: 238, 158, 114, 178, 45) | advanced | optional | Official exam-prep path; lessons map to M2/M1, M3, M5, M6, M7. Access may need a partner account (see Open Issues). | 2026-10-02 |
| [Claude Certified Architect – Professional (Partner Academy exam page)](https://anthropic-partners.skilljar.com/claude-certified-architect-professional-certification) | official exam page | exam fee $175 (outside study budget) | 0.5 | n/a | reference | Confirms the exam price. The exam guide and policies are linked from the certifications page, not shown publicly. | 2026-10-02 |
| [Claude certification FAQ (Partner Academy)](https://anthropic-partners.skilljar.com/page/faq-certifications) | official FAQ | free | 0.5 | n/a | reference | Eligibility (Partner Network email), no formal prerequisites, retake waits (14/30/90 days), practice exam retired, exam guides include sample questions. | 2026-10-02 |
| [Four role-based Claude certifications (claude.com blog)](https://claude.com/blog/four-role-based-claude-certifications) | official article | free | 0.25 | n/a | reference | Describes Professional as covering integration architecture, governance and evaluation; Pearson delivery, Credly badge. | 2026-10-02 |

### Hours summary
| Module | Primary resource hours | Module estimate from 02 | Fit |
|---|---|---|---|
| M1 | 10 | 20 | ok (add alternatives up to 20 h if needed) |
| M2 | 1.5 | 26 | ok (thin primary; the two alternatives add 2 h; the rest is design practice) |
| M3 | 6 | 30 | ok (alternatives add up to 10 h) |
| M4 | 3 | 24 | ok (alternatives add 3.5 h; evals need hands-on practice) |
| M5 | 2 | 20 | ok (alternatives add 6 h) |
| M6 | 3 | 20 | ok (alternatives add 2.5 h; lifecycle and stakeholder content needs exercises) |
| M7 | 3 | 10 | ok (alternatives add 5.5 h) |
| Total | 28.5 | 150 | ok |

Reading with all listed alternatives is about 63 h (excluding the 12.2 h optional prep path). This leaves roughly 85 h of module time for applied tasks, which is intentional given free-only limits on structured courses.

### Unverified or excluded
- Official exam guide PDF (Exam Guide v1.0, July 2026): not public. The Partner Academy certification page says guides are on the certifications page behind login. Not fetched; not included. The seven domains and weights in 02 are corroborated only by the third-party page [claudecertificationguide.com](https://claudecertificationguide.com/ccar-p), which also cites the guide.
- Paid or partner-only items: none included as primary. The prep path is marked optional because access may require a partner account.
- Verified but not selected (module limit of 4): [Model Context Protocol: Advanced Topics](https://anthropic.skilljar.com/model-context-protocol-advanced-topics), [Introduction to Subagents](https://anthropic.skilljar.com/introduction-to-subagents), [AI Fluency: Framework & Foundations](https://anthropic.skilljar.com/ai-fluency-framework-foundations), [Claude Code overview](https://code.claude.com/docs/en/overview). They are good extras for M3, M2, M5 or M7 if time allows.
- Anthropic Trust Center (trust.anthropic.com): fetch returned only the page title; not included.
- Third-party practice questions and Scribd or GitHub study guides: not fetched, excluded (unofficial; accuracy unknown).
- Exam format figures (63 items, 120 min, 720/1000) appear only in third-party sources; official pages fetched confirm 120 minutes, scenario-based multiple choice / multiple response, and the $175 fee.

## Assumptions
- `WebFetch` verification is equivalent to the fetch MCP check for this run because `mcp__fetch__fetch` was not available.
- Hour estimates for docs and courses are the researcher's estimates; the pages publish no durations except the prep path (733 min).
- Docs pages are living documents; they showed model names up to Opus 5.5 / Sonnet 5.5 and 2026 dates, so no resource is older than 4 years. Two engineering posts date from 2024-12 and 2025.
- Reading preference: courses are alternatives only; the learner can skip them without losing coverage.

## Open Issues
- Access to the exam may be limited to people at Claude Partner Network organisations, with a company email on a recognised domain (FAQ). The learner must confirm eligibility early. If not eligible, the credential goal cannot be met on the current schedule, though the study content remains useful.
- Official sources disagree on Foundations as a prerequisite. The FAQ says there is no formal prerequisite. A blog post says paths start with a foundation-level certification.
- Domain weights, question count and pass score are still unverified against the official guide. The validator should treat 02's weights as provisional.
- M2 and M6 have thin free primaries. They rely on engineering posts and cost/lifecycle docs. The exam's stakeholder-communication content is covered mainly by the optional partner prep lesson 4 (178 min), which may be inaccessible.
- The official practice exam was retired; the practice-designer must write the mock exam. The exam guide's sample questions are the only official format reference.
- No module lacks a free primary.

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
- [Claude Certified Architect – Foundations (Partner Academy)](https://anthropic-partners.skilljar.com/claude-certified-architect-foundations-certification) — official exam page, used for the exam-guide and policy note, accessed 2026-10-02
- [CCAR-P Exam Guide and Prep (claudecertificationguide.com)](https://claudecertificationguide.com/ccar-p) — third-party cross-check of domains, not a study resource, accessed 2026-10-02
