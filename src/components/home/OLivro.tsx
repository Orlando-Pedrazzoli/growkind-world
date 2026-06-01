'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { revealContainer, revealItem, revealFade } from '@/lib/motion';

export default function OLivro() {
  return (
    <section
      id='livro'
      className='w-full'
      style={{ backgroundColor: '#0d1f13' }}
    >
      <motion.div
        variants={revealContainer}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: false, amount: 0.2 }}
        className='mx-auto px-6 py-12 md:px-[60px] md:py-[var(--spacing-section)]'
        style={{ maxWidth: 'var(--width-page)' }}
      >
        <motion.div
          variants={revealContainer}
          className='flex flex-col items-center gap-10 md:flex-row md:gap-16'
        >
          {/* Imagem do livro — fade leve */}
          <motion.div
            variants={revealFade}
            className='w-full max-w-xs shrink-0 md:w-2/5 md:max-w-sm'
          >
            <Image
              src='/images/book-cover.jpg'
              alt='Onde o Mundo Nasce Entre Nós — João Pereira'
              width={1000}
              height={1502}
              className='w-full'
              sizes='(max-width: 768px) 320px, 420px'
            />
          </motion.div>

          {/* Texto — sub-container que escalona os elementos */}
          <motion.div variants={revealContainer} className='flex-1'>
            {/* Eyebrow */}
            <motion.span variants={revealItem} className='eyebrow'>
              O Livro
            </motion.span>

            {/* Separador */}
            <motion.div
              variants={revealItem}
              className='mt-4 md:mt-6'
              style={{
                width: '40px',
                height: '2px',
                backgroundColor: 'rgba(255,255,255,0.3)',
              }}
            />

            {/* Titulo */}
            <motion.h2
              variants={revealItem}
              className='mt-6 italic md:mt-8'
              style={{ color: 'var(--color-gk-creme)' }}
            >
              Onde o Mundo
              <br />
              Nasce Entre Nós
            </motion.h2>

            {/* Paragrafos — sub-container que escalona cada parágrafo */}
            <motion.div
              variants={revealContainer}
              className='mt-6 space-y-4 md:mt-8 md:space-y-6'
            >
              <motion.p
                variants={revealItem}
                className='text-lg leading-relaxed'
                style={{ color: 'rgba(255,255,255,0.65)' }}
              >
                Não é um manual. É um deslocamento de olhar.
              </motion.p>

              <motion.p
                variants={revealItem}
                className='text-lg leading-relaxed'
                style={{ color: 'rgba(255,255,255,0.65)' }}
              >
                Em vez de explicar o autismo como diagnóstico, este livro
                acompanha o desenvolvimento como processo vivo — algo que
                acontece no corpo, no tempo e na relação.
              </motion.p>

              <motion.p
                variants={revealItem}
                className='text-lg leading-relaxed'
                style={{ color: 'rgba(255,255,255,0.65)' }}
              >
                Cada gesto, repetição ou pausa é lido como tentativa de manter
                equilíbrio. Nada aqui é tratado como erro a eliminar, mas como
                movimento que pede compreensão.
              </motion.p>
            </motion.div>

            {/* Botao CTA */}
            <motion.div variants={revealItem}>
              <Link
                href='/o-livro'
                className='mt-8 inline-block w-full cursor-pointer rounded-full px-10 py-4 text-center text-[14px] font-medium uppercase tracking-widest sm:w-auto md:mt-10'
                style={{
                  backgroundColor: 'var(--color-gk-ocre)',
                  color: '#ffffff',
                }}
              >
                Descobrir o Livro
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
