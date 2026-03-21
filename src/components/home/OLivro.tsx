'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';

export default function OLivro() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref}
      id='livro'
      className='w-full'
      style={{ backgroundColor: '#0d1f13' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          maxWidth: 'var(--width-page)',
          paddingBlock: 'var(--spacing-section)',
          paddingInline: '60px',
        }}
        className='mx-auto'
      >
        <div className='flex flex-col items-center gap-16 md:flex-row'>
          {/* Imagem do livro */}
          <div className='w-full max-w-sm shrink-0 md:w-2/5'>
            <Image
              src='/images/book-cover.jpg'
              alt='Onde o Mundo Nasce Entre Nós — João Pereira'
              width={1000}
              height={1502}
              className='w-full'
              sizes='(max-width: 768px) 320px, 420px'
            />
          </div>

          {/* Texto */}
          <div className='flex-1'>
            {/* Eyebrow */}
            <span className='eyebrow'>O Livro</span>

            {/* Separador */}
            <div
              className='mt-6'
              style={{
                width: '40px',
                height: '2px',
                backgroundColor: 'rgba(255,255,255,0.3)',
              }}
            />

            {/* Titulo */}
            <h2
              className='mt-8 italic'
              style={{ color: 'var(--color-gk-creme)' }}
            >
              Onde o Mundo
              <br />
              Nasce Entre Nós
            </h2>

            {/* Paragrafos */}
            <div className='mt-8 space-y-6'>
              <p
                className='text-lg leading-relaxed'
                style={{ color: 'rgba(255,255,255,0.65)' }}
              >
                Não é um manual. É um deslocamento de olhar.
              </p>

              <p
                className='text-lg leading-relaxed'
                style={{ color: 'rgba(255,255,255,0.65)' }}
              >
                Em vez de explicar o autismo como diagnóstico, este livro
                acompanha o desenvolvimento como processo vivo — algo que
                acontece no corpo, no tempo e na relação.
              </p>

              <p
                className='text-lg leading-relaxed'
                style={{ color: 'rgba(255,255,255,0.65)' }}
              >
                Cada gesto, repetição ou pausa é lido como tentativa de manter
                equilíbrio. Nada aqui é tratado como erro a eliminar, mas como
                movimento que pede compreensão.
              </p>
            </div>

            {/* Botao CTA */}
            <Link
              href='/o-livro'
              className='mt-10 inline-block w-full cursor-pointer px-10 py-4 text-center text-[14px] font-medium uppercase tracking-widest sm:w-auto'
              style={{
                backgroundColor: 'var(--color-gk-ocre)',
                color: '#ffffff',
              }}
            >
              Descobrir o Livro
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
