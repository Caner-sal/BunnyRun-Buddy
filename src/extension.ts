import * as vscode from 'vscode';
import { startCompanion } from './commands/startCompanion';
import { runCurrentFile } from './commands/runCurrentFile';
import { resetStats } from './commands/resetStats';
import { toggleSound } from './commands/toggleSound';

export function activate(context: vscode.ExtensionContext): void {
  context.subscriptions.push(
    vscode.commands.registerCommand('bunnyrun.startCompanion', () =>
      startCompanion(context)
    ),
    vscode.commands.registerCommand('bunnyrun.runCurrentFile', () =>
      runCurrentFile(context)
    ),
    vscode.commands.registerCommand('bunnyrun.resetStats', () =>
      resetStats(context)
    ),
    vscode.commands.registerCommand('bunnyrun.toggleSound', () =>
      toggleSound()
    )
  );
}

export function deactivate(): void {}
