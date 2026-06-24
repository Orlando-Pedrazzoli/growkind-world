// src/app/[locale]/admin/pedidos/page.tsx
import { connectDB } from '@/lib/db';
import Purchase from '@/models/Purchase';
import User from '@/models/User';
import { productLabel, formatMoney } from '@/lib/products';
import CancelOrderButton from '@/components/admin/CancelOrderButton';
import { Receipt, AlertTriangle } from 'lucide-react';

// Pendentes acima deste tempo são considerados "presos" (padrão da indústria: 24h)
const STALE_HOURS = 24;

const STATUS_STYLE: Record<string, { label: string; cls: string }> = {
  completed: {
    label: 'Pago',
    cls: 'bg-[var(--color-gk-green-light)]/40 text-[var(--color-gk-green-dark)]',
  },
  pending: {
    label: 'Pendente',
    cls: 'bg-[var(--color-gk-ocre)]/10 text-[var(--color-gk-ocre)]',
  },
  failed: { label: 'Falhou', cls: 'bg-red-50 text-red-700' },
  refunded: { label: 'Reembolsado', cls: 'bg-gray-100 text-gray-600' },
  cancelled: { label: 'Cancelado', cls: 'bg-gray-100 text-gray-500' },
};

function hoursSince(date: Date): number {
  return (Date.now() - new Date(date).getTime()) / 3_600_000;
}

function timeAgo(date: Date): string {
  const h = hoursSince(date);
  if (h >= 24) {
    const d = Math.floor(h / 24);
    return `há ${d} dia${d > 1 ? 's' : ''}`;
  }
  if (h >= 1) return `há ${Math.floor(h)} h`;
  const m = Math.max(1, Math.floor(h * 60));
  return `há ${m} min`;
}

export default async function AdminPedidosPage() {
  await connectDB();

  const purchases = await Purchase.find().sort({ createdAt: -1 }).lean();

  const emails = [...new Set(purchases.map(p => p.userEmail))];
  const users = await User.find({ email: { $in: emails } })
    .select('name email')
    .lean();
  const nameByEmail = new Map(users.map(u => [u.email, u.name]));

  const completed = purchases.filter(p => p.status === 'completed');
  const revenue = completed.reduce((sum, p) => sum + (p.amount || 0), 0);
  const pending = purchases.filter(p => p.status === 'pending');
  const stalePending = pending.filter(
    p => hoursSince(p.createdAt) >= STALE_HOURS,
  );

  const stats = [
    { label: 'Receita', value: formatMoney(revenue) },
    { label: 'Vendas', value: String(completed.length) },
    { label: 'Pendentes', value: String(pending.length) },
    { label: 'Total pedidos', value: String(purchases.length) },
  ];

  return (
    <div>
      {/* Header */}
      <div className='mb-8'>
        <span className='eyebrow'>Gestão</span>
        <h1 className='mt-3 text-[clamp(1.5rem,2.5vw,2rem)]'>Pedidos</h1>
      </div>

      {/* Stats resumo */}
      <div className='mb-6 grid gap-4 sm:grid-cols-4'>
        {stats.map(stat => (
          <div
            key={stat.label}
            className='border border-[var(--color-gk-green-dark)]/8 bg-white px-5 py-4'
          >
            <p className='text-[11px] font-medium uppercase tracking-[0.1em] text-[var(--color-gk-cinza)]'>
              {stat.label}
            </p>
            <p className='mt-1 font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--color-gk-green-dark)]'>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Aviso: pendentes presos há demasiado tempo */}
      {stalePending.length > 0 && (
        <div className='mb-6 flex items-start gap-3 border border-[var(--color-gk-ocre)]/30 bg-[var(--color-gk-ocre)]/[0.06] px-4 py-3'>
          <AlertTriangle
            size={18}
            strokeWidth={1.8}
            className='mt-0.5 flex-shrink-0 text-[var(--color-gk-ocre)]'
          />
          <p className='text-[13px] leading-relaxed text-[var(--color-gk-black)]/75'>
            <strong>{stalePending.length}</strong> pedido
            {stalePending.length > 1 ? 's' : ''} pendente
            {stalePending.length > 1 ? 's' : ''} há mais de {STALE_HOURS}h sem
            pagamento. Considera cancelá-
            {stalePending.length > 1 ? 'los' : 'lo'} para manter os registos
            limpos.
          </p>
        </div>
      )}

      {/* Tabela */}
      {purchases.length === 0 ? (
        <div className='flex flex-col items-center border border-[var(--color-gk-green-dark)]/8 bg-white px-6 py-16 text-center'>
          <Receipt
            size={32}
            strokeWidth={1.5}
            className='text-[var(--color-gk-cinza)] opacity-40'
          />
          <p className='mt-4 text-[15px] text-[var(--color-gk-cinza)]'>
            Ainda não há pedidos.
          </p>
        </div>
      ) : (
        <div className='overflow-x-auto border border-[var(--color-gk-green-dark)]/8 bg-white'>
          <table className='w-full text-left'>
            <thead>
              <tr className='border-b border-[var(--color-gk-green-dark)]/10'>
                {['Cliente', 'Produto', 'Valor', 'Estado', 'Data', 'Ações'].map(
                  h => (
                    <th
                      key={h}
                      className='px-5 py-4 text-[11px] font-medium uppercase tracking-[0.1em] text-[var(--color-gk-cinza)]'
                    >
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {purchases.map(p => {
                const st = STATUS_STYLE[p.status] ?? {
                  label: p.status,
                  cls: 'bg-gray-100 text-gray-600',
                };
                const isPending = p.status === 'pending';
                const stale =
                  isPending && hoursSince(p.createdAt) >= STALE_HOURS;

                return (
                  <tr
                    key={String(p._id)}
                    className='border-b border-[var(--color-gk-green-dark)]/5 transition-colors hover:bg-[var(--color-gk-creme)]/30'
                  >
                    <td className='px-5 py-4'>
                      <p className='text-[14px] font-medium text-[var(--color-gk-black)]'>
                        {nameByEmail.get(p.userEmail) || '—'}
                      </p>
                      <p className='text-[12px] text-[var(--color-gk-cinza)]'>
                        {p.userEmail}
                      </p>
                    </td>
                    <td className='px-5 py-4 text-[14px] text-[var(--color-gk-cinza)]'>
                      {productLabel(p.product)}
                    </td>
                    <td className='px-5 py-4 text-[14px] font-medium text-[var(--color-gk-black)]'>
                      {formatMoney(p.amount, p.currency)}
                    </td>
                    <td className='px-5 py-4'>
                      <span
                        className={`inline-block px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider ${st.cls}`}
                      >
                        {st.label}
                      </span>
                      {isPending && (
                        <p
                          className={`mt-1 text-[11px] ${
                            stale
                              ? 'font-medium text-[var(--color-gk-ocre)]'
                              : 'text-[var(--color-gk-cinza)]'
                          }`}
                        >
                          {timeAgo(p.createdAt)}
                          {stale && ' ⚠'}
                        </p>
                      )}
                    </td>
                    <td className='px-5 py-4 text-[13px] text-[var(--color-gk-cinza)]'>
                      {new Date(p.createdAt).toLocaleDateString('pt-PT', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </td>
                    <td className='px-5 py-4'>
                      {isPending ? (
                        <CancelOrderButton id={String(p._id)} />
                      ) : (
                        <span className='text-[13px] text-[var(--color-gk-cinza)]/50'>
                          —
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
