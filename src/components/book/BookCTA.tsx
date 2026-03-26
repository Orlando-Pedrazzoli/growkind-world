'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { BOOK_EDITIONS } from '@/lib/data/book';

export default function BookCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <div
      ref={ref}
      className='px-6 py-16 md:px-[60px] md:py-24'
      style={{ backgroundColor: '#faf8f4' }}
    >
      <motion.div
        className='mx-auto max-w-[600px] p-10 text-center md:p-14'
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          border: '1px solid rgba(212,207,196,0.6)',
          borderTop: '3px solid #8b6914',
        }}
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <span className='eyebrow'>Continue a leitura</span>

        <h2
          className='mt-5 font-[family-name:var(--font-display)]'
          style={{
            fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
            color: 'var(--color-gk-black)',
            fontWeight: 400,
            lineHeight: 1.2,
          }}
        >
          Onde o Mundo Nasce <em style={{ color: '#c4a44a' }}>Entre Nós</em>
        </h2>

        <p
          className='mt-3 text-[15px]'
          style={{ color: 'var(--color-gk-cinza)' }}
        >
          20 capítulos. Três partes. Uma lente que não se desfaz após a última
          página.
        </p>

        {/* 3 Botoes inline */}
        <div className='mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center'>
          {BOOK_EDITIONS.map(edition => {
            const isExternal = edition.href.startsWith('http');

            if (edition.style === 'primary') {
              return (
                <Link
                  key={edition.format}
                  href={edition.href}
                  className='flex items-center gap-2 px-6 py-3 text-[13px] font-medium transition-all duration-300 hover:brightness-110'
                  style={{
                    backgroundColor: '#c4a44a',
                    color: '#1a1f18',
                    borderRadius: '8px',
                  }}
                >
                  <span>{edition.icon}</span>
                  <span>eBook — {edition.price}</span>
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
                className='flex items-center gap-2 px-6 py-3 text-[13px] font-medium transition-all duration-300'
                style={{
                  border:
                    edition.style === 'secondary'
                      ? '1.5px solid #3d5a4f'
                      : '1px solid rgba(212,207,196,0.8)',
                  color:
                    edition.style === 'secondary'
                      ? '#3d5a4f'
                      : 'var(--color-gk-cinza)',
                  borderRadius: '8px',
                  backgroundColor:
                    edition.style === 'secondary' ? '#3d5a4f' : 'transparent',
                  ...(edition.style === 'secondary'
                    ? { color: '#ffffff' }
                    : {}),
                }}
                {...externalProps}
              >
                <span>{edition.icon}</span>
                <span>
                  {edition.format === 'kindle' ? 'Kindle' : 'Físico Amazon'} —{' '}
                  {edition.price}
                </span>
              </Component>
            );
          })}
        </div>

        <p
          className='mt-5 text-[13px] italic'
          style={{ color: 'rgba(30,30,30,0.35)' }}
        >
          Devolução em 7 dias · eBook: acesso imediato
        </p>
      </motion.div>
    </div>
  );
}
