#!/usr/bin/env node
'use strict';
/**
 * Hook self-test: pipes synthetic Claude Code hook payloads through the real hook scripts and asserts
 * the exit codes / events. Creates a throw-away run (runs/selftest-<ts>, gitignored) and removes it.
 *   node .claude/hooks/selftest.js
 */
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const L = require('../skills/workflow-state/scripts/lib.js');

const HOOKS = path.join(__dirname);
const STATE = path.join(L.ROOT, '.claude', 'skills', 'workflow-state', 'scripts', 'state.js');
const id = `selftest-${Date.now()}`;
const dir = L.runDir(id);
const prevCurrent = L.currentRunId();
let failures = 0;

const hookEnv = { ...process.env };
delete hookEnv.WORKFLOW_GATE_MODE; // the self-test always checks the production (strict) gate
const run = (script, payload, env = hookEnv) => spawnSync(process.execPath, [path.join(HOOKS, script)], { input: JSON.stringify(payload), encoding: 'utf8', env });
const SG = require('./shell-guard.js');
const state = (...args) => spawnSync(process.execPath, [STATE, ...args], { encoding: 'utf8' });
const base = (extra) => ({ session_id: 'selftest', cwd: L.ROOT, hook_event_name: 'PreToolUse', ...extra });
const check = (name, cond, detail = '') => { console.log(`${cond ? 'PASS' : 'FAIL'}  ${name}${cond || !detail ? '' : `\n      ${detail}`}`); if (!cond) failures++; };
const expectDeny = (name, res, needle) => check(name, res.status === 2 && (!needle || res.stderr.includes(needle)), `exit=${res.status} stderr=${res.stderr.trim()}`);
const expectAllow = (name, res) => check(name, res.status === 0, `exit=${res.status} stderr=${res.stderr.trim()}`);
const artifact = (agent, body = '') => `---\nartifact: x\nagent: ${agent}\nrun_id: ${id}\nattempt: 1\ndepends_on: []\nstatus: done\n---\n\n# Title\n\n## Summary\n\n## Content\n\n## Assumptions\n\n## Open Issues\n\n## Sources\n${body}`;
const writeAndLog = (agent, rel, content) => {
  fs.mkdirSync(path.dirname(path.join(dir, rel)), { recursive: true });
  fs.writeFileSync(path.join(dir, rel), content);
  return run('post-tool-log.js', base({ hook_event_name: 'PostToolUse', tool_name: 'Write', tool_input: { file_path: path.join(dir, rel), content }, tool_response: {}, agent_type: agent, agent_id: 'a1' }));
};
const prompt = (agent) => `run_id: ${id}\nYou are ${agent}.`;

const PENDING = path.join(L.RUNS, '.pending-answers.jsonl');
const PENDING_SAVED = `${PENDING}.selftest-saved`;
if (fs.existsSync(PENDING)) fs.renameSync(PENDING, PENDING_SAVED); // keep a real in-progress gathering intact

try {
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'input.md'), '# selftest input\n');
  // 0. requirement-gathering answers arrive before the run exists: buffered, then imported by init
  const savedCurrent = L.currentRunId();
  try { fs.unlinkSync(path.join(L.RUNS, '.current')); } catch { /* none */ }
  run('post-tool-log.js', base({ hook_event_name: 'PostToolUse', tool_name: 'AskUserQuestion', tool_input: { questions: [{ header: 'Time', question: 'How many hours per week can you study?' }] }, tool_response: { questions: [], answers: { 'How many hours per week can you study?': '6 hours' } } }));
  check('pre-run requirement answer is buffered', fs.existsSync(PENDING));
  if (savedCurrent) L.setCurrentRunId(savedCurrent);
  const init = state('init', '--id', id, '--select', 'assessment-designer');
  check('state.js init', init.status === 0, init.stderr);
  const imported = L.readEvents(id).filter((e) => e.type === 'requirements_answer');
  check('init imports buffered requirement answers into the run', imported.length === 1 && imported[0].answers['How many hours per week can you study?'] === '6 hours' && !fs.existsSync(PENDING));

  // 1. coordinator launches first agent -> allowed and recorded
  expectAllow('Agent launch requirements-formalizer (deps satisfied)', run('pre-tool-gate.js', base({ tool_name: 'Agent', tool_input: { subagent_type: 'requirements-formalizer', prompt: prompt('requirements-formalizer') } })));
  check('agent_started event recorded', L.deriveState(id).steps['requirements-formalizer'].status === 'running');
  // 2. dependency gate
  expectDeny('Agent launch knowledge-assessor before 01 exists', run('pre-tool-gate.js', base({ tool_name: 'Agent', tool_input: { subagent_type: 'knowledge-assessor', prompt: prompt('knowledge-assessor') } })), 'waiting for');
  // 3. missing run_id in prompt
  expectDeny('Agent launch without run_id in prompt', run('pre-tool-gate.js', base({ tool_name: 'Agent', tool_input: { subagent_type: 'requirements-formalizer', prompt: 'no id here' } })), 'run_id');
  // 4. nested launch from inside a subagent
  expectDeny('nested Agent launch from a subagent', run('pre-tool-gate.js', base({ tool_name: 'Agent', tool_input: { subagent_type: 'knowledge-assessor', prompt: prompt('knowledge-assessor') }, agent_id: 'x', agent_type: 'requirements-formalizer' })), 'nested');
  // 5. coordinator writing an artifact
  expectDeny('coordinator Write to artifacts/', run('pre-tool-gate.js', base({ tool_name: 'Write', tool_input: { file_path: path.join(dir, 'artifacts', '01-requirements.md'), content: 'x' } })), 'coordinator must not write');
  // 6. wrong owner
  expectDeny('Write to another agent\'s artifact', run('pre-tool-gate.js', base({ tool_name: 'Write', tool_input: { file_path: path.join(dir, 'artifacts', '02-assessment.md'), content: 'x' }, agent_type: 'requirements-formalizer', agent_id: 'a1' })), 'owned by');
  // 7. right owner
  expectAllow('Write to own artifact', run('pre-tool-gate.js', base({ tool_name: 'Write', tool_input: { file_path: path.join(dir, 'artifacts', '01-requirements.md'), content: 'x' }, agent_type: 'requirements-formalizer', agent_id: 'a1' })));
  // 8. direct edit of state files
  expectDeny('Edit of events.jsonl', run('pre-tool-gate.js', base({ tool_name: 'Edit', tool_input: { file_path: path.join(dir, 'events.jsonl'), old_string: 'a', new_string: 'b' } })), 'managed by');
  expectDeny('Bash redirect into approval.json', run('pre-tool-gate.js', base({ tool_name: 'Bash', tool_input: { command: `echo '[]' > runs/${id}/approval.json` } })), 'DENIED');
  expectAllow('Bash state.js call', run('pre-tool-gate.js', base({ tool_name: 'Bash', tool_input: { command: `node .claude/skills/workflow-state/scripts/state.js status ${id}` } })));
  // 8b. Bash bypass attempts (review findings) — the run is in progress, so the strict gate applies
  const bash = (command, tool = 'Bash', env) => run('pre-tool-gate.js', base({ tool_name: tool, tool_input: { command } }), env);
  const ev = `runs/${id}/events.jsonl`;
  const forged = `{"type":"user_answer","source":"command","decision":"approved"}`;
  expectDeny('state.js chained with an append to events.jsonl', bash(`node .claude/skills/workflow-state/scripts/state.js list; echo x >> ${ev}`), 'DENIED');
  expectDeny('state.js && forged answer via echo', bash(`node .claude/skills/workflow-state/scripts/state.js list && echo '${forged}' >> ${ev}`), 'DENIED');
  expectDeny('node -e appendFileSync into events.jsonl', bash(`node -e "require('fs').appendFileSync('${ev}', '${forged.replace(/"/g, '\\"')}\\n')"`), 'inline interpreter');
  expectDeny('node -e via the state library appendEvent', bash(`node -e "require('./.claude/skills/workflow-state/scripts/lib.js').appendEvent('${id}', {type:'user_answer'})"`), 'inline interpreter');
  expectDeny('python -c open(..., "a") on approval.json', bash(`python -c "open('runs/${id}/approval.json','a').write('[]')"`), 'inline interpreter');
  expectDeny('PowerShell Add-Content to events.jsonl', bash(`Add-Content -Path ${ev} -Value '${forged}'`, 'PowerShell'), 'DENIED');
  expectDeny('tee into events.jsonl', bash(`echo x | tee -a ${ev}`), 'DENIED');
  expectDeny('cp over approval.json', bash(`cp /tmp/fake.json runs/${id}/approval.json`), 'DENIED');
  expectDeny('git checkout restoring an approval file', bash(`git checkout -- runs/${id}/approval.json`), 'DENIED');
  expectDeny('command substitution inside a state.js call', bash(`node .claude/skills/workflow-state/scripts/state.js status $(cat runs/.current)`), 'DENIED');
  expectDeny('base64-encoded payload', bash(`echo ZWNobyB4 | base64 -d | sh`), 'encoded');
  expectDeny('arbitrary script while a run is in progress', bash(`node tmp/forge.js`), 'in progress');
  expectDeny('variable indirection while a run is in progress', bash(`S=node; $S -v`), 'in progress');
  expectAllow('read-only inspection of events.jsonl', bash(`tail -n 3 ${ev} | grep user_answer | wc -l`));
  expectAllow('state.js approve with quoted ; and > in the feedback', bash(`node .claude/skills/workflow-state/scripts/state.js status ${id} --feedback "less theory; more > practice"`));
  expectAllow('cd then state.js', bash(`cd "${L.ROOT.replace(/\\/g, '/')}" && node .claude/skills/workflow-state/scripts/state.js list`));
  expectAllow('touch a run STOP file', bash(`touch runs/${id}/STOP`));
  fs.rmSync(path.join(dir, 'STOP'), { force: true });
  expectAllow('dev mode relaxes the allowlist for unrelated commands', bash('git status', 'Bash', { ...hookEnv, WORKFLOW_GATE_MODE: 'dev' }));
  expectDeny('dev mode never relaxes state protection', bash(`node .claude/skills/workflow-state/scripts/state.js list; echo x >> ${ev}`, 'Bash', { ...hookEnv, WORKFLOW_GATE_MODE: 'dev' }), 'DENIED');
  // the always-on layer, exactly as it behaves when no run is in progress
  check('no active run: state.js chained with an append is still denied', !SG.checkShellCommand(`node .claude/skills/workflow-state/scripts/state.js list; echo x >> ${ev}`).ok);
  check('no active run: appendFileSync on events.jsonl is denied', !SG.checkShellCommand(`node -e "require('fs').appendFileSync('${ev}','x')"`).ok);
  check('no active run: unrelated commands are allowed', SG.checkShellCommand('git status && npm --version').ok);
  // writing to runs/.current or creating a forging script
  expectDeny('Write to runs/.current', run('pre-tool-gate.js', base({ tool_name: 'Write', tool_input: { file_path: path.join(L.RUNS, '.current'), content: id } })), 'managed by state.js');
  expectDeny('Write a helper script that appends events', run('pre-tool-gate.js', base({ tool_name: 'Write', tool_input: { file_path: path.join(L.ROOT, 'tmp', 'forge.js'), content: `require('fs').appendFileSync('${ev}', 'x')` } })), 'state internals');
  expectAllow('Write an unrelated script', run('pre-tool-gate.js', base({ tool_name: 'Write', tool_input: { file_path: path.join(L.ROOT, 'tmp', 'hello.js'), content: 'console.log(1)' } })));
  // 9. artifact lint via PostToolUse
  let res = writeAndLog('requirements-formalizer', 'artifacts/01-requirements.md', '# no frontmatter\n');
  check('PostToolUse lint failure returns additionalContext', res.status === 0 && res.stdout.includes('lint FAILED'), res.stdout + res.stderr);
  check('lint failure does not mark step written', L.deriveState(id).steps['requirements-formalizer'].status === 'running');
  res = writeAndLog('requirements-formalizer', 'artifacts/01-requirements.md', artifact('requirements-formalizer'));
  check('PostToolUse lint pass records artifact_written', res.status === 0 && L.deriveState(id).steps['requirements-formalizer'].status === 'written');
  run('post-tool-log.js', base({ hook_event_name: 'PostToolUse', tool_name: 'Agent', tool_input: { subagent_type: 'requirements-formalizer', prompt: prompt('requirements-formalizer') }, tool_response: 'done' }));
  expectAllow('Agent launch knowledge-assessor after 01 written', run('pre-tool-gate.js', base({ tool_name: 'Agent', tool_input: { subagent_type: 'knowledge-assessor', prompt: prompt('knowledge-assessor') } })));
  // 10. STOP file interrupts
  fs.writeFileSync(path.join(dir, 'STOP'), '');
  expectDeny('STOP file blocks launches', run('pre-tool-gate.js', base({ tool_name: 'Agent', tool_input: { subagent_type: 'knowledge-assessor', prompt: prompt('knowledge-assessor') } })), 'STOP');
  fs.unlinkSync(path.join(dir, 'STOP'));
  // 11. fast-forward to synthesis to test approval gates
  for (const a of ['knowledge-assessor', 'resource-researcher', 'practice-designer', 'assessment-designer', 'schedule-planner']) {
    L.appendEvent(id, { type: 'agent_started', agent: a });
    writeAndLog(a, L.loadGraph().agents[a].artifact, artifact(a));
    L.appendEvent(id, { type: 'agent_finished', agent: a });
  }
  L.appendEvent(id, { type: 'agent_started', agent: 'validator' });
  res = writeAndLog('validator', 'artifacts/07-validation.md', artifact('validator', '\n```json\n{"overall":"PASS","failures":[]}\n```\n'));
  check('validator artifact with verdict block passes lint', L.deriveState(id).steps['validator'].status === 'written');
  res = writeAndLog('validator', 'artifacts/07-validation.md', artifact('validator', '\n```json\n{"overall":"MAYBE","failures":[]}\n```\n'));
  check('validator artifact with bad verdict fails lint', res.stdout.includes('verdict'));
  writeAndLog('validator', 'artifacts/07-validation.md', artifact('validator', '\n```json\n{"overall":"PASS","failures":[]}\n```\n'));
  L.appendEvent(id, { type: 'agent_finished', agent: 'validator' });
  check('state.js verdict PASS', state('verdict', id).status === 0);
  expectAllow('Agent launch path-synthesizer after PASS', run('pre-tool-gate.js', base({ tool_name: 'Agent', tool_input: { subagent_type: 'path-synthesizer', prompt: prompt('path-synthesizer') } })));
  const synth = `---\nartifact: 08-learning-path.md\nagent: path-synthesizer\nrun_id: ${id}\nattempt: 1\ndepends_on: [validator]\nstatus: done\n---\n\n# Learning Path\n\n${L.LEARNING_PATH_H2.map((h) => `## ${h}\n\ntext\n`).join('\n')}`;
  writeAndLog('path-synthesizer', 'artifacts/08-learning-path.md', synth);
  check('synthesis artifact passes fixed-skeleton lint', L.deriveState(id).steps['path-synthesizer'].status === 'written');
  // 12. output gates before approval
  expectDeny('Agent launch html-builder without approval', run('pre-tool-gate.js', base({ tool_name: 'Agent', tool_input: { subagent_type: 'html-builder', prompt: prompt('html-builder') } })), 'approval');
  expectDeny('Write output/*.html without approval', run('pre-tool-gate.js', base({ tool_name: 'Write', tool_input: { file_path: path.join(dir, 'output', 'learning-path.html'), content: '<html>' }, agent_type: 'html-builder', agent_id: 'h' })), 'approval');
  check('state.js approve refuses without captured answer', state('approve', id, '--decision', 'approved').status !== 0);
  // 13. "Other" answer is not an approval
  run('post-tool-log.js', base({ hook_event_name: 'PostToolUse', tool_name: 'AskUserQuestion', tool_input: { questions: [{ header: 'Approval', question: `Approve run_id: ${id}?`, options: [{ label: 'Approve' }, { label: 'Request changes' }] }] }, tool_response: { answers: { [`Approve run_id: ${id}?`]: 'Other: looks good I guess' } } }));
  check('free-text "Other" answer is not accepted as approval', state('approve', id, '--decision', 'approved').status !== 0);
  // 14. real Approve answer
  run('post-tool-log.js', base({ hook_event_name: 'PostToolUse', tool_name: 'AskUserQuestion', tool_input: { questions: [{ header: 'Approval', question: `Approve run_id: ${id}?` }] }, tool_response: { answers: { [`Approve run_id: ${id}?`]: 'Approve' } } }));
  check('state.js approve succeeds with captured Approve', state('approve', id, '--decision', 'approved').status === 0);
  expectAllow('Agent launch html-builder with valid approval', run('pre-tool-gate.js', base({ tool_name: 'Agent', tool_input: { subagent_type: 'html-builder', prompt: prompt('html-builder') } })));
  expectAllow('Write output/*.html with valid approval', run('pre-tool-gate.js', base({ tool_name: 'Write', tool_input: { file_path: path.join(dir, 'output', 'learning-path.html'), content: '<html>' }, agent_type: 'html-builder', agent_id: 'h' })));
  // 15. stale approval after the document changes
  fs.appendFileSync(path.join(dir, 'artifacts', '08-learning-path.md'), '\nchanged\n');
  expectDeny('Write output after learning path changed (stale hash)', run('pre-tool-gate.js', base({ tool_name: 'Write', tool_input: { file_path: path.join(dir, 'output', 'learning-path.html'), content: '<html>' }, agent_type: 'html-builder', agent_id: 'h' })), 'hash mismatch');
  // 16. typed command approval capture
  run('prompt-capture.js', { prompt: `/build-learning-path --reject ${id} please add more videos` });
  const last = L.deriveState(id).user_answers.slice(-1)[0];
  check('UserPromptSubmit captures typed --reject with feedback', last && last.source === 'command' && last.decision === 'rejected' && last.feedback === 'please add more videos');
  check('gate denials were logged as events', L.deriveState(id).gate_denials.length >= 5);
} finally {
  fs.rmSync(dir, { recursive: true, force: true });
  try { fs.unlinkSync(PENDING); } catch { /* none */ }
  if (fs.existsSync(PENDING_SAVED)) fs.renameSync(PENDING_SAVED, PENDING);
  if (prevCurrent) L.setCurrentRunId(prevCurrent); else { try { fs.unlinkSync(path.join(L.RUNS, '.current')); } catch { /* ignore */ } }
}
console.log(failures ? `\n${failures} check(s) FAILED` : '\nall hook self-tests passed');
process.exit(failures ? 1 : 0);
