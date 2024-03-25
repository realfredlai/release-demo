import { useEffect } from 'react';
import fallbackImage from '@/public/images/placeholder/prompt-image-placeholder.png'; // TODO: replace with UI supplied image
import { getLogger } from '@reebok/shared';

const logger = getLogger('webapp-remix.hooks');

export const useImageUrlCheck = (imageUrl: string | null | undefined) => {
  useEffect(() => {
    if (!imageUrl) {
      logger.warn(
        'useImageUrlCheck',
        '🚨 The image URL is empty... load the default image.'
      );
    }
  }, [imageUrl]);

  return imageUrl || fallbackImage;
};
