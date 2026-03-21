'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function SeccaoLivro() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref}
      id='onde-comeca'
      className='w-full'
      style={{ backgroundColor: '#0d1f13' }}
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
        <span className='eyebrow'>Onde tudo começa</span>

        {/* Separador */}
        <div
          className='mx-auto mt-8'
          style={{
            width: '40px',
            height: '2px',
            backgroundColor: 'rgba(255,255,255,0.3)',
          }}
        />

        {/* Conteudo */}
        <div className='mt-16 max-w-2xl'>
          {/* Primeiro paragrafo — italico, creme */}
          <p
            className='font-[family-name:var(--font-display)] text-xl leading-relaxed italic md:text-2xl'
            style={{ color: 'var(--color-gk-creme)' }}
          >
            Durante muito tempo, a pergunta foi sempre a mesma:
            <br />
            como ensinamos a criança a adaptar-se ao mundo?
          </p>

          {/* Segundo paragrafo — normal, branco suave */}
          <p
            className='mt-10 text-xl leading-relaxed md:text-2xl'
            style={{ color: 'rgba(255,255,255,0.75)' }}
          >
            O GrowKind nasce de outra pergunta:
            <br />
            como organizamos o mundo para que ele faça sentido
            <br />
            para diferentes formas de existir?
          </p>

          {/* Terceiro paragrafo — italico, ocre */}
          <p
            className='mt-10 font-[family-name:var(--font-display)] text-xl leading-relaxed italic md:text-2xl'
            style={{ color: 'var(--color-gk-ocre)' }}
          >
            Não é uma pergunta pequena.
            <br />É uma pergunta que muda tudo.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
