'use client';

import { useEffect, useState, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function ComprarEbookPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [error, setError] = useState('');
  // Evita criar duplicate checkout sessions em React Strict Mode
  // (em dev, o useEffect corre 2x; sem este guard criar-se-iam 2 sessões Stripe)
  const triggered = useRef(false);

  useEffect(() => {
    if (status === 'loading') return;

    // Sem sessão → mandar para login com retorno correto a esta página.
    // O nosso LoginForm usa o parâmetro `next` (não `callbackUrl`).
    if (!session) {
      router.push('/login?next=/comprar/ebook');
      return;
    }

    if (triggered.current) return;
    triggered.current = true;

    const createCheckout = async () => {
      try {
        const res = await fetch('/api/checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          // Body explícito — não confiar no fallback do servidor.
          body: JSON.stringify({ product: 'ebook' }),
        });
        const data = await res.json();

        if (!res.ok) {
          if (data.redirect) {
            // Já tem o livro: redirecionar para o leitor
            router.push(data.redirect);
            return;
          }
          setError(data.error || 'Erro ao processar pagamento.');
          return;
        }

        if (!data.url) {
          setError('Resposta inválida do servidor de pagamento.');
          return;
        }

        // Redirecionar para Stripe Checkout
        window.location.href = data.url;
      } catch {
        setError('Erro de ligação. Verifica a tua internet e tenta novamente.');
      }
    };

    createCheckout();
  }, [session, status, router]);

  return (
    <main
      className='flex min-h-screen items-center justify-center px-6'
      style={{ backgroundColor: 'var(--color-gk-creme)' }}
    >
      <div className='text-center' style={{ maxWidth: 'var(--width-content)' }}>
        {!error ? (
          <>
            {/* Spinner subtil */}
            <div className='mx-auto mb-8 flex justify-center'>
              <div
                className='h-10 w-10 animate-spin rounded-full border-2 border-solid'
                style={{
                  borderColor: 'rgba(26, 92, 42, 0.15)',
                  borderTopColor: 'var(--color-gk-green-dark)',
                }}
                aria-label='A preparar o pagamento'
              />
            </div>

            <p
              className='text-lg'
              style={{
                fontFamily: 'var(--font-body)',
                color: 'var(--color-gk-black)',
              }}
            >
              A preparar o pagamento...
            </p>
            <p
              className='mt-2 text-sm'
              style={{ color: 'var(--color-gk-cinza)' }}
            >
              Vais ser redirecionado para o Stripe.
            </p>
          </>
        ) : (
          <>
            <p
              className='text-lg'
              style={{
                fontFamily: 'var(--font-body)',
                color: 'var(--color-gk-black)',
              }}
            >
              {error}
            </p>
            <button
              onClick={() => router.push('/o-livro')}
              className='btn-ghost mt-6'
            >
              Voltar ao livro
            </button>
          </>
        )}
      </div>
    </main>
  );
}
