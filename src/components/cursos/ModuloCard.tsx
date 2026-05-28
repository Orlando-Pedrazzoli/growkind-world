// src/components/cursos/ModuloCard.tsx

'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Lock, ArrowUpRight, Clock, Check, Sparkles } from 'lucide-react';
import type { Modulo } from '@/lib/data/cursos';

interface ModuloCardProps {
  modulo: Modulo;
  cursoSlug: 'profissionais' | 'familias';
  cursoNome: string;
  accentColor: string;
  accentTextColor: string;
  // Estado a partir do servidor (página pai já fez auth + DB query)
  isOwned: boolean;
  isLoggedIn: boolean;
  index: number;
}

const TEXT_DARK = '#1a1f18';
const TEXT_BODY = '#5a5a4f';
const TEXT_MUTED = '#8a8a7d';
const BORDER_SUBTLE = 'rgba(26, 31, 24, 0.08)';

export default function ModuloCard({
  modulo,
  cursoSlug,
  accentColor,
  accentTextColor,
  isOwned,
  isLoggedIn,
  index,
}: ModuloCardProps) {
  const router = useRouter();
  const numeroFormatado = String(modulo.numero).padStart(2, '0');

  // Estado do módulo:
  // - free  : M1, gratuito (mas exige login para aceder)
  // - owned : módulo pago e o utilizador comprou o curso
  // - locked: módulo pago e o utilizador ainda não comprou
  const state: 'free' | 'owned' | 'locked' = modulo.gratuito
    ? 'free'
    : isOwned
      ? 'owned'
      : 'locked';

  // Rota protegida para TODOS os módulos (inclusive M1 gratuito).
  // A página /a-minha-conta/cursos/[curso]/[modulo] trata da autenticação.
  const moduloHref = `/a-minha-conta/cursos/${cursoSlug}/${modulo.slug}`;

  // Clicável quando: é gratuito (vai pedir login) OU já é dono.
  const isClickable = state === 'free' || state === 'owned';

  function handleNavigate() {
    if (!isClickable) return;
    if (state === 'free' && !isLoggedIn) {
      router.push(`/login?next=${encodeURIComponent(moduloHref)}`);
      return;
    }
    router.push(moduloHref);
  }

  // ─────────────────────────────────────────────────────────
  // COLUNA LATERAL — índice visual da jornada
  // ─────────────────────────────────────────────────────────
  const sideColumnBg =
    state === 'free'
      ? `linear-gradient(180deg, ${accentColor} 0%, ${accentColor}e6 100%)`
      : state === 'owned'
        ? `linear-gradient(180deg, ${accentColor}2e 0%, ${accentColor}52 100%)`
        : `${accentColor}14`; // ~8% (locked)

  const numberColor = state === 'locked' ? 'rgba(26, 31, 24, 0.4)' : TEXT_DARK;

  const labelColor =
    state === 'free'
      ? 'rgba(26, 31, 24, 0.55)'
      : state === 'owned'
        ? 'rgba(26, 31, 24, 0.55)'
        : 'rgba(26, 31, 24, 0.4)';

  // Badge inferior da coluna (varia por estado)
  const sideBadge =
    state === 'free' ? (
      <span
        className='mt-3.5 inline-flex items-center gap-1 rounded-full px-2.5 py-1'
        style={{ backgroundColor: 'rgba(26, 31, 24, 0.18)' }}
      >
        <Sparkles size={10} strokeWidth={2.2} style={{ color: TEXT_DARK }} />
        <span
          className='text-[9.5px] font-semibold uppercase tracking-[0.1em]'
          style={{ color: TEXT_DARK }}
        >
          Grátis
        </span>
      </span>
    ) : state === 'owned' ? (
      <span
        className='mt-3.5 flex h-8 w-8 items-center justify-center rounded-full'
        style={{ backgroundColor: accentColor }}
        aria-label='Módulo desbloqueado'
      >
        <Check size={16} strokeWidth={2.5} style={{ color: '#fff' }} />
      </span>
    ) : (
      <span
        className='mt-3.5 flex h-8 w-8 items-center justify-center rounded-full'
        style={{ backgroundColor: 'rgba(26, 31, 24, 0.06)' }}
        aria-label='Módulo bloqueado'
      >
        <Lock
          size={14}
          strokeWidth={1.8}
          style={{ color: 'rgba(26, 31, 24, 0.55)' }}
        />
      </span>
    );

  // ─────────────────────────────────────────────────────────
  // CONTEÚDO DO CARD
  // ─────────────────────────────────────────────────────────
  const cardInner = (
    <>
      {/* Coluna lateral — número gigante + label + badge */}
      <div
        className='relative flex w-[110px] flex-shrink-0 flex-col items-center justify-center px-3 py-5 md:w-[120px]'
        style={{
          background: sideColumnBg,
          borderRight:
            state === 'locked' ? '0.5px solid rgba(26,31,24,0.06)' : 'none',
        }}
      >
        <span
          className='mb-1 text-[10px] font-medium uppercase tracking-[0.14em]'
          style={{ color: labelColor }}
        >
          Módulo
        </span>
        <span
          className='font-[family-name:var(--font-display)] leading-none'
          style={{
            color: numberColor,
            fontSize: '52px',
            letterSpacing: '-0.02em',
          }}
        >
          {numeroFormatado}
        </span>
        {sideBadge}
      </div>

      {/* Painel de conteúdo */}
      <div className='flex flex-1 flex-col gap-2.5 p-5 md:p-7'>
        <h3
          className='font-[family-name:var(--font-display)] text-[20px] leading-[1.2] md:text-[22px]'
          style={{ color: TEXT_DARK }}
        >
          {modulo.tituloLinhas ? (
            <>
              {modulo.tituloLinhas.emphasis === 'primeira' ? (
                <>
                  <em className='italic' style={{ color: accentTextColor }}>
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
                      <em className='italic' style={{ color: accentTextColor }}>
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

        <p
          className='text-[13.5px] leading-[1.6] md:text-[14px]'
          style={{ color: TEXT_BODY }}
        >
          {modulo.lead}
        </p>

        {/* Linha inferior — duração + CTA contextual */}
        <div
          className='mt-2 flex items-center justify-between gap-3 border-t pt-3'
          style={{ borderColor: BORDER_SUBTLE }}
        >
          <span
            className='inline-flex items-center gap-1.5 text-[12px]'
            style={{ color: TEXT_MUTED }}
          >
            <Clock size={13} strokeWidth={1.8} />
            {modulo.duracao}
          </span>

          {state === 'free' && (
            <span
              className='inline-flex items-center gap-1.5 text-[12px] font-medium uppercase tracking-[0.08em] transition-all duration-300 group-hover:gap-2'
              style={{ color: accentTextColor }}
            >
              {isLoggedIn ? 'Começar' : 'Começar gratuitamente'}
              <ArrowUpRight size={15} strokeWidth={2} />
            </span>
          )}

          {state === 'owned' && (
            <span
              className='inline-flex items-center gap-1.5 text-[12px] font-medium uppercase tracking-[0.08em] transition-all duration-300 group-hover:gap-2'
              style={{ color: accentTextColor }}
            >
              Continuar
              <ArrowUpRight size={15} strokeWidth={2} />
            </span>
          )}

          {state === 'locked' && (
            <span
              className='inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.1em]'
              style={{ color: TEXT_MUTED }}
            >
              <Lock size={12} strokeWidth={1.8} />
              Incluído no curso
            </span>
          )}
        </div>
      </div>
    </>
  );

  // ─────────────────────────────────────────────────────────
  // WRAPPER — botão clicável OU article estático (locked)
  // ─────────────────────────────────────────────────────────
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
    >
      {isClickable ? (
        <button
          type='button'
          onClick={handleNavigate}
          className='group flex w-full cursor-pointer overflow-hidden rounded-2xl text-left transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2'
          style={{
            backgroundColor: '#ffffff',
            border: `1px solid ${accentColor}${state === 'owned' ? '73' : '59'}`,
            boxShadow:
              '0 1px 2px rgba(26, 31, 24, 0.04), 0 4px 12px rgba(26, 31, 24, 0.04)',
          }}
        >
          {cardInner}
        </button>
      ) : (
        <article
          className='flex overflow-hidden rounded-2xl'
          style={{
            backgroundColor: '#ffffff',
            border: `0.5px solid ${BORDER_SUBTLE}`,
          }}
        >
          {cardInner}
        </article>
      )}
    </motion.div>
  );
}
