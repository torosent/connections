import { ConnectionPuzzle, Locale } from "../types";
import connectionsDataEn from "../data/connections.json";
import connectionsDataHe from "../data/connections-he.json";

const DATA_BY_LOCALE: Record<Locale, ConnectionPuzzle[]> = {
  en: connectionsDataEn as ConnectionPuzzle[],
  he: connectionsDataHe as ConnectionPuzzle[],
};

export const loadConnectionsData = (locale: Locale = "en"): ConnectionPuzzle[] => {
  return DATA_BY_LOCALE[locale];
};

export const getConnectionsByDate = (
  date: string,
  locale: Locale = "en"
): ConnectionPuzzle | undefined => {
  const connections = loadConnectionsData(locale);
  return connections.find(connection => connection.date === date);
};

export const getConnectionById = (
  id: number,
  locale: Locale = "en"
): ConnectionPuzzle | undefined => {
  const connections = loadConnectionsData(locale);
  return connections.find(connection => connection.id === id);
};

export const getAllDates = (locale: Locale = "en"): string[] => {
  const connections = loadConnectionsData(locale);
  return connections
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

export const getTodaysPuzzle = (locale: Locale = "en"): ConnectionPuzzle | undefined => {
  return getConnectionsByDate(getLocalTodayIsoDate(), locale);
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
  targetDate: string,
  locale: Locale = "en"
): string => {
  const dates = getAllDates(locale);
  if (dates.length === 0) return "";
  if (dates.includes(targetDate)) return targetDate;

  // Find the closest date that is earlier than the target date
  const earlierDates = dates.filter(date => date < targetDate);
  if (earlierDates.length === 0) return dates[0]; // Return earliest date if no earlier date

  return earlierDates[earlierDates.length - 1]; // Return the most recent earlier date
};