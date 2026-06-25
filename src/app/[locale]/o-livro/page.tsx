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
import { getPrice } from '@/lib/prices';
import { formatMoney } from '@/lib/products';

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

export default async function LivroPage() {
  // Preço do ebook (BD) — sincronizado com o checkout. Passa por prop aos
  // componentes (que são client e não podem chamar getPrice diretamente).
  const ebookPrice = formatMoney(await getPrice('ebook'));

  return (
    <>
      <JsonLd data={bookJsonLd()} />
      <BookHero ebookPrice={ebookPrice} />
      <BookAbout />
      <BookTOC />
      <BookExcerpt />
      <BookFinalCTA ebookPrice={ebookPrice} />
    </>
  );
}
