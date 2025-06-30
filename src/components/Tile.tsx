import React from 'react';
import { Tile as TileType, Theme } from '../types';

interface TileProps {
  theme: Theme;
  tile: TileType;
  isSelected: boolean;
  onMouseDown: () => void;
  onMouseEnter: () => void;
  onTouchStart: (event: React.TouchEvent<HTMLDivElement>) => void;
}

const Tile: React.FC<TileProps> = ({ theme, tile, isSelected, onMouseDown, onMouseEnter, onTouchStart }) => {
    const themeColors = theme.colors;

  const tileClasses = `
    flex items-center justify-center aspect-square rounded-lg shadow-md
    text-2xl md:text-3xl font-bold select-none cursor-pointer
    transition-all duration-150 transform touch-none
    ${isSelected
      ? `${themeColors.tileSelectedBg} ${themeColors.tileSelectedText} scale-110 shadow-lg`
      : `${themeColors.tileBg} ${themeColors.tileText} hover:scale-105 hover:${themeColors.tileSelectedBg}`
    }
  `;

  return (
    <div
      className={tileClasses}
      onMouseDown={onMouseDown}
      onMouseEnter={onMouseEnter}
      onTouchStart={onTouchStart}
      data-testid={`tile-${tile.row}-${tile.col}`}
      data-row={tile.row}
      data-col={tile.col}
    >
      {tile.letter}
    </div>
  );
};

export default Tile;