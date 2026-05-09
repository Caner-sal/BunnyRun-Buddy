# BunnyRun Buddy — Agent Guide

This document describes the development agents used to build BunnyRun Buddy.

## Agent 1 — Product Architect Agent
**Phase:** 0, 1  
Defines MVP scope, feature list, user stories, acceptance criteria, and risks.

## Agent 2 — VS Code Extension Engineer Agent
**Phase:** 1, 2  
Creates the extension skeleton, command registration, package.json contributions, and TypeScript configuration.

## Agent 3 — Runner Integration Agent
**Phase:** 3  
Implements safe local file execution using `child_process.spawn`. Supports Python and JavaScript. Returns typed RunResult objects.

## Agent 4 — Bunny UI / Animation Agent
**Phase:** 4  
Builds the webview UI with HTML/CSS/vanilla JS. Implements all bunny state animations. Receives messages from the extension.

## Agent 5 — State & Persistence Agent
**Phase:** 5  
Implements BunnyStateMachine, StatsService, XP/level/streak calculations, and VS Code globalState persistence.

## Agent 6 — Testing Agent
**Phase:** 6, 7  
Creates unit tests, integration tests, CI scripts, and mock sample files.

## Agent 7 — Security & Privacy Agent
**Phase:** 7  
Audits command execution safety, webview CSP, network calls, and sensitive data handling. Creates SECURITY.md.

## Agent 8 — Docs & Release Agent
**Phase:** 8  
Writes README, CHANGELOG, TEST_PLAN, RELEASE_CHECKLIST, and ANTIGRAVITY_INSTALL docs. Packages VSIX.

## Agent 9 — GitHub CI Agent
**Phase:** 9  
Sets up GitHub Actions workflow, issue templates, and final release pipeline.
