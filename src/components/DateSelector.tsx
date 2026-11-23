import React, { useEffect, useId, useRef, useState } from 'react';
import { formatPuzzleDate } from '@/utils/connectionUtils';
import type { Locale } from '@/types';
import { getTranslations } from '@/i18n/translations';

interface DateSelectorProps {
  locale?: Locale;
  dates: string[];
  selectedDate: string;
  onDateChange: (date: string) => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({
  locale = 'en',
  dates,
  selectedDate,
  onDateChange,
}) => {
  const copy = getTranslations(locale);
  const listboxId = useId();
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(() =>
    Math.max(0, dates.indexOf(selectedDate))
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const option = optionRefs.current[activeIndex];
    if (option) {
      option.focus();
      option.scrollIntoView({ block: 'nearest' });
    }
  }, [isOpen, activeIndex]);

  const openMenu = (targetIndex?: number) => {
    const selectedIdx = dates.indexOf(selectedDate);
    const nextIdx =
      targetIndex !== undefined
        ? Math.max(0, Math.min(dates.length - 1, targetIndex))
        : Math.max(0, selectedIdx);
    setActiveIndex(nextIdx);
    setIsOpen(true);
  };

  const closeMenu = (restoreFocus: boolean) => {
    setIsOpen(false);
    if (restoreFocus) {
      triggerRef.current?.focus();
    }
  };

  const selectDate = (date: string) => {
    onDateChange(date);
    closeMenu(true);
  };

  const handleTriggerKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (dates.length === 0) return;
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      if (!isOpen) {
        openMenu();
      }
    } else if (event.key === 'Home') {
      event.preventDefault();
      openMenu(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      openMenu(dates.length - 1);
    } else if (event.key === 'Escape' && isOpen) {
      event.preventDefault();
      closeMenu(true);
    }
  };

  const handleListboxKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (dates.length === 0) return;
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setActiveIndex(prev => (prev + 1) % dates.length);
        break;
      case 'ArrowUp':
        event.preventDefault();
        setActiveIndex(prev => (prev - 1 + dates.length) % dates.length);
        break;
      case 'Home':
        event.preventDefault();
        setActiveIndex(0);
        break;
      case 'End':
        event.preventDefault();
        setActiveIndex(dates.length - 1);
        break;
      case 'Escape':
        event.preventDefault();
        closeMenu(true);
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (dates[activeIndex]) {
          selectDate(dates[activeIndex]);
        }
        break;
      case 'Tab':
        closeMenu(false);
        break;
    }
  };

  return (
    <div ref={containerRef} className="relative inline-block">
      <button
        ref={triggerRef}
        type="button"
        aria-label={copy.selectDateAriaLabel}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls={isOpen ? listboxId : undefined}
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded inline-flex items-center cursor-pointer transition-colors"
        onClick={() => (isOpen ? closeMenu(false) : openMenu())}
        onKeyDown={handleTriggerKeyDown}
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
          id={listboxId}
          role="listbox"
          aria-label={copy.selectDateAriaLabel}
          onKeyDown={handleListboxKeyDown}
          className="absolute start-1/2 -translate-x-1/2 rtl:translate-x-1/2 z-10 mt-1 w-64 max-h-60 overflow-y-auto bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg"
        >
          <div className="py-1">
            {dates.map((date, index) => (
              <button
                ref={el => {
                  optionRefs.current[index] = el;
                }}
                type="button"
                role="option"
                tabIndex={index === activeIndex ? 0 : -1}
                aria-selected={selectedDate === date}
                key={date}
                className={`w-full text-start px-4 py-2 text-sm cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-400 ${
                  selectedDate === date 
                    ? 'bg-blue-500 text-white' 
                    : 'text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                onClick={() => selectDate(date)}
                onMouseEnter={() => setActiveIndex(index)}
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