import { useState, useCallback } from 'react';
import { loadImageFile, resizeImage, generatePhotoId, getImageDimensions, getOrientation } from '../utils/imageUtils';
import type { PhotoTransform } from '../types/calendar';

const MAX_IMAGE_WIDTH = 800;
const MAX_IMAGE_HEIGHT = 600;

export function useImageLoader() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadImage = useCallback(async (file: File): Promise<PhotoTransform | null> => {
    setLoading(true);
    setError(null);

    try {
      const dataUrl = await loadImageFile(file);

      const resizedDataUrl = await resizeImage(
        dataUrl,
        MAX_IMAGE_WIDTH,
        MAX_IMAGE_HEIGHT
      );

      const dimensions = await getImageDimensions(resizedDataUrl);
      const orientation = getOrientation(dimensions.width, dimensions.height);

      const photo: PhotoTransform = {
        id: generatePhotoId(),
        src: resizedDataUrl,
        scale: 1,
        rotation: 0,
        translateX: 0,
        translateY: 0,
        width: dimensions.width,
        height: dimensions.height,
        orientation,
      };

      setLoading(false);
      return photo;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load image');
      setLoading(false);
      return null;
    }
  }, []);

  return { loadImage, loading, error };
}
