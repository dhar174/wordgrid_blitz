import React from 'react';
import { Tile as TileType, Theme } from '../types';
import Tile from './Tile';
import { GRID_SIZE } from '../constants';


interface GridProps {
  theme: Theme;
  grid: TileType[][];
  path: TileType[];
  onInteractionStart: (tile: TileType) => void;
  onInteractionMove: (tile: TileType) => void;
  onInteractionEnd: () => void;
}

const Grid: React.FC<GridProps> = ({ theme, grid, path, onInteractionStart, onInteractionMove, onInteractionEnd }) => {
  const themeColors = theme.colors;

  if (!grid || grid.length === 0) return null;

  const gridRef = React.useRef<HTMLDivElement>(null);
  const pathIds = new Set(path.map(p => p.id));
  
  const handleMouseUp = () => {
    onInteractionEnd();
  };
  
  React.useEffect(() => {
    // Add listener to the window to catch mouseup/touchend events even outside the grid.
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchend', handleMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [onInteractionEnd]);

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    e.preventDefault(); // Prevent scrolling
    const touch = e.touches[0];
    const element = document.elementFromPoint(touch.clientX, touch.clientY) as HTMLElement | null;
    const rowStr = element?.dataset.row;
    const colStr = element?.dataset.col;
    if (rowStr !== undefined && colStr !== undefined) {
      const row = parseInt(rowStr, 10);
      const col = parseInt(colStr, 10);
      if (grid[row] && grid[row][col]) {
        const targetTile = grid[row][col];
        onInteractionMove(targetTile);
      }
    }
  };

  return (
    <div
      ref={gridRef}
      className="relative aspect-square"
      onMouseLeave={onInteractionEnd} // End interaction if mouse leaves the grid area
      onTouchMove={handleTouchMove}
    >
      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
        {path.length > 1 && (
          <path
            d={`M ${path.map(tile => `${((tile.col + 0.5) * 100) / GRID_SIZE}% ${((tile.row + 0.5) * 100) / GRID_SIZE}%`).join(' L ')}`}
            className={`${themeColors.pathLine}`}
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        )}
      </svg>
      <div
        className="grid gap-2 select-none"
        style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))` }}
      >
        {grid.flat().map((tile) => (
          <Tile
            key={tile.id}
            theme={theme}
            tile={tile}
            isSelected={pathIds.has(tile.id)}
            onMouseDown={() => onInteractionStart(tile)}
            onMouseEnter={() => onInteractionMove(tile)}
            onTouchStart={(e) => {
                e.preventDefault();
                onInteractionStart(tile);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Grid;