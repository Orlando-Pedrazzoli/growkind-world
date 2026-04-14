import type { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, ArrowLeft } from 'lucide-react';
import { auth } from '@/lib/auth';
import { connectDB } from '@/lib/db';
import Purchase from '@/models/Purchase';

export const metadata: Metadata = {
  title: 'O meu livro',
  robots: { index: false, follow: false },
};

async function hasBookAccess(email: string): Promise<boolean> {
  await connectDB();
  const purchase = await Purchase.findOne({
    userEmail: email.toLowerCase(),
    product: 'ebook',
    status: 'completed',
  });
  return !!purchase;
}

export default async function MyBookPage() {
  const session = await auth();

  if (!session?.user?.email) {
    return null; // layout.tsx já redirige se !session
  }

  const hasAccess = await hasBookAccess(session.user.email);

  if (!hasAccess) {
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
            <span className='eyebrow'>Leitura</span>
            <h1 className='mt-4'>O meu livro</h1>
          </div>

          {/* Sem acesso */}
          <div className='flex flex-col items-center border border-[var(--color-gk-green-dark)]/8 bg-white px-6 py-16 text-center md:py-24'>
            <div
              className='flex h-16 w-16 items-center justify-center'
              style={{ backgroundColor: 'rgba(232,148,58,0.1)' }}
            >
              <BookOpen
                size={32}
                strokeWidth={1.5}
                style={{ color: 'var(--color-gk-ocre)' }}
              />
            </div>

            <h2 className='mt-8 text-[clamp(1.25rem,2.5vw,1.75rem)]'>
              Ainda nao tens acesso ao livro
            </h2>

            <p className='mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-[var(--color-gk-cinza)]'>
              Adquire o eBook para ler directamente aqui, capitulo a capitulo.
            </p>

            <Link href='/comprar/ebook' className='btn-primary mt-8'>
              Comprar eBook — €12
            </Link>
          </div>
        </div>
      </section>
    );
  }

  // Com acesso — servir o livro
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
        <div className='mb-8 mt-6'>
          <span className='eyebrow'>Leitura</span>
          <h1 className='mt-4'>Onde o Mundo Nasce Entre Nos</h1>
        </div>

        {/* Livro em iframe */}
        <div
          className='w-full overflow-hidden border border-[var(--color-gk-green-dark)]/8'
          style={{ height: 'calc(100vh - 200px)', minHeight: '600px' }}
        >
          <iframe
            src='/content/book.html'
            title='Onde o Mundo Nasce Entre Nos — eBook'
            className='h-full w-full border-0'
            sandbox='allow-scripts allow-same-origin'
          />
        </div>
      </div>
    </section>
  );
}
