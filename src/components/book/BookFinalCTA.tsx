'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { useBookData } from '@/lib/data/book';

export default function BookFinalCTA() {
  const t = useTranslations('book.finalCta');
  const te = useTranslations('book.editions');
  const tBook = useTranslations('book');
  const { editions } = useBookData();

  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref}
      className='px-6 py-20 md:px-[60px] md:py-28'
      style={{ backgroundColor: '#1a1f18' }}
    >
      <motion.div
        className='mx-auto max-w-[720px] text-center'
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Titulo */}
        <h2
          className='font-[family-name:var(--font-display)]'
          style={{
            fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
            color: '#f0e8d0',
            fontWeight: 400,
            lineHeight: 1.2,
          }}
        >
          {t('titleLead')}
          <br />
          <em style={{ color: '#c4a44a' }}>{t('titleEmphasis')}</em>
        </h2>

        {/* Subtitulo */}
        <p
          className='mx-auto mt-6 max-w-lg text-[16px] leading-relaxed'
          style={{ color: 'rgba(240,232,208,0.55)' }}
        >
          {t('subtitle')}
        </p>

        {/* Botoes de compra (BOOK_EDITIONS) */}
        <div className='mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center'>
          {editions.map(edition => {
            const isExternal = edition.href.startsWith('http');
            const Icon = edition.icon;

            if (edition.style === 'primary') {
              return (
                <Link
                  key={edition.format}
                  href={edition.href}
                  className='flex items-center gap-2 px-7 py-3.5 text-[13px] font-medium transition-all duration-300 hover:brightness-110'
                  style={{
                    backgroundColor: '#c4a44a',
                    color: '#1a1f18',
                    borderRadius: '8px',
                  }}
                >
                  <Icon size={16} strokeWidth={1.8} aria-hidden='true' />
                  <span>
                    {edition.label} — {edition.price}
                  </span>
                </Link>
              );
            }

            const Component = isExternal ? 'a' : Link;
            const externalProps = isExternal
              ? { target: '_blank' as const, rel: 'noopener noreferrer' }
              : {};

            return (
              <Component
                key={edition.format}
                href={edition.href}
                className='flex items-center gap-2 px-7 py-3.5 text-[13px] font-medium transition-all duration-300'
                style={{
                  border:
                    edition.style === 'secondary'
                      ? '1.5px solid rgba(240,232,208,0.4)'
                      : '1px solid rgba(240,232,208,0.2)',
                  color: '#f0e8d0',
                  borderRadius: '8px',
                }}
                {...externalProps}
              >
                <Icon size={16} strokeWidth={1.8} aria-hidden='true' />
                <span>
                  {edition.format === 'kindle'
                    ? te('kindle')
                    : te('physicalAmazon')}{' '}
                  — {edition.price}
                </span>
              </Component>
            );
          })}
        </div>

        {/* Link para preview gratuito */}
        <div className='mt-6 flex justify-center'>
          <Link
            href='/livro/preview'
            className='group inline-flex items-center gap-2 text-[13px] uppercase tracking-[0.1em] transition-all duration-300'
            style={{ color: 'rgba(240,232,208,0.7)' }}
          >
            <span className='underline-offset-4 group-hover:underline'>
              {tBook('previewLink')}
            </span>
            <ArrowRight
              size={14}
              strokeWidth={1.8}
              className='transition-transform duration-300 group-hover:translate-x-1'
            />
          </Link>
        </div>

        {/* Info envio */}
        <p
          className='mt-5 text-[13px] italic'
          style={{ color: 'rgba(240,232,208,0.35)' }}
        >
          {t('note')}
        </p>
      </motion.div>
    </section>
  );
}
