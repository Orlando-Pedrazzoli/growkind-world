'use client';

import { useState } from 'react';

/* ── Dados dos movimentos para o painel ── */
const movimentosData = {
  m1: {
    codigo: 'M1 · Regulação',
    cor: '#7BAA5D',
    titulo: 'Habitar o Mundo',
    subtitulo: 'Ser Chão',
    paragrafos: [
      'Quando o campo pede regulação, o adulto torna-se chão. O sistema nervoso da criança precisa de encontrar estabilidade antes de qualquer outra coisa.',
      'O adulto não instrui — regula. A presença é a intervenção. Não há técnica que substitua o adulto regulado que simplesmente fica.',
      'Fundamento: Teoria Polyvagal (Porges) — o sistema nervoso autónomo precisa de estado de segurança neurofisiológica antes de qualquer aprendizagem ser possível.',
    ],
    publico: ['Famílias', 'Teaching Assistants'],
  },
  m2: {
    codigo: 'M2 · Estrutura',
    cor: '#4E7EA7',
    titulo: 'Agir no Mundo',
    subtitulo: 'Abrir Caminho',
    paragrafos: [
      'Quando o campo pede estrutura, o adulto torna-se estrutura. A criança precisa de previsibilidade e organização para poder agir.',
      'O adulto oferece o enquadramento que permite a acção — não como controlo, mas como contenção que liberta. A rotina não é rigidez — é chão previsível.',
      'A diferença entre corrigir o comportamento e organizar o campo que o produziu.',
    ],
    publico: ['Famílias', 'Teaching Assistants', 'Professores'],
  },
  m3: {
    codigo: 'M3 · Relação',
    cor: '#C8844A',
    titulo: 'Encontrar o Outro',
    subtitulo: 'Sustentar o Encontro',
    paragrafos: [
      'Quando o campo pede relação, o adulto torna-se mediador do encontro. Este movimento tem uma progressão interna que é pedagogicamente crítica.',
      'O outro como obstáculo funcional → o outro como referência responsiva → o outro como mente própria. Muitos adultos estão no primeiro ponto. Começar pela Teoria da Mente perde-os.',
      'O RDF começa onde o campo está — não onde gostaríamos que estivesse.',
    ],
    publico: ['Famílias', 'Teaching Assistants', 'Terapeutas'],
  },
  mt: {
    codigo: 'MT · Transversal',
    cor: '#C17F3A',
    titulo: 'Coordenar o Campo',
    subtitulo: 'Ser Eixo',
    paragrafos: [
      'Este movimento pertence ao campo do adulto — não ao desenvolvimento da criança. É transversal a todos os movimentos, não sequencial nem final.',
      'O adulto que coordena o campo mantém coerência entre o que observa, o que decide e o que comunica — à família, à escola, aos terapeutas.',
      'Na prática, é frequentemente a mãe, o pai ou o TA que cumpre esta função — garantindo que a leitura do campo é partilhada e coerente entre todos os adultos que acompanham a criança.',
    ],
    publico: ['Todos os públicos'],
  },
} as const;

type MovimentoKey = keyof typeof movimentosData;

const legenda = [
  { key: 'm1', cor: '#7BAA5D', label: 'M1 · Habitar o Mundo' },
  { key: 'm2', cor: '#4E7EA7', label: 'M2 · Agir no Mundo' },
  { key: 'm3', cor: '#C8844A', label: 'M3 · Encontrar o Outro' },
  { key: 'mt', cor: '#C17F3A', label: 'MT · Coordenar o Campo' },
];

export default function DiagramaPage() {
  const [activeNode, setActiveNode] = useState<MovimentoKey | null>(null);

  function handleNodeClick(key: MovimentoKey) {
    setActiveNode(key);
  }

  const activeData = activeNode ? movimentosData[activeNode] : null;

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
          RDF · Framework Interactivo
        </span>
        <h1 className='text-[var(--color-gk-green-dark)]'>
          O Campo Relacional
        </h1>
        <p
          className='mx-auto mt-5 text-[var(--color-gk-cinza)]'
          style={{ fontSize: '16px', lineHeight: 1.7, maxWidth: '520px' }}
        >
          Clica em cada movimento para explorar o que o campo está a pedir — e o
          que o adulto pode oferecer.
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
          {legenda.map(l => (
            <button
              key={l.key}
              onClick={() => handleNodeClick(l.key as MovimentoKey)}
              className='flex items-center gap-2.5 transition-opacity hover:opacity-80'
            >
              <div
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: l.cor,
                  flexShrink: 0,
                }}
              />
              <span
                className='text-[var(--color-gk-cinza)]'
                style={{ fontSize: '12px', letterSpacing: '0.04em' }}
              >
                {l.label}
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
                  CRIANÇA
                </text>
                <text
                  x='290'
                  y='50'
                  textAnchor='middle'
                  fontFamily='DM Sans, sans-serif'
                  fontSize='8'
                  fill='#6B6B6B'
                >
                  ponto de partida
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
                  ADULTO
                </text>
                <text
                  x='530'
                  y='458'
                  textAnchor='middle'
                  fontFamily='DM Sans, sans-serif'
                  fontSize='8'
                  fill='#6B6B6B'
                >
                  leitor do campo
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
                  AMBIENTE
                </text>
                <text
                  x='50'
                  y='458'
                  textAnchor='middle'
                  fontFamily='DM Sans, sans-serif'
                  fontSize='8'
                  fill='#6B6B6B'
                >
                  participante
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
                  Coordenar
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
                  o Campo
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
                  Habitar
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
                  o Mundo
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
                  Agir
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
                  no Mundo
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
                  Encontrar
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
                  o Outro
                </text>
              </g>
            </svg>
          </div>

          {/* Painel Lateral */}
          <div className='sticky top-24'>
            {!activeData ? (
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
                  Clica em qualquer movimento do diagrama para explorar o que o
                  campo está a pedir.
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
                    color: activeData.cor,
                    marginBottom: '8px',
                  }}
                >
                  {activeData.codigo}
                </div>

                <h2
                  className='text-[var(--color-gk-green-dark)]'
                  style={{
                    fontSize: '28px',
                    lineHeight: 1.2,
                    marginBottom: '6px',
                  }}
                >
                  {activeData.titulo}
                </h2>

                <span
                  className='eyebrow mb-7 block'
                  style={{ color: 'var(--color-gk-ocre)' }}
                >
                  {activeData.subtitulo}
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
                  {activeData.paragrafos.map((p, i) => (
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
                    {activeNode === 'mt' ? 'Transversal a' : 'Curso para'}
                  </div>
                  <div className='flex flex-wrap gap-2'>
                    {activeData.publico.map(tag => (
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
                  Entrar na lista de espera
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
                      ? 'Formação em desenvolvimento'
                      : 'Curso em desenvolvimento'}
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
          <span className='eyebrow mb-6 block'>
            Formação GrowKind · Em breve
          </span>
          <h2 className='text-[var(--color-gk-green-dark)]'>
            Fica a saber primeiro
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
            Os cursos RDF — para famílias e para Teaching Assistants — abrem em
            breve. A lista de espera tem prioridade nas inscrições.
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
              placeholder='O teu nome'
              className='input-editorial'
            />
            <input
              type='email'
              name='email'
              required
              placeholder='O teu email'
              className='input-editorial'
            />
            <select name='perfil' className='input-editorial' defaultValue=''>
              <option value='' disabled>
                Eu sou...
              </option>
              <option value='pai-mae'>Pai / Mãe</option>
              <option value='teaching-assistant'>Teaching Assistant</option>
              <option value='professor'>Professor(a)</option>
              <option value='psicologo-terapeuta'>
                Psicólogo(a) / Terapeuta
              </option>
              <option value='outro-profissional'>Outro profissional</option>
            </select>
            <button
              type='submit'
              className='btn-primary w-full'
              style={{ padding: '18px' }}
            >
              Entrar na lista de espera
            </button>
          </form>

          <p
            className='mt-4 text-[var(--color-gk-green-dark)]'
            style={{ fontSize: '12px', opacity: 0.5 }}
          >
            Sem pressão. Só o que importa — quando importar.
          </p>
        </div>
      </section>
    </>
  );
}
