'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { BOOK_EDITIONS } from '@/lib/data/book';

export default function BookFinalCTA() {
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
          Comece por
          <br />
          <em style={{ color: '#c4a44a' }}>ver diferente.</em>
        </h2>

        {/* Subtitulo */}
        <p
          className='mx-auto mt-6 max-w-lg text-[16px] leading-relaxed'
          style={{ color: 'rgba(240,232,208,0.55)' }}
        >
          Não é preciso ter todas as respostas. Basta estar disposto a fazer uma
          pergunta diferente — e deixar que ela mude o que você oferece.
        </p>

        {/* Botoes de compra (BOOK_EDITIONS) */}
        <div className='mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center'>
          {BOOK_EDITIONS.map(edition => {
            const isExternal = edition.href.startsWith('http');

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
                <span>{edition.icon}</span>
                <span>
                  {edition.format === 'kindle' ? 'Kindle' : 'Físico Amazon'} —{' '}
                  {edition.price}
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
              Ler os primeiros capítulos · grátis
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
          Envio para PT, BR e resto do mundo · Devolução em 7 dias
        </p>
      </motion.div>
    </section>
  );
}
