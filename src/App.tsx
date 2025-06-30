import React, { useState } from 'react';
import { GameState, GameStatus, Theme } from './types';
import { useGameEngine } from './hooks/useGameEngine';
import GameScreen from './components/GameScreen';
import EndScreen from './components/EndScreen';
import ThemeSelector from './components/ThemeSelector';
import { THEMES } from './constants';

const App: React.FC = () => {
    const [theme, setTheme] = useState<Theme>(() => {
        const stored = localStorage.getItem('wordgrid_theme');
        return THEMES.find(t => t.name === stored) || THEMES[0];
    });
    const { gameState, startGame, currentWord, path, handleInteractionStart, handleInteractionMove, handleInteractionEnd, applyPowerUp, lastBonus } = useGameEngine();

    const handleThemeChange = (newTheme: Theme) => {
        setTheme(newTheme);
        localStorage.setItem('wordgrid_theme', newTheme.name);
    };

    const renderGameState = () => {
        switch (gameState.status) {
            case GameStatus.PLAYING:
                return (
                    <GameScreen
                        theme={theme}
                        gameState={gameState}
                        currentWord={currentWord}
                        path={path}
                        onInteractionStart={handleInteractionStart}
                        onInteractionMove={handleInteractionMove}
                        onInteractionEnd={handleInteractionEnd}
                        onApplyPowerUp={applyPowerUp}
                        lastBonus={lastBonus}
                    />
                );
            case GameStatus.FINISHED:
                return <EndScreen theme={theme} gameState={gameState} onRestart={startGame} />;
            case GameStatus.READY:
            default:
                return (
                    <div className="text-center">
                        <h1 className="text-6xl font-bold text-slate-100 mb-2">WordGrid Blitz</h1>
                        <p className="text-slate-300 mb-8 text-lg">Find words in a 5x5 grid. Longer words give more points and time!</p>
                        <button
                            onClick={startGame}
                            className={`w-full max-w-xs px-8 py-4 text-2xl font-bold text-white rounded-lg shadow-lg transition-transform transform hover:scale-105 ${theme.colors.buttonBg} hover:${theme.colors.buttonHoverBg}`}
                        >
                            Start Game
                        </button>
                        <div className="mt-12">
                            <ThemeSelector currentTheme={theme} onThemeChange={handleThemeChange} gameState={gameState} />
                        </div>
                    </div>
                );
        }
    };

    return (
        <main className={`min-h-screen w-full flex flex-col items-center justify-center p-4 transition-colors duration-500 ${theme.colors.background}`}>
            <div className={`w-full max-w-3xl mx-auto p-4 md:p-6 rounded-2xl shadow-2xl ${theme.colors.containerBg}`}>
                {renderGameState()}
            </div>
            <footer className="text-center mt-6 text-sm text-slate-400">
                <p>Created by a world-class senior frontend React engineer.</p>
            </footer>
        </main>
    );
};

export default App;