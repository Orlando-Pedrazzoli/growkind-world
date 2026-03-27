'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function Aterrissagem() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={ref}
      id='sobre'
      className='w-full'
      style={{ backgroundColor: '#1b140c' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className='mx-auto flex flex-col items-center px-6 pt-0 pb-16 text-center md:px-[60px] md:pt-0 md:pb-[var(--spacing-section)]'
        style={{ maxWidth: 'var(--width-content-wide)' }}
      >
        {/* Titulo */}
        <h2
          className='text-[var(--color-gk-white)]'
          style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)' }}
        >
          Um mundo criado a partir da
          <br />
          <em className='text-[var(--color-gk-ocre)]'>
            experiência neurodivergente.
          </em>
        </h2>

        {/* Separador */}
        <div
          className='mx-auto mt-8 md:mt-10'
          style={{
            width: '40px',
            height: '2px',
            backgroundColor: 'rgba(255,255,255,0.3)',
          }}
        />

        {/* Subtitulo */}
        <p
          className='mx-auto mt-6 max-w-2xl text-lg leading-relaxed md:mt-8'
          style={{ color: 'rgba(255,255,255,0.65)' }}
        >
          Para pais e profissionais que valorizam compreensão antes da
          intervenção.
        </p>

        {/* Botoes */}
        <div className='mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6 md:mt-12'>
          <button
            onClick={() => scrollTo('onde-comeca')}
            className='inline-block cursor-pointer px-10 py-4 text-[14px] font-medium uppercase tracking-widest'
            style={{
              backgroundColor: 'var(--color-gk-ocre)',
              color: '#ffffff',
            }}
          >
            Por onde começar
          </button>
          <button
            onClick={() => scrollTo('oque-acreditamos')}
            className='inline-block cursor-pointer border-[1.5px] border-white/40 bg-transparent px-10 py-4 text-[14px] font-medium uppercase tracking-widest'
            style={{ color: '#ffffff' }}
          >
            Nossa metodologia
          </button>
        </div>
      </motion.div>
    </section>
  );
}
