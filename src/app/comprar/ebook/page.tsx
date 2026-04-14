'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function ComprarEbookPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (status === 'loading') return;

    if (!session) {
      router.push('/login?callbackUrl=/comprar/ebook');
      return;
    }

    // Criar sessão de checkout
    const createCheckout = async () => {
      try {
        const res = await fetch('/api/checkout', { method: 'POST' });
        const data = await res.json();

        if (!res.ok) {
          if (data.redirect) {
            router.push(data.redirect);
            return;
          }
          setError(data.error || 'Erro ao processar pagamento.');
          setLoading(false);
          return;
        }

        // Redirecionar para Stripe Checkout
        window.location.href = data.url;
      } catch {
        setError('Erro de ligação. Tenta novamente.');
        setLoading(false);
      }
    };

    createCheckout();
  }, [session, status, router]);

  return (
    <main
      className="flex min-h-screen items-center justify-center"
      style={{ backgroundColor: 'var(--color-gk-creme)' }}
    >
      <div className="text-center" style={{ maxWidth: 'var(--width-content)' }}>
        {loading && !error ? (
          <>
            <p
              className="text-lg"
              style={{
                fontFamily: 'var(--font-body)',
                color: 'var(--color-gk-black)',
              }}
            >
              A preparar o pagamento...
            </p>
            <p
              className="mt-2 text-sm"
              style={{ color: 'var(--color-gk-cinza)' }}
            >
              Vais ser redirecionado para o Stripe.
            </p>
          </>
        ) : (
          <>
            <p
              className="text-lg"
              style={{
                fontFamily: 'var(--font-body)',
                color: 'var(--color-gk-black)',
              }}
            >
              {error}
            </p>
            <button
              onClick={() => router.push('/o-livro')}
              className="btn-ghost mt-6"
            >
              Voltar ao livro
            </button>
          </>
        )}
      </div>
    </main>
  );
}