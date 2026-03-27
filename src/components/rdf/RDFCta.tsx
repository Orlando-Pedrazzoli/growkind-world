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

        {/* Frase de transição */}
        <p
          className='mx-auto mt-8 max-w-[560px] text-[16px] leading-relaxed'
          style={{ color: 'rgba(240,232,208,0.6)' }}
        >
          A lente está disponível nesta página. O que os cursos aprofundam é a
          aplicação — com ferramentas, casos reais e reflexão guiada. Para
          profissionais e para famílias.
        </p>

        {/* Frase secundária */}
        <p
          className='mt-3 text-[13px]'
          style={{ color: 'rgba(240,232,208,0.4)' }}
        >
          4 cursos · do sentir ao agir · para profissionais e famílias
        </p>

        {/* Botão único */}
        <div className='mt-10'>
          <Link
            href='/cursos'
            className='inline-block px-8 py-4 text-[14px] font-medium transition-all duration-300 hover:brightness-110'
            style={{
              backgroundColor: '#3d5a4f',
              color: '#ffffff',
              border: '1.5px solid rgba(240,232,208,0.3)',
              borderRadius: '8px',
            }}
          >
            Conhecer os cursos <span aria-hidden='true'>→</span>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
