import { useCalendar } from '../../contexts/CalendarContext';
import { YearSelector } from '../YearSelector/YearSelector';
import { getMonthName } from '../../utils/calendarUtils';
import './Toolbar.css';

interface ToolbarProps {
  onShowPrintPreview: () => void;
}

export function Toolbar({ onShowPrintPreview }: ToolbarProps) {
  const { state, dispatch } = useCalendar();

  const handlePrevMonth = () => {
    const newMonth = state.currentMonth === 0 ? 11 : state.currentMonth - 1;
    dispatch({ type: 'SET_CURRENT_MONTH', month: newMonth });
  };

  const handleNextMonth = () => {
    const newMonth = state.currentMonth === 11 ? 0 : state.currentMonth + 1;
    dispatch({ type: 'SET_CURRENT_MONTH', month: newMonth });
  };

  const handleClearAll = () => {
    if (window.confirm('모든 월의 사진을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
      dispatch({ type: 'CLEAR_ALL_PHOTOS' });
    }
  };

  const hasAnyPhotos = state.months.some((month) =>
    month.photos.some((photo) => photo !== null)
  );

  return (
    <div className="toolbar">
      <div className="toolbar-left">
        <YearSelector />
        {hasAnyPhotos && (
          <button onClick={handleClearAll} className="clear-all-button">
            모든 사진 초기화
          </button>
        )}
      </div>

      <div className="month-navigation">
        <button onClick={handlePrevMonth} className="nav-button">
          ◀ 이전 월
        </button>
        <span className="current-month">{getMonthName(state.currentMonth)}</span>
        <button onClick={handleNextMonth} className="nav-button">
          다음 월 ▶
        </button>
      </div>

      <button onClick={onShowPrintPreview} className="print-preview-button">
        인쇄 미리보기
      </button>
    </div>
  );
}
