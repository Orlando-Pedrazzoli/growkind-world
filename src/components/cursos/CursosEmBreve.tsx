// src/components/cursos/CursosEmBreve.tsx

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { todosOsCursos } from '@/lib/data/cursos';

// Paleta editorial — secção clara que dá luz à página
const BG_CREAM = '#faf6ec';
const TEXT_DARK = '#1a1f18';
const TEXT_BODY = '#5a5a4f';
const TEXT_MUTED = '#8a8a7d';
const BORDER_SUBTLE = 'rgba(26, 31, 24, 0.08)';
const GOLD_DARK = '#8a6c1f';
const GREEN_DARK = '#4d7a64';

const ACCENT_TEXT: Record<string, string> = {
  profissionais: GOLD_DARK,
  familias: GREEN_DARK,
};

export default function CursosEmBreve() {
  return (
    <section className='py-20 md:py-28' style={{ backgroundColor: BG_CREAM }}>
      <div className='content-width'>
        {/* Intro editorial */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className='mx-auto mb-14 max-w-3xl text-center md:mb-20'
        >
          <div
            className='mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-[11px] font-medium uppercase tracking-[0.14em]'
            style={{
              backgroundColor: 'rgba(196, 164, 74, 0.15)',
              color: GOLD_DARK,
            }}
          >
            <span
              className='h-1.5 w-1.5 rounded-full'
              style={{ backgroundColor: GOLD_DARK }}
            />
            Curso Zero · M1 gratuito
          </div>

          <h2
            className='mb-6 font-[family-name:var(--font-display)] text-3xl leading-tight md:text-4xl lg:text-5xl'
            style={{ color: TEXT_DARK }}
          >
            Dois percursos. Uma mesma lente.
          </h2>

          <div className='space-y-5 text-[16px] leading-[1.75] md:text-[17px]'>
            <p style={{ color: TEXT_BODY }}>
              O livro <em>Onde o Mundo Nasce Entre Nós</em> abriu uma porta. Os
              cursos são o lugar onde o que ficou em aberto ganha aplicação —
              com tempo, com prática, com o mesmo rigor e cuidado que nos trouxe
              até aqui.
            </p>
            <p style={{ color: TEXT_BODY }}>
              Escolha o percurso que corresponde ao seu lugar — seja em sala de
              aula ou em casa. O primeiro módulo de cada curso é gratuito.
            </p>
          </div>
        </motion.div>

        {/* Os 2 cursos — grid de cards brancos elevados sobre creme */}
        <div className='mx-auto grid max-w-6xl gap-7 md:grid-cols-2 md:gap-8'>
          {todosOsCursos.map((curso, idx) => {
            const accentText = ACCENT_TEXT[curso.slug] || GOLD_DARK;
            const accentBorder = `${curso.accentColor}40`;

            return (
              <motion.article
                key={curso.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, delay: idx * 0.1 }}
                className='group relative flex flex-col overflow-hidden rounded-2xl transition-all duration-500 hover:-translate-y-1'
                style={{
                  backgroundColor: '#ffffff',
                  border: `0.5px solid ${accentBorder}`,
                  boxShadow:
                    '0 1px 2px rgba(26, 31, 24, 0.04), 0 8px 24px rgba(26, 31, 24, 0.04)',
                }}
              >
                {/* Capa SVG */}
                <Link
                  href={`/cursos/${curso.slug}`}
                  className='relative block overflow-hidden'
                  style={{ aspectRatio: '680 / 960' }}
                >
                  <Image
                    src={curso.capaPrincipal}
                    alt={`Capa ${curso.nome} — ${curso.subtitulo}`}
                    fill
                    sizes='(max-width: 768px) 100vw, 50vw'
                    className='object-cover transition-transform duration-700 group-hover:scale-[1.02]'
                    priority={idx === 0}
                  />
                </Link>

                {/* Painel de info */}
                <div className='flex flex-1 flex-col gap-5 p-7 md:p-8'>
                  <div>
                    <p
                      className='mb-2 text-[11px] font-medium uppercase tracking-[0.14em]'
                      style={{ color: accentText }}
                    >
                      {curso.subtitulo}
                    </p>
                    <h3
                      className='mb-4 font-[family-name:var(--font-display)] text-2xl leading-tight md:text-3xl'
                      style={{ color: TEXT_DARK }}
                    >
                      {curso.nome}
                    </h3>
                    <p
                      className='text-[15px] leading-relaxed'
                      style={{ color: TEXT_BODY }}
                    >
                      {curso.descricao}
                    </p>
                  </div>

                  {/* Linha inferior — meta + CTA */}
                  <div
                    className='mt-auto flex items-center justify-between gap-4 border-t pt-5'
                    style={{ borderColor: BORDER_SUBTLE }}
                  >
                    <span
                      className='text-[12px] uppercase tracking-[0.08em]'
                      style={{ color: TEXT_MUTED }}
                    >
                      4 módulos · M1 grátis
                    </span>
                    <Link
                      href={`/cursos/${curso.slug}`}
                      className='inline-flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.08em] transition-all duration-300 hover:gap-3'
                      style={{ color: accentText }}
                    >
                      Explorar
                      <ArrowRight size={16} strokeWidth={2} />
                    </Link>
                  </div>
                </div>
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
          className='mx-auto mt-20 max-w-3xl rounded-3xl p-10 text-center md:mt-28 md:p-14'
          style={{
            backgroundColor: TEXT_DARK,
            color: '#f0e8d0',
          }}
        >
          <p
            className='mb-4 text-[11px] font-medium uppercase tracking-[0.16em]'
            style={{ color: '#c4a44a' }}
          >
            Entretanto
          </p>

          <h3
            className='mb-5 font-[family-name:var(--font-display)] text-2xl leading-tight md:text-3xl lg:text-4xl'
            style={{ color: '#f0e8d0' }}
          >
            Ainda não leu o livro?
          </h3>

          <p
            className='mx-auto mb-8 max-w-xl text-[15px] leading-relaxed md:text-base'
            style={{ color: 'rgba(240,232,208,0.75)' }}
          >
            Os cursos aprofundam o que o livro abre. Ler é o primeiro passo —
            mesmo que seja só por uma tarde.
          </p>

          <Link
            href='/o-livro'
            className='group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[13px] font-medium uppercase tracking-[0.1em] transition-all duration-300 hover:brightness-110'
            style={{
              backgroundColor: '#c4a44a',
              color: TEXT_DARK,
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
