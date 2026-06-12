// src/app/[locale]/o-livro/page.tsx
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { buildPageMetadata, bookJsonLd } from '@/lib/seo';
import JsonLd from '@/components/seo/JsonLd';
import BookHero from '@/components/book/BookHero';
import BookAbout from '@/components/book/BookAbout';
import BookTOC from '@/components/book/BookTOC';
import BookExcerpt from '@/components/book/BookExcerpt';
import BookFinalCTA from '@/components/book/BookFinalCTA';

// Metadata dinâmico por idioma (substitui o export const metadata)
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('book.meta');

  return buildPageMetadata({
    title: t('title'),
    description: t('description'),
    path: '/o-livro',
    ogType: 'book',
    ogImage: {
      url: '/images/book-cover.jpg',
      alt: t('ogAlt'),
    },
    authors: ['João Pereira'],
    keywords: t.raw('keywords') as string[],
  });
}

export default function LivroPage() {
  return (
    <>
      <JsonLd data={bookJsonLd()} />
      <BookHero />
      <BookAbout />
      <BookTOC />
      <BookExcerpt />
      <BookFinalCTA />
    </>
  );
}
