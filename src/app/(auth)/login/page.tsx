import type { Metadata } from 'next';
import LoginForm from '@/components/auth/LoginForm';

export const metadata: Metadata = {
  title: 'Entrar',
  description: 'Entra na tua conta GrowKind World.',
};

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

        <LoginForm />
      </div>
    </section>
  );
}
