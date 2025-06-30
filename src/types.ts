export interface Tile {
  id: string;
  row: number;
  col: number;
  letter: string;
}

export enum GameStatus {
  READY = 'READY',
  PLAYING = 'PLAYING',
  FINISHED = 'FINISHED'
}

export enum PowerUpType {
  FREEZE_TIME = 'FREEZE_TIME',
  SHUFFLE = 'SHUFFLE',
}

export interface PowerUp {
    type: PowerUpType;
    isAvailable: boolean;
    duration?: number;
}

export interface GameState {
  status: GameStatus;
  grid: Tile[][];
  timer: number;
  initialTime: number;
  score: number;
  combo: number;
  wordsFound: string[];
  powerUps: Record<PowerUpType, PowerUp>;
  highScore: number;
  xp: number;
  level: number;
}

export interface Theme {
    name: string;
    requiredLevel: number;
    isUnlocked: (level: number) => boolean;
    colors: {
        background: string;
        containerBg: string;
        tileBg: string;
        tileText: string;
        tileSelectedBg: string;
        tileSelectedText: string;
        pathLine: string;
        timerBar: string;
        timerBarWarning: string;
        timerBarDanger: string;
        timerBarBg: string;
        buttonBg: string;
        buttonHoverBg: string;
        accentText: string;
        text: string;
        selectionBorder: string;
    };
}