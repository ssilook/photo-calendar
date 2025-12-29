export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

export function getFirstDayOfWeek(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

export function getMonthName(month: number): string {
  const monthNames = [
    '1월', '2월', '3월', '4월', '5월', '6월',
    '7월', '8월', '9월', '10월', '11월', '12월'
  ];
  return monthNames[month];
}

export function getMonthNameEn(month: number): string {
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return monthNames[month];
}

export function getDayNames(): string[] {
  return ['일', '월', '화', '수', '목', '금', '토'];
}

export function getDayNamesEn(): string[] {
  return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
}

export function generateCalendarGrid(year: number, month: number): (number | null)[][] {
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfWeek(year, month);

  const grid: (number | null)[][] = [];
  let currentDay = 1;

  for (let week = 0; week < 6; week++) {
    const weekRow: (number | null)[] = [];

    for (let day = 0; day < 7; day++) {
      if (week === 0 && day < firstDay) {
        weekRow.push(null);
      } else if (currentDay > daysInMonth) {
        weekRow.push(null);
      } else {
        weekRow.push(currentDay);
        currentDay++;
      }
    }

    grid.push(weekRow);

    if (currentDay > daysInMonth) {
      break;
    }
  }

  return grid;
}

// 한국 법정공휴일 데이터
const holidaysByYear: { [year: number]: { [key: string]: string } } = {
  2024: {
    '1-1': '신정',
    '2-9': '설날 연휴',
    '2-10': '설날',
    '2-11': '설날 연휴',
    '2-12': '설날 대체공휴일',
    '3-1': '삼일절',
    '4-10': '제22대 국회의원 선거일',
    '5-5': '어린이날',
    '5-6': '어린이날 대체공휴일',
    '5-15': '부처님오신날',
    '6-6': '현충일',
    '8-15': '광복절',
    '9-16': '추석 연휴',
    '9-17': '추석',
    '9-18': '추석 연휴',
    '10-3': '개천절',
    '10-9': '한글날',
    '12-25': '크리스마스',
  },
  2025: {
    '1-1': '신정',
    '1-28': '설날 연휴',
    '1-29': '설날',
    '1-30': '설날 연휴',
    '3-1': '삼일절',
    '3-3': '삼일절 대체공휴일',
    '5-5': '어린이날',
    '5-6': '부처님오신날',
    '6-6': '현충일',
    '8-15': '광복절',
    '10-5': '추석 연휴',
    '10-6': '추석',
    '10-7': '추석 연휴',
    '10-8': '추석 대체공휴일',
    '10-3': '개천절',
    '10-9': '한글날',
    '12-25': '크리스마스',
  },
  2026: {
    '1-1': '신정',
    '2-16': '설날 연휴',
    '2-17': '설날',
    '2-18': '설날 연휴',
    '3-1': '삼일절',
    '5-5': '어린이날',
    '5-24': '부처님오신날',
    '5-25': '부처님오신날 대체공휴일',
    '6-6': '현충일',
    '8-15': '광복절',
    '9-24': '추석 연휴',
    '9-25': '추석',
    '9-26': '추석 연휴',
    '10-3': '개천절',
    '10-9': '한글날',
    '12-25': '크리스마스',
  },
  2027: {
    '1-1': '신정',
    '2-6': '설날 연휴',
    '2-7': '설날',
    '2-8': '설날 연휴',
    '2-9': '설날 대체공휴일',
    '3-1': '삼일절',
    '5-5': '어린이날',
    '5-13': '부처님오신날',
    '6-6': '현충일',
    '8-15': '광복절',
    '8-16': '광복절 대체공휴일',
    '10-14': '추석 연휴',
    '10-15': '추석',
    '10-16': '추석 연휴',
    '10-3': '개천절',
    '10-4': '개천절 대체공휴일',
    '10-9': '한글날',
    '12-25': '크리스마스',
  },
};

// 공휴일 확인 함수
export function isHoliday(year: number, month: number, day: number): boolean {
  const yearHolidays = holidaysByYear[year];
  if (yearHolidays) {
    const key = `${month + 1}-${day}`;
    return key in yearHolidays;
  }
  return false;
}

// 공휴일 이름 반환 함수
export function getHolidayName(year: number, month: number, day: number): string | null {
  const yearHolidays = holidaysByYear[year];
  if (yearHolidays) {
    const key = `${month + 1}-${day}`;
    return yearHolidays[key] || null;
  }
  return null;
}

// 주말 확인 함수
export function isWeekend(year: number, month: number, day: number): { isSunday: boolean; isSaturday: boolean } {
  const date = new Date(year, month, day);
  const dayOfWeek = date.getDay();
  return {
    isSunday: dayOfWeek === 0,
    isSaturday: dayOfWeek === 6,
  };
}
