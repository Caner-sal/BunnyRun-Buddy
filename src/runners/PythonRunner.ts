import { spawn } from 'child_process';
import { LanguageRunner } from '../core/LanguageRunner';
import { RunResult } from '../core/RunResult';

export class PythonRunner implements LanguageRunner {
  constructor(
    private readonly filePath: string,
    private readonly pythonCommand: string = 'python'
  ) {}

  run(cwd?: string): Promise<RunResult> {
    const start = Date.now();

    return new Promise((resolve) => {
      const stdoutChunks: string[] = [];
      const stderrChunks: string[] = [];

      const child = spawn(this.pythonCommand, [this.filePath], {
        cwd: cwd,
        shell: false
      });

      child.stdout.on('data', (data: Buffer) => {
        stdoutChunks.push(data.toString());
      });

      child.stderr.on('data', (data: Buffer) => {
        stderrChunks.push(data.toString());
      });

      child.on('close', (code: number | null) => {
        const durationMs = Date.now() - start;
        const exitCode = code ?? 1;
        const stdout = stdoutChunks.join('').trim();
        const stderr = stderrChunks.join('').trim();
        resolve({
          status: (exitCode === 0 && !stderr) ? 'success' : 'error',
          exitCode,
          stdout,
          stderr,
          language: 'python',
          filePath: this.filePath,
          durationMs
        });
      });

      child.on('error', (err: Error) => {
        const durationMs = Date.now() - start;
        resolve({
          status: 'error',
          exitCode: 1,
          stdout: '',
          stderr: err.message,
          language: 'python',
          filePath: this.filePath,
          durationMs
        });
      });
    });
  }
}
