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
        className='mx-auto px-6 py-12 md:px-[60px] md:py-[var(--spacing-section)]'
        style={{ maxWidth: 'var(--width-content-wide)' }}
      >
        {/* Eyebrow */}
        <span className='eyebrow'>Onde tudo começa</span>

        {/* Separador */}
        <div
          className='mx-auto mt-6 md:mt-8'
          style={{
            width: '40px',
            height: '2px',
            backgroundColor: 'rgba(255,255,255,0.3)',
          }}
        />

        {/* Conteudo */}
        <div className='mt-10 max-w-2xl md:mt-16'>
          <p
            className='font-[family-name:var(--font-display)] text-xl leading-relaxed italic md:text-2xl'
            style={{ color: 'var(--color-gk-creme)' }}
          >
            Durante muito tempo, a pergunta foi sempre a mesma:
            <br />
            como ensinamos a criança a adaptar-se ao mundo?
          </p>

          <p
            className='mt-8 text-xl leading-relaxed md:mt-10 md:text-2xl'
            style={{ color: 'rgba(255,255,255,0.75)' }}
          >
            O GrowKind nasce de outra pergunta:
            <br />
            como organizamos o mundo para que ele faça sentido
            <br />
            para diferentes formas de existir?
          </p>

          <p
            className='mt-8 font-[family-name:var(--font-display)] text-xl leading-relaxed italic md:mt-10 md:text-2xl'
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
