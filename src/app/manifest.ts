// src/app/manifest.ts
import type { MetadataRoute } from 'next';
import { SEO_CONFIG } from '@/lib/seo';

/**
 * PWA manifest type-safe nativo do Next.js 15.
 * Servido automaticamente em /manifest.webmanifest.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SEO_CONFIG.siteName} — ${SEO_CONFIG.tagline}`,
    short_name: SEO_CONFIG.siteShortName,
    description: SEO_CONFIG.defaultDescription,
    start_url: '/',
    display: 'standalone',
    background_color: '#faf8f4',
    theme_color: '#1a5c2a',
    lang: SEO_CONFIG.language,
    icons: [
      {
        src: '/web-app-manifest-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/web-app-manifest-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
