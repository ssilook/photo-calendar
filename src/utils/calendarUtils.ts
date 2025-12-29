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
