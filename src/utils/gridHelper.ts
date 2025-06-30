
import { Tile } from '../types';
import { GRID_SIZE, LETTER_FREQUENCIES, VOWELS, MIN_VOWELS } from '../constants';

const letterPool: string[] = [];
Object.entries(LETTER_FREQUENCIES).forEach(([letter, freq]) => {
  const count = Math.round(freq * 10); // Create a weighted pool
  for (let i = 0; i < count; i++) {
    letterPool.push(letter);
  }
});

const getRandomLetter = (): string => {
  return letterPool[Math.floor(Math.random() * letterPool.length)];
};

export const generateGrid = (): Tile[][] => {
  let grid: Tile[][] = [];
  let vowelCount = 0;

  // Create initial grid
  for (let r = 0; r < GRID_SIZE; r++) {
    grid[r] = [];
    for (let c = 0; c < GRID_SIZE; c++) {
      const letter = getRandomLetter();
      if (VOWELS.has(letter)) {
        vowelCount++;
      }
      grid[r][c] = { id: `${r}-${c}`, row: r, col: c, letter };
    }
  }

  // Ensure minimum vowel count
  while (vowelCount < MIN_VOWELS) {
    const r = Math.floor(Math.random() * GRID_SIZE);
    const c = Math.floor(Math.random() * GRID_SIZE);
    if (!VOWELS.has(grid[r][c].letter)) {
      const vowelArray = Array.from(VOWELS);
      grid[r][c].letter = vowelArray[Math.floor(Math.random() * vowelArray.length)];
      vowelCount++;
    }
  }
  
  return grid;
};

export const shuffleGrid = (grid: Tile[][]): Tile[][] => {
    const letters = grid.flat().map(tile => tile.letter);
    // Fisher-Yates shuffle
    for (let i = letters.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [letters[i], letters[j]] = [letters[j], letters[i]];
    }

    const newGrid = grid.map((row, rIndex) => 
        row.map((tile, cIndex) => ({
            ...tile,
            letter: letters[rIndex * GRID_SIZE + cIndex]
        }))
    );
    return newGrid;
};

export const areTilesAdjacent = (tile1: Tile, tile2: Tile): boolean => {
  const rowDiff = Math.abs(tile1.row - tile2.row);
  const colDiff = Math.abs(tile1.col - tile2.col);
  // Check for 8-directional adjacency
  return rowDiff <= 1 && colDiff <= 1 && (rowDiff !== 0 || colDiff !== 0);
};
