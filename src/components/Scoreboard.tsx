import React from 'react';
import { Theme } from '../types';

interface ScoreboardProps {
  theme: Theme;
  score: number;
  combo: number;
  wordsFound: string[];
  highScore: number;
  lastBonus: { score: number; time: number } | null;
}

const Scoreboard: React.FC<ScoreboardProps> = ({ theme, score, combo, wordsFound, highScore, lastBonus }) => {
    const themeColors = theme.colors;

  return (
    <div className={`p-4 rounded-lg shadow-lg w-full ${themeColors.containerBg} relative`}>
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {`Score: ${score}, Combo: x${combo.toFixed(1)}`}
      </div>

      {lastBonus && (
        <div 
          key={Date.now()} 
          className={`absolute -top-8 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full ${themeColors.timerBar} ${themeColors.tileSelectedText} font-bold text-lg animate-bonus-popup whitespace-nowrap z-20`}>
          +{lastBonus.score} (+{lastBonus.time / 1000}s)
        </div>
      )}
      <div className="flex justify-between items-center mb-4">
        <div>
          <p className={`text-sm uppercase font-semibold tracking-wider ${themeColors.text}`}>Score</p>
          <p className={`text-4xl font-bold ${themeColors.accentText}`}>{score}</p>
        </div>
        <div className="text-right">
          <p className={`text-sm uppercase font-semibold tracking-wider ${themeColors.text}`}>High Score</p>
          <p className={`text-lg font-semibold ${themeColors.text}`}>{highScore}</p>
        </div>
      </div>

      <div className={`absolute top-0 right-0 -mt-2 -mr-2 ${themeColors.buttonBg} text-white text-xs font-bold px-2 py-1 rounded-full transition-opacity duration-300 ${combo > 1 ? 'animate-pulse' : 'opacity-60'}`}>
          x{combo.toFixed(1)}
      </div>

      <div className="h-64 overflow-y-auto pr-2" role="log" aria-live="polite">
        <h3 className={`text-lg font-semibold mb-2 ${themeColors.text}`}>Found Words ({wordsFound.length})</h3>
        <ul className="space-y-1">
          {wordsFound.map((word) => (
            <li key={word} className={`text-md capitalize ${themeColors.text} `}>
              {word}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Scoreboard;