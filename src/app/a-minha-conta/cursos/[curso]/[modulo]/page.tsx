// src/app/a-minha-conta/cursos/[curso]/[modulo]/page.tsx

import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { auth } from '@/lib/auth';
import { connectDB } from '@/lib/db';
import Purchase from '@/models/Purchase';
import { cursos } from '@/lib/data/cursos';

export const metadata: Metadata = {
  title: 'Módulo do curso',
  robots: { index: false, follow: false },
};

interface PageProps {
  params: Promise<{ curso: string; modulo: string }>;
}

const VALID_CURSOS = ['profissionais', 'familias'] as const;
const VALID_MODULOS = ['m1', 'm2', 'm3', 'm4'] as const;

type CursoSlug = (typeof VALID_CURSOS)[number];
type ModuloSlug = (typeof VALID_MODULOS)[number];

const PRODUCT_BY_CURSO: Record<CursoSlug, 'curso-prof' | 'curso-fam'> = {
  profissionais: 'curso-prof',
  familias: 'curso-fam',
};

export default async function ModuloViewerPage({ params }: PageProps) {
  const { curso, modulo } = await params;

  // Validar params
  if (!VALID_CURSOS.includes(curso as CursoSlug)) notFound();
  if (!VALID_MODULOS.includes(modulo as ModuloSlug)) notFound();

  const cursoSlug = curso as CursoSlug;
  const moduloSlug = modulo as ModuloSlug;

  // Validar utilizador
  const session = await auth();
  if (!session?.user?.email) {
    redirect(`/login?next=/a-minha-conta/cursos/${cursoSlug}/${moduloSlug}`);
  }

  const cursoData = cursos[cursoSlug];
  const moduloData = cursoData.modulos.find(m => m.slug === moduloSlug);
  if (!moduloData) notFound();

  // Se M1 (gratuito), apenas redirecionar para o HTML público
  if (moduloData.gratuito) {
    redirect(moduloData.htmlPath);
  }

  // Verificar se utilizador comprou este curso
  await connectDB();
  const purchase = await Purchase.findOne({
    userEmail: session!.user!.email!.toLowerCase(),
    product: PRODUCT_BY_CURSO[cursoSlug],
    status: 'completed',
  });

  if (!purchase) {
    // Não comprou — redirecionar para a página de compra
    redirect(`/cursos/${cursoSlug}`);
  }

  // OK — servir o módulo via iframe (que aponta para a rota protegida)
  return (
    <section className='section-padding'>
      <div className='content-width-wide'>
        {/* Voltar */}
        <Link
          href='/a-minha-conta/cursos'
          className='inline-flex items-center gap-2 text-[13px] uppercase tracking-[0.08em] text-[var(--color-gk-cinza)] transition-colors hover:text-[var(--color-gk-green-dark)]'
        >
          <ArrowLeft size={16} strokeWidth={1.5} />
          Os meus cursos
        </Link>

        {/* Header */}
        <div className='mb-8 mt-6'>
          <span className='eyebrow' style={{ color: cursoData.accentColor }}>
            {cursoData.nome} · Módulo {moduloData.numero}
          </span>
          <h1 className='mt-4'>{moduloData.titulo}</h1>
        </div>

        {/* Iframe a apontar para a rota protegida */}
        <div
          className='w-full overflow-hidden border border-[var(--color-gk-green-dark)]/8'
          style={{ height: 'calc(100vh - 200px)', minHeight: '600px' }}
        >
          <iframe
            src={`/api/curso/${cursoSlug}/${moduloSlug}`}
            title={`${cursoData.nome} — ${moduloData.titulo}`}
            className='h-full w-full border-0'
            sandbox='allow-scripts allow-same-origin allow-popups'
          />
        </div>
      </div>
    </section>
  );
}
