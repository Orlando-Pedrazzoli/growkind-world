// src/components/cursos/CursoDetalhe.tsx

'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Users, GraduationCap } from 'lucide-react';
import type { Curso } from '@/lib/data/cursos';
import ModuloCard from './ModuloCard';

interface CursoDetalheProps {
  curso: Curso;
}

// Paleta — hero escuro + corpo claro
const BG_DARK = '#1a1f18';
const BG_CREAM = '#faf6ec';
const CREAM_TEXT = '#f0e8d0';
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

export default function CursoDetalhe({ curso }: CursoDetalheProps) {
  const Icon = curso.slug === 'profissionais' ? GraduationCap : Users;
  const accentTextDark = ACCENT_TEXT[curso.slug] || GOLD_DARK;

  return (
    <article>
      {/* =================================================================== */}
      {/* HERO ESCURO — para a navbar transparente continuar legível          */}
      {/* =================================================================== */}
      <header
        className='relative -mt-20 overflow-hidden px-6 pt-40 pb-20 md:-mt-24 md:px-[60px] md:pt-48 md:pb-24'
        style={{ backgroundColor: BG_DARK }}
      >
        {/* Textura sutil */}
        <div
          aria-hidden='true'
          className='absolute inset-0 opacity-[0.06]'
          style={{
            backgroundImage: `radial-gradient(circle at 20% 30%, ${curso.accentColor} 0%, transparent 55%), radial-gradient(circle at 80% 70%, ${curso.accentColor} 0%, transparent 55%)`,
          }}
        />

        <div className='relative z-10 mx-auto max-w-4xl'>
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className='mb-8'
          >
            <Link
              href='/cursos'
              className='inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.12em] transition-colors duration-200 hover:opacity-100'
              style={{ color: 'rgba(240,232,208,0.6)' }}
            >
              <ArrowLeft size={14} strokeWidth={1.8} />
              Cursos
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
          >
            <div
              className='mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl'
              style={{ backgroundColor: `${curso.accentColor}26` }}
            >
              <Icon
                size={22}
                strokeWidth={1.6}
                style={{ color: curso.accentColor }}
              />
            </div>

            <p
              className='mb-4 text-[11px] font-medium uppercase tracking-[0.16em]'
              style={{ color: curso.accentColor }}
            >
              {curso.subtitulo}
            </p>

            <h1
              className='mb-6 font-[family-name:var(--font-display)] text-4xl leading-[1.05] md:text-5xl lg:text-6xl'
              style={{ color: CREAM_TEXT }}
            >
              {curso.nome}
            </h1>

            <p
              className='mb-8 max-w-2xl text-[15px] uppercase tracking-[0.1em]'
              style={{ color: 'rgba(240,232,208,0.65)' }}
            >
              {curso.publico}
            </p>

            <div className='max-w-2xl space-y-5 text-[17px] leading-[1.75] md:text-[18px]'>
              {curso.intro.map((p, i) => (
                <p key={i} style={{ color: 'rgba(240,232,208,0.8)' }}>
                  {p}
                </p>
              ))}
            </div>
          </motion.div>
        </div>
      </header>

      {/* =================================================================== */}
      {/* CORPO CLARO — listagem de módulos                                   */}
      {/* =================================================================== */}
      <section
        className='px-6 py-20 md:px-[60px] md:py-28'
        style={{ backgroundColor: BG_CREAM }}
      >
        <div className='mx-auto max-w-4xl'>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className='mb-10 flex items-baseline justify-between border-b pb-6 md:mb-12'
            style={{ borderColor: BORDER_SUBTLE }}
          >
            <h2
              className='text-[11px] font-semibold uppercase tracking-[0.16em]'
              style={{ color: accentTextDark }}
            >
              Os quatro módulos
            </h2>
            <span className='text-[12px]' style={{ color: TEXT_MUTED }}>
              {curso.modulos.filter(m => m.gratuito).length} gratuito ·{' '}
              {curso.modulos.filter(m => !m.gratuito).length} em breve
            </span>
          </motion.div>

          <div className='flex flex-col gap-6 md:gap-8'>
            {curso.modulos.map((modulo, idx) => (
              <ModuloCard
                key={modulo.slug}
                modulo={modulo}
                accentColor={curso.accentColor}
                accentTextColor={accentTextDark}
                index={idx}
              />
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
