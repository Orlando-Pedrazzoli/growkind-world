'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useRdfData } from '@/lib/data/rdf';

export default function RDFWhatIsNot() {
  const t = useTranslations('rdf.whatIsNot');
  const { definition } = useRdfData();

  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref}
      className='px-6 py-20 md:px-[60px] md:py-28'
      style={{ backgroundColor: '#faf8f4' }}
    >
      <motion.div
        className='mx-auto max-w-[1100px]'
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Header */}
        <div className='max-w-2xl'>
          <span
            className='text-[11px] font-semibold uppercase tracking-[0.14em]'
            style={{ color: '#8b6914' }}
          >
            {t('eyebrow')}
          </span>

          <h2
            className='mt-6 font-[family-name:var(--font-display)]'
            style={{
              fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
              color: 'var(--color-gk-black)',
              fontWeight: 400,
              lineHeight: 1.15,
            }}
          >
            {t.rich('title', {
              em: chunks => <em style={{ color: '#c4a44a' }}>{chunks}</em>,
            })}
          </h2>

          <p
            className='mt-5 text-[16px] leading-relaxed'
            style={{ color: 'var(--color-gk-cinza)' }}
          >
            {t('intro')}
          </p>
        </div>

        {/* Dois cards */}
        <div className='mt-12 grid gap-6 md:grid-cols-2'>
          {/* Card — O que NÃO é */}
          <motion.div
            className='p-8'
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '14px',
              border: '1px solid rgba(212,207,196,0.5)',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{
              duration: 0.6,
              delay: 0.15,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            <div className='flex items-center gap-2'>
              <span className='text-[14px]' style={{ color: '#8b3a2a' }}>
                ✗
              </span>
              <span
                className='text-[11px] font-semibold uppercase tracking-[0.12em]'
                style={{ color: 'var(--color-gk-cinza)' }}
              >
                {t('isNotLabel')}
              </span>
            </div>

            <div className='mt-6 flex flex-col gap-4'>
              {definition.isNot.map(item => (
                <div key={item} className='flex items-start gap-3'>
                  <span
                    className='mt-0.5 shrink-0 text-[14px]'
                    style={{ color: '#8b3a2a' }}
                  >
                    ✗
                  </span>
                  <span
                    className='text-[15px] leading-relaxed'
                    style={{ color: 'rgba(30,30,30,0.7)' }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Card — O que É */}
          <motion.div
            className='p-8'
            style={{
              backgroundColor: 'rgba(200,220,192,0.2)',
              borderRadius: '14px',
              border: '1px solid rgba(200,220,192,0.4)',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{
              duration: 0.6,
              delay: 0.25,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            <div className='flex items-center gap-2'>
              <span className='text-[14px]' style={{ color: '#3d5a4f' }}>
                ✓
              </span>
              <span
                className='text-[11px] font-semibold uppercase tracking-[0.12em]'
                style={{ color: 'var(--color-gk-cinza)' }}
              >
                {t('isLabel')}
              </span>
            </div>

            <div className='mt-6 flex flex-col gap-4'>
              {definition.is.map(item => (
                <div key={item} className='flex items-start gap-3'>
                  <span
                    className='mt-0.5 shrink-0 text-[14px]'
                    style={{ color: '#3d5a4f' }}
                  >
                    ✓
                  </span>
                  <span
                    className='text-[15px] leading-relaxed'
                    style={{ color: 'rgba(30,30,30,0.7)' }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
