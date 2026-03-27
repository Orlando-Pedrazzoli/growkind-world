'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { RDF_AXIOM } from '@/lib/data/rdf';

export default function RDFCta() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref}
      className='px-6 py-20 md:px-[60px] md:py-28'
      style={{ backgroundColor: '#3d5a4f' }}
    >
      <motion.div
        className='mx-auto max-w-[800px] text-center'
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Eyebrow */}
        <span
          className='text-[11px] font-semibold uppercase tracking-[0.14em]'
          style={{ color: '#c4a44a' }}
        >
          O princípio
        </span>

        {/* Axioma */}
        <h2
          className='mt-8 font-[family-name:var(--font-display)] italic'
          style={{
            fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
            color: '#f0e8d0',
            fontWeight: 400,
            lineHeight: 1.3,
          }}
        >
          &ldquo;{RDF_AXIOM}&rdquo;
        </h2>

        {/* Subtitulo */}
        <p
          className='mx-auto mt-6 max-w-lg text-[16px] leading-relaxed'
          style={{ color: 'rgba(240,232,208,0.6)' }}
        >
          A lente está disponível. Os cursos aprofundam a sua aplicação — em
          contexto profissional e familiar.
        </p>

        {/* 2 Cards de cursos */}
        <div className='mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row'>
          {/* Card Profissionais */}
          <Link
            href='/cursos'
            className='w-full max-w-[280px] px-8 py-6 text-center transition-all duration-300 hover:brightness-110'
            style={{
              backgroundColor: 'rgba(240,232,208,0.12)',
              border: '1px solid rgba(240,232,208,0.2)',
              borderRadius: '12px',
            }}
          >
            <span
              className='block text-[10px] font-semibold uppercase tracking-[0.14em]'
              style={{ color: 'rgba(240,232,208,0.5)' }}
            >
              Para profissionais
            </span>
            <span
              className='mt-2 block text-[16px] font-semibold'
              style={{ color: '#f0e8d0' }}
            >
              Curso Zero RDF
            </span>
            <span
              className='mt-1 block text-[13px]'
              style={{ color: 'rgba(240,232,208,0.5)' }}
            >
              4 módulos · 6h CPD · €39
            </span>
          </Link>

          {/* Card Familias */}
          <Link
            href='/cursos'
            className='w-full max-w-[280px] px-8 py-6 text-center transition-all duration-300 hover:brightness-110'
            style={{
              backgroundColor: '#c4a44a',
              borderRadius: '12px',
            }}
          >
            <span
              className='block text-[10px] font-semibold uppercase tracking-[0.14em]'
              style={{ color: 'rgba(26,31,24,0.5)' }}
            >
              Para famílias
            </span>
            <span
              className='mt-2 block text-[16px] font-semibold'
              style={{ color: '#1a1f18' }}
            >
              Curso Zero Famílias
            </span>
            <span
              className='mt-1 block text-[13px]'
              style={{ color: 'rgba(26,31,24,0.5)' }}
            >
              4 módulos · 4h · €29
            </span>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
