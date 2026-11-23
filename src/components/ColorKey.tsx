import React from 'react';
import { GROUP_COLORS, Locale } from '@/types';
import { getTranslations } from '@/i18n/translations';

interface ColorKeyProps {
  locale?: Locale;
}

const ColorKey: React.FC<ColorKeyProps> = ({ locale = 'en' }) => {
  const copy = getTranslations(locale);
  const difficultyLevels = [0, 1, 2, 3].map((level) => ({
    level,
    label: copy.difficultyLabels[level],
  }));

  return (
    <div className="flex flex-row flex-wrap justify-center gap-x-3 gap-y-1.5 mb-4">
      {difficultyLevels.map(({ level, label }) => {
        const colors = GROUP_COLORS[level];
        return (
          <div 
            key={level}
            className="flex items-center"
          >
            <div 
              className="w-4 h-4 rounded-sm me-1.5 shrink-0"
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