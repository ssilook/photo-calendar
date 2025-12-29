import { generateCalendarGrid, getDayNames, getMonthName } from '../../utils/calendarUtils';
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
        <h2 className="month-year-title">
          {year}년 {getMonthName(month)}
        </h2>
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
              {week.map((day, dayIndex) => (
                <div
                  key={dayIndex}
                  className={`calendar-cell ${day === null ? 'empty' : ''} ${
                    dayIndex === 0 ? 'sunday' : ''
                  } ${dayIndex === 6 ? 'saturday' : ''}`}
                >
                  {day}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
