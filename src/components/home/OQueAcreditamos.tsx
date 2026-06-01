'use client';

import { motion } from 'framer-motion';
import { revealContainer, revealItem } from '@/lib/motion';

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
  return (
    <section
      id='oque-acreditamos'
      className='w-full'
      style={{ backgroundColor: '#0d1f13' }}
    >
      <motion.div
        variants={revealContainer}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: false, amount: 0.2 }}
        className='mx-auto px-6 py-12 md:px-[60px] md:py-[var(--spacing-section)]'
        style={{ maxWidth: 'var(--width-page)' }}
      >
        {/* Eyebrow centrado */}
        <motion.div variants={revealItem} className='text-center'>
          <span className='eyebrow'>O que acreditamos</span>
        </motion.div>

        {/* Separador */}
        <motion.div
          variants={revealItem}
          className='mx-auto mt-6 md:mt-8'
          style={{
            width: '40px',
            height: '2px',
            backgroundColor: 'rgba(255,255,255,0.3)',
          }}
        />

        {/* Cards — sub-container que escalona cada card */}
        <motion.div
          variants={revealContainer}
          className='mt-10 grid grid-cols-1 gap-4 md:mt-16 md:grid-cols-3 md:gap-6'
        >
          {cards.map(card => (
            <motion.div
              key={card.num}
              variants={revealItem}
              className='border-t p-6 md:p-8'
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
                className='mt-4 text-xl font-semibold md:mt-6'
                style={{ color: 'var(--color-gk-white)' }}
              >
                {card.titulo}
              </h3>

              {/* Corpo */}
              <div
                className='mt-3 space-y-2 text-lg leading-relaxed md:mt-4'
                style={{ color: 'rgba(255,255,255,0.6)' }}
              >
                {card.corpo}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
