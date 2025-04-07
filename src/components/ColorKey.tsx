import React from 'react';
import { GROUP_COLORS } from '@/types';

const ColorKey: React.FC = () => {
  const difficultyLevels = [
    { level: 0, label: 'Easy' },
    { level: 1, label: 'Medium' },
    { level: 2, label: 'Hard' },
    { level: 3, label: 'Very Hard' }
  ];

  return (
    <div className="flex flex-row justify-center gap-2 mb-4">
      {difficultyLevels.map(({ level, label }) => {
        const colors = GROUP_COLORS[level];
        return (
          <div 
            key={level}
            className="flex items-center"
          >
            <div 
              className="w-4 h-4 rounded-sm mr-1"
              style={{ backgroundColor: colors.bg }}
            ></div>
            <span className="text-xs">{label}</span>
          </div>
        );
      })}
    </div>
  );
};

export default ColorKey;