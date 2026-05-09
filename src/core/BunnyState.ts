export type BunnyStateType = 'idle' | 'running' | 'happy' | 'sad' | 'celebrating' | 'sleeping';

export type BunnyEvent =
  | 'runStarted'
  | 'runSuccess'
  | 'runFail'
  | 'animationEnd'
  | 'streakMilestone'
  | 'noActivity'
  | 'userOpensPanel';

const transitions: Record<BunnyStateType, Partial<Record<BunnyEvent, BunnyStateType>>> = {
  idle: {
    runStarted: 'running',
    noActivity: 'sleeping'
  },
  running: {
    runSuccess: 'happy',
    runFail: 'sad'
  },
  happy: {
    animationEnd: 'idle',
    streakMilestone: 'celebrating'
  },
  sad: {
    animationEnd: 'idle'
  },
  celebrating: {
    animationEnd: 'idle'
  },
  sleeping: {
    runStarted: 'running',
    userOpensPanel: 'idle'
  }
};

export class BunnyStateMachine {
  private state: BunnyStateType = 'idle';

  getState(): BunnyStateType {
    return this.state;
  }

  transition(event: BunnyEvent): BunnyStateType {
    const next = transitions[this.state]?.[event];
    if (next) {
      this.state = next;
    }
    return this.state;
  }

  reset(): void {
    this.state = 'idle';
  }
}
