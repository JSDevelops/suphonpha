'use client';

import React from 'react';
import NextImage, { ImageProps } from 'next/image';

const isProd = process.env.NODE_ENV === 'production';
export const BASE_PATH =
  process.env.NEXT_PUBLIC_BASE_PATH !== undefined
    ? process.env.NEXT_PUBLIC_BASE_PATH
    : isProd
    ? '/suphonpha'
    : '';

export function getAssetPath(src: string | undefined | null): string {
  if (!src) return '';
  if (
    src.startsWith('http://') ||
    src.startsWith('https://') ||
    src.startsWith('data:') ||
    src.startsWith('blob:')
  ) {
    return src;
  }
  const clean = src.startsWith('/') ? src : `/${src}`;
  if (BASE_PATH && !clean.startsWith(BASE_PATH)) {
    return `${BASE_PATH}${clean}`;
  }
  return clean;
}

export function SafeImage({ src, alt = '', onError, ...props }: ImageProps) {
  const resolvedSrc = typeof src === 'string' ? getAssetPath(src) : src;
  const [currentSrc, setCurrentSrc] = React.useState(resolvedSrc);
  const [hasError, setHasError] = React.useState(false);

  React.useEffect(() => {
    setCurrentSrc(resolvedSrc);
    setHasError(false);
  }, [resolvedSrc]);

  return (
    <NextImage
      src={currentSrc}
      alt={alt}
      onError={(e) => {
        if (!hasError && typeof src === 'string') {
          setHasError(true);
          // If BASE_PATH wasn't prepended or vice versa, attempt fallback
          if (!src.startsWith(BASE_PATH) && BASE_PATH) {
            setCurrentSrc(`${BASE_PATH}${src.startsWith('/') ? src : `/${src}`}`);
          }
        }
        onError?.(e);
      }}
      {...props}
    />
  );
}

export default SafeImage;
