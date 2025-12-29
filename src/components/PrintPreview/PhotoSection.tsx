import type { PhotoTransform } from '../../types/calendar';
import './PhotoSection.css';

interface PhotoSectionProps {
  photos: [PhotoTransform | null, PhotoTransform | null, PhotoTransform | null];
}

function getLayoutType(photos: (PhotoTransform | null)[]): string {
  const validPhotos = photos.filter((p): p is PhotoTransform => p !== null);

  if (validPhotos.length === 0) {
    return 'default';
  }

  const orientations = validPhotos.map((p) => p.orientation);
  const landscapeCount = orientations.filter((o) => o === 'landscape').length;
  const portraitCount = orientations.filter((o) => o === 'portrait').length;

  // 가로 2개 + 세로 1개: 왼쪽에 가로 2개 위아래, 오른쪽에 세로 1개
  if (landscapeCount === 2 && portraitCount === 1) {
    return 'two-landscape-one-portrait';
  }

  // 세로 2개 + 가로 1개: 위에 가로 1개, 아래 세로 2개 좌우
  if (portraitCount === 2 && landscapeCount === 1) {
    return 'two-portrait-one-landscape';
  }

  // 모두 가로
  if (landscapeCount === validPhotos.length && landscapeCount > 0) {
    return 'all-landscape';
  }

  // 모두 세로
  if (portraitCount === validPhotos.length && portraitCount > 0) {
    return 'all-portrait';
  }

  return 'default';
}

export function PhotoSection({ photos }: PhotoSectionProps) {
  const layoutType = getLayoutType(photos);

  const renderPhoto = (photo: PhotoTransform | null, index: number, className = '') => {
    if (!photo) {
      return (
        <div key={index} className={`print-photo-slot ${className}`}>
          <div className="empty-photo-placeholder">
            <p>사진 없음</p>
          </div>
        </div>
      );
    }

    return (
      <div key={index} className={`print-photo-slot ${className}`}>
        <img
          src={photo.src}
          alt={`Photo ${index + 1}`}
          style={{
            transform: `
              translate(${photo.translateX}px, ${photo.translateY}px)
              scale(${photo.scale})
              rotate(${photo.rotation}deg)
            `,
            transformOrigin: 'center center',
          }}
        />
      </div>
    );
  };

  // 가로 2개 + 세로 1개
  if (layoutType === 'two-landscape-one-portrait') {
    const landscapes = photos.filter((p) => p?.orientation === 'landscape');
    const portrait = photos.find((p) => p?.orientation === 'portrait');

    return (
      <div className="photo-section layout-two-landscape-one-portrait">
        <div className="landscape-column">
          {renderPhoto(landscapes[0] || null, 0, 'landscape-top')}
          {renderPhoto(landscapes[1] || null, 1, 'landscape-bottom')}
        </div>
        <div className="portrait-column">
          {renderPhoto(portrait || null, 2, 'portrait-side')}
        </div>
      </div>
    );
  }

  // 세로 2개 + 가로 1개
  if (layoutType === 'two-portrait-one-landscape') {
    const portraits = photos.filter((p) => p?.orientation === 'portrait');
    const landscape = photos.find((p) => p?.orientation === 'landscape');

    return (
      <div className="photo-section layout-two-portrait-one-landscape">
        <div className="landscape-row">
          {renderPhoto(landscape || null, 0, 'landscape-top')}
        </div>
        <div className="portrait-row">
          {renderPhoto(portraits[0] || null, 1, 'portrait-left')}
          {renderPhoto(portraits[1] || null, 2, 'portrait-right')}
        </div>
      </div>
    );
  }

  // 기본 레이아웃
  return (
    <div className={`photo-section layout-${layoutType}`}>
      {photos.map((photo, index) => renderPhoto(photo, index))}
    </div>
  );
}
