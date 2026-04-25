// src/components/cursos/ModuloCard.tsx

'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Lock, ArrowUpRight, Clock } from 'lucide-react';
import type { Modulo } from '@/lib/data/cursos';

interface ModuloCardProps {
  modulo: Modulo;
  accentColor: string;
  index: number;
}

// Paleta partilhada
const CREAM = '#f0e8d0';

export default function ModuloCard({
  modulo,
  accentColor,
  index,
}: ModuloCardProps) {
  const isLocked = !modulo.gratuito;

  const numeroFormatado = String(modulo.numero).padStart(2, '0');

  // Se for M1 (gratuito), todo o card é um link externo que abre em nova aba.
  // Se for M2-M4, o card é apenas visual — sem interação.
  const content = (
    <>
      {/* Capa SVG (ratio 2:3) com overlay quando locked */}
      <div
        className='relative w-full overflow-hidden md:w-[200px] md:flex-shrink-0 lg:w-[240px]'
        style={{ aspectRatio: '680 / 960' }}
      >
        <Image
          src={modulo.capaPath}
          alt={`Capa módulo ${modulo.numero} — ${modulo.titulo}`}
          fill
          sizes='(max-width: 768px) 100vw, 240px'
          className={`object-cover transition-all duration-700 ${
            !isLocked ? 'group-hover:scale-[1.03]' : ''
          }`}
        />
        {isLocked && (
          <>
            {/* Overlay de bloqueio */}
            <div
              className='absolute inset-0 flex items-center justify-center backdrop-blur-[1px]'
              style={{ backgroundColor: 'rgba(26,31,24,0.45)' }}
            >
              <div
                className='flex h-14 w-14 items-center justify-center rounded-full'
                style={{
                  backgroundColor: 'rgba(26,31,24,0.85)',
                  border: `1px solid ${accentColor}40`,
                }}
              >
                <Lock
                  size={20}
                  strokeWidth={1.6}
                  style={{ color: accentColor }}
                />
              </div>
            </div>
          </>
        )}
      </div>

      {/* Painel de conteúdo à direita */}
      <div className='flex flex-1 flex-col justify-between p-7 md:p-8'>
        <div>
          {/* Linha superior — número + estado */}
          <div className='mb-4 flex items-center justify-between gap-3'>
            <span
              className='text-[11px] font-medium uppercase tracking-[0.16em]'
              style={{ color: accentColor }}
            >
              {numeroFormatado} · Módulo
            </span>
            <span
              className='rounded-full px-3 py-1 text-[10px] font-medium uppercase tracking-[0.12em]'
              style={{
                backgroundColor: isLocked
                  ? 'rgba(240,232,208,0.06)'
                  : `${accentColor}1f`,
                color: isLocked ? 'rgba(240,232,208,0.5)' : accentColor,
                border: `1px solid ${
                  isLocked ? 'rgba(240,232,208,0.08)' : `${accentColor}40`
                }`,
              }}
            >
              {isLocked ? 'Brevemente' : 'Gratuito'}
            </span>
          </div>

          {/* Título do módulo */}
          <h3
            className='mb-3 font-[family-name:var(--font-display)] text-xl leading-[1.15] md:text-2xl'
            style={{ color: CREAM }}
          >
            {modulo.tituloLinhas ? (
              <>
                {modulo.tituloLinhas.emphasis === 'primeira' ? (
                  <>
                    <em
                      className='not-italic'
                      style={{ color: accentColor, fontStyle: 'italic' }}
                    >
                      {modulo.tituloLinhas.primeira}
                    </em>
                    {modulo.tituloLinhas.segunda && (
                      <> {modulo.tituloLinhas.segunda}</>
                    )}
                  </>
                ) : (
                  <>
                    {modulo.tituloLinhas.primeira}
                    {modulo.tituloLinhas.segunda && (
                      <>
                        {' '}
                        <em
                          className='not-italic'
                          style={{ color: accentColor, fontStyle: 'italic' }}
                        >
                          {modulo.tituloLinhas.segunda}
                        </em>
                      </>
                    )}
                  </>
                )}
              </>
            ) : (
              modulo.titulo
            )}
          </h3>

          {/* Lead */}
          <p
            className='text-[14px] leading-[1.65] md:text-[15px]'
            style={{ color: 'rgba(240,232,208,0.6)' }}
          >
            {modulo.lead}
          </p>
        </div>

        {/* Linha inferior — duração + CTA */}
        <div
          className='mt-6 flex items-center justify-between gap-4 border-t pt-5'
          style={{ borderColor: 'rgba(196, 164, 74, 0.15)' }}
        >
          <span
            className='inline-flex items-center gap-1.5 text-[12px]'
            style={{ color: 'rgba(240,232,208,0.5)' }}
          >
            <Clock size={13} strokeWidth={1.8} />
            {modulo.duracao}
          </span>

          {isLocked ? (
            <span
              className='text-[12px] uppercase tracking-[0.08em]'
              style={{ color: 'rgba(240,232,208,0.4)' }}
            >
              Disponível em breve
            </span>
          ) : (
            <span
              className='inline-flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.08em] transition-all duration-300 group-hover:gap-3'
              style={{ color: accentColor }}
            >
              Começar módulo
              <ArrowUpRight size={16} strokeWidth={2} />
            </span>
          )}
        </div>
      </div>
    </>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
    >
      {isLocked ? (
        <article
          className='flex flex-col overflow-hidden rounded-2xl md:flex-row'
          style={{
            backgroundColor: 'rgba(240,232,208,0.02)',
            border: '1px solid rgba(196, 164, 74, 0.1)',
            opacity: 0.75,
          }}
        >
          {content}
        </article>
      ) : (
        <a
          href={modulo.htmlPath}
          target='_blank'
          rel='noopener noreferrer'
          className='group flex cursor-pointer flex-col overflow-hidden rounded-2xl transition-all duration-300 hover:brightness-110 md:flex-row'
          style={{
            backgroundColor: 'rgba(240,232,208,0.04)',
            border: `1px solid ${accentColor}33`,
          }}
        >
          {content}
        </a>
      )}
    </motion.div>
  );
}
