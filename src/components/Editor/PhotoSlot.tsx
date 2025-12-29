import { useState, useRef, useEffect } from 'react';
import { useCalendar } from '../../contexts/CalendarContext';
import type { PhotoTransform } from '../../types/calendar';
import { ImageUploader } from './ImageUploader';
import { PhotoControls } from './PhotoControls';
import './PhotoSlot.css';

interface PhotoSlotProps {
  month: number;
  slotIndex: 0 | 1 | 2;
  photo: PhotoTransform | null;
}

export function PhotoSlot({ month, slotIndex, photo }: PhotoSlotProps) {
  const { dispatch } = useCalendar();
  const [isSelected, setIsSelected] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // 모든 Hook을 early return 전에 호출
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsSelected(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isDragging && photo) {
      const handleMouseMove = (e: MouseEvent) => {
        const newTranslateX = e.clientX - dragStart.x;
        const newTranslateY = e.clientY - dragStart.y;

        dispatch({
          type: 'UPDATE_PHOTO',
          month,
          slotIndex,
          updates: {
            translateX: newTranslateX,
            translateY: newTranslateY,
          },
        });
      };

      const handleMouseUp = () => {
        setIsDragging(false);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragStart, photo, dispatch, month, slotIndex]);

  if (!photo) {
    return (
      <div ref={containerRef} className="photo-slot">
        <ImageUploader month={month} slotIndex={slotIndex} />
      </div>
    );
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.photo-controls')) {
      return;
    }

    setIsSelected(true);
    setIsDragging(true);
    setDragStart({
      x: e.clientX - photo.translateX,
      y: e.clientY - photo.translateY,
    });
  };

  const transformStyle = `
    translate(${photo.translateX}px, ${photo.translateY}px)
    scale(${photo.scale})
    rotate(${photo.rotation}deg)
  `;

  return (
    <div
      ref={containerRef}
      className={`photo-slot ${isSelected ? 'selected' : ''}`}
      onMouseDown={handleMouseDown}
    >
      <div className="photo-container">
        <img
          src={photo.src}
          alt="Uploaded"
          style={{
            transform: transformStyle,
          }}
          draggable={false}
        />
      </div>

      {isSelected && (
        <PhotoControls
          month={month}
          slotIndex={slotIndex}
          photo={photo}
        />
      )}
    </div>
  );
}
