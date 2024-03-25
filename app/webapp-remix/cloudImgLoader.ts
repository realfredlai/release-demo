import { ImageLoader, ImageLoaderProps } from 'next/image';

/**
 * If static asset, return plan src
 * If from S3 bucket, cloudImg cache/optimize it
 * NextJS default quality is 75, but can be overridden
 */
const cloudImgLoader: ImageLoader = ({
  src,
  width,
  quality = 75,
}: ImageLoaderProps) => {
  if (!src.includes('.amazonaws.com')) {
    return src;
  }

  return `https://autbcmlsgr.cloudimg.io/${src}?w=${width}?q=${quality}`;
};

export default cloudImgLoader;
