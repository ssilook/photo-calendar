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

  return (
    <div className="toolbar">
      <YearSelector />

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
