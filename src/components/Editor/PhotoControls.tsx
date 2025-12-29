import { useCalendar } from '../../contexts/CalendarContext';
import type { PhotoTransform } from '../../types/calendar';
import './PhotoControls.css';

interface PhotoControlsProps {
  month: number;
  slotIndex: number;
  photo: PhotoTransform;
}

export function PhotoControls({ month, slotIndex, photo }: PhotoControlsProps) {
  const { dispatch } = useCalendar();

  const handleRotateLeft = () => {
    const newRotation = (photo.rotation - 90 + 360) % 360;
    dispatch({
      type: 'UPDATE_PHOTO',
      month,
      slotIndex,
      updates: { rotation: newRotation },
    });
  };

  const handleRotateRight = () => {
    const newRotation = (photo.rotation + 90) % 360;
    dispatch({
      type: 'UPDATE_PHOTO',
      month,
      slotIndex,
      updates: { rotation: newRotation },
    });
  };

  const handleScaleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newScale = parseFloat(e.target.value);
    dispatch({
      type: 'UPDATE_PHOTO',
      month,
      slotIndex,
      updates: { scale: newScale },
    });
  };

  const handleDelete = () => {
    dispatch({
      type: 'DELETE_PHOTO',
      month,
      slotIndex,
    });
  };

  return (
    <div className="photo-controls">
      <div className="controls-row">
        <button onClick={handleRotateLeft} title="왼쪽으로 회전">
          ↺
        </button>
        <button onClick={handleRotateRight} title="오른쪽으로 회전">
          ↻
        </button>
        <button onClick={handleDelete} className="delete-btn" title="삭제">
          ×
        </button>
      </div>

      <div className="controls-row">
        <label htmlFor={`scale-${photo.id}`}>크기:</label>
        <input
          id={`scale-${photo.id}`}
          type="range"
          min="0.5"
          max="2"
          step="0.1"
          value={photo.scale}
          onChange={handleScaleChange}
        />
        <span className="scale-value">{Math.round(photo.scale * 100)}%</span>
      </div>
    </div>
  );
}
