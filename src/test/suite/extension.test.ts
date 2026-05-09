import * as assert from 'assert';
import * as vscode from 'vscode';

suite('Extension Test Suite', () => {
  test('Extension should be present', () => {
    assert.ok(vscode.extensions.getExtension('canersal.bunnyrun-buddy'));
  });

  test('Commands should be registered', async () => {
    const commands = await vscode.commands.getCommands(true);
    assert.ok(commands.includes('bunnyrun.startCompanion'), 'startCompanion not registered');
    assert.ok(commands.includes('bunnyrun.runCurrentFile'), 'runCurrentFile not registered');
    assert.ok(commands.includes('bunnyrun.resetStats'), 'resetStats not registered');
    assert.ok(commands.includes('bunnyrun.toggleSound'), 'toggleSound not registered');
  });
});
