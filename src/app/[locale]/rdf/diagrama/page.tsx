'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

/* ── Estrutura dos movimentos (cores/códigos) — textos vêm do dicionário ── */
const MOVIMENTO_CONFIG = {
  m1: { codigo: 'M1', cor: '#7BAA5D' },
  m2: { codigo: 'M2', cor: '#4E7EA7' },
  m3: { codigo: 'M3', cor: '#C8844A' },
  mt: { codigo: 'MT', cor: '#C17F3A' },
} as const;

type MovimentoKey = keyof typeof MOVIMENTO_CONFIG;

const LEGENDA_KEYS: MovimentoKey[] = ['m1', 'm2', 'm3', 'mt'];

export default function DiagramaPage() {
  const t = useTranslations('rdf.diagramPage');
  const [activeNode, setActiveNode] = useState<MovimentoKey | null>(null);

  function handleNodeClick(key: MovimentoKey) {
    setActiveNode(key);
  }

  // Título de cada nó em duas linhas — \n no JSON
  const nodeTitleLines = (key: MovimentoKey) =>
    t(`movements.${key}.nodeTitle`).split('\n');

  const activeConfig = activeNode ? MOVIMENTO_CONFIG[activeNode] : null;
  const activeParagrafos = activeNode
    ? (t.raw(`movements.${activeNode}.paragraphs`) as string[])
    : [];
  const activePublico = activeNode
    ? (t.raw(`movements.${activeNode}.audience`) as string[])
    : [];

  return (
    <>
      {/* ═══════════════════════════════════
          HERO — Diagrama
         ═══════════════════════════════════ */}
      <section
        className='-mt-20 bg-[var(--color-gk-creme)] md:-mt-24'
        style={{ padding: '180px 60px 80px', textAlign: 'center' }}
      >
        <span
          className='section-label mb-5 block'
          style={{ textAlign: 'center' }}
        >
          {t('heroLabel')}
        </span>
        <h1 className='text-[var(--color-gk-green-dark)]'>{t('heroTitle')}</h1>
        <p
          className='mx-auto mt-5 text-[var(--color-gk-cinza)]'
          style={{ fontSize: '16px', lineHeight: 1.7, maxWidth: '520px' }}
        >
          {t('heroSubtitle')}
        </p>
      </section>

      {/* ═══════════════════════════════════
          DIAGRAMA INTERACTIVO
         ═══════════════════════════════════ */}
      <section
        className='bg-[var(--color-gk-creme)]'
        style={{ padding: '0 60px 120px' }}
      >
        {/* Legenda */}
        <div
          className='mx-auto mb-10 flex flex-wrap gap-8'
          style={{ maxWidth: '1100px' }}
        >
          {LEGENDA_KEYS.map(key => (
            <button
              key={key}
              onClick={() => handleNodeClick(key)}
              className='flex items-center gap-2.5 transition-opacity hover:opacity-80'
            >
              <div
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: MOVIMENTO_CONFIG[key].cor,
                  flexShrink: 0,
                }}
              />
              <span
                className='text-[var(--color-gk-cinza)]'
                style={{ fontSize: '12px', letterSpacing: '0.04em' }}
              >
                {MOVIMENTO_CONFIG[key].codigo} · {t(`movements.${key}.titulo`)}
              </span>
            </button>
          ))}
        </div>

        {/* Layout: SVG + Painel */}
        <div
          className='mx-auto grid grid-cols-1 items-start gap-8 md:gap-14 lg:grid-cols-[1fr_420px]'
          style={{ maxWidth: '1100px' }}
        >
          {/* SVG Canvas */}
          <div
            className='bg-white'
            style={{
              border: '1px solid rgba(26,92,42,0.08)',
              aspectRatio: '1',
              maxWidth: '580px',
              width: '100%',
            }}
          >
            <svg
              viewBox='0 0 580 580'
              xmlns='http://www.w3.org/2000/svg'
              className='h-full w-full'
            >
              {/* Background grid */}
              <defs>
                <pattern
                  id='grid'
                  width='40'
                  height='40'
                  patternUnits='userSpaceOnUse'
                >
                  <path
                    d='M 40 0 L 0 0 0 40'
                    fill='none'
                    stroke='rgba(26,92,42,0.04)'
                    strokeWidth='1'
                  />
                </pattern>
              </defs>
              <rect width='580' height='580' fill='url(#grid)' />

              {/* Orbit rings */}
              <circle
                cx='290'
                cy='290'
                r='200'
                fill='none'
                stroke='rgba(26,92,42,0.07)'
                strokeWidth='1'
                strokeDasharray='4 6'
              />
              <circle
                cx='290'
                cy='290'
                r='120'
                fill='none'
                stroke='rgba(193,127,58,0.1)'
                strokeWidth='1'
              />

              {/* Connection lines */}
              <line
                x1='290'
                y1='290'
                x2='290'
                y2='100'
                stroke='rgba(123,170,93,0.2)'
                strokeWidth='1.5'
                strokeDasharray='3 4'
              />
              <line
                x1='290'
                y1='290'
                x2='468'
                y2='396'
                stroke='rgba(78,126,167,0.2)'
                strokeWidth='1.5'
                strokeDasharray='3 4'
              />
              <line
                x1='290'
                y1='290'
                x2='112'
                y2='396'
                stroke='rgba(200,132,74,0.2)'
                strokeWidth='1.5'
                strokeDasharray='3 4'
              />

              {/* External labels */}
              <g opacity='0.35'>
                <circle
                  cx='290'
                  cy='42'
                  r='28'
                  fill='none'
                  stroke='rgba(26,92,42,0.3)'
                  strokeWidth='1'
                />
                <text
                  x='290'
                  y='38'
                  textAnchor='middle'
                  fontFamily='DM Sans, sans-serif'
                  fontSize='9'
                  fill='#1A5C2A'
                  letterSpacing='1'
                  fontWeight='500'
                >
                  {t('externalLabels.childLabel')}
                </text>
                <text
                  x='290'
                  y='50'
                  textAnchor='middle'
                  fontFamily='DM Sans, sans-serif'
                  fontSize='8'
                  fill='#6B6B6B'
                >
                  {t('externalLabels.childSub')}
                </text>

                <circle
                  cx='530'
                  cy='450'
                  r='28'
                  fill='none'
                  stroke='rgba(26,92,42,0.3)'
                  strokeWidth='1'
                />
                <text
                  x='530'
                  y='446'
                  textAnchor='middle'
                  fontFamily='DM Sans, sans-serif'
                  fontSize='9'
                  fill='#1A5C2A'
                  letterSpacing='1'
                  fontWeight='500'
                >
                  {t('externalLabels.adultLabel')}
                </text>
                <text
                  x='530'
                  y='458'
                  textAnchor='middle'
                  fontFamily='DM Sans, sans-serif'
                  fontSize='8'
                  fill='#6B6B6B'
                >
                  {t('externalLabels.adultSub')}
                </text>

                <circle
                  cx='50'
                  cy='450'
                  r='28'
                  fill='none'
                  stroke='rgba(26,92,42,0.3)'
                  strokeWidth='1'
                />
                <text
                  x='50'
                  y='446'
                  textAnchor='middle'
                  fontFamily='DM Sans, sans-serif'
                  fontSize='9'
                  fill='#1A5C2A'
                  letterSpacing='1'
                  fontWeight='500'
                >
                  {t('externalLabels.environmentLabel')}
                </text>
                <text
                  x='50'
                  y='458'
                  textAnchor='middle'
                  fontFamily='DM Sans, sans-serif'
                  fontSize='8'
                  fill='#6B6B6B'
                >
                  {t('externalLabels.environmentSub')}
                </text>
              </g>

              {/* MT — Centro */}
              <g
                className='cursor-pointer'
                onClick={() => handleNodeClick('mt')}
              >
                <circle
                  cx='290'
                  cy='290'
                  r='72'
                  fill='rgba(193,127,58,0.06)'
                  style={{
                    opacity: activeNode === 'mt' ? 1 : 0,
                    transition: 'opacity 0.25s',
                  }}
                />
                <circle
                  cx='290'
                  cy='290'
                  r='56'
                  fill='#C17F3A'
                  style={{
                    filter: activeNode === 'mt' ? 'brightness(1.15)' : 'none',
                    transition: 'filter 0.25s',
                  }}
                />
                <circle
                  cx='290'
                  cy='290'
                  r='56'
                  fill='none'
                  stroke='rgba(255,255,255,0.2)'
                  strokeWidth='1.5'
                />
                <text
                  x='290'
                  y='282'
                  textAnchor='middle'
                  fontFamily='DM Sans, sans-serif'
                  fontSize='9'
                  fill='rgba(255,255,255,0.7)'
                  letterSpacing='1.5'
                  fontWeight='500'
                >
                  MT
                </text>
                <text
                  x='290'
                  y='296'
                  textAnchor='middle'
                  fontFamily='Playfair Display, serif'
                  fontSize='11'
                  fill='#fff'
                  fontWeight='600'
                >
                  {nodeTitleLines('mt')[0]}
                </text>
                <text
                  x='290'
                  y='310'
                  textAnchor='middle'
                  fontFamily='Playfair Display, serif'
                  fontSize='11'
                  fill='#fff'
                  fontWeight='600'
                >
                  {nodeTitleLines('mt')[1]}
                </text>
              </g>

              {/* M1 — Topo */}
              <g
                className='cursor-pointer'
                onClick={() => handleNodeClick('m1')}
              >
                <circle
                  cx='290'
                  cy='100'
                  r='58'
                  fill='rgba(123,170,93,0.08)'
                  style={{
                    opacity: activeNode === 'm1' ? 1 : 0,
                    transition: 'opacity 0.25s',
                  }}
                />
                <circle
                  cx='290'
                  cy='100'
                  r='46'
                  fill='#7BAA5D'
                  style={{
                    filter: activeNode === 'm1' ? 'brightness(1.15)' : 'none',
                    transition: 'filter 0.25s',
                  }}
                />
                <circle
                  cx='290'
                  cy='100'
                  r='46'
                  fill='none'
                  stroke='rgba(255,255,255,0.2)'
                  strokeWidth='1.5'
                />
                <text
                  x='290'
                  y='91'
                  textAnchor='middle'
                  fontFamily='DM Sans, sans-serif'
                  fontSize='9'
                  fill='rgba(255,255,255,0.7)'
                  letterSpacing='1.5'
                  fontWeight='500'
                >
                  M1
                </text>
                <text
                  x='290'
                  y='104'
                  textAnchor='middle'
                  fontFamily='Playfair Display, serif'
                  fontSize='11'
                  fill='#fff'
                  fontWeight='600'
                >
                  {nodeTitleLines('m1')[0]}
                </text>
                <text
                  x='290'
                  y='117'
                  textAnchor='middle'
                  fontFamily='Playfair Display, serif'
                  fontSize='11'
                  fill='#fff'
                  fontWeight='600'
                >
                  {nodeTitleLines('m1')[1]}
                </text>
              </g>

              {/* M2 — Direita/baixo */}
              <g
                className='cursor-pointer'
                onClick={() => handleNodeClick('m2')}
              >
                <circle
                  cx='468'
                  cy='396'
                  r='58'
                  fill='rgba(78,126,167,0.08)'
                  style={{
                    opacity: activeNode === 'm2' ? 1 : 0,
                    transition: 'opacity 0.25s',
                  }}
                />
                <circle
                  cx='468'
                  cy='396'
                  r='46'
                  fill='#4E7EA7'
                  style={{
                    filter: activeNode === 'm2' ? 'brightness(1.15)' : 'none',
                    transition: 'filter 0.25s',
                  }}
                />
                <circle
                  cx='468'
                  cy='396'
                  r='46'
                  fill='none'
                  stroke='rgba(255,255,255,0.2)'
                  strokeWidth='1.5'
                />
                <text
                  x='468'
                  y='387'
                  textAnchor='middle'
                  fontFamily='DM Sans, sans-serif'
                  fontSize='9'
                  fill='rgba(255,255,255,0.7)'
                  letterSpacing='1.5'
                  fontWeight='500'
                >
                  M2
                </text>
                <text
                  x='468'
                  y='400'
                  textAnchor='middle'
                  fontFamily='Playfair Display, serif'
                  fontSize='11'
                  fill='#fff'
                  fontWeight='600'
                >
                  {nodeTitleLines('m2')[0]}
                </text>
                <text
                  x='468'
                  y='413'
                  textAnchor='middle'
                  fontFamily='Playfair Display, serif'
                  fontSize='11'
                  fill='#fff'
                  fontWeight='600'
                >
                  {nodeTitleLines('m2')[1]}
                </text>
              </g>

              {/* M3 — Esquerda/baixo */}
              <g
                className='cursor-pointer'
                onClick={() => handleNodeClick('m3')}
              >
                <circle
                  cx='112'
                  cy='396'
                  r='58'
                  fill='rgba(200,132,74,0.08)'
                  style={{
                    opacity: activeNode === 'm3' ? 1 : 0,
                    transition: 'opacity 0.25s',
                  }}
                />
                <circle
                  cx='112'
                  cy='396'
                  r='46'
                  fill='#C8844A'
                  style={{
                    filter: activeNode === 'm3' ? 'brightness(1.15)' : 'none',
                    transition: 'filter 0.25s',
                  }}
                />
                <circle
                  cx='112'
                  cy='396'
                  r='46'
                  fill='none'
                  stroke='rgba(255,255,255,0.2)'
                  strokeWidth='1.5'
                />
                <text
                  x='112'
                  y='387'
                  textAnchor='middle'
                  fontFamily='DM Sans, sans-serif'
                  fontSize='9'
                  fill='rgba(255,255,255,0.7)'
                  letterSpacing='1.5'
                  fontWeight='500'
                >
                  M3
                </text>
                <text
                  x='112'
                  y='400'
                  textAnchor='middle'
                  fontFamily='Playfair Display, serif'
                  fontSize='11'
                  fill='#fff'
                  fontWeight='600'
                >
                  {nodeTitleLines('m3')[0]}
                </text>
                <text
                  x='112'
                  y='413'
                  textAnchor='middle'
                  fontFamily='Playfair Display, serif'
                  fontSize='11'
                  fill='#fff'
                  fontWeight='600'
                >
                  {nodeTitleLines('m3')[1]}
                </text>
              </g>
            </svg>
          </div>

          {/* Painel Lateral */}
          <div className='sticky top-24'>
            {!activeConfig || !activeNode ? (
              /* Placeholder */
              <div
                className='text-center'
                style={{
                  padding: '48px 44px',
                  border: '1.5px dashed rgba(26,92,42,0.15)',
                }}
              >
                <div
                  style={{
                    fontSize: '28px',
                    marginBottom: '16px',
                    opacity: 0.3,
                  }}
                >
                  ↖
                </div>
                <p
                  className='font-[family-name:var(--font-display)] italic text-[var(--color-gk-cinza)]'
                  style={{ fontSize: '17px', lineHeight: 1.6 }}
                >
                  {t('placeholder')}
                </p>
              </div>
            ) : (
              /* Conteúdo do movimento activo */
              <div
                className='bg-white'
                style={{
                  padding: '44px',
                  border: '1px solid rgba(26,92,42,0.1)',
                  animation: 'fade-slide 0.35s ease',
                }}
                key={activeNode}
              >
                <div
                  style={{
                    fontSize: '11px',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    fontWeight: 500,
                    color: activeConfig.cor,
                    marginBottom: '8px',
                  }}
                >
                  {t(`movements.${activeNode}.codigo`)}
                </div>

                <h2
                  className='text-[var(--color-gk-green-dark)]'
                  style={{
                    fontSize: '28px',
                    lineHeight: 1.2,
                    marginBottom: '6px',
                  }}
                >
                  {t(`movements.${activeNode}.titulo`)}
                </h2>

                <span
                  className='eyebrow mb-7 block'
                  style={{ color: 'var(--color-gk-ocre)' }}
                >
                  {t(`movements.${activeNode}.subtitulo`)}
                </span>

                {/* Divider */}
                <div
                  style={{
                    height: '1px',
                    background: 'rgba(26,92,42,0.1)',
                    marginBottom: '28px',
                  }}
                />

                {/* Body */}
                <div
                  className='mb-8 space-y-3.5 text-[var(--color-gk-cinza)]'
                  style={{ fontSize: '14px', lineHeight: 1.85 }}
                >
                  {activeParagrafos.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>

                {/* Público */}
                <div className='mb-8'>
                  <div
                    className='mb-3'
                    style={{
                      fontSize: '11px',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'var(--color-gk-black)',
                      opacity: 0.4,
                      fontWeight: 500,
                    }}
                  >
                    {activeNode === 'mt'
                      ? t('audienceTransversal')
                      : t('audienceCourse')}
                  </div>
                  <div className='flex flex-wrap gap-2'>
                    {activePublico.map(tag => (
                      <span
                        key={tag}
                        className='bg-[var(--color-gk-creme)] text-[var(--color-gk-green-dark)]'
                        style={{
                          padding: '6px 14px',
                          fontSize: '12px',
                          letterSpacing: '0.04em',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <a
                  href='#captura2'
                  className='btn-primary block w-full text-center'
                  style={{ fontSize: '12px', letterSpacing: '0.08em' }}
                >
                  {t('cta')}
                </a>

                <div className='mt-3 text-center'>
                  <span
                    className='inline-flex items-center gap-2 text-[var(--color-gk-cinza)]'
                    style={{
                      fontSize: '11px',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      opacity: 0.6,
                    }}
                  >
                    <span
                      style={{
                        width: '6px',
                        height: '6px',
                        background: 'var(--color-gk-ocre)',
                        borderRadius: '50%',
                        display: 'inline-block',
                      }}
                    />
                    {activeNode === 'mt'
                      ? t('statusTraining')
                      : t('statusCourse')}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          CAPTURA P2
         ═══════════════════════════════════ */}
      <section
        id='captura2'
        className='bg-[var(--color-gk-green-light)]'
        style={{ padding: '120px 60px' }}
      >
        <div
          style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center' }}
        >
          <span className='eyebrow mb-6 block'>{t('capture.eyebrow')}</span>
          <h2 className='text-[var(--color-gk-green-dark)]'>
            {t('capture.title')}
          </h2>
          <p
            className='mx-auto mt-4 text-[var(--color-gk-green-dark)]'
            style={{
              fontSize: '15px',
              lineHeight: 1.8,
              opacity: 0.7,
              maxWidth: '480px',
            }}
          >
            {t('capture.body')}
          </p>

          <form
            className='mx-auto mt-12 flex flex-col gap-3'
            style={{ maxWidth: '460px' }}
            action='/api/leads'
            method='POST'
          >
            <input
              type='text'
              name='nome'
              required
              placeholder={t('capture.namePlaceholder')}
              className='input-editorial'
            />
            <input
              type='email'
              name='email'
              required
              placeholder={t('capture.emailPlaceholder')}
              className='input-editorial'
            />
            <select name='perfil' className='input-editorial' defaultValue=''>
              <option value='' disabled>
                {t('capture.selectPlaceholder')}
              </option>
              <option value='pai-mae'>{t('capture.optionParent')}</option>
              <option value='teaching-assistant'>
                {t('capture.optionTA')}
              </option>
              <option value='professor'>{t('capture.optionTeacher')}</option>
              <option value='psicologo-terapeuta'>
                {t('capture.optionTherapist')}
              </option>
              <option value='outro-profissional'>
                {t('capture.optionOther')}
              </option>
            </select>
            <button
              type='submit'
              className='btn-primary w-full'
              style={{ padding: '18px' }}
            >
              {t('capture.submit')}
            </button>
          </form>

          <p
            className='mt-4 text-[var(--color-gk-green-dark)]'
            style={{ fontSize: '12px', opacity: 0.5 }}
          >
            {t('capture.footnote')}
          </p>
        </div>
      </section>
    </>
  );
}
