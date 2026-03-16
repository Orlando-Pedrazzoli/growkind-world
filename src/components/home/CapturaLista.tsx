'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

export default function CapturaLista() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [email, setEmail] = useState('');

  return (
    <section
      ref={ref}
      id='lista'
      className='w-full'
      style={{ backgroundColor: '#0d1f13' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className='mx-auto flex flex-col items-center text-center'
        style={{
          maxWidth: 'var(--width-content-wide)',
          paddingBlock: 'var(--spacing-section)',
          paddingInline: '60px',
        }}
      >
        {/* Eyebrow */}
        <span className='eyebrow'>Acompanha o processo</span>

        {/* Separador */}
        <div
          className='mx-auto mt-8'
          style={{
            width: '40px',
            height: '2px',
            backgroundColor: 'rgba(255,255,255,0.3)',
          }}
        />

        {/* Título */}
        <h2 className='mt-12 text-[var(--color-gk-white)]'>
          Entra na lista.
          <br />
          Recebe em primeira mão.
        </h2>

        {/* Subtítulo */}
        <p
          className='mx-auto mt-6 max-w-lg text-base leading-relaxed'
          style={{ color: 'rgba(255,255,255,0.6)' }}
        >
          O lançamento do livro e dos cursos acontece primeiro para quem está na
          lista.
          <br />
          Sem pressão. Só o que importa.
        </p>

        {/* Formulário */}
        <div
          className='mt-10 flex w-full max-w-lg flex-col overflow-hidden sm:flex-row'
          style={{
            border: '1px solid rgba(255,255,255,0.15)',
          }}
        >
          <input
            type='email'
            placeholder='o teu email'
            value={email}
            onChange={e => setEmail(e.target.value)}
            className='flex-1 border-none bg-transparent px-6 py-4 text-sm text-white outline-none'
            style={{ color: 'rgba(255,255,255,0.8)' }}
          />
          <button
            disabled
            className='px-8 py-4 text-[13px] font-medium uppercase tracking-widest text-white'
            style={{ backgroundColor: 'var(--color-gk-ocre)' }}
          >
            Entrar
          </button>
        </div>
      </motion.div>
    </section>
  );
}
