// src/components/cursos/CursoDetalheCTA.tsx

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShoppingBag } from 'lucide-react';

interface CursoDetalheCTAProps {
  productKey: 'curso-prof' | 'curso-fam';
  precoEur: string;
  accentColor: string;
  isLoggedIn: boolean;
  cursoSlug: 'profissionais' | 'familias';
}

export default function CursoDetalheCTA({
  productKey,
  precoEur,
  accentColor,
  isLoggedIn,
  cursoSlug,
}: CursoDetalheCTAProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    if (!isLoggedIn) {
      router.push(`/login?next=/cursos/${cursoSlug}`);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product: productKey }),
      });
      const data = await res.json();

      if (!res.ok) {
        if (data.redirect) {
          router.push(data.redirect);
          return;
        }
        alert(data.error || 'Erro ao iniciar pagamento.');
        setLoading(false);
        return;
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error('[CursoDetalheCTA]', err);
      alert('Erro ao iniciar pagamento. Tenta novamente.');
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className='inline-flex cursor-pointer items-center gap-3 rounded-full px-7 py-3.5 text-[13px] font-medium uppercase tracking-[0.1em] transition-all duration-300 hover:brightness-110 disabled:cursor-wait disabled:opacity-60'
      style={{
        backgroundColor: accentColor,
        color: '#1a1f18',
      }}
    >
      <ShoppingBag size={16} strokeWidth={2} />
      {loading
        ? 'A abrir checkout...'
        : isLoggedIn
          ? `Adquirir curso completo · ${precoEur}`
          : `Entrar para adquirir · ${precoEur}`}
    </button>
  );
}
