'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const cards = [
  {
    num: '01',
    titulo: 'O desenvolvimento começa pelo ambiente.',
    corpo: (
      <>
        <p>Antes de qualquer currículo, antes de qualquer intervenção,</p>
        <p className='italic' style={{ color: 'var(--color-gk-ocre)' }}>
          o mundo precisa de ser habitável.
        </p>
        <p>Seguro. Previsível. Com ritmo próprio.</p>
      </>
    ),
  },
  {
    num: '02',
    titulo: 'A experiência vem antes da instrução.',
    corpo: (
      <>
        <p className='italic'>Antes da palavra, há o gesto.</p>
        <p className='italic'>Antes do conceito, há a experiência.</p>
        <p className='italic'>Antes de corrigir, precisamos compreender.</p>
      </>
    ),
  },
  {
    num: '03',
    titulo: 'O mundo vem antes do currículo.',
    corpo: (
      <>
        <p>
          Nenhum conteúdo faz sentido se o mundo ainda é vivido como
          fragmentado.
        </p>
        <p className='italic' style={{ color: 'var(--color-gk-ocre)' }}>
          O GrowKind constrói primeiro o território.
        </p>
      </>
    ),
  },
];

export default function OQueAcreditamos() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref}
      id='oque-acreditamos'
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
        {/* Eyebrow centrado */}
        <div className='text-center'>
          <span className='eyebrow'>O que acreditamos</span>
        </div>

        {/* Separador */}
        <div
          className='mx-auto mt-8'
          style={{
            width: '40px',
            height: '2px',
            backgroundColor: 'rgba(255,255,255,0.3)',
          }}
        />

        {/* Cards */}
        <div className='mt-16 grid grid-cols-1 gap-6 md:grid-cols-3'>
          {cards.map(card => (
            <div
              key={card.num}
              className='border-t p-8'
              style={{
                borderColor: 'rgba(255,255,255,0.12)',
                backgroundColor: 'rgba(255,255,255,0.03)',
              }}
            >
              {/* Numero */}
              <span
                className='text-[14px] font-medium'
                style={{ color: 'var(--color-gk-ocre)' }}
              >
                {card.num}
              </span>

              {/* Titulo */}
              <h3
                className='mt-6 text-xl font-semibold'
                style={{ color: 'var(--color-gk-white)' }}
              >
                {card.titulo}
              </h3>

              {/* Corpo */}
              <div
                className='mt-4 space-y-2 text-lg leading-relaxed'
                style={{ color: 'rgba(255,255,255,0.6)' }}
              >
                {card.corpo}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
