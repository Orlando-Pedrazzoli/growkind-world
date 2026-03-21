'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function OQueVimos() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref}
      className='w-full'
      style={{ backgroundColor: '#091208' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className='mx-auto px-6 py-12 md:px-[60px] md:py-[var(--spacing-section)]'
        style={{ maxWidth: 'var(--width-content-wide)' }}
      >
        {/* Eyebrow */}
        <span className='eyebrow'>O que vimos</span>

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
        <div className='mt-10 max-w-3xl space-y-6 md:mt-16 md:space-y-8'>
          <p
            className='text-lg leading-relaxed'
            style={{ color: 'rgba(255,255,255,0.7)' }}
          >
            Há um silêncio que se instala quando um diagnóstico chega e ninguém
            sabe, verdadeiramente, o que fazer com ele.
          </p>

          <div
            className='space-y-1 text-lg leading-relaxed'
            style={{ color: 'rgba(255,255,255,0.7)' }}
          >
            <p>
              Pais confusos diante de relatórios que não conversam entre si.
            </p>
            <p>
              Educadores sobrecarregados com estratégias que raramente
              sobrevivem ao ritmo real da sala de aula.
            </p>
            <p>
              Profissionais competentes, mas fragmentados — cada um a olhar para
              uma parte da criança, quase nunca para o todo.
            </p>
          </div>

          <p
            className='text-lg leading-relaxed'
            style={{ color: 'rgba(255,255,255,0.7)' }}
          >
            E no meio de tudo isso, crianças simplesmente a tentar existir.
          </p>
        </div>

        {/* Blockquote */}
        <blockquote
          className='mt-10 max-w-3xl border-l-2 pl-6 md:mt-12 md:pl-8'
          style={{ borderColor: 'var(--color-gk-ocre)' }}
        >
          <p
            className='font-[family-name:var(--font-display)] text-xl leading-relaxed italic md:text-2xl'
            style={{ color: 'var(--color-gk-creme)' }}
          >
            O maior abismo nunca esteve entre a criança e o mundo.
            <br />
            Estava entre a experiência vivida e a linguagem usada para a
            explicar.
          </p>
          <p
            className='mt-4 font-[family-name:var(--font-display)] text-xl font-semibold italic md:mt-6 md:text-2xl'
            style={{ color: 'var(--color-gk-creme)' }}
          >
            Faltava tradução.
          </p>
        </blockquote>
      </motion.div>
    </section>
  );
}
