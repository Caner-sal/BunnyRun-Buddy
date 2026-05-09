# BunnyRun Buddy — Product Specification

## Overview

BunnyRun Buddy is a VS Code extension that gamifies beginner programming by showing a cute bunny companion that reacts to code execution results. It targets students and beginners who write and run small programs repeatedly.

## MVP Feature List

### Core Features
- Bunny companion panel (webview-based)
- `Bunny: Start Companion` — opens the panel
- `Bunny: Run Current File` — runs active Python or JavaScript file
- `Bunny: Reset Stats` — clears all progress data
- `Bunny: Toggle Sound` — enables/disables sound effects

### Gamification
- XP system: +10 per successful run, +2 per failed run
- Level system: every 100 XP = 1 level
- Streak system: consecutive successful runs
- Streak milestones: 3 runs (+15 XP bonus), 5 runs (+30 XP bonus)
- Carrots eaten counter (increments every 5 successful runs)

### Animations
- Idle: gentle bobbing
- Running: curious/waiting look
- Happy: carrot eating + floating hearts
- Sad: shaking + crying drops
- Celebrating: jumping (streak milestone)
- Sleeping: breathing animation (idle for too long)

### Settings
- `bunnyrun.petName` — companion name (default: "Bunny")
- `bunnyrun.enableSounds` — sound toggle (default: true)
- `bunnyrun.runPythonCommand` — python command (default: "python")
- `bunnyrun.runJavaScriptCommand` — node command (default: "node")

## Non-MVP Features (Future)

- Real desktop overlay
- AI-powered error explanation
- VS Code Marketplace publishing
- Multiple pet skins/themes
- Cloud account & leaderboard
- TypeScript direct execution
- C, C++, Java, Go, Rust support
- Daily challenges
- Achievement badges

## Supported Languages (MVP)

| Language | Extension | Command |
|---|---|---|
| Python | `.py` | `python <file>` (configurable) |
| JavaScript | `.js` | `node <file>` (configurable) |

## Acceptance Criteria

The MVP is ready when:
- [ ] Extension activates in VS Code
- [ ] Bunny panel opens and shows idle animation
- [ ] Python successful run → happy animation
- [ ] Python failed run → sad animation
- [ ] JavaScript runs work the same way
- [ ] XP and streak persist after VS Code restart
- [ ] Reset stats clears all data
- [ ] At least 10 unit tests pass
- [ ] At least 2 integration tests pass
- [ ] `npm run lint`, `npm run typecheck`, `npm test` all pass
- [ ] VSIX package is generated
- [ ] GitHub Actions CI is green

## Technical Constraints

- No network calls
- No telemetry
- No API keys required
- Use `child_process.spawn` (never shell string concatenation)
- Webview must have Content Security Policy
- Unknown file types must not trigger arbitrary commands
- All data stored locally via VS Code globalState
