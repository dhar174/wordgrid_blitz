import React from 'react';
import { GameState, Theme } from '../types';

interface EndScreenProps {
  theme: Theme;
  gameState: GameState;
  onRestart: () => void;
}

const EndScreen: React.FC<EndScreenProps> = ({ theme, gameState, onRestart }) => {
    const themeColors = theme.colors;

  return (
    <div className="text-center p-8">
      <h2 className="text-5xl font-bold text-slate-100 mb-2">Time's Up!</h2>
      <p className={`text-xl mb-6 ${themeColors.text}`}>Your final score is:</p>
      <p className={`text-7xl font-bold mb-8 ${themeColors.accentText}`}>{gameState.score}</p>
      
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className={`${themeColors.containerBg} p-4 rounded-lg`}>
            <p className={`text-sm opacity-75 ${themeColors.text}`}>High Score</p>
            <p className={`text-2xl font-semibold ${themeColors.text}`}>{gameState.highScore}</p>
        </div>
        <div className={`${themeColors.containerBg} p-4 rounded-lg`}>
            <p className={`text-sm opacity-75 ${themeColors.text}`}>Words Found</p>
            <p className={`text-2xl font-semibold ${themeColors.text}`}>{gameState.wordsFound.length}</p>
        </div>
      </div>
      
      <button
        onClick={onRestart}
        className={`w-full max-w-xs px-8 py-4 text-2xl font-bold text-white rounded-lg shadow-lg transition-transform transform hover:scale-105 ${themeColors.buttonBg} hover:${themeColors.buttonHoverBg}`}
      >
        Play Again
      </button>
    </div>
  );
};

export default EndScreen;