import { useEffect } from 'react';
import type { CalendarState } from '../types/calendar';

const STORAGE_KEY = 'photo-calendar-state';

export function saveToLocalStorage(state: CalendarState) {
  try {
    const serialized = JSON.stringify(state);
    localStorage.setItem(STORAGE_KEY, serialized);
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
  }
}

export function loadFromLocalStorage(): CalendarState | null {
  try {
    const serialized = localStorage.getItem(STORAGE_KEY);
    if (serialized === null) {
      return null;
    }
    return JSON.parse(serialized);
  } catch (error) {
    console.error('Failed to load from localStorage:', error);
    return null;
  }
}

export function useAutoSave(state: CalendarState) {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      saveToLocalStorage(state);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [state]);
}
