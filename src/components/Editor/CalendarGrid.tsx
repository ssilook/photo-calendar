import { generateCalendarGrid, getDayNames } from '../../utils/calendarUtils';
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
          <div key={index} className="calendar-day-name">
            {day}
          </div>
        ))}
      </div>
      <div className="calendar-days">
        {grid.map((week, weekIndex) => (
          <div key={weekIndex} className="calendar-week">
            {week.map((day, dayIndex) => (
              <div
                key={dayIndex}
                className={`calendar-day ${day === null ? 'empty' : ''}`}
              >
                {day}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
