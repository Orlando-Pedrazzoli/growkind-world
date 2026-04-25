// src/components/cursos/CursosEmBreve.tsx

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { todosOsCursos } from '@/lib/data/cursos';

// Paleta editorial partilhada com BookHero e CursosHero.
const BG = '#1a1f18';
const CREAM = '#f0e8d0';
const GOLD = '#c4a44a';

export default function CursosEmBreve() {
  return (
    <section className='py-20 md:py-28' style={{ backgroundColor: BG }}>
      <div className='content-width'>
        {/* Intro editorial */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className='mx-auto mb-16 max-w-3xl text-center md:mb-24'
        >
          <div
            className='mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-[11px] font-medium uppercase tracking-[0.14em]'
            style={{
              backgroundColor: 'rgba(196, 164, 74, 0.12)',
              color: GOLD,
            }}
          >
            <span
              className='h-1.5 w-1.5 rounded-full'
              style={{ backgroundColor: GOLD }}
            />
            Curso Zero · M1 gratuito
          </div>

          <h2
            className='mb-6 font-[family-name:var(--font-display)] text-3xl leading-tight md:text-4xl lg:text-5xl'
            style={{ color: CREAM }}
          >
            Dois percursos. Uma mesma lente.
          </h2>

          <div className='space-y-5 text-[17px] leading-[1.75] md:text-[18px]'>
            <p style={{ color: 'rgba(240,232,208,0.72)' }}>
              O livro <em>Onde o Mundo Nasce Entre Nós</em> abriu uma porta. Os
              cursos são o lugar onde o que ficou em aberto ganha aplicação —
              com tempo, com prática, com o mesmo rigor e cuidado que nos trouxe
              até aqui.
            </p>
            <p style={{ color: 'rgba(240,232,208,0.72)' }}>
              Escolha o percurso que corresponde ao seu lugar — seja em sala de
              aula ou em casa. O primeiro módulo de cada curso é gratuito.
            </p>
          </div>
        </motion.div>

        {/* Os 2 cursos — grid de cards editoriais */}
        <div className='mx-auto grid max-w-6xl gap-8 md:grid-cols-2 md:gap-10'>
          {todosOsCursos.map((curso, idx) => (
            <motion.article
              key={curso.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: idx * 0.1 }}
              className='group relative flex flex-col overflow-hidden rounded-2xl'
              style={{
                backgroundColor: 'rgba(240,232,208,0.03)',
                border: '1px solid rgba(196, 164, 74, 0.15)',
              }}
            >
              {/* Capa SVG — ratio 2:3 preservado, editorial como capa de livro */}
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

              {/* Painel de info abaixo da capa */}
              <div className='flex flex-1 flex-col gap-5 p-8 md:p-10'>
                <div>
                  <p
                    className='mb-2 text-[11px] font-medium uppercase tracking-[0.14em]'
                    style={{ color: curso.accentColor }}
                  >
                    {curso.subtitulo}
                  </p>
                  <h3
                    className='mb-4 font-[family-name:var(--font-display)] text-2xl leading-tight md:text-3xl'
                    style={{ color: CREAM }}
                  >
                    {curso.nome}
                  </h3>
                  <p
                    className='text-[15px] leading-relaxed'
                    style={{ color: 'rgba(240,232,208,0.65)' }}
                  >
                    {curso.descricao}
                  </p>
                </div>

                {/* Meta info + CTA */}
                <div
                  className='mt-auto flex items-center justify-between gap-4 border-t pt-5'
                  style={{ borderColor: 'rgba(196, 164, 74, 0.15)' }}
                >
                  <span
                    className='text-[12px] uppercase tracking-[0.1em]'
                    style={{ color: 'rgba(240,232,208,0.5)' }}
                  >
                    4 módulos · {curso.modulos.length > 0 ? 'M1 grátis' : ''}
                  </span>
                  <Link
                    href={`/cursos/${curso.slug}`}
                    className='inline-flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.08em] transition-all duration-300 hover:gap-3'
                    style={{ color: curso.accentColor }}
                  >
                    Explorar
                    <ArrowRight size={16} strokeWidth={2} />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Ponte — para quem ainda não leu o livro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className='mx-auto mt-20 max-w-3xl rounded-3xl p-10 text-center md:mt-28 md:p-14'
          style={{
            backgroundColor: 'rgba(240,232,208,0.04)',
            border: '1px solid rgba(196, 164, 74, 0.22)',
          }}
        >
          <p
            className='mb-4 text-[11px] font-medium uppercase tracking-[0.16em]'
            style={{ color: GOLD }}
          >
            Entretanto
          </p>

          <h3
            className='mb-5 font-[family-name:var(--font-display)] text-2xl leading-tight md:text-3xl lg:text-4xl'
            style={{ color: CREAM }}
          >
            Ainda não leu o livro?
          </h3>

          <p
            className='mx-auto mb-8 max-w-xl text-[15px] leading-relaxed md:text-base'
            style={{ color: 'rgba(240,232,208,0.7)' }}
          >
            Os cursos aprofundam o que o livro abre. Ler é o primeiro passo —
            mesmo que seja só por uma tarde.
          </p>

          <Link
            href='/o-livro'
            className='group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[13px] font-medium uppercase tracking-[0.1em] transition-all duration-300 hover:brightness-110'
            style={{
              backgroundColor: GOLD,
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
