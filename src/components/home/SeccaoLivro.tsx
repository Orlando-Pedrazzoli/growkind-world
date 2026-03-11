import Image from 'next/image';
import Link from 'next/link';
import AnimatedSection from '@/components/ui/AnimatedSection';
import type { ContentBlock } from '@/types';

interface SeccaoLivroProps {
  block: ContentBlock;
}

export default function SeccaoLivro({ block }: SeccaoLivroProps) {
  return (
    <AnimatedSection bg='creme'>
      <div className='content-width-wide'>
        <div className='flex flex-col items-center gap-12 md:flex-row md:gap-16'>
          {/* Imagem do livro */}
          <div className='relative w-full max-w-xs shrink-0 md:w-2/5'>
            <Image
              src='/images/book-mockup-grass.jpg'
              alt='Livro Onde o Mundo Nasce Entre Nós — João Pereira'
              width={1000}
              height={1502}
              className='w-full rounded-sm shadow-2xl'
              sizes='(max-width: 768px) 280px, 400px'
              quality={85}
            />
          </div>

          {/* Texto */}
          <div className='flex-1'>
            {block.titulo && (
              <h2 className='text-[var(--color-gk-green-dark)]'>
                {block.titulo}
              </h2>
            )}
            {block.corpo && (
              <div className='mt-6 space-y-4 text-base leading-relaxed text-[var(--color-gk-black)]/80 md:text-lg'>
                {block.corpo.split('\n\n').map((paragrafo, i) => (
                  <p key={i}>{paragrafo}</p>
                ))}
              </div>
            )}
            {block.ctaTexto && block.ctaLink && (
              <Link
                href={block.ctaLink}
                className='mt-8 inline-block rounded-lg bg-[var(--color-gk-green-dark)] px-8 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-[var(--color-gk-green-dark)]/90 hover:shadow-lg'
              >
                {block.ctaTexto}
              </Link>
            )}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
