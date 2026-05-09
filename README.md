# BunnyRun Buddy

A cute coding companion for beginner programmers.

BunnyRun Buddy is a VS Code and Antigravity-compatible extension that reacts when you run your code. If your code runs successfully, the bunny eats a carrot and celebrates. If your code fails, the bunny gets sad but encourages you to try again.

![BunnyRun Buddy Demo](docs/assets/demo-placeholder.png)

## Features

- 🐰 Bunny companion panel that reacts to your code runs
- 🥕 Success animations (carrot eating + floating hearts)
- 😢 Friendly error animations (no judgement!)
- ⭐ XP, level, and streak system
- 🔥 Streak milestones with bonus XP
- 💾 Local-only data storage (no cloud, no telemetry)
- 📦 VSIX install support for Antigravity

## Commands

| Command | Description |
|---|---|
| `Bunny: Start Companion` | Open the bunny companion panel |
| `Bunny: Run Current File` | Run the active Python or JavaScript file |
| `Bunny: Reset Stats` | Reset all XP, level, and streak data |
| `Bunny: Toggle Sound` | Toggle sound effects on/off |

## Supported Languages

- Python (`.py`)
- JavaScript (`.js`)

## Installation

### VS Code Development Mode

1. Clone this repository
2. Run `npm install`
3. Press `F5` to open Extension Development Host
4. Run `Bunny: Start Companion` from the Command Palette

### From VSIX

1. Download the `.vsix` file from [Releases](https://github.com/Caner-sal/BunnyRun-Buddy/releases)
2. In VS Code: `Extensions` → `...` → `Install from VSIX...`
3. Select the downloaded file

### Antigravity (VSIX Install)

See [docs/ANTIGRAVITY_INSTALL.md](docs/ANTIGRAVITY_INSTALL.md) for step-by-step instructions.

## Settings

| Setting | Default | Description |
|---|---|---|
| `bunnyrun.petName` | `"Bunny"` | Your companion's name |
| `bunnyrun.enableSounds` | `true` | Enable sound effects |
| `bunnyrun.runPythonCommand` | `"python"` | Python command to use |
| `bunnyrun.runJavaScriptCommand` | `"node"` | Node.js command to use |

## Privacy

BunnyRun Buddy runs **entirely locally**. It does not:
- Send your code to any server
- Collect any telemetry or usage data
- Require an account or API key
- Make any network requests

All data (XP, streaks) is stored locally using VS Code's built-in storage.

## Known Limitations

- The first version does not support a real desktop overlay
- Antigravity support is tested through VSIX installation
- Only Python and JavaScript are supported in MVP
- TypeScript files require external compilation

## Contributing

See [AGENTS.md](AGENTS.md) for development agent prompts and [docs/PRODUCT_SPEC.md](docs/PRODUCT_SPEC.md) for the full product specification.

## License

MIT — see [LICENSE](LICENSE)
