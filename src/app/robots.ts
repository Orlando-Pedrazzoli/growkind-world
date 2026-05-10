// src/app/robots.ts
import type { MetadataRoute } from 'next';
import { SEO_CONFIG } from '@/lib/seo';

/**
 * robots.txt dinâmico nativo do Next.js 15.
 * Servido automaticamente em /robots.txt.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/a-minha-conta/',
          '/login',
          '/registar',
          '/comprar/',
          '/obrigado',
          '/livro/preview',
        ],
      },
      // Bloqueia bots de scraping de IA (apaga este bloco se quiseres
      // que ChatGPT/Claude/Perplexity citem o site)
      {
        userAgent: ['GPTBot', 'CCBot', 'ClaudeBot', 'anthropic-ai'],
        disallow: '/',
      },
    ],
    sitemap: `${SEO_CONFIG.baseUrl}/sitemap.xml`,
    host: SEO_CONFIG.baseUrl,
  };
}
