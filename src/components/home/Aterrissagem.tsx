'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function Aterrissagem() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref}
      id='sobre'
      className='w-full'
      style={{ backgroundColor: '#091208' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className='mx-auto flex flex-col items-center text-center'
        style={{
          maxWidth: 'var(--width-content-wide)',
          paddingTop: '5rem',
          paddingBottom: 'var(--spacing-section)',
          paddingInline: '60px',
        }}
      >
        {/* Título */}
        <h2
          className='text-[var(--color-gk-white)]'
          style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)' }}
        >
          Desenvolvimento não se resolve.
          <br />
          <em className='text-[var(--color-gk-ocre)]'>
            Desenvolvimento se acompanha.
          </em>
        </h2>

        {/* Subtítulo */}
        <p
          className='mx-auto mt-10 max-w-md text-base leading-relaxed'
          style={{ color: 'rgba(255,255,255,0.65)' }}
        >
          Para pais e profissionais
          <br />
          que querem compreender
          <br />
          antes de intervir.
        </p>

        {/* Botões */}
        <div className='mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6'>
          <button
            disabled
            className='inline-block px-10 py-4 text-[13px] font-medium uppercase tracking-widest text-white'
            style={{ backgroundColor: 'var(--color-gk-ocre)' }}
          >
            Onde tudo começa
          </button>
          <button
            disabled
            className='inline-block border-[1.5px] border-white/40 bg-transparent px-10 py-4 text-[13px] font-medium uppercase tracking-widest text-white'
          >
            O que acreditamos
          </button>
        </div>
      </motion.div>
    </section>
  );
}
