'use client';

import { motion } from 'framer-motion';
import { RDF_AXIOM } from '@/lib/data/rdf';

export default function RDFHero() {
  return (
    <section
      className='-mt-20 md:-mt-24'
      style={{
        backgroundColor: '#3d5a4f',
        backgroundImage:
          'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }}
    >
      <div className='mx-auto flex max-w-[1280px] flex-col items-center gap-12 px-6 pt-32 pb-20 md:flex-row md:gap-20 md:px-[60px] md:pt-44 md:pb-28'>
        {/* Texto esquerda */}
        <motion.div
          className='flex-1'
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Eyebrow */}
          <p
            className='mb-8 text-[11px] font-semibold uppercase tracking-[0.14em]'
            style={{ color: '#c4a44a' }}
          >
            Framework · GrowKind World
          </p>

          {/* Titulo */}
          <h1
            className='font-[family-name:var(--font-display)] leading-[1.05]'
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              color: '#f0e8d0',
              fontWeight: 400,
            }}
          >
            Relational
            <br />
            Development
            <br />
            <em style={{ color: '#c4a44a' }}>Framework</em>
          </h1>

          {/* Descricao */}
          <p
            className='mt-8 max-w-lg text-[16px] leading-relaxed md:text-[17px]'
            style={{ color: 'rgba(240,232,208,0.7)' }}
          >
            Uma forma de ler o que está a acontecer entre a criança e o ambiente
            — antes de qualquer decisão de resposta. Não é terapia. Não é
            protocolo. É uma lente.
          </p>

          {/* Citacao com borda esquerda */}
          <div
            className='mt-10 py-4 pl-6'
            style={{ borderLeft: '3px solid #c4a44a' }}
          >
            <p
              className='font-[family-name:var(--font-display)] text-xl italic leading-relaxed md:text-2xl'
              style={{ color: 'rgba(240,232,208,0.6)' }}
            >
              &ldquo;{RDF_AXIOM}&rdquo;
            </p>
          </div>
        </motion.div>

        {/* Diagrama SVG direita */}
        <motion.div
          className='w-full max-w-[420px] shrink-0'
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.3,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          <svg
            viewBox='0 0 420 420'
            xmlns='http://www.w3.org/2000/svg'
            className='w-full'
          >
            {/* Arco exterior — Criança (verde) */}
            <path
              d='M 210 40 A 170 170 0 0 1 357 295'
              fill='none'
              stroke='#7baa5d'
              strokeWidth='28'
              strokeLinecap='round'
              opacity='0.7'
            />
            {/* Arco exterior — Adulto (azul) */}
            <path
              d='M 357 295 A 170 170 0 0 1 63 295'
              fill='none'
              stroke='#4e7ea7'
              strokeWidth='28'
              strokeLinecap='round'
              opacity='0.7'
            />
            {/* Arco exterior — Ambiente (ocre) */}
            <path
              d='M 63 295 A 170 170 0 0 1 210 40'
              fill='none'
              stroke='#c4a44a'
              strokeWidth='28'
              strokeLinecap='round'
              opacity='0.7'
            />

            {/* Circulo central */}
            <circle
              cx='210'
              cy='210'
              r='90'
              fill='rgba(255,255,255,0.08)'
              stroke='rgba(255,255,255,0.15)'
              strokeWidth='1'
            />
            <text
              x='210'
              y='200'
              textAnchor='middle'
              fill='rgba(240,232,208,0.7)'
              fontSize='14'
              fontFamily='DM Sans, sans-serif'
              fontWeight='500'
            >
              Campo
            </text>
            <text
              x='210'
              y='220'
              textAnchor='middle'
              fill='rgba(240,232,208,0.7)'
              fontSize='14'
              fontFamily='DM Sans, sans-serif'
              fontWeight='500'
            >
              Relacional
            </text>

            {/* Node — Criança (topo) */}
            <circle cx='210' cy='48' r='32' fill='#4a7c59' />
            <text
              x='210'
              y='44'
              textAnchor='middle'
              fill='#ffffff'
              fontSize='12'
              fontFamily='DM Sans, sans-serif'
              fontWeight='600'
            >
              Criança
            </text>
            <text
              x='210'
              y='58'
              textAnchor='middle'
              fill='rgba(255,255,255,0.6)'
              fontSize='9'
              fontFamily='DM Sans, sans-serif'
            >
              partida
            </text>

            {/* Node — Adulto (esquerda baixo) */}
            <circle cx='80' cy='330' r='32' fill='#3a5f8a' />
            <text
              x='80'
              y='326'
              textAnchor='middle'
              fill='#ffffff'
              fontSize='12'
              fontFamily='DM Sans, sans-serif'
              fontWeight='600'
            >
              Adulto
            </text>
            <text
              x='80'
              y='340'
              textAnchor='middle'
              fill='rgba(255,255,255,0.6)'
              fontSize='9'
              fontFamily='DM Sans, sans-serif'
            >
              lê e ajusta
            </text>

            {/* Node — Ambiente (direita baixo) */}
            <circle cx='340' cy='330' r='32' fill='#c4a44a' />
            <text
              x='340'
              y='326'
              textAnchor='middle'
              fill='#ffffff'
              fontSize='12'
              fontFamily='DM Sans, sans-serif'
              fontWeight='600'
            >
              Ambiente
            </text>
            <text
              x='340'
              y='340'
              textAnchor='middle'
              fill='rgba(255,255,255,0.6)'
              fontSize='9'
              fontFamily='DM Sans, sans-serif'
            >
              participa
            </text>
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
