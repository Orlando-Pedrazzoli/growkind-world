'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { BOOK_EXCERPT } from '@/lib/data/book';

export default function BookExcerpt() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref}
      className='px-6 py-20 md:px-[60px] md:py-28'
      style={{ backgroundColor: '#faf8f4' }}
    >
      <motion.div
        className='mx-auto max-w-[720px]'
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Header */}
        <div className='text-center'>
          <span className='eyebrow'>Conheça o livro</span>
          <h2
            className='mt-6 font-[family-name:var(--font-display)]'
            style={{
              fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
              color: 'var(--color-gk-black)',
              fontWeight: 400,
              lineHeight: 1.15,
            }}
          >
            Leia o <em style={{ color: '#c4a44a' }}>início</em>
          </h2>
          <p
            className='mt-3 text-[15px]'
            style={{ color: 'var(--color-gk-cinza)' }}
          >
            A introdução — para sentir, antes de decidir.
          </p>
        </div>

        {/* Label do capitulo */}
        <p
          className='mt-14 text-center text-[11px] font-medium uppercase tracking-[0.14em]'
          style={{ color: 'rgba(30,30,30,0.35)' }}
        >
          Introdução · Um convite para ver de novo
        </p>

        {/* Texto do excerto */}
        <div className='mt-10'>
          {BOOK_EXCERPT.map((paragraph, i) => {
            // Primeiro paragrafo com drop cap
            if (i === 0) {
              const firstLetter = paragraph.charAt(0);
              const rest = paragraph.slice(1);
              return (
                <p
                  key={i}
                  className='font-[family-name:var(--font-display)] text-[18px] leading-[1.9] md:text-[20px]'
                  style={{ color: 'rgba(30,30,30,0.7)' }}
                >
                  <span
                    className='float-left mr-3 font-[family-name:var(--font-display)] text-[4rem] font-bold leading-[0.8]'
                    style={{ color: '#c4a44a' }}
                  >
                    {firstLetter}
                  </span>
                  {rest}
                </p>
              );
            }

            return (
              <p
                key={i}
                className='mt-7 font-[family-name:var(--font-display)] text-[18px] leading-[1.9] md:text-[20px]'
                style={{
                  color:
                    i >= BOOK_EXCERPT.length - 3
                      ? `rgba(30,30,30,${0.5 - (i - (BOOK_EXCERPT.length - 3)) * 0.12})`
                      : 'rgba(30,30,30,0.7)',
                }}
              >
                {paragraph}
              </p>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
