'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { BOOK_AUDIENCES, BOOK_QUOTE } from '@/lib/data/book';

export default function BookAbout() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref}
      className='px-6 py-20 md:px-[60px] md:py-28'
      style={{ backgroundColor: '#faf8f4' }}
    >
      <motion.div
        className='mx-auto grid max-w-[1100px] items-start gap-16 md:grid-cols-[1fr_380px]'
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Coluna esquerda — texto */}
        <div>
          <span className='eyebrow'>O que é este livro</span>

          <h2
            className='mt-6 font-[family-name:var(--font-display)]'
            style={{
              fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
              color: 'var(--color-gk-black)',
              fontWeight: 400,
              lineHeight: 1.15,
            }}
          >
            Um deslocamento
            <br />
            <em style={{ color: '#c4a44a' }}>de olhar</em>
          </h2>

          <div
            className='mt-10 space-y-6 text-[16px] leading-[1.8] md:text-[17px]'
            style={{ color: 'var(--color-gk-cinza)' }}
          >
            <p>
              Em vez de explicar o autismo como diagnóstico, este livro
              acompanha o desenvolvimento como processo vivo — algo que acontece
              no corpo, no tempo e na relação.
            </p>
            <p>
              Cada gesto, repetição ou pausa é lido como tentativa de manter
              equilíbrio. Nada aqui é tratado como erro a eliminar, mas como
              movimento que pede compreensão.
            </p>
            <p>
              Ao longo da leitura, o adulto deixa de buscar respostas rápidas e
              passa a coordenar processos. Não para controlar. Mas para
              sustentar.
            </p>
            <p>
              Se, ao final, você não tiver soluções imediatas — mas um olhar
              mais afinado e uma presença mais segura ao lado da criança — então
              este livro cumpriu seu papel.
            </p>
          </div>
        </div>

        {/* Coluna direita — citação + cards publico */}
        <div className='flex flex-col gap-5'>
          {/* Citacao */}
          <div
            className='p-8'
            style={{
              backgroundColor: '#f5f0e8',
              borderRadius: '12px',
            }}
          >
            <p
              className='font-[family-name:var(--font-display)] text-xl italic leading-relaxed md:text-2xl'
              style={{ color: '#8b6914' }}
            >
              &ldquo;{BOOK_QUOTE}&rdquo;
            </p>
          </div>

          {/* Cards de publico */}
          {BOOK_AUDIENCES.map(audience => (
            <div
              key={audience.title}
              className='flex items-start gap-4 p-5'
              style={{
                backgroundColor: '#f5f0e8',
                borderRadius: '12px',
              }}
            >
              <span className='text-2xl'>{audience.icon}</span>
              <div>
                <p
                  className='text-[15px] font-semibold'
                  style={{ color: 'var(--color-gk-black)' }}
                >
                  {audience.title}
                </p>
                <p
                  className='mt-1 text-[14px] leading-relaxed'
                  style={{ color: 'var(--color-gk-cinza)' }}
                >
                  {audience.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
