// src/components/cursos/CursosEmBreve.tsx

'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Users, GraduationCap, ArrowRight } from 'lucide-react';

// Paleta editorial partilhada com BookHero e CursosHero.
const BG = '#1a1f18';
const CREAM = '#f0e8d0';
const GOLD = '#c4a44a';

const cursos = [
  {
    icon: GraduationCap,
    name: 'GrowKind TA',
    subtitle: 'Para Profissionais',
    description:
      'Formação dirigida a educadores, teaching assistants e profissionais de apoio educativo. Compreender o Relational Development Framework — a lente, os princípios, os movimentos — com profundidade teórica e aplicação guiada.',
  },
  {
    icon: Users,
    name: 'GrowKind Famílias',
    subtitle: 'Para famílias',
    description:
      'Acompanhar uma criança neurodivergente no dia-a-dia. Ferramentas práticas, casos reais e espaço para perguntas. Um percurso pensado para quem vive o desenvolvimento de dentro.',
  },
];

export default function CursosEmBreve() {
  return (
    <section className='py-20 md:py-28' style={{ backgroundColor: BG }}>
      <div className='content-width'>
        {/* Anúncio "em preparação" */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className='mx-auto mb-16 max-w-3xl text-center md:mb-20'
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
            Em preparação
          </div>

          <h2
            className='mb-6 font-[family-name:var(--font-display)] text-3xl leading-tight md:text-4xl lg:text-5xl'
            style={{ color: CREAM }}
          >
            Os primeiros cursos estão a nascer.
          </h2>

          <div className='space-y-5 text-[17px] leading-[1.75] md:text-[18px]'>
            <p style={{ color: 'rgba(240,232,208,0.72)' }}>
              O livro <em>Onde o Mundo Nasce Entre Nós</em> abriu uma porta. Os
              cursos são o lugar onde o que ficou em aberto ganha aplicação —
              com tempo, com prática, com o mesmo rigor e cuidado que nos trouxe
              até aqui.
            </p>
            <p style={{ color: 'rgba(240,232,208,0.72)' }}>
              Estamos a construí-los com o mesmo cuidado que nos levou a tudo o
              resto. Não são treinos rápidos nem receitas. São percursos
              guiados, feitos para serem vividos por dentro.
            </p>
          </div>
        </motion.div>

        {/* Os dois cursos — grid 2 colunas */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className='mx-auto mb-20 grid max-w-5xl gap-6 md:grid-cols-2 md:gap-8'
        >
          {cursos.map((curso, idx) => (
            <motion.article
              key={curso.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className='flex flex-col rounded-2xl border p-8 md:p-10'
              style={{
                backgroundColor: 'rgba(240,232,208,0.03)',
                borderColor: 'rgba(196, 164, 74, 0.18)',
              }}
            >
              <div
                className='mb-6 flex h-12 w-12 items-center justify-center rounded-xl'
                style={{ backgroundColor: 'rgba(196, 164, 74, 0.12)' }}
              >
                <curso.icon
                  size={22}
                  strokeWidth={1.6}
                  style={{ color: GOLD }}
                />
              </div>

              <p
                className='mb-2 text-[11px] font-medium uppercase tracking-[0.14em]'
                style={{ color: GOLD }}
              >
                {curso.subtitle}
              </p>

              <h3
                className='mb-4 font-[family-name:var(--font-display)] text-2xl leading-tight md:text-3xl'
                style={{ color: CREAM }}
              >
                {curso.name}
              </h3>

              <p
                className='text-[15px] leading-relaxed md:text-base'
                style={{ color: 'rgba(240,232,208,0.65)' }}
              >
                {curso.description}
              </p>
            </motion.article>
          ))}
        </motion.div>

        {/* Ponte — enquanto não há cursos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className='mx-auto max-w-3xl rounded-3xl p-10 text-center md:p-14'
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
            Começa pelo livro.
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
