import { generateCalendarGrid, getDayNames, isHoliday, isWeekend, getHolidayName } from '../../utils/calendarUtils';
import './CalendarGrid.css';

interface CalendarGridProps {
  year: number;
  month: number;
}

export function CalendarGrid({ year, month }: CalendarGridProps) {
  const grid = generateCalendarGrid(year, month);
  const dayNames = getDayNames();

  return (
    <div className="calendar-grid">
      <div className="calendar-days-header">
        {dayNames.map((day, index) => (
          <div
            key={index}
            className={`calendar-day-name ${index === 0 ? 'sunday' : ''} ${
              index === 6 ? 'saturday' : ''
            }`}
          >
            {day}
          </div>
        ))}
      </div>
      <div className="calendar-days">
        {grid.map((week, weekIndex) => (
          <div key={weekIndex} className="calendar-week">
            {week.map((day, dayIndex) => {
              if (day === null) {
                return <div key={dayIndex} className="calendar-day empty"></div>;
              }

              const weekend = isWeekend(year, month, day);
              const holiday = isHoliday(year, month, day);
              const holidayName = getHolidayName(year, month, day);

              const classes = [
                'calendar-day',
                weekend.isSunday && 'sunday',
                weekend.isSaturday && 'saturday',
                holiday && 'holiday',
              ].filter(Boolean).join(' ');

              return (
                <div key={dayIndex} className={classes}>
                  <div className="calendar-day-number">{day}</div>
                  {holidayName && <div className="holiday-name">{holidayName}</div>}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
