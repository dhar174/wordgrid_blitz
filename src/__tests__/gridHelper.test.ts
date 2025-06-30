import { describe, test, expect } from 'vitest';
import { generateGrid, areTilesAdjacent, shuffleGrid } from '../utils/gridHelper';
import { GRID_SIZE, VOWELS, MIN_VOWELS } from '../constants';
import { Tile } from '../types';

describe('grid helpers', () => {
  test('generateGrid returns a 5x5 array with at least MIN_VOWELS vowels', () => {
    const grid = generateGrid();
    expect(grid).toHaveLength(GRID_SIZE);
    grid.forEach(row => expect(row).toHaveLength(GRID_SIZE));
    const vowelCount = grid.flat().filter(t => VOWELS.has(t.letter)).length;
    expect(vowelCount).toBeGreaterThanOrEqual(MIN_VOWELS);
  });

  test('areTilesAdjacent correctly detects adjacency', () => {
    const a: Tile = { id: '0-0', row: 0, col: 0, letter: 'A' };
    const b: Tile = { id: '0-1', row: 0, col: 1, letter: 'B' };
    const c: Tile = { id: '1-1', row: 1, col: 1, letter: 'C' };
    const d: Tile = { id: '2-2', row: 2, col: 2, letter: 'D' };

    expect(areTilesAdjacent(a, b)).toBe(true); // horizontal
    expect(areTilesAdjacent(a, c)).toBe(true); // diagonal
    expect(areTilesAdjacent(a, d)).toBe(false); // too far
  });

  test('shuffleGrid preserves all letters but rearranges them', () => {
    const grid = generateGrid();
    const originalLetters = grid.flat().map(t => t.letter).sort().join('');
    const shuffled = shuffleGrid(grid);
    const shuffledLetters = shuffled.flat().map(t => t.letter).sort().join('');
    expect(shuffled).not.toEqual(grid);
    expect(shuffledLetters).toEqual(originalLetters);
  });
});
