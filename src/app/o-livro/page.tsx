import type { Metadata } from 'next';
import BookHero from '@/components/book/BookHero';
import BookAbout from '@/components/book/BookAbout';
import BookTOC from '@/components/book/BookTOC';
import BookExcerpt from '@/components/book/BookExcerpt';
import BookFinalCTA from '@/components/book/BookFinalCTA';

export const metadata: Metadata = {
  title: 'Onde o Mundo Nasce Entre Nós — O Livro',
  description:
    'Não é um manual. É um deslocamento de olhar. Nem todo comportamento pede correção. Alguns pedem leitura, tempo e presença.',
  openGraph: {
    title: 'Onde o Mundo Nasce Entre Nós | GrowKind World',
    description:
      'O livro que muda a forma como vês o desenvolvimento da criança. Por João Pereira.',
    images: ['/images/book-cover.jpg'],
  },
};

export default function LivroPage() {
  return (
    <>
      <BookHero />
      <BookAbout />
      <BookTOC />
      <BookExcerpt />
      <BookFinalCTA />
    </>
  );
}
