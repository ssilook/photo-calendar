import { useCalendar } from '../../contexts/CalendarContext';
import { CalendarGrid } from './CalendarGrid';
import { PhotoSlot } from './PhotoSlot';
import { getMonthName } from '../../utils/calendarUtils';
import './MonthEditor.css';

export function MonthEditor() {
  const { state, dispatch } = useCalendar();
  const currentMonthData = state.months[state.currentMonth];

  const handleClearMonthPhotos = () => {
    if (window.confirm(`${getMonthName(state.currentMonth)}의 모든 사진을 삭제하시겠습니까?`)) {
      dispatch({ type: 'CLEAR_MONTH_PHOTOS', month: state.currentMonth });
    }
  };

  const hasPhotos = currentMonthData.photos.some((photo) => photo !== null);

  return (
    <div className="month-editor">
      <div className="month-header">
        <div className="year-display">{state.year}년</div>
        <h2 className="month-title">{getMonthName(state.currentMonth)}</h2>
      </div>

      <div className="photo-slots-section">
        <div className="section-header">
          <h3>사진 슬롯</h3>
          {hasPhotos && (
            <button onClick={handleClearMonthPhotos} className="clear-month-button">
              이번 달 사진 초기화
            </button>
          )}
        </div>
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
