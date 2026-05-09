import * as vscode from 'vscode';
import { StatsService } from '../core/StatsService';
import { BunnyPanel } from '../webview/BunnyPanel';

export async function resetStats(context: vscode.ExtensionContext): Promise<void> {
  const answer = await vscode.window.showWarningMessage(
    'BunnyRun Buddy: Are you sure you want to reset all stats? This cannot be undone.',
    'Yes, Reset',
    'Cancel'
  );

  if (answer !== 'Yes, Reset') {
    return;
  }

  const stats = new StatsService(context.globalState);
  stats.reset();

  const config = vscode.workspace.getConfiguration('bunnyrun');
  BunnyPanel.postMessage({
    type: 'statsReset',
    payload: {
      xp: 0,
      level: 1,
      streak: 0,
      bestStreak: 0,
      carrotsEaten: 0,
      petName: config.get<string>('petName', 'Bunny')
    }
  });

  vscode.window.showInformationMessage('BunnyRun Buddy: Stats have been reset. Fresh start!');
}
