// src/lib/seo/metadata.ts
import type { Metadata } from 'next';
import { SEO_CONFIG, absoluteUrl } from './config';

type OgType = 'website' | 'article' | 'book' | 'profile';

interface BuildMetadataParams {
  title: string;
  description?: string;
  path: string;
  ogImage?: {
    url: string;
    alt?: string;
    width?: number;
    height?: number;
  };
  ogType?: OgType;
  keywords?: string[];
  noIndex?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
}

/**
 * Constrói um objecto Metadata completo (canonical, OG, Twitter, robots)
 * para qualquer página. Centraliza convenções e evita duplicação.
 */
export function buildPageMetadata({
  title,
  description = SEO_CONFIG.defaultDescription,
  path,
  ogImage,
  ogType = 'website',
  keywords,
  noIndex = false,
  publishedTime,
  modifiedTime,
  authors,
}: BuildMetadataParams): Metadata {
  const canonicalPath = path.startsWith('/') ? path : `/${path}`;
  const canonicalUrl = absoluteUrl(canonicalPath);

  const image = ogImage
    ? {
        url: ogImage.url.startsWith('http')
          ? ogImage.url
          : absoluteUrl(ogImage.url),
        width: ogImage.width ?? 1200,
        height: ogImage.height ?? 630,
        alt: ogImage.alt ?? title,
      }
    : {
        url: absoluteUrl(SEO_CONFIG.defaultOgImage.url),
        width: SEO_CONFIG.defaultOgImage.width,
        height: SEO_CONFIG.defaultOgImage.height,
        alt: SEO_CONFIG.defaultOgImage.alt,
      };

  return {
    title,
    description,
    ...(keywords && keywords.length > 0 && { keywords }),
    ...(authors &&
      authors.length > 0 && {
        authors: authors.map(name => ({ name })),
      }),
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      type: ogType,
      locale: SEO_CONFIG.locale,
      siteName: SEO_CONFIG.siteName,
      title,
      description,
      url: canonicalUrl,
      images: [image],
      ...(ogType === 'article' && publishedTime && { publishedTime }),
      ...(ogType === 'article' && modifiedTime && { modifiedTime }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image.url],
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
          googleBot: { index: false, follow: false },
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-snippet': -1,
            'max-image-preview': 'large',
            'max-video-preview': -1,
          },
        },
  };
}
