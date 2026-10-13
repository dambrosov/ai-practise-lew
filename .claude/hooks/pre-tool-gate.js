#!/usr/bin/env node
'use strict';
/**
 * PreToolUse gate (deterministic enforcement of the workflow rules).
 * Exit 0 = allow, exit 2 = deny (stderr is fed back to the model).
 *
 *  Agent      -> only the coordinator (main session) may launch workflow agents; the agent must be
 *                runnable per the persisted state (dependencies satisfied, attempt limit, validator PASS
 *                for the synthesizer, VERIFIED HUMAN APPROVAL for html-builder); STOP file = interrupted.
 *  Write/Edit -> artifacts are written only by their owning subagent (never by the coordinator);
 *                output/ requires verified approval; state files are never edited directly.
 *  Bash       -> no direct mutation of state files, artifacts (from the coordinator) or output/ without approval.
 */
const fs = require('fs');
const path = require('path');
const L = require('../skills/workflow-state/scripts/lib.js');

let input = {};
try { input = JSON.parse(fs.readFileSync(0, 'utf8') || '{}'); } catch { input = {}; }
const tool = input.tool_name || '';
const ti = input.tool_input || {};
const agentType = input.agent_type || null; // present only when the call comes from inside a subagent
const agentId = input.agent_id || null;

function deny(runId, reason, extra = {}) {
  if (runId && L.runExists(runId)) {
    try { L.appendEvent(runId, { type: 'gate_denied', tool, agent_type: agentType, reason, ...extra }); } catch { /* never block on logging */ }
  }
  process.stderr.write(`[workflow gate] DENIED ${tool}: ${reason}\n`);
  process.exit(2);
}
const allow = () => process.exit(0);

const SG = require('./shell-guard.js');
const STATE_FILES = /(events\.jsonl|approval\.json|state\.json|plan\.md)$/;
const MUTATING = /(^|[^<2&])>|\btee\b|\brm\b|\bdel\b|\bmv\b|\bcp\b|\bsed\s+-i|Remove-Item|Set-Content|Out-File|Add-Content|\btruncate\b|\bunlink\b|writeFile|appendFile|createWriteStream|open\s*\(/;
const SCRIPT_EXT = /\.(js|cjs|mjs|ts|py|ps1|psm1|sh|bash|bat|cmd|rb|pl)$/i;
const FORGERY = /appendEvent|setCurrentRunId|events\.jsonl|approval\.json|workflow-state[\\/]+scripts[\\/]+lib/;

if (tool === 'Agent') {
  const sub = ti.subagent_type || '';
  const graph = L.loadGraph();
  if (!graph.agents[sub]) allow(); // not a workflow agent: the gate has no opinion
  if (agentId || agentType) deny(L.runIdFromPrompt(ti.prompt) || L.currentRunId(), `nested launch of ${sub} from inside subagent "${agentType || agentId}"; only the coordinator launches workflow agents (hub-and-spoke)`, { agent: sub });
  const runId = L.runIdFromPrompt(ti.prompt);
  if (!runId) deny(L.currentRunId(), `the prompt for ${sub} must start with "run_id: <run-id>" so that hooks can attribute its work`, { agent: sub });
  if (!L.runExists(runId)) deny(null, `run "${runId}" does not exist; run state.js init first`);
  if (fs.existsSync(path.join(L.runDir(runId), 'STOP'))) deny(runId, `STOP file present in runs/${runId}: execution interrupted. Remove the file and resume with "state.js status ${runId} --resume"`, { agent: sub });
  const st = L.deriveState(runId);
  const r = L.readiness(runId, st, sub, graph);
  if (!r.ready) deny(runId, `${sub} cannot run now: ${r.reason}`, { agent: sub });
  L.appendEvent(runId, { type: 'agent_started', agent: sub, attempt: st.steps[sub].attempts + 1 });
  allow();
}

if (tool === 'Write' || tool === 'Edit' || tool === 'MultiEdit' || tool === 'NotebookEdit') {
  const target = ti.file_path || ti.notebook_path || '';
  const absTarget = path.isAbsolute(target) ? target : path.join(L.ROOT, target);
  const relToRuns = L.toPosix(path.relative(L.RUNS, absTarget));
  if (!relToRuns.startsWith('..') && relToRuns.startsWith('.')) deny(L.currentRunId(), `runs/${relToRuns} is managed by state.js; never write it directly`);
  const loc = L.locateInRuns(target);
  if (!loc) {
    // Block the "write a script, then run it" route to forging state: helper scripts outside .claude/
    // must not reference the event log, approval records or the state library.
    const relToRoot = L.toPosix(path.relative(L.ROOT, absTarget));
    const inClaudeDir = relToRoot === '.claude' || relToRoot.startsWith('.claude/');
    const body = [ti.content, ti.new_string, ...((ti.edits || []).map((e) => e.new_string))].filter(Boolean).join('\n');
    if (!inClaudeDir && SCRIPT_EXT.test(target) && FORGERY.test(body)) {
      deny(L.currentRunId(), `script ${relToRoot} references workflow state internals (event log, approval records, state library); only state.js and the hooks may write state`);
    }
    allow();
  }
  const { runId, rel } = loc;
  if (STATE_FILES.test(rel) && !rel.startsWith('artifacts/')) deny(runId, `${rel} is managed by state.js and the hooks; never edit it directly`);
  if (rel.startsWith('artifacts/')) {
    if (!L.runExists(runId)) deny(null, `run "${runId}" does not exist; run state.js init first`);
    const st = L.deriveState(runId);
    if (!agentType) deny(runId, `the coordinator must not write artifacts itself (${rel}); delegate to the owning subagent`);
    const owner = L.ownerOfArtifact(rel, st.subgraph);
    if (!owner) deny(runId, `${rel} is not an artifact owned by any selected agent of this run`);
    if (owner !== agentType) deny(runId, `${rel} is owned by "${owner}", not by "${agentType}" (explicit artifact ownership)`);
    allow();
  }
  if (rel.startsWith('output/')) {
    if (!L.runExists(runId)) deny(null, `run "${runId}" does not exist`);
    const st = L.deriveState(runId);
    const ap = L.approvalStatus(runId, st);
    if (!ap.valid) deny(runId, `final output ${rel} requires deterministically verified human approval: ${ap.reason}`);
    if (agentType && agentType !== 'html-builder') deny(runId, `output/ is owned by html-builder, not by "${agentType}"`);
    allow();
  }
  if (!rel.includes('/') && !['input.md', 'STOP', 'notes.md'].includes(rel)) deny(runId, `unexpected file "${rel}" in the run root; only input.md, notes.md and STOP may be written there`);
  allow();
}

if (tool === 'Bash' || tool === 'PowerShell') {
  const cmd = ti.command || '';
  const active = L.activeRuns();
  const strict = active.length > 0 && process.env.WORKFLOW_GATE_MODE !== 'dev';
  const verdict = SG.checkShellCommand(cmd, { strict });
  if (!verdict.ok) deny(L.resolveRunId({ command: cmd }) || active[0] || null, verdict.reason);
  const segments = verdict.analysis.segments;
  if (segments.length && segments.every((s) => SG.isStateCall(s))) allow();
  const touchesRuns = /\bruns[\\/]/.test(cmd);
  if (touchesRuns && /[\\/]output[\\/]/.test(cmd) && MUTATING.test(cmd)) {
    const runId = L.resolveRunId({ command: cmd });
    const st = runId && L.runExists(runId) ? L.deriveState(runId) : null;
    const ap = st ? L.approvalStatus(runId, st) : { valid: false, reason: 'unknown run' };
    if (!ap.valid) deny(runId, `writing final output from Bash requires deterministically verified human approval: ${ap.reason}`);
  }
  if (touchesRuns && /[\\/]artifacts[\\/]/.test(cmd) && MUTATING.test(cmd) && !agentType) {
    deny(L.resolveRunId({ command: cmd }), 'the coordinator must not modify artifacts from Bash; delegate to the owning subagent (state.js writes revision/failure reports itself)');
  }
  allow();
}

allow();
