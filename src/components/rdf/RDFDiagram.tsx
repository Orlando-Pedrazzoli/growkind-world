'use client';

import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { RDF_ELEMENTS } from '@/lib/data/rdf';

const ELEMENT_COLORS: Record<string, string> = {
  child: '#4a7c59',
  environment: '#c4a44a',
  adult: '#3a5f8a',
};

const ELEMENT_LABELS: Record<string, string> = {
  child: 'Elemento 1 · Ponto de partida',
  environment: 'Elemento 2 · Participante activo',
  adult: 'Elemento 3 · Lê e ajusta',
};

export default function RDFDiagram() {
  const [activeKey, setActiveKey] = useState<string>('child');
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const activeElement = RDF_ELEMENTS.find(el => el.key === activeKey)!;
  const activeColor = ELEMENT_COLORS[activeKey];

  return (
    <section
      ref={ref}
      className='px-6 py-20 md:px-[60px] md:py-28'
      style={{ backgroundColor: '#faf8f4' }}
    >
      <motion.div
        className='mx-auto max-w-[1200px]'
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Header */}
        <div className='text-center'>
          <span
            className='text-[11px] font-semibold uppercase tracking-[0.14em]'
            style={{ color: '#8b6914' }}
          >
            O campo relacional
          </span>
          <h2
            className='mt-6 font-[family-name:var(--font-display)]'
            style={{
              fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
              color: 'var(--color-gk-black)',
              fontWeight: 400,
              lineHeight: 1.15,
            }}
          >
            Três elementos em{' '}
            <em style={{ color: '#c4a44a' }}>relação simultânea</em>
          </h2>
          <p
            className='mx-auto mt-4 max-w-lg text-[15px]'
            style={{ color: 'var(--color-gk-cinza)' }}
          >
            Clique em cada elemento para ver o que o adulto lê — e em cada
            movimento para entender quando e como.
          </p>
        </div>

        {/* Grid: Diagrama (maior) + Painel */}
        <div className='mt-16 grid items-center gap-8 md:grid-cols-[1.2fr_1fr] lg:gap-12'>
          {/* Diagrama SVG — maior */}
          <div className='flex items-center justify-center'>
            <svg
              viewBox='0 0 500 500'
              xmlns='http://www.w3.org/2000/svg'
              className='w-full max-w-[560px]'
            >
              {/* Arco exterior — Criança→Ambiente (verde) */}
              <path
                d='M 250 55 A 195 195 0 0 1 419 340'
                fill='none'
                stroke='#7baa5d'
                strokeWidth='24'
                strokeLinecap='round'
                opacity={activeKey === 'child' ? 0.9 : 0.45}
                style={{ transition: 'opacity 0.3s' }}
              />
              {/* Arco exterior — Ambiente→Adulto (ocre) */}
              <path
                d='M 419 340 A 195 195 0 0 1 81 340'
                fill='none'
                stroke='#c4a44a'
                strokeWidth='24'
                strokeLinecap='round'
                opacity={activeKey === 'environment' ? 0.9 : 0.45}
                style={{ transition: 'opacity 0.3s' }}
              />
              {/* Arco exterior — Adulto→Criança (azul) */}
              <path
                d='M 81 340 A 195 195 0 0 1 250 55'
                fill='none'
                stroke='#4e7ea7'
                strokeWidth='24'
                strokeLinecap='round'
                opacity={activeKey === 'adult' ? 0.9 : 0.45}
                style={{ transition: 'opacity 0.3s' }}
              />

              {/* Textos curvados nos arcos — Movimentos */}
              <defs>
                <path id='arc-right' d='M 380 120 A 195 195 0 0 1 430 310' />
                <path id='arc-bottom' d='M 390 370 A 195 195 0 0 1 110 370' />
                <path id='arc-left' d='M 70 310 A 195 195 0 0 1 120 120' />
              </defs>

              <text
                fontSize='9'
                fill='rgba(30,30,30,0.3)'
                fontFamily='DM Sans, sans-serif'
                letterSpacing='0.05em'
              >
                <textPath href='#arc-right' startOffset='10%'>
                  M1 · Habitar o Mundo · Ser Chão
                </textPath>
              </text>
              <text
                fontSize='9'
                fill='rgba(30,30,30,0.3)'
                fontFamily='DM Sans, sans-serif'
                letterSpacing='0.05em'
              >
                <textPath href='#arc-bottom' startOffset='5%'>
                  M3 · Encontrar o Outro · Ser Mediador &nbsp;&nbsp;&nbsp;
                  TRANSVERSAL · Coordenar o Campo
                </textPath>
              </text>
              <text
                fontSize='9'
                fill='rgba(30,30,30,0.3)'
                fontFamily='DM Sans, sans-serif'
                letterSpacing='0.05em'
              >
                <textPath href='#arc-left' startOffset='10%'>
                  M2 · Agir no Mundo · Ser Estrutura
                </textPath>
              </text>

              {/* Linhas tracejadas de ligação */}
              <line
                x1='250'
                y1='110'
                x2='250'
                y2='175'
                stroke='rgba(30,30,30,0.1)'
                strokeWidth='1'
                strokeDasharray='4 4'
              />
              <line
                x1='130'
                y1='345'
                x2='185'
                y2='305'
                stroke='rgba(30,30,30,0.1)'
                strokeWidth='1'
                strokeDasharray='4 4'
              />
              <line
                x1='370'
                y1='345'
                x2='315'
                y2='305'
                stroke='rgba(30,30,30,0.1)'
                strokeWidth='1'
                strokeDasharray='4 4'
              />

              {/* Circulo central */}
              <circle
                cx='250'
                cy='250'
                r='80'
                fill='rgba(30,30,30,0.03)'
                stroke='rgba(30,30,30,0.08)'
                strokeWidth='1'
              />
              <text
                x='250'
                y='235'
                textAnchor='middle'
                fill='rgba(30,30,30,0.5)'
                fontSize='16'
                fontFamily='Playfair Display, serif'
                fontStyle='italic'
              >
                Campo
              </text>
              <text
                x='250'
                y='258'
                textAnchor='middle'
                fill='rgba(30,30,30,0.5)'
                fontSize='16'
                fontFamily='Playfair Display, serif'
                fontStyle='italic'
              >
                Relacional
              </text>
              <text
                x='250'
                y='280'
                textAnchor='middle'
                fill='rgba(30,30,30,0.25)'
                fontSize='10'
                fontFamily='DM Sans, sans-serif'
              >
                onde o desenvolvimento acontece
              </text>

              {/* Node — Criança (topo) */}
              <g
                className='cursor-pointer'
                onClick={() => setActiveKey('child')}
              >
                <circle
                  cx='250'
                  cy='65'
                  r={activeKey === 'child' ? 42 : 36}
                  fill={activeKey === 'child' ? '#3d6b4a' : '#4a7c59'}
                  stroke={activeKey === 'child' ? '#2d5038' : 'none'}
                  strokeWidth='2'
                  style={{ transition: 'all 0.3s' }}
                />
                <text
                  x='250'
                  y='61'
                  textAnchor='middle'
                  fill='#ffffff'
                  fontSize='13'
                  fontFamily='DM Sans, sans-serif'
                  fontWeight='600'
                >
                  Criança
                </text>
                <text
                  x='250'
                  y='76'
                  textAnchor='middle'
                  fill='rgba(255,255,255,0.65)'
                  fontSize='9'
                  fontFamily='DM Sans, sans-serif'
                >
                  ponto de partida
                </text>
              </g>

              {/* Node — Adulto (esquerda baixo) */}
              <g
                className='cursor-pointer'
                onClick={() => setActiveKey('adult')}
              >
                <circle
                  cx='95'
                  cy='375'
                  r={activeKey === 'adult' ? 42 : 36}
                  fill={activeKey === 'adult' ? '#2d4f75' : '#3a5f8a'}
                  stroke={activeKey === 'adult' ? '#1e3a5a' : 'none'}
                  strokeWidth='2'
                  style={{ transition: 'all 0.3s' }}
                />
                <text
                  x='95'
                  y='371'
                  textAnchor='middle'
                  fill='#ffffff'
                  fontSize='13'
                  fontFamily='DM Sans, sans-serif'
                  fontWeight='600'
                >
                  Adulto
                </text>
                <text
                  x='95'
                  y='386'
                  textAnchor='middle'
                  fill='rgba(255,255,255,0.65)'
                  fontSize='9'
                  fontFamily='DM Sans, sans-serif'
                >
                  lê e ajusta
                </text>
              </g>

              {/* Node — Ambiente (direita baixo) */}
              <g
                className='cursor-pointer'
                onClick={() => setActiveKey('environment')}
              >
                <circle
                  cx='405'
                  cy='375'
                  r={activeKey === 'environment' ? 42 : 36}
                  fill={activeKey === 'environment' ? '#a08930' : '#c4a44a'}
                  stroke={activeKey === 'environment' ? '#8b6914' : 'none'}
                  strokeWidth='2'
                  style={{ transition: 'all 0.3s' }}
                />
                <text
                  x='405'
                  y='371'
                  textAnchor='middle'
                  fill='#ffffff'
                  fontSize='13'
                  fontFamily='DM Sans, sans-serif'
                  fontWeight='600'
                >
                  Ambiente
                </text>
                <text
                  x='405'
                  y='386'
                  textAnchor='middle'
                  fill='rgba(255,255,255,0.65)'
                  fontSize='9'
                  fontFamily='DM Sans, sans-serif'
                >
                  modula o campo
                </text>
              </g>
            </svg>
          </div>

          {/* Painel lateral */}
          <AnimatePresence mode='wait'>
            <motion.div
              key={activeKey}
              className='overflow-hidden p-8 md:p-10'
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                borderTop: `4px solid ${activeColor}`,
                boxShadow: '0 4px 24px rgba(0,0,0,0.04)',
              }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* Eyebrow */}
              <span
                className='text-[11px] font-semibold uppercase tracking-[0.12em]'
                style={{ color: activeColor }}
              >
                {ELEMENT_LABELS[activeKey]}
              </span>

              {/* Titulo */}
              <h3
                className='mt-4 font-[family-name:var(--font-display)] text-2xl'
                style={{ color: 'var(--color-gk-black)', fontWeight: 500 }}
              >
                {activeElement.title}
              </h3>

              {/* Role */}
              <p
                className='mt-2 font-[family-name:var(--font-display)] text-[15px] italic'
                style={{ color: 'var(--color-gk-cinza)' }}
              >
                {activeElement.role}
              </p>

              {/* Descricao */}
              <p
                className='mt-5 text-[15px] leading-relaxed'
                style={{ color: 'rgba(30,30,30,0.7)' }}
              >
                {activeElement.desc}
                {activeKey === 'child' &&
                  ' O que está a acontecer com o sistema nervoso desta criança agora?'}
                {activeKey === 'environment' && ' Ajustar o espaço é intervir.'}
                {activeKey === 'adult' &&
                  ' Mas a presença do adulto é sempre o terceiro elemento do campo. O que estou a adicionar ao campo agora?'}
              </p>

              {/* Reads */}
              <div className='mt-6 flex flex-col gap-3'>
                {activeElement.reads.map(read => (
                  <div key={read} className='flex gap-3 text-[14px]'>
                    <span
                      className='mt-0.5 shrink-0'
                      style={{ color: 'var(--color-gk-cinza)' }}
                    >
                      →
                    </span>
                    <span style={{ color: 'rgba(30,30,30,0.7)' }}>{read}</span>
                  </div>
                ))}
              </div>

              {/* Citacao */}
              <div
                className='mt-8 p-5'
                style={{
                  backgroundColor: 'rgba(200,220,192,0.25)',
                  borderLeft: '3px solid rgba(200,220,192,0.6)',
                  borderRadius: '0 8px 8px 0',
                }}
              >
                <p
                  className='font-[family-name:var(--font-display)] text-[15px] italic leading-relaxed'
                  style={{ color: 'rgba(30,30,30,0.6)' }}
                >
                  {activeElement.quote}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}
