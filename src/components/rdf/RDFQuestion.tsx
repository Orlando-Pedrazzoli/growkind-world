'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { RDF_QUESTION } from '@/lib/data/rdf';

export default function RDFQuestion() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref}
      className='px-6 py-24 md:px-[60px] md:py-32'
      style={{ backgroundColor: '#f5f0e8' }}
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
          style={{ color: '#8b6914' }}
        >
          A pergunta central
        </span>

        {/* Pergunta */}
        <h2
          className='mt-8 font-[family-name:var(--font-display)] italic'
          style={{
            fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)',
            color: '#3d5a4f',
            fontWeight: 400,
            lineHeight: 1.3,
          }}
        >
          &ldquo;{RDF_QUESTION}&rdquo;
        </h2>

        {/* Separador */}
        <div
          className='mx-auto mt-10'
          style={{
            width: '40px',
            height: '1px',
            backgroundColor: 'rgba(61,90,79,0.2)',
          }}
        />

        {/* Explicacao */}
        <p
          className='mx-auto mt-8 max-w-lg text-[15px] leading-relaxed md:text-[16px]'
          style={{ color: 'var(--color-gk-cinza)' }}
        >
          Esta pergunta é o ponto de partida de toda a leitura RDF. Não começa
          pelo que fazer. Começa pelo que está a acontecer. É uma inversão
          simples — mas muda tudo o que vem depois.
        </p>
      </motion.div>
    </section>
  );
}
