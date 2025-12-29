import type { MonthData } from '../../types/calendar';
import { PhotoSection } from './PhotoSection';
import { CalendarSection } from './CalendarSection';
import './CalendarPage.css';

interface CalendarPageProps {
  monthData: MonthData;
}

export function CalendarPage({ monthData }: CalendarPageProps) {
  return (
    <div className="calendar-page">
      <PhotoSection photos={monthData.photos} />
      <CalendarSection year={monthData.year} month={monthData.month} />
    </div>
  );
}
