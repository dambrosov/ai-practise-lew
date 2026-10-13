'use strict';
/**
 * Shell command analysis for the PreToolUse gate (Bash and PowerShell tools).
 *
 * Two layers:
 *  1. STRICT mode, while any run is in progress (status not completed/failed): every segment of the
 *     command must match a small positive allowlist (state.js, selftest.js, read-only inspection,
 *     STOP file handling, cd). Everything else is denied. A denylist can never enumerate all ways of
 *     writing a file (appendFileSync, open(..., 'a'), Out-File, ...), an allowlist can.
 *  2. Always: a segment that mentions protected state (events.jsonl, approval.json, state.json, plan.md,
 *     runs/.current, the state library) must be read-only, and inline interpreter code (node -e,
 *     python -c, powershell -Command, bash -c ...) must not mention it at all.
 * Developers can relax layer 1 (never layer 2) by starting Claude Code with WORKFLOW_GATE_MODE=dev.
 * The variable is read from the hook's environment, which the model cannot change.
 */

const PROTECTED = /events\.jsonl|\.pending-answers|approval\.json|state\.json|plan\.md|runs[\\/]+\.current|workflow-state[\\/]+scripts[\\/]+lib\.js|\blib\.js\b|appendEvent|setCurrentRunId/i;
const STATE_CALL = /^node\s+(\.[\\/])?\.claude[\\/]skills[\\/]workflow-state[\\/]scripts[\\/]state\.js(\s|$)/;
const SELFTEST_CALL = /^node\s+(\.[\\/])?\.claude[\\/]hooks[\\/]selftest\.js\s*$/;
const READ_ONLY_CMD = /^(cat|head|tail|wc|grep|egrep|rg|ls|dir|sort|uniq|cut|diff|stat|file|sha256sum|md5sum|less|more|type|echo|pwd|true|Get-Content|Get-ChildItem|Select-String|Measure-Object)\b/i;
const STOP_CMD = /^(touch|rm(\s+-f)?|Remove-Item|New-Item)\s+["']?(\.[\\/])?runs[\\/][A-Za-z0-9._-]+[\\/]STOP["']?\s*$/i;
const CD_CMD = /^(cd|Set-Location|pushd|popd)(\s|$)/i;
const WRITE_API = /\b(appendFile|writeFile|createWriteStream|copyFile|rename|unlink|rmSync|truncate|open\s*\(|write_text|write_bytes|shutil|os\.remove|WriteAllText|AppendAllText|Out-File|Set-Content|Add-Content|Clear-Content|New-Item|Remove-Item|Copy-Item|Move-Item|Rename-Item|tee|dd|sed\s+-i|perl\s+-[a-z]*i|truncate)\b/i;
const MUTATING_CMD = /^(rm|del|erase|mv|move|cp|copy|tee|dd|truncate|touch|chmod|ln|install|sed\s+-i|git\s+(checkout|restore|reset|stash|apply|clean|mv|rm))\b/i;
const INLINE_INTERPRETER = /\b(node|nodejs|deno|bun)(\.exe)?\s+(-e|-p|--eval|--print)\b|\b(python3?|py)(\.exe)?\s+-c\b|\b(powershell|pwsh)(\.exe)?\b.*\s-(c|Command|EncodedCommand|e|ec)\b|\b(bash|sh|zsh|cmd)(\.exe)?\s+(-c|\/c|\/k)\b|\b(perl|ruby)\s+-e\b/i;
const ENCODED = /-(EncodedCommand|enc|ec)\b|base64\s+(-d|--decode)|FromBase64String/i;

/**
 * Quote-aware split into segments on ; && || | & and newlines.
 * Reports redirections (> outside quotes, except stream merges like 2>&1 and > /dev/null)
 * and command substitution ($( ... ) or backticks outside single quotes; also <( ... )).
 */
function analyze(command) {
  const segments = [];
  let cur = '';
  let quote = null; // ' or "
  let redirect = false;
  let substitution = false;
  const s = String(command || '');
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    const next = s[i + 1];
    if (quote) {
      if (c === quote) quote = null;
      else if (quote === '"' && c === '\\' && next !== undefined) { cur += c + next; i++; continue; }
      else if (quote === '"' && (c === '`' || (c === '$' && next === '('))) substitution = true;
      cur += c;
      continue;
    }
    if (c === "'" || c === '"') { quote = c; cur += c; continue; }
    if (c === '\\' && next !== undefined) { cur += c + next; i++; continue; }
    if (c === '`' || (c === '$' && next === '(') || ((c === '<' || c === '>') && next === '(')) substitution = true;
    if (c === '>') {
      const rest = s.slice(i);
      const prev = s[i - 1];
      const harmless = /^>&\s*[12]\b/.test(rest) || /^>>?\s*\/dev\/null\b/.test(rest) || /^>>?\s*\$null\b/i.test(rest) || /^>>?\s*NUL\b/.test(rest);
      if (!harmless) redirect = true;
      if (/[0-9]/.test(prev || '') && !harmless) redirect = true;
    }
    if (c === ';' || c === '\n' || c === '\r') { segments.push(cur); cur = ''; continue; }
    if ((c === '&' || c === '|') && next === c) { segments.push(cur); cur = ''; i++; continue; }
    if (c === '|') { segments.push(cur); cur = ''; continue; }
    if (c === '&' && s[i - 1] !== '>' && next !== '>') { segments.push(cur); cur = ''; continue; }
    cur += c;
  }
  segments.push(cur);
  return { segments: segments.map((x) => x.trim()).filter(Boolean), redirect, substitution, unterminatedQuote: !!quote };
}

const stripEnvPrefix = (seg) => seg.replace(/^(\s*[A-Za-z_][A-Za-z0-9_]*=("[^"]*"|'[^']*'|\S*)\s+)+/, '');
const isStateCall = (seg) => STATE_CALL.test(stripEnvPrefix(seg));
const isSelftest = (seg) => SELFTEST_CALL.test(stripEnvPrefix(seg));

/** Strict allowlist check for one segment (layer 1). */
function allowedInStrictMode(seg) {
  const x = stripEnvPrefix(seg);
  if (isStateCall(x) || isSelftest(x)) return true;
  if (STOP_CMD.test(x)) return true;
  if (CD_CMD.test(x)) return true;
  if (READ_ONLY_CMD.test(x) && !WRITE_API.test(x) && !INLINE_INTERPRETER.test(x)) return true;
  return false;
}

/**
 * Returns { ok: true } or { ok: false, reason }.
 * opts.strict: a run is in progress and dev mode is off.
 */
function checkShellCommand(command, opts = {}) {
  const a = analyze(command);
  const whole = String(command || '');
  if (a.unterminatedQuote) return { ok: false, reason: 'command has an unterminated quote' };
  if (ENCODED.test(whole)) return { ok: false, reason: 'encoded or base64-decoded commands are not allowed in this project' };

  // Layer 2 (always on): protected state may only be read, never written, and never touched by inline code.
  if (PROTECTED.test(whole)) {
    if (INLINE_INTERPRETER.test(whole)) return { ok: false, reason: 'inline interpreter code (node -e, python -c, powershell -Command, bash -c ...) must not reference workflow state files or the state library; use state.js' };
    for (const seg of a.segments) {
      if (isStateCall(seg) || isSelftest(seg)) continue;
      if (!PROTECTED.test(seg) && !a.redirect) continue;
      const x = stripEnvPrefix(seg);
      if (MUTATING_CMD.test(x) || WRITE_API.test(x) || !READ_ONLY_CMD.test(x)) {
        return { ok: false, reason: `segment "${seg.slice(0, 120)}" may modify workflow state; state files (events.jsonl, approval.json, state.json, plan.md, runs/.current) are written only by state.js and the hooks` };
      }
    }
    if (a.redirect) return { ok: false, reason: 'output redirection in a command that references workflow state files is not allowed' };
    if (a.substitution) return { ok: false, reason: 'command substitution in a command that references workflow state files is not allowed' };
  }

  // Layer 1 (strict mode while a run is in progress): positive allowlist.
  if (opts.strict) {
    if (a.substitution) return { ok: false, reason: 'command substitution ($(...), backticks) is not allowed while a workflow run is in progress' };
    if (a.redirect) return { ok: false, reason: 'output redirection is not allowed while a workflow run is in progress; use state.js for all state changes' };
    for (const seg of a.segments) {
      if (!allowedInStrictMode(seg)) {
        return { ok: false, reason: `while a workflow run is in progress the coordinator may only run state.js, selftest.js, read-only inspection (cat/head/tail/grep/wc/ls), cd, and touch/rm of a run's STOP file. Denied segment: "${seg.slice(0, 120)}". Call state.js with the full literal command (no variables or chaining tricks).` };
      }
    }
  }
  return { ok: true, analysis: a };
}

module.exports = { analyze, checkShellCommand, isStateCall, PROTECTED, WRITE_API, MUTATING_CMD };
