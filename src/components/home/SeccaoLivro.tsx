'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { revealContainer, revealItem } from '@/lib/motion';

export default function SeccaoLivro() {
  const t = useTranslations('home.origin');

  return (
    <section
      id='onde-comeca'
      className='w-full'
      style={{ backgroundColor: '#0d1f13' }}
    >
      <motion.div
        variants={revealContainer}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: false, amount: 0.3 }}
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

        {/* Conteudo — \n no JSON preserva as quebras de linha */}
        <motion.div
          variants={revealContainer}
          className='mt-10 max-w-2xl md:mt-16'
        >
          <motion.p
            variants={revealItem}
            className='whitespace-pre-line font-[family-name:var(--font-display)] text-xl leading-relaxed italic md:text-2xl'
            style={{ color: 'var(--color-gk-creme)' }}
          >
            {t('body1')}
          </motion.p>

          <motion.p
            variants={revealItem}
            className='mt-8 whitespace-pre-line text-xl leading-relaxed md:mt-10 md:text-2xl'
            style={{ color: 'rgba(255,255,255,0.75)' }}
          >
            {t('body2')}
          </motion.p>

          <motion.p
            variants={revealItem}
            className='mt-8 whitespace-pre-line font-[family-name:var(--font-display)] text-xl leading-relaxed italic md:mt-10 md:text-2xl'
            style={{ color: 'var(--color-gk-ocre)' }}
          >
            {t('body3')}
          </motion.p>
        </motion.div>
      </motion.div>
    </section>
  );
}
