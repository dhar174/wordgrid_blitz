import React from 'react';
import { GameState, Theme } from '../types';
import { THEMES } from '../constants';

interface ThemeSelectorProps {
    currentTheme: Theme;
    onThemeChange: (theme: Theme) => void;
    gameState: GameState;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ currentTheme, onThemeChange, gameState }) => {

    return (
        <div>
            <h3 className="text-lg font-semibold text-slate-300 mb-3">Themes</h3>
            <div className="flex gap-4 justify-center">
                {THEMES.map((theme) => {
                    const isUnlocked = theme.isUnlocked(gameState.level);
                    const isSelected = theme.name === currentTheme.name;
                    const requiredLevel = theme.requiredLevel;

                    return (
                        <div key={theme.name} className="text-center">
                            <button
                                onClick={() => isUnlocked && onThemeChange(theme)}
                                disabled={!isUnlocked}
                                className={`w-20 h-14 rounded-lg border-4 transition-all ${isSelected ? theme.colors.selectionBorder : 'border-transparent'} ${!isUnlocked ? 'cursor-not-allowed opacity-50' : `hover:${theme.colors.selectionBorder}`}`}
                                title={isUnlocked ? `Select ${theme.name} theme` : `Unlock at Level ${requiredLevel}`}
                            >
                                <div className={`w-full h-full rounded ${theme.colors.background} flex items-center justify-center`}>
                                   <div className={`w-5 h-5 rounded-sm ${theme.colors.tileSelectedBg}`}></div>
                                </div>
                            </button>
                            <p className={`mt-1 text-sm ${isUnlocked ? 'text-slate-300' : 'text-slate-500'}`}>
                                {isUnlocked ? theme.name : `Lvl ${requiredLevel}`}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default ThemeSelector;