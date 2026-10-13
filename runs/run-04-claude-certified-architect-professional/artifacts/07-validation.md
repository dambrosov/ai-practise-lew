---
artifact: 07-validation.md
agent: validator
run_id: run-04-claude-certified-architect-professional
attempt: 2
depends_on: [requirements-formalizer, knowledge-assessor, resource-researcher, practice-designer, assessment-designer, schedule-planner]
status: complete
sources_used: 10
---

# Validation: Claude Certified Architect – Professional (round 2)

## Summary
This is validation round 2. It re-checks all seven gates against input.md, 01–04 (unchanged) and the revised 05 (attempt 2) and 06 (attempt 2). Both round-1 failures are fixed. 05 now contains a 63-item mock bank with keys and rationales, split C1 11 / C2 8 / C3 12 / C4 10 / C5 9 / C6 9 / C7 4, plus a 30-item retake subset flagged R, and no longer refers to a practice-designer bank. The checkpoint practical tasks (now CK1–CK6) grade the named 04 deliverables, so 06's "count once as practice" rule holds. I recomputed every week of 06: 156.25 h planned of 182 h, maximum 14.0 h in any week, 13 of 13 weeks. With the contingency used, week 12 is 12.0 h. All 10 re-fetched URLs (all 7 primaries plus 3 others) were reachable and on-topic. Overall verdict: PASS. Six advisories remain, none of which blocks the plan.

## Content

### Gate results

| Gate | Result | Evidence | Attributed agent (if FAIL) |
|---|---|---|---|
| coverage | PASS | All 7 prioritized gaps / modules M1–M7 (02) have a free primary in 03: M1 Features overview, M2 Building Effective AI Agents, M3 Tool use, M4 Define success criteria, M5 Mitigate jailbreaks, M6 Manage costs, M7 Best practices. Each has at least one exercise in 04 (E1.1–E7.1, 13 exercises). Checkpoints in 05 cover every module: CK1→M1, CK2→M2, CK3→M3, CK4→M4, CK5→M5, CK6→M6+M7. The mock bank covers all 7 domains. | — |
| time-fit | PASS | Weekly totals recomputed from the 06 rows: 12.25, 12.75, 14.00, 13.00, 13.93, 13.50, 13.75, 13.15, 14.00, 13.42, 11.50, 5.00, 6.00. Total 156.25 h ≤ 182 h. Max week 14.0 ≤ 14 h. Week 12 with the contingency is 12.0 h. 13 weeks ≤ 13 (01). Column sums check out (study 108.25, practice 37.00, assessment 11.00). Assessment hours reconcile with 05: 540 min = 9.0 h, plus the 2 h exam = 11.0 h. CK hours 0.75+0.75+0.83+0.75+0.75+1.17 = 5.0 h. | — |
| url-reachability | PASS | 03 lists more than 10 URLs, so I re-fetched a sample of 10 on 2026-10-02: all 7 primaries plus the prep path, the FAQ and the Agent SDK overview. 10/10 ok and on-topic. `mcp__fetch__fetch` is not available to this agent, so `WebFetch` was used as the fallback. | — |
| prerequisite-order | PASS | M1 wk1–2. M2 wk2–3 (after M1). M3 wk4–6 (needs M1). M4 wk6–7 (needs M1, M2; M2 closed wk3). M5 wk7–8 (needs M2, M3; M3 consolidation ends wk6, CK3 wk5). M6 wk8–9 (needs M2, M4; CK4 wk7). M7 wk9–10 (needs M1). Mock in wk11, after CK6 in wk10. Each CK falls in the same week as, or after, the exercises it grades: CK1/E1.2 wk2, CK2/E2.2 wk3, CK3/E3.1 wk4→wk5, CK4/E4.1–E4.2 wk6–7, CK5/E5.1 wk8, CK6/E6.1–E7.1 wk9–10. | — |
| consistency | PASS | Module ids and names match across 02–06. Exercise ids in 06 (E1.1–E7.1, CP1–CP7) exist in 04. Checkpoint ids CK1–CK6, the mock and the 30-item retake exist in 05. 06's counting rule matches 05's Time summary ("Extra work beyond 04 exercises: none"). Retake pass criteria (24/30, 75 % in the two weakest domains) are the same in 05 and 06. Free-only is respected: no paid primary or alternative. | — |
| structure | PASS | All six artifacts have the frontmatter keys (artifact, agent, run_id, attempt, depends_on, status) and the sections Summary / Content / Assumptions / Open Issues / Sources. Numbers are given where required: 02 module hours, 03 per-resource hours, 04 exercise hours, 05 minutes per checkpoint plus item counts per domain, 06 hours per week and the budget table. | — |
| requirements | PASS | Free-only, English, and reading + quizzes + practical tasks are honoured. Success criterion 2: ≤ 182 h, ≤ 14 h/week, and review weeks 12–13 come before the exam. Criterion 4: one checkpoint per major module, plus a full 63-item mock in wk11, before the last week. Criterion 5: exercises plus a capstone in Claude Code. Criterion 6: 80 % mock threshold. Scope exclusions are respected: no paid courses and no general software-engineering content. | — |

### Findings

**FAIL fixes**
- none. Both round-1 failures (05 requirements: missing mock items; 05 consistency: checkpoint tasks as separate work) are resolved.

**Advisory (no gate failure)**
- **Mock and checkpoint overlap:** 05 says no mock item repeats a checkpoint question. Several items, however, are close paraphrases of CK quiz items the learner will already have answered: Q31 ≈ CK3 Q7 (MCP vs bespoke function), Q45 ≈ CK5 Q6 (risk-register fields), Q43 ≈ CK5 Q3 (email agent with send), Q46 ≈ CK5 Q4 (data-handling answer), Q51 ≈ CK6 Q1 (business case), Q55 ≈ CK6 Q5 (costs ×3), Q61 ≈ CK6 Q7 (CI controls), Q62 ≈ CK6 Q8 (team consistency), Q23 ≈ CK3 Q6 (too many tools), Q02 ≈ CK2 Q1 (multi-agent justification). They are about 10–15 of 63 items, so the mock score may run a few points high. The 80 % bar sits above the reported 72 % pass mark, which leaves some margin. The path-synthesizer should note this in Assumptions and Risks and suggest that the learner also re-read the official exam-guide sample questions once accessible.
- **Prep-course prerequisites:** the re-fetched prep path says it requires completing foundational courses first (Claude 101, Building with the Claude API and others). 06 schedules Prep L1 in week 3, but only 4 of about 8 h of Building with the Claude API by then. If Skilljar enforces completion, L1–L5 may be locked. 06's Adjustments step 2 already gives a fallback (drop Prep L1–L5; keep the M2/M4 deepening). The path-synthesizer should mention this access condition next to the eligibility risk.
- **Foundations prerequisite:** the FAQ was re-fetched again and confirms "no formal prerequisite" for Professional. The Foundations open issues in 02, 04, 05 and 06 can be presented as closed. 06's "about 12 h of buffer if Foundations is required" scenario does not apply.
- **Exercise count:** 04 Summary still says "Fourteen exercises", but 04 defines 13. 06 correctly says 13 (27 h). The path-synthesizer should report 13.
- **Thin modules:** M6 has 3 h of primary reading plus 2.5 h of alternatives. Its depth relies on Prep L4, which may be inaccessible (see the prep-course item above). 06 flags this itself. The 25.75 h buffer (14 %) leaves room to add an M6 deepening block if the prep path is locked.
- **Unverified exam figures:** domain weights, the 63 items and the 720/1000 pass score are still third-party figures. E1.1 makes the learner verify them against the official guide.

### Verification log

| URL | Role | Status | Date |
|---|---|---|---|
| https://platform.claude.com/docs/en/build-with-claude/overview | M1 primary | ok (Features overview: model capabilities, tools, context management, files) | 2026-10-02 |
| https://www.anthropic.com/engineering/building-effective-agents | M2 primary | ok (Building Effective AI Agents: agent design patterns) | 2026-10-02 |
| https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview | M3 primary | ok (Tool use with Claude: client/server tools, round trip, MCP connector) | 2026-10-02 |
| https://platform.claude.com/docs/en/test-and-evaluate/develop-tests | M4 primary | ok (Define success criteria and build evaluations) | 2026-10-02 |
| https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/mitigate-jailbreaks | M5 primary | ok (direct vs indirect injection, least privilege, tool-output screening) | 2026-10-02 |
| https://code.claude.com/docs/en/costs | M6 primary | ok (Manage costs: about $13/dev/active day, spend limits, pilot rollout) | 2026-10-02 |
| https://code.claude.com/docs/en/best-practices | M7 primary (also M4 alt) | ok (verification, CLAUDE.md, hooks, skills, subagents, non-interactive mode) | 2026-10-02 |
| https://anthropic-partners.skilljar.com/path/claude-certified-architect-professional | optional prep path (Prep L1–L5) | ok (5 lessons 238/158/114/178/45 min, matches 03; lists prerequisite foundational courses) | 2026-10-02 |
| https://anthropic-partners.skilljar.com/page/faq-certifications | reference | ok (partner company email required; no formal Foundations prerequisite) | 2026-10-02 |
| https://code.claude.com/docs/en/agent-sdk/overview | M3 alternative (scheduled wk5) | ok (Agent SDK overview, comparison with CLI / Client SDK / Managed Agents) | 2026-10-02 |

## Assumptions
- `mcp__fetch__fetch` is not available to this agent in this session, so `WebFetch` was used for every re-verification, as the web-research skill allows.
- 03 is unchanged since round 1 (attempt 1). A sample of 10 that includes all 7 primaries meets the gate.
- Paraphrased overlap between mock and checkpoint items affects only the accuracy of the readiness signal. It does not block, mislead about content, or exceed the budget, so it is advisory.
- The week 12 contingency (7 h) is treated as buffer, not planned load, so it counts only towards the per-week check (12.0 h ≤ 14 h).

## Open Issues
- Exam eligibility (a Partner Network company email) can be confirmed only by the learner. If not eligible, the week 13 exam milestone cannot be met.
- The official exam guide is behind the Partner Academy login, so the mock blueprint weights stay provisional until E1.1 is done.
- Access to the optional prep path may depend on completing foundational Academy courses first.

## Sources
- [Claude API Features overview](https://platform.claude.com/docs/en/build-with-claude/overview) — docs, accessed 2026-10-02
- [Building Effective AI Agents](https://www.anthropic.com/engineering/building-effective-agents) — article, accessed 2026-10-02
- [Tool use with Claude](https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview) — docs, accessed 2026-10-02
- [Define success criteria and build evaluations](https://platform.claude.com/docs/en/test-and-evaluate/develop-tests) — docs, accessed 2026-10-02
- [Mitigate jailbreaks and prompt injections](https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/mitigate-jailbreaks) — docs, accessed 2026-10-02
- [Manage costs effectively](https://code.claude.com/docs/en/costs) — docs, accessed 2026-10-02
- [Best practices for Claude Code](https://code.claude.com/docs/en/best-practices) — docs, accessed 2026-10-02
- [Claude Certified Architect – Professional Prep Course](https://anthropic-partners.skilljar.com/path/claude-certified-architect-professional) — official prep path, accessed 2026-10-02
- [Claude certification FAQ](https://anthropic-partners.skilljar.com/page/faq-certifications) — official FAQ, accessed 2026-10-02
- [Agent SDK overview](https://code.claude.com/docs/en/agent-sdk/overview) — docs, accessed 2026-10-02

```json
{
  "overall": "PASS",
  "failures": [],
  "notes": "Round 2: both round-1 failures in 05 are fixed (63-item mock bank with 30-item R subset; CK1-CK6 grade the 04 deliverables). 06: 156.25 h of 182 h, max 14.0 h/week, 13 weeks, prerequisite order respected. URLs 10/10 ok (WebFetch fallback). Advisory for path-synthesizer: about 10-15 mock items paraphrase checkpoint questions, so the mock score may read high; the prep path lists prerequisite Academy courses; the FAQ confirms no Foundations prerequisite; 04 says 14 exercises but there are 13; M6 depth depends on Prep L4."
}
```
