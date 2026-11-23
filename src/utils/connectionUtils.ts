import { ConnectionPuzzle, Locale } from "../types";

export const getConnectionsByDate = (
  puzzles: ConnectionPuzzle[],
  date: string
): ConnectionPuzzle | undefined => {
  return puzzles.find(connection => connection.date === date);
};

export const getConnectionById = (
  puzzles: ConnectionPuzzle[],
  id: number
): ConnectionPuzzle | undefined => {
  return puzzles.find(connection => connection.id === id);
};

export const getAllDates = (puzzles: ConnectionPuzzle[]): string[] => {
  return puzzles
    .map(connection => connection.date)
    .sort((a, b) => a.localeCompare(b));
};

export const getLocalTodayIsoDate = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const formatPuzzleDate = (dateString: string, locale: Locale = "en"): string => {
  const parts = dateString.split("-").map(Number);
  if (parts.length !== 3 || parts.some(Number.isNaN)) {
    return dateString;
  }
  const [year, month, day] = parts;
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString(locale === "he" ? "he-IL" : "en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export const getTodaysPuzzle = (puzzles: ConnectionPuzzle[]): ConnectionPuzzle | undefined => {
  return getConnectionsByDate(puzzles, getLocalTodayIsoDate());
};

export const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export const getClosestAvailableDate = (
  puzzles: ConnectionPuzzle[],
  targetDate: string
): string => {
  const dates = getAllDates(puzzles);
  if (dates.length === 0) return "";
  if (dates.includes(targetDate)) return targetDate;

  // Find the closest date that is earlier than the target date
  const earlierDates = dates.filter(date => date < targetDate);
  if (earlierDates.length === 0) return dates[0]; // Return earliest date if no earlier date

  return earlierDates[earlierDates.length - 1]; // Return the most recent earlier date
};