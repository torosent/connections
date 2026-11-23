"use client";

import { useMemo, useState, useSyncExternalStore } from 'react';
import {
  getAllDates,
  getClosestAvailableDate,
  getConnectionsByDate,
  getLocalTodayIsoDate,
} from '@/utils/connectionUtils';
import type { ConnectionPuzzle, Locale } from '@/types';
import { getTranslations } from '@/i18n/translations';
import GameBoard from '@/components/GameBoard';
import DateSelector from '@/components/DateSelector';
import ThemeToggle from '@/components/ThemeToggle';
import LanguageToggle from '@/components/LanguageToggle';
import { useTheme } from '@/context/ThemeContext';

const emptySubscribe = () => () => {};

interface ConnectionsGameProps {
  locale: Locale;
  puzzles: ConnectionPuzzle[];
}

export default function ConnectionsGame({ locale, puzzles }: ConnectionsGameProps) {
  const copy = getTranslations(locale);
  const dates = useMemo(() => getAllDates(puzzles), [puzzles]);
  const initialDate = useSyncExternalStore(
    emptySubscribe,
    () => (dates.length > 0 ? getClosestAvailableDate(puzzles, getLocalTodayIsoDate()) : ''),
    () => ''
  );
  const [userSelectedDate, setUserSelectedDate] = useState<string | null>(null);
  const { resolvedTheme, toggleTheme } = useTheme();

  const selectedDate = userSelectedDate ?? initialDate;
  const currentPuzzle = selectedDate ? (getConnectionsByDate(puzzles, selectedDate) ?? null) : null;
  const isLoading = !selectedDate;

  const handleDateChange = (date: string) => {
    setUserSelectedDate(date);
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-8">
      <div className="w-full max-w-2xl mx-auto">
        <header className="text-center mb-6">
          <div className="flex items-center justify-end gap-2 mb-3">
            <LanguageToggle locale={locale} />
            <ThemeToggle
              isDarkMode={resolvedTheme === 'dark'}
              toggleTheme={toggleTheme}
              lightLabel={copy.switchToLight}
              darkLabel={copy.switchToDark}
            />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{copy.title}</h1>
          <p className="text-sm mb-4 leading-relaxed">{copy.instructions}</p>
          <div className="mt-4 mb-8">
            {selectedDate && (
              <DateSelector
                locale={locale}
                dates={dates}
                selectedDate={selectedDate}
                onDateChange={handleDateChange}
              />
            )}
          </div>
        </header>

        {isLoading ? (
          <div className="text-center">
            <p>{copy.loadingGame}</p>
          </div>
        ) : (
          <GameBoard
            key={`${locale}-${currentPuzzle?.id ?? 'empty'}`}
            locale={locale}
            puzzle={currentPuzzle}
            onNewGame={() => {
              if (dates.length > 0) {
                let randomDate = selectedDate;
                if (dates.length > 1) {
                  while (randomDate === selectedDate) {
                    randomDate = dates[Math.floor(Math.random() * dates.length)];
                  }
                }
                handleDateChange(randomDate);
              }
            }}
          />
        )}

        <footer className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>{copy.footerLine1}</p>
          <p className="mt-1">{copy.footerLine2}</p>
        </footer>
      </div>
    </main>
  );
}
