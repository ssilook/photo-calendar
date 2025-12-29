import { useCalendar } from '../../contexts/CalendarContext';
import './YearSelector.css';

export function YearSelector() {
  const { state, dispatch } = useCalendar();

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const year = parseInt(e.target.value, 10);
    if (!isNaN(year) && year >= 2020 && year <= 2030) {
      dispatch({ type: 'SET_YEAR', year });
    }
  };

  return (
    <div className="year-selector">
      <label htmlFor="year-input">연도: </label>
      <input
        id="year-input"
        type="number"
        min="2020"
        max="2030"
        value={state.year}
        onChange={handleYearChange}
      />
    </div>
  );
}
