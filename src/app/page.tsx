"use client";
import { useState, useEffect } from 'react';
import { getConnectionsByDate, getAllDates, getClosestAvailableDate } from '@/utils/connectionUtils';
import { ConnectionPuzzle } from '@/types';
import GameBoard from '@/components/GameBoard';
import DateSelector from '@/components/DateSelector';
import ThemeToggle from '@/components/ThemeToggle';
import { useTheme } from '@/context/ThemeContext';

export default function Home() {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [currentPuzzle, setCurrentPuzzle] = useState<ConnectionPuzzle | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { resolvedTheme, toggleTheme } = useTheme();

  // Initialize with the most recent date on first load
  useEffect(() => {
    const fetchInitialData = async () => {
      const dates = getAllDates();
      if (dates.length > 0) {
        const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
        const closestDate = getClosestAvailableDate(today);
        setSelectedDate(closestDate);
        loadPuzzleForDate(closestDate);
      }
      setIsLoading(false);
    };

    fetchInitialData();
  }, []);

  const loadPuzzleForDate = async (date: string) => {
    setIsLoading(true);
    const puzzle = getConnectionsByDate(date);
    setCurrentPuzzle(puzzle || null);
    setIsLoading(false);
  };

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    loadPuzzleForDate(date);
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-8">
      <div className="w-full max-w-2xl mx-auto">
        <header className="text-center mb-6 relative">
          <div className="absolute right-0 top-0">
            <ThemeToggle isDarkMode={resolvedTheme === 'dark'} toggleTheme={toggleTheme} />
          </div>
          <h1 className="text-3xl font-bold mb-4">Connections</h1>
          <p className="text-sm mb-4">
            Find groups of four items that share a common connection. Select four items and submit your guess.
            You have four mistakes allowed. The categories are ordered from easiest (yellow) to hardest (purple).
          </p>
          <div className="mt-4 mb-8">
            {selectedDate && (
              <DateSelector 
                selectedDate={selectedDate} 
                onDateChange={handleDateChange} 
              />
            )}
          </div>
        </header>

        {isLoading ? (
          <div className="text-center">
            <p>Loading game...</p>
          </div>
        ) : (
          <GameBoard 
            puzzle={currentPuzzle} 
            onNewGame={() => {
              const dates = getAllDates();
              if (dates.length > 0) {
                // Find a random date that's different from current
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

        <footer className="mt-12 text-center text-sm text-gray-500">
          <p>This is a clone of the New York Times Connections game.</p>
          <p className="mt-1">Created for educational purposes only.</p>
        </footer>
      </div>
    </main>
  );
}
