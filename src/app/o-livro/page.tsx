// src/app/o-livro/page.tsx
import type { Metadata } from 'next';
import { buildPageMetadata, bookJsonLd } from '@/lib/seo';
import JsonLd from '@/components/seo/JsonLd';
import BookHero from '@/components/book/BookHero';
import BookAbout from '@/components/book/BookAbout';
import BookTOC from '@/components/book/BookTOC';
import BookExcerpt from '@/components/book/BookExcerpt';
import BookFinalCTA from '@/components/book/BookFinalCTA';

export const metadata: Metadata = buildPageMetadata({
  title: 'Onde o Mundo Nasce Entre Nós — O Livro',
  description:
    'Não é um manual. É um deslocamento de olhar. Em vez de explicar o autismo como diagnóstico, este livro acompanha o desenvolvimento como processo vivo. Por João Pereira.',
  path: '/o-livro',
  ogType: 'book',
  ogImage: {
    url: '/images/book-cover.jpg',
    alt: 'Onde o Mundo Nasce Entre Nós — João Pereira',
  },
  authors: ['João Pereira'],
  keywords: [
    'livro autismo',
    'livro neurodivergência',
    'desenvolvimento infantil',
    'João Pereira livro',
    'Onde o Mundo Nasce Entre Nós',
    'ebook autismo português',
  ],
});

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
