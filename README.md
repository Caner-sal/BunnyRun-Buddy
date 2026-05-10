# BunnyRun Buddy

A cute coding companion for beginner programmers — a VS Code extension that reacts when you run your code.

If your code runs successfully, the bunny eats a carrot and celebrates. If your code fails, the bunny gets sad and loses XP. Push your luck too far and the bunny **dies** — but respawns with a fresh start.

## Features

- **Bunny companion panel** — animated CSS bunny that lives in your sidebar
- **Play button integration** — one click runs your file from the editor toolbar
- **Success animations** — carrot eating, floating hearts, happy bounce
- **Error animations** — sad shake, falling tears, cry emoji
- **Death system** — enough errors drain XP to zero and the bunny collapses with a death animation, then respawns
- **XP & level system** — +10 XP on success, −10 XP on failure; level derived from XP
- **Streak bonuses** — bonus XP at 3-run and 5-run streaks
- **Best streak tracking** — your record is preserved even after death
- **Carrot milestones** — earn a carrot every 5 successful runs
- **Auto-save** — file is saved before running so you always run the latest code
- **Local-only storage** — no cloud, no telemetry, no account required

## How XP & Death Works

| Event | XP Change | Level |
|---|---|---|
| Successful run | +10 (or +25 / +40 with streak bonuses) | increases |
| Failed run | −10 | decreases |
| XP drops below 0 | bunny dies | resets to Lv.1 / 0 XP |
| Death | best streak preserved; everything else resets | 1 |

## Commands

| Command | Shortcut | Description |
|---|---|---|
| `Bunny: Run Current File` | `Ctrl+Alt+R` | Run the active Python or JavaScript file |
| `Bunny: Start Companion` | — | Open the bunny companion panel |
| `Bunny: Reset Stats` | — | Reset all XP, level, and streak data |

## Supported Languages

- Python (`.py`)
- JavaScript (`.js`)

## Installation

### From VSIX

1. Download the `.vsix` file from [Releases](https://github.com/Caner-sal/BunnyRun-Buddy/releases)
2. In VS Code: `Extensions` → `...` → `Install from VSIX...`
3. Select the downloaded file

Or via terminal:
```
code --install-extension bunnyrun-buddy-0.1.0.vsix
```

### Development Mode

```bash
git clone https://github.com/Caner-sal/BunnyRun-Buddy.git
cd BunnyRun-Buddy
npm install
# Press F5 in VS Code to open Extension Development Host
```

## Settings

| Setting | Default | Description |
|---|---|---|
| `bunnyrun.petName` | `"Bunny"` | Your companion's name |
| `bunnyrun.runPythonCommand` | `"python"` | Python command (`py` on some Windows setups) |
| `bunnyrun.runJavaScriptCommand` | `"node"` | Node.js command |
| `bunnyrun.enableSounds` | `true` | Enable sound effects |

**Windows tip:** If Python doesn't run, set `bunnyrun.runPythonCommand` to `"py"` in your VS Code settings.

## Privacy

BunnyRun Buddy runs **entirely locally**. It does not send your code to any server, collect telemetry, or make any network requests. All data (XP, streaks) is stored in VS Code's built-in local storage.

## Tech Stack

- TypeScript + VS Code Extension API
- Pure CSS animations (no canvas, no SVG, no image assets)
- `child_process.spawn` for safe file execution
- VS Code `globalState` for persistent storage

## License

MIT — see [LICENSE](LICENSE)
