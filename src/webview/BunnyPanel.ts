import * as vscode from 'vscode';
import * as crypto from 'crypto';
import { getWebviewHtml } from './getWebviewHtml';
import { StatsService } from '../core/StatsService';

export class BunnyPanel {
  private static instance: BunnyPanel | undefined;
  private readonly panel: vscode.WebviewPanel;
  private disposables: vscode.Disposable[] = [];
  private isReady = false;
  private messageQueue: object[] = [];

  private constructor(
    panel: vscode.WebviewPanel,
    private readonly context: vscode.ExtensionContext
  ) {
    this.panel = panel;
    this.update();

    this.panel.onDidDispose(() => this.dispose(), null, this.disposables);

    this.panel.webview.onDidReceiveMessage(
      (message: { type: string }) => {
        if (message.type === 'webviewReady') {
          this.isReady = true;
          this.messageQueue.forEach(m => this.panel.webview.postMessage(m));
          this.messageQueue = [];
        } else if (message.type === 'resetStatsRequested') {
          vscode.commands.executeCommand('bunnyrun.resetStats');
        }
      },
      null,
      this.disposables
    );
  }

  static createOrShow(context: vscode.ExtensionContext): void {
    const column = vscode.window.activeTextEditor
      ? vscode.ViewColumn.Beside
      : vscode.ViewColumn.One;

    if (BunnyPanel.instance) {
      BunnyPanel.instance.panel.reveal(column);
      return;
    }

    const panel = vscode.window.createWebviewPanel(
      'bunnyrunBuddy',
      'BunnyRun Buddy',
      column,
      {
        enableScripts: true,
        retainContextWhenHidden: true,
        localResourceRoots: [
          vscode.Uri.joinPath(context.extensionUri, 'media')
        ]
      }
    );

    BunnyPanel.instance = new BunnyPanel(panel, context);
    BunnyPanel.instance.enqueue(BunnyPanel.instance.buildInitPayload());
  }

  static postMessage(message: object): void {
    const inst = BunnyPanel.instance;
    if (!inst) return;
    inst.enqueue(message);
  }

  private buildInitPayload(): object {
    const stats = new StatsService(this.context.globalState);
    const currentStats = stats.getStats();
    const config = vscode.workspace.getConfiguration('bunnyrun');
    return {
      type: 'init',
      payload: {
        xp: currentStats.xp,
        level: currentStats.level,
        streak: currentStats.currentStreak,
        bestStreak: currentStats.bestStreak,
        carrotsEaten: currentStats.carrotsEaten,
        petName: config.get<string>('petName', 'Bunny'),
        enableSounds: config.get<boolean>('enableSounds', true)
      }
    };
  }

  private enqueue(message: object): void {
    if (this.isReady) {
      this.panel.webview.postMessage(message);
    } else {
      this.messageQueue.push(message);
    }
  }

  private update(): void {
    const nonce = crypto.randomBytes(16).toString('hex');
    this.panel.webview.html = getWebviewHtml(this.panel.webview, this.context.extensionUri, nonce);
  }

  private dispose(): void {
    BunnyPanel.instance = undefined;
    this.panel.dispose();
    this.disposables.forEach(d => d.dispose());
    this.disposables = [];
  }
}
