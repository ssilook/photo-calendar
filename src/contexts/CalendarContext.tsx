import { createContext, useContext, useReducer } from 'react';
import type { ReactNode, Dispatch } from 'react';
import type { CalendarState, CalendarAction } from '../types/calendar';
import { calendarReducer, createInitialState } from '../reducers/calendarReducer';

interface CalendarContextType {
  state: CalendarState;
  dispatch: Dispatch<CalendarAction>;
}

const CalendarContext = createContext<CalendarContextType | undefined>(undefined);

interface CalendarProviderProps {
  children: ReactNode;
  initialState?: CalendarState;
}

export function CalendarProvider({ children, initialState }: CalendarProviderProps) {
  const [state, dispatch] = useReducer(
    calendarReducer,
    initialState || createInitialState()
  );

  return (
    <CalendarContext.Provider value={{ state, dispatch }}>
      {children}
    </CalendarContext.Provider>
  );
}

export function useCalendar() {
  const context = useContext(CalendarContext);
  if (context === undefined) {
    throw new Error('useCalendar must be used within a CalendarProvider');
  }
  return context;
}
