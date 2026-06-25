// src/app/[locale]/admin/precos/page.tsx
import { getPricesMap } from '@/lib/prices';
import PriceEditor from '@/components/admin/PriceEditor';

export default async function AdminPrecosPage() {
  const prices = await getPricesMap();

  return (
    <div>
      <div className='mb-8'>
        <span className='eyebrow'>Gestão</span>
        <h1 className='mt-3 text-[clamp(1.5rem,2.5vw,2rem)]'>Preços</h1>
        <p className='mt-2 text-[15px] text-[var(--color-gk-cinza)]'>
          Define o preço cobrado por cada produto. Aplica-se a compras futuras —
          as já efetuadas mantêm o valor pago.
        </p>
      </div>

      <PriceEditor initial={prices} />
    </div>
  );
}
