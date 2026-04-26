// src/app/comprar/sucesso/page.tsx

import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Check, BookOpen, GraduationCap, Users } from 'lucide-react';
import { auth } from '@/lib/auth';
import { connectDB } from '@/lib/db';
import Purchase from '@/models/Purchase';

export const metadata: Metadata = {
  title: 'Compra concluída',
  robots: { index: false, follow: false },
};

interface PageProps {
  searchParams: Promise<{ session_id?: string; product?: string }>;
}

export default async function SucessoPage({ searchParams }: PageProps) {
  const { session_id, product } = await searchParams;
  const session = await auth();

  if (!session?.user?.email) {
    redirect('/login');
  }

  // Verificar a compra (defensivo — webhook pode ainda não ter processado)
  await connectDB();
  let purchase = null;
  if (session_id) {
    purchase = await Purchase.findOne({ stripeSessionId: session_id });
  }

  // Determinar tipo de produto e CTAs apropriados
  const productType =
    product === 'curso-prof'
      ? 'curso-prof'
      : product === 'curso-fam'
        ? 'curso-fam'
        : purchase?.product || 'ebook';

  const config = {
    ebook: {
      title: 'Tens o eBook',
      message:
        'A tua compra foi confirmada. Já podes começar a ler — o livro fica disponível na tua área de cliente.',
      ctaPrimary: { label: 'Ler o livro', href: '/a-minha-conta/livro' },
      ctaSecondary: { label: 'A minha conta', href: '/a-minha-conta' },
      Icon: BookOpen,
    },
    'curso-prof': {
      title: 'Bem-vindo ao GrowKind TA',
      message:
        'A tua compra foi confirmada. Os módulos 2, 3 e 4 estão agora disponíveis na tua área de cliente. O percurso é sequencial — começa pelo módulo 2.',
      ctaPrimary: {
        label: 'Aceder ao curso',
        href: '/a-minha-conta/cursos',
      },
      ctaSecondary: { label: 'A minha conta', href: '/a-minha-conta' },
      Icon: GraduationCap,
    },
    'curso-fam': {
      title: 'Bem-vindo ao GrowKind Famílias',
      message:
        'A tua compra foi confirmada. Os módulos 2, 3 e 4 estão agora disponíveis na tua área de cliente. Cada módulo parte do que já sente — sem pressa.',
      ctaPrimary: {
        label: 'Aceder ao curso',
        href: '/a-minha-conta/cursos',
      },
      ctaSecondary: { label: 'A minha conta', href: '/a-minha-conta' },
      Icon: Users,
    },
  } as const;

  const c = config[productType as keyof typeof config];
  const isPending = purchase?.status === 'pending';

  return (
    <section className='section-padding'>
      <div className='content-width'>
        <div className='mx-auto flex max-w-2xl flex-col items-center text-center'>
          {/* Icone de check */}
          <div
            className='mb-8 flex h-20 w-20 items-center justify-center rounded-full'
            style={{
              backgroundColor: 'rgba(122, 171, 150, 0.15)',
            }}
          >
            <Check size={36} strokeWidth={2} style={{ color: '#4d7a64' }} />
          </div>

          <span className='eyebrow'>Pagamento concluído</span>
          <h1 className='mt-4'>{c.title}</h1>

          <p className='mx-auto mt-6 max-w-lg text-[16px] leading-relaxed text-[var(--color-gk-cinza)]'>
            {c.message}
          </p>

          {isPending && (
            <p
              className='mx-auto mt-4 max-w-lg rounded-lg border px-4 py-3 text-[13px] leading-relaxed'
              style={{
                color: '#8a6c1f',
                backgroundColor: 'rgba(196, 164, 74, 0.08)',
                borderColor: 'rgba(196, 164, 74, 0.25)',
              }}
            >
              A confirmação do pagamento pode demorar alguns segundos. Se o
              acesso ainda não estiver disponível, atualiza a página dentro de
              instantes.
            </p>
          )}

          <div className='mt-10 flex flex-col items-center gap-3 sm:flex-row sm:gap-5'>
            <Link href={c.ctaPrimary.href} className='btn-primary'>
              {c.ctaPrimary.label}
            </Link>
            <Link
              href={c.ctaSecondary.href}
              className='text-[13px] uppercase tracking-[0.08em] text-[var(--color-gk-cinza)] transition-colors hover:text-[var(--color-gk-green-dark)]'
            >
              {c.ctaSecondary.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
