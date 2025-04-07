import { ConnectionPuzzle } from "../types";
import connectionsData from "../data/connections.json";

export const loadConnectionsData = (): ConnectionPuzzle[] => {
  return connectionsData as ConnectionPuzzle[];
};

export const getConnectionsByDate = (date: string): ConnectionPuzzle | undefined => {
  const connections = loadConnectionsData();
  return connections.find(connection => connection.date === date);
};

export const getConnectionById = (id: number): ConnectionPuzzle | undefined => {
  const connections = loadConnectionsData();
  return connections.find(connection => connection.id === id);
};

export const getAllDates = (): string[] => {
  const connections = loadConnectionsData();
  return connections
    .map(connection => connection.date)
    .sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
};

export const getTodaysPuzzle = (): ConnectionPuzzle | undefined => {
  const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
  const todaysFormatted = `${today.slice(0, 4)}-${today.slice(5, 7)}-${today.slice(8, 10)}`;
  return getConnectionsByDate(todaysFormatted);
};

export const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export const getClosestAvailableDate = (targetDate: string): string => {
  const dates = getAllDates();
  if (dates.includes(targetDate)) return targetDate;
  
  // Find the closest date that is earlier than the target date
  const earlierDates = dates.filter(date => date < targetDate);
  if (earlierDates.length === 0) return dates[0]; // Return earliest date if no earlier date
  
  return earlierDates[earlierDates.length - 1]; // Return the most recent earlier date
};