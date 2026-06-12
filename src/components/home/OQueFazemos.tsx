'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { revealContainer, revealItem } from '@/lib/motion';

export default function OQueFazemos() {
  const t = useTranslations('home.doing');

  return (
    <section
      className='w-full'
      style={{ backgroundColor: 'var(--color-gk-creme)' }}
    >
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

        {/* Separador alinhado a esquerda */}
        <motion.div
          variants={revealItem}
          className='mt-6 md:mt-8'
          style={{
            width: '40px',
            height: '2px',
            backgroundColor: 'rgba(30,30,30,0.2)',
          }}
        />

        {/* Conteudo — sub-container que escalona os parágrafos */}
        <motion.div
          variants={revealContainer}
          className='mt-10 max-w-3xl space-y-6 md:mt-16 md:space-y-8'
        >
          <motion.p
            variants={revealItem}
            className='text-lg leading-relaxed'
            style={{ color: 'var(--color-gk-black)' }}
          >
            {t('body1')}
          </motion.p>

          <motion.p
            variants={revealItem}
            className='text-lg leading-relaxed'
            style={{ color: 'rgba(30,30,30,0.7)' }}
          >
            {t('body2')}
          </motion.p>

          <motion.p
            variants={revealItem}
            className='text-lg leading-relaxed'
            style={{ color: 'rgba(30,30,30,0.7)' }}
          >
            {t('body3')}
          </motion.p>
        </motion.div>

        {/* Blockquote — \n no JSON preserva a quebra */}
        <motion.blockquote
          variants={revealItem}
          className='mt-8 max-w-3xl border-l-2 pl-6 md:mt-10 md:pl-8'
          style={{ borderColor: 'var(--color-gk-ocre)' }}
        >
          <p
            className='whitespace-pre-line font-[family-name:var(--font-display)] text-xl leading-relaxed italic md:text-2xl'
            style={{ color: 'var(--color-gk-green-dark)' }}
          >
            {t('quote')}
          </p>
        </motion.blockquote>

        {/* Paragrafo final */}
        <motion.div variants={revealItem} className='mt-8 max-w-3xl md:mt-10'>
          <p
            className='text-lg leading-relaxed'
            style={{ color: 'rgba(30,30,30,0.7)' }}
          >
            {t('closing')}
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
