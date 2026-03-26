import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'O Livro',
  description:
    'Onde o Mundo Nasce Entre Nós — Um caminho partilhado no autismo infantil. O primeiro livro do universo GrowKind, por João Pereira.',
};

export default function LivroPage() {
  return (
    <>
      <section className='section-padding'>
        <div className='content-width-wide'>
          <div className='flex flex-col items-center gap-12 md:flex-row md:gap-16'>
            {/* Capa do livro */}
            <div className='relative w-full max-w-sm shrink-0 md:w-2/5'>
              <Image
                src='/images/book-cover.jpg'
                alt='Capa do livro Onde o Mundo Nasce Entre Nós — João Pereira'
                width={800}
                height={1200}
                priority
                className='w-full shadow-2xl'
                sizes='(max-width: 768px) 320px, 400px'
                quality={85}
              />
            </div>

            {/* Texto */}
            <div className='flex-1'>
              <h1 className='text-[var(--color-gk-green-dark)]'>
                Onde o Mundo Nasce Entre Nós
              </h1>
              <p className='mt-3 text-base italic text-[var(--color-gk-ocre)]'>
                Um caminho partilhado no autismo infantil
              </p>
              <p className='mt-8 text-sm font-medium uppercase tracking-wider text-[var(--color-gk-black)]/40'>
                Por João Pereira
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mockup na relva — imagem ambiental */}
      <section className='bg-[var(--color-gk-creme)] py-16 md:py-24'>
        <div className='content-width-wide'>
          <div className='mx-auto max-w-2xl overflow-hidden rounded-sm shadow-xl'>
            <Image
              src='/images/book-mockup-grass.jpg'
              alt='Livro Onde o Mundo Nasce Entre Nós na relva'
              width={1000}
              height={1502}
              className='w-full'
              sizes='(max-width: 768px) 100vw, 672px'
              quality={85}
            />
          </div>
          <p className='mt-8 text-center text-sm text-[var(--color-gk-black)]/40'>
            Conteudo completo em preparacao — Sprint 2
          </p>
        </div>
      </section>
    </>
  );
}
