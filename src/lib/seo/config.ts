// src/lib/seo/config.ts
/**
 * Configuração central de SEO da GrowKind World.
 * Edite SOMENTE este ficheiro para alterar URL base, nome do site,
 * imagens OG default, locale ou contas sociais.
 */

export const SEO_CONFIG = {
  // URL canónica do site (com www, sem barra final).
  baseUrl: 'https://www.growkindworld.com',

  // Nome do site
  siteName: 'GrowKind World',
  siteShortName: 'GrowKind',

  // Tagline institucional
  tagline: 'Educação que cresce com a criança',

  // Descrição global (~155-160 caracteres ideais para SERP)
  defaultDescription:
    'Projecto educativo e editorial dedicado à infância neurodivergente. Livro, cursos e recursos para famílias e profissionais.',

  // Locale BCP 47
  locale: 'pt_PT',
  language: 'pt-PT',

  // Imagem OG default (1200×630). Caminho relativo a /public.
  // TODO: criar /public/og-image.jpg dedicada (1200x630).
  // Por agora usamos hero-home.jpg como fallback.
  defaultOgImage: {
    url: '/images/hero-home.jpg',
    width: 1200,
    height: 630,
    alt: 'GrowKind World — Educação que cresce com a criança',
  },

  // Logótipo (usado em JSON-LD Organization)
  logo: '/images/logo-growkind.jpg',

  // Fundador / autor principal
  founder: {
    name: 'João Pereira',
    image: '/images/joao-profile.jpeg',
    description:
      'Educador, terapeuta e fundador da GrowKind World. Criador do Relational Development Framework (RDF). Três décadas de trabalho com crianças autistas.',
  },

  // Redes sociais (usadas em sameAs no JSON-LD)
  social: {
    instagram: 'https://instagram.com/growkindworld',
    facebook: 'https://facebook.com/growkindworld',
    linkedin: 'https://linkedin.com/company/growkindworld',
  },

  // ─────────────────────────────────────────────
  // CÓDIGOS DE VERIFICAÇÃO — preenche depois
  // ─────────────────────────────────────────────
  verification: {
    // Google Search Console — obtém em https://search.google.com/search-console
    // Cola apenas o valor do content="" da meta tag fornecida pelo Google.
    google: 'WgfBTMnSqeWFgJdE9ukHbKkNHEn3MaJ2Yhe1UePJpcA',

    // Bing Webmaster Tools (opcional)
    bing: '',

    // Yandex (opcional)
    yandex: '',
  },

  // ─────────────────────────────────────────────
  // ANALYTICS — preenche depois se quiseres
  // ─────────────────────────────────────────────
  analytics: {
    // Google Analytics 4 — formato 'G-XXXXXXXXXX'
    ga4: '',

    // Plausible domain — formato 'growkindworld.com'
    plausible: '',
  },
} as const;

/** Constrói URL absoluto a partir de um caminho relativo */
export function absoluteUrl(path: string = ''): string {
  if (!path || path === '/') return SEO_CONFIG.baseUrl;
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${SEO_CONFIG.baseUrl}${cleanPath}`;
}

/** Array sameAs para JSON-LD */
export function getSameAs(): string[] {
  return Object.values(SEO_CONFIG.social);
}
