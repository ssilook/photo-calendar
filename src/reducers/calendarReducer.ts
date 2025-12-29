import type { CalendarState, CalendarAction, MonthData } from '../types/calendar';

export function createInitialState(year?: number): CalendarState {
  const currentYear = year || 2026;
  const currentMonth = 0; // 1월부터 시작

  const months: MonthData[] = Array.from({ length: 12 }, (_, i) => ({
    month: i,
    year: currentYear,
    photos: [null, null, null],
  }));

  return {
    year: currentYear,
    currentMonth,
    months,
  };
}

export function calendarReducer(
  state: CalendarState,
  action: CalendarAction
): CalendarState {
  switch (action.type) {
    case 'SET_YEAR': {
      const newMonths = state.months.map((month) => ({
        ...month,
        year: action.year,
      }));

      return {
        ...state,
        year: action.year,
        months: newMonths,
      };
    }

    case 'SET_CURRENT_MONTH': {
      return {
        ...state,
        currentMonth: action.month,
      };
    }

    case 'ADD_PHOTO': {
      const newMonths = [...state.months];
      const monthData = { ...newMonths[action.month] };
      const newPhotos: [any, any, any] = [...monthData.photos] as [any, any, any];
      newPhotos[action.slotIndex] = action.photo;

      monthData.photos = newPhotos;
      newMonths[action.month] = monthData;

      return {
        ...state,
        months: newMonths,
      };
    }

    case 'UPDATE_PHOTO': {
      const newMonths = [...state.months];
      const monthData = { ...newMonths[action.month] };
      const newPhotos: [any, any, any] = [...monthData.photos] as [any, any, any];

      const existingPhoto = newPhotos[action.slotIndex];
      if (existingPhoto) {
        newPhotos[action.slotIndex] = {
          ...existingPhoto,
          ...action.updates,
        };
      }

      monthData.photos = newPhotos;
      newMonths[action.month] = monthData;

      return {
        ...state,
        months: newMonths,
      };
    }

    case 'DELETE_PHOTO': {
      const newMonths = [...state.months];
      const monthData = { ...newMonths[action.month] };
      const newPhotos: [any, any, any] = [...monthData.photos] as [any, any, any];
      newPhotos[action.slotIndex] = null;

      monthData.photos = newPhotos;
      newMonths[action.month] = monthData;

      return {
        ...state,
        months: newMonths,
      };
    }

    case 'CLEAR_MONTH_PHOTOS': {
      const newMonths = [...state.months];
      const monthData = { ...newMonths[action.month] };
      monthData.photos = [null, null, null];
      newMonths[action.month] = monthData;

      return {
        ...state,
        months: newMonths,
      };
    }

    case 'CLEAR_ALL_PHOTOS': {
      const newMonths = state.months.map((month) => ({
        ...month,
        photos: [null, null, null] as [null, null, null],
      }));

      return {
        ...state,
        months: newMonths,
      };
    }

    case 'LOAD_STATE': {
      return action.state;
    }

    default:
      return state;
  }
}
