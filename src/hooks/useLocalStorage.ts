import { useEffect } from 'react';
import type { CalendarState } from '../types/calendar';

const STORAGE_KEY = 'photo-calendar-state';
const VERSION_KEY = 'photo-calendar-version';
const CURRENT_VERSION = '2'; // 버전 2: orientation 필드 추가

export function saveToLocalStorage(state: CalendarState) {
  try {
    const serialized = JSON.stringify(state);
    localStorage.setItem(STORAGE_KEY, serialized);
    localStorage.setItem(VERSION_KEY, CURRENT_VERSION);
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
  }
}

export function loadFromLocalStorage(): CalendarState | null {
  try {
    const version = localStorage.getItem(VERSION_KEY);

    // 버전이 다르면 초기화
    if (version !== CURRENT_VERSION) {
      console.log('Version mismatch, clearing localStorage');
      localStorage.removeItem(STORAGE_KEY);
      localStorage.setItem(VERSION_KEY, CURRENT_VERSION);
      return null;
    }

    const serialized = localStorage.getItem(STORAGE_KEY);
    if (serialized === null) {
      return null;
    }

    const state = JSON.parse(serialized);

    // 데이터 유효성 검사
    if (!state.months || !Array.isArray(state.months)) {
      return null;
    }

    return state;
  } catch (error) {
    console.error('Failed to load from localStorage:', error);
    // 에러 발생 시 localStorage 초기화
    localStorage.removeItem(STORAGE_KEY);
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
