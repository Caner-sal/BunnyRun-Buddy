# BunnyRun Buddy — Test Plan

## Unit Tests

### BunnyStateMachine (12 tests)
- Initial state is `idle`
- `IDLE + runStarted = RUNNING`
- `RUNNING + runSuccess = HAPPY`
- `RUNNING + runFail = SAD`
- `HAPPY + animationEnd = IDLE`
- `SAD + animationEnd = IDLE`
- `IDLE + noActivity = SLEEPING`
- `SLEEPING + userOpensPanel = IDLE`
- `HAPPY + streakMilestone = CELEBRATING`
- `CELEBRATING + animationEnd = IDLE`
- `reset()` returns to idle
- Invalid transition does not change state

### StatsService (10 tests)
- Initial stats are default values
- Successful run adds +10 XP
- Failed run adds +2 XP
- Successful run increments streak
- Failed run resets streak to 0
- Best streak is preserved after failure
- 3-streak gives +15 bonus XP
- 5-streak gives +30 bonus XP
- Level calculation: 100 XP = level 2
- carrotsEaten increments every 5 successful runs
- reset() clears all stats

### Runner Tests (4 tests)
- PythonRunner runs a successful python file (exit code 0)
- PythonRunner detects failure from a bad python file (exit code != 0)
- JavaScriptRunner runs a successful JS file (exit code 0)
- JavaScriptRunner detects failure from a bad JS file (exit code != 0)

## Integration Tests (2 tests)
- Extension activates in VS Code
- All 4 commands are registered

## Manual Test Checklist

### VS Code
- [ ] Press F5 to open Extension Development Host
- [ ] Run `Bunny: Start Companion` — panel opens with idle bunny
- [ ] Open `examples/success.py`
- [ ] Run `Bunny: Run Current File` — bunny shows happy animation, carrot, hearts
- [ ] Open `examples/fail.py`
- [ ] Run `Bunny: Run Current File` — bunny shows sad animation, tears
- [ ] Run 3 successful runs — streak counter increments, bonus XP at 3
- [ ] Run `Bunny: Reset Stats` — confirm dialog, stats reset
- [ ] Close and reopen VS Code — XP and streak are preserved
- [ ] Open `examples/success.js` — run with Bunny command — success
- [ ] Open `examples/fail.js` — run with Bunny command — error

### Settings
- [ ] Change `bunnyrun.petName` — panel shows new name
- [ ] Change `bunnyrun.runPythonCommand` to `python3` — runner uses python3
- [ ] Run `Bunny: Toggle Sound` — sound state toggles

### Security Checks
- [ ] Open a `.txt` file — `Bunny: Run Current File` shows warning, no execution
- [ ] Open an unsaved file — shows "save first" warning
- [ ] Verify no network requests in DevTools → Network panel

## CI Checks (GitHub Actions)
- `npm ci`
- `npm run lint`
- `npm run typecheck`
- `npm run compile`
- `xvfb-run -a npm test`
- `npm run package` → `.vsix` artifact uploaded
