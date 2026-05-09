import { RunResult } from './RunResult';

export interface LanguageRunner {
  run(cwd?: string): Promise<RunResult>;
}
