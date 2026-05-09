# BunnyRun Buddy — Release Checklist

## Pre-Release

- [ ] All unit tests pass (`npm test`)
- [ ] Lint passes (`npm run lint`)
- [ ] TypeScript compiles cleanly (`npm run typecheck`)
- [ ] No API keys, secrets, or tokens in source code
- [ ] `.gitignore` excludes `.env`, `*.key`, `node_modules`, `*.vsix`
- [ ] SECURITY.md is present and accurate
- [ ] README.md is complete with installation instructions
- [ ] CHANGELOG.md is updated with version and date
- [ ] Version in `package.json` matches release tag

## VSIX Build

- [ ] Run `npm run package`
- [ ] Confirm `.vsix` file is generated
- [ ] Check `vsce ls` — no secrets or large unneeded files included
- [ ] Install VSIX locally and test manually

## Manual Testing

- [ ] `Bunny: Start Companion` opens panel
- [ ] Python success → happy animation + XP increase
- [ ] Python error → sad animation + small XP increase
- [ ] JavaScript success and error work correctly
- [ ] Streak increments and resets correctly
- [ ] Streak milestone bonuses trigger at 3 and 5
- [ ] XP persists after VS Code restart
- [ ] Reset Stats clears everything
- [ ] Settings: pet name, sounds, python command, node command

## GitHub

- [ ] GitHub Actions CI is green
- [ ] Create git tag: `git tag v0.1.0`
- [ ] Push tag: `git push origin v0.1.0`
- [ ] Create GitHub Release with VSIX attached
- [ ] Release notes include feature list and installation instructions

## Antigravity (Optional)

- [ ] Install VSIX in Antigravity via "Install from VSIX"
- [ ] Commands appear in Command Palette
- [ ] Webview opens and displays correctly
- [ ] Run Current File works for Python and JavaScript
