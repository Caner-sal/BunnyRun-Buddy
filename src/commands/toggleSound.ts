import * as vscode from 'vscode';

export async function toggleSound(): Promise<void> {
  const config = vscode.workspace.getConfiguration('bunnyrun');
  const current = config.get<boolean>('enableSounds', true);
  await config.update('enableSounds', !current, vscode.ConfigurationTarget.Global);
  const state = !current ? 'enabled' : 'disabled';
  vscode.window.showInformationMessage(`BunnyRun Buddy: Sound effects ${state}.`);
}
