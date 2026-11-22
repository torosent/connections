import React, { useState, useMemo } from 'react';
import { formatPuzzleDate, getAllDates } from '@/utils/connectionUtils';
import type { Locale } from '@/types';
import { getTranslations } from '@/i18n/translations';

interface DateSelectorProps {
  locale?: Locale;
  selectedDate: string;
  onDateChange: (date: string) => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({
  locale = 'en',
  selectedDate,
  onDateChange,
}) => {
  const copy = getTranslations(locale);
  const dates = useMemo(() => getAllDates(locale), [locale]);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        type="button"
        aria-label={copy.selectDateAriaLabel}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded inline-flex items-center cursor-pointer transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{formatPuzzleDate(selectedDate, locale)}</span>
        <svg 
          className="ms-2 w-4 h-4 shrink-0" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      {isOpen && (
        <div
          role="listbox"
          className="absolute start-1/2 -translate-x-1/2 rtl:translate-x-1/2 z-10 mt-1 w-64 max-h-60 overflow-y-auto bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg"
        >
          <div className="py-1">
            {dates.map((date) => (
              <button
                type="button"
                role="option"
                aria-selected={selectedDate === date}
                key={date}
                className={`w-full text-start px-4 py-2 text-sm cursor-pointer ${
                  selectedDate === date 
                    ? 'bg-blue-500 text-white' 
                    : 'text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                onClick={() => {
                  onDateChange(date);
                  setIsOpen(false);
                }}
              >
                {formatPuzzleDate(date, locale)}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DateSelector;