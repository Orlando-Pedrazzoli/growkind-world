'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { X, Loader2 } from 'lucide-react';

export default function CancelOrderButton({ id }: { id: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [confirming, setConfirming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCancel() {
    setError(null);
    try {
      const res = await fetch('/api/admin/orders/cancel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || 'Erro ao cancelar.');
        setConfirming(false);
        return;
      }
      // Recarrega os dados do server component (atualiza a tabela)
      startTransition(() => router.refresh());
      setConfirming(false);
    } catch {
      setError('Erro de rede.');
      setConfirming(false);
    }
  }

  if (confirming) {
    return (
      <div className='flex items-center gap-2'>
        <button
          onClick={handleCancel}
          disabled={isPending}
          className='inline-flex items-center gap-1 rounded-md bg-red-600 px-2.5 py-1 text-[12px] font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-60'
        >
          {isPending && <Loader2 size={12} className='animate-spin' />}
          {isPending ? 'A cancelar…' : 'Confirmar'}
        </button>
        <button
          onClick={() => setConfirming(false)}
          disabled={isPending}
          className='rounded-md px-2 py-1 text-[12px] text-[var(--color-gk-cinza)] hover:text-[var(--color-gk-black)]'
        >
          Não
        </button>
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={() => setConfirming(true)}
        className='inline-flex items-center gap-1 rounded-md border border-red-200 px-2.5 py-1 text-[12px] font-medium text-red-600 transition-colors hover:bg-red-50'
      >
        <X size={12} />
        Cancelar
      </button>
      {error && <p className='mt-1 text-[11px] text-red-600'>{error}</p>}
    </div>
  );
}
