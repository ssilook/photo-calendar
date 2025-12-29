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

  const getRotatedOrientation = (newRotation: number) => {
    // 원본 이미지의 orientation 계산
    const originalOrientation = photo.width > photo.height ? 'landscape' :
                                photo.width < photo.height ? 'portrait' : 'square';

    // 90도 또는 270도 회전하면 가로<->세로 전환
    if (newRotation === 90 || newRotation === 270) {
      if (originalOrientation === 'landscape') return 'portrait';
      if (originalOrientation === 'portrait') return 'landscape';
    }

    return originalOrientation;
  };

  const handleRotateLeft = () => {
    const newRotation = (photo.rotation - 90 + 360) % 360;
    const newOrientation = getRotatedOrientation(newRotation);
    dispatch({
      type: 'UPDATE_PHOTO',
      month,
      slotIndex,
      updates: {
        rotation: newRotation,
        orientation: newOrientation,
      },
    });
  };

  const handleRotateRight = () => {
    const newRotation = (photo.rotation + 90) % 360;
    const newOrientation = getRotatedOrientation(newRotation);
    dispatch({
      type: 'UPDATE_PHOTO',
      month,
      slotIndex,
      updates: {
        rotation: newRotation,
        orientation: newOrientation,
      },
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
