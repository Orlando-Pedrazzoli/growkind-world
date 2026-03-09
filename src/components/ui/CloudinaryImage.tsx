'use client';

import Image from 'next/image';

interface CloudinaryImageProps {
  publicId: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
  sizes?: string;
}

/**
 * Componente reutilizável para imagens Cloudinary.
 * Usa transformações automáticas (f_auto, q_auto) para optimização.
 * Hero images usam priority={true}, todas as outras têm lazy loading.
 */
export default function CloudinaryImage({
  publicId,
  alt,
  width,
  height,
  priority = false,
  className = '',
  sizes = '100vw',
}: CloudinaryImageProps) {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  // Fallback: se Cloudinary não estiver configurado, usar placeholder
  if (!cloudName) {
    return (
      <div
        className={`flex items-center justify-center bg-[var(--color-gk-green-light)]/30 ${className}`}
        style={{ width: '100%', aspectRatio: `${width}/${height}` }}
        role="img"
        aria-label={alt}
      >
        <span className="text-sm text-[var(--color-gk-black)]/30">
          {alt}
        </span>
      </div>
    );
  }

  const src = `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto/${publicId}`;

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      loading={priority ? 'eager' : 'lazy'}
      sizes={sizes}
      className={className}
    />
  );
}
