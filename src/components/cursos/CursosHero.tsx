// src/components/cursos/CursosHero.tsx

'use client';

import { motion } from 'framer-motion';

export default function CursosHero() {
  return (
    <section
      className='relative flex min-h-[70vh] items-center justify-center overflow-hidden px-6 py-24 md:min-h-[80vh] md:px-[60px] md:py-32'
      style={{ backgroundColor: 'var(--color-gk-green-dark)' }}
    >
      {/* Textura sutil de fundo */}
      <div
        aria-hidden='true'
        className='absolute inset-0 opacity-[0.04]'
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 30%, #e8943a 0%, transparent 50%), radial-gradient(circle at 80% 70%, #e8943a 0%, transparent 50%)',
        }}
      />

      <div className='relative z-10 mx-auto max-w-4xl text-center'>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='mb-6 text-[11px] font-medium uppercase tracking-[0.18em]'
          style={{ color: 'var(--color-gk-ocre)' }}
        >
          Cursos
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className='mb-8 font-[family-name:var(--font-display)] text-4xl italic leading-[1.15] md:text-5xl lg:text-6xl'
          style={{ color: '#ffffff' }}
        >
          &ldquo;Desenvolvimento não se resolve.
          <br />
          Desenvolvimento acompanha-se.&rdquo;
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className='mx-auto max-w-2xl text-base leading-relaxed md:text-lg'
          style={{ color: 'rgba(255,255,255,0.75)' }}
        >
          Formações pensadas para quem acompanha — com ferramentas, casos reais
          e reflexão guiada. Para profissionais e para famílias.
        </motion.p>
      </div>
    </section>
  );
}
