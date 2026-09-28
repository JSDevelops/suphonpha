'use client';

import React from 'react';
import NextImage, { ImageProps } from 'next/image';

export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

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

export function SafeImage({ src, ...props }: ImageProps) {
  const resolvedSrc = typeof src === 'string' ? getAssetPath(src) : src;
  return <NextImage src={resolvedSrc} {...props} />;
}

export default SafeImage;
