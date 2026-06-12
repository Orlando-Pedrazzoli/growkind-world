import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // Idiomas suportados
  locales: ['pt', 'en'],

  // Idioma por defeito (PT-PT, locale principal do site)
  defaultLocale: 'pt',

  // 'as-needed' => PT fica sem prefixo (/o-livro) e EN ganha prefixo (/en/o-livro).
  // É a melhor opção de SEO mantendo as URLs PT limpas.
  localePrefix: 'as-needed',

  // Opcional (melhoria de SEO futura): traduzir também os slugs.
  // Para ativar, descomenta e usa SEMPRE o <Link> de '@/i18n/navigation'.
  // pathnames: {
  //   '/': '/',
  //   '/o-livro': { pt: '/o-livro', en: '/the-book' },
  //   '/rdf': '/rdf',
  //   '/sobre': { pt: '/sobre', en: '/about' },
  //   '/cursos': { pt: '/cursos', en: '/courses' },
  // },
});
