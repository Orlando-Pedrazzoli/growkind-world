// src/components/cursos/ModuloCard.tsx

'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Lock, ArrowUpRight, Clock } from 'lucide-react';
import type { Modulo } from '@/lib/data/cursos';

interface ModuloCardProps {
  modulo: Modulo;
  accentColor: string; // cor original do curso (para SVG/elementos visuais)
  accentTextColor: string; // versão escura da cor para uso em texto
  index: number;
}

const TEXT_DARK = '#1a1f18';
const TEXT_BODY = '#5a5a4f';
const TEXT_MUTED = '#8a8a7d';
const BORDER_SUBTLE = 'rgba(26, 31, 24, 0.08)';

export default function ModuloCard({
  modulo,
  accentColor,
  accentTextColor,
  index,
}: ModuloCardProps) {
  const isLocked = !modulo.gratuito;
  const numeroFormatado = String(modulo.numero).padStart(2, '0');

  const content = (
    <>
      {/* Capa SVG (ratio 2:3) */}
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
        )}
      </div>

      {/* Painel de conteúdo */}
      <div className='flex flex-1 flex-col justify-between p-7 md:p-8'>
        <div>
          {/* Linha superior — número + estado */}
          <div className='mb-4 flex items-center justify-between gap-3'>
            <span
              className='text-[11px] font-medium uppercase tracking-[0.16em]'
              style={{ color: accentTextColor }}
            >
              {numeroFormatado} · Módulo
            </span>
            <span
              className='rounded-full px-3 py-1 text-[10px] font-medium uppercase tracking-[0.12em]'
              style={{
                backgroundColor: isLocked
                  ? 'rgba(26, 31, 24, 0.04)'
                  : `${accentColor}1a`,
                color: isLocked ? TEXT_MUTED : accentTextColor,
                border: `1px solid ${
                  isLocked ? 'rgba(26, 31, 24, 0.08)' : `${accentColor}33`
                }`,
              }}
            >
              {isLocked ? 'Brevemente' : 'Gratuito'}
            </span>
          </div>

          {/* Título */}
          <h3
            className='mb-3 font-[family-name:var(--font-display)] text-xl leading-[1.15] md:text-2xl'
            style={{ color: TEXT_DARK }}
          >
            {modulo.tituloLinhas ? (
              <>
                {modulo.tituloLinhas.emphasis === 'primeira' ? (
                  <>
                    <em
                      className='not-italic'
                      style={{ color: accentTextColor, fontStyle: 'italic' }}
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
                          style={{
                            color: accentTextColor,
                            fontStyle: 'italic',
                          }}
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
            style={{ color: TEXT_BODY }}
          >
            {modulo.lead}
          </p>
        </div>

        {/* Linha inferior — duração + CTA */}
        <div
          className='mt-6 flex items-center justify-between gap-4 border-t pt-5'
          style={{ borderColor: BORDER_SUBTLE }}
        >
          <span
            className='inline-flex items-center gap-1.5 text-[12px]'
            style={{ color: TEXT_MUTED }}
          >
            <Clock size={13} strokeWidth={1.8} />
            {modulo.duracao}
          </span>

          {isLocked ? (
            <span
              className='text-[12px] uppercase tracking-[0.08em]'
              style={{ color: TEXT_MUTED }}
            >
              Disponível em breve
            </span>
          ) : (
            <span
              className='inline-flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.08em] transition-all duration-300 group-hover:gap-3'
              style={{ color: accentTextColor }}
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
            backgroundColor: '#ffffff',
            border: `0.5px solid ${BORDER_SUBTLE}`,
            opacity: 0.7,
          }}
        >
          {content}
        </article>
      ) : (
        <a
          href={modulo.htmlPath}
          target='_blank'
          rel='noopener noreferrer'
          className='group flex cursor-pointer flex-col overflow-hidden rounded-2xl transition-all duration-500 hover:-translate-y-1 md:flex-row'
          style={{
            backgroundColor: '#ffffff',
            border: `0.5px solid ${accentColor}40`,
            boxShadow:
              '0 1px 2px rgba(26, 31, 24, 0.04), 0 8px 24px rgba(26, 31, 24, 0.04)',
          }}
        >
          {content}
        </a>
      )}
    </motion.div>
  );
}
