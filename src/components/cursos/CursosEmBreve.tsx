// src/components/cursos/CursosEmBreve.tsx

'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, Users, Compass, ArrowRight } from 'lucide-react';

const pilares = [
  {
    icon: Compass,
    title: 'Fundamentos do RDF',
    description:
      'Compreender o Relational Development Framework — a lente, os princípios, os movimentos. A base para tudo o resto.',
  },
  {
    icon: Users,
    title: 'Para famílias',
    description:
      'Acompanhar uma criança neurodivergente no dia-a-dia. Ferramentas práticas, casos reais, espaço para perguntas.',
  },
  {
    icon: BookOpen,
    title: 'Para profissionais',
    description:
      'Educadores, terapeutas e clínicos. Formação com profundidade teórica e aplicação guiada.',
  },
];

export default function CursosEmBreve() {
  return (
    <section className='section-padding'>
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
              backgroundColor: 'rgba(232, 148, 58, 0.1)',
              color: 'var(--color-gk-ocre)',
            }}
          >
            <span
              className='h-1.5 w-1.5 rounded-full'
              style={{ backgroundColor: 'var(--color-gk-ocre)' }}
            />
            Em preparação
          </div>

          <h2
            className='mb-6 font-[family-name:var(--font-display)] text-3xl leading-tight md:text-4xl lg:text-5xl'
            style={{ color: 'var(--color-gk-green-dark)' }}
          >
            Os primeiros cursos estão a nascer.
          </h2>

          <div className='space-y-5 text-[17px] leading-[1.75] md:text-[18px]'>
            <p style={{ color: 'rgba(0,0,0,0.72)' }}>
              O livro <em>Onde o Mundo Nasce Entre Nós</em> abriu uma porta. Os
              cursos são o lugar onde o que ficou em aberto ganha aplicação —
              com tempo, com prática, com o João ao lado.
            </p>
            <p style={{ color: 'rgba(0,0,0,0.72)' }}>
              Estamos a construí-los com o mesmo cuidado que nos levou a tudo o
              resto. Não são treinos rápidos nem receitas. São percursos
              guiados, feitos para serem vividos por dentro.
            </p>
          </div>
        </motion.div>

        {/* Três pilares do que vem */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className='mb-20 grid gap-6 md:grid-cols-3 md:gap-8'
        >
          {pilares.map((pilar, idx) => (
            <motion.div
              key={pilar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className='rounded-2xl border p-7 md:p-8'
              style={{
                backgroundColor: 'rgba(232, 148, 58, 0.03)',
                borderColor: 'rgba(232, 148, 58, 0.15)',
              }}
            >
              <div
                className='mb-5 flex h-11 w-11 items-center justify-center rounded-xl'
                style={{ backgroundColor: 'rgba(26, 92, 42, 0.08)' }}
              >
                <pilar.icon
                  size={20}
                  strokeWidth={1.6}
                  style={{ color: 'var(--color-gk-green-dark)' }}
                />
              </div>

              <h3
                className='mb-3 font-[family-name:var(--font-display)] text-xl leading-tight md:text-2xl'
                style={{ color: 'var(--color-gk-green-dark)' }}
              >
                {pilar.title}
              </h3>

              <p
                className='text-[15px] leading-relaxed'
                style={{ color: 'rgba(0,0,0,0.68)' }}
              >
                {pilar.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Ponte — enquanto não há cursos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className='mx-auto max-w-3xl rounded-3xl p-10 text-center md:p-14'
          style={{ backgroundColor: 'var(--color-gk-green-dark)' }}
        >
          <p
            className='mb-4 text-[11px] font-medium uppercase tracking-[0.16em]'
            style={{ color: 'var(--color-gk-ocre)' }}
          >
            Entretanto
          </p>

          <h3
            className='mb-5 font-[family-name:var(--font-display)] text-2xl leading-tight md:text-3xl lg:text-4xl'
            style={{ color: '#ffffff' }}
          >
            Começa pelo livro.
          </h3>

          <p
            className='mx-auto mb-8 max-w-xl text-[15px] leading-relaxed md:text-base'
            style={{ color: 'rgba(255,255,255,0.72)' }}
          >
            Os cursos aprofundam o que o livro abre. Ler é o primeiro passo —
            mesmo que seja só por uma tarde.
          </p>

          <Link
            href='/o-livro'
            className='group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[13px] font-medium uppercase tracking-[0.1em] transition-all duration-300 hover:brightness-110'
            style={{
              backgroundColor: 'var(--color-gk-ocre)',
              color: '#ffffff',
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
