import * as assert from 'assert';
import * as path from 'path';
import { PythonRunner } from '../../runners/PythonRunner';
import { JavaScriptRunner } from '../../runners/JavaScriptRunner';

suite('Runner Tests', () => {
  test('PythonRunner runs a successful python file', async function () {
    this.timeout(10000);
    const filePath = path.join(__dirname, '..', '..', '..', 'examples', 'success.py');
    const runner = new PythonRunner(filePath, 'python');
    const result = await runner.run();
    assert.strictEqual(result.language, 'python');
    assert.strictEqual(result.status, 'success');
    assert.strictEqual(result.exitCode, 0);
  });

  test('PythonRunner detects failure from a bad python file', async function () {
    this.timeout(10000);
    const filePath = path.join(__dirname, '..', '..', '..', 'examples', 'fail.py');
    const runner = new PythonRunner(filePath, 'python');
    const result = await runner.run();
    assert.strictEqual(result.language, 'python');
    assert.strictEqual(result.status, 'error');
    assert.notStrictEqual(result.exitCode, 0);
  });

  test('JavaScriptRunner runs a successful JS file', async function () {
    this.timeout(10000);
    const filePath = path.join(__dirname, '..', '..', '..', 'examples', 'success.js');
    const runner = new JavaScriptRunner(filePath, 'node');
    const result = await runner.run();
    assert.strictEqual(result.language, 'javascript');
    assert.strictEqual(result.status, 'success');
    assert.strictEqual(result.exitCode, 0);
  });

  test('JavaScriptRunner detects failure from a bad JS file', async function () {
    this.timeout(10000);
    const filePath = path.join(__dirname, '..', '..', '..', 'examples', 'fail.js');
    const runner = new JavaScriptRunner(filePath, 'node');
    const result = await runner.run();
    assert.strictEqual(result.language, 'javascript');
    assert.strictEqual(result.status, 'error');
    assert.notStrictEqual(result.exitCode, 0);
  });
});
