import * as assert from 'assert';
import { StatsService } from '../../core/StatsService';
import type { Memento } from 'vscode';

function createMockMemento(): Memento {
  const store: Record<string, unknown> = {};
  return {
    get<T>(key: string, defaultValue?: T): T {
      return (store[key] as T) ?? (defaultValue as T);
    },
    update(key: string, value: unknown): Thenable<void> {
      store[key] = value;
      return Promise.resolve();
    },
    keys(): readonly string[] {
      return Object.keys(store);
    }
  };
}

suite('StatsService Tests', () => {
  let service: StatsService;

  setup(() => {
    service = new StatsService(createMockMemento());
  });

  test('Initial stats are default values', () => {
    const stats = service.getStats();
    assert.strictEqual(stats.xp, 0);
    assert.strictEqual(stats.level, 1);
    assert.strictEqual(stats.currentStreak, 0);
    assert.strictEqual(stats.bestStreak, 0);
    assert.strictEqual(stats.carrotsEaten, 0);
  });

  test('Successful run adds +10 XP', () => {
    const stats = service.onSuccess();
    assert.strictEqual(stats.xp, 10);
  });

  test('Failed run adds +2 XP', () => {
    const stats = service.onFailure();
    assert.strictEqual(stats.xp, 2);
  });

  test('Successful run increments streak', () => {
    service.onSuccess();
    const stats = service.onSuccess();
    assert.strictEqual(stats.currentStreak, 2);
  });

  test('Failed run resets streak to 0', () => {
    service.onSuccess();
    service.onSuccess();
    const stats = service.onFailure();
    assert.strictEqual(stats.currentStreak, 0);
  });

  test('Best streak is preserved after failure', () => {
    service.onSuccess();
    service.onSuccess();
    service.onSuccess();
    service.onFailure();
    const stats = service.getStats();
    assert.strictEqual(stats.bestStreak, 3);
  });

  test('3-streak gives +15 bonus XP', () => {
    service.onSuccess();
    service.onSuccess();
    const stats = service.onSuccess();
    assert.strictEqual(stats.xp, 10 + 10 + 10 + 15);
  });

  test('5-streak gives +30 bonus XP', () => {
    service.onSuccess();
    service.onSuccess();
    service.onSuccess();
    service.onSuccess();
    const stats = service.onSuccess();
    const expectedXp = 10 + 10 + (10 + 15) + 10 + (10 + 30);
    assert.strictEqual(stats.xp, expectedXp);
  });

  test('Level calculation: 100 XP = level 2', () => {
    assert.strictEqual(service.calculateLevel(100), 2);
    assert.strictEqual(service.calculateLevel(0), 1);
    assert.strictEqual(service.calculateLevel(99), 1);
    assert.strictEqual(service.calculateLevel(200), 3);
  });

  test('carrotsEaten increments every 5 successful runs', () => {
    for (let i = 0; i < 5; i++) {
      service.onSuccess();
    }
    const stats = service.getStats();
    assert.strictEqual(stats.carrotsEaten, 1);
  });

  test('reset() clears all stats', () => {
    service.onSuccess();
    service.onSuccess();
    service.reset();
    const stats = service.getStats();
    assert.strictEqual(stats.xp, 0);
    assert.strictEqual(stats.currentStreak, 0);
    assert.strictEqual(stats.bestStreak, 0);
    assert.strictEqual(stats.carrotsEaten, 0);
  });
});
