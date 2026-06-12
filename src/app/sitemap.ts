// src/app/sitemap.ts
import type { MetadataRoute } from 'next';
import { SEO_CONFIG } from '@/lib/seo';
import { routing } from '@/i18n/routing';

/**
 * Sitemap dinâmico nativo do Next.js 15.
 * Servido automaticamente em /sitemap.xml.
 *
 * lastModified usa data fixa por página para o Google confiar no campo.
 * Atualiza manualmente quando o conteúdo da página mudar realmente.
 *
 * hreflang: cada rota é listada com as suas versões PT e EN.
 * Regra do localePrefix 'as-needed': PT fica na raiz, EN leva /en à frente.
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

  // path '' = home. Mantém aqui os teus metadados por página.
  const routes: Array<{
    path: string;
    lastModified: Date;
    changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
    priority: number;
  }> = [
    {
      path: '',
      lastModified: lastEdit.home,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      path: '/o-livro',
      lastModified: lastEdit.livro,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      path: '/rdf',
      lastModified: lastEdit.rdf,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      path: '/rdf/diagrama',
      lastModified: lastEdit.rdfDiagrama,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      path: '/sobre',
      lastModified: lastEdit.sobre,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      path: '/cursos',
      lastModified: lastEdit.cursos,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      path: '/cursos/profissionais',
      lastModified: lastEdit.cursosProfissionais,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      path: '/cursos/familias',
      lastModified: lastEdit.cursosFamilias,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      path: '/privacidade',
      lastModified: lastEdit.legal,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      path: '/termos',
      lastModified: lastEdit.legal,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      path: '/cookies',
      lastModified: lastEdit.legal,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      path: '/devolucoes',
      lastModified: lastEdit.legal,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  // Constrói a URL de um locale (PT sem prefixo, EN com /en).
  const urlFor = (locale: string, path: string) =>
    locale === routing.defaultLocale
      ? `${base}${path}`
      : `${base}/${locale}${path}`;

  return routes.map(({ path, lastModified, changeFrequency, priority }) => ({
    url: urlFor(routing.defaultLocale, path), // URL canónica = versão PT
    lastModified,
    changeFrequency,
    priority,
    alternates: {
      languages: {
        ...Object.fromEntries(
          routing.locales.map(locale => [locale, urlFor(locale, path)]),
        ),
        'x-default': urlFor(routing.defaultLocale, path),
      },
    },
  }));
}
