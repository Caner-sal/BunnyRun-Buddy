# Installing BunnyRun Buddy in Antigravity

Antigravity supports VS Code extensions via VSIX installation.

## Step 1: Get the VSIX File

Download `bunnyrun-buddy-0.1.0.vsix` from the [GitHub Releases page](https://github.com/Caner-sal/BunnyRun-Buddy/releases).

Or build it yourself:
```bash
git clone https://github.com/Caner-sal/BunnyRun-Buddy.git
cd BunnyRun-Buddy
npm install
npm run package
```

## Step 2: Install in Antigravity

1. Open Antigravity
2. Click the **Extensions** icon in the Activity Bar (or press `Ctrl+Shift+X`)
3. Click the `...` menu (three dots) at the top of the Extensions panel
4. Select **Install from VSIX...**
5. Navigate to and select `bunnyrun-buddy-0.1.0.vsix`
6. Click **Install**
7. Reload Antigravity if prompted

## Step 3: Use the Extension

1. Open the Command Palette (`Ctrl+Shift+P` or `F1`)
2. Type `Bunny: Start Companion` and press Enter
3. The bunny companion panel will open
4. Open a `.py` or `.js` file
5. Run `Bunny: Run Current File` to see the bunny react!

## Requirements

- Python must be installed and available as `python` or `python3` in your PATH
- Node.js must be installed and available as `node` in your PATH

You can configure the exact commands in Settings:
- `bunnyrun.runPythonCommand` (default: `python`)
- `bunnyrun.runJavaScriptCommand` (default: `node`)

## Troubleshooting

**"Command not found" error when running Python:**
Change `bunnyrun.runPythonCommand` to `python3` in settings.

**Panel doesn't open:**
Make sure the extension installed successfully. Try reloading Antigravity.

**Animations look broken:**
Check that JavaScript is enabled in Antigravity's webview settings.
