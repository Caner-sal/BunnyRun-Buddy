import * as vscode from 'vscode';
import { RunnerFactory } from '../runners/RunnerFactory';
import { BunnyPanel } from '../webview/BunnyPanel';
import { StatsService } from '../core/StatsService';

let outputChannel: vscode.OutputChannel | undefined;

export async function runCurrentFile(context: vscode.ExtensionContext): Promise<void> {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    vscode.window.showWarningMessage('BunnyRun Buddy: No active editor found. Open a Python or JavaScript file first.');
    return;
  }

  const document = editor.document;
  if (document.isUntitled) {
    vscode.window.showWarningMessage('BunnyRun Buddy: Please save your file before running it.');
    return;
  }

  if (!outputChannel) {
    outputChannel = vscode.window.createOutputChannel('BunnyRun Buddy');
    context.subscriptions.push(outputChannel);
  }

  const config = vscode.workspace.getConfiguration('bunnyrun');
  const pythonCmd = config.get<string>('runPythonCommand', 'python');
  const nodeCmd = config.get<string>('runJavaScriptCommand', 'node');

  const runner = RunnerFactory.getRunner(document, pythonCmd, nodeCmd);
  if (!runner) {
    return;
  }

  BunnyPanel.createOrShow(context);
  BunnyPanel.postMessage({ type: 'setState', payload: { state: 'running' } });

  const workspaceFolder = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
  const result = await runner.run(workspaceFolder);

  const stats = new StatsService(context.globalState);
  if (result.status === 'success') {
    stats.onSuccess();
  } else {
    stats.onFailure();
  }

  const currentStats = stats.getStats();

  outputChannel.clear();
  outputChannel.appendLine('=== BunnyRun Buddy ===');
  outputChannel.appendLine(`File: ${result.filePath}`);
  outputChannel.appendLine(`Language: ${result.language}`);
  outputChannel.appendLine(`Status: ${result.status}`);
  outputChannel.appendLine(`Duration: ${result.durationMs}ms`);
  if (result.stdout) {
    outputChannel.appendLine('\n--- Output ---');
    outputChannel.appendLine(result.stdout);
  }
  if (result.stderr) {
    outputChannel.appendLine('\n--- Errors ---');
    outputChannel.appendLine(result.stderr);
  }
  outputChannel.show(true);

  BunnyPanel.postMessage({
    type: 'runResult',
    payload: {
      status: result.status,
      xp: currentStats.xp,
      level: currentStats.level,
      streak: currentStats.currentStreak,
      bestStreak: currentStats.bestStreak,
      carrotsEaten: currentStats.carrotsEaten,
      petName: config.get<string>('petName', 'Bunny')
    }
  });
}
