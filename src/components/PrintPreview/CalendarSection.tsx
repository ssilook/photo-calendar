import { generateCalendarGrid, getDayNames, getMonthName, isHoliday, isWeekend, getHolidayName } from '../../utils/calendarUtils';
import './CalendarSection.css';

interface CalendarSectionProps {
  year: number;
  month: number;
}

export function CalendarSection({ year, month }: CalendarSectionProps) {
  const grid = generateCalendarGrid(year, month);
  const dayNames = getDayNames();

  return (
    <div className="calendar-section-print">
      <div className="calendar-header">
        <div className="year-display-print">{year}년</div>
        <h2 className="month-title-print">{getMonthName(month)}</h2>
      </div>

      <div className="calendar-table">
        <div className="calendar-day-names">
          {dayNames.map((day, index) => (
            <div
              key={index}
              className={`day-name ${index === 0 ? 'sunday' : ''} ${
                index === 6 ? 'saturday' : ''
              }`}
            >
              {day}
            </div>
          ))}
        </div>

        <div className="calendar-grid-print">
          {grid.map((week, weekIndex) => (
            <div key={weekIndex} className="calendar-row">
              {week.map((day, dayIndex) => {
                if (day === null) {
                  return <div key={dayIndex} className="calendar-cell empty"></div>;
                }

                const weekend = isWeekend(year, month, day);
                const holiday = isHoliday(year, month, day);
                const holidayName = getHolidayName(year, month, day);

                const classes = [
                  'calendar-cell',
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
    </div>
  );
}
