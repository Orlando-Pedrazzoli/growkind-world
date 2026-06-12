'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { revealContainer, revealItem } from '@/lib/motion';

export default function OQueAcreditamos() {
  const t = useTranslations('home.believe');

  // Cards construídos dentro do componente para usar as traduções,
  // preservando o styling por linha (itálico + destaque ocre)
  const cards = [
    {
      num: '01',
      titulo: t('item1Title'),
      corpo: (
        <>
          <p>{t('item1Line1')}</p>
          <p className='italic' style={{ color: 'var(--color-gk-ocre)' }}>
            {t('item1Highlight')}
          </p>
          <p>{t('item1Line2')}</p>
        </>
      ),
    },
    {
      num: '02',
      titulo: t('item2Title'),
      corpo: (
        <>
          <p className='italic'>{t('item2Line1')}</p>
          <p className='italic'>{t('item2Line2')}</p>
          <p className='italic'>{t('item2Line3')}</p>
        </>
      ),
    },
    {
      num: '03',
      titulo: t('item3Title'),
      corpo: (
        <>
          <p>{t('item3Line1')}</p>
          <p className='italic' style={{ color: 'var(--color-gk-ocre)' }}>
            {t('item3Highlight')}
          </p>
        </>
      ),
    },
  ];

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
          <span className='eyebrow'>{t('eyebrow')}</span>
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
