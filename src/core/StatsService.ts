import type { Memento } from 'vscode';

export interface BunnyStats {
  xp: number;
  level: number;
  successfulRuns: number;
  failedRuns: number;
  currentStreak: number;
  bestStreak: number;
  carrotsEaten: number;
  lastRunAt?: string;
}

const STORAGE_KEY = 'bunnyrun.stats';

const DEFAULT_STATS: BunnyStats = {
  xp: 0,
  level: 1,
  successfulRuns: 0,
  failedRuns: 0,
  currentStreak: 0,
  bestStreak: 0,
  carrotsEaten: 0
};

export class StatsService {
  constructor(private readonly storage: Memento) {}

  getStats(): BunnyStats {
    return this.storage.get<BunnyStats>(STORAGE_KEY, { ...DEFAULT_STATS });
  }

  onSuccess(): BunnyStats {
    const stats = this.getStats();
    let xpGain = 10;
    stats.successfulRuns += 1;
    stats.currentStreak += 1;
    stats.lastRunAt = new Date().toISOString();

    if (stats.currentStreak === 3) {
      xpGain += 15;
    } else if (stats.currentStreak === 5) {
      xpGain += 30;
    }

    if (stats.currentStreak > stats.bestStreak) {
      stats.bestStreak = stats.currentStreak;
    }

    if (stats.successfulRuns % 5 === 0) {
      stats.carrotsEaten += 1;
    }

    stats.xp += xpGain;
    stats.level = this.calculateLevel(stats.xp);

    this.save(stats);
    return stats;
  }

  onFailure(): BunnyStats {
    const stats = this.getStats();
    stats.xp += 2;
    stats.failedRuns += 1;
    stats.currentStreak = 0;
    stats.lastRunAt = new Date().toISOString();
    stats.level = this.calculateLevel(stats.xp);
    this.save(stats);
    return stats;
  }

  reset(): void {
    this.save({ ...DEFAULT_STATS });
  }

  calculateLevel(xp: number): number {
    return Math.floor(xp / 100) + 1;
  }

  getXpForNextLevel(xp: number): number {
    const currentLevel = this.calculateLevel(xp);
    return currentLevel * 100 - xp;
  }

  private save(stats: BunnyStats): void {
    this.storage.update(STORAGE_KEY, stats);
  }
}
