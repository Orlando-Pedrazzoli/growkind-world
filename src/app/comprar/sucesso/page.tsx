'use client';

import { Suspense } from 'react';
import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

function SucessoContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data: session, status } = useSession();
  const [verified, setVerified] = useState(false);

  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (status === 'loading') return;

    if (!session) {
      router.push('/login');
      return;
    }

    if (sessionId) {
      setVerified(true);
    }
  }, [session, status, sessionId, router]);

  if (status === 'loading' || !verified) {
    return (
      <main
        className='flex min-h-screen items-center justify-center'
        style={{ backgroundColor: 'var(--color-gk-creme)' }}
      >
        <p
          style={{
            fontFamily: 'var(--font-body)',
            color: 'var(--color-gk-cinza)',
          }}
        >
          A verificar...
        </p>
      </main>
    );
  }

  return (
    <main
      className='flex min-h-screen items-center justify-center px-6'
      style={{ backgroundColor: 'var(--color-gk-creme)' }}
    >
      <div className='text-center' style={{ maxWidth: 'var(--width-content)' }}>
        <h1
          className='text-3xl md:text-4xl mb-4'
          style={{
            fontFamily: 'var(--font-display)',
            color: 'var(--color-gk-green-dark)',
          }}
        >
          Obrigado pela tua compra
        </h1>

        <p
          className='text-lg mb-2'
          style={{
            fontFamily: 'var(--font-body)',
            color: 'var(--color-gk-black)',
          }}
        >
          O eBook &ldquo;Onde o Mundo Nasce Entre Nós&rdquo; já está disponível
          na tua conta.
        </p>

        <p className='text-sm mb-8' style={{ color: 'var(--color-gk-cinza)' }}>
          Podes aceder a qualquer momento em A minha conta &rarr; Livro.
        </p>

        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          <button
            onClick={() => router.push('/a-minha-conta/livro')}
            className='btn-primary'
          >
            Ler o livro agora
          </button>
          <button onClick={() => router.push('/')} className='btn-ghost'>
            Voltar ao início
          </button>
        </div>
      </div>
    </main>
  );
}

export default function ComprarSucessoPage() {
  return (
    <Suspense
      fallback={
        <main
          className='flex min-h-screen items-center justify-center'
          style={{ backgroundColor: 'var(--color-gk-creme)' }}
        >
          <p
            style={{
              fontFamily: 'var(--font-body)',
              color: 'var(--color-gk-cinza)',
            }}
          >
            A verificar...
          </p>
        </main>
      }
    >
      <SucessoContent />
    </Suspense>
  );
}
