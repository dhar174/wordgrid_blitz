import { useState, useEffect, useCallback, useRef } from 'react';
import { GameState, GameStatus, Tile, PowerUpType } from '../types';
import { generateGrid, areTilesAdjacent, shuffleGrid } from '../utils/gridHelper';
import { wordSet } from '../services/wordlist';
import { BASE_INITIAL_TIME, TIME_PER_LEVEL, SCORE_VALUES, TIME_BONUSES, XP_PER_LEVEL, BASE_XP_PER_GAME } from '../constants';

const getInitialState = (): GameState => {
    const savedHighScore = parseInt(localStorage.getItem('wordgrid_highScore') || '0', 10);
    const savedXP = parseInt(localStorage.getItem('wordgrid_xp') || '0', 10);
    const savedLevel = parseInt(localStorage.getItem('wordgrid_level') || '1', 10);
    const initialTime = BASE_INITIAL_TIME + (savedLevel - 1) * TIME_PER_LEVEL;

    return {
        status: GameStatus.READY,
        grid: [],
        timer: initialTime,
        initialTime: initialTime,
        score: 0,
        combo: 1,
        wordsFound: [],
        powerUps: {
            [PowerUpType.FREEZE_TIME]: { type: PowerUpType.FREEZE_TIME, isAvailable: false },
            [PowerUpType.SHUFFLE]: { type: PowerUpType.SHUFFLE, isAvailable: false },
        },
        highScore: savedHighScore,
        xp: savedXP,
        level: savedLevel,
    };
};

export const useGameEngine = () => {
    const [gameState, setGameState] = useState<GameState>(getInitialState);
    const [path, setPath] = useState<Tile[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const comboTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [isTimeFrozen, setIsTimeFrozen] = useState(false);
    
    const [invalidWordCount, setInvalidWordCount] = useState(0);
    const [longWordsCount, setLongWordsCount] = useState(0);

    const [lastBonus, setLastBonus] = useState<{ score: number; time: number } | null>(null);
    const lastBonusTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const currentWord = path.map(tile => tile.letter).join('');

    const stopTimer = useCallback(() => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    }, []);

    const startGame = useCallback(() => {
        stopTimer();
        setGameState(prev => {
            const initialTime = BASE_INITIAL_TIME + ((prev.level || 1) - 1) * TIME_PER_LEVEL;
            return {
                ...getInitialState(),
                highScore: prev.highScore,
                xp: prev.xp,
                level: prev.level,
                status: GameStatus.PLAYING,
                grid: generateGrid(),
                timer: initialTime,
                initialTime: initialTime,
            }
        });
        setInvalidWordCount(0);
        setLongWordsCount(0);
    }, [stopTimer]);

    const endGame = useCallback(() => {
        stopTimer();
        setGameState(prev => {
            const newHighScore = Math.max(prev.score, prev.highScore);
            const newXp = prev.xp + BASE_XP_PER_GAME + Math.floor(prev.score / 10);
            const newLevel = Math.floor(newXp / XP_PER_LEVEL) + 1;

            localStorage.setItem('wordgrid_highScore', newHighScore.toString());
            localStorage.setItem('wordgrid_xp', newXp.toString());
            localStorage.setItem('wordgrid_level', newLevel.toString());
            
            return {
                ...prev,
                status: GameStatus.FINISHED,
                highScore: newHighScore,
                xp: newXp,
                level: newLevel,
            };
        });
    }, [stopTimer]);

    useEffect(() => {
        if (gameState.status === GameStatus.PLAYING && !isTimeFrozen) {
            timerRef.current = setInterval(() => {
                setGameState(prev => {
                    const newTime = prev.timer - 100;
                    if (newTime <= 0) {
                        endGame();
                        return { ...prev, timer: 0 };
                    }
                    return { ...prev, timer: newTime };
                });
            }, 100);
        } else {
            stopTimer();
        }
        return () => stopTimer();
    }, [gameState.status, isTimeFrozen, endGame, stopTimer]);

    const resetCombo = useCallback(() => {
        setGameState(prev => ({ ...prev, combo: 1 }));
    }, []);

    const submitWord = useCallback((word: string) => {
        if (word.length < 3 || gameState.wordsFound.includes(word) || !wordSet.has(word.toLowerCase())) {
            if (word.length >= 3) {
                 setInvalidWordCount(prev => {
                    const newCount = prev + 1;
                    if(newCount >= 3){
                        setGameState(g => ({ ...g, powerUps: { ...g.powerUps, [PowerUpType.SHUFFLE]: { type: PowerUpType.SHUFFLE, isAvailable: true } } }));
                        return 0;
                    }
                    return newCount;
                });
            }
            resetCombo();
            return;
        }

        const scoreToAdd = Math.floor((SCORE_VALUES[word.length] || SCORE_VALUES[8]) * gameState.combo);
        const timeToAdd = Math.floor((TIME_BONUSES[word.length] || TIME_BONUSES[6]) * gameState.combo);

        if (lastBonusTimeoutRef.current) {
            clearTimeout(lastBonusTimeoutRef.current);
        }
        setLastBonus({ score: scoreToAdd, time: timeToAdd });
        lastBonusTimeoutRef.current = setTimeout(() => setLastBonus(null), 1500);


        setGameState(prev => ({
            ...prev,
            score: prev.score + scoreToAdd,
            timer: prev.timer + timeToAdd,
            wordsFound: [word, ...prev.wordsFound],
            combo: Math.min(prev.combo + 0.5, 5),
        }));
        
        if (word.length >= 4) {
            setLongWordsCount(prev => {
                const newCount = prev + 1;
                if(newCount >= 5){
                    setGameState(g => ({ ...g, powerUps: { ...g.powerUps, [PowerUpType.FREEZE_TIME]: { type: PowerUpType.FREEZE_TIME, isAvailable: true } } }));
                    return 0;
                }
                return newCount;
            });
        }

        if (comboTimeoutRef.current) clearTimeout(comboTimeoutRef.current);
        comboTimeoutRef.current = setTimeout(resetCombo, 3000);

    }, [gameState.wordsFound, gameState.combo, resetCombo]);
    
    const applyPowerUp = useCallback((type: PowerUpType) => {
        if (!gameState.powerUps[type].isAvailable) return;

        setGameState(prev => ({ ...prev, powerUps: { ...prev.powerUps, [type]: { ...prev.powerUps[type], isAvailable: false } } }));
        
        if(type === PowerUpType.FREEZE_TIME) {
            setIsTimeFrozen(true);
            setTimeout(() => setIsTimeFrozen(false), 5000);
        }

        if(type === PowerUpType.SHUFFLE) {
            setGameState(prev => ({...prev, grid: shuffleGrid(prev.grid)}));
        }
    }, [gameState.powerUps]);


    const handleInteractionStart = useCallback((tile: Tile) => {
        if (gameState.status !== GameStatus.PLAYING) return;
        setIsDragging(true);
        setPath([tile]);
    }, [gameState.status]);

    const handleInteractionMove = useCallback((tile: Tile) => {
        if (!isDragging || path.some(p => p.id === tile.id)) return;
        const lastTile = path[path.length - 1];
        if (lastTile && areTilesAdjacent(lastTile, tile)) {
            setPath(prev => [...prev, tile]);
        }
    }, [isDragging, path]);

    const handleInteractionEnd = useCallback(() => {
        if (!isDragging) return;
        setIsDragging(false);
        if (path.length > 0) {
            submitWord(currentWord);
        }
        setPath([]);
    }, [isDragging, path, currentWord, submitWord]);

    return { gameState, startGame, currentWord, path, handleInteractionStart, handleInteractionMove, handleInteractionEnd, applyPowerUp, lastBonus };
};