// src/app/(auth)/login/page.tsx

import type { Metadata } from 'next';
import { Suspense } from 'react';
import LoginForm from '@/components/auth/LoginForm';

export const metadata: Metadata = {
  title: 'Entrar',
  description: 'Entra na tua conta GrowKind World.',
};

// Pequeno fallback enquanto Suspense resolve searchParams (loading instantâneo)
function LoginFormFallback() {
  return (
    <div className='mx-auto w-full max-w-[400px]'>
      <div className='h-[56px] animate-pulse rounded border border-[var(--color-gk-green-dark)]/10 bg-white' />
      <div className='my-8 h-px bg-[var(--color-gk-green-dark)]/10' />
      <div className='space-y-4'>
        <div className='h-12 animate-pulse rounded bg-[var(--color-gk-green-dark)]/5' />
        <div className='h-12 animate-pulse rounded bg-[var(--color-gk-green-dark)]/5' />
        <div className='h-12 animate-pulse rounded bg-[var(--color-gk-green-dark)]/10' />
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <section className='flex min-h-[calc(100vh-80px)] items-center justify-center px-6 py-12'>
      <div className='w-full max-w-[440px]'>
        {/* Header */}
        <div className='mb-10 text-center'>
          <span className='eyebrow'>Bem-vindo de volta</span>
          <h1 className='mt-4 text-[clamp(1.75rem,3vw,2.25rem)]'>Entrar</h1>
          <p className='mt-3 text-[15px] leading-relaxed text-[var(--color-gk-cinza)]'>
            Acede aos teus cursos e conteúdos.
          </p>
        </div>

        <Suspense fallback={<LoginFormFallback />}>
          <LoginForm />
        </Suspense>
      </div>
    </section>
  );
}
