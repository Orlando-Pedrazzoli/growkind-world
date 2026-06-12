'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { revealContainer, revealItem } from '@/lib/motion';

export default function QuandoAdulto() {
  const t = useTranslations('home');

  return (
    <section
      className='w-full'
      style={{ backgroundColor: 'var(--color-gk-ocre)' }}
    >
      <motion.div
        variants={revealContainer}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: false, amount: 0.3 }}
        className='mx-auto flex items-center justify-center px-6 py-12 text-center md:px-[60px] md:py-20'
        style={{ maxWidth: 'var(--width-content-wide)' }}
      >
        {/* \n no JSON preserva as quebras de linha */}
        <motion.p
          variants={revealItem}
          className='whitespace-pre-line font-[family-name:var(--font-display)] text-2xl leading-relaxed italic text-white md:text-3xl'
        >
          {t('adultLine')}
        </motion.p>
      </motion.div>
    </section>
  );
}
