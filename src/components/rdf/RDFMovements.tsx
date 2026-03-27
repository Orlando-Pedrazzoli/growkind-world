'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { RDF_MOVEMENTS } from '@/lib/data/rdf';

export default function RDFMovements() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  // Movimentos 1-3 em grid, Transversal (4) full-width
  const mainMovements = RDF_MOVEMENTS.filter(m => m.number <= 3);
  const transversal = RDF_MOVEMENTS.find(m => m.number === 4)!;

  return (
    <section
      ref={ref}
      className='px-6 py-20 md:px-[60px] md:py-28'
      style={{ backgroundColor: '#e8f0ed' }}
    >
      <motion.div
        className='mx-auto max-w-[1100px]'
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
            Os movimentos do campo
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
            Quatro lentes —{' '}
            <em style={{ color: '#c4a44a' }}>não quatro etapas</em>
          </h2>
        </div>

        {/* Aviso critico */}
        <div
          className='mx-auto mt-10 flex max-w-[800px] items-start gap-4 p-5'
          style={{
            backgroundColor: 'rgba(255,255,255,0.6)',
            borderRadius: '10px',
            border: '1px solid rgba(212,207,196,0.5)',
          }}
        >
          <span className='shrink-0 text-lg'>⚠</span>
          <p
            className='text-[13px] leading-relaxed'
            style={{ color: 'var(--color-gk-cinza)' }}
          >
            <strong style={{ color: 'var(--color-gk-black)' }}>Crítico:</strong>{' '}
            Os movimentos não são fases de progresso nem categorias
            diagnósticas. São lentes de leitura. A mesma criança pode precisar
            de movimentos diferentes ao longo do mesmo dia. O adulto não
            &ldquo;passa&rdquo; de um movimento para o outro — lê o que o campo
            está a pedir agora.
          </p>
        </div>

        {/* Grid 3 movimentos */}
        <div className='mt-12 grid gap-6 md:grid-cols-3'>
          {mainMovements.map((mov, index) => (
            <motion.div
              key={mov.number}
              className='flex flex-col p-7'
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '14px',
                border: '1px solid rgba(212,207,196,0.4)',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{
                duration: 0.6,
                delay: 0.1 + index * 0.12,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              {/* Numero + label */}
              <div className='flex items-center gap-3'>
                <span
                  className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[13px] font-semibold text-white'
                  style={{ backgroundColor: mov.color }}
                >
                  {mov.number}
                </span>
                <span
                  className='text-[11px] font-semibold uppercase tracking-[0.1em]'
                  style={{ color: 'var(--color-gk-cinza)' }}
                >
                  Movimento {mov.number}
                </span>
              </div>

              {/* Titulo + role */}
              <h3
                className='mt-4 font-[family-name:var(--font-display)] text-xl font-semibold'
                style={{ color: 'var(--color-gk-black)' }}
              >
                {mov.title}
              </h3>
              <p
                className='mt-1 text-[14px]'
                style={{ color: 'var(--color-gk-cinza)' }}
              >
                {mov.role}
              </p>

              {/* Badge "quando" */}
              <span
                className='mt-4 inline-block self-start px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.1em]'
                style={{
                  backgroundColor: 'rgba(200,220,192,0.35)',
                  color: '#3d5a4f',
                  borderRadius: '6px',
                }}
              >
                {mov.when}
              </span>

              {/* Descricao */}
              <p
                className='mt-5 flex-1 text-[14px] leading-relaxed'
                style={{ color: 'rgba(30,30,30,0.65)' }}
              >
                {mov.desc}
              </p>

              {/* Citacao */}
              <div
                className='mt-6 p-4'
                style={{
                  backgroundColor: 'rgba(200,220,192,0.15)',
                  borderRadius: '8px',
                }}
              >
                <p
                  className='font-[family-name:var(--font-display)] text-[13px] italic leading-relaxed'
                  style={{ color: 'rgba(30,30,30,0.5)' }}
                >
                  {mov.quote}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Card transversal full-width */}
        <motion.div
          className='mt-6 grid gap-0 overflow-hidden md:grid-cols-[1fr_1fr]'
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '14px',
            border: '1px solid rgba(212,207,196,0.4)',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{
            duration: 0.6,
            delay: 0.5,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          {/* Coluna esquerda — conteudo */}
          <div className='p-7'>
            {/* Numero + label */}
            <div className='flex items-center gap-3'>
              <span
                className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[13px] font-semibold text-white'
                style={{ backgroundColor: transversal.color }}
              >
                T
              </span>
              <span
                className='text-[11px] font-semibold uppercase tracking-[0.1em]'
                style={{ color: 'var(--color-gk-cinza)' }}
              >
                Movimento Transversal
              </span>
            </div>

            {/* Titulo + role */}
            <h3
              className='mt-4 font-[family-name:var(--font-display)] text-xl font-semibold'
              style={{ color: 'var(--color-gk-black)' }}
            >
              {transversal.title}
            </h3>
            <p
              className='mt-1 text-[14px]'
              style={{ color: 'var(--color-gk-cinza)' }}
            >
              {transversal.role}
            </p>

            {/* Badge */}
            <span
              className='mt-4 inline-block self-start px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.1em]'
              style={{
                backgroundColor: 'rgba(200,220,192,0.35)',
                color: '#3d5a4f',
                borderRadius: '6px',
              }}
            >
              Pertence ao campo do adulto — não ao desenvolvimento da criança
            </span>

            {/* Descricao */}
            <p
              className='mt-5 text-[14px] leading-relaxed'
              style={{ color: 'rgba(30,30,30,0.65)' }}
            >
              Garante coerência entre todos os adultos envolvidos — educadores,
              família, terapeutas. Não é liderança. É coerência de leitura ao
              longo do tempo. O adulto-eixo tem autoridade de observação: vê o
              dia real da criança que nenhum relatório clínico captura.
            </p>
          </div>

          {/* Coluna direita — citacao em fundo sage */}
          <div
            className='flex items-center justify-center p-10'
            style={{ backgroundColor: '#3d5a4f' }}
          >
            <p
              className='max-w-sm font-[family-name:var(--font-display)] text-lg italic leading-relaxed'
              style={{ color: 'rgba(240,232,208,0.75)' }}
            >
              &ldquo;O adulto não se torna especialista. Torna-se eixo. É ele
              quem percebe micromudanças que não aparecem em relatórios.&rdquo;
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
