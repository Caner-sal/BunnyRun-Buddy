# Security Policy

## Overview

BunnyRun Buddy is a local-only VS Code extension. It does not make network requests, collect telemetry, or store any data outside your local machine.

## Security Principles

### Command Execution
- Only `.py` and `.js` files are executed.
- File execution uses `child_process.spawn(command, [filePath])` — **never** shell string concatenation.
- The `shell: false` option is set explicitly to prevent shell injection.
- Unknown or unsupported file types will never trigger code execution.

### Webview Security
- The webview uses a strict **Content Security Policy (CSP)**:
  - `default-src 'none'`
  - Scripts are loaded via `nonce` only — no inline scripts
  - No external resource loading
- Communication between the extension and webview uses VS Code's postMessage API.

### Data Privacy
- No network requests are made (`http`, `https`, `fetch` are not used).
- No telemetry or usage analytics.
- No API keys, tokens, or credentials required.
- All user data (XP, streaks) is stored locally using VS Code's `globalState`.
- The extension does not read `.env` files, secrets, or credentials.

### Safe Defaults
- Unsaved files are rejected before execution.
- The Python and Node.js commands are configurable but validated against a safe spawn interface.
- No arbitrary command execution — only the configured python/node binary with the active file path as argument.

## Reporting Vulnerabilities

If you discover a security issue, please open a GitHub issue at:
https://github.com/Caner-sal/BunnyRun-Buddy/issues

Include:
- A description of the vulnerability
- Steps to reproduce
- Potential impact

Please do not include exploit code in public issues. For sensitive reports, contact via the repository's contact information.

## Known Limitations

- The extension runs the active file using the system's Python/Node installation. Users are responsible for the code they run.
- The configured Python/Node command path is not validated beyond being used as the spawn command argument.
