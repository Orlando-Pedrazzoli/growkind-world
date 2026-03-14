'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function OQueFazemos() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref}
      className='w-full'
      style={{ backgroundColor: 'var(--color-gk-creme)' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          maxWidth: 'var(--width-content-wide)',
          paddingBlock: 'var(--spacing-section)',
          paddingInline: '60px',
        }}
        className='mx-auto'
      >
        {/* Eyebrow */}
        <span className='eyebrow'>O que fazemos</span>

        {/* Separador alinhado à esquerda */}
        <div
          className='mt-8'
          style={{
            width: '40px',
            height: '2px',
            backgroundColor: 'rgba(30,30,30,0.2)',
          }}
        />

        {/* Conteúdo */}
        <div className='mt-16 max-w-3xl space-y-8'>
          <p
            className='text-lg leading-relaxed'
            style={{ color: 'var(--color-gk-black)' }}
          >
            A GrowKind nasce para fazer essa tradução.
          </p>

          <p
            className='text-lg leading-relaxed'
            style={{ color: 'rgba(30,30,30,0.7)' }}
          >
            Um território vivo onde o desenvolvimento pode ser acompanhado com
            rigor, tempo e atenção ao real.
          </p>

          <p
            className='text-lg leading-relaxed'
            style={{ color: 'rgba(30,30,30,0.7)' }}
          >
            Aqui o olhar encontra organização. Os profissionais encontram uma
            linguagem comum. E quem acompanha a criança encontra sustentação
            para o dia a dia real.
          </p>
        </div>

        {/* Blockquote */}
        <blockquote
          className='mt-10 max-w-3xl border-l-2 pl-8'
          style={{ borderColor: 'var(--color-gk-ocre)' }}
        >
          <p
            className='font-[family-name:var(--font-display)] text-xl leading-relaxed italic md:text-2xl'
            style={{ color: 'var(--color-gk-green-dark)' }}
          >
            O desenvolvimento não acontece apenas dentro da criança.
            <br />
            Ele emerge no campo que se forma entre criança, adulto e ambiente.
          </p>
        </blockquote>

        {/* Parágrafo final */}
        <div className='mt-10 max-w-3xl'>
          <p
            className='text-lg leading-relaxed'
            style={{ color: 'rgba(30,30,30,0.7)' }}
          >
            Quando esse campo encontra organização, o desenvolvimento deixa de
            ser um problema a resolver e passa a ser um processo que pode ser
            acompanhado.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
