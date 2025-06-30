import { Theme } from './types';

export const GRID_SIZE = 5;
export const BASE_INITIAL_TIME = 20000; // 20 seconds in ms
export const TIME_PER_LEVEL = 1000; // 1 second in ms

export const SCORE_VALUES: { [key: number]: number } = {
  3: 10,
  4: 25,
  5: 50,
  6: 100,
  7: 150,
  8: 200,
};

export const TIME_BONUSES: { [key: number]: number } = {
  3: 1000,
  4: 2000,
  5: 3000,
  6: 4000,
};

export const XP_PER_LEVEL = 2500;
export const BASE_XP_PER_GAME = 50;

export const LETTER_FREQUENCIES: { [key: string]: number } = {
  E: 12.7, T: 9.1, A: 8.2, O: 7.5, I: 7.0, N: 6.7, S: 6.3, H: 6.1, R: 6.0,
  D: 4.3, L: 4.0, C: 2.8, U: 2.8, M: 2.4, W: 2.4, F: 2.2, G: 2.0, Y: 2.0,
  P: 1.9, B: 1.5, V: 1.0, K: 0.8, J: 0.2, X: 0.2, Q: 0.1, Z: 0.1,
};

export const VOWELS = new Set(['A', 'E', 'I', 'O', 'U']);
export const MIN_VOWELS = 7;

export const THEMES: Theme[] = [
    {
        name: 'Midnight',
        requiredLevel: 1,
        isUnlocked: () => true,
        colors: {
            background: 'bg-slate-900',
            containerBg: 'bg-slate-800/50',
            tileBg: 'bg-slate-700',
            tileText: 'text-slate-200',
            tileSelectedBg: 'bg-indigo-500',
            tileSelectedText: 'text-white',
            pathLine: 'stroke-indigo-400',
            timerBar: 'bg-green-500',
            timerBarWarning: 'bg-yellow-500',
            timerBarDanger: 'bg-red-600',
            timerBarBg: 'bg-slate-700',
            buttonBg: 'bg-indigo-600',
            buttonHoverBg: 'bg-indigo-700',
            accentText: 'text-indigo-400',
            text: 'text-slate-300',
            selectionBorder: 'border-indigo-400'
        },
    },
    {
        name: 'Crimson',
        requiredLevel: 3,
        isUnlocked: (level: number) => level >= 3,
        colors: {
            background: 'bg-red-950',
            containerBg: 'bg-red-900/40',
            tileBg: 'bg-red-800',
            tileText: 'text-red-100',
            tileSelectedBg: 'bg-amber-400',
            tileSelectedText: 'text-red-950',
            pathLine: 'stroke-amber-300',
            timerBar: 'bg-sky-400',
            timerBarWarning: 'bg-yellow-400',
            timerBarDanger: 'bg-orange-600',
            timerBarBg: 'bg-red-800',
            buttonBg: 'bg-amber-500',
            buttonHoverBg: 'bg-amber-600',
            accentText: 'text-amber-400',
            text: 'text-red-200',
            selectionBorder: 'border-amber-400'
        }
    },
    {
        name: 'Forest',
        requiredLevel: 5,
        isUnlocked: (level: number) => level >= 5,
        colors: {
            background: 'bg-emerald-950',
            containerBg: 'bg-emerald-900/50',
            tileBg: 'bg-emerald-800',
            tileText: 'text-emerald-100',
            tileSelectedBg: 'bg-lime-400',
            tileSelectedText: 'text-emerald-950',
            pathLine: 'stroke-lime-300',
            timerBar: 'bg-teal-400',
            timerBarWarning: 'bg-yellow-500',
            timerBarDanger: 'bg-red-500',
            timerBarBg: 'bg-emerald-800',
            buttonBg: 'bg-lime-500',
            buttonHoverBg: 'bg-lime-600',
            accentText: 'text-lime-400',
            text: 'text-emerald-200',
            selectionBorder: 'border-lime-400'
        },
    }
];