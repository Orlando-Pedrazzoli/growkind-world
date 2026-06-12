'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { revealContainer, revealItem } from '@/lib/motion';

export default function ParaQuem() {
  const t = useTranslations('home.forWhom');

  const items = [
    { titulo: t('parentsTitle'), descricao: t('parentsBody') },
    { titulo: t('educatorsTitle'), descricao: t('educatorsBody') },
    { titulo: t('prosTitle'), descricao: t('prosBody') },
    { titulo: t('allTitle'), descricao: t('allBody') },
  ];

  return (
    <section className='w-full' style={{ backgroundColor: '#0d1f13' }}>
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
          className='mt-6 md:mt-8'
          style={{
            width: '40px',
            height: '2px',
            backgroundColor: 'rgba(255,255,255,0.3)',
          }}
        />

        {/* Lista — sub-container que escalona cada linha */}
        <motion.div variants={revealContainer} className='mt-10 md:mt-16'>
          {items.map((item, i) => (
            <motion.div
              key={i}
              variants={revealItem}
              className='flex flex-col gap-2 py-6 sm:flex-row sm:items-baseline sm:gap-12 md:py-8'
              style={{
                borderBottom:
                  i < items.length - 1
                    ? '1px solid rgba(255,255,255,0.1)'
                    : 'none',
              }}
            >
              <h3
                className='shrink-0 font-[family-name:var(--font-display)] text-2xl font-bold italic sm:w-64 md:text-3xl'
                style={{ color: 'var(--color-gk-creme)' }}
              >
                {item.titulo}
              </h3>
              <p
                className='text-lg leading-relaxed'
                style={{ color: 'rgba(255,255,255,0.55)' }}
              >
                {item.descricao}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
