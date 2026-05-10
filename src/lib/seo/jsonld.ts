// src/lib/seo/jsonld.ts
/**
 * Geradores de JSON-LD (schema.org) para a GrowKind World.
 */

import { SEO_CONFIG, absoluteUrl, getSameAs } from './config';

// Organization — root layout
export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SEO_CONFIG.baseUrl}/#organization`,
    name: SEO_CONFIG.siteName,
    url: SEO_CONFIG.baseUrl,
    logo: {
      '@type': 'ImageObject',
      url: absoluteUrl(SEO_CONFIG.logo),
    },
    description: SEO_CONFIG.defaultDescription,
    founder: {
      '@type': 'Person',
      name: SEO_CONFIG.founder.name,
    },
    sameAs: getSameAs(),
    inLanguage: SEO_CONFIG.language,
  };
}

// WebSite — root layout
export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SEO_CONFIG.baseUrl}/#website`,
    name: SEO_CONFIG.siteName,
    url: SEO_CONFIG.baseUrl,
    description: SEO_CONFIG.defaultDescription,
    inLanguage: SEO_CONFIG.language,
    publisher: {
      '@id': `${SEO_CONFIG.baseUrl}/#organization`,
    },
  };
}

// Book — /o-livro
export function bookJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Book',
    '@id': `${SEO_CONFIG.baseUrl}/o-livro#book`,
    name: 'Onde o Mundo Nasce Entre Nós',
    headline: 'Onde o Mundo Nasce Entre Nós',
    author: {
      '@type': 'Person',
      name: SEO_CONFIG.founder.name,
      url: absoluteUrl('/sobre'),
    },
    description:
      'Não é um manual. É um deslocamento de olhar. Em vez de explicar o autismo como diagnóstico, este livro acompanha o desenvolvimento como processo vivo — algo que acontece no corpo, no tempo e na relação.',
    image: absoluteUrl('/images/book-cover.jpg'),
    inLanguage: SEO_CONFIG.language,
    bookFormat: 'https://schema.org/EBook',
    publisher: {
      '@id': `${SEO_CONFIG.baseUrl}/#organization`,
    },
    url: absoluteUrl('/o-livro'),
    offers: {
      '@type': 'Offer',
      price: '14.00',
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      url: absoluteUrl('/comprar/ebook'),
    },
  };
}

// Person — /sobre
export function personJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SEO_CONFIG.baseUrl}/sobre#person`,
    name: SEO_CONFIG.founder.name,
    description: SEO_CONFIG.founder.description,
    image: absoluteUrl(SEO_CONFIG.founder.image),
    url: absoluteUrl('/sobre'),
    jobTitle: 'Educador, Terapeuta e Fundador da GrowKind World',
    worksFor: {
      '@id': `${SEO_CONFIG.baseUrl}/#organization`,
    },
    knowsAbout: [
      'Autismo',
      'Neurodivergência',
      'Desenvolvimento infantil',
      'Relational Development Framework',
      'Educação especial',
    ],
  };
}

// Course — /cursos/profissionais e /cursos/familias
interface CourseJsonLdParams {
  name: string;
  description: string;
  path: string;
  coverImage: string;
  price: string;
  audience: string;
}

export function courseJsonLd({
  name,
  description,
  path,
  coverImage,
  price,
  audience,
}: CourseJsonLdParams) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    '@id': `${SEO_CONFIG.baseUrl}${path}#course`,
    name,
    description,
    url: absoluteUrl(path),
    image: absoluteUrl(coverImage),
    inLanguage: SEO_CONFIG.language,
    provider: {
      '@id': `${SEO_CONFIG.baseUrl}/#organization`,
    },
    audience: {
      '@type': 'Audience',
      audienceType: audience,
    },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'https://schema.org/OnlineEventAttendanceMode',
      courseWorkload: 'PT5H30M',
    },
    offers: {
      '@type': 'Offer',
      price,
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      url: absoluteUrl(path),
      category: 'Paid',
    },
  };
}

// BreadcrumbList — páginas internas
interface BreadcrumbItem {
  name: string;
  path: string;
}

export function breadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
