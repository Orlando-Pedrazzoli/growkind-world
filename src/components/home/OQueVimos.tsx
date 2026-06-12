'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { revealContainer, revealItem } from '@/lib/motion';

export default function OQueVimos() {
  const t = useTranslations('home.saw');

  return (
    <section className='w-full' style={{ backgroundColor: '#091208' }}>
      <motion.div
        variants={revealContainer}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: false, amount: 0.2 }}
        className='mx-auto px-6 py-12 md:px-[60px] md:py-[var(--spacing-section)]'
        style={{ maxWidth: 'var(--width-content-wide)' }}
      >
        {/* Eyebrow */}
        <motion.span variants={revealItem} className='eyebrow'>
          {t('eyebrow')}
        </motion.span>

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

        {/* Conteudo — sub-container que escalona os blocos */}
        <motion.div
          variants={revealContainer}
          className='mt-10 max-w-3xl space-y-6 md:mt-16 md:space-y-8'
        >
          <motion.p
            variants={revealItem}
            className='text-lg leading-relaxed'
            style={{ color: 'rgba(255,255,255,0.7)' }}
          >
            {t('intro')}
          </motion.p>

          <motion.div
            variants={revealItem}
            className='space-y-1 text-lg leading-relaxed'
            style={{ color: 'rgba(255,255,255,0.7)' }}
          >
            <p>{t('point1')}</p>
            <p>{t('point2')}</p>
            <p>{t('point3')}</p>
          </motion.div>

          <motion.p
            variants={revealItem}
            className='text-lg leading-relaxed'
            style={{ color: 'rgba(255,255,255,0.7)' }}
          >
            {t('point4')}
          </motion.p>
        </motion.div>

        {/* Blockquote — sub-container que escalona as duas linhas */}
        <motion.blockquote
          variants={revealContainer}
          className='mt-10 max-w-3xl border-l-2 pl-6 md:mt-12 md:pl-8'
          style={{ borderColor: 'var(--color-gk-ocre)' }}
        >
          <motion.p
            variants={revealItem}
            className='whitespace-pre-line font-[family-name:var(--font-display)] text-xl leading-relaxed italic md:text-2xl'
            style={{ color: 'var(--color-gk-creme)' }}
          >
            {t('quote')}
          </motion.p>
          <motion.p
            variants={revealItem}
            className='mt-4 font-[family-name:var(--font-display)] text-xl font-semibold italic md:mt-6 md:text-2xl'
            style={{ color: 'var(--color-gk-creme)' }}
          >
            {t('quoteEmphasis')}
          </motion.p>
        </motion.blockquote>
      </motion.div>
    </section>
  );
}
