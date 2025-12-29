import { useRef } from 'react';
import { useCalendar } from '../../contexts/CalendarContext';
import { useImageLoader } from '../../hooks/useImageLoader';
import './ImageUploader.css';

interface ImageUploaderProps {
  month: number;
  slotIndex: 0 | 1 | 2;
}

export function ImageUploader({ month, slotIndex }: ImageUploaderProps) {
  const { dispatch } = useCalendar();
  const { loadImage, loading, error } = useImageLoader();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const photo = await loadImage(file);

    if (photo) {
      dispatch({
        type: 'ADD_PHOTO',
        month,
        slotIndex,
        photo,
      });
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="image-uploader" onClick={handleClick}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        style={{ display: 'none' }}
      />
      {loading ? (
        <p>로딩 중...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <>
          <p>+</p>
          <p className="upload-hint">사진 업로드</p>
        </>
      )}
    </div>
  );
}
