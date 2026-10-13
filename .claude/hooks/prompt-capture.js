#!/usr/bin/env node
'use strict';
/**
 * UserPromptSubmit hook: deterministic capture of approval decisions typed by the human as a command.
 *   /build-learning-path --approve <run-id>
 *   /build-learning-path --reject <run-id> <free-text feedback>
 * The raw prompt (not the model's interpretation) is stored as a `user_answer` event, which
 * `state.js approve` and the PreToolUse gate require before any final output can be produced.
 * Also records `--resume <run-id>` requests. Always exits 0.
 */
const fs = require('fs');
const L = require('../skills/workflow-state/scripts/lib.js');

let input = {};
try { input = JSON.parse(fs.readFileSync(0, 'utf8') || '{}'); } catch { input = {}; }
const prompt = String(input.prompt || '');
const context = (text) => process.stdout.write(JSON.stringify({ hookSpecificOutput: { hookEventName: 'UserPromptSubmit', additionalContext: text } }));

try {
  const m = /^\s*\/build-learning-path\s+--(approve|reject|resume)\s+([A-Za-z0-9._-]+)\s*([\s\S]*)$/.exec(prompt);
  if (m) {
    const [, verb, runId, rest] = m;
    if (!L.runExists(runId)) context(`[workflow] run "${runId}" was not found under runs/. Use "node .claude/skills/workflow-state/scripts/state.js list" to see runs.`);
    else if (verb === 'resume') {
      L.appendEvent(runId, { type: 'resume_requested', raw: prompt.slice(0, 500) });
      L.setCurrentRunId(runId);
    } else {
      const decision = verb === 'approve' ? 'approved' : 'rejected';
      L.appendEvent(runId, { type: 'user_answer', source: 'command', decision, feedback: rest.trim() || null, raw: prompt.slice(0, 2000) });
      L.setCurrentRunId(runId);
      context(`[workflow] captured human decision "${decision}" for run ${runId} from the typed command (deterministic). The coordinator must now run: node .claude/skills/workflow-state/scripts/state.js approve ${runId} --decision ${decision}${rest.trim() ? ' --scope <agents to re-run>' : ''}`);
    }
  }
} catch (e) {
  process.stderr.write(`[workflow prompt-capture] ${e.message}\n`);
}
process.exit(0);
