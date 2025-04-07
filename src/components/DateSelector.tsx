import React, { useState, useEffect } from 'react';
import { getAllDates } from '@/utils/connectionUtils';

interface DateSelectorProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({ selectedDate, onDateChange }) => {
  const [dates, setDates] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setDates(getAllDates());
  }, []);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <div className="relative">
      <button 
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded inline-flex items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{formatDate(selectedDate)}</span>
        <svg 
          className="ml-2 w-4 h-4" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      {isOpen && (
        <div className="absolute z-10 mt-1 w-64 max-h-60 overflow-y-auto bg-white border border-gray-300 rounded-md shadow-lg">
          <div className="py-1">
            {dates.map((date) => (
              <button
                key={date}
                className={`w-full text-left px-4 py-2 text-sm ${
                  selectedDate === date 
                    ? 'bg-blue-500 text-white' 
                    : 'text-gray-800 hover:bg-gray-100'
                }`}
                onClick={() => {
                  onDateChange(date);
                  setIsOpen(false);
                }}
              >
                {formatDate(date)}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DateSelector;