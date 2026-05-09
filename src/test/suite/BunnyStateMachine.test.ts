import * as assert from 'assert';
import { BunnyStateMachine } from '../../core/BunnyState';

suite('BunnyStateMachine Tests', () => {
  let machine: BunnyStateMachine;

  setup(() => {
    machine = new BunnyStateMachine();
  });

  test('Initial state should be idle', () => {
    assert.strictEqual(machine.getState(), 'idle');
  });

  test('IDLE + runStarted = RUNNING', () => {
    machine.transition('runStarted');
    assert.strictEqual(machine.getState(), 'running');
  });

  test('RUNNING + runSuccess = HAPPY', () => {
    machine.transition('runStarted');
    machine.transition('runSuccess');
    assert.strictEqual(machine.getState(), 'happy');
  });

  test('RUNNING + runFail = SAD', () => {
    machine.transition('runStarted');
    machine.transition('runFail');
    assert.strictEqual(machine.getState(), 'sad');
  });

  test('HAPPY + animationEnd = IDLE', () => {
    machine.transition('runStarted');
    machine.transition('runSuccess');
    machine.transition('animationEnd');
    assert.strictEqual(machine.getState(), 'idle');
  });

  test('SAD + animationEnd = IDLE', () => {
    machine.transition('runStarted');
    machine.transition('runFail');
    machine.transition('animationEnd');
    assert.strictEqual(machine.getState(), 'idle');
  });

  test('IDLE + noActivity = SLEEPING', () => {
    machine.transition('noActivity');
    assert.strictEqual(machine.getState(), 'sleeping');
  });

  test('SLEEPING + userOpensPanel = IDLE', () => {
    machine.transition('noActivity');
    machine.transition('userOpensPanel');
    assert.strictEqual(machine.getState(), 'idle');
  });

  test('HAPPY + streakMilestone = CELEBRATING', () => {
    machine.transition('runStarted');
    machine.transition('runSuccess');
    machine.transition('streakMilestone');
    assert.strictEqual(machine.getState(), 'celebrating');
  });

  test('CELEBRATING + animationEnd = IDLE', () => {
    machine.transition('runStarted');
    machine.transition('runSuccess');
    machine.transition('streakMilestone');
    machine.transition('animationEnd');
    assert.strictEqual(machine.getState(), 'idle');
  });

  test('reset() returns to idle', () => {
    machine.transition('runStarted');
    machine.transition('runFail');
    machine.reset();
    assert.strictEqual(machine.getState(), 'idle');
  });

  test('Invalid transition does not change state', () => {
    machine.transition('animationEnd');
    assert.strictEqual(machine.getState(), 'idle');
  });
});
