'use client';

import { motion } from 'framer-motion';
import { RDF_AXIOM } from '@/lib/data/rdf';

export default function RDFHero() {
  return (
    <section
      className='-mt-20 md:-mt-24'
      style={{
        backgroundColor: '#1a1f18',
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
            className='mb-8 text-[11px] font-medium uppercase tracking-[0.14em]'
            style={{
              color: 'rgba(240,232,208,0.5)',
              borderTop: '1px solid rgba(240,232,208,0.2)',
              paddingTop: '16px',
              display: 'inline-block',
            }}
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

          {/* ── Entrada emocional (Secção 1 do doc de melhorias) ── */}
          <div
            className='mt-10 px-6 py-5 md:px-8 md:py-6'
            style={{
              backgroundColor: 'rgba(240,244,242,0.06)',
              borderRadius: '4px',
            }}
          >
            <p
              className='font-[family-name:var(--font-display)] text-[17px] italic leading-relaxed md:text-[19px]'
              style={{ color: 'rgba(240,232,208,0.7)' }}
            >
              &ldquo;O que se vê do lado de fora costuma ser chamado de
              comportamento. O que não se vê é o esforço imenso para manter
              alguma continuidade por dentro.&rdquo;
            </p>
          </div>

          <p
            className='mt-5 max-w-lg text-[15px] leading-relaxed md:text-[16px]'
            style={{ color: 'rgba(240,232,208,0.55)' }}
          >
            A pergunta deixa de ser <em>&ldquo;como faço isso parar?&rdquo;</em>{' '}
            e começa a transformar-se em{' '}
            <em>&ldquo;o que isso está a contar?&rdquo;</em>
          </p>

          {/* Descricao tecnica (mantida) */}
          <p
            className='mt-8 max-w-lg text-[16px] leading-relaxed md:text-[17px]'
            style={{ color: 'rgba(240,232,208,0.65)' }}
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
            {/* Arco exterior — Criança (verde forte) */}
            <path
              d='M 210 40 A 170 170 0 0 1 357 295'
              fill='none'
              stroke='#7baa5d'
              strokeWidth='28'
              strokeLinecap='round'
              opacity='1'
            />
            {/* Arco exterior — Adulto (azul forte) */}
            <path
              d='M 357 295 A 170 170 0 0 1 63 295'
              fill='none'
              stroke='#4e7ea7'
              strokeWidth='28'
              strokeLinecap='round'
              opacity='1'
            />
            {/* Arco exterior — Ambiente (dourado forte) */}
            <path
              d='M 63 295 A 170 170 0 0 1 210 40'
              fill='none'
              stroke='#c4a44a'
              strokeWidth='28'
              strokeLinecap='round'
              opacity='1'
            />

            {/* Circulo central */}
            <circle
              cx='210'
              cy='210'
              r='90'
              fill='rgba(255,255,255,0.06)'
              stroke='rgba(240,232,208,0.2)'
              strokeWidth='1.5'
            />
            <text
              x='210'
              y='200'
              textAnchor='middle'
              fill='#f0e8d0'
              fontSize='15'
              fontFamily='DM Sans, sans-serif'
              fontWeight='600'
            >
              Campo
            </text>
            <text
              x='210'
              y='220'
              textAnchor='middle'
              fill='#f0e8d0'
              fontSize='15'
              fontFamily='DM Sans, sans-serif'
              fontWeight='600'
            >
              Relacional
            </text>

            {/* Node — Criança (topo) */}
            <circle cx='210' cy='48' r='32' fill='#5a9a3e' />
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
              fill='rgba(255,255,255,0.75)'
              fontSize='9'
              fontFamily='DM Sans, sans-serif'
            >
              partida
            </text>

            {/* Node — Adulto (esquerda baixo) */}
            <circle cx='80' cy='330' r='32' fill='#3d6fa0' />
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
              fill='rgba(255,255,255,0.75)'
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
              fill='rgba(255,255,255,0.75)'
              fontSize='9'
              fontFamily='DM Sans, sans-serif'
            >
              participa
            </text>
          </svg>
        </motion.div>
      </div>

      {/* Gradiente de transicao */}
      <div
        className='h-20'
        style={{
          background:
            'linear-gradient(to bottom, #1a1f18, var(--color-gk-creme))',
        }}
      />
    </section>
  );
}
