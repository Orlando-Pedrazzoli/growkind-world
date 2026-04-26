// src/app/a-minha-conta/cursos/page.tsx

import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, GraduationCap, Users, ArrowUpRight } from 'lucide-react';
import { auth } from '@/lib/auth';
import { connectDB } from '@/lib/db';
import Purchase from '@/models/Purchase';
import { todosOsCursos } from '@/lib/data/cursos';

export const metadata: Metadata = {
  title: 'Os meus cursos',
  robots: { index: false, follow: false },
};

async function getOwnedProductKeys(email: string): Promise<Set<string>> {
  await connectDB();
  const purchases = await Purchase.find({
    userEmail: email.toLowerCase(),
    product: { $in: ['curso-prof', 'curso-fam'] },
    status: 'completed',
  }).select('product');
  return new Set(purchases.map(p => p.product));
}

export default async function MyCoursesPage() {
  const session = await auth();

  if (!session?.user?.email) {
    return null;
  }

  const ownedKeys = await getOwnedProductKeys(session.user.email);
  const meusCursos = todosOsCursos.filter(c => ownedKeys.has(c.productKey));

  return (
    <section className='section-padding'>
      <div className='content-width-wide'>
        {/* Voltar */}
        <Link
          href='/a-minha-conta'
          className='inline-flex items-center gap-2 text-[13px] uppercase tracking-[0.08em] text-[var(--color-gk-cinza)] transition-colors hover:text-[var(--color-gk-green-dark)]'
        >
          <ArrowLeft size={16} strokeWidth={1.5} />A minha conta
        </Link>

        {/* Header */}
        <div className='mb-12 mt-6'>
          <span className='eyebrow'>Formação</span>
          <h1 className='mt-4'>Os meus cursos</h1>
        </div>

        {/* Sem cursos */}
        {meusCursos.length === 0 ? (
          <div className='flex flex-col items-center border border-[var(--color-gk-green-dark)]/8 bg-white px-6 py-16 text-center md:py-24'>
            <div
              className='flex h-16 w-16 items-center justify-center'
              style={{ backgroundColor: 'rgba(232,148,58,0.1)' }}
            >
              <GraduationCap
                size={32}
                strokeWidth={1.5}
                style={{ color: 'var(--color-gk-ocre)' }}
              />
            </div>

            <h2 className='mt-8 text-[clamp(1.25rem,2.5vw,1.75rem)]'>
              Ainda não tens cursos
            </h2>

            <p className='mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-[var(--color-gk-cinza)]'>
              Explora os percursos disponíveis. O primeiro módulo de cada curso
              é gratuito.
            </p>

            <Link href='/cursos' className='btn-primary mt-8'>
              Ver cursos
            </Link>
          </div>
        ) : (
          /* Listagem */
          <div className='grid gap-6 md:grid-cols-2 md:gap-8'>
            {meusCursos.map(curso => {
              const Icon =
                curso.slug === 'profissionais' ? GraduationCap : Users;
              return (
                <article
                  key={curso.slug}
                  className='flex flex-col overflow-hidden rounded-2xl border bg-white'
                  style={{ borderColor: `${curso.accentColor}33` }}
                >
                  {/* Header com ícone + nome */}
                  <div
                    className='flex items-start gap-4 p-6 md:p-7'
                    style={{ backgroundColor: `${curso.accentColor}0d` }}
                  >
                    <div
                      className='flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl'
                      style={{ backgroundColor: `${curso.accentColor}1f` }}
                    >
                      <Icon
                        size={20}
                        strokeWidth={1.6}
                        style={{ color: curso.accentColor }}
                      />
                    </div>
                    <div>
                      <p
                        className='mb-1 text-[10px] font-medium uppercase tracking-[0.14em]'
                        style={{ color: curso.accentColor }}
                      >
                        {curso.subtitulo}
                      </p>
                      <h3
                        className='font-[family-name:var(--font-display)] text-xl leading-tight md:text-2xl'
                        style={{ color: '#1a1f18' }}
                      >
                        {curso.nome}
                      </h3>
                    </div>
                  </div>

                  {/* Lista de 4 módulos clicáveis */}
                  <div className='flex flex-1 flex-col gap-2 p-6 md:p-7'>
                    {curso.modulos.map(modulo => {
                      const numStr = String(modulo.numero).padStart(2, '0');
                      const url = modulo.gratuito
                        ? modulo.htmlPath
                        : `/a-minha-conta/cursos/${curso.slug}/${modulo.slug}`;
                      return (
                        <a
                          key={modulo.slug}
                          href={url}
                          target={modulo.gratuito ? '_blank' : undefined}
                          rel={
                            modulo.gratuito ? 'noopener noreferrer' : undefined
                          }
                          className='group flex items-center justify-between gap-3 rounded-lg px-4 py-3 transition-colors hover:bg-black/[0.02]'
                        >
                          <div className='min-w-0 flex-1'>
                            <span
                              className='text-[10px] font-medium uppercase tracking-[0.14em]'
                              style={{ color: curso.accentColor }}
                            >
                              Módulo {numStr}
                            </span>
                            <p
                              className='mt-0.5 truncate text-[14px]'
                              style={{ color: '#1a1f18' }}
                            >
                              {modulo.titulo}
                            </p>
                          </div>
                          <ArrowUpRight
                            size={16}
                            strokeWidth={1.8}
                            className='flex-shrink-0 opacity-40 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100'
                            style={{ color: curso.accentColor }}
                          />
                        </a>
                      );
                    })}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
