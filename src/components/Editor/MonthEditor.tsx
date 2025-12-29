import { useCalendar } from '../../contexts/CalendarContext';
import { CalendarGrid } from './CalendarGrid';
import { PhotoSlot } from './PhotoSlot';
import { getMonthName } from '../../utils/calendarUtils';
import './MonthEditor.css';

export function MonthEditor() {
  const { state } = useCalendar();
  const currentMonthData = state.months[state.currentMonth];

  return (
    <div className="month-editor">
      <h2 className="month-title">
        {state.year}년 {getMonthName(state.currentMonth)}
      </h2>

      <div className="photo-slots-section">
        <h3>사진 슬롯</h3>
        <div className="photo-slots">
          {[0, 1, 2].map((slotIndex) => (
            <PhotoSlot
              key={slotIndex}
              month={state.currentMonth}
              slotIndex={slotIndex as 0 | 1 | 2}
              photo={currentMonthData.photos[slotIndex]}
            />
          ))}
        </div>
      </div>

      <div className="calendar-section">
        <h3>달력 미리보기</h3>
        <CalendarGrid year={currentMonthData.year} month={currentMonthData.month} />
      </div>
    </div>
  );
}
