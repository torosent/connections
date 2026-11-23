import React from 'react';
import { ConnectionGroup, GROUP_COLORS } from '@/types';

interface WordTileProps {
  word: string;
  isSelected: boolean;
  isDisabled: boolean;
  solvedGroup?: ConnectionGroup;
  onClick: () => void;
}

const WordTile: React.FC<WordTileProps> = ({ word, isSelected, isDisabled, solvedGroup, onClick }) => {
  const getTileStyle = () => {
    if (solvedGroup) {
      // Use the GROUP_COLORS for solved groups
      const colorInfo = GROUP_COLORS[solvedGroup.level as keyof typeof GROUP_COLORS];
      return {
        backgroundColor: colorInfo.bg,
        color: colorInfo.text,
        border: 'none'
      };
    }
    
    // Use CSS variables for selected/unselected states
    return isSelected ? {
      backgroundColor: 'var(--selected-bg)',
      color: 'var(--selected-text)',
      border: 'none'
    } : {
      backgroundColor: 'var(--tile-bg)',
      color: 'var(--tile-text)',
      border: '1px solid var(--tile-border)'
    };
  };

  return (
    <button
      type="button"
      aria-pressed={isSelected}
      style={getTileStyle()}
      className={`min-w-0 w-full rounded-md px-1 py-1.5 sm:px-2 md:p-3 text-[10.5px] sm:text-xs md:text-base font-medium leading-tight text-center [overflow-wrap:anywhere] h-14 md:h-16 flex items-center justify-center 
      transition-all duration-200 transform ${isSelected ? 'scale-[0.97] shadow-inner' : 'hover:scale-[1.02] shadow-sm'} 
      uppercase ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:brightness-95'}`}
      onClick={onClick}
      disabled={isDisabled}
    >
      {word}
    </button>
  );
};

export default WordTile;