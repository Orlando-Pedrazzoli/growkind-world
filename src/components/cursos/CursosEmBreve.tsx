// src/components/cursos/CursosEmBreve.tsx

'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, GraduationCap, Users } from 'lucide-react';
import { todosOsCursos } from '@/lib/data/cursos';

// Paleta editorial — tema escuro em continuidade com o CursosHero.
// Sem rutura visual: o utilizador entra no escuro e os cards mantêm a estética.
const BG = '#1a1f18'; // verde-oliva quase preto (igual ao Hero)
const CREAM = '#f0e8d0'; // pergaminho — texto principal
const CREAM_DIM = 'rgba(240, 232, 208, 0.65)'; // texto secundário
const CREAM_FAINT = 'rgba(240, 232, 208, 0.45)'; // metadados
const BORDER_LINE = 'rgba(240, 232, 208, 0.12)'; // separadores subtis

// Ícone por curso — comunica audiência num único glifo
const ICON_BY_SLUG = {
  profissionais: GraduationCap,
  familias: Users,
} as const;

export default function CursosEmBreve() {
  return (
    <section
      className='relative overflow-hidden px-6 py-20 md:px-[60px] md:py-28'
      style={{ backgroundColor: BG }}
    >
      {/* Textura subtil — coerente com o CursosHero */}
      <div
        aria-hidden='true'
        className='absolute inset-0 opacity-[0.04]'
        style={{
          backgroundImage: `radial-gradient(circle at 15% 20%, #c4a44a 0%, transparent 50%), radial-gradient(circle at 85% 80%, #7aab96 0%, transparent 50%)`,
        }}
      />

      <div className='relative z-10 mx-auto max-w-5xl'>
        {/* Intro editorial */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className='mx-auto mb-14 max-w-3xl text-center md:mb-20'
        >
          <p
            className='mb-4 text-[11px] font-medium uppercase tracking-[0.18em]'
            style={{ color: '#c4a44a' }}
          >
            Curso Zero · M1 gratuito
          </p>

          <h2
            className='mb-6 font-[family-name:var(--font-display)] text-3xl italic leading-tight md:text-4xl lg:text-5xl'
            style={{ color: CREAM }}
          >
            Dois percursos. Uma mesma lente.
          </h2>

          <p
            className='mx-auto max-w-2xl text-[15px] leading-[1.7] md:text-[16px]'
            style={{ color: CREAM_DIM }}
          >
            Escolha o percurso que corresponde ao seu lugar — em sala de aula ou
            em casa. O primeiro módulo de cada curso é gratuito.
          </p>
        </motion.div>

        {/* Os 2 cards — grid responsivo lado a lado */}
        <div className='grid gap-6 md:grid-cols-2 md:gap-7'>
          {todosOsCursos.map((curso, idx) => {
            const Icon = ICON_BY_SLUG[curso.slug];
            const accent = curso.accentColor;
            const href = `/cursos/${curso.slug}`;

            return (
              <motion.article
                key={curso.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, delay: idx * 0.12 }}
                className='group relative flex flex-col overflow-hidden rounded-2xl p-7 transition-all duration-500 hover:-translate-y-1 md:p-8'
                style={{
                  backgroundColor: `${accent}0a`, // ~4% da cor de acento
                  border: `1px solid ${accent}40`,
                }}
              >
                {/* Glow decorativo no canto superior direito */}
                <div
                  aria-hidden='true'
                  className='pointer-events-none absolute top-0 right-0 h-40 w-40 transition-opacity duration-500 group-hover:opacity-100'
                  style={{
                    background: `radial-gradient(circle at top right, ${accent}26, transparent 70%)`,
                    opacity: 0.7,
                  }}
                />

                {/* Header — ícone + audiência */}
                <div className='relative z-10 mb-5 flex items-center gap-3'>
                  <div
                    className='flex h-10 w-10 items-center justify-center rounded-xl'
                    style={{ backgroundColor: `${accent}26` }}
                  >
                    <Icon
                      size={18}
                      strokeWidth={1.6}
                      style={{ color: accent }}
                    />
                  </div>
                  <span
                    className='text-[11px] font-medium uppercase tracking-[0.16em]'
                    style={{ color: accent }}
                  >
                    {curso.subtitulo}
                  </span>
                </div>

                {/* Nome do curso — herói visual */}
                <h3
                  className='relative z-10 mb-4 font-[family-name:var(--font-display)] text-3xl leading-[1.05] md:text-[34px]'
                  style={{ color: CREAM }}
                >
                  {curso.slug === 'profissionais' ? (
                    <>
                      GrowKind <em className='italic'>TA</em>
                    </>
                  ) : (
                    <>
                      GrowKind <em className='italic'>Famílias</em>
                    </>
                  )}
                </h3>

                {/* Descrição densa */}
                <p
                  className='relative z-10 mb-7 flex-1 text-[14px] leading-[1.7] md:text-[15px]'
                  style={{ color: CREAM_DIM }}
                >
                  {curso.publico}. {curso.descricao}
                </p>

                {/* Meta — módulos + preço (sinais de decisão) */}
                <div
                  className='relative z-10 mb-6 flex gap-5 border-y py-4'
                  style={{ borderColor: BORDER_LINE }}
                >
                  <div className='flex-1'>
                    <p
                      className='mb-1 text-[10px] font-medium uppercase tracking-[0.12em]'
                      style={{ color: CREAM_FAINT }}
                    >
                      Módulos
                    </p>
                    <p
                      className='text-[14px] font-medium'
                      style={{ color: CREAM }}
                    >
                      4 · M1 grátis
                    </p>
                  </div>
                  <div
                    className='w-px'
                    style={{ backgroundColor: BORDER_LINE }}
                  />
                  <div className='flex-1'>
                    <p
                      className='mb-1 text-[10px] font-medium uppercase tracking-[0.12em]'
                      style={{ color: CREAM_FAINT }}
                    >
                      Investimento
                    </p>
                    <p
                      className='text-[14px] font-medium'
                      style={{ color: CREAM }}
                    >
                      {curso.precoEur} completo
                    </p>
                  </div>
                </div>

                {/* CTA preenchido com cor de acento */}
                <Link
                  href={href}
                  aria-label={`Explorar curso ${curso.nome}`}
                  className='relative z-10 inline-flex items-center justify-between gap-3 rounded-full px-6 py-3.5 text-[12px] font-medium uppercase tracking-[0.1em] transition-all duration-300 hover:brightness-110'
                  style={{
                    backgroundColor: accent,
                    color: BG,
                  }}
                >
                  Explorar curso
                  <ArrowRight
                    size={16}
                    strokeWidth={2}
                    className='transition-transform duration-300 group-hover:translate-x-1'
                  />
                </Link>
              </motion.article>
            );
          })}
        </div>

        {/* Ponte — para quem ainda não leu o livro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className='mx-auto mt-20 max-w-3xl text-center md:mt-28'
        >
          <p
            className='mb-3 text-[11px] font-medium uppercase tracking-[0.16em]'
            style={{ color: '#c4a44a' }}
          >
            Entretanto
          </p>

          <h3
            className='mb-4 font-[family-name:var(--font-display)] text-2xl leading-tight md:text-3xl'
            style={{ color: CREAM }}
          >
            Ainda não leu o livro?
          </h3>

          <p
            className='mx-auto mb-7 max-w-xl text-[14px] leading-relaxed md:text-[15px]'
            style={{ color: CREAM_DIM }}
          >
            Os cursos aprofundam o que o livro abre. Ler é o primeiro passo —
            mesmo que seja só por uma tarde.
          </p>

          <Link
            href='/o-livro'
            className='group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[12px] font-medium uppercase tracking-[0.1em] transition-all duration-300 hover:brightness-110'
            style={{
              backgroundColor: '#c4a44a',
              color: BG,
            }}
          >
            Conhecer o livro
            <ArrowRight
              size={16}
              strokeWidth={2}
              className='transition-transform duration-300 group-hover:translate-x-1'
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
