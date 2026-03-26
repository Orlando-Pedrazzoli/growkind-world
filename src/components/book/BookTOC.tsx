'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { BOOK_PARTS } from '@/lib/data/book';

export default function BookTOC() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref}
      className='px-6 py-20 md:px-[60px] md:py-28'
      style={{ backgroundColor: '#f5f0e8' }}
    >
      <motion.div
        className='mx-auto max-w-[1100px]'
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Header */}
        <div className='text-center'>
          <span className='eyebrow'>Estrutura da obra</span>
          <h2
            className='mt-6 font-[family-name:var(--font-display)]'
            style={{
              fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
              color: 'var(--color-gk-black)',
              fontWeight: 400,
              lineHeight: 1.15,
            }}
          >
            O que encontra
            <br />
            <em style={{ color: '#c4a44a' }}>dentro do livro</em>
          </h2>
          <p
            className='mx-auto mt-4 max-w-xl text-[15px]'
            style={{ color: 'var(--color-gk-cinza)' }}
          >
            20 capítulos organizados em três partes — do sentir ao fazer, do
            fazer à relação.
          </p>
        </div>

        {/* 3 Cards */}
        <div className='mt-14 grid gap-6 md:grid-cols-3'>
          {BOOK_PARTS.map((part, index) => (
            <motion.div
              key={part.number}
              className='flex flex-col p-8'
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              {/* Numero romano */}
              <span
                className='font-[family-name:var(--font-display)] text-5xl font-light'
                style={{ color: 'rgba(30,30,30,0.08)' }}
              >
                {part.number}
              </span>

              {/* Label */}
              <span
                className='mt-4 text-[11px] font-semibold uppercase tracking-[0.12em]'
                style={{ color: '#8b6914' }}
              >
                {part.label}
              </span>

              {/* Titulo */}
              <h3
                className='mt-3 font-[family-name:var(--font-display)] text-lg font-semibold leading-snug'
                style={{ color: 'var(--color-gk-black)' }}
              >
                {part.title}
              </h3>

              {/* Subtitulo */}
              <p
                className='mt-2 font-[family-name:var(--font-display)] text-[15px] italic'
                style={{ color: 'var(--color-gk-cinza)' }}
              >
                {part.subtitle}
              </p>

              {/* Capitulos */}
              <ul className='mt-6 flex flex-col gap-2'>
                {part.chapters.map(chapter => (
                  <li
                    key={chapter}
                    className='text-[13px] leading-relaxed'
                    style={{ color: 'rgba(30,30,30,0.55)' }}
                  >
                    – {chapter}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
