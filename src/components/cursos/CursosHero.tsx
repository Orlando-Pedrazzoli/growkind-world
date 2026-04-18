// src/components/cursos/CursosHero.tsx

'use client';

import { motion } from 'framer-motion';

// Paleta editorial partilhada com BookHero — mantém coerência visual
// entre o livro e os cursos (ambos são produtos de profundidade).
const BG = '#1a1f18'; // verde-oliva quase preto
const CREAM = '#f0e8d0'; // pergaminho
const GOLD = '#c4a44a'; // dourado mostarda

export default function CursosHero() {
  return (
    <section
      className='relative -mt-20 flex min-h-[70vh] items-center justify-center overflow-hidden px-6 pt-44 pb-24 md:-mt-24 md:min-h-[80vh] md:px-[60px] md:pt-52 md:pb-32'
      style={{ backgroundColor: BG }}
    >
      {/* Textura sutil de fundo — tons dourados discretos */}
      <div
        aria-hidden='true'
        className='absolute inset-0 opacity-[0.05]'
        style={{
          backgroundImage: `radial-gradient(circle at 20% 30%, ${GOLD} 0%, transparent 50%), radial-gradient(circle at 80% 70%, ${GOLD} 0%, transparent 50%)`,
        }}
      />

      <div className='relative z-10 mx-auto max-w-4xl text-center'>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='mb-6 text-[11px] font-medium uppercase tracking-[0.18em]'
          style={{ color: GOLD }}
        >
          Cursos
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className='mb-8 font-[family-name:var(--font-display)] text-4xl italic leading-[1.15] md:text-5xl lg:text-6xl'
          style={{ color: CREAM }}
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
          style={{ color: 'rgba(240,232,208,0.65)' }}
        >
          Formações pensadas para quem acompanha — com ferramentas, casos reais
          e reflexão guiada. Para profissionais e para famílias.
        </motion.p>
      </div>
    </section>
  );
}
