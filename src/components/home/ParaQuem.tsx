'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const items = [
  {
    titulo: 'Para pais e famílias',
    descricao: 'Que querem compreender antes de agir.',
  },
  {
    titulo: 'Para educadores',
    descricao: 'Que ensinam sem apagar quem a criança é.',
  },
  {
    titulo: 'Para profissionais',
    descricao: 'Que sabem que o desenvolvimento começa antes da técnica.',
  },
  {
    titulo: 'Para todos',
    descricao:
      'Que acreditam que acompanhar é mais exigente — e mais poderoso — do que corrigir.',
  },
];

export default function ParaQuem() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref}
      className='w-full'
      style={{ backgroundColor: '#0d1f13' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          maxWidth: 'var(--width-content-wide)',
          paddingBlock: 'var(--spacing-section)',
          paddingInline: '60px',
        }}
        className='mx-auto'
      >
        {/* Eyebrow */}
        <span className='eyebrow'>Para quem é</span>

        {/* Separador */}
        <div
          className='mt-8'
          style={{
            width: '40px',
            height: '2px',
            backgroundColor: 'rgba(255,255,255,0.3)',
          }}
        />

        {/* Lista */}
        <div className='mt-16'>
          {items.map((item, i) => (
            <div
              key={i}
              className='flex flex-col gap-2 py-8 sm:flex-row sm:items-baseline sm:gap-12'
              style={{
                borderBottom:
                  i < items.length - 1
                    ? '1px solid rgba(255,255,255,0.1)'
                    : 'none',
              }}
            >
              <h3
                className='shrink-0 font-[family-name:var(--font-display)] text-2xl font-bold italic md:text-3xl sm:w-64'
                style={{ color: 'var(--color-gk-creme)' }}
              >
                {item.titulo}
              </h3>
              <p
                className='text-base leading-relaxed'
                style={{ color: 'rgba(255,255,255,0.55)' }}
              >
                {item.descricao}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
