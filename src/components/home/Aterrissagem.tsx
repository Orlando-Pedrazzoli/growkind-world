// src/components/home/Aterrissagem.tsx

'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { revealContainer, revealItem } from '@/lib/motion';

export default function Aterrissagem() {
  const t = useTranslations('home.hero');

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id='sobre'
      className='w-full'
      style={{ backgroundColor: '#0a0805' }}
    >
      <motion.div
        variants={revealContainer}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: false, amount: 0.2 }}
        className='mx-auto flex flex-col items-center px-6 pt-0 pb-16 text-center md:px-[60px] md:pt-0 md:pb-[var(--spacing-section)]'
        style={{ maxWidth: 'var(--width-content-wide)' }}
      >
        {/* Titulo */}
        <motion.h2
          variants={revealItem}
          className='text-[var(--color-gk-white)]'
          style={{ fontSize: 'clamp(1.25rem, 5vw, 2.75rem)' }}
        >
          {t('titleLead')}
          <br />
          <em className='text-[var(--color-gk-ocre)]'>{t('titleEmphasis')}</em>
        </motion.h2>

        {/* Separador */}
        <motion.div
          variants={revealItem}
          className='mx-auto mt-8 md:mt-10'
          style={{
            width: '40px',
            height: '2px',
            backgroundColor: 'rgba(255,255,255,0.3)',
          }}
        />

        {/* Subtitulo */}
        <motion.p
          variants={revealItem}
          className='mx-auto mt-6 max-w-2xl text-lg leading-relaxed md:mt-8'
          style={{ color: 'rgba(255,255,255,0.65)' }}
        >
          {t('subtitle')}
        </motion.p>

        {/* Botoes — sub-container que escalona os dois CTAs */}
        <motion.div
          variants={revealContainer}
          className='mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6 md:mt-12'
        >
          <motion.button
            variants={revealItem}
            onClick={() => scrollTo('onde-comeca')}
            className='inline-block cursor-pointer rounded-full px-10 py-4 text-[14px] font-medium uppercase tracking-widest transition-all duration-300 hover:brightness-110'
            style={{
              backgroundColor: 'var(--color-gk-ocre)',
              color: '#ffffff',
            }}
          >
            {t('ctaStory')}
          </motion.button>
          <motion.button
            variants={revealItem}
            onClick={() => scrollTo('oque-acreditamos')}
            className='inline-block cursor-pointer rounded-full border-[1.5px] border-white/40 bg-transparent px-10 py-4 text-[14px] font-medium uppercase tracking-widest transition-all duration-300 hover:border-white/70 hover:bg-white/5'
            style={{ color: '#ffffff' }}
          >
            {t('ctaPrinciples')}
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
}
