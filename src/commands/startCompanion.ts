import * as vscode from 'vscode';
import { BunnyPanel } from '../webview/BunnyPanel';

export function startCompanion(context: vscode.ExtensionContext): void {
  BunnyPanel.createOrShow(context);
}
