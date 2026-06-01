'use client';

import { motion } from 'framer-motion';
import { revealContainer, revealItem } from '@/lib/motion';

export default function SeccaoLivro() {
  return (
    <section
      id='onde-comeca'
      className='w-full'
      style={{ backgroundColor: '#0d1f13' }}
    >
      <motion.div
        variants={revealContainer}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: false, amount: 0.3 }}
        className='mx-auto px-6 py-12 md:px-[60px] md:py-[var(--spacing-section)]'
        style={{ maxWidth: 'var(--width-content-wide)' }}
      >
        {/* Eyebrow */}
        <motion.span variants={revealItem} className='eyebrow'>
          Onde tudo começa
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

        {/* Conteudo — sub-container que escalona cada parágrafo */}
        <motion.div
          variants={revealContainer}
          className='mt-10 max-w-2xl md:mt-16'
        >
          <motion.p
            variants={revealItem}
            className='font-[family-name:var(--font-display)] text-xl leading-relaxed italic md:text-2xl'
            style={{ color: 'var(--color-gk-creme)' }}
          >
            Durante muito tempo, a pergunta foi sempre a mesma:
            <br />
            como ensinamos a criança a adaptar-se ao mundo?
          </motion.p>

          <motion.p
            variants={revealItem}
            className='mt-8 text-xl leading-relaxed md:mt-10 md:text-2xl'
            style={{ color: 'rgba(255,255,255,0.75)' }}
          >
            O GrowKind nasce de outra pergunta:
            <br />
            como organizamos o mundo para que ele faça sentido
            <br />
            para diferentes formas de existir?
          </motion.p>

          <motion.p
            variants={revealItem}
            className='mt-8 font-[family-name:var(--font-display)] text-xl leading-relaxed italic md:mt-10 md:text-2xl'
            style={{ color: 'var(--color-gk-ocre)' }}
          >
            Não é uma pergunta pequena.
            <br />É uma pergunta que muda tudo.
          </motion.p>
        </motion.div>
      </motion.div>
    </section>
  );
}
