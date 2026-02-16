export const GUESS_DIRECTION = {
  UP: 'up',
  DOWN: 'down',
} as const;

export type GuessDirection = typeof GUESS_DIRECTION[keyof typeof GUESS_DIRECTION];

export const GUESS_STATUS = {
  WIN: 'win',
  LOSS: 'loss',
  PENDING: 'pending',
} as const;

export type GuessStatus = typeof GUESS_STATUS[keyof typeof GUESS_STATUS] | null;

export interface ActiveGuess {
  startPrice: number;
  direction: GuessDirection;
  startTime: number;
}