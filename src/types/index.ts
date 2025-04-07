export interface ConnectionGroup {
  level: number;
  group: string;
  members: string[];
}

export interface ConnectionPuzzle {
  id: number;
  date: string;
  answers: ConnectionGroup[];
}

export interface GameState {
  selectedWords: string[];
  solvedGroups: ConnectionGroup[];
  mistakes: number;
  gameStatus: 'playing' | 'won' | 'lost';
}

export const GROUP_COLORS: Record<number, { bg: string; text: string }> = {
  0: {
    bg: '#FFC10E',  // Yellow (easiest)
    text: '#000000',
  },
  1: {
    bg: '#7CAD3A',  // Green
    text: '#FFFFFF',
  },
  2: {
    bg: '#4575B4',  // Blue
    text: '#FFFFFF',
  },
  3: {
    bg: '#A651B7',  // Purple (hardest)
    text: '#FFFFFF',
  },
};