export type RunStatus = 'success' | 'error' | 'unknown';
export type SupportedLanguage = 'python' | 'javascript' | 'unknown';

export interface RunResult {
  status: RunStatus;
  exitCode?: number;
  stdout?: string;
  stderr?: string;
  language: SupportedLanguage;
  filePath: string;
  durationMs: number;
}
