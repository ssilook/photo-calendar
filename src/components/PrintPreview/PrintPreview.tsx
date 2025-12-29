import { useCalendar } from '../../contexts/CalendarContext';
import { CalendarPage } from './CalendarPage';
import './PrintPreview.css';

interface PrintPreviewProps {
  onBack: () => void;
}

export function PrintPreview({ onBack }: PrintPreviewProps) {
  const { state } = useCalendar();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="print-preview">
      <div className="print-preview-toolbar no-print">
        <button onClick={onBack} className="back-button">
          ← 편집기로 돌아가기
        </button>
        <h1>인쇄 미리보기</h1>
        <button onClick={handlePrint} className="print-button">
          인쇄하기
        </button>
      </div>

      <div className="print-preview-pages">
        {state.months.map((monthData, index) => (
          <CalendarPage key={index} monthData={monthData} />
        ))}
      </div>
    </div>
  );
}
