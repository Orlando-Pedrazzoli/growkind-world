'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { revealContainer, revealItem, revealFade } from '@/lib/motion';

export default function FrameworkRDF() {
  const t = useTranslations('home.rdfSection');

  return (
    <section id='rdf' className='w-full' style={{ backgroundColor: '#ffffff' }}>
      <motion.div
        variants={revealContainer}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: false, amount: 0.2 }}
        className='mx-auto flex flex-col md:flex-row'
        style={{ maxWidth: 'var(--width-page)' }}
      >
        {/* Lado esquerdo — imagem (fade leve) */}
        <motion.div
          variants={revealFade}
          className='flex items-center justify-center px-6 pt-12 pb-6 md:w-1/2 md:px-[60px] md:py-[var(--spacing-section)]'
        >
          <Image
            src='/images/rdf-principal.jpg'
            alt='Relational Development Framework'
            width={1200}
            height={1600}
            className='w-full max-w-sm md:max-w-md'
            sizes='(max-width: 768px) 100vw, 50vw'
          />
        </motion.div>

        {/* Lado direito — conteudo */}
        <div className='flex flex-col justify-center px-6 pt-6 pb-12 md:w-1/2 md:px-[60px] md:py-[var(--spacing-section)]'>
          <motion.div variants={revealContainer} className='max-w-md'>
            {/* Eyebrow */}
            <motion.span variants={revealItem} className='eyebrow'>
              {t('eyebrow')}
            </motion.span>

            {/* Titulo — nome próprio do framework, igual em PT e EN */}
            <motion.h2
              variants={revealItem}
              className='mt-6'
              style={{ color: 'var(--color-gk-green-dark)' }}
            >
              Relational
              <br />
              Development
              <br />
              <em style={{ color: 'var(--color-gk-ocre)' }}>Framework</em>
            </motion.h2>

            {/* Subtitulo italico — \n no JSON preserva a quebra */}
            <motion.p
              variants={revealItem}
              className='mt-6 whitespace-pre-line font-[family-name:var(--font-display)] text-xl italic leading-relaxed'
              style={{ color: 'rgba(30,30,30,0.7)' }}
            >
              {t('subtitle')}
            </motion.p>

            {/* Paragrafos — sub-container que escalona cada parágrafo */}
            <motion.div variants={revealContainer} className='mt-8 space-y-6'>
              <motion.p
                variants={revealItem}
                className='text-lg leading-relaxed'
                style={{ color: 'rgba(30,30,30,0.7)' }}
              >
                {t('body')}
              </motion.p>
              <motion.p
                variants={revealItem}
                className='text-lg leading-relaxed'
                style={{ color: 'rgba(30,30,30,0.7)' }}
              >
                {t('closing')}
              </motion.p>
            </motion.div>

            {/* Botao */}
            <motion.div variants={revealItem} className='mt-10'>
              <Link
                href='/rdf'
                className='inline-block cursor-pointer rounded-full border-[1.5px] px-10 py-4 text-center text-[14px] font-medium uppercase tracking-widest'
                style={{
                  borderColor: 'var(--color-gk-green-dark)',
                  color: 'var(--color-gk-green-dark)',
                  backgroundColor: 'transparent',
                  width: 'fit-content',
                }}
              >
                {t('cta')}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
