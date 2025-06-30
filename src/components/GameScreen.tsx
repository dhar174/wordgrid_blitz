import React from 'react';
import { GameState, Tile, PowerUpType, Theme } from '../types';
import Grid from './Grid';
import Timer from './Timer';
import Scoreboard from './Scoreboard';
import PowerUpButton from './PowerUpButton';

interface GameScreenProps {
    theme: Theme;
    gameState: GameState;
    currentWord: string;
    path: Tile[];
    onInteractionStart: (tile: Tile) => void;
    onInteractionMove: (tile: Tile) => void;
    onInteractionEnd: () => void;
    onApplyPowerUp: (type: PowerUpType) => void;
    lastBonus: { score: number; time: number } | null;
}

const GameScreen: React.FC<GameScreenProps> = ({
    theme,
    gameState,
    currentWord,
    path,
    onInteractionStart,
    onInteractionMove,
    onInteractionEnd,
    onApplyPowerUp,
    lastBonus,
}) => {
    const themeColors = theme.colors;

    return (
        <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="w-full md:w-1/3 order-2 md:order-1 flex flex-col gap-4">
                <Scoreboard
                    theme={theme}
                    score={gameState.score}
                    combo={gameState.combo}
                    wordsFound={gameState.wordsFound}
                    highScore={gameState.highScore}
                    lastBonus={lastBonus}
                />
                <div className="grid grid-cols-2 gap-2">
                    <PowerUpButton theme={theme} powerUp={gameState.powerUps[PowerUpType.FREEZE_TIME]} onClick={() => onApplyPowerUp(PowerUpType.FREEZE_TIME)} label="Freeze (5s)" />
                    <PowerUpButton theme={theme} powerUp={gameState.powerUps[PowerUpType.SHUFFLE]} onClick={() => onApplyPowerUp(PowerUpType.SHUFFLE)} label="Shuffle"/>
                </div>
            </div>

            <div className="w-full md:w-2/3 order-1 md:order-2">
                <Timer
                    theme={theme}
                    time={gameState.timer}
                    initialTime={gameState.initialTime}
                />
                <div className="relative my-4">
                     <div className={`absolute -top-10 left-1/2 -translate-x-1/2 w-full text-center text-3xl font-bold tracking-widest uppercase transition-opacity duration-200 ${currentWord.length > 0 ? 'opacity-100' : 'opacity-0'} ${themeColors.accentText}`}>
                        {currentWord || ' '}
                    </div>
                    <Grid
                        theme={theme}
                        grid={gameState.grid}
                        path={path}
                        onInteractionStart={onInteractionStart}
                        onInteractionMove={onInteractionMove}
                        onInteractionEnd={onInteractionEnd}
                    />
                </div>
            </div>
        </div>
    );
};

export default GameScreen;