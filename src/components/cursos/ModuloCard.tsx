// src/components/cursos/ModuloCard.tsx

'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useTranslations, useMessages } from 'next-intl';
import { Lock, ArrowUpRight, Clock, Check, Sparkles } from 'lucide-react';
import type { Modulo } from '@/lib/data/cursos';

interface ModuloCardProps {
  modulo: Modulo;
  cursoSlug: 'profissionais' | 'familias';
  cursoNome: string;
  accentColor: string;
  accentTextColor: string;
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
  const t = useTranslations('courses');
  const numeroFormatado = String(modulo.numero).padStart(2, '0');

  // Título estruturado (i18n) por slug do curso + slug do módulo.
  // Lemos as mensagens cruas (sem type-checking de chaves) e indexamos
  // em JS — evita a validação estrita de chaves do next-intl.
  type ModuloI18n = {
    titulo: string;
    linha1: string;
    linha2?: string;
    emphasis?: 'primeira' | 'segunda' | 'none';
    lead: string;
  };
  const messages = useMessages() as unknown as {
    courses: {
      items: Record<string, { modulos: Record<string, ModuloI18n> }>;
    };
  };
  const mod = messages.courses.items[cursoSlug].modulos[modulo.slug];
  const linha1 = mod.linha1;
  const linha2 = mod.linha2 ?? '';
  const emphasis = mod.emphasis ?? 'none';
  const lead = mod.lead;

  const state: 'free' | 'owned' | 'locked' = modulo.gratuito
    ? 'free'
    : isOwned
      ? 'owned'
      : 'locked';

  const moduloHref = `/a-minha-conta/cursos/${cursoSlug}/${modulo.slug}`;
  const isClickable = state === 'free' || state === 'owned';

  function handleNavigate() {
    if (!isClickable) return;
    if (state === 'free' && !isLoggedIn) {
      router.push(`/login?next=${encodeURIComponent(moduloHref)}`);
      return;
    }
    router.push(moduloHref);
  }

  const sideColumnBg =
    state === 'free'
      ? `linear-gradient(180deg, ${accentColor} 0%, ${accentColor}e6 100%)`
      : state === 'owned'
        ? `linear-gradient(180deg, ${accentColor}2e 0%, ${accentColor}52 100%)`
        : `${accentColor}14`;

  const numberColor = state === 'locked' ? 'rgba(26, 31, 24, 0.4)' : TEXT_DARK;

  const labelColor =
    state === 'free'
      ? 'rgba(26, 31, 24, 0.55)'
      : state === 'owned'
        ? 'rgba(26, 31, 24, 0.55)'
        : 'rgba(26, 31, 24, 0.4)';

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
          {t('module.free')}
        </span>
      </span>
    ) : state === 'owned' ? (
      <span
        className='mt-3.5 flex h-8 w-8 items-center justify-center rounded-full'
        style={{ backgroundColor: accentColor }}
        aria-label={t('module.unlockedAria')}
      >
        <Check size={16} strokeWidth={2.5} style={{ color: '#fff' }} />
      </span>
    ) : (
      <span
        className='mt-3.5 flex h-8 w-8 items-center justify-center rounded-full'
        style={{ backgroundColor: 'rgba(26, 31, 24, 0.06)' }}
        aria-label={t('module.lockedAria')}
      >
        <Lock
          size={14}
          strokeWidth={1.8}
          style={{ color: 'rgba(26, 31, 24, 0.55)' }}
        />
      </span>
    );

  const cardInner = (
    <>
      {/* Coluna lateral */}
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
          {t('module.label')}
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
          {emphasis === 'primeira' ? (
            <>
              <em className='italic' style={{ color: accentTextColor }}>
                {linha1}
              </em>
              {linha2 && <> {linha2}</>}
            </>
          ) : emphasis === 'segunda' ? (
            <>
              {linha1}
              {linha2 && (
                <>
                  {' '}
                  <em className='italic' style={{ color: accentTextColor }}>
                    {linha2}
                  </em>
                </>
              )}
            </>
          ) : (
            <>
              {linha1}
              {linha2 && <> {linha2}</>}
            </>
          )}
        </h3>

        <p
          className='text-[13.5px] leading-[1.6] md:text-[14px]'
          style={{ color: TEXT_BODY }}
        >
          {lead}
        </p>

        {/* Linha inferior */}
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
              {isLoggedIn ? t('module.start') : t('module.startFree')}
              <ArrowUpRight size={15} strokeWidth={2} />
            </span>
          )}

          {state === 'owned' && (
            <span
              className='inline-flex items-center gap-1.5 text-[12px] font-medium uppercase tracking-[0.08em] transition-all duration-300 group-hover:gap-2'
              style={{ color: accentTextColor }}
            >
              {t('module.continue')}
              <ArrowUpRight size={15} strokeWidth={2} />
            </span>
          )}

          {state === 'locked' && (
            <span
              className='inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.1em]'
              style={{ color: TEXT_MUTED }}
            >
              <Lock size={12} strokeWidth={1.8} />
              {t('module.included')}
            </span>
          )}
        </div>
      </div>
    </>
  );

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
