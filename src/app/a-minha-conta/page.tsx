import type { Metadata } from 'next';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { GraduationCap, BookOpen, User, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'A minha conta',
  robots: { index: false, follow: false },
};

export default async function AccountPage() {
  const session = await auth();

  if (!session) redirect('/login');

  const quickLinks = [
    {
      title: 'Os meus cursos',
      description: 'Acede aos cursos em que estás inscrito.',
      href: '/a-minha-conta/cursos',
      icon: GraduationCap,
      color: 'var(--color-rdf-m2)',
    },
    {
      title: 'O meu livro',
      description: 'Lê o livro directamente na plataforma.',
      href: '/a-minha-conta/livro',
      icon: BookOpen,
      color: 'var(--color-gk-ocre)',
    },
  ];

  return (
    <section className='section-padding'>
      <div className='content-width-wide'>
        {/* Header */}
        <div className='mb-12'>
          <span className='eyebrow'>Área pessoal</span>
          <h1 className='mt-4'>A minha conta</h1>
        </div>

        {/* User info card */}
        <div className='border border-[var(--color-gk-green-dark)]/8 bg-white p-6 md:p-8'>
          <div className='flex items-center gap-5'>
            <div className='flex h-14 w-14 items-center justify-center bg-[var(--color-gk-green-dark)] text-[18px] font-semibold tracking-wider text-white'>
              {session.user.name
                ?.split(' ')
                .map(n => n[0])
                .join('')
                .slice(0, 2)
                .toUpperCase()}
            </div>
            <div>
              <h3 className='text-[clamp(1.125rem,2vw,1.375rem)]'>
                {session.user.name}
              </h3>
              <p className='mt-1 text-[14px] text-[var(--color-gk-cinza)]'>
                {session.user.email}
              </p>
            </div>
          </div>
        </div>

        {/* Quick links */}
        <div className='mt-8 grid gap-4 sm:grid-cols-2'>
          {quickLinks.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className='group flex items-start gap-5 border border-[var(--color-gk-green-dark)]/8 bg-white p-6 transition-all duration-300 hover:border-[var(--color-gk-green-dark)]/20 hover:shadow-sm md:p-8'
            >
              <div
                className='flex h-12 w-12 flex-shrink-0 items-center justify-center'
                style={{ backgroundColor: item.color, opacity: 0.12 }}
              >
                <item.icon
                  size={24}
                  strokeWidth={1.5}
                  style={{ color: item.color }}
                />
              </div>
              <div className='flex-1'>
                <h3 className='text-[clamp(1rem,1.8vw,1.25rem)]'>
                  {item.title}
                </h3>
                <p className='mt-1 text-[14px] leading-relaxed text-[var(--color-gk-cinza)]'>
                  {item.description}
                </p>
              </div>
              <ArrowRight
                size={20}
                strokeWidth={1.5}
                className='mt-1 flex-shrink-0 text-[var(--color-gk-cinza)] opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100'
              />
            </Link>
          ))}
        </div>

        {/* Account details */}
        <div className='mt-8 border border-[var(--color-gk-green-dark)]/8 bg-white p-6 md:p-8'>
          <h3 className='text-[clamp(1rem,1.8vw,1.25rem)]'>Dados da conta</h3>
          <div className='mt-6 space-y-4'>
            <div className='flex items-center justify-between border-b border-[var(--color-gk-green-dark)]/5 pb-4'>
              <div>
                <p className='text-[12px] font-medium uppercase tracking-[0.1em] text-[var(--color-gk-cinza)]'>
                  Nome
                </p>
                <p className='mt-1 text-[15px] text-[var(--color-gk-black)]'>
                  {session.user.name}
                </p>
              </div>
            </div>
            <div className='flex items-center justify-between border-b border-[var(--color-gk-green-dark)]/5 pb-4'>
              <div>
                <p className='text-[12px] font-medium uppercase tracking-[0.1em] text-[var(--color-gk-cinza)]'>
                  Email
                </p>
                <p className='mt-1 text-[15px] text-[var(--color-gk-black)]'>
                  {session.user.email}
                </p>
              </div>
            </div>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-[12px] font-medium uppercase tracking-[0.1em] text-[var(--color-gk-cinza)]'>
                  Membro desde
                </p>
                <p className='mt-1 text-[15px] text-[var(--color-gk-black)]'>
                  {new Date().toLocaleDateString('pt-PT', {
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
