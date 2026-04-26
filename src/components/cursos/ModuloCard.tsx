// src/components/cursos/ModuloCard.tsx

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Lock, ArrowUpRight, Clock, ShoppingBag, Check } from 'lucide-react';
import type { Modulo } from '@/lib/data/cursos';

interface ModuloCardProps {
  modulo: Modulo;
  cursoSlug: 'profissionais' | 'familias';
  cursoNome: string;
  productKey: 'curso-prof' | 'curso-fam';
  precoEur: string;
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
  cursoNome,
  productKey,
  precoEur,
  accentColor,
  accentTextColor,
  isOwned,
  isLoggedIn,
  index,
}: ModuloCardProps) {
  const router = useRouter();
  const [loadingCheckout, setLoadingCheckout] = useState(false);

  const numeroFormatado = String(modulo.numero).padStart(2, '0');

  // Determinar estado do módulo
  // - Gratuito: M1, sempre acessível
  // - Owned: módulo pago, utilizador comprou o curso
  // - ToBuy: módulo pago, utilizador NÃO comprou
  const state: 'free' | 'owned' | 'toBuy' = modulo.gratuito
    ? 'free'
    : isOwned
      ? 'owned'
      : 'toBuy';

  // URL do módulo:
  // - free → HTML público (em public/cursos/...)
  // - owned → wrapper Next.js que protege o iframe
  // - toBuy → não há URL ainda
  const moduloUrl =
    state === 'free'
      ? modulo.htmlPath
      : state === 'owned'
        ? `/a-minha-conta/cursos/${cursoSlug}/${modulo.slug}`
        : null;

  async function handleComprar() {
    if (!isLoggedIn) {
      router.push(`/login?next=/cursos/${cursoSlug}`);
      return;
    }

    setLoadingCheckout(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product: productKey }),
      });
      const data = await res.json();

      if (!res.ok) {
        // Já comprou ou outro erro com redirect
        if (data.redirect) {
          router.push(data.redirect);
          return;
        }
        alert(data.error || 'Erro ao iniciar pagamento.');
        setLoadingCheckout(false);
        return;
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error('[Checkout]', err);
      alert('Erro ao iniciar pagamento. Tenta novamente.');
      setLoadingCheckout(false);
    }
  }

  // Conteúdo interno comum aos 3 estados
  const cardInner = (
    <>
      {/* Capa SVG */}
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
            state !== 'toBuy' ? 'group-hover:scale-[1.03]' : ''
          }`}
        />
        {state === 'toBuy' && (
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
        {state === 'owned' && (
          <div
            className='absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full'
            style={{
              backgroundColor: accentColor,
              boxShadow: '0 2px 8px rgba(26,31,24,0.3)',
            }}
            aria-label='Módulo desbloqueado'
          >
            <Check size={14} strokeWidth={2.5} style={{ color: '#fff' }} />
          </div>
        )}
      </div>

      {/* Painel de conteúdo */}
      <div className='flex flex-1 flex-col justify-between p-7 md:p-8'>
        <div>
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
                backgroundColor:
                  state === 'free'
                    ? `${accentColor}1a`
                    : state === 'owned'
                      ? `${accentColor}1a`
                      : 'rgba(26, 31, 24, 0.04)',
                color: state === 'toBuy' ? TEXT_MUTED : accentTextColor,
                border: `1px solid ${
                  state === 'toBuy'
                    ? 'rgba(26, 31, 24, 0.08)'
                    : `${accentColor}33`
                }`,
              }}
            >
              {state === 'free'
                ? 'Gratuito'
                : state === 'owned'
                  ? 'Desbloqueado'
                  : precoEur}
            </span>
          </div>

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

          {state === 'free' && (
            <span
              className='inline-flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.08em] transition-all duration-300 group-hover:gap-3'
              style={{ color: accentTextColor }}
            >
              Começar módulo
              <ArrowUpRight size={16} strokeWidth={2} />
            </span>
          )}

          {state === 'owned' && (
            <span
              className='inline-flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.08em] transition-all duration-300 group-hover:gap-3'
              style={{ color: accentTextColor }}
            >
              Continuar módulo
              <ArrowUpRight size={16} strokeWidth={2} />
            </span>
          )}

          {state === 'toBuy' && (
            <button
              onClick={handleComprar}
              disabled={loadingCheckout}
              className='inline-flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-[12px] font-medium uppercase tracking-[0.08em] transition-all duration-300 hover:brightness-110 disabled:cursor-wait disabled:opacity-60'
              style={{
                backgroundColor: accentColor,
                color: TEXT_DARK,
              }}
            >
              <ShoppingBag size={14} strokeWidth={2} />
              {loadingCheckout
                ? 'A abrir...'
                : isLoggedIn
                  ? `Adquirir ${precoEur}`
                  : `Entrar para adquirir`}
            </button>
          )}
        </div>
      </div>
    </>
  );

  // Wrapper: link clicável OU article estático
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
    >
      {state === 'toBuy' ? (
        // Card NÃO clicável (botão é o CTA)
        <article
          className='flex flex-col overflow-hidden rounded-2xl md:flex-row'
          style={{
            backgroundColor: '#ffffff',
            border: `0.5px solid ${BORDER_SUBTLE}`,
            opacity: 0.85,
          }}
        >
          {cardInner}
        </article>
      ) : state === 'free' ? (
        // M1 grátis: abre HTML em nova aba
        <a
          href={moduloUrl!}
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
          {cardInner}
        </a>
      ) : (
        // Owned: vai para wrapper Next.js (mesma aba — está logado)
        <a
          href={moduloUrl!}
          className='group flex cursor-pointer flex-col overflow-hidden rounded-2xl transition-all duration-500 hover:-translate-y-1 md:flex-row'
          style={{
            backgroundColor: '#ffffff',
            border: `0.5px solid ${accentColor}66`,
            boxShadow:
              '0 1px 2px rgba(26, 31, 24, 0.04), 0 8px 24px rgba(26, 31, 24, 0.06)',
          }}
        >
          {cardInner}
        </a>
      )}
    </motion.div>
  );
}
