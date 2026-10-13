#!/usr/bin/env node
'use strict';
/**
 * Coordinator CLI for workflow state. Usage:
 *   node state.js init --id <run-id> [--select a,b] [--skip a,b] [--mode free-only] [--title "..."]
 *   node state.js next <run-id> [--json]
 *   node state.js status <run-id> [--resume] [--json]
 *   node state.js verdict <run-id>
 *   node state.js invalidate <run-id> <agent...> [--reason "..."]
 *   node state.js approve <run-id> --decision approved|rejected [--feedback "..."] [--scope a,b]
 *   node state.js render-plan <run-id>
 *   node state.js list
 * Every mutation is an appended event in runs/<id>/events.jsonl; state.json is a derived snapshot.
 */
const fs = require('fs');
const path = require('path');
const L = require('./lib.js');

function parseArgs(argv) {
  const pos = [];
  const opts = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith('--')) {
      const k = a.slice(2);
      const next = argv[i + 1];
      if (next !== undefined && !next.startsWith('--')) { opts[k] = next; i++; } else opts[k] = true;
    } else pos.push(a);
  }
  return { pos, opts };
}
const list = (v) => (v && v !== true ? String(v).split(',').map((s) => s.trim()).filter(Boolean) : []);
const die = (msg, code = 1) => { console.error(`state.js: ${msg}`); process.exit(code); };
const requireRun = (id) => { if (!id) die('run id required'); if (!L.runExists(id)) die(`run "${id}" not found under ${L.RUNS}`); return id; };
const DONE = ['written', 'validated'];

function writeSnapshot(id) {
  const st = L.deriveState(id);
  const snap = { ...st };
  delete snap.user_answers; // raw answers stay in events.jsonl
  fs.writeFileSync(path.join(L.runDir(id), 'state.json'), JSON.stringify(snap, null, 2) + '\n');
  return st;
}

function renderPlan(id, st) {
  const lines = [];
  lines.push(`# Execution plan: ${id}`, '');
  if (st.title) lines.push(`**Goal:** ${st.title}`, '');
  lines.push(`Created: ${st.created_at}  `, `Research mode: ${st.mode || 'standard'}  `, `Retry limit: ${st.validation.max_rounds} validation rounds per approval cycle`, '');
  lines.push('## Selected subagents', '', '| # | Agent | Artifact | Depends on | Role |', '|---|---|---|---|---|');
  let i = 1;
  for (const a of st.selected) {
    const n = st.subgraph[a];
    lines.push(`| ${i++} | ${a} | ${n.artifact} | ${n.depends_on.join(', ') || 'input.md'} | ${n.role}${n.requires ? ` (requires ${n.requires})` : ''} |`);
  }
  const skipped = Object.keys(L.loadGraph().agents).filter((a) => !st.selected.includes(a));
  lines.push('', '## Skipped subagents', '', skipped.length ? skipped.map((a) => `- ${a}: not selected for this run`).join('\n') : '- none');
  lines.push('', '## Execution waves', '');
  const level = {};
  const lvl = (a) => (level[a] !== undefined ? level[a] : (level[a] = st.subgraph[a].depends_on.length ? 1 + Math.max(...st.subgraph[a].depends_on.map(lvl)) : 0));
  st.selected.forEach(lvl);
  const waves = {};
  for (const a of st.selected) (waves[level[a]] = waves[level[a]] || []).push(a);
  for (const w of Object.keys(waves).sort((x, y) => x - y)) lines.push(`${Number(w) + 1}. ${waves[w].length > 1 ? `[parallel] ${waves[w].join(', ')}` : waves[w][0]}`);
  lines.push('', '## Gates', '', '- validator verdict must be PASS before path-synthesizer runs; failures re-run only the named agents and their dependents.', '- html-builder runs only after deterministically verified human approval (approval.json hash + captured answer).', '');
  fs.writeFileSync(path.join(L.runDir(id), 'plan.md'), lines.join('\n'));
}

function printStatus(st) {
  const rows = st.selected.map((a) => {
    const s = st.steps[a];
    const last = s.failures.length ? `  last: ${s.failures[s.failures.length - 1].reason}` : '';
    return `  ${a.padEnd(24)} ${s.status.padEnd(13)} attempts=${s.attempts}${last}`;
  });
  const ap = st.approval.valid ? 'VALID' : `not valid (${st.approval.reason})`;
  console.log(`run ${st.run_id}: status=${st.status}  validation rounds (cycle/total)=${st.validation.rounds_in_cycle}/${st.validation.rounds_total} (max ${st.validation.max_rounds})  revisions=${st.revisions}  approval=${ap}`);
  console.log(rows.join('\n'));
  if (st.status === 'failed') console.log(`FAILED: ${st.failed_reason}`);
  console.log(`runnable now: ${st.runnable.length ? st.runnable.join(', ') : '(none)'}`);
  const w = Object.entries(st.waiting);
  if (w.length) console.log('waiting: ' + w.map(([a, r]) => `${a} (${r})`).join('; '));
}

const cmds = {
  init({ pos, opts }) {
    const id = opts.id || pos[0];
    if (!id || id === true || !/^[A-Za-z0-9_][A-Za-z0-9._-]*$/.test(id)) die('--id <run-id> required (letters, digits, . _ -)');
    if (L.runExists(id)) die(`run "${id}" already exists; use: state.js status ${id} --resume`);
    const inputPath = path.join(L.runDir(id), 'input.md');
    if (!fs.existsSync(inputPath)) die(`write ${L.toPosix(path.relative(L.ROOT, inputPath))} first (the confirmed request), then run init`);
    const graph = L.loadGraph();
    const skip = new Set(list(opts.skip));
    let selected = list(opts.select);
    if (opts.all) selected = Object.keys(graph.agents);
    for (const a of selected) if (!graph.agents[a]) die(`unknown agent "${a}"`);
    for (const a of skip) if (graph.agents[a] && graph.agents[a].always) die(`agent "${a}" is mandatory and cannot be skipped`);
    const sub = L.buildSubgraph(graph, selected.filter((a) => !skip.has(a)));
    const ordered = Object.keys(graph.agents).filter((a) => sub[a]);
    L.appendEvent(id, { type: 'run_created', input_hash: L.sha256File(inputPath), mode: opts.mode || null, title: opts.title && opts.title !== true ? opts.title : null });
    for (const a of L.takePendingAnswers()) L.appendEvent(id, { ...a, captured_at: a.ts });
    L.appendEvent(id, { type: 'plan', selected: ordered, subgraph: sub, mode: opts.mode || null });
    L.setCurrentRunId(id);
    fs.mkdirSync(path.join(L.runDir(id), 'artifacts'), { recursive: true });
    fs.mkdirSync(path.join(L.runDir(id), 'output'), { recursive: true });
    const st = writeSnapshot(id);
    renderPlan(id, st);
    console.log(`initialized run ${id}: ${ordered.length} agents selected (${ordered.join(', ')})`);
    console.log(`plan: runs/${id}/plan.md`);
    printStatus(st);
  },
  next({ pos, opts }) {
    const id = requireRun(pos[0]);
    const st = writeSnapshot(id);
    const graph = L.loadGraph();
    const items = st.runnable.map((a) => {
      const s = st.steps[a];
      const n = st.subgraph[a];
      return {
        agent: a,
        artifact: `runs/${id}/${n.artifact}`,
        attempt: s.attempts + 1,
        depends_on: n.depends_on.map((d) => ({ agent: d, artifact: `runs/${id}/${st.subgraph[d].artifact}` })),
        previous_failures: s.failures,
        previous_artifact_exists: fs.existsSync(path.join(L.runDir(id), n.artifact)),
        mode: st.mode,
        role: n.role,
      };
    });
    const out = { run_id: id, run_status: st.status, runnable: items, waiting: st.waiting, validation: st.validation, approval: { valid: st.approval.valid, reason: st.approval.reason }, max_agent_attempts: graph.max_agent_attempts };
    if (opts.json) return console.log(JSON.stringify(out, null, 2));
    printStatus(st);
    if (items.length) console.log(`\nLaunch ALL of these in one message (parallel wave); every prompt must start with "run_id: ${id}":\n` + JSON.stringify(items, null, 2));
    else if (st.status === 'awaiting_approval') console.log(`\nNext step: ask the user for approval (AskUserQuestion with options exactly "${L.APPROVE_LABEL}" / "${L.REJECT_LABEL}"), then run: state.js approve ${id} --decision <approved|rejected>`);
    else if (st.status === 'completed') console.log(`\nRun completed. Output: runs/${id}/output/`);
    else if (st.status === 'failed') console.log(`\nRun failed. See runs/${id}/artifacts/failure-report.md`);
    else if (st.steps['validator'] && st.steps['validator'].status === 'written') console.log(`\nNext step: node state.js verdict ${id}`);
  },
  status({ pos, opts }) {
    const id = requireRun(pos[0]);
    if (opts.resume) {
      const before = L.deriveState(id);
      const inputHash = L.sha256File(path.join(L.runDir(id), 'input.md'));
      if (inputHash !== before.input_hash) die('input.md changed since the run was created; start a new run instead of resuming');
      const interrupted = before.selected.filter((a) => before.steps[a].status === 'running');
      const kept = before.selected.filter((a) => DONE.includes(before.steps[a].status));
      L.appendEvent(id, { type: 'resume', interrupted, skipped: kept });
      L.setCurrentRunId(id);
    }
    const st = writeSnapshot(id);
    if (opts.json) return console.log(JSON.stringify(st, null, 2));
    printStatus(st);
    if (opts.resume) console.log(`resumed: completed steps kept = ${st.selected.filter((a) => DONE.includes(st.steps[a].status)).join(', ') || 'none'}; interrupted = ${st.interrupted.join(', ') || 'none'}`);
  },
  verdict({ pos }) {
    const id = requireRun(pos[0]);
    const st = L.deriveState(id);
    const vNode = st.subgraph['validator'];
    if (!vNode) die('validator is not part of this run');
    const p = path.join(L.runDir(id), vNode.artifact);
    if (!fs.existsSync(p)) die(`${vNode.artifact} not written yet`);
    if (st.steps['validator'].status !== 'written') die(`validator status is "${st.steps['validator'].status}"; a verdict can only be consumed once per validator run`);
    const parsed = L.parseVerdict(fs.readFileSync(p, 'utf8'));
    if (!parsed.ok) die(`cannot consume verdict: ${parsed.error}. Re-run the validator.`);
    const v = parsed.verdict;
    const failures = v.failures.map((f) => ({ agent: st.subgraph[f.agent] ? f.agent : L.ownerOfArtifact(f.artifact || '', st.subgraph), artifact: f.artifact || null, gate: f.gate || 'unspecified', reason: f.reason }));
    for (const f of failures) if (!f.agent || !st.subgraph[f.agent]) die(`verdict names an agent not in this run: ${JSON.stringify(f)}`);
    const failing = [...new Set(failures.map((f) => f.agent))];
    const validated = vNode.depends_on.filter((a) => !failing.includes(a));
    L.appendEvent(id, { type: 'validation_round', overall: v.overall, failures, validated, notes: v.notes || null });
    let result;
    if (v.overall === 'PASS') result = { overall: 'PASS', next: 'path-synthesizer' };
    else {
      const down = L.downstream(st.subgraph, failing).filter((a) => a !== 'validator' && a !== 'html-builder');
      L.appendEvent(id, { type: 'invalidated', agents: down, reason: `downstream of failed gate for ${failing.join(', ')}`, source: 'verdict' });
      const after = L.deriveState(id);
      if (after.validation.rounds_in_cycle >= after.validation.max_rounds) {
        const reason = `quality gate still failing after ${after.validation.rounds_in_cycle} validation rounds (limit ${after.validation.max_rounds}); unresolved: ${failing.join(', ')}`;
        L.appendEvent(id, { type: 'run_failed', reason, failures });
        const report = [
          '---', 'artifact: failure-report.md', 'agent: coordinator', `run_id: ${id}`, `attempt: ${after.validation.rounds_in_cycle}`, 'depends_on: [validator]', 'status: failed', '---', '',
          `# Failure report: ${id}`, '', '## Summary', '', reason, '', '## Content', '', '### Unresolved gate failures', '',
          ...failures.map((f) => `- **${f.agent}** (${f.gate}): ${f.reason}`), '', '### Stopped dependent work', '',
          ...['path-synthesizer', 'html-builder'].filter((a) => st.subgraph[a]).map((a) => `- ${a}: not executed`), '',
          '## Assumptions', '', '- Artifacts that passed their gates remain valid and are kept for a future run.', '', '## Open Issues', '',
          ...failing.map((a) => `- ${a} needs a different approach or changed requirements.`), '', '## Sources', '', `- runs/${id}/artifacts/07-validation.md`, '',
        ].join('\n');
        fs.writeFileSync(path.join(L.runDir(id), 'artifacts', 'failure-report.md'), report);
        result = { overall: 'FAIL', reason, retry: [], rerun_downstream: [], failure_report: `runs/${id}/artifacts/failure-report.md` };
      } else result = { overall: 'FAIL', round: after.validation.rounds_in_cycle, max_rounds: after.validation.max_rounds, retry: failing, rerun_downstream: down, failures };
    }
    const st2 = writeSnapshot(id);
    console.log(JSON.stringify({ ...result, run_status: st2.status, runnable_now: st2.runnable }, null, 2));
  },
  invalidate({ pos, opts }) {
    const id = requireRun(pos[0]);
    const agents = pos.slice(1);
    if (!agents.length) die('name at least one agent to invalidate');
    const st = L.deriveState(id);
    for (const a of agents) if (!st.subgraph[a]) die(`agent "${a}" is not in this run`);
    const down = L.downstream(st.subgraph, agents).filter((a) => a !== 'html-builder');
    L.appendEvent(id, { type: 'invalidated', agents: [...agents, ...down], reason: opts.reason && opts.reason !== true ? opts.reason : 'manually invalidated by coordinator', source: 'invalidate' });
    const st2 = writeSnapshot(id);
    console.log(JSON.stringify({ invalidated: agents, downstream: down, runnable_now: st2.runnable }, null, 2));
  },
  approve({ pos, opts }) {
    const id = requireRun(pos[0]);
    const decision = opts.decision;
    if (!['approved', 'rejected'].includes(decision)) die('--decision approved|rejected required');
    const st = L.deriveState(id);
    const synth = st.steps['path-synthesizer'];
    if (!synth || synth.status !== 'written') die(`learning path is not ready for approval (path-synthesizer status: ${synth ? synth.status : 'n/a'})`);
    const ans = L.latestDecisionAnswer(st, st.synth_written_at);
    const got = L.answerDecision(ans);
    if (!ans) die(`no captured user answer since the latest learning path version. Ask with AskUserQuestion (options exactly "${L.APPROVE_LABEL}" / "${L.REJECT_LABEL}") or have the user run: /build-learning-path --approve ${id}  (or --reject ${id} <feedback>)`);
    if (got !== decision) die(`captured user answer says "${got}" but --decision is "${decision}"; the recorded answer wins`);
    const synthRel = st.subgraph['path-synthesizer'].artifact;
    const hash = L.sha256File(path.join(L.runDir(id), synthRel));
    const feedback = (opts.feedback && opts.feedback !== true ? opts.feedback : null) || ans.feedback || null;
    const record = { ts: L.nowIso(), decision, hash, artifact: synthRel, feedback, answer_ts: ans.ts, answer_source: ans.source || 'ask_user_question', scope: list(opts.scope) };
    const apPath = path.join(L.runDir(id), 'approval.json');
    const history = fs.existsSync(apPath) ? JSON.parse(fs.readFileSync(apPath, 'utf8')) : [];
    history.push(record);
    fs.writeFileSync(apPath, JSON.stringify(history, null, 2) + '\n');
    L.appendEvent(id, { type: 'approval', ...record });
    if (decision === 'rejected') {
      const n = st.revisions + 1;
      const scope = list(opts.scope).filter((a) => st.subgraph[a] && a !== 'path-synthesizer' && a !== 'html-builder');
      const targets = [...scope, 'path-synthesizer'];
      const down = L.downstream(st.subgraph, targets).filter((a) => a !== 'html-builder');
      const rerun = [...new Set([...targets, ...down])];
      const rev = [
        '---', `artifact: revision-${n}.md`, 'agent: coordinator', `run_id: ${id}`, `attempt: ${n}`, 'depends_on: [path-synthesizer]', 'status: open', '---', '',
        `# Revision request ${n}`, '', '## Summary', '', `The user rejected learning path version ${hash.slice(0, 12)} on ${record.ts}.`, '', '## Content', '',
        '### Feedback', '', feedback || '(no free-text feedback provided)', '', '### Affected agents (re-run set)', '', ...rerun.map((a) => `- ${a}`), '',
        '## Assumptions', '', '- Agents not listed above keep their validated artifacts.', '', '## Open Issues', '', '- none', '', '## Sources', '', `- events.jsonl user_answer at ${ans.ts}`, '',
      ].join('\n');
      fs.writeFileSync(path.join(L.runDir(id), 'artifacts', `revision-${n}.md`), rev);
      L.appendEvent(id, { type: 'invalidated', agents: rerun, reason: `user requested changes (revision ${n}): ${feedback || 'see revision file'}`, source: 'approval' });
      const st2 = writeSnapshot(id);
      console.log(JSON.stringify({ decision, revision: n, revision_file: `runs/${id}/artifacts/revision-${n}.md`, rerun, runnable_now: st2.runnable }, null, 2));
    } else {
      const st2 = writeSnapshot(id);
      console.log(JSON.stringify({ decision, hash, approval_valid: st2.approval.valid, reason: st2.approval.reason, runnable_now: st2.runnable }, null, 2));
    }
  },
  evidence({ pos }) {
    const id = requireRun(pos[0]);
    const ev = L.readEvents(id);
    const count = (pred) => ev.filter(pred).length;
    const st = L.deriveState(id);
    const rows = [
      ['requirement answers (interactive gathering/confirmation)', count((e) => e.type === 'requirements_answer')],
      ['approval answers via on-screen question', count((e) => e.type === 'user_answer' && e.source === 'ask_user_question')],
      ['approval answers via typed --approve/--reject', count((e) => e.type === 'user_answer' && e.source === 'command')],
      ['approval records (approved / rejected)', `${count((e) => e.type === 'approval' && e.decision === 'approved')} / ${count((e) => e.type === 'approval' && e.decision === 'rejected')}`],
      ['MCP calls (mcp__fetch__*)', count((e) => e.type === 'mcp_call')],
      ['web searches', count((e) => e.type === 'web_search')],
      ['web fetches (WebFetch fallback)', count((e) => e.type === 'web_fetch')],
      ['gate denials', count((e) => e.type === 'gate_denied')],
      ['validation rounds (FAIL / PASS)', `${count((e) => e.type === 'validation_round' && e.overall === 'FAIL')} / ${count((e) => e.type === 'validation_round' && e.overall === 'PASS')}`],
      ['resumes after interruption', count((e) => e.type === 'resume')],
      ['run status', st.status],
    ];
    console.log(`evidence for ${id}`);
    for (const [k, v] of rows) console.log(`  ${k.padEnd(58)} ${v}`);
  },
  'render-plan'({ pos }) {
    const id = requireRun(pos[0]);
    renderPlan(id, writeSnapshot(id));
    console.log(`plan: runs/${id}/plan.md`);
  },
  list() {
    if (!fs.existsSync(L.RUNS)) return console.log('no runs');
    let any = false;
    for (const d of fs.readdirSync(L.RUNS)) {
      if (d.startsWith('.') || !L.runExists(d)) continue;
      any = true;
      const st = L.deriveState(d);
      console.log(`${d.padEnd(32)} ${st.status.padEnd(18)} created ${st.created_at}`);
    }
    if (!any) console.log('no runs');
  },
};

const { pos, opts } = parseArgs(process.argv.slice(2));
const cmd = pos.shift();
if (!cmd || !cmds[cmd]) die(`usage: state.js <${Object.keys(cmds).join('|')}> ...`);
cmds[cmd]({ pos, opts });
