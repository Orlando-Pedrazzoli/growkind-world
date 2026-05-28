// src/app/robots.ts
import type { MetadataRoute } from 'next';
import { SEO_CONFIG } from '@/lib/seo';

/**
 * robots.txt dinâmico nativo do Next.js 15.
 * Servido automaticamente em /robots.txt.
 *
 * NOTAS:
 * - 'host' foi removido (deprecated pelo Google desde 2019).
 * - Bloco de AI bots removido para permitir citações em ChatGPT/Claude/Perplexity.
 *   Se quiseres voltar a bloquear, descomenta o bloco no final.
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
      // Para bloquear AI bots no futuro, descomenta:
      // {
      //   userAgent: ['GPTBot', 'CCBot', 'ClaudeBot', 'anthropic-ai', 'PerplexityBot'],
      //   disallow: '/',
      // },
    ],
    sitemap: `${SEO_CONFIG.baseUrl}/sitemap.xml`,
  };
}
