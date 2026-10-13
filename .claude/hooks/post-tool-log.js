#!/usr/bin/env node
'use strict';
/**
 * PostToolUse logger: appends one event per relevant tool call to runs/<id>/events.jsonl.
 *  Write/Edit on artifacts/  -> structural lint (frontmatter + fixed H2s, verdict block for the validator),
 *                               `artifact_written` event with sha256; lint errors are returned as additionalContext.
 *  Write/Edit on output/     -> `output_written`
 *  Agent                     -> `agent_finished` (with the subagent's short summary)
 *  AskUserQuestion           -> `user_answer` (raw answer captured deterministically; the approval check reads it)
 *  mcp__fetch__* / WebSearch / WebFetch -> `mcp_call` / `web_search` / `web_fetch` (evidence of external data use)
 * Always exits 0; never blocks.
 */
const fs = require('fs');
const path = require('path');
const L = require('../skills/workflow-state/scripts/lib.js');

let input = {};
try { input = JSON.parse(fs.readFileSync(0, 'utf8') || '{}'); } catch { input = {}; }
const tool = input.tool_name || '';
const ti = input.tool_input || {};
const tr = input.tool_response;
const agentType = input.agent_type || null;
const trunc = (v, n) => { const s = typeof v === 'string' ? v : JSON.stringify(v); return s && s.length > n ? s.slice(0, n) + '…' : s; };
const context = (text) => { process.stdout.write(JSON.stringify({ hookSpecificOutput: { hookEventName: 'PostToolUse', additionalContext: text } })); };
const safe = (fn) => { try { fn(); } catch (e) { process.stderr.write(`[workflow log] ${e.message}\n`); } process.exit(0); };

if (tool === 'Write' || tool === 'Edit' || tool === 'MultiEdit') {
  safe(() => {
    const loc = L.locateInRuns(ti.file_path);
    if (!loc || !L.runExists(loc.runId)) return;
    const { runId, rel } = loc;
    const abs = path.join(L.runDir(runId), rel);
    if (!fs.existsSync(abs)) return;
    const hash = L.sha256File(abs);
    if (rel.startsWith('artifacts/')) {
      const st = L.deriveState(runId);
      const owner = L.ownerOfArtifact(rel, st.subgraph) || agentType;
      const node = (st.subgraph || {})[owner] || {};
      const errors = L.lintArtifact(fs.readFileSync(abs, 'utf8'), { agent: owner, run_id: runId, role: node.role });
      L.appendEvent(runId, { type: 'artifact_written', agent: owner, artifact: rel, hash, lint_ok: errors.length === 0, lint_errors: errors, agent_type: agentType, tool });
      if (errors.length) context(`Artifact lint FAILED for ${rel}:\n- ${errors.join('\n- ')}\nFix the file so it follows the artifact-format skill before finishing; the step is not marked as written until the lint passes.`);
    } else if (rel.startsWith('output/')) {
      L.appendEvent(runId, { type: 'output_written', artifact: rel, hash, agent_type: agentType, tool });
    } else if (rel === 'input.md') {
      L.appendEvent(runId, { type: 'input_written', hash });
    }
  });
}

if (tool === 'Agent') {
  safe(() => {
    const sub = ti.subagent_type || '';
    if (!L.loadGraph().agents[sub]) return;
    const runId = L.runIdFromPrompt(ti.prompt) || L.currentRunId();
    if (!runId || !L.runExists(runId)) return;
    let summary = '';
    if (typeof tr === 'string') summary = tr;
    else if (tr && Array.isArray(tr.content)) summary = tr.content.map((c) => c.text || '').join('\n');
    else if (tr) summary = JSON.stringify(tr);
    L.appendEvent(runId, { type: 'agent_finished', agent: sub, summary: trunc(summary.trim(), 600) });
  });
}

if (tool === 'AskUserQuestion') {
  safe(() => {
    const qText = (ti.questions || []).map((q) => `${q.header || ''} ${q.question || ''}`).join(' ');
    const m = /\brun[-_ ]?id:?\s*([A-Za-z0-9._-]+)/i.exec(qText) || /runs[\\/]([A-Za-z0-9._-]+)/.exec(qText);
    const named = m && L.runExists(m[1]) ? m[1] : null;
    const cur = L.currentRunId();
    const curActive = cur && L.runExists(cur) && L.activeRuns().includes(cur) ? cur : null;
    const runId = named || curActive;
    const labels = L.extractAnswerLabels(tr);
    const answers = tr && typeof tr === 'object' && tr.answers && typeof tr.answers === 'object' ? tr.answers : null;
    const headers = (ti.questions || []).map((q) => q.header || '');
    if (!runId) {
      // Requirement gathering happens before the run exists: buffer the raw answers; state.js init imports them.
      L.appendPendingAnswer({ type: 'requirements_answer', source: 'ask_user_question', headers, answers, raw: answers ? null : trunc(tr, 4000) });
      return;
    }
    L.appendEvent(runId, { type: 'user_answer', source: 'ask_user_question', labels, headers, answers, raw: answers ? null : trunc(tr, 4000) });
  });
}

if (tool.startsWith('mcp__fetch__') || tool === 'WebSearch' || tool === 'WebFetch') {
  safe(() => {
    const runId = L.currentRunId();
    if (!runId || !L.runExists(runId)) return;
    const type = tool.startsWith('mcp__') ? 'mcp_call' : tool === 'WebSearch' ? 'web_search' : 'web_fetch';
    L.appendEvent(runId, { type, tool, agent_type: agentType, url: ti.url || null, query: ti.query || null });
  });
}

process.exit(0);
