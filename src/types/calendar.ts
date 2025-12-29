export type PhotoOrientation = 'landscape' | 'portrait' | 'square';

export interface PhotoTransform {
  id: string;
  src: string; // base64 data URL
  scale: number; // 0.5 ~ 2.0
  rotation: number; // 0, 90, 180, 270
  translateX: number; // pixels
  translateY: number; // pixels
  width: number; // original width
  height: number; // original height
  orientation: PhotoOrientation; // landscape, portrait, square
  crop?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export interface MonthData {
  month: number; // 0-11
  year: number;
  photos: [PhotoTransform | null, PhotoTransform | null, PhotoTransform | null];
}

export interface CalendarState {
  year: number;
  currentMonth: number; // 0-11 (editing view)
  months: MonthData[]; // Array of 12
}

export type CalendarAction =
  | { type: 'SET_YEAR'; year: number }
  | { type: 'SET_CURRENT_MONTH'; month: number }
  | { type: 'ADD_PHOTO'; month: number; slotIndex: 0 | 1 | 2; photo: PhotoTransform }
  | { type: 'UPDATE_PHOTO'; month: number; slotIndex: number; updates: Partial<PhotoTransform> }
  | { type: 'DELETE_PHOTO'; month: number; slotIndex: number }
  | { type: 'CLEAR_MONTH_PHOTOS'; month: number }
  | { type: 'CLEAR_ALL_PHOTOS' }
  | { type: 'LOAD_STATE'; state: CalendarState };
