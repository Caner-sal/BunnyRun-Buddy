import * as vscode from 'vscode';
import * as path from 'path';
import { LanguageRunner } from '../core/LanguageRunner';
import { PythonRunner } from './PythonRunner';
import { JavaScriptRunner } from './JavaScriptRunner';

export class RunnerFactory {
  static getRunner(
    document: vscode.TextDocument,
    pythonCmd: string = 'python',
    nodeCmd: string = 'node'
  ): LanguageRunner | null {
    const filePath = document.fileName;
    const ext = path.extname(filePath).toLowerCase();

    if (ext === '.py') {
      return new PythonRunner(filePath, pythonCmd);
    }

    if (ext === '.js') {
      return new JavaScriptRunner(filePath, nodeCmd);
    }

    vscode.window.showWarningMessage(
      `BunnyRun Buddy: Unsupported file type "${ext}". Only .py and .js files are supported.`
    );
    return null;
  }
}
