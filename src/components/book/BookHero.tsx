'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { BOOK_EDITIONS } from '@/lib/data/book';

export default function BookHero() {
  return (
    <section
      className='-mt-20 md:-mt-24'
      style={{ backgroundColor: '#1a1f18' }}
    >
      <div className='mx-auto flex max-w-[1280px] flex-col items-center gap-12 px-6 pt-32 pb-20 md:flex-row md:gap-16 md:px-[60px] md:pt-44 md:pb-28'>
        {/* Texto esquerda */}
        <motion.div
          className='flex-1'
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Linha do autor */}
          <p
            className='mb-8 text-[11px] font-medium uppercase tracking-[0.14em]'
            style={{
              color: 'rgba(240,232,208,0.5)',
              borderTop: '1px solid rgba(240,232,208,0.2)',
              paddingTop: '16px',
              display: 'inline-block',
            }}
          >
            João Pereira · GrowKind World · 2026
          </p>

          {/* Titulo */}
          <h1
            className='font-[family-name:var(--font-display)] leading-[1.1]'
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              color: '#f0e8d0',
              fontWeight: 400,
            }}
          >
            Onde o Mundo
            <br />
            <em style={{ color: '#c4a44a' }}>Nasce Entre Nós</em>
          </h1>

          {/* Subtitulo */}
          <p
            className='mt-4 font-[family-name:var(--font-display)] text-lg italic md:text-xl'
            style={{ color: 'rgba(240,232,208,0.6)' }}
          >
            Um caminho partilhado no autismo infantil
          </p>

          {/* Descricao bold */}
          <p
            className='mt-8 text-[15px] font-semibold leading-relaxed md:text-base'
            style={{ color: '#f0e8d0' }}
          >
            Não é um manual. É um deslocamento de olhar.
          </p>

          {/* Descricao corpo */}
          <p
            className='mt-4 max-w-lg text-[15px] leading-relaxed'
            style={{ color: 'rgba(240,232,208,0.65)' }}
          >
            Nem todo comportamento pede correção. Alguns pedem leitura, tempo e
            presença. Este livro acompanha o desenvolvimento como processo vivo
            — algo que acontece no corpo, no tempo e na relação.
          </p>

          {/* Botoes de compra (BOOK_EDITIONS) */}
          <div className='mt-10 flex max-w-[420px] flex-col gap-3'>
            {BOOK_EDITIONS.map(edition => {
              const isExternal = edition.href.startsWith('http');
              const btnClasses =
                'flex items-center justify-between px-6 py-4 text-[14px] font-medium transition-all duration-300';

              if (edition.style === 'primary') {
                return (
                  <Link
                    key={edition.format}
                    href={edition.href}
                    className={btnClasses}
                    style={{
                      backgroundColor: '#c4a44a',
                      color: '#1a1f18',
                      borderRadius: '8px',
                    }}
                  >
                    <span className='flex items-center gap-3'>
                      <span>{edition.icon}</span>
                      <span>
                        <span className='block text-[11px] uppercase tracking-[0.1em] opacity-70'>
                          {edition.label}
                        </span>
                        <span className='block text-[13px]'>
                          {edition.sublabel}
                        </span>
                      </span>
                    </span>
                    <span
                      className='font-[family-name:var(--font-display)] text-xl'
                      style={{ fontWeight: 400 }}
                    >
                      {edition.price}
                    </span>
                  </Link>
                );
              }

              const Component = isExternal ? 'a' : Link;
              const externalProps = isExternal
                ? { target: '_blank' as const, rel: 'noopener noreferrer' }
                : {};

              return (
                <Component
                  key={edition.format}
                  href={edition.href}
                  className={btnClasses}
                  style={{
                    border: '1px solid rgba(240,232,208,0.2)',
                    color: '#f0e8d0',
                    borderRadius: '8px',
                  }}
                  {...externalProps}
                >
                  <span className='flex items-center gap-3'>
                    <span>{edition.icon}</span>
                    <span>
                      <span className='block text-[11px] uppercase tracking-[0.1em] opacity-50'>
                        {edition.label}
                      </span>
                      <span className='block text-[13px] opacity-80'>
                        {edition.sublabel}
                      </span>
                    </span>
                  </span>
                  <span
                    className='font-[family-name:var(--font-display)] text-xl opacity-80'
                    style={{ fontWeight: 400 }}
                  >
                    {edition.price}
                  </span>
                </Component>
              );
            })}
          </div>

          {/* Link para preview gratuito */}
          <Link
            href='/livro/preview'
            className='group mt-5 inline-flex items-center gap-2 text-[13px] uppercase tracking-[0.1em] transition-all duration-300'
            style={{ color: 'rgba(240,232,208,0.7)' }}
          >
            <span className='underline-offset-4 group-hover:underline'>
              Ler os primeiros capítulos · grátis
            </span>
            <ArrowRight
              size={14}
              strokeWidth={1.8}
              className='transition-transform duration-300 group-hover:translate-x-1'
            />
          </Link>

          {/* Credito autor */}
          <p
            className='mt-6 text-[13px] italic'
            style={{ color: 'rgba(240,232,208,0.4)' }}
          >
            Por{' '}
            <Link
              href='/sobre'
              className='underline underline-offset-2 transition-colors hover:text-[#c4a44a]'
              style={{ color: 'rgba(240,232,208,0.6)' }}
            >
              João Pereira
            </Link>{' '}
            · Fundador, GrowKind World
          </p>
        </motion.div>

        {/* Capa do livro direita */}
        <motion.div
          className='w-full max-w-[340px] shrink-0 md:max-w-[400px]'
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.2,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          <Image
            src='/images/book-cover.jpg'
            alt='Capa do livro Onde o Mundo Nasce Entre Nós — João Pereira'
            width={800}
            height={1200}
            priority
            className='w-full'
            sizes='(max-width: 768px) 340px, 400px'
            quality={90}
            style={{
              boxShadow: '24px 24px 80px rgba(0,0,0,0.5)',
            }}
          />
        </motion.div>
      </div>

      {/* Gradiente de transicao para a proxima seccao */}
      <div
        className='h-20'
        style={{
          background: 'linear-gradient(to bottom, #1a1f18, #faf8f4)',
        }}
      />
    </section>
  );
}
