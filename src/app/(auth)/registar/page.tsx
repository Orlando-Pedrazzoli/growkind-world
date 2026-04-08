import type { Metadata } from 'next';
import RegisterForm from '@/components/auth/RegisterForm';

export const metadata: Metadata = {
  title: 'Criar Conta',
  description: 'Cria a tua conta GrowKind World.',
};

export default function RegisterPage() {
  return (
    <section className='flex min-h-[calc(100vh-80px)] items-center justify-center px-6 py-12'>
      <div className='w-full max-w-[440px]'>
        {/* Header */}
        <div className='mb-10 text-center'>
          <span className='eyebrow'>Junta-te</span>
          <h1 className='mt-4 text-[clamp(1.75rem,3vw,2.25rem)]'>
            Criar conta
          </h1>
          <p className='mt-3 text-[15px] leading-relaxed text-[var(--color-gk-cinza)]'>
            Começa a tua jornada no GrowKind World.
          </p>
        </div>

        <RegisterForm />
      </div>
    </section>
  );
}
