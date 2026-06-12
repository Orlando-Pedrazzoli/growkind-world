// src/app/admin/subscribers/page.tsx

import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { ArrowLeft, Mail, TrendingUp, Calendar } from 'lucide-react';
import { auth } from '@/lib/auth';
import { connectDB } from '@/lib/db';
import EmailSubscriber from '@/models/EmailSubscriber';
import User from '@/models/User';

export const metadata: Metadata = {
  title: 'Admin · Lista de email',
  robots: { index: false, follow: false },
};

interface PageProps {
  searchParams: Promise<{
    source?: string;
    status?: string;
    page?: string;
  }>;
}

const PAGE_SIZE = 50;

export default async function AdminSubscribersPage({
  searchParams,
}: PageProps) {
  const params = await searchParams;

  // Apenas admin pode aceder
  const session = await auth();
  if (!session?.user?.email) {
    redirect('/login?next=/admin/subscribers');
  }

  await connectDB();

  // Verificar role
  const dbUser = await User.findOne({
    email: session.user.email.toLowerCase(),
  });
  if (!dbUser || dbUser.role !== 'admin') {
    redirect('/');
  }

  // Filtros
  const validSources = ['homepage', 'sobre', 'cursos', 'o-livro', 'other'];
  const filterSource = validSources.includes(params.source || '')
    ? params.source
    : undefined;

  const filterStatus =
    params.status === 'unsubscribed' ? 'unsubscribed' : 'active';

  const pageNum = Math.max(1, Number(params.page) || 1);

  // Build query
  type SubscriberQuery = {
    status?: string;
    source?: string;
  };
  const query: SubscriberQuery = { status: filterStatus };
  if (filterSource) query.source = filterSource;

  // Stats e lista (em paralelo)
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const [
    totalActive,
    totalToday,
    totalThisWeek,
    totalUnsubscribed,
    subscribers,
    pageCount,
  ] = await Promise.all([
    EmailSubscriber.countDocuments({ status: 'active' }),
    EmailSubscriber.countDocuments({
      status: 'active',
      subscribedAt: { $gte: todayStart },
    }),
    EmailSubscriber.countDocuments({
      status: 'active',
      subscribedAt: { $gte: sevenDaysAgo },
    }),
    EmailSubscriber.countDocuments({ status: 'unsubscribed' }),
    EmailSubscriber.find(query)
      .sort({ subscribedAt: -1 })
      .skip((pageNum - 1) * PAGE_SIZE)
      .limit(PAGE_SIZE)
      .lean(),
    EmailSubscriber.countDocuments(query),
  ]);

  const totalPages = Math.max(1, Math.ceil(pageCount / PAGE_SIZE));

  function buildLink(opts: {
    source?: string;
    status?: string;
    page?: number;
  }) {
    const sp = new URLSearchParams();
    const src = opts.source ?? filterSource;
    const st = opts.status ?? filterStatus;
    const p = opts.page ?? 1;
    if (src) sp.set('source', src);
    if (st && st !== 'active') sp.set('status', st);
    if (p > 1) sp.set('page', String(p));
    const qs = sp.toString();
    return `/admin/subscribers${qs ? `?${qs}` : ''}`;
  }

  return (
    <section className='section-padding'>
      <div className='content-width-wide'>
        {/* Voltar */}
        <Link
          href='/admin'
          className='inline-flex items-center gap-2 text-[13px] uppercase tracking-[0.08em] text-[var(--color-gk-cinza)] transition-colors hover:text-[var(--color-gk-green-dark)]'
        >
          <ArrowLeft size={16} strokeWidth={1.5} />
          Admin
        </Link>

        {/* Header */}
        <div className='mb-10 mt-6 flex flex-wrap items-end justify-between gap-4'>
          <div>
            <span className='eyebrow'>Lista de email</span>
            <h1 className='mt-4'>Subscritores</h1>
            <p className='mt-3 max-w-2xl text-[15px] text-[var(--color-gk-cinza)]'>
              Pessoas que se inscreveram para receber novidades sobre o livro,
              cursos e novos recursos.
            </p>
          </div>

          {/* Botão exportar CSV */}
          <a
            href='/api/admin/subscribers/export'
            download
            className='inline-flex items-center gap-2 rounded-full border border-[var(--color-gk-green-dark)]/15 px-5 py-2.5 text-[13px] font-medium uppercase tracking-[0.08em] transition-colors hover:bg-[var(--color-gk-creme)]'
          >
            Exportar CSV
          </a>
        </div>

        {/* Stats */}
        <div className='mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
          <StatsCard
            label='Total ativos'
            value={totalActive}
            icon={<Mail size={18} strokeWidth={1.6} />}
            color='#1A5C2A'
          />
          <StatsCard
            label='Hoje'
            value={totalToday}
            icon={<Calendar size={18} strokeWidth={1.6} />}
            color='#e8943a'
          />
          <StatsCard
            label='Últimos 7 dias'
            value={totalThisWeek}
            icon={<TrendingUp size={18} strokeWidth={1.6} />}
            color='#4d7a64'
          />
          <StatsCard
            label='Cancelaram'
            value={totalUnsubscribed}
            icon={<Mail size={18} strokeWidth={1.6} />}
            color='#9a8a6e'
          />
        </div>

        {/* Filtros */}
        <div className='mb-6 flex flex-wrap items-center gap-2 border-b border-[var(--color-gk-green-dark)]/8 pb-4'>
          <span className='mr-2 text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--color-gk-cinza)]'>
            Filtrar:
          </span>

          <FilterPill
            label='Ativos'
            href={buildLink({ status: 'active', source: '' })}
            active={filterStatus === 'active' && !filterSource}
          />
          <FilterPill
            label='Cancelados'
            href={buildLink({ status: 'unsubscribed', source: '' })}
            active={filterStatus === 'unsubscribed'}
          />
          <span className='mx-2 h-4 w-px bg-[var(--color-gk-green-dark)]/15' />
          <FilterPill
            label='Homepage'
            href={buildLink({ source: 'homepage' })}
            active={filterSource === 'homepage'}
          />
          <FilterPill
            label='/sobre'
            href={buildLink({ source: 'sobre' })}
            active={filterSource === 'sobre'}
          />
          <FilterPill
            label='/o-livro'
            href={buildLink({ source: 'o-livro' })}
            active={filterSource === 'o-livro'}
          />
          <FilterPill
            label='/cursos'
            href={buildLink({ source: 'cursos' })}
            active={filterSource === 'cursos'}
          />
        </div>

        {/* Tabela */}
        {subscribers.length === 0 ? (
          <div className='border border-[var(--color-gk-green-dark)]/8 bg-white px-6 py-16 text-center'>
            <p className='text-[15px] text-[var(--color-gk-cinza)]'>
              Ainda não há subscritores para os filtros aplicados.
            </p>
          </div>
        ) : (
          <div className='overflow-x-auto border border-[var(--color-gk-green-dark)]/8 bg-white'>
            <table className='min-w-full text-[13px]'>
              <thead>
                <tr className='border-b border-[var(--color-gk-green-dark)]/8 bg-[var(--color-gk-creme)]/40'>
                  <Th>Email</Th>
                  <Th>Origem</Th>
                  <Th>Inscrito em</Th>
                  <Th>Estado</Th>
                </tr>
              </thead>
              <tbody>
                {subscribers.map((s, i) => (
                  <tr
                    key={String(s._id)}
                    className={
                      i % 2 === 0 ? 'bg-white' : 'bg-[var(--color-gk-creme)]/15'
                    }
                  >
                    <Td>
                      <span className='font-medium text-[var(--color-gk-black)]'>
                        {s.email}
                      </span>
                    </Td>
                    <Td>
                      <span className='whitespace-nowrap text-[var(--color-gk-cinza)]'>
                        {s.source}
                      </span>
                    </Td>
                    <Td>
                      <span className='whitespace-nowrap text-[var(--color-gk-cinza)]'>
                        {formatDate(s.subscribedAt)}
                      </span>
                    </Td>
                    <Td>
                      <StatusBadge status={s.status} />
                    </Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Paginação */}
        {totalPages > 1 && (
          <div className='mt-6 flex items-center justify-between text-[13px]'>
            <span className='text-[var(--color-gk-cinza)]'>
              Página {pageNum} de {totalPages} · {pageCount} resultados
            </span>
            <div className='flex gap-2'>
              {pageNum > 1 && (
                <Link
                  href={buildLink({ page: pageNum - 1 })}
                  className='rounded-full border border-[var(--color-gk-green-dark)]/15 px-4 py-2 uppercase tracking-[0.08em] hover:bg-[var(--color-gk-creme)]'
                >
                  ← Anterior
                </Link>
              )}
              {pageNum < totalPages && (
                <Link
                  href={buildLink({ page: pageNum + 1 })}
                  className='rounded-full border border-[var(--color-gk-green-dark)]/15 px-4 py-2 uppercase tracking-[0.08em] hover:bg-[var(--color-gk-creme)]'
                >
                  Próxima →
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// =============================================================================
// SUB-COMPONENTES
// =============================================================================

function StatsCard({
  label,
  value,
  icon,
  color,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}) {
  return (
    <div className='flex items-start gap-3 rounded-lg border border-[var(--color-gk-green-dark)]/8 bg-white p-5'>
      <div
        className='flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg'
        style={{ backgroundColor: `${color}1f`, color }}
      >
        {icon}
      </div>
      <div>
        <p className='text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--color-gk-cinza)]'>
          {label}
        </p>
        <p className='mt-1 font-[family-name:var(--font-display)] text-2xl text-[var(--color-gk-black)]'>
          {value.toLocaleString('pt-PT')}
        </p>
      </div>
    </div>
  );
}

function FilterPill({
  label,
  href,
  active,
}: {
  label: string;
  href: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={`rounded-full px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.08em] transition-colors ${
        active
          ? 'bg-[var(--color-gk-green-dark)] text-white'
          : 'bg-[var(--color-gk-creme)] text-[var(--color-gk-black)]/70 hover:bg-[var(--color-gk-creme)]/60'
      }`}
    >
      {label}
    </Link>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className='px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--color-gk-cinza)]'>
      {children}
    </th>
  );
}

function Td({ children }: { children: React.ReactNode }) {
  return <td className='px-4 py-3 align-middle'>{children}</td>;
}

function StatusBadge({ status }: { status: 'active' | 'unsubscribed' }) {
  const config = {
    active: { label: 'Ativo', bg: 'rgba(122,171,150,0.18)', color: '#4d7a64' },
    unsubscribed: {
      label: 'Cancelou',
      bg: 'rgba(154,138,110,0.18)',
      color: '#9a8a6e',
    },
  } as const;
  const c = config[status];
  return (
    <span
      className='rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.08em]'
      style={{ backgroundColor: c.bg, color: c.color }}
    >
      {c.label}
    </span>
  );
}

function formatDate(d: Date | string): string {
  const date = typeof d === 'string' ? new Date(d) : d;
  return new Intl.DateTimeFormat('pt-PT', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(date);
}
