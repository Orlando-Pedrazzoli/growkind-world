'use client';

import { motion } from 'framer-motion';
import { revealContainer, revealItem } from '@/lib/motion';

export default function OQueFazemos() {
  return (
    <section
      className='w-full'
      style={{ backgroundColor: 'var(--color-gk-creme)' }}
    >
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
          O que fazemos
        </motion.span>

        {/* Separador alinhado a esquerda */}
        <motion.div
          variants={revealItem}
          className='mt-6 md:mt-8'
          style={{
            width: '40px',
            height: '2px',
            backgroundColor: 'rgba(30,30,30,0.2)',
          }}
        />

        {/* Conteudo — sub-container que escalona os parágrafos */}
        <motion.div
          variants={revealContainer}
          className='mt-10 max-w-3xl space-y-6 md:mt-16 md:space-y-8'
        >
          <motion.p
            variants={revealItem}
            className='text-lg leading-relaxed'
            style={{ color: 'var(--color-gk-black)' }}
          >
            A GrowKind nasce para fazer essa tradução.
          </motion.p>

          <motion.p
            variants={revealItem}
            className='text-lg leading-relaxed'
            style={{ color: 'rgba(30,30,30,0.7)' }}
          >
            Um território vivo onde o desenvolvimento pode ser acompanhado com
            rigor, tempo e atenção ao real.
          </motion.p>

          <motion.p
            variants={revealItem}
            className='text-lg leading-relaxed'
            style={{ color: 'rgba(30,30,30,0.7)' }}
          >
            Aqui o olhar encontra organização. Os profissionais encontram uma
            linguagem comum. E quem acompanha a criança encontra sustentação
            para o dia a dia real.
          </motion.p>
        </motion.div>

        {/* Blockquote */}
        <motion.blockquote
          variants={revealItem}
          className='mt-8 max-w-3xl border-l-2 pl-6 md:mt-10 md:pl-8'
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
        </motion.blockquote>

        {/* Paragrafo final */}
        <motion.div variants={revealItem} className='mt-8 max-w-3xl md:mt-10'>
          <p
            className='text-lg leading-relaxed'
            style={{ color: 'rgba(30,30,30,0.7)' }}
          >
            Quando esse campo encontra organização, o desenvolvimento deixa de
            ser um problema a resolver e passa a ser um processo que pode ser
            acompanhado.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
