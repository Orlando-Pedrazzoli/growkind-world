// src/app/sitemap.ts
import type { MetadataRoute } from 'next';
import { SEO_CONFIG } from '@/lib/seo';

/**
 * Sitemap dinâmico nativo do Next.js 15.
 * Servido automaticamente em /sitemap.xml.
 *
 * lastModified usa data fixa por página para o Google confiar no campo.
 * Atualiza manualmente quando o conteúdo da página mudar realmente.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = SEO_CONFIG.baseUrl;

  // Datas reais da última edição de conteúdo por página
  const lastEdit = {
    home: new Date('2026-05-01'),
    livro: new Date('2026-05-15'),
    rdf: new Date('2026-04-20'),
    rdfDiagrama: new Date('2026-04-20'),
    sobre: new Date('2026-04-10'),
    cursos: new Date('2026-05-10'),
    cursosProfissionais: new Date('2026-05-10'),
    cursosFamilias: new Date('2026-05-10'),
    legal: new Date('2026-01-01'),
  };

  return [
    {
      url: base,
      lastModified: lastEdit.home,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${base}/o-livro`,
      lastModified: lastEdit.livro,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${base}/rdf`,
      lastModified: lastEdit.rdf,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${base}/rdf/diagrama`,
      lastModified: lastEdit.rdfDiagrama,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${base}/sobre`,
      lastModified: lastEdit.sobre,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${base}/cursos`,
      lastModified: lastEdit.cursos,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${base}/cursos/profissionais`,
      lastModified: lastEdit.cursosProfissionais,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${base}/cursos/familias`,
      lastModified: lastEdit.cursosFamilias,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${base}/privacidade`,
      lastModified: lastEdit.legal,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${base}/termos`,
      lastModified: lastEdit.legal,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${base}/cookies`,
      lastModified: lastEdit.legal,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${base}/devolucoes`,
      lastModified: lastEdit.legal,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];
}
