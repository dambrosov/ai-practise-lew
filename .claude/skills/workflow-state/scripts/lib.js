'use strict';
/**
 * Shared workflow-state library used by state.js (coordinator CLI) and by the
 * hooks in .claude/hooks. No dependencies beyond Node >= 18.
 *
 * Design: hooks only APPEND one JSON line to runs/<id>/events.jsonl. The
 * state.json snapshot is DERIVED by replaying events (deriveState) and is only
 * written by `state.js status`, which the coordinator runs between waves.
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = process.env.WORKFLOW_ROOT || path.resolve(__dirname, '..', '..', '..', '..');
const RUNS = path.join(ROOT, 'runs');
const GRAPH_PATH = path.join(ROOT, '.claude', 'skills', 'coordinator', 'graph.template.json');

const ARTIFACT_H2 = ['Summary', 'Content', 'Assumptions', 'Open Issues', 'Sources'];
const LEARNING_PATH_H2 = [
  'Overview',
  'Learner Profile',
  'Goals and Success Criteria',
  'Knowledge Gap Analysis',
  'Learning Path',
  'Weekly Schedule',
  'Exercises and Projects',
  'Checkpoints and Assessments',
  'Resources',
  'Assumptions and Risks',
  'Sources',
];
const FRONTMATTER_KEYS = ['artifact', 'agent', 'run_id', 'attempt', 'depends_on', 'status'];
const APPROVE_LABEL = 'Approve';
const REJECT_LABEL = 'Request changes';
const RUNNABLE_FROM = ['pending', 'failed', 'needs_rerun'];
const SATISFIED = ['written', 'validated'];

// ---------- basic helpers ----------
const nowIso = () => new Date().toISOString();
const toPosix = (p) => String(p || '').replace(/\\/g, '/');
const sha256 = (buf) => crypto.createHash('sha256').update(buf).digest('hex');
const sha256File = (p) => (fs.existsSync(p) ? sha256(fs.readFileSync(p)) : null);
const loadGraph = () => JSON.parse(fs.readFileSync(GRAPH_PATH, 'utf8'));
const runDir = (id) => path.join(RUNS, id);
const eventsPath = (id) => path.join(runDir(id), 'events.jsonl');
const runExists = (id) => !!id && fs.existsSync(eventsPath(id));

function readEvents(id) {
  const p = eventsPath(id);
  if (!fs.existsSync(p)) return [];
  return fs
    .readFileSync(p, 'utf8')
    .split(/\r?\n/)
    .filter(Boolean)
    .map((l) => {
      try {
        return JSON.parse(l);
      } catch {
        return null;
      }
    })
    .filter(Boolean);
}

function appendEvent(id, ev) {
  fs.mkdirSync(runDir(id), { recursive: true });
  const line = JSON.stringify({ ts: nowIso(), ...ev }) + '\n';
  fs.appendFileSync(eventsPath(id), line); // single small append: safe under parallel subagents
  return line;
}

function currentRunId() {
  const p = path.join(RUNS, '.current');
  if (!fs.existsSync(p)) return null;
  const id = fs.readFileSync(p, 'utf8').trim();
  return id || null;
}
function setCurrentRunId(id) {
  fs.mkdirSync(RUNS, { recursive: true });
  fs.writeFileSync(path.join(RUNS, '.current'), id);
}

/** Locate a file inside runs/: returns { runId, rel } or null. */
function locateInRuns(filePath) {
  if (!filePath) return null;
  const abs = path.isAbsolute(filePath) ? filePath : path.join(ROOT, filePath);
  const rel = toPosix(path.relative(RUNS, abs));
  if (!rel || rel.startsWith('..') || path.isAbsolute(rel)) return null;
  const [runId, ...rest] = rel.split('/');
  if (!runId || runId.startsWith('.')) return null;
  return { runId, rel: rest.join('/') };
}
const runIdFromPrompt = (prompt) => {
  const m = /^\s*run_id:\s*([A-Za-z0-9._-]+)/m.exec(prompt || '');
  return m ? m[1] : null;
};
const runIdFromCommand = (cmd) => {
  const m = /runs[\\/]([A-Za-z0-9_][A-Za-z0-9._-]*)[\\/]/.exec(cmd || '');
  return m ? m[1] : null;
};
function resolveRunId({ prompt, filePath, command } = {}) {
  return (
    runIdFromPrompt(prompt) ||
    (locateInRuns(filePath) || {}).runId ||
    runIdFromCommand(command) ||
    currentRunId()
  );
}

/** Owner agent of an artifact path (relative to the run dir), from the subgraph or template. */
function ownerOfArtifact(rel, subgraph) {
  const agents = subgraph || loadGraph().agents;
  const base = path.posix.basename(toPosix(rel));
  for (const [name, node] of Object.entries(agents)) {
    if (path.posix.basename(node.artifact) === base) return name;
  }
  return null;
}

/** Transitive dependents of the given agents inside a subgraph (excludes the inputs). */
function downstream(subgraph, agents) {
  const out = new Set();
  const queue = [...agents];
  while (queue.length) {
    const a = queue.shift();
    for (const [name, node] of Object.entries(subgraph)) {
      if (node.depends_on.includes(a) && !out.has(name) && !agents.includes(name)) {
        out.add(name);
        queue.push(name);
      }
    }
  }
  return [...out];
}

/** Build the selected subgraph: always-on agents plus explicit selections; deps filtered to selected set. */
function buildSubgraph(graph, selected) {
  const sel = new Set(selected);
  for (const [name, node] of Object.entries(graph.agents)) if (node.always) sel.add(name);
  const sub = {};
  for (const name of Object.keys(graph.agents)) {
    if (!sel.has(name)) continue;
    const node = graph.agents[name];
    sub[name] = {
      artifact: node.artifact,
      depends_on: node.depends_on.filter((d) => sel.has(d)),
      role: node.role,
      requires: node.requires || null,
      summary: node.summary,
    };
  }
  return sub;
}

// ---------- user answers / approval ----------
/** Deterministically extract a decision from a captured user answer event. */
function answerDecision(ev) {
  if (!ev) return null;
  if (ev.source === 'command') return ev.decision || null;
  const labels = ev.labels || [];
  if (labels.includes(APPROVE_LABEL)) return 'approved';
  if (labels.includes(REJECT_LABEL)) return 'rejected';
  return null;
}
/** Collect option labels chosen in an AskUserQuestion tool_response (shape-tolerant). */
function extractAnswerLabels(toolResponse) {
  const labels = [];
  const visit = (v, depth) => {
    if (depth > 6 || v == null) return;
    if (typeof v === 'string') {
      for (const part of v.split(/\s*,\s*/)) if (part === APPROVE_LABEL || part === REJECT_LABEL) labels.push(part);
      return;
    }
    if (Array.isArray(v)) return v.forEach((x) => visit(x, depth + 1));
    if (typeof v === 'object') {
      // prefer an explicit answers map when present
      if (v.answers && typeof v.answers === 'object') return visit(v.answers, depth + 1);
      for (const x of Object.values(v)) visit(x, depth + 1);
    }
  };
  visit(toolResponse, 0);
  return [...new Set(labels)];
}

function latestDecisionAnswer(st, afterTs) {
  const list = st.user_answers.filter((a) => answerDecision(a) && (!afterTs || a.ts >= afterTs));
  return list.length ? list[list.length - 1] : null;
}

/** Approval is valid only if: latest record approved AND hash matches current synthesis file AND the latest decisive user answer is an approval. */
function approvalStatus(id, st) {
  const latest = st.approval.latest;
  if (!latest) return { valid: false, reason: 'no approval record (run state.js approve after the user answered)' };
  if (latest.decision !== 'approved') return { valid: false, reason: `latest approval record is "${latest.decision}"` };
  const synthRel = (st.subgraph['path-synthesizer'] || {}).artifact || 'artifacts/08-learning-path.md';
  const cur = sha256File(path.join(runDir(id), synthRel));
  if (!cur) return { valid: false, reason: `${synthRel} not found` };
  if (cur !== latest.hash) return { valid: false, reason: 'learning path changed after approval (hash mismatch); approval must be requested again' };
  const ans = latestDecisionAnswer(st, st.synth_written_at);
  if (!ans || answerDecision(ans) !== 'approved') return { valid: false, reason: 'no captured user answer "Approve" after the latest learning path version' };
  return { valid: true, reason: 'approved' };
}

// ---------- state derivation ----------
function emptySteps(subgraph) {
  const steps = {};
  for (const [a, node] of Object.entries(subgraph)) {
    steps[a] = { status: 'pending', attempts: 0, artifact: node.artifact, hash: null, updated_at: null, failures: [], lint_errors: [] };
  }
  return steps;
}

function computeRunStatus(id, st) {
  const steps = st.steps;
  const html = steps['html-builder'];
  const synth = steps['path-synthesizer'];
  if (html && html.status === 'written') return 'completed';
  if (approvalStatus(id, st).valid) return 'rendering';
  const latest = st.approval.latest;
  if (synth && synth.status === 'written') {
    if (latest && latest.decision === 'rejected' && latest.ts > (synth.updated_at || '')) return 'revising';
    return 'awaiting_approval';
  }
  if (latest && latest.decision === 'rejected') return 'revising';
  const v = steps['validator'];
  if (v && v.status === 'running') return 'validating';
  return 'executing';
}

function deriveState(id) {
  const events = readEvents(id);
  const graph = loadGraph();
  const st = {
    run_id: id,
    status: 'gathering',
    title: null,
    mode: null,
    input_hash: null,
    created_at: null,
    updated_at: null,
    selected: [],
    subgraph: {},
    steps: {},
    validation: { rounds_total: 0, rounds_in_cycle: 0, max_rounds: graph.max_validation_rounds, last: null },
    approval: { history: [], latest: null, valid: false, reason: null },
    revisions: 0,
    user_answers: [],
    gate_denials: [],
    mcp_calls: 0,
    web_searches: 0,
    interrupted: [],
    failed_reason: null,
    synth_written_at: null,
    event_count: events.length,
  };
  for (const ev of events) {
    st.updated_at = ev.ts;
    const s = ev.agent ? st.steps[ev.agent] : null;
    switch (ev.type) {
      case 'run_created':
        st.created_at = ev.ts;
        st.input_hash = ev.input_hash;
        st.mode = ev.mode || null;
        st.title = ev.title || null;
        st.status = 'planning';
        break;
      case 'plan':
        st.selected = ev.selected;
        st.subgraph = ev.subgraph;
        st.steps = emptySteps(ev.subgraph);
        st.status = 'executing';
        break;
      case 'agent_started':
        if (s) { s.status = 'running'; s.attempts++; s.updated_at = ev.ts; }
        break;
      case 'artifact_written':
        if (s) {
          if (ev.lint_ok) { s.status = 'written'; s.hash = ev.hash; s.lint_errors = []; }
          else s.lint_errors = ev.lint_errors || [];
          s.updated_at = ev.ts;
          if (ev.agent === 'path-synthesizer' && ev.lint_ok) st.synth_written_at = ev.ts;
        }
        break;
      case 'agent_finished':
        if (s) { if (s.status === 'running') s.status = 'failed'; s.updated_at = ev.ts; }
        break;
      case 'validation_round': {
        st.validation.rounds_total++;
        st.validation.rounds_in_cycle++;
        st.validation.last = { round: st.validation.rounds_in_cycle, overall: ev.overall, failures: ev.failures || [], ts: ev.ts };
        for (const a of ev.validated || []) { const x = st.steps[a]; if (x && x.status === 'written') x.status = 'validated'; }
        for (const f of ev.failures || []) {
          const x = st.steps[f.agent];
          if (x) { x.status = 'needs_rerun'; x.failures.push({ round: st.validation.rounds_in_cycle, gate: f.gate, reason: f.reason, source: 'validator' }); }
        }
        const v = st.steps['validator'];
        if (v) v.status = ev.overall === 'PASS' ? 'validated' : 'needs_rerun';
        break;
      }
      case 'invalidated':
        for (const a of ev.agents || []) {
          const x = st.steps[a];
          if (x) { x.status = 'needs_rerun'; x.updated_at = ev.ts; if (ev.reason) x.failures.push({ reason: ev.reason, source: ev.source || 'invalidate' }); }
        }
        break;
      case 'approval':
        st.approval.history.push(ev);
        st.approval.latest = ev;
        if (ev.decision === 'rejected') { st.validation.rounds_in_cycle = 0; st.revisions++; }
        break;
      case 'user_answer':
        st.user_answers.push(ev);
        break;
      case 'requirements_answer':
        st.requirements_answers = (st.requirements_answers || 0) + 1;
        break;
      case 'gate_denied':
        st.gate_denials.push(ev);
        break;
      case 'mcp_call':
        st.mcp_calls++;
        break;
      case 'web_search':
        st.web_searches++;
        break;
      case 'resume':
        st.interrupted = ev.interrupted || [];
        for (const a of st.interrupted) { const x = st.steps[a]; if (x) { x.status = 'failed'; x.failures.push({ reason: 'interrupted by process restart', source: 'resume' }); } }
        break;
      case 'run_failed':
        st.status = 'failed';
        st.failed_reason = ev.reason;
        break;
      case 'output_written': {
        const x = st.steps['html-builder'];
        if (x && /\.html?$/i.test(ev.artifact || '')) { x.status = 'written'; x.hash = ev.hash; x.updated_at = ev.ts; }
        break;
      }
      default:
        break;
    }
  }
  if (st.status !== 'failed' && st.selected.length) st.status = computeRunStatus(id, st);
  const ap = approvalStatus(id, st);
  st.approval.valid = ap.valid;
  st.approval.reason = ap.reason;
  st.runnable = st.status === 'failed' ? [] : runnable(id, st, graph);
  st.waiting = waiting(id, st, graph);
  return st;
}

/** Agents that can be launched right now. */
function runnable(id, st, graph = loadGraph()) {
  const out = [];
  for (const a of st.selected) {
    const r = readiness(id, st, a, graph);
    if (r.ready) out.push(a);
  }
  return out;
}
function waiting(id, st, graph = loadGraph()) {
  const out = {};
  for (const a of st.selected) {
    const r = readiness(id, st, a, graph);
    if (!r.ready && !['written', 'validated', 'skipped'].includes(st.steps[a].status)) out[a] = r.reason;
  }
  return out;
}
/** Why an agent can / cannot run now. Used by state.js next and the PreToolUse gate. */
function readiness(id, st, agent, graph = loadGraph()) {
  const s = st.steps[agent];
  const node = st.subgraph[agent];
  if (!s || !node) return { ready: false, reason: `agent "${agent}" is not part of this run's plan` };
  if (st.status === 'failed') return { ready: false, reason: `run failed: ${st.failed_reason}` };
  if (s.status === 'running') return { ready: false, reason: 'already running' };
  if (!RUNNABLE_FROM.includes(s.status)) return { ready: false, reason: `status is "${s.status}"` };
  if (s.attempts >= graph.max_agent_attempts) return { ready: false, reason: `attempt limit reached (${s.attempts}/${graph.max_agent_attempts})` };
  const missing = node.depends_on.filter((d) => !SATISFIED.includes((st.steps[d] || {}).status));
  if (missing.length) return { ready: false, reason: `waiting for: ${missing.join(', ')}` };
  if (node.requires === 'validation_pass') {
    const last = st.validation.last;
    if (!last || last.overall !== 'PASS' || (st.steps['validator'] || {}).status !== 'validated')
      return { ready: false, reason: 'requires a PASS verdict from the validator (run state.js verdict)' };
  }
  if (node.requires === 'approval') {
    const ap = approvalStatus(id, st);
    if (!ap.valid) return { ready: false, reason: `requires verified human approval: ${ap.reason}` };
  }
  return { ready: true, reason: 'ready' };
}

/** Answers captured before a run exists (requirement gathering). Imported and cleared by state.js init. */
const PENDING_PATH = path.join(RUNS, '.pending-answers.jsonl');
function appendPendingAnswer(ev) {
  fs.mkdirSync(RUNS, { recursive: true });
  fs.appendFileSync(PENDING_PATH, JSON.stringify({ ts: nowIso(), ...ev }) + '\n');
}
function takePendingAnswers() {
  if (!fs.existsSync(PENDING_PATH)) return [];
  const list = fs.readFileSync(PENDING_PATH, 'utf8').split(/\r?\n/).filter(Boolean).map((l) => { try { return JSON.parse(l); } catch { return null; } }).filter(Boolean);
  fs.unlinkSync(PENDING_PATH);
  return list;
}

/** Runs that are still in progress (anything except completed / failed). Used by the gate's strict shell mode. */
function activeRuns() {
  if (!fs.existsSync(RUNS)) return [];
  const out = [];
  for (const d of fs.readdirSync(RUNS)) {
    if (d.startsWith('.') || !runExists(d)) continue;
    try {
      const st = deriveState(d);
      if (!['completed', 'failed'].includes(st.status)) out.push(d);
    } catch { out.push(d); }
  }
  return out;
}

// ---------- artifact lint / verdict ----------
function parseFrontmatter(content) {
  const m = /^---\r?\n([\s\S]*?)\r?\n---/.exec(content);
  if (!m) return null;
  const fm = {};
  for (const line of m[1].split(/\r?\n/)) {
    const i = line.indexOf(':');
    if (i > 0) fm[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
  return fm;
}
function parseVerdict(content) {
  const blocks = [...content.matchAll(/```json\s*\r?\n([\s\S]*?)```/g)];
  if (!blocks.length) return { ok: false, error: 'no ```json verdict block found' };
  try {
    const v = JSON.parse(blocks[blocks.length - 1][1]);
    if (!['PASS', 'FAIL'].includes(v.overall)) return { ok: false, error: 'verdict.overall must be PASS or FAIL' };
    if (!Array.isArray(v.failures)) return { ok: false, error: 'verdict.failures must be an array' };
    for (const f of v.failures) if (!f.agent || !f.reason) return { ok: false, error: 'each failure needs agent and reason' };
    if (v.overall === 'FAIL' && !v.failures.length) return { ok: false, error: 'FAIL verdict must list at least one failure' };
    if (v.overall === 'PASS' && v.failures.length) return { ok: false, error: 'PASS verdict must not list failures' };
    return { ok: true, verdict: v };
  } catch (e) {
    return { ok: false, error: `verdict block is not valid JSON: ${e.message}` };
  }
}
const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
/** Structural lint: frontmatter keys + fixed H2 skeleton. Intentionally light (spec deprioritizes deterministic artifact checks). */
function lintArtifact(content, expected = {}) {
  const errors = [];
  const fm = parseFrontmatter(content);
  if (!fm) errors.push('missing YAML frontmatter block (--- ... ---) at the top');
  else {
    for (const k of FRONTMATTER_KEYS) if (!(k in fm)) errors.push(`frontmatter missing key: ${k}`);
    if (expected.agent && fm.agent && fm.agent !== expected.agent) errors.push(`frontmatter agent "${fm.agent}" does not match owner "${expected.agent}"`);
    if (expected.run_id && fm.run_id && fm.run_id !== expected.run_id) errors.push(`frontmatter run_id "${fm.run_id}" does not match run "${expected.run_id}"`);
  }
  const h2s = expected.role === 'synthesis' ? LEARNING_PATH_H2 : ARTIFACT_H2;
  for (const h of h2s) if (!new RegExp(`^##\\s+${escapeRe(h)}\\s*$`, 'm').test(content)) errors.push(`missing section: ## ${h}`);
  if (expected.role === 'gate') {
    const v = parseVerdict(content);
    if (!v.ok) errors.push(`validator verdict: ${v.error}`);
  }
  return errors;
}

module.exports = {
  ROOT, RUNS, GRAPH_PATH, ARTIFACT_H2, LEARNING_PATH_H2, FRONTMATTER_KEYS, APPROVE_LABEL, REJECT_LABEL,
  nowIso, toPosix, sha256, sha256File, loadGraph, runDir, eventsPath, runExists, readEvents, appendEvent,
  currentRunId, setCurrentRunId, locateInRuns, runIdFromPrompt, resolveRunId, ownerOfArtifact, downstream,
  buildSubgraph, answerDecision, extractAnswerLabels, latestDecisionAnswer, approvalStatus, deriveState,
  runnable, readiness, parseFrontmatter, parseVerdict, lintArtifact, activeRuns, appendPendingAnswer, takePendingAnswers,
};
