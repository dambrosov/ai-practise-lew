---
artifact: 05-assessments.md
agent: assessment-designer
run_id: run-04-claude-certified-architect-professional
attempt: 2
depends_on: [knowledge-assessor]
status: complete
sources_used: 3
---

# Assessments: Claude Certified Architect – Professional

## Summary
Six checkpoints (CK1–CK6, renamed so they no longer clash with competency ids C1–C7) and a final full-length mock cover all seven modules (M1–M7) and all seven exam domains. Each checkpoint has a quiz of 6–8 questions with answers. Its practical task is no longer separate work: it grades the named 04 exercise deliverable (CK1 grades E1.2, CK2 E2.2, CK3 E3.1, CK4 E4.1/E4.2, CK5 E5.1, CK6 E6.1/E6.2/E7.1) with a rubric built from that exercise's own self-check. The mock exam item bank is included here: 63 new scenario items (C1 11, C2 8, C3 12, C4 10, C5 9, C6 9, C7 4) with keys and rationales, none reused from the checkpoint quizzes. A 30-item subset (flagged R) is the week 12 retake. Assessment time is 9.0 h (quizzes, grading, mock, review, defence), because the practical work is already counted in 04. Exam facts come from third-party sources and must be checked against the official guide.

## Content

### Assessment strategy
- Cadence: a checkpoint after M1, M2, M3, M4, M5, and one combined after M6 + M7. The full mock comes in week 11 after M1–M7; the retake, if needed, is in week 12.
- Formats: closed-book quiz (recall plus scenario questions); a practical grading step in which the learner (or Claude Code acting as a critical reviewer) scores the already-produced 04 deliverable against the rubric; a 63-item scenario mock.
- Pass thresholds: quiz 5/6, 5/7 or 6/8 (at least 71 %); no "fail" on any rubric criterion; mock at least 80 % overall and 70 % per domain.
- On a miss: re-read the module section named in the answer, retake only the missed quiz items after 48 h, and fix the failed rubric criterion in the deliverable. The domain stays "open" until it passes.
- Quiz and mock items are answerable from the module content, not from trivia. Domain tags use the competency ids of 02 (C1 Solution Design … C7 Developer Productivity).

### Checkpoints

#### CK1 — after M1
- **Competencies tested:** C2 (models, prompting, context engineering): model tiers, prompt caching, token economics, context handling, exam format.
- **Quiz (6 questions):**
  1. (Recall) What does prompt caching reuse, and what invalidates a cache hit? — *An unchanged prompt prefix up to the cache breakpoint; any change to the prefix content, or expiry of the entry, causes a miss.*
  2. (Recall) Why should stable content (system prompt, tool definitions, reference docs) be placed before variable content? — *So the stable prefix can be cached and reused across calls.*
  3. (Applied) A support bot sends a 30k-token policy document with every request and costs are high. What is the first change you propose? — *Place the document at the start of the prompt as a cached prefix and keep per-request content after it.*
  4. (Applied) A classification task is high-volume, simple and latency-sensitive. Which tier choice and why? — *The smaller, faster, cheaper model tier; test it on a labelled sample first and escalate to a larger tier only if accuracy is short.*
  5. (Recall) Name two techniques that keep long conversations inside the context window. — *Summarising or compacting older turns, trimming tool output, retrieving only relevant documents, moving state to external memory or files.*
  6. (Applied) An agent's answers degrade late in a long session. Give two likely causes and a fix. — *Context filled with stale or noisy tool output and instructions buried far from the current task; compact or restart with a summary, re-state key instructions.*
- **Practical task (grades E1.2 `m1-model-cost.md`; no new work):** Score the three-workload model, cost and caching worksheet against the rubric.

| Criterion (from E1.2 self-check) | Pass | Strong |
|---|---|---|
| Tier choice per workload | Each of the 3 workloads has a tier with one stated reason | Compares two tiers on cost, latency and quality, with a test plan |
| Cost estimate | Input/output tokens and cost shown with stated assumptions | Cached versus uncached split and a sensitivity note |
| Cache plan | Cacheable prefix marked, with at least one invalidation case | Breakpoint placement and expected hit rate stated |
| Self-check complete | All E1.2 self-check bullets met | Optional cached call run and result recorded |

- **Pass criterion:** Quiz at least 5/6; no rubric criterion below "pass".
- **Est. time (assessment only):** 30 min quiz + 15 min grading = 45 min. The 2 h of E1.2 work is in 04.

#### CK2 — after M2
- **Competencies tested:** C1 (solution design and architecture): single versus multi-agent, workflows, trade-offs, reference architectures.
- **Quiz (6 questions):**
  1. (Recall) When is a multi-agent design preferable to a single agent with tools, and what is its main cost? — *Parallelisable work, isolated context or work beyond one context window; cost is more tokens, latency, coordination complexity and harder debugging.*
  2. (Recall) What distinguishes a fixed workflow (for example prompt chaining) from an autonomous agent? — *A workflow follows predefined code paths; an agent lets the model decide steps and tool use dynamically.*
  3. (Applied) A nightly process always runs the same five steps: extract, classify, enrich, summarise, file. Which pattern and why? — *A fixed prompt-chaining workflow; steps are known, so predictability, cost and testability beat agent autonomy.*
  4. (Applied) Several independent research queries must be run, then merged. Which pattern fits? — *Parallelisation or an orchestrator-worker layout, with a synthesis step.*
  5. (Applied) Reviewers keep finding that a generated report contains unsupported claims. Which pattern adds the most reliability? — *An evaluator-optimiser (generate, critique, revise) loop, or a separate validator step with defined pass criteria.*
  6. (Recall) Name two failure modes specific to multi-agent systems. — *Cascading errors from bad hand-offs, runaway loops or cost, conflicting outputs, lost context between agents.*
- **Practical task (grades E2.2 `m2-architecture.md`, the capstone-scenario architecture; no new work):** Score the diagram, four ADRs and failure-mode table.

| Criterion (from E2.2 self-check) | Pass | Strong |
|---|---|---|
| ADR completeness | 4 ADRs (pattern, model tiering, state/memory, human-in-the-loop), each with context, options, decision, consequences and a rejected alternative | Reasons use cost, latency and risk estimates and say when the rejected option would win |
| Diagram consistency | Mermaid diagram matches the ADRs | A stakeholder could approve it without a briefing |
| Failure modes | Table with at least three modes, each with a mitigation | Monitoring signals and retry or escalation rules |
| Critique applied | Two weaknesses found by the Claude review are fixed | Fixes are recorded with before and after |

- **Pass criterion:** Quiz at least 5/6; no rubric criterion below "pass".
- **Est. time (assessment only):** 30 + 15 = 45 min. The 3 h of E2.2 work is in 04.

#### CK3 — after M3
- **Competencies tested:** C3 (integration): tool use, MCP, Agent SDK, enterprise systems and data wiring.
- **Quiz (7 questions):**
  1. (Recall) What three capability types can an MCP server expose? — *Tools, resources and prompts.*
  2. (Recall) What are the two common MCP transports for a local server and a remote server? — *stdio for local processes; HTTP-based (streamable HTTP) for remote servers.*
  3. (Recall) What makes a good tool description? — *Clear purpose, when to use and not use it, parameter meaning and types, and expected output; the model chooses tools from this text.*
  4. (Applied) A tool call fails with a transient error. How should the agent loop handle it? — *Return a structured error to the model, retry with limits and backoff where safe, and cap iterations; do not retry non-idempotent actions blindly.*
  5. (Applied) An agent must read a company wiki and write tickets. How do you limit blast radius? — *Separate read and write tools, least-privilege credentials, scoped tokens, human approval on writes if risk warrants.*
  6. (Applied) Thirty tools are loaded and tool selection accuracy drops. What do you do? — *Reduce or group tools, scope tools per sub-agent, improve descriptions, or load tools on demand.*
  7. (Recall) Why use an MCP server rather than a custom function per application? — *A standard, reusable interface that any compatible client can connect to, reducing per-integration code.*
- **Practical task (grades E3.1 `m3-mcp-server/`; no new work):** Score the local MCP server (one tool, one resource, one prompt) and its two tool schemas.

| Criterion (from E3.1 self-check) | Pass | Strong |
|---|---|---|
| Tool schemas | Two tool schemas with clear names, parameters, descriptions and error returns | Descriptions include use and non-use guidance; schema validates input |
| Capability coverage | Server runs from Claude Code and the tool, resource and prompt are each exercised | Calls captured in a transcript in the README |
| Error handling | Bad-input and timeout cases return structured messages | Retryable versus non-retryable distinguished, with limits |
| Security | No hard-coded credentials; scope stated in the README | Least-privilege scope and an approval point for writes |

- **Pass criterion:** Quiz at least 5/7; no rubric criterion below "pass".
- **Est. time (assessment only):** 35 + 15 = 50 min. The 4 h of E3.1 work is in 04.

#### CK4 — after M4
- **Competencies tested:** C4 (evaluation, testing and optimisation): eval design, graders, regression testing, cost and latency tuning.
- **Quiz (6 questions):**
  1. (Recall) Why is exact-match testing against one golden answer insufficient for an LLM feature? — *Outputs are non-deterministic and varied; use representative datasets, rubric or model-graded checks, repeated runs and regression tracking.*
  2. (Recall) Name three kinds of grader. — *Code-based (exact or rule checks), model-graded (LLM judge with rubric), and human review.*
  3. (Applied) A model-graded eval gives suspiciously high scores. What do you check? — *Grader bias and rubric clarity; calibrate against human-labelled samples, use a different or stronger grader and check for position or length bias.*
  4. (Applied) A prompt change improves five examples but you ship nothing. Why, and what is needed? — *Five examples are not representative; build a dataset covering common and edge cases and compare before and after on all of it.*
  5. (Applied) Cost must drop 40 % with equal quality. List three levers in the order you would try. — *Prompt caching, a smaller model tier on easy cases (routing), shorter prompts and outputs, batching for non-urgent work; verify with the eval set after each change.*
  6. (Recall) What is a regression suite for an LLM app and when does it run? — *A fixed eval set run on every prompt, model or tool change (for example in CI) to detect quality drops.*
- **Practical task (grades E4.1 `m4-evals/` and E4.2 `m4-optimization.md`; no new work):** Score the eval suite on the capstone's core task and the optimisation plan.

| Criterion (from E4.1/E4.2 self-checks) | Pass | Strong |
|---|---|---|
| Dataset | At least 15 cases incl. edge and adversarial | Cases mapped to requirements with expected results documented |
| Graders and threshold | Rubric plus one code-based and one model-graded check; written pass threshold | Model grader calibrated against hand-scored samples |
| Results | Each case run 3 times; table with variance | Conclusions supported by the variance |
| Optimisation | Before and after numbers for two levers; ship decision cites them | Cost, latency and quality all reported |

- **Pass criterion:** Quiz at least 5/6; no rubric criterion below "pass".
- **Est. time (assessment only):** 30 + 15 = 45 min. The 5 h of E4.1 and E4.2 work is in 04.

#### CK5 — after M5
- **Competencies tested:** C5 (governance, safety and risk management): prompt injection, data handling, guardrails, compliance, risk assessment.
- **Quiz (6 questions):**
  1. (Recall) Name two controls that reduce prompt-injection risk in an agent with tool access. — *Least-privilege permissions, human approval for sensitive actions, input and output validation, isolating untrusted content, sandboxing.*
  2. (Recall) What is the difference between direct and indirect prompt injection? — *Direct comes from the user's own input; indirect hides in content the agent retrieves (web pages, documents, tool output).*
  3. (Applied) An agent summarises inbound emails and can also send email. What risk arises and what is the fix? — *Indirect injection could make it exfiltrate data; separate read and send capabilities, require approval for sends, and restrict recipients.*
  4. (Applied) A regulated customer asks where its data goes. What do you document? — *Data flow, what is sent to the model, retention and training terms, access controls, logging, and the legal basis or region constraints.*
  5. (Applied) Rank these by risk and justify: read-only search agent, agent with shell access, agent with database write access. — *Shell and write access are higher; mitigate with sandboxing, scoped credentials, approvals and audit logs; read-only is lowest but still exposes retrieved data.*
  6. (Recall) What belongs in an AI risk register entry? — *Risk, likelihood, impact, owner, mitigation, residual risk and review date.*
- **Practical task (grades E5.1 `m5-threat-model.md`; no new work):** Score the capstone threat model.

| Criterion (from E5.1 self-check) | Pass | Strong |
|---|---|---|
| Assets and boundaries | Assets, trust boundaries and untrusted inputs listed | Boundaries shown on a diagram |
| Risk coverage | Injection, data leakage, excessive agency and hallucination covered | Adds misuse and supply-chain risk |
| Controls and residual risk | Every risk has a control and a residual rating | Controls ranked by cost and effect |
| Injection walkthrough | At least one injection scenario walked through end to end | Walkthrough shows where each control blocks it |

- **Pass criterion:** Quiz at least 5/6; no rubric criterion below "pass".
- **Est. time (assessment only):** 30 + 15 = 45 min. The 2 h of E5.1 work is in 04.

#### CK6 — after M6 and M7
- **Competencies tested:** C6 (stakeholder communication and lifecycle management) and C7 (developer productivity and operational enablement).
- **Quiz (8 questions):**
  1. (Recall) What should a business case for a Claude-based solution include? — *Problem and baseline, expected benefit, cost model (usage, build, run), risks, success metrics and a pilot plan.*
  2. (Recall) Why plan for model deprecation? — *Models are retired on a schedule; prompts, evals and integrations tied to one version need a migration path.*
  3. (Applied) A new model version is released. Describe a safe migration. — *Run the regression suite on the new model, compare quality and cost, canary or shadow traffic, then roll out with rollback available.*
  4. (Applied) An executive asks "can we trust it?" How do you answer? — *Use eval results with stated limits, describe the guardrails and human oversight, give error rates and an escalation path rather than promises.*
  5. (Applied) Costs grow 3x after launch. What do you present to stakeholders? — *Usage drivers, cost per task, optimisation options with expected savings, and a decision on trade-offs.*
  6. (Recall) What belongs in a team-shared Claude Code project configuration? — *CLAUDE.md conventions, shared settings and permissions, agents, skills, commands, hooks and MCP configuration, committed to version control.*
  7. (Applied) A team wants Claude Code in CI for review comments. Which controls do you set? — *Non-interactive mode with limited tool permissions, no secrets in prompts, human merge approval, logging and spend limits.*
  8. (Applied) Three developers get inconsistent results from Claude Code on one repo. What do you standardise? — *Shared CLAUDE.md, settings, skills and a documented workflow, plus onboarding and review practices.*
- **Practical task (grades E6.1 `m6-business-case.md`, E6.2 `m6-lifecycle-runbook.md` and E7.1 `m7-enablement-kit.md` on the capstone scenario; no new work):**

| Criterion (from E6.1/E6.2/E7.1 self-checks) | Pass | Strong |
|---|---|---|
| Business case (E6.1) | One-page non-technical summary with value, cost, risk, ROI assumptions as ranges, phased rollout and objections | Decision requested and pilot success metric stated |
| Lifecycle runbook (E6.2) | Trigger, test gate, rollout and rollback steps; versions pinned | Deprecation timeline and owners |
| Enablement kit (E7.1) | Covers CLAUDE.md standard, settings/permissions/hooks, CI proposal, onboarding | Adoption metrics and review practice added |
| Consistency | Numbers match the E2.2 architecture and E4.1 results | Explicit cross-references to the E2.2, E4.1 and E5.1 files |

- **Pass criterion:** Quiz at least 6/8; no rubric criterion below "pass".
- **Est. time (assessment only):** 40 min quiz + 30 min grading three deliverables = 70 min. The 5 h of E6.1, E6.2 and E7.1 work is in 04.

### Final assessment
- **Full mock exam (week 11; 120 min + 60 min review):** 63 items from the bank below, all new, weighted C1 11, C2 8, C3 12, C4 10, C5 9, C6 9, C7 4. Take under exam conditions (closed book, timed, items shuffled) after M1–M7. Items are single-answer MCQ unless marked "MRQ (choose 2)". No paid material is used.
- **Week 12 retake subset (30 items):** the items flagged R in the bank, with the per-domain quota C1 5, C2 4, C3 6, C4 5, C5 4, C6 4, C7 2. Shuffle item and option order, wait at least 7 days after the first sitting, and write a one-line justification for each answer so a remembered key does not count. Pass: at least 80 % overall (24/30) and at least 75 % in each of the two domains reviewed as weakest. If it still fails, move the exam date.
- **Acceptance checks that the goal is met** (ties to the capstone in 04 without repeating it):
  1. Mock score at least 80 % overall, and at least 70 % in every domain (or the retake passes).
  2. `ccar-portfolio/capstone-package.md` meets its six acceptance criteria in 04, with the architecture, eval, governance and rollout parts each rated at least "pass" in the rubric below.
  3. All checkpoints CK1–CK6 are passed (a retake counts if the final attempt passes).
  4. Readiness checklist complete: official exam guide read, domain weights confirmed, registration and exam logistics reviewed.
- **Final rubric (capstone defence, 45 min self-recorded or peer-reviewed, using the design-review log from 04 as input):**

| Criterion | Pass | Strong |
|---|---|---|
| Architecture justification | Pattern and trade-offs justified | Alternatives and failure modes tied to measured evidence |
| Evidence of quality | Eval results shown against the stated threshold | Regression suite and cost data included |
| Risk and governance | Threats and controls listed | Controls enforced and tested |
| Lifecycle and communication | Rollout and migration plan present | Stakeholder plan with metrics |

- **Pass criterion:** All four acceptance checks hold. If the first mock is below 80 %, review the weakest two domains for up to 6 h (taken from the reserve) and sit the retake.
- **Est. time:** 120 + 60 + 45 + 15 checklist = 240 min. The retake (45 min test + 15 min review = 60 min) is contingent and not in the total.

#### Mock exam item bank
Format: stem, options, key, rationale, domain tag (the section heading). "R" marks the week 12 retake subset. None of these items repeats a checkpoint quiz question.

**Domain C1 — Solution Design and Architecture (Q01–Q11)**

| # | R | Stem and options | Key | Rationale |
|---|---|---|---|---|
| Q01 | | Tickets fall into 4 known categories, each needs a different queue and a drafted reply. Best design? A) Autonomous multi-agent swarm. B) One agent with 40 tools. C) Routing workflow, then a category-specific drafting prompt. D) Human triage only. | C | Known categories favour routing; autonomy adds cost without benefit. |
| Q02 | R | Strongest reason to choose multi-agent over a single agent? A) The team prefers it. B) Subtasks are independent and each needs a large, isolated context. C) It uses fewer tokens. D) It is easier to debug. | B | Parallel, isolated work is the core justification; the other options are false or weak. |
| Q03 | | MRQ (choose 2): real costs of an orchestrator-worker design. A) Higher token use. B) Hand-off and coordination errors. C) Inability to parallelise. D) Always lower latency. | A, B | Overhead and lossy hand-offs; it does enable parallelism. |
| Q04 | R | An orchestrator's brief to a worker drops a constraint, and the final report violates it. Root cause and fix? A) Cache miss; add caching. B) Tool timeout; add retries. C) Lossy hand-off; pass a structured brief with constraints and add a validator step. D) Model too small; upgrade. | C | The failure is in the hand-off, so fix the contract and verify downstream. |
| Q05 | | Requirement: steps fixed, output reproducible and auditable. Which design? A) Prompt chain with logged intermediate outputs. B) Open-ended autonomous agent. C) Multi-agent debate. D) One long prompt. | A | Fixed steps with logs give predictability and an audit trail. |
| Q06 | R | An ADR lists only the decision and its benefits. What is missing? A) Team names. B) Source code. C) Vendor pricing. D) Consequences and rejected alternatives with reasons. | D | An ADR records context, options, decision and consequences. |
| Q07 | | An agent loops on an ambiguous task and spend spikes. Best mitigation? A) Larger context. B) Iteration and budget caps with escalation to a human. C) Higher temperature. D) Remove all tools. | B | Bounded loops with an escalation path contain runaway cost. |
| Q08 | R | MRQ (choose 2): which cases justify a human-in-the-loop step? A) Irreversible payment. B) Reading a public FAQ. C) Low-confidence legal classification. D) Formatting a table. | A, C | High impact or low confidence warrants approval. |
| Q09 | | 200 independent contracts must be checked concurrently and merged into one report. Best pattern? A) Sequential single agent. B) One prompt with all 200 contracts. C) Evaluator loop only. D) Parallel workers per contract plus a synthesis step. | D | Independent units parallelise and avoid context overflow. |
| Q10 | R | Output quality varies; pass criteria are explicit (schema plus checklist). Add what? A) More tools. B) Bigger model only. C) A bounded evaluator-optimiser loop. D) Remove validation. | C | Explicit criteria let a critic drive revisions; cap the rounds. |
| Q11 | | A stakeholder wants "an agent" for three deterministic API calls. Response? A) Build a multi-agent system. B) Use plain code or a workflow, and call the model only where language judgement is needed. C) Build one agent with all tools. D) Refuse the project. | B | Do not add autonomy where the logic is deterministic. |

**Domain C2 — Claude Models, Prompting and Context Engineering (Q12–Q19)**

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

**Domain C3 — Integration (Q20–Q31)**

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

**Domain C4 — Evaluation, Testing and Optimisation (Q32–Q41)**

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

**Domain C5 — Governance, Safety and Risk Management (Q42–Q50)**

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

**Domain C6 — Stakeholder Communication and Lifecycle Management (Q51–Q59)**

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

**Domain C7 — Developer Productivity and Operational Enablement (Q60–Q63)**

| # | R | Stem and options | Key | Rationale |
|---|---|---|---|---|
| Q60 | | Where does shared team configuration belong? A) Committed project files: CLAUDE.md, settings, skills, hooks. B) Each laptop. C) A chat thread. D) Wiki screenshots. | A | Versioned and reviewable. |
| Q61 | R | Claude Code reviewing PRs in CI. Best setup? A) Full permissions. B) Secrets in the prompt. C) Auto-merge. D) Headless mode with restricted tools, no secrets in prompts, human merge approval. | D | Least privilege and human gate. |
| Q62 | | MRQ (choose 2): standardise for consistent results across a team. A) Shared CLAUDE.md. B) Onboarding guide and review practice. C) Per-developer private settings only. D) Disable shared skills. | A, B | Shared conventions and practices. |
| Q63 | R | Personal overrides that must not be committed belong in? A) A gitignored local settings file. B) CLAUDE.md. C) The main settings file. D) The README. | A | Separates personal from shared config. |

Counts check: C1 11, C2 8, C3 12, C4 10, C5 9, C6 9, C7 4 = 63. R items: C1 5 (Q02, Q04, Q06, Q08, Q10), C2 4 (Q13, Q15, Q16, Q18), C3 6 (Q21, Q23, Q25, Q27, Q29, Q31), C4 5 (Q33, Q35, Q37, Q39, Q41), C5 4 (Q43, Q45, Q47, Q49), C6 4 (Q52, Q54, Q56, Q58), C7 2 (Q61, Q63) = 30.

### Certification mapping
Target: Claude Certified Architect – Professional (CCAR-P). Domains and weights are from third-party sources; the official guide was not found in search results and must be confirmed (E1.1 in 04 does this).

| Exam domain (weight) | Module | Checkpoint | Mock items | Coverage |
|---|---|---|---|---|
| C1 Solution Design and Architecture (17 %) | M2 | CK2 | 11 | Full |
| C2 Claude Models, Prompting and Context Engineering (13 %) | M1 | CK1 | 8 | Full |
| C3 Integration (19 %) | M3 | CK3 | 12 | Full |
| C4 Evaluation, Testing and Optimisation (16 %) | M4 | CK4 | 10 | Full |
| C5 Governance, Safety and Risk Management (14 %) | M5 | CK5 | 9 | Full |
| C6 Stakeholder Communication and Lifecycle Management (14 %) | M6 | CK6 | 9 | Full |
| C7 Developer Productivity and Operational Enablement (7 %) | M7 | CK6 | 4 | Full |

Facts reported by third parties (not verified against an official page):
- 63 items in 120 minutes; scaled score 100–1000, pass at 720; fee $175 per attempt; credential valid 12 months.
- Registration and scheduling through Anthropic's Partner Academy; delivery by Pearson VUE (online proctored or test centre).
- Exam prerequisites (whether Foundations must be passed first) are unconfirmed.
- Registration and fee are outside the learning budget (see 01).

### Time summary
Checkpoint practical tasks are the 04 exercises, so only quiz and grading minutes count here.

| Checkpoint | Est. minutes | Extra work beyond 04 exercises |
|---|---|---|
| CK1 (after M1): quiz 30 + grading E1.2 15 | 45 | none |
| CK2 (after M2): quiz 30 + grading E2.2 15 | 45 | none |
| CK3 (after M3): quiz 35 + grading E3.1 15 | 50 | none |
| CK4 (after M4): quiz 30 + grading E4.1/E4.2 15 | 45 | none |
| CK5 (after M5): quiz 30 + grading E5.1 15 | 45 | none |
| CK6 (after M6 + M7): quiz 40 + grading E6.1/E6.2/E7.1 30 | 70 | none |
| Final: mock 120 + review 60 + defence 45 + checklist 15 | 240 | defence 45 min (beyond the 30-min design review in 04) |
| **Total** | **540 min = 9.0 h** | |

Contingent, not in the total: week 12 retake 60 min plus up to 6 h of weak-domain review. Planned use of the 32 h reserve in 02: 20 h incremental practice (04) + 9 h assessment = 29 h, leaving 3 h. The contingent 7 h only fits if practice runs under plan, so the schedule-planner should treat week 12 as the buffer.

## Assumptions
- Checkpoint practical tasks reuse the 04 exercise deliverables, so no new work hours are added; their hours stay in 04 and 06.
- Rubrics are derived from each exercise's self-check in 04; "strong" is optional.
- The quiz bar is 5 of 6 (about 83 %); for 7 and 8 questions it is 5/7 and 6/8 (about 71–75 %).
- Mock item counts per domain follow the reported weights and sum to 63.
- The 80 % mock threshold is from 01 and is above the reported 720/1000 pass mark.
- Retake items come from the same bank, so remembered keys are mitigated by shuffling, a 7-day gap and required justifications; it is a readiness check, not a new exam.

## Open Issues
- The official exam guide was not read; domains, weights, item count and pass mark are third-party figures. The validator should compare them with the official guide and adjust the blueprint if they differ.
- Planned reserve use is 29 of 32 h; a failed mock (retake plus up to 6 h review) would exceed the reserve, so the schedule-planner should keep week 12 as the buffer.
- Mock keys were drafted for this path and not piloted; the learner should flag any item that conflicts with the official guide.
- Prerequisites such as a Foundations exam are unconfirmed and are not assessed here.

## Sources
- [Claude Certified Architect (Professional): Exam Guide and Blueprint](https://claudecertificationguide.com/blog/claude-certified-architect-professional-exam-guide) — third-party blueprint, accessed 2026-10-02
- [Claude Certified Architect (Professional) — CCAR-P Exam Guide and Prep](https://claudecertificationguide.com/ccar-p) — third-party exam guide, accessed 2026-10-02
- [Claude Certified Architect Professional (CCAR-P): Exam Domains, Weights and Topics - DEV Community](https://dev.to/poorna_reddy/claude-certified-architect-professional-ccar-p-exam-domains-weights-and-topics-clf) — third-party article, accessed 2026-10-02
