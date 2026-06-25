'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Check } from 'lucide-react';

type Product = 'ebook' | 'curso-prof' | 'curso-fam';

const LABELS: Record<Product, string> = {
  ebook: 'eBook — Onde o Mundo Nasce Entre Nós',
  'curso-prof': 'Curso para Profissionais (GrowKind TA)',
  'curso-fam': 'Curso para Famílias',
};

const ORDER: Product[] = ['ebook', 'curso-prof', 'curso-fam'];

export default function PriceEditor({
  initial,
}: {
  initial: Record<Product, number>; // cêntimos
}) {
  const router = useRouter();
  const [, startTransition] = useTransition();

  // valores em euros (string editável)
  const [values, setValues] = useState<Record<Product, string>>(() => ({
    ebook: (initial.ebook / 100).toFixed(2),
    'curso-prof': (initial['curso-prof'] / 100).toFixed(2),
    'curso-fam': (initial['curso-fam'] / 100).toFixed(2),
  }));
  const [saving, setSaving] = useState<Product | null>(null);
  const [feedback, setFeedback] = useState<{
    product: Product;
    type: 'ok' | 'err';
    text: string;
  } | null>(null);

  async function save(product: Product) {
    setFeedback(null);
    const euros = parseFloat(values[product].replace(',', '.'));
    if (isNaN(euros) || euros <= 0) {
      setFeedback({ product, type: 'err', text: 'Valor inválido.' });
      return;
    }
    const amount = Math.round(euros * 100); // cêntimos

    setSaving(product);
    try {
      const res = await fetch('/api/admin/prices', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product, amount }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setFeedback({
          product,
          type: 'err',
          text: data.error || 'Erro ao guardar.',
        });
      } else {
        setValues(v => ({ ...v, [product]: (amount / 100).toFixed(2) }));
        setFeedback({ product, type: 'ok', text: 'Preço atualizado.' });
        startTransition(() => router.refresh());
      }
    } catch {
      setFeedback({ product, type: 'err', text: 'Erro de rede.' });
    } finally {
      setSaving(null);
    }
  }

  return (
    <div className='space-y-4'>
      {ORDER.map(product => (
        <div
          key={product}
          className='border border-[var(--color-gk-green-dark)]/8 bg-white p-6'
        >
          <div className='flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between'>
            <div className='flex-1'>
              <p className='text-[14px] font-medium text-[var(--color-gk-black)]'>
                {LABELS[product]}
              </p>
              <p className='mt-1 text-[12px] text-[var(--color-gk-cinza)]'>
                Preço cobrado no checkout (Stripe).
              </p>
            </div>

            <div className='flex items-end gap-3'>
              <div>
                <label className='mb-1 block text-[11px] font-medium uppercase tracking-[0.1em] text-[var(--color-gk-cinza)]'>
                  Preço (€)
                </label>
                <div className='flex items-center'>
                  <span className='border border-r-0 border-[var(--color-gk-green-dark)]/15 bg-[var(--color-gk-creme)] px-3 py-2 text-[14px] text-[var(--color-gk-cinza)]'>
                    €
                  </span>
                  <input
                    type='number'
                    min='0'
                    step='0.01'
                    inputMode='decimal'
                    value={values[product]}
                    onChange={e =>
                      setValues(v => ({ ...v, [product]: e.target.value }))
                    }
                    className='w-28 border border-[var(--color-gk-green-dark)]/15 px-3 py-2 text-[14px] text-[var(--color-gk-black)] outline-none focus:border-[var(--color-gk-green-dark)]/40'
                  />
                </div>
              </div>

              <button
                onClick={() => save(product)}
                disabled={saving === product}
                className='inline-flex items-center gap-2 bg-[var(--color-gk-green-dark)] px-4 py-2 text-[13px] font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-60'
              >
                {saving === product ? (
                  <Loader2 size={14} className='animate-spin' />
                ) : (
                  <Check size={14} />
                )}
                Guardar
              </button>
            </div>
          </div>

          {feedback?.product === product && (
            <p
              className={`mt-3 text-[12px] ${
                feedback.type === 'ok'
                  ? 'text-[var(--color-gk-green-dark)]'
                  : 'text-red-600'
              }`}
            >
              {feedback.text}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
