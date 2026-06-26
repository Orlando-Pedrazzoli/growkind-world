// src/app/[locale]/a-minha-conta/cursos/[curso]/[modulo]/page.tsx
import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { getTranslations, getMessages } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { auth } from '@/lib/auth';
import { hasAccess } from '@/lib/access';
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

  if (!VALID_CURSOS.includes(curso as CursoSlug)) notFound();
  if (!VALID_MODULOS.includes(modulo as ModuloSlug)) notFound();

  const cursoSlug = curso as CursoSlug;
  const moduloSlug = modulo as ModuloSlug;

  // 1) LOGIN OBRIGATÓRIO
  const session = await auth();
  if (!session?.user?.email) {
    redirect(`/login?next=/a-minha-conta/cursos/${cursoSlug}/${moduloSlug}`);
  }

  const cursoData = cursos[cursoSlug];
  const moduloData = cursoData.modulos.find(m => m.slug === moduloSlug);
  if (!moduloData) notFound();

  // 2) M1 GRATUITO
  if (moduloData.gratuito) {
    redirect(moduloData.htmlPath);
  }

  // 3) MÓDULOS PAGOS (M2-M4)
  const allowed = await hasAccess(
    session!.user!.email!,
    PRODUCT_BY_CURSO[cursoSlug],
  );
  if (!allowed) {
    redirect(`/cursos/${cursoSlug}`);
  }

  // Textos traduzidos
  const t = await getTranslations('account');
  const messages = (await getMessages()) as unknown as {
    courses: {
      items: Record<
        string,
        {
          cardName: { prefix: string; emphasis: string };
          modulos: Record<string, { titulo: string }>;
        }
      >;
    };
  };
  const cursoItemI18n = messages.courses.items[cursoSlug];
  const cursoNomeI18n = `${cursoItemI18n.cardName.prefix} ${cursoItemI18n.cardName.emphasis}`;
  const tituloModulo = cursoItemI18n.modulos[moduloSlug].titulo;

  return (
    <section className='section-padding'>
      <div className='content-width-wide'>
        {/* Voltar */}
        <Link
          href='/a-minha-conta/cursos'
          className='inline-flex items-center gap-2 text-[13px] uppercase tracking-[0.08em] text-[var(--color-gk-cinza)] transition-colors hover:text-[var(--color-gk-green-dark)]'
        >
          <ArrowLeft size={16} strokeWidth={1.5} />
          {t('courses.title')}
        </Link>

        {/* Header */}
        <div className='mb-8 mt-6'>
          <span className='eyebrow' style={{ color: cursoData.accentColor }}>
            {cursoNomeI18n} ·{' '}
            {t('courses.moduleLabel', {
              num: String(moduloData.numero).padStart(2, '0'),
            })}
          </span>
          <h1 className='mt-4'>{tituloModulo}</h1>
        </div>

        {/* Iframe */}
        <div
          className='w-full overflow-hidden border border-[var(--color-gk-green-dark)]/8'
          style={{ height: 'calc(100vh - 200px)', minHeight: '600px' }}
        >
          <iframe
            src={`/api/curso/${cursoSlug}/${moduloSlug}`}
            title={`${cursoNomeI18n} — ${tituloModulo}`}
            className='h-full w-full border-0'
            sandbox='allow-scripts allow-same-origin allow-popups allow-forms'
          />
        </div>
      </div>
    </section>
  );
}
