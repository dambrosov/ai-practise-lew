---
artifact: 06-schedule.md
agent: schedule-planner
run_id: run-04-claude-certified-architect-professional
attempt: 2
depends_on: [knowledge-assessor, resource-researcher, practice-designer, assessment-designer]
status: complete
sources_used: 0
---

# Schedule: Claude Certified Architect – Professional

## Summary
The plan runs 13 weeks (2026-10-02 to 2027-01-01) at no more than 14 h per week. It schedules 156.25 h of the 182 h budget and keeps 25.75 h (14 %) as buffer. Of that buffer, 7 h in week 12 are reserved as a contingency for a failed mock (30-item retake 1 h plus up to 6 h of weak-domain review). Week 1 holds an exam-eligibility task, because the official FAQ says registration needs a Claude Partner Network company email. Modules run in prerequisite order (M1 to M7; M7 reading overlaps M6). Checkpoints CK1–CK6 follow their modules and grade the 04 exercise deliverables, so their practical work is counted once, as practice. In this revision, part of the buffer is moved into M2 (1.25 h in week 3) and M4 (2 h in week 7), the two modules the validator found thin. The busiest weeks are 14 h (weeks 3 and 9).

## Content

### Planning parameters
| Parameter | Value |
|---|---|
| Hours per week | 14 (2 h/day, 7 days) |
| Weeks | 13 (week 1 starts 2026-10-02; week 13 ends 2027-01-01) |
| Total budget | 182 h |
| Planned load | 156.25 h (max week 14.0 h, min week 5.0 h) |
| Buffer policy | Reserve at least 10 % (18.2 h). Here 25.75 h (14 %) remain unscheduled. Week 12 holds 7 h of this as contingency (retake 1 h plus up to 6 h of review), so week 12 can reach 12 h and stays within 14 h. Other buffer: about 1 h per week of slack to finish items in the same week. |
| Mode | free-only; the exam fee is outside the budget |
| Counting rule | Checkpoint practical tasks are the grading of exercises E1.2, E2.2, E3.1, E4.1/E4.2, E5.1 and E6.1/E6.2/E7.1, so their hours are counted once, as practice. Only quiz and grading minutes (5.0 h for CK1–CK6), the mock (3 h), the capstone defence and readiness checklist (1 h) and the exam (2 h) count as assessment. |

Capstone split used (total still 10 h, as in 04): CP1 0.5, CP2 1, CP3 1.5, CP4 1, CP5 1, CP6 1, CP7 4 (assembly and the 30-minute design review).

Assessment minutes follow 05: CK1 45, CK2 45, CK3 50, CK4 45, CK5 45, CK6 70 (quiz plus grading), mock 120 + 60 review, defence 45 + checklist 15.

### Week-by-week plan
Study names are resources from 03. "Consol." is a 1 h gap-log review and note consolidation at the end of a module (it uses the gap log from E1.1). "Prep L1–L5" are lessons 1–5 of the optional Claude Certified Architect – Professional Prep Course; if the learner has no access, use the fallbacks in Adjustments. "Deepening" is buffer deliberately moved into a thin module.

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

Prerequisite check against 02: M2 reading starts in week 2 after M1 reading; M3 (needs M1) starts in week 4; M4 (needs M1, M2) starts in week 6, after M2 closes in week 3; M5 (needs M2, M3) starts in week 7, after M3 ends in week 6; M6 (needs M2, M4) starts in week 8, after CK4 in week 7; M7 (needs M1) is placed after M6 starts. The mock exam (needs M1–M7) is in week 11, after CK6.

Allocation note: the validator saw M2 at about 14.5 of 26 h and M4 at about 13.5 of 24 h with buffer unused. Week 3 now adds 1.25 h of M2 deepening (about 15.75 h in total) and week 7 adds 2 h of M4 deepening (about 15.5 h in total). Both use resources already in 03. Weeks stay at 14 h or less.

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

### Budget check
| Category | Hours | Share of 182 h |
|---|---|---|
| Study (reading, courses, optional prep path, consolidation, deepening, review, eligibility task) | 108.25 | 59.5 % |
| Practice (13 exercises 27 h + capstone 10 h) | 37.00 | 20.3 % |
| Assessments (CK1–CK6 quizzes and grading 5.0 h, mock 3 h, defence and checklist 1 h, exam 2 h) | 11.00 | 6.0 % |
| Buffer (unscheduled catch-up, including 7 h week 12 contingency) | 25.75 | 14.2 % |
| **Total** | **182.00** | **100 %** |

Total 156.25 h planned of 182 h budget over 13 weeks (deadline: 2027-01-01); maximum 14.0 h in any week.

Reconciliation with 05: 05 totals 9.0 h (540 min) of assessment, all of it quiz, grading, mock, review, defence and checklist; the practical tasks are the 04 exercises and are not added. The 9.0 h plus the 2 h exam gives the 11.0 h shown. The retake (1 h) and up to 6 h of weak-domain review are contingent and sit in the buffer. The 17 h of "short applied tasks" in 02's module hours are the exercises in 04, so no exercise hour is counted in study. The 02 module total of 150 h is replaced by the 03 resource hours (see Assumptions).

### Adjustments
**If the learner falls behind (drop or compress in this order):**
1. Use the unscheduled buffer (about 1 h per week) first, but keep the 7 h week 12 contingency untouched.
2. Drop the optional Prep L1–L5 lessons (12.25 h) if Partner Academy access is missing or time is short. Weeks 3, 5, 8, 9 and 10 then have 4 h, 2.6 h, 1.9 h, 3 h and 0.75 h free. Do not drop the M2 and M4 deepening blocks; they replace the prep lessons for M2 depth.
3. Drop the Building with the Claude API course (4 h, week 2), the Introduction to Model Context Protocol course (3 h, week 5) and the AI Fluency course (3 h, week 8); the docs alone cover the objectives.
4. Reduce consolidation hours (7 h in total) to a 30-minute gap-log review per module.
5. Shorten Model Context Protocol: Advanced Topics and Claude Code overview (4 h in total) to a skim.
6. Never drop: the eligibility task, the exercises that feed the capstone (E2.2, E3.1, E4.1, E5.1, E6.1), the CK1–CK6 quizzes, the full mock and the week 12 defence. If the mock is below 80 % in week 11, use the week 12 contingency (up to 6 h review plus the 1 h retake) and move the exam date rather than skipping the retake.

**If the learner is ahead:**
- Finish the rest of the Building with the Claude API course (the last 4 h) or take Introduction to Subagents (not scheduled; verified in 03, duration unknown).
- Run the optional API calls in E3.1 and E4.1 and add more eval cases (for example 30 instead of 15).
- Sit the 30-item retake subset as a second mock after a 7-day gap, with a one-line justification per answer, even if the first mock passed.
- Rehearse the capstone defence aloud with a peer.

## Assumptions
- Weeks run Friday to Thursday starting 2026-10-02; week 13 ends on 2027-01-01.
- Study hours follow the resource estimates in 03 (about 63 h of listed reading plus 12.2 h of the prep path), not the 150 h module estimate in 02. 02 treats module hours as reading plus applied tasks; the applied part is the 27 h of exercises in 04.
- Hour figures for the Anthropic Academy courses are estimates from 03; only part of the Building with the Claude API course (4 of about 8 h) is scheduled. Prep-course lesson lengths come from 03 (238, 158, 114, 178 and 45 minutes).
- The capstone split across milestones is a scheduling choice (CP7 gets 4 h of assembly and design review); the 10 h total is unchanged from 04.
- M2 and M4 deepening blocks (1.25 h and 2 h) are re-reads of resources already in 03, taken from the buffer.
- The week 12 contingency is treated as buffer, as 05 advises; the retake (1 h) and weak-domain review (up to 6 h) are not in the planned total.
- The exam can be sat in week 13 if the learner is eligible; the learner's own exam date is outside the schedule.
- The 80 % mock bar comes from 01 and 05.

## Open Issues
- Eligibility risk: the FAQ says registration requires a Claude Partner Network company email. Week 1 confirms this. If the learner is not eligible, the exam milestone in week 13 cannot be met; the study weeks are still useful and weeks 12–13 can be re-planned.
- Budget fit: using 02's 150 h of module time together with 04's added practice (20 h), 05's assessment (9 h) and a 10 % buffer would need about 197 h, an overrun of about 15 h. The plan avoids this by scheduling reading from the 03 resource hours. Trade-off: M2 and M6 have thin free primary reading (3 h and 4 h), so their depth relies on exercises, the optional prep lessons (L1 and L4), and for M2 the deepening block. If the prep path is not accessible, M6 is likely to be the weakest module.
- Domain weights, item counts and the pass mark are third-party figures (see 02, 03, 05); the mock blueprint and the week 12 review order (by weight) may need to change after E1.1.
- Foundations may or may not be a prerequisite (sources disagree). If it is, about 12 h of buffer are needed, which would use the 7 h contingency and shrink weeks 12–13.
- Buffer is 14 % rather than 10 %; weeks 12 and 13 are deliberately light (5 h and 6 h scheduled).

## Sources
- none (derived from inputs)
