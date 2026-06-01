'use client';

import { motion } from 'framer-motion';
import { revealContainer, revealItem } from '@/lib/motion';

export default function OQueVimos() {
  return (
    <section className='w-full' style={{ backgroundColor: '#091208' }}>
      <motion.div
        variants={revealContainer}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: false, amount: 0.2 }}
        className='mx-auto px-6 py-12 md:px-[60px] md:py-[var(--spacing-section)]'
        style={{ maxWidth: 'var(--width-content-wide)' }}
      >
        {/* Eyebrow */}
        <motion.span variants={revealItem} className='eyebrow'>
          O que vimos
        </motion.span>

        {/* Separador */}
        <motion.div
          variants={revealItem}
          className='mx-auto mt-6 md:mt-8'
          style={{
            width: '40px',
            height: '2px',
            backgroundColor: 'rgba(255,255,255,0.3)',
          }}
        />

        {/* Conteudo — sub-container que escalona os blocos */}
        <motion.div
          variants={revealContainer}
          className='mt-10 max-w-3xl space-y-6 md:mt-16 md:space-y-8'
        >
          <motion.p
            variants={revealItem}
            className='text-lg leading-relaxed'
            style={{ color: 'rgba(255,255,255,0.7)' }}
          >
            Há um silêncio que se instala quando um diagnóstico chega e ninguém
            sabe, verdadeiramente, o que fazer com ele.
          </motion.p>

          <motion.div
            variants={revealItem}
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
          </motion.div>

          <motion.p
            variants={revealItem}
            className='text-lg leading-relaxed'
            style={{ color: 'rgba(255,255,255,0.7)' }}
          >
            E no meio de tudo isso, crianças simplesmente a tentar existir.
          </motion.p>
        </motion.div>

        {/* Blockquote — sub-container que escalona as duas linhas */}
        <motion.blockquote
          variants={revealContainer}
          className='mt-10 max-w-3xl border-l-2 pl-6 md:mt-12 md:pl-8'
          style={{ borderColor: 'var(--color-gk-ocre)' }}
        >
          <motion.p
            variants={revealItem}
            className='font-[family-name:var(--font-display)] text-xl leading-relaxed italic md:text-2xl'
            style={{ color: 'var(--color-gk-creme)' }}
          >
            O maior abismo nunca esteve entre a criança e o mundo.
            <br />
            Estava entre a experiência vivida e a linguagem usada para a
            explicar.
          </motion.p>
          <motion.p
            variants={revealItem}
            className='mt-4 font-[family-name:var(--font-display)] text-xl font-semibold italic md:mt-6 md:text-2xl'
            style={{ color: 'var(--color-gk-creme)' }}
          >
            Faltava tradução.
          </motion.p>
        </motion.blockquote>
      </motion.div>
    </section>
  );
}
